import Image from "next/image";
import type { AppTranslations } from "../../content/ui-text";
import portrait from "../../images/pages/about/portrait.png";
import Section from "../Section/Section";
import styles from "./AppAboutMe.module.css";

type AppAboutMeProps = {
  text: AppTranslations;
};

function AppAboutMe({ text }: AppAboutMeProps) {
  return (
    <Section id="about" contentClassName={styles.container}>
      <div className={styles.photoBlock}>
        <Image
          className={styles.photo}
          src={portrait}
          alt={text.about.portraitAlt}
          sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 250px"
          preload
        />
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
