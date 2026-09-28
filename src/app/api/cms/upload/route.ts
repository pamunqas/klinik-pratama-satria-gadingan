import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cms-storage";
import { verifySessionToken, sessionCookieName } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(sessionCookieName)?.value;
  const secret = process.env.CMS_SESSION_SECRET;
  if (!token || !secret) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  const session = await verifySessionToken(token, secret);
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const ct = req.headers.get("content-type") ?? "";
  if (!ct.startsWith("multipart/form-data")) {
    return NextResponse.json({ error: "multipart/form-data wajib" }, { status: 400 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Field 'file' wajib ada" }, { status: 400 });
  }
  const ab = await file.arrayBuffer();
  const base64 = Buffer.from(ab).toString("base64");
  try {
    const { url, path } = await uploadImage({ filename: file.name, base64 });
    return NextResponse.json({ ok: true, url, path });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
