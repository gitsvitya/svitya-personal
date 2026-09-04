import { getCompaniesBySection, getLocalizedCompany } from "../../content/portfolio";
import type { AppTranslations } from "../../content/ui-text";
import type { CompanySection, Language, SectionPath } from "../../types/domain";
import { buildLocalizedDetailPath } from "../../utils/routing";
import Card from "../Card/Card";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type PortfolioSectionProps = {
  section: CompanySection;
  language: Language;
  text: AppTranslations;
};

function PortfolioSection({ section, language, text }: PortfolioSectionProps) {
  const sectionPath = `/${section}` as SectionPath;

  return (
    <Section id={section} title={text.sections[section]}>
      <div className={sectionStyles.cardsGrid}>
        {getCompaniesBySection(section).map((company) => (
          <Card
            key={company.id}
            company={getLocalizedCompany(company.id, language)}
            href={buildLocalizedDetailPath(language, sectionPath, company.slug)}
            ctaLabel={text.card.button}
          />
        ))}
      </div>
    </Section>
  );
}

export default PortfolioSection;
