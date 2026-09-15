import Image from "next/image";
import type { AppTranslations } from "../../content/ui-text";
import type { Language } from "../../types/domain";
import portrait from "../../images/pages/about/portrait.png";
import Section from "../Section/Section";
import TransitionLink from "../SiteShell/TransitionLink";
import styles from "./AppAboutMe.module.css";

type AppAboutMeProps = { text: AppTranslations; language: Language };

function AppAboutMe({ text, language }: AppAboutMeProps) {
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
          className="button-primary"
          href="https://t.me/vstrokov"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text.about.contact}
          <span aria-hidden="true">↗</span>
        </a>
        <TransitionLink className="button-secondary" href={`/${language}/work`}>
          {text.about.explore}
          <span aria-hidden="true">→</span>
        </TransitionLink>
      </div>
    </Section>
  );
}

export default AppAboutMe;
