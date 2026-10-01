// Ukládání v telefonu (localStorage). Každý profil má vlastní postup.
// Tvar profilu je připravený na pozdější sdílení s kamarádkami (Firebase): stálé id, přezdívka, vzhled postavičky.

const KLIC = 'biscuit';
const vychozi = () => ({ verze: 1, profily: [], aktivni: null, rodic: { pin: null } });

let stav;
try { stav = JSON.parse(localStorage.getItem(KLIC)) || vychozi(); } catch { stav = vychozi(); }

export function uloz() {
  try { localStorage.setItem(KLIC, JSON.stringify(stav)); } catch { /* plné úložiště nebo soukromý režim */ }
}
export const data = () => stav;

export const dnes = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const cisloDne = (d = new Date()) => Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 864e5);

export function novyProfil(prezdivka, vzhled) {
  const p = {
    id: crypto.randomUUID?.() || String(Date.now()) + Math.random().toString(16).slice(2),
    prezdivka, vzhled, vytvoreno: Date.now(),
    susenky: 0,
    susenkyCelkem: 0, // nasbíráno celkem, utrácení ho nesnižuje
    srs: {},          // id položky -> { b: přihrádka 0–6, due: číslo dne, ok, chyby }
    dny: {},          // 'YYYY-MM-DD' -> { s: aktivní sekundy, lekce, ok, chyby }
    odznaky: {},      // id -> datum získání
    koupeno: [],      // id věcí ze Šatníku (postavicka.js)
    souboje: { vyhry: 0, prohry: 0, remizy: 0 },
    nastaveni: { cil: 10, unit: 1, vsechnyUnity: false },
  };
  stav.profily.push(p);
  stav.aktivni = p.id;
  uloz();
  return p;
}

// Přidá sušenky a zároveň je připíše do celkového součtu (podle něj se odemykají tituly a světy).
export function pridej(p, n) {
  p.susenkyCelkem = Math.max(p.susenkyCelkem || 0, p.susenky) + n;
  p.susenky += n;
}

export const profil = (id = stav.aktivni) => stav.profily.find(p => p.id === id) || null;
export const profily = () => stav.profily;
export function prepni(id) { stav.aktivni = id; uloz(); }
export function smazProfil(id) {
  stav.profily = stav.profily.filter(p => p.id !== id);
  if (stav.aktivni === id) stav.aktivni = stav.profily[0]?.id || null;
  uloz();
}

export function den(p, d = dnes()) {
  return (p.dny[d] ||= { s: 0, lekce: 0, ok: 0, chyby: 0 });
}

// ---------- Série a souhrny ----------
// Den se do série počítá, když je splněný denní cíl. Dnešek sérii nepřeruší, dokud neskončí.
export function serie(p) {
  const cil = p.nastaveni.cil * 60;
  const splneno = d => (p.dny[dnes(d)]?.s || 0) >= cil;
  const d = new Date();
  let n = splneno(d) ? 1 : 0;
  d.setDate(d.getDate() - 1);
  while (splneno(d)) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function nejdelsiSerie(p) {
  const cil = p.nastaveni.cil * 60;
  const dny = Object.keys(p.dny).filter(k => p.dny[k].s >= cil).sort();
  let best = 0, run = 0, prev = null;
  for (const k of dny) {
    const c = cisloDne(new Date(k + 'T12:00'));
    run = prev !== null && c === prev + 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = c;
  }
  return best;
}

export const celkemSekund = p => Object.values(p.dny).reduce((a, d) => a + d.s, 0);

export function tydenSekund(p) {
  const d = new Date();
  let s = 0;
  for (let i = 0; i < 7; i++) { s += p.dny[dnes(d)]?.s || 0; d.setDate(d.getDate() - 1); }
  return s;
}

export const umiSlov = p => Object.values(p.srs).filter(x => x.b >= 3).length;

// ---------- Záloha ----------
export function export_() { return JSON.stringify(stav, null, 1); }
export function import_(text) {
  const d = JSON.parse(text);
  if (!Array.isArray(d.profily)) throw new Error('Tohle není záloha z Biscuit.');
  stav = d;
  uloz();
}
