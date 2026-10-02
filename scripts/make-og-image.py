"""
Generates public/brand/og-image.png — the 1200x630 social share card.

The card is the one image that has to exist as a real raster file: Facebook,
LinkedIn and WhatsApp all fetch og:image over HTTP and will not render an SVG.
Colours and the typeface come from the site itself (src/index.css), so the card
matches the pages it is linked from.

Every text placement is measured before anything is drawn, and the script refuses
to write the file if two blocks would overlap or a block would run off the
canvas. A share card with colliding type looks broken in the one place it is
impossible to preview it, so this fails loudly instead.

Run from the repo root:  python scripts/make-og-image.py
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1200, 630
OUT = Path(__file__).resolve().parent.parent / "public" / "brand" / "og-image.png"

# src/index.css — brand ramp.
INK_950 = (15, 23, 42)
BRAND_800 = (22, 44, 74)
BRAND_700 = (29, 58, 99)
BRAND_600 = (39, 75, 124)
BRAND_400 = (92, 131, 187)
BRAND_200 = (188, 208, 233)
PAPER_50 = (248, 250, 252)

FONT_SEMIBOLD = "C:/Windows/Fonts/seguisb.ttf"
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REGULAR = "C:/Windows/Fonts/segoeui.ttf"

LEFT = 84
TOP = 120

HEADLINE_FONT = ImageFont.truetype(FONT_BOLD, 74)
EYEBROW_FONT = ImageFont.truetype(FONT_SEMIBOLD, 30)
BODY_FONT = ImageFont.truetype(FONT_REGULAR, 31)
NAME_FONT = ImageFont.truetype(FONT_SEMIBOLD, 36)

HEADLINE_LINES = ["Registration, tax and", "compliance, handled", "properly."]
LINE_HEIGHT = 88

RULE_Y = TOP + 62 + 176 + 116
MARKET_Y = RULE_Y + 30
NAME_Y = HEIGHT - 74
DOMAIN_Y = HEIGHT - 68

NAME = "Shifra Nuha Technologies"
DOMAIN = "shifranuhatech.com"
# Clearance between the two bottom strings. The domain is positioned from the
# name's measured right edge rather than a fixed offset, so this stays a real
# gap even if the font is substituted and the name measures wider.
NAME_DOMAIN_GAP = 44
EYEBROW = "BUSINESS REGISTRATION  \u00b7  TAX  \u00b7  COMPLIANCE"
MARKET = "Supporting businesses across Kerala"


def blocks():
    """Every text run, as (label, x, y, font, text, colour).

    The domain sits after the name on the same baseline, so its x depends on how
    wide the name actually measures. Everything else is a fixed offset from TOP.
    """
    runs = [("eyebrow", LEFT, TOP, EYEBROW_FONT, EYEBROW, BRAND_200)]
    for i, line in enumerate(HEADLINE_LINES):
        runs.append(
            (f"headline{i + 1}", LEFT, TOP + 62 + i * LINE_HEIGHT, HEADLINE_FONT, line, PAPER_50)
        )
    runs.append(("market", LEFT, MARKET_Y, BODY_FONT, MARKET, BRAND_200))
    runs.append(("name", LEFT, NAME_Y, NAME_FONT, NAME, PAPER_50))

    name_x1 = box(LEFT, NAME_Y, NAME_FONT, NAME)[2]
    runs.append(("domain", name_x1 + NAME_DOMAIN_GAP, DOMAIN_Y, BODY_FONT, DOMAIN, BRAND_400))
    return runs


def box(x, y, font, text):
    """Ink bounds of `text` at (x, y), matching PIL's default left-ascender anchor."""
    b = font.getbbox(text)
    return (x + b[0], y + b[1], x + b[2], y + b[3])


def check_layout(runs):
    """Fails loudly on anything that would look broken. Returns nothing."""
    problems = []
    placed = [(label, *box(x, y, f, t)) for label, x, y, f, t, _ in runs]

    for label, x0, y0, x1, y1 in placed:
        if x0 < 0 or y0 < 0 or x1 > WIDTH or y1 > HEIGHT:
            problems.append(
                f"{label} runs off the canvas: x[{x0}..{x1}] y[{y0}..{y1}] vs {WIDTH}x{HEIGHT}"
            )

    # No two blocks may share ink. Name and domain are side by side on one
    # baseline, so they are allowed to overlap vertically but never
    # horizontally — which is why the domain is placed off the name's width.
    for i, (la, ax0, ay0, ax1, ay1) in enumerate(placed):
        for lb, bx0, by0, bx1, by1 in placed[i + 1:]:
            same_baseline = {la, lb} == {"name", "domain"}
            v_overlap = ay0 < by1 and by0 < ay1
            h_overlap = ax0 < bx1 and bx0 < ax1
            if same_baseline:
                if h_overlap:
                    problems.append(f"{la} and {lb} overlap horizontally; they share a baseline")
            elif v_overlap and h_overlap:
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
    runs = blocks()
    placed = check_layout(runs)

    image = vertical_gradient((WIDTH, HEIGHT), BRAND_800, INK_950)
    draw = ImageDraw.Draw(image)

    # Two quiet diagonal bands, echoing the mark's upward stroke without
    # competing with the text. Drawn first so the type sits on top of them.
    draw.polygon(
        [(0, HEIGHT), (WIDTH * 0.42, HEIGHT), (WIDTH * 0.78, 0), (WIDTH * 0.62, 0)],
        fill=BRAND_700,
    )
    draw.polygon(
        [(WIDTH * 0.44, HEIGHT), (WIDTH * 0.52, HEIGHT), (WIDTH * 0.88, 0), (WIDTH * 0.80, 0)],
        fill=BRAND_600,
    )

    draw.rectangle([LEFT, RULE_Y, LEFT + 96, RULE_Y + 6], fill=BRAND_400)

    for _label, x, y, font, text, colour in runs:
        draw.text((x, y), text, font=font, fill=colour)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUT, format="PNG", optimize=True)

    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB, {WIDTH}x{HEIGHT})")
    for label, x0, y0, x1, y1 in placed:
        print(f"  {label:10} x[{x0:4}..{x1:4}] y[{y0:4}..{y1:4}]")


if __name__ == "__main__":
    main()
