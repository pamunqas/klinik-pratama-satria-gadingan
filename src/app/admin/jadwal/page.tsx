"use client";

import { useEffect, useState } from "react";
import type { Schedule } from "@/types/content";

interface ScheduleWithDraft extends Schedule {}

const POLI_OPTIONS = [
  { value: "svc-umum", label: "Poli Umum" },
  { value: "svc-gigi", label: "Poli Gigi" },
  { value: "svc-kia", label: "Poli KIA" },
  { value: "svc-usg", label: "USG Kehamilan" },
  { value: "svc-fisio", label: "Fisioterapi" },
  { value: "svc-lab", label: "Laboratorium" },
];

const HARI_OPTIONS = [
  "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu",
  "Senin–Sabtu", "Senin–Jumat", "Setiap Hari",
];

function emptySchedule(): Schedule {
  return {
    id: `sch-${Date.now()}`,
    poliId: "svc-umum",
    doctorName: "",
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "14:00",
  };
}

export default function JadwalEditorPage() {
  const [rows, setRows] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/cms/save-proxy-load?collection=schedules")
      .catch(() => null)
      .finally(() => {
        // Fallback to direct fetch of schedule data via static JSON
        return import("@/data/schedules").then((m) => {
          setRows(m.schedules);
          setLoading(false);
        });
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const resp = await fetch("/api/cms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: "schedules", data: rows }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setMessage({ kind: "err", text: data.error ?? "Gagal menyimpan." });
      } else {
        setMessage({
          kind: "ok",
          text: `Tersimpan. Commit: ${data.commitSha?.slice(0, 7) ?? "—"}. Vercel akan redeploy dalam ~30 detik.`,
        });
      }
    } catch (e) {
      setMessage({ kind: "err", text: String(e) });
    } finally {
      setSaving(false);
    }
  }

  function updateRow(i: number, patch: Partial<Schedule>) {
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function deleteRow(i: number) {
    if (!confirm("Hapus jadwal ini?")) return;
    setRows((r) => r.filter((_, idx) => idx !== i));
  }
  function addRow() {
    setRows((r) => [...r, emptySchedule()]);
  }

  if (loading) return <p>Memuat…</p>;

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark md:text-3xl">Jadwal Dokter</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Edit jadwal praktik dokter per poli. Klik "Simpan" untuk commit ke GitHub.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addRow}
            className="rounded-md bg-primary-soft px-4 py-2 text-sm font-medium text-primary-dark hover:bg-primary-dark hover:text-surface-soft"
          >
            + Tambah Jadwal
          </button>
          <button
            type="button"
            onClick={handleSave}
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

      <div className="overflow-x-auto rounded-lg border border-border-soft bg-surface-soft">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-primary-dark text-surface-soft">
            <tr>
              <th className="px-3 py-2 text-left">Poli</th>
              <th className="px-3 py-2 text-left">Nama Dokter</th>
              <th className="px-3 py-2 text-left">Hari</th>
              <th className="px-3 py-2 text-left">Jam Mulai</th>
              <th className="px-3 py-2 text-left">Jam Selesai</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {rows.map((row, i) => (
              <tr key={row.id ?? i}>
                <td className="px-3 py-2">
                  <select
                    value={row.poliId}
                    onChange={(e) => updateRow(i, { poliId: e.target.value })}
                    className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1"
                  >
                    {POLI_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={row.doctorName}
                    onChange={(e) => updateRow(i, { doctorName: e.target.value })}
                    className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1"
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={row.hari}
                    onChange={(e) => updateRow(i, { hari: e.target.value })}
                    className="w-full rounded border border-border-soft bg-surface-soft px-2 py-1"
                  >
                    {HARI_OPTIONS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={row.jamMulai}
                    onChange={(e) => updateRow(i, { jamMulai: e.target.value })}
                    className="w-24 rounded border border-border-soft bg-surface-soft px-2 py-1"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={row.jamSelesai}
                    onChange={(e) => updateRow(i, { jamSelesai: e.target.value })}
                    className="w-24 rounded border border-border-soft bg-surface-soft px-2 py-1"
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => deleteRow(i)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs italic text-text-secondary">
        Total: {rows.length} jadwal. Klik "Simpan" untuk commit perubahan.
      </p>
    </div>
  );
}
