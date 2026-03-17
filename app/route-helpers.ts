import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { Language, Section } from "../src/types/domain";
import { buildPageMetadata } from "./seo";
import {
  getPageCopy,
  isSupportedLanguage,
  isSupportedSection,
  resolveLanguage,
  resolveSection,
  SUPPORTED_LANGUAGES,
  SUPPORTED_SECTIONS,
} from "./sections";
import { getPreferredLanguage } from "./redirectByLocale";

type AwaitableParams<T> = Promise<T | undefined> | undefined;

type LanguageParams = {
  lang?: string;
};

type LocalizedSectionParams = {
  lang?: string;
  section?: string;
};

export type LanguageHomePageProps = {
  params?: AwaitableParams<LanguageParams>;
};

export type LocalizedSectionPageProps = {
  params?: AwaitableParams<LocalizedSectionParams>;
};

type ResolvedLanguageParams = {
  rawLanguage?: string;
  language: Language;
};

type ResolvedLocalizedSectionParams = ResolvedLanguageParams & {
  rawSection?: string;
  section: Section;
  isLanguageValid: boolean;
  isSectionValid: boolean;
};

export function getLocalizedSectionStaticParams(): Array<{ lang: Language; section: Section }> {
  return SUPPORTED_LANGUAGES.flatMap((lang) =>
    SUPPORTED_SECTIONS.map((section) => ({ lang, section }))
  );
}

export async function resolveLanguageParams(
  params?: AwaitableParams<LanguageParams>
): Promise<ResolvedLanguageParams> {
  const resolvedParams = await params;
  const rawLanguage = resolvedParams?.lang;

  return {
    rawLanguage,
    language: resolveLanguage(rawLanguage),
  };
}

export async function resolveLocalizedSectionParams(
  params?: AwaitableParams<LocalizedSectionParams>
): Promise<ResolvedLocalizedSectionParams> {
  const resolvedParams = await params;
  const rawLanguage = resolvedParams?.lang;
  const rawSection = resolvedParams?.section;

  return {
    rawLanguage,
    rawSection,
    language: resolveLanguage(rawLanguage),
    section: resolveSection(rawSection),
    isLanguageValid: isSupportedLanguage(rawLanguage),
    isSectionValid: isSupportedSection(rawSection),
  };
}

export function buildLocalizedSectionMetadata(language: Language, section: Section): Metadata {
  const copy = getPageCopy(language, section);

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    section,
    language,
  });
}

export function redirectToLocalizedSection(language: Language, section: Section): never {
  redirect(`/${language}/${section}`);
}

export async function redirectToPreferredSection(section: Section): Promise<never> {
  const language = await getPreferredLanguage();
  redirectToLocalizedSection(language, section);
}
