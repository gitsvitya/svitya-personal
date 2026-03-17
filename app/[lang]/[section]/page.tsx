import {
  DEFAULT_LANGUAGE,
} from "../../sections";
import {
  buildLocalizedSectionMetadata,
  getLocalizedSectionStaticParams,
  redirectToLocalizedSection,
  resolveLocalizedSectionParams,
  type LocalizedSectionPageProps,
} from "../../route-helpers";

// Генерирует статические параметры для всех комбинаций языков и разделов.
export function generateStaticParams() {
  return getLocalizedSectionStaticParams();
}

// Формирует SEO-метаданные на основе языка и раздела из маршрута.
export async function generateMetadata({ params }: LocalizedSectionPageProps) {
  const { language, section } = await resolveLocalizedSectionParams(params);
  return buildLocalizedSectionMetadata(language, section);
}

// Валидирует параметры маршрута и делает редиректы на корректные локализованные URL.
export default async function LocalizedSectionPage({ params }: LocalizedSectionPageProps) {
  const { language, section, isLanguageValid, isSectionValid } =
    await resolveLocalizedSectionParams(params);

  if (!isLanguageValid) {
    redirectToLocalizedSection(DEFAULT_LANGUAGE, section);
  }

  if (!isSectionValid) {
    redirectToLocalizedSection(language, "about");
  }

  return null;
}
