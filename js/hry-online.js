// Obrazovky online her s kamarádem: Double (závod na stejných kartách) a Dáma (na tahy, živě i na později).
// Kvízový battle je v app.js / hra.js. Stav obou her je v dokumentu battlu (viz online.js).
import { obrazovka, esc, $, $$, toast, konfety } from './ui.js';
import { speak, zvukSpravne, zvukSpatne, zvukFanfara } from './speech.js';
import * as O from './online.js';
import * as D from './dama.js';
import { spolecny } from './double.js';
import { postavicka } from './postavicka.js';
import { rod } from './hlasky.js';

// ================= Double =================
const DOUBLE_S = 60, TREST_MS = 1500;
const SLOTY = [[50, 50], [50, 16], [82, 38], [71, 78], [29, 78], [18, 38]]; // střed a kolem, v % karty

function symbol(slova, [s, podoba], i, kde) {
  const w = slova[s];
  const rot = ((s * 37 + i * 53) % 50) - 25;
  const [x, y] = SLOTY[i];
  const obsah = podoba === 'o' ? `<span class="dbl-obr">${w.obr}</span>`
    : podoba === 'e' ? `<span class="dbl-slovo">${esc(w.en)}</span>` : `<span class="dbl-slovo cz">${esc(w.cz)}</span>`;
  return `<button class="dbl-symbol" data-s="${s}" data-kde="${kde}" style="left:${x}%;top:${y}%;--r:${rot}deg">${obsah}</button>`;
}

// konec(body, spravne) – zavolá se po vypršení času nebo zavření.
export function hrajDouble({ data, souperJmeno, konec }) {
  const { slova, kola } = data;
  let kolo = 0, body = 0, chyby = 0, zbyva = DOUBLE_S, zamceno = false, skoncila = false;
  const start = Date.now();
  const hotovo = () => { if (skoncila) return; skoncila = true; clearInterval(stopky); konec(body, chyby); };
  const vykresli = () => {
    const k = kola[kolo % kola.length];
    obrazovka(`<section id="hra" class="hra double">
      <div class="hra-hlava"><button class="zavrit" id="dbl-zavrit" aria-label="Ukončit">✕</button>
        <div class="dbl-nadpis">Double <small>vs ${esc(souperJmeno)}</small></div>
        <span class="dbl-cas" id="dbl-cas">${zbyva} s</span><span class="dbl-body">⚡ ${body}</span></div>
      <div class="dbl-karta horni">${k.a.map((y, i) => symbol(slova, y, i, 'a')).join('')}</div>
      <p class="dbl-pokyn">Co mají karty společné? Klepni na to <b>ve své kartě dole</b>.</p>
      <div class="dbl-karta dolni" id="dbl-moje">${k.b.map((y, i) => symbol(slova, y, i, 'b')).join('')}</div>
    </section>`, { bezListy: true });
    $('#dbl-zavrit').onclick = () => { if (confirm('Ukončit hru? Počítají se body, které máš.')) hotovo(); };
    $$('.dbl-symbol[data-kde="b"]').forEach(b => (b.onclick = () => {
      if (zamceno || skoncila) return;
      const s = +b.dataset.s;
      if (s === spolecny(k)) {
        body++; zvukSpravne(); speak(slova[s].en);
        $$(`.dbl-symbol[data-s="${s}"]`).forEach(e => e.classList.add('trefa'));
        zamceno = true;
        setTimeout(() => { zamceno = false; kolo++; if (!skoncila) vykresli(); }, 550);
      } else {
        chyby++; zvukSpatne(); zamceno = true;
        b.classList.add('vedle'); $('#dbl-moje').classList.add('trest');
        setTimeout(() => { zamceno = false; b.classList.remove('vedle'); $('#dbl-moje')?.classList.remove('trest'); }, TREST_MS);
      }
    }));
  };
  const stopky = setInterval(() => {
    zbyva = Math.max(0, DOUBLE_S - Math.floor((Date.now() - start) / 1000));
    const el = $('#dbl-cas'); if (el) { el.textContent = zbyva + ' s'; el.classList.toggle('dochazi', zbyva <= 10); }
    if (!zbyva) hotovo();
  }, 250);
  vykresli();
}

// ================= Dáma =================
const BEZ_BRANI_REMIZA = 50; // tolik tahů bez sebrání = remíza (aby dvě dámy nehonily věčně)

// Kámen = sušenka; dáma = větší sušenka se zlatým okrajem a zlatou korunkou uprostřed.
const kamen = (k) => {
  const svetly = k.toLowerCase() === 'a', dama = k === k.toUpperCase();
  const [tl, cips] = svetly ? ['#f3cf8e', '#8a5a3c'] : ['#7a4a2e', '#fff4e0'];
  if (!dama) return `<svg viewBox="0 0 40 40" class="dm-kamen"><circle cx="20" cy="20" r="15" fill="${tl}" stroke="#1f1a24" stroke-width="2.4"/>
    ${[[-6, -4], [5, -6], [0, 5], [7, 4], [-7, 6]].map(([x, y]) => `<circle cx="${20 + x}" cy="${20 + y}" r="2" fill="${cips}"/>`).join('')}</svg>`;
  return `<svg viewBox="0 0 40 40" class="dm-kamen dama">
    <circle cx="20" cy="20" r="18.5" fill="#ffd34d" stroke="#1f1a24" stroke-width="2"/>
    <circle cx="20" cy="20" r="14.5" fill="${tl}" stroke="#b8860b" stroke-width="1.6"/>
    ${[[-8, 6], [8, 7], [-9, -3], [9, -4]].map(([x, y]) => `<circle cx="${20 + x}" cy="${20 + y}" r="1.8" fill="${cips}"/>`).join('')}
    <path d="M11.5 23 L13 14 L17 18.5 L20 11.5 L23 18.5 L27 14 L28.5 23 Z" fill="#ffd34d" stroke="#1f1a24" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="20" cy="11.2" r="1.5" fill="#e8352b"/><path d="M14 20.5 h12" stroke="#e0a800" stroke-width="1.2"/></svg>`;
};

// ja = 'a' | 'b'; b = battle; vlastni/soupeř = profily pro avatary; konecHry() = odchod zpět.
export function hrajDamu({ b, ja, mojeId, souperId, ja_profil, souper, zpet }) {
  let stav = b.dama || { d: D.novaDeska(), t: 'a', p: -1, n: 0, bez: 0, v: null };
  let vybrany = -1, odesila = false;
  const naTahu = () => stav.t === ja && !stav.v;
  const poradi = ja === 'a' ? [...Array(64).keys()] : [...Array(64).keys()].reverse();

  const zapis = async (novy, vitez) => {
    odesila = true;
    let konec = null;
    if (vitez) {
      const body = h => (vitez === 'remiza' ? 1 : vitez === h ? 1 : 0);
      konec = { [mojeId]: { body: body(ja), hotovo: true, odpovezeno: 1, spravne: 0 }, [souperId]: { body: body(D.souper(ja)), hotovo: true, odpovezeno: 1, spravne: 0 } };
    }
    try { await O.zapisDamu(b.id, novy, konec); stav = novy; }
    catch { toast('Tah se neodeslal. Jsi online?'); }
    odesila = false;
    vykresli();
  };

  const tahni = tah => {
    const v = D.proved(stav.d, tah, ja);
    const novy = { d: v.deska, t: v.pokracuj >= 0 ? ja : D.souper(ja), p: v.pokracuj, n: stav.n + 1, bez: tah.sebrany >= 0 ? 0 : (stav.bez || 0) + 1, v: null, z: [tah.z, tah.na] };
    let vitez = null;
    if (v.pokracuj < 0 && D.prohral(novy.d, D.souper(ja))) vitez = ja;
    else if (novy.bez >= BEZ_BRANI_REMIZA) vitez = 'remiza';
    novy.v = vitez;
    vybrany = v.pokracuj;
    stav = novy; vykresli();
    if (tah.sebrany >= 0) zvukSpravne();
    if (vitez === ja) { konfety(); zvukFanfara(); }
    zapis(novy, vitez);
  };

  let prvni = true;
  function vykresli() {
    if (!prvni && !document.querySelector('.dama-hra')) return; // mezitím odešla jinam
    prvni = false;
    const legal = naTahu() ? D.tahy(stav.d, ja, stav.p) : [];
    if (stav.p >= 0 && naTahu()) vybrany = stav.p;
    const zVybraneho = legal.filter(t => t.z === vybrany);
    const muzou = new Set(legal.map(t => t.z));
    const povinne = legal.some(t => t.sebrany >= 0);
    const titulek = stav.v ? (stav.v === 'remiza' ? 'Remíza 🤝' : stav.v === ja ? 'Vyhráno! 👑' : `${esc(souper.prezdivka)} ${rod('[vyhrál|vyhrála]', souper)} 🍪`)
      : naTahu() ? (stav.p >= 0 ? 'Skákej dál!' : povinne ? 'Jsi na tahu – musíš skákat!' : 'Jsi na tahu') : `Na tahu je ${esc(souper.prezdivka)}`;
    obrazovka(`<section class="stranka dama-hra">
      <a class="zpet-btn" href="#/battle">‹ Battle</a>
      <div class="dm-hrac">${postavicka(souper.vzhled, 44, 'hlava', false)}<b>${esc(souper.prezdivka)}</b><span>${D.pocet(stav.d, D.souper(ja))} ${kamen(D.souper(ja))}</span></div>
      <div class="dm-deska">${poradi.map(i => {
        const r = Math.floor(i / 8), c = i % 8, tmave = (r + c) % 2 === 1, k = stav.d[i];
        const cil = zVybraneho.find(t => t.na === i);
        const cls = ['dm-pole', tmave ? 'tmave' : 'svetle', i === vybrany ? 'vybrane' : '', cil ? 'cil' : '', povinne && muzou.has(i) && vybrany < 0 ? 'musi' : '',
          stav.z && stav.z.includes(i) ? 'posledni' : ''].join(' ');
        return `<button class="${cls}" data-i="${i}">${k !== '.' ? kamen(k) : ''}</button>`;
      }).join('')}</div>
      <div class="dm-hrac ja">${postavicka(ja_profil.vzhled, 44, 'hlava', false)}<b>Ty</b><span>${D.pocet(stav.d, ja)} ${kamen(ja)}</span></div>
      <p class="dm-stav${naTahu() ? ' tah' : ''}">${titulek}</p>
      ${stav.v ? '<a class="btn velke" href="#/battle">Hotovo</a>' : `<p class="drobne">Kameny jdou o jedno pole šikmo dopředu. Kdo dojde na druhou stranu, má dámu 👑 – ta jezdí šikmo libovolně daleko. Skákat se musí.</p>
        <button class="odkaz" id="dm-vzdat">Vzdát hru</button>`}
    </section>`, { bezListy: true });
    $$('.dm-pole').forEach(el => (el.onclick = () => {
      if (!naTahu() || odesila) return;
      const i = +el.dataset.i;
      const tah = zVybraneho.find(t => t.na === i);
      if (tah) return tahni(tah);
      if (stav.p >= 0) return; // při řetězení skoků nejde vybrat jiný kámen
      if (muzou.has(i)) { vybrany = i; vykresli(); }
      else if (stav.d[i] !== '.' && stav.d[i].toLowerCase() === ja) { toast(povinne ? 'Musíš skákat – zkus kámen, který bliká.' : 'Tímhle teď nejde táhnout.'); }
    }));
    $('#dm-vzdat')?.addEventListener('click', () => {
      if (!confirm('Opravdu vzdát? Vyhraje soupeř.')) return;
      const novy = { ...stav, v: D.souper(ja) };
      stav = novy; zapis(novy, D.souper(ja));
    });
  }

  vykresli();
  const stop = O.sledujBattle(b.id, nb => {
    if (!nb.dama || odesila) return;
    const prisel = nb.dama;
    if (prisel.n > stav.n || (prisel.v && !stav.v)) {
      const mujTah = prisel.t === ja && stav.t !== ja;
      stav = prisel; vybrany = -1;
      if (document.querySelector('.dama-hra')) { vykresli(); if (mujTah && !stav.v) zvukSpravne(); }
    }
  });
  return stop;
}
