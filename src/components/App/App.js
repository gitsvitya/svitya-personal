import { useState, useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Title from "../Title/Title";
import ProjectsExp from "../ProjectsExp/ProjectsExp";
import AppFooter from "../AppFooter/AppFooter";
import WorkExp from "../WorkExp/WorkExp";
import Modal from "../Modal/Modal";
import ModalContent from "../ModalContent/ModalContent";
import About from "../About/About";
import { rusLng, engLng } from "../../utils/lng";
import OtherExp from "../OtherExp/OtherExp";

function App() {
  const [Language, ChangeLanguage] = useState(window.navigator.language);
  const [ModalOpen, ModalOpened] = useState(false);
  const [ModalContentCompany, SetModalContentCompany] = useState("");
  const [showContent, SetShowContent] = useState(false);

  let currentText;
  if (Language === "ru") currentText = rusLng;
  else currentText = engLng;

  function openModal() {
    ModalOpened(true);
  }

  function closeModal() {
    SetShowContent(false);
    setTimeout(() => {
      ModalOpened(false);
    }, 500);
  }

  useEffect(() => {
    document.title = currentText.pageTitle;
  });

  return (
    <>
      <div className={styles.page}>
        <AppHeader
          text={currentText}
          ChangeLanguage={ChangeLanguage}
          Language={Language}
        ></AppHeader>
        <main>
          <Title
          text={currentText}
          ></Title>
          <About
          text={currentText}
          ></About>
          <WorkExp
            text={currentText}
            ModalOpen={ModalOpen}
            ModalContentCompany={ModalContentCompany}
            SetModalContentCompany={SetModalContentCompany}
            openModal={openModal}
            closeModal={closeModal}
          ></WorkExp>
          <ProjectsExp
            text={currentText}
            ModalOpen={ModalOpen}
            ModalContentCompany={ModalContentCompany}
            SetModalContentCompany={SetModalContentCompany}
            openModal={openModal}
            closeModal={closeModal}
          ></ProjectsExp>
          <OtherExp
          text={currentText}
          ModalOpen={ModalOpen}
          ModalContentCompany={ModalContentCompany}
          SetModalContentCompany={SetModalContentCompany}
          openModal={openModal}
          closeModal={closeModal}
          ></OtherExp>
        </main>
        <AppFooter text={currentText}></AppFooter>
      </div>
      {ModalOpen && (
        <Modal closeModal={closeModal} showContent={showContent} SetShowContent={SetShowContent} >
          <ModalContent
            ModalContent={ModalContentCompany}
            text={currentText}
          ></ModalContent>
        </Modal>
      )}
    </>
  );
}

export default App;
