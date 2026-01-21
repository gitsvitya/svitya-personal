import { useState, useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import AppTitlePicture from "../AppTitlePicture/AppTitlePicture";
import AppProjectsExp from "../AppProjectsExp/AppProjectsExp";
import AppFooter from "../AppFooter/AppFooter";
import AppWorkExp from "../AppWorkExp/AppWorkExp";
import Modal from "../Modal/Modal";
import ModalContent from "../ModalContent/ModalContent";
import AppAboutMe from "../AppAboutMe/AppAboutMe";
import { rusLng, engLng } from "../../utils/lng";
import AppActivitiesExp from "../AppActivities/AppActivitiesExp";
import CookieBanner from "../CookieBanner/CookieBanner";

function App() {
  // Состояния текущего языка страницы, которое изначально определяется по языку браузера
  const browserLng = window.navigator.language.startsWith("ru") ? "ru" : "en";
  const [language, setLanguage] = useState(browserLng);
  // Состояние темы с привязкой к системной настройке
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(prefersDark ? "dark" : "light");
  // Состояние открытого модального окна
  const [modalOpened, setModalOpened] = useState(false);
  // Состояние для рендера контента модельного окна, принимает на вход абберивиатуру компании
  const [modalContentCompany, setModalContentCompany] = useState("");
  // Состояние для анимации модального окна
  const [showContent, setShowContent] = useState(false);

  // Определяем на каком языке показывать страницу - русский или английский
  let currentText;
  if (language === "ru") currentText = rusLng;
  else currentText = engLng;

  // Функция, меняющая состояние открытия модального окна на true
  function openModal() {
    setModalOpened(true);
  }

  //Функция, меняющая состояние открытия модального окна на false с задержкой в 0.5 секунды, чтобы проигралась анимация закрытия
  function closeModal() {
    setShowContent(false);
    setTimeout(() => {
      setModalOpened(false);
    }, 500);
  }

  //Эффект, меняющий pageTitle в зависимости от текста страницы
  useEffect(() => {
    document.title = currentText.pageTitle;
  }, [currentText.pageTitle]);

  // Эффект установки выбранной темы на документ
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Функция по скрытию скролла во время открытия модального окна
  // useEffect(() => {
  //   document.body.style.overflow = modalOpened ? "hidden" : "unset";
  // }, [modalOpened]);

  return (
    <>
      <div className={styles.page}>
        <AppHeader
          text={currentText}
          setLanguage={setLanguage}
          language={language}
          theme={theme}
          setTheme={setTheme}
        ></AppHeader>
        <main>
          <AppTitlePicture text={currentText}></AppTitlePicture>
          <AppAboutMe text={currentText}></AppAboutMe>
          <AppWorkExp
            text={currentText}
            setModalContentCompany={setModalContentCompany}
            openModal={openModal}
          ></AppWorkExp>
          <AppProjectsExp
            text={currentText}
            setModalContentCompany={setModalContentCompany}
            openModal={openModal}
          ></AppProjectsExp>
          <AppActivitiesExp
            text={currentText}
            setModalContentCompany={setModalContentCompany}
            openModal={openModal}
          ></AppActivitiesExp>
        </main>
        <AppFooter text={currentText}></AppFooter>
        <CookieBanner
          text={currentText}
        ></CookieBanner>
      </div>
      {modalOpened && (
        <Modal
          closeModal={closeModal}
          showContent={showContent}
          setShowContent={setShowContent}
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
