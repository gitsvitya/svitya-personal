import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  SECTIONS,
  type Language,
  type Section,
} from "../src/types/domain";

export const SUPPORTED_LANGUAGES = LANGUAGES;
export const SUPPORTED_SECTIONS = SECTIONS;

type PageCopy = {
  title: string;
  description: string;
};

type PageCopyMap = Record<Language, Record<Section, PageCopy>>;

// Нормализует язык к поддерживаемому значению.
export function resolveLanguage(value?: string | null): Language {
  if (SUPPORTED_LANGUAGES.includes(value as Language)) return value as Language;
  return DEFAULT_LANGUAGE;
}

// Проверяет, поддерживается ли язык.
export function isSupportedLanguage(value?: string | null): value is Language {
  return value !== null && value !== undefined && SUPPORTED_LANGUAGES.includes(value as Language);
}

// Определяет язык по заголовку Accept-Language.
export function resolveLanguageFromHeader(acceptLanguage?: string | null): Language {
  if (!acceptLanguage || typeof acceptLanguage !== "string") {
    return DEFAULT_LANGUAGE;
  }

  const candidates = acceptLanguage
    .split(",")
    .map((item) => {
      const [rawTag, ...params] = item.trim().toLowerCase().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const qValue = qParam ? Number(qParam.split("=")[1]) : 1;

      return {
        tag: rawTag,
        q: Number.isFinite(qValue) ? qValue : 0,
      };
    })
    .filter((candidate): candidate is { tag: string; q: number } => Boolean(candidate.tag) && candidate.q > 0)
    .sort((left, right) => right.q - left.q);

  for (const { tag } of candidates) {
    const [baseLanguage] = tag.split("-");
    if (isSupportedLanguage(baseLanguage)) {
      return baseLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
}

// Нормализует раздел к поддерживаемому значению.
export function resolveSection(value?: string | null): Section {
  if (SUPPORTED_SECTIONS.includes(value as Section)) return value as Section;
  return "about";
}

// Проверяет, поддерживается ли раздел.
export function isSupportedSection(value?: string | null): value is Section {
  return value !== null && value !== undefined && SUPPORTED_SECTIONS.includes(value as Section);
}

// Тексты title/description для каждой языковой версии и раздела.
const PAGE_COPY: PageCopyMap = {
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
      description:
        "Victor Strokov's work experience: roles, companies, responsibilities, and outcomes.",
    },
    projects: {
      title: "Projects | Victor Strokov",
      description: "Personal and professional projects by Victor Strokov.",
    },
    activities: {
      title: "Activities | Victor Strokov",
      description:
        "Additional activities, initiatives, and professional interests of Victor Strokov.",
    },
  },
};

// Возвращает SEO-тексты по языку и разделу с учетом fallback-логики.
export function getPageCopy(language?: string | null, section?: string | null): PageCopy {
  const lang = resolveLanguage(language);
  const page = resolveSection(section);
  return PAGE_COPY[lang][page];
}

export { DEFAULT_LANGUAGE };
