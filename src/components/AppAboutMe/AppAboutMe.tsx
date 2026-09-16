import Image from "next/image";
import type { AppTranslations } from "../../content/ui-text";
import type { Language } from "../../types/domain";
import portrait from "../../images/pages/about/portrait.png";
import Section from "../Section/Section";
import styles from "./AppAboutMe.module.css";

type AppAboutMeProps = { text: AppTranslations; language: Language };

function AppAboutMe({ text, language }: AppAboutMeProps) {
  const cvFileName = language === "ru" ? "CV_Строков_Виктор.pdf" : "CV_Strokov_Victor.pdf";

  return (
    <Section id="about" contentClassName={styles.container}>
      <Image
        className={styles.photo}
        src={portrait}
        alt={text.about.portraitAlt}
        sizes="(max-width: 640px) 144px, (max-width: 768px) 180px, 250px"
        preload
      />
      <div className={styles.textBlock}>
        <h1 className={styles.header}>{text.about.title}</h1>
        <p className={styles.subheader}>{text.about.subtitle}</p>
      </div>
      <p className={styles.paragraph}>{text.about.description}</p>
      <div className={styles.actions}>
        <a
          className={`button-secondary button-control ${styles.action} ${styles.contactAction}`}
          href="https://t.me/vstrokov"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="button-label">{text.about.contact}</span>
          <span className={`button-label ${styles.actionArrow}`} aria-hidden="true">
            →
          </span>
        </a>
        <a
          className={`button-secondary button-control ${styles.action}`}
          href={`/cv/${language}/${encodeURIComponent(cvFileName)}`}
          download={cvFileName}
        >
          <span className="button-label">{text.about.cv}</span>
          <span className={`button-label ${styles.actionArrow}`} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </Section>
  );
}

export default AppAboutMe;
