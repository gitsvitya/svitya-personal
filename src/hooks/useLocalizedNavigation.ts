"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { Language, SectionPath } from "../types/domain";
import { buildLocalizedPath, getLegacyHashPath, normalizeSectionPath } from "../utils/routing";

const FADE_DURATION = 300;
const LANGUAGE_KEY = "language";

type UseLocalizedNavigationParams = {
  pathname: string | null;
  router: AppRouterInstance;
  activePath: SectionPath;
  currentRouteLanguage: Language;
  hasLocale: boolean;
  isSectionValid: boolean;
};

type UseLocalizedNavigationResult = {
  language: Language;
  isLanguageSwitching: boolean;
  isRouteSwitching: boolean;
  changeLanguageWithFade: (nextLanguage: Language) => void;
  navigateTo: (path: SectionPath) => void;
};

export function useLocalizedNavigation({
  pathname,
  router,
  activePath,
  currentRouteLanguage,
  hasLocale,
  isSectionValid,
}: UseLocalizedNavigationParams): UseLocalizedNavigationResult {
  const [language, setLanguage] = useState<Language>(currentRouteLanguage);
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);
  const [isRouteSwitching, setIsRouteSwitching] = useState(false);
  const languageTimeouts = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const routeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routeFadeInTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRouteSwitchRef = useRef(false);

  useEffect(() => {
    if (routeTimeoutRef.current) {
      clearTimeout(routeTimeoutRef.current);
      routeTimeoutRef.current = null;
    }
    if (routeFadeInTimeoutRef.current) {
      clearTimeout(routeFadeInTimeoutRef.current);
      routeFadeInTimeoutRef.current = null;
    }

    if (pendingRouteSwitchRef.current) {
      pendingRouteSwitchRef.current = false;
      routeFadeInTimeoutRef.current = setTimeout(() => {
        setIsRouteSwitching(false);
      }, FADE_DURATION);
      return;
    }

    setIsRouteSwitching(false);
  }, [pathname]);

  useEffect(() => {
    setLanguage(currentRouteLanguage);
  }, [currentRouteLanguage]);

  useEffect(() => {
    const legacyPath = getLegacyHashPath();
    const localizedCurrentPath = buildLocalizedPath(currentRouteLanguage, activePath);

    if (!hasLocale && legacyPath && legacyPath !== activePath) {
      router.replace(buildLocalizedPath(currentRouteLanguage, legacyPath));
      return;
    }

    if (!hasLocale || !isSectionValid) {
      router.replace(localizedCurrentPath);
    }
  }, [activePath, currentRouteLanguage, hasLocale, isSectionValid, router]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.cookie = `lang=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  useEffect(() => {
    return () => {
      languageTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);
      if (routeFadeInTimeoutRef.current) clearTimeout(routeFadeInTimeoutRef.current);
    };
  }, []);

  const changeLanguageWithFade = useCallback(
    (nextLanguage: Language) => {
      if (nextLanguage === language) return;
      languageTimeouts.current.forEach(clearTimeout);
      languageTimeouts.current = [];
      setIsLanguageSwitching(true);

      const fadeOutTimer = setTimeout(() => {
        const nextPath = buildLocalizedPath(nextLanguage, activePath);
        setLanguage(nextLanguage);

        const navigateTimer = setTimeout(() => {
          router.push(nextPath);
          const fadeInTimer = setTimeout(() => {
            setIsLanguageSwitching(false);
          }, FADE_DURATION);
          languageTimeouts.current.push(fadeInTimer);
        }, FADE_DURATION);

        languageTimeouts.current.push(navigateTimer);
      }, FADE_DURATION);

      languageTimeouts.current.push(fadeOutTimer);
    },
    [activePath, language, router]
  );

  const navigateTo = useCallback(
    (path: SectionPath) => {
      const normalized = normalizeSectionPath(path);
      if (normalized === activePath) return;
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);
      if (routeFadeInTimeoutRef.current) clearTimeout(routeFadeInTimeoutRef.current);

      pendingRouteSwitchRef.current = true;
      setIsRouteSwitching(true);
      routeTimeoutRef.current = setTimeout(() => {
        router.push(buildLocalizedPath(currentRouteLanguage, normalized));
      }, FADE_DURATION);
    },
    [activePath, currentRouteLanguage, router]
  );

  return {
    language,
    isLanguageSwitching,
    isRouteSwitching,
    changeLanguageWithFade,
    navigateTo,
  };
}
