# Zpracuje ilustrace z ilustrace/*.png (vygenerované v ChatGPT/Gemini): zmenší je pro telefon,
# uloží jako .webp a vytvoří ilustrace/seznam.json, podle kterého je aplikace použije.
# Spuštění: python3 tools/ilustrace.py
from PIL import Image
import json, os, glob

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'ilustrace'))
hotove = []
for cesta in sorted(glob.glob('*.png') + glob.glob('*.PNG') + glob.glob('*.jpg') + glob.glob('*.jpeg')):
    nazev = os.path.splitext(os.path.basename(cesta))[0].lower()
    im = Image.open(cesta)
    pozadi = nazev.startswith('pozadi')
    im = im.convert('RGB' if pozadi else 'RGBA')
    if not pozadi:  # ořezat prázdné okraje, ať jsou ikony stejně velké
        box = im.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
        if box:
            im = im.crop(box)
            s = max(im.size)
            ctv = Image.new('RGBA', (s, s), (0, 0, 0, 0))
            ctv.paste(im, ((s - im.width) // 2, (s - im.height) // 2))
            im = ctv
    limit = 1400 if pozadi else (1024 if nazev in ('hra-krabicka',) else 512)
    im.thumbnail((limit, limit * 2 if pozadi else limit), Image.LANCZOS)
    im.save(f'{nazev}.webp', 'WEBP', quality=86, method=6)
    hotove.append(nazev)
    print(f'{nazev}: {im.size[0]}x{im.size[1]}')
json.dump(hotove, open('seznam.json', 'w'))
print(f'celkem {len(hotove)} ilustrací')
