import { notFound } from "next/navigation";
import AppSettings from "@/src/components/AppSettings/AppSettings";
import AppAboutMe from "@/src/components/AppAboutMe/AppAboutMe";
import PortfolioSection from "@/src/components/PortfolioSection/PortfolioSection";
import YandexAnalytics from "@/src/components/YandexAnalytics/YandexAnalytics";
import { getPageCopy } from "@/app/sections";
import { getTranslations } from "@/src/content/ui-text";
import {
  buildLocalizedSectionMetadata,
  getLocalizedSectionStaticParams,
  resolveLocalizedSectionParams,
  type LocalizedSectionPageProps,
} from "@/app/route-helpers";

export function generateStaticParams() {
  return getLocalizedSectionStaticParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LocalizedSectionPageProps) {
  const { language, section } = await resolveLocalizedSectionParams(params);
  return buildLocalizedSectionMetadata(language, section);
}

export default async function LocalizedSectionPage({ params }: LocalizedSectionPageProps) {
  const { language, section, isLanguageValid, isSectionValid } =
    await resolveLocalizedSectionParams(params);

  if (!isLanguageValid || !isSectionValid) {
    notFound();
  }

  const text = getTranslations(language);

  return (
    <>
      <YandexAnalytics title={getPageCopy(language, section).title} />
      {section === "about" ? (
        <AppAboutMe text={text} language={language} />
      ) : section === "settings" ? (
        <AppSettings />
      ) : (
        <PortfolioSection section={section} language={language} text={text} />
      )}
    </>
  );
}
