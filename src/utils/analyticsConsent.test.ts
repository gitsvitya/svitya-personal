import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_CONSENT_EVENT,
  getBrowserAnalyticsConsent,
  parseAnalyticsConsent,
  setBrowserAnalyticsConsent,
  subscribeToAnalyticsConsent,
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

  it("applies cross-tab messages before notifying subscribers even when the cookie is stale", () => {
    const channels: TestChannel[] = [];
    class TestChannel extends EventTarget {
      postMessage = vi.fn();
      close = vi.fn();
      constructor() {
        super();
        channels.push(this);
      }
    }
    vi.stubGlobal(
      "window",
      Object.assign(new EventTarget(), {
        BroadcastChannel: TestChannel,
        location: { protocol: "https:" },
      })
    );
    vi.stubGlobal(
      "document",
      Object.assign(new EventTarget(), {
        cookie: "analytics_consent=granted",
      })
    );
    const choices: unknown[] = [];
    const unsubscribe = subscribeToAnalyticsConsent(() =>
      choices.push(getBrowserAnalyticsConsent())
    );
    const unsubscribeOther = subscribeToAnalyticsConsent(vi.fn());
    try {
      expect(channels).toHaveLength(1);
      const channel = channels[0]!;
      channel.dispatchEvent(new MessageEvent("message", { data: "denied" }));
      expect(choices).toEqual(["denied"]);
      expect(getBrowserAnalyticsConsent()).toBe("denied");
      expect(channel.postMessage).not.toHaveBeenCalled();

      channel.dispatchEvent(new MessageEvent("message", { data: "invalid" }));
      expect(choices).toEqual(["denied"]);
      setBrowserAnalyticsConsent("granted");
      expect(choices).toEqual(["denied", "granted"]);
      expect(channel.postMessage).toHaveBeenCalledExactlyOnceWith("granted");
      expect(channel.close).not.toHaveBeenCalled();
    } finally {
      unsubscribe();
      expect(channels[0]!.close).not.toHaveBeenCalled();
      unsubscribeOther();
      expect(channels[0]!.close).toHaveBeenCalledOnce();
    }
  });

  it.each(["unavailable", "restricted"])(
    "refreshes consent on returning to a tab when BroadcastChannel is %s and cleans up listeners",
    (availability) => {
      const browserWindow = Object.assign(new EventTarget(), {
        BroadcastChannel:
          availability === "restricted"
            ? class {
                constructor() {
                  throw new Error("BroadcastChannel is blocked");
                }
              }
            : undefined,
      });
      const documentNode = Object.assign(new EventTarget(), { visibilityState: "hidden" });
      vi.stubGlobal("window", browserWindow);
      vi.stubGlobal("document", documentNode);
      const onChange = vi.fn();
      const unsubscribe = subscribeToAnalyticsConsent(onChange);

      documentNode.dispatchEvent(new Event("visibilitychange"));
      expect(onChange).not.toHaveBeenCalled();
      documentNode.visibilityState = "visible";
      documentNode.dispatchEvent(new Event("visibilitychange"));
      browserWindow.dispatchEvent(new Event("focus"));
      browserWindow.dispatchEvent(new Event("pageshow"));
      browserWindow.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
      expect(onChange).toHaveBeenCalledTimes(4);

      unsubscribe();
      documentNode.dispatchEvent(new Event("visibilitychange"));
      browserWindow.dispatchEvent(new Event("focus"));
      browserWindow.dispatchEvent(new Event("pageshow"));
      browserWindow.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
      expect(onChange).toHaveBeenCalledTimes(4);
    }
  );
});
