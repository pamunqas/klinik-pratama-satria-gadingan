# Klinik Pratama Satria Gadingan — Landing Page

Landing Page resmi **Klinik Pratama Satria Gadingan Yogyakarta** — fasilitas
pelayanan kesehatan tingkat pertama di Kabupaten Sleman, DIY. Aplikasi Next.js
(App Router) + TypeScript + Tailwind CSS dengan arsitektur **CMS-ready** (lapisan
konten terpisah dari UI).

## Quick Start

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan dev server (http://localhost:3000)
npm run dev

# 3. Build produksi
npm run build

# 4. Typecheck + lint
npm run typecheck
npm run lint

# 5. Unit tests
npm test
```

Target deployment: **Vercel**. Tidak perlu Dockerfile.

## Struktur Direktori

```
klinik/
├── public/
│   └── logo.png              # Logo klinik (1.4MB, aset dari owner)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout, metadata, Inter font
│   │   ├── page.tsx          # Komposisi semua section
│   │   ├── globals.css       # Tailwind v4 theme tokens
│   │   ├── sitemap.ts        # Sitemap dinamis
│   │   └── robots.ts         # robots.txt dinamis
│   ├── components/
│   │   ├── layout/           # Header (sticky), Footer
│   │   ├── sections/         # HeroCarousel, ProfileSection, ServiceGrid,
│   │   │                     #   DoctorGrid, ScheduleTable, GalleryGrid
│   │   ├── cards/            # ServiceCard
│   │   └── icons.tsx         # Inline SVG icons (no UI library)
│   ├── data/                 # ⚙️  LAPISAN KONTEN (CMS-ready)
│   │   ├── siteConfig.ts     # Identitas, alamat, telepon, email, medsos
│   │   ├── navigation.ts     # Item navigasi header
│   │   ├── clinicContent.ts  # Sejarah, visi, misi, profil
│   │   ├── heroSlides.ts     # 2 slide hero carousel
│   │   ├── services.ts       # 10 layanan a–j
│   │   ├── doctors.ts        # Struktur 16 staf + placeholder individu
│   │   ├── schedules.ts      # Jadwal praktik
│   │   ├── gallery.ts        # Galeri fasilitas
│   │   └── footerLinks.ts    # Tautan footer
│   ├── types/
│   │   └── content.ts        # Interface Prisma-ready + komentar // prisma:
│   ├── lib/
│   │   └── utils.ts          # cn(), helpers
│   └── __tests__/
│       ├── setup.ts          # jest-dom setup
│       └── content.test.ts   # Snapshot test konten
├── scripts/
│   ├── check-hard-negative.sh       # Gate: tidak ada booking/pendaftaran
│   └── check-placeholder-scope.sh   # Gate: [Contoh] hanya di sub-field placeholder
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── vitest.config.ts
├── package.json
└── README.md
```

## Swap-Sample Cheatsheet untuk Admin

Semua konten ada di `src/data/*.ts` dan TIDAK tersentuh kode komponen.
Untuk update konten, edit file yang sesuai:

| Update | Lokasi | Field |
|---|---|---|
| Ganti nama klinik / alamat / telepon / email | `src/data/siteConfig.ts` | `nama`, `alamat`, `telepon`, `email` |
| Ganti Maps embed | `src/data/siteConfig.ts` | `mapsEmbedUrl` |
| Tambah / ganti akun medsos | `src/data/siteConfig.ts` | `socialMedia[]` |
| Ganti item navigasi header | `src/data/navigation.ts` | array `navigation` |
| Update profil / sejarah / visi / misi | `src/data/clinicContent.ts` | `profilSingkat`, `sejarah[]`, `visi`, `misi[]` |
| Ganti jam operasional | `src/data/clinicContent.ts` | `jamOperasional` |
| Tambah / ganti slide hero | `src/data/heroSlides.ts` | array `heroSlides` |
| Tambah / ganti layanan | `src/data/services.ts` | array `services` |
| Update struktur tim medis (kategori & jumlah) | `src/data/doctors.ts` | array `staffStructure` |
| Set nama individu dokter (saat ini `[Contoh]`) | `src/data/doctors.ts` | array `individualStaff` |
| Update jadwal praktik | `src/data/schedules.ts` | array `schedules` |
| Tambah / ganti gambar galeri | `src/data/gallery.ts` | array `gallery` |

### Grep placeholder untuk review

Field yang masih placeholder (perlu diisi admin) ber-prefix `[Contoh]`:

```bash
grep -RIn "\[Contoh\]" src/data/
```

**PENTING:** Prefix `[Contoh]` hanya boleh muncul di sub-field placeholder
(nama individu dokter, jadwal spesifik, foto, medsos). Field terverifikasi
(overview, sejarah, visi, misi, daftar 10 layanan, struktur 16 staf, kalimat
Mobile JKN, alamat) **tidak boleh** diedit tanpa update sumber resmi.

Verifikasi otomatis:

```bash
npm run check:hard-negative      # tidak ada booking/pendaftaran daring
npm run check:placeholder-scope  # [Contoh] hanya di sub-field placeholder
npm run check:all                # ketiganya + typecheck
```

## Sumber Data Terverifikasi

Konten terverifikasi (overview, sejarah 2002/2010/2017, visi, misi, 10 layanan,
struktur 16 staf medis, status BPJS+JKN+walk-in) bersumber dari dokumen internal
klinik (`clinic-info.md` di folder `.omc/plexicus/`). Salin dan perbarui
`src/data/*.ts` jika dokumen sumber direvisi.

## Deploy ke Vercel

```bash
# Cara termudah: hubungkan repo ke Vercel dashboard, set root directory = repo ini.
# Atau via CLI:
npm i -g vercel
vercel

# Set environment variable (opsional):
# NEXT_PUBLIC_SITE_URL=https://klinik-satria-gadingan.co.id
```

`next.config.ts` sudah mengonfigurasi `images.remotePatterns` untuk
`images.unsplash.com`, sehingga placeholder Unsplash dapat di-`next/image`
dengan aman. `sitemap.ts` dan `robots.ts` di-generate otomatis saat build.

## Aksesibilitas

- Kontras sesuai WCAG AA (palette brand sudah di-tuned).
- Body text 16px.
- Label ARIA pada ikon interaktif.
- Fokus terlihat (outline primary-dark + offset).
- Hero carousel mendukung autoplay 6 detik dengan tombol jeda & pemutaran,
  pause on hover, dan kontrol manual swipe/klik.
- Tabel jadwal responsif dengan sticky first column untuk lansia di mobile.
- Header sticky dengan anchor navigation yang halus (`scroll-behavior: smooth`).

## Migrasi ke CMS (opsional, masa depan)

Interface di `src/types/content.ts` diberi komentar `// prisma:` per field
sehingga siap dimigrasi ke:

```prisma
model Service {
  id        String  @id @default(cuid())
  slug      String  @unique
  nama      String
  deskripsi String
  ikonName  String
  urutan    Int
}
// ... dst.
```

Untuk integrasi CMS (mis. Sanity, Strapi, Payload), cukup ubah `src/data/*.ts`
menjadi loader yang memanggil API CMS di server component, tanpa menyentuh
komponen UI.

## Lisensi & Kredit

© Klinik Pratama Satria Gadingan. Berdiri sejak 2002.
