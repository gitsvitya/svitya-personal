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
  // Состояния текущего языка страницы, которое изначально определяется по языку браузера
  const [language, SetLanguage] = useState(window.navigator.language);
  // Состояние открытого модального окна
  const [modalOpened, SetModalOpened] = useState(false);
  // Состояние для рендера контента модельного окна, принимает на вход абберивиатуру компании
  const [modalContentCompany, SetModalContentCompany] = useState("");
  // Состояние для анимации модального окна
  const [showContent, SetShowContent] = useState(false);

  // Определяем на каком языке показывать страницу - русский или английский
  let currentText;
  if (language === "ru") currentText = rusLng;
  else currentText = engLng;

  // Функция, меняющая состояние открытия модального окна на true
  function openModal() {
    SetModalOpened(true);
  }

  //Функция, меняющая состояние открытия модального окна на false с задержкой в 0.5 секунды, чтобы проигралась анимация закрытия
  function closeModal() {
    SetShowContent(false);
    setTimeout(() => {
      SetModalOpened(false);
    }, 500);
  }

  //Эффект, меняющий pageTitle в зависимости от текста страницы
  useEffect(() => {
    document.title = currentText.pageTitle;
  });

  // Функция по скрытию скролла во время открытия модального окна
  // useEffect(() => {
  //   document.body.style.overflow = modalOpened ? "hidden" : "unset";
  // }, [modalOpened]);

  return (
    <>
      <div className={styles.page}>
        <AppHeader
          text={currentText}
          SetLanguage={SetLanguage}
          language={language}
        ></AppHeader>
        <main>
          <Title text={currentText}></Title>
          <About text={currentText}></About>
          <WorkExp
            text={currentText}
            modalOpened={modalOpened}
            modalContentCompany={modalContentCompany}
            SetModalContentCompany={SetModalContentCompany}
            openModal={openModal}
            closeModal={closeModal}
          ></WorkExp>
          <ProjectsExp
            text={currentText}
            modalOpened={modalOpened}
            modalContentCompany={modalContentCompany}
            SetModalContentCompany={SetModalContentCompany}
            openModal={openModal}
            closeModal={closeModal}
          ></ProjectsExp>
          <OtherExp
            text={currentText}
            modalOpened={modalOpened}
            modalContentCompany={modalContentCompany}
            SetModalContentCompany={SetModalContentCompany}
            openModal={openModal}
            closeModal={closeModal}
          ></OtherExp>
        </main>
        <AppFooter text={currentText}></AppFooter>
      </div>
      {modalOpened && (
        <Modal
          closeModal={closeModal}
          showContent={showContent}
          SetShowContent={SetShowContent}
        >
          <ModalContent
            modalContent={modalContentCompany}
            text={currentText}
          ></ModalContent>
        </Modal>
      )}
    </>
  );
}

export default App;
