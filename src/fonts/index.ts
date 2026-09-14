import localFont from "next/font/local";

export const vremena = localFont({
  src: [
    { path: "./vremenagroteskbook.woff2", weight: "300", style: "normal" },
    { path: "./vremenagrotesk.woff2", weight: "400", style: "normal" },
    { path: "./vremenagroteskbold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
