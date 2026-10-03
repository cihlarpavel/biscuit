// Biscuit – obrazovky a navigace.
import * as S from './store.js';
import { SKUPINY, BALICKY, balicek, polozky } from './data.js';
import { postavicka, KATEGORIE, VECI, vec, maVec, nahodnyVzhled, vzacnost, noveSeminko, STARE_CENY } from './postavicka.js';
import { hrajDouble, hrajDamu } from './hry-online.js';
import { sestavDouble } from './double.js';
import { sestav, sestavExtra, sestavBattle, odemcene, zapis, postupBalicku, slabiny, UMI } from './lekce.js';
import { hraj, nastavSoupere } from './hra.js';
import * as O from './online.js';
import * as HRA from './hra-susenky.js';
import { nastavUceni } from './cas.js';
import { odemkni, speak, zvukFanfara, zvukSpatne, seznamHlasu, zvolenyHlas, nastavHlas, priHlasech } from './speech.js';
import { ODZNAKY, zkontroluj } from './odznaky.js';
import { maskot } from './maskot.js';
import { nastavSvet, nasbirano, scena } from './svety.js';
import * as H from './hlasky.js';
import { obrazovka, esc, $, $$, kolecko, minuty, toast, konfety, zpet } from './ui.js';
import { ik, maIkonu, barvaIkony } from './ikony.js';
import { nactiSeznam, ma as maIlustraci } from './obrazky.js';

await nactiSeznam();

addEventListener('pointerdown', odemkni, { once: true });
$$('#tabs a[data-ik]').forEach(a => (a.querySelector('span').innerHTML = ik(a.dataset.ik, a.classList.contains('stred') ? 52 : 40)));
// Drip shop uprostřed lišty ukazuje aktuální vytuněnou postavičku (překreslí se při změně obrazovky a po nákupu).
const tabJa = () => { const x = p(); $('#tabs .stred span').innerHTML = x ? postavicka(x.vzhled, 58, 'hlava', true) : ik('tab-drip', 52); };
const ikBalicku = (b, px = 40) => maIkonu(b.id) ? ik(b.id, px) : b.ikona;
const ikOdznaku = (o, px = 40) => o.ik && maIkonu(o.ik) ? ik(o.ik, px) : (o.ikona || '');
const ikS = (n, px = 22) => ik(n, px, { podklad: false }); // malá ikona do textu

const p = () => S.profil();
const jmeno = x => esc(x.prezdivka);
// Malá postavička (hlava) do seznamů, velká celá na profil.
const av = (x, px = 42) => postavicka(x.vzhled, px, 'hlava');

// ---------- Navigace ----------
const TRASY = {
  '': domu, novy, hra: hraZaOdmenu, balicek: detailBalicku, lekce: spustLekci, battle, zebricek, ja, obchod, rodic,
};
function route() {
  nastavUceni(false);
  setTimeout(ukazVysledek, 400);
  // Jeden telefon = jeden profil. Kdyby jich tu bylo víc (starší verze), použije se aktivní, jinak první.
  if (!p() && S.profily().length) S.prepni(S.profily()[0].id);
  tabJa();
  const x0 = p();
  // Semínko pro losování pozadí avatara (nastaví se jednou, odejde i kamarádkám online).
  if (x0 && !x0.vzhled.seminko) { x0.vzhled.seminko = noveSeminko(); S.uloz(); }
  if (x0 && x0.vzhled.verze !== 2) prevedNaSusenku(x0);
  // Perník byl do 3. 10. zdarma – kdo ho nosí, dostane ho jako koupený.
  if (x0 && x0.vzhled.kuze === 't-pernik' && !x0.koupeno.includes('t-pernik')) { x0.koupeno.push('t-pernik'); S.uloz(); }
  // Denní cíl je 20 min (Pavel 3. 10. 2026) – kdo měl starších 10 nebo 15, dostane jednou 20.
  if (x0 && !x0.nastaveni.cil20) { if ([10, 15].includes(x0.nastaveni.cil)) x0.nastaveni.cil = 20; x0.nastaveni.cil20 = true; S.uloz(); }
  // Holka/kluk se kreslí z vzhled.rod (řasy, tvářičky) – vzhled odchází i kamarádkám online.
  if (x0 && x0.rod && x0.vzhled.rod !== x0.rod) { x0.vzhled.rod = x0.rod; S.uloz(); }
  // Zasněné oči (koukají nahoru) byly první den zdarma a losovaly se – kdo si je nekoupil, kouká zase na tebe.
  if (x0 && x0.vzhled.oci === 'o-nahoru' && !x0.koupeno.includes('o-nahoru')) { x0.vzhled.oci = 'o-koukaci'; S.uloz(); }
  nastavSvet(x0);
  nastavNoc();
  if (x0 && !x0.rod) return otazkaRod(x0);
  spustOnline();
  zverejniPozdeji();
  stopHry(); stopHry = () => {}; // odchod z rozehrané dámy
  const [cesta, arg] = location.hash.replace(/^#\/?/, '').split('/');
  if (!S.profily().length && cesta !== 'novy') return obrazovkaVitej();
  (TRASY[cesta] || domu)(arg && decodeURIComponent(arg));
}
addEventListener('hashchange', route);
// Odkaz na adresu, na které už jsme (třeba Zpět z výběru délky battlu, který běží pod #/battle),
// by prohlížeč ignoroval – obrazovku proto vykreslíme ručně.
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#/"]');
  if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
});
const jdi = h => { if (location.hash === h) route(); else location.hash = h; };

// ---------- Hlavička ----------
function hlavicka(x) {
  return `<header class="hlavicka">
    <a href="#/ja" class="kdo"><span class="avatar">${av(x)}</span>
      <span><b>${jmeno(x)}</b><small>${esc(H.titul(nasbirano(x), x))}</small></span></a>
    <span class="stat">${ik('ohen', 22, { podklad: false })} ${S.serie(x)}</span><span class="stat">${ik('susenka', 22, { podklad: false })} ${x.susenky}</span></header>`;
}

// ---------- Úvod a profily ----------
function obrazovkaVitej() {
  obrazovka(`<section class="vitej">${maskot(170)}
    <h1>Biscuit</h1><p class="podtitul">Angličtina po kouscích. Za každý dostaneš sušenku 🍪</p>
    <a class="btn velke" href="#/novy">Jdeme na to</a></section>`, { bezListy: true });
}

function novy() {
  let vzhled = nahodnyVzhled();
  obrazovka(`<section class="stranka">${S.profily().length ? zpet('#/rodic') : ''}
    <div class="maskot-bublina">${maskot(80, 'mrk')}<div class="bublina">Jak ti mám říkat? Stačí přezdívka.</div></div>
    <input id="prezdivka" class="pole" maxlength="14" placeholder="Přezdívka" autocomplete="off">
    <div class="rod-volba"><button data-rod="z">👧 Holka</button><button data-rod="m">👦 Kluk</button></div>
    <div class="nova-postavicka"><div id="nahled">${postavicka(vzhled, 150)}</div>
      <button class="btn vedlejsi" id="jina">🎲 Jiná</button></div>
    <p class="drobne">Tohle je tvoje sušenka. Účesy, oblečení, brýle, klobouky a mazlíčky jí koupíš za sušenky v Drip shopu.</p>
    <button class="btn velke" id="hotovo">Hotovo</button>
    </section>`, { bezListy: true });
  let rodNovy = null;
  $$('.rod-volba button').forEach(b => (b.onclick = () => {
    rodNovy = b.dataset.rod; $$('.rod-volba button').forEach(x => x.classList.toggle('on', x === b));
    vzhled = nahodnyVzhled(rodNovy); $('#nahled').innerHTML = postavicka(vzhled, 150);
  }));
  $('#jina').onclick = () => { vzhled = nahodnyVzhled(rodNovy); $('#nahled').innerHTML = postavicka(vzhled, 150); };
  $('#hotovo').onclick = () => {
    const n = $('#prezdivka').value.trim();
    if (!n) return toast('Napiš přezdívku 🙂');
    if (!rodNovy) return toast('Klepni, jestli jsi holka, nebo kluk 🙂');
    S.novyProfil(n, vzhled).rod = rodNovy;
    S.uloz();
    jdi('#/');
  };
}

// ---------- Domů ----------
// Denní cíl jako odpočet (Pavel 3. 10. 2026): plné kolečko s velkým „20 min zbývá“, ubývá s každou
// minutou aktivního učení; po splnění ✓.
function odpocet(x, velikost) {
  const cil = x.nastaveni.cil * 60, zbyva = Math.max(0, cil - S.den(x).s);
  return zbyva ? kolecko(zbyva / cil, `<b>${Math.ceil(zbyva / 60)}</b><small>min zbývá</small>`, velikost)
    : kolecko(1, '<span class="splneno-text">Dnes máš splněno</span>', velikost);
}
const EXTRA_DENNE = 2;
const extraZbyva = x => EXTRA_DENNE - (S.den(x).extra || 0);
function domu() {
  const x = p();
  const d = S.den(x);
  const cil = x.nastaveni.cil;
  const hotovo = d.s >= cil * 60;
  const unitTed = BALICKY.find(b => b.unit === x.nastaveni.unit);
  const pozdrav = hotovo ? H.nahodne(H.CIL_SPLNEN) : S.serie(x) >= 2 ? H.dosad(H.nahodne(H.SERIE), { n: S.serie(x) }) : H.rod(H.dosad(H.nahodne(H.POZDRAVY), { jmeno: x.prezdivka }), x);
  const otevrene = new Set(odemcene(x).map(b => b.id));

  const skupiny = SKUPINY.map(g => `<h2>${esc(g.nazev)}</h2><p class="drobne">${esc(g.popis)}</p>
    <div class="balicky">${BALICKY.filter(b => b.skupina === g.id).map(b => {
      const { umi, celkem } = postupBalicku(x, b);
      const zamceno = !otevrene.has(b.id);
      const ted = b.unit === x.nastaveni.unit;
      return `<a class="balicek${zamceno ? ' zamceno' : ''}${ted ? ' ted' : ''}" href="${zamceno ? '#/' : '#/balicek/' + b.id}" ${zamceno ? 'data-zamceno="1"' : ''}>
        <span class="b-ikona">${zamceno ? ik('zamek', 40) : ikBalicku(b)}</span>
        <span class="b-text">${b.unit ? `<small>Unit ${b.unit}${ted ? ' · teď ve škole' : ''}</small>` : ''}<b>${esc(b.nazev)}</b>
        <span class="mini-prubeh"><i style="width:${celkem ? umi / celkem * 100 : 0}%"></i></span></span></a>`;
    }).join('')}</div>`).join('');

  obrazovka(`${hlavicka(x)}<section class="stranka domu">
    <div class="maskot-bublina">${maskot(84, hotovo ? 'mrk' : 'radost')}<div class="bublina">${esc(pozdrav)}</div></div>
    <div class="dnes-karta">
      ${odpocet(x)}
      <div class="dnes-text"><h3>Dnešní lekce</h3>
        <p>${unitTed ? `Nová slovíčka z Unit ${unitTed.unit} + opakování + něco navíc` : 'Opakování a něco navíc'}</p>
        ${hotovo && extraZbyva(x) > 0 ? '<a class="btn zelena" href="#/lekce/extra">Extra 5 min</a><small class="extra-pozn">Těžší · dvojité sušenky</small>'
          : `<a class="btn" href="#/lekce">${hotovo ? 'Ještě jednu' : d.s < 60 ? 'Jdeme na to' : cil * 60 - d.s <= 180 ? 'Dokonči dnešek' : 'Pokračuj'} →</a>`}</div>
    </div>
    ${kartaHry(x)}
    ${skupiny}</section>`, { tab: 'domu' });
  vlozSchovanou('domu');
  $$('[data-zamceno]').forEach(a => (a.onclick = e => { e.preventDefault(); toast('Tohle ve škole přijde později. Odemkne se v sekci Pro rodiče.'); }));
}

// ---------- Hra za odměnu: Chytej sušenky ----------
// Odemkne se po splnění denního cíle učení. Dohromady 20 minut hraní denně, za každých HRA_BODU_NA_SUSENKU bodů 1 🍪 (max HRA_MAX_SUSENEK za den).
const HRA_LIMIT = 20 * 60, HRA_MAX_SUSENEK = 6, HRA_BODU_NA_SUSENKU = 25;
function hraDnes(x) {
  if (x.hra?.den !== S.dnes()) x.hra = { den: S.dnes(), s: 0, susenky: 0, rekord: x.hra?.rekord || 0 };
  return x.hra;
}
const hraOdemcena = x => S.den(x).s >= x.nastaveni.cil * 60;

function kartaHry(x) {
  const h = hraDnes(x), zbyva = Math.max(0, HRA_LIMIT - h.s);
  const chybi = Math.max(0, Math.ceil((x.nastaveni.cil * 60 - S.den(x).s) / 60));
  const stav = !hraOdemcena(x) ? `🔒 Odemkne se po dnešním učení (ještě ${chybi} min)` : zbyva <= 0 ? 'Na dnes dohráno. Zítra zase! 🌙' : `Zbývá ${Math.ceil(zbyva / 60)} min hraní · rekord ${h.rekord}`;
  return `<a class="karta-hry${hraOdemcena(x) && zbyva > 0 ? ' odemcena' : ''}" href="#/hra">
    <span class="b-ikona">${ik('hra', 52)}</span>
    <span class="b-text"><small>Hra za odměnu</small><b>Chytej sušenky</b><span class="hra-stav">${stav}</span></span>
    ${hraOdemcena(x) && zbyva > 0 ? '<span class="hra-hrat">Hrát ▶</span>' : ''}</a>`;
}

function hraZaOdmenu() {
  const x = p();
  const h = hraDnes(x);
  const zbyva = HRA_LIMIT - h.s;
  if (!hraOdemcena(x) || zbyva <= 0) {
    const chybi = Math.max(0, Math.ceil((x.nastaveni.cil * 60 - S.den(x).s) / 60));
    obrazovka(`<section class="stranka konec">${zpet('#/')}<div class="hra-logo">${ik('hra', 120)}</div><h1>Chytej sušenky</h1>
      <p class="hlaska">${!hraOdemcena(x) ? `Hra se odemkne, až dnes splníš denní cíl učení. Chybí ti ještě ${chybi} min.` : 'Dnešních 20 minut je vyčerpaných. Hra se odemkne zase zítra po učení. 🌙'}</p>
      <a class="btn velke" href="${!hraOdemcena(x) ? '#/lekce' : '#/'}">${!hraOdemcena(x) ? 'Jdu se učit' : 'Domů'}</a></section>`, { bezListy: true });
    return;
  }
  obrazovka(`<section class="stranka konec">${zpet('#/')}<div class="hra-logo">${ik('hra', 120)}</div><h1>Chytej sušenky</h1>
    <p class="hlaska">Posouvej krabičku prstem a chytej sušenky. Zlatá = 5 bodů, ale když spadne na zem, přijdeš o půl srdíčka. Brokolice bere celé srdíčko 🥦, šnek 🐌 všechno na chvíli zpomalí. A když hodně vzácně spadne srdíčko ❤️, chyť ho – je to život navíc!</p>
    <div class="hra-info"><span>⏱️ Zbývá ${Math.ceil(zbyva / 60)} min</span><span>🏆 Rekord ${h.rekord}</span><span>🍪 Dnes ${h.susenky}/${HRA_MAX_SUSENEK}</span></div>
    <p class="drobne">Každých ${HRA_BODU_NA_SUSENKU} bodů = 1 sušenka do aplikace (nejvýš ${HRA_MAX_SUSENEK} za den).</p>
    <button class="btn velke" id="hraj">Hrát ▶</button></section>`, { bezListy: true });
  $('#hraj').onclick = () => hrajHru(x);
}

function hrajHru(x) {
  const h = hraDnes(x);
  const a = obrazovka(`<section class="hra-platno"><div class="hra-hud"></div><div class="hra-zbyva"></div>
    <button class="zavrit" aria-label="Konec">${ik('zavrit', 26, { podklad: false })}</button><canvas></canvas></section>`, { bezListy: true });
  let zbyvaPred = HRA_LIMIT - h.s, ulozeno = 0;
  const hra = HRA.spust(a.querySelector('canvas'), {
    zbyva: zbyvaPred,
    priTiku: zbyva => {
      h.s = HRA_LIMIT - zbyva;
      const el = a.querySelector('.hra-zbyva');
      if (el) el.textContent = `⏱️ ${Math.floor(zbyva / 60)}:${String(Math.floor(zbyva % 60)).padStart(2, '0')}`;
      if (h.s - ulozeno > 5) { ulozeno = h.s; S.uloz(); }
    },
    konec: v => {
      const nove = Math.min(Math.floor(v.body / HRA_BODU_NA_SUSENKU), HRA_MAX_SUSENEK - h.susenky);
      if (nove > 0) { h.susenky += nove; S.pridej(x, nove); }
      const rekord = v.body > h.rekord;
      if (rekord) h.rekord = v.body;
      S.uloz();
      const zbyva = Math.max(0, HRA_LIMIT - h.s);
      obrazovka(`<section class="stranka konec">${zpet('#/')}<div class="hra-logo">${ik('hra', 100)}</div>
        <h1>${v.limit ? 'Čas na dnes vypršel ⏱️' : rekord ? 'Nový rekord! 🏆' : 'Konec hry!'}</h1>
        <div class="odmena"><span>${v.body} bodů</span><small>level ${v.level}${v.zlate ? ` · ${v.zlate}× zlatá sušenka` : ''}</small></div>
        <p class="hlaska">${nove > 0 ? `Do aplikace: ${ikS('susenka', 22)} +${nove}` : h.susenky >= HRA_MAX_SUSENEK ? 'Dnešní sušenky ze hry máš vybrané, ale rekord se počítá!' : `Na sušenku do aplikace potřebuješ ${HRA_BODU_NA_SUSENKU} bodů.`}</p>
        ${zbyva > 0 ? `<button class="btn velke" id="znovu">Ještě jednou ▶</button><p class="drobne">Zbývá ${Math.ceil(zbyva / 60)} min hraní.</p>` : '<p class="drobne">Hra se odemkne zase zítra po učení. 🌙</p>'}
        <a class="odkaz" href="#/">Domů</a></section>`, { bezListy: true });
      if (rekord || nove > 0) { konfety(); zvukFanfara(); }
      $('#znovu')?.addEventListener('click', () => hrajHru(x));
    },
  });
  a.querySelector('.zavrit').onclick = () => hra.zastav();
}

// ---------- Balíček ----------
function detailBalicku(id) {
  const x = p(), b = balicek(id);
  if (!b) return domu();
  const { umi, celkem } = postupBalicku(x, b);
  const v = polozky(b);
  const stav = it => { const s = x.srs[it.id]; return !s ? '' : s.b >= UMI ? 'umi' : 'uci'; };
  obrazovka(`${hlavicka(x)}<section class="stranka">
    ${zpet('#/')}
    <div class="balicek-hlava"><span class="b-ikona velka">${ikBalicku(b, 64)}</span>
      <div>${b.unit ? `<small>Happy Street 2 · Unit ${b.unit}</small>` : ''}<h1>${esc(b.nazev)}</h1>
      <p class="drobne">Umíš ${umi} z ${celkem}</p></div></div>
    <a class="btn velke" href="#/lekce/${b.id}">Procvičit tenhle balíček</a>
    <p class="drobne">Klepni na slovíčko a uslyšíš ho. ● zelená = umíš, ● žlutá = učíš se.</p>
    <div class="slovnik">${v.map(it => `<button class="slovo-radek ${stav(it)}" data-en="${esc(it.en)}">
      <span class="s-obr">${esc(it.obr || '')}</span><span class="s-en">${esc(it.en)}</span><span class="s-cz">${esc(it.cz)}</span><i></i></button>`).join('')}</div>
  </section>`, { tab: 'domu' });
  vlozSchovanou('domu');
  $$('.slovo-radek').forEach(r => (r.onclick = () => speak(r.dataset.en)));
}

// ---------- Lekce ----------
// Sušenky jsou schválně úsporné (Pavel 3. 10. 2026): postavička se má měnit za odměnu, ne po pár cvičeních.
// Za odpovědi: každá 4. správná na první pokus = 1 🍪 (počítá hra.js), zlatá otázka +3.
const ODMENY = { lekce: 2, perfekt: 3, cil: 5, bleskovkaVse: 4 };
function spustLekci(idBalicku) {
  const x = p();
  // „extra“ = extra 5 minut po splnění denního cíle: těžší úlohy, dvojnásobné sušenky, nejvýš EXTRA_DENNE× za den.
  const extra = idBalicku === 'extra' && extraZbyva(x) > 0;
  if (idBalicku === 'extra' && !extra) idBalicku = null;
  const ulohy = extra ? sestavExtra(x) : sestav(x, idBalicku || null);
  const cilPred = S.den(x).s >= x.nastaveni.cil * 60;
  nastavUceni(true);
  hraj(ulohy, {
    nazev: extra ? 'Extra 5 minut ⚡ dvojité sušenky' : idBalicku ? balicek(idBalicku)?.nazev : 'Dnešní lekce', profil: x,
    nasobek: extra ? 2 : 1,
    priOdpovedi: (u, ok, prvni, info) => {
      if (u.polozka?.id) zapis(x, u.polozka, ok, prvni);
      const d = S.den(x);
      ok ? d.ok++ : d.chyby++;
      if (info.zisk) S.pridej(x, info.zisk);
      S.uloz();
    },
    konec: v => {
      nastavUceni(false);
      if (v.preruseno) { S.uloz(); return jdi('#/'); }
      const d = S.den(x);
      d.lekce++;
      if (extra) d.extra = (d.extra || 0) + 1;
      let bonus = (ODMENY.lekce + (v.perfekt ? ODMENY.perfekt : 0)) * (extra ? 2 : 1);
      const cilTed = !cilPred && d.s >= x.nastaveni.cil * 60;
      if (cilTed) bonus += ODMENY.cil;
      S.pridej(x, bonus);
      const nove = zkontroluj(x, { perfekt: v.perfekt, hodina: new Date().getHours() });
      S.uloz();
      konecLekce(x, v, bonus, cilTed, nove);
    },
  });
}

function konecLekce(x, v, bonus, cilTed, nove) {
  const druh = v.perfekt ? 'perfekt' : v.chyby <= 2 ? 'dobre' : 'slabsi';
  const d = S.den(x);
  obrazovka(`<section class="stranka konec">${zpet('#/', 'Domů')}${maskot(150, v.perfekt ? 'mrk' : 'radost')}
    <h1>${esc(H.rod(H.nahodne(H.KONEC_LEKCE[druh]), x))}</h1>
    <div class="odmena"><span>${ikS('susenka', 34)} +${v.susenky + bonus}</span><small>${v.susenky} za odpovědi, ${bonus} bonus${cilTed ? ' (vč. denního cíle!)' : ''}</small></div>
    ${odpocet(x, 110)}
    ${cilTed ? `<p class="hlaska">${esc(H.nahodne(H.CIL_SPLNEN))}</p>` : ''}
    ${VECI.some(v => !maVec(x, v) && v.cena <= x.susenky) ? `<a class="drip-ceka" href="#/obchod">${ik('tab-drip', 34)}<b>${esc(H.DRIP_CEKA)}</b></a>` : ''}
    ${nove.map(o => `<div class="novy-odznak"><span>${ikOdznaku(o, 48)}</span><div><small>Nový odznak!</small><b>${esc(o.nazev)}</b></div></div>`).join('')}
    <a class="btn velke" href="#/">Hotovo</a>
    ${extraZbyva(x) > 0 && d.s >= x.nastaveni.cil * 60 ? `<a class="odkaz" href="#/lekce/extra">Dát si extra 5 minut ⚡</a>` : '<a class="odkaz" href="#/lekce">Ještě jednu lekci</a>'}</section>`, { bezListy: true });
  if (v.perfekt || cilTed || nove.length) { konfety(); zvukFanfara(); }
}

// ---------- Battle (jen s kamarádkami online, každá na svém telefonu) ----------
function battle() {
  const x = p();
  obrazovka(`${hlavicka(x)}<section class="stranka">
    <h1 class="s-ikonou">${ik('tab-battle', 44)} Battle</h1>
    ${hrySekce(x)}
    ${x.online && O.nakonfigurovano() ? onlineSekce(x) : `<div class="prazdne kamaradi-info">${maskot(90, 'hmm')}<p>S kamarádem se hraje s kamarádkou nebo kamarádem, každý na svém mobilu. Ať ti rodič zapne <b>Kamarádi online</b> v sekci Pro rodiče (Já → Pro rodiče).</p></div>`}
  </section>`, { tab: 'battle' });
  vlozSchovanou('battle');
  napojOnlineSekci(x);
  $('#double-trenink')?.addEventListener('click', () => doubleTrenink(x));
  $$('[data-jak-hrat]').forEach(b => (b.onclick = () => {
    const prvni = online.kamaradky[0];
    if (x.online && prvni) return vybratVyzvu(x, prvni, b.dataset.jakHrat);
    document.querySelector('.kamaradi-info, .prazdne, .pridat-kod')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    toast(x.online ? 'Nejdřív si přidej kamaráda kódem 👇' : 'Na hru s kamarádem musí rodič zapnout Kamarádi online.');
  }));
}

// Přehled her nahoře v Battle: ať je vidět, co všechno se dá hrát. Double jde i samotně jako trénink.
function hrySekce(x) {
  const rekord = x.doubleRekord || 0;
  return `<h2>Hry</h2><div class="hry-prehled">
    <div class="hra-karta"><b>⚔️ Kvíz</b><small>Stejné otázky pro oba, kdo víc</small><button class="btn maly vedlejsi" data-jak-hrat="kviz">S kamarádem</button></div>
    <div class="hra-karta"><b>👀 Double</b><small>Najdi shodu: obrázek, anglicky, česky${rekord ? ` · rekord ${rekord}` : ''}</small>
      <div class="hra-tlacitka"><button class="btn maly" id="double-trenink">Trénink</button><button class="btn maly vedlejsi" data-jak-hrat="double">S kamarádem</button></div></div>
    <div class="hra-karta"><b>🍪 Dáma</b><small>Sušenky na šachovnici, na střídačku${hraOdemcena(x) ? '' : ' · 🔒 po splnění dnešního cíle'}</small><button class="btn maly vedlejsi" data-jak-hrat="dama">S kamarádem</button></div>
  </div>`;
}

// Double samotně: bez sušenek (aby se nedaly nahánět), jen osobní rekord.
function doubleTrenink(x) {
  let data;
  try { data = sestavDouble(odemcene(x).flatMap(polozky)); } catch { return toast('Na Double je potřeba víc slovíček s obrázkem.'); }
  nastavUceni(true);
  hrajDouble({ data, souperJmeno: 'trénink', konec: body => {
    nastavUceni(false);
    const novy = body > (x.doubleRekord || 0);
    if (novy) { x.doubleRekord = body; S.uloz(); }
    obrazovka(`<section class="stranka konec">${maskot(130, body ? 'mrk' : 'hmm')}<h1>${body} ${body === 1 ? 'shoda' : body < 5 && body > 1 ? 'shody' : 'shod'}</h1>
      <p class="hlaska">${novy ? 'Nový rekord! 🏆' : `Rekord: ${x.doubleRekord || 0}`}</p>
      <p class="drobne">V tréninku se sušenky nedávají – za ty si zahraj Double s kamarádem.</p>
      <button class="btn velke" id="znovu">Znovu</button><a class="odkaz" href="#/battle">Zpět do Battle</a></section>`, { bezListy: true });
    if (novy) { konfety(); zvukFanfara(); }
    $('#znovu').onclick = () => doubleTrenink(x);
  } });
}

// ---------- Žebříček ----------
function zebricek() {
  const x = p();
  const vse = [x, ...online.kamaradky.filter(k => k.id !== x.id)];
  const kategorie = [
    { ikona: 'susenka', nazev: 'Nejvíc sušenek celkem', hodnota: o => statistiky(o).susenkyCelkem, fmt: n => n,
      vtip: (v, n) => `${v} vede o ${n} 🍪. Ostatní zatím jen drobí.` },
    { ikona: 'ohen', nazev: 'Nejdelší série teď', hodnota: o => statistiky(o).serie, fmt: n => `${n} dní`,
      vtip: v => `${v} je on fire. Doslova.` },
    { ikona: 'o-stopky', nazev: 'Minuty tento týden', hodnota: o => statistiky(o).tydenMin, fmt: n => `${n} min`,
      vtip: (v, n, o) => `${v} se ${H.rod('[učil|učila]', o)} o ${n} minut víc. Podezřelé. Možná je to robot 🤖` },
    { ikona: 'o-mozek', nazev: 'Umí slovíček', hodnota: o => statistiky(o).umiSlov, fmt: n => n,
      vtip: (v, n) => `${v} umí o ${n} slovíček víc. Chodící slovník.` },
    { ikona: 'tab-battle', nazev: 'Výhry v battlech', hodnota: o => statistiky(o).vyhry, fmt: n => n,
      vtip: v => `${v} je postrach battlů.` },
  ];
  const medaile = ['🥇', '🥈', '🥉'];
  const karty = kategorie.map(k => {
    const serazene = [...vse].sort((a, b) => k.hodnota(b) - k.hodnota(a));
    const [prvni, druha] = serazene;
    const rozdil = druha ? k.hodnota(prvni) - k.hodnota(druha) : 0;
    const vtip = vse.length > 1 && rozdil > 0 ? k.vtip(prvni.prezdivka, rozdil, prvni) : vse.length > 1 ? 'Zatím nerozhodně. Napínavé.' : '';
    return `<div class="z-karta"><h3 class="s-ikonou">${ik(k.ikona, 34)} ${k.nazev}</h3>
      ${serazene.map((o, i) => `<div class="z-radek${o.id === x.id ? ' ja' : ''}"><span class="z-poradi">${medaile[i] || i + 1}</span>
        <span class="avatar">${av(o, 34)}</span><span class="z-jmeno">${jmeno(o)}</span><b>${k.fmt(k.hodnota(o))}</b></div>`).join('')}
      ${vtip ? `<p class="z-vtip">${esc(vtip)}</p>` : ''}</div>`;
  }).join('');
  obrazovka(`${hlavicka(x)}<section class="stranka"><h1 class="s-ikonou">${ik('tab-zebricek', 44)} Žebříček</h1>
    ${vse.length < 2 ? `<div class="prazdne">${maskot(90, 'hmm')}<p>Zatím jsi tu ${H.rod('[sám|sama]', x)}. Vyhráváš všechno, ale to se nepočítá 😅</p>
      <a class="btn" href="#/battle">＋ Přidat kamarádku</a></div>` : ''}
    ${karty}</section>`, { tab: 'zebricek' });
  vlozSchovanou('zebricek');
}

// ---------- Já ----------
function ja() {
  const x = p();
  const dny = [];
  // Týden od pondělí do neděle (dny, které teprve přijdou, jsou prázdné).
  const d = new Date();
  d.setDate(d.getDate() - (d.getDay() + 6) % 7);
  for (let i = 0; i < 7; i++) { dny.push({ k: S.dnes(d), nazev: d.toLocaleDateString('cs-CZ', { weekday: 'short' }) }); d.setDate(d.getDate() + 1); }
  const maxMin = Math.max(x.nastaveni.cil, ...dny.map(k => minuty(x.dny[k.k]?.s || 0)));
  const ziskane = ODZNAKY.filter(o => x.odznaky[o.id]);
  const zbyvajici = ODZNAKY.filter(o => !x.odznaky[o.id] && !o.id.startsWith('mistr-'));
  obrazovka(`${hlavicka(x)}<section class="stranka">
    <h1 class="drip-nadpis">Můj profil</h1>
    <div class="ja-hlava"><span class="avatar obri">${postavicka(x.vzhled, 120)}</span>
      <h1 class="jmeno-edit" id="jmeno" role="button" title="Klepni a změň přezdívku">${jmeno(x)}<span class="tuzka" aria-hidden="true">✏️</span></h1><p class="titul">${esc(H.titul(nasbirano(x), x))}</p>
      <a class="btn" href="#/obchod">${ik('tab-drip', 28, { podklad: false })} Drip shop</a></div>
    <div class="cisla">
      <div><b>${S.serie(x)}</b><small>🔥 série</small></div>
      <div><b>${S.nejdelsiSerie(x)}</b><small>nejdelší série</small></div>
      <div><b>${S.umiSlov(x)}</b><small>umím slovíček</small></div>
      <div><b>${Math.round(S.celkemSekund(x) / 60)}</b><small>minut celkem</small></div>
    </div>
    <h2>Tenhle týden</h2>
    <div class="graf">${dny.map(k => { const m = minuty(x.dny[k.k]?.s || 0); return `<div class="sloupec${m >= x.nastaveni.cil ? ' splneno' : ''}">
      <span>${m || ''}</span><i style="height:${m / maxMin * 100}%"></i><small>${k.nazev}</small></div>`; }).join('')}
      <div class="cil-cara" style="bottom:calc(${x.nastaveni.cil / maxMin} * (100% - 34px) + 20px)"></div></div>
    <h2>Jsem</h2>
    <div class="rod-volba">${[['z', '👧 Holka'], ['m', '👦 Kluk']].map(([k, t]) => `<button data-novy-rod="${k}" class="${x.rod === k ? 'on' : ''}">${t}</button>`).join('')}</div>
    <h2>Noční režim</h2>
    <div class="delky noc-volba">${[['auto', 'Automaticky', 'večer od 20:00'], ['on', 'Vždy tmavý', '🌙'], ['off', 'Vždy světlý', '☀️']].map(([k, t, m]) =>
      `<button class="delka${(x.nastaveni.noc || 'auto') === k ? ' on' : ''}" data-noc="${k}"><b>${t}</b><small>${m}</small></button>`).join('')}</div>
    <h2>Odznaky <small>${ziskane.length}</small></h2>
    <div class="odznaky">${ziskane.map(o => `<div class="odznak"><span>${ikOdznaku(o, 46)}</span><b>${esc(o.nazev)}</b><small>${esc(H.rod(o.popis, x))}</small></div>`).join('')}
      ${zbyvajici.map(o => `<div class="odznak zamceny"><span>${ikOdznaku(o, 46)}</span><b>${esc(o.nazev)}</b><small>${esc(H.rod(o.popis, x))}</small></div>`).join('')}</div>
    <div class="tlacitka">
      <a class="odkaz" href="#/rodic">Pro rodiče</a></div>
  </section>`, { tab: 'ja' });
  // Překreslení bez odskoku nahoru (volby uprostřed stránky).
  const prekresli = () => { const app = document.getElementById('app'), top = app.scrollTop; ja(); app.scrollTop = top; };
  $$('[data-noc]').forEach(b => (b.onclick = () => { x.nastaveni.noc = b.dataset.noc; S.uloz(); nastavSvet(x); nastavNoc(); prekresli(); }));
  // Přezdívka se mění klepnutím na jméno; holka/kluk tlačítky. Obojí se hned uloží a pošle kamarádům online.
  $('#jmeno').onclick = () => {
    const h = $('#jmeno');
    h.outerHTML = `<div class="jmeno-pole"><input id="nova-prezdivka" class="pole" maxlength="14" value="${jmeno(x)}" autocomplete="off" enterkeyhint="done"><button class="btn" id="ulozit-jmeno" aria-label="Uložit">✓</button></div>`;
    const i = $('#nova-prezdivka');
    i.focus(); i.select();
    let hotovo = false;
    const uloz = () => {
      if (hotovo) return; hotovo = true;
      const n = i.value.trim();
      if (n && n !== x.prezdivka) { x.prezdivka = n; S.uloz(); posledniZverejneni = 0; zverejniPozdeji(); toast('Uloženo ✨'); }
      else if (!n) toast('Přezdívka nemůže být prázdná 🙂');
      prekresli();
    };
    i.onkeydown = e => { if (e.key === 'Enter') uloz(); if (e.key === 'Escape') { i.value = x.prezdivka; uloz(); } };
    i.onblur = () => setTimeout(uloz, 150); // klepnutí na ✓ má přednost
    $('#ulozit-jmeno').onpointerdown = e => { e.preventDefault(); uloz(); };
  };
  $$('[data-novy-rod]').forEach(b => (b.onclick = () => {
    if (x.rod === b.dataset.novyRod) return;
    x.rod = x.vzhled.rod = b.dataset.novyRod; S.uloz(); posledniZverejneni = 0; zverejniPozdeji();
    tabJa(); prekresli();
  }));
  vlozSchovanou('ja');
}

// ---------- Drip shop (šatník postavičky sušenky) ----------
let satnikKat = 'obleceni';
function obchod() {
  const x = p();
  let zkouska = { ...x.vzhled };
  const kat = KATEGORIE.find(k => k.id === satnikKat && !k.vUcesu) || KATEGORIE[0];
  // Kategorie zobrazené na téhle kartě: u Účesu i barva vlasů (kolečka nahoře).
  const katyKarty = [kat.id, ...KATEGORIE.filter(k => k.vUcesu && kat.id === 'uces').map(k => k.id)];

  const vykresli = () => {
    const veci = VECI.filter(v => v.kat === kat.id).sort((a, b) => a.cena - b.cena);
    const nekoupena = katyKarty.map(k => vec(zkouska[k])).find(w => w && !maVec(x, w)) || null;
    const barvy = kat.id === 'uces' ? VECI.filter(v => v.kat === 'barva').sort((a, b) => a.cena - b.cena) : [];
    const kolecko = c => c === 'duha' ? 'conic-gradient(#ff6b7a, #ffa94d, #ffe066, #69db7c, #4dabf7, #9775fa, #ff6b7a)' : c;
    obrazovka(`${hlavicka(x)}<section class="stranka satnik">
      <h1 class="drip-nadpis">Drip shop</h1>
      <div class="satnik-nahled">${postavicka(zkouska, 210)}</div>
      <div class="kategorie">${KATEGORIE.filter(k => !k.vUcesu).map(k => `<button class="kat${k.id === kat.id ? ' on' : ''}" data-k="${k.id}"><span>${ik(k.ik, 28)}</span>${esc(k.nazev)}</button>`).join('')}</div>
      ${barvy.length ? `<div class="barvy-vlasu">${barvy.map(v => `<button class="barva-vlasu${zkouska.barva === v.id ? ' on' : ''}${maVec(x, v) ? '' : ' cizi'}" data-v="${v.id}" data-kat="barva" aria-label="${esc(v.nazev)}" title="${esc(v.nazev)}">
          <i style="background:${kolecko(v.c)}"></i>${maVec(x, v) ? '' : `<small>${v.cena}</small>`}</button>`).join('')}</div>` : ''}
      <div class="veci">
        ${kat.povinne ? '' : `<button class="vec${!zkouska[kat.id] ? ' on' : ''}" data-v=""><span class="vec-nic">✕</span><small>Nic</small></button>`}
        ${veci.map(v => `<button class="vec${zkouska[kat.id] === v.id ? ' on' : ''}${maVec(x, v) ? '' : ' cizi'}" data-v="${v.id}">
          ${postavicka({ ...x.vzhled, [kat.id]: v.id }, 74, kat.hlava ? 'hlava' : 'cela')}
          <small>${esc(v.nazev)}</small>
          ${maVec(x, v) ? '' : `<span class="cena">${ikS('susenka', 16)} ${v.cena}</span>`}
          ${v.cena ? `<span class="vzacnost" style="color:${vzacnost(v.cena).barva}">${vzacnost(v.cena).nazev}</span>` : ''}</button>`).join('')}
      </div>
      ${nekoupena ? `<div class="satnik-lista"><button class="btn velke" id="koupit">${x.susenky >= nekoupena.cena ? `Koupit ${esc(nekoupena.nazev)} za ${ikS('susenka', 24)} ${nekoupena.cena}` : `Chybí ti ${ikS('susenka', 24)} ${nekoupena.cena - x.susenky}`}</button></div>` : ''}
    </section>`, { tab: 'drip' });

    $('.kat.on')?.scrollIntoView({ inline: 'center', block: 'nearest' });
    if (!vykresli.uz) { vykresli.uz = true; $('.veci .vec.on')?.scrollIntoView({ inline: 'center', block: 'nearest' }); } // při otevření ukázat nošenou věc
    $$('.kat').forEach(b => (b.onclick = () => { satnikKat = b.dataset.k; obchod(); }));
    $$('.vec, .barva-vlasu').forEach(b => (b.onclick = () => {
      const v = b.dataset.v ? vec(b.dataset.v) : null;
      const k = b.dataset.kat || kat.id;
      zkouska = { ...zkouska, [k]: v?.id || null };
      // Co už má, si rovnou oblékne (a uloží). Nekoupené jen zkouší.
      if (!v || maVec(x, v)) { x.vzhled = { ...x.vzhled, [k]: v?.id || null }; S.uloz(); }
      const top = document.getElementById('app').scrollTop, vlevo = $('.veci')?.scrollLeft || 0;
      vykresli();
      tabJa();
      document.getElementById('app').scrollTop = top;
      const v2 = $('.veci'); if (v2) v2.scrollLeft = vlevo; // carousel zůstane, kde byl
    }));
    const koupit = $('#koupit');
    if (koupit) koupit.onclick = () => {
      if (x.susenky < nekoupena.cena) return toast('Ještě pár lekcí a je to tvoje 💪');
      x.susenky -= nekoupena.cena;
      x.koupeno.push(nekoupena.id);
      x.vzhled = { ...x.vzhled, [nekoupena.kat]: nekoupena.id };
      S.uloz();
      konfety(); zvukFanfara();
      toast(`${nekoupena.nazev} je tvoje! ✨`);
      vykresli();
      tabJa();
    };
  };
  vykresli();
}

// ---------- Pro rodiče (za PINem) ----------
let rodicOdemceno = false;
function rodic() {
  const r = S.data().rodic;
  if (!rodicOdemceno) {
    obrazovka(`<section class="stranka">${zpet('#/ja')}<h1>Pro rodiče</h1>
      <p class="drobne">${r.pin ? 'Zadej PIN.' : 'Nastav si čtyřmístný PIN, ať sem děti nechodí.'}</p>
      <input id="pin" class="pole pin" type="password" inputmode="numeric" maxlength="4" autocomplete="off">
      <button class="btn velke" id="ok">${r.pin ? 'Odemknout' : 'Nastavit PIN'}</button></section>`, { bezListy: true });
    $('#ok').onclick = () => {
      const v = $('#pin').value;
      if (!/^\d{4}$/.test(v)) return toast('PIN má 4 číslice.');
      if (!r.pin) { r.pin = v; S.uloz(); }
      else if (v !== r.pin) return toast('Špatný PIN.');
      rodicOdemceno = true;
      rodic();
    };
    return;
  }
  const karty = S.profily().map(o => {
    const sl = slabiny(o);
    const d = new Date();
    const tyden = [];
    for (let i = 0; i < 7; i++) { tyden.unshift(minuty(o.dny[S.dnes(d)]?.s || 0)); d.setDate(d.getDate() - 1); }
    return `<div class="r-karta" data-id="${o.id}"><h3>${jmeno(o)}</h3>
      <p>Dnes ${minuty(S.den(o).s)} min · týden ${tyden.reduce((a, b) => a + b, 0)} min (${tyden.join(' / ')}) · celkem ${Math.round(S.celkemSekund(o) / 60)} min</p>
      <p>Umí ${S.umiSlov(o)} položek · série ${S.serie(o)} dní · 🍪 ${o.susenky}</p>
      ${sl.length ? `<p><b>Nejvíc chyb:</b> ${sl.map(s => `${esc(s.en)} (${s.chyby}×)`).join(', ')}</p>` : ''}
      <label>Ve škole probírají <select data-k="unit">${[1, 2, 3, 4, 5, 6, 7, 8].map(n => `<option ${o.nastaveni.unit === n ? 'selected' : ''} value="${n}">Unit ${n}</option>`).join('')}</select></label>
      <label>Holka / kluk <select data-rod>${[['z', 'Holka'], ['m', 'Kluk']].map(([k, t]) => `<option value="${k}" ${(o.rod || 'z') === k ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
      <label>Denní cíl <select data-k="cil">${[5, 10, 15, 20, 30].map(n => `<option ${o.nastaveni.cil === n ? 'selected' : ''} value="${n}">${n} min</option>`).join('')}</select></label>
      <label class="prepinac"><input type="checkbox" data-k="vsechnyUnity" ${o.nastaveni.vsechnyUnity ? 'checked' : ''}> Odemknout všechny lekce dopředu</label>
      <label class="prepinac"><input type="checkbox" data-online ${o.online ? 'checked' : ''}> Kamarádi online (battle na dálku, společný žebříček)</label>
      ${S.profily().length > 1 && o.id !== S.data().aktivni ? `<button class="btn vedlejsi" data-pouzit="${o.id}">Používat tento profil</button>` : ''}
      <button class="odkaz cervene" data-smazat="${o.id}">Smazat profil</button></div>`;
  }).join('');
  obrazovka(`<section class="stranka">${zpet('#/ja')}<h1>Pro rodiče</h1>
    <p class="drobne">Čas se počítá jen při aktivním učení: po 45 s bez klepnutí nebo s aplikací na pozadí se zastaví.</p>
    ${karty}
    <a class="btn vedlejsi" href="#/novy">＋ Založit další profil</a>
    <p class="drobne">Jen výjimečně (třeba pro sourozence). Mezi profily se přepíná tady tlačítkem „Používat tento profil“.</p>
    <h3>Hlas</h3><p class="drobne">Britské hlasy, které má tenhle telefon. Další (třeba ženské Kate nebo Serena) se dají stáhnout v Nastavení → Zpřístupnění → Předčítaný obsah → Hlasy → Angličtina (Spojené království).</p>
    <div class="hlas-volba"><select id="hlas">${seznamHlasu().map(n => `<option ${n === zvolenyHlas() ? 'selected' : ''}>${esc(n)}</option>`).join('') || '<option>Výchozí hlas</option>'}</select>
      <button class="btn vedlejsi" id="hlas-ukazka">▶ Ukázka</button></div>
    <h3>Záloha</h3><p class="drobne">Všechno je jen v tomhle telefonu. Zálohu si ulož třeba do Souborů.</p>
    <div class="tlacitka"><button class="btn vedlejsi" id="zaloha">Stáhnout zálohu</button>
      <label class="btn vedlejsi">Obnovit ze zálohy<input type="file" id="obnova" accept=".json,application/json" hidden></label>
      <button class="btn vedlejsi" id="zmenapin">Změnit PIN</button></div></section>`, { bezListy: true });
  $('#hlas').onchange = e => { nastavHlas(e.target.value); speak('Hello! I\'m your new voice.'); };
  $('#hlas-ukazka').onclick = () => speak('Hello! How are you today?');
  if (!seznamHlasu().length) priHlasech(() => { if (location.hash.startsWith('#/rodic') && seznamHlasu().length && !$('#hlas option + option')) rodic(); });
  $$('.r-karta select, .r-karta input').forEach(el => (el.onchange = () => {
    const o = S.profil(el.closest('.r-karta').dataset.id);
    if (el.dataset.rod !== undefined) { o.rod = el.value; S.uloz(); return toast('Uloženo'); }
    if (el.dataset.online !== undefined) {
      if (el.checked && !O.nakonfigurovano()) { el.checked = false; return toast('Online režim ještě není nastavený.'); }
      if (el.checked && !confirm(`Zapnout kamarády online pro ${o.prezdivka}?\n\nDo databáze Google Firebase se uloží jen přezdívka, postavička a statistiky učení (žádné jméno, fotka ani poloha). Kamarádky se přidávají jen kódem, který si děti předají osobně, a nejde si psát volné zprávy.\n\nSouhlasím jako rodič.`)) { el.checked = false; return; }
      o.online = el.checked; S.uloz(); zastavOnline(); spustOnline();
      return toast(el.checked ? 'Kamarádi online zapnuti' : 'Kamarádi online vypnuti');
    }
    o.nastaveni[el.dataset.k] = el.type === 'checkbox' ? el.checked : +el.value;
    S.uloz();
    toast('Uloženo');
  }));
  $$('[data-pouzit]').forEach(b => (b.onclick = () => { S.prepni(b.dataset.pouzit); zastavOnline(); toast('Profil přepnutý'); rodic(); }));
  $$('[data-smazat]').forEach(b => (b.onclick = () => {
    const o = S.profil(b.dataset.smazat);
    if (prompt(`Smazat profil ${o.prezdivka} se vším postupem? Napiš SMAZAT.`) === 'SMAZAT') { S.smazProfil(o.id); rodic(); }
  }));
  $('#zaloha').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([S.export_()], { type: 'application/json' }));
    a.download = `biscuit-zaloha-${S.dnes()}.json`;
    a.click();
  };
  $('#obnova').onchange = async e => {
    try { S.import_(await e.target.files[0].text()); toast('Obnoveno'); rodic(); } catch (err) { toast(err.message || 'Záloha nejde načíst'); }
  };
  $('#zmenapin').onclick = () => { r.pin = null; rodicOdemceno = false; S.uloz(); rodic(); };
}

// ---------- Délka battlu a odměny ----------
const DELKY = [
  { n: 20, nazev: 'Rychlovka', popis: '20 otázek', odmena: { v: 8, r: 4, p: 2 } },
  { n: 30, nazev: 'Klasika', popis: '30 otázek', odmena: { v: 11, r: 6, p: 3 } },
  { n: 40, nazev: 'Maraton', popis: '40 otázek', odmena: { v: 15, r: 8, p: 4 } },
];
let zvolenaDelka = 30;
// Hry s kamarádem: kvíz (otázky), Double (najdi shodu, 60 s) a Dáma (na tahy). Dáma jde vyzvat až po splnění
// denního cíle – nejdřív učení.
const HRY = {
  kviz: { nazev: 'Kvíz', ikona: '⚔️', popis: 'Stejné otázky, kdo víc' },
  double: { nazev: 'Double', ikona: '👀', popis: 'Najdi shodu na kartách · 60 s', odmena: { v: 6, r: 3, p: 2 } },
  dama: { nazev: 'Dáma', ikona: '🍪', popis: 'Sušenky na šachovnici, táhnete na střídačku', odmena: { v: 5, r: 3, p: 1 } },
};
const odmenaBattlu = b => (b.typ && b.typ !== 'kviz' ? HRY[b.typ].odmena : (DELKY.find(d => d.n === b.ulohy.length) || DELKY[0]).odmena);
const stranaDamy = (b, id) => (b.hraci[0] === id ? 'a' : 'b');
const damaNaTahu = (b, id) => b.typ === 'dama' && b.dama && !b.dama.v && b.dama.t === stranaDamy(b, id);
let stopHry = () => {};
const volbaDelky = () => `<div class="delky">${DELKY.map(d => `<button class="delka${d.n === zvolenaDelka ? ' on' : ''}" data-n="${d.n}">
  <b>${d.nazev}</b><small>${d.popis}</small><small>výhra +${d.odmena.v} 🍪</small></button>`).join('')}</div>`;
const napojVolbuDelky = () => $$('.delka').forEach(b => (b.onclick = () => { zvolenaDelka = +b.dataset.n; $$('.delka').forEach(x => x.classList.toggle('on', x === b)); }));

// ---------- Online: kamarádi, výzvy, battle na dálku ----------
// Hlášky k výzvě: v databázi je jen jejich číslo, žádný volný text.
const VYZVY = [['Are you ready? 😎', 'Můžeme?'], ['Catch me if you can! 🏃', 'Chyť mě, jestli to dokážeš!'], ["Let's play! 🎮", 'Pojďme hrát!'],
  ['Bring it on! 🔥', 'Sem s tím!'], ['Good luck! 🍀', 'Hodně štěstí!'], ["I'm the champion! 🏆", 'Šampion jsem já!']];
let online = { profilId: null, kamaradky: [], battly: [], stop: [], chyba: false };

// Statistiky do žebříčku: u místního profilu se spočítají, u online kamarádky přijdou z databáze.
function statistiky(o) {
  if (!o.dny) return { susenkyCelkem: o.susenkyCelkem || 0, serie: o.serie || 0, tydenMin: o.tydenMin || 0, umiSlov: o.umiSlov || 0, vyhry: o.vyhry || 0 };
  return { susenkyCelkem: nasbirano(o), serie: S.serie(o), tydenMin: minuty(S.tydenSekund(o)), umiSlov: S.umiSlov(o), vyhry: o.souboje.vyhry };
}

function spustOnline() {
  const x = p();
  if (!x || !x.online || !O.nakonfigurovano()) return zastavOnline();
  if (online.profilId === x.id) return;
  zastavOnline();
  online.profilId = x.id;
  O.zverejni(x, statistiky(x)).then(() => S.uloz()).catch(() => {});
  online.stop.push(O.sledujKamaradky(x, l => { online.chyba = l === null; online.kamaradky = l || []; obnovOnline(); }));
  online.stop.push(O.sledujBattly(x, l => { if (l) online.battly = l; zpracujBattly(x); obnovOnline(); }));
}
function zastavOnline() { online.stop.forEach(f => f()); online = { profilId: null, kamaradky: [], battly: [], stop: [], chyba: false }; odznakBattle(); }

let posledniZverejneni = 0;
function zverejniPozdeji() {
  const x = p();
  if (!x?.online || !O.nakonfigurovano() || Date.now() - posledniZverejneni < 20000) return;
  posledniZverejneni = Date.now();
  O.zverejni(x, statistiky(x)).catch(() => {});
}

// Překreslí Battle / Žebříček, když přijdou nová data (ne během hry a ne při psaní kódu).
function obnovOnline() {
  odznakBattle();
  const h = location.hash.replace(/^#\/?/, '').split('/')[0];
  if (document.querySelector('#hra, .dama-hra') || document.activeElement?.tagName === 'INPUT') return;
  if (h === 'battle' && !document.querySelector('.cekani')) battle();
  if (h === 'zebricek') zebricek();
}
const mojeVysl = (b, id) => b.vysledky?.[id] || {};
const souperkaId = (b, id) => b.hraci.find(h => h !== id);
const kamaradka = id => online.kamaradky.find(k => k.id === id) || { id, prezdivka: 'Kamarádka', vzhled: {} };
const oboHotovo = b => b.hraci.every(h => mojeVysl(b, h).hotovo);

function odznakBattle() {
  const x = p();
  const n = x ? online.battly.filter(b => (b.typ === 'dama' ? damaNaTahu(b, x.id) : !mojeVysl(b, x.id).hotovo)).length : 0;
  const tab = $('#tabs [data-tab="battle"]');
  if (tab) tab.dataset.pocet = n || '';
}

// Odměny za dohrané online battly (každý se započítá jen jednou).
function zpracujBattly(x) {
  x.zpracovano ||= [];
  let zmena = false;
  for (const b of online.battly) {
    if (!oboHotovo(b) || x.zpracovano.includes(b.id)) continue;
    const ja = mojeVysl(b, x.id).body || 0, ona = mojeVysl(b, souperkaId(b, x.id)).body || 0;
    const od = odmenaBattlu(b);
    if (ja > ona) { x.souboje.vyhry++; S.pridej(x, od.v); } else if (ja < ona) { x.souboje.prohry++; S.pridej(x, od.p); } else { x.souboje.remizy++; S.pridej(x, od.r); }
    x.zpracovano.push(b.id);
    // Vyskakovací výsledek jen u čerstvých battlů (ne u starých při prvním zapnutí online).
    if (Date.now() - b.vytvoreno < 3 * 864e5) frontaVysledku.push(b);
    zmena = true;
  }
  if (zmena) { x.zpracovano = x.zpracovano.slice(-300); zkontroluj(x); S.uloz(); posledniZverejneni = 0; zverejniPozdeji(); }
  ukazVysledek();
}

// ---------- Noční režim ----------
// Automaticky od 20:00 do 6:30, nebo podle volby v záložce Já (nastaveni.noc: 'auto' | 'on' | 'off').
function jeNoc() {
  const r = p()?.nastaveni?.noc || 'auto';
  if (r !== 'auto') return r === 'on';
  const d = new Date(), h = d.getHours() + d.getMinutes() / 60;
  return h >= 20 || h < 6.5;
}
function nastavNoc() {
  const noc = jeNoc();
  document.body.classList.toggle('noc', noc);
  const stul = noc ? 'pozadi-noc' : 'pozadi-den';
  document.body.classList.toggle('stul', maIlustraci(stul));
  if (maIlustraci(stul)) document.body.style.setProperty('--stul', `url('ilustrace/${stul}.webp')`);
  if (noc) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1d1733');
}
setInterval(() => { const pred = document.body.classList.contains('noc'); nastavNoc(); if (pred !== jeNoc() && !jeNoc()) nastavSvet(p()); }, 60000);

// ---------- Vyskakovací výsledek battlu ----------
const frontaVysledku = [];
function ukazVysledek() {
  const x = p();
  if (!x || !frontaVysledku.length || document.querySelector('#hra') || document.querySelector('.popup-pozadi')) return;
  const b = frontaVysledku[0];
  // Počkat, až se načtou kamarádky (jinak by místo jména bylo „Kamarádka“), nejdéle ~4 s.
  if (!online.kamaradky.some(k => k.id === souperkaId(b, x.id)) && (b._cekal = (b._cekal || 0) + 1) < 8) return void setTimeout(ukazVysledek, 500);
  frontaVysledku.shift();
  const k = kamaradka(souperkaId(b, x.id));
  const a = mojeVysl(b, x.id).body || 0, o = mojeVysl(b, k.id).body || 0;
  const od = odmenaBattlu(b);
  const stav = a > o ? 'vyhra' : a < o ? 'prohra' : 'remiza';
  const nadpis = { vyhra: H.rod('[Vyhrál|Vyhrála] jsi! 👑', x), prohra: H.rod(`Tentokrát [vyhrál|vyhrála] ${k.prezdivka}`, k), remiza: 'Remíza!' }[stav];
  const text = stav === 'remiza' ? (b.typ === 'dama' ? 'Nikdo nevyhrál – dáma skončila remízou.' : H.nahodne(H.SOUBOJ.remiza))
    : b.typ === 'dama' ? H.rod(`${(stav === 'vyhra' ? x : k).prezdivka} [vyhrál|vyhrála] dámu! Odveta?`, stav === 'vyhra' ? x : k)
    : H.rod(H.dosad(H.nahodne(Math.abs(a - o) <= 150 ? H.SOUBOJ.tesne : H.SOUBOJ.jasne), { vitez: (stav === 'vyhra' ? x : k).prezdivka, porazena: (stav === 'vyhra' ? k : x).prezdivka }), stav === 'vyhra' ? x : k);
  const zisk = { vyhra: od.v, prohra: od.p, remiza: od.r }[stav];
  const karta = (h, sc, vitez) => `<div class="b-hracka${vitez ? ' vitez' : ''}">${vitez ? '<span class="korunka">👑</span>' : ''}<span class="avatar velky">${postavicka(h.vzhled, 86, 'hlava', true)}</span><b>${jmeno(h)}</b><span class="b-body">${sc}</span></div>`;
  const okno = document.createElement('div');
  okno.className = 'popup-pozadi';
  okno.innerHTML = `<div class="popup-karta ${stav}">
    <div class="popup-stuha">${b.typ === 'dama' ? 'Dáma' : b.typ === 'double' ? 'Double' : 'Výsledek battlu'}</div>
    <h1>${esc(nadpis)}</h1>
    <div class="b-vysledek">${karta(x, b.typ === 'dama' ? '' : a, a > o)}<span class="vs">vs</span>${karta(k, b.typ === 'dama' ? '' : o, o > a)}</div>
    <p class="hlaska">${esc(text)}</p>
    <div class="odmena"><span>${ikS('susenka', 30)} +${zisk}</span><small>${{ vyhra: 'za výhru', prohra: 'i prohra se počítá', remiza: 'za remízu' }[stav]}</small></div>
    <button class="btn velke" data-a="odveta">Odveta ⚔️</button>
    <button class="odkaz" data-a="zavrit">Zavřít</button></div>`;
  document.body.append(okno);
  if (stav === 'prohra') zvukSpatne(); else { konfety(); zvukFanfara(); }
  const zavri = () => { okno.classList.add('pryc'); setTimeout(() => { okno.remove(); ukazVysledek(); }, 250); };
  okno.querySelector('[data-a="zavrit"]').onclick = zavri;
  okno.querySelector('[data-a="odveta"]').onclick = () => { if (b.typ === 'kviz') zvolenaDelka = b.ulohy.length; zavri(); vybratVyzvu(x, k, b.typ); };
  okno.onclick = e => { if (e.target === okno) zavri(); };
}

function onlineSekce(x) {
  if (online.chyba) return `<div class="prazdne"><p>Kamarádi se teď nedají načíst. Jsi připojená k internetu?</p></div>`;
  const hrat = online.battly.filter(b => !mojeVysl(b, x.id).hotovo);
  const cekam = online.battly.filter(b => mojeVysl(b, x.id).hotovo && !oboHotovo(b));
  const hotove = online.battly.filter(oboHotovo);
  const skore = id => { const z = { v: 0, p: 0 }; hotove.filter(b => b.hraci.includes(id)).forEach(b => { const a = mojeVysl(b, x.id).body, o = mojeVysl(b, id).body; if (a > o) z.v++; else if (a < o) z.p++; }); return z; };
  const vyzva = b => VYZVY[b.hlaska] || VYZVY[0];
  return `
    ${hrat.length ? `<h2>Výzvy pro tebe</h2>${hrat.map(b => { const k = kamaradka(souperkaId(b, x.id)); const odMe = b.hraci[0] === x.id;
      if (b.typ === 'dama') { const tah = damaNaTahu(b, x.id);
        return `<div class="vyzva"><span class="avatar velky">${av(k, 60)}</span><div><b>Dáma 🍪 · ${jmeno(k)}</b>
          <small>${tah ? 'Jsi na tahu!' : `Na tahu je ${jmeno(k)}`}</small></div>
          <button class="btn${tah ? '' : ' vedlejsi'}" data-hrat="${b.id}">${tah ? 'Táhnout' : 'Deska'}</button></div>`; }
      return `<div class="vyzva"><span class="avatar velky">${av(k, 60)}</span><div><b>${odMe ? `Tvoje výzva · ${jmeno(k)}` : `${jmeno(k)} ${H.rod('[tě vyzval|tě vyzvala]', k)}!`}</b>
        <span class="vyzva-en">${esc(vyzva(b)[0])}</span><small>${esc(vyzva(b)[1])} · ${b.typ === 'double' ? 'Double 👀' : (DELKY.find(d => d.n === b.ulohy.length) || { nazev: b.ulohy.length + ' otázek' }).nazev}</small></div>
        <button class="btn" data-hrat="${b.id}">Hrát</button></div>`; }).join('')}` : ''}
    ${cekam.length ? `<div class="historie">${cekam.map(b => { const k = kamaradka(souperkaId(b, x.id)); const st = mojeVysl(b, k.id);
      return `<div class="h-radek"><span>${st.odpovezeno ? `${jmeno(k)} právě hraje 🔥` : `Čeká se, až zahraje ${jmeno(k)}`}</span><small>ty ⚡ ${mojeVysl(b, x.id).body}</small></div>`; }).join('')}</div>` : ''}
    <h2>Kamarádi</h2>
    ${online.kamaradky.length ? `<div class="profily">${online.kamaradky.map(k => { const z = skore(k.id);
      return `<div class="profil-karta"><span class="avatar velky">${av(k, 70)}</span><b>${jmeno(k)}</b><small>${esc(H.titul(k.susenkyCelkem || 0, k))} · ${z.v}:${z.p}</small>
        <button class="btn maly" data-vyzvat="${k.id}">Vyzvat ⚔️</button></div>`; }).join('')}</div>`
      : `<p class="drobne">Zatím žádné. Pošli kamarádce svůj kód, nebo zadej ten její.</p>`}
    <div class="muj-kod"><span>Tvůj kód</span><b>${esc(x.kod || '…')}</b><button class="btn vedlejsi maly" id="sdilet">Poslat</button></div>
    <div class="pridat-kod"><input id="kod" class="pole" maxlength="6" placeholder="Kód kamarádky" autocapitalize="characters" autocomplete="off"><button class="btn" id="pridat">Přidat</button></div>
    ${hotove.length ? `<h3>Výsledky</h3><div class="historie">${hotove.slice(0, 5).map(b => { const k = kamaradka(souperkaId(b, x.id)); const a = mojeVysl(b, x.id).body, o = mojeVysl(b, k.id).body;
      const hra = HRY[b.typ]?.ikona || '⚔️';
      return `<div class="h-radek"><span>${hra} ${a > o ? '👑 ' : ''}ty ${b.typ === 'dama' ? (a > o ? 'vyhráno' : a < o ? 'prohráno' : 'remíza') : `<b>${a}</b> : <b>${o}</b>`} ${jmeno(k)}</span><button class="odkaz" data-odveta="${k.id}" data-typ="${b.typ}">Odveta</button></div>`; }).join('')}</div>` : ''}`;
}

function napojOnlineSekci(x) {
  if (!x.online || !O.nakonfigurovano()) return;
  $$('[data-hrat]').forEach(b => (b.onclick = () => hrajOnline(x, online.battly.find(v => v.id === b.dataset.hrat))));
  $$('[data-vyzvat], [data-odveta]').forEach(b => (b.onclick = () => vybratVyzvu(x, kamaradka(b.dataset.vyzvat || b.dataset.odveta), b.dataset.typ)));
  $('#sdilet')?.addEventListener('click', () => {
    const text = `Hraj se mnou Biscuit! Můj kód je ${x.kod}. https://cihlarpavel.github.io/biscuit/`;
    if (navigator.share) navigator.share({ text }).catch(() => {});
    else navigator.clipboard?.writeText(text).then(() => toast('Zkopírováno'));
  });
  $('#pridat')?.addEventListener('click', async () => {
    const kod = $('#kod').value.trim();
    if (kod.length < 6) return toast('Kód má 6 znaků.');
    try { const k = await O.pridejKamaradku(x, kod); toast(`${k.prezdivka} je ${H.rod('[tvůj kamarád|tvoje kamarádka]', k)}! 🎉`); konfety(); $('#kod').value = ''; battle(); }
    catch (e) { toast(e.message || 'Přidání nevyšlo, zkus to znovu.'); }
  });
}

let zvolenaHra = 'kviz';
function vybratVyzvu(x, k, typ) {
  if (typ) zvolenaHra = typ;
  const damaZamcena = !hraOdemcena(x);
  obrazovka(`<section class="stranka">${zpet('#/battle')}
    <div class="vyzva-hlava"><span class="avatar obri">${postavicka(k.vzhled, 120)}</span><h1>Nová výzva ⚔️</h1><p class="titul">Soupeř: ${jmeno(k)}</p></div>
    <h3>Co budete hrát?</h3>
    <div class="delky hry-volba">${Object.entries(HRY).map(([id, h]) => `<button class="delka hra-typ${id === zvolenaHra ? ' on' : ''}${id === 'dama' && damaZamcena ? ' zamcena' : ''}" data-typ="${id}">
      <b>${h.ikona} ${h.nazev}</b><small>${id === 'dama' && damaZamcena ? '🔒 po splnění dnešního cíle' : h.popis}</small></button>`).join('')}</div>
    ${zvolenaHra === 'kviz' ? `<h3>Jak dlouhý?</h3>${volbaDelky()}` : `<p class="drobne">${zvolenaHra === 'dama'
      ? `Hrajete na střídačku, každý na svém mobilu – klidně i během dne. Začínáš ty (světlé sušenky). Výhra +${HRY.dama.odmena.v} 🍪.`
      : `Oba dostanete stejné karty a máte 60 vteřin. Kdo najde víc shod, vyhraje. Výhra +${HRY.double.odmena.v} 🍪.`}</p>`}
    <h3>Hláška pro soupeře</h3>
    <div class="seznam">${VYZVY.map(([en, cz], i) => `<button class="moznost hlaska-vyzvy" data-i="${i}"><b>${esc(en)}</b><small>${esc(cz)}</small></button>`).join('')}</div>
  </section>`, { bezListy: true });
  napojVolbuDelky();
  $$('.hra-typ').forEach(b => (b.onclick = () => {
    if (b.dataset.typ === 'dama' && damaZamcena) return toast('Dámu odemkneš splněním dnešních minut učení 💪');
    zvolenaHra = b.dataset.typ; const app = document.getElementById('app'), top = app.scrollTop; vybratVyzvu(x, k); app.scrollTop = top;
  }));
  $$('.hlaska-vyzvy').forEach(b => (b.onclick = async () => {
    if (zvolenaHra === 'dama' && damaZamcena) return toast('Dámu odemkneš splněním dnešních minut učení 💪');
    b.disabled = true;
    try {
      let ulohy = [], navic = {};
      if (zvolenaHra === 'kviz') ulohy = sestavBattle(x, { nastaveni: { unit: k.unit || 1, vsechnyUnity: false } }, zvolenaDelka);
      if (zvolenaHra === 'double') ulohy = sestavDouble(odemcene(x).flatMap(polozky));
      const id = await O.vyzvi(x, k, ulohy, +b.dataset.i, zvolenaHra, navic);
      hrajOnline(x, { id, typ: zvolenaHra, ulohy, hraci: [x.id, k.id], vysledky: {}, dama: null });
    } catch { toast('Výzva se neodeslala. Jsi online?'); b.disabled = false; }
  }));
}

function hrajOnline(x, b) {
  if (!b) return battle();
  const sid = souperkaId(b, x.id);
  const k = kamaradka(sid);
  if (b.typ === 'dama') {
    stopHry();
    stopHry = hrajDamu({ b, ja: stranaDamy(b, x.id), mojeId: x.id, souperId: sid, ja_profil: x, souper: k });
    return;
  }
  if (b.typ === 'double') {
    if (mojeVysl(b, x.id).hotovo) return cekaniNaVysledek(x, b.id, k, () => {});
    nastavUceni(true);
    return hrajDouble({ data: b.ulohy, souperJmeno: k.prezdivka, konec: (body, chyby) => {
      nastavUceni(false);
      O.zapisPrubeh(b.id, x.id, { body, spravne: body, odpovezeno: body + chyby, hotovo: true }, !!mojeVysl(b, sid).hotovo).catch(() => {});
      cekaniNaVysledek(x, b.id, k, () => {});
    } });
  }
  let posledni = b;
  nastavSoupere({ jmeno: k.prezdivka, celkem: b.ulohy.length, odpovezeno: 0, body: 0, hotovo: false, ...mojeVysl(b, sid) });
  const stop = O.sledujBattle(b.id, nb => { posledni = nb; nastavSoupere({ ...mojeVysl(nb, sid), celkem: nb.ulohy.length }); });
  nastavUceni(true);
  hraj(b.ulohy, {
    battle: true, nazev: `vs ${k.prezdivka}`, profil: x, souper: true,
    priOdpovedi: (u, ok, prvni, st) => {
      const d = S.den(x); ok ? d.ok++ : d.chyby++;
      O.zapisPrubeh(b.id, x.id, { body: st.body, spravne: st.spravne, odpovezeno: st.odpovezeno, hotovo: false }).catch(() => {});
    },
    konec: v => {
      nastavUceni(false);
      // I při vzdání se kolo uzavře, jinak by battle visel napořád.
      O.zapisPrubeh(b.id, x.id, { body: v.body, spravne: v.spravne, odpovezeno: b.ulohy.length, hotovo: true }, !!mojeVysl(posledni, sid).hotovo).catch(() => {});
      cekaniNaVysledek(x, b.id, k, stop);
    },
  });
}

function cekaniNaVysledek(x, id, k, stopHra) {
  stopHra();
  const vykresli = b => {
    if (b && oboHotovo(b)) { stop(); return jdi('#/battle'); } // výsledek ukáže vyskakovací okno
    const st = b ? mojeVysl(b, k.id) : {};
    obrazovka(`<section class="stranka konec cekani">${zpet('#/battle')}<span class="avatar obri">${postavicka(k.vzhled, 120)}</span>
      <h1>${st.odpovezeno ? `${jmeno(k)} právě hraje 🔥` : `Čeká se, až zahraje ${jmeno(k)}`}</h1>
      <p class="hlaska">Tvoje body: ⚡ ${b ? mojeVysl(b, x.id).body : '…'}</p>
      <p class="drobne">Výsledek se ukáže, až ${jmeno(k)} dohraje. Klidně zatím dělej něco jiného, výsledek ti přijde.</p>
      <a class="btn velke" href="#/">Jdu dál</a></section>`, { bezListy: true });
  };
  vykresli(null);
  const stop = O.sledujBattle(id, b => { if (location.hash.startsWith('#/lekce')) return; if (document.querySelector('.cekani')) vykresli(b); });
}


// ---------- Holka, nebo kluk (jednou u profilů založených dřív) ----------
// Postavička je od 2. 10. sušenka. Staré věci z Drip shopu na ni nepasují, takže se za ně vrátí sušenky
// (bez navýšení susenkyCelkem – nejsou nově vydělané) a postavička se oblékne do věcí zdarma.
function prevedNaSusenku(x) {
  const vraceno = x.koupeno.reduce((s, id) => s + (STARE_CENY[id] || 0), 0);
  x.susenky += vraceno;
  x.koupeno = [];
  x.vzhled = { ...nahodnyVzhled(x.rod), seminko: x.vzhled.seminko || noveSeminko() };
  S.uloz();
  setTimeout(() => toast(vraceno ? `Drip shop má nový sortiment! Za staré věci ti vracím ${vraceno} 🍪` : 'Drip shop má nový sortiment 🍪'), 900);
}

function otazkaRod(x) {
  obrazovka(`<section class="stranka konec"><span class="avatar obri">${postavicka(x.vzhled, 120)}</span>
    <h1>Ještě jedna věc 🙂</h1><p class="hlaska">Jsi holka, nebo kluk? Ať ti aplikace píše správně.</p>
    <div class="rod-volba velka"><button data-rod="z">👧 Holka</button><button data-rod="m">👦 Kluk</button></div></section>`, { bezListy: true });
  $$('.rod-volba button').forEach(b => (b.onclick = () => { x.rod = b.dataset.rod; S.uloz(); route(); }));
}

// ---------- Schovaná zlatá sušenka (překvapení) ----------
// Některé dny (asi 4 z 10) se po první lekci schová na náhodné obrazovce. Kde a kdy, je dané
// přezdívkou a datem, takže se během dne nestěhuje. Po nalezení spustí Bleskovku.
const hashTxt = t => [...t].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0, 7);
function schovanaDnes(x) {
  if (x.bonus?.den === S.dnes() || !S.den(x).lekce) return null;
  const h = hashTxt(x.id + S.dnes());
  if (h % 100 >= 40) return null;
  return { tab: ['domu', 'ja', 'zebricek', 'battle'][(h >>> 7) % 4], top: 15 + (h >>> 11) % 70, vlevo: (h >>> 17) % 2 === 0 };
}
function vlozSchovanou(tab) {
  const x = p();
  const s = x && schovanaDnes(x);
  if (!s || s.tab !== tab) return;
  const b = document.createElement('button');
  b.className = 'schovana ' + (s.vlevo ? 'vlevo' : 'vpravo');
  b.style.top = s.top + '%';
  b.setAttribute('aria-label', 'Co to je?');
  b.innerHTML = ik('zlata', 46, { podklad: false });
  b.onclick = () => nalezena(x);
  $('#app section.stranka')?.append(b);
}
function nalezena(x) {
  obrazovka(`<section class="stranka konec">${zpet('#/', 'Teď ne')}
    <div class="zlata-velka">${ik('zlata', 140, { podklad: false })}</div>
    <h1>${H.rod('[Našel|Našla]', x)} jsi zlatou sušenku!</h1>
    <p class="hlaska">Bleskovka: 6 otázek za 40 sekund. Každá správně = 2 sušenky, všechny správně = +10 navíc.</p>
    <button class="btn velke" id="bleskovka">Jdu do toho ⚡</button></section>`, { bezListy: true });
  konfety(); zvukFanfara();
  $('#bleskovka').onclick = () => bleskovka(x);
}
function bleskovka(x) {
  x.bonus = { den: S.dnes() };
  S.uloz();
  const ulohy = sestavBattle(x, x, 6);
  nastavUceni(true);
  hraj(ulohy, {
    battle: true, limit: 40, nazev: 'Bleskovka ⚡', profil: x,
    priOdpovedi: (u, ok) => { const d = S.den(x); ok ? d.ok++ : d.chyby++; },
    konec: v => {
      nastavUceni(false);
      if (v.preruseno) return jdi('#/');
      const vse = v.spravne === ulohy.length;
      const zisk = Math.floor(v.spravne / 2) + (vse ? ODMENY.bleskovkaVse : 0);
      S.pridej(x, zisk);
      const nove = zkontroluj(x);
      S.uloz();
      obrazovka(`<section class="stranka konec">${zpet('#/', 'Domů')}${maskot(140, vse ? 'mrk' : 'radost')}
        <h1>${vse ? 'Všechno správně! 🤯' : v.casVyprsel ? 'Čas vypršel!' : 'Hotovo!'}</h1>
        <div class="odmena"><span>${ikS('susenka', 34)} +${zisk}</span><small>${v.spravne} z ${ulohy.length} správně${vse ? ` + bonus ${ODMENY.bleskovkaVse}` : ''}</small></div>
        <p class="drobne">Zlatá sušenka se zase někdy schová. Kdy a kde, to nikdo neví 🤫</p>
        ${nove.map(o => `<div class="novy-odznak"><span>${ikOdznaku(o, 48)}</span><div><small>Nový odznak!</small><b>${esc(o.nazev)}</b></div></div>`).join('')}
        <a class="btn velke" href="#/">Hotovo</a></section>`, { bezListy: true });
      konfety(); zvukFanfara();
    },
  });
}

route();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
