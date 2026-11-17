"use client";

import {
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
  type Dispatch,
  type SetStateAction,
} from "react";
import { usePathname } from "next/navigation";
import type { Theme, ThemePreference } from "../types/domain";

const THEME_EVENT = "svitya:theme-change";
let themeTransitionVersion = 0;

function readPreference(): ThemePreference {
  const match = document.cookie.match(/(?:^|;\s*)theme=(light|dark|system)(?:;|$)/);
  return (match?.[1] as ThemePreference | undefined) ?? "system";
}
function resolveTheme(preference: ThemePreference): Theme {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
}
function animateTheme(theme: Theme): void {
  const root = document.documentElement;
  if (typeof CSS.registerProperty !== "function") {
    applyTheme(theme);
    return;
  }
  const version = ++themeTransitionVersion;
  root.style.setProperty("--transition-theme", "0s");
  applyTheme(theme);
  void Promise.allSettled(root.getAnimations().map((animation) => animation.finished)).then(() => {
    if (version === themeTransitionVersion) root.style.removeProperty("--transition-theme");
  });
}
function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(THEME_EVENT, onStoreChange);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  function onSystemChange() {
    if (readPreference() === "system") {
      animateTheme(resolveTheme("system"));
      onStoreChange();
    }
  }
  media.addEventListener("change", onSystemChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    media.removeEventListener("change", onSystemChange);
  };
}
export function useThemePreference(initialTheme: Theme) {
  const pathname = usePathname();
  useLayoutEffect(() => {
    // Root layouts can update during locale navigation; restore the persisted choice before paint.
    applyTheme(resolveTheme(readPreference()));
    window.dispatchEvent(new Event(THEME_EVENT));
  }, [pathname]);
  const themePreference = useSyncExternalStore(subscribe, readPreference, () => "system" as const);
  const theme = useSyncExternalStore(
    subscribe,
    () => resolveTheme(readPreference()),
    () => initialTheme
  );
  const setTheme = useCallback<Dispatch<SetStateAction<ThemePreference>>>((next) => {
    const preference = typeof next === "function" ? next(readPreference()) : next;
    document.cookie = `theme=${preference}; path=/; max-age=31536000; samesite=lax`;
    animateTheme(resolveTheme(preference));
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);
  return { theme, themePreference, setTheme };
}
