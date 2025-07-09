import styles from "./AppActivities.module.css";
import Card from "../Card/Card";
import { activityCompanies } from "../../utils/companiesList.js";

function AppActivities({text, setModalContentCompany, openModal}) {
  return (
    <div className={styles.otherExp} id="otherExp">
      <div className={styles.container}>
        <h3 className={styles.header}>{text.otherExpBlockHeaderText}</h3>
        <div className={styles.cardBox}>
          {activityCompanies.map((name) => (
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

export default AppActivities;
