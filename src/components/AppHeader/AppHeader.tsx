import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import type { Language, SectionPath } from "../../types/domain";
import type { AppTranslations } from "../../content/ui-text";
import { shouldHandleClientNavigation } from "../../utils/navigation";
import { buildLanguageSwitchPath, buildLocalizedPath } from "../../utils/routing";
import AppIcon from "../AppIcon/AppIcon";
import { useSitePreferences } from "../SiteShell/SitePreferencesContext";
import styles from "./AppHeader.module.css";

const DESKTOP_MEDIA_QUERY = "(min-width: 769px)";
const subscribeToHydration = () => () => undefined;
type AppHeaderProps = {
  text: AppTranslations;
  language: Language;
  activePath: SectionPath | null;
  onNavigate: (path: SectionPath) => void;
};

function AppHeader({ text, language, activePath, onNavigate }: AppHeaderProps) {
  const pathname = usePathname();
  const { changeLanguage } = useSitePreferences();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const menuRoute = `${language}${activePath}`;
  const [menuState, setMenuState] = useState({ route: menuRoute, open: false });
  const isMenuOpen = menuState.route === menuRoute && menuState.open;
  if (menuState.route !== menuRoute) setMenuState({ route: menuRoute, open: false });
  const navigationItems: Array<{ path: SectionPath; label: string }> = [
    { path: "/about", label: text.sections.about },
    { path: "/work", label: text.navigation.work },
    { path: "/projects", label: text.sections.projects },
    { path: "/activities", label: text.sections.activities },
    { path: "/settings", label: text.sections.settings },
  ];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !isMenuOpen) return;
      const isFocusInsideMenu = menuListRef.current?.contains(document.activeElement);
      setMenuState((previous) => ({ ...previous, open: false }));
      if (isFocusInsideMenu) {
        event.preventDefault();
        menuButtonRef.current?.focus();
      }
    }
    const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);
    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) setMenuState((previous) => ({ ...previous, open: false }));
    }
    document.addEventListener("keydown", handleKeyDown);
    desktopMedia.addEventListener("change", handleDesktopChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktopMedia.removeEventListener("change", handleDesktopChange);
    };
  }, [isMenuOpen]);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: SectionPath) {
    if (!shouldHandleClientNavigation(event)) return;
    event.preventDefault();
    onNavigate(path);
    if (path === activePath) setMenuState({ route: menuRoute, open: false });
  }

  return (
    <header className={styles.header}>
      <a className="skip-link" href="#main-content">
        {text.navigation.skipToContent}
      </a>
      <div className={`layout-container ${styles.container}`}>
        <nav
          aria-label={text.navigation.menuLabel}
          className={`${styles.navigationBlock} ${isHydrated ? styles.enhanced : ""}`}
        >
          <button
            ref={menuButtonRef}
            type="button"
            className={`button-control ${styles.menuToggle} ${isMenuOpen ? styles.menuToggleActive : ""}`}
            aria-expanded={isMenuOpen}
            aria-controls="app-nav-list"
            onClick={() => setMenuState({ route: menuRoute, open: !isMenuOpen })}
          >
            <span className="button-label">
              {isMenuOpen ? (language === "ru" ? "Закрыть" : "Close") : text.navigation.menuLabel}
            </span>
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <ul
            ref={menuListRef}
            id="app-nav-list"
            className={`${styles.listItems} ${isMenuOpen ? styles.menuOpen : ""}`}
          >
            {navigationItems.map(({ path, label }) => {
              const isActive = activePath === path;
              return (
                <li
                  key={path}
                  className={`${styles.listItem} ${isActive ? styles.listItemActive : ""}`}
                >
                  <Link
                    className={`${styles.listItemLink} ${path === "/settings" ? styles.iconLink : ""} ${isActive ? styles.listItemLinkActive : ""}`}
                    href={buildLocalizedPath(language, path)}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={path === "/settings" ? label : undefined}
                    title={path === "/settings" ? label : undefined}
                    onClick={(event) => handleNavigation(event, path)}
                  >
                    {path === "/settings" ? (
                      <>
                        <AppIcon name="settings" className={styles.settingsIcon} />
                        <span className={styles.settingsLabel}>{label}</span>
                      </>
                    ) : (
                      <span key={language} className="route-reveal">
                        {label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.languages} role="group" aria-label={text.settings.language}>
          {(["ru", "en"] as const).map((locale) => (
            <span
              key={locale}
              className={`${styles.languageItem} ${language === locale ? styles.languageItemActive : ""}`}
            >
              <Link
                prefetch={false}
                lang={locale}
                href={buildLanguageSwitchPath(locale, pathname)}
                className={styles.language}
                aria-current={language === locale ? "true" : undefined}
                onClick={(event) => {
                  if (!shouldHandleClientNavigation(event)) return;
                  event.preventDefault();
                  changeLanguage(locale);
                }}
              >
                {locale.toUpperCase()}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
export default AppHeader;
