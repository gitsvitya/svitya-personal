import type { ReactNode } from "react";
import { vremena } from "../../fonts";
import type { Language } from "../../types/domain";
import SiteShell from "../SiteShell/SiteShell";
import "../../index.css";

// A constant, parser-executed script: the first paint must not wait for Next's bootstrap.
const THEME_INIT = `(function(){
  var theme;
  try { var match = document.cookie.match(/(?:^|;\\s*)theme=(light|dark)(?:;|$)/); theme = match && match[1]; } catch(e) {}
  if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();`;

export default function SiteDocument({
  children,
  language,
}: {
  children: ReactNode;
  language: Language;
}) {
  return (
    <html
      lang={language}
      className={vremena.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {/* This component provides the App Router root layout, where a native head is required. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <SiteShell initialLanguage={language}>{children}</SiteShell>
        <div id="modal" />
      </body>
    </html>
  );
}
