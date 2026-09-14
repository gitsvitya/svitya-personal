import type { Metadata, Viewport } from "next";
import { BASE_URL } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    description: "Управление проектами, разработка продуктов, исследования и аналитика",
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
