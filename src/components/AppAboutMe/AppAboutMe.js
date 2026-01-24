import Section from "../Section/Section";
import styles from "./AppAboutMe.module.css";

// Блок «Обо мне»: текстовый абзац внутри стандартной секции.
function AppAboutMe({ text }) {
  return (
    <Section id="about" title={text.aboutBlockHeaderText}>
      <p className={styles.paragraph}>{text.aboutBlockParagraphText}</p>
    </Section>
  );
}

export default AppAboutMe;
