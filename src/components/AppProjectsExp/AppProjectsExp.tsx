import type { Dispatch, SetStateAction } from "react";
import type { CompanyId } from "../../types/domain";
import type { Dictionary } from "../../utils/lng";
import Card from "../Card/Card";
import { projectCompanies } from "../../utils/companiesList";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppProjectsExpProps = {
  text: Dictionary;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  openModal: () => void;
};

// Отрисовывает секцию проектов со списком карточек и открытием деталей в модалке.
function AppProjectsExp({ text, setModalContentCompany, openModal }: AppProjectsExpProps) {
  return (
    <Section id="projectsExp" title={text.projectExpBlockHeaderText}>
      <div className={sectionStyles.cardsGrid}>
        {projectCompanies.map((name) => (
          <Card
            key={name}
            companyName={name}
            text={text}
            openModal={openModal}
            setModalContentCompany={setModalContentCompany}
          />
        ))}
      </div>
    </Section>
  );
}

export default AppProjectsExp;
