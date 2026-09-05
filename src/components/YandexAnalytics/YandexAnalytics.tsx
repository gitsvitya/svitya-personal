"use client";

import { useEffect } from "react";
import { useAnalyticsConsent } from "../../hooks/useAnalyticsConsent";
import type { AnalyticsConsent } from "../../utils/analyticsConsent";

const COUNTER_ID = 55102324;
const SCRIPT_SOURCE = "https://mc.yandex.ru/metrika/tag.js";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

type YandexCommand = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

type YandexWindow = Window & {
  ym?: YandexCommand;
  __svityaYandexInitialized?: boolean;
};

export function shouldEnableYandexAnalytics(consent: AnalyticsConsent, hostname: string): boolean {
  return consent === "granted" && !LOCAL_HOSTNAMES.has(hostname.toLowerCase());
}

function ensureYandexCommand(target: YandexWindow): YandexCommand {
  if (target.ym) return target.ym;

  const command: YandexCommand = (...args: unknown[]) => {
    command.a = command.a || [];
    command.a.push(args);
  };
  command.l = Date.now();
  target.ym = command;
  return command;
}

function initializeYandexAnalytics(target: YandexWindow, documentNode: Document): void {
  if (target.__svityaYandexInitialized) return;

  const ym = ensureYandexCommand(target);
  if (!documentNode.querySelector(`script[src="${SCRIPT_SOURCE}"]`)) {
    const script = documentNode.createElement("script");
    script.async = true;
    script.src = SCRIPT_SOURCE;
    documentNode.head.appendChild(script);
  }

  ym(COUNTER_ID, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  });
  target.__svityaYandexInitialized = true;
}

function stopYandexAnalytics(target: YandexWindow): void {
  if (!target.__svityaYandexInitialized) return;
  target.ym?.(COUNTER_ID, "destruct");
  target.__svityaYandexInitialized = false;
}

function YandexAnalytics() {
  const consent = useAnalyticsConsent();

  useEffect(() => {
    const target = window as YandexWindow;
    if (shouldEnableYandexAnalytics(consent, window.location.hostname)) {
      initializeYandexAnalytics(target, document);
    } else {
      stopYandexAnalytics(target);
    }
  }, [consent]);

  return null;
}

export default YandexAnalytics;
