// Sušenkový tenis (pong): každý má pálku dole, sušenka se odráží od zdí vlevo a vpravo. Do 5 bodů.
// Online: o chycení na své straně rozhoduje každý telefon sám a pošle „odpal“ (stav míčku) soupeři,
// ten ho pustí od své horní čáry. Když míček u soupeře dojde k jeho čáře dřív, než přijde odpověď, chvilku počká.
// Trénink: soupeř je počítač (pálka s omezenou rychlostí).
//
// Globální souřadnice: x 0..1 zleva, y 0..1 shora; hráč „a“ (zakladatel) dole, „b“ nahoře.
// Hráč „b“ vidí hřiště otočené o 180°, aby měl svou pálku taky dole.
import { obrazovka, esc, $, toast, konfety } from './ui.js';
import { zvukSpravne, zvukSpatne, zvukFanfara } from './speech.js';
import * as O from './online.js';

const DO_BODU = 5, PALKA = 0.26, CARA = 0.06, POMER = 1.45; // výška hřiště = šířka × POMER
const RYCHLOST = 0.62, ZRYCHLENI = 1.06, MAX_RYCHLOST = 1.35; // svisle, výšek hřiště za sekundu

export function hrajTenis({ trenink = false, b = null, ja = 'a', mojeId, souperId, souperJmeno = 'Počítač', konec }) {
  const souper = ja === 'a' ? 'b' : 'a';
  // stav (globální): { seq, x, y, vx, vy, od, skore: {a, b}, podava, faze: 'ceka'|'podani'|'hra'|'konec', vitez }
  let stav = trenink ? { seq: 1, x: .5, y: 1 - CARA, vx: 0, vy: 0, od: null, skore: { a: 0, b: 0 }, podava: 'a', faze: 'podani' } : (b?.tenis || null);
  let t0 = performance.now(), mojePalka = .5, aiPalka = .5, bezi = true, cekaNaOdpoved = false;
  let souperVidet = 0, posledniPing = null, podaniZa = 1.2, souperPalka = .5;

  obrazovka(`<section id="hra" class="hra tenis">
    <div class="hra-hlava"><button class="zavrit" id="tn-zavrit" aria-label="Ukončit">✕</button>
      <div class="tn-nadpis">Sušenkový tenis <small>${trenink ? 'trénink' : `vs ${esc(souperJmeno)}`}</small></div></div>
    <canvas id="tn-platno"></canvas>
    <p class="tn-pokyn">Posouvej pálku prstem. Kdo pustí sušenku za sebe, dává bod soupeři. Hraje se do ${DO_BODU}.</p>
  </section>`, { bezListy: true });
  const platno = $('#tn-platno'), g = platno.getContext('2d');
  const dpr = Math.min(3, devicePixelRatio || 1);
  let W = 0, H = 0;
  const velikost = () => {
    const r = platno.getBoundingClientRect();
    W = r.width; H = W * POMER;
    platno.style.height = H + 'px';
    platno.width = W * dpr; platno.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  velikost();
  addEventListener('resize', velikost);
  const tah = e => { const r = platno.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; mojePalka = Math.max(PALKA / 2, Math.min(1 - PALKA / 2, (t.clientX - r.left) / r.width)); };
  platno.addEventListener('pointerdown', tah); platno.addEventListener('pointermove', tah);
  platno.addEventListener('touchmove', e => { e.preventDefault(); tah(e); }, { passive: false });

  // převod mezi globálními a mými souřadnicemi (pro „b“ otočeno)
  const lx = x => (ja === 'a' ? x : 1 - x), ly = y => (ja === 'a' ? y : 1 - y);
  const mojeCaraY = ja === 'a' ? 1 - CARA : CARA, souperCaraY = ja === 'a' ? CARA : 1 - CARA;

  // poloha míčku teď (globálně), s odrazy od bočních zdí
  const poloha = () => {
    const dt = (performance.now() - t0) / 1000;
    let x = stav.x + stav.vx * dt / POMER; const y = stav.y + stav.vy * dt;
    x = ((x % 2) + 2) % 2; if (x > 1) x = 2 - x;
    return { x, y };
  };

  const odesli = async (novy, vysledky = null) => {
    stav = novy; t0 = performance.now();
    if (trenink) return;
    try { await O.zapisTenis(b.id, novy, vysledky); } catch { toast('Spojení zakolísalo…'); }
  };

  // odpal od čáry hráče h (globálně) – úhel podle místa na pálce
  const odpal = (h, x, palka) => {
    const posun = Math.max(-1, Math.min(1, (x - palka) / (PALKA / 2)));
    const v = Math.min(MAX_RYCHLOST, Math.abs(stav.vy || RYCHLOST) * (stav.od ? ZRYCHLENI : 1));
    return { ...stav, seq: stav.seq + 1, x, y: h === 'a' ? 1 - CARA : CARA, vx: posun * v * 1.1, vy: h === 'a' ? -v : v, od: h, faze: 'hra' };
  };

  const bod = (pro) => {
    const skore = { ...stav.skore, [pro]: stav.skore[pro] + 1 };
    const konecHry = skore[pro] >= DO_BODU;
    const novy = { ...stav, seq: stav.seq + 1, skore, podava: pro === 'a' ? 'b' : 'a', faze: konecHry ? 'konec' : 'podani', vitez: konecHry ? pro : null, vx: 0, vy: 0, od: null };
    novy.x = .5; novy.y = novy.podava === 'a' ? 1 - CARA : CARA;
    (pro === ja ? zvukSpravne : zvukSpatne)();
    podaniZa = 1.2;
    const vysl = konecHry && !trenink ? { [mojeId]: { body: skore[ja], hotovo: true, odpovezeno: 1, spravne: 0 }, [souperId]: { body: skore[souper], hotovo: true, odpovezeno: 1, spravne: 0 } } : null;
    odesli(novy, vysl);
  };

  function krok() {
    if (!bezi) return;
    const dt = 1 / 60;
    if (trenink) { const cil = stav.faze === 'hra' && stav.vy < 0 ? poloha().x : .5; aiPalka += Math.max(-0.75 * dt, Math.min(0.75 * dt, cil - aiPalka)); }
    if (stav?.faze === 'podani' && stav.podava === ja) {
      podaniZa -= dt;
      if (podaniZa <= 0) odesli({ ...odpal(ja, lx(mojePalka), lx(mojePalka)), vx: (Math.random() - .5) * .6, vy: (ja === 'a' ? -1 : 1) * RYCHLOST });
    } else if (stav?.faze === 'podani' && trenink && stav.podava === 'b') {
      podaniZa -= dt;
      if (podaniZa <= 0) odesli({ ...odpal('b', aiPalka, aiPalka), vx: (Math.random() - .5) * .6, vy: RYCHLOST });
    }
    if (stav?.faze === 'hra') {
      const p = poloha();
      const kMne = (ja === 'a' && stav.vy > 0) || (ja === 'b' && stav.vy < 0);
      if (kMne && (ja === 'a' ? p.y >= mojeCaraY : p.y <= mojeCaraY)) {
        const palka = lx(mojePalka); // v globálních souřadnicích
        if (Math.abs(p.x - palka) <= PALKA / 2 + .03) { zvukSpravne(); odesli(odpal(ja, p.x, palka)); }
        else bod(souper);
      } else if (!kMne && (ja === 'a' ? p.y <= souperCaraY : p.y >= souperCaraY)) {
        if (trenink) {
          if (Math.abs(p.x - aiPalka) <= PALKA / 2 + .02) odesli(odpal('b', p.x, aiPalka)); else bod('a');
        } else cekaNaOdpoved = true; // míček počká u soupeřovy čáry, než přijde jeho odpal
      }
    }
    kresli();
    requestAnimationFrame(krok);
  }

  function kresli() {
    g.clearRect(0, 0, W, H);
    // hřiště
    g.fillStyle = '#e9f6ff'; g.fillRect(0, 0, W, H);
    g.strokeStyle = '#b9d6ff'; g.lineWidth = 3; g.setLineDash([10, 10]); g.beginPath(); g.moveTo(0, H / 2); g.lineTo(W, H / 2); g.stroke(); g.setLineDash([]);
    g.strokeStyle = '#3b2a3f'; g.lineWidth = 4; g.strokeRect(2, 2, W - 4, H - 4);
    // skóre
    if (stav) {
      g.fillStyle = 'rgba(59,42,63,.18)'; g.font = `800 ${W * .2}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(stav.skore[souper], W / 2, H * .3); g.fillText(stav.skore[ja], W / 2, H * .7);
    }
    // pálky (moje dole)
    const palka = (x, y, barva) => { g.fillStyle = barva; g.strokeStyle = '#3b2a3f'; g.lineWidth = 2.5; g.beginPath(); g.roundRect ? g.roundRect((x - PALKA / 2) * W, y * H - 7, PALKA * W, 14, 7) : g.rect((x - PALKA / 2) * W, y * H - 7, PALKA * W, 14); g.fill(); g.stroke(); };
    // online: soupeřova pálka tam, kde naposledy odpálil (polohu jeho prstu průběžně neposíláme)
    const souperX = trenink ? lx(aiPalka) : lx(stav?.od === souper ? stav.x : souperPalka);
    palka(souperX, CARA, '#b494f0');
    palka(mojePalka, 1 - CARA, '#ff6fae');
    // míček = sušenka
    if (stav && stav.faze !== 'ceka' && stav.faze !== 'konec') {
      let p = stav.faze === 'hra' ? poloha() : { x: stav.x, y: stav.y };
      if (stav.faze === 'podani' && stav.podava === ja) p = { x: lx(mojePalka), y: mojeCaraY };
      if (cekaNaOdpoved) p = { x: p.x, y: souperCaraY };
      const X = lx(p.x) * W, Y = (ly(p.y) + (ly(p.y) > .5 ? -1 : 1) * .022) * H, r = W * .045;
      g.fillStyle = '#e6a65d'; g.strokeStyle = '#3b2a3f'; g.lineWidth = 2.4; g.beginPath(); g.arc(X, Y, r, 0, Math.PI * 2); g.fill(); g.stroke();
      g.fillStyle = '#5b3424'; for (const [a, d] of [[0, .45], [2.1, .5], [4.2, .45], [1, .1]]) { g.beginPath(); g.arc(X + Math.cos(a) * r * d, Y + Math.sin(a) * r * d, r * .16, 0, Math.PI * 2); g.fill(); }
    }
    // nápisy
    g.fillStyle = '#3b2a3f'; g.font = '800 18px system-ui'; g.textAlign = 'center';
    if (!stav || stav.faze === 'ceka') g.fillText(`Čeká se na ${souperJmeno}…`, W / 2, H / 2 - 24);
    else if (stav.faze === 'podani') g.fillText(stav.podava === ja ? 'Podáváš ty…' : `Podává ${souperJmeno}…`, W / 2, H / 2 - 24);
  }

  // ---- online: zprávy, přítomnost ----
  let stopSled = () => {}, pingy = null;
  if (!trenink) {
    stopSled = O.sledujBattle(b.id, nb => {
      const p = nb.vysledky?.['tenisPing_' + souper];
      if (p && p !== posledniPing) { posledniPing = p; souperVidet = performance.now(); }
      const novy = nb.tenis;
      if (novy && (!stav || novy.seq > stav.seq)) {
        stav = novy; t0 = performance.now(); cekaNaOdpoved = false; podaniZa = 1.2;
        if (novy.od === souper) { zvukSpravne(); souperPalka = novy.x; }
      }
      if (stav?.faze === 'konec') dohrano();
      // zakladatel začne, jakmile je soupeř u stolu
      if (ja === 'a' && (!stav || stav.faze === 'ceka') && performance.now() - souperVidet < 8000 && souperVidet) {
        odesli({ seq: (stav?.seq || 0) + 1, x: .5, y: 1 - CARA, vx: 0, vy: 0, od: null, skore: { a: 0, b: 0 }, podava: 'a', faze: 'podani' });
      }
    });
    const ping = () => O.zapisTenisPing(b.id, ja).catch(() => {});
    ping(); pingy = setInterval(ping, 3000);
  }

  let skoncila = false;
  function dohrano() {
    if (skoncila) return; skoncila = true;
    bezi = false; stopSled(); clearInterval(pingy); removeEventListener('resize', velikost);
    const vyhra = stav.vitez === ja;
    if (vyhra) { konfety(); zvukFanfara(); }
    konec({ ja: stav.skore[ja], souper: stav.skore[souper], vyhra });
  }
  $('#tn-zavrit').onclick = () => {
    if (!confirm(trenink ? 'Ukončit trénink?' : 'Odejít ze hry? Soupeř tím vyhraje.')) return;
    if (trenink) { stav = { ...stav, faze: 'konec', vitez: 'b' }; return dohrano(); }
    const skore = { ...stav?.skore || { a: 0, b: 0 }, [souper]: DO_BODU };
    odesli({ ...(stav || {}), seq: (stav?.seq || 0) + 1, skore, faze: 'konec', vitez: souper },
      { [mojeId]: { body: skore[ja] || 0, hotovo: true, odpovezeno: 1, spravne: 0 }, [souperId]: { body: DO_BODU, hotovo: true, odpovezeno: 1, spravne: 0 } });
    dohrano();
  };
  // v tréninku hlídat konec
  const hlidac = setInterval(() => { if (stav?.faze === 'konec') { clearInterval(hlidac); dohrano(); } }, 200);
  requestAnimationFrame(krok);
  return () => { bezi = false; stopSled(); clearInterval(pingy); clearInterval(hlidac); };
}
