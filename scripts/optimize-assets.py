"""Optional art preparation, not part of the game build. Requires Pillow.

Usage: python scripts/optimize-assets.py SOURCE_DIR
SOURCE_DIR contains fruit-01.png ... fruit-30.png and background.png.
Originals are never modified. Run from the repository root.
"""
from pathlib import Path
import hashlib
import json
import sys
from PIL import Image

source = Path(sys.argv[1])
records = []
for name in [f"fruit-{rank:02}" for rank in range(1, 31)] + ["background"]:
    original = source / f"{name}.png"
    destination = Path("public/assets") / ("orchard" if name == "background" else "fruits") / f"{name}.webp"
    with Image.open(original) as image:
        original_size = image.size
        image = image.convert("RGBA" if name != "background" else "RGB")
        image.thumbnail((1536, 1024) if name == "background" else (256, 256), Image.Resampling.LANCZOS)
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=88, method=6)
        records.append({"file": str(destination).replace("\\", "/"), "source_sha256": hashlib.sha256(original.read_bytes()).hexdigest(), "original_size": original_size, "size": image.size, "original_bytes": original.stat().st_size, "bytes": destination.stat().st_size})
Path("docs/evidence/runs/visual-optimization.json").write_text(json.dumps(records, indent=2), encoding="utf-8")
print(f"Optimized {len(records)} assets: {sum(r['original_bytes'] for r in records)} -> {sum(r['bytes'] for r in records)} bytes")
