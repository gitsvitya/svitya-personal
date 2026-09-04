import { DEFAULT_LANGUAGE } from "@/app/sections";
import {
  redirectToLocalizedSection,
  resolveLanguageParams,
  type LanguageHomePageProps,
} from "@/app/route-helpers";

export default async function LanguageHomePage({ params }: LanguageHomePageProps) {
  const { rawLanguage, language } = await resolveLanguageParams(params);

  if (!rawLanguage) {
    redirectToLocalizedSection(DEFAULT_LANGUAGE, "about");
  }

  redirectToLocalizedSection(language, "about");
}
