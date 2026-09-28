import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, createSessionToken, sessionCookieName } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json({ error: "Username dan password wajib diisi." }, { status: 400 });
  }
  const result = checkCredentials(username, password);
  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: 401 });
  }
  const secret = process.env.CMS_SESSION_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfig: CMS_SESSION_SECRET belum di-set." },
      { status: 500 }
    );
  }
  const token = await createSessionToken(username, secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });
  return res;
}
