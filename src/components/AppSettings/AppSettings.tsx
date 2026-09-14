"use client";

import { getTranslations } from "../../content/ui-text";
import Section from "../Section/Section";
import { useSitePreferences } from "../SiteShell/SitePreferencesContext";
import styles from "./AppSettings.module.css";

export default function AppSettings() {
  const { theme, setTheme, language, changeLanguage, openCookieSettings } = useSitePreferences();
  const text = getTranslations(language);
  const isDark = theme === "dark";
  const isRussian = language === "ru";

  return (
    <Section id="settings" title={text.sections.settings}>
      <div className={styles.settings}>
        <section className={styles.row} aria-labelledby="theme-heading">
          <div className={styles.copy}>
            <h2 id="theme-heading">{text.settings.theme}</h2>
            <p>{text.settings.themeDescription}</p>
          </div>
          <button
            id="theme-toggle"
            type="button"
            className={styles.controlChanger}
            aria-label={text.settings.darkTheme}
            aria-pressed={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <span className={styles.controlChangerText}>{text.theme.light}</span>
            <span
              aria-hidden="true"
              className={`${styles.controlSwitcher} ${isDark ? styles.controlSwitcherActive : ""}`}
            >
              <span className={styles.switcherThumb} />
            </span>
            <span className={styles.controlChangerText}>{text.theme.dark}</span>
          </button>
        </section>
        <section className={styles.row} aria-labelledby="language-heading">
          <div className={styles.copy}>
            <h2 id="language-heading">{text.settings.language}</h2>
            <p>{text.settings.languageDescription}</p>
          </div>
          <button
            id="language-toggle"
            type="button"
            className={styles.controlChanger}
            aria-label={text.settings.russianLanguage}
            aria-pressed={isRussian}
            onClick={() => changeLanguage(isRussian ? "en" : "ru")}
          >
            <span className={styles.controlChangerText} lang="en">
              En
            </span>
            <span
              aria-hidden="true"
              className={`${styles.controlSwitcher} ${isRussian ? styles.controlSwitcherActive : ""}`}
            >
              <span className={styles.switcherThumb} />
            </span>
            <span className={styles.controlChangerText} lang="en">
              Ru
            </span>
          </button>
        </section>
        <section className={styles.row} aria-labelledby="cookies-heading">
          <div className={styles.copy}>
            <h2 id="cookies-heading">{text.settings.cookies}</h2>
            <p>{text.settings.cookiesDescription}</p>
          </div>
          <button
            type="button"
            className={`button-secondary ${styles.cookieSettings}`}
            onClick={openCookieSettings}
          >
            {text.settings.cookieSettings}
          </button>
        </section>
      </div>
    </Section>
  );
}
