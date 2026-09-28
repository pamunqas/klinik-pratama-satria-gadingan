/**
 * Session token signing untuk CMS.
 *
 * Cookie berisi token `{b64_payload}.{hex_hmac}` di mana payload adalah
 * JSON `{ sub, iat, exp }`. Edge-runtime compatible (Web Crypto API).
 * Vercel middleware memverifikasi HMAC, redirect ke /admin/login kalau invalid/expired.
 */

const COOKIE_NAME = "cms_session";
const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 hari

function toBase64Url(s: string): string {
  // Pakai base64 (bukan url-safe) — cukup untuk cookie.
  if (typeof window === "undefined") {
    return Buffer.from(s, "utf-8").toString("base64");
  }
  return btoa(unescape(encodeURIComponent(s)));
}

function fromBase64Url(b: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(b, "base64").toString("utf-8");
  }
  return decodeURIComponent(escape(atob(b)));
}

function utf8ToBytes(s: string): Uint8Array<ArrayBuffer> {
  const enc = new TextEncoder().encode(s);
  // Force ArrayBuffer (bukan SharedArrayBuffer) untuk memenuhi
  // tipe BufferSource yang diharapkan Web Crypto di TS 5.6+.
  const ab = new ArrayBuffer(enc.byteLength);
  new Uint8Array(ab).set(enc);
  return new Uint8Array(ab);
}

function bytesToHex(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let out = "";
  for (let i = 0; i < arr.length; i++) {
    out += arr[i].toString(16).padStart(2, "0");
  }
  return out;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    utf8ToBytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, utf8ToBytes(payload));
  return bytesToHex(sig);
}

export async function createSessionToken(
  subject: string,
  secret: string,
  ttlSeconds = DEFAULT_TTL_SECONDS
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify({ sub: subject, iat: now, exp: now + ttlSeconds });
  const payloadB64 = toBase64Url(payload);
  const sig = await hmacSign(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export async function verifySessionToken(
  token: string,
  secret: string
): Promise<{ sub: string; exp: number } | null> {
  if (!token || typeof token !== "string") return null;
  const dot = token.indexOf(".");
  if (dot < 0) return null;
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmacSign(payloadB64, secret);
  if (sig !== expected) return null;
  let payload: { sub: string; iat: number; exp: number };
  try {
    payload = JSON.parse(fromBase64Url(payloadB64));
  } catch {
    return null;
  }
  if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  return { sub: payload.sub, exp: payload.exp };
}

/**
 * Verifikasi username + password.
 * ADMIN_USERNAME default "admin"; ADMIN_PASSWORD wajib di-set di Vercel env.
 */
export function checkCredentials(
  username: string,
  password: string
): { ok: true } | { ok: false; reason: string } {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedPass) {
    return { ok: false, reason: "ADMIN_PASSWORD belum di-set di environment." };
  }
  // constant-time-ish compare untuk mencegah timing attack sederhana
  if (username.length !== expectedUser.length || password.length !== expectedPass.length) {
    return { ok: false, reason: "Username atau password salah." };
  }
  let mismatch = 0;
  for (let i = 0; i < expectedUser.length; i++) {
    mismatch |= username.charCodeAt(i) ^ expectedUser.charCodeAt(i);
  }
  for (let i = 0; i < expectedPass.length; i++) {
    mismatch |= password.charCodeAt(i) ^ expectedPass.charCodeAt(i);
  }
  if (mismatch !== 0) return { ok: false, reason: "Username atau password salah." };
  return { ok: true };
}

export const sessionCookieName = COOKIE_NAME;
