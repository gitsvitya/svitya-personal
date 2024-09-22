import styles from "./AppHeader.module.css";
import { HandySvg } from "handy-svg";
import lngSwitcherPic from "../../images/icon-lang-toggle.svg";
import lngSwitcherPicInv from "../../images/icon-lang-toggle-inv.svg";

function AppHeader(props) {
  let nextLng = "";

  if (props.Language === "ru") nextLng = "en";
  else nextLng = "ru";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
          <nav className={styles.navigationBlock}>
            <ul className={styles.listItems}>
              <li className={styles.listItem}>
                <a className={styles.listItemLink} href="#about">{props.text.aboutBlockHeaderText}</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.listItemLink} href="#workExp">{props.text.workExpBlockHeaderText}</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.listItemLink} href="#projectsExp">{props.text.projectExpBlockHeaderText}</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.listItemLink} href="#otherExp">{props.text.otherExpBlockHeaderText}</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.listItemLink} href="#footer">{props.text.appFooterContacts}</a>
              </li>
            </ul>
          </nav>
        <button
          className={styles.lngChanger}
          onClick={() => {
            props.ChangeLanguage(`${nextLng}`);
          }}
        >
          <span>Ru</span>

          {
            <HandySvg
              className={styles.lngSwitcher}
              src={props.Language == "en" ? lngSwitcherPic : lngSwitcherPicInv}
            ></HandySvg>
          }

          <span>En</span>
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
