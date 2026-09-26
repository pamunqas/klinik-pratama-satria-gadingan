#!/usr/bin/env bash
# scripts/check-hard-negative.sh
# Memastikan tidak ada elemen/formulir booking daring di seluruh src/.
# Pattern hard-negative dari SPEC + plan iter 2.
# Exit 0 jika nihil; exit 1 jika ditemukan.

set -euo pipefail

PATTERN='booking|buat\.janji|appointment|register|pendaftaran\.daring|pendaftaran\.online|pendaftaran-daring|pendaftaran-online'

if command -v git >/dev/null 2>&1 && [ -d .git ]; then
  HITS=$(git grep -nIE "$PATTERN" -- src/ scripts/ 2>/dev/null || true)
else
  HITS=$(grep -rnE "$PATTERN" --include='*.ts' --include='*.tsx' --include='*.css' --include='*.md' --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=public src/ scripts/ 2>/dev/null || true)
fi

if [ -n "$HITS" ]; then
  echo "❌ HARD NEGATIVE TERDETEKSI:" >&2
  echo "$HITS" >&2
  exit 1
fi

echo "✅ Hard-negative check passed (booking/buat.janji/appointment/... nihil di src/)."
exit 0
