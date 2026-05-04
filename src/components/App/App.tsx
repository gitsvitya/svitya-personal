"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { CompanyId, CompanySection, Language, SectionPath, Theme } from "../../types/domain";
import { DEFAULT_LANGUAGE } from "../../types/domain";
import { getLocalizedCompany } from "../../content/companies";
import { getTranslations, type AppTranslations } from "../../content/ui-text";
import { normalizeSectionPath, parseLocalizedPath } from "../../utils/routing";
import { useLocalizedNavigation } from "../../hooks/useLocalizedNavigation";
import { useThemePreference } from "../../hooks/useThemePreference";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import AppProjectsExp from "../AppProjectsExp/AppProjectsExp";
import AppFooter from "../AppFooter/AppFooter";
import AppWorkExp from "../AppWorkExp/AppWorkExp";
import AppAboutMe from "../AppAboutMe/AppAboutMe";
import AppActivitiesExp from "../AppActivities/AppActivitiesExp";
import CookieBanner from "../CookieBanner/CookieBanner";
import AppDetailPage from "../AppDetailPage/AppDetailPage";

type AppProps = {
  initialPath?: string;
  initialLanguage?: Language;
  initialTheme?: Theme;
};

const SECTION_PATH_BY_COMPANY_SECTION: Record<CompanySection, SectionPath> = {
  work: "/work",
  projects: "/projects",
  activities: "/activities",
};

// App связывает роутинг, тему, переводы и состояние подробного просмотра
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
  const [activeCompanyId, setActiveCompanyId] = useState<CompanyId | null>(null);

  // Все текстовые подписи интерфейса читаются из общего словаря
  // по текущей локали, чтобы компоненты не знали о структуре переводов.
  const currentText: AppTranslations = getTranslations(language);

  // Одна переменная управляет общей fade-анимацией основного контента.
  const isFading = isLanguageSwitching || isRouteSwitching;
  const activeDetailCompany = useMemo(() => {
    if (activeCompanyId === null) return null;
    return getLocalizedCompany(activeCompanyId, language);
  }, [activeCompanyId, language]);

  const activeDetailSectionPath = activeDetailCompany
    ? SECTION_PATH_BY_COMPANY_SECTION[activeDetailCompany.section]
    : null;
  const shouldShowDetailPage =
    activeDetailCompany !== null && activeDetailSectionPath === activePath;

  const detailSectionTitle = activeDetailCompany
    ? currentText.sections[activeDetailCompany.section]
    : "";

  function handleNavigate(path: SectionPath) {
    setActiveCompanyId(null);
    navigateTo(path);
  }

  function handleBackToCards() {
    setActiveCompanyId(null);
  }

  // Если пользователь ушел на другой раздел браузерной навигацией,
  // выбранная запись больше не должна подменять сетку карточек.
  useEffect(() => {
    if (activeDetailCompany && activeDetailSectionPath !== activePath) {
      setActiveCompanyId(null);
    }
  }, [activeDetailCompany, activeDetailSectionPath, activePath]);

  // Карта секций связывает нормализованный путь и нужный JSX-блок.
  const sectionContentByPath: Record<SectionPath, ReactNode> = {
    "/about": <AppAboutMe text={currentText} />,
    "/work": (
      <AppWorkExp
        text={currentText}
        language={language}
        onCardActivate={setActiveCompanyId}
      />
    ),
    "/projects": (
      <AppProjectsExp
        text={currentText}
        language={language}
        onCardActivate={setActiveCompanyId}
      />
    ),
    "/activities": (
      <AppActivitiesExp
        text={currentText}
        language={language}
        onCardActivate={setActiveCompanyId}
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
          onNavigate={handleNavigate}
        />
        <main
          className={`${styles.main} ${styles.fade} ${
            isFading ? styles.pageFading : styles.pageVisible
          }`}
        >
          {shouldShowDetailPage ? (
            <AppDetailPage
              company={activeDetailCompany}
              text={currentText}
              sectionTitle={detailSectionTitle}
              onBack={handleBackToCards}
            />
          ) : (
            sectionContentByPath[activePath]
          )}
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
    </>
  );
}

export default App;
