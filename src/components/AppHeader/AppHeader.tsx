import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Language, SectionPath, Theme } from "../../types/domain";
import type { Dictionary } from "../../utils/lng";
import styles from "./AppHeader.module.css";

type AppHeaderProps = {
  text: Dictionary;
  onLanguageChange: (nextLanguage: Language) => void;
  language: Language;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  isLanguageSwitching: boolean;
  activePath: SectionPath;
  onNavigate: (path: SectionPath) => void;
};

// Рендерит верхнюю панель с переключением темы/языка и навигацией по разделам.
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
  // Хранит состояние мобильного меню.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Вычисляет целевые значения для переключателей языка и темы.
  const nextLng: Language = language === "ru" ? "en" : "ru";
  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const isDarkTheme = theme === "dark";
  const isRussian = language === "ru";

  // Переключает тему между светлой и темной.
  function toggleTheme() {
    setTheme(nextTheme);
  }

  // Передает в родитель запрос на смену языка.
  function toggleLanguage() {
    onLanguageChange(nextLng);
  }

  // Закрывает мобильное меню по Escape и при выходе за мобильный брейкпоинт.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    function handleResize() {
      if (window.innerWidth > 780 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // Переключает видимость мобильного меню.
  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  // Явно закрывает мобильное меню после перехода по разделу.
  function closeMenu() {
    setIsMenuOpen(false);
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
              {text.themeLight}
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
              {text.themeDark}
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
            <span className={styles.menuToggleLabel}>{text.navigationLowResMenu}</span>
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
            <li className={styles.listItem}>
              <button
                type="button"
                className={`${styles.listItemLink} ${
                  activePath === "/about" ? styles.listItemLinkActive : ""
                }`}
                onClick={() => {
                  onNavigate("/about");
                  closeMenu();
                }}
              >
                {text.aboutBlockHeaderText}
              </button>
            </li>
            <li className={styles.listItem}>
              <button
                type="button"
                className={`${styles.listItemLink} ${
                  activePath === "/work" ? styles.listItemLinkActive : ""
                }`}
                onClick={() => {
                  onNavigate("/work");
                  closeMenu();
                }}
              >
                {text.workExpBlockHeaderText}
              </button>
            </li>
            <li className={styles.listItem}>
              <button
                type="button"
                className={`${styles.listItemLink} ${
                  activePath === "/projects" ? styles.listItemLinkActive : ""
                }`}
                onClick={() => {
                  onNavigate("/projects");
                  closeMenu();
                }}
              >
                {text.projectExpBlockHeaderText}
              </button>
            </li>
            <li className={styles.listItem}>
              <button
                type="button"
                className={`${styles.listItemLink} ${
                  activePath === "/activities" ? styles.listItemLinkActive : ""
                }`}
                onClick={() => {
                  onNavigate("/activities");
                  closeMenu();
                }}
              >
                {text.otherExpBlockHeaderText}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
