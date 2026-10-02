import { expect, test, type Locator } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function interactiveContrast(card: Locator) {
  return card.evaluate((element) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d")!;
    const rgb = (color: string) => {
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3);
    };
    const luminance = (channels: number[]) => {
      const linear = channels.map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
    };
    const cta = element.querySelector("div > span:last-child")!;
    const foreground = rgb(getComputedStyle(cta).color);
    const background = rgb(getComputedStyle(element).backgroundColor);
    const accent = rgb(getComputedStyle(document.documentElement).getPropertyValue("--accent"));
    const light = Math.max(luminance(foreground), luminance(background));
    const dark = Math.min(luminance(foreground), luminance(background));
    return {
      isAccented: foreground.every((channel, index) => channel === accent[index]),
      ratio: (light + 0.05) / (dark + 0.05),
    };
  });
}

test("keeps focused footer links above the cookie banner as its height changes", async ({
  context,
  page,
}) => {
  await context.clearCookies();
  await page.goto("/en/about");
  const banner = page.getByRole("region", { name: "Analytics cookie settings" });
  await expect(banner).toBeVisible();
  await page.evaluate(() => document.fonts.ready);

  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        banner.evaluate((element) => {
          const reserved = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--cookie-banner-space")
          );
          return reserved - element.getBoundingClientRect().height;
        })
      )
      .toBeGreaterThanOrEqual(24);
    const email = page.locator('footer a[href^="mailto:"]');
    await email.focus();
    await expect(email).toBeFocused();
    await expect
      .poll(() =>
        email.evaluate((element) => {
          const link = element.getBoundingClientRect();
          const region = document.querySelector('[aria-describedby="cookie-consent-description"]')!;
          const overlay = region.getBoundingClientRect();
          const hit = document.elementFromPoint(link.x + link.width / 2, link.y + link.height / 2);
          return (
            link.top >= 0 && link.bottom + 6 <= overlay.top && hit !== null && element.contains(hit)
          );
        })
      )
      .toBe(true);
  }

  await banner.getByRole("button", { name: "Essential only" }).click();
  await expect(banner).toHaveCount(0);
  await expect(page.locator("html")).toHaveCSS("scroll-padding-bottom", "0px");
  expect(
    await page.evaluate(() =>
      document.documentElement.style.getPropertyValue("--cookie-banner-space")
    )
  ).toBe("");
});

test("returns menu focus on Escape without moving focus from the page", async ({
  context,
  page,
  baseURL,
}) => {
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/about");
  const menu = page.getByRole("button", { name: "Sections" });
  await menu.click();
  await page.locator('nav a[href="/en/work"]').focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();

  await menu.click();
  const heading = page.locator("main h1");
  await heading.evaluate((element) => element.setAttribute("tabindex", "-1"));
  await heading.focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(heading).toBeFocused();
});

for (const width of [320, 961, 1280]) {
  test(`fits all card content with WCAG text spacing at ${width}px`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
    await page.setViewportSize({ width, height: 900 });
    for (const language of ["ru", "en"]) {
      for (const section of ["work", "projects", "activities"]) {
        const path = `/${language}/${section}`;
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        await page.addStyleTag({
          content:
            "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }",
        });
        const overflow = await page.locator(`main a[href^="${path}/"]`).evaluateAll((cards) =>
          cards.flatMap((card) => {
            const bounds = card.getBoundingClientRect();
            return [...card.querySelectorAll("span, img")]
              .filter((element) => {
                const content = element.getBoundingClientRect();
                return (
                  content.left < bounds.left - 1 ||
                  content.right > bounds.right + 1 ||
                  content.top < bounds.top - 1 ||
                  content.bottom > bounds.bottom + 1
                );
              })
              .map((element) => `${card.getAttribute("href")}: ${element.textContent}`);
          })
        );
        expect(overflow, path).toEqual([]);
      }
    }
  });
}

for (const theme of ["light", "dark"]) {
  test(`keeps hovered and focused card text readable in the ${theme} theme`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "analytics_consent", value: "denied", url: baseURL! },
      { name: "theme", value: theme, url: baseURL! },
    ]);
    await page.goto("/en/work");
    const card = page.locator('main a[href="/en/work/cheminsight"]');
    await card.hover();
    await expect.poll(async () => (await interactiveContrast(card)).isAccented).toBe(true);
    expect((await interactiveContrast(card)).ratio).toBeGreaterThanOrEqual(4.5);
    await page.mouse.move(0, 0);
    await card.focus();
    await expect(card).toBeFocused();
    await expect.poll(async () => (await interactiveContrast(card)).isAccented).toBe(true);
    expect((await interactiveContrast(card)).ratio).toBeGreaterThanOrEqual(4.5);
  });
}

test("downloads materials and returns to the section when application scripts fail", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route(/\.js(?:\?|$)/, (route) => route.abort());
  for (const language of ["ru", "en"]) {
    const detail = `/${language}/work/cheminsight`;
    await page.goto(detail);
    const materials = page.locator('main a[download][href^="/materials/"]');
    await expect(materials).toHaveCount(7);
    const downloadPromise = page.waitForEvent("download");
    await materials.first().click();
    const download = await downloadPromise;
    const file = await readFile((await download.path())!);
    expect(file.subarray(0, 5).toString()).toBe("%PDF-");
    await download.delete();
    await expect(page).toHaveURL(detail);

    await page.locator(`main a[href="/${language}/work"]`).click();
    await expect(page).toHaveURL(`/${language}/work`);
    await expect(page.locator("main h1")).toBeVisible();
  }
});

test("returns from a detail page without reloading or adding browser history", async ({
  context,
  page,
  baseURL,
}) => {
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
  await page.goto("/en/work");
  await page.locator('main a[href="/en/work/cheminsight"]').click();
  await expect(page).toHaveURL("/en/work/cheminsight");
  await expect(page.locator("main")).toHaveAttribute("aria-busy", "false");
  const historyLength = await page.evaluate(() => {
    document.body.dataset.backNavigationSentinel = "present";
    return history.length;
  });
  await page.locator('main a[href="/en/work"]').click();
  await expect(page).toHaveURL("/en/work");
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
  await expect(page.locator("body")).toHaveAttribute("data-back-navigation-sentinel", "present");
});

test("does not intercept modified material link clicks", async ({ page }) => {
  await page.goto("/en/work/thomsonreuters");
  await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
  const material = page.locator('main a[href^="https://www.reuters.com/"]');
  await expect(material).toHaveAttribute("target", "_blank");
  for (const modifier of ["ctrlKey", "metaKey", "shiftKey", "altKey"]) {
    await material.evaluate((link) => {
      link.removeAttribute("data-click-canceled");
      // Observe the event after React, then suppress the external request in the test.
      document.addEventListener(
        "click",
        (event) => {
          link.setAttribute("data-click-canceled", String(event.defaultPrevented));
          event.preventDefault();
        },
        { once: true }
      );
    });
    await material.dispatchEvent("click", { bubbles: true, cancelable: true, [modifier]: true });
    await expect(material).toHaveAttribute("data-click-canceled", "false");
  }
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL("/en/work/thomsonreuters");
});

test("keeps the narrow modal named without a visible material heading", async ({
  context,
  page,
  baseURL,
}) => {
  await context.addCookies([{ name: "analytics_consent", value: "denied", url: baseURL! }]);
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/en/work/cheminsight");
  await page.getByRole("link", { name: "ChemInsight: Polyethylene", exact: true }).click();
  const dialog = page.getByRole("dialog");
  for (const title of ["Polyethylene", "Polypropylene"]) {
    const heading = dialog.getByRole("heading", { name: title, exact: true });
    await expect(dialog).toHaveAccessibleName(title);
    const bounds = (await heading.boundingBox())!;
    expect(bounds.height).toBe(1);
    expect(bounds.width).toBe(1);
    await expect(heading).toHaveCSS("clip-path", "inset(50%)");
    if (title === "Polyethylene") {
      await dialog.getByRole("button", { name: "Next material" }).click();
    }
  }
});
