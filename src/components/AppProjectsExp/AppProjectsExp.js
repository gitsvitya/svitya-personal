import styles from "./AppProjectsExp.module.css";
import Card from "../Card/Card";
import { projectCompanies } from "../../utils/companiesList.js";

function AppProjectsExp({text, setModalContentCompany, openModal}) {
  return (
    <div className={styles.projectsExp} id="projectsExp">
      <div className={styles.container}>
        <h3 className={styles.header}>
          {text.projectExpBlockHeaderText}
        </h3>
        <div className={styles.cardBox}>
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
      </div>
    </div>
  );
}

export default AppProjectsExp;
