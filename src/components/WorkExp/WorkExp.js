import React from 'react';
import styles from "./WorkExp.module.css";
import Modal from "../Modal/Modal";
import ModalContent from '../ModalContent/ModalContent';
import Card from '../Card/Card';

function WorkExp(props) {

  const [ModalOpen, ModalOpened] = React.useState(false);
  const [ModalContentCompany, SetModalContentCompany] = React.useState("");

  function openModal() {
    ModalOpened(true);
  }

  function closeModal() {
    ModalOpened(false);
  }

  return (
    <>
    <div className={styles.workExp}>
      <div className={styles.container}>
        <h2 className={styles.header}>{props.text.workExpBlockHeaderText}</h2>
        <div className={styles.cardBox}>
          <Card CompanyName={"NTB"} props={props} openModal={openModal} SetModalContentCompany= {SetModalContentCompany}></Card>
          <Card CompanyName={"LRNPT"} props={props} openModal={openModal} SetModalContentCompany= {SetModalContentCompany}></Card>
          <Card CompanyName={"KG"} props={props} openModal={openModal} SetModalContentCompany= {SetModalContentCompany}></Card>
          <Card CompanyName={"TR"} props={props} openModal={openModal} SetModalContentCompany= {SetModalContentCompany}></Card>
        </div>
      </div>
    </div>
      {ModalOpen && (
          <Modal closeModal={closeModal}>
            <ModalContent ModalContent={ModalContentCompany} props={props}></ModalContent>
          </Modal>
      )}
    </>
  )
}

export default WorkExp;
