import localFont from "next/font/local";

export const onest = localFont({
  src: [{ path: "./Onest.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
