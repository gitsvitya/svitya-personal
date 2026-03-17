import { redirectToPreferredSection } from "./route-helpers";

// Корневой URL не показывает отдельную страницу и сразу переводит
// пользователя на локализованный раздел "about".
export default async function HomePage() {
  await redirectToPreferredSection("about");
}
