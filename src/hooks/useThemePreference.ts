"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Theme } from "../types/domain";

// Тема хранится под стабильным ключом и синхронизируется между
// localStorage, cookie и атрибутом data-theme на documentElement.
const THEME_KEY = "theme";

type UseThemePreferenceResult = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

// Хук инкапсулирует всю работу с темой, чтобы компонентам оставалось
// только читать текущее значение и вызывать setTheme.
export function useThemePreference(initialTheme: Theme): UseThemePreferenceResult {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isThemeSynced, setIsThemeSynced] = useState(false);

  // После монтирования приоритет источников такой:
  // localStorage -> уже выставленный DOM-атрибут -> серверное значение.
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

  // После первичной синхронизации сохраняем тему в durable-хранилищах,
  // чтобы сервер и клиент на следующих визитах стартовали одинаково.
  useEffect(() => {
    if (!isThemeSynced) return;
    localStorage.setItem(THEME_KEY, theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [isThemeSynced, theme]);

  // DOM-атрибут и backgroundColor обновляются отдельно, потому что они
  // напрямую влияют на CSS-переменные и цвет фона еще до полной перерисовки UI.
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
