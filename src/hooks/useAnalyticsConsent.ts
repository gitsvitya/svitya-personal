import { useSyncExternalStore } from "react";
import {
  getBrowserAnalyticsConsent,
  subscribeToAnalyticsConsent,
  type AnalyticsConsent,
} from "../utils/analyticsConsent";

export function useAnalyticsConsent(initialConsent: AnalyticsConsent): AnalyticsConsent {
  return useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getBrowserAnalyticsConsent,
    () => initialConsent
  );
}
