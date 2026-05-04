import type { CompanyId, Language } from "../../types/domain";
import { getCompaniesBySection, getLocalizedCompany } from "../../content/companies";
import type { AppTranslations } from "../../content/ui-text";
import { buildLocalizedDetailPath } from "../../utils/routing";
import Card from "../Card/Card";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppProjectsExpProps = {
  text: AppTranslations;
  language: Language;
  onCardActivate: (companyId: CompanyId) => void;
};

// Секция проектов переиспользует тот же шаблон, что и опыт работы,
// но фильтрует данные по разделу "projects".
function AppProjectsExp({
  text,
  language,
  onCardActivate,
}: AppProjectsExpProps) {
  return (
    <Section id="projectsExp" title={text.sections.projects}>
      {/* Единый подход к рендеру карточек упрощает поддержку и визуальную консистентность. */}
      <div className={sectionStyles.cardsGrid}>
        {getCompaniesBySection("projects").map((company) => (
          <Card
            key={company.id}
            company={getLocalizedCompany(company.id, language)}
            href={buildLocalizedDetailPath(language, "/projects", company.slug)}
            ctaLabel={text.card.button}
            onActivate={onCardActivate}
          />
        ))}
      </div>
    </Section>
  );
}

export default AppProjectsExp;
