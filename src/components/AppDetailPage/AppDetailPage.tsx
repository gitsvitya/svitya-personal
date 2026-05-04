import type { LocalizedCompany } from "../../content/companies";
import type { AppTranslations } from "../../content/ui-text";
import AppPhotoGallery from "../AppPhotoGallery/AppPhotoGallery";
import ModalContent from "../ModalContent/ModalContent";
import styles from "./AppDetailPage.module.css";

type AppDetailPageProps = {
  company: LocalizedCompany;
  text: AppTranslations;
  sectionTitle: string;
  onBack: () => void;
};

// Страница подробностей использует тот же контент, что раньше был в модалке,
// но размещает его как полноценный блок между шапкой и футером.
function AppDetailPage({ company, text, sectionTitle, onBack }: AppDetailPageProps) {
  const titleId = `detail-title-${company.id}`;
  const descriptionId = `detail-description-${company.id}`;
  const materials =
    company.materials?.enabled === true && company.materials.photos.length > 0
      ? company.materials
      : null;

  return (
    <section className={styles.detailPage} aria-labelledby={titleId}>
      <div className={`layout-container ${styles.container}`}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label={`${text.detail.backToSection}: ${sectionTitle}`}
        >
          <span aria-hidden="true" className={styles.backIcon}>
            ←
          </span>
          {text.detail.back}
        </button>
        <ModalContent company={company} titleId={titleId} descriptionId={descriptionId} />
        {materials && (
          <AppPhotoGallery
            photos={materials.photos}
            text={text}
            companyName={company.name}
          />
        )}
      </div>
    </section>
  );
}

export default AppDetailPage;
