import { BASE_URL } from "./site";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, resolveLanguage, resolveSection } from "./sections";

// Значения по умолчанию для социальных превью.
const DEFAULT_OG_IMAGE = "/logo512.png";
const SITE_NAME = "Виктор Строков";

// Формирует нормализованный путь раздела для canonical и alternates.
function ensureSectionPath(section) {
  const resolvedSection = resolveSection(section);
  return `/${resolvedSection}`;
}

// Собирает метаданные страницы с canonical, alternate links и social previews.
export function buildPageMetadata({ title, description, section, language }) {
  const resolvedLanguage = resolveLanguage(language);
  const sectionPath = ensureSectionPath(section);
  const canonicalPath = `/${resolvedLanguage}${sectionPath}`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const languageAlternates = {
    "x-default": `/${DEFAULT_LANGUAGE}${sectionPath}`,
  };

  for (const lang of SUPPORTED_LANGUAGES) {
    languageAlternates[lang] = `/${lang}${sectionPath}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
