import type { HeroSlide } from "@/types/content";

/**
 * Slide hero carousel — 2 slide.
 * Badge "Buka 24 Jam" verified; subJudul memuat kalimat Mobile JKN static.
 * imageUrl placeholder Unsplash (gambar belum tersedia).
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "hero-24jam",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80",
    imageAlt: "Tampak depan klinik pratama modern dengan pencahayaan hangat",
    judul: "Pelayanan Kesehatan Prima, Siaga 24 Jam.",
    subJudul:
      "Pendaftaran dilakukan dengan datang langsung ke klinik atau melalui aplikasi Mobile JKN.",
    badge: "Buka 24 Jam",
  },
  {
    id: "hero-bpjs",
    imageUrl:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1920&q=80",
    imageAlt: "Dokter dan pasien sedang berkonsultasi dengan ramah",
    judul: "Melayani Pasien Umum dan Peserta BPJS Kesehatan.",
    subJudul:
      "Didukung 16 tenaga medis profesional yang siap melayani Anda dengan standar pelayanan terbaik.",
    badge: undefined,
  },
];
