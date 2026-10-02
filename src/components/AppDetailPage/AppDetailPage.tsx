"use client";

import type { LocalizedCompany } from "../../content/portfolio";
import type { AppTranslations } from "../../content/ui-text";
import MaterialsGallery from "../MaterialsGallery/MaterialsGallery";
import TransitionLink from "../SiteShell/TransitionLink";
import DetailContent from "../DetailContent/DetailContent";
import styles from "./AppDetailPage.module.css";

type AppDetailPageProps = {
  company: LocalizedCompany;
  text: AppTranslations;
  sectionTitle: string;
  backHref: string;
};

function AppDetailPage({ company, text, sectionTitle, backHref }: AppDetailPageProps) {
  const titleId = `detail-title-${company.id}`;
  const descriptionId = `detail-description-${company.id}`;
  const materials =
    company.materials?.enabled === true && company.materials.items.length > 0
      ? company.materials
      : null;

  return (
    <section className={styles.detailPage} aria-labelledby={titleId}>
      <div className={`layout-container ${styles.container}`}>
        <TransitionLink
          href={backHref}
          replace
          className={`button-control ${styles.backButton}`}
          aria-label={`${text.detail.backToSection}: ${sectionTitle}`}
        >
          <span aria-hidden="true" className={`button-label ${styles.backIcon}`}>
            ←
          </span>
          <span className="button-label">{text.detail.back}</span>
        </TransitionLink>
        <DetailContent
          company={company}
          titleId={titleId}
          descriptionId={descriptionId}
          text={text}
        />
        {materials && (
          <MaterialsGallery items={materials.items} text={text} companyName={company.name} />
        )}
      </div>
    </section>
  );
}

export default AppDetailPage;
