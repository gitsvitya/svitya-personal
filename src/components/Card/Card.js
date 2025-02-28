import styles from "./Card.module.css";
import moexLogo from "../../images/moex_logo.png";
import lukoilLogo from "../../images/lukoil_logo.png";
import kalashnikovlLogo from "../../images/kalashnikov_logo.png";
import reutersLogo from "../../images/reuters_logo.png";
import mappngoLogo from "../../images/mappngoLogo_black.png";
import veniviLogo from "../../images/veniviLogo.png";
import strokeOffLabel from "../../images/stroke_off_label.png";
import svityaComLabel from "../../images/svitya_com_label.png";
import mbcLogo from "../../images/mbc_logo.png";

function Card(props) {
  if (props.CompanyName === "NTB")
    return (
      <div
        className={styles.card}
        onClick={() => {
          props.openModal();
          props.SetModalContentCompany("WorkNTB");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {props.props.text.workExpBlockCompanyYearNTB}
          </span>
          <span className={styles.cardCompanyName}>
            {props.props.text.workExpBlockCompanyNameNTB}
          </span>
          <span className={styles.cardTitle}>
            {props.props.text.workExpBlockComopanyTitleNTB}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {props.props.text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={moexLogo}></img>
      </div>
    );
  if (props.CompanyName === "LRNPT")
    return (
      <div
        className={styles.card}
        onClick={() => {
          props.openModal();
          props.SetModalContentCompany("WorkLRNPT");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {props.props.text.workExpBlockCompanyYearLRNPT}
          </span>
          <span className={styles.cardCompanyName}>
            {props.props.text.workExpBlockCompanyNameLRNPT}
          </span>
          <span className={styles.cardTitle}>
            {props.props.text.workExpBlockComopanyTitleLRNPT}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {props.props.text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={lukoilLogo}></img>
      </div>
    );
  if (props.CompanyName === "KG")
    return (
      <div
        className={styles.card}
        onClick={() => {
          props.openModal();
          props.SetModalContentCompany("WorkKG");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {props.props.text.workExpBlockCompanyYearKG}
          </span>
          <span className={styles.cardCompanyName}>
            {props.props.text.workExpBlockCompanyNameKG}
          </span>
          <span className={styles.cardTitle}>
            {props.props.text.workExpBlockComopanyTitleKG}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {props.props.text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={kalashnikovlLogo}></img>
      </div>
    );
  if (props.CompanyName === "TR")
    return (
      <div
        className={styles.card}
        onClick={() => {
          props.openModal();
          props.SetModalContentCompany("WorkTR");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {props.props.text.workExpBlockCompanyYearTR}
          </span>
          <span className={styles.cardCompanyName}>
            {props.props.text.workExpBlockCompanyNameTR}
          </span>
          <span className={styles.cardTitle}>
            {props.props.text.workExpBlockComopanyTitleTR}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {props.props.text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={reutersLogo}></img>
      </div>
    );
    if (props.CompanyName === "MBC")
      return (
        <div
          className={`${styles.card} ${styles.cardIncreasedLogo}`}
          onClick={() => {
            props.openModal();
            props.SetModalContentCompany("MBC");
          }}
        >
          <div className={styles.cardText}>
            <span className={styles.cardYear}>
              {props.props.text.projectExpBlockCompanyYearMadBurglarCat}
            </span>
            <span className={styles.cardCompanyName}>
              {props.props.text.projectExpBlockCompanyNameMadBurglarCat}
            </span>
            <span className={styles.cardTitle}>
              {props.props.text.projectExpBlockComopanyTitleMadBurglarCat}
            </span>
            <button className={styles.cardButton}>
              <span className={styles.cardButtonText}>
                {props.props.text.cardButtonText}
              </span>
            </button>
          </div>
          <img className={styles.logoPic} src={mbcLogo}></img>
        </div>
      );
  if (props.CompanyName === "MNG")
    return (
      <div
        className={`${styles.card} ${styles.cardIncreasedLogo}`}
        onClick={() => {
          props.openModal();
          props.SetModalContentCompany("MNG");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {props.props.text.projectExpBlockCompanyYearMappNgo}
          </span>
          <span className={styles.cardCompanyName}>
            {props.props.text.projectExpBlockCompanyNameMappNgo}
          </span>
          <span className={styles.cardTitle}>
            {props.props.text.projectExpBlockComopanyTitleMappNgo}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {props.props.text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={mappngoLogo}></img>
      </div>
    );
  if (props.CompanyName === "VNV")
    return (
      <div
        className={`${styles.card} ${styles.cardIncreasedLogo}`}
        onClick={() => {
          props.openModal();
          props.SetModalContentCompany("VNV");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {props.props.text.projectExpBlockCompanyYearVenivi}
          </span>
          <span className={styles.cardCompanyName}>
            {props.props.text.projectExpBlockCompanyNameVenivi}
          </span>
          <span className={styles.cardTitle}>
            {props.props.text.projectExpBlockComopanyTitleVenivi}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {props.props.text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={veniviLogo}></img>
      </div>
    );

  if (props.CompanyName === "SKO")
    return (
      <div
        className={`${styles.card} ${styles.cardIncreasedLogo}`}
        onClick={() => {
          props.openModal();
          props.SetModalContentCompany("SKO");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {props.props.text.projectExpBlockCompanyYearStrokeOff}
          </span>
          <span className={styles.cardCompanyName}>
            {props.props.text.projectExpBlockCompanyNameStrokeOff}
          </span>
          <span className={styles.cardTitle}>
            {props.props.text.projectExpBlockComopanyTitleStrokeOff}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {props.props.text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={strokeOffLabel}></img>
      </div>
    );

  if (props.CompanyName === "SDC")
    return (
      <div
        className={`${styles.card} ${styles.cardIncreasedLogo}`}
        onClick={() => {
          props.openModal();
          props.SetModalContentCompany("SDC");
        }}
      >
        <div className={styles.cardText}>
          <span className={styles.cardYear}>
            {props.props.text.projectExpBlockCompanyYearSvityaWeb}
          </span>
          <span className={styles.cardCompanyName}>
            {props.props.text.projectExpBlockCompanyNameSvityaWeb}
          </span>
          <span className={styles.cardTitle}>
            {props.props.text.projectExpBlockComopanyTitleSvityaWeb}
          </span>
          <button className={styles.cardButton}>
            <span className={styles.cardButtonText}>
              {props.props.text.cardButtonText}
            </span>
          </button>
        </div>
        <img className={styles.logoPic} src={svityaComLabel}></img>
      </div>
    );
}

export default Card;
