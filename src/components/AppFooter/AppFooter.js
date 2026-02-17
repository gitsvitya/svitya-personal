import styles from "./AppFooter.module.css";

// Футер с соцссылками и годом.
function AppFooter({ text, isLanguageSwitching }) {
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
          {<span className={styles.text}>{text.appFooterContacts}:</span>}
          <div className={styles.navigation}>
            <ul className={styles.navigationList}>
              <li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.t.me/vstrokov"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div className={`${styles.linkPic} ${styles.linkPicTelegram}`}></div>
                  <span className={styles.linkText}>Telegram</span>
                </a>
              </li>
              {<li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.instagram.com/vitya.strokov"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div className={`${styles.linkPic} ${styles.linkPicInstagram}`}></div>
                  <span className={styles.linkText}>Instagram*</span>
                </a>
              </li>}
              <li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.linkedin.com/in/victor-strokov"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div className={`${styles.linkPic} ${styles.linkPicLinkedin}`}></div>
                  <span className={styles.linkText}>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <span className={styles.metaDisclaimer}>{text.appFooterMetaDisclaimer}</span>
        </div>
        <span className={styles.year}>2026</span>
      </div>
    </footer>
  );
}

export default AppFooter;
