"use client";

import { useEffect, useState } from "react";
import type { GalleryItem } from "@/types/content";

const KATEGORI_OPTIONS = [
  { value: "ruang-tunggu", label: "Ruang Tunggu" },
  { value: "ugd", label: "UGD" },
  { value: "poli", label: "Poli" },
  { value: "penyuluhan", label: "Penyuluhan" },
  { value: "lainnya", label: "Lainnya" },
];

function emptyItem(): GalleryItem {
  return {
    id: `gal-${Date.now()}`,
    judul: "",
    imageUrl: "",
    imageAlt: "",
    kategori: "lainnya",
  };
}

export default function GaleriEditorPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    import("@/data/gallery").then((m) => {
      setItems(m.gallery);
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const resp = await fetch("/api/cms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: "gallery", data: items }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setMessage({ kind: "err", text: data.error ?? "Gagal menyimpan." });
      } else {
        setMessage({
          kind: "ok",
          text: `Tersimpan. Commit: ${data.commitSha?.slice(0, 7) ?? "—"}. Vercel redeploy ~30 detik.`,
        });
      }
    } catch (e) {
      setMessage({ kind: "err", text: String(e) });
    } finally {
      setSaving(false);
    }
  }

  async function uploadFile(file: File, idx: number) {
    setUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const resp = await fetch("/api/cms/upload", { method: "POST", body: fd });
      const data = await resp.json();
      if (!resp.ok) {
        setMessage({ kind: "err", text: data.error ?? "Upload gagal." });
        return;
      }
      setItems((arr) =>
        arr.map((row, i) => (i === idx ? { ...row, imageUrl: data.url } : row))
      );
    } catch (e) {
      setMessage({ kind: "err", text: String(e) });
    } finally {
      setUploading(false);
    }
  }

  function updateItem(i: number, patch: Partial<GalleryItem>) {
    setItems((arr) => arr.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function deleteItem(i: number) {
    if (!confirm("Hapus item ini?")) return;
    setItems((arr) => arr.filter((_, idx) => idx !== i));
  }
  function addItem() {
    setItems((arr) => [...arr, emptyItem()]);
  }

  if (loading) return <p>Memuat…</p>;

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark md:text-3xl">Galeri</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Edit foto fasilitas & kegiatan. Gambar bisa diupload dari komputer.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addItem}
            className="rounded-md bg-primary-soft px-4 py-2 text-sm font-medium text-primary-dark hover:bg-primary-dark hover:text-surface-soft"
          >
            + Tambah Item
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-md bg-primary-dark px-4 py-2 text-sm font-semibold text-surface-soft hover:bg-primary-soft hover:text-primary-dark disabled:opacity-60"
          >
            {saving ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </header>

      {message && (
        <div
          className={
            "mb-4 rounded-md px-4 py-2 text-sm " +
            (message.kind === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700")
          }
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="rounded-lg border border-border-soft bg-surface-soft p-4 md:p-6"
          >
            <div className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-12 flex items-center justify-between">
                <span className="text-xs text-text-secondary">ID: {item.id}</span>
                <button
                  type="button"
                  onClick={() => deleteItem(i)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
              <div className="md:col-span-6">
                <label className="text-xs text-text-secondary">Judul</label>
                <input
                  type="text"
                  value={item.judul}
                  onChange={(e) => updateItem(i, { judul: e.target.value })}
                  className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1.5 text-sm"
                />
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-text-secondary">Kategori</label>
                <select
                  value={item.kategori}
                  onChange={(e) =>
                    updateItem(i, { kategori: e.target.value as GalleryItem["kategori"] })
                  }
                  className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1.5 text-sm"
                >
                  {KATEGORI_OPTIONS.map((k) => (
                    <option key={k.value} value={k.value}>{k.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-text-secondary">URL Gambar (atau upload di bawah)</label>
                <input
                  type="text"
                  value={item.imageUrl}
                  onChange={(e) => updateItem(i, { imageUrl: e.target.value })}
                  className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1.5 text-sm"
                />
              </div>
              <div className="md:col-span-9">
                <label className="text-xs text-text-secondary">Alt Text (a11y)</label>
                <input
                  type="text"
                  value={item.imageAlt}
                  onChange={(e) => updateItem(i, { imageAlt: e.target.value })}
                  className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1.5 text-sm"
                />
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-text-secondary">Upload gambar lokal</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadFile(file, i);
                  }}
                  className="text-xs"
                />
                {item.imageUrl && (
                  <p className="mt-1 truncate text-xs text-primary-dark">{item.imageUrl}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
