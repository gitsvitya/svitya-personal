import type { CompanyId, Language } from "../../types/domain";
import { getCompaniesBySection, getLocalizedCompany } from "../../content/companies";
import type { AppTranslations } from "../../content/ui-text";
import { buildLocalizedDetailPath } from "../../utils/routing";
import Card from "../Card/Card";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppWorkExpProps = {
  text: AppTranslations;
  language: Language;
  onCardActivate: (companyId: CompanyId) => void;
};

// Секция опыта работы берет записи из общего контентного реестра
// и отображает их в универсальной сетке карточек.
function AppWorkExp({ text, language, onCardActivate }: AppWorkExpProps) {
  return (
    <Section id="workExp" title={text.sections.work}>
      {/* Локализация карточек берется из того же источника, что и подробный контент,
          поэтому при смене языка UI остается консистентным. */}
      <div className={sectionStyles.cardsGrid}>
        {getCompaniesBySection("work").map((company) => (
          <Card
            key={company.id}
            company={getLocalizedCompany(company.id, language)}
            href={buildLocalizedDetailPath(language, "/work", company.slug)}
            ctaLabel={text.card.button}
            onActivate={onCardActivate}
          />
        ))}
      </div>
    </Section>
  );
}

export default AppWorkExp;
