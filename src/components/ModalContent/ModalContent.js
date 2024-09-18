import styles from "./ModalContent.module.css"
import { HandySvg } from "handy-svg";
import moexLogo from '../../images/moex_logo.svg';
import lukoilLogo from '../../images/lukoil_logo.svg';
import kalashnikovlLogo from '../../images/kalashnikov_logo.svg';
import reutersLogo from '../../images/reuters_logo.svg';


function ModalContent(props) {
  if (props.ModalContent === "WorkNTB")
    return (
  <div className={styles.modalContentRenderGeneralWindow}>
    <div className={styles.modalContentRenderTextLogoWindow}>
      <div className={styles.modalContentRenderCompanyTextBox}>
        <span className={styles.modalContentRendercardYear}>{props.text.workExpBlockCompanyYearNTB}</span>
        <span className={styles.modalContentRendercardCompanyName}>{props.text.workExpBlockCompanyNameNTB}</span>
        <a className={styles.modalContentRenderlink} href="https://namex.org/" target="_blank">
        namex.org
        </a>
        <span className={styles.modalContentRendercardTitle}>{props.text.workExpBlockComopanyTitleNTB}</span>
      </div>
      <div className={styles.modalContentRenderlogoBlock}>
        <HandySvg className={styles.modalContentRenderlogoPic} src={moexLogo}></HandySvg>
      </div>
    </div>
    <div className={styles.modalContentRenderParagraphBlock}>
      <p className={styles.modalContentRenderParagraphCompanyDescription}>{props.text.workExpBlockComopanyAboutNTB}</p>
      <p className={styles.modalContentRenderParagraphPersonalDescription}>{props.text.workExpBlockComopanyResultsNTB}</p>
    </div>
  </div>
    );
  if (props.ModalContent === "WorkLRNPT")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
    <div className={styles.modalContentRenderTextLogoWindow}>
      <div className={styles.modalContentRenderCompanyTextBox}>
        <span className={styles.modalContentRendercardYear}>{props.text.workExpBlockCompanyYearLRNPT}</span>
        <span className={styles.modalContentRendercardCompanyName}>{props.text.workExpBlockCompanyNameLRNPT}</span>
        <a className={styles.modalContentRenderlink} href="https://trading.lukoil.ru/" target="_blank">
        trading.lukoil.ru
        </a>
        <span className={styles.modalContentRendercardTitle}>{props.text.workExpBlockComopanyTitleLRNPT}</span>
      </div>
      <div className={styles.modalContentRenderlogoBlock}>
        <HandySvg className={styles.modalContentRenderlogoPic} src={lukoilLogo}></HandySvg>
      </div>
    </div>
    <div className={styles.modalContentRenderParagraphBlock}>
      <p className={styles.modalContentRenderParagraphCompanyDescription}>{props.text.workExpBlockComopanyAboutLRNPT}</p>
      <p className={styles.modalContentRenderParagraphPersonalDescription}>{props.text.workExpBlockComopanyResultsLRNPT}</p>
    </div>
  </div>
    );
  if (props.ModalContent === "WorkKG")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
    <div className={styles.modalContentRenderTextLogoWindow}>
      <div className={styles.modalContentRenderCompanyTextBox}>
        <span className={styles.modalContentRendercardYear}>{props.text.workExpBlockCompanyYearKG}</span>
        <span className={styles.modalContentRendercardCompanyName}>{props.text.workExpBlockCompanyNameKG}</span>
        <a className={styles.modalContentRenderlink} href="https://kalashnikovgroup.ru/" target="_blank">
        kalashnikovgroup.ru
        </a>
        <span className={styles.modalContentRendercardTitle}>{props.text.workExpBlockComopanyTitleKG}</span>
      </div>
      <div className={styles.modalContentRenderlogoBlock}>
        <HandySvg className={styles.modalContentRenderlogoPic} src={kalashnikovlLogo}></HandySvg>
      </div>
    </div>
    <div className={styles.modalContentRenderParagraphBlock}>
      <p className={styles.modalContentRenderParagraphCompanyDescription}>{props.text.workExpBlockComopanyAboutKG}</p>
      <p className={styles.modalContentRenderParagraphPersonalDescription}>{props.text.workExpBlockComopanyResultsKG}</p>
    </div>
  </div>
    );
  if (props.ModalContent === "WorkTR")
      return (
        <div className={styles.modalContentRenderGeneralWindow}>
    <div className={styles.modalContentRenderTextLogoWindow}>
      <div className={styles.modalContentRenderCompanyTextBox}>
        <span className={styles.modalContentRendercardYear}>{props.text.workExpBlockCompanyYearTR}</span>
        <span className={styles.modalContentRendercardCompanyName}>{props.text.workExpBlockCompanyNameTR}</span>
        <a className={styles.modalContentRenderlink} href="https://www.thomsonreuters.com/" target="_blank">
        thomsonreuters.com
        </a>
        <span className={styles.modalContentRendercardTitle}>{props.text.workExpBlockComopanyTitleTR}</span>
      </div>
      <div className={styles.modalContentRenderlogoBlock}>
        <HandySvg className={styles.modalContentRenderlogoPic} src={reutersLogo}></HandySvg>
      </div>
    </div>
    <div className={styles.modalContentRenderParagraphBlock}>
      <p className={styles.modalContentRenderParagraphCompanyDescription}>{props.text.workExpBlockComopanyAboutTR}</p>
      <p className={styles.modalContentRenderParagraphPersonalDescription}>{props.text.workExpBlockComopanyResultsTR}</p>
    </div>
  </div>
  );
}

export default ModalContent;
