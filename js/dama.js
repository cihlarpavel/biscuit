// Dáma (česká pravidla, zjednodušená pro děti) – logika hry bez obrazovky.
// Deska = řetězec 64 znaků, index = řádek * 8 + sloupec, řádek 0 nahoře (strana hráče „b“).
// '.' prázdné, 'a' / 'A' = kámen / dáma vyzyvatele (světlé sušenky, začíná, jde nahoru),
// 'b' / 'B' = kámen / dáma soupeře (tmavé sušenky, jde dolů).
// Kámen táhne o jedno pole šikmo dopředu a skáká jen dopředu; dáma jezdí po úhlopříčce libovolně daleko
// a skáká i z dálky. Skákání je povinné, skoky se řetězí stejným kamenem. Kámen, který dojde na
// protější stranu, se promění v dámu a jeho tah tím končí.

export const novaDeska = () => Array.from({ length: 64 }, (_, i) => {
  const r = Math.floor(i / 8), c = i % 8;
  if ((r + c) % 2 === 0) return '.';
  return r < 3 ? 'b' : r > 4 ? 'a' : '.';
}).join('');

const SMERY = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const naDesce = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
const vlastni = (k, h) => k.toLowerCase() === h;
const cizi = (k, h) => k !== '.' && k.toLowerCase() !== h;
const dopredu = h => (h === 'a' ? -1 : 1);

// Skoky jedné figury z pole i: [{ z, na, sebrany }].
function skokyZ(d, i, h) {
  const k = d[i], r = Math.floor(i / 8), c = i % 8, dama = k === k.toUpperCase();
  const vysledek = [];
  for (const [dr, dc] of SMERY) {
    if (!dama && dr !== dopredu(h)) continue;
    if (!dama) {
      const r1 = r + dr, c1 = c + dc, r2 = r + 2 * dr, c2 = c + 2 * dc;
      if (naDesce(r2, c2) && cizi(d[r1 * 8 + c1], h) && d[r2 * 8 + c2] === '.') vysledek.push({ z: i, na: r2 * 8 + c2, sebrany: r1 * 8 + c1 });
      continue;
    }
    // dáma: přes prázdná pole k první figuře, ta musí být cizí, za ní libovolné prázdné pole
    let rr = r + dr, cc = c + dc;
    while (naDesce(rr, cc) && d[rr * 8 + cc] === '.') { rr += dr; cc += dc; }
    if (!naDesce(rr, cc) || !cizi(d[rr * 8 + cc], h)) continue;
    const sebrany = rr * 8 + cc;
    rr += dr; cc += dc;
    while (naDesce(rr, cc) && d[rr * 8 + cc] === '.') { vysledek.push({ z: i, na: rr * 8 + cc, sebrany }); rr += dr; cc += dc; }
  }
  return vysledek;
}

function krokyZ(d, i, h) {
  const k = d[i], r = Math.floor(i / 8), c = i % 8, dama = k === k.toUpperCase();
  const vysledek = [];
  for (const [dr, dc] of SMERY) {
    if (!dama && dr !== dopredu(h)) continue;
    let rr = r + dr, cc = c + dc;
    while (naDesce(rr, cc) && d[rr * 8 + cc] === '.') {
      vysledek.push({ z: i, na: rr * 8 + cc, sebrany: -1 });
      if (!dama) break;
      rr += dr; cc += dc;
    }
  }
  return vysledek;
}

// Všechny povolené tahy hráče h. pokracuj = pole kamene, který právě skáče řetěz (jinak -1).
export function tahy(d, h, pokracuj = -1) {
  if (pokracuj >= 0) return skokyZ(d, pokracuj, h);
  const moje = [...d].map((k, i) => (k !== '.' && vlastni(k, h) ? i : -1)).filter(i => i >= 0);
  const skoky = moje.flatMap(i => skokyZ(d, i, h));
  return skoky.length ? skoky : moje.flatMap(i => krokyZ(d, i, h));
}

// Provede tah. Vrací { deska, pokracuj } – pokracuj >= 0, když musí skákat dál stejným kamenem.
export function proved(d, tah, h) {
  const a = [...d];
  const k = a[tah.z];
  a[tah.z] = '.';
  if (tah.sebrany >= 0) a[tah.sebrany] = '.';
  const r = Math.floor(tah.na / 8);
  const povysen = k === h && ((h === 'a' && r === 0) || (h === 'b' && r === 7));
  a[tah.na] = povysen ? h.toUpperCase() : k;
  const deska = a.join('');
  const dal = tah.sebrany >= 0 && !povysen && skokyZ(deska, tah.na, h).length > 0;
  return { deska, pokracuj: dal ? tah.na : -1 };
}

export const souper = h => (h === 'a' ? 'b' : 'a');
// Prohrává hráč, který nemá figuru nebo nemůže táhnout.
export const prohral = (d, h) => tahy(d, h).length === 0;
export const pocet = (d, h) => [...d].filter(k => k !== '.' && vlastni(k, h)).length;
