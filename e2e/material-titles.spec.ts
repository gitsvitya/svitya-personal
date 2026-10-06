import { expect, test } from "@playwright/test";
import downloadNames from "../src/content/downloads.json";

test("preserves Cyrillic download names when documents are opened directly", async ({
  request,
}) => {
  for (const [path, filename] of Object.entries(downloadNames)) {
    const response = await request.head(encodeURI(path));
    expect(response.status(), path).toBe(200);
    expect(response.headers()["content-disposition"], path).toBe(
      `inline; filename*=UTF-8''${encodeURIComponent(filename)}`
    );
  }
});

for (const language of ["ru", "en"] as const) {
  test(`keeps arrows beside the final title character at every ${language} gallery breakpoint`, async ({
    context,
    page,
    baseURL,
  }, testInfo) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    for (const route of ["work/thomsonreuters", "work/namex", "projects/madburglarcat"]) {
      await page.goto(`/${language}/${route}`);
      await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
      for (const width of [320, 375, 768, 1024, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => document.fonts.ready);
        const measurements = await page
          .locator('main a[href^="/materials/"]')
          .evaluateAll((links) =>
            links.map((link) => {
              const arrow = link.querySelector('[aria-hidden="true"]')!;
              const title = arrow.parentElement!.parentElement!;
              const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
              let lastText: Text | null = null;
              for (let node = walker.nextNode(); node; node = walker.nextNode()) {
                if (
                  node.textContent?.trim() &&
                  !node.parentElement?.closest('[aria-hidden="true"]')
                )
                  lastText = node as Text;
              }
              const end = lastText!.textContent!.trimEnd().length;
              const characterRange = document.createRange();
              characterRange.setStart(lastText!, end - 1);
              characterRange.setEnd(lastText!, end);
              const character = characterRange.getBoundingClientRect();
              const arrowRange = document.createRange();
              arrowRange.selectNodeContents(arrow);
              const arrowBounds = arrowRange.getBoundingClientRect();
              return {
                title: link.getAttribute("aria-label"),
                lineOffset: Math.abs(arrowBounds.top - character.top),
                gap: arrowBounds.left - character.right,
                overflow: arrowBounds.right - title.getBoundingClientRect().right,
              };
            })
          );
        expect(measurements.length).toBeGreaterThan(0);
        for (const measurement of measurements) {
          const label = `${width}px: ${measurement.title}`;
          expect(measurement.lineOffset, label).toBeLessThanOrEqual(1);
          expect(measurement.gap, label).toBeGreaterThanOrEqual(0);
          expect(measurement.gap, label).toBeLessThanOrEqual(12);
          expect(measurement.overflow, label).toBeLessThanOrEqual(1);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
          false
        );
        if (route === "work/thomsonreuters" && (width === 320 || width === 1280)) {
          const gallery = page.locator('section[aria-labelledby="company-materials-title"]');
          // Load offscreen previews before capturing the entire gallery.
          await gallery.locator("img").evaluateAll((images) => {
            for (const image of images) (image as HTMLImageElement).loading = "eager";
          });
          await expect
            .poll(() =>
              gallery.locator("img").evaluateAll((images) =>
                images.every((image) => {
                  const preview = image as HTMLImageElement;
                  return preview.complete && preview.naturalWidth > 0;
                })
              )
            )
            .toBe(true);
          await gallery.screenshot({
            path: testInfo.outputPath(`material-titles-${language}-${width}.png`),
          });
        }
      }
    }
  });
}
