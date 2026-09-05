import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { DEFAULT_LANGUAGE } from "@/app/sections";
import SiteShell from "@/src/components/SiteShell/SiteShell";
import YandexAnalytics from "@/src/components/YandexAnalytics/YandexAnalytics";
import "@/src/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://svitya.com"),
  manifest: "/manifest.json",
  title: "Виктор Строков",
  description:
    "Виктор Строков - управление проектами, разработка продуктов, исследования и аналитика",
  keywords: ["Виктор Строков", "Витя Строков", "Строков", "менеджер проектов", "менеджер продукта"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Виктор Строков",
    description: "Профессионал своего дела и просто хороший парень",
    url: "https://svitya.com",
    images: ["/logo512.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c111a" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LANGUAGE} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function setInitialPreferences(){
            try {
              var cookieMatch = document.cookie.match(/(?:^|;\\s*)theme=(light|dark)(?:;|$)/);
              var cookieTheme = cookieMatch ? cookieMatch[1] : null;
              var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              var theme = (cookieTheme === "light" || cookieTheme === "dark")
                ? cookieTheme
                : (prefersDark ? "dark" : "light");
              var doc = document.documentElement;
              var routeLanguage = window.location.pathname.split("/")[1];
              if (routeLanguage === "ru" || routeLanguage === "en") doc.lang = routeLanguage;
              doc.setAttribute("data-theme", theme);
              doc.style.backgroundColor = theme === "dark" ? "#0c111a" : "#ffffff";
              document.cookie = "theme=" + theme + "; path=/; max-age=31536000; samesite=lax";
            } catch (e) {}
          })();`}
        </Script>

        <YandexAnalytics />
        <SiteShell initialLanguage={DEFAULT_LANGUAGE}>{children}</SiteShell>
        <div id="modal" />
      </body>
    </html>
  );
}
