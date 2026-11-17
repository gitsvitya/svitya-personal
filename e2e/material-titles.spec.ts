import { expect, test } from "@playwright/test";
import downloadNames from "../src/content/downloads.json";

test("preserves Cyrillic download names when documents are opened directly", async ({
  request,
}) => {
  for (const [path, { filename }] of Object.entries(downloadNames)) {
    const response = await request.head(encodeURI(path));
    expect(response.status(), path).toBe(200);
    expect(response.headers()["content-disposition"], path).toBe(
      `inline; filename*=UTF-8''${encodeURIComponent(filename)}`
    );
  }
});

for (const language of ["ru", "en"] as const) {
  test(`keeps arrows beside the open-material label at every ${language} gallery breakpoint`, async ({
    context,
    page,
    baseURL,
  }, testInfo) => {
    await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
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
              const title = arrow.parentElement!;
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
              // Fallback glyphs have different font metrics on Linux and macOS.
              // Overlapping text bounds detect a shared line without comparing their tops.
              const verticalOverlap =
                Math.min(arrowBounds.bottom, character.bottom) -
                Math.max(arrowBounds.top, character.top);
              return {
                title: link.getAttribute("aria-label"),
                lineOverlap: verticalOverlap / Math.min(arrowBounds.height, character.height),
                gap: arrowBounds.left - character.right,
                overflow: arrowBounds.right - title.getBoundingClientRect().right,
              };
            })
          );
        expect(measurements.length).toBeGreaterThan(0);
        for (const measurement of measurements) {
          const label = `${width}px: ${measurement.title}`;
          expect(measurement.lineOverlap, label).toBeGreaterThanOrEqual(0.5);
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

test("uses compact document previews and full-width visual previews on phones", async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, previewWidth, previewHeight] of [
    ["work/cheminsight", 96, 124],
    ["projects/madburglarcat", 358, 279],
  ] as const) {
    await page.goto(`/ru/${route}`);
    const material = page.locator('main a[href^="/materials/"]').first();
    const image = material.locator("img");
    const preview = await image.locator("..").boundingBox();
    expect(preview!.width).toBeCloseTo(previewWidth, 0);
    expect(preview!.height).toBeCloseTo(previewHeight, 0);
    await expect(material).toContainText("Открыть материал");
    await expect(material).toHaveCSS("text-decoration-line", "none");
    if (route.startsWith("work/")) await expect(material).toContainText("Бюллетень");
  }
});

test("keeps the Stroke Off photo and label previews equal without cropping the artwork", async ({
  page,
  context,
  baseURL,
}, testInfo) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
  for (const width of [1440, 1024, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/ru/activities/strokeoff");
    const gallery = page.locator('section[aria-labelledby="company-materials-title"]');
    const images = gallery.locator("img");
    await expect(images).toHaveCount(2);
    const frames = await images.evaluateAll((items) =>
      items.map((image) => {
        const bounds = image.parentElement!.getBoundingClientRect();
        return { width: bounds.width, height: bounds.height };
      })
    );
    expect(frames[0]!.width).toBeCloseTo(frames[1]!.width, 1);
    expect(frames[0]!.height).toBeCloseTo(frames[1]!.height, 1);
    expect(frames[0]!.height).toBeCloseTo(width <= 640 ? 279 : 300, 0);
    await expect(images.nth(0)).toHaveCSS("object-fit", "cover");
    await expect(images.nth(1)).toHaveCSS("object-fit", "contain");
    await gallery.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        images.evaluateAll((items) =>
          items.every((image) => {
            const preview = image as HTMLImageElement;
            return preview.complete && preview.naturalWidth > 0;
          })
        )
      )
      .toBe(true);
    await gallery.screenshot({ path: testInfo.outputPath(`strokeoff-previews-${width}.png`) });
  }
});
