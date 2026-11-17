import { expect, test } from "@playwright/test";
for (const language of ["ru", "en"]) {
  test(`shows portfolio and contact actions on the ${language} homepage`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
    await page.goto(`/${language}/about`);
    await expect(page.locator('main a[href*="/cv/"]')).toHaveCount(0);
    await expect(page.locator(`main a[href="/${language}/work"]`)).toBeVisible();
    await expect(page.locator(`main a[href="/${language}/projects"]`)).toBeVisible();
    await expect(page.locator('main a[href="https://t.me/vstrokov"]')).toBeVisible();
    const otherLanguage = language === "ru" ? "en" : "ru";
    await page.locator(`header a[lang="${otherLanguage}"]`).first().click();
    await expect(page).toHaveURL(`/${otherLanguage}/about`);
    await page.locator(`main a[href="/${otherLanguage}/projects"]`).click();
    await expect(page).toHaveURL(`/${otherLanguage}/projects`);
  });
}

test("returns 404 for unknown localized and catch-all routes", async ({ request }) => {
  for (const [path, heading] of [
    ["/en/work/not-a-company", "Page not found"],
    ["/ru/work/not-a-company", "Страница не найдена"],
    ["/ru/not-a-section", "Страница не найдена"],
    // The previous requests set the Russian language preference cookie.
    ["/not-a-real-page", "Страница не найдена"],
  ] as const) {
    const response = await request.get(path, {
      maxRedirects: 0,
      headers: { "sec-fetch-dest": "document" },
    });
    expect(response.status(), path).toBe(404);
    const html = await response.text();
    expect(html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1], path).toBe(heading);
  }
});

test("localizes company metadata", async ({ page }) => {
  await page.goto("/en/work/cheminsight");

  await expect(page).toHaveTitle("ChemInsight | Victor Strokov");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
    "content",
    "Victor Strokov"
  );
});

test("keeps the preferred theme when changing language", async ({ context, page }) => {
  await context.clearCookies();
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en/settings");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator('header a[lang="ru"]').first().click();
  await expect(page).toHaveURL(/\/ru\/settings$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("closes the mobile menu at the CSS desktop breakpoint", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "cookie_notice_closed",
      value: "1",
      url: "http://127.0.0.1:3100",
    },
  ]);
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/en/about");

  const menuButton = page.locator('button[aria-controls="app-nav-list"]');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");

  await page.setViewportSize({ width: 769, height: 900 });
  await expect(menuButton).toBeHidden();
  // Wait for the media-query event before resizing back; CSS updates first.
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

for (const language of ["ru", "en"] as const) {
  for (const width of [320, 1280]) {
    test(`shows the cookie notice once and reopens it manually in ${language} at ${width}px`, async ({
      context,
      page,
    }, testInfo) => {
      const copy =
        language === "ru"
          ? {
              label: "Уведомление о cookie",
              description:
                "Я использую только технические cookie. Без аналитики и рекламных приколов.",
              close: "Закрыть",
              show: "Показать уведомление",
            }
          : {
              label: "Cookie notice",
              description: "I use only functional cookies. No analytics, no ad tricks.",
              close: "Close",
              show: "Show cookie notice",
            };
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${language}/settings`);
      const banner = page.getByRole("region", { name: copy.label });
      await expect(banner).toBeVisible();
      await expect(banner).toHaveAccessibleDescription(copy.description);
      await expect(banner.getByRole("button")).toHaveCount(1);
      const closeButton = banner.getByRole("button", { name: copy.close, exact: true });

      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
      if (width === 320) await expect(page.locator("#app-nav-list")).toHaveCSS("opacity", "0");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width
      );
      await page.screenshot({ path: testInfo.outputPath("cookie-notice.png") });

      await closeButton.click();
      await expect(banner).toHaveCount(0);
      expect(
        (await context.cookies()).find(({ name }) => name === "cookie_notice_closed")?.value
      ).toBe("1");
      await page.reload();
      await expect(page.getByRole("button", { name: copy.show, exact: true })).toBeVisible();
      await expect(banner).toHaveCount(0);

      await page.getByRole("button", { name: copy.show, exact: true }).click();
      await expect(banner).toBeVisible();
      expect(
        (await context.cookies()).find(({ name }) => name === "cookie_notice_closed")?.value
      ).toBe("1");
      await closeButton.click();
      await expect(banner).toHaveCount(0);
    });
  }
}

test("shows the cookie close button focus and respects reduced motion", async ({ page }) => {
  await page.goto("/en/about");
  const close = page
    .getByRole("region", { name: "Cookie notice" })
    .getByRole("button", { name: "Close", exact: true });
  await close.focus();
  await expect(close).toHaveCSS("outline-style", "solid");
  await expect(close).toHaveCSS("outline-width", "2px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await close.evaluate((element) => parseFloat(getComputedStyle(element).transitionDuration))
  ).toBeLessThan(0.001);
});

test("navigates materials by keyboard only while the modal is open", async ({ page }) => {
  await page.goto("/ru/work/cheminsight");
  const firstMaterial = page
    .getByRole("link")
    .filter({ has: page.getByAltText("ХимИнсайт: Полиэтилен") });

  await firstMaterial.click();
  const dialog = page.locator('[role="dialog"]');
  await expect(dialog).toHaveAccessibleName("Полиэтилен");
  await expect(page.getByRole("button", { name: "Закрыть окно" })).toBeFocused();

  await page.keyboard.press("Escape");
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveCount(0);

  await firstMaterial.click();
  await expect(page.getByRole("button", { name: "Закрыть окно" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAccessibleName("Полипропилен");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});
