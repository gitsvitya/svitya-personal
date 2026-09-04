import { describe, expect, it } from "vitest";
import { resolveLanguageFromHeader } from "./sections";

describe("language negotiation", () => {
  it("respects quality values and regional language tags", () => {
    expect(resolveLanguageFromHeader("en-US;q=0.6, ru-RU;q=0.9")).toBe("ru");
    expect(resolveLanguageFromHeader("en-GB")).toBe("en");
  });

  it("falls back when supported languages are absent", () => {
    expect(resolveLanguageFromHeader("de-DE, fr;q=0.8")).toBe("en");
    expect(resolveLanguageFromHeader()).toBe("en");
  });
});
