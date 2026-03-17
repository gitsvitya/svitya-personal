import { redirectToPreferredSection } from "../route-helpers";

// Поддерживает legacy-адрес "/activities" через редирект на локализованный путь.
export default async function LegacyActivitiesPage() {
  await redirectToPreferredSection("activities");
}
