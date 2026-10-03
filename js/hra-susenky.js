// „Chytej sušenky“ – hra za odměnu. Krabička dole se ovládá prstem, shora padají sušenky.
// Sušenka 1 bod (propadne = −½ života), zlatá 5 bodů (propadne = −1 život), chycená brokolice −1 život,
// černé srdce doplní do plna (3), vzácné srdíčko dá život navíc (i nad 3, nejvýš ZIVOTY_MAX), šnek na chvíli všechno zpomalí. Každých 15 bodů nový level.
// Ztráta života je vidět i koutkem oka: červené okraje obrazovky, velké „−1 ❤️“ a zatřesení srdíček.
// Hra běží na <canvas> v rozlišení displeje (ostrá i na Retině).
//
// spust(platno, { zbyva: sekund do denního limitu, priTiku(sekund), konec({ body, zlate, level, limit }) })

const LEVEL_PO = 15;
const ZIVOTY_MAX = 5;       // srdíčko může přidat i 4. a 5. život
const ZPOMALENI_S = 5;      // jak dlouho šnek zpomaluje
const ZPOMALENI_NA = .45;   // rychlost během zpomalení

function sprite(velikost, kresli) {
  const c = document.createElement('canvas');
  const dpr = Math.min(3, devicePixelRatio || 1);
  c.width = c.height = velikost * dpr;
  const g = c.getContext('2d');
  g.scale(dpr, dpr);
  kresli(g, velikost);
  return c;
}

const OBRYS = '#3b2a3f';
function susenka(g, s, zlata) {
  const r = s / 2 - 3;
  g.translate(s / 2, s / 2);
  g.fillStyle = zlata ? '#ffd34d' : '#e6a65d';
  g.strokeStyle = OBRYS;
  g.lineWidth = 2.5;
  g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.fill(); g.stroke();
  g.fillStyle = 'rgba(255,255,255,.35)';
  g.beginPath(); g.ellipse(-r * .35, -r * .4, r * .35, r * .18, -.6, 0, Math.PI * 2); g.fill();
  g.fillStyle = zlata ? '#c9962c' : '#5b3424';
  for (const [x, y, k] of [[-.4, -.05, .16], [.3, -.35, .14], [.1, .3, .17], [-.25, .45, .12], [.45, .15, .12]]) {
    g.beginPath(); g.arc(x * r, y * r, k * r, 0, Math.PI * 2); g.fill();
  }
}

// Brokolice a šnek jako kresba, ne emoji: Safari na iPhonu emoji na plátně (otočené) občas nevykreslí –
// brokolice pak byla neviditelná a „problikla“ až nápisem při chycení.
function brokolice(g, s) {
  const k = s / 40; g.scale(k, k); g.lineJoin = 'round'; g.strokeStyle = OBRYS; g.lineWidth = 2.2;
  g.fillStyle = '#9ad46a'; g.beginPath(); g.moveTo(15, 22); g.lineTo(25, 22); g.lineTo(23, 37); g.quadraticCurveTo(20, 39, 17, 37); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#3f9a3f';
  for (const [x, y, r] of [[12, 18, 8], [28, 18, 8], [20, 11, 9], [20, 21, 7]]) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.stroke(); }
  g.fillStyle = '#3f9a3f'; for (const [x, y, r] of [[12, 18, 7], [28, 18, 7], [20, 11, 8]]) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
  g.fillStyle = '#5fbf5f'; for (const [x, y] of [[10, 15], [26, 15], [18, 8], [23, 10]]) { g.beginPath(); g.arc(x, y, 2.2, 0, Math.PI * 2); g.fill(); }
  // zamračený obličej
  g.fillStyle = OBRYS; g.beginPath(); g.arc(16.5, 27, 1.5, 0, Math.PI * 2); g.arc(23.5, 27, 1.5, 0, Math.PI * 2); g.fill();
  g.lineWidth = 1.6; g.beginPath(); g.moveTo(14.5, 24); g.lineTo(18, 25.2); g.moveTo(25.5, 24); g.lineTo(22, 25.2); g.moveTo(17.5, 32.5); g.quadraticCurveTo(20, 30.5, 22.5, 32.5); g.stroke();
}
function snek(g, s) {
  const k = s / 40; g.scale(k, k); g.lineJoin = 'round'; g.strokeStyle = OBRYS; g.lineWidth = 2.2;
  g.fillStyle = '#ffd38a'; g.beginPath(); g.moveTo(4, 32); g.quadraticCurveTo(4, 26, 12, 27); g.lineTo(34, 27); g.quadraticCurveTo(38, 27, 37, 32); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(8, 27); g.lineTo(5, 18); g.moveTo(11, 27); g.lineTo(11, 18); g.stroke();
  g.fillStyle = OBRYS; g.beginPath(); g.arc(5, 17, 1.8, 0, Math.PI * 2); g.arc(11, 17, 1.8, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#c98d5a'; g.beginPath(); g.arc(24, 20, 10, 0, Math.PI * 2); g.fill(); g.stroke();
  g.lineWidth = 1.8; g.beginPath(); for (let a = 0; a < 10; a += .2) { const r = 1 + a * .85; g.lineTo(24 + Math.cos(a) * r, 20 + Math.sin(a) * r); } g.stroke();
}

// Červené srdíčko (život navíc) ve stejném stylu jako sušenky: obrys a lesk.
function srdce(g, s, barva = '#e8283c') {
  g.translate(s / 2, s / 2 + s * .04);
  const k = s / 26;
  g.scale(k, k);
  const p = new Path2D('M0 10 C-3 7 -11 2 -11 -4 C-11 -9 -6 -11 -3 -10 C-1.5 -9.5 -.5 -8.5 0 -7 C.5 -8.5 1.5 -9.5 3 -10 C6 -11 11 -9 11 -4 C11 2 3 7 0 10 Z');
  g.fillStyle = barva; g.fill(p);
  g.lineWidth = 2.5 / k * .8; g.strokeStyle = OBRYS; g.lineJoin = 'round'; g.stroke(p);
  g.fillStyle = 'rgba(255,255,255,.55)';
  g.beginPath(); g.ellipse(-5.5, -5, 2.6, 1.5, -.7, 0, Math.PI * 2); g.fill();
}

export function spust(platno, { zbyva, priTiku = () => {}, konec }) {
  const g = platno.getContext('2d');
  const dpr = Math.min(3, devicePixelRatio || 1);
  let W = 0, H = 0;
  const velikost = () => {
    const r = platno.getBoundingClientRect();
    W = r.width; H = r.height;
    platno.width = W * dpr; platno.height = H * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  velikost();
  addEventListener('resize', velikost);

  const S = Math.max(40, Math.min(58, W / 8));
  const SZ = S * 1.2; // zlaté jsou větší
  const SPR = { susenka: sprite(S, (c, s) => susenka(c, s, false)), zlata: sprite(SZ, (c, s) => susenka(c, s, true)), srdce: sprite(S, srdce), cerne: sprite(S * 1.1, (c, s) => { srdce(c, s, '#241c2b'); c.fillStyle = '#ffd34d'; c.font = '7px system-ui'; c.textAlign = 'center'; c.fillText('✦', 6, -6); }), brokolice: sprite(S, brokolice), snek: sprite(S, snek) };

  // Krabička stojí výš nad spodkem – pod ní je místo na prst (DOLE px), aby ji prst nezakrýval.
  // Krabička stojí na zemi; pod její horní hranou je pruh trávy na swipe prstem (DOLE px).
  const DOLE = Math.max(110, H * .16);
  const krab = { x: W / 2, sirka: Math.min(130, W * .32), vyska: 58 };
  let cil = krab.x;
  const tah = e => { const r = platno.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; cil = t.clientX - r.left; };
  platno.addEventListener('pointerdown', tah);
  platno.addEventListener('pointermove', tah);
  platno.addEventListener('touchmove', e => { e.preventDefault(); tah(e); }, { passive: false });

  let body = 0, zlate = 0, zivoty = 3, serie = 0, level = 1, bezi = true, zbyvaS = zbyva;
  const veci = [], efekty = [];
  let posledni = performance.now(), doDalsi = 600, otres = 0, zasah = 0, zpomaleni = 0, ochrana = 0, konciZa = 0;

  function pridej() {
    const r = Math.random();
    const brokolice = Math.min(.12 + level * .03, .32);
    // srdíčko opravdu vzácně (asi 1 ze 125 padajících věcí)
    // černé srdce (doplní do plna = 3 srdíčka) ještě vzácněji, jen když nějaké chybí
    const druh = r < .06 ? 'zlata' : r < .06 + brokolice ? 'brokolice' : (r > .996 && zivoty < 3) ? 'cerne' : (r > .992 && zivoty < ZIVOTY_MAX) ? 'srdce'
      : (r > .962 && r <= .992 && !zpomaleni) ? 'snek' : 'susenka';
    const x = S / 2 + Math.random() * (W - S);
    let v = 140 + level * 28 + Math.random() * 60;
    // Ve stejném sloupci nesmí rychlejší věc dohnat pomalejší pod sebou (brokolice se pak schovala za sušenku).
    for (const o of veci) if (Math.abs(o.x - x) < S * 1.1) v = Math.min(v, o.v);
    veci.push({ druh, x, y: -S, v, rot: Math.random() * 6, vr: (Math.random() - .5) * 3 });
  }

  function text(t, x, y, barva, velky = false) { efekty.push({ t, x, y, barva, zivot: velky ? 1.4 : 1, velky }); }

  // Ztráta života: červené okraje, velký nápis uprostřed, zatřesení srdíček v liště. Vrací true, když je konec.
  // chranit = krátká ochrana po zásahu brokolicí (dvě brokolice těsně za sebou neberou dva životy); propadlé sušenky ubírají vždy.
  function uber(kolik, x, y, duvod, chranit = false) {
    if (chranit && ochrana > 0) return false;
    if (chranit) ochrana = .8;
    zivoty = Math.max(0, zivoty - kolik);
    serie = 0; zasah = .7; otres = .35;
    text(duvod, x, y, kolik >= 1 ? '#3fa34d' : '#e0a800');
    text(kolik >= 1 ? '−1 ❤️' : '−½ ❤️', W / 2, H * .45, '#ff3b5c', true);
    const hud = platno.parentElement.querySelector('.hra-hud .zivoty');
    if (hud) { hud.classList.remove('au'); void hud.offsetWidth; hud.classList.add('au'); }
    if (navigator.vibrate) navigator.vibrate(kolik >= 1 ? 120 : 60);
    return zivoty <= 0;
  }

  // Došla srdíčka: hra se na chvilku zastaví s nápisem, ať je jasné, proč skončila.
  function konecHry() {
    konciZa = 1.6;
    text('Konec hry 💔', W / 2, H * .4, '#ff3b5c', true);
    requestAnimationFrame(krok);
  }

  function krok(ted) {
    if (!bezi) return;
    const dt = Math.min(.05, (ted - posledni) / 1000);
    posledni = ted;
    if (konciZa > 0) {
      konciZa -= dt;
      for (let i = efekty.length - 1; i >= 0; i--) { const e = efekty[i]; e.y -= 20 * dt; e.zivot = Math.max(.6, e.zivot - dt * .3); }
      zasah = Math.max(.35, zasah - dt); kresli();
      if (konciZa <= 0) return skonci(false);
      return requestAnimationFrame(krok);
    }
    if (document.visibilityState !== 'visible') { requestAnimationFrame(krok); return; } // schovaná appka = pauza
    {
      zbyvaS -= dt;
      priTiku(zbyvaS);
      if (zbyvaS <= 0) return skonci(true);
    }
    // krabička plynule za prstem
    krab.x += (cil - krab.x) * Math.min(1, dt * 14);
    krab.x = Math.max(krab.sirka / 2, Math.min(W - krab.sirka / 2, krab.x));
    // nové věci – s levelem častěji
    zpomaleni = Math.max(0, zpomaleni - dt);
    ochrana = Math.max(0, ochrana - dt);
    const tempo = zpomaleni ? ZPOMALENI_NA : 1;
    doDalsi -= dt * 1000 * tempo; // při zpomalení padají i méně často
    if (doDalsi <= 0) { pridej(); doDalsi = Math.max(260, 900 - level * 70) * (.6 + Math.random() * .7); }
    const kY = H - DOLE - krab.vyska;
    for (let i = veci.length - 1; i >= 0; i--) {
      const v = veci[i];
      v.y += v.v * dt * tempo; v.rot += v.vr * dt * tempo;
      // Chycení podle skutečné velikosti: sušenky (i větší zlatá) se počítají, i když krabičku jen trefí okrajem;
      // brokolice až když opravdu padne dovnitř – dřív brala život i ta, co krabičku těsně minula.
      const vel = v.druh === 'zlata' ? SZ : S;
      const okraj = v.druh === 'brokolice' ? -S * .15 : vel * .4;
      const chycena = v.y + vel * .4 > kY && v.y < kY + 26 && Math.abs(v.x - krab.x) < krab.sirka / 2 + okraj;
      if (chycena) {
        veci.splice(i, 1);
        if (v.druh === 'brokolice') { if (uber(1, v.x, kY - 10, 'Fuj, brokolice!', true)) return konecHry(); }
        else if (v.druh === 'snek') { zpomaleni = ZPOMALENI_S; text('Zpomalení 🐌', W / 2, H * .4, '#3b8fd9', true); }
        else if (v.druh === 'cerne') {
          zivoty = Math.max(zivoty, 3);
          text('Plné zdraví! 🖤', W / 2, H * .45, '#241c2b', true);
          const zv = platno.parentElement.querySelector('.hra-hud .zivoty');
          if (zv) { zv.classList.remove('jupi'); void zv.offsetWidth; zv.classList.add('jupi'); }
        }
        else if (v.druh === 'srdce') {
          zivoty = Math.min(ZIVOTY_MAX, zivoty + 1);
          text('+1 ❤️', W / 2, H * .45, '#e8283c', true);
          const zv = platno.parentElement.querySelector('.hra-hud .zivoty');
          if (zv) { zv.classList.remove('jupi'); void zv.offsetWidth; zv.classList.add('jupi'); }
        }
        else {
          serie++;
          const zisk = (v.druh === 'zlata' ? 5 : 1) + (serie > 0 && serie % 10 === 0 ? 5 : 0);
          if (v.druh === 'zlata') zlate++;
          body += zisk;
          text(serie % 10 === 0 ? `Série ${serie}! +${zisk}` : `+${zisk}`, v.x, kY - 10, v.druh === 'zlata' ? '#e0a800' : '#ff6fae');
          const novyLevel = 1 + Math.floor(body / LEVEL_PO);
          if (novyLevel > level) { level = novyLevel; text(`Level ${level}! 🚀`, W / 2, H * .4, '#8b5cf0'); }
        }
      } else if (v.y > H + S) {
        veci.splice(i, 1);
        // propadlá sušenka −½ srdíčka, zlatá −1 (Pavel 4. 10. 2026)
        if (v.druh === 'zlata') { if (uber(1, v.x, H - DOLE - 30, 'Zlatá utekla!')) return konecHry(); }
        else if (v.druh === 'susenka') { if (uber(.5, v.x, H - DOLE - 30, 'Utekla!')) return konecHry(); }
      }
    }
    for (let i = efekty.length - 1; i >= 0; i--) { const e = efekty[i]; e.y -= 50 * dt; e.zivot -= dt * 1.1; if (e.zivot <= 0) efekty.splice(i, 1); }
    otres = Math.max(0, otres - dt);
    zasah = Math.max(0, zasah - dt);
    kresli();
    requestAnimationFrame(krok);
  }

  function kresli() {
    g.save();
    g.clearRect(0, 0, W, H);
    if (otres) g.translate((Math.random() - .5) * 10 * otres, 0);
    // padající věci
    // brokolice navrch, ať ji nikdy nic nezakryje
    for (const v of [...veci.filter(v => v.druh !== 'brokolice'), ...veci.filter(v => v.druh === 'brokolice')]) {
      g.save(); g.translate(v.x, v.y); g.rotate(v.rot);
      if (v.druh === 'susenka') g.drawImage(SPR.susenka, -S / 2, -S / 2, S, S);
      else if (v.druh === 'zlata') g.drawImage(SPR.zlata, -SZ / 2, -SZ / 2, SZ, SZ);
      else if (v.druh === 'srdce') { g.rotate(-v.rot); g.drawImage(SPR.srdce, -S / 2, -S / 2, S, S); }
      else if (v.druh === 'cerne') { g.rotate(-v.rot); g.shadowColor = '#ffd34d'; g.shadowBlur = 14; g.drawImage(SPR.cerne, -S * .55, -S * .55, S * 1.1, S * 1.1); g.shadowBlur = 0; }
      else g.drawImage(SPR[v.druh], -S / 2, -S / 2, S, S);
      if (v.druh === 'zlata') { g.strokeStyle = 'rgba(255,211,77,.7)'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, SZ * .62, 0, Math.PI * 2); g.stroke(); }
      g.restore();
    }
    // země: tráva od spodku krabičky dolů, prostor na prst
    const zemY = H - DOLE;
    const zg = g.createLinearGradient(0, zemY, 0, H);
    zg.addColorStop(0, '#9be08a'); zg.addColorStop(1, '#6fc46a');
    g.fillStyle = zg; g.fillRect(0, zemY, W, DOLE);
    g.strokeStyle = OBRYS; g.lineWidth = 3; g.beginPath(); g.moveTo(0, zemY); g.lineTo(W, zemY); g.stroke();
    g.strokeStyle = '#5aa957'; g.lineWidth = 2;
    for (let tx = 8; tx < W; tx += 22) { g.beginPath(); g.moveTo(tx, zemY + 10 + (tx % 3) * 6); g.lineTo(tx + 4, zemY + 2 + (tx % 3) * 6); g.stroke(); }
    g.fillStyle = 'rgba(255,255,255,.75)'; g.font = '700 15px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('👆 táhni prstem tady', W / 2, zemY + DOLE * .55);
    // krabička od sušenek: plechovka s víčkem stejně širokým jako tělo, štítek, sušenky vykukující nahoře
    const x = krab.x - krab.sirka / 2, y = H - DOLE - krab.vyska, w = krab.sirka, h = krab.vyska;
    g.lineJoin = 'round';
    // vykukující sušenky (za okrajem)
    g.drawImage(SPR.susenka, x + w * .18, y - S * .32, S * .62, S * .62);
    g.drawImage(SPR.susenka, x + w * .48, y - S * .4, S * .7, S * .7);
    // tělo s jemným přechodem
    const tg = g.createLinearGradient(x, 0, x + w, 0);
    tg.addColorStop(0, '#ff9fcd'); tg.addColorStop(.5, '#ffc2df'); tg.addColorStop(1, '#ff8ac0');
    g.fillStyle = tg; g.strokeStyle = OBRYS; g.lineWidth = 2.6;
    obdelnik(x, y + 6, w, h - 6, 16); g.fill(); g.stroke();
    // lem nahoře (stejně široký jako tělo) a proužek dole
    g.fillStyle = '#c4a3ff'; obdelnik(x, y, w, 13, 8); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,255,255,.45)'; obdelnik(x + 8, y + 3, w * .35, 3, 2); g.fill();
    g.fillStyle = '#ff6fae'; obdelnik(x + 1.3, y + h - 12, w - 2.6, 10.7, 6); g.fill();
    // puntíky
    g.fillStyle = 'rgba(255,255,255,.55)';
    for (const [px, py] of [[.12, .45], [.88, .42], [.1, .72], [.9, .7]]) { g.beginPath(); g.arc(x + w * px, y + h * py, 3, 0, Math.PI * 2); g.fill(); }
    // štítek
    g.fillStyle = '#fff'; g.strokeStyle = OBRYS; g.lineWidth = 2;
    g.beginPath(); g.ellipse(krab.x, y + h * .56, w * .3, h * .2, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = OBRYS; g.font = `800 ${Math.round(h * .24)}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('Biscuit', krab.x, y + h * .57);
    // texty +1 apod.
    for (const e of efekty) {
      g.globalAlpha = Math.max(0, e.zivot); g.fillStyle = e.barva; g.strokeStyle = '#fff'; g.lineWidth = 5;
      g.font = `800 ${e.velky ? 46 : 24}px system-ui`; g.textAlign = 'center'; g.lineWidth = e.velky ? 7 : 5;
      g.strokeText(e.t, e.x, e.y); g.fillText(e.t, e.x, e.y);
    }
    g.globalAlpha = 1;
    g.restore();
    // zpomalení: jemně modrá obrazovka; zásah: červené okraje (vinětace), které rychle zmizí
    if (zpomaleni) { g.fillStyle = `rgba(120, 180, 255, ${Math.min(.16, zpomaleni * .08)})`; g.fillRect(0, 0, W, H); }
    if (zasah) {
      const v = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .35, W / 2, H / 2, Math.max(W, H) * .75);
      v.addColorStop(0, 'rgba(255, 40, 70, 0)'); v.addColorStop(1, `rgba(255, 40, 70, ${Math.min(.55, zasah * .8)})`);
      g.fillStyle = v; g.fillRect(0, 0, W, H);
    }
    const hud = platno.parentElement.querySelector('.hra-hud');
    if (hud) {
      const z = `${body}|${level}|${zivoty}|${Math.ceil(zpomaleni)}`;
      if (hud.dataset.z !== z) {
        hud.dataset.z = z;
        const zv = hud.querySelector('.zivoty');
        if (!zv) hud.innerHTML = `<span class="snek"></span><span class="body"></span><span class="level"></span><span class="zivoty"></span>`;
        hud.querySelector('.body').textContent = `🍪 ${body}`;
        hud.querySelector('.level').textContent = `Level ${level}`;
        const sn = hud.querySelector('.snek'); sn.textContent = zpomaleni ? `🐌 ${Math.ceil(zpomaleni)}` : ''; sn.hidden = !zpomaleni;
        hud.querySelector('.zivoty').innerHTML = [...Array(Math.max(3, Math.ceil(zivoty))).keys()].map(i => srdicko(Math.max(0, Math.min(1, zivoty - i)))).join('');
      }
    }
  }
  // Srdíčko v liště: plné, půlka (levá polovina), prázdné.
  function srdicko(plne) {
    const d = 'M12 21 L3.5 12.5 C-1 8 4 1 9 5 L12 7.5 L15 5 C20 1 25 8 20.5 12.5 Z';
    const id = 'sr' + Math.random().toString(36).slice(2, 7);
    return `<svg width="20" height="20" viewBox="0 0 24 24"><clipPath id="${id}"><rect width="${24 * plne}" height="24"/></clipPath>
      <path d="${d}" fill="#fff"/><path d="${d}" fill="#e8283c" clip-path="url(#${id})"/><path d="${d}" fill="none" stroke="#e8283c" stroke-width="2" stroke-linejoin="round"/></svg>`;
  }
  function obdelnik(x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }

  function skonci(limit) {
    bezi = false;
    removeEventListener('resize', velikost);
    konec({ body, zlate, level, limit });
  }

  requestAnimationFrame(t => { posledni = t; krok(t); });
  return { zastav: () => skonci(false) };
}
