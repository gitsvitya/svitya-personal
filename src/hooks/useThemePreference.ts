"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Theme } from "../types/domain";

const THEME_KEY = "theme";

type UseThemePreferenceResult = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export function useThemePreference(initialTheme: Theme): UseThemePreferenceResult {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isThemeSynced, setIsThemeSynced] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const domTheme = document.documentElement.getAttribute("data-theme");
    const hasSavedTheme = savedTheme === "light" || savedTheme === "dark";
    const hasDomTheme = domTheme === "light" || domTheme === "dark";

    if (hasSavedTheme) setTheme(savedTheme);
    else if (hasDomTheme) setTheme(domTheme);
    else if (initialTheme === "light" || initialTheme === "dark") setTheme(initialTheme);
    else setTheme("light");
    setIsThemeSynced(true);
  }, [initialTheme]);

  useEffect(() => {
    if (!isThemeSynced) return;
    localStorage.setItem(THEME_KEY, theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [isThemeSynced, theme]);

  useEffect(() => {
    if (!isThemeSynced) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    const bgPage = getComputedStyle(root).getPropertyValue("--bg-page");
    root.style.backgroundColor = bgPage;
  }, [isThemeSynced, theme]);

  return {
    theme,
    setTheme,
  };
}
