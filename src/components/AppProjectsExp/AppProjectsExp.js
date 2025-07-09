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
            text={props.text}
            openModal={props.openModal}
            setModalContentCompany={props.setModalContentCompany}
          ></Card>
          <Card
            CompanyName={"MNG"}
            text={props.text}
            openModal={props.openModal}
            setModalContentCompany={props.setModalContentCompany}
          ></Card>
          <Card
            CompanyName={"VNV"}
            text={props.text}
            openModal={props.openModal}
            setModalContentCompany={props.setModalContentCompany}
          ></Card>
        </div>
      </div>
    </div>
  );
}

export default AppProjectsExp;
