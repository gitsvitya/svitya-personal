import { expect, type Download, type PlaywrightWorkerOptions } from "@playwright/test";

export function expectSuggestedFilename(
  download: Download,
  filename: string,
  browserName: PlaywrightWorkerOptions["browserName"]
) {
  // Linux WebKit replaces spaces with underscores in its suggested download names.
  // Keep the download attribute and Content-Disposition assertions exact at the call site.
  const expected =
    browserName === "webkit" && process.platform === "linux"
      ? filename.replaceAll(" ", "_")
      : filename;
  expect(download.suggestedFilename().normalize("NFC")).toBe(expected.normalize("NFC"));
}
