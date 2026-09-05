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
  isLanguageSwitching: boolean;
  activePath: SectionPath;
  onNavigate: (path: SectionPath) => void;
};

function AppHeader({
  text,
  onLanguageChange,
  language,
  theme,
  setTheme,
  isLanguageSwitching,
  activePath,
  onNavigate,
}: AppHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) setIsMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    desktopMedia.addEventListener("change", handleDesktopChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktopMedia.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: SectionPath) {
    if (!shouldHandleClientNavigation(event)) return;

    event.preventDefault();
    onNavigate(path);
    closeMenu();
  }

  return (
    <header className={styles.header}>
      <div className={`layout-container ${styles.container}`}>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.controlChanger} fade-transition ${
              isLanguageSwitching ? "fade-hidden" : "fade-visible"
            }`}
            onClick={toggleTheme}
            aria-pressed={isDarkTheme}
          >
            <span
              className={`${styles.controlChangerText} ${
                !isDarkTheme ? styles.controlSwitcherActive : ""
              }`}
            >
              {text.theme.light}
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
              {text.theme.dark}
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

        <nav
          className={`${styles.navigationBlock} fade-transition ${
            isLanguageSwitching ? "fade-hidden" : "fade-visible"
          }`}
        >
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
                    {label}
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
