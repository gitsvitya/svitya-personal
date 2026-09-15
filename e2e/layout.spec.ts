import { expect, test } from "@playwright/test";

const scenarios = [
  { name: "about-ru-desktop", path: "/ru/about", width: 1440, theme: "light" },
  { name: "work-ru-laptop", path: "/ru/work", width: 1280, theme: "light" },
  { name: "work-en-small", path: "/en/work", width: 320, theme: "dark" },
  { name: "about-ru-mobile", path: "/ru/about", width: 390, theme: "light" },
  { name: "case-en-mobile", path: "/en/work/cheminsight", width: 390, theme: "dark" },
  { name: "about-en-tablet", path: "/en/about", width: 768, theme: "light" },
  { name: "settings-ru-desktop", path: "/ru/settings", width: 1440, theme: "light" },
  { name: "settings-en-small", path: "/en/settings", width: 320, theme: "dark" },
  { name: "settings-ru-tablet", path: "/ru/settings", width: 769, theme: "light" },
];

for (const { name, path, width, theme } of scenarios) {
  test(`keeps ${name} usable and captures a visual review image`, async ({
    context,
    page,
    baseURL,
  }, testInfo) => {
    await context.addCookies([
      { name: "analytics_consent", value: "denied", url: baseURL! },
      { name: "theme", value: theme, url: baseURL! },
    ]);
    await page.setViewportSize({ width, height: 900 });
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1");

    // A full-page screenshot needs offscreen previews too. Start their loads before
    // fonts.ready: in WebKit that promise can also wait for the document load event.
    await page.locator("main img").evaluateAll((images) => {
      for (const image of images) {
        if (image instanceof HTMLImageElement) image.loading = "eager";
      }
    });
    await expect
      .poll(() =>
        page
          .locator("main")
          .evaluate((main) =>
            [...main.querySelectorAll("img")]
              .filter((image) => !image.complete || image.naturalWidth === 0)
              .map((image) => image.currentSrc || image.src)
          )
      )
      .toEqual([]);
    await page.evaluate(() => document.fonts.ready);
    const overflowing = await page.locator("main *").evaluateAll((elements) =>
      elements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.right > innerWidth + 1 || rect.left < -1;
        })
        .map((element) => element.tagName)
    );
    expect(overflowing, name).toEqual([]);
    if (width === 1280) {
      const cards = page.locator('main a[href^="/ru/work/"]');
      const first = await cards.nth(0).boundingBox();
      const second = await cards.nth(1).boundingBox();
      expect(first!.y).toBe(second!.y);
      expect(second!.x).toBeGreaterThan(first!.x);
    }
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true });
  });
}

for (const width of [320, 375, 641, 961, 1101, 1280]) {
  test(`keeps card sizes equal across sections and languages at ${width}px`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    await page.setViewportSize({ width, height: 900 });
    let reference: { width: number; height: number } | undefined;
    for (const language of ["ru", "en"]) {
      await context.addCookies([
        { name: "theme", value: language === "ru" ? "light" : "dark", url: baseURL! },
      ]);
      for (const section of ["work", "projects", "activities"]) {
        const path = `/${language}/${section}`;
        if (section === "work") await page.goto(path);
        else {
          const menu = page.locator('button[aria-controls="app-nav-list"]');
          if (await menu.isVisible()) await menu.click();
          await page.locator(`nav a[href="${path}"]`).click();
        }
        await expect(page).toHaveURL(path);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
        const cards = await page.locator(`main a[href^="${path}/"]`).evaluateAll((elements) =>
          elements.map((card) => {
            const rect = card.getBoundingClientRect();
            return {
              width: rect.width,
              height: rect.height,
              contentFits: [...card.querySelectorAll("span, img")].every((element) => {
                const content = element.getBoundingClientRect();
                return (
                  content.left >= rect.left - 1 &&
                  content.right <= rect.right + 1 &&
                  content.top >= rect.top - 1 &&
                  content.bottom <= rect.bottom + 1
                );
              }),
            };
          })
        );
        expect(cards.length).toBeGreaterThan(1);
        reference ??= cards[0]!;
        for (const card of cards) {
          expect(card.contentFits, `${path}: full card content`).toBe(true);
          // Keep the same reference when changing sections and languages.
          expect(Math.abs(card.width - reference.width), `${path}: card width`).toBeLessThan(1);
          expect(Math.abs(card.height - reference.height), `${path}: card height`).toBeLessThan(1);
        }
      }
    }
  });
}
