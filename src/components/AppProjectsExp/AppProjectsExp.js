import Card from "../Card/Card";
import { projectCompanies } from "../../utils/companiesList.js";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

// Секция «Проекты»: выводит карточки основанных проектов с деталями в модалке.
function AppProjectsExp({ text, setModalContentCompany, openModal }) {
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
