// Měření aktivního času. Počítá se jen učení: obrazovka lekce musí být otevřená, aplikace
// v popředí a dítě musí v posledních 45 s na něco klepnout (nebo právě poslouchat hlas).
// Jinak by stačilo nechat aplikaci ležet otevřenou.
import { profil, den, uloz } from './store.js';
import { priMluveni } from './speech.js';

const NECINNOST_MS = 45_000;
let posledni = Date.now();
let uci = false;
let neulozeno = 0;
const posluchaci = new Set();

export const priTiku = fn => { posluchaci.add(fn); return () => posluchaci.delete(fn); };
export const aktivita = () => { posledni = Date.now(); };
export function nastavUceni(ano) { uci = ano; aktivita(); }

['pointerdown', 'keydown', 'touchstart'].forEach(t => addEventListener(t, aktivita, { passive: true }));
priMluveni(aktivita);

setInterval(() => {
  const p = profil();
  if (!p || !uci || document.visibilityState !== 'visible' || Date.now() - posledni > NECINNOST_MS) return;
  den(p).s += 1;
  if (++neulozeno >= 5) { neulozeno = 0; uloz(); }
  posluchaci.forEach(f => f(p));
}, 1000);

document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') uloz(); });
