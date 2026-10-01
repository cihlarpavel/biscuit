// Skládání lekcí a opakování v intervalech (přihrádky jako u kartiček).
import { BALICKY, balicek, polozky, ABECEDA, HLASKOVANI } from './data.js';
import { cisloDne } from './store.js';

// Po kolika dnech se položka zopakuje podle přihrádky (0 = právě představená).
const INTERVAL = [0, 1, 2, 4, 7, 14, 30];
export const UMI = 3; // od této přihrádky se slovíčko počítá jako „umím“

export const zamichat = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// Které balíčky má profil k dispozici: všechno mimo Happy Street + lekce, které už ve škole probrali.
export function odemcene(p) {
  return BALICKY.filter(b => b.skupina !== 'hs2' || !b.unit || p.nastaveni.vsechnyUnity || b.unit <= p.nastaveni.unit);
}

export function zapis(p, polozka, spravne) {
  const s = (p.srs[polozka.id] ||= { b: 0, due: 0, ok: 0, chyby: 0 });
  const d = cisloDne();
  if (spravne) { s.ok++; s.b = Math.min(6, s.b + 1); }
  else { s.chyby++; s.b = Math.max(1, s.b - 2); }
  s.due = d + INTERVAL[s.b];
}

const nova = (p, b) => polozky(b).filter(x => !p.srs[x.id]);
const kOpakovani = (p, bal) => {
  const d = cisloDne();
  return bal.flatMap(polozky).filter(x => p.srs[x.id] && p.srs[x.id].due <= d)
    .sort((a, b) => p.srs[a.id].b - p.srs[b.id].b);
};

// ---------- Úlohy ----------
// Každá úloha: { typ, polozka?, ... }. Typy: nove, poslech, en-cz, cz-en, psani, skladani, vyber-vetu, pismeno, cislo.

function moznosti(cil, zdroj, pole, n = 4) {
  const jine = zamichat(zdroj.filter(x => x[pole] && x[pole] !== cil[pole] && x.druh === cil.druh));
  const vyber = [];
  for (const x of jine) { if (!vyber.some(v => v[pole] === x[pole])) vyber.push(x); if (vyber.length >= n - 1) break; }
  return zamichat([cil, ...vyber]);
}

function ulohaPro(polozka, zdroj) {
  if (polozka.druh === 'veta') {
    const slov = polozka.en.split(' ').length;
    return Math.random() < 0.6 && slov >= 2 && slov <= 9
      ? { typ: 'skladani', polozka, dlazdice: zamichat(polozka.en.split(' ')) }
      : { typ: 'vyber-vetu', polozka, moznosti: moznosti(polozka, zdroj, 'cz', 3) };
  }
  const typy = ['en-cz', 'cz-en'];
  const sObr = zdroj.filter(x => x.obr && x.druh === 'slovo');
  if (polozka.obr && sObr.length >= 4) typy.push('poslech', 'poslech');
  if (/^[a-z]{3,8}$/i.test(polozka.en)) typy.push('psani');
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

// Dnešní lekce: opakování toho, co je na řadě, nová slovíčka z aktuální lekce ve škole a kousek „do šířky“.
// Jeden balíček: totéž, ale jen z něj.
export function sestav(p, idBalicku = null, delka = 10) {
  const bal = idBalicku ? [balicek(idBalicku)] : odemcene(p);
  const zdroj = bal.flatMap(polozky);
  const opak = kOpakovani(p, bal).slice(0, idBalicku ? 6 : 5);

  let noveP = [];
  if (idBalicku) noveP = nova(p, bal[0]).slice(0, 4);
  else {
    const skola = bal.filter(b => b.skupina === 'hs2' && b.unit).sort((a, b) => b.unit - a.unit);
    noveP = skola.flatMap(b => nova(p, b)).slice(0, 3);
    // Do šířky: jeden nový kousek z opakování nebo z „Něco navíc“, každý den odjinud.
    const siroke = bal.filter(b => b.skupina !== 'hs2' && nova(p, b).length);
    if (siroke.length) noveP.push(...nova(p, siroke[cisloDne() % siroke.length]).slice(0, noveP.length < 3 ? 3 : 1));
  }

  const ulohy = [];
  for (const x of noveP) ulohy.push({ typ: 'nove', polozka: x });
  const kProcviceni = [...noveP, ...opak];
  // Když je málo na řadě, doplní se náhodně už známé položky.
  if (kProcviceni.length < delka - noveP.length) {
    const zname = zamichat(zdroj.filter(x => p.srs[x.id] && !kProcviceni.includes(x)));
    kProcviceni.push(...zname.slice(0, delka - noveP.length - kProcviceni.length));
  }
  const procvic = zamichat(kProcviceni).map(x => ulohaPro(x, zdroj));
  // Nová slovíčka se nejdřív představí, procvičí se až po nich.
  ulohy.push(...procvic);

  const extra = bal.find(b => b.extra && (idBalicku || b.unit === p.nastaveni.unit || Math.random() < 0.3))?.extra;
  if (extra) for (let i = 0; i < 2; i++) ulohy.splice(noveP.length + Math.floor(Math.random() * (procvic.length + 1)), 0, ulohaExtra(extra));
  // Úplně prázdný balíček (vše na později) – aspoň procvičit náhodné.
  if (!ulohy.length) zamichat(zdroj).slice(0, delka).forEach(x => ulohy.push(ulohaPro(x, zdroj)));
  return ulohy;
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
