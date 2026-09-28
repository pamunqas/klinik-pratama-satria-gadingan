import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, sessionCookieName } from "@/lib/session";

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/cms/:path*"],
};

/**
 * Protect /admin/* dan /api/cms/* dengan session cookie.
 * - Edge runtime — pakai Web Crypto API (lihat lib/session.ts).
 * - /admin/login publik (auth form-nya sendiri).
 * - API CMS untuk save/logout juga butuh valid cookie, kecuali login.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic =
    pathname === "/admin/login" ||
    pathname === "/api/cms/login";

  if (isPublic) return NextResponse.next();

  const token = req.cookies.get(sessionCookieName)?.value;
  const secret = process.env.CMS_SESSION_SECRET ?? "";
  if (!secret) {
    // Server misconfig — blokir akses
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "server-misconfig");
    return NextResponse.redirect(url);
  }

  const session = token ? await verifySessionToken(token, secret) : null;

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    if (pathname !== "/admin/login") {
      url.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
