import React from 'react';
import styles from "./WorkExp.module.css";
import { HandySvg } from "handy-svg";
import moexLogo from '../../images/moex_logo.svg';
import lukoilLogo from '../../images/lukoil_logo.svg';
import kalashnikovlLogo from '../../images/kalashnikov_logo.svg';
import reutersLogo from '../../images/reuters_logo.svg';
import Modal from "../Modal/Modal";

function WorkExp(props) {

  const [ModalOpen, ModalOpened] = React.useState(false);
  const [ModalContent, SetModalContent] = React.useState("");

  function openModal() {
    ModalOpened(true);
  }

  function closeModal() {
    ModalOpened(false);

  }

  function renderModalContent(input) {
    if (input === "WorkNTB")
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
    if (input === "WorkLRNPT")
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
    if (input === "WorkKG")
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
    if (input === "WorkTR")
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

  return (
    <>
    <div className={styles.workExp}>
      <div className={styles.container}>
        <h2 className={styles.header}>{props.text.workExpBlockHeaderText}</h2>
        <div className={styles.cardBox}>
          <div className={styles.card} onClick={() => {openModal(); SetModalContent("WorkNTB");}}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>{props.text.workExpBlockCompanyYearNTB}</span>
                <span className={styles.cardCompanyName}>{props.text.workExpBlockCompanyNameNTB}</span>
                <span className={styles.cardTitle}>{props.text.workExpBlockComopanyTitleNTB}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={moexLogo}></HandySvg>
                </div>
              </div>
              <div className={styles.card} onClick={() => {openModal(); SetModalContent("WorkLRNPT");}}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>{props.text.workExpBlockCompanyYearLRNPT}</span>
                <span className={styles.cardCompanyName}>{props.text.workExpBlockCompanyNameLRNPT}</span>
                <span className={styles.cardTitle}>{props.text.workExpBlockComopanyTitleLRNPT}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={lukoilLogo}></HandySvg>
                </div>
              </div>
              <div className={styles.card} onClick={() => {openModal(); SetModalContent("WorkKG");}}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>{props.text.workExpBlockCompanyYearKG}</span>
                <span className={styles.cardCompanyName}>{props.text.workExpBlockCompanyNameKG}</span>
                <span className={styles.cardTitle}>{props.text.workExpBlockComopanyTitleKG}</span>
                <span className={styles.cardButton}>{props.text.cardButtonText}</span>
              </div>
                <div className={styles.logoBlock}>
                <HandySvg className={styles.logoPic} src={kalashnikovlLogo}></HandySvg>
                </div>
              </div>
              <div className={styles.card} onClick={() => {openModal(); SetModalContent("WorkTR");}}>
              <div className={styles.cardText}>
                <span className={styles.cardYear}>{props.text.workExpBlockCompanyYearTR}</span>
                <span className={styles.cardCompanyName}>{props.text.workExpBlockCompanyNameTR}</span>
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
      {ModalOpen && (
          <Modal closeModal={closeModal}>
            {renderModalContent(ModalContent)}
          </Modal>
      )}
    </>
  )
}

export default WorkExp;
