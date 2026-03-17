import { redirectToPreferredSection } from "../route-helpers";

// Поддерживает legacy-адрес "/work" через редирект на локализованный путь.
export default async function LegacyWorkPage() {
  await redirectToPreferredSection("work");
}
