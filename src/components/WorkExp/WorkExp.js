import React from 'react';
import styles from "./WorkExp.module.css";
import Modal from "../Modal/Modal";
import ModalContent from '../ModalContent/ModalContent';
import Card from '../Card/Card';

function WorkExp(props) {

  return (
    <div className={styles.workExp}>
      <div className={styles.container}>
        <h2 className={styles.header}>{props.text.workExpBlockHeaderText}</h2>
        <div className={styles.cardBox}>
          <Card CompanyName={"NTB"} props={props} openModal={props.openModal} SetModalContentCompany= {props.SetModalContentCompany}></Card>
          <Card CompanyName={"LRNPT"} props={props} openModal={props.openModal} SetModalContentCompany= {props.SetModalContentCompany}></Card>
          <Card CompanyName={"KG"} props={props} openModal={props.openModal} SetModalContentCompany= {props.SetModalContentCompany}></Card>
          <Card CompanyName={"TR"} props={props} openModal={props.openModal} SetModalContentCompany= {props.SetModalContentCompany}></Card>
        </div>
      </div>
    </div>
  )
}

export default WorkExp;
