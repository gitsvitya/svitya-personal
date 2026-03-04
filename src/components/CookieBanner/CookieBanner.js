import { useEffect, useState } from "react";
import styles from './CookieBanner.module.css';

// Ключ флага, подтверждающего согласие пользователя на использование cookie.
const COOKIE_KEY = 'cookieAccepted';

// Отображает уведомление о cookie и скрывает его после подтверждения.
function CookieBanner({ text }) {
  const [visible, setVisible] = useState(false);

  // Показывает баннер только при отсутствии ранее сохраненного согласия.
  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  // Сохраняет согласие в localStorage и скрывает баннер.
  function acceptCookies() {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <p className={styles.paragraph}>{text.cookieBannerBlockParagraphText}</p>
      <button type="button" className={styles.button} onClick={acceptCookies}>
        {text.cookieBannerBlockButtonText}
      </button>
    </div>
  );
}

export default CookieBanner;
