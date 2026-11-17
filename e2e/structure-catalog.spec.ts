import { expect, test, type Page } from "@playwright/test";

type Catalog = "work" | "projects" | "activities";

const catalogSlugs: Record<Catalog, readonly string[]> = {
  work: ["cheminsight", "namex", "lukoilrnpt", "kalashnikov", "thomsonreuters"],
  projects: ["madburglarcat", "mappngo", "venivi"],
  activities: ["strokeoff", "svityacom"],
};

async function openCatalog(page: Page, language: string, section: Catalog, width: number) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`/${language}/${section}`);
  await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
  await page.evaluate(() => document.fonts.ready);
}

async function expectCatalogFits(page: Page, language: string, section: Catalog) {
  const links = page.locator(`main a[href^="/${language}/${section}/"]`);
  await expect(links).toHaveCount(catalogSlugs[section].length);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    page.viewportSize()!.width
  );
  const cards = await links.evaluateAll((elements) =>
    elements.map((element) => {
      const box = (child: Element) => {
        const rect = child.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      };
      return {
        card: box(element),
        header: box(element.querySelector('[class*="cardHeader"]')!),
        body: box(element.querySelector('[class*="cardBody"]')!),
        cta: box(element.querySelector('[class*="cardCta"]')!),
      };
    })
  );
  for (const entry of cards) {
    expect(entry.body.x + entry.body.width).toBeLessThanOrEqual(
      entry.card.x + entry.card.width + 1
    );
    expect(entry.cta.y + entry.cta.height).toBeLessThanOrEqual(entry.card.y + entry.card.height);
  }
  return { links, cards };
}

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
});

for (const section of Object.keys(catalogSlugs) as Catalog[]) {
  for (const language of ["ru", "en"]) {
    for (const width of [1440, 1025, 1024, 390, 320]) {
      test(`${section} keeps the shared catalog layout in ${language} at ${width}px`, async ({
        page,
      }) => {
        await openCatalog(page, language, section, width);
        const { links, cards } = await expectCatalogFits(page, language, section);
        expect(
          await links.evaluateAll((items) => items.map((item) => item.getAttribute("href")))
        ).toEqual(catalogSlugs[section].map((slug) => `/${language}/${section}/${slug}`));
        const first = cards[0]!;
        for (const [index, entry] of cards.entries()) {
          expect(Math.abs(entry.card.x - first.card.x)).toBeLessThan(1);
          expect(Math.abs(entry.card.width - first.card.width)).toBeLessThan(1);
          expect(Math.abs(entry.cta.x - first.cta.x)).toBeLessThan(1);
          if (index > 0) {
            const previous = cards[index - 1]!;
            expect(entry.card.y).toBeGreaterThanOrEqual(previous.card.y + previous.card.height - 1);
          }
          if (width > 1024) {
            expect(entry.body.x).toBeGreaterThan(entry.header.x + entry.header.width + 20);
            expect(Math.abs(entry.header.y - entry.body.y)).toBeLessThan(1);
            expect(entry.body.width).toBeLessThanOrEqual(760);
          } else {
            expect(entry.body.y).toBeGreaterThanOrEqual(entry.header.y + entry.header.height + 12);
            expect(Math.abs(entry.body.x - entry.header.x)).toBeLessThan(1);
            expect(entry.card.height).toBeGreaterThanOrEqual(224);
          }
        }
        if (width === 1440) {
          expect(first.header.width).toBeCloseTo(380, 0);
          expect(first.body.width).toBeCloseTo(760, 0);
          expect(first.body.x - first.header.x).toBeCloseTo(460, 0);
        }
      });
    }
  }

  test(`${section} rows retain keyboard navigation to the correct story`, async ({ page }) => {
    await openCatalog(page, "en", section, 1440);
    const path = `/en/${section}/${catalogSlugs[section][1]!}`;
    const link = page.locator(`main a[href="${path}"]`);
    const title = await link.locator('[class*="cardCompanyName"]').textContent();
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS("outline-width", "2px");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title!);
  });
}
