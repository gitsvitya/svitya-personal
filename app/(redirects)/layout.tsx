import type { ReactNode } from "react";
import { getServerLanguage } from "@/app/language.server";
import SiteDocument from "@/src/components/SiteDocument/SiteDocument";

export { metadata, viewport } from "@/app/site-metadata";

export default async function RedirectLayout({ children }: { children: ReactNode }) {
  return <SiteDocument language={await getServerLanguage()}>{children}</SiteDocument>;
}
