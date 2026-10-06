import { expect, test } from "@playwright/test";

const origin = "http://127.0.0.1:3100";

test("serves the correct document language before hydration on every portfolio route", async ({
  request,
}) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]!).pathname
  );
  expect(paths).toHaveLength(30);
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(await response.text(), path).toMatch(
      new RegExp(`<html[^>]+lang="${path.split("/")[1]}"`)
    );
  }
});

test("applies the saved theme and displays fallback text with application scripts and fonts blocked", async ({
  context,
  page,
}) => {
  await context.addCookies([{ name: "theme", value: "dark", url: origin }]);
  await page.emulateMedia({ colorScheme: "light" });
  await page.route(/\.(?:js|woff2?)(?:\?|$)/, (route) => route.abort());
  await page.goto("/ru/about", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(12, 17, 26)");
  await expect(page.locator("main h1")).toBeVisible();
  const displays = await page.evaluate(() =>
    [...document.fonts]
      .filter((font) => !font.family.includes("Fallback"))
      .map((font) => font.display)
  );
  expect(displays.length).toBeGreaterThan(0);
  expect(displays.every((display) => display === "swap")).toBe(true);
});

test("changes locale without reloading the document or losing a saved theme", async ({
  context,
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await context.addCookies([
    { name: "theme", value: "dark", url: origin },
    { name: "cookie_notice_closed", value: "1", url: origin },
  ]);
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en/settings");
  await page.evaluate(() => {
    const browserWindow = window as Window & {
      localeSentinel?: boolean;
      themeScriptInsertions?: number;
    };
    browserWindow.localeSentinel = true;
    browserWindow.themeScriptInsertions = 0;
    // React only warns in development. Observe script insertions as well so
    // the same regression is caught against the production build in CI.
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (
            node instanceof Element &&
            (node.matches("#theme-init") || node.querySelector("#theme-init"))
          ) {
            browserWindow.themeScriptInsertions! += 1;
          }
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  });
  for (const language of ["ru", "en"]) {
    await page.locator("#language-toggle").click();
    await expect(page).toHaveURL(new RegExp(`/${language}/settings$`));
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(
      await page.evaluate(() => (window as Window & { localeSentinel?: boolean }).localeSentinel)
    ).toBe(true);
  }
  expect(
    await page.evaluate(
      () => (window as Window & { themeScriptInsertions?: number }).themeScriptInsertions
    )
  ).toBe(0);
  expect(errors).toEqual([]);
});

for (const width of [1280, 390]) {
  test(`keeps the current page and menu together while navigation loads at ${width}px`, async ({
    context,
    page,
  }) => {
    await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: origin }]);
    await page.setViewportSize({ width, height: 900 });
    let release = () => {};
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route("**/en/work?*", async (route) => {
      await gate;
      await route.continue();
    });
    try {
      await page.goto("/en/about");
      const originalHeading = await page.locator("main h1").textContent();
      await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
      const menu = page.getByRole("button", { name: "Sections" });
      if (width < 769) await menu.click();
      await page.locator('nav a[href="/en/work"]').click();
      await expect(page.locator("main")).toHaveAttribute("aria-busy", "true");
      await expect(page.locator("main h1")).toHaveText(originalHeading!);
      await expect(page.locator("main > div")).toHaveCSS("opacity", "1");
      await expect(page.locator('nav a[href="/en/about"]')).toHaveAttribute("aria-current", "page");
      if (width < 769) await expect(menu).toHaveAttribute("aria-expanded", "true");
      release();
      await expect(page).toHaveURL(/\/en\/work$/);
      await expect(page.locator('nav a[href="/en/work"]')).toHaveAttribute("aria-current", "page");
      await expect(page.locator("main h1")).not.toHaveText(originalHeading!);
      await expect(page.locator("main > div")).toHaveCSS("animation-duration", "0.3s");
      const underlineDuration = await page
        .locator('nav a[aria-current="page"]')
        .evaluate((element) => getComputedStyle(element, "::after").transitionDuration);
      expect(underlineDuration.split(",").every((value) => value.trim() === "0.3s")).toBe(true);
      if (width < 769) {
        await expect(menu).toHaveAttribute("aria-expanded", "false");
        await page.goBack();
        await expect(page).toHaveURL(/\/en\/about$/);
        await expect(menu).toHaveAttribute("aria-expanded", "false");
      }
    } finally {
      release();
    }
  });
}

for (const width of [320, 1280]) {
  test(`keeps gallery arrows fixed beside the modal as text grows at ${width}px`, async ({
    context,
    page,
    request,
  }) => {
    await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: origin }]);
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/ru/work/cheminsight", { waitUntil: "domcontentloaded" });
    const trigger = page.getByRole("link", { name: "ХимИнсайт: Полиэтилен", exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Закрыть окно" })).toBeFocused();
    await page.evaluate(() => document.fonts.ready);
    const materialImage = dialog.getByRole("img");
    await expect
      .poll(() =>
        materialImage.evaluate(
          (image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0
        )
      )
      .toBe(true);
    const image = await materialImage.boundingBox();
    const next = dialog.getByRole("button", { name: "Следующий материал" });
    const previous = dialog.getByRole("button", { name: "Предыдущий материал" });
    const modal = (await dialog.boundingBox())!;
    const controls = [(await previous.boundingBox())!, (await next.boundingBox())!] as const;
    for (const control of controls) {
      expect(Math.abs(control.y + control.height / 2 - (modal.y + modal.height / 2))).toBeLessThan(
        1
      );
      expect(control.x).toBeGreaterThanOrEqual(modal.x);
      expect(control.x + control.width).toBeLessThanOrEqual(modal.x + modal.width);
    }
    expect(controls[0].x + controls[0].width).toBeLessThanOrEqual(image!.x);
    expect(controls[1].x).toBeGreaterThanOrEqual(image!.x + image!.width);
    expect(Math.abs(controls[0].x + controls[0].width / 2 - (modal.x + image!.x) / 2)).toBeLessThan(
      1
    );
    expect(
      Math.abs(
        controls[1].x +
          controls[1].width / 2 -
          (modal.x + modal.width + image!.x + image!.width) / 2
      )
    ).toBeLessThan(1);
    await expect(dialog.locator('[aria-live="polite"]')).toHaveText("1 из 7");
    const download = dialog.getByRole("link", { name: "Скачать", exact: true });
    const pdf = await request.get((await download.getAttribute("href"))!);
    expect(pdf.status()).toBe(200);
    expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
    await dialog.locator("p").evaluate((description) => {
      description.textContent = `${description.textContent} `.repeat(20);
    });
    expect((await dialog.boundingBox())!.height).toBeGreaterThan(modal.height);
    for (const [button, before] of [
      [previous, controls[0]],
      [next, controls[1]],
    ] as const) {
      const after = (await button.boundingBox())!;
      expect(Math.abs(after.x - before.x)).toBeLessThan(1);
      expect(Math.abs(after.y - before.y)).toBeLessThan(1);
      await expect(button).toBeVisible();
    }
    await next.click();
    await expect(dialog).toHaveAccessibleName("Полипропилен");
    await expect(dialog.locator('[aria-live="polite"]')).toHaveText("2 из 7");
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
}

test("renders a localized themed 404 and a landscape social preview", async ({
  context,
  page,
  request,
}) => {
  await context.addCookies([{ name: "theme", value: "dark", url: origin }]);
  const response = await page.goto("/ru/work/missing");
  expect(response?.status()).toBe(404);
  await expect(page.locator("main h1")).toHaveText("Страница не найдена");
  await expect(page.locator('main a[href="/ru/about"]')).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const preview = await request.get("/og/ru/work/cheminsight");
  expect(preview.status()).toBe(200);
  expect(preview.headers()["content-type"]).toContain("image/png");
  const png = await preview.body();
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
});

test("honors reduced motion on routes and navigation", async ({ context, page }) => {
  await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: origin }]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/about");
  await page.locator('nav a[href="/en/work"]').click();
  await expect(page).toHaveURL(/\/en\/work$/);
  const durations = await page.evaluate(() => ({
    content: parseFloat(getComputedStyle(document.querySelector("main > div")!).animationDuration),
    menu: parseFloat(
      getComputedStyle(document.querySelector('nav a[aria-current="page"]')!, "::after")
        .transitionDuration
    ),
  }));
  expect(durations.content).toBeLessThan(0.001);
  expect(durations.menu).toBeLessThan(0.001);
});

for (const legacyChoice of ["granted", "denied"]) {
  test(`removes analytics and migrates the old ${legacyChoice} choice on a public hostname`, async ({
    context,
    page,
  }) => {
    const testOrigin = "http://review.svitya.test";
    const externalRequests: string[] = [];
    await context.addCookies([
      { name: "analytics_consent", value: legacyChoice, url: testOrigin },
      { name: "_ym_uid", value: "123456789", domain: ".svitya.test", path: "/" },
      { name: "_ym_d", value: "123456789", url: testOrigin },
    ]);
    await context.route("**/*", async (route) => {
      const url = route.request().url();
      if (url.startsWith(`${testOrigin}/`)) {
        const response = await route.fetch({ url: url.replace(testOrigin, origin) });
        await route.fulfill({ response });
      } else {
        externalRequests.push(url);
        await route.abort();
      }
    });
    async function expectNoAnalytics() {
      await expect(page.locator('script[src*="mc.yandex"]')).toHaveCount(0);
      expect(
        await page.evaluate(() => "ym" in window || "__svityaYandexInitialized" in window)
      ).toBe(false);
      expect(externalRequests).toEqual([]);
    }
    try {
      await page.goto(`${testOrigin}/en/about`);
      await expect(page.getByRole("region", { name: "Cookie notice" })).toHaveCount(0);
      await expect
        .poll(
          async () =>
            (await context.cookies(testOrigin)).find(({ name }) => name === "cookie_notice_closed")
              ?.value
        )
        .toBe("1");
      expect(
        (await context.cookies(testOrigin)).filter(
          ({ name }) => name === "analytics_consent" || name.startsWith("_ym_")
        )
      ).toEqual([]);
      await expectNoAnalytics();

      await page.locator('nav a[href="/en/work"]').click();
      await expect(page).toHaveURL(/\/en\/work$/);
      await page.locator('main a[href="/en/work/cheminsight"]').click();
      await expect(page).toHaveURL(/\/en\/work\/cheminsight$/);
      await expectNoAnalytics();
      await page.locator('nav a[href="/en/settings"]').click();
      await expect(page).toHaveURL(/\/en\/settings$/);
      await page.getByRole("button", { name: "Show cookie banner", exact: true }).click();
      const banner = page.getByRole("region", { name: "Cookie notice" });
      await expect(banner.getByRole("button")).toHaveCount(1);
      await banner.getByRole("button", { name: "Close", exact: true }).click();
      await expect(banner).toHaveCount(0);
      await expectNoAnalytics();
      for (const language of ["ru", "en"]) {
        await page.locator("#language-toggle").click();
        await expect(page).toHaveURL(new RegExp(`/${language}/settings$`));
        await expectNoAnalytics();
      }
      await page.goto(`${testOrigin}/en/missing-page`);
      await expect(page.locator("main h1")).toHaveText("Page not found");
      await expectNoAnalytics();
    } finally {
      // Disposal cancels background fetches that may still be loading images.
      await context.unrouteAll({ behavior: "ignoreErrors" });
    }
  });
}
