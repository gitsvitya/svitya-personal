import type { AppTranslations } from "../../content/ui-text";
import { useAnalyticsConsent } from "../../hooks/useAnalyticsConsent";
import { setBrowserAnalyticsConsent, type AnalyticsConsent } from "../../utils/analyticsConsent";
import styles from "./CookieBanner.module.css";

type CookieBannerProps = {
  text: AppTranslations;
  initialConsent: AnalyticsConsent;
};

function CookieBanner({ text, initialConsent }: CookieBannerProps) {
  const consent = useAnalyticsConsent(initialConsent);
  if (consent !== null) return null;

  return (
    <div
      className={styles.banner}
      role="region"
      aria-label={text.cookieBanner.label}
      aria-describedby="cookie-consent-description"
    >
      <p id="cookie-consent-description" className={styles.paragraph}>
        {text.cookieBanner.description}
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => setBrowserAnalyticsConsent("denied")}
        >
          {text.cookieBanner.reject}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={() => setBrowserAnalyticsConsent("granted")}
        >
          {text.cookieBanner.accept}
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
