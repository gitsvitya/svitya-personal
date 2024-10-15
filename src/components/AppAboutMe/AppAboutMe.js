import styles from "./AppAboutMe.module.css";

function AppAboutMe(props) {
  return (
    <div className={styles.about} id="about">
      <div className={styles.container}>
        <h3 className={styles.header}>{props.text.aboutBlockHeaderText}</h3>
        <p className={styles.paragraph}>{props.text.aboutBlockParagraphText}</p>
      </div>
    </div>
  );
}

export default AppAboutMe;
