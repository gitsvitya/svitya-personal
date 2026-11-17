import { expect, test, type Page } from "@playwright/test";

const stories = [
  "work/cheminsight",
  "work/namex",
  "work/lukoilrnpt",
  "work/kalashnikov",
  "work/thomsonreuters",
  "projects/madburglarcat",
  "projects/mappngo",
  "projects/venivi",
  "activities/strokeoff",
  "activities/svityacom",
];

async function openStory(page: Page, path: string, width: number) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

async function expectContentFits(page: Page) {
  const overflowing = await page.locator("main *").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.right > innerWidth + 1 || rect.left < -1;
      })
      .map((element) => `${element.tagName}: ${element.textContent?.slice(0, 60)}`)
  );
  expect(overflowing).toEqual([]);

  const brokenWords = await page.getByRole("heading", { level: 1 }).evaluate((heading) => {
    const text = heading.firstChild!;
    return [...text.textContent!.matchAll(/[^\s-]+/g)]
      .filter((word) => {
        const range = document.createRange();
        range.setStart(text, word.index!);
        range.setEnd(text, word.index! + word[0].length);
        return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size > 1;
      })
      .map((word) => word[0]);
  });
  expect(brokenWords, "company names wrap at spaces or existing hyphens").toEqual([]);
}

async function expectStoryLayout(page: Page, columns: boolean) {
  const story = page.locator('[class*="detailContent"]');
  const title = await story.getByRole("heading", { level: 1 }).boundingBox();
  const identity = await story.locator('[class*="identityColumn"]').boundingBox();
  const overview = await story.locator('[class*="overview"]').boundingBox();
  expect(title).not.toBeNull();
  expect(identity).not.toBeNull();
  expect(overview).not.toBeNull();

  if (columns) {
    expect(overview!.x).toBeGreaterThan(identity!.x + identity!.width + 20);
    expect(Math.abs(overview!.y - identity!.y)).toBeLessThan(1);
  } else {
    expect(overview!.y).toBeGreaterThan(identity!.y + identity!.height + 12);
    expect(Math.abs(overview!.x - title!.x)).toBeLessThan(1);
  }

  const sections = story.locator("section");
  expect(await sections.count()).toBeGreaterThan(0);
  for (const section of await sections.all()) {
    const heading = await section.getByRole("heading", { level: 2 }).boundingBox();
    const body = await section.locator(":scope > p, :scope > ul").boundingBox();
    expect(heading).not.toBeNull();
    expect(body).not.toBeNull();
    expect(Math.abs(heading!.x - title!.x), "section headings share the title column").toBeLessThan(
      1
    );
    expect(body!.width, "body text remains readable").toBeLessThanOrEqual(780);
    if (columns) {
      expect(Math.abs(body!.x - overview!.x), "body aligns with the overview").toBeLessThan(1);
      expect(Math.abs(body!.y - heading!.y), "heading and body start together").toBeLessThan(1);
    } else {
      expect(body!.y).toBeGreaterThanOrEqual(heading!.y + heading!.height + 8);
      expect(Math.abs(body!.x - heading!.x)).toBeLessThan(1);
    }
    expect(
      await section.evaluate((element) => element.firstElementChild?.tagName),
      "headings precede their content in reading order"
    ).toBe("H2");
  }

  const gallery = page.locator('section[class*="gallery"]');
  if (await gallery.count()) {
    const galleryBounds = await gallery.first().boundingBox();
    const storyBounds = await story.boundingBox();
    expect(galleryBounds!.y).toBeGreaterThanOrEqual(storyBounds!.y + storyBounds!.height);
    if (columns) {
      expect(Math.abs(galleryBounds!.x - storyBounds!.x)).toBeLessThan(1);
      expect(Math.abs(galleryBounds!.width - storyBounds!.width)).toBeLessThan(1);
    }
  }
}

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
});

for (const language of ["ru", "en"]) {
  for (const story of stories) {
    for (const width of [1440, 390]) {
      test(`${language}/${story} keeps a balanced, readable layout at ${width}px`, async ({
        page,
      }) => {
        await openStory(page, `/${language}/${story}`, width);
        await expectContentFits(page);
        await expectStoryLayout(page, width > 1024);
      });
    }
  }
}

for (const width of [320, 768, 1024, 1025, 1200]) {
  for (const language of ["ru", "en"]) {
    test(`long ${language} company names remain intact at ${width}px`, async ({ page }) => {
      await openStory(page, `/${language}/work/namex`, width);
      await expectContentFits(page);
      await expectStoryLayout(page, width > 1024);
      if (width > 640 && width <= 1024) {
        const story = await page.locator('[class*="detailContent"]').boundingBox();
        expect(Math.abs(story!.x - (width - story!.width) / 2)).toBeLessThan(1);
      }
    });
  }
}
