import type { Metadata, Viewport } from "next";
import { getTranslations } from "../src/content/ui-text";
import { BASE_URL } from "./site";

const aboutCopy = getTranslations("ru").about;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  manifest: "/manifest.json",
  title: "Виктор Строков",
  description: aboutCopy.subtitle,
  keywords: [
    "Виктор Строков",
    "Витя Строков",
    "Строков",
    "руководитель направления",
    "развитие бизнеса",
    "B2B",
    "информационные продукты",
    "аналитика рынков",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Виктор Строков",
    description: aboutCopy.subtitle,
    url: BASE_URL,
    images: [{ url: "/og/ru/about", width: 1200, height: 630 }],
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
