"use client";

import { useCallback, useSyncExternalStore, type Dispatch, type SetStateAction } from "react";
import type { Theme } from "../types/domain";

const THEME_EVENT = "svitya:theme-change";

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
  return fallback;
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.backgroundColor = getComputedStyle(root).getPropertyValue("--bg-page");
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(THEME_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_EVENT, onStoreChange);
}

export function useThemePreference(initialTheme: Theme): UseThemePreferenceResult {
  const theme = useSyncExternalStore(
    subscribe,
    () => readTheme(initialTheme),
    () => initialTheme
  );
  const setTheme = useCallback<Dispatch<SetStateAction<Theme>>>(
    (nextTheme) => {
      const currentTheme = readTheme(initialTheme);
      const resolvedTheme = typeof nextTheme === "function" ? nextTheme(currentTheme) : nextTheme;

      applyTheme(resolvedTheme);
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
