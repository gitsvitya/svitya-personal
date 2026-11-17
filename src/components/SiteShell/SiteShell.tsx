"use client";

import { useCallback, useEffect, useMemo, useState, useTransition, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTranslations } from "../../content/ui-text";
import { useThemePreference } from "../../hooks/useThemePreference";
import { useCookieBanner } from "../../hooks/useCookieBanner";
import { DEFAULT_LANGUAGE, type Language, type SectionPath } from "../../types/domain";
import {
  buildLanguageSwitchPath,
  buildLocalizedPath,
  getLegacyHashPath,
  normalizeSectionPath,
  parseLocalizedPath,
} from "../../utils/routing";
import AppFooter from "../AppFooter/AppFooter";
import AppHeader from "../AppHeader/AppHeader";
import CookieBanner from "../CookieBanner/CookieBanner";
import { RouteTransitionContext, type RouteTransitionOptions } from "./RouteTransitionContext";
import styles from "./SiteShell.module.css";
import { SitePreferencesContext } from "./SitePreferencesContext";
import { RouteStatusContext } from "./RouteStatusContext";

type SiteShellProps = {
  children: ReactNode;
  initialLanguage?: Language;
  initialYear: number;
  initialNotFound?: boolean;
};

function SiteShell({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
  initialYear,
  initialNotFound = false,
}: SiteShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [initialNotFoundPath] = useState(initialNotFound ? pathname : null);
  const [notFoundPath, setNotFoundPath] = useState<string | null>(null);
  const isNotFound = initialNotFoundPath === pathname || notFoundPath === pathname;
  const parsedPath = parseLocalizedPath(pathname);
  const language = parsedPath.language || initialLanguage;
  const activePath = normalizeSectionPath(parsedPath.sectionPath);
  const text = getTranslations(language);
  const { theme, themePreference, setTheme } = useThemePreference("light");
  const [isPending, startTransition] = useTransition();
  const { isCookieBannerOpen, showCookieBanner, hideCookieBanner } = useCookieBanner();

  const navigate = useCallback(
    (href: string, options: RouteTransitionOptions = {}) => {
      if (href === pathname && !isPending) return;
      // Keep the current screen readable until Next commits the destination.
      // Reselecting this page must also supersede a pending navigation, without
      // adding another copy of the current URL to browser history.
      startTransition(() => {
        if (options.replace || href === pathname) router.replace(href);
        else router.push(href);
      });
    },
    [isPending, pathname, router]
  );

  const routeTransitionValue = useMemo(
    () => ({ navigate, isTransitioning: isPending }),
    [navigate, isPending]
  );

  const changeLanguage = useCallback(
    (nextLanguage: Language) => {
      if (nextLanguage === language) return;
      const href = buildLanguageSwitchPath(nextLanguage, pathname);
      // Global 404 pages are full documents, so avoid requesting an RSC payload.
      if (isNotFound) {
        window.location.assign(href);
        return;
      }
      navigate(href, { kind: "language" });
    },
    [isNotFound, language, navigate, pathname]
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
    const legacyPath = getLegacyHashPath();
    if (legacyPath && legacyPath !== activePath) {
      router.replace(buildLocalizedPath(language, legacyPath));
    }
  }, [activePath, language, router]);

  return (
    <RouteTransitionContext.Provider value={routeTransitionValue}>
      <SitePreferencesContext.Provider
        value={{
          theme,
          themePreference,
          setTheme,
          language,
          changeLanguage,
          showCookieBanner,
        }}
      >
        <RouteStatusContext.Provider value={setNotFoundPath}>
          <div className={styles.page}>
            <AppHeader
              text={text}
              language={language}
              activePath={isNotFound ? null : activePath}
              onNavigate={navigateToSection}
            />
            <main id="main-content" className={styles.main} aria-busy={isPending}>
              <div key={pathname} className={`${styles.content} route-reveal`}>
                {children}
              </div>
            </main>
            <AppFooter text={text} language={language} initialYear={initialYear} />
            <CookieBanner text={text} forceOpen={isCookieBannerOpen} onClose={hideCookieBanner} />
          </div>
        </RouteStatusContext.Provider>
      </SitePreferencesContext.Provider>
    </RouteTransitionContext.Provider>
  );
}

export default SiteShell;
