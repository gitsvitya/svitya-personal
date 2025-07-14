import styles from "./ModalContent.module.css";
import { logos } from "../../utils/cardLogos";
import { cardMap } from "../../utils/cardMap.js";

function ModalContent({ modalContent, text }) {
  const logo = logos[modalContent];
  const config = cardMap[modalContent];
  if (!config) return null;
  return (
    <div className={styles.modalContentRenderGeneralWindow}>
      <div className={styles.modalContentRenderTextLogoWindow}>
        <div className={styles.modalContentRenderCompanyTextBox}>
          <span className={styles.modalContentRendercardYear}>
            {text[config.yearKey]}
          </span>
          <div className={styles.modalContentRenderCompanyLinkBox}>
            <span className={styles.modalContentRendercardCompanyName}>
              {text[config.nameKey]}
            </span>
            <a
              className={styles.modalContentRenderlink}
              href={config.linkKey}
              target="_blank"
            >
              {config.linkNameKey}
            </a>
          </div>
          <span className={styles.modalContentRendercardTitle}>
            {text[config.titleKey]}
          </span>
        </div>
        <img className={styles.modalContentRenderlogoPic} src={logo}></img>
      </div>
      <div className={styles.modalContentRenderParagraphBlock}>
        <p className={styles.modalContentRenderParagraph}>
          {text[config.aboutKey]}
        </p>
        <p className={styles.modalContentRenderParagraph}>
          {text[config.resultsKey]}
        </p>
      </div>
    </div>
  );
  if (modalContent === "NTB")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.workExpBlockCompanyYearNTB}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.workExpBlockCompanyNameNTB}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://namex.org/"
                target="_blank"
              >
                namex.org
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.workExpBlockCompanyTitleNTB}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockCompanyAboutNTB}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockCompanyResultsNTB}
          </p>
        </div>
      </div>
    );
  if (modalContent === "LRNPT")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.workExpBlockCompanyYearLRNPT}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.workExpBlockCompanyNameLRNPT}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://trading.lukoil.ru/"
                target="_blank"
              >
                trading.lukoil.ru
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.workExpBlockCompanyTitleLRNPT}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockCompanyAboutLRNPT}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockCompanyResultsLRNPT}
          </p>
        </div>
      </div>
    );
  if (modalContent === "KG")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.workExpBlockCompanyYearKG}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.workExpBlockCompanyNameKG}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://kalashnikovgroup.ru/"
                target="_blank"
              >
                kalashnikovgroup.ru
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.workExpBlockCompanyTitleKG}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockCompanyAboutKG}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockCompanyResultsKG}
          </p>
        </div>
      </div>
    );
  if (modalContent === "TR")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.workExpBlockCompanyYearTR}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.workExpBlockCompanyNameTR}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://www.thomsonreuters.com/"
                target="_blank"
              >
                thomsonreuters.com
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.workExpBlockCompanyTitleTR}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockCompanyAboutTR}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockCompanyResultsTR}
          </p>
        </div>
      </div>
    );
  if (modalContent === "MBC")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.projectExpBlockCompanyYearMadBurglarCat}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.projectExpBlockCompanyNameMadBurglarCat}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://madburglarcat.ru/"
                target="_blank"
              >
                madburglarcat.ru
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.projectExpBlockCompanyTitleMadBurglarCat}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyAboutMadBurglarCat}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyResultsMadBurglarCat}
          </p>
        </div>
      </div>
    );
  if (modalContent === "MNG")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.projectExpBlockCompanyYearMappNgo}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.projectExpBlockCompanyNameMappNgo}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://www.mappngo.com/"
                target="_blank"
              >
                mappngo.com
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.projectExpBlockCompanyTitleMappNgo}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyAboutMappNgo}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyResultsMappNgo}
          </p>
        </div>
      </div>
    );
  if (modalContent === "VNV")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.projectExpBlockCompanyYearVenivi}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.projectExpBlockCompanyNameVenivi}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://venivi.ru/"
                target="_blank"
              >
                venivi.ru
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.projectExpBlockCompanyTitleVenivi}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyAboutVenivi}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyResultsVenivi}
          </p>
        </div>
      </div>
    );
  if (modalContent === "SKO")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.projectExpBlockCompanyYearStrokeOff}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.projectExpBlockCompanyNameStrokeOff}
              </span>
              {/* <a
                  className={styles.modalContentRenderlink}
                  href="https://www.instagram.com/vitya.strokov/"
                  target="_blank"
                >
                  instagram.com/vitya.strokov
                </a> */}
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.projectExpBlockCompanyTitleStrokeOff}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyAboutStrokeOff}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyResultsStrokeOff}
          </p>
        </div>
      </div>
    );
  if (modalContent === "SDC")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.projectExpBlockCompanyYearSvityaWeb}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.projectExpBlockCompanyNameSvityaWeb}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://github.com/gitsvitya"
                target="_blank"
              >
                github.com/gitsvitya
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.projectExpBlockCompanyTitleSvityaWeb}
            </span>
          </div>
          <img className={styles.modalContentRenderlogoPic} src={logo}></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyAboutSvityaWeb}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockCompanyResultsSvityaWeb}
          </p>
        </div>
      </div>
    );
}

export default ModalContent;
