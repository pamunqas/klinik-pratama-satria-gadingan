import { NextRequest, NextResponse } from "next/server";
import { commitFile } from "@/lib/cms-storage";
import { verifySessionToken, sessionCookieName } from "@/lib/session";
import type { Schedule, StaffMember, StaffStructure, GalleryItem } from "@/types/content";

export const runtime = "nodejs";

type Collection =
  | "schedules"
  | "staffStructure"
  | "individualStaff"
  | "gallery";

interface SaveBody {
  collection: Collection;
  data: unknown;
}

const ALLOWED: Record<Collection, string> = {
  schedules: "src/data/schedules.json",
  staffStructure: "src/data/doctors.json",
  individualStaff: "src/data/doctors.json",
  gallery: "src/data/gallery.json",
};

const COMMIT_MESSAGE: Record<Collection, string> = {
  schedules: "CMS: update jadwal dokter",
  staffStructure: "CMS: update struktur staf medis",
  individualStaff: "CMS: update detail individu staf medis",
  gallery: "CMS: update galeri fasilitas",
};

function validateData(collection: Collection, raw: unknown): string | null {
  if (collection === "schedules") {
    if (!Array.isArray(raw)) return "Data harus array.";
    for (const item of raw as Schedule[]) {
      if (!item.id || !item.poliId || !item.doctorName || !item.hari) {
        return "Setiap jadwal butuh id, poliId, doctorName, hari.";
      }
    }
  } else if (collection === "staffStructure") {
    if (!Array.isArray(raw)) return "Data harus array.";
    for (const item of raw as StaffStructure[]) {
      if (!item.kategori || !item.label || typeof item.jumlah !== "number") {
        return "Setiap kategori butuh kategori, label, jumlah (number).";
      }
    }
  } else if (collection === "individualStaff") {
    if (!Array.isArray(raw)) return "Data harus array.";
    for (const item of raw as StaffMember[]) {
      if (!item.id || !item.kategori) return "Setiap staf butuh id dan kategori.";
    }
  } else if (collection === "gallery") {
    if (!Array.isArray(raw)) return "Data harus array.";
    for (const item of raw as GalleryItem[]) {
      if (!item.id || !item.judul || !item.imageUrl) {
        return "Setiap item galeri butuh id, judul, imageUrl.";
      }
    }
  }
  return null;
}

async function auth(req: NextRequest) {
  const token = req.cookies.get(sessionCookieName)?.value;
  const secret = process.env.CMS_SESSION_SECRET;
  if (!token || !secret) return false;
  const session = await verifySessionToken(token, secret);
  return session !== null;
}

export async function POST(req: NextRequest) {
  if (!(await auth(req))) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  let body: SaveBody;
  try {
    body = (await req.json()) as SaveBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { collection, data } = body;
  if (!(collection in ALLOWED)) {
    return NextResponse.json({ error: `Collection tidak dikenal: ${collection}` }, { status: 400 });
  }
  const validationError = validateData(collection, data);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }
  try {
    const result = await commitFile({
      path: ALLOWED[collection],
      content: JSON.stringify({ [collection]: data }, null, 2),
      message: COMMIT_MESSAGE[collection],
    });
    return NextResponse.json({ ok: true, commitSha: result.commitSha, path: result.contentPath });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
