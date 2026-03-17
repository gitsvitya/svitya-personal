import { NextResponse, type NextRequest } from "next/server";
import { LANGUAGES, type Language } from "./src/types/domain";

// Набор поддерживаемых языковых префиксов URL.
const SUPPORTED_LANGUAGES = new Set<Language>(LANGUAGES);

// Синхронизирует cookie языка с первым сегментом локализованного маршрута.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [firstSegment] = pathname.split("/").filter(Boolean) as Language[];

  if (!firstSegment || !SUPPORTED_LANGUAGES.has(firstSegment)) {
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

// Ограничивает выполнение middleware только пользовательскими страницами.
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|manifest.json|robots.txt|sitemap.xml).*)"],
};
