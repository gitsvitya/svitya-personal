import type { ReactNode } from "react";
import { resolveLanguage, SUPPORTED_LANGUAGES } from "@/app/sections";
import SiteDocument from "@/src/components/SiteDocument/SiteDocument";

export { metadata, viewport } from "@/app/site-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <SiteDocument language={resolveLanguage(lang)}>{children}</SiteDocument>;
}
