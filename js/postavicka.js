// Vlastní postavička ve stylu Pou: každá holka si ji za sušenky obléká a vylepšuje.
// Vzhled je objekt { kategorie: id věci }. Vrstvy se skládají do jednoho SVG (viewBox 0 0 120 120).

const KUZE = { k1: '#ffd9c2', k2: '#f1c09b', k3: '#c98d63', k4: '#8d5a3b' };

// ---------- Katalog ----------
// cena 0 = zdarma od začátku. „nic“ znamená, že kategorie jde sundat.
export const KATEGORIE = [
  { id: 'kuze', nazev: 'Pleť', ikona: '🖐️', povinne: true },
  { id: 'uces', nazev: 'Účes', ikona: '💇‍♀️', povinne: true },
  { id: 'barva', nazev: 'Barva vlasů', ikona: '🎨', povinne: true },
  { id: 'obleceni', nazev: 'Oblečení', ikona: '👚', povinne: true },
  { id: 'hlava', nazev: 'Na hlavu', ikona: '👑' },
  { id: 'bryle', nazev: 'Brýle', ikona: '🕶️' },
  { id: 'tvar', nazev: 'Obličej', ikona: '✨' },
  { id: 'ruka', nazev: 'V ruce', ikona: '🍦' },
  { id: 'mazlicek', nazev: 'Mazlíček', ikona: '🐾' },
  { id: 'pozadi', nazev: 'Pozadí', ikona: '🖼️', povinne: true },
];

export const VECI = [
  { id: 'k1', kat: 'kuze', nazev: 'Světlá', cena: 0 }, { id: 'k2', kat: 'kuze', nazev: 'Béžová', cena: 0 },
  { id: 'k3', kat: 'kuze', nazev: 'Snědá', cena: 0 }, { id: 'k4', kat: 'kuze', nazev: 'Tmavá', cena: 0 },

  { id: 'culik', kat: 'uces', nazev: 'Culík', cena: 0 }, { id: 'dlouhe', kat: 'uces', nazev: 'Dlouhé', cena: 0 },
  { id: 'mikada', kat: 'uces', nazev: 'Mikáda', cena: 0 }, { id: 'dva', kat: 'uces', nazev: 'Dva culíky', cena: 20 },
  { id: 'drdol', kat: 'uces', nazev: 'Drdol', cena: 25 }, { id: 'kudrny', kat: 'uces', nazev: 'Kudrny', cena: 40 },

  { id: 'hneda', kat: 'barva', nazev: 'Hnědá', cena: 0, c: '#8a4b2f' }, { id: 'blond', kat: 'barva', nazev: 'Blond', cena: 0, c: '#e8c06a' },
  { id: 'cerna', kat: 'barva', nazev: 'Černá', cena: 0, c: '#2f2530' }, { id: 'zrzava', kat: 'barva', nazev: 'Zrzavá', cena: 0, c: '#c8592b' },
  { id: 'ruzova', kat: 'barva', nazev: 'Růžová', cena: 60, c: '#ff8fc4' }, { id: 'lila', kat: 'barva', nazev: 'Lila', cena: 60, c: '#b69cff' },
  { id: 'modra', kat: 'barva', nazev: 'Modrá', cena: 70, c: '#6fa8ff' }, { id: 'matova', kat: 'barva', nazev: 'Mátová', cena: 70, c: '#6fd4bd' },

  { id: 'mikina-lila', kat: 'obleceni', nazev: 'Lila mikina', cena: 0 }, { id: 'mikina-ruzova', kat: 'obleceni', nazev: 'Růžová mikina', cena: 0 },
  { id: 'mikina-mata', kat: 'obleceni', nazev: 'Mátová mikina', cena: 20 }, { id: 'srdce', kat: 'obleceni', nazev: 'Tričko se srdcem', cena: 30 },
  { id: 'pruhy', kat: 'obleceni', nazev: 'Pruhovaný svetr', cena: 40 }, { id: 'dziny', kat: 'obleceni', nazev: 'Džínová bunda', cena: 55 },
  { id: 'hvezdy', kat: 'obleceni', nazev: 'Hvězdná mikina', cena: 70 }, { id: 'duha', kat: 'obleceni', nazev: 'Duhový svetr', cena: 120 },
  { id: 'zlata', kat: 'obleceni', nazev: 'Zlatá bunda', cena: 250 },

  { id: 'masle', kat: 'hlava', nazev: 'Mašle', cena: 25 }, { id: 'kulich', kat: 'hlava', nazev: 'Kulich', cena: 35 },
  { id: 'ksiltovka', kat: 'hlava', nazev: 'Kšiltovka', cena: 40 }, { id: 'kvetiny', kat: 'hlava', nazev: 'Věneček', cena: 45 },
  { id: 'ousko', kat: 'hlava', nazev: 'Kočičí ouška', cena: 60 }, { id: 'sluchatka', kat: 'hlava', nazev: 'Sluchátka', cena: 70 },
  { id: 'korunka', kat: 'hlava', nazev: 'Korunka', cena: 200 },

  { id: 'nerd', kat: 'bryle', nazev: 'Nerd brýle', cena: 25 }, { id: 'kulate', kat: 'bryle', nazev: 'Kulaté', cena: 30 },
  { id: 'slunecni', kat: 'bryle', nazev: 'Sluneční', cena: 40 }, { id: 'srdickove', kat: 'bryle', nazev: 'Srdíčkové', cena: 50 },
  { id: 'hvezdickove', kat: 'bryle', nazev: 'Hvězdičkové', cena: 80 },

  { id: 'pihy', kat: 'tvar', nazev: 'Pihy', cena: 10 }, { id: 'srdicka', kat: 'tvar', nazev: 'Srdíčka na tvářích', cena: 20 },
  { id: 'trpytky', kat: 'tvar', nazev: 'Třpytky', cena: 30 },

  { id: 'susenka', kat: 'ruka', nazev: 'Sušenka', cena: 0, e: '🍪' }, { id: 'kniha', kat: 'ruka', nazev: 'Kniha', cena: 15, e: '📘' },
  { id: 'zmrzlina', kat: 'ruka', nazev: 'Zmrzlina', cena: 25, e: '🍦' }, { id: 'mobil', kat: 'ruka', nazev: 'Mobil', cena: 30, e: '📱' },
  { id: 'ovladac', kat: 'ruka', nazev: 'Ovladač', cena: 40, e: '🎮' }, { id: 'mikrofon', kat: 'ruka', nazev: 'Mikrofon', cena: 50, e: '🎤' },
  { id: 'boba', kat: 'ruka', nazev: 'Bubble tea', cena: 60, e: '🧋' },

  { id: 'kralicek', kat: 'mazlicek', nazev: 'Králíček', cena: 70, e: '🐰' }, { id: 'kocka', kat: 'mazlicek', nazev: 'Kočička', cena: 80, e: '🐱' },
  { id: 'pejsek', kat: 'mazlicek', nazev: 'Pejsek', cena: 80, e: '🐶' }, { id: 'krecek', kat: 'mazlicek', nazev: 'Křeček', cena: 90, e: '🐹' },
  { id: 'chobotnicka', kat: 'mazlicek', nazev: 'Chobotnička', cena: 120, e: '🐙' }, { id: 'dracek', kat: 'mazlicek', nazev: 'Dráček', cena: 250, e: '🐲' },
  { id: 'jednorozec', kat: 'mazlicek', nazev: 'Jednorožec', cena: 300, e: '🦄' },

  { id: 'p-ruzove', kat: 'pozadi', nazev: 'Růžové', cena: 0, c: ['#ffd6e8', '#ffb3d1'] },
  { id: 'p-lila', kat: 'pozadi', nazev: 'Lila', cena: 0, c: ['#e9e0ff', '#cbb8ff'] },
  { id: 'p-mata', kat: 'pozadi', nazev: 'Mátové', cena: 15, c: ['#dcf7ef', '#a8e8d6'] },
  { id: 'p-slunce', kat: 'pozadi', nazev: 'Sluníčko', cena: 15, c: ['#fff3c4', '#ffd76e'] },
  { id: 'p-srdicka', kat: 'pozadi', nazev: 'Srdíčka', cena: 60, c: ['#ffe1ee', '#ff9cc7'], vzor: '♥' },
  { id: 'p-noc', kat: 'pozadi', nazev: 'Hvězdná noc', cena: 80, c: ['#3d3478', '#1f1a45'], vzor: '✦' },
  { id: 'p-duha', kat: 'pozadi', nazev: 'Duha', cena: 100, duha: true },
];

export const vec = id => VECI.find(v => v.id === id);
export const VYCHOZI = { kuze: 'k1', uces: 'culik', barva: 'hneda', obleceni: 'mikina-lila', ruka: 'susenka', pozadi: 'p-ruzove' };
export const maVec = (profil, v) => v.cena === 0 || profil.koupeno.includes(v.id);

export function nahodnyVzhled() {
  const zdarma = kat => VECI.filter(v => v.kat === kat && v.cena === 0);
  const vyber = kat => { const z = zdarma(kat); return z[Math.floor(Math.random() * z.length)].id; };
  return { ...VYCHOZI, kuze: vyber('kuze'), uces: vyber('uces'), barva: vyber('barva'), obleceni: vyber('obleceni'), pozadi: vyber('pozadi') };
}

// ---------- Kreslení ----------
let pocitadlo = 0;

function vlasyVzadu(uces, c) {
  switch (uces) {
    case 'culik': return `<path d="M78 22 q26 -6 24 22 q-2 18 -14 26 q8 -18 -2 -30 z" fill="${c}"/>`;
    case 'dlouhe': return `<path d="M33 50 q-4 40 4 52 l46 0 q8 -12 4 -52 z" fill="${c}"/>`;
    case 'mikada': return `<path d="M32 52 q-2 22 6 26 l44 0 q8 -4 6 -26 z" fill="${c}"/>`;
    case 'dva': return `<circle cx="28" cy="62" r="11" fill="${c}"/><circle cx="92" cy="62" r="11" fill="${c}"/>
      <path d="M26 72 q-6 12 2 20 q2 -10 6 -16z M94 72 q6 12 -2 20 q-2 -10 -6 -16z" fill="${c}"/>`;
    case 'drdol': return `<circle cx="60" cy="24" r="14" fill="${c}"/>`;
    case 'kudrny': return [[34, 44], [30, 60], [36, 74], [86, 44], [90, 60], [84, 74], [44, 30], [60, 26], [76, 30]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}"/>`).join('');
    default: return '';
  }
}

function obleceni(id) {
  const telo = fill => `<path d="M28 120 q2 -30 32 -32 q30 2 32 32 z" fill="${fill}"/>`;
  const snurky = c => `<path d="M52 90 l8 10 l8 -10" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  switch (id) {
    case 'mikina-ruzova': return telo('#ff8fbf') + snurky('#e8679f');
    case 'mikina-mata': return telo('#7fd8c4') + snurky('#4fb79f');
    case 'srdce': return telo('#ffffff') + `<path d="M60 112 l-9 -9 c-5 -6 3 -12 9 -5 c6 -7 14 -1 9 5 z" fill="#ff6fae"/>`;
    case 'pruhy': {
      const id2 = 'pr' + (++pocitadlo);
      return `<clipPath id="${id2}"><path d="M28 120 q2 -30 32 -32 q30 2 32 32 z"/></clipPath>
        <g clip-path="url(#${id2})"><rect x="20" y="86" width="80" height="40" fill="#fff"/>
        ${[92, 102, 112].map(y => `<rect x="20" y="${y}" width="80" height="5" fill="#ff8fbf"/>`).join('')}</g>`;
    }
    case 'dziny': return telo('#6f97d6') + `<path d="M60 92 l0 28" stroke="#4d73b0" stroke-width="2"/>
      <circle cx="56" cy="102" r="1.8" fill="#e8d18a"/><circle cx="56" cy="112" r="1.8" fill="#e8d18a"/>
      <path d="M46 92 l14 8 l14 -8" stroke="#4d73b0" stroke-width="2.4" fill="none"/>`;
    case 'hvezdy': return telo('#2f3a78') + [[45, 104], [70, 98], [62, 113], [80, 110]].map(([x, y]) =>
      `<text x="${x}" y="${y}" font-size="7" fill="#ffd76e" text-anchor="middle">★</text>`).join('') + snurky('#ffd76e');
    case 'duha': {
      const id2 = 'du' + (++pocitadlo);
      return `<clipPath id="${id2}"><path d="M28 120 q2 -30 32 -32 q30 2 32 32 z"/></clipPath>
        <g clip-path="url(#${id2})">${['#ff7a8a', '#ffb066', '#ffe066', '#7fd8a4', '#7fb3ff', '#b69cff']
          .map((c, i) => `<rect x="20" y="${86 + i * 6}" width="80" height="6.5" fill="${c}"/>`).join('')}</g>`;
    }
    case 'zlata': return telo('#f2c94c') + `<path d="M28 120 q2 -30 32 -32 q30 2 32 32 z" fill="none" stroke="#fff3b0" stroke-width="1.5" stroke-dasharray="2 4"/>`
      + snurky('#c9962c') + `<path d="M40 104 l1.5 3.5 l3.5 1.5 l-3.5 1.5 l-1.5 3.5 l-1.5 -3.5 l-3.5 -1.5 l3.5 -1.5z" fill="#fff"/>`;
    default: return telo('#b69cff') + snurky('#9a7cf0');
  }
}

function naHlavu(id, cVlasu) {
  switch (id) {
    case 'masle': return `<path d="M72 26 l-10 -8 l0 16 z M72 26 l10 -8 l0 16 z" fill="#ff6fae"/><circle cx="72" cy="26" r="4" fill="#e8559a"/>`;
    case 'kulich': return `<path d="M33 44 q2 -28 27 -28 q25 0 27 28 z" fill="#ff8fbf"/><rect x="31" y="40" width="58" height="9" rx="4.5" fill="#fff"/><circle cx="60" cy="14" r="7" fill="#fff"/>`;
    case 'ksiltovka': return `<path d="M34 40 q2 -24 26 -24 q24 0 26 24 z" fill="#7fb3ff"/><path d="M30 40 l58 0 q14 0 16 6 l-74 0 z" fill="#5a8fe0"/><circle cx="60" cy="17" r="2.5" fill="#5a8fe0"/>`;
    case 'kvetiny': return [[38, 34, '#ff8fbf'], [48, 27, '#ffd76e'], [60, 24, '#b69cff'], [72, 27, '#7fd8c4'], [82, 34, '#ff8fbf']]
      .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="${c}"/><circle cx="${x}" cy="${y}" r="2" fill="#fff6c9"/>`).join('');
    case 'ousko': return `<path d="M36 34 l2 -20 l14 12 z M84 34 l-2 -20 l-14 12 z" fill="${cVlasu}"/><path d="M40 30 l1 -10 l7 6 z M80 30 l-1 -10 l-7 6 z" fill="#ffadc6"/>`;
    case 'sluchatka': return `<path d="M32 54 q0 -36 28 -36 q28 0 28 36" stroke="#3b2a3f" stroke-width="4" fill="none"/>
      <rect x="26" y="48" width="10" height="16" rx="5" fill="#ff6fae"/><rect x="84" y="48" width="10" height="16" rx="5" fill="#ff6fae"/>`;
    case 'korunka': return `<path d="M42 30 l4 -16 l8 10 l6 -14 l6 14 l8 -10 l4 16 z" fill="#ffd34d" stroke="#e0a800" stroke-width="1.5"/>
      <circle cx="60" cy="22" r="2.5" fill="#ff6fae"/><circle cx="48" cy="25" r="1.8" fill="#7fb3ff"/><circle cx="72" cy="25" r="1.8" fill="#7fd8c4"/>`;
    default: return '';
  }
}

function bryle(id) {
  switch (id) {
    case 'nerd': return `<rect x="41" y="45" width="17" height="14" rx="3" fill="none" stroke="#2f2530" stroke-width="3"/><rect x="62" y="45" width="17" height="14" rx="3" fill="none" stroke="#2f2530" stroke-width="3"/><path d="M58 51 l4 0" stroke="#2f2530" stroke-width="3"/>`;
    case 'kulate': return `<circle cx="50" cy="52" r="8" fill="none" stroke="#c9843a" stroke-width="2.2"/><circle cx="70" cy="52" r="8" fill="none" stroke="#c9843a" stroke-width="2.2"/><path d="M58 52 l4 0" stroke="#c9843a" stroke-width="2.2"/>`;
    case 'slunecni': return `<path d="M40 47 l18 0 l-2 10 q-7 4 -14 0 z M62 47 l18 0 l-2 10 q-7 4 -14 0 z" fill="#2f2530"/><path d="M58 49 l4 0" stroke="#2f2530" stroke-width="2.5"/><path d="M44 49 l5 0" stroke="#fff" stroke-width="1.5" opacity=".6"/>`;
    case 'srdickove': return `<path d="M50 61 l-9 -9 c-5 -6 3 -12 9 -5 c6 -7 14 -1 9 5 z M70 61 l-9 -9 c-5 -6 3 -12 9 -5 c6 -7 14 -1 9 5 z" fill="#ff6fae" opacity=".85"/><path d="M58 50 l4 0" stroke="#ff6fae" stroke-width="2.5"/>`;
    case 'hvezdickove': return `<text x="50" y="58" font-size="20" text-anchor="middle" fill="#ffc94d">★</text><text x="70" y="58" font-size="20" text-anchor="middle" fill="#ffc94d">★</text>`;
    default: return '';
  }
}

function tvar(id) {
  switch (id) {
    case 'pihy': return [[45, 59], [48, 62], [43, 63], [75, 59], [72, 62], [77, 63]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#a65f3d"/>`).join('');
    case 'srdicka': return `<path d="M44 66 l-4 -4 c-2 -3 1 -5 4 -2 c3 -3 6 -1 4 2 z M76 66 l-4 -4 c-2 -3 1 -5 4 -2 c3 -3 6 -1 4 2 z" fill="#ff6fae"/>`;
    case 'trpytky': return `<path d="M38 44 l1.2 3 l3 1.2 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2 l3 -1.2z M84 64 l1 2.5 l2.5 1 l-2.5 1 l-1 2.5 l-1 -2.5 l-2.5 -1 l2.5 -1z" fill="#ffc94d"/>`;
    default: return '';
  }
}

function pozadi(id) {
  const v = vec(id) || vec('p-ruzove');
  const gid = 'pz' + (++pocitadlo);
  if (v.duha) {
    return `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">${['#ff9aa8', '#ffc58a', '#fff09a', '#a8ecc0', '#a8cbff', '#d3c2ff']
      .map((c, i) => `<stop offset="${i / 5}" stop-color="${c}"/>`).join('')}</linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(#${gid})"/>`;
  }
  const vzor = v.vzor ? [[18, 30], [96, 24], [14, 84], [104, 78], [30, 104], [92, 102]]
    .map(([x, y]) => `<text x="${x}" y="${y}" font-size="11" fill="#fff" opacity=".7" text-anchor="middle">${v.vzor}</text>`).join('') : '';
  return `<defs><radialGradient id="${gid}"><stop offset="0" stop-color="${v.c[0]}"/><stop offset="1" stop-color="${v.c[1]}"/></radialGradient></defs>
    <circle cx="60" cy="60" r="60" fill="url(#${gid})"/>${vzor}`;
}

// velikost v px; vyrez: 'cela' (celá postavička) nebo 'hlava' (malý avatar v seznamech)
export function postavicka(vzhled = VYCHOZI, velikost = 120, vyrez = 'cela') {
  const z = { ...VYCHOZI, ...vzhled };
  const kuze = KUZE[z.kuze] || KUZE.k1;
  const c = vec(z.barva)?.c || '#8a4b2f';
  const ruka = vec(z.ruka)?.e;
  const mazl = vec(z.mazlicek)?.e;
  const id = 'cl' + (++pocitadlo);
  const viewBox = vyrez === 'hlava' ? '12 8 96 96' : '0 0 120 120';
  return `<svg class="postavicka" width="${velikost}" height="${velikost}" viewBox="${viewBox}" aria-hidden="true">
    <clipPath id="${id}"><circle cx="60" cy="60" r="60"/></clipPath>
    <g clip-path="url(#${id})">
    ${pozadi(z.pozadi)}
    ${vlasyVzadu(z.uces, c)}
    ${obleceni(z.obleceni)}
    <ellipse cx="60" cy="56" rx="25" ry="26" fill="${kuze}"/>
    <path d="M34 54 q-2 -30 26 -32 q28 2 26 30 q-8 -14 -26 -16 q-16 2 -26 18 z" fill="${c}"/>
    ${z.uces === 'culik' ? '<circle cx="80" cy="24" r="5" fill="#ff6fae"/>' : ''}
    <circle cx="50" cy="52" r="3.4" fill="#3b2a3f"/><circle cx="70" cy="52" r="3.4" fill="#3b2a3f"/>
    <circle cx="51.2" cy="50.8" r="1.1" fill="#fff"/><circle cx="71.2" cy="50.8" r="1.1" fill="#fff"/>
    <ellipse cx="44" cy="61" rx="4.5" ry="3" fill="#ffadc6" opacity=".8"/><ellipse cx="76" cy="61" rx="4.5" ry="3" fill="#ffadc6" opacity=".8"/>
    <path d="M53 63 q7 8 14 0" stroke="#3b2a3f" stroke-width="2.4" fill="#ff8fab" stroke-linecap="round"/>
    ${tvar(z.tvar)}
    ${bryle(z.bryle)}
    ${naHlavu(z.hlava, c)}
    ${ruka ? `<text x="96" y="110" font-size="26" text-anchor="middle">${ruka}</text><ellipse cx="84" cy="104" rx="6" ry="5" fill="${kuze}"/>` : ''}
    ${mazl ? `<text x="25" y="106" font-size="24" text-anchor="middle">${mazl}</text>` : ''}
    </g></svg>`;
}
