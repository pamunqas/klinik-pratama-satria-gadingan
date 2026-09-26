import type { Service } from "@/types/content";

/**
 * 10 layanan klinik — verified dari clinic-info.md §3 (poin a–j, verbatim).
 * Ikon menggunakan nama Lucide-style; pemetaan ada di ServiceCard.tsx.
 */
export const services: Service[] = [
  {
    id: "svc-umum",
    slug: "pelayanan-kesehatan-umum",
    nama: "Pelayanan Kesehatan Umum",
    deskripsi:
      "Pemeriksaan dan konsultasi kesehatan oleh dokter umum serta tindakan medis dasar sesuai indikasi.",
    ikonName: "stethoscope",
    urutan: 1,
  },
  {
    id: "svc-gigi",
    slug: "pelayanan-gigi",
    nama: "Pelayanan Kesehatan Gigi dan Mulut",
    deskripsi:
      "Pemeriksaan, konsultasi, dan penanganan masalah kesehatan gigi dan mulut tingkat pertama.",
    ikonName: "tooth",
    urutan: 2,
  },
  {
    id: "svc-kia",
    slug: "pelayanan-kia",
    nama: "Pelayanan KIA",
    deskripsi:
      "Pemeriksaan kehamilan (antenatal care/ANC), pemantauan kesehatan ibu dan anak, serta edukasi kesehatan.",
    ikonName: "baby",
    urutan: 3,
  },
  {
    id: "svc-kb",
    slug: "pelayanan-kb",
    nama: "Pelayanan KB",
    deskripsi:
      "Pelayanan Keluarga Berencana dan konsultasi terkait kesehatan reproduksi.",
    ikonName: "heart-handshake",
    urutan: 4,
  },
  {
    id: "svc-usg",
    slug: "usg-kehamilan",
    nama: "Pemeriksaan USG Kehamilan",
    deskripsi:
      "Pemeriksaan ultrasonografi kehamilan sebagai bagian dari pemantauan kondisi kehamilan.",
    ikonName: "scan",
    urutan: 5,
  },
  {
    id: "svc-fisio",
    slug: "fisioterapi",
    nama: "Pelayanan Fisioterapi",
    deskripsi:
      "Pelayanan fisioterapi bagi pasien yang membutuhkan tindakan rehabilitasi sesuai indikasi.",
    ikonName: "activity",
    urutan: 6,
  },
  {
    id: "svc-lab",
    slug: "laboratorium",
    nama: "Pemeriksaan Laboratorium",
    deskripsi:
      "Pemeriksaan laboratorium sederhana (gula darah, asam urat, kolesterol) serta berkala melalui kerja sama dengan Laboratorium Parahita.",
    ikonName: "flask",
    urutan: 7,
  },
  {
    id: "svc-bpjs",
    slug: "pasien-bpjs",
    nama: "Pasien BPJS Kesehatan",
    deskripsi:
      "Pendaftaran dan pengambilan nomor antrean melalui aplikasi Mobile JKN untuk peserta BPJS.",
    ikonName: "id-card",
    urutan: 8,
  },
  {
    id: "svc-umum-walkin",
    slug: "pasien-umum",
    nama: "Pasien Umum Walk-in",
    deskripsi:
      "Pendaftaran langsung (walk-in) untuk pasien umum yang datang ke klinik.",
    ikonName: "user-round",
    urutan: 9,
  },
  {
    id: "svc-promotif",
    slug: "promotif-preventif",
    nama: "Promotif & Preventif",
    deskripsi:
      "Program rutin senam dan edukasi kesehatan yang dilaksanakan setiap hari Minggu.",
    ikonName: "megaphone",
    urutan: 10,
  },
];
