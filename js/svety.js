// Světy = pozadí aplikace. Odemykají se podle sušenek nasbíraných celkem (utrácení postup nesnižuje),
// takže pozadí roste s tím, kolik se dítě učí. Prahy odpovídají titulům v hlasky.js.
import { TITULY } from './hlasky.js';

// Čmáranice do opakované dlaždice 220×220. Každý motiv se kreslí kolem bodu (0, 0).
const MOTIVY = {
  srdce: c => `<path d="M0 6 c-8 -10 -22 0 -12 12 l12 12 l12 -12 c10 -12 -4 -22 -12 -12z" stroke="${c}"/>`,
  hvezda: c => `<path d="M0 -12 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4z" stroke="${c}"/>`,
  susenka: c => `<circle r="13" stroke="${c}"/><circle cx="-4" cy="-3" r="1.6" fill="${c}"/><circle cx="5" cy="3" r="1.6" fill="${c}"/>`,
  vlnka: c => `<path d="M-30 0 q10 -10 20 0 t20 0 t20 0" stroke="${c}"/>`,
  tecka: c => `<circle r="3" stroke="${c}"/>`,
  kriz: c => `<path d="M-4 0 h8 M0 -4 v8" stroke="${c}"/>`,
  kvet: c => `<circle r="4" stroke="${c}"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-10" rx="4.5" ry="6" stroke="${c}" transform="rotate(${a})"/>`).join('')}`,
  list: c => `<path d="M-10 8 q0 -20 20 -18 q2 20 -20 18z M-10 8 l14 -12" stroke="${c}"/>`,
  slunce: c => `<circle r="9" stroke="${c}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 -14 v-5" stroke="${c}" transform="rotate(${a})"/>`).join('')}`,
  musle: c => `<path d="M-12 6 q0 -18 12 -18 q12 0 12 18z M-6 6 l3 -16 M0 6 v-18 M6 6 l-3 -16" stroke="${c}"/>`,
  lizatko: c => `<circle cy="-8" r="9" stroke="${c}"/><path d="M0 -8 m0 -4 a4 4 0 1 1 -4 4" stroke="${c}"/><path d="M0 1 v16" stroke="${c}"/>`,
  bonbon: c => `<ellipse rx="9" ry="6" stroke="${c}"/><path d="M-9 0 l-7 -6 v12z M9 0 l7 -6 v12z" stroke="${c}"/>`,
  mesic: c => `<path d="M4 -12 a12 12 0 1 0 8 18 a10 10 0 1 1 -8 -18z" stroke="${c}"/>`,
  bublina: c => `<circle r="8" stroke="${c}"/><path d="M-3 -4 a4 4 0 0 1 4 -2" stroke="${c}"/>`,
  rybka: c => `<path d="M-12 0 q10 -10 20 0 q-10 10 -20 0z M8 0 l8 -6 v12z" stroke="${c}"/><circle cx="-5" cy="-1" r="1.2" fill="${c}"/>`,
  planeta: c => `<circle r="9" stroke="${c}"/><ellipse rx="17" ry="5" stroke="${c}" transform="rotate(-20)"/>`,
  raketa: c => `<path d="M0 -16 q8 8 6 20 h-12 q-2 -12 6 -20z M-6 4 l-5 7 l5 -2 M6 4 l5 7 l-5 -2" stroke="${c}"/><circle cy="-4" r="2.5" stroke="${c}"/>`,
};

// Rozložení jako u původní růžové tapety: 5 velkých motivů, mezi nimi drobné tečky a křížky.
// Bez natáčení a s větším odstupem, ať je pozadí jemné a nepřebíjí obsah.
const ROZLOZENI = [[30, 42, 'v'], [160, 30, 'v'], [170, 150, 'v'], [70, 160, 'v'], [200, 100, 'v'],
  [100, 95, 'm'], [80, 30, 'm'], [125, 190, 'm'], [20, 110, 'm'], [120, 150, 'm']];
const MALE = ['tecka', 'kriz', 'hvezda'];

function dlazdice(motivy) {
  const velke = motivy.filter(([m]) => !MALE.includes(m) || m === 'hvezda');
  const male = motivy.filter(([m]) => MALE.includes(m));
  let iv = 0, im = 0;
  const tvary = ROZLOZENI.map(([x, y, druh]) => {
    const [motiv, barva] = druh === 'v' ? velke[iv++ % velke.length] : (male.length ? male[im++ % male.length] : ['tecka', velke[0][1]]);
    const meritko = druh === 'm' ? (motiv === 'hvezda' ? .55 : 1) : (['srdce', 'susenka', 'vlnka', 'hvezda'].includes(motiv) ? 1 : .75);
    return `<g transform="translate(${x} ${y}) scale(${meritko})">${MOTIVY[motiv](barva)}</g>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" opacity=".5">${tvary}</g></svg>`;
  return `url('data:image/svg+xml,${encodeURIComponent(svg)}')`; // jednoduché uvozovky: vkládá se i do style=""
}

export const SVETY = [
  { id: 'cukrarna', nazev: 'Cukrárna', ikona: '🍪', bg: '#fff4f8',
    motivy: [['srdce', '#ff8fbf'], ['hvezda', '#c4a7ff'], ['susenka', '#f0b46e'], ['vlnka', '#7fd8c4'], ['hvezda', '#ffc94d'], ['srdce', '#c4a7ff'], ['tecka', '#7fd8c4'], ['tecka', '#ff8fbf'], ['kriz', '#ffc94d'], ['kriz', '#ff8fbf']] },
  { id: 'louka', nazev: 'Louka', ikona: '🌼', bg: '#f1fbef',
    motivy: [['kvet', '#ff8fbf'], ['list', '#6fcf7f'], ['kvet', '#ffc94d'], ['list', '#9ad96a'], ['kvet', '#b69cff'], ['vlnka', '#6fcf7f'], ['tecka', '#ffc94d'], ['srdce', '#ff8fbf'], ['kriz', '#6fcf7f'], ['list', '#6fcf7f']] },
  { id: 'plaz', nazev: 'Pláž', ikona: '🏖️', bg: '#fffaea',
    motivy: [['slunce', '#ffc94d'], ['musle', '#ff9f8a'], ['vlnka', '#5ec4e8'], ['rybka', '#5ec4e8'], ['hvezda', '#ff9f8a'], ['vlnka', '#5ec4e8'], ['tecka', '#ffc94d'], ['musle', '#f0b46e'], ['kriz', '#5ec4e8'], ['tecka', '#ff9f8a']] },
  { id: 'bonbony', nazev: 'Bonbonová země', ikona: '🍭', bg: '#f7f0ff',
    motivy: [['lizatko', '#ff6fae'], ['bonbon', '#9b7bff'], ['srdce', '#ff6fae'], ['lizatko', '#5ec4e8'], ['bonbon', '#ffb02e'], ['hvezda', '#9b7bff'], ['tecka', '#ff6fae'], ['susenka', '#f0b46e'], ['kriz', '#9b7bff'], ['tecka', '#5ec4e8']] },
  { id: 'noc', nazev: 'Noční obloha', ikona: '🌙', bg: '#eef0ff',
    motivy: [['mesic', '#7b78e8'], ['hvezda', '#ffc94d'], ['hvezda', '#7b78e8'], ['tecka', '#ffc94d'], ['kriz', '#7b78e8'], ['hvezda', '#b69cff'], ['tecka', '#7b78e8'], ['mesic', '#b69cff'], ['kriz', '#ffc94d'], ['hvezda', '#ffc94d']] },
  { id: 'more', nazev: 'Pod mořem', ikona: '🐠', bg: '#ecfafc',
    motivy: [['rybka', '#3fb6d6'], ['bublina', '#5ec4e8'], ['musle', '#ff9f8a'], ['vlnka', '#3fb6d6'], ['bublina', '#7fd8c4'], ['rybka', '#ff9f8a'], ['tecka', '#5ec4e8'], ['hvezda', '#ff9f8a'], ['bublina', '#3fb6d6'], ['list', '#3fbf8f']] },
  { id: 'vesmir', nazev: 'Vesmír', ikona: '🪐', bg: '#f3eeff',
    motivy: [['planeta', '#9b7bff'], ['raketa', '#ff6fae'], ['hvezda', '#ffc94d'], ['planeta', '#5ec4e8'], ['mesic', '#ffc94d'], ['hvezda', '#ff6fae'], ['tecka', '#9b7bff'], ['raketa', '#5ec4e8'], ['kriz', '#ffc94d'], ['hvezda', '#9b7bff']] },
].map((s, i) => ({ ...s, od: TITULY[i][0], titul: TITULY[i][1] }));

export const nasbirano = p => Math.max(p.susenkyCelkem || 0, p.susenky || 0);
export const odemcene = p => SVETY.filter(s => nasbirano(p) >= s.od);
// Světy se 2. 10. 2026 zrušily (Pavel): aplikace má jedno pozadí, Cukrárnu. Tituly za sušenky zůstávají.
export const svetPro = () => SVETY[0];

const cache = new Map();
export function nastavSvet(p) {
  const s = svetPro(p);
  if (!cache.has(s.id)) cache.set(s.id, dlazdice(s.motivy));
  const r = document.documentElement.style;
  r.setProperty('--pozadi-kresby', cache.get(s.id));
  r.setProperty('--bg', s.bg);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', s.bg);
}
export const nahledSveta = s => dlazdice(s.motivy);

// ---------- Scénka na hlavní kartě (podle světa, v noci vždy noční) ----------
// SVG 400×220 roztažené přes kartu (slice). Postavička stojí vlevo dole, vpravo jsou bubliny s textem.
const O_ = 'stroke="#3b2a3f" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
const mrak = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-30 10 q-12 0 -10 -12 q2 -10 14 -8 q4 -14 20 -12 q14 2 16 14 q14 -2 16 10 q0 10 -12 10z" fill="#fff" ${O_} stroke-width="2"/></g>`;
const hvezda = (x, y, r, c = '#fff6c9') => `<path d="M${x} ${y - r} l${r * .3} ${r * .7} l${r * .7} ${r * .3} l${-r * .7} ${r * .3} l${-r * .3} ${r * .7} l${-r * .3} ${-r * .7} l${-r * .7} ${-r * .3} l${r * .7} ${-r * .3}z" fill="${c}"/>`;
const nebe = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="220" fill="url(#${id})"/>`;
let sc = 0;

const SCENY = {
  cukrarna: id => nebe(id, '#ffc6e2', '#fff1f7') +
    [['#ff9aa8', 150], ['#ffc58a', 136], ['#fff09a', 122], ['#a8ecc0', 108], ['#a8cbff', 94], ['#d3c2ff', 80]]
      .map(([c, r]) => `<path d="M${310 - r} 230 a${r} ${r} 0 0 1 ${2 * r} 0" fill="none" stroke="${c}" stroke-width="14"/>`).join('') +
    mrak(170, 40, 1) + mrak(360, 70, .8) +
    `<path d="M0 180 q20 -14 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V220 H0z" fill="#ff9fcc" ${O_}/>` +
    `<path d="M60 182 v10 a4 4 0 0 0 8 0 v-8 M220 182 v14 a4 4 0 0 0 8 0 v-12 M330 182 v8 a4 4 0 0 0 8 0 v-6" fill="#ff9fcc"/>` +
    [[30, 200, '#fff09a'], [110, 205, '#a8cbff'], [190, 198, '#fff'], [270, 206, '#a8ecc0'], [360, 200, '#d3c2ff'], [150, 212, '#ffc58a']]
      .map(([x, y, c], i) => `<rect x="${x}" y="${y}" width="10" height="3.5" rx="1.7" fill="${c}" transform="rotate(${i * 37} ${x + 5} ${y + 2})"/>`).join(''),
  louka: id => nebe(id, '#9fdcff', '#e9f8ff') +
    `<circle cx="345" cy="48" r="24" fill="#ffd34d" ${O_}/>` + [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M345 48 m0 -32 v-9" ${O_} stroke="#ffb703" transform="rotate(${a} 345 48)"/>`).join('') +
    mrak(170, 45, 1) + mrak(260, 80, .7) +
    `<path d="M0 170 q80 -50 180 -10 q90 30 220 -20 V220 H0z" fill="#9be08a" ${O_}/><path d="M0 195 q120 -40 230 0 q90 28 170 -6 V220 H0z" fill="#6fcf7f" ${O_}/>` +
    [[60, 168], [120, 158], [250, 172], [300, 160], [370, 150], [200, 200], [330, 205]].map(([x, y], i) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-4.5" rx="3" ry="4" fill="${['#fff', '#ffd6e8', '#fff1a8'][i % 3]}" transform="rotate(${a})"/>`).join('')}<circle r="2.5" fill="#ffd34d"/></g>`).join(''),
  plaz: id => nebe(id, '#9fdcff', '#fff4dc') +
    `<circle cx="340" cy="52" r="26" fill="#ffd34d" ${O_}/>` + mrak(160, 40, .9) +
    `<path d="M0 140 H400 V180 H0z" fill="#5ec4e8"/><path d="M0 140 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="#fff" stroke-width="4"/>` +
    `<path d="M40 160 q20 -6 40 0 M240 158 q20 -6 40 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M0 182 q100 -20 200 0 t200 -4 V220 H0z" fill="#ffe1a6" ${O_}/>` +
    `<path d="M300 200 q0 -14 12 -14 q12 0 12 14z" fill="#ffb3c7" ${O_}/><circle cx="230" cy="205" r="4" fill="#ff9f8a"/><circle cx="120" cy="208" r="3" fill="#fff"/>`,
  bonbony: id => nebe(id, '#e3d1ff', '#ffe6f4') + mrak(120, 40, .8) + mrak(330, 55, .9) +
    `<path d="M0 175 q100 -40 200 0 t200 -10 V220 H0z" fill="#d3b8ff" ${O_}/>` +
    [[230, 168, '#ff6fae'], [300, 160, '#4dc3f0'], [370, 170, '#ffb02e']].map(([x, y, c]) => `<path d="M${x} ${y} v-40" ${O_}/><circle cx="${x}" cy="${y - 52}" r="16" fill="${c}" ${O_}/><path d="M${x} ${y - 52} m0 -9 a9 9 0 1 1 -9 9 a5 5 0 1 1 5 -5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`).join('') +
    [[40, 200, '#ff6fae'], [130, 205, '#9b7bff'], [180, 196, '#4dc3f0']].map(([x, y, c]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="${c}" ${O_} stroke-width="1.8"/>`).join(''),
  noc: id => nebe(id, '#2b2160', '#5b3f9e') +
    `<path d="M330 30 a26 26 0 1 0 22 42 a20 20 0 1 1 -22 -42z" fill="#fff6c9" ${O_}/>` +
    [[60, 40, 5], [140, 25, 4], [220, 55, 6], [270, 20, 3.5], [380, 110, 4], [180, 100, 3], [40, 110, 3.5], [300, 120, 3]].map(([x, y, r]) => hvezda(x, y, r)).join('') +
    `<path d="M0 175 q90 -40 200 -5 q100 30 200 -15 V220 H0z" fill="#3a2d6e" ${O_} stroke="#1d1733"/>`,
  more: id => nebe(id, '#7ed6f2', '#2f8fc9') +
    [[70, 60, 8], [90, 40, 5], [320, 80, 10], [340, 50, 6], [250, 120, 5], [180, 30, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="2"/>`).join('') +
    `<path d="M210 70 q15 -12 30 0 q-15 12 -30 0z M240 70 l9 -7 v14z" fill="#ffb03b" ${O_} stroke-width="2"/>` +
    `<path d="M0 190 q100 -20 200 0 t200 0 V220 H0z" fill="#ffe1a6" ${O_}/>` +
    [[250, 192], [290, 194], [370, 190]].map(([x, y]) => `<path d="M${x} ${y} q-10 -20 0 -40 q10 -20 0 -40" fill="none" stroke="#3fbf8f" stroke-width="7" stroke-linecap="round"/>`).join(''),
  vesmir: id => nebe(id, '#24164f', '#5a2f8f') +
    [[50, 30, 4], [120, 60, 3], [200, 20, 5], [260, 70, 3], [390, 40, 4], [160, 110, 3], [30, 120, 3]].map(([x, y, r]) => hvezda(x, y, r)).join('') +
    `<circle cx="330" cy="70" r="30" fill="#ff9f6b" ${O_}/><ellipse cx="330" cy="70" rx="50" ry="12" fill="none" ${O_} stroke="#ffd34d" stroke-width="5" transform="rotate(-18 330 70)"/>` +
    `<circle cx="240" cy="150" r="14" fill="#7fd8c4" ${O_}/>` +
    `<path d="M0 200 q200 -30 400 0 V220 H0z" fill="#8a7bbf" ${O_}/>`,
};

export function scena(id) {
  const k = 'sc' + (++sc);
  return `<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${(SCENY[id] || SCENY.cukrarna)(k)}</svg>`;
}
