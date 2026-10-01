// Vlastní sada ikon ve stylu nálepky: pootočený pastelový podklad, tmavý obrys, výrazné výplně.
// ik('nazev', velikost). Mřížka 48×48. Nová ikona = položka v KRESBY (+ barva podkladu v PODKLAD).

const O = '#3b2a3f';
const t = `stroke="${O}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"`;
const jiskra = (x, y, r = 3, c = '#fff') => `<path d="M${x} ${y - r} l${r * .3} ${r * .7} l${r * .7} ${r * .3} l-${r * .7} ${r * .3} l-${r * .3} ${r * .7} l-${r * .3} -${r * .7} l-${r * .7} -${r * .3} l${r * .7} -${r * .3}z" fill="${c}"/>`;

const PODKLAD = {
  'tab-uceni': '#ffd6e8', 'tab-battle': '#e3d9ff', 'tab-drip': '#ffd6e8', 'tab-zebricek': '#fff1c2',
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
  'tab-battle': `<path d="M24 8 l14 5 v10 c0 9 -6 14.5 -14 18 c-8 -3.5 -14 -9 -14 -18 v-10z" fill="#9b7bff" ${t}/>
    <path d="M24 8 l14 5 v10 c0 9 -6 14.5 -14 18z" fill="#7d5cf0"/>
    <path d="M24 8 l14 5 v10 c0 9 -6 14.5 -14 18 c-8 -3.5 -14 -9 -14 -18 v-10z" fill="none" ${t}/>
    <text x="24" y="29" text-anchor="middle" font-size="12.5" font-weight="900" fill="#fff" font-family="ui-rounded, system-ui" font-style="italic">VS</text>`,
  'tab-drip': `<path d="M24 13 v-2 a3 3 0 1 0 -3 -3" fill="none" ${t}/>
    <path d="M24 13 l-13 6 l-3 9 l6 2 v10 h20 v-10 l6 -2 l-3 -9 z" fill="#ff8fc4" ${t}/>
    <path d="M18 16 q6 7 12 0" fill="#ffd6e8" ${t}/><path d="M22 20 v6 M26 20 v6" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M18 33 h12" stroke="${O}" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>`,
  'tab-zebricek': `<rect x="17" y="20" width="14" height="19" rx="2" fill="#ffd34d" ${t}/><rect x="6" y="27" width="11" height="12" rx="2" fill="#c7cfdb" ${t}/><rect x="31" y="31" width="11" height="8" rx="2" fill="#f0b07a" ${t}/>
    <text x="24" y="33.5" text-anchor="middle" font-size="10" font-weight="900" fill="${O}" font-family="ui-rounded, system-ui">1</text>
    <path d="M17 16 l2 -7 l4 4 l1 -6 l1 6 l4 -4 l2 7z" fill="#ffd34d" ${t}/>`,

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
  const k = KRESBY[nazev];
  if (!k) return '';
  const pod = podklad && PODKLAD[nazev] && PODKLAD[nazev] !== '#ffffff'
    ? `<rect x="5" y="5" width="38" height="38" rx="12" fill="${PODKLAD[nazev]}" transform="rotate(-7 24 24)"/>` : '';
  return `<svg class="ik" width="${velikost}" height="${velikost}" viewBox="0 0 48 48" aria-hidden="true">${pod}${k}</svg>`;
}

export const maIkonu = nazev => nazev in KRESBY;
