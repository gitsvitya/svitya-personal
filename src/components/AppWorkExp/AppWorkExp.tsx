import type { Dispatch, SetStateAction } from "react";
import type { CompanyId } from "../../types/domain";
import type { Dictionary } from "../../utils/lng";
import Card from "../Card/Card";
import { workCompanies } from "../../utils/companiesList";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppWorkExpProps = {
  text: Dictionary;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  openModal: () => void;
};

// Отрисовывает секцию опыта работы со списком карточек компаний.
function AppWorkExp({ text, setModalContentCompany, openModal }: AppWorkExpProps) {
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
