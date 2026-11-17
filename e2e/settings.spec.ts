import { expect, test } from "@playwright/test";

for (const wasClosed of [false, true]) {
  test(`keeps the cookie banner open across locale changes when previously closed: ${wasClosed}`, async ({
    context,
    page,
    baseURL,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    if (wasClosed) {
      await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
    }
    await page.goto("/ru/settings");
    if (wasClosed) {
      await page.getByRole("button", { name: "Показать уведомление", exact: true }).click();
    }
    const banner = page.locator('[aria-describedby="cookie-notice-description"]');
    await expect(banner).toBeVisible();

    await page.locator('[data-language-choice="en"]').click();
    await expect(page).toHaveURL(/\/en\/settings$/);
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAccessibleName("Cookie notice");
    await expect(banner.getByRole("button", { name: "Close", exact: true })).toBeVisible();
    await expect(banner.getByRole("button")).toHaveCount(1);

    await page.locator('[data-language-choice="ru"]').click();
    await expect(page).toHaveURL(/\/ru\/settings$/);
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAccessibleName("Уведомление о cookie");
    expect(
      (await context.cookies()).find(({ name }) => name === "cookie_notice_closed")?.value
    ).toBe(wasClosed ? "1" : undefined);

    await banner.getByRole("button", { name: "Закрыть", exact: true }).click();
    await expect(banner).toHaveCount(0);
    await page.locator('[data-language-choice="en"]').click();
    await expect(page).toHaveURL(/\/en\/settings$/);
    await expect(banner).toHaveCount(0);
    await page.reload();
    await expect(banner).toHaveCount(0);
    expect(
      (await context.cookies()).find(({ name }) => name === "cookie_notice_closed")?.value
    ).toBe("1");
  });
}

for (const width of [1280, 390]) {
  test(`changes explicit language and appearance preferences at ${width}px`, async ({
    context,
    page,
  }, testInfo) => {
    await context.addCookies([
      { name: "theme", value: "light", url: "http://127.0.0.1:3100" },
      { name: "cookie_notice_closed", value: "1", url: "http://127.0.0.1:3100" },
    ]);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en/about");
    await expect(
      page.locator("header #theme-toggle, header #language-toggle, footer button")
    ).toHaveCount(0);
    const menu = page.locator('button[aria-controls="app-nav-list"]');
    if (width < 769) await menu.click();
    await page.locator('nav a[href="/en/settings"]').click();
    await expect(page).toHaveURL(/\/en\/settings$/);
    await expect(page.locator("main h1")).toHaveText("Settings");
    await expect(page.locator('nav a[href="/en/settings"]')).toHaveAttribute(
      "aria-current",
      "page"
    );
    if (width < 769) await expect(menu).toHaveAttribute("aria-expanded", "false");

    const theme = page.locator('[data-theme-choice="dark"]');
    await theme.focus();
    await page.keyboard.press("Space");
    await expect(theme).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.locator('[data-language-choice="ru"]').click();
    await expect(page).toHaveURL(/\/ru\/settings$/);
    await expect(page).toHaveTitle("Настройки | Виктор Строков");
    await expect(page.locator("main h1")).toHaveText("Настройки");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator('[data-language-choice="ru"]')).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    await page.getByRole("button", { name: "Показать уведомление", exact: true }).click();
    const banner = page.getByRole("region", { name: "Уведомление о cookie" });
    await expect(banner).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
    if (width < 769) await expect(page.locator("#app-nav-list")).toHaveCSS("opacity", "0");
    await page.screenshot({ path: testInfo.outputPath("cookie-notice-dark.png") });
    await banner.getByRole("button", { name: "Закрыть", exact: true }).click();
    await expect(banner).toHaveCount(0);

    if (width < 769) await menu.click();
    await page.locator('nav a[href="/ru/work"]').click();
    await expect(page).toHaveURL(/\/ru\/work$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.goBack();
    await expect(page).toHaveURL(/\/ru\/settings$/);
    await page.reload();
    await expect(page.locator('[data-theme-choice="dark"]')).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    await expect(banner).toHaveCount(0);
    await page.goto("/settings");
    await expect(page).toHaveURL(/\/ru\/settings$/);
  });
}

test("follows device appearance only while System is selected", async ({
  context,
  page,
  baseURL,
}) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en/settings");
  const system = page.locator('[data-theme-choice="system"]');
  await expect(system).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator('[data-theme-choice="dark"]').click();
  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await system.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(system).toHaveAttribute("aria-pressed", "true");
  await page.locator('header a[lang="ru"]').click();
  await expect(page).toHaveURL(/\/ru\/settings$/);
  await expect(system).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect((await context.cookies()).find(({ name }) => name === "theme")?.value).toBe("system");
});

test("changes the current detail page language directly from the header", async ({
  context,
  page,
  baseURL,
}) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ru/work/cheminsight");
  const english = page.locator('header a[lang="en"]');
  await expect(english).toHaveAttribute("href", "/en/work/cheminsight");
  await english.click();
  await expect(page).toHaveURL(/\/en\/work\/cheminsight$/);
  await expect(english).toHaveAttribute("aria-current", "true");
});

test("does not change the saved language when another locale is prefetched", async ({
  context,
  page,
  baseURL,
}) => {
  await context.addCookies([{ name: "lang", value: "ru", url: baseURL! }]);
  const response = await context.request.get("/en/settings", {
    headers: { "next-router-prefetch": "1" },
  });
  expect(response.ok()).toBe(true);
  expect((await context.cookies()).find(({ name }) => name === "lang")?.value).toBe("ru");
  await page.goto("/settings");
  await expect(page).toHaveURL(/\/ru\/settings$/);
});
