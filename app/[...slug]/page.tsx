import { redirectToPreferredSection } from "../route-helpers";

// Перехватывает неизвестные маршруты и отправляет пользователя в локализованный раздел "about".
export default async function UnknownPage() {
  await redirectToPreferredSection("about");
}
