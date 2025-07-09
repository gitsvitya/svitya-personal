import styles from "./Card.module.css";
import { logos } from "../../utils/cardLogos";

function Card({ CompanyName, openModal, setModalContentCompany, text }) {
  const logo = logos[CompanyName];
  if (CompanyName === "CI")
    return (
      <div
        className={styles.card}
        onClick={() => {
          openModal();
          setModalContentCompany("CI");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.workExpBlockCompanyYearCI}
          </span>
          <span className={styles.cardCompanyName}>
            {text.workExpBlockCompanyNameCI}
          </span>
          <span className={styles.cardTitle}>
            {text.workExpBlockComopanyTitleCI}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );
  if (CompanyName === "NTB")
    return (
      <div
        className={styles.card}
        onClick={() => {
          openModal();
          setModalContentCompany("NTB");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.workExpBlockCompanyYearNTB}
          </span>
          <span className={styles.cardCompanyName}>
            {text.workExpBlockCompanyNameNTB}
          </span>
          <span className={styles.cardTitle}>
            {text.workExpBlockComopanyTitleNTB}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );
  if (CompanyName === "LRNPT")
    return (
      <div
        className={styles.card}
        onClick={() => {
          openModal();
          setModalContentCompany("LRNPT");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.workExpBlockCompanyYearLRNPT}
          </span>
          <span className={styles.cardCompanyName}>
            {text.workExpBlockCompanyNameLRNPT}
          </span>
          <span className={styles.cardTitle}>
            {text.workExpBlockComopanyTitleLRNPT}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );
  if (CompanyName === "KG")
    return (
      <div
        className={styles.card}
        onClick={() => {
          openModal();
          setModalContentCompany("KG");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.workExpBlockCompanyYearKG}
          </span>
          <span className={styles.cardCompanyName}>
            {text.workExpBlockCompanyNameKG}
          </span>
          <span className={styles.cardTitle}>
            {text.workExpBlockComopanyTitleKG}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );
  if (CompanyName === "TR")
    return (
      <div
        className={styles.card}
        onClick={() => {
          openModal();
          setModalContentCompany("TR");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.workExpBlockCompanyYearTR}
          </span>
          <span className={styles.cardCompanyName}>
            {text.workExpBlockCompanyNameTR}
          </span>
          <span className={styles.cardTitle}>
            {text.workExpBlockComopanyTitleTR}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );
    if (CompanyName === "MBC")
      return (
        <div
          className={`${styles.card} ${styles.cardIncreasedLogo}`}
          onClick={() => {
            openModal();
            setModalContentCompany("MBC");
          }}
        >
          <div className={styles.cardText}>
            <span className={styles.cardYear}>
              {text.projectExpBlockCompanyYearMadBurglarCat}
            </span>
            <span className={styles.cardCompanyName}>
              {text.projectExpBlockCompanyNameMadBurglarCat}
            </span>
            <span className={styles.cardTitle}>
              {text.projectExpBlockComopanyTitleMadBurglarCat}
            </span>
            <button className={styles.cardButton}>
              <span className={styles.cardButtonText}>
                {text.cardButtonText}
              </span>
            </button>
          </div>
          <img className={styles.logoPic} src={logo}></img>
        </div>
      );
  if (CompanyName === "MNG")
    return (
      <div
        className={`${styles.card} ${styles.cardIncreasedLogo}`}
        onClick={() => {
          openModal();
          setModalContentCompany("MNG");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.projectExpBlockCompanyYearMappNgo}
          </span>
          <span className={styles.cardCompanyName}>
            {text.projectExpBlockCompanyNameMappNgo}
          </span>
          <span className={styles.cardTitle}>
            {text.projectExpBlockComopanyTitleMappNgo}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );
  if (CompanyName === "VNV")
    return (
      <div
        className={`${styles.card} ${styles.cardIncreasedLogo}`}
        onClick={() => {
          openModal();
          setModalContentCompany("VNV");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.projectExpBlockCompanyYearVenivi}
          </span>
          <span className={styles.cardCompanyName}>
            {text.projectExpBlockCompanyNameVenivi}
          </span>
          <span className={styles.cardTitle}>
            {text.projectExpBlockComopanyTitleVenivi}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );

  if (CompanyName === "SKO")
    return (
      <div
        className={`${styles.card} ${styles.cardIncreasedLogo}`}
        onClick={() => {
          openModal();
          setModalContentCompany("SKO");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.projectExpBlockCompanyYearStrokeOff}
          </span>
          <span className={styles.cardCompanyName}>
            {text.projectExpBlockCompanyNameStrokeOff}
          </span>
          <span className={styles.cardTitle}>
            {text.projectExpBlockComopanyTitleStrokeOff}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );

  if (CompanyName === "SDC")
    return (
      <div
        className={`${styles.card} ${styles.cardIncreasedLogo}`}
        onClick={() => {
          openModal();
          setModalContentCompany("SDC");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {text.projectExpBlockCompanyYearSvityaWeb}
          </span>
          <span className={styles.cardCompanyName}>
            {text.projectExpBlockCompanyNameSvityaWeb}
          </span>
          <span className={styles.cardTitle}>
            {text.projectExpBlockComopanyTitleSvityaWeb}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={logo}></img>
      </div>
    );
}

export default Card;
