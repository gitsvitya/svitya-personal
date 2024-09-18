import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Title from "../Title/Title";
import ProjectsExp from "../ProjectsExp/ProjectsExp";
import AppFooter from "../AppFooter/AppFooter";
import WorkExp from "../WorkExp/WorkExp";
import Modal from "../Modal/Modal";
import ModalContent from "../ModalContent/ModalContent";
import { rusLng, engLng } from "../../utils/lng";

function App() {
  const [Language, ChangeLanguage] = React.useState("en");
  const [ModalOpen, ModalOpened] = React.useState(false);
  const [ModalContentCompany, SetModalContentCompany] = React.useState("");

  // let test = window.navigator.language;
  let currentText = engLng;
  if (Language === "ru") currentText = engLng;
  else currentText = rusLng;

  function openModal() {
    ModalOpened(true);
  }

  function closeModal() {
    ModalOpened(false);
  }

  return (<>
    <div className={styles.page}>
      <AppHeader
        text={currentText}
        ChangeLanguage={ChangeLanguage}
        Language={Language}
      ></AppHeader>
      <main>
        <Title text={currentText}></Title>
        <WorkExp text={currentText} ModalOpen={ModalOpen} ModalContentCompany={ModalContentCompany} SetModalContentCompany={SetModalContentCompany} openModal={openModal} closeModal={closeModal}></WorkExp>
        <ProjectsExp text={currentText}></ProjectsExp>
      </main>
      <AppFooter text={currentText}></AppFooter>
    </div>
    {ModalOpen && (
      <Modal closeModal={closeModal}>
        <ModalContent ModalContent={ModalContentCompany} text={currentText}></ModalContent>
      </Modal>
  )}
  </>);
}

export default App;
