import { getServerLanguage } from "./language.server";
import { getTranslations } from "@/src/content/ui-text";
import SiteDocument from "@/src/components/SiteDocument/SiteDocument";
import NotFoundPage from "@/src/components/NotFoundPage/NotFoundPage";

export { viewport } from "./site-metadata";

export async function generateMetadata() {
  return {
    title: getTranslations(await getServerLanguage()).notFound.title,
    robots: { index: false, follow: true },
  };
}

export default async function GlobalNotFound() {
  const language = await getServerLanguage();
  return (
    <SiteDocument language={language}>
      <NotFoundPage initialLanguage={language} />
    </SiteDocument>
  );
}
