// Postavička-sušenka – NÁVRH. Kulatá ručně „upečená“ sušenka s ukousnutým kouskem, silný obrys, velké oči;
// legrace je v šílených kombinacích: převleky celého těla, oči, pusy, brýle, klobouky, mazlíčci.
// viewBox 0 0 120 120. Vrstvy: za tělem (křídla) → tělo + vzor → oblečení → pusa → oči → brýle → klobouk → věci.

const OB = '#1f1a24';
const T = `stroke="${OB}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const T2 = `stroke="${OB}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
// Obrys sušenky: kruh s nepravidelným, mírně zvlněným okrajem (jako upečená), střed 60/67.
const CX = 60, CY = 67, R = 45;
const TELO = Array.from({ length: 120 }, (_, i) => {
  const a = i / 120 * Math.PI * 2, r = R + .8 * Math.sin(a * 7) + .9 * Math.sin(a * 3 + 1);
  return `${i ? 'L' : 'M'}${(CX + Math.cos(a) * r).toFixed(1)} ${(CY + Math.sin(a) * r).toFixed(1)}`;
}).join(' ') + 'Z';
// Ukousnutý kousek vpravo nahoře – tři kruhy „zubů“.
const KOUS = [[-48, 10], [-34, 7], [-62, 7]].map(([u, r]) => { const a = u * Math.PI / 180; return [CX + Math.cos(a) * (R + 3), CY + Math.sin(a) * (R + 3), r]; });
const DROBKY = `<path d="M104 24 l4 -1 l1 4 l-4 1z M110 34 l3 0 l0 3 l-3 0z M98 14 l3 1 l-1 3 l-3 -1z" fill="currentColor" ${'stroke="#1f1a24" stroke-width="1.6" stroke-linejoin="round"'}/>`;
let n = 0;

// ---------- kůže / převleky celého těla ----------
const KUZE = {
  pernik: { barva: '#b0703f', vzor: `<circle cx="60" cy="67" r="37" fill="none" stroke="#fff" stroke-width="3.5" stroke-dasharray="7 4" stroke-linecap="round"/>${[[30, 96], [90, 96], [60, 106]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#ff5b7a"/>`).join('')}` },
  oreo: { barva: '#3a2a2e', vzor: `<circle cx="60" cy="67" r="38" fill="none" stroke="#56423f" stroke-width="2"/>${Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2; return `<circle cx="${(60 + Math.cos(a) * 32).toFixed(1)}" cy="${(67 + Math.sin(a) * 32).toFixed(1)}" r="2.4" fill="#56423f"/>`; }).join('')}<path d="M0 90 H120 V97 H0z" fill="#fff8ec"/>` },
  poleva: { barva: '#d9a066', vzor: `<path d="M0 0 H120 V52 q-6 0 -8 10 q-2 8 -6 0 q-4 -10 -12 -6 q-6 4 -8 16 q-3 8 -6 -2 q-2 -12 -12 -10 q-8 2 -10 12 q-3 6 -6 -4 q-4 -12 -14 -8 q-8 4 -10 0 q-4 -6 -8 -4 V0z" fill="#ff8fc0" stroke="#1f1a24" stroke-width="2.4" stroke-linejoin="round"/>${[[30, 38, '#ffd34d', 20], [48, 30, '#4dabf7', -30], [72, 32, '#8fd36b', 50], [88, 44, '#fff', -10], [40, 50, '#4dabf7', 70], [64, 48, '#ffd34d', -60], [80, 26, '#fff', 15]].map(([x, y, c, r]) => `<rect x="${x}" y="${y}" width="7" height="2.6" rx="1.3" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`).join('')}` },
  posyp: { barva: '#f3dcb0', vzor: Array.from({ length: 30 }, (_, i) => `<rect x="${(i * 37) % 96 + 12}" y="${(i * 53) % 86 + 24}" width="6" height="2.4" rx="1.2" fill="${['#ff5b7a', '#4dabf7', '#ffd34d', '#8fd36b', '#b494f0'][i % 5]}" transform="rotate(${(i * 67) % 180} ${(i * 37) % 96 + 12} ${(i * 53) % 86 + 24})"/>`).join('') },
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
  plavky: `<rect x="0" y="70" width="120" height="50" fill="#45a6f0"/>${Array.from({ length: 18 }, (_, i) => `<circle cx="${(i * 37) % 112 + 6}" cy="${74 + (i * 23) % 40}" r="1.6" fill="#1f5f9e" opacity=".7"/>`).join('')}`,
  smoking: `<path d="M0 82 H120 V120 H0z" fill="${OB}"/><path d="M48 82 L60 104 L72 82z" fill="#fff"/><path d="M52 86 l8 4 l8 -4 v6 l-8 -4 l-8 4z" fill="${OB}"/>
    <circle cx="60" cy="100" r="1.6" fill="#fff"/><circle cx="60" cy="107" r="1.6" fill="#fff"/><path d="M84 92 l8 0 l-2 -4 l-2 3 l-2 -4 z" fill="#e8352b"/>`,
  saty: `<path d="M0 78 H120 V120 H0z" fill="#ff7eb6"/><path d="M0 78 H120" stroke="#fff" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/>`,
  monterky: `<path d="M24 84 H96 V120 H24z" fill="#5b84c4"/><path d="M34 84 L30 50 M86 84 L90 50" stroke="#5b84c4" stroke-width="6"/><rect x="48" y="90" width="24" height="12" rx="2" fill="#4a6fa8"/><circle cx="34" cy="86" r="2" fill="#ffd34d"/><circle cx="86" cy="86" r="2" fill="#ffd34d"/>`,
};

// ---------- oči ----------
const oko = (x, y, r, px, py, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${T2}/><circle cx="${x + px}" cy="${y + py}" r="${r * .42}" fill="${OB}"/>${extra}`;
const OCI = {
  koukaci: oko(46, 48, 11, 2.5, 2.5) + oko(73, 46, 12, 2.5, 2.5),
  nahoru: oko(46, 46, 11, 1, -5) + oko(73, 44, 12, 1, -5.5),
  silene: oko(44, 48, 9, -2, 3) + oko(72, 44, 14, 4, -3),
  ospale: `<circle cx="46" cy="48" r="11" fill="#fff" ${T2}/><circle cx="73" cy="46" r="12" fill="#fff" ${T2}/><path d="M35 46 a11 11 0 0 1 22 0z M61 44 a12 12 0 0 1 24 0z" fill="currentColor" ${T2}/><circle cx="47" cy="51" r="3.5" fill="${OB}"/><circle cx="74" cy="50" r="3.8" fill="${OB}"/>`,
  kyklop: oko(60, 46, 15, 3, 3),
  zamilovane: [[46, 48, 11], [73, 46, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${T2}/><path d="M${x} ${y + 5} l-5 -5 c-3 -3 1 -7 5 -3 c4 -4 8 0 5 3z" fill="#ff3b6b"/>`).join(''),
};

// ---------- pusy ----------
const PUSY = {
  usmev: `<path d="M48 72 q12 10 24 0" fill="none" ${T}/>`,
  otevrena: `<path d="M44 72 q16 -6 32 0 q-4 18 -16 20 q-12 -2 -16 -20z" fill="#7a2e22" ${T2}/>`,
  jazyk: `<path d="M48 72 q12 8 24 0" fill="none" ${T}/><path d="M56 76 q4 10 8 0" fill="#ff6f8f" ${T2}/>`,
  zuby: `<path d="M44 70 h32 q-2 12 -16 12 q-14 0 -16 -12z" fill="#fff" ${T2}/><path d="M52 70 v6 M60 70 v7 M68 70 v6" stroke="${OB}" stroke-width="1.6"/>`,
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
const MAZLICCI = {
  hovinko: `<g transform="translate(16 92)"><path d="M0 18 q-2 -8 6 -9 q-2 -8 7 -9 q2 -6 6 -9 q3 6 2 9 q8 0 7 8 q8 2 6 10 z" fill="#7b3ee0" ${T2}/><circle cx="9" cy="8" r="3.4" fill="#fff" ${T2}/><circle cx="17" cy="8" r="3.4" fill="#fff" ${T2}/><circle cx="10" cy="9" r="1.4" fill="${OB}"/><circle cx="18" cy="9" r="1.4" fill="${OB}"/></g>`,
  kure: `<g transform="translate(14 92)"><circle cx="10" cy="10" r="10" fill="#ffd84d" ${T2}/><circle cx="7" cy="8" r="1.6" fill="${OB}"/><circle cx="13" cy="8" r="1.6" fill="${OB}"/><path d="M8 12 l2 3 l2 -3z" fill="#ffae2b"/></g>`,
};

export function blob(v, px = 160) {
  const k = KUZE[v.kuze] || KUZE.susenka;
  const id = 'b' + (++n);
  const pusa = v.vousy === 'knir' ? KNIR + (PUSY[v.pusa] || '') : (PUSY[v.pusa] || PUSY.usmev);
  return `<svg width="${px}" height="${px}" viewBox="0 -12 120 132" aria-hidden="true" style="color:${k.barva}">
    <clipPath id="${id}"><path d="${TELO}"/></clipPath>
    <mask id="${id}m"><rect x="-20" y="-20" width="160" height="160" fill="#fff"/>${KOUS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>`).join('')}</mask>
    ${k.za || ''}
    <g mask="url(#${id}m)">
      <path d="${TELO}" fill="${k.barva}"/>
      <g clip-path="url(#${id})">${k.vzor || ''}${OBLECENI[v.obleceni] || ''}<ellipse cx="40" cy="42" rx="12" ry="7" fill="#fff" opacity=".2" transform="rotate(-35 40 42)"/></g>
      <path d="${TELO}" fill="none" ${T}/>
    </g>
    <g clip-path="url(#${id})">${KOUS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" ${T}/>`).join('')}</g>
    ${DROBKY}
    ${pusa}
    ${OCI[v.oci] || OCI.koukaci}
    ${BRYLE[v.bryle] || ''}
    ${HLAVA[v.hlava] || ''}
    ${VECI[v.vec] || ''}
    ${MAZLICCI[v.mazlicek] || ''}
  </svg>`;
}
