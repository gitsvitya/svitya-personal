import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "../src/content/ui-text";
import { formatDownloadSize, getDownloadFile } from "../src/utils/downloads";

for (const language of ["ru", "en"] as const) {
  const text = getTranslations(language).detail;
  for (const material of [
    {
      company: "mappngo",
      fileSrc: `/materials/projects/mappngo/final-test-screens${language === "en" ? "-en" : ""}.pdf`,
    },
    { company: "madburglarcat", fileSrc: "/materials/projects/madburglarcat/catalog.pdf" },
  ]) {
    test(`downloads optimized and original ${language} ${material.company} PDFs with correct sizes and names`, async ({
      context,
      page,
      request,
      baseURL,
    }, testInfo) => {
      await context.addCookies([{ name: "cookie_notice_closed", value: "1", url: baseURL! }]);
      await page.goto(`/${language}/projects/${material.company}`);
      await page.locator(`main a[href="${material.fileSrc}"]`).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toHaveCSS("opacity", "1");
      const optimized = getDownloadFile(material.fileSrc);
      const originalSrc = optimized.originalSrc!;
      const original = getDownloadFile(originalSrc);
      expect(optimized.sizeBytes).toBeLessThan(original.sizeBytes);

      for (const [href, file, label] of [
        [material.fileSrc, optimized, text.download],
        [originalSrc, original, text.downloadOriginal],
      ] as const) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        const size = formatDownloadSize(file.sizeBytes, text.fileSize);
        await expect(link).toHaveAttribute("href", href);
        await expect(link).toHaveAttribute("download", file.filename);
        await expect(link).toHaveAccessibleDescription(size);
        await expect(link).toContainText(size);
        const response = await request.head(href);
        expect(response.status()).toBe(200);
        expect(response.headers()["content-type"]).toContain("application/pdf");
        expect(response.headers()["content-disposition"]).toBe(
          `inline; filename*=UTF-8''${encodeURIComponent(file.filename)}`
        );
        const downloadPromise = page.waitForEvent("download");
        await link.click();
        const download = await downloadPromise;
        expect(download.suggestedFilename().normalize("NFC")).toBe(file.filename);
        const downloaded = await readFile((await download.path())!);
        const source = await readFile(join(process.cwd(), "public", href));
        expect(downloaded.length).toBe(file.sizeBytes);
        expect(downloaded.subarray(0, 5).toString()).toBe("%PDF-");
        const checksum = createHash("sha256").update(downloaded).digest("hex");
        expect(checksum).toBe(createHash("sha256").update(source).digest("hex"));
        if (file.sha256) expect(checksum).toBe(file.sha256);
        await download.delete();
      }

      for (const theme of ["light", "dark"]) {
        await page.locator("html").evaluate((element, value) => {
          element.setAttribute("data-theme", value);
        }, theme);
        for (const width of [1280, 320]) {
          await page.setViewportSize({ width, height: width === 320 ? 568 : 900 });
          for (const label of [text.download, text.downloadOriginal]) {
            const link = dialog.getByRole("link", { name: label, exact: true });
            await link.focus();
            await expect(link).toBeInViewport({ ratio: 1 });
          }
          expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
            false
          );
          if (testInfo.project.name === "chromium") {
            await dialog.screenshot({
              path: testInfo.outputPath(`downloads-${language}-${theme}-${width}.png`),
            });
          }
        }
      }
    });
  }
}
