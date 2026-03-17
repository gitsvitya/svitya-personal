import type { Dispatch, SetStateAction } from "react";
import type { CompanyId, Language } from "../../types/domain";
import { getCompaniesBySection, getLocalizedCompany } from "../../content/companies";
import type { Dictionary } from "../../utils/lng";
import Card from "../Card/Card";
import Section from "../Section/Section";
import sectionStyles from "../Section/Section.module.css";

type AppWorkExpProps = {
  text: Dictionary;
  language: Language;
  setModalContentCompany: Dispatch<SetStateAction<CompanyId | null>>;
  openModal: () => void;
};

// Отрисовывает секцию опыта работы со списком карточек компаний.
function AppWorkExp({ text, language, setModalContentCompany, openModal }: AppWorkExpProps) {
  return (
    <Section id="workExp" title={text.workExpBlockHeaderText}>
      <div className={sectionStyles.cardsGrid}>
        {getCompaniesBySection("work").map((company) => (
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

export default AppWorkExp;
