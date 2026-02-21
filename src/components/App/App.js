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

const ALLOWED_SECTION_PATHS = ["/about", "/work", "/projects", "/activities"];
const ALLOWED_LANGUAGES = ["ru", "en"];
const DEFAULT_LANGUAGE = "en";
const FADE_DURATION = 300;
const LANGUAGE_KEY = "language";

function trimPath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

function isAllowedSectionPath(path) {
  return ALLOWED_SECTION_PATHS.includes(path);
}

function normalizeSectionPath(path) {
  const trimmed = trimPath(path);
  if (isAllowedSectionPath(trimmed)) return trimmed;
  return "/about";
}

function parseLocalizedPath(path) {
  const trimmed = trimPath(path);
  const chunks = trimmed.split("/").filter(Boolean);

  if (chunks.length > 0 && ALLOWED_LANGUAGES.includes(chunks[0])) {
    const sectionPath = chunks[1] ? `/${chunks[1]}` : "/about";
    return {
      hasLocale: true,
      language: chunks[0],
      sectionPath,
      isSectionValid: isAllowedSectionPath(sectionPath),
    };
  }

  return {
    hasLocale: false,
    language: null,
    sectionPath: trimmed,
    isSectionValid: isAllowedSectionPath(trimmed),
  };
}

function buildLocalizedPath(language, sectionPath) {
  const normalizedLanguage = ALLOWED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
  const normalizedSectionPath = normalizeSectionPath(sectionPath);
  return `/${normalizedLanguage}${normalizedSectionPath}`;
}

function getLegacyHashPath() {
  if (typeof window === "undefined") return null;
  const { hash } = window.location;
  if (!hash || !hash.startsWith("#/")) return null;
  const candidate = trimPath(hash.slice(1));
  return isAllowedSectionPath(candidate) ? candidate : null;
}

// Корневой компонент: собирает секции страницы, управляет языком, темой и модальными окнами.
function App({ initialPath = "/en/about", initialLanguage = DEFAULT_LANGUAGE }) {
  const [language, setLanguage] = useState(initialLanguage);
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
  const parsedPath = parseLocalizedPath(currentPath);
  const currentRouteLanguage = parsedPath.language || initialLanguage || DEFAULT_LANGUAGE;
  const activePath = normalizeSectionPath(parsedPath.sectionPath);

  // Если путь сменился (например, кнопки браузера), снимаем флаг анимации.
  useEffect(() => {
    if (routeTimeoutRef.current) {
      clearTimeout(routeTimeoutRef.current);
      routeTimeoutRef.current = null;
    }
    setIsRouteSwitching(false);
  }, [pathname]);

  // Синхронизируем state языка с языком из URL.
  useEffect(() => {
    if (language !== currentRouteLanguage) {
      setLanguage(currentRouteLanguage);
    }
  }, [currentRouteLanguage, language]);

  // Сохраняем предыдущую логику: legacy hash и невалидные пути перенаправляем на локализованные адреса.
  useEffect(() => {
    const legacyPath = getLegacyHashPath();
    const localizedCurrentPath = buildLocalizedPath(currentRouteLanguage, activePath);

    if (!parsedPath.hasLocale && legacyPath && legacyPath !== activePath) {
      router.replace(buildLocalizedPath(currentRouteLanguage, legacyPath));
      return;
    }

    if (!parsedPath.hasLocale || !parsedPath.isSectionValid) {
      router.replace(localizedCurrentPath);
    }
  }, [activePath, currentRouteLanguage, parsedPath.hasLocale, parsedPath.isSectionValid, router]);

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
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

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
      if (!ALLOWED_LANGUAGES.includes(nextLanguage) || nextLanguage === language) return;
      languageTimeouts.current.forEach(clearTimeout);
      languageTimeouts.current = [];
      setIsLanguageSwitching(true);

      const fadeOutTimer = setTimeout(() => {
        setLanguage(nextLanguage);
        router.push(buildLocalizedPath(nextLanguage, activePath));
        const fadeInTimer = setTimeout(() => {
          setIsLanguageSwitching(false);
        }, 300);
        languageTimeouts.current.push(fadeInTimer);
      }, 300);

      languageTimeouts.current.push(fadeOutTimer);
    },
    [activePath, language, router]
  );

  useEffect(() => {
    if (!isThemeReady) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    const bgPage = getComputedStyle(root).getPropertyValue("--bg-page");
    root.style.backgroundColor = bgPage;
  }, [isThemeReady, theme]);

  // После гидрации подтягиваем пользовательские настройки темы.
  useEffect(() => {
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
      const normalized = normalizeSectionPath(path);
      if (normalized === activePath) return;
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);

      setIsRouteSwitching(true);
      routeTimeoutRef.current = setTimeout(() => {
        router.push(buildLocalizedPath(currentRouteLanguage, normalized));
        setTimeout(() => setIsRouteSwitching(false), 10);
      }, FADE_DURATION);
    },
    [activePath, currentRouteLanguage, router]
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
