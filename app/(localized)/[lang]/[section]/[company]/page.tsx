import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  isSupportedSection,
  resolveLanguage,
  resolveSection,
  SUPPORTED_LANGUAGES,
} from "@/app/sections";
import {
  buildLocalizedCompanyMetadata,
  buildLocalizedSectionMetadata,
  redirectToLocalizedSection,
} from "@/app/route-helpers";
import { COMPANIES, getCompanyBySlug, getLocalizedCompany } from "@/src/content/portfolio";
import AppDetailPage from "@/src/components/AppDetailPage/AppDetailPage";
import { getTranslations } from "@/src/content/ui-text";
import type { CompanySection } from "@/src/types/domain";

type LocalizedCompanyPageProps = {
  params?: Promise<{
    lang?: string;
    section?: string;
    company?: string;
  }>;
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((lang) =>
    Object.values(COMPANIES).map((company) => ({
      lang,
      section: company.section,
      company: company.slug,
    }))
  );
}

export async function generateMetadata({ params }: LocalizedCompanyPageProps) {
  const resolvedParams = await params;
  const language = resolveLanguage(resolvedParams?.lang);
  const section = resolveSection(resolvedParams?.section);
  const company = getCompanyBySlug(section as CompanySection, resolvedParams?.company);

  if (company) {
    return buildLocalizedCompanyMetadata(
      language,
      section,
      getLocalizedCompany(company.id, language)
    );
  }

  return buildLocalizedSectionMetadata(language, section);
}

export default async function LocalizedCompanyPage({ params }: LocalizedCompanyPageProps) {
  const resolvedParams = await params;
  const rawLanguage = resolvedParams?.lang;
  const rawSection = resolvedParams?.section;
  const rawCompany = resolvedParams?.company;
  const language = resolveLanguage(rawLanguage);
  const section = resolveSection(rawSection);

  if (!isSupportedLanguage(rawLanguage)) {
    redirectToLocalizedSection(DEFAULT_LANGUAGE, section);
  }

  if (!isSupportedSection(rawSection)) {
    redirectToLocalizedSection(language, "about");
  }

  const company = getCompanyBySlug(section as CompanySection, rawCompany);
  if (!company) {
    redirectToLocalizedSection(language, section);
  }

  const text = getTranslations(language);

  return (
    <AppDetailPage
      company={getLocalizedCompany(company.id, language)}
      text={text}
      sectionTitle={text.sections[company.section]}
      backHref={`/${language}/${company.section}`}
    />
  );
}
