import type { Dispatch, SetStateAction } from "react";
import type { CompanyId } from "../../types/domain";
import type { LocalizedCompany } from "../../content/companies";
import styles from "./Card.module.css";

type CardProps = {
  company: LocalizedCompany;
  openModal: () => void;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  ctaLabel: string;
};

// Рендерит интерактивную карточку компании и передает выбранный ключ в модальное окно.
function Card({ company, openModal, setModalContentCompany, ctaLabel }: CardProps) {
  // Открывает модалку и сохраняет идентификатор выбранной карточки.
  function handleActivate() {
    openModal();
    setModalContentCompany(company.id);
  }

  return (
    <button type="button" className={styles.card} onClick={handleActivate}>
      <div className={styles.cardText}>
        <span className={styles.cardYear}>{company.year}</span>
        <span className={styles.cardCompanyName}>{company.name}</span>
        <span className={styles.cardTitle}>{company.title}</span>
        <span className={styles.cardCta}>{ctaLabel}</span>
      </div>
      <img className={styles.logoPic} src={company.logo} alt={company.name} loading="lazy" />
    </button>
  );
}

export default Card;
