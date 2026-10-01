// Odznaky. Kontrolují se po každé lekci a battlu, nový odznak se ukáže na konci.
import { serie, celkemSekund, umiSlov, dnes } from './store.js';
import { BALICKY } from './data.js';
import { postupBalicku } from './lekce.js';

const zakladni = [
  { id: 'prvni', ikona: '🎉', nazev: 'První lekce', popis: 'Začátek je za tebou.', test: p => Object.values(p.dny).some(d => d.lekce > 0) },
  { id: 'perfekt', ikona: '⭐', nazev: 'Bez chyby', popis: 'Celá lekce bez jediné chyby.', test: (p, k) => k?.perfekt },
  { id: 'serie3', ikona: '🔥', nazev: '3 dny v kuse', popis: 'Denní cíl tři dny za sebou.', test: p => serie(p) >= 3 },
  { id: 'serie7', ikona: '🔥', nazev: 'Týden v kuse', popis: 'Sedm dní za sebou. Respekt.', test: p => serie(p) >= 7 },
  { id: 'serie14', ikona: '☄️', nazev: '14 dní v kuse', popis: 'Dva týdny. Nezastavitelná.', test: p => serie(p) >= 14 },
  { id: 'serie30', ikona: '🌋', nazev: 'Měsíc v kuse', popis: 'Třicet dní. Legenda.', test: p => serie(p) >= 30 },
  { id: 'slov25', ikona: '📗', nazev: '25 slovíček', popis: 'Umíš 25 slovíček a vět.', test: p => umiSlov(p) >= 25 },
  { id: 'slov100', ikona: '📚', nazev: '100 slovíček', popis: 'Stovka. To už je slovník.', test: p => umiSlov(p) >= 100 },
  { id: 'slov250', ikona: '🧠', nazev: '250 slovíček', popis: 'Mozek level: angličtinářka.', test: p => umiSlov(p) >= 250 },
  { id: 'hodina', ikona: '⏱️', nazev: 'První hodina', popis: 'Hodina čistého učení.', test: p => celkemSekund(p) >= 3600 },
  { id: 'hodin5', ikona: '⌛', nazev: '5 hodin', popis: 'Pět hodin. Fakt hodně.', test: p => celkemSekund(p) >= 5 * 3600 },
  { id: 'susenky100', ikona: '🍪', nazev: '100 sušenek', popis: 'Nasbíráno celkem. Plná krabice.', test: p => Math.max(p.susenkyCelkem || 0, p.susenky) >= 100 },
  { id: 'susenky500', ikona: '🏆', nazev: '500 sušenek', popis: 'Celá pekárna.', test: p => Math.max(p.susenkyCelkem || 0, p.susenky) >= 500 },
  { id: 'battle1', ikona: '⚔️', nazev: 'První výhra v battlu', popis: 'Porazila jsi kamarádku.', test: p => p.souboje.vyhry >= 1 },
  { id: 'battle5', ikona: '🥊', nazev: '5 výher v battlu', popis: 'Nikdo s tebou nechce hrát.', test: p => p.souboje.vyhry >= 5 },
  { id: 'nocni', ikona: '🦉', nazev: 'Noční sova', popis: 'Učení po osmé večer.', test: (p, k) => k?.hodina >= 20 },
  { id: 'ranni', ikona: '🐓', nazev: 'Ranní ptáče', popis: 'Učení před sedmou ráno.', test: (p, k) => k?.hodina < 7 },
];

// Mistrovský odznak za každý balíček (všechna slovíčka umí).
const mistr = BALICKY.map(b => ({
  id: 'mistr-' + b.id, ikona: b.ikona, nazev: 'Mistr: ' + b.nazev, popis: 'Celý balíček umíš.',
  test: p => { const x = postupBalicku(p, b); return x.celkem > 0 && x.umi === x.celkem; },
}));

export const ODZNAKY = [...zakladni, ...mistr];

// Vrátí nově získané odznaky a zapíše je. kontext = { perfekt, hodina }
export function zkontroluj(p, kontext = {}) {
  const nove = ODZNAKY.filter(o => !p.odznaky[o.id] && o.test(p, kontext));
  nove.forEach(o => { p.odznaky[o.id] = dnes(); });
  return nove;
}
