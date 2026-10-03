// Double – logika: karty, kde každé dvě mají právě jeden společný symbol (projektivní rovina řádu 5:
// 31 symbolů, 31 karet, 6 symbolů na kartě). Symbol = slovíčko; na kartě se ukáže jako obrázek,
// anglické slovo, nebo (občas) české slovo – shodu tedy tvoří i obrázek ↔ slovo nebo čeština ↔ angličtina.
// Obě hráčky dostanou stejná kola (vygeneruje je vyzyvatelka a uloží do battlu), hrají na čas.

const N = 5; // řád roviny: N + 1 symbolů na kartě, N² + N + 1 symbolů i karet
export const SYMBOLU = N * N + N + 1;

function karty() {
  const k = [];
  for (let i = 0; i <= N; i++) { const c = [0]; for (let j = 0; j < N; j++) c.push(1 + i * N + j); k.push(c); }
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const c = [i + 1];
    for (let m = 0; m < N; m++) c.push(N + 1 + N * m + ((i * m + j) % N));
    k.push(c);
  }
  return k;
}

const zamichat = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const JEN_EMOJI = /^\p{Extended_Pictographic}/u;

// slova: položky { en, cz, obr }; vezme SYMBOLU slovíček s obrázkem (emoji). Vrací { slova, kola }.
// Kolo: { a: [[symbol, podoba], ...], b: [...] } – podoba 'o' obrázek, 'e' anglicky, 'c' česky.
export function sestavDouble(polozky, kol = 24) {
  const vhodne = zamichat(polozky.filter(x => x.druh === 'slovo' && x.obr && JEN_EMOJI.test(x.obr) && x.en.length <= 12 && x.cz.length <= 14));
  const slova = [];
  for (const x of vhodne) {
    if (slova.some(s => s.obr === x.obr || s.en === x.en || s.cz === x.cz)) continue;
    slova.push({ en: x.en, cz: x.cz, obr: x.obr });
    if (slova.length === SYMBOLU) break;
  }
  if (slova.length < SYMBOLU) throw new Error('Málo slovíček s obrázkem.');
  const vse = karty();
  const kola = [];
  for (let i = 0; i < kol; i++) {
    const [a, b] = zamichat(vse).slice(0, 2);
    const spolecny = a.find(s => b.includes(s));
    // podoba společného symbolu na obou kartách: nikdy čeština na obou
    const [pa, pb] = zamichat([['o', 'e'], ['e', 'o'], ['e', 'e'], ['o', 'o'], ['c', 'e'], ['e', 'c'], ['o', 'e'], ['e', 'o']])[0];
    const podoba = (s, spol) => (s === spolecny ? spol : Math.random() < 0.15 ? 'c' : Math.random() < 0.55 ? 'o' : 'e');
    kola.push({ a: zamichat(a).map(s => [s, podoba(s, pa)]), b: zamichat(b).map(s => [s, podoba(s, pb)]) });
  }
  return { slova, kola };
}

export const spolecny = kolo => kolo.a.map(([s]) => s).find(s => kolo.b.some(([t]) => t === s));
