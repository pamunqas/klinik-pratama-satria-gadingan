import type { FooterLink } from "@/types/content";

/**
 * Link footer tambahan (mis. tautan eksternal, FAQ, dll.).
 * Saat ini minimal; admin dapat menambah.
 */
export const footerLinks: FooterLink[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Layanan", href: "#layanan" },
  { label: "Dokter", href: "#dokter" },
  { label: "Galeri", href: "#galeri" },
  { label: "Kontak", href: "#kontak" },
];
