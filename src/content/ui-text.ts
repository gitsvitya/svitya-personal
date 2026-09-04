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
    },
    sections: {
      about: "Обо мне",
      work: "Опыт работы",
      projects: "Проекты",
      activities: "Активности",
    },
    about: {
      title: "Виктор Строков",
      portraitAlt: "Портрет Виктора Строкова",
      subtitle: "Управление проектами, разработка продуктов, исследования и аналитика",
      description:
        "Привет! Меня зовут Виктор. Я руководитель проектов с более чем 10-летним опытом работы в международных и российских компаниях, а также в собственных проектах. Занимаюсь развитием информационных и цифровых продуктов, выстраиваю бизнес-процессы и работаю на стыке аналитики, продукта и бизнеса. Всегда открыт к новым знакомствам и профессиональному сотрудничеству.",
    },
    cookieBanner: {
      label: "Настройки аналитических cookie",
      description:
        "Сайт использует обязательные cookie-файлы. Аналитические cookie Яндекс Метрики загружаются только с вашего согласия.",
      accept: "Разрешить аналитику",
      reject: "Только необходимые",
    },
    detail: {
      back: "Назад",
      backToSection: "Вернуться к разделу",
      materialsTitle: "Материалы",
      download: "Скачать",
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
    },
    sections: {
      about: "About me",
      work: "Work experience",
      projects: "Projects",
      activities: "Activities",
    },
    about: {
      title: "Victor Strokov",
      portraitAlt: "Portrait of Victor Strokov",
      subtitle: "Project Management, Product Development, Research & Analytics",
      description:
        "Hi! My name is Victor. I am a project manager with over 10 years of experience working in international and Russian companies, as well as on my own projects. I focus on developing information and digital products, building business processes, and working at the intersection of analytics, product, and business. I am always open to new connections and professional collaboration.",
    },
    cookieBanner: {
      label: "Analytics cookie settings",
      description:
        "This website uses essential cookies. Yandex Metrica analytics cookies are loaded only with your consent.",
      accept: "Allow analytics",
      reject: "Essential only",
    },
    detail: {
      back: "Back",
      backToSection: "Back to section",
      materialsTitle: "Materials",
      download: "Download",
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
