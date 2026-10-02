import { expect, test } from "@playwright/test";
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
    type: "image",
    path: "activities/strokeoff",
    href: "/materials/activities/strokeoff/first-batch.png",
    title: {
      ru: "Первая партия перцовки Stroke Off",
      en: "The first batch of Stroke Off pepper vodka",
    },
    active: [true, true, false],
  },
  {
    type: "link",
    path: "work/thomsonreuters",
    href: "https://www.reuters.com/article/business/-17--idUSKBN1611FE/",
    title: {
      ru: "АНАЛИЗ-Металлурги ждут подъёма спроса на сталь в РФ в 17 году на фоне роста экономики",
      en: "ANALYSIS — Russian steelmakers expect steel demand to rebound in 2017 as economy grows",
    },
    active: [false, false, true],
  },
] as const;

const labels = {
  ru: ["Скачать", "Открыть в новом окне", "Перейти по ссылке"],
  en: ["Download", "Open in new window", "Visit link"],
} as const;

for (const language of ["ru", "en"] as const) {
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
            material.href
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

      if (material.type !== "link") {
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
        if (material.type === "image") {
          const popupPromise = context.waitForEvent("page");
          await openWindow.click();
          const popup = await popupPromise;
          await expect(popup).toHaveURL(material.href);
          await popup.close();
        }
      } else {
        await context.route(material.href, (route) =>
          route.fulfill({ contentType: "text/html", body: "<h1>External material</h1>" })
        );
        const popupPromise = context.waitForEvent("page");
        await dialog.getByRole("link", { name: labels[language][2], exact: true }).click();
        const popup = await popupPromise;
        await expect(popup).toHaveURL(material.href);
        await expect(popup.getByRole("heading", { name: "External material" })).toBeVisible();
        await popup.close();
      }
      await expect(dialog).toHaveAccessibleName(material.title[language]);
    });
  }

  test(`fits all ${language} material actions on narrow screens`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 568 });
      for (const material of materials) {
        await page.goto(`/${language}/${material.path}`);
        await page.locator(`main a[href="${material.href}"]`).click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toHaveCSS("opacity", "1");
        await page.evaluate(() => document.fonts.ready);
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
