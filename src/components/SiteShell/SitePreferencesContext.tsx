"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Language, Theme, ThemePreference } from "../../types/domain";

type SitePreferences = {
  theme: Theme;
  themePreference: ThemePreference;
  setTheme: Dispatch<SetStateAction<ThemePreference>>;
  language: Language;
  changeLanguage: (language: Language) => void;
  showCookieBanner: () => void;
};

export const SitePreferencesContext = createContext<SitePreferences | null>(null);

export function useSitePreferences() {
  const preferences = useContext(SitePreferencesContext);
  if (!preferences) throw new Error("Site preferences require SiteShell");
  return preferences;
}
