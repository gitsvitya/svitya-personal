import { redirect } from "next/navigation";
import App from "../../../src/components/App/App";
import { buildPageMetadata } from "../../seo";
import { getServerTheme } from "../../theme.server";
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

export default async function LocalizedSectionPage({ params }) {
  const language = resolveLanguage(params?.lang);
  const section = resolveSection(params?.section);
  const initialTheme = await getServerTheme();

  if (!isSupportedLanguage(params?.lang)) {
    redirect(`/${DEFAULT_LANGUAGE}/${section}`);
  }

  if (!isSupportedSection(params?.section)) {
    redirect(`/${language}/about`);
  }

  return (
    <App
      initialPath={`/${language}/${section}`}
      initialLanguage={language}
      initialTheme={initialTheme}
    />
  );
}
