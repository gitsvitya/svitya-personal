import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AnalyticsConsent } from "../../utils/analyticsConsent";
import YandexAnalytics from "./YandexAnalytics";

const consentState = vi.hoisted(() => ({
  value: null as AnalyticsConsent,
}));

vi.mock("../../hooks/useAnalyticsConsent", () => ({
  useAnalyticsConsent: () => consentState.value,
}));

describe("YandexAnalytics", () => {
  beforeEach(() => {
    consentState.value = null;
  });

  it.each([null, "denied"] as const)("does not render for %s consent", (consent) => {
    consentState.value = consent;
    expect(YandexAnalytics({ initialConsent: consent })).toBeNull();
  });

  it("renders the analytics script after consent is granted", () => {
    consentState.value = "granted";
    const script = YandexAnalytics({ initialConsent: "granted" });

    expect(script).not.toBeNull();
    expect(script?.props.id).toBe("yandex-metrika");
  });
});
