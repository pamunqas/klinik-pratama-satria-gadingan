import type { Schedule } from "@/types/content";

/**
 * Jadwal praktik dokter — placeholder [Contoh] untuk seluruh entri.
 * Admin mengisi jadwal spesifik (poli, nama dokter, hari, jam) setelahnya.
 */
export const schedules: Schedule[] = [
  { id: "sch-001", poliId: "svc-umum", doctorName: "[Contoh] dr. A", hari: "Senin", jamMulai: "[Contoh] 08:00", jamSelesai: "[Contoh] 14:00" },
  { id: "sch-002", poliId: "svc-umum", doctorName: "[Contoh] dr. B", hari: "Senin", jamMulai: "[Contoh] 14:00", jamSelesai: "[Contoh] 20:00" },
  { id: "sch-003", poliId: "svc-umum", doctorName: "[Contoh] dr. C", hari: "Selasa", jamMulai: "[Contoh] 08:00", jamSelesai: "[Contoh] 14:00" },
  { id: "sch-004", poliId: "svc-gigi", doctorName: "[Contoh] drg. D", hari: "Senin", jamMulai: "[Contoh] 09:00", jamSelesai: "[Contoh] 15:00" },
  { id: "sch-005", poliId: "svc-gigi", doctorName: "[Contoh] drg. E", hari: "Rabu", jamMulai: "[Contoh] 09:00", jamSelesai: "[Contoh] 15:00" },
  { id: "sch-006", poliId: "svc-kia", doctorName: "[Contoh] Bd. F", hari: "Selasa", jamMulai: "[Contoh] 08:00", jamSelesai: "[Contoh] 12:00" },
  { id: "sch-007", poliId: "svc-kia", doctorName: "[Contoh] Bd. G", hari: "Kamis", jamMulai: "[Contoh] 08:00", jamSelesai: "[Contoh] 12:00" },
  { id: "sch-008", poliId: "svc-usg", doctorName: "[Contoh] dr. H", hari: "Rabu", jamMulai: "[Contoh] 10:00", jamSelesai: "[Contoh] 13:00" },
  { id: "sch-009", poliId: "svc-fisio", doctorName: "[Contoh] Ft. I", hari: "Senin", jamMulai: "[Contoh] 13:00", jamSelesai: "[Contoh] 17:00" },
  { id: "sch-010", poliId: "svc-fisio", doctorName: "[Contoh] Ft. J", hari: "Kamis", jamMulai: "[Contoh] 13:00", jamSelesai: "[Contoh] 17:00" },
  { id: "sch-011", poliId: "svc-lab", doctorName: "[Contoh] Petugas Lab", hari: "Senin–Sabtu", jamMulai: "[Contoh] 07:00", jamSelesai: "[Contoh] 14:00" },
];
