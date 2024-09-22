import styles from './OtherExp.module.css';
import Card from '../Card/Card';

function OtherExp (props) {
  return(
    <div className={styles.otherExp} id="otherExp">
      <div className={styles.container}>
        <h2 className={styles.header}>
          {props.text.otherExpBlockHeaderText}
        </h2>
        <div className={styles.cardBox}>
          <Card
          CompanyName={"MNG"}
          props={props}
          openModal={props.openModal}
          SetModalContentCompany={props.SetModalContentCompany}></Card>
          <Card
            CompanyName={"MNG"}
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
        </div>
      </div>
    </div>
  );
}

export default OtherExp;
