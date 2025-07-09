import styles from "./ModalContent.module.css";
import { logos } from "../../utils/cardLogos";


// import moexLogo from "../../images/moex_logo.png";
// import lukoilLogo from "../../images/lukoil_logo.png";
// import kalashnikovlLogo from "../../images/kalashnikov_logo.png";
// import reutersLogo from "../../images/reuters_logo.png";
// import mappngoLogo from "../../images/mappngoLogo_black.png";
// import veniviLogo from "../../images/veniviLogo.png";
// import strokeOffLabel from "../../images/stroke_off_label.png";
// import svityaComLabel from "../../images/svitya_com_label.png";
// import mbcLogo from "../../images/mbc_logo.png";
// import ciLogo from "../../images/ci_logo.png";

function ModalContent({modalContent, text}) {
  const logo = logos[modalContent];
  if (modalContent === "CI")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {text.workExpBlockCompanyYearCI}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {text.workExpBlockCompanyNameCI}
              </span>
              <a
                className={styles.modalContentRenderlink}
                href="https://cheminsight.ru/"
                target="_blank"
              >
                cheminsight.ru
              </a>
            </div>
            <span className={styles.modalContentRendercardTitle}>
              {text.workExpBlockComopanyTitleCI}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={logo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyAboutCI}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyResultsCI}
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
              {text.workExpBlockComopanyTitleNTB}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={logo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyAboutNTB}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyResultsNTB}
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
              {text.workExpBlockComopanyTitleLRNPT}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={logo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyAboutLRNPT}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyResultsLRNPT}
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
              {text.workExpBlockComopanyTitleKG}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={logo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyAboutKG}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyResultsKG}
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
              {text.workExpBlockComopanyTitleTR}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={logo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyAboutTR}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.workExpBlockComopanyResultsTR}
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
                {text.projectExpBlockComopanyTitleMadBurglarCat}
              </span>
            </div>
            <img
              className={styles.modalContentRenderlogoPic}
              src={logo}
            ></img>
          </div>
          <div className={styles.modalContentRenderParagraphBlock}>
            <p className={styles.modalContentRenderParagraph}>
              {text.projectExpBlockComopanyAboutMadBurglarCat}
            </p>
            <p className={styles.modalContentRenderParagraph}>
              {text.projectExpBlockComopanyResultsMadBurglarCat}
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
              {text.projectExpBlockComopanyTitleMappNgo}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={logo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockComopanyAboutMappNgo}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockComopanyResultsMappNgo}
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
              {text.projectExpBlockComopanyTitleVenivi}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={logo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockComopanyAboutVenivi}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {text.projectExpBlockComopanyResultsVenivi}
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
                {text.projectExpBlockComopanyTitleStrokeOff}
              </span>
            </div>
            <img
              className={styles.modalContentRenderlogoPic}
              src={logo}
            ></img>
          </div>
          <div className={styles.modalContentRenderParagraphBlock}>
            <p className={styles.modalContentRenderParagraph}>
              {text.projectExpBlockComopanyAboutStrokeOff}
            </p>
            <p className={styles.modalContentRenderParagraph}>
              {text.projectExpBlockComopanyResultsStrokeOff}
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
                  {text.projectExpBlockComopanyTitleSvityaWeb}
                </span>
              </div>
              <img
                className={styles.modalContentRenderlogoPic}
                src={logo}
              ></img>
            </div>
            <div className={styles.modalContentRenderParagraphBlock}>
              <p className={styles.modalContentRenderParagraph}>
                {text.projectExpBlockComopanyAboutSvityaWeb}
              </p>
              <p className={styles.modalContentRenderParagraph}>
                {text.projectExpBlockComopanyResultsSvityaWeb}
              </p>
            </div>
          </div>
        );
}

export default ModalContent;
