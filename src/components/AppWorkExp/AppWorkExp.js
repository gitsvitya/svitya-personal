import styles from "./AppWorkExp.module.css";
import Card from "../Card/Card";

function AppWorkExp(props) {
  const workCompanies = ["CI", "NTB", "LRNPT", "KG", "TR"];

  return (
    <div className={styles.workExp} id="workExp">
      <div className={styles.container}>
        <h3 className={styles.header}>{props.text.workExpBlockHeaderText}</h3>
        <div className={styles.cardBox}>
          {workCompanies.map((name) => (
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

export default AppWorkExp;
