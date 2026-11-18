import { expect, test, type Locator, type Page } from "@playwright/test";

async function arrowOffset(link: Locator) {
  return link.locator(".link-arrow").evaluate((arrow) => {
    const transform = getComputedStyle(arrow).transform;
    return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
  });
}

async function expectArrowMotion(
  page: Page,
  link: Locator,
  direction: 1 | -1,
  neutralTarget = page.locator("main h1")
) {
  // The previous Tab check can leave the next link focused. Start each check
  // with an actual pointer interaction so hover and keyboard focus stay distinct.
  await neutralTarget.click();
  const arrow = link.locator(".link-arrow");
  await link.hover();
  await expect.poll(() => arrowOffset(link)).toBe(direction * 4);
  await expect(arrow).toHaveCSS("transition-duration", "0.3s");
  await expect(arrow).toHaveCSS("transition-timing-function", "cubic-bezier(0.22, 1, 0.36, 1)");
  await expect(link).toHaveCSS("transform", "none");
  await page.mouse.move(0, 0);
  await expect.poll(() => arrowOffset(link)).toBe(0);
  await page.keyboard.press("Tab");
  await link.focus();
  await expect(link).toBeFocused();
  await expect.poll(() => arrowOffset(link)).toBe(direction * 4);
  await page.keyboard.press("Tab");
  await expect.poll(() => arrowOffset(link)).toBe(0);
}

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
});

test("moves only arrow glyphs in the matching direction on hover and keyboard focus", async ({
  page,
}) => {
  await page.goto("/ru/about");
  for (const name of ["Опыт работы", "Мои проекты", "Связаться со мной"]) {
    await expectArrowMotion(page, page.locator("main").getByRole("link", { name, exact: true }), 1);
  }

  await page.goto("/ru/work");
  await expectArrowMotion(page, page.locator('main a[href="/ru/work/cheminsight"]'), 1);

  await page.goto("/ru/work/cheminsight");
  await expectArrowMotion(page, page.locator('main a[href="/ru/work"]'), -1);
  await expectArrowMotion(page, page.locator('main a[href="https://cheminsight.ru/"]'), 1);
  await expectArrowMotion(page, page.locator('main a[href="/ru/work/namex"]'), 1);
});

test("animates gallery arrows and keeps unavailable navigation arrows still", async ({ page }) => {
  await page.goto("/en/work/cheminsight");
  const preview = page.locator('main a[href="/materials/work/cheminsight/polyethylene.pdf"]');
  await expectArrowMotion(page, preview, 1);
  await preview.click();

  const dialog = page.getByRole("dialog");
  const title = dialog.getByRole("heading");
  const previous = dialog.getByRole("button", { name: "Previous material", exact: true });
  const next = dialog.getByRole("button", { name: "Next material", exact: true });
  await expectArrowMotion(page, previous, -1, title);
  await expectArrowMotion(page, next, 1, title);

  await title.click();
  await page.mouse.move(0, 0);
  // Keep the real material-switch interval open long enough to inspect both
  // unavailable buttons without racing the normal 180 ms transition.
  await page.evaluate(() => {
    document.documentElement.style.setProperty("--transition-fast-duration", "30s");
  });
  await page.keyboard.press("ArrowRight");
  for (const button of [previous, next]) {
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await button.hover();
    await expect(button.locator(".link-arrow")).toHaveCSS("transform", "none");
    await page.mouse.move(0, 0);
    await page.keyboard.press("Tab");
    await button.focus();
    await expect(button).toBeFocused();
    await expect(button.locator(".link-arrow")).toHaveCSS("transform", "none");
  }
  await page.evaluate(() => {
    document.documentElement.style.removeProperty("--transition-fast-duration");
  });
  // Closing also cancels the deliberately extended material-switch timer.
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("keeps arrow glyphs still with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/about");
  const link = page.locator('main a[href="/en/work"]');
  await link.hover();
  expect(await arrowOffset(link)).toBe(0);
  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab");
  await link.focus();
  await expect(link).toBeFocused();
  expect(await arrowOffset(link)).toBe(0);

  await page.goto("/en/work/cheminsight");
  const back = page.locator('main a[href="/en/work"]').first();
  await back.hover();
  expect(await arrowOffset(back)).toBe(0);

  const preview = page.locator('main a[href="/materials/work/cheminsight/polyethylene.pdf"]');
  await preview.hover();
  expect(await arrowOffset(preview)).toBe(0);
  await preview.click();
  const next = page.getByRole("dialog").getByRole("button", { name: "Next material", exact: true });
  await next.hover();
  expect(await arrowOffset(next)).toBe(0);
  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab");
  await next.focus();
  await expect(next).toBeFocused();
  expect(await arrowOffset(next)).toBe(0);
});
