import type { SiteConfig } from "@/types/content";

/**
 * Konfigurasi situs klinik — sumber kebenaran tunggal untuk identitas, alamat, kontak.
 * Field terverifikasi dari clinic-info.md §1; phone/email placeholder yang ditentukan spec.
 * socialMedia dan mapsEmbedUrl tetap `[Contoh]` untuk diisi admin.
 */
export const siteConfig: SiteConfig = {
  nama: "Klinik Pratama Satria Gadingan",
  namaLengkap: "Klinik Pratama Satria Gadingan Yogyakarta",
  alamat: "Jl. Kaliurang Km 10,9, Gadingan, RT 01/RW 07, Kelurahan Sinduharjo, Kecamatan Ngaglik, Kabupaten Sleman, Daerah Istremewa Yogyakarta",
  telepon: "[Contoh] 0274-123456",
  email: "[Contoh] info@klinik-satria.com",
  tahunBerdiri: 2002,
  pendiri: "dr. A. Eki Dewanti",
  mapsEmbedUrl: "[Contoh] https://www.google.com/maps?q=Jl.+Kaliurang+Km+10%2C9+Gadingan+Sinduharjo+Ngaglik+Sleman+DIY&output=embed",
  socialMedia: [
    { platform: "facebook", url: "[Contoh] https://facebook.com/", label: "Facebook" },
    { platform: "instagram", url: "[Contoh] https://instagram.com/", label: "Instagram" },
    { platform: "whatsapp", url: "[Contoh] https://wa.me/62", label: "WhatsApp" },
  ],
};
