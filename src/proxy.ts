import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["vi"];
const defaultLocale = "vi";

function getLocale(request: NextRequest): string {
  // Check cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocales = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, quality] = lang.trim().split(";q=");
      return { locale: locale.trim().split("-")[0], quality: quality ? parseFloat(quality) : 1 };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { locale } of preferredLocales) {
    if (locales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\..*).*)",
  ],
};
