import styles from "./AppWorkExp.module.css";
import Card from "../Card/Card";
import { workCompanies } from "../../utils/companiesList.js";

function AppWorkExp({text, setModalContentCompany, openModal}) {
  return (
    <div className={styles.workExp} id="workExp">
      <div className={styles.container}>
        <h3 className={styles.header}>{text.workExpBlockHeaderText}</h3>
        <div className={styles.cardBox}>
          {workCompanies.map((name) => (
            <Card
              key={name}
              CompanyName={name}
              text={text}
              openModal={openModal}
              setModalContentCompany={setModalContentCompany}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppWorkExp;
