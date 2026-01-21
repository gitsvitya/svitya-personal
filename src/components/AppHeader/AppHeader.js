import styles from "./AppHeader.module.css";

function AppHeader({ text, setLanguage, language, theme, setTheme }) {
  const nextLng = language === "ru" ? "en" : "ru";
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.controls}>
          <button
            className={styles.controlChanger}
            onClick={() => {
              setTheme(nextTheme);
            }}
          >
            <span
              className={`${styles.controlChangerText} ${
                theme === "light" ? styles.themeActive : ""
              }`}
            >
              {text.themeLight}
            </span>
            <div
              className={`${styles.controlSwitcher} ${
                theme === "dark" ? styles.controlSwitcherActive : ""
              }`}
            >
              <div className={styles.switcherThumb}></div>
            </div>
            <span
              className={`${styles.controlChangerText} ${
                theme === "dark" ? styles.themeActive : ""
              }`}
            >
              {text.themeDark}
            </span>
          </button>
          <button
            className={styles.controlChanger}
            onClick={() => {
              setLanguage(`${nextLng}`);
            }}
          >
            <span className={styles.controlChangerText}>En</span>
            <div
              className={`${styles.controlSwitcher} ${
                language === "ru" ? styles.controlSwitcherActive : ""
              }`}
            >
              <div className={styles.switcherThumb}></div>
            </div>

            <span className={styles.controlChangerText}>Ru</span>
          </button>
        </div>
        <nav className={styles.navigationBlock}>
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
