import { expect, test } from "@playwright/test";

for (const pathname of ["/ru/not-a-section", "/ru/work/not-a-company", "/not-a-real-page"]) {
  test(`leaves navigation unselected and preserves the 404 address for ${pathname}`, async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "lang", value: "ru", url: baseURL! },
      { name: "cookie_notice_closed", value: "1", url: baseURL! },
    ]);
    const response = await page.goto(pathname);
    expect(response?.status()).toBe(404);
    await expect(page.locator("main h1")).toHaveText("Страница не найдена");
    await expect(page.locator('nav a[aria-current="page"]')).toHaveCount(0);
    const english = page.locator('header a[lang="en"]');
    const englishPath = pathname.startsWith("/ru/")
      ? pathname.replace(/^\/ru\//, "/en/")
      : `/en${pathname}`;
    await expect(english).toHaveAttribute("href", englishPath);
    await english.click();
    await expect(page).toHaveURL(englishPath);
    await expect(page.locator("main h1")).toHaveText("Page not found");
    await expect(page.locator('nav a[aria-current="page"]')).toHaveCount(0);
    await page.locator('main a[href="/en/about"]').click();
    await expect(page).toHaveURL("/en/about");
    await expect(page.locator('nav a[href="/en/about"]')).toHaveAttribute("aria-current", "page");
  });
}

test("leaves 404 navigation unselected in the server HTML without application scripts", async ({
  page,
}) => {
  await page.route(/\.js(?:\?|$)/, (route) => route.abort());
  await page.goto("/en/work/not-a-company");
  await expect(page.locator("main h1")).toHaveText("Page not found");
  await expect(page.locator('nav a[aria-current="page"]')).toHaveCount(0);
});
