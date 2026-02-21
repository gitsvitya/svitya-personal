export const SUPPORTED_LANGUAGES = ["ru", "en"];
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_SECTIONS = ["about", "work", "projects", "activities"];

export function resolveLanguage(value) {
  if (SUPPORTED_LANGUAGES.includes(value)) return value;
  return DEFAULT_LANGUAGE;
}

export function isSupportedLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value);
}

export function resolveSection(value) {
  if (SUPPORTED_SECTIONS.includes(value)) return value;
  return "about";
}

export function isSupportedSection(value) {
  return SUPPORTED_SECTIONS.includes(value);
}

const PAGE_COPY = {
  ru: {
    about: {
      title: "Обо мне | Виктор Строков",
      description:
        "Профессиональный профиль Виктора Строкова: экспертиза, бэкграунд и ключевые компетенции.",
    },
    work: {
      title: "Опыт работы | Виктор Строков",
      description: "Опыт работы Виктора Строкова: роли, компании, задачи и результаты.",
    },
    projects: {
      title: "Проекты | Виктор Строков",
      description: "Личные и профессиональные проекты Виктора Строкова.",
    },
    activities: {
      title: "Активности | Виктор Строков",
      description:
        "Дополнительные активности, инициативы и профессиональные интересы Виктора Строкова.",
    },
  },
  en: {
    about: {
      title: "About | Victor Strokov",
      description:
        "Victor Strokov's professional profile: expertise, background, and core competencies.",
    },
    work: {
      title: "Work Experience | Victor Strokov",
      description: "Victor Strokov's work experience: roles, companies, responsibilities, and outcomes.",
    },
    projects: {
      title: "Projects | Victor Strokov",
      description: "Personal and professional projects by Victor Strokov.",
    },
    activities: {
      title: "Activities | Victor Strokov",
      description: "Additional activities, initiatives, and professional interests of Victor Strokov.",
    },
  },
};

export function getPageCopy(language, section) {
  const lang = resolveLanguage(language);
  const page = resolveSection(section);
  return PAGE_COPY[lang][page];
}
