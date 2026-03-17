import { redirectToPreferredSection } from "./route-helpers";

// Редиректит с корня сайта на локализованный раздел "about".
export default async function HomePage() {
  await redirectToPreferredSection("about");
}
