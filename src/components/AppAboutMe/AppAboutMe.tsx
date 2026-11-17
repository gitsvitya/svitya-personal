import Image from "next/image";
import type { AppTranslations } from "../../content/ui-text";
import type { Language } from "../../types/domain";
import { buildLocalizedPath } from "../../utils/routing";
import portrait from "../../images/pages/about/portrait.png";
import TransitionLink from "../SiteShell/TransitionLink";
import Section from "../Section/Section";
import styles from "./AppAboutMe.module.css";

type AppAboutMeProps = { text: AppTranslations; language: Language };

function AppAboutMe({ text, language }: AppAboutMeProps) {
  return (
    <Section id="about" contentClassName={styles.container}>
      <div className={styles.hero}>
        <div className={styles.identity}>
          <Image
            className={styles.photo}
            src={portrait}
            alt={text.about.portraitAlt}
            sizes="(max-width: 768px) 144px, (max-width: 1024px) 220px, 300px"
            preload
          />
        </div>
        <div className={styles.overview}>
          <div className={styles.heading}>
            <h1 className={styles.header}>{text.about.title}</h1>
            <p className={styles.subheader}>{text.about.subtitle}</p>
          </div>
          <p className={styles.paragraph}>{text.about.description}</p>
          <div className={styles.actions}>
            <TransitionLink
              className="button-control arrow-link"
              href={buildLocalizedPath(language, "/work")}
            >
              {text.about.work}{" "}
              <span className="link-arrow" aria-hidden="true">
                →
              </span>
            </TransitionLink>
            <TransitionLink
              className="button-control arrow-link"
              href={buildLocalizedPath(language, "/projects")}
            >
              {text.about.projects}{" "}
              <span className="link-arrow" aria-hidden="true">
                →
              </span>
            </TransitionLink>
          </div>
        </div>
      </div>
      <div className={styles.contact}>
        <p className={styles.contactBody}>
          {text.about.invitation} {text.about.invitationDetail}
        </p>
        <a
          className={`button-control button-primary arrow-link ${styles.contactLink}`}
          href="https://t.me/vstrokov"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text.about.contact}{" "}
          <span className="link-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </Section>
  );
}

export default AppAboutMe;
