import type { NavigationItem } from "@/types/content";

/**
 * Item navigasi header. Anchor fragments menunjuk ke section ID di halaman beranda.
 */
export const navigation: NavigationItem[] = [
  { label: "Beranda", href: "#beranda", order: 1 },
  { label: "Profil", href: "#profil", order: 2 },
  { label: "Layanan", href: "#layanan", order: 3 },
  { label: "Dokter", href: "#dokter", order: 4 },
  { label: "Galeri", href: "#galeri", order: 5 },
  { label: "Kontak", href: "#kontak", order: 6 },
];
