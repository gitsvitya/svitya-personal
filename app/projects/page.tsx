import { redirectToPreferredSection } from "../route-helpers";

// Поддерживает legacy-адрес "/projects" через редирект на локализованный путь.
export default async function LegacyProjectsPage() {
  await redirectToPreferredSection("projects");
}
