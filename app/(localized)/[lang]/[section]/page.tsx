import { DEFAULT_LANGUAGE } from "@/app/sections";
import AppAboutMe from "@/src/components/AppAboutMe/AppAboutMe";
import PortfolioSection from "@/src/components/PortfolioSection/PortfolioSection";
import { getTranslations } from "@/src/content/ui-text";
import {
  buildLocalizedSectionMetadata,
  getLocalizedSectionStaticParams,
  redirectToLocalizedSection,
  resolveLocalizedSectionParams,
  type LocalizedSectionPageProps,
} from "@/app/route-helpers";

export function generateStaticParams() {
  return getLocalizedSectionStaticParams();
}

export async function generateMetadata({ params }: LocalizedSectionPageProps) {
  const { language, section } = await resolveLocalizedSectionParams(params);
  return buildLocalizedSectionMetadata(language, section);
}

export default async function LocalizedSectionPage({ params }: LocalizedSectionPageProps) {
  const { language, section, isLanguageValid, isSectionValid } =
    await resolveLocalizedSectionParams(params);

  if (!isLanguageValid) {
    redirectToLocalizedSection(DEFAULT_LANGUAGE, section);
  }

  if (!isSectionValid) {
    redirectToLocalizedSection(language, "about");
  }

  const text = getTranslations(language);

  if (section === "about") {
    return <AppAboutMe text={text} />;
  }

  return <PortfolioSection section={section} language={language} text={text} />;
}
