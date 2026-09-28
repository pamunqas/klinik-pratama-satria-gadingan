#!/usr/bin/env bash
# scripts/check-hard-negative.sh
# Memastikan tidak ada elemen/formulir booking daring di source code.
# Self-exclude: script ini sendiri berisi literal pattern di comment & PATTERN.
# Exit 0 jika nihil; exit 1 jika ditemukan.

set -euo pipefail

PATTERN='booking|buat\.janji|appointment|register|pendaftaran\.daring|pendaftaran\.online|pendaftaran-daring|pendaftaran-online'

# Kumpulkan file source (skip node_modules, .next, public, dan script ini sendiri).
HITS=""

# 1) Scan src/ — source code aplikasi
while IFS= read -r f; do
  M=$(grep -nE "$PATTERN" "$f" 2>/dev/null || true)
  if [ -n "$M" ]; then HITS="${HITS}${f}:"$'\n'"${M}"$'\n'; fi
done < <(find src -type f \
  \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' -o -name '*.md' \) \
  -not -path '*/node_modules/*')

# 2) Scan scripts/ tapi skip file ini sendiri
SELF="$(basename "$0")"
while IFS= read -r f; do
  base="$(basename "$f")"
  if [ "$base" = "$SELF" ]; then continue; fi
  M=$(grep -nE "$PATTERN" "$f" 2>/dev/null || true)
  if [ -n "$M" ]; then HITS="${HITS}${f}:"$'\n'"${M}"$'\n'; fi
done < <(find scripts -type f \
  \( -name '*.sh' -o -name '*.md' \) \
  -not -path '*/node_modules/*')

if [ -n "$HITS" ]; then
  echo "❌ HARD NEGATIVE TERDETEKSI di source:" >&2
  echo "$HITS" >&2
  exit 1
fi

echo "✅ Hard-negative check passed (booking/buat.janji/appointment/... nihil di src/)."
exit 0
