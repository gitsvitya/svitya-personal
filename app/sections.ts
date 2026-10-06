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

export function resolveLanguage(value?: string | null): Language {
  if (SUPPORTED_LANGUAGES.includes(value as Language)) return value as Language;
  return DEFAULT_LANGUAGE;
}

export function isSupportedLanguage(value?: string | null): value is Language {
  return value !== null && value !== undefined && SUPPORTED_LANGUAGES.includes(value as Language);
}

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
    .filter(
      (candidate): candidate is { tag: string; q: number } =>
        Boolean(candidate.tag) && candidate.q > 0
    )
    .sort((left, right) => right.q - left.q);

  for (const { tag } of candidates) {
    const [baseLanguage] = tag.split("-");
    if (isSupportedLanguage(baseLanguage)) {
      return baseLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
}

export function resolveSection(value?: string | null): Section {
  if (SUPPORTED_SECTIONS.includes(value as Section)) return value as Section;
  return "about";
}

export function isSupportedSection(value?: string | null): value is Section {
  return value !== null && value !== undefined && SUPPORTED_SECTIONS.includes(value as Section);
}

const PAGE_COPY: PageCopyMap = {
  ru: {
    settings: {
      title: "Настройки | Виктор Строков",
      description: "Настройки темы, языка и cookie сайта.",
    },
    about: {
      title: "Обо мне | Виктор Строков",
      description:
        "Виктор Строков развивает продукты для бизнеса и занимается рыночной аналитикой. Здесь — опыт работы, собственные проекты и увлечения.",
    },
    work: {
      title: "Опыт работы | Виктор Строков",
      description:
        "Работа Виктора Строкова в ХимИнсайт, на Национальной товарной бирже, в Лукойле, Калашникове и Thomson Reuters: задачи, вклад и результаты.",
    },
    projects: {
      title: "Проекты | Виктор Строков",
      description:
        "Собственные проекты Виктора Строкова: одежда и текстиль Mad Burglar Cat, приложение для прогулок MappNgo и конкурсная площадка Venivi.",
    },
    activities: {
      title: "Увлечения | Виктор Строков",
      description:
        "Перцы чили и развитие Svitya.com — увлечения Виктора Строкова, о которых он рассказывает на своём сайте.",
    },
  },
  en: {
    settings: {
      title: "Settings | Victor Strokov",
      description: "Site appearance, language and cookie preferences.",
    },
    about: {
      title: "About | Victor Strokov",
      description:
        "Victor Strokov develops products for businesses and works in market analysis. Explore his work, personal projects and interests.",
    },
    work: {
      title: "Work Experience | Victor Strokov",
      description:
        "Victor Strokov’s work at ChemInsight, the National Mercantile Exchange, Lukoil, Kalashnikov and Thomson Reuters: the challenges, his contribution and the results.",
    },
    projects: {
      title: "Projects | Victor Strokov",
      description:
        "Victor Strokov’s projects: Mad Burglar Cat clothing and home textiles, the MappNgo city walks app project and the Venivi contest platform.",
    },
    activities: {
      title: "Interests | Victor Strokov",
      description:
        "Growing chili peppers and building Svitya.com: Victor Strokov’s interests beyond his professional work.",
    },
  },
};

export function getPageCopy(language?: string | null, section?: string | null): PageCopy {
  const lang = resolveLanguage(language);
  const page = resolveSection(section);
  return PAGE_COPY[lang][page];
}

export { DEFAULT_LANGUAGE };
