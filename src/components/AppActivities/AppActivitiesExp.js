import Card from "../Card/Card.js";
import { activityCompanies } from "../../utils/companiesList.js";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

// Отрисовывает секцию активностей со списком карточек и модальным просмотром.
function AppActivitiesExp({ text, setModalContentCompany, openModal }) {
  return (
    <Section id="otherExp" title={text.otherExpBlockHeaderText}>
      <div className={sectionStyles.cardsGrid}>
        {activityCompanies.map((name) => (
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

export default AppActivitiesExp;
