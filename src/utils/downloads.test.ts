import { describe, expect, it } from "vitest";
import { getTranslations } from "../content/ui-text";
import { formatDownloadSize, getDownloadFile } from "./downloads";

describe("download sizes", () => {
  it("shows readable sizes with Russian and English decimal separators and units", () => {
    const russian = getTranslations("ru").detail.fileSize;
    const english = getTranslations("en").detail.fileSize;
    expect(formatDownloadSize(40_826, russian)).toBe("41 КБ");
    expect(formatDownloadSize(40_826, english)).toBe("41 KB");
    expect(formatDownloadSize(11_842_617, russian)).toBe("11,8 МБ");
    expect(formatDownloadSize(11_842_617, english)).toBe("11.8 MB");
    expect(formatDownloadSize(1_000_000, russian)).toBe("1 МБ");
  });

  it("fails explicitly for an unregistered download instead of showing a broken link", () => {
    expect(() => getDownloadFile("/materials/missing.pdf")).toThrow("Missing download file");
  });
});
