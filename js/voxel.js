// Kostičková (voxelová) postavička – NÁVRH. Postavička je složená z bloků kostiček; každá kostička
// má přední stěnu, světlejší vršek a tmavší pravý bok (šikmý pohled), takže působí prostorově.
// Doplňky jsou jen další bloky. Vykresluje se do <canvas> a výsledek se ukládá jako obrázek
// (cache podle vzhledu), takže i desítky postaviček v seznamu jsou rychlé.

// ---------- barvy ----------
function odstin(hex, f) {
  const k = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).map(x => Math.round(f > 0 ? x + (255 - x) * f : x * (1 + f)));
  return `rgb(${k.map(x => Math.max(0, Math.min(255, x))).join(',')})`;
}
// drobná náhodná odchylka barvy každé kostičky – „ruční“ dojem jako na předloze
const sum = (x, y, z) => { const h = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453; return (h - Math.floor(h)) * 0.06 - 0.03; };

// ---------- model ----------
// Blok = { x, y, w, h, z (hloubka přední stěny; menší = blíž), d (tloušťka), c (barva) }
// Mřížka 34 × 38, počátek vlevo nahoře.
const B = (x, y, w, h, z, d, c) => ({ x, y, w, h, z, d, c });

export const BARVY_VLASU = { hneda: '#8a5636', blond: '#e2b65a', cerna: '#2e2630', zrzava: '#c4602f', ruzova: '#f08cba', modra: '#5f93e6', lila: '#a98be8' };
export const BARVY_KUZE = { k1: '#f6d3b8', k2: '#eab48d', k3: '#c58d64', k4: '#8f5a3c' };

export function model(v) {
  const kuze = BARVY_KUZE[v.kuze] || BARVY_KUZE.k1;
  const vlasy = BARVY_VLASU[v.barva] || BARVY_VLASU.hneda;
  const tvar = '#2b2330', tvare = '#f4a3a3';
  const triko = v.triko || '#fbf3e6';
  const b = [];

  // vlasy vzadu (za hlavou) – podle účesu
  if (v.uces === 'culik') {
    b.push(B(8, 5, 18, 12, 6, 6, vlasy));                 // zátylek
    b.push(B(22, 1, 5, 5, 3, 6, vlasy), B(24, 5, 4, 13, 5, 5, vlasy), B(25, 18, 3, 6, 6, 4, vlasy)); // culík
  } else if (v.uces === 'dlouhe') {
    b.push(B(8, 5, 18, 20, 6, 6, vlasy));
  } else if (v.uces === 'kratke') {
    b.push(B(9, 5, 16, 9, 6, 6, vlasy));
  }

  // tělo – mikina / tričko
  b.push(B(9, 20, 16, 10, 2, 8, triko));                  // trup
  b.push(B(6, 21, 3, 8, 3, 6, triko), B(25, 21, 3, 8, 3, 6, triko)); // rukávy
  b.push(B(6, 29, 3, 2, 3, 6, kuze), B(25, 29, 3, 2, 3, 6, kuze));   // dlaně
  b.push(B(15, 19, 4, 2, 3, 4, kuze));                    // krk
  if (v.srdce) b.push(B(16, 24, 1, 1, 1.7, .3, '#ef6b8f'), B(18, 24, 1, 1, 1.7, .3, '#ef6b8f'), B(15, 25, 5, 1, 1.7, .3, '#ef6b8f'), B(16, 26, 3, 1, 1.7, .3, '#ef6b8f'), B(17, 27, 1, 1, 1.7, .3, '#ef6b8f'));
  if (v.batoh) b.push(B(10, 20, 2, 10, 1.6, .4, '#e2577d'), B(22, 20, 2, 10, 1.6, .4, '#e2577d'));

  // hlava (horní řada užší = zaoblené rohy)
  b.push(B(11, 6, 12, 1, 0, 11, kuze), B(10, 7, 14, 12, 0, 11, kuze));
  b.push(B(9, 11, 1, 3, 3, 4, kuze), B(24, 11, 1, 3, 3, 4, kuze)); // uši
  b.push(B(16, 14, 2, 1, -.5, .5, odstinHex(kuze, -.06)));        // nos

  // obličej (tenká vrstva na přední stěně)
  const F = -.15, T = .15;
  b.push(B(13, 12, 2, 2, F, T, tvar), B(19, 12, 2, 2, F, T, tvar));      // oči
  b.push(B(13, 12, 1, 1, F - .01, T, '#ffffff'), B(19, 12, 1, 1, F - .01, T, '#ffffff')); // odlesk
  b.push(B(11, 15, 2, 1, F, T, tvare), B(21, 15, 2, 1, F, T, tvare));    // tvářičky
  b.push(B(15, 16, 1, 1, F, T, '#8b3b46'), B(16, 17, 2, 1, F, T, '#8b3b46'), B(18, 16, 1, 1, F, T, '#8b3b46')); // úsměv
  b.push(B(12, 10, 3, 1, F, T, odstinHex(vlasy, -.3)), B(19, 10, 3, 1, F, T, odstinHex(vlasy, -.3)));      // obočí

  // vlasy vpředu: stupňovité temeno, zubatá ofina, prameny u spánků
  if (v.uces !== 'plesata') {
    const tm = odstinHex(vlasy, -.12);
    b.push(B(12, 2, 10, 1, -.6, 11, vlasy), B(10, 3, 14, 1, -.6, 12, vlasy), B(9, 4, 16, 2, -.6, 12, vlasy));
    const ofina = v.uces === 'kratke'
      ? [[10, 6, 14, 1], [10, 7, 2, 1], [13, 7, 2, 1], [16, 7, 1, 1], [18, 7, 2, 1], [22, 7, 2, 1]]
      : [[10, 6, 14, 1], [10, 7, 4, 1], [16, 7, 3, 1], [21, 7, 3, 1], [10, 8, 2, 1], [17, 8, 1, 1], [22, 8, 2, 1]];
    ofina.forEach(([x, y, w, h]) => b.push(B(x, y, w, h, -.6, 2.5, vlasy)));
    if (v.uces !== 'kratke') b.push(B(9, 6, 2, 8, -.4, 4, vlasy), B(23, 6, 2, 8, -.4, 4, vlasy));
    else b.push(B(9, 6, 1, 5, -.4, 4, vlasy), B(24, 6, 1, 5, -.4, 4, vlasy));
    // tmavší pramínky pro živost
    [[13, 3], [18, 4], [21, 3], [11, 5], [15, 5], [20, 6]].forEach(([x, y]) => b.push(B(x, y, 1, 1, -.62, .1, tm)));
  }
  if (v.uces === 'culik' && !v.hlava) b.push(B(20, 1, 4, 2, -.9, 4, '#ec6f9a')); // gumička

  // ---------- doplňky ----------
  if (v.bryle === 'kulate') b.push(B(12, 11, 4, 4, -.9, .4, '#3b3242'), B(18, 11, 4, 4, -.9, .4, '#3b3242'), B(16, 12, 2, 1, -.9, .4, '#3b3242'),
    B(13, 12, 2, 2, -1, .2, 'rgba(0,0,0,0)'));
  if (v.bryle === 'slunecni') b.push(B(11, 11, 5, 3, -1, .5, '#2b2330'), B(18, 11, 5, 3, -1, .5, '#2b2330'), B(16, 11, 2, 1, -1, .5, '#2b2330'), B(12, 11, 2, 1, -1.05, .3, '#6c6478'));
  if (v.hlava === 'korunka') b.push(B(11, 0, 12, 3, -1.2, 9, '#f2c14b'), B(11, -2, 2, 2, -1.2, 2, '#f2c14b'), B(16, -3, 2, 3, -1.2, 2, '#f2c14b'), B(21, -2, 2, 2, -1.2, 2, '#f2c14b'),
    B(16, 1, 2, 1, -1.35, .2, '#e2577d'), B(12, 1, 1, 1, -1.35, .2, '#5f93e6'), B(21, 1, 1, 1, -1.35, .2, '#57b38a'));
  if (v.hlava === 'ousko') b.push(B(10, -1, 4, 3, 1, 3, vlasy), B(11, -3, 2, 2, 1, 3, vlasy), B(20, -1, 4, 3, 1, 3, vlasy), B(21, -3, 2, 2, 1, 3, vlasy),
    B(11, -1, 2, 2, .9, .2, '#f4a3b8'), B(21, -1, 2, 2, .9, .2, '#f4a3b8'));
  if (v.hlava === 'ksiltovka') b.push(B(9, 1, 16, 5, -1, 12, '#5f93e6'), B(7, 5, 14, 2, -3.8, 4, '#4a78c8'), B(16, 0, 2, 1, 2, 4, '#4a78c8'));
  if (v.vousy === 'knir') b.push(B(14, 15, 6, 1, -.4, .5, odstinHex(vlasy, -.2)), B(13, 16, 1, 1, -.4, .5, odstinHex(vlasy, -.2)), B(20, 16, 1, 1, -.4, .5, odstinHex(vlasy, -.2)));
  if (v.nausnice) b.push(B(9, 15, 1, 2, 2, 1, '#f2c14b'), B(24, 15, 1, 2, 2, 1, '#f2c14b'));
  if (v.ruka === 'kniha') b.push(B(4, 25, 6, 7, 0, 2, '#9b3048'), B(4.5, 25.5, 5, 6, -.05, .1, '#b8475f'));
  return b;
}
function odstinHex(hex, f) {
  const k = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).map(x => Math.round(f > 0 ? x + (255 - x) * f : x * (1 + f)));
  return '#' + k.map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('');
}

// ---------- vykreslení ----------
const cache = new Map();
export function vykresli(v, px = 240) {
  const klic = JSON.stringify(v) + px;
  if (cache.has(klic)) return cache.get(klic);
  const dpr = Math.min(3, devicePixelRatio || 1);
  const c = document.createElement('canvas');
  c.width = c.height = px * dpr;
  const g = c.getContext('2d');
  g.scale(dpr, dpr);
  const SIRKA = 34, VYSKA = 38;
  const u = px / 36;                         // velikost kostičky
  const hx = u * .32, hy = -u * .32;         // posun do hloubky (šikmý pohled)
  const ox = (px - SIRKA * u) / 2 - 3 * hx, oy = u * 3;

  // rozpad bloků na jednotlivé kostičky (kvůli stínování a „ruční“ odchylce barev)
  const kostky = [];
  for (const bl of model(v)) {
    if (bl.c === 'rgba(0,0,0,0)') continue;
    for (let y = 0; y < bl.h; y++) for (let x = 0; x < bl.w; x++) kostky.push({ x: bl.x + x, y: bl.y + y, z: bl.z, d: bl.d, c: bl.c, w: Math.min(1, bl.w - x), h: Math.min(1, bl.h - y) });
  }
  // pořadí: podle přední stěny odzadu dopředu (vlasy před hlavou, obličej na ní), pak zdola nahoru, zleva doprava
  kostky.sort((a, b) => b.z - a.z || b.y - a.y || a.x - b.x);
  const obsazeno = new Set(kostky.map(k => `${k.x},${k.y},${k.z},${k.d}`));

  for (const k of kostky) {
    const X = ox + k.x * u + k.z * hx, Y = oy + k.y * u + k.z * hy;
    const W = k.w * u, H = k.h * u, DX = k.d * hx, DY = k.d * hy;
    const f = sum(k.x, k.y, k.z);
    const zakladni = k.c;
    // vršek (když nad kostičkou ve stejném bloku nic není)
    if (!obsazeno.has(`${k.x},${k.y - 1},${k.z},${k.d}`)) {
      g.fillStyle = odstin(zakladni, .22 + f);
      g.beginPath(); g.moveTo(X, Y); g.lineTo(X + DX, Y + DY); g.lineTo(X + W + DX, Y + DY); g.lineTo(X + W, Y); g.fill();
    }
    // pravý bok
    if (!obsazeno.has(`${k.x + 1},${k.y},${k.z},${k.d}`)) {
      g.fillStyle = odstin(zakladni, -.22 + f);
      g.beginPath(); g.moveTo(X + W, Y); g.lineTo(X + W + DX, Y + DY); g.lineTo(X + W + DX, Y + H + DY); g.lineTo(X + W, Y + H); g.fill();
    }
    // přední stěna s jemným zkosením hran
    g.fillStyle = odstin(zakladni, f);
    g.fillRect(X, Y, W, H);
    g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(X, Y, W, Math.max(.6, u * .09)); g.fillRect(X, Y, Math.max(.6, u * .09), H);
    g.fillStyle = 'rgba(0,0,0,.06)'; g.fillRect(X, Y + H - Math.max(.6, u * .08), W, Math.max(.6, u * .08)); g.fillRect(X + W - Math.max(.6, u * .08), Y, Math.max(.6, u * .08), H);
  }
  const url = c.toDataURL('image/png');
  cache.set(klic, url);
  return url;
}

export const voxel = (v, px = 240) => `<img class="voxel" src="${vykresli(v, px)}" width="${px}" height="${px}" alt="">`;
