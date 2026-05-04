import type { MouseEvent } from "react";
import type { CompanyId } from "../../types/domain";
import type { LocalizedCompany } from "../../content/companies";
import styles from "./Card.module.css";

type CardProps = {
  company: LocalizedCompany;
  onActivate: (companyId: CompanyId) => void;
  href: string;
  ctaLabel: string;
};

// Карточка знает только о своей записи и сообщает родителю,
// какую запись нужно показать на странице подробностей.
function Card({ company, onActivate, href, ctaLabel }: CardProps) {
  function handleActivate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    onActivate(company.id);
  }

  return (
    <a className={styles.card} href={href} onClick={handleActivate}>
      <div className={styles.cardText}>
        <span className={styles.cardYear}>{company.year}</span>
        <span className={styles.cardCompanyName}>{company.name}</span>
        <span className={styles.cardTitle}>{company.title}</span>
        <span className={styles.cardCta}>{ctaLabel}</span>
      </div>
      <img className={styles.logoPic} src={company.logo} alt={company.name} loading="lazy" />
    </a>
  );
}

export default Card;
