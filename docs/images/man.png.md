# `images/man.png`

> A tiny PNG asset that represents a “man” icon.  
> It is part of the visual assets bundled with the project and is referenced in the UI wherever a generic user avatar or placeholder is required.

---

## 1. Overview

| Item | Detail |
|------|--------|
| **File type** | PNG (Portable Network Graphics) |
| **Dimensions** | 2 × 2 px (as indicated by the `IHDR` chunk) |
| **Color depth** | 8‑bit RGBA |
| **Purpose** | Small icon used as a placeholder avatar or decorative element in the UI. |
| **Location** | `images/man.png` – part of the static asset tree. |

The file is a binary image; the raw bytes are included in the repository but are not human‑readable. The PNG header (`\x89PNG\r\n\x1a\n`) confirms it is a valid PNG file. The image is intentionally tiny to keep the bundle lightweight and to serve as a quick visual cue in the UI.

---

## 2. Detailed Breakdown

Below is a quick reference to the PNG structure as it appears in this file.  
(Only the first few chunks are shown; the rest is compressed image data.)

| Chunk | Offset | Size | Description |
|-------|--------|------|-------------|
| `IHDR` | 8 | 13 | Image header: width = 2, height = 2, bit depth = 8, color type = 6 (RGBA), compression = deflate, filter = adaptive, interlace = none. |
| `pHYs` | 21 | 9 | Physical pixel dimensions (optional). |
| `tEXt` | 31 | variable | Software tag: “www.inkscape.org” – indicates the image was exported from Inkscape. |
| `IDAT` | 44 | variable | Compressed image data (deflate). |
| `IEND` | end | 12 | PNG end marker. |

**Key points**

* **Tiny size** – 2 × 2 pixels means the file is only a few dozen bytes long.  
* **RGBA** – the image contains an alpha channel, allowing it to be composited over any background.  
* **Compression** – the `IDAT` chunk uses zlib/deflate; the data is not human‑readable.  
* **Metadata** – the `tEXt` chunk records the authoring tool, which can be useful for debugging or for ensuring consistency across assets.

---

## 3. Integrations

| Component | Interaction | Notes |
|-----------|-------------|-------|
| **UI / Front‑end** | `<img src="images/man.png" alt="User avatar">` | Used as a default avatar when a user has not uploaded a profile picture. |
| **Documentation** | Embedded in README or docs to illustrate avatar placeholders. | The small size keeps the docs lightweight. |
| **Testing** | Asset is referenced in unit tests that verify avatar rendering. | Tests may check that the image loads correctly and has the expected dimensions. |
| **Build pipeline** | Asset is copied to the `dist` folder during the build step. | No special processing is required beyond standard PNG handling. |

### Usage Example

```html
<!-- Default avatar -->
<img src="images/man.png" alt="Default avatar" width="32" height="32">
```

Because the image is only 2 × 2 pixels, it is usually scaled up in CSS or via the `width`/`height` attributes. The scaling is handled by the browser’s PNG renderer, which will interpolate the pixels to produce a smooth icon.

---

## 4. Maintenance Tips

1. **Keep the file small** – If you need a new placeholder, generate a 2 × 2 PNG with a simple color or pattern.  
2. **Verify integrity** – Run `pngcheck images/man.png` to ensure the file is not corrupted.  
3. **Update metadata** – If you replace the image, update the `tEXt` chunk to reflect the new authoring tool.  
4. **Version control** – Since the file is binary, use Git’s `--binary` handling or consider storing it in a dedicated assets branch if it grows in number.

---

### Summary

`images/man.png` is a minimal, 2 × 2 pixel PNG used as a generic avatar placeholder. Its tiny size and RGBA format make it ideal for quick UI rendering without adding significant weight to the bundle. The file is referenced throughout the front‑end and documentation, and its PNG structure is straightforward, with only the essential chunks required for display.