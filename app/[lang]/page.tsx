import { redirect } from "next/navigation";
import { DEFAULT_LANGUAGE, resolveLanguage } from "../sections";

type LanguageHomePageProps = {
  params?: {
    lang?: string;
  };
};

// Редиректит с корня языка на раздел "about" с учетом fallback-языка.
export default function LanguageHomePage({ params }: LanguageHomePageProps) {
  const language = resolveLanguage(params?.lang);
  if (!params?.lang) {
    redirect(`/${DEFAULT_LANGUAGE}/about`);
  }

  redirect(`/${language}/about`);
}
