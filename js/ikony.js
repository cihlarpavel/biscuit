// Vlastní sada ikon ve stylu nálepky: pootočený pastelový podklad, tmavý obrys, výrazné výplně.
// ik('nazev', velikost). Mřížka 48×48. Nová ikona = položka v KRESBY (+ barva podkladu v PODKLAD).
// Když je ve složce ilustrace malovaný obrázek stejného jména (viz ILUSTRACE_JMENA), použije se místo kresby.
import { ma, obr } from './obrazky.js';
const ILUSTRACE_JMENA = { domu: 'tab-domu', hra: 'truhla' };

const O = '#3b2a3f';
const t = `stroke="${O}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"`;
const jiskra = (x, y, r = 3, c = '#fff') => `<path d="M${x} ${y - r} l${r * .3} ${r * .7} l${r * .7} ${r * .3} l-${r * .7} ${r * .3} l-${r * .3} ${r * .7} l-${r * .3} -${r * .7} l-${r * .7} -${r * .3} l${r * .7} -${r * .3}z" fill="${c}"/>`;

const PODKLAD = {
  hra: '#fff1c2',
  'k-kuze': '#ffe3d6', 'k-uces': '#fff1c2', 'k-barva': '#e3d9ff', 'k-oci': '#d6ecff', 'k-duhovka': '#d6f5ec', 'k-pusa': '#ffd6e8', 'k-hlava': '#d6ecff', 'k-bryle': '#e3d9ff', 'k-nausnice': '#fff1c2', 'k-piercing': '#e3d9ff', 'k-nahrdelnik': '#ffd6e8', 'k-naramek': '#d6f5ec', 'k-vousy': '#ffe3d6', 'k-tvar': '#e3d9ff', 'k-maska': '#fff1c2', 'k-ruka': '#ffd6e8', 'k-pozadi': '#d6f5ec', 'o-prvni': '#e3d9ff', 'o-perfekt': '#fff1c2', 'o-kometa': '#ffe3d6', 'o-sopka': '#ffe3d6', 'o-kniha': '#d6f5ec', 'o-knihy': '#d6ecff', 'o-mozek': '#ffd6e8', 'o-stopky': '#e3d9ff', 'o-presypaci': '#fff1c2', 'o-rukavice': '#ffe3d6', 'o-sova': '#d6f5ec', 'o-svitani': '#ffd6e8',
  'tab-uceni': '#ffd6e8', 'tab-ja': '#e3d9ff', 'tab-battle': '#d6ecff', 'tab-drip': '#ffd6e8', 'tab-zebricek': '#fff1c2',
  domu: '#ffd6e8', battle: '#e3d9ff', zebricek: '#fff1c2', ja: '#d6f5ec',
  ohen: '#ffe3d6', susenka: '#fff1dc', zlata: '#fff1c2',
  barvy: '#e3d9ff', cisla20: '#d6ecff', telo: '#ffe3d6', zviratka: '#fff1c2', skola: '#d6f5ec',
  hracky: '#ffe3d6', obleceni: '#d6ecff', mnam: '#ffd6e8', ahoj: '#d6f5ec',
  u1: '#fff1c2', u2: '#ffd6e8', u3: '#d6f5ec', u4: '#fff1c2', u5: '#d6ecff', u6: '#ffe3d6',
  u7: '#e3d9ff', u8: '#d6ecff', svatky: '#ffe3d6',
  pocity: '#fff1c2', more: '#d6ecff', doma: '#d6f5ec', hudba: '#e3d9ff', slang: '#ffd6e8', fraze: '#fff1c2',
  zamek: '#eeeaf2', repro: '#e3d9ff', zelva: '#d6f5ec', zpet: '#ffffff', zavrit: '#ffffff', satnik: '#ffd6e8',
};

const KRESBY = {
  // ---------- Lišta a hlavička ----------
  domu: `<path d="M11 24 L24 12 L37 24 V36 a3 3 0 0 1 -3 3 H14 a3 3 0 0 1 -3 -3Z" fill="#fff" ${t}/>
    <path d="M24 34 l-5 -5 c-3 -3.5 1.5 -7.5 5 -3.5 c3.5 -4 8 0 5 3.5z" fill="#ff6fae" ${t}/>`,
  battle: `<path d="M28 7 L14 27 h9 l-3 14 l15 -21 h-9 z" fill="#ffd34d" ${t}/>${jiskra(37, 12, 4)}${jiskra(12, 36, 3)}`,
  zebricek: `<path d="M15 10 h18 v9 a9 9 0 0 1 -18 0z" fill="#ffd34d" ${t}/>
    <path d="M15 13 h-4 c0 6 2 8 5 8 M33 13 h4 c0 6 -2 8 -5 8" fill="none" ${t}/>
    <path d="M24 28 v5" ${t}/><rect x="16" y="33" width="16" height="6" rx="2" fill="#b69cff" ${t}/>${jiskra(24, 16, 3.5)}`,
  'tab-ja': `<rect x="9" y="8" width="30" height="34" rx="6" fill="#b69cff" ${t}/><rect x="19" y="5" width="10" height="6" rx="2" fill="#fff" ${t}/>
    <circle cx="24" cy="23" r="8" fill="#ffd9c2" ${t}/><path d="M16.5 22 q1 -9 7.5 -9 q6.5 0 7.5 9 q-3 -4 -7.5 -4 q-4.5 0 -7.5 4z" fill="#8a4b2f" ${t}/>
    <circle cx="21" cy="24" r="1.2" fill="${O}"/><circle cx="27" cy="24" r="1.2" fill="${O}"/><path d="M21.5 27 q2.5 2 5 0" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M14 36 h20" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`,
  ja: `<path d="M24 7 l5 10.5 l11.5 1.5 l-8.5 8 l2.2 11.5 l-10.2 -5.6 l-10.2 5.6 l2.2 -11.5 l-8.5 -8 l11.5 -1.5z" fill="#ffd34d" ${t}/>
    <circle cx="20.5" cy="23" r="1.6" fill="${O}"/><circle cx="27.5" cy="23" r="1.6" fill="${O}"/>
    <path d="M21 28 q3 2.5 6 0" fill="none" ${t}/>`,
  ohen: `<path d="M24 6 c3 8 13 11 13 23 a13 13 0 0 1 -26 0 c0 -6 3 -10 6 -13 c1 4 3 6 5 7 c-2 -7 0 -12 2 -17z" fill="#ff8a5b" ${t}/>
    <path d="M24 26 c2 4 6 5 6 9 a6 6 0 0 1 -12 0 c0 -3 2 -5 3 -6 c1 2 2 3 3 3 c-1 -2 -1 -4 0 -6z" fill="#ffd34d"/>`,
  susenka: `<path d="M37 18 a14 14 0 1 1 -8 -8 a4 4 0 0 0 4 4 a4 4 0 0 0 4 4z" fill="#e6a65d" ${t}/>
    <circle cx="18" cy="20" r="2.2" fill="${O}"/><circle cx="26" cy="27" r="2.2" fill="${O}"/><circle cx="17" cy="30" r="2" fill="${O}"/><circle cx="30" cy="34" r="1.8" fill="${O}"/>`,
  zlata: `<path d="M37 18 a14 14 0 1 1 -8 -8 a4 4 0 0 0 4 4 a4 4 0 0 0 4 4z" fill="#ffd34d" ${t}/>
    <circle cx="18" cy="20" r="2.2" fill="#c9962c"/><circle cx="26" cy="27" r="2.2" fill="#c9962c"/><circle cx="17" cy="30" r="2" fill="#c9962c"/>${jiskra(38, 8, 4.5)}${jiskra(9, 38, 3.5)}`,
  satnik: `<path d="M24 12 a3 3 0 1 1 3 3 v3 l12 10 a2 2 0 0 1 -1 4 H10 a2 2 0 0 1 -1 -4 l12 -10" fill="none" ${t}/>
    <path d="M14 32 l3 7 h14 l3 -7" fill="#ff8fbf" ${t}/>`,

  // ---------- Spodní lišta ----------
  'tab-uceni': `<path d="M24 14 c-5 -4 -11 -4.5 -15 -2.5 v23 c4 -2 10 -1.5 15 2.5z" fill="#fff" ${t}/>
    <path d="M24 14 c5 -4 11 -4.5 15 -2.5 v23 c-4 -2 -10 -1.5 -15 2.5z" fill="#ffb3d4" ${t}/>
    <path d="M13 19 q4.5 -1 7.5 1 M13 24 q4.5 -1 7.5 1 M28 20 q3.5 -1.6 7 -1" fill="none" stroke="${O}" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>`,
  'tab-battle': `<path d="M5 33 q-1 -15 9 -18 q8 -2 11 5 l3 5 l-3 1.5 q1 4 -1 6 l-1.5 1 q1 4 -5 4.5 q-8 1 -12.5 -5z" fill="#ffd9c2" ${t}/>
    <path d="M5 30 q-2 -13 7 -17 q8 -3 13 4 q-6 -1 -10 2 q-3 4 -3 10 q-4 -2 -7 1z" fill="#8a4b2f" ${t}/>
    <circle cx="20" cy="24.5" r="1.7" fill="${O}"/><path d="M19.5 20.5 l3 -1.2" ${t} stroke-width="2"/>
    <path d="M43 33 q1 -15 -9 -18 q-8 -2 -11 5 l-3 5 l3 1.5 q-1 4 1 6 l1.5 1 q-1 4 5 4.5 q8 1 12.5 -5z" fill="#c98d63" ${t}/>
    <path d="M43 30 q2 -13 -7 -17 q-8 -3 -13 4 q6 -1 10 2 q3 4 3 10 q4 -2 7 1z" fill="#ff8fc4" ${t}/>
    <circle cx="28" cy="24.5" r="1.7" fill="${O}"/><path d="M28.5 20.5 l-3 -1.2" ${t} stroke-width="2"/>
    <path d="M24 6 l-2 4 h3 l-2 4" fill="none" stroke="#ffb703" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  'tab-drip': `<path d="M24 13 v-2 a3 3 0 1 0 -3 -3" fill="none" ${t}/>
    <path d="M24 13 l-13 6 l-3 9 l6 2 v10 h20 v-10 l6 -2 l-3 -9 z" fill="#ff8fc4" ${t}/>
    <path d="M18 16 q6 7 12 0" fill="#ffd6e8" ${t}/><path d="M22 20 v6 M26 20 v6" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M18 33 h12" stroke="${O}" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>`,
  'tab-zebricek': `<path d="M14 9 h20 v10 a10 10 0 0 1 -20 0z" fill="#ffd34d" ${t}/>
    <path d="M14 12 h-4.5 c0 7 2.5 9 6 9 M34 12 h4.5 c0 7 -2.5 9 -6 9" fill="none" ${t}/>
    <path d="M24 29 v5" ${t}/><rect x="15" y="34" width="18" height="7" rx="2.5" fill="#b69cff" ${t}/>
    <path d="M24 12.5 l1.6 3.3 l3.6 .5 l-2.6 2.5 l.6 3.6 l-3.2 -1.7 l-3.2 1.7 l.6 -3.6 l-2.6 -2.5 l3.6 -.5z" fill="#fff"/>
    <path d="M18 12 v6" stroke="#fff" stroke-opacity=".6" stroke-width="2.2" stroke-linecap="round"/>`,

  hra: `<circle cx="17" cy="15" r="7" fill="#e6a65d" ${t}/><circle cx="30" cy="12" r="7" fill="#ffd34d" ${t}/>
    <circle cx="15" cy="14" r="1.3" fill="${O}"/><circle cx="19" cy="17" r="1.3" fill="${O}"/><circle cx="29" cy="11" r="1.3" fill="#c9962c"/><circle cx="32" cy="14" r="1.3" fill="#c9962c"/>
    <rect x="7" y="20" width="34" height="20" rx="5" fill="#ff8fc4" ${t}/><rect x="5" y="17" width="38" height="7" rx="3.5" fill="#c4a3ff" ${t}/>
    <rect x="12" y="27" width="24" height="8" rx="3" fill="#ffd6e8"/><path d="M20 31 h8" stroke="${O}" stroke-width="2" stroke-linecap="round"/>`,

  // ---------- Kategorie v Drip shopu ----------
  'k-kuze': `<circle cx="17" cy="20" r="8" fill="#ffe9dc" ${t}/><circle cx="31" cy="20" r="8" fill="#f1c09b" ${t}/><circle cx="17" cy="32" r="8" fill="#c98d63" ${t}/><circle cx="31" cy="32" r="8" fill="#8d5a3b" ${t}/>`,
  'k-uces': `<path d="M12 30 q-2 -20 12 -21 q14 1 12 21 q-4 -10 -12 -11 q-8 1 -12 11z" fill="#8a4b2f" ${t}/>
    <path d="M36 22 q8 4 4 16 q-2 -8 -6 -10z" fill="#8a4b2f" ${t}/><path d="M33 12 l-5 -4 v8z M33 12 l5 -4 v8z" fill="#ff6fae" ${t}/>
    <path d="M17 18 q4 -4 10 -4" stroke="#fff" stroke-opacity=".6" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  'k-barva': `<path d="M30 9 l9 9 l-15 15 l-9 -9z" fill="#fff" ${t}/><path d="M15 24 l9 9 q-3 7 -10 6 q-5 -1 -5 -6 q2 -6 6 -9z" fill="#ff8fc4" ${t}/>
    <path d="M33 12 l3 3" ${t}/><path d="M38 32 q4 5 0 8 q-4 -3 0 -8z" fill="#b69cff" ${t}/>`,
  'k-oci': `<path d="M7 24 q17 -18 34 0 q-17 18 -34 0z" fill="#fff" ${t}/><circle cx="24" cy="24" r="7" fill="#3d8fe0" ${t}/><circle cx="24" cy="24" r="3" fill="${O}"/><circle cx="26.5" cy="21.5" r="1.8" fill="#fff"/>
    <path d="M12 15 l-2 -4 M18 11 l-1 -4 M24 10 v-4 M30 11 l1 -4 M36 15 l2 -4" ${t}/>`,
  'k-duhovka': `<circle cx="24" cy="24" r="14" fill="#fff" ${t}/><circle cx="24" cy="24" r="9.5" fill="#7fd8a4"/><circle cx="24" cy="24" r="9.5" fill="none" stroke="#3faa6a" stroke-width="2.4" stroke-dasharray="2 2.4"/>
    <circle cx="24" cy="24" r="4.2" fill="${O}"/><circle cx="27.5" cy="20.5" r="2.4" fill="#fff"/>`,
  'k-pusa': `<path d="M8 22 q8 -8 16 -3 q8 -5 16 3 q-6 14 -16 14 q-10 0 -16 -14z" fill="#ff5b8a" ${t}/><path d="M8 22 q16 6 32 0" fill="none" ${t}/>
    <path d="M16 28 q4 3 8 3" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  'k-hlava': `<path d="M10 30 q0 -17 14 -17 q14 0 14 17z" fill="#7fb3ff" ${t}/><path d="M8 30 h26 q8 0 9 4 h-35z" fill="#5a8fe0" ${t}/><circle cx="24" cy="13" r="2.5" fill="#5a8fe0" ${t}/>
    <path d="M24 13 v17" stroke="${O}" stroke-width="1.8" opacity=".4"/>`,
  'k-bryle': `<circle cx="15" cy="26" r="8" fill="#d6ecff" ${t}/><circle cx="33" cy="26" r="8" fill="#d6ecff" ${t}/><path d="M23 25 q1 -2 2 0 M7 24 l-3 -5 M41 24 l3 -5" fill="none" ${t}/>
    <path d="M11 23 l4 -3 M29 23 l4 -3" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`,
  'k-nausnice': `<circle cx="24" cy="10" r="3" fill="#ffd34d" ${t}/><circle cx="24" cy="26" r="11" fill="none" stroke="${O}" stroke-width="6.2"/><circle cx="24" cy="26" r="11" fill="none" stroke="#ffd34d" stroke-width="3"/>
    <path d="M24 34 l5 4 l-5 6 l-5 -6z" fill="#9fe7ff" ${t}/>`,
  'k-piercing': `<circle cx="24" cy="26" r="11" fill="none" stroke="${O}" stroke-width="5.6"/><circle cx="24" cy="26" r="11" fill="none" stroke="#dfe4ec" stroke-width="2.4"/>
    <circle cx="24" cy="15" r="5" fill="#b69cff" ${t}/><circle cx="22.5" cy="13.5" r="1.5" fill="#fff"/>`,
  'k-nahrdelnik': `<path d="M9 10 q15 26 30 0" fill="none" stroke="${O}" stroke-width="5"/><path d="M9 10 q15 26 30 0" fill="none" stroke="#ffd34d" stroke-width="2.4" stroke-dasharray="2.5 1.5"/>
    <path d="M24 42 l-7 -7 c-4 -5 2 -10 7 -5 c5 -5 11 0 7 5z" fill="#ff6fae" ${t}/>`,
  'k-naramek': `<rect x="17" y="6" width="14" height="36" rx="5" fill="#b69cff" ${t}/><circle cx="24" cy="24" r="10" fill="#fff" ${t}/>
    <path d="M24 24 v-6 M24 24 l4 2" ${t}/><circle cx="24" cy="24" r="1.4" fill="${O}"/>`,
  'k-vousy': `<path d="M24 22 q-4 -5 -9 -3 q-5 2 -8 7 q-3 3 -5 1 q1 6 8 6 q9 0 14 -6 q5 6 14 6 q7 0 8 -6 q-2 2 -5 -1 q-3 -5 -8 -7 q-5 -2 -9 3z" fill="#8a4b2f" ${t}/>`,
  'k-tvar': `${jiskra(17, 18, 9, '#ffd34d')}${jiskra(33, 30, 7, '#ff8fc4')}${jiskra(33, 13, 4, '#b69cff')}
    <path d="M17 9 l2.7 6.3 l6.3 2.7 l-6.3 2.7 l-2.7 6.3 l-2.7 -6.3 l-6.3 -2.7 l6.3 -2.7z M33 23 l2.1 4.9 l4.9 2.1 l-4.9 2.1 l-2.1 4.9 l-2.1 -4.9 l-4.9 -2.1 l4.9 -2.1z" fill="none" ${t}/>`,
  'k-maska': `<path d="M6 20 q9 -6 18 -1 q9 -5 18 1 q2 10 -6 13 q-7 2 -10 -4 h-4 q-3 6 -10 4 q-8 -3 -6 -13z" fill="#ff6fae" ${t}/>
    <ellipse cx="15" cy="24" rx="4.5" ry="3.4" fill="#fff" ${t}/><ellipse cx="33" cy="24" rx="4.5" ry="3.4" fill="#fff" ${t}/>
    <path d="M42 20 l4 -8 M6 20 l-3 -6" ${t}/><circle cx="46" cy="11" r="2.5" fill="#ffd34d" ${t}/>`,
  'k-ruka': `<path d="M16 22 l8 20 l8 -20z" fill="#e6a65d" ${t}/><path d="M19 27 l9 6 M18 23 l12 8 M21 34 l5 -9" stroke="${O}" stroke-width="1.6" opacity=".45"/>
    <path d="M13 22 c-3 -6 2 -11 6 -9 c1 -6 9 -6 10 0 c4 -2 9 3 6 9z" fill="#ffd6e8" ${t}/><circle cx="24" cy="9" r="3" fill="#ff4d6d" ${t}/>`,
  'k-pozadi': `<rect x="7" y="9" width="34" height="30" rx="4" fill="#fff" ${t}/><rect x="11" y="13" width="26" height="22" rx="2" fill="#bfe6ff"/>
    <path d="M11 35 l8 -10 l6 6 l4 -4 l8 8z" fill="#7fd8a4" ${t}/><circle cx="30" cy="19" r="3.5" fill="#ffd34d" ${t}/>`,

  // ---------- Odznaky ----------
  'o-prvni': `<path d="M9 40 l8 -22 l14 14z" fill="#ffd34d" ${t}/><path d="M13 30 l6 6 M15 24 l9 9" stroke="${O}" stroke-width="1.8" opacity=".5"/>
    <path d="M27 12 q2 -6 8 -5 M33 18 q5 -1 7 3 M24 9 v-3" fill="none" ${t}/><circle cx="38" cy="10" r="2.2" fill="#ff6fae"/><circle cx="41" cy="28" r="2" fill="#7fd8c4"/><circle cx="30" cy="5" r="1.8" fill="#b69cff"/>`,
  'o-perfekt': `<path d="M24 6 l5.4 11 l12 1.7 l-8.7 8.5 l2 12 l-10.7 -5.6 l-10.7 5.6 l2 -12 l-8.7 -8.5 l12 -1.7z" fill="#ffd34d" ${t}/>
    <path d="M20 16 l2 -4" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`,
  'o-kometa': `<path d="M30 18 l-22 22 M27 13 l-17 17 M35 21 l-17 17" stroke="#ffb03b" stroke-width="3.2" stroke-linecap="round" opacity=".8"/>
    <circle cx="32" cy="16" r="9" fill="#ff8a3d" ${t}/><circle cx="29.5" cy="13.5" r="2.5" fill="#ffd34d"/>`,
  'o-sopka': `<path d="M6 40 l12 -20 h12 l12 20z" fill="#a8693a" ${t}/><path d="M18 20 q6 6 12 0" fill="#ff5b3b" ${t}/>
    <path d="M24 16 q-4 -6 0 -10 q4 4 0 10 M18 14 q-5 -2 -5 -7 M30 14 q5 -2 5 -7" fill="none" stroke="#ff5b3b" stroke-width="2.6" stroke-linecap="round"/>`,
  'o-kniha': `<rect x="11" y="8" width="26" height="32" rx="3" fill="#7fd8a4" ${t}/><path d="M17 8 v32" ${t}/><rect x="21" y="15" width="11" height="6" rx="1.5" fill="#fff" ${t}/>`,
  'o-knihy': `<rect x="8" y="30" width="32" height="9" rx="2" fill="#ff8fc4" ${t}/><rect x="11" y="21" width="28" height="9" rx="2" fill="#7fb3ff" ${t}/><rect x="9" y="12" width="28" height="9" rx="2" fill="#ffd34d" ${t}/>
    <path d="M13 16.5 h12 M15 25.5 h12 M12 34.5 h12" stroke="${O}" stroke-width="1.6" opacity=".5"/>`,
  'o-mozek': `<path d="M24 11 c-4 -4 -12 -2 -12 4 c-5 1 -6 9 -2 12 c-2 5 3 10 8 8 c2 4 6 4 6 0z M24 11 c4 -4 12 -2 12 4 c5 1 6 9 2 12 c2 5 -3 10 -8 8 c-2 4 -6 4 -6 0z" fill="#ffb3d4" ${t}/>
    <path d="M17 20 q3 2 2 6 M31 20 q-3 2 -2 6 M24 11 v24" fill="none" stroke="${O}" stroke-width="1.8" opacity=".55"/>`,
  'o-stopky': `<circle cx="24" cy="27" r="14" fill="#fff" ${t}/><rect x="20" y="6" width="8" height="5" rx="2" fill="#b69cff" ${t}/><path d="M24 11 v2 M35 15 l3 -3" ${t}/>
    <path d="M24 27 l6 -6" stroke="#ff6fae" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="27" r="2" fill="${O}"/>`,
  'o-presypaci': `<path d="M13 7 h22 M13 41 h22" ${t}/><path d="M15 7 q0 12 9 17 q-9 5 -9 17 h18 q0 -12 -9 -17 q9 -5 9 -17z" fill="#fff" ${t}/>
    <path d="M18 12 h12 q-2 6 -6 9 q-4 -3 -6 -9z M17 38 q1 -6 7 -9 q6 3 7 9z" fill="#ffd34d"/>`,
  'o-rukavice': `<path d="M14 24 q-2 -14 12 -15 q14 0 13 14 q0 9 -8 12 h-12 q-6 -3 -5 -11z" fill="#ff5b5b" ${t}/><path d="M14 24 q-6 -2 -5 4 q1 5 7 4" fill="#ff5b5b" ${t}/>
    <rect x="16" y="35" width="16" height="7" rx="2" fill="#fff" ${t}/><path d="M20 15 q4 -3 9 -2" stroke="#fff" stroke-opacity=".6" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  'o-sova': `<path d="M11 20 l-2 -10 l7 5 h16 l7 -5 l-2 10 q4 20 -13 21 q-17 -1 -13 -21z" fill="#a8693a" ${t}/>
    <circle cx="18" cy="22" r="6" fill="#fff" ${t}/><circle cx="30" cy="22" r="6" fill="#fff" ${t}/><circle cx="18" cy="22" r="2.6" fill="${O}"/><circle cx="30" cy="22" r="2.6" fill="${O}"/>
    <path d="M22 28 l2 3 l2 -3z" fill="#ffb03b" ${t}/><path d="M17 35 q7 3 14 0" fill="none" stroke="${O}" stroke-width="1.6" opacity=".5"/>`,
  'o-svitani': `<path d="M8 32 a16 16 0 0 1 32 0z" fill="#ffd34d" ${t}/><path d="M24 10 v-4 M12 16 l-3 -3 M36 16 l3 -3 M5 26 h-2 M43 26 h2" ${t}/>
    <path d="M4 36 h40 M10 41 h28" ${t}/>`,

  // ---------- Opakování ze 3. třídy ----------
  barvy: `<path d="M24 9 c10 0 16 7 16 14 c0 5 -4 6 -7 5 c-3 -1 -5 1 -4 4 c1 4 -2 8 -7 8 c-9 0 -15 -7 -15 -15 c0 -9 7 -16 17 -16z" fill="#fff" ${t}/>
    <circle cx="17" cy="21" r="3" fill="#ff6fae"/><circle cx="24" cy="16" r="3" fill="#ffd34d"/><circle cx="31" cy="19" r="3" fill="#7fd8c4"/><circle cx="17" cy="30" r="3" fill="#7fb3ff"/>`,
  cisla20: `<rect x="10" y="10" width="28" height="28" rx="7" fill="#fff" ${t} transform="rotate(8 24 24)"/>
    <g transform="rotate(8 24 24)" fill="${O}"><circle cx="17" cy="17" r="2.3"/><circle cx="31" cy="17" r="2.3"/><circle cx="24" cy="24" r="2.3"/><circle cx="17" cy="31" r="2.3"/><circle cx="31" cy="31" r="2.3"/></g>`,
  telo: `<rect x="14.5" y="12" width="5" height="16" rx="2.5" fill="#ffd9c2" ${t}/><rect x="19.5" y="8" width="5" height="18" rx="2.5" fill="#ffd9c2" ${t}/>
    <rect x="24.5" y="9" width="5" height="17" rx="2.5" fill="#ffd9c2" ${t}/><rect x="29.5" y="13" width="5" height="14" rx="2.5" fill="#ffd9c2" ${t}/>
    <rect x="8" y="25" width="5" height="12" rx="2.5" fill="#ffd9c2" ${t} transform="rotate(-38 10.5 31)"/>
    <path d="M14 24 h20.5 v6 c0 6 -4 10 -10 10 c-6 0 -10.5 -4 -10.5 -10z" fill="#ffd9c2" ${t}/>
    <path d="M38 9 q3 3 2 7 M41 6 q5 5 3 11" fill="none" ${t}/>`,
  zviratka: `<path d="M12 18 l2 -9 l8 6 h4 l8 -6 l2 9 c3 4 3 14 -2 18 c-4 3 -16 3 -20 0 c-5 -4 -5 -14 -2 -18z" fill="#ffb366" ${t}/>
    <circle cx="19" cy="24" r="2" fill="${O}"/><circle cx="29" cy="24" r="2" fill="${O}"/>
    <path d="M22.5 29 h3 l-1.5 2z" fill="#ff6fae" ${t}/><path d="M10 28 h6 M10 32 l6 -2 M38 28 h-6 M38 32 l-6 -2" ${t}/>`,
  skola: `<rect x="12" y="15" width="24" height="25" rx="6" fill="#7fd8c4" ${t}/>
    <path d="M18 15 v-3 a6 6 0 0 1 12 0 v3" fill="none" ${t}/><rect x="17" y="27" width="14" height="9" rx="3" fill="#fff" ${t}/>
    <path d="M17 21 h14" ${t}/>`,
  hracky: `<circle cx="14" cy="15" r="5" fill="#d9a06b" ${t}/><circle cx="34" cy="15" r="5" fill="#d9a06b" ${t}/>
    <circle cx="24" cy="25" r="13" fill="#d9a06b" ${t}/><ellipse cx="24" cy="30" rx="6" ry="4.5" fill="#f5d9b8" ${t}/>
    <circle cx="19" cy="23" r="1.8" fill="${O}"/><circle cx="29" cy="23" r="1.8" fill="${O}"/><circle cx="24" cy="28.5" r="1.6" fill="${O}"/>`,
  obleceni: `<path d="M17 9 l-9 6 l4 7 l4 -2 v18 h16 v-18 l4 2 l4 -7 l-9 -6 q-4 4 -7 4 q-3 0 -7 -4z" fill="#7fb3ff" ${t}/>
    <path d="M24 30 l-3.5 -3.5 c-2 -2.5 1 -5 3.5 -2.5 c2.5 -2.5 5.5 0 3.5 2.5z" fill="#fff"/>`,
  mnam: `<path d="M14 26 h20 l-3 13 h-14z" fill="#b69cff" ${t}/>
    <path d="M12 26 c-2 -6 4 -9 7 -7 c1 -5 9 -5 10 0 c3 -2 9 1 7 7z" fill="#ffd6e8" ${t}/>
    <circle cx="24" cy="12" r="3.5" fill="#ff4d6d" ${t}/><path d="M19 30 l1 6 M24 30 v6 M29 30 l-1 6" ${t}/>`,
  ahoj: `<path d="M8 12 a4 4 0 0 1 4 -4 h24 a4 4 0 0 1 4 4 v15 a4 4 0 0 1 -4 4 h-13 l-8 7 v-7 h-3 a4 4 0 0 1 -4 -4z" fill="#fff" ${t}/>
    <text x="24" y="24.5" text-anchor="middle" font-size="12" font-weight="900" fill="#ff6fae" font-family="ui-rounded, system-ui">Hi!</text>`,

  // ---------- Happy Street 2 ----------
  u1: `<ellipse cx="24" cy="31" rx="9" ry="7.5" fill="#8a5a3c" ${t}/>
    <ellipse cx="13" cy="21" rx="3.5" ry="4.5" fill="#8a5a3c" ${t}/><ellipse cx="20" cy="14" rx="3.5" ry="4.5" fill="#8a5a3c" ${t}/>
    <ellipse cx="28" cy="14" rx="3.5" ry="4.5" fill="#8a5a3c" ${t}/><ellipse cx="35" cy="21" rx="3.5" ry="4.5" fill="#8a5a3c" ${t}/>`,
  u2: `<rect x="10" y="20" width="28" height="19" rx="3" fill="#ff8fbf" ${t}/><rect x="8" y="15" width="32" height="7" rx="2" fill="#ffb3d4" ${t}/>
    <path d="M24 15 v24" stroke="#ffd34d" stroke-width="5"/><path d="M24 15 c-4 -8 -12 -6 -9 -1 c1 2 5 2 9 1 c4 1 8 1 9 -1 c3 -5 -5 -7 -9 1z" fill="#ffd34d" ${t}/>`,
  u3: `<path d="M11 18 h26 l-2 20 a2 2 0 0 1 -2 2 h-18 a2 2 0 0 1 -2 -2z" fill="#7fd8c4" ${t}/>
    <path d="M18 18 v-3 a6 6 0 0 1 12 0 v3" fill="none" ${t}/>
    <circle cx="19" cy="27" r="3.5" fill="#ff6b6b" ${t}/><path d="M27 24 q4 0 3 6 q-4 -1 -3 -6z" fill="#8fdc6b" ${t}/>`,
  u4: `<path d="M12 14 c-2 14 6 24 22 22 c3 0 4 -2 2 -3 c-12 0 -18 -8 -18 -19 c0 -2 -5 -3 -6 0z" fill="#ffd34d" ${t}/>
    <path d="M12 14 l-1 -4 l4 1" fill="#8a5a3c" ${t}/>`,
  u5: `<path d="M24 7 l12 13 l-12 15 l-12 -15z" fill="#ff8fbf" ${t}/><path d="M24 7 v28 M12 20 h24" ${t}/>
    <path d="M24 35 q-4 3 0 5 q4 2 0 5" fill="none" ${t}/><path d="M24 7 l12 13 h-12z" fill="#ffd34d" ${t}/>`,
  u6: `<circle cx="24" cy="24" r="15" fill="#ff8a3d" ${t}/>
    <path d="M9 24 h30 M24 9 v30 M13 13 q8 11 0 22 M35 13 q-8 11 0 22" fill="none" ${t}/>`,
  u7: `<circle cx="24" cy="26" r="13" fill="#fff" ${t}/><path d="M11 15 a6 6 0 0 1 8 -6 M37 15 a6 6 0 0 0 -8 -6" fill="#b69cff" ${t}/>
    <path d="M24 26 v-7 M24 26 l5 3" ${t}/><path d="M15 38 l-3 3 M33 38 l3 3" ${t}/>`,
  u8: `<path d="M24 8 v32 M10 16 l28 16 M38 16 l-28 16" stroke="#5aa8e6" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M20 10 l4 3 l4 -3 M20 38 l4 -3 l4 3 M9 21 l4 -1 l-1 -4 M39 27 l-4 1 l1 4 M39 21 l-4 -1 l1 -4 M9 27 l4 1 l-1 4" fill="none" stroke="#5aa8e6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="24" cy="24" r="3" fill="#fff" ${t}/>`,
  svatky: `<path d="M24 14 c-12 0 -15 8 -15 13 c0 7 6 11 15 11 c9 0 15 -4 15 -11 c0 -5 -3 -13 -15 -13z" fill="#ff8a3d" ${t}/>
    <path d="M24 14 c-4 4 -4 20 0 24 M24 14 c4 4 4 20 0 24" fill="none" ${t}/><path d="M24 14 c0 -4 2 -6 5 -7" fill="none" stroke="#5a8f3c" stroke-width="3" stroke-linecap="round"/>
    <path d="M15 24 l3 -2 l2 3z M33 24 l-3 -2 l-2 3z" fill="${O}"/>`,

  // ---------- Něco navíc ----------
  pocity: `<circle cx="24" cy="24" r="15" fill="#ffd34d" ${t}/><path d="M17 22 q2 -3 4 0 M27 22 q2 -3 4 0" fill="none" ${t}/>
    <path d="M17 28 q7 8 14 0z" fill="#fff" ${t}/><ellipse cx="14.5" cy="27" rx="2.5" ry="1.6" fill="#ff8fab"/><ellipse cx="33.5" cy="27" rx="2.5" ry="1.6" fill="#ff8fab"/>`,
  more: `<path d="M9 24 c6 -10 20 -10 26 0 c-6 10 -20 10 -26 0z" fill="#7fb3ff" ${t}/><path d="M35 24 l6 -6 v12z" fill="#7fb3ff" ${t}/>
    <circle cx="16" cy="22" r="1.8" fill="${O}"/><path d="M22 18 q3 6 0 12" fill="none" ${t}/>${jiskra(30, 11, 3, '#5aa8e6')}`,
  doma: `<path d="M15 28 h18 l-2 11 h-14z" fill="#ff8a5b" ${t}/>
    <path d="M24 28 c0 -8 -8 -10 -12 -8 c2 6 7 8 12 8 M24 28 c0 -10 6 -14 12 -12 c-1 7 -6 11 -12 12 M24 28 v-16" fill="#8fdc6b" ${t}/>`,
  hudba: `<path d="M10 28 v-4 a14 14 0 0 1 28 0 v4" fill="none" ${t}/>
    <rect x="8" y="26" width="8" height="13" rx="4" fill="#b69cff" ${t}/><rect x="32" y="26" width="8" height="13" rx="4" fill="#b69cff" ${t}/>${jiskra(24, 18, 4, '#ff6fae')}`,
  slang: `<path d="M7 19 h34 v3 c0 6 -4 9 -8 9 c-4 0 -7 -3 -8 -7 h-2 c-1 4 -4 7 -8 7 c-4 0 -8 -3 -8 -9z" fill="${O}"/>
    <path d="M11 22 l5 0" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>${jiskra(38, 10, 5, '#ffd34d')}${jiskra(12, 38, 3.5, '#ff6fae')}`,
  fraze: `<path d="M7 11 a3 3 0 0 1 3 -3 h17 a3 3 0 0 1 3 3 v10 a3 3 0 0 1 -3 3 h-10 l-6 5 v-5 h-1 a3 3 0 0 1 -3 -3z" fill="#fff" ${t}/>
    <path d="M41 22 a3 3 0 0 0 -3 -3 h-4 v4 a5 5 0 0 1 -5 5 h-8 v4 a3 3 0 0 0 3 3 h8 l6 5 v-5 a3 3 0 0 0 3 -3z" fill="#ff8fbf" ${t}/>`,

  // ---------- Ovládání ----------
  zamek: `<rect x="12" y="21" width="24" height="18" rx="4" fill="#b8a9c9" ${t}/><path d="M17 21 v-4 a7 7 0 0 1 14 0 v4" fill="none" ${t}/><circle cx="24" cy="29" r="2.5" fill="${O}"/>`,
  repro: `<path d="M9 19 h6 l9 -8 v26 l-9 -8 h-6z" fill="#b69cff" ${t}/><path d="M29 18 q4 6 0 12 M33 14 q8 10 0 20" fill="none" ${t}/>`,
  zelva: `<path d="M10 30 a12 12 0 0 1 24 0z" fill="#7fd8c4" ${t}/><path d="M16 30 l4 -8 h4 l4 8 M22 22 v-3" fill="none" stroke="${O}" stroke-width="2"/>
    <path d="M34 30 c2 0 6 -1 6 -5 c0 -3 -4 -3 -5 0" fill="#bfeee2" ${t}/><path d="M13 30 v4 M30 30 v4 M8 30 h30" ${t}/>`,
  zpet: `<path d="M28 13 l-11 11 l11 11" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  zavrit: `<path d="M15 15 l18 18 M33 15 l-18 18" stroke="${O}" stroke-width="4" stroke-linecap="round"/>`,
};

export function ik(nazev, velikost = 40, { podklad = true } = {}) {
  const ilu = ILUSTRACE_JMENA[nazev] || nazev;
  if (ma(ilu)) return obr(ilu, velikost, 'ik');
  const k = KRESBY[nazev];
  if (!k) return '';
  const pod = podklad && PODKLAD[nazev] && PODKLAD[nazev] !== '#ffffff'
    ? `<rect x="5" y="5" width="38" height="38" rx="12" fill="${PODKLAD[nazev]}" transform="rotate(-7 24 24)"/>` : '';
  return `<svg class="ik" width="${velikost}" height="${velikost}" viewBox="0 0 48 48" aria-hidden="true">${pod}${k}</svg>`;
}

export const maIkonu = nazev => nazev in KRESBY;
export const barvaIkony = nazev => PODKLAD[nazev] || '#ffd6e8';
