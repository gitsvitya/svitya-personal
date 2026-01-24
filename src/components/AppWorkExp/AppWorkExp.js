import Card from "../Card/Card";
import { workCompanies } from "../../utils/companiesList.js";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

// Секция с опытом работы: рендерит карточки компаний и пробрасывает хендлер модалки.
function AppWorkExp({ text, setModalContentCompany, openModal }) {
  return (
    <Section id="workExp" title={text.workExpBlockHeaderText}>
      <div className={sectionStyles.cardsGrid}>
        {workCompanies.map((name) => (
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

export default AppWorkExp;
