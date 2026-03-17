"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { Language, SectionPath } from "../types/domain";
import { buildLocalizedPath, getLegacyHashPath, normalizeSectionPath } from "../utils/routing";

// Длительность анимации переходов держим в одном месте, чтобы fade-out
// и момент реальной навигации всегда оставались синхронными.
const FADE_DURATION = 300;
const LANGUAGE_KEY = "language";

// Хук получает весь минимум данных о текущем route-состоянии,
// а детали разбора pathname остаются снаружи.
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

// Хук инкапсулирует клиентскую навигацию между разделами и языками,
// включая плавные анимации и синхронизацию выбора пользователя.
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

  // Когда pathname уже изменился, завершаем отложенный route transition
  // и снимаем флаг анимации после небольшого fade-in интервала.
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

  // Локальное состояние языка должно следовать за URL, если страница
  // была открыта напрямую или язык изменился через редирект.
  useEffect(() => {
    setLanguage(currentRouteLanguage);
  }, [currentRouteLanguage]);

  // Этот эффект чинит legacy-входы без локали и с hash-маршрутами,
  // перенаправляя пользователя на актуальный локализованный адрес.
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

  // Храним выбранный язык и в localStorage, и в cookie:
  // первый нужен клиенту, второй серверу на следующем запросе.
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.cookie = `lang=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  // Все таймеры смены языка нужно очистить при размонтировании,
  // иначе возможны попытки обновления уже несуществующего компонента.
  useEffect(() => {
    return () => {
      languageTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  // Аналогично очищаем таймеры перехода между разделами.
  useEffect(() => {
    return () => {
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);
      if (routeFadeInTimeoutRef.current) clearTimeout(routeFadeInTimeoutRef.current);
    };
  }, []);

  // Смена языка идет в два шага: fade-out, затем push на новый URL,
  // после чего UI плавно возвращается в видимое состояние.
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

  // Переход между разделами использует ту же идею с отложенным push,
  // чтобы анимация скрытия успела отыграть до смены маршрута.
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
