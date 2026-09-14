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
    <TransitionLink className={styles.card} href={href}>
      <div className={styles.cardText}>
        <span className={styles.cardYear}>{company.year}</span>
        <span className={styles.cardCompanyName}>{company.name}</span>
        <span className={styles.cardTitle}>{company.title}</span>
        <span className={styles.cardCta}>
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </span>
      </div>
      <Image
        className={styles.logoPic}
        src={company.logo}
        alt=""
        sizes="(max-width: 640px) 80px, 112px"
        preload={preloadLogo}
      />
    </TransitionLink>
  );
}

export default Card;
