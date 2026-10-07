"""Build download copies from preserved originals and verify every page."""

import hashlib
import json
import shutil
import tempfile
from pathlib import Path

import fitz
from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "src/content/downloads.json"
REPORT_DIRECTORY = ROOT / "output/pdf-optimization"


def public_file(public_path):
    path = (ROOT / "public" / public_path.lstrip("/")).resolve()
    if not path.is_relative_to(ROOT / "public"):
        raise ValueError(f"Invalid public path: {public_path}")
    return path


def compress_images(document, quality):
    """Keep image dimensions, color profiles and existing transparency masks."""
    seen = set()
    changed = 0
    for page in document:
        for image in page.get_images(full=True):
            xref, _, width, height, bits, _, _, _, encoding = image[:9]
            if xref in seen:
                continue
            seen.add(xref)
            if encoding != "FlateDecode" or min(width, height) < 512 or bits != 8:
                continue
            # Images with a non-default Decode array need a separate conversion.
            if document.xref_get_key(xref, "Decode")[0] != "null":
                continue
            pixels = fitz.Pixmap(document, xref)
            if pixels.alpha or pixels.colorspace is None or pixels.colorspace.n != 3:
                continue
            encoded = pixels.pil_tobytes(
                format="JPEG", quality=quality, subsampling=0, optimize=True
            )
            if len(encoded) >= len(document.xref_stream_raw(xref)) * 0.9:
                continue
            document.update_stream(xref, encoded, compress=False)
            document.xref_set_key(xref, "Filter", "/DCTDecode")
            document.xref_set_key(xref, "DecodeParms", "null")
            changed += 1
    return changed


def links(page):
    # Object numbers can change when duplicate PDF objects are removed.
    return [{key: value for key, value in link.items() if key != "xref"}
            for link in page.get_links()]


def verify(original_path, optimized_path, lossless):
    results = []
    with fitz.open(original_path) as original, fitz.open(optimized_path) as optimized:
        if len(original) != len(optimized) or original.get_toc() != optimized.get_toc():
            raise ValueError(f"Page count or bookmarks changed: {original_path}")
        for index, before in enumerate(original):
            after = optimized[index]
            if (before.rect != after.rect or before.get_text("words") != after.get_text("words")
                    or links(before) != links(after)):
                raise ValueError(f"Page {index + 1}: text, layout or links changed")
            first, second = [page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
                             for page in (before, after)]
            identical = first.samples == second.samples
            mean_difference = 0.0
            if not identical:
                if lossless:
                    raise ValueError(f"Page {index + 1}: lossless render differs")
                images = [Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
                          for pix in (first, second)]
                statistics = ImageStat.Stat(ImageChops.difference(*images))
                mean_difference = sum(statistics.mean) / 3
                if mean_difference > 0.5 or max(statistics.rms) > 2:
                    raise ValueError(f"Page {index + 1}: image difference exceeds review limits")
            results.append({"page": index + 1, "pixelsIdentical": identical,
                            "meanPixelDifference": round(mean_difference, 6)})
    return results


def main():
    files = json.loads(MANIFEST.read_text())
    REPORT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    reports = []
    replacements = []
    with tempfile.TemporaryDirectory(dir=REPORT_DIRECTORY) as temporary:
        for public_path, file in files.items():
            if "originalSrc" not in file:
                continue
            destination = public_file(public_path)
            original_path = public_file(file["originalSrc"])
            original_entry = files[file["originalSrc"]]
            if not original_path.exists():
                source_hash = hashlib.sha256(destination.read_bytes()).hexdigest()
                if source_hash != original_entry["sha256"]:
                    raise ValueError(f"Source does not match recorded original: {public_path}")
                original_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(destination, original_path)
            original_hash = hashlib.sha256(original_path.read_bytes()).hexdigest()
            if original_hash != original_entry["sha256"]:
                raise ValueError(
                    f"Original changed: {original_path}. After deliberately replacing an "
                    "original, run npm run update:downloads before rebuilding its copy."
                )
            optimized_path = Path(temporary) / f"{len(reports)}.pdf"
            quality = file.get("optimization", {}).get("jpegQuality")
            with fitz.open(original_path) as document:
                if document.is_encrypted or document.get_sigflags() > 0:
                    raise ValueError(f"Encrypted or signed PDF requires separate handling: {public_path}")
                image_count = compress_images(document, quality) if quality else 0
                document.save(
                    optimized_path, garbage=4, deflate=True, deflate_images=True,
                    deflate_fonts=True, use_objstms=1, compression_effort=100, no_new_id=True
                )
            pages = verify(original_path, optimized_path, lossless=not quality)
            original_size = original_path.stat().st_size
            optimized_size = optimized_path.stat().st_size
            if optimized_size >= original_size:
                raise ValueError(f"Optimized copy is not smaller: {public_path}")
            file["sizeBytes"] = optimized_size
            original_entry["sizeBytes"] = original_size
            replacements.append((optimized_path, destination))
            reports.append({"file": public_path, "original": file["originalSrc"],
                            "originalSha256": original_hash, "originalBytes": original_size,
                            "optimizedBytes": optimized_size, "compressedImages": image_count,
                            "pages": pages})
            print(f"{public_path}: {original_size / 1e6:.2f} -> {optimized_size / 1e6:.2f} MB; "
                  f"{len(pages)} pages verified", flush=True)
        for source, destination in replacements:
            shutil.copyfile(source, destination)
    MANIFEST.write_text(json.dumps(files, ensure_ascii=False, indent=2) + "\n")
    (REPORT_DIRECTORY / "report.json").write_text(json.dumps(reports, indent=2) + "\n")
    print(f"Verified {len(reports)} optimized PDFs. Originals were preserved.")


if __name__ == "__main__":
    main()
