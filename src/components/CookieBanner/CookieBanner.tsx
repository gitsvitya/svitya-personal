import { useEffect, useState } from "react";
import type { AppTranslations } from "../../content/ui-text";
import styles from "./CookieBanner.module.css";

// В localStorage храним только факт закрытия баннера,
// чтобы не показывать его повторно при следующих визитах.
const COOKIE_KEY = "cookieAccepted";

type CookieBannerProps = {
  text: AppTranslations;
};

// Компонент работает только на клиенте, потому что зависит от localStorage.
function CookieBanner({ text }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  // Если пользователь раньше уже закрыл баннер, повторно не рендерим его.
  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  // После подтверждения запоминаем выбор и сразу убираем баннер из DOM.
  function acceptCookies() {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
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
