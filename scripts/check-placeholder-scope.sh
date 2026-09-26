#!/usr/bin/env bash
# scripts/check-placeholder-scope.sh
# Memastikan prefiks [Contoh] hanya muncul di sub-field placeholder,
# TIDAK di field terverifikasi (overview, sejarah, visi, misi, daftar layanan,
# struktur tenaga medis, kategori dokter, kalimat Mobile JKN).
#
# Whitelist file yang BOLEH mengandung [Contoh]:
# - src/data/doctors.ts (nama individu & foto staff)
# - src/data/schedules.ts (jadwal spesifik)
# - src/data/heroSlides.ts (imageUrl placeholder Unsplash)
# - src/data/gallery.ts (imageUrl placeholder Unsplash)
# - src/data/siteConfig.ts (telepon, email, socialMedia, mapsEmbedUrl)
#
# File yang HARUS BEBAS dari [Contoh]:
# - src/data/clinicContent.ts (sejarah, visi, misi, profil)
# - src/data/services.ts (10 layanan a–j verbatim)
# - src/data/navigation.ts (item nav terverifikasi)
# - src/data/footerLinks.ts (link footer terverifikasi)

set -euo pipefail

ALLOWED_FILES=(
  "src/data/doctors.ts"
  "src/data/schedules.ts"
  "src/data/heroSlides.ts"
  "src/data/gallery.ts"
  "src/data/siteConfig.ts"
)

FAILED=0

# 1. Periksa file yang HARUS bersih dari [Contoh]
for must_be_clean in "src/data/clinicContent.ts" "src/data/services.ts" "src/data/navigation.ts" "src/data/footerLinks.ts"; do
  if [ -f "$must_be_clean" ] && grep -nE '\[Contoh\]' "$must_be_clean" >/dev/null 2>&1; then
    echo "❌ [Contoh] TERDETEKSI di $must_be_clean (field ini harus terverifikasi, TANPA prefix):" >&2
    grep -nE '\[Contoh\]' "$must_be_clean" >&2
    FAILED=1
  fi
done

# 2. Periksa file lain (selain whitelist) — tidak boleh ada [Contoh]
DATA_FILES=$(find src/data -type f -name '*.ts' 2>/dev/null)
for f in $DATA_FILES; do
  skip=false
  for allowed in "${ALLOWED_FILES[@]}"; do
    if [ "$f" = "$allowed" ]; then skip=true; break; fi
  done
  if [ "$skip" = false ]; then
    if grep -nE '\[Contoh\]' "$f" >/dev/null 2>&1; then
      echo "❌ [Contoh] TERDETEKSI di $f (tidak dalam whitelist):" >&2
      grep -nE '\[Contoh\]' "$f" >&2
      FAILED=1
    fi
  fi
done

if [ "$FAILED" = "1" ]; then
  exit 1
fi

echo "✅ Placeholder scope check passed ([Contoh] hanya di sub-field placeholder)."
exit 0
