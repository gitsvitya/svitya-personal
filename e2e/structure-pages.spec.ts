import { expect, test, type Locator, type Page } from "@playwright/test";

async function openPage(page: Page, path: string, width: number) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    width
  );
}

async function bounds(locator: Locator) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return box!;
}

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
});

for (const language of ["ru", "en"]) {
  for (const width of [1440, 1024, 390, 320]) {
    test(`about ${language} has aligned content and a readable order at ${width}px`, async ({
      page,
    }) => {
      await openPage(page, `/${language}/about`, width);
      const about = page.locator("#about");
      const portrait = await bounds(about.getByRole("img"));
      const title = await bounds(about.getByRole("heading", { level: 1 }));
      const subtitle = await bounds(about.locator('[class*="subheader"]'));
      const description = await bounds(about.locator('[class*="paragraph"]'));
      const overview = await bounds(about.locator('[class*="overview"]'));
      const actions = await bounds(about.locator('[class*="actions"]'));
      const contactBody = await bounds(about.locator('[class*="contactBody"]'));
      const contact = await bounds(about.locator('a[href="https://t.me/vstrokov"]'));
      expect(Math.abs(title.x - subtitle.x)).toBeLessThan(1);
      expect(Math.abs(title.x - description.x)).toBeLessThan(1);
      expect(Math.abs(title.x - actions.x)).toBeLessThan(1);
      expect(subtitle.y).toBeGreaterThanOrEqual(title.y + title.height + 8);
      expect(description.y).toBeGreaterThanOrEqual(subtitle.y + subtitle.height + 20);
      expect(actions.y).toBeGreaterThanOrEqual(description.y + description.height + 20);
      expect(description.width).toBeLessThanOrEqual(780);
      if (width > 1024) {
        expect(title.x).toBeGreaterThan(portrait.x + portrait.width + 20);
        expect(
          Math.abs(overview.y + overview.height / 2 - (portrait.y + portrait.height / 2))
        ).toBeLessThan(1);
      } else {
        expect(title.y).toBeGreaterThanOrEqual(portrait.y + portrait.height + 20);
        expect(Math.abs(title.x - portrait.x)).toBeLessThan(1);
      }
      expect(contactBody.y).toBeGreaterThan(
        Math.max(portrait.y + portrait.height, overview.y + overview.height)
      );
      if (width > 768) {
        expect(contact.x).toBeGreaterThanOrEqual(contactBody.x + contactBody.width + 20);
        const contactRow = await bounds(about.locator('[class*="contactBody"]').locator(".."));
        expect(Math.abs(contact.x + contact.width - contactRow.x - contactRow.width)).toBeLessThan(
          1
        );
        expect(
          Math.abs(contact.y + contact.height / 2 - (contactBody.y + contactBody.height / 2))
        ).toBeLessThan(1);
      } else {
        expect(contact.y).toBeGreaterThanOrEqual(contactBody.y + contactBody.height + 16);
        expect(Math.abs(contact.x - contactBody.x)).toBeLessThan(1);
      }
      const links = about.getByRole("link");
      await expect(links).toHaveCount(3);
      for (const link of await links.all()) {
        const box = await bounds(link);
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
      }
    });

    test(`settings ${language} stays centered and usable at ${width}px`, async ({ page }) => {
      await openPage(page, `/${language}/settings`, width);
      const settings = page.locator("#settings");
      const rows = settings.getByRole("region");
      const panel = await bounds(settings.locator('[class*="settings"]'));
      const title = await bounds(settings.getByRole("heading", { level: 1 }));
      expect(Math.abs(panel.x - (width - panel.width) / 2)).toBeLessThan(1);
      expect(Math.abs(title.x - panel.x)).toBeLessThan(1);
      expect(panel.width).toBeLessThanOrEqual(820);
      const controlXs: number[] = [];
      for (const row of await rows.all()) {
        const heading = await bounds(row.getByRole("heading", { level: 2 }));
        const control = await bounds(row.locator('[role="group"], :scope > button').first());
        controlXs.push(control.x);
        if (width > 768) {
          expect(control.x).toBeGreaterThanOrEqual(heading.x + heading.width + 20);
          expect(Math.abs(control.y - heading.y)).toBeLessThan(1);
        } else {
          expect(control.y).toBeGreaterThanOrEqual(heading.y + heading.height + 8);
          expect(Math.abs(control.x - heading.x)).toBeLessThan(1);
        }
        for (const button of await row.getByRole("button").all()) {
          expect((await bounds(button)).height).toBeGreaterThanOrEqual(44);
        }
      }
      expect(Math.max(...controlXs) - Math.min(...controlXs)).toBeLessThan(1);
      const theme = await bounds(settings.getByRole("group").nth(1));
      const hint = await bounds(settings.locator("#theme-hint"));
      expect(Math.abs(hint.x - theme.x)).toBeLessThan(1);
      expect(hint.y).toBeGreaterThanOrEqual(theme.y + theme.height + 8);
    });

    test(`404 ${language} is a compact centered message at ${width}px`, async ({ page }) => {
      await openPage(page, `/${language}/work/missing`, width);
      const section = page.locator("main section");
      const inset = await section.evaluate((element) => {
        const box = element.getBoundingClientRect();
        const css = getComputedStyle(element);
        return {
          x: box.x + parseFloat(css.paddingLeft),
          width: box.width - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight),
        };
      });
      const title = await bounds(section.getByRole("heading", { level: 1 }));
      expect(inset.width).toBeLessThanOrEqual(640);
      expect(Math.abs(inset.x - (width - inset.width) / 2)).toBeLessThan(1);
      expect(Math.abs(title.x - inset.x)).toBeLessThan(1);
      await expect(section.getByRole("link")).toHaveAttribute("href", `/${language}/about`);
    });
  }

  for (const path of ["activities/strokeoff", "projects/venivi"]) {
    test(`${language}/${path} centers two materials without enlarging previews`, async ({
      page,
    }) => {
      await openPage(page, `/${language}/work/namex`, 1440);
      const reference = await bounds(page.locator('[class*="previewFrame"]').first());
      await openPage(page, `/${language}/${path}`, 1440);
      const frames = page.locator('[class*="previewFrame"]');
      await expect(frames).toHaveCount(2);
      const first = await bounds(frames.first());
      const last = await bounds(frames.last());
      expect(Math.abs(first.width - reference.width)).toBeLessThan(1);
      expect(Math.abs(first.width - last.width)).toBeLessThan(1);
      expect(first.height).toBe(reference.height);
      expect(last.height).toBe(reference.height);
      expect(Math.abs(first.x - (1440 - last.x - last.width))).toBeLessThan(1);
      expect(Math.abs(first.y - last.y)).toBeLessThan(1);
    });
  }

  test(`${language} case navigation follows the story columns`, async ({ page }) => {
    await openPage(page, `/${language}/work/namex`, 1440);
    const story = page.locator('[class*="detailContent"]');
    const identity = await bounds(story.locator('[class*="identityColumn"]'));
    const overview = await bounds(story.locator('[class*="overview"]'));
    const nav = page.getByRole("navigation", {
      name: language === "ru" ? "Другие истории" : "More stories",
    });
    const previous = await bounds(nav.getByRole("link").first());
    const next = await bounds(nav.getByRole("link").last());
    expect(Math.abs(previous.x - identity.x)).toBeLessThan(1);
    expect(previous.width).toBeLessThan(identity.width);
    expect(Math.abs(next.x - overview.x)).toBeLessThan(1);
    expect(Math.abs(next.width - overview.width)).toBeLessThan(1);
  });

  for (const [path, nextSlug] of [
    ["work/cheminsight", "namex"],
    ["projects/madburglarcat", "mappngo"],
    ["activities/strokeoff", "svityacom"],
  ] as const) {
    for (const width of [1440, 390, 320]) {
      test(`${language}/${path} has one navigation pair above the story at ${width}px in both themes`, async ({
        context,
        page,
        baseURL,
      }) => {
        for (const theme of ["light", "dark"]) {
          await context.addCookies([{ name: "theme", value: theme, url: baseURL! }]);
          await openPage(page, `/${language}/${path}`, width);
          await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
          const section = path.split("/")[0];
          const returns = page.locator(`main a[href="/${language}/${section}"]`);
          await expect(returns).toHaveCount(1);
          await expect(returns).toHaveAccessibleName(
            language === "ru" ? /^Вернуться к разделу: / : /^Back to section: /
          );
          await expect(returns).toHaveCSS("border-width", "1px");
          await expect(returns).toHaveCSS("border-style", "solid");

          const nav = page.getByRole("navigation", {
            name: language === "ru" ? "Другие истории" : "More stories",
          });
          await expect(page.locator("main nav")).toHaveCount(1);
          await expect(nav.getByRole("link")).toHaveCount(2);
          expect(
            await nav.evaluate((element) => element.parentElement?.firstElementChild === element)
          ).toBe(true);
          const nextLink = nav.getByRole("link", {
            name: language === "ru" ? /^Далее: / : /^Next: /,
          });
          const nextHref = `/${language}/${section}/${nextSlug}`;
          await expect(nextLink).toHaveAttribute("href", nextHref);
          await expect(page.locator(`main a[href="${nextHref}"]`)).toHaveCount(1);
          await expect(nav).toBeInViewport({ ratio: 1 });
          const navBounds = await bounds(nav);
          const back = await bounds(returns);
          const next = await bounds(nextLink);
          const story = await bounds(page.locator('[class*="detailContent"]'));
          expect(navBounds.y + navBounds.height).toBeLessThanOrEqual(story.y);
          expect(back.height).toBeGreaterThanOrEqual(44);
          expect(next.height).toBeGreaterThanOrEqual(44);
          const overflowing = await nav.locator("a, a span").evaluateAll((elements) =>
            elements
              .filter((element) => {
                const container = element.closest("nav")!.getBoundingClientRect();
                const rect = element.getBoundingClientRect();
                return (
                  rect.left < container.left - 1 ||
                  rect.right > container.right + 1 ||
                  rect.top < container.top - 1 ||
                  rect.bottom > container.bottom + 1
                );
              })
              .map((element) => element.textContent)
          );
          expect(overflowing, `${theme} navigation labels fit at ${width}px`).toEqual([]);
          if (width > 1024) {
            const identity = await bounds(page.locator('[class*="identityColumn"]'));
            expect(back.width).toBeLessThan(identity.width);
          } else {
            expect(back.width).toBeLessThan(navBounds.width);
            expect(Math.abs(next.width - navBounds.width)).toBeLessThan(1);
            expect(next.y).toBeGreaterThanOrEqual(back.y + back.height + 12);
          }
        }
      });
    }
  }
}
