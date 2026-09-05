import { notFound } from "next/navigation";
import AppAboutMe from "@/src/components/AppAboutMe/AppAboutMe";
import PortfolioSection from "@/src/components/PortfolioSection/PortfolioSection";
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

  if (section === "about") {
    return <AppAboutMe text={text} />;
  }

  return <PortfolioSection section={section} language={language} text={text} />;
}
