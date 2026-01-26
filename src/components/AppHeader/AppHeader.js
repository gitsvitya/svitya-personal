import styles from "./AppHeader.module.css";

// Шапка страницы: переключатели языка/темы и навигация по якорям.
function AppHeader({
  text,
  onLanguageChange,
  language,
  theme,
  setTheme,
  isLanguageSwitching,
}) {
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
          <ul className={styles.listItems}>
            <li className={styles.listItem}>
              <a className={styles.listItemLink} href="#about">
                {text.aboutBlockHeaderText}
              </a>
            </li>
            <li className={styles.listItem}>
              <a className={styles.listItemLink} href="#workExp">
                {text.workExpBlockHeaderText}
              </a>
            </li>
            <li className={styles.listItem}>
              <a className={styles.listItemLink} href="#projectsExp">
                {text.projectExpBlockHeaderText}
              </a>
            </li>
            <li className={styles.listItem}>
              <a className={styles.listItemLink} href="#otherExp">
                {text.otherExpBlockHeaderText}
              </a>
            </li>
            <li className={`${styles.listItem} ${styles.listItemFooter}`}>
              <a className={styles.listItemLink} href="#footer">
                {text.appFooterContacts}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
