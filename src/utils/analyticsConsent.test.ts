import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_CONSENT_EVENT,
  parseAnalyticsConsent,
  setBrowserAnalyticsConsent,
} from "./analyticsConsent";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("analytics consent cookie", () => {
  it("reads granted and denied consent", () => {
    expect(parseAnalyticsConsent("theme=dark; analytics_consent=granted; lang=ru")).toBe("granted");
    expect(parseAnalyticsConsent("analytics_consent=denied")).toBe("denied");
  });

  it("rejects missing and unsupported values", () => {
    expect(parseAnalyticsConsent("theme=light")).toBeNull();
    expect(parseAnalyticsConsent("analytics_consent=unknown")).toBeNull();
  });

  it("persists a choice and notifies subscribers", () => {
    const dispatchEvent = vi.fn();
    vi.stubGlobal("document", { cookie: "" });
    vi.stubGlobal("window", {
      location: { protocol: "https:" },
      dispatchEvent,
    });
    vi.stubGlobal(
      "Event",
      class TestEvent {
        constructor(public type: string) {}
      }
    );

    setBrowserAnalyticsConsent("granted");

    expect(document.cookie).toContain("analytics_consent=granted");
    expect(document.cookie).toContain("secure");
    expect(dispatchEvent).toHaveBeenCalledOnce();
    expect(dispatchEvent.mock.calls[0]?.[0]).toMatchObject({ type: ANALYTICS_CONSENT_EVENT });
  });
});
