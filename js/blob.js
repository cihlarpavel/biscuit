// Postavička-sušenka – NÁVRH. Kulatá ručně „upečená“ sušenka s ukousnutým kouskem, silný obrys, velké oči;
// legrace je v šílených kombinacích: převleky celého těla, oči, pusy, brýle, klobouky, mazlíčci.
// viewBox 0 0 120 120. Vrstvy: za tělem (křídla) → tělo + vzor → oblečení → pusa → oči → brýle → klobouk → věci.

const OB = '#1f1a24';
const T = `stroke="${OB}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
const T2 = `stroke="${OB}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"`;
// Obrys sušenky: kruh s nepravidelným, mírně zvlněným okrajem (jako upečená), střed 60/67.
const CX = 60, CY = 67, R = 45;
const TELO = Array.from({ length: 120 }, (_, i) => {
  const a = i / 120 * Math.PI * 2, r = R + .8 * Math.sin(a * 7) + .9 * Math.sin(a * 3 + 1);
  return `${i ? 'L' : 'M'}${(CX + Math.cos(a) * r).toFixed(1)} ${(CY + Math.sin(a) * r).toFixed(1)}`;
}).join(' ') + 'Z';
// Ukousnutý kousek vlevo dole – tři kruhy „zubů“. Nahoře by se pletl s vlasy a klobouky.
// 5 ukousnutí: [úhel ve stupních, poloměr „zubu“]. 0 = největší vlevo dole (výchozí, ikona aplikace),
// ostatní menší a jinde – mimo přední vlasy, nohy a ruce. Vlasy se nekoušou, jen sušenka.
// Aplikace losuje podle semínka a dne.
const BOD = (u, d) => { const a = u * Math.PI / 180; return [CX + Math.cos(a) * d, CY + Math.sin(a) * d]; };
const KOUSNUTI = [
  [[140, 10], [126, 7], [154, 7]],   // vlevo dole, velké
  [[4, 7], [16, 5]],                  // vpravo
  [[57, 7], [47, 5]],                 // dole vpravo
  [[90, 7.5], [101, 5]],              // dole uprostřed, mezi nohama
  [[156, 7], [145, 5]],               // vlevo pod mávající rukou
].map(k => k.map(([u, r]) => [...BOD(u, R + 3), r]));
// Drobky odletují ven od hlavního zubu.
const drobky = i => { const u = [140, 4, 57, 90, 156][i];
  return [[0, 12, 4], [9, 19, 3], [-7, 24, 3]].map(([du, dd, w]) => { const [x, y] = BOD(u + du, R + dd);
    return `<rect x="${(x - w / 2).toFixed(1)}" y="${(y - w / 2).toFixed(1)}" width="${w}" height="${w}" transform="rotate(${(u * 3 + du * 7) % 90} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join(''); };
let n = 0;

// ---------- kůže / převleky celého těla ----------
const KUZE = {
  pernik: { barva: '#b0703f', vzor: `<circle cx="60" cy="67" r="37" fill="none" stroke="#fff" stroke-width="3.5" stroke-dasharray="7 4" stroke-linecap="round"/>${[[30, 96], [90, 96], [60, 106]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#ff5b7a"/>`).join('')}` },
  oreo: { barva: '#3a2a2e', vzor: `<circle cx="60" cy="67" r="38" fill="none" stroke="#56423f" stroke-width="2"/>${Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2; return `<circle cx="${(60 + Math.cos(a) * 32).toFixed(1)}" cy="${(67 + Math.sin(a) * 32).toFixed(1)}" r="2.4" fill="#56423f"/>`; }).join('')}<path d="M0 90 H120 V97 H0z" fill="#fff8ec"/>` },
  poleva: { barva: '#d9a066', vzor: `<path d="M0 0 H120 V52 q-6 0 -8 10 q-2 8 -6 0 q-4 -10 -12 -6 q-6 4 -8 16 q-3 8 -6 -2 q-2 -12 -12 -10 q-8 2 -10 12 q-3 6 -6 -4 q-4 -12 -14 -8 q-8 4 -10 0 q-4 -6 -8 -4 V0z" fill="#ff8fc0" stroke="#1f1a24" stroke-width="1.9" stroke-linejoin="round"/>${[[30, 38, '#ffd34d', 20], [48, 30, '#4dabf7', -30], [72, 32, '#8fd36b', 50], [88, 44, '#fff', -10], [40, 50, '#4dabf7', 70], [64, 48, '#ffd34d', -60], [80, 26, '#fff', 15]].map(([x, y, c, r]) => `<rect x="${x}" y="${y}" width="7" height="2.6" rx="1.3" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`).join('')}` },
  posyp: { barva: '#f3dcb0', vzor: Array.from({ length: 30 }, (_, i) => `<rect x="${(i * 37) % 96 + 12}" y="${(i * 53) % 86 + 24}" width="6" height="2.4" rx="1.2" fill="${['#ff5b7a', '#4dabf7', '#ffd34d', '#8fd36b', '#b494f0'][i % 5]}" transform="rotate(${(i * 67) % 180} ${(i * 37) % 96 + 12} ${(i * 53) % 86 + 24})"/>`).join('') },
  maslova: { barva: '#f3cf8e', vzor: [[38, 40, 4], [80, 36, 3.5], [30, 78, 4.5], [88, 74, 4], [58, 98, 4], [44, 92, 3], [80, 96, 3.5]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .8}" fill="#8a5a3c"/>`).join('') },
  cokoladova: { barva: '#7a4a2e', vzor: [[38, 40, 4], [80, 36, 3.5], [30, 78, 4.5], [88, 74, 4], [58, 98, 4], [44, 92, 3], [80, 96, 3.5]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .8}" fill="#fff4e0"/>`).join('') },
  zlata: { barva: '#ffd34d', vzor: `<path d="M30 40 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z M86 82 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5z M74 30 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1z" fill="#fff"/><path d="M14 100 Q60 80 106 100" fill="none" stroke="#e0a800" stroke-width="3" opacity=".5"/>` },
  duhova: { barva: '#ff9fb0', vzor: ['#ff6b7a', '#ffa94d', '#ffe066', '#69db7c', '#4dabf7', '#9775fa'].map((c, i) => `<rect x="0" y="${18 + i * 16}" width="120" height="16" fill="${c}"/>`).join('') },
  susenka: { barva: '#d9a066', vzor: `${[[38, 40, 4], [80, 36, 3.5], [30, 78, 4.5], [88, 74, 4], [58, 98, 4], [44, 92, 3], [80, 96, 3.5]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .8}" fill="#5b3424"/>`).join('')}` },
  hneda: { barva: '#c8955f' }, modra: { barva: '#6fb6f2' }, ruzova: { barva: '#f7a1c4' }, zelena: { barva: '#8fd36b' }, fialova: { barva: '#b494f0' },
  beruska: { barva: '#e8352b', vzor: [[40, 46], [82, 44], [30, 74], [60, 66], [92, 76], [46, 98], [76, 100], [60, 30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="${OB}"/>`).join(''),
    za: `<ellipse cx="14" cy="80" rx="12" ry="22" fill="${OB}" transform="rotate(20 14 80)"/><ellipse cx="106" cy="80" rx="12" ry="22" fill="${OB}" transform="rotate(-20 106 80)"/>
      <path d="M52 24 q-6 -14 -12 -16 M68 24 q6 -14 12 -16" fill="none" ${T}/><circle cx="40" cy="8" r="4" fill="#e8352b" ${T2}/><circle cx="80" cy="8" r="4" fill="#e8352b" ${T2}/>` },
  tucnak: { barva: OB, vzor: `<ellipse cx="60" cy="88" rx="34" ry="34" fill="#fff"/>` },
  meloun: { barva: '#ff5d6c', vzor: `<path d="M0 92 Q60 104 120 92 V120 H0z" fill="#3fa34d"/><path d="M0 92 Q60 104 120 92" fill="none" stroke="#c7f0a8" stroke-width="5"/>
    ${[[40, 50], [62, 44], [84, 54], [50, 72], [74, 70], [30, 62]].map(([x, y]) => `<path d="M${x} ${y} q2 4 0 7 q-2 -3 0 -7z" fill="${OB}"/>`).join('')}` },
  zebra: { barva: '#fff', vzor: [18, 34, 50, 66, 82, 98].map((y, i) => `<path d="M0 ${y} q20 ${i % 2 ? 6 : -6} 40 0 t40 0 t40 0 v6 q-20 ${i % 2 ? -6 : 6} -40 0 t-40 0 t-40 0z" fill="${OB}"/>`).join('') },
  galaxie: { barva: '#2b1f5c', vzor: `${[[36, 40], [84, 34], [28, 82], [92, 88], [60, 100], [70, 64]].map(([x, y]) => `<path d="M${x} ${y - 4} l1.3 3 l3 1.3 l-3 1.3 l-1.3 3 l-1.3 -3 l-3 -1.3 l3 -1.3z" fill="#fff6c9"/>`).join('')}
    <circle cx="86" cy="62" r="7" fill="#ff9f6b"/><ellipse cx="86" cy="62" rx="12" ry="3" fill="none" stroke="#ffd34d" stroke-width="2" transform="rotate(-20 86 62)"/>` },
  leopard: { barva: '#f2b84b', vzor: [[34, 44], [78, 38], [28, 76], [58, 70], [90, 80], [46, 100], [78, 102]].map(([x, y]) => `<path d="M${x - 5} ${y} q2 -6 7 -4 M${x + 4} ${y - 2} q3 4 0 8 M${x - 3} ${y + 5} q4 2 7 0" fill="none" stroke="#7a4a1e" stroke-width="2.6" stroke-linecap="round"/>`).join('') },
};

// ---------- oblečení přes spodek těla ----------
const OBLECENI = {
  tricko: `<path d="M0 84 H120 V120 H0z" fill="#ff7b7b"/>`,
  'tricko-hvezda': `<path d="M0 84 H120 V120 H0z" fill="#ff5b5b"/><path d="M60 92 l2.4 5 l5.4 .6 l-4 3.8 l1 5.4 l-4.8 -2.6 l-4.8 2.6 l1 -5.4 l-4 -3.8 l5.4 -.6z" fill="#ffd34d" stroke="#1f1a24" stroke-width="1.2" stroke-linejoin="round"/>`,
  mikina: `<path d="M0 80 H120 V120 H0z" fill="#b494f0"/><path d="M40 98 h40 v14 h-40z" fill="#9d7ae0"/><path d="M52 80 v12 M68 80 v12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
  plavky: `<rect x="0" y="70" width="120" height="50" fill="#45a6f0"/>${Array.from({ length: 18 }, (_, i) => `<circle cx="${(i * 37) % 112 + 6}" cy="${74 + (i * 23) % 40}" r="1.6" fill="#1f5f9e" opacity=".7"/>`).join('')}`,
  smoking: `<path d="M0 82 H120 V120 H0z" fill="${OB}"/><path d="M48 82 L60 104 L72 82z" fill="#fff"/><path d="M52 86 l8 4 l8 -4 v6 l-8 -4 l-8 4z" fill="${OB}"/>
    <circle cx="60" cy="100" r="1.6" fill="#fff"/><circle cx="60" cy="107" r="1.6" fill="#fff"/><path d="M84 92 l8 0 l-2 -4 l-2 3 l-2 -4 z" fill="#e8352b"/>`,
  saty: `<path d="M0 78 H120 V120 H0z" fill="#ff7eb6"/><path d="M0 78 H120" stroke="#fff" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/>`,
  monterky: `<path d="M24 84 H96 V120 H24z" fill="#5b84c4"/><path d="M34 84 L30 50 M86 84 L90 50" stroke="#5b84c4" stroke-width="6"/><rect x="48" y="90" width="24" height="12" rx="2" fill="#4a6fa8"/><circle cx="34" cy="86" r="2" fill="#ffd34d"/><circle cx="86" cy="86" r="2" fill="#ffd34d"/>`,
};

// ---------- oči ----------
// Zornice s odleskem; trida pv-zl / pv-zr = levá / pravá zornice, CSS s nimi občas mrkne stranou nebo zašilhá.
const oko = (x, y, r, px, py, trida = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${T2}/><g class="${trida}"><circle cx="${x + px}" cy="${y + py}" r="${r * .42}" fill="${OB}"/><circle cx="${x + px + r * .16}" cy="${y + py - r * .16}" r="${r * .13}" fill="#fff"/></g>`;
const OCI = {
  koukaci: oko(46, 48, 11, 0, .5, 'pv-zl') + oko(73, 46, 12, 0, .5, 'pv-zr'),
  nahoru: oko(46, 46, 11, 1, -5) + oko(73, 44, 12, 1, -5.5),
  silene: oko(44, 48, 9, -2, 3) + oko(72, 44, 14, 4, -3),
  ospale: `<circle cx="46" cy="48" r="11" fill="#fff" ${T2}/><circle cx="73" cy="46" r="12" fill="#fff" ${T2}/><path d="M35 46 a11 11 0 0 1 22 0z M61 44 a12 12 0 0 1 24 0z" fill="currentColor" ${T2}/><circle cx="47" cy="51" r="3.5" fill="${OB}"/><circle cx="74" cy="50" r="3.8" fill="${OB}"/>`,
  kyklop: oko(60, 46, 15, 0, .5, 'pv-zl'),
  hvezdy: [[46, 48, 11], [73, 46, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${T2}/><path d="M${x} ${y - 6} l1.8 4 l4.2 .4 l-3.2 2.8 l1 4.2 l-3.8 -2.2 l-3.8 2.2 l1 -4.2 l-3.2 -2.8 l4.2 -.4z" fill="#ffc21a" stroke="${OB}" stroke-width="1"/>`).join(''),
  spiralky: [[46, 48, 11], [73, 46, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${T2}/><path d="M${x} ${y} m0 -1.5 a1.5 1.5 0 1 1 -1.5 1.5 a3.5 3.5 0 1 1 3.5 3.5 a5.5 5.5 0 1 1 5.5 -5.5 a7.5 7.5 0 0 1 -7.5 7.5" fill="none" stroke="${OB}" stroke-width="1.5" stroke-linecap="round"/>`).join(''),
  mrk: oko(46, 48, 11, 0, .5, 'pv-zl') + `<path d="M62 47 q11 -7 22 0" fill="none" ${T}/>`,
  hmm: oko(46, 48, 11, -3, -4) + oko(73, 46, 12, -3, -4.5),
  zamilovane: [[46, 48, 11], [73, 46, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${T2}/><path d="M${x} ${y + 5} l-5 -5 c-3 -3 1 -7 5 -3 c4 -4 8 0 5 3z" fill="#ff3b6b"/>`).join(''),
};

// ---------- pusy ----------
const PUSY = {
  usmev: `<path d="M48 72 q12 10 24 0" fill="none" ${T}/>`,
  otevrena: `<path d="M44 72 q16 -6 32 0 q-4 18 -16 20 q-12 -2 -16 -20z" fill="#7a2e22" ${T2}/>`,
  jazyk: `<path d="M48 72 q12 8 24 0" fill="none" ${T}/><path d="M56 76 q4 10 8 0" fill="#ff6f8f" ${T2}/>`,
  zuby: `<path d="M44 70 h32 q-2 12 -16 12 q-14 0 -16 -12z" fill="#fff" ${T2}/><path d="M52 70 v6 M60 70 v7 M68 70 v6" stroke="${OB}" stroke-width="1.6"/>`,
  vampir: `<path d="M46 70 q14 10 28 0" fill="none" ${T}/><path d="M50 72 l2.5 7 l2.5 -5.4z M65 74 l2.5 5.4 l2.5 -7z" fill="#fff" stroke="${OB}" stroke-width="1.3" stroke-linejoin="round"/>`,
  hmm: `<path d="M50 74 q5 -4 10 0 t10 0" fill="none" ${T}/>`,
  zobak: `<path d="M50 66 l10 8 l10 -8z" fill="#ffae2b" ${T2}/>`,
};
const KNIR = `<path d="M60 66 q-8 -6 -16 0 q-6 4 -12 -2 q4 10 14 8 q8 -2 14 -4 q6 2 14 4 q10 2 14 -8 q-6 6 -12 2 q-8 -6 -16 0z" fill="${OB}"/>`;

// ---------- brýle ----------
const BRYLE = {
  velke: `<path d="M24 36 q12 -6 32 2 q4 18 -12 22 q-18 2 -20 -24z M64 38 q20 -8 34 -2 q2 26 -18 24 q-16 -4 -16 -22z" fill="#ff4a3d" fill-opacity=".85" stroke="#ffd34d" stroke-width="5" stroke-linejoin="round"/><path d="M56 40 q4 -3 8 0" fill="none" stroke="#ffd34d" stroke-width="5"/>`,
  lyzarske: `<path d="M18 44 h84" stroke="${OB}" stroke-width="5"/><rect x="26" y="34" width="68" height="24" rx="12" fill="#2b2b33" stroke="#4fa8f0" stroke-width="5"/><path d="M34 40 h12" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".6"/>`,
  nerd: `<rect x="32" y="36" width="26" height="22" rx="4" fill="none" ${T}/><rect x="61" y="34" width="26" height="22" rx="4" fill="none" ${T}/><path d="M58 46 h3" ${T}/>`,
  srdickove: `<path d="M46 62 l-14 -14 c-8 -9 4 -20 14 -9 c10 -11 22 0 14 9z M74 60 l-14 -14 c-8 -9 4 -20 14 -9 c10 -11 22 0 14 9z" fill="#ff5fa2" fill-opacity=".85" ${T2}/>`,
};

// ---------- na hlavu ----------
const HLAVA = {
  cylindr: `<rect x="40" y="-4" width="40" height="26" rx="2" fill="${OB}"/><rect x="28" y="20" width="64" height="6" rx="3" fill="${OB}"/><rect x="40" y="14" width="40" height="5" fill="#e8352b"/>`,
  fedora: `<path d="M22 22 q38 -10 76 0 q-6 6 -38 6 q-32 0 -38 -6z" fill="${OB}"/><path d="M36 22 q2 -22 24 -22 q22 0 24 22z" fill="${OB}"/><path d="M36 17 h48" stroke="#fff" stroke-width="4"/>`,
  party: `<path d="M48 26 L60 -6 L72 26z" fill="#4dabf7" ${T2}/><path d="M53 16 h14 M56 8 h8" stroke="#ffd34d" stroke-width="3"/><circle cx="60" cy="-6" r="5" fill="#ff6fae" ${T2}/>`,
  korunka: `<path d="M38 26 l4 -22 l9 12 l9 -16 l9 16 l9 -12 l4 22z" fill="#ffd34d" ${T2}/><circle cx="60" cy="18" r="3" fill="#e8352b"/><circle cx="46" cy="20" r="2" fill="#4dabf7"/><circle cx="74" cy="20" r="2" fill="#3fa34d"/>`,
  kuchar: `<rect x="40" y="10" width="40" height="14" rx="2" fill="#fff" ${T2}/><path d="M40 12 q-12 -16 6 -20 q4 -12 14 -6 q10 -6 14 6 q18 4 6 20z" fill="#fff" ${T2}/>`,
  vrtulka: `<path d="M36 26 q2 -22 24 -22 q22 0 24 22z" fill="#ff5b5b" ${T2}/><path d="M36 26 q8 -18 14 -21 v21z M84 26 q-8 -18 -14 -21 v21z" fill="#ffd34d"/><path d="M60 4 v-6" ${T2}/><path d="M42 -6 l36 4 M78 -6 l-36 4" stroke="#4dabf7" stroke-width="4" stroke-linecap="round"/>`,
  ousko: `<path d="M34 34 l4 -26 l18 16z M86 34 l-4 -26 l-18 16z" fill="currentColor" ${T}/><path d="M40 26 l2 -12 l8 8z M80 26 l-2 -12 l-8 8z" fill="#ffadc6"/>`,
  tykadla: `<path d="M50 24 q-4 -14 -10 -18 M70 24 q4 -14 10 -18" fill="none" ${T}/><circle cx="40" cy="5" r="5" fill="#8fd36b" ${T2}/><circle cx="80" cy="5" r="5" fill="#8fd36b" ${T2}/>`,
  kovboj: `<path d="M14 26 q46 14 92 0 q-6 10 -46 11 q-40 -1 -46 -11z" fill="#a8693a" ${T2}/><path d="M38 26 q-2 -26 22 -26 q24 0 22 26z" fill="#c9844e" ${T2}/><path d="M38 21 q22 5 44 0" stroke="#5e3826" stroke-width="3"/>`,
};

// ---------- věci a mazlíčci ----------
const VECI = {
  cokolada: `<g transform="rotate(-18 92 66)"><rect x="76" y="60" width="32" height="10" rx="2" fill="#8a4b2f" ${T2}/><path d="M84 60 v10 M92 60 v10 M100 60 v10" stroke="#5e3826" stroke-width="1.6"/></g>`,
  lizatko: `<path d="M100 108 L100 76" ${T}/><circle cx="100" cy="68" r="10" fill="#ff6fae" ${T2}/><path d="M100 68 m0 -6 a6 6 0 1 1 -6 6 a3.5 3.5 0 1 1 3.5 -3.5" fill="none" stroke="#fff" stroke-width="2.4"/>`,
};
const zviratko = (telo) => `<g transform="translate(88 96)">${telo}</g>`;
const MAZLICCI = {
  rybicka: zviratko(`<path d="M2 6 q12 -6 24 0 v14 q-12 8 -24 0z" fill="#cdeeff" fill-opacity=".85" ${T2}/><path d="M2 6 q12 4 24 0" fill="none" stroke="#7fc6ee" stroke-width="1.4"/><ellipse cx="13" cy="15" rx="5" ry="3.4" fill="#ff8a3d" ${T2}/><path d="M18 15 l5 -3.5 v7z" fill="#ff8a3d" ${T2}/><circle cx="11" cy="14.2" r="1" fill="${OB}"/>`),
  kocka: zviratko(`<ellipse cx="15" cy="20" rx="10" ry="6" fill="#ffa94d" ${T2}/><path d="M4 7 l2 -7 l5 5z M20 5 l5 -5 l2 7z" fill="#ffa94d" ${T2}/><circle cx="15" cy="10" r="8" fill="#ffa94d" ${T2}/><circle cx="12" cy="9.5" r="1.3" fill="${OB}"/><circle cx="18" cy="9.5" r="1.3" fill="${OB}"/><path d="M14 12.5 l1 1 l1 -1" fill="none" stroke="${OB}" stroke-width="1"/><path d="M25 20 q6 -2 5 -9" fill="none" stroke="${OB}" stroke-width="4" stroke-linecap="round"/><path d="M25 20 q6 -2 5 -9" fill="none" stroke="#ffa94d" stroke-width="2" stroke-linecap="round"/>`),
  pejsek: zviratko(`<ellipse cx="15" cy="21" rx="10" ry="5.5" fill="#c8955f" ${T2}/><circle cx="15" cy="11" r="8.5" fill="#c8955f" ${T2}/><ellipse cx="6.5" cy="12" rx="3.2" ry="6" fill="#7a4a2e" ${T2}/><ellipse cx="23.5" cy="12" rx="3.2" ry="6" fill="#7a4a2e" ${T2}/><circle cx="12" cy="10" r="1.3" fill="${OB}"/><circle cx="18" cy="10" r="1.3" fill="${OB}"/><ellipse cx="15" cy="14" rx="2" ry="1.4" fill="${OB}"/><path d="M15 16 q0 3 2 3" fill="none" stroke="#ff6f8f" stroke-width="1.6" stroke-linecap="round"/>`),
  zajic: zviratko(`<ellipse cx="10" cy="-1" rx="3" ry="9" fill="#fff" ${T2}/><ellipse cx="19" cy="-1" rx="3" ry="9" fill="#fff" ${T2}/><ellipse cx="10" cy="0" rx="1.2" ry="5.5" fill="#ffadc6"/><ellipse cx="19" cy="0" rx="1.2" ry="5.5" fill="#ffadc6"/><ellipse cx="15" cy="20" rx="10" ry="6" fill="#fff" ${T2}/><circle cx="15" cy="11" r="7.5" fill="#fff" ${T2}/><circle cx="12.5" cy="10.5" r="1.2" fill="${OB}"/><circle cx="17.5" cy="10.5" r="1.2" fill="${OB}"/><circle cx="15" cy="13.5" r="1.1" fill="#ff8fab"/>`),
  dino: zviratko(`<path d="M0 22 q4 -4 9 -3 q2 -10 10 -12 q9 -2 10 5 q0 5 -6 5 l-1 6 q-1 5 -6 5 h-10 q-5 0 -6 -6z" fill="#69c96a" ${T2}/><path d="M12 9 l2 -4 l2 3 l2 -4 l2 3" fill="#ffd34d" ${T2}/><circle cx="23" cy="10" r="1.4" fill="${OB}"/><path d="M25 14 q2 1 3 -1" fill="none" stroke="${OB}" stroke-width="1"/>`),
  robot: zviratko(`<path d="M15 0 v4" ${T2}/><circle cx="15" cy="-1" r="2" fill="#e8352b" ${T2}/><rect x="5" y="4" width="20" height="14" rx="4" fill="#c9cfdc" ${T2}/><rect x="8" y="7" width="14" height="7" rx="3" fill="#2b2230"/><circle cx="12" cy="10.5" r="1.6" fill="#5ef0ff"/><circle cx="18" cy="10.5" r="1.6" fill="#5ef0ff"/><rect x="8" y="19" width="14" height="8" rx="2" fill="#aab2c4" ${T2}/>`),
  jednorozec: zviratko(`<path d="M17 2 l3 -10 l1.5 10z" fill="#ffd34d" ${T2}/><path d="M7 6 q-6 6 -2 14 q2 -6 6 -8 q-1 6 2 10 q1 -8 6 -12z" fill="#b494f0" ${T2}/><path d="M7 6 q-3 4 -1 8" fill="none" stroke="#ff6fae" stroke-width="2"/><ellipse cx="17" cy="11" rx="8" ry="7.5" fill="#fff" ${T2}/><ellipse cx="22" cy="15" rx="4.5" ry="3.5" fill="#ffe3ef" ${T2}/><circle cx="16" cy="9.5" r="1.4" fill="${OB}"/><path d="M5 22 q10 6 22 0 v6 h-22z" fill="#fff" ${T2}/><path d="M28 2 l.8 2 l2 .8 l-2 .8 l-.8 2 l-.8 -2 l-2 -.8 l2 -.8z" fill="#ffd34d"/>`),
  hovinko: `<g transform="translate(90 94)"><path d="M0 18 q-2 -8 6 -9 q-2 -8 7 -9 q2 -6 6 -9 q3 6 2 9 q8 0 7 8 q8 2 6 10 z" fill="#7b3ee0" ${T2}/><circle cx="9" cy="8" r="3.4" fill="#fff" ${T2}/><circle cx="17" cy="8" r="3.4" fill="#fff" ${T2}/><circle cx="10" cy="9" r="1.4" fill="${OB}"/><circle cx="18" cy="9" r="1.4" fill="${OB}"/></g>`,
  kure: `<g transform="translate(92 98)"><circle cx="10" cy="10" r="10" fill="#ffd84d" ${T2}/><circle cx="7" cy="8" r="1.6" fill="${OB}"/><circle cx="13" cy="8" r="1.6" fill="${OB}"/><path d="M8 12 l2 3 l2 -3z" fill="#ffae2b"/></g>`,
};

// ---------- holka / kluk: vlasy, ručičky, nožičky ----------
// Vlasy mají přední část (přes čelo, ukousne se s sušenkou) a zadní část (za tělem).
const CEPICE = 'M14 64 C10 34 30 16 60 16 C90 16 110 34 106 64 C104 50 98 40 90 34 C82 38 72 38 64 30 C58 36 46 38 38 34 C32 38 24 44 20 52 C17 56 15 60 14 64Z';
const BODLINY = 'M14 64 C10 40 20 26 30 20 L26 6 L40 15 L42 0 L54 12 L62 -3 L68 12 L80 2 L82 17 L96 10 L92 26 C104 34 110 48 106 64 C102 48 96 40 88 36 C80 40 70 38 62 32 C54 38 44 38 36 34 C28 40 20 50 14 64Z';
const kudrny = c => { const b = Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (1.05 + i * .09); return [60 + Math.cos(a) * 44, 58 + Math.sin(a) * 40]; });
  return b.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${c}" stroke="${OB}" stroke-width="4.8"/>`).join('') + b.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${c}"/>`).join(''); };
// Fluffy (klučičí): nadýchaný vršek z „obláčků“ a ofina z vlnek přes čelo.
const fluffy = c => {
  const puf = [[22, 44, 12], [30, 28, 14], [46, 18, 16], [64, 15, 16], [81, 21, 15], [94, 34, 13], [100, 48, 10]];
  const ofina = 'M16 60 C12 42 20 32 32 30 L96 30 C106 36 108 48 104 60 Q100 46 92 44 Q87 34 79 41 Q73 31 65 39 Q58 30 51 39 Q44 31 37 41 Q30 35 25 45 Q19 46 16 60Z';
  return puf.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${OB}" stroke-width="4.8"/>`).join('')
    + `<path d="${ofina}" fill="${c}" stroke="${OB}" stroke-width="2.4" stroke-linejoin="round"/>`
    + puf.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('')
    + `<path d="M40 22 q6 -5 12 -3 M70 18 q6 -1 10 4" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2.4" stroke-linecap="round"/>`;
};
const VLASY = {
  fluffy: { pred: fluffy },
  ofina: { pred: c => `<path d="${CEPICE}" fill="${c}" ${T}/>`, za: c => `<path d="M10 70 C4 30 30 12 60 12 C90 12 116 30 110 70 L112 92 C100 96 92 92 90 86 L30 86 C28 92 20 96 8 92z" fill="${c}" ${T}/>` },
  dlouhe: { pred: c => `<path d="${CEPICE}" fill="${c}" ${T}/>`, za: c => `<path d="M12 60 C6 26 32 12 60 12 C88 12 114 26 108 60 C112 84 116 104 104 116 C98 110 96 104 92 100 L28 100 C24 104 22 110 16 116 C4 104 8 84 12 60z" fill="${c}" ${T}/>` },
  culiky: { pred: c => `<path d="${CEPICE}" fill="${c}" ${T}/>`, za: c => `<g ${T}><ellipse cx="4" cy="58" rx="11" ry="19" fill="${c}" transform="rotate(25 4 58)"/><ellipse cx="116" cy="58" rx="11" ry="19" fill="${c}" transform="rotate(-25 116 58)"/></g><circle cx="13" cy="44" r="4.5" fill="#ff5fa2" ${T2}/><circle cx="107" cy="44" r="4.5" fill="#ff5fa2" ${T2}/>` },
  drdol: { pred: c => `<path d="${CEPICE}" fill="${c}" ${T}/>`, za: c => `<circle cx="60" cy="8" r="13" fill="${c}" ${T}/>` },
  rozcuch: { pred: c => `<path d="${BODLINY}" fill="${c}" ${T}/>` },
  kudrny: { pred: c => kudrny(c) + `<path d="${CEPICE}" fill="${c}"/>` },
  ciro: { pred: c => `<path d="M42 26 L40 4 L50 16 L54 -6 L60 14 L66 -6 L70 16 L80 4 L78 26 C66 20 54 20 42 26Z" fill="${c}" ${T}/>` },
};
const MASLE = `<g transform="translate(30 20) rotate(-20)" ${T2}><path d="M0 0 L-12 -8 L-12 8z M0 0 L12 -8 L12 8z" fill="#ff5fa2"/><circle r="3.5" fill="#ff5fa2"/></g>`;
HLAVA.masle = MASLE;
const OCI_POZ = [[46, 48, 11], [73, 46, 12]];
const RASY = OCI_POZ.map(([x, y, r]) => `<path d="M${x - r * .8} ${y - r * .55} l-4 -3 M${x - r * .35} ${y - r * .92} l-2 -4.5 M${x + r * .2} ${y - r} l0 -4.5" fill="none" ${T2}/>`).join('');
const TVARE = `<ellipse cx="31" cy="66" rx="6" ry="4" fill="#ff7aa8" opacity=".55"/><ellipse cx="90" cy="64" rx="6" ry="4" fill="#ff7aa8" opacity=".55"/>`;
const PIHY = [[29, 62], [34, 66], [27, 68], [87, 60], [92, 64], [86, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#7a4a1e"/>`).join('');
const koncetina = (d, w = 8) => `<path d="${d}" fill="none" stroke="${OB}" stroke-width="${w + 4}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round"/>`;
// Mává levou rukou – pravý horní roh patří ukousnutí.
// Věci, které drží v mávající (levé) ruce; kreslí se kolem ruky na 0,0 (ruka je pak přes ně).
const V_RUCE = {
  kytka: `<path d="M0 0 L2 -20" ${T2}/><path d="M2 -20 q-9 -4 -5 -12 q4 -6 9 -1 q5 -5 9 1 q4 8 -5 12z" fill="#ff6fae" ${T2}/><circle cx="2" cy="-23" r="2.6" fill="#ffd34d"/><path d="M1 -10 q-7 -4 -9 2 q6 3 9 -2z" fill="#8fd36b" ${T2}/>`,
  balonek: `<path d="M0 0 q-5 -8 1 -15 q4 -6 1 -12" fill="none" stroke="${OB}" stroke-width="1.3"/><ellipse cx="4" cy="-38" rx="10" ry="12" fill="#e8352b" ${T2}/><path d="M3 -26 l-2.5 3.5 h5z" fill="#e8352b" ${T2}/><ellipse cx="0" cy="-43" rx="2.6" ry="4" fill="#fff" opacity=".5"/>`,
  zmrzlina: `<path d="M-6 -6 L6 -6 L0 8z" fill="#e8b46a" ${T2}/><path d="M-4 -3 l8 0 M-3 1 l6 0" stroke="#b8803e" stroke-width="1"/><circle cx="0" cy="-12" r="8" fill="#ffadd2" ${T2}/><circle cx="0" cy="-21" r="6.5" fill="#fff4c2" ${T2}/><circle cx="2" cy="-27" r="2.4" fill="#e8352b" ${T2}/>`,
  mobil: `<rect x="-6" y="-24" width="13" height="22" rx="3" fill="#2b2230" ${T2}/><rect x="-4" y="-21" width="9" height="15" rx="1.5" fill="#7fd0ff"/><path d="M-2 -17 l4 3 l-4 3z" fill="#fff"/>`,
  mikrofon: `<path d="M0 0 L0 -14" stroke="${OB}" stroke-width="4" stroke-linecap="round"/><path d="M0 0 L0 -14" stroke="#555" stroke-width="2" stroke-linecap="round"/><circle cx="0" cy="-20" r="7" fill="#c9c9d6" ${T2}/><path d="M-5 -22 h10 M-5 -18 h10 M-2 -26 v12 M2 -26 v12" stroke="#8a8a99" stroke-width=".9"/>`,
  hulka: `<path d="M0 4 L4 -28" stroke="${OB}" stroke-width="4.6" stroke-linecap="round"/><path d="M0 4 L4 -28" stroke="#5b3424" stroke-width="2.6" stroke-linecap="round"/><path d="M4 -42 l3.2 7 l7.6 .8 l-5.7 5.1 l1.6 7.5 l-6.7 -3.9 l-6.7 3.9 l1.6 -7.5 l-5.7 -5.1 l7.6 -.8z" fill="#ffd34d" ${T2}/><path d="M-10 -40 l1 2.5 l2.5 1 l-2.5 1 l-1 2.5 l-1 -2.5 l-2.5 -1 l2.5 -1z M17 -26 l.8 2 l2 .8 l-2 .8 l-.8 2 l-.8 -2 l-2 -.8 l2 -.8z" fill="#ffe58a"/>`,
};
const ruce = (mavani, vRuce = '') => koncetina('M99 88 Q110 94 113 105') + `<circle cx="113" cy="107" r="6.5" fill="currentColor" ${T2}/>`
  + (mavani ? `<g class="pv-mava">${koncetina('M19 76 Q8 66 6 52')}${vRuce ? `<g transform="translate(6 46)">${vRuce}</g>` : ''}<circle cx="6" cy="50" r="6.5" fill="currentColor" ${T2}/></g>` : koncetina('M19 78 Q8 86 6 98') + `<circle cx="6" cy="100" r="6.5" fill="currentColor" ${T2}/>`);
const nohy = (boty, typ) => koncetina('M48 108 L47 122') + koncetina('M72 108 L73 122')
  + (typ && BOTY[typ] ? BOTY[typ] : `<path d="M36 126 q0 -8 10 -8 q8 0 8 8z M66 126 q0 -8 8 -8 q10 0 10 8z" fill="${boty}" ${T2}/><path d="M36 126 h18 M66 126 h18" stroke="#fff" stroke-width="2.5"/>`);

// ========== Rozšíření 3. 10. 2026: každá sekce od obyčejných věcí po bizáry ==========
const DUHA6 = ['#ff6b7a', '#ffa94d', '#ffe066', '#69db7c', '#4dabf7', '#9775fa'];
const duhaGrad = (id, x2 = 1, y2 = 0) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${DUHA6.map((c, i) => `<stop offset="${i / 5}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const hvezda5 = (x, y, r, fill, extra = '') => { const b = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; b.push(`${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`); } return `<path d="M${b.join(' L')}z" fill="${fill}" ${extra}/>`; };
const trpyt = (x, y, s, c = '#fff') => `<path d="M${x} ${y - s} l${s * .3} ${s * .7} l${s * .7} ${s * .3} l${-s * .7} ${s * .3} l${-s * .3} ${s * .7} l${-s * .3} ${-s * .7} l${-s * .7} ${-s * .3} l${s * .7} ${-s * .3}z" fill="${c}"/>`;

// ---------- Pusy: od úsměvu po grimasy ----------
Object.assign(PUSY, {
  usmevuska: `<path d="M50 74 q10 6 20 -4" fill="none" ${T}/>`,
  kulata: `<ellipse cx="60" cy="76" rx="5" ry="6" fill="#7a2e22" ${T2}/>`,
  mezera: `<path d="M46 71 q14 16 28 0z" fill="#7a2e22" ${T2}/><path d="M48.5 71.6 h8 v4.2 h-8z M63.5 71.6 h8 v4.2 h-8z" fill="#fff"/>`,
  rovnatka: `<path d="M44 70 h32 q-2 12 -16 12 q-14 0 -16 -12z" fill="#fff" ${T2}/><path d="M45 74 h30" stroke="#8a93a6" stroke-width="1.6"/>${[49, 55, 61, 67, 73].map(x => `<rect x="${x - 1.6}" y="72.4" width="3.2" height="3.2" rx=".6" fill="#d7dce6" stroke="#6b7385" stroke-width=".6"/>`).join('')}`,
  pusinka: `<path d="M54 74 q3 -4 6 -1 q3 -3 6 1 q-3 5 -6 4 q-3 1 -6 -4z" fill="#e8352b" ${T2}/><path d="M76 68 l-2.4 -2.4 c-1.8 -1.8 .6 -4.2 2.4 -1.8 c1.8 -2.4 4.2 0 2.4 1.8z" fill="#ff5fa2"/>`,
  grimasa: `<path d="M44 74 l5 -4 l5 5 l5 -5 l5 5 l5 -5 l5 4" fill="none" ${T}/><path d="M66 75 q2 9 7 6 q2 -3 -1 -7" fill="#ff6f8f" ${T2}/>`,
  vyplazeny: `<path d="M48 72 q12 8 24 0" fill="none" ${T}/><path d="M55 75 q0 16 6 16 q6 0 5 -16z" fill="#ff6f8f" ${T2}/><path d="M60.5 77 v9" stroke="#e0507a" stroke-width="1.2"/><path d="M71 76 q1.5 6 0 10" fill="none" stroke="#9fd8ff" stroke-width="2.2" stroke-linecap="round"/><circle cx="71" cy="88" r="1.8" fill="#9fd8ff"/>`,
  'zlate-zuby': `<path d="M44 70 h32 q-2 12 -16 12 q-14 0 -16 -12z" fill="#fff" ${T2}/><path d="M52.6 70.8 h7 v5.6 h-7z M60.6 70.8 h7 v5.8 h-7z" fill="#ffd34d"/><path d="M52 70 v6 M60 70 v7 M68 70 v6" stroke="${OB}" stroke-width="1.4"/>${trpyt(64, 69, 3)}`,
  pirani: `<path d="M40 68 q20 -4 40 0 q-4 20 -20 22 q-16 -2 -20 -22z" fill="#5a1220" ${T2}/><path d="M42.5 68.6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l2.5 -6z" fill="#fff" stroke="${OB}" stroke-width="1"/><path d="M50 87.5 l3 -5 l3 5 l3 -5 l3 5 l3 -5 l3 5z" fill="#fff" stroke="${OB}" stroke-width="1"/>`,
  'duhovy-jazyk': `<defs>${duhaGrad('bjDuha', 1, 1)}</defs><path d="M48 72 q12 8 24 0" fill="none" ${T}/><path d="M57 75 q2 24 18 22 q10 -2 6 -12" fill="none" stroke="${OB}" stroke-width="10" stroke-linecap="round"/><path d="M57 75 q2 24 18 22 q10 -2 6 -12" fill="none" stroke="url(#bjDuha)" stroke-width="7" stroke-linecap="round"/>${trpyt(88, 80, 4, '#ffe066')}${trpyt(48, 92, 3, '#ff9fcc')}`,
});

// ---------- Oči ----------
const oci2 = (f) => [[46, 48, 11, 'pv-zl'], [73, 46, 12, 'pv-zr']].map(f).join('');
Object.assign(OCI, {
  pixel: `<rect x="36" y="38" width="20" height="20" fill="#fff" ${T2}/><rect x="62" y="35" width="22" height="22" fill="#fff" ${T2}/><g class="pv-zl"><rect x="43" y="45" width="7" height="7" fill="${OB}"/></g><g class="pv-zr"><rect x="70" y="42" width="8" height="8" fill="${OB}"/></g>`,
  laser: `<path d="M46 50 L-14 116 M73 48 L134 116" stroke="#ff2b2b" stroke-width="5" opacity=".55" stroke-linecap="round"/><path d="M46 50 L-14 116 M73 48 L134 116" stroke="#ffd0d0" stroke-width="1.6" stroke-linecap="round"/>` + oci2(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${T2}/><circle cx="${x}" cy="${y + .5}" r="${r * .5}" fill="#ff2b2b"/><circle cx="${x}" cy="${y + .5}" r="${r * .2}" fill="#fff"/>`),
  'tri-oci': oko(40, 52, 9, 0, .5, 'pv-zl') + oko(60, 38, 10, 0, .5, 'pv-zr') + oko(80, 52, 9, 0, .5, 'pv-zl'),
  diamanty: oci2(([x, y, r]) => `<path d="M${x} ${y - r - 2} l${r + 2} ${r + 2} l${-r - 2} ${r + 2} l${-r - 2} ${-r - 2}z" fill="#9ff3ff" ${T2}/><path d="M${x - r - 2} ${y} h${2 * r + 4} M${x} ${y - r - 2} l-5 ${r + 2} l5 ${r + 2} l5 ${-r - 2}z" fill="none" stroke="#3bb8d9" stroke-width="1"/>`) + trpyt(30, 36, 4) + trpyt(88, 32, 4),
});

// ---------- Brýle ----------
Object.assign(BRYLE, {
  kulate: `<circle cx="46" cy="48" r="13" fill="none" stroke="#8a5a3c" stroke-width="2.4"/><circle cx="73" cy="46" r="14" fill="none" stroke="#8a5a3c" stroke-width="2.4"/><path d="M59 47.5 h1" stroke="#8a5a3c" stroke-width="2.4"/>`,
  tri_d: `<rect x="31" y="38" width="27" height="20" rx="3" fill="#e8352b" fill-opacity=".7" stroke="#fff" stroke-width="3"/><rect x="60" y="36" width="27" height="20" rx="3" fill="#2f8ef0" fill-opacity=".7" stroke="#fff" stroke-width="3"/><rect x="31" y="38" width="27" height="20" rx="3" fill="none" ${T2}/><rect x="60" y="36" width="27" height="20" rx="3" fill="none" ${T2}/>`,
  hvezdicove: hvezda5(46, 48, 16, '#ff6fae', `fill-opacity=".8" stroke="#ffd34d" stroke-width="3" stroke-linejoin="round"`) + hvezda5(74, 46, 17, '#ff6fae', `fill-opacity=".8" stroke="#ffd34d" stroke-width="3" stroke-linejoin="round"`),
  monokl: `<circle cx="73" cy="46" r="14" fill="#cdeeff" fill-opacity=".35" stroke="#d4a017" stroke-width="3"/><path d="M85 53 q8 14 -2 32" fill="none" stroke="#d4a017" stroke-width="1.5"/>`,
  pixel: `<path d="M24 40 h72 v6 h-4 v6 h-6 v5 h-14 v-5 h-6 v-6 h-4 v6 h-6 v5 h-14 v-5 h-6 v-6 h-4z" fill="${OB}"/><path d="M30 42 h5 v3 h-5z M66 42 h5 v3 h-5z" fill="#fff"/>`,
  disko: `<defs>${duhaGrad('brDuha')}</defs><rect x="24" y="35" width="72" height="22" rx="11" fill="url(#brDuha)" ${T2}/>${[34, 44, 54, 66, 76, 86].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 42 : 50}" r="2.4" fill="#fff" opacity=".9"/>`).join('')}${trpyt(20, 30, 5, '#ffe066')}${trpyt(100, 30, 5, '#ff9fcc')}`,
  vizor: `<path d="M20 43 q40 -14 80 0 v9 q-40 10 -80 0z" fill="#0d1424" stroke="#5ef0ff" stroke-width="2.6"/><path d="M26 47.5 q34 -8 68 0" stroke="#5ef0ff" stroke-width="2.2"/><path d="M26 47.5 q34 -8 68 0" stroke="#5ef0ff" stroke-width="6" opacity=".3"/><circle cx="18" cy="47" r="3.4" fill="#ff3b8b" ${T2}/><circle cx="102" cy="47" r="3.4" fill="#ff3b8b" ${T2}/>`,
});

// ---------- Na hlavu ----------
Object.assign(HLAVA, {
  ksiltovka: `<path d="M30 30 q2 -26 30 -26 q28 0 30 26z" fill="#4dabf7" ${T}/><path d="M62 29 q24 -3 44 5 q-14 5 -44 1z" fill="#2f8ef0" ${T2}/><circle cx="60" cy="5" r="3" fill="#2f8ef0" ${T2}/>`,
  kulich: `<path d="M30 30 q2 -28 30 -28 q28 0 30 28z" fill="#ff7b7b" ${T}/><rect x="28" y="22" width="64" height="10" rx="5" fill="#ffd0d0" ${T2}/><circle cx="60" cy="-2" r="7" fill="#fff" ${T2}/>`,
  cert: `<path d="M40 26 q-10 -8 -6 -22 q6 10 14 16z M80 26 q10 -8 6 -22 q-6 10 -14 16z" fill="#e8352b" ${T2}/>`,
  svatozar: `<ellipse cx="60" cy="-2" rx="22" ry="6" fill="none" stroke="#ffd34d" stroke-width="5"/><ellipse cx="60" cy="-2" rx="22" ry="6" fill="none" stroke="#fff6c9" stroke-width="1.5"/>${trpyt(36, -8, 3, '#ffe58a')}${trpyt(86, -6, 3, '#ffe58a')}`,
  viking: `<path d="M26 16 q-14 -4 -16 -22 q10 10 20 12z M94 16 q14 -4 16 -22 q-10 10 -20 12z" fill="#fff4dc" ${T2}/><path d="M28 28 q2 -28 32 -28 q30 0 32 28z" fill="#a9b3c4" ${T}/><path d="M29 23 h62" stroke="#d4a017" stroke-width="5"/><path d="M60 0 v22" stroke="#d4a017" stroke-width="3"/>${[36, 48, 72, 84].map(x => `<circle cx="${x}" cy="23" r="1.4" fill="#fff6c9"/>`).join('')}`,
  roh: `<path d="M54 24 L60 -18 L66 24z" fill="#ffe58a" ${T2}/><path d="M55.5 15 l9 -3 M57 5 l7 -2.5 M58.6 -5 l3.6 -1.4" stroke="#e0a800" stroke-width="1.4"/>${trpyt(72, -10, 4, '#ff9fcc')}${trpyt(46, -4, 3, '#b494f0')}`,
  pizza: `<path d="M30 27 L60 -20 L90 27z" fill="#ffd34d" ${T2}/><path d="M28 27 q32 8 64 0 l-2 -5 q-30 7 -60 0z" fill="#d9a066" ${T2}/><circle cx="52" cy="10" r="4" fill="#e8352b" ${T2}/><circle cx="66" cy="3" r="3.5" fill="#e8352b" ${T2}/><circle cx="64" cy="16" r="3" fill="#e8352b" ${T2}/><path d="M46 18 q3 -3 6 0" stroke="#3fa34d" stroke-width="2" fill="none"/>`,
  chobotnice: `<path d="M32 28 q-10 14 -4 28 M44 30 q-6 14 -2 26 M76 30 q6 14 2 26 M88 28 q10 14 4 28" fill="none" stroke="${OB}" stroke-width="8" stroke-linecap="round"/><path d="M32 28 q-10 14 -4 28 M44 30 q-6 14 -2 26 M76 30 q6 14 2 26 M88 28 q10 14 4 28" fill="none" stroke="#b494f0" stroke-width="5" stroke-linecap="round"/><path d="M26 32 q0 -40 34 -40 q34 0 34 40z" fill="#b494f0" ${T}/>${[[48, 6], [72, 6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#fff" ${T2}/><circle cx="${x + 1}" cy="${y + 1}" r="2.6" fill="${OB}"/>`).join('')}<path d="M54 18 q6 4 12 0" fill="none" ${T2}/>${[[36, 20], [84, 18], [60, -4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#d9c8ff"/>`).join('')}`,
  astronaut: `<circle cx="60" cy="52" r="54" fill="#cdeeff" fill-opacity=".22" stroke="#e8edf5" stroke-width="6"/><circle cx="60" cy="52" r="57" fill="none" stroke="${OB}" stroke-width="1.6"/><circle cx="60" cy="52" r="51" fill="none" stroke="${OB}" stroke-width="1.2"/><path d="M26 22 q12 -16 30 -20" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/><rect x="50" y="-7" width="20" height="7" rx="3" fill="#e8edf5" ${T2}/>`,
});

// ---------- Na obličej: pod = před pusou (vousy, malování), nad = po očích ----------
const OBLICEJ = {
  naplast: { nad: `<g transform="rotate(-25 84 66)"><rect x="76" y="62" width="16" height="7" rx="3" fill="#f3c89a" ${T2}/><rect x="81.5" y="62.6" width="5" height="5.8" fill="#e6b07a"/></g>` },
  trpyt: { pod: [[28, 64], [33, 68], [26, 70], [88, 62], [93, 66], [86, 68]].map(([x, y], i) => trpyt(x, y, 2.6, i % 2 ? '#ffd34d' : '#ff9fcc')).join('') },
  tygr: { pod: `<path d="M18 60 l12 2 l-12 3 M18 70 l13 0 l-13 4 M102 58 l-12 2 l12 3 M102 68 l-13 0 l13 4 M54 30 l6 6 l6 -6" fill="none" stroke="#e86a1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` },
  plnovous: { pod: `<path d="M22 66 q2 34 38 36 q36 -2 38 -36 q-8 12 -18 10 q-8 8 -20 8 q-12 0 -20 -8 q-10 2 -18 -10z" fill="#5b3424" ${T2}/>` },
  'knir-kudrna': { nad: `<path d="M60 67 q-7 -5 -14 -1 q-7 3 -10 -2 q-1 6 6 8 q10 2 18 -3 q8 5 18 3 q7 -2 6 -8 q-3 5 -10 2 q-7 -4 -14 1z" fill="${OB}"/><circle cx="35" cy="62" r="3" fill="none" stroke="${OB}" stroke-width="2"/><circle cx="85" cy="62" r="3" fill="none" stroke="${OB}" stroke-width="2"/>` },
  diamant: { nad: `<path d="M60 30 l6 6 l-6 7 l-6 -7z" fill="#9ff3ff" ${T2}/><path d="M54 36 h12" stroke="#3bb8d9" stroke-width="1"/>${trpyt(68, 28, 3)}` },
  'duha-malovani': { pod: `<defs>${duhaGrad('obDuha')}</defs><path d="M20 70 q10 -14 20 0" fill="none" stroke="url(#obDuha)" stroke-width="5" stroke-linecap="round"/><path d="M80 68 q10 -14 20 0" fill="none" stroke="url(#obDuha)" stroke-width="5" stroke-linecap="round"/>${trpyt(30, 58, 3, '#ffe066')}${trpyt(90, 56, 3, '#ffe066')}` },
};

// ---------- Oblečení (za = část za tělem, třeba plášť) ----------
const OBLECENI_ZA = {
  superhrdina: `<path d="M20 70 q-14 30 -6 50 q20 -6 46 -6 q26 0 46 6 q8 -20 -6 -50z" fill="#e8352b" ${T}/>`,
  dino: `<path d="M44 22 l4 -10 l5 9 l5 -12 l5 12 l5 -9 l4 10" fill="#5fbf5f" ${T2}/>`,
};
Object.assign(OBLECENI, {
  pruhy: `<path d="M0 84 H120 V120 H0z" fill="#fff"/>${[86, 96, 106, 116].map(y => `<rect x="0" y="${y}" width="120" height="5" fill="#4dabf7"/>`).join('')}`,
  superhrdina: `<path d="M0 80 H120 V120 H0z" fill="#2f6fe0"/><path d="M0 98 H120" stroke="#ffd34d" stroke-width="4"/><path d="M52 84 h16 l-8 12z" fill="#ffd34d" stroke="${OB}" stroke-width="1.4" stroke-linejoin="round"/><path d="M57 86 l3 4 l3 -4" fill="#e8352b"/>`,
  dino: `<path d="M0 78 H120 V120 H0z" fill="#5fbf5f"/><path d="M36 92 q24 14 48 0 v28 h-48z" fill="#c9f2b5"/>${[[22, 88], [96, 90], [30, 106]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#3f9a3f"/>`).join('')}`,
  astronaut: `<path d="M0 80 H120 V120 H0z" fill="#eef2f7"/><path d="M0 80 H120" stroke="#a9b3c4" stroke-width="4"/><rect x="44" y="88" width="32" height="18" rx="3" fill="#a9b3c4" stroke="${OB}" stroke-width="1.4"/><circle cx="51" cy="94" r="2.4" fill="#e8352b"/><circle cx="59" cy="94" r="2.4" fill="#ffd34d"/><circle cx="67" cy="94" r="2.4" fill="#5fbf5f"/><rect x="48" y="99" width="24" height="3" rx="1.5" fill="#4dabf7"/>`,
  disko: `<path d="M0 80 H120 V120 H0z" fill="#8b5cf0"/>${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 41) % 116 + 2}" cy="${82 + (i * 17) % 36}" r="2.6" fill="${['#fff', '#ffe066', '#ff9fcc', '#9ff3ff'][i % 4]}" opacity=".9"/>`).join('')}`,
  brneni: `<defs><linearGradient id="obZlato" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b0"/><stop offset=".5" stop-color="#e0a800"/><stop offset="1" stop-color="#ffd34d"/></linearGradient></defs><path d="M0 78 H120 V120 H0z" fill="url(#obZlato)"/><path d="M0 92 H120 M0 106 H120 M60 78 V120" stroke="#a87b00" stroke-width="2"/>${[[10, 85], [50, 85], [70, 85], [110, 85], [30, 99], [90, 99]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff6c9"/>`).join('')}${trpyt(84, 84, 5)}`,
});

// ---------- Vlasy ----------
Object.assign(VLASY, {
  copanky: {
    pred: c => `<path d="${CEPICE}" fill="${c}" ${T}/>`,
    za: c => [[14, 1], [106, -1]].map(([x, s]) => [0, 1, 2, 3].map(i => `<ellipse cx="${x - s * i * 1.5}" cy="${62 + i * 12}" rx="7" ry="8" fill="${c}" ${T2}/>`).join('') + `<circle cx="${x - s * 6}" cy="${110}" r="4" fill="#ff5fa2" ${T2}/>`).join(''),
  },
  afro: { pred: c => `<path d="${CEPICE}" fill="${c}" ${T}/>`, za: c => `<circle cx="60" cy="34" r="50" fill="${c}" ${T}/>` },
  'obri-ciro': { pred: c => `<path d="M40 26 L32 -24 L48 6 L52 -34 L60 4 L68 -34 L72 6 L88 -24 L80 26 C66 18 54 18 40 26Z" fill="${c}" ${T}/><path d="M33 -20 l4 8 M52 -30 l2 10 M68 -30 l-2 10 M87 -20 l-4 8" stroke="#ff7b2b" stroke-width="4" stroke-linecap="round"/>` },
  plamenne: { pred: () => `<g class="pv-plamen"><path d="M20 34 q-8 -20 6 -34 q0 14 8 16 q-4 -22 12 -34 q0 18 8 20 q2 -20 16 -28 q-2 18 6 24 q6 -16 20 -18 q-6 14 0 26 q8 -6 14 -2 q-8 12 -6 30z" fill="#ff7b2b" ${T}/><path d="M32 30 q-2 -12 6 -20 q2 10 8 10 q0 -12 10 -20 q0 12 6 14 q4 -10 12 -14 q-2 12 4 16 q6 -6 10 -4 q-6 8 -4 18z" fill="#ffd34d"/></g><path d="${CEPICE}" fill="#ff7b2b" ${T}/>` },
  mrak: { pred: () => `${[[26, 34, 12], [36, 18, 14], [54, 10, 16], [72, 12, 15], [88, 22, 13], [96, 38, 10]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${OB}" stroke-width="4.8"/>`).join('')}<path d="${CEPICE}" fill="#fff" ${T2}/>${[[26, 34, 12], [36, 18, 14], [54, 10, 16], [72, 12, 15], [88, 22, 13], [96, 38, 10]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join('')}<path d="M8 50 l-3 8 M2 64 l-3 8 M112 52 l3 8 M118 66 l3 8" stroke="#4dabf7" stroke-width="2.4" stroke-linecap="round"/><path d="M98 -4 l-6 10 h5 l-4 9" fill="none" stroke="#ffd34d" stroke-width="2.6" stroke-linejoin="round"/>` },
  spagety: { pred: () => `${[18, 30, 90, 102].map((x, i) => `<path d="M${x} 30 q${i < 2 ? -6 : 6} 14 0 26 q${i < 2 ? -6 : 6} 12 ${i < 2 ? -2 : 2} 28" fill="none" stroke="${OB}" stroke-width="6.4" stroke-linecap="round"/><path d="M${x} 30 q${i < 2 ? -6 : 6} 14 0 26 q${i < 2 ? -6 : 6} 12 ${i < 2 ? -2 : 2} 28" fill="none" stroke="#f5d27a" stroke-width="3.6" stroke-linecap="round"/>`).join('')}<path d="${CEPICE}" fill="#f5d27a" ${T}/><path d="M30 26 q10 -10 20 0 q10 -10 20 0 q10 -10 20 0" fill="none" stroke="#e0b250" stroke-width="2"/><circle cx="60" cy="8" r="9" fill="#8a4b2f" ${T2}/><path d="M66 0 q8 -6 12 0 q-6 4 -12 0z" fill="#3fa34d" ${T2}/><path d="M54 6 q4 -3 8 0" stroke="#c0392b" stroke-width="2" fill="none"/>` },
});

// ---------- Boty: zvláštní druhy (kreslí se místo obyčejných tenisek) ----------
const BOTY = {
  kovbojky: `<path d="M38 127 v-13 h10 v8 q7 0 7 5z M82 127 v-13 h-10 v8 q-7 0 -7 5z" fill="#a8693a" ${T2}/><path d="M40 119 h6 M80 119 h-6" stroke="#ffd34d" stroke-width="1.6"/>`,
  zabky: `<path d="M35 127 q0 -9 11 -9 q9 0 9 9z M65 127 q0 -9 9 -9 q11 0 11 9z" fill="#69c96a" ${T2}/>${[[41, 118], [48, 118], [72, 118], [79, 118]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" ${T2}/><circle cx="${x}" cy="${y}" r="1" fill="${OB}"/>`).join('')}`,
  brusle: `<path d="M36 124 q0 -8 10 -8 q8 0 8 8z M66 124 q0 -8 8 -8 q10 0 10 8z" fill="#ff5fa2" ${T2}/><path d="M36 124 h18 M66 124 h18" stroke="${OB}" stroke-width="2"/>${[39, 50, 69, 80].map(x => `<circle cx="${x}" cy="128" r="3" fill="#ffd34d" ${T2}/>`).join('')}`,
  raketove: `<path d="M40 128 l3 6 l3 -6 l3 6 l3 -6 M70 128 l3 6 l3 -6 l3 6 l3 -6" fill="#ff7b2b" stroke="#ffd34d" stroke-width="1.4" stroke-linejoin="round"/><path d="M36 126 q0 -9 10 -9 q8 0 8 9z M66 126 q0 -9 8 -9 q10 0 10 9z" fill="#c9cfdc" ${T2}/><path d="M38 122 h14 M68 122 h14" stroke="#e8352b" stroke-width="2.4"/>`,
  kridla: `<path d="M34 120 q-10 -4 -12 -12 q8 2 12 6 q-6 -8 -4 -14 q6 6 8 14z M86 120 q10 -4 12 -12 q-8 2 -12 6 q6 -8 4 -14 q-6 6 -8 14z" fill="#fff" ${T2}/><path d="M36 126 q0 -8 10 -8 q8 0 8 8z M66 126 q0 -8 8 -8 q10 0 10 8z" fill="#ffd34d" ${T2}/><path d="M36 126 h18 M66 126 h18" stroke="#fff" stroke-width="2.5"/>${trpyt(58, 116, 3, '#ffe58a')}`,
};

// ---------- V ruce: extra ----------
Object.assign(V_RUCE, {
  trofej: `<path d="M-8 -28 h16 v6 q0 10 -8 10 q-8 0 -8 -10z" fill="#ffd34d" ${T2}/><path d="M-8 -24 q-6 0 -6 5 q0 5 6 4 M8 -24 q6 0 6 5 q0 5 -6 4" fill="none" stroke="${OB}" stroke-width="1.6"/><rect x="-2" y="-12" width="4" height="6" fill="#e0a800" ${T2}/><rect x="-6" y="-6" width="12" height="4" rx="1" fill="#8a5a3c" ${T2}/>${trpyt(10, -32, 3)}`,
  mec: `<path d="M0 -6 L0 -50" stroke="#ff5fa2" stroke-width="9" stroke-linecap="round" opacity=".4"/><path d="M0 -6 L0 -50" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><rect x="-2.8" y="-8" width="5.6" height="14" rx="1.6" fill="#6b7385" ${T2}/>`,
});

// ---------- Těsta: převleky celé sušenky (3. 10. 2026) ----------
const pruhTygr = (x, y, s) => `<path d="M${x} ${y} q${s * 8} ${s * 2} ${s * 14} ${s * 7} q${-s * 9} ${-s * 1} ${-s * 14} ${-s * 3}z" fill="${OB}"/>`;
Object.assign(KUZE, {
  tygr: { barva: '#ff9a3c', vzor: [pruhTygr(10, 40, 1), pruhTygr(8, 58, 1), pruhTygr(10, 78, 1), pruhTygr(110, 40, -1), pruhTygr(112, 58, -1), pruhTygr(110, 78, -1)].join('') + `<path d="M52 26 l8 8 l8 -8" fill="none" stroke="${OB}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="60" cy="80" rx="20" ry="13" fill="#fff4e6"/>` },
  krava: { barva: '#fff', vzor: `<path d="M18 40 q10 -10 18 2 q4 12 -10 14 q-12 -2 -8 -16z M82 30 q12 -6 18 6 q2 12 -10 12 q-10 -4 -8 -18z M84 92 q10 -4 14 6 q-2 10 -14 6z M22 92 q8 -6 14 4 q-4 10 -14 4z" fill="${OB}"/><ellipse cx="60" cy="84" rx="18" ry="11" fill="#ffb7c8"/><ellipse cx="53" cy="84" rx="2.6" ry="3.4" fill="#c46a82"/><ellipse cx="67" cy="84" rx="2.6" ry="3.4" fill="#c46a82"/>`,
    za: `<path d="M34 30 q-12 -6 -14 -18 q10 4 18 10z M86 30 q12 -6 14 -18 q-10 4 -18 10z" fill="#fff4c2" ${T2}/><ellipse cx="18" cy="38" rx="10" ry="5" fill="#fff" ${T2} transform="rotate(-20 18 38)"/><ellipse cx="102" cy="38" rx="10" ry="5" fill="#fff" ${T2} transform="rotate(20 102 38)"/>` },
  zirafa: { barva: '#f5c451', vzor: [[24, 44], [44, 30], [80, 30], [96, 52], [28, 72], [86, 80], [50, 100], [74, 102], [20, 96]].map(([x, y], i) => `<path d="M${x - 7} ${y - 3} l5 -6 l8 1 l3 7 l-4 7 l-8 0z" fill="#b8742a" transform="rotate(${i * 23} ${x} ${y})"/>`).join(''),
    za: `<path d="M48 26 l-2 -16 M72 26 l2 -16" stroke="${OB}" stroke-width="6" stroke-linecap="round"/><path d="M48 26 l-2 -16 M72 26 l2 -16" stroke="#f5c451" stroke-width="3.4" stroke-linecap="round"/><circle cx="46" cy="8" r="4.4" fill="#b8742a" ${T2}/><circle cx="74" cy="8" r="4.4" fill="#b8742a" ${T2}/>` },
  dino: { barva: '#69c96a', vzor: `<path d="M30 74 q30 -10 60 0 q4 30 -30 36 q-34 -6 -30 -36z" fill="#c9f2b5"/>${[[30, 40], [40, 30], [84, 36], [92, 50], [22, 58], [98, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#4fa64f"/>`).join('')}`,
    za: `<path d="M30 30 l2 -14 l8 10 l6 -16 l8 14 l6 -16 l6 16 l8 -14 l6 16 l8 -10 l2 14z" fill="#ff9a3c" ${T2}/>` },
  robot: { barva: '#c9cfdc', vzor: `<path d="M14 60 H106 M60 22 V60" stroke="#8a93a6" stroke-width="2"/>${[[24, 40], [96, 40], [24, 80], [96, 80], [60, 28]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#8a93a6"/>`).join('')}<rect x="40" y="88" width="40" height="16" rx="3" fill="#2b2230"/><path d="M44 96 h6 l3 -5 l4 10 l3 -5 h16" fill="none" stroke="#5ef0ff" stroke-width="2"/>`,
    za: `<path d="M60 22 v-16" stroke="${OB}" stroke-width="3"/><circle cx="60" cy="4" r="5" fill="#e8352b" ${T2}/><rect x="10" y="56" width="8" height="18" rx="3" fill="#a9b3c4" ${T2}/><rect x="102" y="56" width="8" height="18" rx="3" fill="#a9b3c4" ${T2}/>` },
  krystal: { barva: '#bfefff', vzor: `<path d="M14 50 L40 22 L60 46 L80 22 L106 50 L84 80 L60 60 L36 80z M36 80 L60 112 L84 80" fill="none" stroke="#fff" stroke-width="2.4" opacity=".9"/><path d="M40 22 L36 80 M80 22 L84 80 M60 46 L60 60" stroke="#7fd0ee" stroke-width="1.6"/>${trpyt(30, 36, 5)}${trpyt(92, 90, 4)}${trpyt(70, 30, 3)}` },
  lava: { barva: '#3a1a14', vzor: `<path d="M20 40 l14 10 l-4 14 l16 8 l6 18 M100 36 l-12 14 l6 12 l-16 10 l-2 20 M46 24 l10 16 l14 -6 l6 12" fill="none" stroke="#ff7b2b" stroke-width="7" opacity=".35" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 40 l14 10 l-4 14 l16 8 l6 18 M100 36 l-12 14 l6 12 l-16 10 l-2 20 M46 24 l10 16 l14 -6 l6 12" fill="none" stroke="#ffb12b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>` },
  disko: { barva: '#c9cfdc', vzor: Array.from({ length: 12 * 12 }, (_, i) => { const x = (i % 12) * 10, y = 16 + Math.floor(i / 12) * 9; return `<rect x="${x + .6}" y="${y + .6}" width="8.8" height="7.8" fill="${['#e8edf5', '#b9c2d3', '#fff', '#ffd0ea', '#cdeeff', '#fff6c9'][(i * 7) % 6]}"/>`; }).join('') + trpyt(32, 34, 6) + trpyt(88, 70, 5) + trpyt(56, 100, 4) },
  ufo: { barva: '#7be08a', vzor: [[28, 40], [92, 44], [24, 86], [96, 90], [60, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#4fbf62"/>`).join(''),
    za: `<path d="M48 24 q-6 -14 -14 -18 M72 24 q6 -14 14 -18" fill="none" ${T}/><circle cx="34" cy="5" r="5.5" fill="#d6ff5e" ${T2}/><circle cx="86" cy="5" r="5.5" fill="#d6ff5e" ${T2}/>` },
});

// Vnitřek postavičky (bez obalového <svg>). Souřadnice -12..132 × -14..132; třídy pv-* rozhýbe CSS v aplikaci.
export const SUSENKA_VIEWBOX = '-12 -14 144 146';
export function susenkaObsah(v) {
  const k = KUZE[v.kuze] || KUZE.susenka;
  const id = 'b' + (++n);
  const pusa = v.vousy === 'knir' ? KNIR + (PUSY[v.pusa] || '') : (PUSY[v.pusa] || PUSY.usmev);
  const vl = VLASY[v.vlasy];
  let cv = v.barvaVlasu || '#5b3424', defs = '';
  if (cv === 'duha') { cv = `url(#${id}d)`; defs = `<linearGradient id="${id}d" x1="0" y1="0" x2="1" y2="1">${['#ff6b7a', '#ffa94d', '#ffe066', '#69db7c', '#4dabf7', '#9775fa'].map((c, i) => `<stop offset="${i / 5}" stop-color="${c}"/>`).join('')}</linearGradient>`; }
  const tela = !!(v.rod || vl || v.ruce);
  const predVlasy = vl ? vl.pred(cv) : '';
  const ki = Math.abs(v.kousnuti | 0) % KOUSNUTI.length, KOUS = KOUSNUTI[ki];
  const kousMaska = s => `<mask id="${id}${s}"><rect x="-20" y="-20" width="160" height="160" fill="#fff"/>${KOUS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>`).join('')}</mask>`;
  return `<g style="color:${k.barva}"><defs>${defs}
    <clipPath id="${id}"><path d="${TELO}"/></clipPath>${kousMaska('m')}${kousMaska('v')}</defs>
    ${tela ? nohy(v.boty || '#4dabf7', v.botyTyp) : ''}
    <g class="pv-kyv">
    ${vl && vl.za ? `<g class="pv-vlasy">${vl.za(cv)}</g>` : ''}
    ${k.za || ''}${OBLECENI_ZA[v.obleceni] || ''}
    <g mask="url(#${id}m)">
      <path d="${TELO}" fill="${k.barva}"/>
      <g clip-path="url(#${id})">${k.vzor || ''}${OBLECENI[v.obleceni] || ''}<ellipse cx="40" cy="42" rx="12" ry="7" fill="#fff" opacity=".2" transform="rotate(-35 40 42)"/></g>
      <path d="${TELO}" fill="none" ${T}/>
    </g>
    <!-- Ukousnutí bere jen sušenku: zadní vlasy jsou vidět dírou, přední vlasy a ručičky leží přes obrys. -->
    <g clip-path="url(#${id})"><g mask="url(#${id}v)">${KOUS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${OB}" stroke-width="4.8"/>`).join('')}</g></g>
    ${predVlasy}
    ${tela ? `<g class="pv-ruce">${ruce(v.mavani !== false, V_RUCE[v.vec])}</g>` : ''}
    <g fill="currentColor" stroke="${OB}" stroke-width="1.3" stroke-linejoin="round">${drobky(ki)}</g>
    ${v.rod === 'z' ? TVARE : ''}${v.pihy ? PIHY : ''}${OBLICEJ[v.oblicej]?.pod || ''}
    <g class="pv-pusa">${pusa}</g>
    <g class="pv-oci">${OCI[v.oci] || OCI.koukaci}${v.rod === 'z' && v.oci !== 'kyklop' ? RASY : ''}</g>
    ${OBLICEJ[v.oblicej]?.nad || ''}
    ${v.masle ? MASLE : ''}
    ${BRYLE[v.bryle] || ''}
    ${HLAVA[v.hlava] || ''}
    ${VECI[v.vec] || ''}
    </g>
    <g class="pv-mazl">${MAZLICCI[v.mazlicek] || ''}</g>
  </g>`;
}

// Samostatná postavička (náhledová stránka susenka.html, ikona aplikace).
export function blob(v, px = 160) {
  const tela = !!(v.rod || VLASY[v.vlasy] || v.ruce);
  return `<svg width="${px}" height="${px}" viewBox="${tela ? SUSENKA_VIEWBOX : '0 -12 120 132'}" aria-hidden="true">${susenkaObsah(v)}</svg>`;
}
