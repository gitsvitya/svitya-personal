import Image from "next/image";
import type { LocalizedCompany } from "../../content/portfolio";
import TransitionLink from "../SiteShell/TransitionLink";
import styles from "./Card.module.css";

type CardProps = {
  company: LocalizedCompany;
  href: string;
  ctaLabel: string;
  preloadLogo?: boolean;
};

function Card({ company, href, ctaLabel, preloadLogo = false }: CardProps) {
  return (
    <TransitionLink className={`${styles.card} ${styles.catalogRow} arrow-link`} href={href}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIdentity}>
          <span className={styles.cardYear}>{company.year}</span>
          <span className={styles.cardCompanyName}>{company.name}</span>
        </div>
        <Image
          className={`${styles.logoPic} ${company.id === "KG" ? styles.lightLogoPlate : ""}`}
          src={company.logo}
          alt=""
          sizes="64px"
          preload={preloadLogo}
        />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardDescription}>{company.presentation.catalogDescription}</span>
        <span className={styles.cardOutcome}>{company.presentation.catalogOutcome}</span>
        <span className={styles.cardCta}>
          {ctaLabel}
          <span className="link-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </TransitionLink>
  );
}

export default Card;
