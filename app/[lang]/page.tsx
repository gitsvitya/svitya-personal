import { DEFAULT_LANGUAGE } from "../sections";
import {
  redirectToLocalizedSection,
  resolveLanguageParams,
  type LanguageHomePageProps,
} from "../route-helpers";

// Адрес вида /ru или /en не хранит отдельную страницу и всегда
// разворачивается в конкретный раздел "about".
export default async function LanguageHomePage({ params }: LanguageHomePageProps) {
  const { rawLanguage, language } = await resolveLanguageParams(params);

  // Если сегмент языка пропал или пришел в неожиданном виде,
  // отправляем пользователя на дефолтную локаль.
  if (!rawLanguage) {
    redirectToLocalizedSection(DEFAULT_LANGUAGE, "about");
  }

  redirectToLocalizedSection(language, "about");
}
