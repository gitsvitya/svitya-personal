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
      activities: "Увлечения",
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
      contact: "Связаться со мной",
      cv: "Скачать резюме",
      experience: "Продукты и сервисы для бизнеса",
      subtitle: "Данные, аналитика и продукты для бизнеса",
      description:
        "Я занимаюсь рыночной аналитикой и развиваю продукты для бизнеса. Иногда запускаю собственные проекты, делаю этот сайт и выращиваю перцы чили. Здесь рассказываю о своём опыте, идеях и творческих порывах.",
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
        "Для работы сайта нужны обязательные cookie. Аналитические помогают мне его улучшать — их можно включить по желанию.",
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
    },
    sections: {
      about: "About me",
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
      cookieSettings: "Cookie settings",
    },
    about: {
      title: "Victor Strokov",
      portraitAlt: "Portrait of Victor Strokov",
      contact: "Contact me",
      cv: "Download CV",
      experience: "Products and services for businesses",
      subtitle: "Data, market analysis and products for businesses",
      description:
        "I work in market analysis and develop products for businesses. Sometimes I start projects of my own, work on this website and grow chili peppers. Here I share stories about my experience, ideas and creative impulses.",
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
        "Essential cookies keep the site working. You can also enable analytics cookies to help me improve it.",
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
