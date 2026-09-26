import type { ClinicContent } from "@/types/content";

/**
 * Konten profil klinik — verified dari clinic-info.md §1 dan §2.
 * Sejarah, visi, misi, profil singkat, jam operasional semuanya verbatim/paraphrase.
 */
export const clinicContent: ClinicContent = {
  sejarah: [
    {
      tahun: 2002,
      judul: "Praktik Dokter Perorangan",
      deskripsi: "Cikal bakal klinik bermula dari praktik dokter perorangan yang dirintis oleh dr. A. Eki Dewanti.",
    },
    {
      tahun: 2010,
      judul: "Praktik Dokter Keluarga",
      deskripsi: "Praktik berkembang menjadi praktik dokter keluarga untuk melayani kebutuhan yang lebih luas.",
    },
    {
      tahun: 2017,
      judul: "Klinik Pratama Satria Gadingan",
      deskripsi: "Pelayanan kesehatan berkembang menjadi Klinik Satria Gadingan untuk pelayanan yang lebih komprehensif.",
    },
  ],
  visi: "Terwujudnya pelayanan holistik menuju masyarakat sehat.",
  misi: [
    "Membangun kerjasama tim klinik yang profesional.",
    "Meningkatkan kualitas sumber daya manusia.",
    "Meningkatkan dan mengembangkan sarana dan prasarana, untuk mendukung kualitas pelayanan kesehatan.",
    "Memberikan pelayanan medis yang profesional dan berbasis bukti.",
    "Memberikan pelayanan yang berfokus pada pasien.",
  ],
  jamOperasional: "Buka 24 jam untuk melayani masyarakat setiap hari.",
  profilSingkat:
    "Klinik Pratama Satria Gadingan Yogyakarta merupakan fasilitas pelayanan kesehatan tingkat pertama di Kabupaten Sleman, DIY. Bekerja sama dengan BPJS Kesehatan, melayani pasien umum maupun peserta JKN dengan pelayanan 24 jam.",
};
