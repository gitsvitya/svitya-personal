import { redirectToPreferredSection } from "@/app/route-helpers";

export default async function HomePage() {
  await redirectToPreferredSection("about");
}
