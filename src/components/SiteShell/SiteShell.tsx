"use client";

import { useCallback, useEffect, useMemo, useTransition, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTranslations } from "../../content/ui-text";
import { useThemePreference } from "../../hooks/useThemePreference";
import { useCookieSettings } from "../../hooks/useCookieSettings";
import { DEFAULT_LANGUAGE, type Language, type SectionPath } from "../../types/domain";
import {
  buildLocalizedDetailPath,
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

type SiteShellProps = {
  children: ReactNode;
  initialLanguage?: Language;
};

function SiteShell({ children, initialLanguage = DEFAULT_LANGUAGE }: SiteShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const parsedPath = parseLocalizedPath(pathname);
  const language = parsedPath.language || initialLanguage;
  const activePath = normalizeSectionPath(parsedPath.sectionPath);
  const text = getTranslations(language);
  const { theme, setTheme } = useThemePreference("light");
  const [isPending, startTransition] = useTransition();
  const { areCookieSettingsOpen, openCookieSettings, closeCookieSettings } = useCookieSettings();

  const navigate = useCallback(
    (href: string, options: RouteTransitionOptions = {}) => {
      if (href === pathname) return;
      // Keep the current screen readable until Next commits the destination.
      startTransition(() => {
        if (options.replace) router.replace(href);
        else router.push(href);
      });
    },
    [pathname, router]
  );

  const routeTransitionValue = useMemo(
    () => ({ navigate, isTransitioning: isPending }),
    [navigate, isPending]
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
          setTheme,
          language,
          changeLanguage,
          openCookieSettings,
        }}
      >
        <div className={styles.page}>
          <AppHeader
            text={text}
            language={language}
            activePath={activePath}
            onNavigate={navigateToSection}
          />
          <main id="main-content" className={styles.main} aria-busy={isPending}>
            <div key={pathname} className={`${styles.content} route-reveal`}>
              {children}
            </div>
          </main>
          <AppFooter text={text} language={language} />
          <CookieBanner
            text={text}
            forceOpen={areCookieSettingsOpen}
            onClose={closeCookieSettings}
          />
        </div>
      </SitePreferencesContext.Provider>
    </RouteTransitionContext.Provider>
  );
}

export default SiteShell;
