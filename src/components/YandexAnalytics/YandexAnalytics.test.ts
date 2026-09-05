import { describe, expect, it } from "vitest";
import { shouldEnableYandexAnalytics } from "./YandexAnalytics";

describe("YandexAnalytics", () => {
  it("enables analytics only after consent on a public hostname", () => {
    expect(shouldEnableYandexAnalytics("granted", "svitya.com")).toBe(true);
    expect(shouldEnableYandexAnalytics("denied", "svitya.com")).toBe(false);
    expect(shouldEnableYandexAnalytics(null, "svitya.com")).toBe(false);
  });

  it.each(["localhost", "127.0.0.1", "::1", "[::1]"])(
    "keeps analytics disabled on %s",
    (hostname) => {
      expect(shouldEnableYandexAnalytics("granted", hostname)).toBe(false);
    }
  );
});
