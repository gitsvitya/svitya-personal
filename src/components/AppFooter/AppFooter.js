import styles from "./AppFooter.module.css";
import { HandySvg } from "handy-svg";
import telegramLogo from "../../images/telegram_logo.svg";
import instagramLogo from "../../images/instagram_logo.svg";
import linkedinLogo from "../../images/linkedin_logo.svg";

function AppFooter(props) {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>
        <div className={styles.contactsBlock}>
          {<p className={styles.text}>{props.text.appFooterContacts}:</p>}
          <div className={styles.navigation}>
            <ul className={styles.navigationList}>
              <li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.t.me/vstrokov"
                  target="_blank"
                >
                  <HandySvg className={styles.linkPic} src={telegramLogo}></HandySvg>
                  Telegram
                </a>
              </li>
              <li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.instagram.com/vitya.strokov"
                  target="_blank"
                >
                  <HandySvg className={styles.linkPic} src={instagramLogo}></HandySvg>
                  Instagram
                </a>
              </li>
              <li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.linkedin.com/in/victor-strokov"
                  target="_blank"
                >
                  <HandySvg className={styles.linkPic} src={linkedinLogo}></HandySvg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className={styles.year}>2024</p>
      </div>
    </footer>
  );
}

export default AppFooter;
