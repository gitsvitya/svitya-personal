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
          text={props.text}
          openModal={props.openModal}
          setModalContentCompany={props.setModalContentCompany}></Card>
          <Card
          CompanyName={"SDC"}
          text={props.text}
          openModal={props.openModal}
          setModalContentCompany={props.setModalContentCompany}></Card>
        </div>
      </div>
    </div>
  );
}

export default AppActivities;
