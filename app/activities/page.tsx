import { redirectToPreferredSection } from "../route-helpers";

// Legacy-маршрут сохраняется для обратной совместимости со старыми ссылками
// и сразу переводит пользователя на актуальный локализованный URL.
export default async function LegacyActivitiesPage() {
  await redirectToPreferredSection("activities");
}
