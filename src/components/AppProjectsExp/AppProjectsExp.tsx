import type { Dispatch, SetStateAction } from "react";
import type { CompanyId, Language } from "../../types/domain";
import { getCompaniesBySection, getLocalizedCompany } from "../../content/companies";
import type { AppTranslations } from "../../utils/lng";
import Card from "../Card/Card";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppProjectsExpProps = {
  text: AppTranslations;
  language: Language;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  openModal: () => void;
};

// Отрисовывает секцию проектов со списком карточек и открытием деталей в модалке.
function AppProjectsExp({
  text,
  language,
  setModalContentCompany,
  openModal,
}: AppProjectsExpProps) {
  return (
    <Section id="projectsExp" title={text.sections.projects}>
      <div className={sectionStyles.cardsGrid}>
        {getCompaniesBySection("projects").map((company) => (
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

export default AppProjectsExp;
