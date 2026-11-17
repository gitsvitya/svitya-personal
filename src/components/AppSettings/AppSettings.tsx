"use client";

import { getTranslations } from "../../content/ui-text";
import Section from "../Section/Section";
import { useSitePreferences } from "../SiteShell/SitePreferencesContext";
import styles from "./AppSettings.module.css";

export default function AppSettings() {
  const { themePreference, setTheme, language, changeLanguage, showCookieBanner } =
    useSitePreferences();
  const text = getTranslations(language);
  const ru = language === "ru";
  return (
    <Section id="settings" title={text.sections.settings} contentClassName={styles.layout}>
      <div className={styles.settings}>
        <section className={styles.row} aria-labelledby="language-heading">
          <h2 id="language-heading">{text.settings.language}</h2>
          <div
            className={`${styles.segments} ${styles.languageSegments}`}
            role="group"
            aria-labelledby="language-heading"
          >
            {(["ru", "en"] as const).map((locale) => (
              <button
                key={locale}
                type="button"
                className={styles.choice}
                data-language-choice={locale}
                aria-pressed={language === locale}
                onClick={() => changeLanguage(locale)}
              >
                {locale === "ru" ? "Русский" : "English"}
              </button>
            ))}
          </div>
        </section>
        <section className={styles.row} aria-labelledby="theme-heading">
          <h2 id="theme-heading">{ru ? "Тема оформления" : "Appearance"}</h2>
          <div
            className={`${styles.segments} ${styles.themeSegments}`}
            role="group"
            aria-labelledby="theme-heading"
            aria-describedby="theme-hint"
          >
            {(["light", "dark", "system"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={styles.choice}
                data-theme-choice={option}
                aria-pressed={themePreference === option}
                onClick={() => setTheme(option)}
              >
                {option === "light"
                  ? ru
                    ? "Светлая"
                    : "Light"
                  : option === "dark"
                    ? ru
                      ? "Тёмная"
                      : "Dark"
                    : ru
                      ? "Система"
                      : "System"}
              </button>
            ))}
          </div>
          <p id="theme-hint" className={styles.hint}>
            {ru ? "«Система» использует тему браузера." : "System follows your browser’s theme."}
          </p>
        </section>
        <section className={styles.row} aria-labelledby="cookies-heading">
          <h2 id="cookies-heading">Cookie</h2>
          <button
            type="button"
            className={`${styles.choice} ${styles.cookieBannerButton}`}
            onClick={showCookieBanner}
          >
            {text.settings.showCookieBanner}
          </button>
        </section>
      </div>
    </Section>
  );
}
