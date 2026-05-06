import type { LocalizedCompany } from "../../content/companies";
import styles from "./ModalContent.module.css";

type ModalContentProps = {
  company: LocalizedCompany | null;
  titleId?: string;
  descriptionId?: string;
};

// Компонент получает уже локализованную запись и раскладывает ее
// на структуру, подходящую для чтения в подробном представлении.
function ModalContent({ company, titleId, descriptionId }: ModalContentProps) {
  if (!company) return null;
  return (
    <div className={styles.modalContentRenderGeneralWindow}>
      {/* В верхнем блоке собраны идентифицирующие данные записи:
          период, название, роль и логотип. */}
      {/* Оба текстовых абзаца объединены общим description id,
          чтобы screen readers воспринимали их как единое описание записи. */}
      <div
        id={descriptionId}
        className={styles.modalContentRenderParagraphBlock}
      >
        <div className={styles.modalContentRenderCompanyBox}>
          <h2 id={titleId} className={styles.modalContentRendercardCompanyName}>
            {company.name}
          </h2>
          <div className={styles.modalContentRenderCompanyDescriptionLinkBox}>
            <p className={styles.modalContentRenderParagraph}>
              {company.about}
            </p>
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
          <div className={styles.modalContentRenderCompanyTitleYearBox}>
            <span className={styles.modalContentRendercardTitle}>
              {company.title}
            </span>
            <span className={styles.modalContentRendercardYear}>
              {company.year}
            </span>
          </div>
        </div>
        <img
          className={styles.modalContentRenderlogoPic}
          src={company.logo}
          alt={company.name}
          loading="lazy"
        />
      </div>
      <p className={styles.modalContentRenderParagraph}>{company.results}</p>
    </div>
  );
}

export default ModalContent;
