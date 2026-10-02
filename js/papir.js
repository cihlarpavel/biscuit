// Papírová koláž: scénky na hlavní kartu poskládané z vrstev vystřiženého papíru.
// Každá vrstva vrhá jemný stín na vrstvu za sebou. Papírovou zrnitost přidává CSS (hotový obrázek).

let n = 0;
const PALETA = {
  krem: '#fffaf2', papir: '#f7efe3', inkoust: '#2f2a4a', hneda: '#a56b4f',
  korala: '#f08a7e', pudr: '#f2b5c4', horcice: '#f2c25b', salvej: '#a9c9a4', levandule: '#c8b6e2', mata: '#9fd3c7',
};

function zaklad(id) {
  return `<defs>
    <filter id="${id}s" x="-10%" y="-30%" width="120%" height="160%"><feDropShadow dx="0" dy="-2" stdDeviation="2.2" flood-color="#5a3a2a" flood-opacity=".28"/></filter>
    <filter id="${id}v" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="1" dy="3" stdDeviation="1.8" flood-color="#5a3a2a" flood-opacity=".3"/></filter>
  </defs>`;
}


// Kopec s mírně „ručně stříhaným“ okrajem.
const kopec = (y, amp, barva, id, faze = 0) => {
  let d = `M-10 ${y}`;
  for (let x = -10; x <= 410; x += 50) d += ` Q${x + 25} ${y - amp * Math.sin((x + faze) / 70) - amp * .5} ${x + 50} ${y + amp * .2 * Math.cos((x + faze) / 40)}`;
  return `<path d="${d} V230 H-10z" fill="${barva}" filter="url(#${id}s)"/>`;
};
const mracek = (x, y, k, id, barva = PALETA.krem) => `<g transform="translate(${x} ${y}) scale(${k})" filter="url(#${id}v)">
  <path d="M-34 10 a14 14 0 0 1 6 -24 a18 18 0 0 1 32 -6 a14 14 0 0 1 26 8 a12 12 0 0 1 4 22z" fill="${barva}"/></g>`;
const strom = (x, y, k, koruna, id) => `<g transform="translate(${x} ${y}) scale(${k})" filter="url(#${id}v)">
  <rect x="-3" y="-6" width="6" height="26" rx="2" fill="${PALETA.hneda}"/><circle cy="-18" r="17" fill="${koruna}"/><circle cx="-5" cy="-23" r="5" fill="#fff" opacity=".35"/></g>`;
const vlajky = (id, barvy) => {
  const body = [];
  let p = 'M-5 14 Q200 42 405 10';
  for (let i = 0; i < 13; i++) {
    const t = i / 12, x = -5 + 410 * t, y = (1 - t) * (1 - t) * 14 + 2 * (1 - t) * t * 42 + t * t * 10;
    body.push(`<path d="M${x - 11} ${y} L${x + 11} ${y} L${x} ${y + 22}z" fill="${barvy[i % barvy.length]}"/>`);
  }
  return `<path d="${p}" fill="none" stroke="${PALETA.hneda}" stroke-width="1.6"/><g filter="url(#${id}v)">${body.join('')}</g>`;
};
const hvezda = (x, y, r, barva) => {
  const b = [];
  for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; b.push(`${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`); }
  return `<path d="M${b.join(' L')}z" fill="${barva}"/>`;
};

const SCENY = {
  den: id => `<rect width="400" height="220" fill="#e4efec"/>
    <g filter="url(#${id}v)"><circle cx="330" cy="70" r="28" fill="${PALETA.horcice}"/><circle cx="330" cy="70" r="19" fill="#f6d37f"/></g>
    ${mracek(150, 70, 1, id)}${mracek(395, 110, .8, id)}${mracek(60, 105, .65, id)}
    ${vlajky(id, [PALETA.korala, PALETA.horcice, PALETA.salvej, PALETA.levandule, PALETA.pudr])}
    ${kopec(150, 18, '#cfe0c4', id, 0)}
    ${strom(250, 140, .9, PALETA.pudr, id)}${strom(300, 150, 1.1, '#8fbf9a', id)}${strom(355, 138, .8, PALETA.horcice, id)}
    ${kopec(172, 14, '#9fc79f', id, 90)}
    ${kopec(196, 10, '#7fb08a', id, 200)}
    ${[[230, 200, PALETA.krem], [270, 206, PALETA.pudr], [330, 202, PALETA.horcice], [380, 208, PALETA.krem]].map(([x, y, c]) => `<g filter="url(#${id}v)">${hvezda(x, y, 5, c)}</g>`).join('')}`,
  noc: id => `<rect width="400" height="220" fill="#2f2a5a"/>
    ${[[60, 0, 46], [140, 0, 30], [215, 0, 58], [300, 0, 36], [370, 0, 52]].map(([x, , d], i) => `<path d="M${x} 0 V${d}" stroke="#f6e7b0" stroke-width="1" opacity=".5"/><g filter="url(#${id}v)">${hvezda(x, d + 7, 9, i % 2 ? '#f6e7b0' : PALETA.pudr)}</g>`).join('')}
    <g filter="url(#${id}v)"><path d="M318 52 a30 30 0 1 0 26 48 a24 24 0 1 1 -26 -48z" fill="#f6e7b0"/></g>
    ${mracek(170, 110, .8, id, '#4a4486')}
    ${kopec(155, 18, '#46407e', id, 0)}
    ${strom(280, 150, 1, '#5d579a', id)}${strom(330, 140, .8, '#6a63a8', id)}
    ${kopec(178, 14, '#3b356c', id, 90)}
    ${kopec(200, 10, '#2c2756', id, 200)}`,
};

export function scenaPapir(id = 'den') {
  const k = 'pp' + (++n);
  return `<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${zaklad(k)}${(SCENY[id] || SCENY.den)(k)}</svg>`;
}
