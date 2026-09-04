import type { Metadata } from "next";
import { BASE_URL } from "./site";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, resolveLanguage, resolveSection } from "./sections";
import type { Language, Section } from "../src/types/domain";

const DEFAULT_OG_IMAGE = "/logo512.png";
const SITE_NAME = "Виктор Строков";

function ensureSectionPath(section?: string | null): `/${Section}` {
  const resolvedSection = resolveSection(section);
  return `/${resolvedSection}`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  section?: string | null;
  language?: string | null;
  slug?: string | null;
};

export function buildPageMetadata({
  title,
  description,
  section,
  language,
  slug,
}: BuildPageMetadataInput): Metadata {
  const resolvedLanguage: Language = resolveLanguage(language);
  const sectionPath = ensureSectionPath(section);
  const detailPath = slug ? `/${slug}` : "";
  const canonicalPath = `/${resolvedLanguage}${sectionPath}${detailPath}`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const languageAlternates: Record<string, string> = {
    "x-default": `/${DEFAULT_LANGUAGE}${sectionPath}${detailPath}`,
  };

  for (const lang of SUPPORTED_LANGUAGES) {
    languageAlternates[lang] = `/${lang}${sectionPath}${detailPath}`;
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
