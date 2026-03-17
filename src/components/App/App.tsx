"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Language, Theme } from "../../types/domain";
import { DEFAULT_LANGUAGE } from "../../types/domain";
import { getTranslations, type AppTranslations } from "../../utils/lng";
import { normalizeSectionPath, parseLocalizedPath } from "../../utils/routing";
import { useAppModal } from "../../hooks/useAppModal";
import { useLocalizedNavigation } from "../../hooks/useLocalizedNavigation";
import { useThemePreference } from "../../hooks/useThemePreference";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import AppProjectsExp from "../AppProjectsExp/AppProjectsExp";
import AppFooter from "../AppFooter/AppFooter";
import AppWorkExp from "../AppWorkExp/AppWorkExp";
import Modal from "../Modal/Modal";
import ModalContent from "../ModalContent/ModalContent";
import AppAboutMe from "../AppAboutMe/AppAboutMe";
import AppActivitiesExp from "../AppActivities/AppActivitiesExp";
import CookieBanner from "../CookieBanner/CookieBanner";

type AppProps = {
  initialPath?: string;
  initialLanguage?: Language;
  initialTheme?: Theme;
};

// Корневой компонент: собирает секции страницы, управляет языком, темой и модальными окнами.
function App({
  initialPath = "/en/about",
  initialLanguage = DEFAULT_LANGUAGE,
  initialTheme = "light",
}: AppProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentPath = pathname || initialPath;
  const parsedPath = parseLocalizedPath(currentPath);
  const currentRouteLanguage = parsedPath.language || initialLanguage || DEFAULT_LANGUAGE;
  const activePath = normalizeSectionPath(parsedPath.sectionPath);
  const { theme, setTheme } = useThemePreference(initialTheme);
  const {
    language,
    isLanguageSwitching,
    isRouteSwitching,
    changeLanguageWithFade,
    navigateTo,
  } = useLocalizedNavigation({
    pathname,
    router,
    activePath,
    currentRouteLanguage,
    hasLocale: parsedPath.hasLocale,
    isSectionValid: parsedPath.isSectionValid,
  });
  const {
    modalOpened,
    showContent,
    setShowContent,
    setModalContentCompany,
    openModal,
    closeModal,
    activeModalCompany,
  } = useAppModal(language);

  // Выбирает словарь интерфейса по активному языку.
  const currentText: AppTranslations = getTranslations(language);

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
        />
        <main
          className={`${styles.main} ${styles.fade} ${
            isFading ? styles.pageFading : styles.pageVisible
          }`}
        >
          {activePath === "/about" && <AppAboutMe text={currentText} />}
          {activePath === "/work" && (
            <AppWorkExp
              text={currentText}
              language={language}
              setModalContentCompany={setModalContentCompany}
              openModal={openModal}
            />
          )}
          {activePath === "/projects" && (
            <AppProjectsExp
              text={currentText}
              language={language}
              setModalContentCompany={setModalContentCompany}
              openModal={openModal}
            />
          )}
          {activePath === "/activities" && (
            <AppActivitiesExp
              text={currentText}
              language={language}
              setModalContentCompany={setModalContentCompany}
              openModal={openModal}
            />
          )}
        </main>
        <AppFooter text={currentText} isLanguageSwitching={isLanguageSwitching} />
        <div
          className={`${styles.fade} ${
            isLanguageSwitching ? styles.pageFading : styles.pageVisible
          }`}
        >
          <CookieBanner text={currentText} />
        </div>
      </div>
      {modalOpened && (
        <Modal closeModal={closeModal} showContent={showContent} setShowContent={setShowContent}>
          <ModalContent company={activeModalCompany} />
        </Modal>
      )}
    </>
  );
}

export default App;
