// Přehrávání lekce (a jednoho kola battlu): jedna úloha za druhou.
import { obrazovka, esc, $, $$, konfety } from './ui.js';
import { speak, zvukSpravne, zvukSpatne } from './speech.js';
import { nahodne, SPRAVNE, SPATNE } from './hlasky.js';
import { maskot } from './maskot.js';

const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
const hlaskuj = slovo => [...slovo.toUpperCase()].join(', ');

// ulohy: pole úloh z lekce.js. moznosti: { battle, nazev, priOdpovedi(uloha, spravne), konec(vysledek) }
export function hraj(ulohy, { battle = false, nazev = '', priOdpovedi = () => {}, konec }) {
  const fronta = [...ulohy];
  const celkem = fronta.filter(u => u.typ !== 'nove').length;
  let hotovo = 0, susenky = 0, chyby = 0, body = 0;
  const opakovane = new Set();
  let start = 0;

  const dalsi = () => {
    if (!fronta.length) return konec({ susenky, chyby, body, celkem, perfekt: chyby === 0 && celkem > 0 });
    zobraz(fronta.shift());
  };

  function hotovaUloha(u, spravne, spravnaOdpoved) {
    const prvniPokus = !opakovane.has(u);
    if (u.typ !== 'nove') {
      if (prvniPokus) hotovo++;
      priOdpovedi(u, spravne, prvniPokus);
      if (spravne && prvniPokus) susenky++;
      if (!spravne) chyby++;
      if (battle && spravne) body += 100 + Math.max(0, Math.round(50 - (Date.now() - start) / 200));
    }
    // Špatně zodpovězenou úlohu v lekci dá ještě jednou na konec (jen jednou).
    if (!spravne && !battle && prvniPokus) { opakovane.add(u); fronta.push(u); }
    if (battle) {
      (spravne ? zvukSpravne : zvukSpatne)();
      $('#hra').classList.add(spravne ? 'flash-ok' : 'flash-chyba');
      return setTimeout(dalsi, spravne ? 450 : 1100);
    }
    if (u.typ === 'nove') return dalsi();
    (spravne ? zvukSpravne : zvukSpatne)();
    if (u.polozka && u.polozka.druh !== 'extra') speak(u.polozka.en);
    const panel = document.createElement('div');
    panel.className = 'vysledek ' + (spravne ? 'ok' : 'chyba');
    panel.innerHTML = `<div class="vys-radek">${maskot(54, spravne ? 'mrk' : 'hmm')}
      <div><b>${esc(nahodne(spravne ? SPRAVNE : SPATNE))}</b>
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
      <button class="zavrit" aria-label="Ukončit">✕</button>
      <div class="prubeh"><i style="width:${pr * 100}%"></i></div>
      <div class="hra-skore">${battle ? '⚡ ' + body : '🍪 ' + susenky}</div></div>
      ${nazev ? `<div class="hra-nazev">${esc(nazev)}</div>` : ''}`;
    const p = u.polozka;
    const poslech = (text, pomalu) => `<button class="repro" data-text="${esc(text)}" aria-label="Přehrát">🔊</button>
      ${pomalu ? `<button class="repro maly" data-text="${esc(text)}" data-pomalu="1" aria-label="Pomalu">🐢</button>` : ''}`;
    let telo = '';

    if (u.typ === 'nove') {
      telo = `<div class="zadani">Nové slovíčko ✨</div>
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
          <button class="repro" id="hlaskuj" aria-label="Přehrát">🔊</button></div>
        <div class="sloty">${[...p.en].map(() => '<i></i>').join('')}</div>
        <div class="dlazdice-box">${u.pismena.map((c, i) => `<button class="dlazdice" data-i="${i}">${esc(c)}</button>`).join('')}</div>`;
    } else if (u.typ === 'skladani') {
      telo = `<div class="zadani">Slož větu anglicky</div>
        <div class="otazka"><span class="cz-velke">${esc(p.cz)}</span></div>
        <div class="veta-radek" id="veta"></div>
        <div class="dlazdice-box">${u.dlazdice.map((w, i) => `<button class="dlazdice slovo" data-i="${i}">${esc(w)}</button>`).join('')}</div>
        <button class="btn velke" id="zkontroluj" disabled>Zkontrolovat</button>`;
    } else if (u.typ === 'pismeno') {
      telo = `<div class="zadani">Které písmeno slyšíš?</div>
        <div class="repro-radek velky"><button class="repro" data-text="${esc(u.spravne)}">🔊</button></div>
        <div class="mrizka">${u.moznosti.map((m, i) => `<button class="moznost pismeno" data-i="${i}">${esc(m)}</button>`).join('')}</div>`;
    } else if (u.typ === 'cislo') {
      telo = `<div class="zadani">Které číslo slyšíš?</div>
        <div class="repro-radek velky"><button class="repro" data-text="${u.spravne}">🔊</button></div>
        <div class="mrizka">${u.moznosti.map((m, i) => `<button class="moznost pismeno" data-i="${i}">${m}</button>`).join('')}</div>`;
    }

    const a = obrazovka(`<section id="hra" class="hra">${hlava}<div class="hra-telo">${telo}</div></section>`, { bezListy: true });
    a.querySelector('.zavrit').onclick = () => { if (confirm(battle ? 'Vzdát battle?' : 'Ukončit lekci? Sušenky z ní zůstanou.')) konec({ susenky, chyby, body, celkem, preruseno: true }); };
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
      const slozeno = [];
      const sloty = $$('.sloty i', a);
      const prehraj = () => u.hlaskovat ? speak(hlaskuj(p.en), { pomalu: true }) : speak(p.en);
      $('#hlaskuj').onclick = prehraj;
      setTimeout(prehraj, 250);
      const prekresli = () => sloty.forEach((s, i) => (s.textContent = slozeno[i]?.c || ''));
      $$('.dlazdice', a).forEach(b => (b.onclick = () => {
        slozeno.push({ c: u.pismena[+b.dataset.i], b });
        b.disabled = true;
        prekresli();
        if (slozeno.length === cil.length) {
          const ok = slozeno.map(x => x.c).join('') === cil;
          a.querySelector('.sloty').classList.add(ok ? 'ok' : 'chyba');
          hotovaUloha(u, ok, p.en);
        }
      }));
      // Klepnutím na slot se poslední písmeno vrátí.
      a.querySelector('.sloty').onclick = () => {
        if (!slozeno.length || slozeno.length === cil.length) return;
        slozeno.pop().b.disabled = false;
        prekresli();
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
