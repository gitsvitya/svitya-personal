import type { ReactNode } from "react";
import { onest } from "../../fonts";
import type { Language } from "../../types/domain";
import SiteShell from "../SiteShell/SiteShell";
import ThemeInitScript from "./ThemeInitScript";
import "../../index.css";

export default function SiteDocument({
  children,
  language,
  isNotFound = false,
}: {
  children: ReactNode;
  language: Language;
  isNotFound?: boolean;
}) {
  return (
    <html
      lang={language}
      className={onest.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {/* This component provides the App Router root layout, where a native head is required. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <ThemeInitScript />
      </head>
      <body>
        <SiteShell
          initialLanguage={language}
          initialYear={new Date().getFullYear()}
          initialNotFound={isNotFound}
        >
          {children}
        </SiteShell>
        <div id="modal" />
      </body>
    </html>
  );
}
