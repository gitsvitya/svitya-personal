import type { AppTranslations } from "../../content/ui-text";
import Section from "../Section/Section";
import styles from "./AppAboutMe.module.css";

type AppAboutMeProps = {
  text: AppTranslations;
};

// Отрисовывает главный блок "Обо мне" с фото, именем и кратким описанием.
function AppAboutMe({ text }: AppAboutMeProps) {
  return (
    <Section id="about" contentClassName={styles.container}>
      <div className={styles.photoBlock}>
        <div className={styles.photo} />
        <div className={styles.textBlock}>
          <h1 className={styles.header}>{text.about.title}</h1>
          <p className={styles.subheader}>{text.about.subtitle}</p>
        </div>
      </div>
      <p className={styles.paragraph}>{text.about.description}</p>
    </Section>
  );
}

export default AppAboutMe;
