import { NextResponse, type NextRequest } from "next/server";
import { LANGUAGES, type Language } from "./src/types/domain";

// Множество удобно для быстрых проверок языкового сегмента в URL.
const SUPPORTED_LANGUAGES = new Set<Language>(LANGUAGES);

// Middleware синхронизирует серверное представление языка с URL:
// обновляет cookie и пробрасывает язык маршрута дальше в request headers.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [firstSegment] = pathname.split("/").filter(Boolean) as Language[];
  const requestHeaders = new Headers(request.headers);

  // Для маршрутов без языкового префикса ничего не меняем и пропускаем дальше.
  if (!firstSegment || !SUPPORTED_LANGUAGES.has(firstSegment)) {
    return NextResponse.next();
  }

  // Дополнительный заголовок позволяет RootLayout выставить корректный html[lang]
  // без повторного разбора pathname на сервере.
  requestHeaders.set("x-route-language", firstSegment);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  const currentCookie = request.cookies.get("lang")?.value;

  // Cookie языка обновляется только при расхождении со значением из URL,
  // чтобы не делать лишние записи на каждом запросе.
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

// Middleware не должен срабатывать на служебных ресурсах Next.js и файлах,
// иначе это даст лишние накладные расходы и потенциальные побочные эффекты.
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|manifest.json|robots.txt|sitemap.xml).*)"],
};
