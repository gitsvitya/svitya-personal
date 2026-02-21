import { redirect } from "next/navigation";

export default function LegacyAboutPage() {
  redirect("/en/about");
}
