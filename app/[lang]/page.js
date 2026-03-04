import { redirect } from "next/navigation";
import { DEFAULT_LANGUAGE, resolveLanguage } from "../sections";

// Редиректит с корня языка на раздел "about" с учетом fallback-языка.
export default function LanguageHomePage({ params }) {
  const language = resolveLanguage(params?.lang);
  if (!params?.lang) {
    redirect(`/${DEFAULT_LANGUAGE}/about`);
  }

  redirect(`/${language}/about`);
}
