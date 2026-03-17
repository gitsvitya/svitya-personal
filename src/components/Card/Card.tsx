import type { Dispatch, SetStateAction } from "react";
import type { CompanyId } from "../../types/domain";
import type { Dictionary } from "../../utils/lng";
import styles from "./Card.module.css";
import { logos } from "../../utils/cardLogos";
import { cardMap } from "../../utils/cardMap";

type CardProps = {
  companyName: CompanyId;
  openModal: () => void;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  text: Dictionary;
};

// Рендерит интерактивную карточку компании и передает выбранный ключ в модальное окно.
function Card({ companyName, openModal, setModalContentCompany, text }: CardProps) {
  const logo = logos[companyName];
  const config = cardMap[companyName];

  // Открывает модалку и сохраняет идентификатор выбранной карточки.
  function handleActivate() {
    openModal();
    setModalContentCompany(companyName);
  }

  return (
    <button type="button" className={styles.card} onClick={handleActivate}>
      <div className={styles.cardText}>
        <span className={styles.cardYear}>{text[config.yearKey]}</span>
        <span className={styles.cardCompanyName}>{text[config.nameKey]}</span>
        <span className={styles.cardTitle}>{text[config.titleKey]}</span>
        <span className={styles.cardCta}>{text.cardButtonText}</span>
      </div>
      <img className={styles.logoPic} src={logo} alt={text[config.nameKey]} loading="lazy" />
    </button>
  );
}

export default Card;
