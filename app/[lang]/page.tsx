import { redirect } from "next/navigation";
import { DEFAULT_LANGUAGE, resolveLanguage } from "../sections";

type LanguageHomePageProps = {
  params?: Promise<{
    lang?: string;
  }>;
};

// Редиректит с корня языка на раздел "about" с учетом fallback-языка.
export default async function LanguageHomePage({ params }: LanguageHomePageProps) {
  const resolvedParams = await params;
  const language = resolveLanguage(resolvedParams?.lang);
  if (!resolvedParams?.lang) {
    redirect(`/${DEFAULT_LANGUAGE}/about`);
  }

  redirect(`/${language}/about`);
}
