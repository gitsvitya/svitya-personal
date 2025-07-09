import styles from "./AppWorkExp.module.css";
import Card from "../Card/Card";

function AppWorkExp(props) {
  return (
    <div className={styles.workExp} id="workExp">
      <div className={styles.container}>
        <h3 className={styles.header}>{props.text.workExpBlockHeaderText}</h3>
        <div className={styles.cardBox}>
        <Card
            CompanyName={"CI"}
            text={props.text}
            openModal={props.openModal}
            setModalContentCompany={props.setModalContentCompany}
          ></Card>
          <Card
            CompanyName={"NTB"}
            text={props.text}
            openModal={props.openModal}
            setModalContentCompany={props.setModalContentCompany}
          ></Card>
          <Card
            CompanyName={"LRNPT"}
            text={props.text}
            openModal={props.openModal}
            setModalContentCompany={props.setModalContentCompany}
          ></Card>
          <Card
            CompanyName={"KG"}
            text={props.text}
            openModal={props.openModal}
            setModalContentCompany={props.setModalContentCompany}
          ></Card>
          <Card
            CompanyName={"TR"}
            text={props.text}
            openModal={props.openModal}
            setModalContentCompany={props.setModalContentCompany}
          ></Card>
        </div>
      </div>
    </div>
  );
}

export default AppWorkExp;
