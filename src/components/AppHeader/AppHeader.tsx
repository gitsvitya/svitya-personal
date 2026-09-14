import Link from "next/link";
import { useEffect, useState, type Dispatch, type MouseEvent, type SetStateAction } from "react";
import type { Language, SectionPath, Theme } from "../../types/domain";
import type { AppTranslations } from "../../content/ui-text";
import { shouldHandleClientNavigation } from "../../utils/navigation";
import { buildLocalizedPath } from "../../utils/routing";
import styles from "./AppHeader.module.css";

const DESKTOP_MEDIA_QUERY = "(min-width: 769px)";

type AppHeaderProps = {
  text: AppTranslations;
  onLanguageChange: (nextLanguage: Language) => void;
  language: Language;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  activePath: SectionPath;
  onNavigate: (path: SectionPath) => void;
};

function AppHeader({
  text,
  onLanguageChange,
  language,
  theme,
  setTheme,
  activePath,
  onNavigate,
}: AppHeaderProps) {
  const menuRoute = `${language}${activePath}`;
  const [menuState, setMenuState] = useState({ route: menuRoute, open: false });
  const isMenuOpen = menuState.route === menuRoute && menuState.open;
  if (menuState.route !== menuRoute) setMenuState({ route: menuRoute, open: false });

  const nextLng: Language = language === "ru" ? "en" : "ru";
  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const isDarkTheme = theme === "dark";
  const isRussian = language === "ru";
  const navigationItems: Array<{ path: SectionPath; label: string }> = [
    { path: "/about", label: text.sections.about },
    { path: "/work", label: text.sections.work },
    { path: "/projects", label: text.sections.projects },
    { path: "/activities", label: text.sections.activities },
  ];

  function toggleTheme() {
    setTheme(nextTheme);
  }

  function toggleLanguage() {
    onLanguageChange(nextLng);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuState((previous) => ({ ...previous, open: false }));
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
  }, []);

  function toggleMenu() {
    setMenuState({ route: menuRoute, open: !isMenuOpen });
  }

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: SectionPath) {
    if (!shouldHandleClientNavigation(event)) return;

    event.preventDefault();
    onNavigate(path);
    // On a new route, the menu closes in the same render as the content changes.
    if (path === activePath) setMenuState({ route: menuRoute, open: false });
  }

  return (
    <header className={styles.header}>
      <a className="skip-link" href="#main-content">
        {text.navigation.skipToContent}
      </a>
      <div className={`layout-container ${styles.container}`}>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlChanger}
            onClick={toggleTheme}
            aria-pressed={isDarkTheme}
          >
            <span
              className={`${styles.controlChangerText} ${
                !isDarkTheme ? styles.controlSwitcherActive : ""
              }`}
            >
              <span key={language} className="route-reveal">
                {text.theme.light}
              </span>
            </span>
            <div
              className={`${styles.controlSwitcher} ${
                isDarkTheme ? styles.controlSwitcherActive : ""
              }`}
            >
              <div className={styles.switcherThumb} />
            </div>
            <span
              className={`${styles.controlChangerText} ${
                isDarkTheme ? styles.controlSwitcherActive : ""
              }`}
            >
              <span key={language} className="route-reveal">
                {text.theme.dark}
              </span>
            </span>
          </button>
          <button
            type="button"
            className={styles.controlChanger}
            onClick={toggleLanguage}
            aria-pressed={isRussian}
          >
            <span
              className={`${styles.controlChangerText} ${
                !isRussian ? styles.controlSwitcherActive : ""
              }`}
            >
              En
            </span>
            <div
              className={`${styles.controlSwitcher} ${
                isRussian ? styles.controlSwitcherActive : ""
              }`}
            >
              <div className={styles.switcherThumb} />
            </div>

            <span
              className={`${styles.controlChangerText} ${
                isRussian ? styles.controlSwitcherActive : ""
              }`}
            >
              Ru
            </span>
          </button>
        </div>

        <nav className={styles.navigationBlock}>
          <button
            type="button"
            className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleActive : ""}`}
            aria-expanded={isMenuOpen}
            aria-controls="app-nav-list"
            onClick={toggleMenu}
          >
            <span className={styles.menuToggleLabel}>{text.navigation.menuLabel}</span>
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <ul
            id="app-nav-list"
            className={`${styles.listItems} ${isMenuOpen ? styles.menuOpen : ""}`}
          >
            {navigationItems.map(({ path, label }) => {
              const isActive = activePath === path;

              return (
                <li key={path} className={styles.listItem}>
                  <Link
                    className={`${styles.listItemLink} ${
                      isActive ? styles.listItemLinkActive : ""
                    }`}
                    href={buildLocalizedPath(language, path)}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(event) => handleNavigation(event, path)}
                  >
                    <span key={language} className="route-reveal">
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
