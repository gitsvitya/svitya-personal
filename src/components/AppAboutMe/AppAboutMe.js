import styles from "./AppAboutMe.module.css";

function AppAboutMe({text}) {
  return (
    <div className={styles.about} id="about">
      <div className={styles.container}>
        <h3 className={styles.header}>{text.aboutBlockHeaderText}</h3>
        <p className={styles.paragraph}>{text.aboutBlockParagraphText}</p>
      </div>
    </div>
  );
}

export default AppAboutMe;
