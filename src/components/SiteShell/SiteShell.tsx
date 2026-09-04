"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTranslations } from "../../content/ui-text";
import { useThemePreference } from "../../hooks/useThemePreference";
import { DEFAULT_LANGUAGE, type Language, type SectionPath, type Theme } from "../../types/domain";
import {
  buildLocalizedDetailPath,
  buildLocalizedPath,
  getLegacyHashPath,
  normalizeSectionPath,
  parseLocalizedPath,
} from "../../utils/routing";
import { getTransitionDuration } from "../../utils/motion";
import AppFooter from "../AppFooter/AppFooter";
import AppHeader from "../AppHeader/AppHeader";
import CookieBanner from "../CookieBanner/CookieBanner";
import { RouteTransitionContext, type RouteTransitionOptions } from "./RouteTransitionContext";
import styles from "./SiteShell.module.css";

type SiteShellProps = {
  children: ReactNode;
  initialLanguage?: Language;
  initialTheme?: Theme;
};

function SiteShell({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
  initialTheme = "light",
}: SiteShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const parsedPath = parseLocalizedPath(pathname);
  const language = parsedPath.language || initialLanguage;
  const activePath = normalizeSectionPath(parsedPath.sectionPath);
  const text = getTranslations(language);
  const { theme, setTheme } = useThemePreference(initialTheme);
  const [transitionKind, setTransitionKind] = useState<"route" | "language" | null>(null);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeInTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingNavigationRef = useRef(false);

  const navigate = useCallback(
    (href: string, options: RouteTransitionOptions = {}) => {
      if (href === pathname) return;
      if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
      if (fadeInTimeoutRef.current) clearTimeout(fadeInTimeoutRef.current);

      const duration = getTransitionDuration("fast");
      pendingNavigationRef.current = true;
      setTransitionKind(options.kind || "route");
      navigationTimeoutRef.current = setTimeout(() => {
        if (options.replace) router.replace(href);
        else router.push(href);
      }, duration);
    },
    [pathname, router]
  );

  const routeTransitionValue = useMemo(
    () => ({ navigate, isTransitioning: transitionKind !== null }),
    [navigate, transitionKind]
  );

  const changeLanguage = useCallback(
    (nextLanguage: Language) => {
      if (nextLanguage === language) return;
      const href = parsedPath.detailSlug
        ? buildLocalizedDetailPath(nextLanguage, activePath, parsedPath.detailSlug)
        : buildLocalizedPath(nextLanguage, activePath);
      navigate(href, { kind: "language" });
    },
    [activePath, language, navigate, parsedPath.detailSlug]
  );

  const navigateToSection = useCallback(
    (sectionPath: SectionPath) => {
      navigate(buildLocalizedPath(language, sectionPath));
    },
    [language, navigate]
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.cookie = `lang=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  useEffect(() => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    if (fadeInTimeoutRef.current) {
      clearTimeout(fadeInTimeoutRef.current);
      fadeInTimeoutRef.current = null;
    }

    if (!pendingNavigationRef.current) {
      setTransitionKind(null);
      return;
    }

    pendingNavigationRef.current = false;
    fadeInTimeoutRef.current = setTimeout(() => {
      setTransitionKind(null);
    }, getTransitionDuration("fast"));
  }, [pathname]);

  useEffect(() => {
    const legacyPath = getLegacyHashPath();
    if (legacyPath && legacyPath !== activePath) {
      router.replace(buildLocalizedPath(language, legacyPath));
    }
  }, [activePath, language, router]);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
      if (fadeInTimeoutRef.current) clearTimeout(fadeInTimeoutRef.current);
    };
  }, []);

  const isTransitioning = transitionKind !== null;
  const isLanguageSwitching = transitionKind === "language";

  return (
    <RouteTransitionContext.Provider value={routeTransitionValue}>
      <div className={styles.page}>
        <AppHeader
          text={text}
          onLanguageChange={changeLanguage}
          language={language}
          theme={theme}
          setTheme={setTheme}
          isLanguageSwitching={isLanguageSwitching}
          activePath={activePath}
          onNavigate={navigateToSection}
        />
        <main
          className={`${styles.main} ${styles.fade} ${
            isTransitioning ? styles.pageFading : styles.pageVisible
          }`}
        >
          {children}
        </main>
        <AppFooter text={text} isLanguageSwitching={isLanguageSwitching} />
        <div
          className={`${styles.fade} ${
            isLanguageSwitching ? styles.pageFading : styles.pageVisible
          }`}
        >
          <CookieBanner text={text} />
        </div>
      </div>
    </RouteTransitionContext.Provider>
  );
}

export default SiteShell;
