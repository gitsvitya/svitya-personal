"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
  __svityaYandexLastUrl?: string;
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
    defer: true,
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
  delete target.__svityaYandexLastUrl;
}

function YandexAnalytics({ title }: { title: string }) {
  const consent = useAnalyticsConsent();
  const pathname = usePathname();

  useEffect(() => {
    const target = window as YandexWindow;
    if (shouldEnableYandexAnalytics(consent, window.location.hostname)) {
      initializeYandexAnalytics(target, document);
      const url = window.location.href;
      if (target.__svityaYandexLastUrl !== url) {
        target.ym?.(COUNTER_ID, "hit", url, {
          // Receive the committed page title directly; Next may still be updating <head>.
          title,
          referer: target.__svityaYandexLastUrl || document.referrer,
        });
        target.__svityaYandexLastUrl = url;
      }
    } else {
      stopYandexAnalytics(target);
    }
  }, [consent, pathname, title]);

  return null;
}

export default YandexAnalytics;
