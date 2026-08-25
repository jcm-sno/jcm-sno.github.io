#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "${script_dir}/.." && pwd)"

export GITHUB_PAGES=true
export NEXT_PUBLIC_SITE_ORIGIN="${NEXT_PUBLIC_SITE_ORIGIN:-https://jcm-sno.github.io}"

"${script_dir}/build-verified.sh"

touch "${project_root}/dist/client/.nojekyll"

for page in index.html logistics/index.html rsvp/index.html 404.html; do
  if [[ ! -s "${project_root}/dist/client/${page}" ]]; then
    echo "GitHub Pages export is missing ${page}." >&2
    exit 1
  fi
done

node "${script_dir}/verify-pages-export.mjs" "${project_root}/dist/client"

echo "GitHub Pages export verified in dist/client."
