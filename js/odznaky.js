// Odznaky. Kontrolují se po každé lekci a battlu, nový odznak se ukáže na konci.
import { serie, celkemSekund, umiSlov, dnes } from './store.js';
import { BALICKY } from './data.js';
import { postupBalicku } from './lekce.js';

const zakladni = [
  { id: 'prvni', ik: 'o-prvni', nazev: 'První lekce', popis: 'Začátek je za tebou.', test: p => Object.values(p.dny).some(d => d.lekce > 0) },
  { id: 'perfekt', ik: 'o-perfekt', nazev: 'Bez chyby', popis: 'Celá lekce bez jediné chyby.', test: (p, k) => k?.perfekt },
  { id: 'serie3', ik: 'ohen', nazev: '3 dny v kuse', popis: 'Denní cíl tři dny za sebou.', test: p => serie(p) >= 3 },
  { id: 'serie7', ik: 'ohen', nazev: 'Týden v kuse', popis: 'Sedm dní za sebou. Respekt.', test: p => serie(p) >= 7 },
  { id: 'serie14', ik: 'o-kometa', nazev: '14 dní v kuse', popis: 'Dva týdny. Nic tě nezastaví.', test: p => serie(p) >= 14 },
  { id: 'serie30', ik: 'o-sopka', nazev: 'Měsíc v kuse', popis: 'Třicet dní. Legenda.', test: p => serie(p) >= 30 },
  { id: 'slov25', ik: 'o-kniha', nazev: '25 slovíček', popis: 'Umíš 25 slovíček a vět.', test: p => umiSlov(p) >= 25 },
  { id: 'slov100', ik: 'o-knihy', nazev: '100 slovíček', popis: 'Stovka. To už je slovník.', test: p => umiSlov(p) >= 100 },
  { id: 'slov250', ik: 'o-mozek', nazev: '250 slovíček', popis: 'Mozek level: [angličtinář|angličtinářka].', test: p => umiSlov(p) >= 250 },
  { id: 'hodina', ik: 'o-stopky', nazev: 'První hodina', popis: 'Hodina čistého učení.', test: p => celkemSekund(p) >= 3600 },
  { id: 'hodin5', ik: 'o-presypaci', nazev: '5 hodin', popis: 'Pět hodin. Fakt hodně.', test: p => celkemSekund(p) >= 5 * 3600 },
  { id: 'susenky100', ik: 'susenka', nazev: '100 sušenek', popis: 'Nasbíráno celkem. Plná krabice.', test: p => Math.max(p.susenkyCelkem || 0, p.susenky) >= 100 },
  { id: 'susenky500', ik: 'zebricek', nazev: '500 sušenek', popis: 'Celá pekárna.', test: p => Math.max(p.susenkyCelkem || 0, p.susenky) >= 500 },
  { id: 'battle1', ik: 'tab-battle', nazev: 'První výhra v battlu', popis: 'První vyhraný battle.', test: p => p.souboje.vyhry >= 1 },
  { id: 'battle5', ik: 'o-rukavice', nazev: '5 výher v battlu', popis: 'Nikdo s tebou nechce hrát.', test: p => p.souboje.vyhry >= 5 },
  { id: 'nocni', ik: 'o-sova', nazev: 'Noční sova', popis: 'Učení po osmé večer.', test: (p, k) => k?.hodina >= 20 },
  { id: 'ranni', ik: 'o-svitani', nazev: 'Ranní ptáče', popis: 'Učení před sedmou ráno.', test: (p, k) => k?.hodina < 7 },
];

// Mistrovský odznak za každý balíček (všechna slovíčka umí).
const mistr = BALICKY.map(b => ({
  id: 'mistr-' + b.id, ik: b.id, ikona: b.ikona, nazev: 'Mistr: ' + b.nazev, popis: 'Celý balíček umíš.',
  test: p => { const x = postupBalicku(p, b); return x.celkem > 0 && x.umi === x.celkem; },
}));

export const ODZNAKY = [...zakladni, ...mistr];

// Vrátí nově získané odznaky a zapíše je. kontext = { perfekt, hodina }
export function zkontroluj(p, kontext = {}) {
  const nove = ODZNAKY.filter(o => !p.odznaky[o.id] && o.test(p, kontext));
  nove.forEach(o => { p.odznaky[o.id] = dnes(); });
  return nove;
}
