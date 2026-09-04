import { NextResponse, type NextRequest } from "next/server";
import { LANGUAGES, type Language } from "./src/types/domain";

const SUPPORTED_LANGUAGES = new Set<Language>(LANGUAGES);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [firstSegment] = pathname.split("/").filter(Boolean) as Language[];

  if (!firstSegment || !SUPPORTED_LANGUAGES.has(firstSegment)) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-route-language", firstSegment);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
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
