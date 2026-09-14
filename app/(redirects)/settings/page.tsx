import { redirectToPreferredSection } from "@/app/route-helpers";

export default async function LegacySettingsPage() {
  await redirectToPreferredSection("settings");
}
