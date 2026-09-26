/**
 * Content types untuk Klinik Pratama Satria Gadingan.
 *
 * SETIAP INTERFACE DIBERI KOMENTAR `// prisma:` yang memetakan field ke
 * model Prisma masa depan. TIDAK ada runtime Prisma; hanya shape yang siap-migrasi.
 *
 * Sumber konten terverifikasi: clinic-info.md (lihat .omc/plexicus/.../clinic-info.md)
 * Prefiks `[Contoh]` greppable menandai sub-field placeholder (lihat scripts/check-placeholder-scope.sh).
 */

// prisma: model SiteConfig {
// prisma:   id          String   @id @default(cuid())
// prisma:   nama        String
// prisma:   namaLengkap String
// prisma:   alamat      String
// prisma:   telepon     String
// prisma:   email       String
// prisma:   tahunBerdiri Int
// prisma:   pendiri     String?
// prisma:   mapsEmbedUrl String?
// prisma:   socialMedia SocialMediaItem[]
// prisma: }
export interface SiteConfig {
  nama: string;
  namaLengkap: string;
  alamat: string;
  telepon: string;
  email: string;
  tahunBerdiri: number;
  pendiri: string;
  mapsEmbedUrl: string;
  socialMedia: SocialMediaItem[];
}

export interface SocialMediaItem {
  platform: "facebook" | "instagram" | "whatsapp" | "tiktok" | "youtube";
  url: string;
  label: string;
}

// prisma: model NavigationItem {
// prisma:   id    String @id @default(cuid())
// prisma:   label String
// prisma:   href  String
// prisma:   order Int
// prisma: }
export interface NavigationItem {
  label: string;
  href: string;
  order: number;
}

// prisma: model HeroSlide {
// prisma:   id        String  @id @default(cuid())
// prisma:   imageUrl  String
// prisma:   imageAlt  String
// prisma:   judul     String
// prisma:   subJudul  String?
// prisma:   badge     String?
// prisma: }
export interface HeroSlide {
  id: string;
  imageUrl: string;
  imageAlt: string;
  judul: string;
  subJudul?: string;
  badge?: string;
}

// prisma: model Service {
// prisma:   id        String  @id @default(cuid())
// prisma:   slug      String  @unique
// prisma:   nama      String
// prisma:   deskripsi String
// prisma:   ikonName  String
// prisma:   urutan    Int
// prisma: }
export interface Service {
  id: string;
  slug: string;
  nama: string;
  deskripsi: string;
  ikonName: string;
  urutan: number;
}

// prisma: model StaffMember {
// prisma:   id        String  @id @default(cuid())
// prisma:   kategori  String
// prisma:   nama      String?
// prisma:   fotoUrl   String?
// prisma: }
export interface StaffMember {
  id: string;
  kategori: StaffCategory;
  nama?: string;
  fotoUrl?: string;
}

export type StaffCategory =
  | "dokter-umum"
  | "dokter-gigi"
  | "bidan"
  | "perawat"
  | "apoteker"
  | "tenaga-teknis-kefarmasian"
  | "tenaga-rekam-medis"
  | "fisioterapis"
  | "tenaga-kebersihan";

// prisma: model StaffStructure {
// prisma:   id       String @id @default(cuid())
// prisma:   kategori String @unique
// prisma:   label    String
// prisma:   jumlah   Int
// prisma: }
export interface StaffStructure {
  kategori: StaffCategory;
  label: string;
  jumlah: number;
}

// prisma: model Schedule {
// prisma:   id          String @id @default(cuid())
// prisma:   poliId      String
// prisma:   doctorName  String
// prisma:   hari        String
// prisma:   jamMulai    String
// prisma:   jamSelesai  String
// prisma: }
export interface Schedule {
  id: string;
  poliId: string;
  doctorName: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
}

// prisma: model GalleryItem {
// prisma:   id        String  @id @default(cuid())
// prisma:   judul     String
// prisma:   imageUrl  String
// prisma:   imageAlt  String
// prisma:   kategori  String
// prisma: }
export interface GalleryItem {
  id: string;
  judul: string;
  imageUrl: string;
  imageAlt: string;
  kategori: "ruang-tunggu" | "ugd" | "poli" | "penyuluhan" | "lainnya";
}

// prisma: model ClinicContent {
// prisma:   id            String @id @default(cuid())
// prisma:   sejarah       SejarahMilestone[]
// prisma:   visi          String
// prisma:   misi          String[]
// prisma:   moto          String?
// prisma:   jamOperasional String
// prisma:   profilSingkat String
// prisma: }
export interface ClinicContent {
  sejarah: SejarahMilestone[];
  visi: string;
  misi: string[];
  moto?: string;
  jamOperasional: string;
  profilSingkat: string;
}

export interface SejarahMilestone {
  tahun: number;
  judul: string;
  deskripsi: string;
}

// prisma: model FooterLink {
// prisma:   id    String @id @default(cuid())
// prisma:   label String
// prisma:   href  String
// prisma: }
export interface FooterLink {
  label: string;
  href: string;
}
