import { NextResponse } from "next/server";

const SUPPORTED_LANGUAGES = new Set(["ru", "en"]);

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (!SUPPORTED_LANGUAGES.has(firstSegment)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const currentCookie = request.cookies.get("lang")?.value;

  if (currentCookie !== firstSegment) {
    response.cookies.set({
      name: "lang",
      value: firstSegment,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|manifest.json|robots.txt|sitemap.xml).*)"],
};
