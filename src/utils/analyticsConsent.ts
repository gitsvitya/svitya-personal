export const ANALYTICS_CONSENT_COOKIE_NAME = "analytics_consent";
export const ANALYTICS_CONSENT_EVENT = "analytics-consent-change";

let consentChannel: BroadcastChannel | null = null;
let subscriberCount = 0;

export type AnalyticsConsent = "granted" | "denied" | null;

export function isAnalyticsConsent(value: unknown): value is Exclude<AnalyticsConsent, null> {
  return value === "granted" || value === "denied";
}

export function parseAnalyticsConsent(cookieString: string): AnalyticsConsent {
  const cookiePrefix = `${ANALYTICS_CONSENT_COOKIE_NAME}=`;
  const consentCookie = cookieString
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(cookiePrefix));

  if (!consentCookie) return null;

  const value = consentCookie.slice(cookiePrefix.length);
  return isAnalyticsConsent(value) ? value : null;
}

export function getBrowserAnalyticsConsent(): AnalyticsConsent {
  return typeof document === "undefined" ? null : parseAnalyticsConsent(document.cookie);
}

function openConsentChannel(): BroadcastChannel | null {
  if (consentChannel) return consentChannel;
  try {
    if (typeof window.BroadcastChannel === "function") {
      consentChannel = new window.BroadcastChannel(ANALYTICS_CONSENT_EVENT);
      consentChannel.addEventListener("message", (event: MessageEvent<unknown>) => {
        if (!isAnalyticsConsent(event.data)) return;
        // Firefox can deliver the message before its cookie cache is updated.
        // Apply the choice before notifying subscribers, without rebroadcasting it.
        writeConsentCookie(event.data);
        window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
      });
    }
  } catch {
    // Restricted browser contexts can disable cross-tab messaging.
    consentChannel = null;
  }
  return consentChannel;
}

function closeUnusedConsentChannel(): void {
  if (subscriberCount > 0) return;
  consentChannel?.close();
  consentChannel = null;
}

function writeConsentCookie(consent: Exclude<AnalyticsConsent, null>): void {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${ANALYTICS_CONSENT_COOKIE_NAME}=${consent}; path=/; max-age=31536000; samesite=lax${secure}`;
}

export function setBrowserAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>): void {
  writeConsentCookie(consent);
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
  // One shared channel per tab avoids echoing this tab's own changes back to it.
  openConsentChannel()?.postMessage(consent);
  closeUnusedConsentChannel();
}

export function subscribeToAnalyticsConsent(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  subscriberCount += 1;
  openConsentChannel();
  function onVisibilityChange() {
    if (document.visibilityState === "visible") onChange();
  }

  window.addEventListener(ANALYTICS_CONSENT_EVENT, onChange);
  window.addEventListener("focus", onChange);
  window.addEventListener("pageshow", onChange);
  document.addEventListener("visibilitychange", onVisibilityChange);
  return () => {
    subscriberCount -= 1;
    closeUnusedConsentChannel();
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, onChange);
    window.removeEventListener("focus", onChange);
    window.removeEventListener("pageshow", onChange);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}
