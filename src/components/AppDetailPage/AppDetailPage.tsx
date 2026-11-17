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

const BACK_LABELS = {
  ru: { work: "К опыту работы", projects: "К проектам", activities: "К увлечениям" },
  en: { work: "All experience", projects: "All projects", activities: "All interests" },
};

function AppDetailPage({ company, text, sectionTitle, backHref }: AppDetailPageProps) {
  const titleId = `detail-title-${company.id}`;
  const descriptionId = `detail-description-${company.id}`;
  const backLabel = BACK_LABELS[company.language][company.section];
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
          className={`${styles.backButton} arrow-link`}
          aria-label={`${text.detail.backToSection}: ${sectionTitle}`}
        >
          <span className="link-arrow link-arrow-back" aria-hidden="true">
            ←
          </span>
          <span>{backLabel}</span>
        </TransitionLink>
        <DetailContent
          company={company}
          titleId={titleId}
          descriptionId={descriptionId}
          text={text}
        />
        {materials && (
          <MaterialsGallery
            items={materials.items}
            text={text}
            companyName={company.name}
            compact={company.section === "work"}
          />
        )}
        <nav
          className={styles.caseNavigation}
          aria-label={company.language === "ru" ? "Другие истории" : "More stories"}
        >
          <TransitionLink href={backHref} replace className={`${styles.backButton} arrow-link`}>
            <span className="link-arrow link-arrow-back" aria-hidden="true">
              ←
            </span>
            <span>{backLabel}</span>
          </TransitionLink>
          <TransitionLink
            href={`${backHref}/${company.nextCompany.slug}`}
            className={`${styles.nextButton} arrow-link`}
          >
            <span>
              {company.language === "ru" ? "Далее:" : "Next:"} {company.nextCompany.name}
            </span>
            <span className="link-arrow" aria-hidden="true">
              →
            </span>
          </TransitionLink>
        </nav>
      </div>
    </section>
  );
}

export default AppDetailPage;
