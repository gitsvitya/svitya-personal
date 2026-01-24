import { useEffect, useState } from "react";
import styles from './CookieBanner.module.css';

const COOKIE_KEY = 'cookieAccepted';

// Баннер про cookies: показываем, если ранее не принимали, и записываем флаг в localStorage.
function CookieBanner({text}) {
 const [visible, setVisible] = useState(false);

 useEffect(() => {
  if (!localStorage.getItem(COOKIE_KEY)) {
    setVisible(true);
  }
 }, []);

 function acceptCookies() {
  localStorage.setItem(COOKIE_KEY, 'true');
  setVisible(false);
 }

 if (!visible) {
  return null;
 }

 return (
  <div className={styles.banner}>
  <p className={styles.paragraph}>{text.cookieBannerBlockParagraphText}</p>
  <button className={styles.button} onClick={acceptCookies}>{text.cookieBannerBlockButtonText}</button>
  </div>
 );
}

export default CookieBanner;
