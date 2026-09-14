import type { Language } from "../../types/domain";
import type { AppTranslations } from "../../content/ui-text";
import SocialIcon from "./SocialIcon";
import styles from "./AppFooter.module.css";

type AppFooterProps = {
  text: AppTranslations;
  language: Language;
};

function AppFooter({ text, language }: AppFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div key={language} className={`layout-container ${styles.container} route-reveal`}>
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
                    <SocialIcon name="telegram" className={styles.linkPic} />
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
                    <SocialIcon name="instagram" className={styles.linkPic} />
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
                    <SocialIcon name="linkedin" className={styles.linkPic} />
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
