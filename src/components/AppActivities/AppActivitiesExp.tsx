import type { Dispatch, SetStateAction } from "react";
import type { CompanyId } from "../../types/domain";
import type { Dictionary } from "../../utils/lng";
import Card from "../Card/Card";
import { activityCompanies } from "../../utils/companiesList";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppActivitiesExpProps = {
  text: Dictionary;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  openModal: () => void;
};

// Отрисовывает секцию активностей со списком карточек и модальным просмотром.
function AppActivitiesExp({
  text,
  setModalContentCompany,
  openModal,
}: AppActivitiesExpProps) {
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
