import { DEFAULT_LANGUAGE } from "../sections";
import {
  redirectToLocalizedSection,
  resolveLanguageParams,
  type LanguageHomePageProps,
} from "../route-helpers";

// Редиректит с корня языка на раздел "about" с учетом fallback-языка.
export default async function LanguageHomePage({ params }: LanguageHomePageProps) {
  const { rawLanguage, language } = await resolveLanguageParams(params);
  if (!rawLanguage) {
    redirectToLocalizedSection(DEFAULT_LANGUAGE, "about");
  }

  redirectToLocalizedSection(language, "about");
}
