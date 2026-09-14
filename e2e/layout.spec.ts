import { expect, test } from "@playwright/test";

test("keeps responsive layouts usable and captures visual review images", async ({
  context,
  page,
}, testInfo) => {
  const origin = "http://127.0.0.1:3100";
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: origin }]);
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
    await context.addCookies([{ name: "theme", value: theme, url: origin }]);
    await page.setViewportSize({ width, height: 900 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
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
  }
});
