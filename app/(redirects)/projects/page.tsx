import { redirectToPreferredSection } from "@/app/route-helpers";

export default async function LegacyProjectsPage() {
  await redirectToPreferredSection("projects");
}
