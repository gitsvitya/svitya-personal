"use client";

import type { LocalizedCompany } from "../../content/portfolio";
import type { AppTranslations } from "../../content/ui-text";
import MaterialsGallery from "../MaterialsGallery/MaterialsGallery";
import { useRouteTransition } from "../SiteShell/RouteTransitionContext";
import DetailContent from "../DetailContent/DetailContent";
import styles from "./AppDetailPage.module.css";

type AppDetailPageProps = {
  company: LocalizedCompany;
  text: AppTranslations;
  sectionTitle: string;
  backHref: string;
};

function AppDetailPage({ company, text, sectionTitle, backHref }: AppDetailPageProps) {
  const { navigate } = useRouteTransition();
  const titleId = `detail-title-${company.id}`;
  const descriptionId = `detail-description-${company.id}`;
  const materials =
    company.materials?.enabled === true && company.materials.items.length > 0
      ? company.materials
      : null;

  return (
    <section className={styles.detailPage} aria-labelledby={titleId}>
      <div className={`layout-container ${styles.container}`}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(backHref, { replace: true })}
          aria-label={`${text.detail.backToSection}: ${sectionTitle}`}
        >
          <span aria-hidden="true" className={styles.backIcon}>
            ←
          </span>
          <span className={styles.backText}>{text.detail.back}</span>
        </button>
        <DetailContent company={company} titleId={titleId} descriptionId={descriptionId} />
        {materials && (
          <MaterialsGallery items={materials.items} text={text} companyName={company.name} />
        )}
      </div>
    </section>
  );
}

export default AppDetailPage;
