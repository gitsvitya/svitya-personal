import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  isSupportedSection,
  resolveLanguage,
  resolveSection,
  SUPPORTED_LANGUAGES,
} from "../../../sections";
import {
  buildLocalizedSectionMetadata,
  redirectToLocalizedSection,
} from "../../../route-helpers";
import { COMPANIES, getCompanyBySlug } from "../../../../src/content/companies";
import type { CompanySection } from "../../../../src/types/domain";

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

  if (!getCompanyBySlug(section as CompanySection, rawCompany)) {
    redirectToLocalizedSection(language, section);
  }

  return null;
}
