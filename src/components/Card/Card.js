import styles from './Card.module.css';
import { HandySvg } from "handy-svg";
import moexLogo from '../../images/moex_logo.svg';
import lukoilLogo from '../../images/lukoil_logo.svg';
import kalashnikovlLogo from '../../images/kalashnikov_logo.svg';
import reutersLogo from '../../images/reuters_logo.svg';

function Card (props) {

  console.log(props);
  if (props.CompanyName === "NTB")
    return (
      <div className={styles.card} onClick={() => {props.openModal(); props.SetModalContentCompany("WorkNTB");}}>
        <div className={styles.cardText}>
          <span className={styles.cardYear}>{props.props.text.workExpBlockCompanyYearNTB}</span>
          <span className={styles.cardCompanyName}>{props.props.text.workExpBlockCompanyNameNTB}</span>
          <span className={styles.cardTitle}>{props.props.text.workExpBlockComopanyTitleNTB}</span>
          <span className={styles.cardButton}>{props.props.text.cardButtonText}</span>
        </div>
        <div className={styles.logoBlock}>
          <HandySvg className={styles.logoPic} src={moexLogo}></HandySvg>
        </div>
      </div>
    );
  if (props.CompanyName === "LRNPT")
    return (
      <div className={styles.card} onClick={() => {props.openModal(); props.SetModalContentCompany("WorkLRNPT");}}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>{props.props.text.workExpBlockCompanyYearLRNPT}</span>
                <span className={styles.cardCompanyName}>{props.props.text.workExpBlockCompanyNameLRNPT}</span>
                <span className={styles.cardTitle}>{props.props.text.workExpBlockComopanyTitleLRNPT}</span>
                <span className={styles.cardButton}>{props.props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={lukoilLogo}></HandySvg>
                </div>
              </div>
  );
  if (props.CompanyName === "KG")
    return (
      <div className={styles.card} onClick={() => {props.openModal(); props.SetModalContentCompany("WorkKG");}}>
      <div className={styles.cardText}>
        <span className={styles.cardYear}>{props.props.text.workExpBlockCompanyYearKG}</span>
        <span className={styles.cardCompanyName}>{props.props.text.workExpBlockCompanyNameKG}</span>
        <span className={styles.cardTitle}>{props.props.text.workExpBlockComopanyTitleKG}</span>
        <span className={styles.cardButton}>{props.props.text.cardButtonText}</span>
      </div>
        <div className={styles.logoBlock}>
        <HandySvg className={styles.logoPic} src={kalashnikovlLogo}></HandySvg>
        </div>
      </div>
  );
  if (props.CompanyName === "TR")
    return (
      <div className={styles.card} onClick={() => {props.openModal(); props.SetModalContentCompany("WorkTR");}}>
      <div className={styles.cardText}>
        <span className={styles.cardYear}>{props.props.text.workExpBlockCompanyYearTR}</span>
        <span className={styles.cardCompanyName}>{props.props.text.workExpBlockCompanyNameTR}</span>
        <span className={styles.cardTitle}>{props.props.text.workExpBlockComopanyTitleTR}</span>
        <span className={styles.cardButton}>{props.props.text.cardButtonText}</span>
      </div>
        <div className={styles.logoBlock}>
        <HandySvg className={styles.logoPic} src={reutersLogo}></HandySvg>
        </div>
      </div>
  );
  // if (props.CompanyName === "MNG")
  //   return (
  // );
  // if (props.CompanyName === "VNV")
  //   return (
  // );
}

export default Card;
