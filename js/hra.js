// Přehrávání lekce (a jednoho kola battlu): jedna úloha za druhou.
import { obrazovka, esc, $, $$, konfety } from './ui.js';
import { speak, zvukSpravne, zvukSpatne } from './speech.js';
import { nahodne, rod, SPRAVNE, SPATNE } from './hlasky.js';
import { maskot } from './maskot.js';
import { ik } from './ikony.js';

const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
const hlaskuj = slovo => [...slovo.toUpperCase()].join(', ');

// ulohy: pole úloh z lekce.js. moznosti: { battle, nazev, priOdpovedi(uloha, spravne), konec(vysledek) }
// limit = časový limit v sekundách (Bleskovka); po vypršení hra skončí.
// Soupeřka v online battlu: její postup se ukazuje v hlavičce a průběžně aktualizuje.
let souperStav = { odpovezeno: 0, celkem: 0, body: 0, hotovo: false };
const souperHtml = () => `<div class="souper"><span class="souper-jmeno">${esc(souperStav.jmeno || '')}</span>
  <div class="prubeh maly"><i style="width:${souperStav.celkem ? souperStav.odpovezeno / souperStav.celkem * 100 : 0}%"></i></div>
  <span class="souper-body">${souperStav.hotovo ? '✓ ' : ''}⚡ ${souperStav.body || 0}</span></div>`;
export function nastavSoupere(stav) {
  souperStav = { ...souperStav, ...stav };
  const el = document.querySelector('.souper');
  if (el) el.outerHTML = souperHtml();
}

export function hraj(ulohy, { battle = false, nazev = '', limit = 0, profil = null, souper = null, priOdpovedi = () => {}, konec }) {
  const fronta = [...ulohy];
  const celkem = fronta.filter(u => u.typ !== 'nove').length;
  let hotovo = 0, susenky = 0, chyby = 0, body = 0, spravne = 0;
  const pocetSpravne = () => spravne;
  const opakovane = new Set();
  let start = 0, skoncila = false, stopky = null;
  const konecLimitu = limit ? Date.now() + limit * 1000 : 0;

  const skonci = extra => {
    if (skoncila) return;
    skoncila = true;
    clearInterval(stopky);
    konec({ susenky, chyby, body, celkem, spravne, perfekt: chyby === 0 && celkem > 0, ...extra });
  };
  const dalsi = () => {
    if (skoncila) return;
    if (!fronta.length) return skonci();
    zobraz(fronta.shift());
  };
  if (limit) stopky = setInterval(() => {
    const zbyva = Math.max(0, Math.ceil((konecLimitu - Date.now()) / 1000));
    const el = document.querySelector('.hra-cas');
    if (el) { el.textContent = zbyva + ' s'; el.classList.toggle('dochazi', zbyva <= 10); }
    if (!zbyva) skonci({ casVyprsel: true });
  }, 250);

  const zapocitejSpravne = () => { spravne++; };
  function hotovaUloha(u, ok, spravnaOdpoved) {
    const spravne = ok; // (uvnitř funkce = výsledek této odpovědi; venku je počítadlo)
    const prvniPokus = !opakovane.has(u);
    if (u.typ !== 'nove') {
      if (prvniPokus) hotovo++;
      if (spravne && prvniPokus) { susenky += u.zlata ? 5 : 1; zapocitejSpravne(); }
      if (!spravne) chyby++;
      if (battle && spravne) body += 100 + Math.max(0, Math.round(50 - (Date.now() - start) / 200));
      priOdpovedi(u, spravne, prvniPokus, { body, odpovezeno: hotovo, celkem, spravne: pocetSpravne() });
    }
    // Špatně zodpovězenou úlohu v lekci dá ještě jednou na konec (jen jednou).
    if (!spravne && !battle && prvniPokus) { opakovane.add(u); fronta.push(u); }
    if (battle) {
      (spravne ? zvukSpravne : zvukSpatne)();
      $('#hra').classList.add(spravne ? 'flash-ok' : 'flash-chyba');
      setTimeout(dalsi, spravne ? 450 : 1100);
      return;
    }
    if (u.typ === 'nove') return dalsi();
    (spravne ? zvukSpravne : zvukSpatne)();
    if (u.polozka && u.polozka.druh !== 'extra') speak(u.polozka.en);
    const panel = document.createElement('div');
    panel.className = 'vysledek ' + (spravne ? 'ok' : 'chyba');
    panel.innerHTML = `<div class="vys-radek">${maskot(54, spravne ? 'mrk' : 'hmm')}
      <div><b>${esc(rod(nahodne(spravne ? SPRAVNE : SPATNE), profil))}</b>
      ${spravne ? '' : `<div class="spravne">Správně: <b>${esc(spravnaOdpoved)}</b></div>`}</div></div>
      <button class="btn velke">Dál</button>`;
    $('#hra').append(panel);
    panel.querySelector('button').onclick = dalsi;
    $$('#hra .moznost, #hra .dlazdice').forEach(b => (b.disabled = true));
  }

  function zobraz(u) {
    start = Date.now();
    const pr = celkem ? hotovo / celkem : 0;
    const hlava = `<div class="hra-hlava">
      <button class="zavrit" aria-label="Ukončit">${ik('zavrit', 26, { podklad: false })}</button>
      <div class="prubeh"><i style="width:${pr * 100}%"></i></div>
      ${limit ? `<div class="hra-cas">${Math.max(0, Math.ceil((konecLimitu - Date.now()) / 1000))} s</div>` : ''}
      <div class="hra-skore">${battle && !limit ? '⚡ ' + body : ik('susenka', 22, { podklad: false }) + ' ' + susenky}</div></div>
      ${nazev ? `<div class="hra-nazev">${esc(nazev)}</div>` : ''}
      ${souper ? souperHtml() : ''}
      ${u.zlata ? `<div class="zlata-pruh">${ik('zlata', 34, { podklad: false })}<b>Zlatá otázka!</b><span>Správně = 5 sušenek</span></div>` : ''}`;
    const p = u.polozka;
    const poslech = (text, pomalu) => `<button class="repro" data-text="${esc(text)}" aria-label="Přehrát">${ik('repro', 34, { podklad: false })}</button>
      ${pomalu ? `<button class="repro maly" data-text="${esc(text)}" data-pomalu="1" aria-label="Pomalu">${ik('zelva', 28, { podklad: false })}</button>` : ''}`;
    let telo = '';

    if (u.typ === 'nove') {
      telo = `<div class="zadani">${p.en.includes(' ') ? 'Nová věta' : 'Nové slovíčko'} ✨</div>
        <div class="karta-nova">${p.obr ? `<div class="obr">${esc(p.obr)}</div>` : ''}
          <div class="en">${esc(p.en)}</div><div class="cz">${esc(p.cz)}</div>
          <div class="repro-radek">${poslech(p.en, true)}</div></div>
        <button class="btn velke" id="mam">Mám to 👍</button>`;
    } else if (u.typ === 'poslech') {
      telo = `<div class="zadani">Co slyšíš?</div><div class="repro-radek velky">${poslech(p.en, true)}</div>
        <div class="mrizka">${u.moznosti.map((m, i) => `<button class="moznost obr-moznost" data-i="${i}">${esc(m.obr)}</button>`).join('')}</div>`;
    } else if (u.typ === 'en-cz' || u.typ === 'vyber-vetu') {
      telo = `<div class="zadani">Co to znamená?</div>
        <div class="otazka"><span class="en">${esc(p.en)}</span>${poslech(p.en, u.typ === 'vyber-vetu')}</div>
        <div class="seznam">${u.moznosti.map((m, i) => `<button class="moznost" data-i="${i}">${esc(m.cz)}</button>`).join('')}</div>`;
    } else if (u.typ === 'cz-en') {
      telo = `<div class="zadani">Jak se to řekne anglicky?</div>
        <div class="otazka">${p.obr ? `<span class="obr-maly">${esc(p.obr)}</span>` : ''}<span class="cz-velke">${esc(p.cz)}</span></div>
        <div class="seznam">${u.moznosti.map((m, i) => `<button class="moznost" data-i="${i}">${esc(m.en)}</button>`).join('')}</div>`;
    } else if (u.typ === 'psani') {
      telo = `<div class="zadani">${u.hlaskovat ? 'Poslouchej hláskování a slož slovo' : 'Slož slovo z písmenek'}</div>
        <div class="otazka">${p.obr ? `<span class="obr-maly">${esc(p.obr)}</span>` : ''}
          ${u.hlaskovat ? '' : `<span class="cz-velke">${esc(p.cz)}</span>`}
          <button class="repro" id="hlaskuj" aria-label="Přehrát">${ik('repro', 34, { podklad: false })}</button></div>
        <div class="sloty">${[...p.en].map((_, i) => `<i data-s="${i}"></i>`).join('')}</div>
        <p class="napoveda">${esc(rod('[Spletl|Spletla] ses? Klepni na písmenko a vrátí se.', profil))}</p>
        <div class="dlazdice-box">${u.pismena.map((c, i) => `<button class="dlazdice" data-i="${i}">${esc(c)}</button>`).join('')}</div>
        <button class="btn velke" id="zkontroluj-slovo" disabled>Zkontrolovat</button>`;
    } else if (u.typ === 'skladani') {
      telo = `<div class="zadani">Slož větu anglicky</div>
        <div class="otazka"><span class="cz-velke">${esc(p.cz)}</span></div>
        <div class="veta-radek" id="veta"></div>
        <div class="dlazdice-box">${u.dlazdice.map((w, i) => `<button class="dlazdice slovo" data-i="${i}">${esc(w)}</button>`).join('')}</div>
        <button class="btn velke" id="zkontroluj" disabled>Zkontrolovat</button>`;
    } else if (u.typ === 'pismeno') {
      telo = `<div class="zadani">Které písmeno slyšíš?</div>
        <div class="repro-radek velky"><button class="repro" data-text="${esc(u.spravne)}" aria-label="Přehrát">${ik('repro', 50, { podklad: false })}</button></div>
        <div class="mrizka">${u.moznosti.map((m, i) => `<button class="moznost pismeno" data-i="${i}">${esc(m)}</button>`).join('')}</div>`;
    } else if (u.typ === 'cislo') {
      telo = `<div class="zadani">Které číslo slyšíš?</div>
        <div class="repro-radek velky"><button class="repro" data-text="${u.spravne}" aria-label="Přehrát">${ik('repro', 50, { podklad: false })}</button></div>
        <div class="mrizka">${u.moznosti.map((m, i) => `<button class="moznost pismeno" data-i="${i}">${m}</button>`).join('')}</div>`;
    }

    const a = obrazovka(`<section id="hra" class="hra${u.zlata ? ' zlata' : ''}">${hlava}<div class="hra-telo">${telo}</div></section>`, { bezListy: true });
    a.querySelector('.zavrit').onclick = () => { if (confirm(battle ? 'Vzdát to?' : 'Ukončit lekci? Sušenky z ní zůstanou.')) skonci({ preruseno: true }); };
    if (u.zlata) { konfety(); import('./speech.js').then(m => m.zvukFanfara()); }
    $$('.repro[data-text]', a).forEach(b => (b.onclick = () => speak(b.dataset.text, { pomalu: !!b.dataset.pomalu })));

    // Automaticky přečíst, co se má poslouchat.
    const auto = { nove: p?.en, poslech: p?.en, 'en-cz': p?.en, 'vyber-vetu': p?.en, pismeno: u.spravne, cislo: String(u.spravne) }[u.typ];
    if (auto) setTimeout(() => speak(auto), 250);

    if (u.typ === 'nove') $('#mam').onclick = () => hotovaUloha(u, true);

    if (['poslech', 'en-cz', 'cz-en', 'vyber-vetu', 'pismeno', 'cislo'].includes(u.typ)) {
      $$('.moznost', a).forEach(b => (b.onclick = () => {
        const m = u.moznosti[+b.dataset.i];
        const ok = u.typ === 'pismeno' || u.typ === 'cislo' ? m === u.spravne : m.id === p.id || m.en === p.en;
        b.classList.add(ok ? 'spravne-volba' : 'spatne-volba');
        if (!ok) {
          const sp = $$('.moznost', a).find(x => { const mm = u.moznosti[+x.dataset.i]; return typeof mm === 'object' ? mm.en === p.en : mm === u.spravne; });
          sp?.classList.add('spravne-volba');
        }
        const odp = u.typ === 'pismeno' || u.typ === 'cislo' ? String(u.spravne) : u.typ === 'cz-en' ? p.en : u.typ === 'poslech' ? `${p.en} = ${p.cz}` : p.cz;
        hotovaUloha(u, ok, odp);
      }));
    }

    if (u.typ === 'psani') {
      const cil = p.en.toLowerCase();
      // Každé místo ve slově drží jednu dlaždici (nebo null). Klepnutím na písmenko se vrátí zpátky,
      // další dlaždice zaplní první prázdné místo. Vyhodnotí se až tlačítkem, ať jde opravit i poslední.
      const slozeno = new Array(cil.length).fill(null);
      const sloty = $$('.sloty i', a);
      const btn = $('#zkontroluj-slovo');
      let hotovo = false;
      const prehraj = () => u.hlaskovat ? speak(hlaskuj(p.en), { pomalu: true }) : speak(p.en);
      $('#hlaskuj').onclick = prehraj;
      setTimeout(prehraj, 250);
      const prekresli = () => {
        sloty.forEach((s, i) => { s.textContent = slozeno[i]?.c || ''; s.classList.toggle('plne', !!slozeno[i]); });
        btn.disabled = slozeno.some(x => !x);
      };
      $$('.dlazdice', a).forEach(b => (b.onclick = () => {
        const volne = slozeno.indexOf(null);
        if (hotovo || volne < 0) return;
        slozeno[volne] = { c: u.pismena[+b.dataset.i], b };
        b.disabled = true;
        prekresli();
      }));
      sloty.forEach((s, i) => (s.onclick = () => {
        if (hotovo || !slozeno[i]) return;
        slozeno[i].b.disabled = false;
        slozeno[i] = null;
        prekresli();
      }));
      btn.onclick = () => {
        if (slozeno.some(x => !x)) return;
        hotovo = true;
        btn.disabled = true;
        const ok = slozeno.map(x => x.c).join('') === cil;
        a.querySelector('.sloty').classList.add(ok ? 'ok' : 'chyba');
        hotovaUloha(u, ok, p.en);
      };
    }

    if (u.typ === 'skladani') {
      const veta = $('#veta'), btn = $('#zkontroluj');
      const vybrane = [];
      const prekresli = () => {
        veta.innerHTML = vybrane.map((x, i) => `<button class="dlazdice slovo v-vete" data-j="${i}">${esc(x.w)}</button>`).join('');
        $$('.v-vete', veta).forEach(v => (v.onclick = () => { const [x] = vybrane.splice(+v.dataset.j, 1); x.b.disabled = false; prekresli(); }));
        btn.disabled = vybrane.length !== u.dlazdice.length;
      };
      $$('.dlazdice-box .dlazdice', a).forEach(b => (b.onclick = () => { vybrane.push({ w: u.dlazdice[+b.dataset.i], b }); b.disabled = true; prekresli(); }));
      btn.onclick = () => {
        btn.disabled = true;
        const ok = norm(vybrane.map(x => x.w).join(' ')) === norm(p.en);
        veta.classList.add(ok ? 'ok' : 'chyba');
        hotovaUloha(u, ok, p.en);
      };
    }
  }

  dalsi();
}

export function oslava() { konfety(); }
