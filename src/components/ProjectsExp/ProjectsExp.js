import styles from "./ProjectsExp.module.css";
import { HandySvg } from "handy-svg";
import mappngoLogo from '../../images/mappngoLogo_black.svg';
import veniviLogo from '../../images/veniviLogo.png';

function ProjectsExp(props) {
  return (
    <div className={styles.projectsExp}>
      <div className={styles.container}>
      <h2 className={styles.header}>{props.text.projectExpBlockHeaderText}</h2>
        <div className={styles.cardBox}>
          <div className={styles.card}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>2019-2020</span>
                <span className={styles.cardCompanyName}>{props.text.projectExpBlockCompanyNameMappNgo}</span>
                <span className={styles.cardTitle}>{props.text.projectExpBlockComopanyTitleMappNgo}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={mappngoLogo}></HandySvg>
                </div>
              </div>
              <div className={styles.card}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>2013-2014</span>
                <span className={styles.cardCompanyName}>{props.text.projectExpBlockCompanyNameVenivi}</span>
                <span className={styles.cardTitle}>{props.text.projectExpBlockComopanyVenivi}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                  <img className={styles.logoPic} src={veniviLogo}></img>
                </div>
              </div>
        </div>
        {/* <p className={styles.text}>
          {props.text.projectBlockFoundedText}
          <a
            className={styles.link}
            href="https://www.mappngo.com/"
            target="_blank"
          >
            {props.text.projectBlockFoundedTextMappNgo}
          </a>
          ,{" "}
          <a className={styles.link} href="https://venivi.ru/" target="_blank">
            {props.text.projectBlockFoundedTextVenivi}
          </a>
          .
        </p> */}
      </div>
    </div>
  );
}

export default ProjectsExp;
