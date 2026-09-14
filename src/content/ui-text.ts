import type { Language } from "../types/domain";

export const uiText = {
  ru: {
    page: {
      title: "Виктор Строков",
    },
    theme: {
      light: "Светлая",
      dark: "Темная",
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
      themeDescription: "Выберите светлую или тёмную тему сайта.",
      darkTheme: "Тёмная тема",
      language: "Язык",
      languageDescription: "Русская или английская версия сайта.",
      russianLanguage: "Русский язык",
      cookies: "Cookie",
      cookiesDescription: "Управляйте согласием на использование аналитических cookie.",
      cookieSettings: "Настройки cookie",
    },
    about: {
      title: "Виктор Строков",
      portraitAlt: "Портрет Виктора Строкова",
      contact: "Обсудить проект",
      explore: "Посмотреть кейсы",
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
      label: "Настройки аналитических cookie",
      description:
        "Обязательные cookie сохраняют настройки сайта. Яндекс Метрика подключается только с вашего согласия.",
      accept: "Разрешить аналитику",
      reject: "Только необходимые",
    },
    detail: {
      back: "Назад",
      backToSection: "Вернуться к разделу",
      materialsTitle: "Материалы",
      download: "Скачать PDF",
      contribution: "Мой вклад",
      challenge: "Задача",
      outcome: "Результат",
      materialOf: "из",
      openImage: "Открыть изображение в новом окне",
      openLink: "Открыть ссылку в новом окне",
      previousMaterial: "Предыдущий материал",
      nextMaterial: "Следующий материал",
    },
    modal: {
      closeLabel: "Закрыть модальное окно",
    },
    footer: {
      contacts: "Соцсети",
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
      themeDescription: "Choose a light or dark theme for the site.",
      darkTheme: "Dark theme",
      language: "Language",
      languageDescription: "Browse the site in English or Russian.",
      russianLanguage: "Russian language",
      cookies: "Cookies",
      cookiesDescription: "Manage your consent to analytics cookies.",
      cookieSettings: "Cookie settings",
    },
    about: {
      title: "Victor Strokov",
      portraitAlt: "Portrait of Victor Strokov",
      contact: "Let’s talk",
      explore: "Explore my work",
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
      label: "Analytics cookie settings",
      description:
        "Essential cookies remember your preferences. Yandex Metrica is enabled only with your consent.",
      accept: "Allow analytics",
      reject: "Essential only",
    },
    detail: {
      back: "Back",
      backToSection: "Back to section",
      materialsTitle: "Materials",
      download: "Download PDF",
      contribution: "My contribution",
      challenge: "The challenge",
      outcome: "The outcome",
      materialOf: "of",
      openImage: "Open image in a new window",
      openLink: "Open link in a new window",
      previousMaterial: "Previous material",
      nextMaterial: "Next material",
    },
    modal: {
      closeLabel: "Close modal window",
    },
    footer: {
      contacts: "Socials",
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
