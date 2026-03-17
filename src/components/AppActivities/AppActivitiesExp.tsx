import type { Dispatch, SetStateAction } from "react";
import type { CompanyId, Language } from "../../types/domain";
import { getCompaniesBySection, getLocalizedCompany } from "../../content/companies";
import type { AppTranslations } from "../../content/ui-text";
import Card from "../Card/Card";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppActivitiesExpProps = {
  text: AppTranslations;
  language: Language;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  openModal: () => void;
};

// Отрисовывает секцию активностей со списком карточек и модальным просмотром.
function AppActivitiesExp({
  text,
  language,
  setModalContentCompany,
  openModal,
}: AppActivitiesExpProps) {
  return (
    <Section id="otherExp" title={text.sections.activities}>
      <div className={sectionStyles.cardsGrid}>
        {getCompaniesBySection("activities").map((company) => (
          <Card
            key={company.id}
            company={getLocalizedCompany(company.id, language)}
            ctaLabel={text.card.button}
            openModal={openModal}
            setModalContentCompany={setModalContentCompany}
          />
        ))}
      </div>
    </Section>
  );
}

export default AppActivitiesExp;
