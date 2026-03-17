import type { AppTranslations } from "../../utils/lng";
import styles from "./AppFooter.module.css";

type AppFooterProps = {
  text: AppTranslations;
  isLanguageSwitching: boolean;
};

// Рендерит футер с внешними ссылками на соцсети и текущим годом.
function AppFooter({ text, isLanguageSwitching }: AppFooterProps) {
  // Вычисляет текущий календарный год для отображения в подписи.
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${styles.footer} fade-transition ${
        isLanguageSwitching ? "fade-hidden" : "fade-visible"
      }`}
      id="footer"
    >
      <div className={`layout-container ${styles.container}`}>
        <div className={styles.disclaimerBlock}>
          <div className={styles.contactsBlock}>
            <span className={styles.text}>{text.footer.contacts}:</span>
            <div className={styles.navigation}>
              <ul className={styles.navigationList}>
                <li className={styles.navigationListItem}>
                  <a
                    className={styles.link}
                    href="https://www.t.me/vstrokov"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className={`${styles.linkPic} ${styles.linkPicTelegram}`} />
                    <span className={styles.linkText}>Telegram</span>
                  </a>
                </li>
                <li className={styles.navigationListItem}>
                  <a
                    className={styles.link}
                    href="https://www.instagram.com/vitya.strokov"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className={`${styles.linkPic} ${styles.linkPicInstagram}`} />
                    <span className={styles.linkText}>Instagram*</span>
                  </a>
                </li>
                <li className={styles.navigationListItem}>
                  <a
                    className={styles.link}
                    href="https://www.linkedin.com/in/victor-strokov"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className={`${styles.linkPic} ${styles.linkPicLinkedin}`} />
                    <span className={styles.linkText}>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <span className={styles.metaDisclaimer}>{text.footer.metaDisclaimer}</span>
        </div>
        <span className={styles.year}>{currentYear}</span>
      </div>
    </footer>
  );
}

export default AppFooter;
