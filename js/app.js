// Biscuit – obrazovky a navigace.
import * as S from './store.js';
import { SKUPINY, BALICKY, balicek, polozky } from './data.js';
import { postavicka, KATEGORIE, VECI, vec, maVec, nahodnyVzhled, vzacnost } from './postavicka.js';
import { sestav, sestavBattle, odemcene, zapis, postupBalicku, slabiny, UMI } from './lekce.js';
import { hraj } from './hra.js';
import { nastavUceni } from './cas.js';
import { odemkni, speak, zvukFanfara } from './speech.js';
import { ODZNAKY, zkontroluj } from './odznaky.js';
import { maskot, POZADI } from './maskot.js';
import * as H from './hlasky.js';
import { obrazovka, esc, $, $$, kolecko, minuty, toast, konfety, zpet } from './ui.js';
import { ik, maIkonu } from './ikony.js';

document.documentElement.style.setProperty('--pozadi-kresby', POZADI);
addEventListener('pointerdown', odemkni, { once: true });
$$('#tabs a[data-ik]').forEach(a => (a.querySelector('span').innerHTML = ik(a.dataset.ik, a.classList.contains('stred') ? 40 : 32, { podklad: false })));
// Na záložce Já je vlastní postavička (překreslí se při každé změně obrazovky).
const tabJa = () => { const x = p(); $('#tabs [data-tab="ja"] span').innerHTML = x ? postavicka(x.vzhled, 32, 'hlava') : ik('ja', 32, { podklad: false }); };
const ikBalicku = (b, px = 40) => maIkonu(b.id) ? ik(b.id, px) : b.ikona;

const p = () => S.profil();
const jmeno = x => esc(x.prezdivka);
// Malá postavička (hlava) do seznamů, velká celá na profil.
const av = (x, px = 42) => postavicka(x.vzhled, px, 'hlava');

// ---------- Navigace ----------
const TRASY = {
  '': domu, profily, novy, balicek: detailBalicku, lekce: spustLekci, battle, zebricek, ja, obchod, rodic,
};
function route() {
  nastavUceni(false);
  tabJa();
  const [cesta, arg] = location.hash.replace(/^#\/?/, '').split('/');
  if (!S.profily().length && cesta !== 'novy') return obrazovkaVitej();
  if (!p() && cesta !== 'novy') return profily();
  (TRASY[cesta] || domu)(arg && decodeURIComponent(arg));
}
addEventListener('hashchange', route);
const jdi = h => { if (location.hash === h) route(); else location.hash = h; };

// ---------- Hlavička ----------
function hlavicka(x) {
  return `<header class="hlavicka">
    <a href="#/profily" class="kdo"><span class="avatar">${av(x)}</span>
      <span><b>${jmeno(x)}</b><small>${esc(H.titul(x.susenky))}</small></span></a>
    <span class="stat">${ik('ohen', 22, { podklad: false })} ${S.serie(x)}</span><span class="stat">${ik('susenka', 22, { podklad: false })} ${x.susenky}</span></header>`;
}

// ---------- Úvod a profily ----------
function obrazovkaVitej() {
  obrazovka(`<section class="vitej">${maskot(170)}
    <h1>Biscuit</h1><p class="podtitul">Angličtina po kouscích. Za každý dostaneš sušenku 🍪</p>
    <a class="btn velke" href="#/novy">Jdeme na to</a></section>`, { bezListy: true });
}

function profily() {
  const vse = S.profily();
  obrazovka(`<section class="stranka">${p() ? zpet('#/') : ''}<h1>Kdo hraje?</h1>
    <div class="profily">${vse.map(x => `<button class="profil-karta" data-id="${x.id}">
      <span class="avatar velky">${av(x, 70)}</span><b>${jmeno(x)}</b><small>${esc(H.titul(x.susenky))}</small></button>`).join('')}
      <a class="profil-karta pridat" href="#/novy"><span class="avatar velky">＋</span><b>Přidat kamarádku</b><small>nebo kamaráda</small></a>
    </div></section>`, { bezListy: true });
  $$('.profil-karta[data-id]').forEach(b => (b.onclick = () => { S.prepni(b.dataset.id); jdi('#/'); }));
}

function novy() {
  let vzhled = nahodnyVzhled();
  obrazovka(`<section class="stranka">${S.profily().length ? zpet(p() ? '#/profily' : '#/profily') : ''}
    <div class="maskot-bublina">${maskot(80, 'mrk')}<div class="bublina">Jak ti mám říkat? Stačí přezdívka.</div></div>
    <input id="prezdivka" class="pole" maxlength="14" placeholder="Přezdívka" autocomplete="off">
    <div class="nova-postavicka"><div id="nahled">${postavicka(vzhled, 150)}</div>
      <button class="btn vedlejsi" id="jina">🎲 Jiná</button></div>
    <p class="drobne">Tohle je tvoje postavička. Oblečení, brýle, čepice a mazlíčky jí koupíš za sušenky v Drip shopu.</p>
    <button class="btn velke" id="hotovo">Hotovo</button>
    </section>`, { bezListy: true });
  $('#jina').onclick = () => { vzhled = nahodnyVzhled(); $('#nahled').innerHTML = postavicka(vzhled, 150); };
  $('#hotovo').onclick = () => {
    const n = $('#prezdivka').value.trim();
    if (!n) return toast('Napiš přezdívku 🙂');
    S.novyProfil(n, vzhled);
    jdi('#/');
  };
}

// ---------- Domů ----------
function domu() {
  const x = p();
  const d = S.den(x);
  const cil = x.nastaveni.cil;
  const hotovo = d.s >= cil * 60;
  const unitTed = BALICKY.find(b => b.unit === x.nastaveni.unit);
  const pozdrav = hotovo ? H.nahodne(H.CIL_SPLNEN) : S.serie(x) >= 2 ? H.dosad(H.nahodne(H.SERIE), { n: S.serie(x) }) : H.dosad(H.nahodne(H.POZDRAVY), { jmeno: x.prezdivka });
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
      ${kolecko(d.s / (cil * 60), `<b>${minuty(d.s)}</b><small>z ${cil} min</small>`)}
      <div class="dnes-text"><h3>Dnešní lekce</h3>
        <p>${unitTed ? `Nová slovíčka z Unit ${unitTed.unit} + opakování + něco navíc` : 'Opakování a něco navíc'}</p>
        <a class="btn" href="#/lekce">${hotovo ? 'Ještě jednu' : 'Jdeme na to'} →</a></div>
    </div>
    ${skupiny}</section>`, { tab: 'domu' });
  vlozSchovanou('domu');
  $$('[data-zamceno]').forEach(a => (a.onclick = e => { e.preventDefault(); toast('Tohle ve škole přijde později. Odemkne se v sekci Pro rodiče.'); }));
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
function spustLekci(idBalicku) {
  const x = p();
  const ulohy = sestav(x, idBalicku || null);
  const cilPred = S.den(x).s >= x.nastaveni.cil * 60;
  nastavUceni(true);
  hraj(ulohy, {
    nazev: idBalicku ? balicek(idBalicku)?.nazev : 'Dnešní lekce',
    priOdpovedi: (u, ok, prvni) => {
      if (u.polozka?.id && prvni) zapis(x, u.polozka, ok);
      const d = S.den(x);
      ok ? d.ok++ : d.chyby++;
      if (ok && prvni) x.susenky += u.zlata ? 5 : 1;
      S.uloz();
    },
    konec: v => {
      nastavUceni(false);
      // Představená slovíčka se zapíšou, i když se lekce přeruší.
      ulohy.filter(u => u.typ === 'nove' && !x.srs[u.polozka.id]).forEach(u => (x.srs[u.polozka.id] = { b: 0, due: 0, ok: 0, chyby: 0 }));
      if (v.preruseno) { S.uloz(); return jdi('#/'); }
      const d = S.den(x);
      d.lekce++;
      let bonus = 5 + (v.perfekt ? 5 : 0);
      const cilTed = !cilPred && d.s >= x.nastaveni.cil * 60;
      if (cilTed) bonus += 10;
      x.susenky += bonus;
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
    <h1>${esc(H.nahodne(H.KONEC_LEKCE[druh]))}</h1>
    <div class="odmena"><span>🍪 +${v.susenky + bonus}</span><small>${v.susenky} za odpovědi, ${bonus} bonus${cilTed ? ' (vč. denního cíle!)' : ''}</small></div>
    ${kolecko(d.s / (x.nastaveni.cil * 60), `<b>${minuty(d.s)}</b><small>z ${x.nastaveni.cil} min</small>`, 110)}
    ${cilTed ? `<p class="hlaska">${esc(H.nahodne(H.CIL_SPLNEN))}</p>` : ''}
    ${nove.map(o => `<div class="novy-odznak"><span>${o.ikona}</span><div><small>Nový odznak!</small><b>${esc(o.nazev)}</b></div></div>`).join('')}
    <a class="btn velke" href="#/">Hotovo</a>
    <a class="odkaz" href="#/lekce">Ještě jednu lekci</a></section>`, { bezListy: true });
  if (v.perfekt || cilTed || nove.length) { konfety(); zvukFanfara(); }
}

// ---------- Battle ----------
function battle() {
  const x = p();
  const ostatni = S.profily().filter(o => o.id !== x.id);
  const historie = (S.data().battly || []).filter(b => b.a === x.id || b.b === x.id).slice(-5).reverse();
  const jm = id => esc(S.profil(id)?.prezdivka || '?');
  obrazovka(`${hlavicka(x)}<section class="stranka">
    <h1>Battle ⚔️</h1>
    <p class="drobne">Holka proti holce na jednom telefonu. Stejné otázky, rozhoduje správnost a rychlost.</p>
    ${ostatni.length ? `<h3>Koho vyzveš?</h3><div class="profily">${ostatni.map(o => {
      const z = vzajemne(x.id, o.id);
      return `<button class="profil-karta" data-id="${o.id}"><span class="avatar velky">${av(o, 70)}</span><b>${jmeno(o)}</b>
        <small>${z.v}:${z.p}${z.r ? ` (${z.r}× remíza)` : ''}</small></button>`;
    }).join('')}</div>` : `<div class="prazdne">${maskot(90, 'hmm')}<p>Zatím tu nikdo jiný není. Přidej kamarádku a můžete to rozjet.</p></div>`}
    <a class="btn vedlejsi" href="#/novy">＋ Přidat kamarádku</a>
    ${historie.length ? `<h3>Poslední battly</h3><div class="historie">${historie.map(b => `<div class="h-radek">
      <span>${jm(b.a)} <b>${b.sa}</b> : <b>${b.sb}</b> ${jm(b.b)}</span><small>${b.datum}</small></div>`).join('')}</div>` : ''}
  </section>`, { tab: 'battle' });
  vlozSchovanou('battle');
  $$('.profil-karta[data-id]').forEach(b => (b.onclick = () => hrajBattle(x, S.profil(b.dataset.id))));
}

function vzajemne(a, b) {
  const z = { v: 0, p: 0, r: 0 };
  for (const x of S.data().battly || []) {
    if (!((x.a === a && x.b === b) || (x.a === b && x.b === a))) continue;
    const moje = x.a === a ? x.sa : x.sb, jeji = x.a === a ? x.sb : x.sa;
    moje > jeji ? z.v++ : moje < jeji ? z.p++ : z.r++;
  }
  return z;
}

function hrajBattle(h1, h2) {
  const ulohy = sestavBattle(h1, h2);
  const puvodni = S.data().aktivni;
  const skore = [];
  const kolo = (hracka, hotovo) => {
    obrazovka(`<section class="stranka predej">${zpet('#/battle', 'Zrušit')}<span class="avatar obri">${postavicka(hracka.vzhled, 120)}</span>
      <h1>${esc(H.dosad(H.nahodne(H.PREDEJ), { jmeno: hracka.prezdivka }))}</h1>
      <p class="drobne">${ulohy.length} otázek. Rychlost se počítá.</p>
      <button class="btn velke" id="start">Jsem ${jmeno(hracka)}, start!</button></section>`, { bezListy: true });
    $('#start').onclick = () => {
      S.prepni(hracka.id); // čas učení se počítá té, která právě hraje
      nastavUceni(true);
      hraj(ulohy, {
        battle: true, nazev: hracka.prezdivka,
        priOdpovedi: (u, ok) => { const d = S.den(hracka); ok ? d.ok++ : d.chyby++; },
        konec: v => { nastavUceni(false); S.prepni(puvodni); hotovo(v); },
      });
    };
  };
  kolo(h1, v1 => {
    if (v1.preruseno) return jdi('#/battle');
    skore.push(v1.body);
    kolo(h2, v2 => {
      if (v2.preruseno) return jdi('#/battle');
      skore.push(v2.body);
      vysledekBattlu(h1, h2, skore);
    });
  });
}

function vysledekBattlu(h1, h2, [s1, s2]) {
  const data = S.data();
  (data.battly ||= []).push({ a: h1.id, b: h2.id, sa: s1, sb: s2, datum: S.dnes() });
  data.battly = data.battly.slice(-200);
  let text;
  if (s1 === s2) {
    text = H.nahodne(H.SOUBOJ.remiza);
    [h1, h2].forEach(h => { h.souboje.remizy++; h.susenky += 5; });
  } else {
    const [v, pr] = s1 > s2 ? [h1, h2] : [h2, h1];
    const rozdil = Math.abs(s1 - s2);
    text = H.dosad(H.nahodne(rozdil <= 150 ? H.SOUBOJ.tesne : H.SOUBOJ.jasne), { vitez: v.prezdivka, porazena: pr.prezdivka });
    v.souboje.vyhry++; v.susenky += 10;
    pr.souboje.prohry++; pr.susenky += 3;
  }
  const nove = [h1, h2].flatMap(h => zkontroluj(h).map(o => ({ ...o, kdo: h })));
  S.uloz();
  const karta = (h, s, vyhra) => `<div class="b-hracka${vyhra ? ' vitez' : ''}"><span class="avatar velky">${av(h, 70)}</span>
    <b>${jmeno(h)}</b><span class="b-body">${s}</span>${vyhra ? '<span class="korunka">👑</span>' : ''}</div>`;
  obrazovka(`<section class="stranka konec">${zpet('#/battle')}
    <h1>Výsledek</h1>
    <div class="b-vysledek">${karta(h1, s1, s1 > s2)}<span class="vs">vs</span>${karta(h2, s2, s2 > s1)}</div>
    <p class="hlaska">${esc(text)}</p>
    <p class="drobne">Výhra 🍪 +10, prohra 🍪 +3, remíza 🍪 +5</p>
    ${nove.map(o => `<div class="novy-odznak"><span>${o.ikona}</span><div><small>${jmeno(o.kdo)} má nový odznak!</small><b>${esc(o.nazev)}</b></div></div>`).join('')}
    <button class="btn velke" id="odveta">Odveta ⚔️</button>
    <a class="odkaz" href="#/battle">Konec</a></section>`, { bezListy: true });
  konfety(); zvukFanfara();
  $('#odveta').onclick = () => hrajBattle(h2, h1);
}

// ---------- Žebříček ----------
function zebricek() {
  const x = p();
  const vse = S.profily();
  const kategorie = [
    { ikona: '🍪', nazev: 'Nejvíc sušenek', hodnota: o => o.susenky, fmt: n => n,
      vtip: (v, n) => `${v} vede o ${n} 🍪. Ostatní zatím jen drobí.` },
    { ikona: '🔥', nazev: 'Nejdelší série teď', hodnota: o => S.serie(o), fmt: n => `${n} dní`,
      vtip: v => `${v} je on fire. Doslova.` },
    { ikona: '⏱️', nazev: 'Minuty tento týden', hodnota: o => minuty(S.tydenSekund(o)), fmt: n => `${n} min`,
      vtip: (v, n) => `${v} se učila o ${n} minut víc. Podezřelé. Možná je to robot 🤖` },
    { ikona: '🧠', nazev: 'Umí slovíček', hodnota: o => S.umiSlov(o), fmt: n => n,
      vtip: (v, n) => `${v} umí o ${n} slovíček víc. Chodící slovník.` },
    { ikona: '⚔️', nazev: 'Výhry v battlech', hodnota: o => o.souboje.vyhry, fmt: n => n,
      vtip: v => `${v} je postrach battlů.` },
  ];
  const medaile = ['🥇', '🥈', '🥉'];
  const karty = kategorie.map(k => {
    const serazene = [...vse].sort((a, b) => k.hodnota(b) - k.hodnota(a));
    const [prvni, druha] = serazene;
    const rozdil = druha ? k.hodnota(prvni) - k.hodnota(druha) : 0;
    const vtip = vse.length > 1 && rozdil > 0 ? k.vtip(prvni.prezdivka, rozdil) : vse.length > 1 ? 'Zatím nerozhodně. Napínavé.' : '';
    return `<div class="z-karta"><h3>${k.ikona} ${k.nazev}</h3>
      ${serazene.map((o, i) => `<div class="z-radek${o.id === x.id ? ' ja' : ''}"><span class="z-poradi">${medaile[i] || i + 1}</span>
        <span class="avatar">${av(o, 34)}</span><span class="z-jmeno">${jmeno(o)}</span><b>${k.fmt(k.hodnota(o))}</b></div>`).join('')}
      ${vtip ? `<p class="z-vtip">${esc(vtip)}</p>` : ''}</div>`;
  }).join('');
  obrazovka(`${hlavicka(x)}<section class="stranka"><h1>Žebříček 🏆</h1>
    ${vse.length < 2 ? `<div class="prazdne">${maskot(90, 'hmm')}<p>Zatím jsi tu sama. Vyhráváš všechno, ale to se nepočítá 😅</p>
      <a class="btn" href="#/novy">＋ Přidat kamarádku</a></div>` : ''}
    ${karty}</section>`, { tab: 'zebricek' });
  vlozSchovanou('zebricek');
}

// ---------- Já ----------
function ja() {
  const x = p();
  const dny = [];
  const d = new Date();
  d.setDate(d.getDate() - 6);
  for (let i = 0; i < 7; i++) { dny.push({ k: S.dnes(d), nazev: d.toLocaleDateString('cs-CZ', { weekday: 'short' }) }); d.setDate(d.getDate() + 1); }
  const maxMin = Math.max(x.nastaveni.cil, ...dny.map(k => minuty(x.dny[k.k]?.s || 0)));
  const ziskane = ODZNAKY.filter(o => x.odznaky[o.id]);
  const zbyvajici = ODZNAKY.filter(o => !x.odznaky[o.id] && !o.id.startsWith('mistr-'));
  obrazovka(`${hlavicka(x)}<section class="stranka">
    <div class="ja-hlava"><span class="avatar obri">${postavicka(x.vzhled, 120)}</span><h1>${jmeno(x)}</h1><p class="titul">${esc(H.titul(x.susenky))}</p>
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
    <h2>Odznaky <small>${ziskane.length}</small></h2>
    <div class="odznaky">${ziskane.map(o => `<div class="odznak"><span>${o.ikona}</span><b>${esc(o.nazev)}</b><small>${esc(o.popis)}</small></div>`).join('')}
      ${zbyvajici.map(o => `<div class="odznak zamceny"><span>${o.ikona}</span><b>${esc(o.nazev)}</b><small>${esc(o.popis)}</small></div>`).join('')}</div>
    <div class="tlacitka">
      <a class="btn vedlejsi" href="#/profily">Přepnout profil</a>
      <a class="odkaz" href="#/rodic">Pro rodiče</a></div>
  </section>`, { tab: 'ja' });
  vlozSchovanou('ja');
}

// ---------- Drip shop (šatník postavičky ve stylu Pou) ----------
let satnikKat = 'obleceni';
function obchod() {
  const x = p();
  let zkouska = { ...x.vzhled };
  const kat = KATEGORIE.find(k => k.id === satnikKat);

  const vykresli = () => {
    const veci = VECI.filter(v => v.kat === kat.id).sort((a, b) => a.cena - b.cena);
    const zkousenaVec = vec(zkouska[kat.id]);
    const nekoupena = zkousenaVec && !maVec(x, zkousenaVec) ? zkousenaVec : null;
    obrazovka(`${hlavicka(x)}<section class="stranka satnik">
      <h1 class="drip-nadpis">Drip shop</h1>
      <div class="satnik-nahled">${postavicka(zkouska, 250)}</div>
      <div class="kategorie">${KATEGORIE.map(k => `<button class="kat${k.id === kat.id ? ' on' : ''}" data-k="${k.id}"><span>${k.ikona}</span>${esc(k.nazev)}</button>`).join('')}</div>
      <div class="veci">
        ${kat.povinne ? '' : `<button class="vec${!zkouska[kat.id] ? ' on' : ''}" data-v=""><span class="vec-nic">✕</span><small>Nic</small></button>`}
        ${veci.map(v => `<button class="vec${zkouska[kat.id] === v.id ? ' on' : ''}${maVec(x, v) ? '' : ' cizi'}" data-v="${v.id}">
          ${postavicka({ ...x.vzhled, [kat.id]: v.id }, 74, kat.hlava ? 'hlava' : 'cela')}
          <small>${esc(v.nazev)}</small>
          ${maVec(x, v) ? '' : `<span class="cena">🍪 ${v.cena}</span>`}
          ${v.cena ? `<span class="vzacnost" style="color:${vzacnost(v.cena).barva}">${vzacnost(v.cena).nazev}</span>` : ''}</button>`).join('')}
      </div>
      <div class="satnik-lista">${nekoupena
        ? `<button class="btn velke" id="koupit">${x.susenky >= nekoupena.cena ? `Koupit ${esc(nekoupena.nazev)} za 🍪 ${nekoupena.cena}` : `Chybí ti 🍪 ${nekoupena.cena - x.susenky}`}</button>`
        : `<button class="btn vedlejsi" id="mix">🎲 Náhodný mix z mých věcí</button>`}</div>
    </section>`, { tab: 'drip' });

    $('.kat.on')?.scrollIntoView({ inline: 'center', block: 'nearest' });
    $$('.kat').forEach(b => (b.onclick = () => { satnikKat = b.dataset.k; obchod(); }));
    $$('.vec').forEach(b => (b.onclick = () => {
      const v = b.dataset.v ? vec(b.dataset.v) : null;
      zkouska = { ...zkouska, [kat.id]: v?.id || null };
      // Co už má, si rovnou oblékne (a uloží). Nekoupené jen zkouší.
      if (!v || maVec(x, v)) { x.vzhled = { ...x.vzhled, [kat.id]: v?.id || null }; S.uloz(); }
      const top = document.getElementById('app').scrollTop;
      vykresli();
      document.getElementById('app').scrollTop = top;
    }));
    const mix = $('#mix');
    if (mix) mix.onclick = () => {
      const novy = {};
      for (const k of KATEGORIE) {
        const moje = VECI.filter(v => v.kat === k.id && maVec(x, v));
        const nic = !k.povinne && Math.random() < 0.5;
        novy[k.id] = nic || !moje.length ? (k.povinne ? x.vzhled[k.id] : null) : moje[Math.floor(Math.random() * moje.length)].id;
      }
      x.vzhled = novy; zkouska = { ...novy }; S.uloz(); vykresli();
    };
    const koupit = $('#koupit');
    if (koupit) koupit.onclick = () => {
      if (x.susenky < nekoupena.cena) return toast('Ještě pár lekcí a je to tvoje 💪');
      x.susenky -= nekoupena.cena;
      x.koupeno.push(nekoupena.id);
      x.vzhled = { ...x.vzhled, [kat.id]: nekoupena.id };
      S.uloz();
      konfety(); zvukFanfara();
      toast(`${nekoupena.nazev} je tvoje! ✨`);
      vykresli();
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
      <label>Denní cíl <select data-k="cil">${[5, 10, 15, 20, 30].map(n => `<option ${o.nastaveni.cil === n ? 'selected' : ''} value="${n}">${n} min</option>`).join('')}</select></label>
      <label class="prepinac"><input type="checkbox" data-k="vsechnyUnity" ${o.nastaveni.vsechnyUnity ? 'checked' : ''}> Odemknout všechny lekce dopředu</label>
      <button class="odkaz cervene" data-smazat="${o.id}">Smazat profil</button></div>`;
  }).join('');
  obrazovka(`<section class="stranka">${zpet('#/ja')}<h1>Pro rodiče</h1>
    <p class="drobne">Čas se počítá jen při aktivním učení: po 45 s bez klepnutí nebo s aplikací na pozadí se zastaví.</p>
    ${karty}
    <h3>Záloha</h3><p class="drobne">Všechno je jen v tomhle telefonu. Zálohu si ulož třeba do Souborů.</p>
    <div class="tlacitka"><button class="btn vedlejsi" id="zaloha">Stáhnout zálohu</button>
      <label class="btn vedlejsi">Obnovit ze zálohy<input type="file" id="obnova" accept=".json,application/json" hidden></label>
      <button class="btn vedlejsi" id="zmenapin">Změnit PIN</button></div></section>`, { bezListy: true });
  $$('.r-karta select, .r-karta input').forEach(el => (el.onchange = () => {
    const o = S.profil(el.closest('.r-karta').dataset.id);
    o.nastaveni[el.dataset.k] = el.type === 'checkbox' ? el.checked : +el.value;
    S.uloz();
    toast('Uloženo');
  }));
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
    <h1>Našla jsi zlatou sušenku!</h1>
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
    battle: true, limit: 40, nazev: 'Bleskovka ⚡',
    priOdpovedi: (u, ok) => { const d = S.den(x); ok ? d.ok++ : d.chyby++; },
    konec: v => {
      nastavUceni(false);
      if (v.preruseno) return jdi('#/');
      const vse = v.spravne === ulohy.length;
      const zisk = v.spravne * 2 + (vse ? 10 : 0);
      x.susenky += zisk;
      const nove = zkontroluj(x);
      S.uloz();
      obrazovka(`<section class="stranka konec">${zpet('#/', 'Domů')}${maskot(140, vse ? 'mrk' : 'radost')}
        <h1>${vse ? 'Všechno správně! 🤯' : v.casVyprsel ? 'Čas vypršel!' : 'Hotovo!'}</h1>
        <div class="odmena"><span>🍪 +${zisk}</span><small>${v.spravne} z ${ulohy.length} správně${vse ? ' + bonus 10' : ''}</small></div>
        <p class="drobne">Zlatá sušenka se zase někdy schová. Kdy a kde, to nikdo neví 🤫</p>
        ${nove.map(o => `<div class="novy-odznak"><span>${o.ikona}</span><div><small>Nový odznak!</small><b>${esc(o.nazev)}</b></div></div>`).join('')}
        <a class="btn velke" href="#/">Hotovo</a></section>`, { bezListy: true });
      konfety(); zvukFanfara();
    },
  });
}

route();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
