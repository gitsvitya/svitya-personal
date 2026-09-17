import { useSyncExternalStore } from "react";
import type { AppTranslations } from "../../content/ui-text";
import { useAnalyticsConsent } from "../../hooks/useAnalyticsConsent";
import { setBrowserAnalyticsConsent, type AnalyticsConsent } from "../../utils/analyticsConsent";
import styles from "./CookieBanner.module.css";

type CookieBannerProps = {
  text: AppTranslations;
  forceOpen: boolean;
  onClose: () => void;
};

const subscribeToHydration = () => () => undefined;

function CookieBanner({ text, forceOpen, onClose }: CookieBannerProps) {
  const consent = useAnalyticsConsent();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  if (!isHydrated || (consent !== null && !forceOpen)) return null;
  const acceptLastWordStart = text.cookieBanner.accept.lastIndexOf(" ") + 1;

  function saveConsent(nextConsent: Exclude<AnalyticsConsent, null>) {
    setBrowserAnalyticsConsent(nextConsent);
    onClose();
  }

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
          onClick={() => saveConsent("denied")}
        >
          <span className={`button-label ${styles.buttonText}`}>{text.cookieBanner.reject}</span>
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.acceptButton}`}
          onClick={() => saveConsent("granted")}
        >
          <span className={`button-label ${styles.buttonText}`}>
            {text.cookieBanner.accept.slice(0, acceptLastWordStart)}
            <span className={styles.buttonEnding}>
              {text.cookieBanner.accept.slice(acceptLastWordStart)}
              {"\u00a0"}
              <span className={styles.buttonArrow} aria-hidden="true">
                →
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
