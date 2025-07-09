import styles from "./AppProjectsExp.module.css";
import Card from "../Card/Card";

function AppProjectsExp(props) {
  const projectCompanies = ["MBC", "MNG", "VNV"];

  return (
    <div className={styles.projectsExp} id="projectsExp">
      <div className={styles.container}>
        <h3 className={styles.header}>
          {props.text.projectExpBlockHeaderText}
        </h3>
        <div className={styles.cardBox}>
          {projectCompanies.map((name) => (
            <Card
              key={name}
              CompanyName={name}
              text={props.text}
              openModal={props.openModal}
              setModalContentCompany={props.setModalContentCompany}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppProjectsExp;
