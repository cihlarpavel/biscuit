// Skládání lekcí a opakování v intervalech (přihrádky jako u kartiček).
import { BALICKY, balicek, polozky, ABECEDA, HLASKOVANI } from './data.js';
import { cisloDne } from './store.js';

// Po kolika dnech se položka zopakuje podle přihrádky (0 = právě představená).
const INTERVAL = [0, 1, 2, 4, 7, 14, 30];
export const UMI = 3;
const NOVYCH_SIROKE = 8; // nových slovíček „do šířky“ v jedné lekci (víc až když není co jiného) // od této přihrádky se slovíčko počítá jako „umím“

export const zamichat = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// Které balíčky má profil k dispozici: všechno mimo Happy Street + lekce, které už ve škole probrali.
export function odemcene(p) {
  return BALICKY.filter(b => b.skupina !== 'hs2' || !b.unit || p.nastaveni.vsechnyUnity || b.unit <= p.nastaveni.unit);
}

// prvni = první pokus o tuhle položku v lekci (mění přihrádku). Opakovaný pokus po chybě jen zaznamená,
// že ji dnes už opravila – pak se do dalších dnešních lekcí nevrací.
// s.den = kdy ji naposledy procvičovala, s.chybaDne / s.opravaDne = dnešní chyba a její oprava.
export function zapis(p, polozka, spravne, prvni = true) {
  const s = (p.srs[polozka.id] ||= { b: 0, due: 0, ok: 0, chyby: 0 });
  const d = cisloDne();
  s.den = d;
  if (!prvni) { if (spravne) s.opravaDne = d; return; }
  if (spravne) { s.ok++; s.b = Math.min(6, s.b + 1); if (s.chybaDne === d) s.opravaDne = d; }
  else { s.chyby++; s.b = Math.max(1, s.b - 2); s.chybaDne = d; }
  s.due = d + INTERVAL[s.b];
}

const nova = (p, b) => polozky(b).filter(x => !p.srs[x.id]);
const kOpakovani = (p, bal) => {
  const d = cisloDne();
  return bal.flatMap(polozky).filter(x => p.srs[x.id] && p.srs[x.id].due <= d)
    .sort((a, b) => p.srs[a.id].b - p.srs[b.id].b);
};

// ---------- Úlohy ----------
// Každá úloha: { typ, polozka?, obmena?, ... }. Typy: poslech, en-cz, cz-en, psani, skladani, vyber-vetu, pismeno, cislo.
// (Typ „nove“ = představení slovíčka s překladem se od 3. 10. nepoužívá – lekce jde rovnou do cvičení.)
// obmena() = jiná úloha na tutéž položku; přehrávač ji po chybě vloží o pár úloh dál.

function moznosti(cil, zdroj, pole, n = 4) {
  const jine = zamichat(zdroj.filter(x => x[pole] && x[pole] !== cil[pole] && x.druh === cil.druh));
  const vyber = [];
  for (const x of jine) { if (!vyber.some(v => v[pole] === x[pole])) vyber.push(x); if (vyber.length >= n - 1) break; }
  return zamichat([cil, ...vyber]);
}

// nova = položku vidí poprvé: jen úlohy, ze kterých se dá naučit (výběr z možností, poslech s obrázkem),
// psaní a skládání až u známých. jinyNez = typ, který se má vynechat (obměna po chybě).
function ulohaPro(polozka, zdroj, { nova = false, jinyNez = null, tezka = false } = {}) {
  const u = ulohaTypu(polozka, zdroj, nova, jinyNez, tezka);
  u.obmena = () => ulohaPro(polozka, zdroj, { jinyNez: u.typ, tezka });
  return u;
}
// tezka = extra kolo: jen úlohy, kde se angličtina tvoří (cz→en, psaní, skládání věty).
function ulohaTypu(polozka, zdroj, nova, jinyNez, tezka = false) {
  if (polozka.druh === 'veta') {
    const slov = polozka.en.split(' ').length;
    const skladat = !nova && slov >= 2 && slov <= 9 && (jinyNez === 'vyber-vetu' || (jinyNez !== 'skladani' && (tezka || Math.random() < 0.6)));
    return skladat
      ? { typ: 'skladani', polozka, dlazdice: zamichat(polozka.en.split(' ')) }
      : { typ: 'vyber-vetu', polozka, moznosti: moznosti(polozka, zdroj, 'cz', 3) };
  }
  let typy = tezka ? ['cz-en'] : nova ? ['en-cz'] : ['en-cz', 'cz-en'];
  const sObr = zdroj.filter(x => x.obr && x.druh === 'slovo');
  if (!tezka && polozka.obr && sObr.length >= 4) typy.push('poslech', 'poslech');
  if (!nova && /^[a-z]{3,8}$/i.test(polozka.en)) typy.push('psani');
  if (jinyNez && typy.length > 1) typy = typy.filter(t => t !== jinyNez);
  const typ = typy[Math.floor(Math.random() * typy.length)];
  if (typ === 'poslech') return { typ, polozka, moznosti: moznosti(polozka, sObr, 'obr') };
  if (typ === 'psani') return { typ, polozka, pismena: zamichat([...polozka.en.toLowerCase()]) };
  return { typ, polozka, moznosti: moznosti(polozka, zdroj, typ === 'en-cz' ? 'cz' : 'en') };
}

function ulohaExtra(extra) {
  if (extra === 'abeceda') {
    if (Math.random() < 0.5) {
      const slovo = HLASKOVANI[Math.floor(Math.random() * HLASKOVANI.length)];
      return { typ: 'psani', polozka: { en: slovo, cz: 'Poslouchej, jak se to hláskuje', obr: '🔤', druh: 'extra' }, hlaskovat: true, pismena: zamichat([...slovo.toLowerCase()]) };
    }
    const pismeno = ABECEDA[Math.floor(Math.random() * 26)];
    return { typ: 'pismeno', spravne: pismeno, moznosti: zamichat([pismeno, ...zamichat(ABECEDA.filter(x => x !== pismeno)).slice(0, 3)]) };
  }
  const [od, do_] = extra === 'cisla20' ? [1, 20] : [20, 100];
  const n = od + Math.floor(Math.random() * (do_ - od + 1));
  const blizko = new Set([n]);
  while (blizko.size < 4) {
    const m = n + [-11, -10, -2, -1, 1, 2, 9, 10, 11][Math.floor(Math.random() * 9)];
    if (m >= od && m <= do_) blizko.add(m);
  }
  return { typ: 'cislo', spravne: n, moznosti: zamichat([...blizko]) };
}

// Dnešní lekce (asi 20 úloh, rovnou cvičení bez představování):
//  1. co dnes pokazila a ještě neopravila (opakuje se v kontextu dne),
//  2. co je podle přihrádek na řadě,
//  3. nová slovíčka z aktuální lekce ve škole,
//  4. zbytek nová slovíčka „do šířky“ z několika různých balíčků – ať je lekce bohatá a neopakuje se,
//  5. teprve když nové dojdou, už známé – přednostně ty, které dnes ještě neviděla.
// Jeden balíček: totéž, ale jen z něj.
export function sestav(p, idBalicku = null, delka = 20) {
  const bal = idBalicku ? [balicek(idBalicku)] : odemcene(p);
  const zdroj = bal.flatMap(polozky);
  const d = cisloDne();
  const srs = id => p.srs[id];
  const vybrane = [];
  const pridej = (xs, n) => { for (const x of xs) { if (n <= 0 || vybrane.length >= delka) break; if (!vybrane.includes(x)) { vybrane.push(x); n--; } } };

  pridej(zamichat(zdroj.filter(x => srs(x.id)?.chybaDne === d && srs(x.id).opravaDne !== d)), 5);
  pridej(kOpakovani(p, bal).filter(x => srs(x.id).den !== d), idBalicku ? 8 : 6);
  if (idBalicku) pridej(nova(p, bal[0]), delka);
  else {
    const skola = bal.filter(b => b.skupina === 'hs2' && b.unit).sort((a, b) => b.unit - a.unit);
    pridej(skola.flatMap(b => nova(p, b)), 5);
    // Do šířky: po 2–3 nových z různých balíčků (náhodné pořadí), nejvýš NOVYCH_SIROKE na lekci.
    const siroke = zamichat(bal.filter(b => b.skupina !== 'hs2' && nova(p, b).length));
    const pred = vybrane.length;
    for (const b of siroke) pridej(zamichat(nova(p, b)), Math.min(2 + Math.floor(Math.random() * 2), NOVYCH_SIROKE - (vybrane.length - pred)));
  }
  const znamePred = zamichat(zdroj.filter(x => srs(x.id) && !vybrane.includes(x)));
  pridej(znamePred.filter(x => srs(x.id).den !== d), delka); // známé, které dnes ještě neviděla
  pridej(zamichat(zdroj.filter(x => !srs(x.id))), delka);     // pak další nová
  pridej(znamePred, delka);

  const ulohy = zamichat(vybrane).map(x => ulohaPro(x, zdroj, { nova: !srs(x.id) }));
  const extra = bal.find(b => b.extra && (idBalicku || b.unit === p.nastaveni.unit || Math.random() < 0.3))?.extra;
  if (extra) for (let i = 0; i < 2; i++) ulohy.splice(Math.floor(Math.random() * (ulohy.length + 1)), 0, ulohaExtra(extra));
  // Překvapení: asi v každé páté lekci se jedna otázka promění ve zlatou (5 sušenek místo 1).
  if (ulohy.length && Math.random() < 0.22) ulohy[Math.floor(Math.random() * ulohy.length)].zlata = true;
  return ulohy;
}

// Extra kolo po splnění denního cíle („Dát si extra 5 minut“): ~10 těžších úloh ze slov, která už zná –
// přednostně ta, ve kterých chybuje a která jsou v nižších přihrádkách. Sušenky se za něj dávají dvojnásobné.
export function sestavExtra(p, delka = 10) {
  const bal = odemcene(p);
  const zdroj = bal.flatMap(polozky);
  const s = id => p.srs[id];
  const zname = zdroj.filter(x => s(x.id));
  const vaha = x => (s(x.id).chyby || 0) * 2 - s(x.id).b + Math.random() * 2;
  const vyber = zname.sort((a, b) => vaha(b) - vaha(a)).slice(0, delka);
  if (vyber.length < delka) vyber.push(...zamichat(zdroj.filter(x => !vyber.includes(x))).slice(0, delka - vyber.length));
  return zamichat(vyber).map(x => ulohaPro(x, zdroj, { tezka: true }));
}

// Battle: stejné otázky pro obě hráčky, jen z balíčků odemčených oběma.
export function sestavBattle(p1, p2, n = 8) {
  const ids = new Set(odemcene(p2).map(b => b.id));
  const bal = odemcene(p1).filter(b => ids.has(b.id));
  const zdroj = bal.flatMap(polozky).filter(x => x.druh === 'slovo');
  const sObr = zdroj.filter(y => y.obr);
  // Jen výběr z možností (žádné psaní), ať se dá hrát rychle a férově na čas.
  return zamichat(zdroj).slice(0, n).map(x => {
    if (x.obr && sObr.length >= 4 && Math.random() < 0.5) return { typ: 'poslech', polozka: x, moznosti: moznosti(x, sObr, 'obr') };
    const typ = Math.random() < 0.5 ? 'en-cz' : 'cz-en';
    return { typ, polozka: x, moznosti: moznosti(x, zdroj, typ === 'en-cz' ? 'cz' : 'en') };
  });
}

export function postupBalicku(p, b) {
  const v = polozky(b);
  const umi = v.filter(x => (p.srs[x.id]?.b || 0) >= UMI).length;
  return { umi, celkem: v.length };
}

// Nejproblémovější položky pro rodičovský přehled.
export function slabiny(p, n = 8) {
  const vse = new Map(BALICKY.flatMap(polozky).map(x => [x.id, x]));
  return Object.entries(p.srs).filter(([, s]) => s.chyby > 0)
    .sort((a, b) => (b[1].chyby - b[1].ok / 3) - (a[1].chyby - a[1].ok / 3))
    .slice(0, n).map(([id, s]) => ({ ...vse.get(id), ...s })).filter(x => x.en);
}
