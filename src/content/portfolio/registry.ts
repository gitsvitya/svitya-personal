import type { CompanyId, CompanySection, Language } from "../../types/domain";
import { ACTIVITY_COMPANIES } from "./activities";
import { PROJECT_COMPANIES } from "./projects";
import type { CompanyMaterial, CompanyRecord, LocalizedCompany, LocalizedMaterial } from "./types";
import { WORK_COMPANIES } from "./work";

export const COMPANIES: Record<CompanyId, CompanyRecord> = {
  ...WORK_COMPANIES,
  ...PROJECT_COMPANIES,
  ...ACTIVITY_COMPANIES,
};

const COMPANY_LIST: CompanyRecord[] = Object.values(COMPANIES);

export function getCompaniesBySection(section: CompanySection): CompanyRecord[] {
  return COMPANY_LIST.filter((company) => company.section === section);
}

export function getCompanyBySlug(
  section: CompanySection,
  slug?: string | null
): CompanyRecord | null {
  if (!slug) return null;
  return (
    COMPANY_LIST.find((company) => company.section === section && company.slug === slug) || null
  );
}

export function getLocalizedCompany(companyId: CompanyId, language: Language): LocalizedCompany {
  const company = COMPANIES[companyId];
  const translation = company.translations[language];

  if (!translation) {
    throw new Error(`Missing translation for company "${companyId}" and language "${language}"`);
  }

  return {
    id: company.id,
    slug: company.slug,
    section: company.section,
    logo: company.logo,
    url: company.url,
    linkLabel: company.linkLabel,
    materials: company.materials
      ? {
          enabled: company.materials.enabled,
          items: company.materials.items.map((material) => localizeMaterial(material, language)),
        }
      : undefined,
    ...translation,
  };
}

export function getLocalizedCompanyBySlug(
  section: CompanySection,
  slug: string | null,
  language: Language
): LocalizedCompany | null {
  const company = getCompanyBySlug(section, slug);
  return company ? getLocalizedCompany(company.id, language) : null;
}

function localizeMaterial(material: CompanyMaterial, language: Language): LocalizedMaterial {
  const copy = {
    title: material.title[language],
    description: material.description[language],
  };

  switch (material.type) {
    case "document":
      return {
        type: material.type,
        previewSrc: material.previewSrc,
        fileSrc: material.fileSrc,
        ...copy,
      };
    case "image":
      return {
        type: material.type,
        previewSrc: material.previewSrc,
        fullImageSrc: material.fullImageSrc,
        ...copy,
      };
    case "link":
      return {
        type: material.type,
        previewSrc: material.previewSrc,
        url: material.url,
        ...copy,
      };
  }
}
