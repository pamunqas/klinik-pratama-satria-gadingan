# Klinik Pratama Satria Gadingan — Technical Documentation

> **Dokumentasi teknis lengkap** untuk landing page Next.js Klinik Pratama Satria Gadingan Yogyakarta. Dokumen ini ditulis untuk developer dan admin klinik yang akan merawat, memperluas, atau memigrasi sistem ke CMS di masa depan.

| | |
|---|---|
| **Versi dokumen** | 1.0.0 |
| **Tanggal** | 2026-09-28 |
| **Status proyek** | Siap deploy ke Vercel |
| **Repositori** | (belum diinisialisasi sebagai git repo — lihat prompt push di `.omc/plexicus/.../github-push-prompt.md`) |

---

## Daftar Isi

1. [Gambaran Umum](#1-gambaran-umum)
2. [Stack & Keputusan Arsitektur](#2-stack--keputusan-arsitektur)
3. [Struktur Direktori](#3-struktur-direktori)
4. [Lapisan Data (CMS-Ready)](#4-lapisan-data-cms-ready)
5. [Sistem Tipe (TypeScript)](#5-sistem-tipe-typescript)
6. [Lapisan Komponen](#6-lapisan-komponen)
7. [Routing & Rendering](#7-routing--rendering)
8. [SEO & Metadata](#8-seo--metadata)
9. [Aksesibilitas (A11y)](#9-aksesibilitas-a11y)
10. [Pipeline CI: Gate Hard-Negative & Placeholder Scope](#10-pipeline-ci-gate-hard-negative--placeholder-scope)
11. [Pengujian](#11-pengujian)
12. [Konfigurasi Build & Deploy](#12-konfigurasi-build--deploy)
13. [Panduan Swap-Konten untuk Admin](#13-panduan-swap-konten-untuk-admin)
14. [Migrasi ke CMS / Prisma](#14-migrasi-ke-cms--prisma)
15. [Troubleshooting](#15-troubleshooting)
16. [Referensi](#16-referensi)

---

## 1. Gambaran Umum

**Klinik Pratama Satria Gadingan Yogyakarta** adalah fasilitas pelayanan
kesehatan tingkat pertama di Kabupaten Sleman, DIY. Landing page ini
menggantikan ketiadaan situs resmi dengan:

- Informasi profil klinik (sejarah sejak 2002, visi, misi).
- Daftar 10 layanan (poli umum, gigi, KIA, KB, USG, fisioterapi, lab, dll.).
- Struktur 16 tenaga medis profesional.
- Jadwal praktik dokter (placeholder, admin akan isi).
- Galeri fasilitas.
- Footer dengan alamat, kontak, tautan media sosial, dan peta Google Maps.

### Karakteristik produk

- **Statis + dinamis ringan.** Tidak ada database, tidak ada antarmuka admin
  built-in, tidak ada alur booking — hanya informasi. Pendaftaran pasien
  tetap **walk-in** atau via aplikasi **Mobile JKN** (diinformasikan sebagai
  teks statis, bukan tombol).
- **Adaptif & inklusif.** Tipografi 16px, kontras WCAG AA, label ARIA pada
  ikon, fokus terlihat, sticky header dengan anchor navigation yang halus.
- **CMS-ready.** Seluruh konten ada di `src/data/*.ts` (TypeScript modules
  dengan `export const`). Interface di `src/types/content.ts` disiapkan 1:1
  dengan model Prisma masa depan (tanpa runtime Prisma untuk saat ini).

### Batasan eksplisit (non-goal)

- ❌ Tidak ada tombol "Booking" / "Buat Janji Temu" / formulir pendaftaran.
- ❌ Tidak ada CMS live, database, atau Prisma runtime.
- ❌ Tidak ada dark mode (light-mode-only, sesuai palette brand).
- ❌ Tidak ada i18n (situs satu bahasa: Bahasa Indonesia).
- ❌ Tidak ada analytics, A/B testing, atau SEO lanjutan.
- ❌ Tidak ada integrasi Mobile JKN API atau pembayaran.

---

## 2. Stack & Keputusan Arsitektur

| Layer | Pilihan | Versi | Alasan |
|---|---|---|---|
| Framework | **Next.js App Router** | 14.2.x | Static generation + dynamic metadata; native file-based routing; sitemap/robots generators. |
| Bahasa | **TypeScript strict** | 5.6+ | Type safety end-to-end; interface `src/types/content.ts` Prisma-ready. |
| Styling | **Tailwind CSS v3** | 3.4.x | Utility-first; tidak ada CSS-in-JS runtime; kompatibel lama & stabil. (Versi 4 dihindari karena API `@theme inline` masih beta di awal 2026.) |
| Font | **Inter via `next/font/google`** | latest | Sans-serif clean, ramah lansia, swap display. |
| Test | **Vitest + RTL + happy-dom** | 2.1+ | Cepat, ESM-native, ekosistem solid. |
| Image | **`next/image`** | built-in | Lazy load + remote patterns untuk Unsplash. |
| Deploy | **Vercel** | n/a | Zero-config untuk Next.js; ISR + edge functions. |

### Alternatif yang ditolak

| Opsi | Alasan penolakan |
|---|---|
| **MDX** untuk konten | Type narrowing hilang untuk entitas terstruktur (10 layanan, 16 dokter, jadwal). Admin juga kurang familier dengan MDX dibanding JSON/TS. |
| **JSON statis** | Type safety hilang. `tsc --noEmit` tidak bisa catch placeholder drift. |
| **CMS headless (Sanity/Strapi/Payload)** | Diluar scope. Interface sudah Prisma-ready untuk migrasi nanti. |
| **Tailwind v4** | `@theme inline` API masih beta; Tailwind v3 lebih stabil untuk交付 produksi. |
| **shadcn/ui / MUI / Chakra** | Brief menentukan tanpa UI library. Inline SVG ikon cukup. |

---

## 3. Struktur Direktori

```
klinik/
├── public/
│   └── logo.png                    # Logo klinik (1.38 MB, aset asli owner)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout + metadata + Inter font
│   │   ├── page.tsx                # Komposisi semua section
│   │   ├── globals.css             # Tailwind base/components/utilities
│   │   ├── sitemap.ts              # Sitemap dinamis (next-sitemap-style)
│   │   └── robots.ts               # robots.txt dinamis
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Sticky header + nav + logo
│   │   │   └── Footer.tsx          # Footer primary-dark + kontak + Maps
│   │   ├── sections/
│   │   │   ├── HeroCarousel.tsx    # 2-slide carousel (autoplay 6s)
│   │   │   ├── ProfileSection.tsx  # Profil + sejarah + visi/misi
│   │   │   ├── ServiceGrid.tsx     # Grid 10 layanan (a–j)
│   │   │   ├── DoctorGrid.tsx      # Konsolidasi Tim Medis (16 staf)
│   │   │   ├── ScheduleTable.tsx   # Tabel jadwal (sticky first col)
│   │   │   └── GalleryGrid.tsx     # Galeri masonry
│   │   ├── cards/
│   │   │   └── ServiceCard.tsx     # Kartu layanan individual
│   │   └── icons.tsx               # Inline SVG ikon (zero deps)
│   ├── data/                       # ⚙️  LAPISAN KONTEN (CMS-READY)
│   │   ├── siteConfig.ts           # Identitas, alamat, telepon, email, medsos
│   │   ├── navigation.ts           # Item navigasi header (anchor)
│   │   ├── clinicContent.ts        # Sejarah, visi, misi, profil
│   │   ├── heroSlides.ts           # 2 slide hero
│   │   ├── services.ts             # 10 layanan a–j
│   │   ├── doctors.ts              # Struktur 16 staf + placeholder individu
│   │   ├── schedules.ts            # Jadwal praktik (semua [Contoh])
│   │   ├── gallery.ts              # Galeri fasilitas
│   │   └── footerLinks.ts          # Tautan footer
│   ├── types/
│   │   └── content.ts              # 10 interface Prisma-ready
│   ├── lib/
│   │   └── utils.ts                # cn(), totalStaff(), helpers
│   └── __tests__/
│       ├── setup.ts                # jest-dom matchers
│       └── content.test.ts         # Snapshot test konten (11 test)
├── scripts/
│   ├── check-hard-negative.sh      # CI gate: tidak ada booking/pendaftaran
│   └── check-placeholder-scope.sh  # CI gate: [Contoh] whitelist
├── tailwind.config.ts              # Theme tokens (brand palette)
├── postcss.config.mjs              # Tailwind + autoprefixer
├── next.config.mjs                 # images.remotePatterns untuk Unsplash
├── tsconfig.json                   # Strict mode + path alias @/*
├── vitest.config.ts                # vitest + RTL + happy-dom
├── package.json                    # Scripts: dev/build/start/lint/typecheck/test
├── .gitignore                      # Excludes: node_modules, .next, .omc/, dll.
├── README.md                       # User-facing guide (admin-friendly)
└── TECHNICAL_DOCUMENTATION.md      # ← dokumen ini
```

**Total:** 30 file source, 1.557 baris TS/TSX (sebelum optimasi), 1 aset gambar.

---

## 4. Lapisan Data (CMS-Ready)

### Prinsip

> "Seluruh string domain berada di `src/data/*.ts`. Komponen UI tidak
> pernah menulis string domain secara hardcoded."

Setiap file `src/data/*.ts` mengekspor objek TypeScript dengan `export const`.
Tipe-nya diimpor dari `src/types/content.ts`. Komponen hanya me-render
data, tidak pernah membuat string baru.

### File-by-file overview

| File | Export | Tanggung jawab |
|---|---|---|
| `siteConfig.ts` | `siteConfig: SiteConfig` | Nama klinik, alamat, telepon, email, tahun berdiri, pendiri, embed Maps, medsos. |
| `navigation.ts` | `navigation: NavigationItem[]` | 6 item nav dengan anchor href ke section ID. |
| `clinicContent.ts` | `clinicContent: ClinicContent` | `sejarah[]` (3 milestone), `visi` (verbatim), `misi[]` (5 poin), `profilSingkat`, `jamOperasional`. |
| `heroSlides.ts` | `heroSlides: HeroSlide[]` | 2 slide; slide 1 badge "Buka 24 Jam", sub-judul memuat kalimat Mobile JKN. |
| `services.ts` | `services: Service[]` | Tepat 10 entri (a–j) dengan `urutan: 1..10` dan `ikonName` untuk memetakan ke `src/components/icons.tsx`. |
| `doctors.ts` | `staffStructure: StaffStructure[]`, `individualStaff: StaffMember[]` | 9 kategori dengan `jumlah: 4+2+2+3+1+1+1+1+1 = 16`; 16 placeholder individu (saat ini `[Contoh]`). |
| `schedules.ts` | `schedules: Schedule[]` | 11 entri placeholder jadwal praktik. |
| `gallery.ts` | `gallery: GalleryItem[]` | 6 item masonry (Ruang Tunggu, UGD, Poli Gigi, Penyuluhan, Ruang Konsultasi, Lobby). |
| `footerLinks.ts` | `footerLinks: FooterLink[]` | 6 tautan (sama dengan navigation, untuk konsistensi). |

### Content sourcing matrix

Konten dipilah menjadi dua kategori:

| Kategori | Sumber | Prefiks `[Contoh]` | Contoh field |
|---|---|---|---|
| **Verified** | `clinic-info.md` (dokumen internal klinik) | ❌ tidak boleh | overview klinik, sejarah 2002/2010/2017, visi, misi, 10 layanan, struktur 16 staf, kalimat Mobile JKN, alamat, tahun berdiri. |
| **Placeholder** | Akan diisi admin | ✅ `[Contoh]` | nama individu dokter (×16), foto individu (×16), jadwal spesifik (poli, hari, jam), URL medsos spesifik, telepon spesifik jika ada update, email spesifik, Maps embed spesifik. |

**Cara baca matrix di production code:**

```ts
// ✅ Boleh [Contoh] (sub-field placeholder)
export const siteConfig: SiteConfig = {
  telepon: "[Contoh] 0274-123456",  // placeholder until admin updates
  email: "[Contoh] info@klinik-satria.com",
  mapsEmbedUrl: "[Contoh] https://...",
  socialMedia: [{ url: "[Contoh] https://instagram.com/" }], // ...
};

// ❌ Tidak boleh [Contoh] (field terverifikasi)
export const services: Service[] = [
  {
    nama: "Pelayanan Kesehatan Umum",  // ← dari clinic-info.md §3a, tidak boleh [Contoh]
    deskripsi: "Pemeriksaan dan konsultasi...",  // ← verified
    ...
  },
];
```

CI gate `scripts/check-placeholder-scope.sh` secara otomatis menolak setiap
kemunculan `[Contoh]` di file terverifikasi (`clinicContent.ts`,
`services.ts`, `navigation.ts`, `footerLinks.ts`).

---

## 5. Sistem Tipe (TypeScript)

### Mode strict

`tsconfig.json` diaktifkan dalam mode `strict: true` dengan tambahan:
- `noEmit: true` (TypeScript hanya untuk type-checking, build dilakukan Next.js).
- `isolatedModules: true`.
- `jsx: "preserve"` (Next.js akan compile JSX).
- Path alias `@/* → ./src/*`.

### Interface definitions

`src/types/content.ts` mendefinisikan 10 interface dengan komentar `// prisma:`
per field yang memetakan ke model Prisma masa depan:

```ts
/**
 * SETIAP INTERFACE DIBERI KOMENTAR `// prisma:` yang memetakan field
 * ke model Prisma masa depan. TIDAK ada runtime Prisma; hanya shape.
 */

// prisma: model SiteConfig {
// prisma:   id          String   @id @default(cuid())
// prisma:   nama        String
// prisma:   namaLengkap String
// prisma:   ...
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
```

Daftar lengkap interface:

| Interface | Field kunci | Model Prisma target |
|---|---|---|
| `SiteConfig` | nama, alamat, telepon, email, tahunBerdiri, pendiri, mapsEmbedUrl, socialMedia | `SiteConfig` + `SocialMediaItem` |
| `NavigationItem` | label, href, order | `NavigationItem` |
| `HeroSlide` | imageUrl, imageAlt, judul, subJudul?, badge? | `HeroSlide` |
| `Service` | id, slug, nama, deskripsi, ikonName, urutan | `Service` |
| `StaffMember` | id, kategori, nama?, fotoUrl? | `StaffMember` |
| `StaffStructure` | kategori, label, jumlah | `StaffStructure` |
| `Schedule` | poliId, doctorName, hari, jamMulai, jamSelesai | `Schedule` |
| `GalleryItem` | judul, imageUrl, imageAlt, kategori | `GalleryItem` |
| `ClinicContent` | sejarah[], visi, misi[], moto?, jamOperasional, profilSingkat | `ClinicContent` + `SejarahMilestone` |
| `FooterLink` | label, href | `FooterLink` |

### Type safety contracts

- **Tidak ada `any`** di `src/types/`.
- Array tipe union seperti `StaffCategory` di-narrow di komponen (bukan di data layer) — kesalahan akan terdeteksi saat build, bukan saat runtime.
- Fungsi helper di `src/lib/utils.ts` (`cn`, `totalStaff`, `formatHari`) diketik dengan teliti.

---

## 6. Lapisan Komponen

### Hierarki

```
<RootLayout>                       ─── src/app/layout.tsx
  └─ <Home>                        ─── src/app/page.tsx (server component)
      ├─ <Header>                  ─── src/components/layout/Header.tsx (client)
      ├─ <main>
      │   ├─ <HeroCarousel>        ─── sections/HeroCarousel.tsx (client)
      │   ├─ <ProfileSection>      ─── sections/ProfileSection.tsx (server)
      │   ├─ <ServiceGrid>         ─── sections/ServiceGrid.tsx (server)
      │   │   └─ <ServiceCard>×10  ─── cards/ServiceCard.tsx (server)
      │   ├─ <DoctorGrid>          ─── sections/DoctorGrid.tsx (server)
      │   ├─ <ScheduleTable>       ─── sections/ScheduleTable.tsx (server)
      │   └─ <GalleryGrid>         ─── sections/GalleryGrid.tsx (server)
      └─ <Footer>                  ─── layout/Footer.tsx (server)
```

### Server vs client components

| Komponen | Tipe | Alasan |
|---|---|---|
| `Header` | Client | `useState` + `useEffect` untuk sticky shadow saat scroll. |
| `HeroCarousel` | Client | State untuk active slide, playing state, hover pause, autoplay timer. |
| `ProfileSection`, `ServiceGrid`, `DoctorGrid`, `ScheduleTable`, `GalleryGrid`, `Footer`, `ServiceCard` | Server | Render murni dari data, tidak ada interaksi. Server-rendered untuk SEO dan bundle size. |

### Komponen kritis

#### `HeroCarousel.tsx`

Implementasi WCAG 2.2.2 (Pause/Stop/Hide untuk animasi >5 detik):

- **Autoplay:** 6 detik per slide (`intervalMs = 6000`).
- **Pause otomatis:** Saat `onMouseEnter` dari section.
- **Tombol pause/play eksplisit:** Toggle state `playing`.
- **Tombol prev/next:** Navigasi manual via chevron icon button.
- **Dot indicators:** Klik langsung ke slide `i`.
- **State management:** `useState` untuk `active`, `playing`, `pausedByHover`; `useRef` untuk timer ID; cleanup pada unmount.
- **A11y:** Setiap tombol punya `aria-label`. Slide non-aktif diberi `aria-hidden`.

#### `ScheduleTable.tsx`

Responsivitas mobile-first:

- **Container:** `overflow-x-auto` untuk scroll horizontal di layar sempit.
- **Sticky first column:** `<th scope="col" className="sticky left-0 z-10">` untuk kolom Poli di-scroll mengikuti saat scroll horizontal.
- **Bg kontras:** `<thead>` latar `bg-primary-dark` teks `surface-soft`; `<tbody>` dividers `divide-border-soft`.
- **Sortable (manual):** Entri di-sort client-side berdasarkan hari (Senin, Selasa, ..., Minggu, "Senin–Sabtu"), lalu jam mulai.

#### `ProfileSection.tsx`

Layout 2-kolom + sidebar:

- **Kolom utama:** Timeline sejarah (2002 → 2010 → 2017) + box sand-yellow
  untuk visi (block quote italic) + misi (ordered list a–e).
- **Sidebar:** 4 info ringkas (Jam Operasional, Alamat, Tahun Berdiri, Status
  BPJS).

#### `DoctorGrid.tsx` (D4 stage decision)

Implementasi D4 dari stage 3 (penggabungan 16 staf medis jadi 1 kartu):

- **Kartu utama:** "Tim Medis Klinik Satria" dengan subtitle "16 tenaga
  medis profesional".
- **Sub-grid:** 9 kategori (Dokter Umum 4, Dokter Gigi 2, Bidan 2, Perawat
  3, Apoteker 1, Teknis Kefarmasian 1, Rekam Medis 1, Fisioterapis 1,
  Kebersihan 1) ditampilkan sebagai `<dl>` dengan border peach lembut.
- **Footer kartu:** Border-top peach lembut sebagai garis bawah aksen.

#### `GalleryGrid.tsx`

CSS columns untuk masonry:

- `columns-1 sm:columns-2 lg:columns-3` (responsif).
- Tiap `<figure>` dapat `break-inside-avoid` agar tidak terpotong.
- Aspect ratio divariasikan (`4/3`, `3/4`, `1/1`) untuk efek visual masonry.
- `next/image` dengan `fill` + `sizes="(min-width: 1024px) 33vw, ..."`.

---

## 7. Routing & Rendering

### File-based routing (App Router)

| Path | File | Jenis |
|---|---|---|
| `/` | `src/app/page.tsx` | Static (default) |
| `/robots.txt` | `src/app/robots.ts` | Static (`force-static`) |
| `/sitemap.xml` | `src/app/sitemap.ts` | Static (`force-static`) |
| `/_not-found` | implicit | Static (Next.js auto-generates) |

### Rendering strategy

Seluruh halaman menggunakan **Static Site Generation (SSG)** — konten
di-pre-render saat `next build`. Tidak ada ISR atau SSR dinamis untuk saat
ini (konten statis dari `src/data/`).

```text
Route (app)                              Size     First Load JS
┌ ○ /                                    7.42 kB        94.5 kB
├ ○ /_not-found                          875 B            88 kB
├ ○ /robots.txt                          0 B                0 B
└ ○ /sitemap.xml                         0 B                0 B
```

Output bundle kecil (94.5 kB First Load JS untuk halaman utama) — Lighthouse
mobile Performance kemungkinan ≥80.

### Environment variables

| Var | Default | Kapan di-set |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://klinik-satria-gadingan.vercel.app` | Saat deploy ke domain sendiri (mis. `klinik-satria.co.id`). |

---

## 8. SEO & Metadata

### Metadata di `layout.tsx`

- **Title template:** `%s | Klinik Pratama Satria Gadingan` (default = nama lengkap).
- **Description:** ~155 karakter, menyebut layanan utama + 24 jam + BPJS.
- **Open Graph:** `locale: "id_ID"`, type `website`, image `/logo.png`.
- **Twitter Card:** `summary_large_image`, image `/logo.png`.
- **Robots:** index + follow.
- **Viewport:** `width=device-width, initial-scale=1`, `themeColor: #2E7D5B`.

### Sitemap (`src/app/sitemap.ts`)

6 entri URL dengan anchor:

```ts
[
  { url: '/',            priority: 1.0 },
  { url: '/#profil',     priority: 0.8 },
  { url: '/#layanan',    priority: 0.8 },
  { url: '/#dokter',     priority: 0.6 },
  { url: '/#galeri',     priority: 0.6 },
  { url: '/#kontak',     priority: 0.7 },
]
```

### Robots (`src/app/robots.ts`)

```ts
rules: [{ userAgent: '*', allow: '/' }],
sitemap: `${BASE_URL}/sitemap.xml`,
```

### Catatan SEO

- **Single-page dengan anchor** kehilangan granularitas long-tail SEO (mis.
  "dokter gigi Kaliurang"). Architect note di stage 2 mengakui trade-off
  ini dan memutuskan konsisten dengan non-goal "tidak ada SEO lanjutan".
  Untuk ekspansi SEO, pertimbangkan multi-route di fase 2.

---

## 9. Aksesibilitas (A11y)

### WCAG 2.1/2.2 compliance (level AA)

| Kriteria | Implementasi |
|---|---|
| **1.4.3 Contrast (Minimum)** | Palette brand di-tune untuk kontras ≥4.5:1 teks-body ke background. |
| **1.4.4 Resize Text** | Body 16px (≥16px requirement terpenuhi). Tipografi Tailwind responsif. |
| **1.4.10 Reflow** | Semua section responsif; tidak ada overflow horizontal di mobile (kecuali `ScheduleTable` yang memang di-scroll horizontal eksplisit). |
| **1.4.11 Non-text Contrast** | Border, ikon, dan garis bawah divisualisasikan dengan token `border-soft` (#DCE3E5) — kontras ≥3:1 ke background. |
| **1.4.12 Text Spacing** | Tidak ada line-height override; padding section generous (py-16 md:py-24). |
| **1.4.13 Content on Hover/Focus** | Tooltip tidak digunakan; hover state murni visual. |
| **2.1.1 Keyboard** | Semua interaksi (nav, carousel pause, dot indicator) accessible via Tab + Enter/Space. |
| **2.2.2 Pause, Stop, Hide** | Hero carousel: pause on hover, tombol pause/play eksplisit (lihat §6 HeroCarousel). |
| **2.4.1 Bypass Blocks** | Skip-link implisit via anchor nav (`#profil`, `#layanan`, dll.) — anchor merupakan target alami. |
| **2.4.7 Focus Visible** | `*:focus-visible { outline: 2px solid var(--color-primary-dark); outline-offset: 2px; }` di globals.css. |
| **4.1.2 Name, Role, Value** | Setiap `<section>` punya `aria-labelledby`; carousel buttons punya `aria-label`; dot indicators punya `aria-current`. |

### Implementasi teknis

```css
/* globals.css */
html { font-size: 16px; scroll-behavior: smooth; }
body {
  background-color: #FDFDFC;
  color: #333B3D;
  -webkit-font-smoothing: antialiased;
}
*:focus-visible {
  outline: 2px solid #2E7D5B;
  outline-offset: 2px;
}
```

```tsx
// Contoh section dengan a11y attributes
<section
  id="beranda"
  aria-label="Sambutan utama"
  className="relative h-[480px] ..."
>
  ...
  <button
    type="button"
    aria-label="Jeda carousel"
    onClick={() => setPlaying((p) => !p)}
  >
    ...
  </button>
</section>
```

### Testing

- ✅ Lighthouse Accessibility ≥90 (target, belum diverifikasi otomatis — lihat residual U1).
- 🟡 Manual test dengan screen reader (VoiceOver/NVDA) direkomendasikan.

---

## 10. Pipeline CI: Gate Hard-Negative & Placeholder Scope

Dua shell script gate yang harus exit 0 sebelum merge ke main:

### `scripts/check-hard-negative.sh`

Memastikan **tidak ada elemen booking/pendaftaran daring** di seluruh `src/` dan `scripts/`.

```bash
PATTERN='booking|buat\.janji|appointment|register|pendaftaran\.daring|pendaftaran\.online'
```

- Pakai `git grep` jika repo sudah di-`git init`, atau `grep --exclude-dir=node_modules` jika belum.
- Exit 0 jika nihil; exit 1 jika ditemukan.

### `scripts/check-placeholder-scope.sh`

Memastikan prefiks `[Contoh]` **hanya muncul di sub-field placeholder**, TIDAK di field terverifikasi.

**File yang HARUS bersih** (verified):
- `src/data/clinicContent.ts` (sejarah, visi, misi, profil)
- `src/data/services.ts` (10 layanan a–j verbatim)
- `src/data/navigation.ts` (item nav)
- `src/data/footerLinks.ts` (link footer)

**File yang BOLEH mengandung** `[Contoh]`:
- `src/data/doctors.ts` (nama & foto individu)
- `src/data/schedules.ts` (jadwal spesifik)
- `src/data/heroSlides.ts` (imageUrl Unsplash)
- `src/data/gallery.ts` (imageUrl Unsplash)
- `src/data/siteConfig.ts` (telepon, email, socialMedia, mapsEmbedUrl)

### Integrasi ke CI/CD

Rekomendasi untuk GitHub Actions (untuk dipasang saat repo sudah di-push):

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run check:hard-negative
      - run: npm run check:placeholder-scope
      - run: npm run build
```

---

## 11. Pengujian

### Unit tests (Vitest)

`src/__tests__/content.test.ts` memiliki **11 test** untuk content fidelity:

```text
✓ services memiliki tepat 10 entri (a–j)
✓ services berurutan 1..10
✓ staffStructure total 16 orang (4+2+2+3+1+1+1+1+1)
✓ individualStaff total 16 orang
✓ misi memiliki tepat 5 poin (a–e)
✓ sejarah memiliki 3 milestone (2002, 2010, 2017)
✓ heroSlides memiliki 2 slide (slide 1 badge "Buka 24 Jam")
✓ siteConfig.nama sesuai + pendiri dr. A. Eki Dewanti
✓ gallery minimal 4 item
✓ clinicContent.ts TIDAK mengandung [Contoh] (file-content check)
✓ services.ts TIDAK mengandung [Contoh] (file-content check)
```

### Cara menjalankan

```bash
npm test                # single run
npm run test:watch      # watch mode
```

### Konfigurasi Vitest

`vitest.config.ts`:
- `environment: "happy-dom"` (DOM environment ringan, tanpa browser).
- `setupFiles: ["./src/__tests__/setup.ts"]` (jest-dom matchers).
- `globals: true` (test/expect/describe tanpa import).
- `alias @ → ./src` (path alias sama dengan Next.js).

### Test yang belum diimplementasikan (residual)

Sesuai stage 4 inventory (status `complete` dengan residual U1):

- **Lighthouse mobile** (Performance ≥80, A11y ≥90, BP ≥90, SEO ≥90): belum
  di-setup sebagai CI gate. Bisa ditambahkan dengan `@lhci/cli` + `lighthouserc.json`.
- **Playwright e2e** untuk smoke flow mobile viewport 375×812.
- **axe-core a11y test** di Playwright.

---

## 12. Konfigurasi Build & Deploy

### Build output

```bash
npm run build
```

```text
▲ Next.js 14.2.18

✓ Compiled successfully
✓ Generating static pages (6/6)

Route (app)                              Size     First Load JS
┌ ○ /                                    7.42 kB        94.5 kB
├ ○ /_not-found                          875 B            88 kB
├ ○ /robots.txt                          0 B                0 B
└ ○ /sitemap.xml                         0 B                0 B
```

### Scripts (`package.json`)

| Script | Perintah | Tujuan |
|---|---|---|
| `dev` | `next dev` | Development server dengan HMR di `http://localhost:3000`. |
| `build` | `next build` | Production build. |
| `start` | `next start` | Jalankan production server setelah build. |
| `lint` | `next lint` | ESLint via `eslint-config-next`. |
| `typecheck` | `tsc --noEmit` | TypeScript validation tanpa emit. |
| `test` | `vitest run` | Unit test single run. |
| `test:watch` | `vitest` | Unit test watch mode. |
| `check:hard-negative` | `bash scripts/check-hard-negative.sh` | Gate hard-negative. |
| `check:placeholder-scope` | `bash scripts/check-placeholder-scope.sh` | Gate placeholder. |
| `check:all` | semua gate + typecheck | Full verify. |

### Konfigurasi kritikal

#### `next.config.mjs`

```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
},
```

#### `tailwind.config.ts`

Palette brand didefinisikan dalam `theme.extend.colors`:

```ts
colors: {
  'primary-soft': '#6FB897',
  'primary-dark': '#2E7D5B',
  'surface-soft': '#FDFDFC',
  'surface-pale': '#EAF5EE',
  'accent-peach': '#F6C9B8',
  'accent-sand': '#F5E6C8',
  'text-primary': '#333B3D',
  'text-secondary': '#707B7D',
  'border-soft': '#DCE3E5',
}
```

Font keluarga:

```ts
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
}
```

### Deploy ke Vercel

#### Cara 1: Via Dashboard

1. Push repo ke GitHub (lihat prompt di `.omc/plexicus/.../github-push-prompt.md`).
2. Buka `https://vercel.com/new`.
3. Pilih repo `klinik-pratama-satria-gadingan`.
4. **Root Directory:** kosongkan (default = root).
5. **Build Command:** `npm run build` (default).
6. **Output Directory:** `.next` (default).
7. **Environment Variables:** (opsional) `NEXT_PUBLIC_SITE_URL=https://klinik-satria-gadingan.co.id`.
8. Klik **Deploy**.

#### Cara 2: Via CLI

```bash
npm i -g vercel
vercel login
cd /Users/pamungkas/Documents/klinik
vercel --prod
```

#### Custom Domain

Setelah deploy awal, tambahkan domain di Vercel dashboard:
1. Settings → Domains → Add Domain.
2. Masukkan `klinik-satria-gadingan.co.id`.
3. Ikuti instruksi DNS propagation.

---

## 13. Panduan Swap-Konten untuk Admin

> Panduan ringkas untuk admin klinik yang akan mengedit konten. Versi lengkap dengan tabel tersedia di `README.md`.

Semua konten di **file konfigurasi TypeScript** di `src/data/`. Admin tidak
perlu menulis kode; cukup edit string di file yang relevan.

### Cheatsheet

| Ingin update… | Lokasi file | Field |
|---|---|---|
| Nomor telepon | `src/data/siteConfig.ts` | `telepon` |
| Alamat email | `src/data/siteConfig.ts` | `email` |
| Embed Maps | `src/data/siteConfig.ts` | `mapsEmbedUrl` |
| Akun medsos | `src/data/siteConfig.ts` | `socialMedia[]` |
| Profil singkat | `src/data/clinicContent.ts` | `profilSingkat` |
| Visi | `src/data/clinicContent.ts` | `visi` |
| Poin misi | `src/data/clinicContent.ts` | `misi[]` |
| Slide hero | `src/data/heroSlides.ts` | `heroSlides` |
| Daftar layanan | `src/data/services.ts` | `services[]` |
| Struktur tim medis | `src/data/doctors.ts` | `staffStructure[]` |
| Nama individu dokter | `src/data/doctors.ts` | `individualStaff[]` |
| Jadwal praktik | `src/data/schedules.ts` | `schedules[]` |
| Gambar galeri | `src/data/gallery.ts` | `gallery[]` |

### Workflow ganti placeholder → data resmi

```bash
# 1. Cari semua placeholder yang perlu diisi
grep -RIn "\[Contoh\]" src/data/

# 2. Edit file yang muncul di list

# 3. Verifikasi
npm run check:placeholder-scope   # placeholder scope OK
npm test                            # snapshot test masih pass
npm run build                       # build masih sukses

# 4. (Jika ada logo/foto baru) taruh di public/
cp /path/to/foto-dr-andi.jpg public/staff/
# lalu update `fotoUrl` di src/data/doctors.ts
```

### Urutan prioritas isi placeholder

1. **Medsos spesifik** — klinik biasanya punya Instagram/Facebook resmi.
2. **Nomor telepon & email** — klinik punya kontak resmi.
3. **Embed Maps** — buka Google Maps → Share → Embed → copy URL.
4. **Jadwal praktik** — minta kepala klinik untuk jadwal definitif.
5. **Nama individu dokter** — minta daftar resmi dengan foto.
6. **Foto asli klinik/dokter** — foto oleh staf klinik atau fotografer.

---

## 14. Migrasi ke CMS / Prisma

### Migrasi ke Prisma (DB-driven)

Interface di `src/types/content.ts` sudah disiapkan dengan komentar `// prisma:`
per field. Langkah migrasi:

1. **Tambah Prisma:**

   ```bash
   npm install prisma @prisma/client
   npx prisma init --datasource-provider postgresql
   ```

2. **Copy-paste `schema.prisma`** (auto-generated dari komentar `// prisma:`
   di `src/types/content.ts`):

   ```prisma
   model Service {
     id        String  @id @default(cuid())
     slug      String  @unique
     nama      String
     deskripsi String
     ikonName  String
     urutan    Int
   }
   // ... dst untuk semua model
   ```

3. **Generate client dan migrasi:**

   ```bash
   npx prisma migrate dev --name initial
   ```

4. **Convert `src/data/*.ts` jadi Prisma client loader:**

   ```ts
   // src/data/services.ts (sebelum)
   export const services: Service[] = [ /* 10 hardcoded items */ ];

   // src/data/services.ts (sesudah)
   import { prisma } from '@/lib/prisma';
   export async function getServices(): Promise<Service[]> {
     return prisma.service.findMany({ orderBy: { urutan: 'asc' } });
   }
   ```

5. **Convert komponen** dari sync ke async:

   ```tsx
   // ServiceGrid.tsx (sebelum)
   import { services } from '@/data/services';
   export function ServiceGrid() {
     return <>...{services.map(...)}...</>;
   }

   // ServiceGrid.tsx (sesudah)
   import { getServices } from '@/data/services';
   export async function ServiceGrid() {
     const services = await getServices();
     return <>...{services.map(...)}...</>;
   }
   ```

6. **Seed database** dengan data dari `clinic-info.md` (sudah dalam format
   TypeScript → SQL INSERT mudah).

### Migrasi ke Headless CMS (Sanity/Strapi/Payload)

1. **Definisikan schema di CMS** (Sanity Studio, Strapi collection, atau
   Payload collection) sesuai interface.
2. **Import data existing** dari `src/data/*.ts` ke CMS via:
   - Sanity: `sanity dataset import` dari JSON yang di-generate.
   - Strapi: REST `POST /api/services` per item.
   - Payload: `payload.create({ collection: 'services', data: ... })`.
3. **Ganti `src/data/*.ts`** dengan loader CMS:

   ```ts
   // src/data/services.ts
   import { sanityClient } from '@/lib/sanity';
   export async function getServices(): Promise<Service[]> {
     return sanityClient.fetch(`*[_type == "service"] | order(urutan asc)`);
   }
   ```

4. **Tambahkan admin UI di CMS**, link dari landing page footer (opsional).

**Keuntungan migrasi ke CMS:**
- Admin non-developer bisa edit via UI CMS.
- Versioning konten otomatis.
- Multi-user collaboration.
- Preview draft sebelum publish.

**Trade-off:**
- Tambah infrastruktur (CMS instance, database).
- Tambah latensi (API call vs hardcoded).
- Tambah kompleksitas deployment.

**Rekomendasi:** Tetap pakai `src/data/*.ts` selama admin comfortable edit
file. Migrasi ke CMS hanya jika volume edit meningkat atau perlu multi-role.

---

## 15. Troubleshooting

### Build error: "Module not found" atau import path salah

**Penyebab:** Path alias `@/*` tidak ter-resolve.
**Solusi:** Pastikan `tsconfig.json` punya:

```json
"paths": { "@/*": ["./src/*"] }
```

dan `vitest.config.ts` punya:

```ts
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

### TypeScript error saat `npm run build`

**Penyebab:** Mode strict menemukan type mismatch.
**Solusi:** Jalankan `npm run typecheck` untuk lihat detail. Cek file yang
diubah di `src/data/*.ts` atau `src/components/*.tsx`.

### Hero carousel tidak autoplay

**Penyebab:** Browser policy (mis. Chrome dengan prefers-reduced-motion).
**Solusi:** Default `autoplay` di komponen ini BUKAN `prefers-reduced-motion`.
Jika user men-setting `prefers-reduced-motion: reduce`, hentikan autoplay
(tambahkan check `window.matchMedia` di `useEffect` saat eksekusi).

### Peta Google Maps iframe tidak muncul

**Penyebab:** URL embed mengandung `[Contoh]` prefix (default di `siteConfig.ts`).
**Solusi:** Footer.tsx me-strip prefix `[Contoh]` sebelum dipakai sebagai
`src` iframe. Saat admin isi URL resmi, hilangkan prefix `[Contoh]` di
`mapsEmbedUrl`. Contoh:

```ts
// Sebelum (placeholder)
mapsEmbedUrl: "[Contoh] https://www.google.com/maps?q=...&output=embed",

// Sesudah (URL resmi)
mapsEmbedUrl: "https://www.google.com/maps/embed?pb=...", // tanpa prefix
```

### Logo tidak muncul

**Penyebab:** File `public/logo.png` tidak ada atau path salah.
**Solusi:** Pastikan file ada di `/Users/pamungkas/Documents/klinik/public/logo.png`.
Header.tsx menggunakan `<Image src="/logo.png">` (path absolut dari root publik).

### Hard-negative gate fail saat CI

**Penyebab:** Ada string `booking` / `buat janji` / `pendaftaran` di code.
**Solusi:**
- Cek apakah string di file `scripts/check-hard-negative.sh` (false positive).
- Cek apakah string di komentar README atau doc (tidak boleh, pindah ke file terpisah).
- Jika memang ada di komponen UI, hapus.

### Placeholder-scope gate fail

**Penyebab:** Ada `[Contoh]` di file `clinicContent.ts` atau `services.ts`.
**Solusi:** Hapus prefix `[Contoh]` dari field yang seharusnya verified
(dari `clinic-info.md`). Jika placeholder disengaja, pindahkan ke file
whitelist (`doctors.ts`, `schedules.ts`, dll.).

### Test snapshots fail setelah update data

**Penyebab:** Snapshot test di `content.test.ts` verify jumlah entri
(services.length === 10, doctors.length === 16, dll.).
**Solusi:** Jika Anda menambah/mengurangi entri konten, update ekspektasi
di `src/__tests__/content.test.ts`. Misalnya, jika menambah 1 layanan baru,
ubah `expect(services).toHaveLength(10)` menjadi `toHaveLength(11)`.

---

## 16. Referensi

### Internal

| File | Tujuan |
|---|---|
| `README.md` | User-facing guide (admin-friendly). |
| `.omc/specs/deep-interview-...md` | Spec kristal dari deep interview (4.6% ambiguity). |
| `.omc/plans/ralplan-...md` | Consensus plan iter 2 (critic APPROVED). |
| `.omc/plexicus/.../03-decisions.md` | 4 stage decisions + 6 deferred items. |
| `.omc/plexicus/.../04-engine.md` | Engine report (status complete dengan U1 residual). |
| `.omc/plexicus/.../github-push-prompt.md` | Prompt untuk push ke GitHub di AI lain. |

### External

- [Next.js 14 App Router docs](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS v3 docs](https://v3.tailwindcss.com/docs)
- [Prisma docs](https://www.prisma.io/docs)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Inter font (Google Fonts)](https://fonts.google.com/specimen/Inter)
- [Vitest docs](https://vitest.dev/)

### Changelog

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0.0 | 2026-09-26 | Initial implementation. 30 source files, 11 tests passing, hard-negative + placeholder-scope gates clean, build succeeds (6 static routes). |

---

**© 2026 Klinik Pratama Satria Gadingan. Berdiri sejak 2002.**
