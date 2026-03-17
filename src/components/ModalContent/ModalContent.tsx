import type { LocalizedCompany } from "../../content/companies";
import styles from "./ModalContent.module.css";

type ModalContentProps = {
  company: LocalizedCompany | null;
  titleId?: string;
  descriptionId?: string;
};

// Отрисовывает содержимое модального окна для выбранной карточки компании.
function ModalContent({ company, titleId, descriptionId }: ModalContentProps) {
  if (!company) return null;
  return (
    <div className={styles.modalContentRenderGeneralWindow}>
      <div className={styles.modalContentRenderTextLogoWindow}>
        <div className={styles.modalContentRenderCompanyTextBox}>
          <span className={styles.modalContentRendercardYear}>{company.year}</span>
          <div className={styles.modalContentRenderCompanyLinkBox}>
            <h2 id={titleId} className={styles.modalContentRendercardCompanyName}>
              {company.name}
            </h2>
            {company.url && (
              <a
                className={styles.modalContentRenderlink}
                href={company.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {company.linkLabel}
              </a>
            )}
          </div>
          <span className={styles.modalContentRendercardTitle}>{company.title}</span>
        </div>
        <img
          className={styles.modalContentRenderlogoPic}
          src={company.logo}
          alt={company.name}
          loading="lazy"
        />
      </div>
      <div id={descriptionId} className={styles.modalContentRenderParagraphBlock}>
        <p className={styles.modalContentRenderParagraph}>{company.about}</p>
        <p className={styles.modalContentRenderParagraph}>{company.results}</p>
      </div>
    </div>
  );
}

export default ModalContent;
