import type { CompanyId } from "../../types/domain";
import type { Dictionary } from "../../utils/lng";
import styles from "./ModalContent.module.css";
import { logos } from "../../utils/cardLogos";
import { cardMap } from "../../utils/cardMap";

type ModalContentProps = {
  modalContent: CompanyId | null;
  text: Dictionary;
};

// Отрисовывает содержимое модального окна для выбранной карточки компании.
function ModalContent({ modalContent, text }: ModalContentProps) {
  if (!modalContent) return null;

  const logo = logos[modalContent];
  const config = cardMap[modalContent];

  return (
    <div className={styles.modalContentRenderGeneralWindow}>
      <div className={styles.modalContentRenderTextLogoWindow}>
        <div className={styles.modalContentRenderCompanyTextBox}>
          <span className={styles.modalContentRendercardYear}>{text[config.yearKey]}</span>
          <div className={styles.modalContentRenderCompanyLinkBox}>
            <span className={styles.modalContentRendercardCompanyName}>
              {text[config.nameKey]}
            </span>
            {config.linkKey && (
              <a
                className={styles.modalContentRenderlink}
                href={config.linkKey}
                target="_blank"
                rel="noreferrer noopener"
              >
                {config.linkNameKey}
              </a>
            )}
          </div>
          <span className={styles.modalContentRendercardTitle}>{text[config.titleKey]}</span>
        </div>
        <img
          className={styles.modalContentRenderlogoPic}
          src={logo}
          alt={text[config.nameKey]}
          loading="lazy"
        />
      </div>
      <div className={styles.modalContentRenderParagraphBlock}>
        <p className={styles.modalContentRenderParagraph}>{text[config.aboutKey]}</p>
        <p className={styles.modalContentRenderParagraph}>{text[config.resultsKey]}</p>
      </div>
    </div>
  );
}

export default ModalContent;
