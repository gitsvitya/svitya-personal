"use client";

import { getTranslations } from "../../content/ui-text";
import Section from "../Section/Section";
import AppIcon from "../AppIcon/AppIcon";
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
          <h2 id="theme-heading">{text.settings.theme}</h2>
          <button
            id="theme-toggle"
            type="button"
            className={`button-control ${styles.controlChanger}`}
            aria-label={text.settings.darkTheme}
            aria-pressed={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <span className={`button-label ${styles.controlChangerText}`}>{text.theme.light}</span>
            <span
              aria-hidden="true"
              className={`${styles.controlSwitcher} ${isDark ? styles.controlSwitcherActive : ""}`}
            >
              <span className={styles.switcherThumb} />
            </span>
            <span className={`button-label ${styles.controlChangerText}`}>{text.theme.dark}</span>
          </button>
        </section>
        <section className={styles.row} aria-labelledby="language-heading">
          <h2 id="language-heading">{text.settings.language}</h2>
          <button
            id="language-toggle"
            type="button"
            className={`button-control ${styles.controlChanger}`}
            aria-label={text.settings.russianLanguage}
            aria-pressed={isRussian}
            onClick={() => changeLanguage(isRussian ? "en" : "ru")}
          >
            <span className={`button-label ${styles.controlChangerText}`}>
              {text.languages.english}
            </span>
            <span
              aria-hidden="true"
              className={`${styles.controlSwitcher} ${isRussian ? styles.controlSwitcherActive : ""}`}
            >
              <span className={styles.switcherThumb} />
            </span>
            <span className={`button-label ${styles.controlChangerText}`}>
              {text.languages.russian}
            </span>
          </button>
        </section>
        <section className={styles.row} aria-labelledby="cookies-heading">
          <h2
            id="cookies-heading"
            className={styles.cookieHeading}
            aria-label={text.settings.cookies}
            title={text.settings.cookies}
          >
            <AppIcon name="cookie" className={styles.cookieIcon} />
          </h2>
          <button
            type="button"
            className={`button-control ${styles.cookieSettings}`}
            onClick={openCookieSettings}
          >
            <span className="button-label">{text.settings.cookieSettings}</span>
          </button>
        </section>
      </div>
    </Section>
  );
}
