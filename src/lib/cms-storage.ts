/**
 * GitHub Contents API helpers untuk CMS server-side commits.
 * Memerlukan env: CMS_GITHUB_PAT (Personal Access Token, scope: contents:write),
 *                 CMS_GITHUB_REPO (format "owner/repo"), opsional CMS_GITHUB_BRANCH (default "main").
 */

interface CommitResult {
  commitSha: string;
  contentPath: string;
}

function envOrThrow(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} belum di-set di environment.`);
  return v;
}

function base64Encode(str: string): string {
  if (typeof Buffer !== "undefined") return Buffer.from(str, "utf-8").toString("base64");
  // Edge fallback
  return btoa(unescape(encodeURIComponent(str)));
}

export interface CommitFileOptions {
  /** Path dalam repo, mis. "src/data/schedules.json" */
  path: string;
  /** Content (string) untuk ditulis. Akan di-serialize sebagai JSON pretty */
  content: string;
  /** Commit message */
  message: string;
}

export async function commitFile({
  path,
  content,
  message,
}: CommitFileOptions): Promise<CommitResult> {
  const pat = envOrThrow("CMS_GITHUB_PAT");
  const repo = envOrThrow("CMS_GITHUB_REPO");
  const branch = process.env.CMS_GITHUB_BRANCH ?? "main";

  // Ambil SHA file saat ini (kalau ada) — diperlukan untuk update
  const getUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`;
  const getResp = await fetch(getUrl, {
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  let existingSha: string | undefined;
  if (getResp.ok) {
    const data = await getResp.json();
    existingSha = data.sha;
  } else if (getResp.status !== 404) {
    const text = await getResp.text();
    throw new Error(`GitHub GET gagal (${getResp.status}): ${text}`);
  }

  // PUT (create atau update)
  const putUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`;
  const body: Record<string, unknown> = {
    message,
    content: base64Encode(content),
    branch,
  };
  if (existingSha) body.sha = existingSha;

  const putResp = await fetch(putUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!putResp.ok) {
    const text = await putResp.text();
    throw new Error(`GitHub PUT gagal (${putResp.status}): ${text}`);
  }
  const data = await putResp.json();
  return { commitSha: data.commit?.sha ?? "", contentPath: path };
}

export interface UploadImageOptions {
  filename: string;
  base64: string;
}

export async function uploadImage({
  filename,
  base64,
}: UploadImageOptions): Promise<{ url: string; path: string }> {
  const pat = envOrThrow("CMS_GITHUB_PAT");
  const repo = envOrThrow("CMS_GITHUB_REPO");
  const branch = process.env.CMS_GITHUB_BRANCH ?? "main";

  const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `public/uploads/${Date.now()}-${cleanName}`;

  const getUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`;
  const getResp = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${pat}`, Accept: "application/vnd.github+json" },
    cache: "no-store",
  });
  let existingSha: string | undefined;
  if (getResp.ok) existingSha = (await getResp.json()).sha;

  const putUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`;
  const body: Record<string, unknown> = {
    message: `Upload image: ${cleanName}`,
    content: base64,
    branch,
  };
  if (existingSha) body.sha = existingSha;

  const putResp = await fetch(putUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!putResp.ok) {
    const text = await putResp.text();
    throw new Error(`Upload image gagal (${putResp.status}): ${text}`);
  }

  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
  return { url, path };
}
