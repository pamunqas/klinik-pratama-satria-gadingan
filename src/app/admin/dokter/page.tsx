"use client";

import { useEffect, useState } from "react";
import type { StaffMember, StaffStructure, StaffCategory } from "@/types/content";

const KATEGORI_OPTIONS: { value: StaffCategory; label: string }[] = [
  { value: "dokter-umum", label: "Dokter Umum" },
  { value: "dokter-gigi", label: "Dokter Gigi" },
  { value: "bidan", label: "Bidan" },
  { value: "perawat", label: "Perawat" },
  { value: "apoteker", label: "Apoteker" },
  { value: "tenaga-teknis-kefarmasian", label: "Tenaga Teknis Kefarmasian" },
  { value: "tenaga-rekam-medis", label: "Tenaga Rekam Medis" },
  { value: "fisioterapis", label: "Fisioterapis" },
  { value: "tenaga-kebersihan", label: "Tenaga Kebersihan" },
];

export default function DokterEditorPage() {
  const [struktur, setStruktur] = useState<StaffStructure[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    Promise.all([import("@/data/doctors")]).then(([m]) => {
      setStruktur(m.staffStructure);
      setStaff(m.individualStaff);
      setLoading(false);
    });
  }, []);

  async function saveAll() {
    setSaving(true);
    setMessage(null);
    try {
      // Save struktur first
      const r1 = await fetch("/api/cms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: "staffStructure", data: struktur }),
      });
      if (!r1.ok) {
        const d = await r1.json();
        setMessage({ kind: "err", text: d.error ?? "Gagal simpan struktur." });
        return;
      }
      // Save individu
      const r2 = await fetch("/api/cms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: "individualStaff", data: staff }),
      });
      if (!r2.ok) {
        const d = await r2.json();
        setMessage({ kind: "err", text: d.error ?? "Gagal simpan individu." });
        return;
      }
      const d2 = await r2.json();
      setMessage({
        kind: "ok",
        text: `Tersimpan. Commit: ${d2.commitSha?.slice(0, 7) ?? "—"}. Vercel akan redeploy dalam ~30 detik.`,
      });
    } catch (e) {
      setMessage({ kind: "err", text: String(e) });
    } finally {
      setSaving(false);
    }
  }

  function updateStruktur(i: number, patch: Partial<StaffStructure>) {
    setStruktur((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function updateStaff(i: number, patch: Partial<StaffMember>) {
    setStaff((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function addStaff() {
    const id = `staff-${Date.now()}`;
    setStaff((r) => [...r, { id, kategori: "perawat" }]);
  }
  function deleteStaff(i: number) {
    if (!confirm("Hapus staf ini?")) return;
    setStaff((r) => r.filter((_, idx) => idx !== i));
  }

  if (loading) return <p>Memuat…</p>;

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark md:text-3xl">Staf Medis</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Edit struktur tim dan nama individu. Klik "Simpan" untuk commit.
          </p>
        </div>
        <button
          type="button"
          onClick={saveAll}
          disabled={saving}
          className="rounded-md bg-primary-dark px-4 py-2 text-sm font-semibold text-surface-soft hover:bg-primary-soft hover:text-primary-dark disabled:opacity-60"
        >
          {saving ? "Menyimpan…" : "Simpan"}
        </button>
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

      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-primary-dark">
          Struktur Tim (per kategori)
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border-soft bg-surface-soft">
          <table className="w-full text-sm">
            <thead className="bg-primary-dark text-surface-soft">
              <tr>
                <th className="px-3 py-2 text-left">Kategori</th>
                <th className="px-3 py-2 text-left">Label Tampilan</th>
                <th className="px-3 py-2 text-left">Jumlah Staf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {struktur.map((row, i) => (
                <tr key={row.kategori}>
                  <td className="px-3 py-2 text-sm font-medium">
                    {KATEGORI_OPTIONS.find((k) => k.value === row.kategori)?.label ?? row.kategori}
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.label}
                      onChange={(e) => updateStruktur(i, { label: e.target.value })}
                      className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={row.jumlah}
                      onChange={(e) =>
                        updateStruktur(i, { jumlah: Number(e.target.value) })
                      }
                      className="w-20 rounded border border-border-soft bg-surface-soft px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary-dark">
            Staf Individu (nama & foto)
          </h2>
          <button
            type="button"
            onClick={addStaff}
            className="rounded-md bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary-dark hover:bg-primary-dark hover:text-surface-soft"
          >
            + Tambah Staf
          </button>
        </div>

        <div className="space-y-3">
          {staff.map((row, i) => (
            <div
              key={row.id ?? i}
              className="grid gap-2 rounded-lg border border-border-soft bg-surface-soft p-4 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <label className="text-xs text-text-secondary">Kategori</label>
                <select
                  value={row.kategori}
                  onChange={(e) =>
                    updateStaff(i, { kategori: e.target.value as StaffCategory })
                  }
                  className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1 text-sm"
                >
                  {KATEGORI_OPTIONS.map((k) => (
                    <option key={k.value} value={k.value}>{k.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-5">
                <label className="text-xs text-text-secondary">Nama Lengkap + Gelar</label>
                <input
                  type="text"
                  value={row.nama ?? ""}
                  onChange={(e) => updateStaff(i, { nama: e.target.value })}
                  className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1 text-sm"
                />
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-text-secondary">URL Foto</label>
                <input
                  type="text"
                  value={row.fotoUrl ?? ""}
                  onChange={(e) => updateStaff(i, { fotoUrl: e.target.value })}
                  className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1 text-sm"
                />
              </div>
              <div className="flex items-end justify-end md:col-span-1">
                <button
                  type="button"
                  onClick={() => deleteStaff(i)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
