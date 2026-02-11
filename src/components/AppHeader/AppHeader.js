import { useEffect, useState } from "react";
import styles from "./AppHeader.module.css";

// Шапка страницы: переключатели языка/темы и навигация по якорям.
function AppHeader({
  text,
  onLanguageChange,
  language,
  theme,
  setTheme,
  isLanguageSwitching,
  activePath,
  onNavigate,
}) {

  // Объявляем состояния для переключения меню на маленьких мобильных разрешениях, а также переменные для переключения языка.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nextLng = language === "ru" ? "en" : "ru";
  const nextTheme = theme === "light" ? "dark" : "light";
  const isDarkTheme = theme === "dark";
  const isRussian = language === "ru";

  // Переключаем тему и фиксируем состояние активного варианта.
  function toggleTheme() {
    setTheme(nextTheme);
  }

  // Запускаем смену языка с анимацией из родителя.
  function toggleLanguage() {
    onLanguageChange(nextLng);
  }

  // Сворачиваем меню при Esc и когда выходим за мобильную ширину.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    function handleResize() {
      if (window.innerWidth > 428 && isMenuOpen) {
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

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.controlChanger} ${styles.fadeTransition} ${
              isLanguageSwitching ? styles.fadeHidden : styles.fadeVisible
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
              <div className={styles.switcherThumb}></div>
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
            <span className={`${styles.controlChangerText} ${
              !isRussian ? styles.controlSwitcherActive : ""
            }`}>En</span>
            <div
              className={`${styles.controlSwitcher} ${
                isRussian ? styles.controlSwitcherActive : ""
              }`}
            >
              <div className={styles.switcherThumb}></div>
            </div>

            <span className={`${styles.controlChangerText} ${
              isRussian ? styles.controlSwitcherActive : ""
            }`}>Ru</span>
          </button>
        </div>
        <nav
          className={`${styles.navigationBlock} ${styles.fadeTransition} ${
            isLanguageSwitching ? styles.fadeHidden : styles.fadeVisible
          }`}
        >
          <button
            type="button"
            className={`${styles.menuToggle} ${
              isMenuOpen ? styles.menuToggleActive : ""
            }`}
            aria-expanded={isMenuOpen}
            aria-controls="app-nav-list"
            onClick={toggleMenu}
          >
            <span className={styles.menuToggleLabel}>{text.navigationLowResMenu}</span>
            <span className={styles.menuIcon} aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <ul
            id="app-nav-list"
            className={`${styles.listItems} ${isMenuOpen ? styles.menuOpen : ""}`}
          >
            <li className={styles.listItem}>
              <button
                type="button"
                className={`${styles.listItemLink} ${activePath === "/about" ? styles.listItemLinkActive : ""}`}
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
                className={`${styles.listItemLink} ${activePath === "/work" ? styles.listItemLinkActive : ""}`}
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
                className={`${styles.listItemLink} ${activePath === "/projects" ? styles.listItemLinkActive : ""}`}
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
                className={`${styles.listItemLink} ${activePath === "/activities" ? styles.listItemLinkActive : ""}`}
                onClick={() => {
                  onNavigate("/activities");
                  closeMenu();
                }}
              >
                {text.otherExpBlockHeaderText}
              </button>
            </li>
            {/* <li className={`${styles.listItem} ${styles.listItemFooter}`}>
              <a className={styles.listItemLink} href="#footer" onClick={closeMenu}>
                {text.appFooterContacts}
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
