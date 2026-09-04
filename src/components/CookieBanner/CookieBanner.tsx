import { useState, useSyncExternalStore } from "react";
import type { AppTranslations } from "../../content/ui-text";
import styles from "./CookieBanner.module.css";

const COOKIE_KEY = "cookieAccepted";

type CookieBannerProps = {
  text: AppTranslations;
};

function CookieBanner({ text }: CookieBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const accepted = useSyncExternalStore(
    () => () => undefined,
    () => localStorage.getItem(COOKIE_KEY) === "true",
    () => true
  );
  const visible = !accepted && !dismissed;

  function acceptCookies() {
    localStorage.setItem(COOKIE_KEY, "true");
    setDismissed(true);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <p className={styles.paragraph}>{text.cookieBanner.description}</p>
      <button type="button" className={styles.button} onClick={acceptCookies}>
        {text.cookieBanner.button}
      </button>
    </div>
  );
}

export default CookieBanner;
