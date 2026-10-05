import type { Language } from "../types/domain";

export const uiText = {
  ru: {
    page: {
      title: "Виктор Строков",
    },
    theme: {
      light: "Светлая",
      dark: "Тёмная",
    },
    languages: {
      english: "Английский",
      russian: "Русский",
    },
    navigation: {
      menuLabel: "Разделы",
      skipToContent: "Перейти к содержимому",
    },
    sections: {
      about: "Обо мне",
      work: "Опыт работы",
      projects: "Проекты",
      activities: "Активности",
      settings: "Настройки",
    },
    settings: {
      theme: "Тема оформления",
      darkTheme: "Тёмная тема",
      language: "Язык",
      russianLanguage: "Русский язык",
      cookies: "Cookie",
      cookieSettings: "Настройки cookie",
    },
    about: {
      title: "Виктор Строков",
      portraitAlt: "Портрет Виктора Строкова",
      contact: "Обсудить проект",
      cv: "Моё CV",
      experience: "Более 10 лет в продукте, проектах и аналитике",
      subtitle: "Управление проектами, разработка продуктов, исследования и аналитика",
      description:
        "Развиваю информационные и цифровые продукты, выстраиваю бизнес-процессы и объединяю работу аналитиков, дизайнеров и разработчиков. Мой опыт — международные и российские компании, а также собственные проекты. Открыт к новым задачам и профессиональному сотрудничеству.",
    },
    notFound: {
      title: "Страница не найдена",
      description:
        "Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную, чтобы продолжить знакомство.",
      home: "На главную",
    },
    cookieBanner: {
      label: "Настройки cookie",
      description:
        "Для корректной работы сайта я использую обязательные cookie. Дополнительная аналитика поможет мне развивать сайт и делать его лучше. Можно оставить только обязательные cookie или разрешить все, включая аналитические.",
      accept: "Разрешить все",
      reject: "Только обязательные",
    },
    detail: {
      back: "Назад",
      backToSection: "Вернуться к разделу",
      materialsTitle: "Материалы",
      download: "Скачать",
      contribution: "Мой вклад",
      challenge: "Задача",
      outcome: "Результат",
      materialOf: "из",
      openWindow: "Открыть в новом окне",
      openLink: "Перейти по ссылке",
      previousMaterial: "Предыдущий материал",
      nextMaterial: "Следующий материал",
    },
    modal: {
      closeLabel: "Закрыть модальное окно",
    },
    footer: {
      contacts: "Контакты",
      metaDisclaimer: "*принадлежит компании Meta, признанной экстремистской и запрещённой в РФ",
    },
    card: {
      button: "Подробнее",
    },
  },
  en: {
    page: {
      title: "Victor Strokov",
    },
    theme: {
      light: "Light",
      dark: "Dark",
    },
    languages: {
      english: "English",
      russian: "Russian",
    },
    navigation: {
      menuLabel: "Sections",
      skipToContent: "Skip to content",
    },
    sections: {
      about: "About me",
      work: "Work experience",
      projects: "Projects",
      activities: "Activities",
      settings: "Settings",
    },
    settings: {
      theme: "Appearance",
      darkTheme: "Dark theme",
      language: "Language",
      russianLanguage: "Russian language",
      cookies: "Cookies",
      cookieSettings: "Cookie settings",
    },
    about: {
      title: "Victor Strokov",
      portraitAlt: "Portrait of Victor Strokov",
      contact: "Let’s talk",
      cv: "My CV",
      experience: "10+ years in products, projects and analytics",
      subtitle: "Project Management, Product Development, Research & Analytics",
      description:
        "I develop information and digital products, build business processes, and bring together analysts, designers and developers. My experience spans international and Russian companies, as well as my own projects. I am open to new challenges and professional collaboration.",
    },
    notFound: {
      title: "Page not found",
      description:
        "The link may be out of date or the address may contain a typo. Head back to the homepage to keep exploring.",
      home: "Back to home",
    },
    cookieBanner: {
      label: "Cookie settings",
      description:
        "I use essential cookies to keep the site working properly. Additional analytics will help me keep improving it. Choose essential cookies only, or allow all cookies to include analytics.",
      accept: "Allow all",
      reject: "Essential only",
    },
    detail: {
      back: "Back",
      backToSection: "Back to section",
      materialsTitle: "Materials",
      download: "Download",
      contribution: "My contribution",
      challenge: "The challenge",
      outcome: "The outcome",
      materialOf: "of",
      openWindow: "Open in new window",
      openLink: "Visit link",
      previousMaterial: "Previous material",
      nextMaterial: "Next material",
    },
    modal: {
      closeLabel: "Close modal window",
    },
    footer: {
      contacts: "Contacts",
      metaDisclaimer:
        "*is owned by Meta Platforms, which is recognized as extremist and banned in the Russian Federation",
    },
    card: {
      button: "Details",
    },
  },
} as const;

export type AppTranslations = (typeof uiText)[Language];

export function getTranslations(language: Language): AppTranslations {
  return uiText[language];
}
