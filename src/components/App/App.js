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

// Разрешенные разделы для клиентской навигации.
const ALLOWED_SECTION_PATHS = ["/about", "/work", "/projects", "/activities"];
// Разрешенные языковые префиксы в URL.
const ALLOWED_LANGUAGES = ["ru", "en"];
// Язык по умолчанию для всех fallback-сценариев.
const DEFAULT_LANGUAGE = "en";
// Единая длительность fade-анимаций при навигации.
const FADE_DURATION = 300;
// Длительность закрытия модального окна.
const MODAL_CLOSE_DURATION = 500;
// Ключи для хранения пользовательских настроек.
const LANGUAGE_KEY = "language";
const THEME_KEY = "theme";

// Нормализует путь, убирая хвостовой слеш (кроме корня).
function trimPath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

// Проверяет, относится ли путь к поддерживаемым разделам.
function isAllowedSectionPath(path) {
  return ALLOWED_SECTION_PATHS.includes(path);
}

// Возвращает валидный путь раздела или fallback на "/about".
function normalizeSectionPath(path) {
  const trimmed = trimPath(path);
  if (isAllowedSectionPath(trimmed)) return trimmed;
  return "/about";
}

// Разбирает URL на язык и раздел с признаком валидности.
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

// Собирает локализованный путь вида "/{lang}/{section}".
function buildLocalizedPath(language, sectionPath) {
  const normalizedLanguage = ALLOWED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
  const normalizedSectionPath = normalizeSectionPath(sectionPath);
  return `/${normalizedLanguage}${normalizedSectionPath}`;
}

// Поддерживает legacy-маршрутизацию через hash-ссылки формата "#/about".
function getLegacyHashPath() {
  if (typeof window === "undefined") return null;
  const { hash } = window.location;
  if (!hash || !hash.startsWith("#/")) return null;
  const candidate = trimPath(hash.slice(1));
  return isAllowedSectionPath(candidate) ? candidate : null;
}

// Корневой компонент: собирает секции страницы, управляет языком, темой и модальными окнами.
function App({
  initialPath = "/en/about",
  initialLanguage = DEFAULT_LANGUAGE,
  initialTheme = "light",
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);
  const languageTimeouts = useRef([]);
  const [theme, setTheme] = useState(initialTheme);
  const [isThemeSynced, setIsThemeSynced] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContentCompany, setModalContentCompany] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [isRouteSwitching, setIsRouteSwitching] = useState(false);
  const routeTimeoutRef = useRef(null);
  const routeFadeInTimeoutRef = useRef(null);
  const pendingRouteSwitchRef = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentPath = pathname || initialPath;
  const parsedPath = parseLocalizedPath(currentPath);
  const currentRouteLanguage = parsedPath.language || initialLanguage || DEFAULT_LANGUAGE;
  const activePath = normalizeSectionPath(parsedPath.sectionPath);

  // Сбрасывает/доигрывает анимацию при смене маршрута из браузерной истории.
  useEffect(() => {
    if (routeTimeoutRef.current) {
      clearTimeout(routeTimeoutRef.current);
      routeTimeoutRef.current = null;
    }
    if (routeFadeInTimeoutRef.current) {
      clearTimeout(routeFadeInTimeoutRef.current);
      routeFadeInTimeoutRef.current = null;
    }

    if (pendingRouteSwitchRef.current) {
      pendingRouteSwitchRef.current = false;
      routeFadeInTimeoutRef.current = setTimeout(() => {
        setIsRouteSwitching(false);
      }, FADE_DURATION);
      return;
    }

    setIsRouteSwitching(false);
  }, [pathname]);

  // Синхронизирует текущий язык с языком из URL.
  useEffect(() => {
    setLanguage(currentRouteLanguage);
  }, [currentRouteLanguage]);

  // Редиректит на корректный локализованный путь для legacy/hash и невалидных URL.
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

  // Выбирает словарь интерфейса по активному языку.
  const currentText = language === "ru" ? rusLng : engLng;

  // Открывает модальное окно и блокирует прокрутку страницы.
  const openModal = useCallback(() => {
    setModalOpened(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Закрывает модальное окно после завершения анимации.
  const closeModal = useCallback(() => {
    setShowContent(false);
    setTimeout(() => {
      setModalOpened(false);
      document.body.style.overflow = "";
    }, MODAL_CLOSE_DURATION);
  }, []);

  // Сохраняет тему в localStorage и cookie после первичной синхронизации.
  useEffect(() => {
    if (!isThemeSynced) return;
    localStorage.setItem(THEME_KEY, theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [isThemeSynced, theme]);

  // Сохраняет язык в localStorage и cookie при каждом переключении.
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.cookie = `lang=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  // Чистит таймеры переключения языка при размонтировании.
  useEffect(() => {
    return () => {
      languageTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  // Чистит таймеры переключения маршрутов при размонтировании.
  useEffect(() => {
    return () => {
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);
      if (routeFadeInTimeoutRef.current) clearTimeout(routeFadeInTimeoutRef.current);
    };
  }, []);

  // Переключает язык с анимацией и последующей навигацией.
  const changeLanguageWithFade = useCallback(
    (nextLanguage) => {
      if (!ALLOWED_LANGUAGES.includes(nextLanguage) || nextLanguage === language) return;
      languageTimeouts.current.forEach(clearTimeout);
      languageTimeouts.current = [];
      setIsLanguageSwitching(true);

      const fadeOutTimer = setTimeout(() => {
        const nextPath = buildLocalizedPath(nextLanguage, activePath);
        setLanguage(nextLanguage);

        const navigateTimer = setTimeout(() => {
          router.push(nextPath);
          const fadeInTimer = setTimeout(() => {
            setIsLanguageSwitching(false);
          }, FADE_DURATION);
          languageTimeouts.current.push(fadeInTimer);
        }, FADE_DURATION);

        languageTimeouts.current.push(navigateTimer);
      }, FADE_DURATION);

      languageTimeouts.current.push(fadeOutTimer);
    },
    [activePath, language, router]
  );

  // Применяет тему к корневому элементу и синхронизирует цвет фона документа.
  useEffect(() => {
    if (!isThemeSynced) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    const bgPage = getComputedStyle(root).getPropertyValue("--bg-page");
    root.style.backgroundColor = bgPage;
  }, [isThemeSynced, theme]);

  // Инициализирует тему из localStorage, data-theme или server-side значения.
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const domTheme = document.documentElement.getAttribute("data-theme");
    const hasSavedTheme = savedTheme === "light" || savedTheme === "dark";
    const hasDomTheme = domTheme === "light" || domTheme === "dark";

    if (hasSavedTheme) setTheme(savedTheme);
    else if (hasDomTheme) setTheme(domTheme);
    else if (initialTheme === "light" || initialTheme === "dark") setTheme(initialTheme);
    else setTheme("light");
    setIsThemeSynced(true);
  }, [initialTheme]);

  // Выполняет переход между разделами с fade-анимацией.
  const navigateTo = useCallback(
    (path) => {
      const normalized = normalizeSectionPath(path);
      if (normalized === activePath) return;
      if (routeTimeoutRef.current) clearTimeout(routeTimeoutRef.current);
      if (routeFadeInTimeoutRef.current) clearTimeout(routeFadeInTimeoutRef.current);

      pendingRouteSwitchRef.current = true;
      setIsRouteSwitching(true);
      routeTimeoutRef.current = setTimeout(() => {
        router.push(buildLocalizedPath(currentRouteLanguage, normalized));
      }, FADE_DURATION);
    },
    [activePath, currentRouteLanguage, router]
  );

  // Объединяет флаги анимации языка и маршрута для управления прозрачностью контента.
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
