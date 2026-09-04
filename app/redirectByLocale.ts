import type { Language } from "../src/types/domain";
import { getServerLanguage } from "./language.server";

export async function getPreferredLanguage(): Promise<Language> {
  return getServerLanguage();
}
