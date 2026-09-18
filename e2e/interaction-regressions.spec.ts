import { expect, test } from "@playwright/test";

const origin = "http://127.0.0.1:3100";

for (const width of [1280, 390]) {
  test(`cancels a pending navigation when the current section is reselected at ${width}px`, async ({
    context,
    page,
  }) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: origin }]);
    await page.setViewportSize({ width, height: 900 });
    let release = () => {};
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route("**/en/work?*", async (route) => {
      await gate;
      await route.continue();
    });
    try {
      await page.goto("/en/about");
      const originalHeading = await page.locator("main h1").textContent();
      const historyLength = await page.evaluate(() => history.length);
      const menu = page.getByRole("button", { name: "Sections" });
      if (width < 769) await menu.click();
      await page.locator('nav a[href="/en/work"]').click();
      await expect(page.locator("main")).toHaveAttribute("aria-busy", "true");
      await page.locator('nav a[href="/en/about"]').click();
      const response = page.waitForResponse(/\/en\/work\?/);
      release();
      await response;
      await expect(page.locator("main")).toHaveAttribute("aria-busy", "false");
      await expect(page).toHaveURL(/\/en\/about$/);
      await expect(page.locator("main h1")).toHaveText(originalHeading!);
      await expect(page.locator('nav a[href="/en/about"]')).toHaveAttribute("aria-current", "page");
      expect(await page.evaluate(() => history.length)).toBe(historyLength);
      if (width < 769) {
        await expect(menu).toHaveAttribute("aria-expanded", "false");
        await menu.click();
      }
      // Cancellation must leave the router usable for the next selection.
      await page.locator('nav a[href="/en/projects"]').click();
      await expect(page).toHaveURL(/\/en\/projects$/);
    } finally {
      release();
      await page.unrouteAll({ behavior: "ignoreErrors" });
    }
  });
}

test("synchronizes analytics consent between open tabs without focusing or navigating them", async ({
  context,
  page,
}) => {
  const testOrigin = "http://review.svitya.test";
  await context.addCookies([{ name: "analytics_consent", value: "granted", url: testOrigin }]);
  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.startsWith(`${testOrigin}/`)) {
      const response = await route.fetch({ url: url.replace(testOrigin, origin) });
      await route.fulfill({ response });
    } else if (url === "https://mc.yandex.ru/metrika/tag.js") {
      await route.fulfill({
        contentType: "application/javascript",
        body: "/* local analytics stub: no external requests */",
      });
    } else await route.abort();
  });
  try {
    await page.goto(`${testOrigin}/en/about`);
    const commands = () =>
      page.evaluate(() => (window as Window & { ym?: { a?: unknown[][] } }).ym?.a || []);
    const countCommands = async (name: string) =>
      (await commands()).filter((command) => command[1] === name).length;
    await expect.poll(() => countCommands("hit")).toBe(1);

    const settings = await context.newPage();
    await settings.goto(`${testOrigin}/en/settings`);
    await settings.getByRole("button", { name: "Cookie settings" }).click();
    await settings.getByRole("button", { name: "Essential only" }).click();
    await expect.poll(() => countCommands("destruct")).toBe(1);
    expect(
      await page.evaluate(
        () => (window as Window & { __svityaYandexInitialized?: boolean }).__svityaYandexInitialized
      )
    ).toBe(false);

    await settings.getByRole("button", { name: "Cookie settings" }).click();
    await settings.getByRole("button", { name: "Allow analytics" }).click();
    await expect.poll(() => countCommands("init")).toBe(2);
    await expect.poll(() => countCommands("hit")).toBe(2);
    await expect(page).toHaveURL(`${testOrigin}/en/about`);
  } finally {
    await context.unrouteAll({ behavior: "ignoreErrors" });
  }
});

test("preserves carousel button focus across repeated keyboard activation", async ({
  context,
  page,
}) => {
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: origin }]);
  await page.goto("/ru/work/cheminsight");
  const trigger = page.getByRole("button", { name: "ХимИнсайт: Полиэтилен", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("button", { name: "Закрыть модальное окно" })).toBeFocused();
  const next = dialog.getByRole("button", { name: "Следующий материал" });
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(next).toBeFocused();
  await expect(dialog.getByText("2 из 7", { exact: true })).toBeVisible();
  await expect(next).toBeEnabled();
  await expect(next).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(dialog.getByText("3 из 7", { exact: true })).toBeVisible();
  await expect(next).toBeEnabled();
  await expect(next).toBeFocused();

  const previous = dialog.getByRole("button", { name: "Предыдущий материал" });
  await previous.focus();
  await page.keyboard.press("Space");
  await expect(dialog.getByText("2 из 7", { exact: true })).toBeVisible();
  await expect(previous).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

for (const width of [1280, 390]) {
  test(`opens a material from both its caption and arrow at ${width}px`, async ({
    context,
    page,
  }) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: origin }]);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/ru/work/cheminsight");
    const trigger = page.getByRole("button", { name: "ХимИнсайт: Полиэтилен", exact: true });
    const dialog = page.getByRole("dialog");
    for (const target of [
      trigger.getByText("Полиэтилен", { exact: true }),
      trigger.getByText("→"),
    ]) {
      await target.click();
      await expect(dialog).toHaveAccessibleName("Полиэтилен");
      await expect(dialog.getByRole("button", { name: "Закрыть модальное окно" })).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }
  });
}

test("keeps mobile section links usable when application scripts cannot load", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.route(/\.js(?:\?|$)/, (route) => route.abort());
  await page.goto("/en/about");
  await expect(page.getByRole("button", { name: "Sections" })).toBeHidden();
  for (const link of await page.locator("nav a").all()) await expect(link).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await page.locator('nav a[href="/en/work"]').click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await expect(page.locator('nav a[href="/en/work"]')).toHaveAttribute("aria-current", "page");
  await expect(page.locator("main h1")).toBeVisible();
});

test("enhances visible mobile links into a working menu after delayed hydration", async ({
  context,
  page,
}) => {
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: origin }]);
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  let release = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(/\.js(?:\?|$)/, async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto("/en/about", { waitUntil: "commit" });
    const menu = page.getByRole("button", { name: "Sections" });
    await expect(menu).toBeHidden();
    for (const link of await page.locator("nav a").all()) await expect(link).toBeVisible();
    await expect(page.locator('nav a[href="/en/work"]')).toBeVisible();
    release();
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click();
    await page.locator('nav a[href="/en/work"]').click();
    await expect(page).toHaveURL(/\/en\/work$/);
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(errors).toEqual([]);
  } finally {
    release();
    await page.unrouteAll({ behavior: "ignoreErrors" });
  }
});
