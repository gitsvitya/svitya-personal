import { expect, test, type Locator } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const materials = [
  {
    type: "document",
    path: "work/cheminsight",
    href: "/materials/work/cheminsight/polyethylene.pdf",
    title: { ru: "Полиэтилен", en: "Polyethylene" },
    active: [true, true, false],
  },
  {
    type: "photo",
    path: "activities/strokeoff",
    href: "/materials/activities/strokeoff/first-batch.pdf",
    title: {
      ru: "Первая партия перцовки",
      en: "First batch of chili-infused vodka",
    },
    active: [true, true, false],
  },
  {
    type: "article",
    path: "work/thomsonreuters",
    href: "/materials/work/thomsonreuters/russian-steel-demand-2017.pdf",
    sourceUrl: "https://www.reuters.com/article/business/-17--idUSKBN1611FE/",
    title: {
      ru: "Металлурги ждут подъёма спроса на сталь в РФ в 17 году на фоне роста экономики",
      en: "Russian steelmakers expect steel demand to rebound in 2017 as economy grows",
    },
    active: [true, true, true],
  },
  {
    type: "website",
    path: "projects/madburglarcat",
    href: "/materials/projects/madburglarcat/catalog.pdf",
    sourceUrl: "https://madburglarcat.ru/catalog",
    title: { ru: "Каталог товаров", en: "Product catalog" },
    active: [true, true, true],
  },
] as const;

const labels = {
  ru: ["Скачать", "Открыть в новом окне", "Перейти по ссылке"],
  en: ["Download", "Open in new window", "Visit link"],
} as const;

const mappngoMaterials = {
  ru: [
    {
      title: "Тестовые экраны",
      file: "final-test-screens.pdf",
      image: "final-test-screens-preview",
      url: undefined,
    },
    {
      title: "Шаблон наклеек",
      file: "souvenir-sticker.pdf",
      image: "souvenir-sticker-preview",
      url: undefined,
    },
    {
      title: "Главная страница сайта",
      file: "homepage-ru.pdf",
      image: "homepage-ru-preview",
      url: "https://www.mappngo.com/",
    },
    {
      title: "FAQ Сайта",
      file: "faq-ru.pdf",
      image: "faq-ru-preview",
      url: "https://www.mappngo.com/faq/",
    },
  ],
  en: [
    {
      title: "Test screens",
      file: "final-test-screens-en.pdf",
      image: "final-test-screens-en-preview",
      url: undefined,
    },
    {
      title: "Sticker template",
      file: "souvenir-sticker.pdf",
      image: "souvenir-sticker-preview",
      url: undefined,
    },
    {
      title: "Website homepage",
      file: "homepage-en.pdf",
      image: "homepage-en-preview",
      url: "https://www.mappngo.com/en/",
    },
    {
      title: "Website FAQ",
      file: "faq-en.pdf",
      image: "faq-en-preview",
      url: "https://www.mappngo.com/en/faq/",
    },
  ],
} as const;

async function measureModalLayout(dialog: Locator) {
  return dialog.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const preview = element.querySelector("img")!.getBoundingClientRect();
    const description = element.querySelector("p")!.getBoundingClientRect();
    const actions = element
      .querySelector(".button-control")!
      .parentElement!.getBoundingClientRect();
    return {
      modalWidth: bounds.width,
      previewWidth: preview.width,
      contentInset: description.left - bounds.left,
      contentWidth: description.width,
      actionsInset: actions.left - bounds.left,
      actionsWidth: actions.width,
    };
  });
}

for (const language of ["ru", "en"] as const) {
  test(`provides four ${language} MappNgo materials with matching images, PDFs and source links`, async ({
    context,
    page,
    baseURL,
  }, testInfo) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    await page.goto(`/${language}/projects/mappngo`);
    const previews = page.locator('main a[href^="/materials/projects/mappngo/"]');
    await expect(previews).toHaveCount(4);
    for (const [index, material] of mappngoMaterials[language].entries()) {
      const preview = previews.nth(index);
      const href = `/materials/projects/mappngo/${material.file}`;
      await expect(preview).toHaveAttribute("href", href);
      await expect(preview.locator("img")).toHaveAttribute("src", new RegExp(material.image));
      await preview.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toHaveAccessibleName(material.title);
      await expect(dialog.locator("img")).toHaveAttribute("src", new RegExp(material.image));
      await expect
        .poll(() =>
          dialog
            .locator("img")
            .evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
        )
        .toBe(true);
      await expect(dialog.locator(".button-control")).toHaveText([...labels[language]]);
      await expect(
        dialog.getByRole("link", { name: labels[language][1], exact: true })
      ).toHaveAttribute("href", href);
      if (material.url) {
        await expect(
          dialog.getByRole("link", { name: labels[language][2], exact: true })
        ).toHaveAttribute("href", material.url);
      } else {
        await expect(
          dialog.getByRole("button", { name: labels[language][2], exact: true })
        ).toBeDisabled();
      }
      const downloadPromise = page.waitForEvent("download");
      await dialog.getByRole("link", { name: labels[language][0], exact: true }).click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toBe(material.file);
      const downloaded = await readFile((await download.path())!);
      const source = await readFile(join(process.cwd(), "public", href));
      expect(downloaded.subarray(0, 5).toString()).toBe("%PDF-");
      expect(createHash("sha256").update(downloaded).digest("hex")).toBe(
        createHash("sha256").update(source).digest("hex")
      );
      await download.delete();
      if (index === 0)
        await dialog.screenshot({
          path: testInfo.outputPath(`mappngo-${language}-test-screens.png`),
        });
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await expect(preview).toBeFocused();
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await previews.first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveCSS("opacity", "1");
    await expect(dialog.locator('[aria-live="polite"]')).toHaveText(
      `1 ${language === "ru" ? "из" : "of"} 4`
    );
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toHaveAccessibleName(mappngoMaterials[language][1].title);
    await page.keyboard.press("ArrowLeft");
    await expect(dialog).toHaveAccessibleName(mappngoMaterials[language][0].title);
    await expect(dialog.locator("img")).toHaveAttribute(
      "src",
      new RegExp(mappngoMaterials[language][0].image)
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
      false
    );
  });

  for (const material of materials) {
    test(`provides usable and inert actions for the ${language} ${material.type} material`, async ({
      context,
      page,
      baseURL,
    }) => {
      await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
      await page.goto(`/${language}/${material.path}`);
      await page.locator(`main a[href="${material.href}"]`).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toHaveCSS("opacity", "1");
      await expect(dialog).toHaveAccessibleName(material.title[language]);
      const actions = dialog.locator(".button-control");
      await expect(actions).toHaveCount(3);
      await expect(actions).toHaveText([...labels[language]]);

      for (const [index, label] of labels[language].entries()) {
        if (material.active[index]) {
          await expect(dialog.getByRole("link", { name: label, exact: true })).toHaveAttribute(
            "href",
            index === 2 && "sourceUrl" in material ? material.sourceUrl : material.href
          );
        } else {
          const disabled = dialog.getByRole("button", { name: label, exact: true });
          await expect(disabled).toBeDisabled();
          const pagesBefore = context.pages().length;
          await disabled.evaluate((element: HTMLButtonElement) => element.click());
          expect(context.pages().length).toBe(pagesBefore);
          await expect(page).toHaveURL(`/${language}/${material.path}`);

          for (const theme of ["light", "dark"]) {
            await page.locator("html").evaluate((element, value) => {
              element.setAttribute("data-theme", value);
            }, theme);
            await page.mouse.move(0, 0);
            await expect(disabled).toHaveCSS(
              "color",
              theme === "light" ? "rgb(89, 97, 109)" : "rgb(171, 183, 201)"
            );
            const color = await disabled.evaluate((element) => getComputedStyle(element).color);
            await disabled.hover();
            await expect(disabled).toHaveCSS("color", color);
            await expect(disabled).toHaveCSS("border-color", color);
            await expect(disabled).toHaveCSS("cursor", "default");
          }
        }
      }

      const lastAction = dialog.getByRole("link").last();
      await lastAction.focus();
      await page.keyboard.press("Tab");
      const close = dialog.getByRole("button", {
        name: language === "ru" ? "Закрыть модальное окно" : "Close modal window",
      });
      await expect(close).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(lastAction).toBeFocused();

      if (material.active[0]) {
        const downloadLink = dialog.getByRole("link", { name: labels[language][0], exact: true });
        const downloadPromise = page.waitForEvent("download");
        await downloadLink.click();
        const download = await downloadPromise;
        const downloaded = await readFile((await download.path())!);
        const source = await readFile(join(process.cwd(), "public", material.href));
        expect(createHash("sha256").update(downloaded).digest("hex")).toBe(
          createHash("sha256").update(source).digest("hex")
        );
        await expect(page).toHaveURL(`/${language}/${material.path}`);
        await download.delete();

        const openWindow = dialog.getByRole("link", { name: labels[language][1], exact: true });
        await expect(openWindow).toHaveAttribute("target", "_blank");
        await expect(openWindow).toHaveAttribute("rel", "noopener noreferrer");
        await expect(openWindow).not.toHaveAttribute("download");
        if (material.href.endsWith(".png")) {
          const popupPromise = context.waitForEvent("page");
          await openWindow.click();
          const popup = await popupPromise;
          await expect(popup).toHaveURL(material.href);
          await popup.close();
        }
      }
      if ("sourceUrl" in material) {
        await context.route(material.sourceUrl, (route) =>
          route.fulfill({ contentType: "text/html", body: "<h1>External material</h1>" })
        );
        const popupPromise = context.waitForEvent("page");
        await dialog.getByRole("link", { name: labels[language][2], exact: true }).click();
        const popup = await popupPromise;
        await expect(popup).toHaveURL(material.sourceUrl);
        await expect(popup.getByRole("heading", { name: "External material" })).toBeVisible();
        await popup.close();
      }
      await expect(dialog).toHaveAccessibleName(material.title[language]);
    });
  }

  test(`provides all five ${language} Reuters articles with matching PDFs and original links`, async ({
    context,
    page,
    request,
    baseURL,
  }, testInfo) => {
    const articles = [
      ["russian-steel-demand-2017", "https://www.reuters.com/article/business/-17--idUSKBN1611FE/"],
      ["russian-steel-discounts", "https://forbes.kz/news/newsid_139809"],
      ["port-hedland-cyclone-joyce", "https://jp.reuters.com/article/markets/--idUSL8N1P63ZK/"],
      ["moscow-renovation-steel", "https://forbes.kz/news/newsid_146758"],
      [
        "iron-ore-price-forecast-2017",
        "https://www.reuters.com/article/markets/currencies/iron-ore-price-to-average-55t-in-2017-idUSKBN1441B7/",
      ],
    ] as const;
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    await page.goto(`/${language}/work/thomsonreuters`);
    const previews = page.locator('main a[href^="/materials/work/thomsonreuters/"]');
    await expect(previews).toHaveCount(articles.length);
    await previews.first().click();
    const dialog = page.getByRole("dialog");
    const next = dialog.getByRole("button", {
      name: language === "ru" ? "Следующий материал" : "Next material",
      exact: true,
    });
    for (const [index, [slug, sourceUrl]] of articles.entries()) {
      await expect(next).toHaveAttribute("aria-disabled", "false");
      const href = `/materials/work/thomsonreuters/${slug}.pdf`;
      await expect(
        dialog.getByRole("link", { name: labels[language][0], exact: true })
      ).toHaveAttribute("href", href);
      await expect(
        dialog.getByRole("link", { name: labels[language][1], exact: true })
      ).toHaveAttribute("href", href);
      await expect(
        dialog.getByRole("link", { name: labels[language][2], exact: true })
      ).toHaveAttribute("href", sourceUrl);
      await expect(dialog.locator(".button-control")).toHaveCount(3);
      await expect(dialog.getByRole("button", { disabled: true })).toHaveCount(0);
      await expect(dialog.locator('[aria-live="polite"]')).toHaveText(
        `${index + 1} ${language === "ru" ? "из" : "of"} 5`
      );
      await expect
        .poll(() =>
          dialog
            .locator("img")
            .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)
        )
        .toBe(true);
      const pdf = await request.get(href);
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()["content-type"]).toContain("application/pdf");
      expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
      if (index < articles.length - 1) {
        await page.keyboard.press("ArrowRight");
      }
    }
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(previews.first()).toBeFocused();
    await page.locator('section[aria-labelledby="company-materials-title"]').screenshot({
      path: testInfo.outputPath("reuters-materials-gallery.png"),
    });
  });

  test(`provides all five ${language} Mad Burglar Cat materials with PDFs and available source links`, async ({
    context,
    page,
    request,
    baseURL,
  }, testInfo) => {
    const productUrl = "https://madburglarcat.ru/tproduct/384035579442-mbc-ts-x-vsyo-horosho";
    const pages = [
      ["catalog", "https://madburglarcat.ru/catalog"],
      ["everything-is-fine", productUrl],
      ["everything-is-fine-checkout", `${productUrl}#order`],
      ["soldout", "https://madburglarcat.ru/soldout"],
      ["trademark-certificate-1222341", undefined],
    ] as const;
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    await page.goto(`/${language}/projects/madburglarcat`);
    const previews = page.locator('main a[href^="/materials/projects/madburglarcat/"]');
    await expect(previews).toHaveCount(pages.length);
    await previews.first().click();
    const dialog = page.getByRole("dialog");
    for (const [index, [slug, sourceUrl]] of pages.entries()) {
      const href = `/materials/projects/madburglarcat/${slug}.pdf`;
      for (const [actionIndex, label] of labels[language].entries()) {
        const target = actionIndex === 2 ? sourceUrl : href;
        if (target) {
          await expect(dialog.getByRole("link", { name: label, exact: true })).toHaveAttribute(
            "href",
            target
          );
        } else {
          await expect(dialog.getByRole("button", { name: label, exact: true })).toBeDisabled();
        }
      }
      await expect(dialog.locator(".button-control")).toHaveCount(3);
      await expect(dialog.getByRole("button", { disabled: true })).toHaveCount(sourceUrl ? 0 : 1);
      await expect(dialog.locator('[aria-live="polite"]')).toHaveText(
        `${index + 1} ${language === "ru" ? "из" : "of"} ${pages.length}`
      );
      await expect
        .poll(() =>
          dialog
            .locator("img")
            .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)
        )
        .toBe(true);
      const pdf = await request.get(href);
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()["content-type"]).toContain("application/pdf");
      expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
      if (slug === "everything-is-fine-checkout") {
        await expect(dialog.locator("p")).toContainText(language === "ru" ? "СДЭК" : "CDEK");
        await dialog.screenshot({
          path: testInfo.outputPath("madburglarcat-checkout-material.png"),
        });
      }
      if (slug === "soldout") {
        await expect(dialog).toHaveAccessibleName(language === "ru" ? "Солдаут" : "Soldout");
        await expect(dialog.locator("p")).toContainText("SOLD");
        await dialog.screenshot({
          path: testInfo.outputPath("madburglarcat-soldout-material.png"),
        });
      }
      if (slug === "trademark-certificate-1222341") {
        await expect(dialog).toHaveAccessibleName(
          language === "ru" ? "Свидетельство на товарный знак" : "Trademark certificate"
        );
        await expect(dialog.locator("p")).toContainText(
          language === "ru" ? "Роспатента" : "Rospatent"
        );
        const downloadPromise = page.waitForEvent("download");
        await dialog.getByRole("link", { name: labels[language][0], exact: true }).click();
        const download = await downloadPromise;
        const downloaded = await readFile((await download.path())!);
        const source = await readFile(join(process.cwd(), "public", href));
        expect(createHash("sha256").update(downloaded).digest("hex")).toBe(
          createHash("sha256").update(source).digest("hex")
        );
        await download.delete();
        await dialog.screenshot({
          path: testInfo.outputPath("madburglarcat-trademark-material.png"),
        });
        await page.setViewportSize({ width: 320, height: 568 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
          false
        );
        // Move focus off the download link before checking its mobile scroll behavior.
        await dialog
          .getByRole("button", {
            name: language === "ru" ? "Закрыть модальное окно" : "Close modal window",
          })
          .focus();
        await dialog.getByRole("link", { name: labels[language][0], exact: true }).focus();
        await expect(
          dialog.getByRole("link", { name: labels[language][0], exact: true })
        ).toBeInViewport({ ratio: 1 });
        await dialog.screenshot({
          path: testInfo.outputPath("madburglarcat-trademark-mobile.png"),
        });
        await page.setViewportSize({ width: 1280, height: 720 });
      }
      if (index < pages.length - 1) await page.keyboard.press("ArrowRight");
    }
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(previews.first()).toBeFocused();
    await page.locator('section[aria-labelledby="company-materials-title"]').screenshot({
      path: testInfo.outputPath("madburglarcat-materials-gallery.png"),
    });
  });

  test(`uses consistent modal dimensions and one desktop action row for all ${language} materials`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    for (const [width, height] of [
      [1024, 600],
      [1280, 720],
      [1440, 900],
    ] as const) {
      await page.setViewportSize({ width, height });
      let reference: Awaited<ReturnType<typeof measureModalLayout>> | undefined;
      for (const material of materials) {
        await page.goto(`/${language}/${material.path}`);
        await page.evaluate(() => document.fonts.ready);
        await page.locator(`main a[href="${material.href}"]`).click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toHaveCSS("opacity", "1");
        const layout = await measureModalLayout(dialog);
        if (reference) expect(layout, `${material.type} at ${width}×${height}`).toEqual(reference);
        else reference = layout;

        const buttons = await dialog.locator(".button-control").evaluateAll((actions) =>
          actions.map((action) => {
            const bounds = action.getBoundingClientRect();
            return { left: bounds.left, right: bounds.right, top: bounds.top };
          })
        );
        for (const button of buttons) {
          expect(button.top).toBeCloseTo(buttons[0]!.top, 0);
          expect(button.left).toBeGreaterThanOrEqual(0);
          expect(button.right).toBeLessThanOrEqual(width);
        }
        expect(buttons[1]!.left).toBeGreaterThan(buttons[0]!.right);
        expect(buttons[2]!.left).toBeGreaterThan(buttons[1]!.right);
      }
    }
  });

  test(`fits all ${language} material actions on narrow screens`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 568 });
      let reference: Awaited<ReturnType<typeof measureModalLayout>> | undefined;
      for (const material of materials) {
        await page.goto(`/${language}/${material.path}`);
        await page.locator(`main a[href="${material.href}"]`).click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toHaveCSS("opacity", "1");
        await page.evaluate(() => document.fonts.ready);
        const layout = await measureModalLayout(dialog);
        if (reference) expect(layout, `${material.type} at ${width}px`).toEqual(reference);
        else reference = layout;
        const overflowingActions = await dialog.locator(".button-control").evaluateAll((actions) =>
          actions.flatMap((action) => {
            const bounds = action.getBoundingClientRect();
            const label = action.querySelector("span")!.getBoundingClientRect();
            return bounds.left < 0 ||
              bounds.right > innerWidth ||
              label.left < bounds.left ||
              label.right > bounds.right ||
              label.top < bounds.top ||
              label.bottom > bounds.bottom
              ? [action.textContent]
              : [];
          })
        );
        expect(overflowingActions, `${material.type} at ${width}px`).toEqual([]);
        for (const action of await dialog.getByRole("link").all()) {
          await action.focus();
          await expect(action).toBeFocused();
          await expect(action).toBeInViewport({ ratio: 1 });
        }
        await page.keyboard.press("Tab");
        await expect(dialog.getByRole("button", { name: /Закрыть|Close/ })).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(dialog.getByRole("link").last()).toBeFocused();
        await expect(dialog.getByRole("link").last()).toBeInViewport({ ratio: 1 });
      }
    }
  });
}

test("selects matching MappNgo material assets after changing the site language", async ({
  context,
  page,
  baseURL,
}) => {
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
  let currentLanguage = "ru";
  await page.goto("/ru/projects/mappngo");
  for (const language of ["en", "ru"] as const) {
    await page.goto(`/${currentLanguage}/settings`);
    await page.locator("#language-toggle").click();
    await expect(page).toHaveURL(`/${language}/settings`);
    await page.locator(`nav a[href="/${language}/projects"]`).click();
    await page.locator(`main a[href="/${language}/projects/mappngo"]`).click();
    await expect(page).toHaveURL(`/${language}/projects/mappngo`);
    const previews = page.locator('main a[href^="/materials/projects/mappngo/"]');
    await expect(previews).toHaveCount(4);
    for (const [index, material] of mappngoMaterials[language].entries()) {
      await expect(previews.nth(index)).toHaveAttribute(
        "href",
        `/materials/projects/mappngo/${material.file}`
      );
      await expect(previews.nth(index).locator("img")).toHaveAttribute(
        "src",
        new RegExp(material.image)
      );
    }
    await previews.nth(2).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveAccessibleName(mappngoMaterials[language][2].title);
    await expect(
      dialog.getByRole("link", { name: labels[language][2], exact: true })
    ).toHaveAttribute("href", mappngoMaterials[language][2].url);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    currentLanguage = language;
  }
});

test("downloads the matching MappNgo language version when application scripts fail", async ({
  page,
}) => {
  await page.route(/\.js(?:\?|$)/, (route) => route.abort());
  for (const language of ["ru", "en"] as const) {
    await page.goto(`/${language}/projects/mappngo`);
    const previews = page.locator('main a[download][href^="/materials/projects/mappngo/"]');
    await expect(previews).toHaveCount(4);
    for (const [index, material] of mappngoMaterials[language].entries())
      await expect(previews.nth(index)).toHaveAttribute(
        "href",
        `/materials/projects/mappngo/${material.file}`
      );
    const downloadPromise = page.waitForEvent("download");
    await previews.first().click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(mappngoMaterials[language][0].file);
    const downloaded = await readFile((await download.path())!);
    const source = await readFile(
      join(process.cwd(), "public/materials/projects/mappngo", mappngoMaterials[language][0].file)
    );
    expect(createHash("sha256").update(downloaded).digest("hex")).toBe(
      createHash("sha256").update(source).digest("hex")
    );
    await download.delete();
    await expect(page).toHaveURL(`/${language}/projects/mappngo`);
  }
});
