import { isSupportedLanguage } from "@/app/sections";
import { notFound } from "next/navigation";
import {
  redirectToLocalizedSection,
  resolveLanguageParams,
  type LanguageHomePageProps,
} from "@/app/route-helpers";

export default async function LanguageHomePage({ params }: LanguageHomePageProps) {
  const { rawLanguage, language } = await resolveLanguageParams(params);

  if (!isSupportedLanguage(rawLanguage)) {
    notFound();
  }

  redirectToLocalizedSection(language, "about");
}
