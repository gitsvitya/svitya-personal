import { useEffect, useRef, useSyncExternalStore } from "react";
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
  const bannerRef = useRef<HTMLDivElement>(null);
  const consent = useAnalyticsConsent();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const isVisible = isHydrated && (consent === null || forceOpen);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!isVisible || !banner) return;

    function keepFocusedControlVisible() {
      const focused = document.activeElement;
      if (
        !banner ||
        !(focused instanceof HTMLElement) ||
        focused === document.body ||
        focused === document.documentElement ||
        banner.contains(focused) ||
        focused.closest('[aria-modal="true"]')
      ) {
        return;
      }

      // Native focus scrolling can ignore fixed overlays, even with scroll padding.
      const visibleBottom = banner.getBoundingClientRect().top - 12;
      const focusedBottom = focused.getBoundingClientRect().bottom;
      if (focusedBottom > visibleBottom) {
        window.scrollBy({ top: focusedBottom - visibleBottom, behavior: "instant" });
      }
    }

    function reserveBannerSpace() {
      if (!banner) return;
      const bottomGap = parseFloat(getComputedStyle(banner).bottom);
      const space = Math.ceil(banner.getBoundingClientRect().height + bottomGap + 12);
      document.documentElement.style.setProperty("--cookie-banner-space", `${space}px`);
      keepFocusedControlVisible();
    }

    reserveBannerSpace();
    const observer = new ResizeObserver(reserveBannerSpace);
    observer.observe(banner);
    document.addEventListener("focusin", keepFocusedControlVisible);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", keepFocusedControlVisible);
      document.documentElement.style.removeProperty("--cookie-banner-space");
    };
  }, [isVisible]);

  if (!isVisible) return null;
  const acceptLastWordStart = text.cookieBanner.accept.lastIndexOf(" ") + 1;

  function saveConsent(nextConsent: Exclude<AnalyticsConsent, null>) {
    setBrowserAnalyticsConsent(nextConsent);
    onClose();
  }

  return (
    <div
      ref={bannerRef}
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
