import { useState, useEffect, useCallback, useRef } from "react";
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

// Корневой компонент: собирает секции страницы, управляет языком, темой и модальными окнами.
function App({ initialTheme = "light" }) {
  // Определяем язык по браузеру; дальше язык управляется локальным стейтом.
  const browserLng = window.navigator.language.startsWith("ru") ? "ru" : "en";
  const [language, setLanguage] = useState(browserLng);
  // Флаг для плавной анимации смены языка.
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);
  // Храним таймауты, чтобы корректно сбрасывать анимацию при быстрых переключениях.
  const languageTimeouts = useRef([]);
  // Тема берётся из расчёта на сервере (head-скрипт) и дальше хранится в state.
  const [theme, setTheme] = useState(initialTheme);
  // Проверка на открыто ли модальное окно.
  const [modalOpened, setModalOpened] = useState(false);
  // Какая карточка должна быть показана в модальном окне.
  const [modalContentCompany, setModalContentCompany] = useState("");
  // Управляет плавным появлением контента внутри модалки.
  const [showContent, setShowContent] = useState(false);

  // Определяем на каком языке показывать страницу - русский или английский
  let currentText;
  if (language === "ru") currentText = rusLng;
  else currentText = engLng;

  // Открываем модалку (link stable для передачи в карточки).
  const openModal = useCallback(() => {
    setModalOpened(true);
  }, []);

  // Закрываем модалку с задержкой, чтобы успела отыграть CSS-анимация.
  const closeModal = useCallback(() => {
    setShowContent(false);
    setTimeout(() => {
      setModalOpened(false);
    }, 500);
  }, []);

  // Обновляем заголовок вкладки при смене языка.
  useEffect(() => {
    document.title = currentText.pageTitle;
  }, [currentText.pageTitle]);

  // Убираем незавершённые таймеры анимации при размонтировании.
  useEffect(() => {
    return () => {
      languageTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  const changeLanguageWithFade = useCallback(
    (nextLanguage) => {
      if (nextLanguage === language) return;
      languageTimeouts.current.forEach(clearTimeout);
      languageTimeouts.current = [];
      setIsLanguageSwitching(true);
      const fadeOutTimer = setTimeout(() => {
        setLanguage(nextLanguage);
        const fadeInTimer = setTimeout(() => {
          setIsLanguageSwitching(false);
        }, 300);
        languageTimeouts.current.push(fadeInTimer);
      }, 300);
      languageTimeouts.current.push(fadeOutTimer);
    },
    [language]
  );

  // Эффект установки выбранной темы на документ
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    const bgPage = getComputedStyle(root).getPropertyValue("--bg-page");
    root.style.backgroundColor = bgPage;
  }, [theme]);

  return (
    <>
      <div className={styles.page}>
        <AppHeader
          text={currentText}
          onLanguageChange={changeLanguageWithFade}
          language={language}
          theme={theme}
          setTheme={setTheme}
          isLanguageSwitching={isLanguageSwitching}
        ></AppHeader>
        <div
          className={`${styles.content} ${
            isLanguageSwitching ? styles.pageFading : styles.pageVisible
          }`}
        >
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
          <CookieBanner text={currentText}></CookieBanner>
        </div>
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
