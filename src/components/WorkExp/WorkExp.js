import styles from "./WorkExp.module.css";
import Card from "../Card/Card";

function WorkExp(props) {
  return (
    <div className={styles.workExp} id="workExp">
      <div className={styles.container}>
        <h3 className={styles.header}>{props.text.workExpBlockHeaderText}</h3>
        <div className={styles.cardBox}>
          <Card
            CompanyName={"NTB"}
            props={props}
            openModal={props.openModal}
            SetModalContentCompany={props.SetModalContentCompany}
          ></Card>
          <Card
            CompanyName={"LRNPT"}
            props={props}
            openModal={props.openModal}
            SetModalContentCompany={props.SetModalContentCompany}
          ></Card>
          <Card
            CompanyName={"KG"}
            props={props}
            openModal={props.openModal}
            SetModalContentCompany={props.SetModalContentCompany}
          ></Card>
          <Card
            CompanyName={"TR"}
            props={props}
            openModal={props.openModal}
            SetModalContentCompany={props.SetModalContentCompany}
          ></Card>
        </div>
      </div>
    </div>
  );
}

export default WorkExp;
