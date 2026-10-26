import { expect, test } from "@playwright/test";

for (const language of ["ru", "en"]) {
  test(`hydrates the ${language} footer after the build year has changed`, async ({ page }) => {
    const nextYear = new Date().getFullYear() + 1;
    await page.clock.setFixedTime(new Date(`${nextYear}-01-01T12:00:00Z`));
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(`/${language}/about`);
    await expect(page.locator("footer > div > span")).toHaveText(String(nextYear));
    await page.locator(`nav a[href="/${language}/work"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${language}/work$`));
    await expect(page.locator("footer > div > span")).toHaveText(String(nextYear));
    expect(errors).toEqual([]);
  });
}
