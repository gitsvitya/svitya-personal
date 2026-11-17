import { expect, test } from "@playwright/test";

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 700 },
]) {
  test(`opens the original only inside the visible image at ${viewport.width}px`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
    await page.setViewportSize(viewport);
    await page.goto("/en/work/cheminsight");
    const preview = page.locator('main a[href="/materials/work/cheminsight/polyethylene.pdf"]');
    await preview.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveCSS("opacity", "1");
    const imageLink = dialog.locator("a:has(img)");
    const image = imageLink.locator("img");
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)
      )
      .toBe(true);
    await imageLink.scrollIntoViewIfNeeded();

    const geometry = await image.evaluate((element: HTMLImageElement) => {
      const image = element.getBoundingClientRect();
      const link = element.parentElement!.getBoundingClientRect();
      const region = element.parentElement!.parentElement!.getBoundingClientRect();
      const left = { x: (region.left + link.left) / 2, y: link.top + link.height / 2 };
      const right = { x: (link.right + region.right) / 2, y: left.y };
      return {
        image: { width: image.width, height: image.height, x: image.x, y: image.y },
        link: { width: link.width, height: link.height, x: link.x, y: link.y },
        ratio: element.naturalWidth / element.naturalHeight,
        availableHeight: region.height,
        sideGap: link.left - region.left,
        blankPoints: [left, right].map((point) => {
          const hit = document.elementFromPoint(point.x, point.y)!;
          return { ...point, isLink: !!hit.closest("a"), cursor: getComputedStyle(hit).cursor };
        }),
      };
    });
    // Responsive image candidates round their raster dimensions to whole pixels.
    expect(Math.abs(geometry.image.width - geometry.image.height * geometry.ratio)).toBeLessThan(1);
    for (const dimension of ["width", "height", "x", "y"] as const) {
      expect(geometry.link[dimension]).toBeCloseTo(geometry.image[dimension], 1);
    }
    expect(geometry.image.height).toBeLessThanOrEqual(geometry.availableHeight + 1);
    expect(geometry.sideGap).toBeGreaterThan(10);
    for (const point of geometry.blankPoints) {
      expect(point.isLink).toBe(false);
      expect(point.cursor).not.toBe("zoom-in");
      const unexpectedPopup = page.waitForEvent("popup", { timeout: 300 }).then(
        () => true,
        () => false
      );
      await page.mouse.click(point.x, point.y);
      expect(await unexpectedPopup).toBe(false);
      await expect(dialog).toBeVisible();
    }

    const originalAction = dialog
      .getByRole("link", { name: "Open original", exact: true })
      .and(dialog.locator(".button-control"));
    await expect(originalAction).toBeVisible();
    await expect(imageLink).toHaveAccessibleName("Open original");
    const originalHref = await originalAction.getAttribute("href");
    await expect(imageLink).toHaveAttribute("href", originalHref!);
    await expect(imageLink).toHaveAttribute("target", "_blank");
    await context.route(new URL(originalHref!, baseURL!).href, (route) =>
      route.fulfill({ contentType: "text/html", body: "<h1>Original material</h1>" })
    );
    const popupPromise = page.waitForEvent("popup");
    await imageLink.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(originalHref!);
    await expect(popup.getByRole("heading", { name: "Original material" })).toBeVisible();
    await popup.close();
    await expect(dialog).toBeVisible();

    const previous = dialog.getByRole("button", { name: "Previous material", exact: true });
    const next = dialog.getByRole("button", { name: "Next material", exact: true });
    for (const button of [previous, next]) {
      await expect(button).toHaveCSS("width", "56px");
      await expect(button).toHaveCSS("height", "56px");
      await expect(button.locator(".link-arrow")).toHaveCSS("font-size", "28px");
    }
    await next.click();
    await expect(dialog).toHaveAccessibleName("Polypropylene");
    await expect(dialog.locator('[aria-live="polite"]')).toHaveText("2 / 7");
    await page.keyboard.press("ArrowLeft");
    await expect(dialog).toHaveAccessibleName("Polyethylene");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(preview).toBeFocused();
  });
}

test("fits the expanded Russian original action on phone screens", async ({
  context,
  page,
  baseURL,
}) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ru/work/cheminsight");
  await page.getByRole("link", { name: "ХимИнсайт: Полиэтилен", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const original = dialog
    .getByRole("link", { name: "Открыть оригинал", exact: true })
    .and(dialog.locator(".button-control"));
  const download = dialog.getByRole("link", { name: "Скачать", exact: true });
  await original.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  expect((await original.boundingBox())!.width).toBeCloseTo(184, 0);
  expect((await download.boundingBox())!.width).toBeCloseTo(150, 0);
  expect((await original.locator(".button-label").boundingBox())!.height).toBe(24);

  await page.setViewportSize({ width: 320, height: 568 });
  await original.focus();
  await expect(original).toBeInViewport({ ratio: 1 });
  for (const action of [original, download]) {
    expect(await action.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
      true
    );
  }
  const originalBounds = (await original.boundingBox())!;
  const downloadBounds = (await download.boundingBox())!;
  expect(originalBounds.y).toBeCloseTo(downloadBounds.y, 0);
  expect(originalBounds.height).toBeCloseTo(downloadBounds.height, 0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
