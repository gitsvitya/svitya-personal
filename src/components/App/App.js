"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
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

function trimPath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

function normalizePath(path) {
  const trimmed = trimPath(path);
  if (ALLOWED_PATHS.includes(trimmed)) return trimmed;
  return "/about";
}

// Корневой компонент: собирает секции страницы, управляет языком, темой и модальными окнами.
function App({ initialPath = "/about" }) {
  const [language, setLanguage] = useState("en");
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);
  const languageTimeouts = useRef([]);
  const [theme, setTheme] = useState("light");
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContentCompany, setModalContentCompany] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [isRouteSwitching, setIsRouteSwitching] = useState(false);
  const routeTimeoutRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const currentPath = pathname || initialPath;
  const activePath = normalizePath(currentPath);

  // Если путь сменился (например, кнопки браузера), снимаем флаг анимации.
  useEffect(() => {
    if (routeTimeoutRef.current) {
      clearTimeout(routeTimeoutRef.current);
      routeTimeoutRef.current = null;
    }
    setIsRouteSwitching(false);
  }, [pathname]);

  // Сохраняем предыдущую логику: неизвестные пути и корень ведут на /about.
  useEffect(() => {
    const trimmed = trimPath(currentPath);
    if (!ALLOWED_PATHS.includes(trimmed)) {
      router.replace("/about");
    }
  }, [currentPath, router]);

  let currentText;
  if (language === "ru") currentText = rusLng;
  else currentText = engLng;

  const openModal = useCallback(() => {
    setModalOpened(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setShowContent(false);
    setTimeout(() => {
      setModalOpened(false);
      document.body.style.overflow = "";
    }, 500);
  }, []);

  useEffect(() => {
    document.title = currentText.pageTitle;
  }, [currentText.pageTitle]);

  useEffect(() => {
    if (!isThemeReady) return;
    localStorage.setItem("theme", theme);
  }, [isThemeReady, theme]);

  useEffect(() => {
    return () => {
      languageTimeouts.current.forEach(clearTimeout);
    };
  }, []);

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

  useEffect(() => {
    if (!isThemeReady) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    const bgPage = getComputedStyle(root).getPropertyValue("--bg-page");
    root.style.backgroundColor = bgPage;
  }, [isThemeReady, theme]);

  // После гидрации подтягиваем реальные пользовательские настройки.
  useEffect(() => {
    const browserLng = window.navigator.language.startsWith("ru") ? "ru" : "en";
    setLanguage(browserLng);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      setIsThemeReady(true);
      return;
    }

    const domTheme = document.documentElement.getAttribute("data-theme");
    if (domTheme === "light" || domTheme === "dark") {
      setTheme(domTheme);
      setIsThemeReady(true);
      return;
    }

    setIsThemeReady(true);
  }, []);

  const navigateTo = useCallback(
    (path) => {
      const normalized = normalizePath(path);
      if (normalized === activePath) return;
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);

      setIsRouteSwitching(true);
      routeTimeoutRef.current = setTimeout(() => {
        router.push(normalized);
        setTimeout(() => setIsRouteSwitching(false), 10);
      }, FADE_DURATION);
    },
    [activePath, router]
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
          {activePath === "/about" && <AppAboutMe text={currentText}></AppAboutMe>}
          {activePath === "/work" && (
            <AppWorkExp
              text={currentText}
              setModalContentCompany={setModalContentCompany}
              openModal={openModal}
            ></AppWorkExp>
          )}
          {activePath === "/projects" && (
            <AppProjectsExp
              text={currentText}
              setModalContentCompany={setModalContentCompany}
              openModal={openModal}
            ></AppProjectsExp>
          )}
          {activePath === "/activities" && (
            <AppActivitiesExp
              text={currentText}
              setModalContentCompany={setModalContentCompany}
              openModal={openModal}
            ></AppActivitiesExp>
          )}
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
