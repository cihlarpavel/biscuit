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
// Zvolený svět, nebo automaticky ten nejnovější odemčený.
export const svetPro = p => (p && odemcene(p).find(s => s.id === p.svet)) || (p ? odemcene(p).pop() : SVETY[0]);

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
