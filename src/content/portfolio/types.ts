import type { CompanyId, CompanySection, Language } from "../../types/domain";
import type { StaticImageData } from "next/image";

export type CompanyCopy = {
  year: string;
  name: string;
  title: string;
  about: string;
  results: string;
  resultsList?: {
    intro: string;
    items: string[];
  };
};

export type CaseStudy = {
  challenge: string;
  contribution: string[];
  outcome: string;
};

type MaterialCopy = {
  title: Record<Language, string>;
  description: Record<Language, string>;
};

type MaterialImages = {
  previewSrc: StaticImageData;
  fullImageSrc: StaticImageData | string;
};

export type CompanyMaterial =
  | (MaterialCopy & {
      type: "document";
      assets: Record<Language, MaterialImages & { fileSrc: string; url?: string }>;
    })
  | (MaterialCopy & {
      type: "image";
      assets: Record<Language, MaterialImages>;
    })
  | (MaterialCopy & {
      type: "link";
      assets: Record<Language, MaterialImages & { url: string }>;
    });

export type CompanyMaterials = {
  enabled: boolean;
  items: CompanyMaterial[];
};

export type CompanyRecord = {
  id: CompanyId;
  slug: string;
  section: CompanySection;
  logo: StaticImageData;
  url?: string;
  linkLabel?: string;
  materials?: CompanyMaterials;
  translations: Record<Language, CompanyCopy>;
};

type LocalizeMaterial<T> = T extends CompanyMaterial
  ? T["assets"][Language] & {
      type: T["type"];
      title: string;
      description: string;
    }
  : never;

export type LocalizedMaterial = LocalizeMaterial<CompanyMaterial>;

export type LocalizedCompany = Omit<CompanyRecord, "translations" | "materials"> &
  CompanyCopy & {
    caseStudy?: CaseStudy;
    materials?: {
      enabled: boolean;
      items: LocalizedMaterial[];
    };
  };
