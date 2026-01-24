import styles from "./Card.module.css";
import { logos } from "../../utils/cardLogos.js";
import { cardMap } from "../../utils/cardMap.js";

// Карточка опыта: подтягивает данные по ключу, показывает логотип и открывает модалку по клику.
function Card({ companyName, openModal, setModalContentCompany, text }) {
  const logo = logos[companyName];
  const config = cardMap[companyName];
  if (!config) return null;

  // Активируем карточку: запоминаем источник и открываем модальное окно.
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
      <img
        className={styles.logoPic}
        src={logo}
        alt={text[config.nameKey]}
        loading="lazy"
      />
    </button>
  );
}

export default Card;
