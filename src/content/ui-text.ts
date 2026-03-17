import type { Language } from "../types/domain";

// В словаре собраны все короткие текстовые подписи интерфейса,
// чтобы локализация UI не была размазана по компонентам.
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
      subtitle: "Управление проектами, разработка продуктов, исследования и аналитика",
      description:
        "Привет! Меня зовут Виктор. Я руководитель проектов с более чем 10-летним опытом работы в международных и российских компаниях, а также в собственных проектах. Занимаюсь развитием информационных и цифровых продуктов, выстраиваю бизнес-процессы и работаю на стыке аналитики, продукта и бизнеса. Всегда открыт к новым знакомствам и профессиональному сотрудничеству.",
    },
    cookieBanner: {
      description:
        "Для корректной работы сайта я использую технические и аналитические cookie-файлы. Продолжая работать с сайтом, Вы принимаете это.",
      button: "Закрыть",
    },
    modal: {
      closeLabel: "Закрыть модальное окно",
    },
    footer: {
      contacts: "Соцсети",
      metaDisclaimer:
        "*принадлежит компании Meta, признанной экстремистской и запрещённой в РФ",
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
      subtitle: "Project Management, Product Development, Research & Analytics",
      description:
        "Hi! My name is Victor. I am a project manager with over 10 years of experience working in international and Russian companies, as well as on my own projects. I focus on developing information and digital products, building business processes, and working at the intersection of analytics, product, and business. I am always open to new connections and professional collaboration.",
    },
    cookieBanner: {
      description:
        "This website uses technical and analytical cookie files to function properly. By continuing to use the site, you agree to this.",
      button: "Close",
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

// Тип переводов выводится из реального объекта, поэтому структура
// текстов и их использование в компонентах не расходятся.
export type AppTranslations = (typeof uiText)[Language];

// Helper возвращает словарь для выбранной локали в готовом типизированном виде.
export function getTranslations(language: Language): AppTranslations {
  return uiText[language];
}
