export const COOKIE_NOTICE_COOKIE_NAME = "cookie_notice_closed";
const COOKIE_NOTICE_EVENT = "cookie-notice-closed";
const LEGACY_CONSENT_COOKIE_NAME = "analytics_consent";

let isClosedInMemory = false;
let noticeChannel: BroadcastChannel | null = null;
let subscriberCount = 0;

function readCookies(): string[] {
  if (typeof document === "undefined") return [];
  try {
    return document.cookie.split(";").map((cookie) => cookie.trim());
  } catch {
    return [];
  }
}

export function isCookieNoticeClosed(): boolean {
  const cookies = readCookies();
  return (
    isClosedInMemory ||
    cookies.includes(`${COOKIE_NOTICE_COOKIE_NAME}=1`) ||
    cookies.includes(`${LEGACY_CONSENT_COOKIE_NAME}=granted`) ||
    cookies.includes(`${LEGACY_CONSENT_COOKIE_NAME}=denied`)
  );
}

function writeCookie(value: string): void {
  try {
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${value}; path=/; samesite=lax${secure}`;
  } catch {
    // The notice can still be closed for this visit when cookies are blocked.
  }
}

function rememberClosure(): void {
  isClosedInMemory = true;
  writeCookie(`${COOKIE_NOTICE_COOKIE_NAME}=1; max-age=31536000`);
}

export function initializeCookieNotice(): void {
  const cookies = readCookies();
  if (isCookieNoticeClosed() && !cookies.includes(`${COOKIE_NOTICE_COOKIE_NAME}=1`)) {
    rememberClosure();
  }

  // Preserve existing visitors' dismissal, then remove the old choice and
  // first-party tracking cookies, including cookies set on a parent domain.
  const names = new Set(
    cookies
      .map((cookie) => cookie.split("=")[0] ?? "")
      .filter((name) => name === LEGACY_CONSENT_COOKIE_NAME || name.startsWith("_ym_"))
  );
  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  const domains =
    parts.length > 1 && !/^[\d.]+$/.test(hostname) && !hostname.includes(":")
      ? parts.slice(0, -1).map((_, index) => parts.slice(index).join("."))
      : [];
  for (const name of names) {
    writeCookie(`${name}=; max-age=0`);
    for (const domain of domains) {
      writeCookie(`${name}=; max-age=0; domain=${domain}`);
    }
  }
  window.dispatchEvent(new Event(COOKIE_NOTICE_EVENT));
}

function openNoticeChannel(): BroadcastChannel | null {
  if (noticeChannel) return noticeChannel;
  try {
    if (typeof window.BroadcastChannel === "function") {
      noticeChannel = new window.BroadcastChannel(COOKIE_NOTICE_EVENT);
      noticeChannel.addEventListener("message", (event: MessageEvent<unknown>) => {
        if (event.data !== "closed") return;
        // Firefox may deliver this before its cookie cache is updated.
        rememberClosure();
        window.dispatchEvent(new Event(COOKIE_NOTICE_EVENT));
      });
    }
  } catch {
    noticeChannel = null;
  }
  return noticeChannel;
}

function closeUnusedNoticeChannel(): void {
  if (subscriberCount > 0) return;
  noticeChannel?.close();
  noticeChannel = null;
}

export function dismissCookieNotice(): void {
  rememberClosure();
  window.dispatchEvent(new Event(COOKIE_NOTICE_EVENT));
  openNoticeChannel()?.postMessage("closed");
  closeUnusedNoticeChannel();
}

export function subscribeToCookieNotice(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  subscriberCount += 1;
  openNoticeChannel();
  function onVisibilityChange() {
    if (document.visibilityState === "visible") onChange();
  }

  window.addEventListener(COOKIE_NOTICE_EVENT, onChange);
  window.addEventListener("focus", onChange);
  window.addEventListener("pageshow", onChange);
  document.addEventListener("visibilitychange", onVisibilityChange);
  return () => {
    subscriberCount -= 1;
    closeUnusedNoticeChannel();
    window.removeEventListener(COOKIE_NOTICE_EVENT, onChange);
    window.removeEventListener("focus", onChange);
    window.removeEventListener("pageshow", onChange);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}
