"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Language, SectionPath, Theme } from "../../types/domain";
import { DEFAULT_LANGUAGE } from "../../types/domain";
import { getTranslations, type AppTranslations } from "../../content/ui-text";
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

// App связывает роутинг, тему, переводы и модальное состояние
// в один клиентский контейнер для всего интерфейса сайта.
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

  // Все текстовые подписи интерфейса читаются из общего словаря
  // по текущей локали, чтобы компоненты не знали о структуре переводов.
  const currentText: AppTranslations = getTranslations(language);

  // Одна переменная управляет общей fade-анимацией основного контента.
  const isFading = isLanguageSwitching || isRouteSwitching;

  // Карта секций связывает нормализованный путь и нужный JSX-блок.
  const sectionContentByPath: Record<SectionPath, ReactNode> = {
    "/about": <AppAboutMe text={currentText} />,
    "/work": (
      <AppWorkExp
        text={currentText}
        language={language}
        setModalContentCompany={setModalContentCompany}
        openModal={openModal}
      />
    ),
    "/projects": (
      <AppProjectsExp
        text={currentText}
        language={language}
        setModalContentCompany={setModalContentCompany}
        openModal={openModal}
      />
    ),
    "/activities": (
      <AppActivitiesExp
        text={currentText}
        language={language}
        setModalContentCompany={setModalContentCompany}
        openModal={openModal}
      />
    ),
  };

  return (
    <>
      <div className={styles.page}>
        {/* Шапка получает только текущие состояния и callbacks,
            а сама логика навигации скрыта в хуках родителя. */}
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
          {sectionContentByPath[activePath]}
        </main>

        {/* Нижняя часть страницы также реагирует на смену языка,
            чтобы анимация переключения оставалась согласованной. */}
        <AppFooter text={currentText} isLanguageSwitching={isLanguageSwitching} />
        <div
          className={`${styles.fade} ${
            isLanguageSwitching ? styles.pageFading : styles.pageVisible
          }`}
        >
          <CookieBanner text={currentText} />
        </div>
      </div>

      {/* Портальная модалка монтируется только когда действительно нужна,
          чтобы не держать лишние обработчики и aria-разметку в DOM. */}
      {modalOpened && (
        <Modal
          closeModal={closeModal}
          showContent={showContent}
          setShowContent={setShowContent}
          closeLabel={currentText.modal.closeLabel}
        >
          <ModalContent company={activeModalCompany} />
        </Modal>
      )}
    </>
  );
}

export default App;
