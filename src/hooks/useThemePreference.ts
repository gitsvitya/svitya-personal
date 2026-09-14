"use client";

import {
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
  type Dispatch,
  type SetStateAction,
} from "react";
import { usePathname } from "next/navigation";
import type { Theme } from "../types/domain";

const THEME_EVENT = "svitya:theme-change";
let themeTransitionVersion = 0;

type UseThemePreferenceResult = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function readTheme(fallback: Theme): Theme {
  const domTheme = document.documentElement.getAttribute("data-theme");
  if (isTheme(domTheme)) return domTheme;

  const cookieTheme = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("theme="))
    ?.slice("theme=".length);
  if (cookieTheme && isTheme(cookieTheme)) return cookieTheme;
  return typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : fallback;
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
}

function animateTheme(theme: Theme): void {
  const root = document.documentElement;
  if (typeof CSS.registerProperty !== "function") {
    applyTheme(theme);
    return;
  }

  const version = ++themeTransitionVersion;
  // The root animates registered palette colors; descendants must not animate
  // those already changing values again. Transform/opacity transitions stay active.
  root.style.setProperty("--transition-theme", "0s");
  applyTheme(theme);
  void Promise.allSettled(root.getAnimations().map((animation) => animation.finished)).then(() => {
    // A quick second toggle cancels the old transition and starts another one.
    if (version === themeTransitionVersion) root.style.removeProperty("--transition-theme");
  });
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(THEME_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_EVENT, onStoreChange);
}

export function useThemePreference(initialTheme: Theme): UseThemePreferenceResult {
  const pathname = usePathname();
  useLayoutEffect(() => {
    // A locale navigation updates the root html element. Restore its theme before paint.
    applyTheme(readTheme(initialTheme));
    window.dispatchEvent(new Event(THEME_EVENT));
  }, [initialTheme, pathname]);

  const theme = useSyncExternalStore(
    subscribe,
    () => readTheme(initialTheme),
    () => initialTheme
  );
  const setTheme = useCallback<Dispatch<SetStateAction<Theme>>>(
    (nextTheme) => {
      const currentTheme = readTheme(initialTheme);
      const resolvedTheme = typeof nextTheme === "function" ? nextTheme(currentTheme) : nextTheme;

      animateTheme(resolvedTheme);
      document.cookie = `theme=${resolvedTheme}; path=/; max-age=31536000; samesite=lax`;
      window.dispatchEvent(new Event(THEME_EVENT));
    },
    [initialTheme]
  );

  return {
    theme,
    setTheme,
  };
}
