"use client";

import { useSyncExternalStore } from "react";

// Locale navigation remounts SiteShell. Keep this transient UI state for the
// lifetime of the browser document, without changing the stored consent.
let areCookieSettingsOpen = false;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function setCookieSettingsOpen(isOpen: boolean) {
  areCookieSettingsOpen = isOpen;
  listeners.forEach((onChange) => onChange());
}

const getSnapshot = () => areCookieSettingsOpen;
const getServerSnapshot = () => false;
const openCookieSettings = () => setCookieSettingsOpen(true);
const closeCookieSettings = () => setCookieSettingsOpen(false);

export function useCookieSettings() {
  return {
    areCookieSettingsOpen: useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
    openCookieSettings,
    closeCookieSettings,
  };
}
