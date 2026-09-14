import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  isSupportedLanguage,
  isSupportedSection,
  SUPPORTED_LANGUAGES,
  SUPPORTED_SECTIONS,
} from "@/app/sections";
import { COMPANIES, getCompanyBySlug, getLocalizedCompany } from "@/src/content/portfolio";
import { getTranslations } from "@/src/content/ui-text";
import type { CompanySection } from "@/src/types/domain";

export const dynamic = "force-static";
export const runtime = "nodejs";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((lang) => [
    ...SUPPORTED_SECTIONS.map((section) => ({ lang, section, company: [] as string[] })),
    ...Object.values(COMPANIES).map(({ section, slug }) => ({ lang, section, company: [slug] })),
  ]);
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ lang: string; section: string; company?: string[] }>;
  }
) {
  const { lang, section, company: slugs = [] } = await params;
  if (!isSupportedLanguage(lang) || !isSupportedSection(section) || slugs.length > 1) {
    return new Response(null, { status: 404 });
  }
  const record = slugs[0] ? getCompanyBySlug(section as CompanySection, slugs[0]) : null;
  if (slugs[0] && !record) return new Response(null, { status: 404 });
  const company = record ? getLocalizedCompany(record.id, lang) : null;
  const text = getTranslations(lang);
  const font = await readFile(join(process.cwd(), "src/fonts/vremenagrotesk.woff"));
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "60px 72px",
        background: "#ffffff",
        color: "#111217",
        fontFamily: "Vremena",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
        <span style={{ color: "#d53430" }}>svitya.com</span>
        <span style={{ color: "#59616d" }}>{text.sections[section]}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{ display: "flex", fontSize: company ? 68 : 80, lineHeight: 1.12, maxWidth: 1040 }}
        >
          {company?.name || text.about.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            lineHeight: 1.4,
            color: "#59616d",
            maxWidth: 980,
          }}
        >
          {company?.title || text.about.subtitle}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26 }}>
        <div style={{ width: 64, height: 4, background: "#d53430" }} />
        <span>{company ? text.about.title : text.about.experience}</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Vremena", data: font, weight: 400, style: "normal" }],
    }
  );
}
