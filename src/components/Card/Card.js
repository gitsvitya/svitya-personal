import styles from "./Card.module.css";
import { logos } from "../../utils/cardLogos.js";
import { cardMap } from "../../utils/cardMap.js";

function Card({ companyName, openModal, setModalContentCompany, text }) {
  const logo = logos[companyName];
  const config = cardMap[companyName];
  if (!config) return null;

  function handleActivate() {
    openModal();
    setModalContentCompany(companyName);
  }

  function handleKeyDown(evt) {
    if (evt.key === "Enter" || evt.key === " ") {
      evt.preventDefault();
      handleActivate();
    }
  }

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.cardText}>
        <span className={styles.cardYear}>{text[config.yearKey]}</span>
        <span className={styles.cardCompanyName}>{text[config.nameKey]}</span>
        <span className={styles.cardTitle}>{text[config.titleKey]}</span>
        <button className={styles.cardButton}>
          <span className={styles.cardButtonText}>{text.cardButtonText}</span>
        </button>
      </div>
      <img className={styles.logoPic} src={logo}></img>
    </div>
  );
}

export default Card;
