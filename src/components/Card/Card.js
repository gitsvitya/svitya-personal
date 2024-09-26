import styles from "./Card.module.css";
import { HandySvg } from "handy-svg";
import moexLogo from "../../images/moex_logo.svg";
import lukoilLogo from "../../images/lukoil_logo.svg";
import kalashnikovlLogo from "../../images/kalashnikov_logo.svg";
import reutersLogo from "../../images/reuters_logo.svg";
import mappngoLogo from "../../images/mappngoLogo_black.svg";
import veniviLogo from "../../images/veniviLogo.png";

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
            {props.props.text.cardButtonText}
          </button>
        </div>
        <div className={styles.logoBlock}>
          <HandySvg className={styles.logoPic} src={moexLogo}></HandySvg>
        </div>
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
            {props.props.text.cardButtonText}
          </button>
        </div>
        <div className={styles.logoBlock}>
          <HandySvg className={styles.logoPic} src={lukoilLogo}></HandySvg>
        </div>
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
            {props.props.text.cardButtonText}
          </button>
        </div>
        <div className={styles.logoBlock}>
          <HandySvg
            className={styles.logoPic}
            src={kalashnikovlLogo}
          ></HandySvg>
        </div>
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
            {props.props.text.cardButtonText}
          </button>
        </div>
        <div className={styles.logoBlock}>
          <HandySvg className={styles.logoPic} src={reutersLogo}></HandySvg>
        </div>
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
            {props.props.text.cardButtonText}
          </button>
        </div>
        <div className={styles.logoBlock}>
          <HandySvg className={styles.logoPic} src={mappngoLogo}></HandySvg>
        </div>
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
            {props.props.text.cardButtonText}
          </button>
        </div>
        <div className={styles.logoBlock}>
          <img className={styles.logoPic} src={veniviLogo}></img>
        </div>
      </div>
    );
}

export default Card;
