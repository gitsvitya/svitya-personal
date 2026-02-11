import Section from "../Section/Section";
import styles from "./AppAboutMe.module.css";

//  Блок «Обо мне».
function AppAboutMe({ text }) {
  return (
    <Section
      id="about"
      // title={text.aboutBlockHeaderText}
      contentClassName={styles.container}
    >
      <div className={styles.photoBlock}>
        <div className={styles.photo}></div>
        <div className={styles.textBlock}>
          <h1 className={styles.header}>{text.titleBlockHeader}</h1>
          <p className={styles.subheader}>{text.titleBlockSubHeader}</p>
        </div>
      </div>
      <p className={styles.paragraph}>{text.aboutBlockParagraphText}</p>
    </Section>
  );
}

export default AppAboutMe;
