"""
Generates public/brand/og-image-v2.png — the 1200x630 social share card.

The card is the one image that has to exist as a real raster file: Facebook,
LinkedIn and WhatsApp all fetch og:image over HTTP and will not render an SVG.
Colours and the typeface come from the site itself (src/index.css), so the card
matches the pages it is linked from.

The card is the logo on a deep brand ground, and nothing else. When the link is
unfurled in a chat the surrounding text — the og:title and og:description — is
already the message, so the image carries no headline of its own. Everything a
share card needs to look deliberate at thumbnail size, the mark on a clean
ground with the domain under it, is here.

Note the filename. This is og-image-v2, not og-image: `/brand/*` is served with
max-age=86400, and WhatsApp, Facebook and LinkedIn each cache the image URL far
longer than that. Overwriting the existing file would leave every one of them
serving the old card for a day or more. A new filename is a new cache key
everywhere at once, which is the only reliable way to ship changed artwork.

Every placement is measured before anything is drawn, and the script refuses to
write the file if two blocks would overlap or a block would run off the canvas.
A share card with colliding type looks broken in the one place it is impossible
to preview it, so this fails loudly instead.

Run from the repo root:  python scripts/make-og-image.py
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageStat

WIDTH, HEIGHT = 1200, 630
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "brand" / "og-image-v2.png"
LOGO_SRC = ROOT / "public" / "brand" / "logo-white.png"

# src/index.css — brand ramp. Only the two ends of the ground gradient and the
# domain's colour are used; the card carries no other type.
BRAND_800 = (22, 44, 74)
INK_950 = (15, 23, 42)
BRAND_200 = (188, 208, 233)

FONT_SEMIBOLD = "C:/Windows/Fonts/seguisb.ttf"

DOMAIN = "shifranuhatech.com"

# The lockup is 640x192 natively, so this is a ~1.25x upscale. Enough to read as
# a confident mark at chat-thumbnail size without softening it noticeably.
LOGO_WIDTH = 800

# Clearance between the bottom of the logo and the top of the domain's ink.
DOMAIN_GAP = 48

DOMAIN_FONT = ImageFont.truetype(FONT_SEMIBOLD, 30)


def load_logo():
    """The mark cropped to its real ink, resized, and proven fit for this ground.

    Three guards, each catching a failure that is invisible in review and
    obvious in a chat: a logo with no alpha would paste as a solid rectangle and
    cover the card; a fully transparent one would leave a blank ground; and a
    dark logo on a dark ground would simply not be there.
    """
    source = Image.open(LOGO_SRC)
    if source.mode != "RGBA":
        raise SystemExit(f"{LOGO_SRC.name} has no alpha channel ({source.mode}); cannot composite it")

    box = source.getchannel("A").getbbox()
    if box is None:
        raise SystemExit(f"{LOGO_SRC.name} is fully transparent; there is nothing to draw")
    if box == (0, 0, source.width, source.height):
        print(f"  note  {LOGO_SRC.name} has no transparent padding; nothing to trim")

    # Cropping to the alpha bounds before scaling keeps the centring honest —
    # transparent margins would otherwise offset the mark from the middle.
    logo = source.crop(box)

    height = round(logo.height * LOGO_WIDTH / logo.width)
    logo = logo.resize((LOGO_WIDTH, height), Image.LANCZOS)

    # Mean luminance of the logo's visible pixels only. Compositing against the
    # mask rather than iterating the pixels keeps this vectorised and off the
    # deprecated getdata().
    opaque_mask = logo.getchannel("A").point(lambda a: 255 if a > 200 else 0)
    opaque = Image.composite(logo.convert("RGB"), Image.new("RGB", logo.size), opaque_mask)
    totals = ImageStat.Stat(opaque).sum[:3]
    # Dividing by the masked pixel count, not the canvas: the transparent part of
    # the lockup contributes black to the totals and would drag the mean down.
    count = ImageStat.Stat(opaque_mask).sum[0] / 255.0
    luminance = (0.2126 * totals[0] + 0.7152 * totals[1] + 0.0722 * totals[2]) / count
    if luminance < 180:
        raise SystemExit(
            f"{LOGO_SRC.name} is too dark for the {BRAND_800} ground "
            f"(mean luminance {luminance:.0f}); it would be invisible on the card"
        )

    print(f"  logo   {source.width}x{source.height} -> {logo.width}x{logo.height}, luminance {luminance:.0f}")
    return logo


def blocks(logo):
    """The logo and the domain, centred as one group, as (label, x0, y0, x1, y1).

    Centred by measured ink rather than by a fixed offset, so the group stays
    optically centred even if the logo is regenerated at a different aspect.
    """
    ink = DOMAIN_FONT.getbbox(DOMAIN)
    domain_w, domain_h = ink[2] - ink[0], ink[3] - ink[1]

    group_h = logo.height + DOMAIN_GAP + domain_h
    top = (HEIGHT - group_h) // 2

    domain_x = (WIDTH - domain_w) // 2
    domain_top = top + logo.height + DOMAIN_GAP
    # draw.text anchors to the ascender, so ink starts `ink[1]` below the y given.
    domain_y = domain_top - ink[1]

    return [
        ("logo", (WIDTH - logo.width) // 2, top, (WIDTH - logo.width) // 2 + logo.width, top + logo.height),
        ("domain", domain_x, domain_top, domain_x + domain_w, domain_top + domain_h),
    ], (domain_x, domain_y)


def check_layout(placed):
    """Fails loudly on anything that would look broken. Returns nothing."""
    problems = []

    for label, x0, y0, x1, y1 in placed:
        if x0 < 0 or y0 < 0 or x1 > WIDTH or y1 > HEIGHT:
            problems.append(
                f"{label} runs off the canvas: x[{x0}..{x1}] y[{y0}..{y1}] vs {WIDTH}x{HEIGHT}"
            )

    for i, (la, ax0, ay0, ax1, ay1) in enumerate(placed):
        for lb, bx0, by0, bx1, by1 in placed[i + 1:]:
            if ay0 < by1 and by0 < ay1 and ax0 < bx1 and bx0 < ax1:
                problems.append(f"{la} and {lb} overlap")

    if problems:
        for p in problems:
            print(f"  FAIL  {p}", file=sys.stderr)
        raise SystemExit("og-image layout is broken; nothing written")

    return placed


def vertical_gradient(size, top, bottom):
    """A vertical two-stop gradient. Drawn per row rather than per pixel."""
    width, height = size
    image = Image.new("RGB", size)
    draw = ImageDraw.Draw(image)
    for y in range(height):
        t = y / max(height - 1, 1)
        row = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        draw.line([(0, y), (width, y)], fill=row)
    return image


def main():
    logo = load_logo()
    placed, (domain_x, domain_y) = blocks(logo)
    check_layout(placed)

    image = vertical_gradient((WIDTH, HEIGHT), BRAND_800, INK_950)
    image.paste(logo, (placed[0][1], placed[0][2]), logo)

    draw = ImageDraw.Draw(image)
    draw.text((domain_x, domain_y), DOMAIN, font=DOMAIN_FONT, fill=BRAND_200)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUT, format="PNG", optimize=True)

    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB, {WIDTH}x{HEIGHT})")
    for label, x0, y0, x1, y1 in placed:
        print(f"  {label:8} x[{x0:4}..{x1:4}] y[{y0:4}..{y1:4}]")


if __name__ == "__main__":
    main()
