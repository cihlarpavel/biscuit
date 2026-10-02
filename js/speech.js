// Předčítání britskou angličtinou hlasem iPhonu (zdarma, offline) a krátké zvuky odpovědí.
// ElevenLabs z italské aplikace se dá doplnit později, rozhraní speak() zůstane stejné.

const synth = window.speechSynthesis;
let hlasy = [];
// Hlas: přednostně ženský britský (Pavel 3. 10. 2026), mezi nimi kvalitnější. Rodič může v Pro rodiče vybrat
// konkrétní hlas – uloží se jen v tomhle telefonu (localStorage „biscuit-hlas“).
// Jen kvalitní ženské hlasy; robotické Flo/Sandy/Shelley (Eloquence) se automaticky nevybírají – výslovnost.
const ZENSKE = /martha|kate|serena|stephanie|catherine/i;
const ULOZENY = 'biscuit-hlas';
const nactiHlasy = () => {
  hlasy = synth ? synth.getVoices().filter(v => v.lang.replace('_', '-') === 'en-GB') : [];
  const skore = v => (ZENSKE.test(v.name) ? 10 : 0) + (/premium|prémiov/i.test(v.name) ? 4 : 0) + (/enhanced|vylepšen/i.test(v.name) ? 2 : 0);
  hlasy.sort((a, b) => skore(b) - skore(a));
};
const ulozeny = () => { try { return localStorage.getItem(ULOZENY); } catch { return null; } };
export const seznamHlasu = () => hlasy.map(v => v.name);
export const zvolenyHlas = () => (hlasy.find(v => v.name === ulozeny()) || hlasy[0])?.name || '';
export function nastavHlas(jmeno) { try { localStorage.setItem(ULOZENY, jmeno); } catch { /* jen pro tuto chvíli */ } }
export const priHlasech = fn => synth?.addEventListener?.('voiceschanged', fn);
if (synth) { nactiHlasy(); synth.addEventListener?.('voiceschanged', nactiHlasy); }

const posluchaci = new Set();
export const priMluveni = fn => posluchaci.add(fn);

export function speak(text, { pomalu = false } = {}) {
  return new Promise(resolve => {
    if (!synth || !text) return resolve();
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    const h = hlasy.find(v => v.name === ulozeny()) || hlasy[0];
    if (h) u.voice = h;
    u.rate = pomalu ? 0.32 : 0.85; // želva: hodně pomalu
    u.onstart = () => posluchaci.forEach(f => f());
    u.onend = u.onerror = () => resolve();
    synth.speak(u);
  });
}

// iOS pustí zvuk až po prvním dotyku – volá se z prvního klepnutí.
let odemceno = false;
let ctx = null;
export function odemkni() {
  if (odemceno) return;
  odemceno = true;
  if (synth) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; synth.speak(u); }
  try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { /* bez zvuků */ }
}

function ton(frekvence, start, delka, typ = 'sine', hlasitost = 0.15) {
  if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = typ;
  o.frequency.value = frekvence;
  g.gain.setValueAtTime(hlasitost, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + delka);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + delka);
}
export const zvukSpravne = () => { ton(660, 0, 0.12); ton(990, 0.09, 0.2); };
export const zvukSpatne = () => { ton(220, 0, 0.25, 'triangle', 0.12); };
export const zvukFanfara = () => [523, 659, 784, 1047].forEach((f, i) => ton(f, i * 0.11, 0.3));
