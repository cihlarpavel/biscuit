# Ikona Biscuit: sušenka s čokoládovými kousky a ukousnutím na růžovo-lila pozadí, jiskřička.
# Spuštění: python3 tools/ikona.py  (vytvoří icons/icon-180/192/512.png)
from PIL import Image, ImageDraw
import math, os

S = 1024
img = Image.new('RGB', (S, S))
d = ImageDraw.Draw(img)
for y in range(S):  # přechod růžová -> lila
    t = y / S
    c = tuple(int(a + (b - a) * t) for a, b in zip((255, 143, 196), (182, 156, 255)))
    d.line([(0, y), (S, y)], fill=c)

cx, cy, r = 512, 540, 330
d.ellipse([cx - r + 14, cy - r + 30, cx + r + 14, cy + r + 30], fill=(205, 110, 160))  # stín
d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(230, 166, 93), outline=(201, 132, 58), width=22)
for x, y, rr in [(-140, -120, 42), (60, -170, 36), (150, -20, 44), (-60, 20, 40), (-170, 110, 38), (40, 170, 46), (190, 150, 30), (-20, -60, 22)]:
    d.ellipse([cx + x - rr, cy + y - rr, cx + x + rr, cy + y + rr], fill=(91, 52, 36))
# ukousnutí: tři kruhy v barvě pozadí na pravém horním okraji
for ang, rr in [(-58, 95), (-38, 85), (-78, 80)]:
    bx = cx + math.cos(math.radians(ang)) * (r + 20)
    by = cy + math.sin(math.radians(ang)) * (r + 20)
    col = img.getpixel((int(bx), int(by)))
    d.ellipse([bx - rr, by - rr, bx + rr, by + rr], fill=col)
# jiskřička
def hvezda(x, y, a, b, col):
    d.polygon([(x, y - a), (x + b, y - b), (x + a, y), (x + b, y + b), (x, y + a), (x - b, y + b), (x - a, y), (x - b, y - b)], fill=col)
hvezda(190, 190, 110, 26, (255, 236, 160))
hvezda(860, 860, 60, 15, (255, 255, 255))

os.makedirs('icons', exist_ok=True)
for n in (180, 192, 512):
    img.resize((n, n), Image.LANCZOS).save(f'icons/icon-{n}.png')
