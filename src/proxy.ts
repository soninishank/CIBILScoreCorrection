// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(req: NextRequest) {
  const { nextUrl, headers } = req;
  const { pathname } = nextUrl;

  // Skip assets, _next, api, static or public files and /hi or /en already
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/hi") ||
    pathname.startsWith("/en")
  ) {
    return;
  }

  // 1) Check cookie
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale) {
    if (cookieLocale === "hi") {
      const url = req.nextUrl.clone();
      url.pathname = "/hi" + (pathname === "/" ? "/" : pathname);
      return NextResponse.redirect(url);
    }
    // cookieLocale === 'en' -> no redirect (serve /)
    return;
  }

  // 2) Detect Accept-Language header
  const acceptLang = headers.get("accept-language") || "";
  const preferred = acceptLang.split(",").map(s => s.split(";")[0].trim());

  const prefersHi = preferred.some(l => l.startsWith("hi"));

  if (prefersHi) {
    const url = req.nextUrl.clone();
    url.pathname = "/hi" + (pathname === "/" ? "/" : pathname);
    const res = NextResponse.redirect(url);
    // set cookie for 30 days
    res.cookies.set("NEXT_LOCALE", "hi", { path: "/", maxAge: 60 * 60 * 24 * 30 });
    return res;
  }

  // default: do nothing (serve '/')
  return;
}

// apply middleware to root and all pages except API/_next/static
export const config = {
  matcher: ["/", "/((?!api|_next|static|favicon.ico).*)"],
};
