import { redirectToPreferredSection } from "@/app/route-helpers";

export default async function LegacyAboutPage() {
  await redirectToPreferredSection("about");
}
