import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import type { ReactNode } from "react";
import SiteShell from "@/src/components/SiteShell/SiteShell";
import YandexAnalytics from "@/src/components/YandexAnalytics/YandexAnalytics";
import "@/src/index.css";
import { getServerAnalyticsConsent } from "./analytics-consent.server";
import { getServerLanguage } from "./language.server";
import { getServerTheme } from "./theme.server";

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

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const initialTheme = await getServerTheme();
  const initialLanguage = await getServerLanguage();
  const initialAnalyticsConsent = await getServerAnalyticsConsent();
  const initialBackground = initialTheme === "dark" ? "#0c111a" : "#ffffff";
  const headersList = await headers();
  const requestHost = headersList.get("host") || "";
  const [rawHostname = ""] = requestHost.split(":");
  const hostname = rawHostname.toLowerCase();
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]";

  return (
    <html
      lang={initialLanguage}
      data-theme={initialTheme}
      data-scroll-behavior="smooth"
      style={{ backgroundColor: initialBackground }}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function setInitialTheme(){
            try {
              var cookieMatch = document.cookie.match(/(?:^|;\\s*)theme=(light|dark)(?:;|$)/);
              var cookieTheme = cookieMatch ? cookieMatch[1] : null;
              var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              var theme = (cookieTheme === "light" || cookieTheme === "dark")
                ? cookieTheme
                : (prefersDark ? "dark" : "light");
              var doc = document.documentElement;
              doc.setAttribute("data-theme", theme);
              doc.style.backgroundColor = theme === "dark" ? "#0c111a" : "#ffffff";
              document.cookie = "theme=" + theme + "; path=/; max-age=31536000; samesite=lax";
            } catch (e) {}
          })();`}
        </Script>

        {!isLocalhost && <YandexAnalytics initialConsent={initialAnalyticsConsent} />}

        <SiteShell
          initialLanguage={initialLanguage}
          initialTheme={initialTheme}
          initialAnalyticsConsent={initialAnalyticsConsent}
        >
          {children}
        </SiteShell>
        <div id="modal" />
      </body>
    </html>
  );
}
