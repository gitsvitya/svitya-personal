const BASE_URL = "https://svitya.com";
const DEFAULT_OG_IMAGE = "/logo512.png";
const SITE_NAME = "Виктор Строков";

export function buildPageMetadata({ title, description, path }) {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export { BASE_URL };
