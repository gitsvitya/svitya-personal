import { expect, test } from "@playwright/test";

test("returns 404 for unknown localized and catch-all routes", async ({ request }) => {
  for (const path of ["/ru/work/not-a-company", "/ru/not-a-section", "/not-a-real-page"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(404);
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
  await page.goto("/en/about");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("button")
    .filter({ hasText: /^EnRu$/ })
    .click();
  await expect(page).toHaveURL(/\/ru\/about$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("closes the mobile menu at the CSS desktop breakpoint", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "analytics_consent",
      value: "denied",
      url: "http://127.0.0.1:3000",
    },
  ]);
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/en/about");

  const menuButton = page.getByRole("button", { name: "Sections" });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");

  await page.setViewportSize({ width: 769, height: 900 });
  await expect(menuButton).toBeHidden();
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("lets the user reopen and update cookie settings", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "analytics_consent",
      value: "denied",
      url: "http://127.0.0.1:3000",
    },
  ]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/about");

  await expect(page.getByRole("region", { name: "Analytics cookie settings" })).toHaveCount(0);
  await page.getByRole("button", { name: "Cookie settings" }).click();

  const banner = page.getByRole("region", { name: "Analytics cookie settings" });
  await expect(banner).toBeVisible();
  const rejectButton = banner.getByRole("button", { name: "Essential only" });
  const acceptButton = banner.getByRole("button", { name: "Allow analytics" });
  const rejectBox = await rejectButton.boundingBox();
  const acceptBox = await acceptButton.boundingBox();
  expect(rejectBox?.y).toBeLessThan(acceptBox?.y ?? 0);

  await acceptButton.click();
  await expect(banner).toHaveCount(0);
  await expect
    .poll(
      async () => (await context.cookies()).find(({ name }) => name === "analytics_consent")?.value
    )
    .toBe("granted");
  await expect(page.locator('script[src*="mc.yandex.ru"]')).toHaveCount(0);

  await page.getByRole("button", { name: "Cookie settings" }).click();
  await rejectButton.click();
  await expect
    .poll(
      async () => (await context.cookies()).find(({ name }) => name === "analytics_consent")?.value
    )
    .toBe("denied");
});

test("navigates materials by keyboard only while the modal is open", async ({ page }) => {
  await page.goto("/ru/work/cheminsight");
  const firstMaterial = page
    .getByRole("button")
    .filter({ has: page.getByAltText("ХимИнсайт: Полиэтилен") });

  await firstMaterial.click();
  const dialog = page.locator('[role="dialog"]');
  await expect(dialog).toHaveAccessibleName("Полиэтилен");
  await expect(page.getByRole("button", { name: "Закрыть модальное окно" })).toBeFocused();

  await page.keyboard.press("Escape");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(400);
  await expect(dialog).toHaveAccessibleName("Полиэтилен");
  await expect(dialog).toHaveCount(0);

  await firstMaterial.click();
  await expect(page.getByRole("button", { name: "Закрыть модальное окно" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAccessibleName("Полипропилен");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});
