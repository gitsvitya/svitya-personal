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
      work: "Опыт работы",
    },
    sections: {
      about: "Обо мне",
      work: "Опыт работы",
      projects: "Проекты",
      activities: "Увлечения",
      settings: "Настройки",
    },
    settings: {
      theme: "Тема оформления",
      darkTheme: "Тёмная тема",
      language: "Язык",
      russianLanguage: "Русский язык",
      cookies: "Cookie",
      showCookieBanner: "Показать уведомление",
    },
    about: {
      title: "Виктор Строков",
      portraitAlt: "Портрет Виктора Строкова",
      contact: "Связаться со мной",
      work: "Опыт работы",
      projects: "Мои проекты",
      invitation: "Есть проект, вакансия или просто вопрос?",
      invitationDetail: "Напишите — я всегда на связи.",
      cv: "Скачать резюме",
      experience: "Продукты и сервисы для бизнеса",
      subtitle: "Данные, аналитика и продукты для бизнеса",
      description:
        "Занимаюсь рыночной аналитикой и развиваю продукты для бизнеса. Запускаю собственные проекты, делаю этот сайт и выращиваю перцы чили.",
    },
    notFound: {
      title: "Страница не найдена",
      description:
        "Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную, чтобы продолжить знакомство.",
      home: "На главную",
    },
    cookieBanner: {
      label: "Уведомление о cookie",
      description: "Я использую только технические cookie. Без аналитики и рекламных приколов.",
      close: "Закрыть",
    },
    detail: {
      back: "Назад",
      backToSection: "Вернуться к разделу",
      materialsTitle: "Материалы",
      download: "Скачать",
      downloadOriginal: "Скачать оригинал",
      fileSize: { locale: "ru-RU", kilobytes: "КБ", megabytes: "МБ" },
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
      closeLabel: "Закрыть окно",
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
      work: "Work",
    },
    sections: {
      about: "About",
      work: "Work experience",
      projects: "Projects",
      activities: "Interests",
      settings: "Settings",
    },
    settings: {
      theme: "Appearance",
      darkTheme: "Dark theme",
      language: "Language",
      russianLanguage: "Russian language",
      cookies: "Cookies",
      showCookieBanner: "Show cookie notice",
    },
    about: {
      title: "Victor Strokov",
      portraitAlt: "Portrait of Victor Strokov",
      contact: "Contact me",
      work: "Work experience",
      projects: "My projects",
      invitation: "Have a project, a job opportunity or a question?",
      invitationDetail: "Get in touch — I’m always happy to hear from you.",
      cv: "Download CV",
      experience: "Products and services for businesses",
      subtitle: "Data, market analysis and products for businesses",
      description:
        "I work in market intelligence and develop products for business. I also launch my own projects, build this website and grow chillies.",
    },
    notFound: {
      title: "Page not found",
      description:
        "The link may be out of date or the address may contain a typo. Head back to the homepage to keep exploring.",
      home: "Back to home",
    },
    cookieBanner: {
      label: "Cookie notice",
      description: "I use only functional cookies. No analytics, no ad tricks.",
      close: "Close",
    },
    detail: {
      back: "Back",
      backToSection: "Back to section",
      materialsTitle: "Materials",
      download: "Download",
      downloadOriginal: "Download original",
      fileSize: { locale: "en-US", kilobytes: "KB", megabytes: "MB" },
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
      closeLabel: "Close window",
    },
    footer: {
      contacts: "Contacts",
      metaDisclaimer:
        "*is owned by Meta Platforms, which is recognized as extremist and banned in the Russian Federation",
    },
    card: {
      button: "Read more",
    },
  },
} as const;

export type AppTranslations = (typeof uiText)[Language];

export function getTranslations(language: Language): AppTranslations {
  return uiText[language];
}
