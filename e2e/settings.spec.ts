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
      await page.getByRole("button", { name: "Показать cookie баннер", exact: true }).click();
    }
    const banner = page.locator('[aria-describedby="cookie-notice-description"]');
    await expect(banner).toBeVisible();

    await page.getByRole("button", { name: "Русский язык" }).click();
    await expect(page).toHaveURL(/\/en\/settings$/);
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAccessibleName("Cookie notice");
    await expect(banner.getByRole("button", { name: "Close", exact: true })).toBeVisible();
    await expect(banner.getByRole("button")).toHaveCount(1);

    await page.getByRole("button", { name: "Russian language" }).click();
    await expect(page).toHaveURL(/\/ru\/settings$/);
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAccessibleName("Уведомление о cookie");
    expect(
      (await context.cookies()).find(({ name }) => name === "cookie_notice_closed")?.value
    ).toBe(wasClosed ? "1" : undefined);

    await banner.getByRole("button", { name: "Закрыть", exact: true }).click();
    await expect(banner).toHaveCount(0);
    await page.getByRole("button", { name: "Русский язык" }).click();
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
  test(`moves preferences into the settings tab at ${width}px`, async ({
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

    const theme = page.getByRole("button", { name: "Dark theme", exact: true });
    await theme.focus();
    await page.keyboard.press("Space");
    await expect(theme).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Russian language" }).click();
    await expect(page).toHaveURL(/\/ru\/settings$/);
    await expect(page).toHaveTitle("Настройки | Виктор Строков");
    await expect(page.locator("main h1")).toHaveText("Настройки");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.getByRole("button", { name: "Русский язык" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    await page.getByRole("button", { name: "Показать cookie баннер", exact: true }).click();
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
    await expect(page.getByRole("button", { name: "Тёмная тема" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    await expect(banner).toHaveCount(0);
    await page.goto("/settings");
    await expect(page).toHaveURL(/\/ru\/settings$/);
  });
}
