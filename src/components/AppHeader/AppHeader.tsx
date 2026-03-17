import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Language, SectionPath, Theme } from "../../types/domain";
import type { AppTranslations } from "../../content/ui-text";
import styles from "./AppHeader.module.css";

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

// Header отвечает только за UI-переключатели и отправляет наверх события
// смены темы, языка и раздела без собственной роутинг-логики.
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
  // Состояние мобильного меню локально для шапки и не нужно остальным частям приложения.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Вычисляем следующие состояния заранее, чтобы JSX был проще и без inline-тернарников.
  const nextLng: Language = language === "ru" ? "en" : "ru";
  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const isDarkTheme = theme === "dark";
  const isRussian = language === "ru";

  // Здесь только сообщаем новое значение наверх; синхронизация темы с DOM
  // и хранилищами остается внутри профильного hook.
  function toggleTheme() {
    setTheme(nextTheme);
  }

  // Смена языка инициирует переход на ту же секцию в другой локали.
  function toggleLanguage() {
    onLanguageChange(nextLng);
  }

  // Эффект поддерживает предсказуемое поведение мобильного меню:
  // оно закрывается по Escape и не остается открытым после выхода из mobile breakpoint.
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

  // Простое переключение открытия меню по кнопке-бургеру.
  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  // После выбора раздела меню закрывается сразу, не дожидаясь смены маршрута.
  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={`layout-container ${styles.container}`}>
        {/* Блок глобальных переключателей темы и языка. */}
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

        {/* Навигация по разделам построена на кнопках, потому что переход
            выполняется через клиентский router с промежуточной анимацией. */}
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
                {text.sections.about}
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
                {text.sections.work}
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
                {text.sections.projects}
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
                {text.sections.activities}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
