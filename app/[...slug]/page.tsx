import { redirectToPreferredSection } from "../route-helpers";

// Catch-all страница не рендерит контент сама, а отправляет пользователя
// на базовый раздел сайта в подходящей локали.
export default async function UnknownPage() {
  await redirectToPreferredSection("about");
}
