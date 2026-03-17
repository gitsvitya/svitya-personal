import { redirectToPreferredSection } from "../route-helpers";

// Поддерживает legacy-адрес "/about" через редирект на локализованный путь.
export default async function LegacyAboutPage() {
  await redirectToPreferredSection("about");
}
