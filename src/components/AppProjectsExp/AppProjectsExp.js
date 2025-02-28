import styles from "./AppProjectsExp.module.css";
import Card from "../Card/Card";

function AppProjectsExp(props) {
  return (
    <div className={styles.projectsExp} id="projectsExp">
      <div className={styles.container}>
        <h3 className={styles.header}>
          {props.text.projectExpBlockHeaderText}
        </h3>
        <div className={styles.cardBox}>
        <Card
            CompanyName={"MBC"}
            props={props}
            openModal={props.openModal}
            SetModalContentCompany={props.SetModalContentCompany}
          ></Card>
          <Card
            CompanyName={"MNG"}
            props={props}
            openModal={props.openModal}
            SetModalContentCompany={props.SetModalContentCompany}
          ></Card>
          <Card
            CompanyName={"VNV"}
            props={props}
            openModal={props.openModal}
            SetModalContentCompany={props.SetModalContentCompany}
          ></Card>
        </div>
      </div>
    </div>
  );
}

export default AppProjectsExp;
