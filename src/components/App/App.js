import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import AppProjectsExp from "../AppProjectsExp/AppProjectsExp";
import AppFooter from "../AppFooter/AppFooter";
import AppWorkExp from "../AppWorkExp/AppWorkExp";
import Modal from "../Modal/Modal";
import ModalContent from "../ModalContent/ModalContent";
import AppAboutMe from "../AppAboutMe/AppAboutMe";
import { rusLng, engLng } from "../../utils/lng";
import AppActivitiesExp from "../AppActivities/AppActivitiesExp";
import CookieBanner from "../CookieBanner/CookieBanner";

const ALLOWED_PATHS = ["/about", "/work", "/projects", "/activities"];
const FADE_DURATION = 300;

// Корневой компонент: собирает секции страницы, управляет языком, темой и модальными окнами.
function App({ initialTheme = "light" }) {
  // Определяем язык по браузеру; дальше язык управляется локальным стейтом.
  const browserLng = window.navigator.language.startsWith("ru") ? "ru" : "en";
  const [language, setLanguage] = useState(browserLng);
  // Флаг для плавной анимации смены языка.
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);
  // Храним таймауты, чтобы корректно сбрасывать анимацию при быстрых переключениях смены языка.
  const languageTimeouts = useRef([]);
  // Тема берётся из расчёта на сервере (head-скрипт) и дальше хранится в state.
  const [theme, setTheme] = useState(initialTheme);
  // Проверка на открыто ли модальное окно.
  const [modalOpened, setModalOpened] = useState(false);
  // Какая карточка должна быть показана в модальном окне.
  const [modalContentCompany, setModalContentCompany] = useState("");
  // Управляет плавным появлением контента внутри модалки.
  const [showContent, setShowContent] = useState(false);
  // Управляет плавной сменой разделов.
  const [isRouteSwitching, setIsRouteSwitching] = useState(false);
  const routeTimeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const normalizePath = useCallback((path) => {
    const trimmed = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
    if (ALLOWED_PATHS.includes(trimmed)) return trimmed;
    return "/about";
  }, []);

  const activePath = normalizePath(location.pathname);

  // Если путь сменился другим способом (например, кнопки браузера), снимаем флаг анимации.
  useEffect(() => {
    if (routeTimeoutRef.current) {
      clearTimeout(routeTimeoutRef.current);
      routeTimeoutRef.current = null;
    }
    setIsRouteSwitching(false);
  }, [location.pathname]);

  // Определяем на каком языке показывать страницу - русский или английский
  let currentText;
  if (language === "ru") currentText = rusLng;
  else currentText = engLng;

  // Открываем модалку (link stable для передачи в карточки).
  const openModal = useCallback(() => {
    setModalOpened(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Закрываем модалку с задержкой, чтобы успела отыграть CSS-анимация.
  const closeModal = useCallback(() => {
    setShowContent(false);
    setTimeout(() => {
      setModalOpened(false);
      document.body.style.overflow = "";
    }, 500);
  }, []);

  // Обновляем заголовок вкладки при смене языка.
  useEffect(() => {
    document.title = currentText.pageTitle;
  }, [currentText.pageTitle]);

  // Сохраняем выбранную тему для последующих заходов.
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Убираем незавершённые таймеры анимации при размонтировании.
  useEffect(() => {
    return () => {
      languageTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  // Чистим таймер смены разделов.
  useEffect(() => {
    return () => {
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);
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

  const navigateTo = useCallback(
    (path) => {
      const normalized = normalizePath(path);
      if (normalized === activePath) return;
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);

      setIsRouteSwitching(true);
      routeTimeoutRef.current = setTimeout(() => {
        navigate(normalized);
        // Небольшая задержка, чтобы новый контент плавно появился.
        setTimeout(() => setIsRouteSwitching(false), 10);
      }, FADE_DURATION);
    },
    [activePath, navigate, normalizePath]
  );

  const isFading = isLanguageSwitching || isRouteSwitching;

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
          activePath={activePath}
          onNavigate={navigateTo}
        ></AppHeader>
        <main
          className={`${styles.main} ${styles.fade} ${
            isFading ? styles.pageFading : styles.pageVisible
          }`}
        >
          <Routes location={location}>
            <Route path="/about" element={<AppAboutMe text={currentText}></AppAboutMe>} />
            <Route
              path="/work"
              element={
                <AppWorkExp
                  text={currentText}
                  setModalContentCompany={setModalContentCompany}
                  openModal={openModal}
                ></AppWorkExp>
              }
            />
            <Route
              path="/projects"
              element={
                <AppProjectsExp
                  text={currentText}
                  setModalContentCompany={setModalContentCompany}
                  openModal={openModal}
                ></AppProjectsExp>
              }
            />
            <Route
              path="/activities"
              element={
                <AppActivitiesExp
                  text={currentText}
                  setModalContentCompany={setModalContentCompany}
                  openModal={openModal}
                ></AppActivitiesExp>
              }
            />
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>
        </main>
        <AppFooter
          text={currentText}
          isLanguageSwitching={isLanguageSwitching}
        ></AppFooter>
        <div
          className={`${styles.fade} ${
            isLanguageSwitching ? styles.pageFading : styles.pageVisible
          }`}
        >
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
