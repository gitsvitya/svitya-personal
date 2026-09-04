import type { CompanyId, CompanySection, Language } from "../../types/domain";
import type { StaticImageData } from "next/image";

export type CompanyCopy = {
  year: string;
  name: string;
  title: string;
  about: string;
  results: string;
};

type MaterialCopy = {
  title: Record<Language, string>;
  description: Record<Language, string>;
};

type MaterialBase = MaterialCopy & {
  previewSrc: StaticImageData;
};

export type CompanyMaterial =
  | (MaterialBase & {
      type: "document";
      fileSrc: string;
    })
  | (MaterialBase & {
      type: "image";
      fullImageSrc: string;
    })
  | (MaterialBase & {
      type: "link";
      url: string;
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
  ? Omit<T, "title" | "description"> & {
      title: string;
      description: string;
    }
  : never;

export type LocalizedMaterial = LocalizeMaterial<CompanyMaterial>;

export type LocalizedCompany = Omit<CompanyRecord, "translations" | "materials"> &
  CompanyCopy & {
    materials?: {
      enabled: boolean;
      items: LocalizedMaterial[];
    };
  };
