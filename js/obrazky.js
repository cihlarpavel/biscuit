// Malované ilustrace (ilustrace/*.webp). Které existují, říká ilustrace/seznam.json – generuje ho
// tools/ilustrace.py, který obrázky zároveň zmenší pro telefon. Bez obrázku se použije kreslená ikona.
let dostupne = new Set();
export async function nactiSeznam() {
  try { const r = await fetch('ilustrace/seznam.json', { cache: 'no-cache' }); if (r.ok) dostupne = new Set(await r.json()); } catch { /* offline nebo bez ilustrací */ }
}
export const ma = nazev => dostupne.has(nazev);
export const obr = (nazev, px, trida = '') => `<img class="ilu ${trida}" src="ilustrace/${nazev}.webp" width="${px}" height="${px}" alt="" draggable="false">`;
