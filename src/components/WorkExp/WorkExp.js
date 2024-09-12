import styles from "./WorkExp.module.css";
import { HandySvg } from "handy-svg";
import moexLogo from '../../images/moex_logo.svg';
import lukoilLogo from '../../images/lukoil_logo.svg';
import kalashnikovlLogo from '../../images/kalashnikov_logo.svg';
import reutersLogo from '../../images/reuters_logo.svg';

function WorkExp(props) {
  return (
    <div className={styles.workExp}>
      <div className={styles.container}>
        <h2 className={styles.header}>{props.text.workExpBlockHeaderText}</h2>
        <div className={styles.cardBox}>
          <div className={styles.card}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>2021-2024</span>
                <span className={styles.cardCompanyName}>{props.text.workExpBlockCompanyNameNTB}</span>
                <span className={styles.cardTitle}>{props.text.workExpBlockComopanyTitleNTB}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={moexLogo}></HandySvg>
                </div>
              </div>
              <div className={styles.card}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>2020-2021</span>
                <span className={styles.cardCompanyName}>{props.text.projectBlockUsedToWorkTextLRNPT}</span>
                <span className={styles.cardTitle}>{props.text.workExpBlockComopanyTitleLRNPT}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={lukoilLogo}></HandySvg>
                </div>
              </div>
              <div className={styles.card}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>2018-2019</span>
                <span className={styles.cardCompanyName}>{props.text.projectBlockUsedToWorkTextKG}</span>
                <span className={styles.cardTitle}>{props.text.workExpBlockComopanyTitleKG}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={kalashnikovlLogo}></HandySvg>
                </div>
              </div>
              <div className={styles.card}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>2014-2018</span>
                <span className={styles.cardCompanyName}>{props.text.projectBlockUsedToWorkTextTR}</span>
                <span className={styles.cardTitle}>{props.text.workExpBlockComopanyTitleTR}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={reutersLogo}></HandySvg>
                </div>
              </div>
        </div>
      {/* <p className={styles.text}>
          {props.text.projectBlockUsedToWorkText}
          <a className={styles.link} href="https://namex.org/" target="_blank">
            {props.text.projectBlockUsedToWorkTextNTB}
          </a>
          ,{" "}
          <a
            className={styles.link}
            href="https://trading.lukoil.ru/"
            target="_blank"
          >
            {props.text.projectBlockUsedToWorkTextLRNPT}
          </a>
          ,{" "}
          <a
            className={styles.link}
            href="https://kalashnikovgroup.ru/"
            target="_blank"
          >
            {props.text.projectBlockUsedToWorkTextKG}
          </a>
          ,{" "}
          <a
            className={styles.link}
            href="https://www.thomsonreuters.com/"
            target="_blank"
          >
            {props.text.projectBlockUsedToWorkTextTR}
          </a>
          .
        </p> */}
      </div>
    </div>
  )
}

export default WorkExp;
