"""Regenerate responsive AVIFs and inline previews with Pillow 11.3+.

Run from the repository root: python scripts/optimize-archive-photos.py
The existing WebP photographs remain the source and browser fallback.
"""
import base64
import io
import json
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
NAMES = [
    "field-day-group", "field-day-facing", "field-day-wheelbarrow",
    "boston-coffee", "boston-kayak", "boston-night",
    "long-distance-scotland", "long-distance-seafood", "long-distance-harbor",
    "engagement-walk", "engagement-proposal", "engagement-reaction",
]
manifest = {}
for name in ["about-banner-2048", *NAMES]:
    source = Image.open(ROOT / "public" / f"{name}.webp").convert("RGB")
    preview = source.copy()
    preview.thumbnail((24, 24), Image.Resampling.LANCZOS)
    preview = preview.filter(ImageFilter.GaussianBlur(0.6))
    buffer = io.BytesIO()
    preview.save(buffer, format="WEBP", quality=35, method=6)
    entry = {"placeholder": "data:image/webp;base64," + base64.b64encode(buffer.getvalue()).decode()}
    if name in NAMES:
        widths = sorted({min(width, source.width) for width in [640, 960, 1280, 1536]})
        candidates = []
        for width in widths:
            target = ROOT / "public" / f"{name}-{width}.avif"
            height = round(source.height * width / source.width)
            encoded = io.BytesIO()
            source.resize((width, height), Image.Resampling.LANCZOS).save(
                encoded, format="AVIF", quality=55, speed=6, subsampling="4:2:0", max_threads=2,
            )
            with Image.open(io.BytesIO(encoded.getvalue())) as result:
                result.load()
                assert result.size == (width, height), f"Invalid output: {target}"
            temporary = target.with_suffix(".tmp")
            temporary.write_bytes(encoded.getvalue())
            temporary.replace(target)
            candidates.append(f"/{target.name} {width}w")
        entry["srcSet"] = ", ".join(candidates)
    manifest[f"/{name}.webp"] = entry

(ROOT / "app" / "photo-assets.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Generated previews for {len(manifest)} photographs and responsive AVIFs for {len(NAMES)} archive photographs.")
