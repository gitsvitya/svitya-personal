import type { Dispatch, SetStateAction } from "react";
import type { CompanyId, Language } from "../../types/domain";
import { getCompaniesBySection, getLocalizedCompany } from "../../content/companies";
import type { Dictionary } from "../../utils/lng";
import Card from "../Card/Card";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppProjectsExpProps = {
  text: Dictionary;
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
    <Section id="projectsExp" title={text.projectExpBlockHeaderText}>
      <div className={sectionStyles.cardsGrid}>
        {getCompaniesBySection("projects").map((company) => (
          <Card
            key={company.id}
            company={getLocalizedCompany(company.id, language)}
            ctaLabel={text.cardButtonText}
            openModal={openModal}
            setModalContentCompany={setModalContentCompany}
          />
        ))}
      </div>
    </Section>
  );
}

export default AppProjectsExp;
