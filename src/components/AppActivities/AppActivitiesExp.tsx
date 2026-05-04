import type { CompanyId, Language } from "../../types/domain";
import { getCompaniesBySection, getLocalizedCompany } from "../../content/companies";
import type { AppTranslations } from "../../content/ui-text";
import Card from "../Card/Card";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppActivitiesExpProps = {
  text: AppTranslations;
  language: Language;
  onCardActivate: (companyId: CompanyId) => void;
};

// Секция активностей строится из общего реестра контента
// и показывает записи категории "activities".
function AppActivitiesExp({
  text,
  language,
  onCardActivate,
}: AppActivitiesExpProps) {
  return (
    <Section id="otherExp" title={text.sections.activities}>
      {/* Карточки используют ту же механику открытия подробностей, что и другие секции. */}
      <div className={sectionStyles.cardsGrid}>
        {getCompaniesBySection("activities").map((company) => (
          <Card
            key={company.id}
            company={getLocalizedCompany(company.id, language)}
            ctaLabel={text.card.button}
            onActivate={onCardActivate}
          />
        ))}
      </div>
    </Section>
  );
}

export default AppActivitiesExp;
