export const ANALYTICS_CONSENT_COOKIE_NAME = "analytics_consent";
export const ANALYTICS_CONSENT_EVENT = "analytics-consent-change";

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

export function setBrowserAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>): void {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${ANALYTICS_CONSENT_COOKIE_NAME}=${consent}; path=/; max-age=31536000; samesite=lax${secure}`;
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
}

export function subscribeToAnalyticsConsent(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener(ANALYTICS_CONSENT_EVENT, onChange);
  return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onChange);
}
