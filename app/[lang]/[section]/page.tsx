import {
  DEFAULT_LANGUAGE,
} from "../../sections";
import {
  buildLocalizedSectionMetadata,
  getLocalizedSectionStaticParams,
  redirectToLocalizedSection,
  resolveLocalizedSectionParams,
  type LocalizedSectionPageProps,
} from "../../route-helpers";

// Все валидные комбинации языка и раздела заранее известны,
// поэтому их можно статически предгенерировать на этапе сборки.
export function generateStaticParams() {
  return getLocalizedSectionStaticParams();
}

// Метаданные страницы вычисляются из route params, чтобы canonical и hreflang
// соответствовали конкретному локализованному URL.
export async function generateMetadata({ params }: LocalizedSectionPageProps) {
  const { language, section } = await resolveLocalizedSectionParams(params);
  return buildLocalizedSectionMetadata(language, section);
}

// Сама страница не рендерит контент: UI отрисовывает корневой App,
// а route-компонент занимается только валидацией URL и SEO.
export default async function LocalizedSectionPage({ params }: LocalizedSectionPageProps) {
  const { language, section, isLanguageValid, isSectionValid } =
    await resolveLocalizedSectionParams(params);

  // Некорректный язык отправляем на дефолтную локаль, сохраняя section,
  // если он распознан и может быть восстановлен.
  if (!isLanguageValid) {
    redirectToLocalizedSection(DEFAULT_LANGUAGE, section);
  }

  // Если сломан только раздел, оставляем язык и переводим пользователя
  // на безопасный fallback внутри той же локали.
  if (!isSectionValid) {
    redirectToLocalizedSection(language, "about");
  }

  return null;
}
