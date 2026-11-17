import { expect, test } from "@playwright/test";

for (const blockedWrite of ["ignore", "throw"] as const) {
  test(`keeps the selected theme for this visit when cookie writes ${blockedWrite}`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "theme", value: "light", url: baseURL! },
      { name: "cookie_notice_closed", value: "1", url: baseURL! },
    ]);
    await page.addInitScript((mode) => {
      const cookie = Object.getOwnPropertyDescriptor(Document.prototype, "cookie")!;
      Object.defineProperty(document, "cookie", {
        configurable: true,
        get: () => cookie.get!.call(document),
        set: (value: string) => {
          if (value.startsWith("theme=")) {
            if (mode === "throw") throw new DOMException("Storage is blocked", "SecurityError");
            return;
          }
          cookie.set!.call(document, value);
        },
      });
    }, blockedWrite);
    await page.goto("/en/settings");
    const dark = page.locator('[data-theme-choice="dark"]');
    await dark.click();
    await expect(dark).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.locator('nav a[href="/en/work"]').click();
    await expect(page).toHaveURL(/\/en\/work$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.locator('header a[lang="ru"]').click();
    await expect(page).toHaveURL(/\/ru\/work$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.locator('nav a[href="/ru/settings"]').click();
    await expect(dark).toHaveAttribute("aria-pressed", "true");

    // System must replace the in-memory choice even while an old cookie remains.
    await page.emulateMedia({ colorScheme: "dark" });
    await page.locator('[data-theme-choice="system"]').click();
    await expect(page.locator('[data-theme-choice="system"]')).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect((await context.cookies()).find(({ name }) => name === "theme")?.value).toBe("light");
  });
}

test("reconciles a system theme change between initial paint and subscription", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const originalMatchMedia = window.matchMedia.bind(window);
    let changed = false;
    window.matchMedia = (query) => {
      const media = originalMatchMedia(query);
      if (query !== "(prefers-color-scheme: dark)") return media;
      Object.defineProperty(media, "matches", { get: () => !changed });
      const subscribe = media.addEventListener.bind(media);
      media.addEventListener = ((
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
      ) => {
        if (type === "change" && !changed) {
          // Change before the first listener exists: there is no event to replay.
          changed = true;
          document.documentElement.dataset.themeSubscriptionObserved = "true";
        }
        subscribe(type, listener, options);
      }) as MediaQueryList["addEventListener"];
      return media;
    };
  });
  await page.goto("/en/settings");
  await expect(page.locator("html")).toHaveAttribute("data-theme-subscription-observed", "true");
  await expect(page.locator('[data-theme-choice="system"]')).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  expect(await page.evaluate(() => matchMedia("(prefers-color-scheme: dark)").matches)).toBe(false);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 250, 248)");
});
