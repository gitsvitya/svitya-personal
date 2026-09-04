import { redirectToPreferredSection } from "@/app/route-helpers";

export default async function LegacyActivitiesPage() {
  await redirectToPreferredSection("activities");
}
