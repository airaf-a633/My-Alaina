# Photos and videos

Your media is already here — 43 photos (`moment-01.jpg` … `moment-43.jpg`) and
7 videos (`clip-01.mp4` … `clip-07.mp4`).

They were renamed from their original Snapchat/WhatsApp filenames because the
originals contained spaces and brackets, which have to be URL-encoded and are
painful to reference in code. The full old-name → new-name mapping is saved at
`original-filenames.txt` in the project root, so nothing is lost.

## Adding more

1. Drop the file in this folder.
2. Add a line to `media.ts` in the project root — photos need their pixel width
   and height so the layout doesn't jump while they load.

To get the dimensions of a new photo on Windows: right-click → Properties →
Details.

## A note on size

You don't need to resize anything. Photos are served through `next/image`,
which converts them to WebP/AVIF and sends a phone-sized version — a 940 KB
photo goes out as roughly 77 KB.

Videos are **not** optimized the same way. They're sent as-is, so they're the
heaviest thing on the page. They only load when scrolled into view and pause
when scrolled away, but if you add many more, consider compressing them first.
