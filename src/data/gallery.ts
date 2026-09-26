import type { GalleryItem } from "@/types/content";

/**
 * Galeri fasilitas — 6 item Unsplash placeholder bertema klinik.
 * Kategori verified (ruang-tunggu, UGD, poli, penyuluhan, dll.).
 */
export const gallery: GalleryItem[] = [
  {
    id: "gal-001",
    judul: "Ruang Tunggu",
    imageUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ruang tunggu klinik dengan kursi nyaman dan pencahayaan alami",
    kategori: "ruang-tunggu",
  },
  {
    id: "gal-002",
    judul: "Unit Gawat Darurat",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ruang UGD dengan peralatan medis modern",
    kategori: "ugd",
  },
  {
    id: "gal-003",
    judul: "Poli Gigi",
    imageUrl:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Kursi dokter gigi modern dengan peralatan lengkap",
    kategori: "poli",
  },
  {
    id: "gal-004",
    judul: "Penyuluhan Kesehatan",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Kegiatan penyuluhan kesehatan untuk masyarakat",
    kategori: "penyuluhan",
  },
  {
    id: "gal-005",
    judul: "Ruang Konsultasi",
    imageUrl:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ruang konsultasi dokter yang nyaman dan privat",
    kategori: "poli",
  },
  {
    id: "gal-006",
    judul: "Lobby Utama",
    imageUrl:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Lobby klinik dengan resepsionis yang ramah",
    kategori: "lainnya",
  },
];
