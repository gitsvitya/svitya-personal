import styles from "./AppActivitiesExp.module.css";
import Card from "../Card/Card.js";
import { activityCompanies } from "../../utils/companiesList.js";

function AppActivitiesExp({text, setModalContentCompany, openModal}) {
  return (
    <div className={styles.otherExp} id="otherExp">
      <div className={styles.container}>
        <h3 className={styles.header}>{text.otherExpBlockHeaderText}</h3>
        <div className={styles.cardBox}>
          {activityCompanies.map((name) => (
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

export default AppActivitiesExp;
