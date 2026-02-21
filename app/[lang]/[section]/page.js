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

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((lang) =>
    SUPPORTED_SECTIONS.map((section) => ({ lang, section }))
  );
}

export function generateMetadata({ params }) {
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

export default function LocalizedSectionPage({ params }) {
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
