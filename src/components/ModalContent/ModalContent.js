import styles from "./ModalContent.module.css";
import moexLogo from "../../images/moex_logo.png";
import lukoilLogo from "../../images/lukoil_logo.png";
import kalashnikovlLogo from "../../images/kalashnikov_logo.png";
import reutersLogo from "../../images/reuters_logo.png";
import mappngoLogo from "../../images/mappngoLogo_black.png";
import veniviLogo from "../../images/veniviLogo.png";
import strokeOffLabel from "../../images/stroke_off_label.png";
import svityaComLabel from "../../images/svitya_com_label.png";
import mbcLogo from "../../images/mbc_logo.png";

function ModalContent(props) {
  if (props.modalContent === "WorkNTB")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {props.text.workExpBlockCompanyYearNTB}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {props.text.workExpBlockCompanyNameNTB}
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
              {props.text.workExpBlockComopanyTitleNTB}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={moexLogo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.workExpBlockComopanyAboutNTB}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.workExpBlockComopanyResultsNTB}
          </p>
        </div>
      </div>
    );
  if (props.modalContent === "WorkLRNPT")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {props.text.workExpBlockCompanyYearLRNPT}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {props.text.workExpBlockCompanyNameLRNPT}
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
              {props.text.workExpBlockComopanyTitleLRNPT}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={lukoilLogo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.workExpBlockComopanyAboutLRNPT}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.workExpBlockComopanyResultsLRNPT}
          </p>
        </div>
      </div>
    );
  if (props.modalContent === "WorkKG")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {props.text.workExpBlockCompanyYearKG}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {props.text.workExpBlockCompanyNameKG}
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
              {props.text.workExpBlockComopanyTitleKG}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={kalashnikovlLogo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.workExpBlockComopanyAboutKG}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.workExpBlockComopanyResultsKG}
          </p>
        </div>
      </div>
    );
  if (props.modalContent === "WorkTR")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {props.text.workExpBlockCompanyYearTR}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {props.text.workExpBlockCompanyNameTR}
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
              {props.text.workExpBlockComopanyTitleTR}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={reutersLogo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.workExpBlockComopanyAboutTR}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.workExpBlockComopanyResultsTR}
          </p>
        </div>
      </div>
    );
    if (props.modalContent === "MBC")
      return (
        <div className={styles.modalContentRenderGeneralWindow}>
          <div className={styles.modalContentRenderTextLogoWindow}>
            <div className={styles.modalContentRenderCompanyTextBox}>
              <span className={styles.modalContentRendercardYear}>
                {props.text.projectExpBlockCompanyYearMadBurglarCat}
              </span>
              <div className={styles.modalContentRenderCompanyLinkBox}>
                <span className={styles.modalContentRendercardCompanyName}>
                  {props.text.projectExpBlockCompanyNameMadBurglarCat}
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
                {props.text.projectExpBlockComopanyTitleMadBurglarCat}
              </span>
            </div>
            <img
              className={styles.modalContentRenderlogoPic}
              src={mbcLogo}
            ></img>
          </div>
          <div className={styles.modalContentRenderParagraphBlock}>
            <p className={styles.modalContentRenderParagraph}>
              {props.text.projectExpBlockComopanyAboutMadBurglarCat}
            </p>
            <p className={styles.modalContentRenderParagraph}>
              {props.text.projectExpBlockComopanyResultsMadBurglarCat}
            </p>
          </div>
        </div>
      );
  if (props.modalContent === "MNG")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {props.text.projectExpBlockCompanyYearMappNgo}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {props.text.projectExpBlockCompanyNameMappNgo}
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
              {props.text.projectExpBlockComopanyTitleMappNgo}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={mappngoLogo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.projectExpBlockComopanyAboutMappNgo}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.projectExpBlockComopanyResultsMappNgo}
          </p>
        </div>
      </div>
    );
  if (props.modalContent === "VNV")
    return (
      <div className={styles.modalContentRenderGeneralWindow}>
        <div className={styles.modalContentRenderTextLogoWindow}>
          <div className={styles.modalContentRenderCompanyTextBox}>
            <span className={styles.modalContentRendercardYear}>
              {props.text.projectExpBlockCompanyYearVenivi}
            </span>
            <div className={styles.modalContentRenderCompanyLinkBox}>
              <span className={styles.modalContentRendercardCompanyName}>
                {props.text.projectExpBlockCompanyNameVenivi}
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
              {props.text.projectExpBlockComopanyTitleVenivi}
            </span>
          </div>
          <img
            className={styles.modalContentRenderlogoPic}
            src={veniviLogo}
          ></img>
        </div>
        <div className={styles.modalContentRenderParagraphBlock}>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.projectExpBlockComopanyAboutVenivi}
          </p>
          <p className={styles.modalContentRenderParagraph}>
            {props.text.projectExpBlockComopanyResultsVenivi}
          </p>
        </div>
      </div>
    );
    if (props.modalContent === "SKO")
      return (
        <div className={styles.modalContentRenderGeneralWindow}>
          <div className={styles.modalContentRenderTextLogoWindow}>
            <div className={styles.modalContentRenderCompanyTextBox}>
              <span className={styles.modalContentRendercardYear}>
                {props.text.projectExpBlockCompanyYearStrokeOff}
              </span>
              <div className={styles.modalContentRenderCompanyLinkBox}>
                <span className={styles.modalContentRendercardCompanyName}>
                  {props.text.projectExpBlockCompanyNameStrokeOff}
                </span>
                <a
                  className={styles.modalContentRenderlink}
                  href="https://www.instagram.com/vitya.strokov/"
                  target="_blank"
                >
                  instagram.com/vitya.strokov
                </a>
              </div>
              <span className={styles.modalContentRendercardTitle}>
                {props.text.projectExpBlockComopanyTitleStrokeOff}
              </span>
            </div>
            <img
              className={styles.modalContentRenderlogoPic}
              src={strokeOffLabel}
            ></img>
          </div>
          <div className={styles.modalContentRenderParagraphBlock}>
            <p className={styles.modalContentRenderParagraph}>
              {props.text.projectExpBlockComopanyAboutStrokeOff}
            </p>
            <p className={styles.modalContentRenderParagraph}>
              {props.text.projectExpBlockComopanyResultsStrokeOff}
            </p>
          </div>
        </div>
      );
      if (props.modalContent === "SDC")
        return (
          <div className={styles.modalContentRenderGeneralWindow}>
            <div className={styles.modalContentRenderTextLogoWindow}>
              <div className={styles.modalContentRenderCompanyTextBox}>
                <span className={styles.modalContentRendercardYear}>
                  {props.text.projectExpBlockCompanyYearSvityaWeb}
                </span>
                <div className={styles.modalContentRenderCompanyLinkBox}>
                  <span className={styles.modalContentRendercardCompanyName}>
                    {props.text.projectExpBlockCompanyNameSvityaWeb}
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
                  {props.text.projectExpBlockComopanyTitleSvityaWeb}
                </span>
              </div>
              <img
                className={styles.modalContentRenderlogoPic}
                src={svityaComLabel}
              ></img>
            </div>
            <div className={styles.modalContentRenderParagraphBlock}>
              <p className={styles.modalContentRenderParagraph}>
                {props.text.projectExpBlockComopanyAboutSvityaWeb}
              </p>
              <p className={styles.modalContentRenderParagraph}>
                {props.text.projectExpBlockComopanyResultsSvityaWeb}
              </p>
            </div>
          </div>
        );
}

export default ModalContent;
