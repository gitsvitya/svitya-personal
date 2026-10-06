"use client";

import { useSyncExternalStore } from "react";

// Locale navigation remounts SiteShell. Keep this transient UI state for the
// lifetime of the browser document, without resetting the saved dismissal.
let isCookieBannerOpen = false;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function setCookieBannerOpen(isOpen: boolean) {
  isCookieBannerOpen = isOpen;
  listeners.forEach((onChange) => onChange());
}

const getSnapshot = () => isCookieBannerOpen;
const getServerSnapshot = () => false;
const showCookieBanner = () => setCookieBannerOpen(true);
const hideCookieBanner = () => setCookieBannerOpen(false);

export function useCookieBanner() {
  return {
    isCookieBannerOpen: useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
    showCookieBanner,
    hideCookieBanner,
  };
}
