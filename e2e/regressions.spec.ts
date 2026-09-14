import { expect, test } from "@playwright/test";

const origin = "http://127.0.0.1:3100";

test("serves the correct document language before hydration on every portfolio route", async ({
  request,
}) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]!).pathname
  );
  expect(paths).toHaveLength(30);
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(await response.text(), path).toMatch(
      new RegExp(`<html[^>]+lang="${path.split("/")[1]}"`)
    );
  }
});

test("applies the saved theme and displays fallback text with application scripts and fonts blocked", async ({
  context,
  page,
}) => {
  await context.addCookies([{ name: "theme", value: "dark", url: origin }]);
  await page.emulateMedia({ colorScheme: "light" });
  await page.route(/\.(?:js|woff2?)(?:\?|$)/, (route) => route.abort());
  await page.goto("/ru/about", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(12, 17, 26)");
  await expect(page.locator("main h1")).toBeVisible();
  const displays = await page.evaluate(() =>
    [...document.fonts]
      .filter((font) => !font.family.includes("Fallback"))
      .map((font) => font.display)
  );
  expect(displays.length).toBeGreaterThan(0);
  expect(displays.every((display) => display === "swap")).toBe(true);
});

test("changes locale without reloading the document or losing a saved theme", async ({
  context,
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await context.addCookies([
    { name: "theme", value: "dark", url: origin },
    { name: "analytics_consent", value: "denied", url: origin },
  ]);
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en/settings");
  await page.evaluate(() => {
    const browserWindow = window as Window & {
      localeSentinel?: boolean;
      themeScriptInsertions?: number;
    };
    browserWindow.localeSentinel = true;
    browserWindow.themeScriptInsertions = 0;
    // React only warns in development. Observe script insertions as well so
    // the same regression is caught against the production build in CI.
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (
            node instanceof Element &&
            (node.matches("#theme-init") || node.querySelector("#theme-init"))
          ) {
            browserWindow.themeScriptInsertions! += 1;
          }
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  });
  for (const language of ["ru", "en"]) {
    await page
      .getByRole("button")
      .filter({ hasText: /^EnRu$/ })
      .click();
    await expect(page).toHaveURL(new RegExp(`/${language}/settings$`));
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(
      await page.evaluate(() => (window as Window & { localeSentinel?: boolean }).localeSentinel)
    ).toBe(true);
  }
  expect(
    await page.evaluate(
      () => (window as Window & { themeScriptInsertions?: number }).themeScriptInsertions
    )
  ).toBe(0);
  expect(errors).toEqual([]);
});

for (const width of [1280, 390]) {
  test(`keeps the current page and menu together while navigation loads at ${width}px`, async ({
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
      await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
      const menu = page.getByRole("button", { name: "Sections" });
      if (width < 769) await menu.click();
      await page.locator('nav a[href="/en/work"]').click();
      await expect(page.locator("main")).toHaveAttribute("aria-busy", "true");
      await expect(page.locator("main h1")).toHaveText(originalHeading!);
      await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
      await expect(page.locator('nav a[href="/en/about"]')).toHaveAttribute("aria-current", "page");
      if (width < 769) await expect(menu).toHaveAttribute("aria-expanded", "true");
      release();
      await expect(page).toHaveURL(/\/en\/work$/);
      await expect(page.locator('nav a[href="/en/work"]')).toHaveAttribute("aria-current", "page");
      await expect(page.locator("main h1")).not.toHaveText(originalHeading!);
      await expect(page.locator("main > div")).toHaveCSS("animation-duration", "0.3s");
      const underlineDuration = await page
        .locator('nav a[aria-current="page"]')
        .evaluate((element) => getComputedStyle(element, "::after").transitionDuration);
      expect(underlineDuration.split(",").every((value) => value.trim() === "0.3s")).toBe(true);
      if (width < 769) {
        await expect(menu).toHaveAttribute("aria-expanded", "false");
        await page.goBack();
        await expect(page).toHaveURL(/\/en\/about$/);
        await expect(menu).toHaveAttribute("aria-expanded", "false");
      }
    } finally {
      release();
    }
  });
}

test("keeps gallery controls below the document and serves its PDF", async ({
  context,
  page,
  request,
}) => {
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: origin }]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ru/work/cheminsight");
  const trigger = page.getByRole("button", { name: "ХимИнсайт: Полиэтилен", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const image = await dialog.getByRole("img").boundingBox();
  const next = dialog.getByRole("button", { name: "Следующий материал" });
  const control = await next.boundingBox();
  expect(control!.y).toBeGreaterThanOrEqual(image!.y + image!.height);
  await expect(dialog.getByText("1 из 7", { exact: true })).toBeVisible();
  const download = dialog.getByRole("link", { name: "Скачать PDF" });
  const pdf = await request.get((await download.getAttribute("href"))!);
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await next.click();
  await expect(dialog).toHaveAccessibleName("Полипропилен");
  await expect(dialog.getByText("2 из 7", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("renders a localized themed 404 and a landscape social preview", async ({
  context,
  page,
  request,
}) => {
  await context.addCookies([{ name: "theme", value: "dark", url: origin }]);
  const response = await page.goto("/ru/work/missing");
  expect(response?.status()).toBe(404);
  await expect(page.locator("main h1")).toHaveText("Страница не найдена");
  await expect(page.locator('main a[href="/ru/about"]')).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const preview = await request.get("/og/ru/work/cheminsight");
  expect(preview.status()).toBe(200);
  expect(preview.headers()["content-type"]).toContain("image/png");
  const png = await preview.body();
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
});

test("honors reduced motion on routes and navigation", async ({ context, page }) => {
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: origin }]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/about");
  await page.locator('nav a[href="/en/work"]').click();
  await expect(page).toHaveURL(/\/en\/work$/);
  const durations = await page.evaluate(() => ({
    content: parseFloat(getComputedStyle(document.querySelector("main > div")!).animationDuration),
    menu: parseFloat(
      getComputedStyle(document.querySelector('nav a[aria-current="page"]')!, "::after")
        .transitionDuration
    ),
  }));
  expect(durations.content).toBeLessThan(0.001);
  expect(durations.menu).toBeLessThan(0.001);
});

test("records each SPA page once and stops analytics after consent is withdrawn", async ({
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
        body: "/* local analytics stub */",
      });
    } else await route.abort();
  });
  const commands = () =>
    page.evaluate(() => (window as Window & { ym?: { a?: unknown[][] } }).ym?.a || []);
  const hits = async () => (await commands()).filter((command) => command[1] === "hit");
  await page.goto(`${testOrigin}/en/about`);
  await expect.poll(async () => (await hits()).length).toBe(1);
  expect((await commands()).find((command) => command[1] === "init")?.[2]).toMatchObject({
    defer: true,
  });
  await page.locator('nav a[href="/en/work"]').click();
  await expect(page).toHaveURL(/\/en\/work$/);
  await page.locator('main a[href="/en/work/cheminsight"]').click();
  await expect(page).toHaveURL(/\/en\/work\/cheminsight$/);
  await expect.poll(async () => (await hits()).length).toBe(3);
  expect((await hits()).map((hit) => hit[2])).toEqual([
    `${testOrigin}/en/about`,
    `${testOrigin}/en/work`,
    `${testOrigin}/en/work/cheminsight`,
  ]);
  expect((await hits())[2]![3]).toMatchObject({
    title: "ChemInsight | Victor Strokov",
    referer: `${testOrigin}/en/work`,
  });
  await page.locator('nav a[href="/en/settings"]').click();
  await expect(page).toHaveURL(/\/en\/settings$/);
  await expect.poll(async () => (await hits()).length).toBe(4);
  for (const [language, count] of [
    ["ru", 5],
    ["en", 6],
  ] as const) {
    await page
      .getByRole("button")
      .filter({ hasText: /^EnRu$/ })
      .click();
    await expect(page).toHaveURL(new RegExp(`/${language}/settings$`));
    await expect.poll(async () => (await hits()).length).toBe(count);
    expect((await hits())[count - 1]![3]).toMatchObject({
      title: language === "ru" ? "Настройки | Виктор Строков" : "Settings | Victor Strokov",
    });
  }
  expect((await commands()).filter((command) => command[1] === "init")).toHaveLength(1);
  await page.getByRole("button", { name: "Cookie settings" }).click();
  await page.getByRole("button", { name: "Essential only" }).click();
  await expect
    .poll(async () => (await commands()).filter((command) => command[1] === "destruct").length)
    .toBe(1);
  await page.locator('nav a[href="/en/projects"]').click();
  await expect(page).toHaveURL(/\/en\/projects$/);
  expect(await hits()).toHaveLength(6);
  await page.locator('nav a[href="/en/settings"]').click();
  await expect(page).toHaveURL(/\/en\/settings$/);
  await page.getByRole("button", { name: "Cookie settings" }).click();
  await page.getByRole("button", { name: "Allow analytics" }).click();
  await expect.poll(async () => (await hits()).length).toBe(7);
  expect((await hits())[6]![2]).toBe(`${testOrigin}/en/settings`);
});
