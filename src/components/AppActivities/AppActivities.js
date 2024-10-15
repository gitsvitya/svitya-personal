import styles from './AppActivities.module.css';
import Card from '../Card/Card';

function AppActivities (props) {
  return(
    <div className={styles.otherExp} id="otherExp">
      <div className={styles.container}>
        <h3 className={styles.header}>
          {props.text.otherExpBlockHeaderText}
        </h3>
        <div className={styles.cardBox}>
          <Card
          CompanyName={"SKO"}
          props={props}
          openModal={props.openModal}
          SetModalContentCompany={props.SetModalContentCompany}></Card>
          <Card
          CompanyName={"SDC"}
          props={props}
          openModal={props.openModal}
          SetModalContentCompany={props.SetModalContentCompany}></Card>
          <Card
          CompanyName={"STS"}
          props={props}
          openModal={props.openModal}
          SetModalContentCompany={props.SetModalContentCompany}></Card>
        </div>
      </div>
    </div>
  );
}

export default AppActivities;
