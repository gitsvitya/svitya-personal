import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "../../seo";
import {
  DEFAULT_LANGUAGE,
  getPageCopy,
  isSupportedLanguage,
  isSupportedSection,
  resolveLanguage,
  resolveSection,
  SUPPORTED_LANGUAGES,
  SUPPORTED_SECTIONS,
} from "../../sections";
import type { Language, Section } from "../../../src/types/domain";

type LocalizedSectionPageProps = {
  params?: {
    lang?: string;
    section?: string;
  };
};

// Генерирует статические параметры для всех комбинаций языков и разделов.
export function generateStaticParams(): Array<{ lang: Language; section: Section }> {
  return SUPPORTED_LANGUAGES.flatMap((lang) =>
    SUPPORTED_SECTIONS.map((section) => ({ lang, section }))
  );
}

// Формирует SEO-метаданные на основе языка и раздела из маршрута.
export function generateMetadata({ params }: LocalizedSectionPageProps): Metadata {
  const language = resolveLanguage(params?.lang);
  const section = resolveSection(params?.section);
  const copy = getPageCopy(language, section);

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    section,
    language,
  });
}

// Валидирует параметры маршрута и делает редиректы на корректные локализованные URL.
export default function LocalizedSectionPage({ params }: LocalizedSectionPageProps) {
  const language = resolveLanguage(params?.lang);
  const section = resolveSection(params?.section);

  if (!isSupportedLanguage(params?.lang)) {
    redirect(`/${DEFAULT_LANGUAGE}/${section}`);
  }

  if (!isSupportedSection(params?.section)) {
    redirect(`/${language}/about`);
  }

  return null;
}
