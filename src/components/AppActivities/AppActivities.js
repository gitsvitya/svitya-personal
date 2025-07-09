import styles from "./AppActivities.module.css";
import Card from "../Card/Card";

function AppActivities(props) {
  const activityCompanies = ["SKO", "SDC"];

  return (
    <div className={styles.otherExp} id="otherExp">
      <div className={styles.container}>
        <h3 className={styles.header}>{props.text.otherExpBlockHeaderText}</h3>
        <div className={styles.cardBox}>
          {activityCompanies.map((name) => (
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

export default AppActivities;
