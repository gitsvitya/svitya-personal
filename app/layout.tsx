import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { headers } from "next/headers";
import "../src/index.css";
import App from "../src/components/App/App";
import { getServerTheme } from "./theme.server";
import { getServerLanguage } from "./language.server";

// Базовые метаданные сайта для SEO и превью.
export const metadata: Metadata = {
  metadataBase: new URL("https://svitya.com"),
  manifest: "/manifest.json",
  title: "Виктор Строков",
  description:
    "Виктор Строков - управление проектами, разработка продуктов, исследования и аналитика",
  keywords: [
    "Виктор Строков",
    "Витя Строков",
    "Строков",
    "менеджер проектов",
    "менеджер продукта",
  ],
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

// Глобальные параметры viewport и системного цвета браузерного UI.
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

// Корневой layout: инициализирует тему/язык и подключает глобальные скрипты.
export default async function RootLayout({ children }: RootLayoutProps) {
  const initialTheme = await getServerTheme();
  const initialLanguage = await getServerLanguage();
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
      style={{ backgroundColor: initialBackground }}
      suppressHydrationWarning
    >
      <body>
        {/* Инициализирует тему до гидрации, чтобы избежать мерцания интерфейса. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function setInitialTheme(){
            try {
              var cookieMatch = document.cookie.match(/(?:^|;\\s*)theme=(light|dark)(?:;|$)/);
              var themeFromCookie = cookieMatch ? cookieMatch[1] : null;
              var saved = localStorage.getItem("theme");
              var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              var theme = (saved === "light" || saved === "dark")
                ? saved
                : ((themeFromCookie === "light" || themeFromCookie === "dark") ? themeFromCookie : (prefersDark ? "dark" : "light"));
              var doc = document.documentElement;
              doc.setAttribute("data-theme", theme);
              doc.style.backgroundColor = theme === "dark" ? "#0c111a" : "#ffffff";
              localStorage.setItem("theme", theme);
              document.cookie = "theme=" + theme + "; path=/; max-age=31536000; samesite=lax";
            } catch (e) {}
          })();`}
        </Script>

        {!isLocalhost && (
          <>
            {/* Подключает и инициализирует Яндекс.Метрику после интерактивности страницы. */}
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(55102324, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
              });`}
            </Script>

            {/* Fallback-пиксель метрики для пользователей с отключенным JavaScript. */}
            <noscript>
              <div>
                <img
                  src="https://mc.yandex.ru/watch/55102324"
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}

        <App initialLanguage={initialLanguage} initialTheme={initialTheme} />
        {children}
        <div id="modal" />
      </body>
    </html>
  );
}
