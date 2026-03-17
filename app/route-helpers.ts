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

// В Next App Router params могут приходить как promise, поэтому выносим
// это в отдельный alias и не повторяем тип во всех страницах.
type AwaitableParams<T> = Promise<T | undefined> | undefined;

// Параметры для маршрута вида /[lang].
type LanguageParams = {
  lang?: string;
};

// Параметры для маршрута вида /[lang]/[section].
type LocalizedSectionParams = {
  lang?: string;
  section?: string;
};

// Общий пропс-тип для страницы, которая обрабатывает только язык.
export type LanguageHomePageProps = {
  params?: AwaitableParams<LanguageParams>;
};

// Общий пропс-тип для страницы локализованного раздела.
export type LocalizedSectionPageProps = {
  params?: AwaitableParams<LocalizedSectionParams>;
};

// Результат резолва языка хранит и исходное значение, и нормализованный вариант:
// это позволяет одновременно делать редиректы и сохранять информацию о валидности.
type ResolvedLanguageParams = {
  rawLanguage?: string;
  language: Language;
};

// Для разделов дополнительно возвращаем флаги валидности каждого сегмента.
type ResolvedLocalizedSectionParams = ResolvedLanguageParams & {
  rawSection?: string;
  section: Section;
  isLanguageValid: boolean;
  isSectionValid: boolean;
};

// Набор статических параметров нужен для предгенерации всех допустимых
// локализованных страниц в build-тайме.
export function getLocalizedSectionStaticParams(): Array<{ lang: Language; section: Section }> {
  return SUPPORTED_LANGUAGES.flatMap((lang) =>
    SUPPORTED_SECTIONS.map((section) => ({ lang, section }))
  );
}

// Helper превращает сырые route params в гарантированно валидный язык.
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

// Для локализованного раздела сразу подготавливаем и валидные значения,
// и признаки ошибок, чтобы страница могла решать, куда редиректить пользователя.
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

// Метаданные конкретной страницы берутся из общей SEO-карты и собираются
// централизованно, без копирования title/description по страницам.
export function buildLocalizedSectionMetadata(language: Language, section: Section): Metadata {
  const copy = getPageCopy(language, section);

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    section,
    language,
  });
}

// Базовый редирект-хелпер нужен, чтобы все переходы на локализованные
// маршруты формировались одинаково и не расходились по шаблону URL.
export function redirectToLocalizedSection(language: Language, section: Section): never {
  redirect(`/${language}/${section}`);
}

// Для legacy-маршрутов без языка сначала определяем предпочтительную локаль,
// а затем отправляем пользователя на полноценный локализованный адрес.
export async function redirectToPreferredSection(section: Section): Promise<never> {
  const language = await getPreferredLanguage();
  redirectToLocalizedSection(language, section);
}
