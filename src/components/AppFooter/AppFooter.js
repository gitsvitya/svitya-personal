import styles from "./AppFooter.module.css";

function AppFooter(props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contactsBlock}>
          {/* <p className={styles.text}>{props.text.appFooterContacts}</p> */}
          <nav className={styles.navigation}>
            <ul className={styles.navigationList}>
              <li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.t.me/vstrokov"
                  target="_blank"
                >
                  tg
                </a>
              </li>
              <li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.instagram.com/vitya.strokov"
                  target="_blank"
                >
                  ig
                </a>
              </li>
              <li className={styles.navigationListItem}>
                <a
                  className={styles.link}
                  href="https://www.linkedin.com/in/victor-strokov"
                  target="_blank"
                >
                  li
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className={styles.year}>2024</p>
      </div>
    </footer>
  );
}

export default AppFooter;
