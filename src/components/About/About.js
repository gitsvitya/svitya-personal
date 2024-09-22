import styles from "./About.module.css";

function About(props) {
  return (
    <div className={styles.about} id="about">
      <div className={styles.container}>
        <h2 className={styles.header}>{props.text.aboutBlockHeaderText}</h2>
        <p className={styles.paragraph}>{props.text.aboutBlockParagraphText}</p>
      </div>
    </div>
  );
}

export default About;
