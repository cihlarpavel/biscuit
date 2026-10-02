// „Chytej sušenky“ – hra za odměnu. Krabička dole se ovládá prstem, shora padají sušenky.
// Sušenka 1 bod, zlatá 5 bodů, brokolice bere život, srdíčko život vrací. Každých 15 bodů nový level.
// Hra běží na <canvas> v rozlišení displeje (ostrá i na Retině).
//
// spust(platno, { zbyva: sekund do denního limitu, priTiku(sekund), konec({ body, zlate, level, limit }) })

const LEVEL_PO = 15;

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
  const SPR = { susenka: sprite(S, (c, s) => susenka(c, s, false)), zlata: sprite(S, (c, s) => susenka(c, s, true)) };

  const krab = { x: W / 2, sirka: Math.min(130, W * .32), vyska: 56 };
  let cil = krab.x;
  const tah = e => { const r = platno.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; cil = t.clientX - r.left; };
  platno.addEventListener('pointerdown', tah);
  platno.addEventListener('pointermove', tah);
  platno.addEventListener('touchmove', e => { e.preventDefault(); tah(e); }, { passive: false });

  let body = 0, zlate = 0, zivoty = 3, serie = 0, level = 1, bezi = true, zbyvaS = zbyva;
  const veci = [], efekty = [];
  let posledni = performance.now(), doDalsi = 600, otres = 0;

  function pridej() {
    const r = Math.random();
    const brokolice = Math.min(.12 + level * .03, .32);
    const druh = r < .06 ? 'zlata' : r < .06 + brokolice ? 'brokolice' : (r > .985 && zivoty < 3) ? 'srdce' : 'susenka';
    veci.push({ druh, x: S / 2 + Math.random() * (W - S), y: -S, v: 140 + level * 28 + Math.random() * 60, rot: Math.random() * 6, vr: (Math.random() - .5) * 3 });
  }

  function text(t, x, y, barva) { efekty.push({ t, x, y, barva, zivot: 1 }); }

  function krok(ted) {
    if (!bezi) return;
    const dt = Math.min(.05, (ted - posledni) / 1000);
    posledni = ted;
    if (document.visibilityState === 'visible') {
      zbyvaS -= dt;
      priTiku(zbyvaS);
      if (zbyvaS <= 0) return skonci(true);
    }
    // krabička plynule za prstem
    krab.x += (cil - krab.x) * Math.min(1, dt * 14);
    krab.x = Math.max(krab.sirka / 2, Math.min(W - krab.sirka / 2, krab.x));
    // nové věci – s levelem častěji
    doDalsi -= dt * 1000;
    if (doDalsi <= 0) { pridej(); doDalsi = Math.max(260, 900 - level * 70) * (.6 + Math.random() * .7); }
    const kY = H - 26 - krab.vyska;
    for (let i = veci.length - 1; i >= 0; i--) {
      const v = veci[i];
      v.y += v.v * dt; v.rot += v.vr * dt;
      const chycena = v.y + S * .35 > kY && v.y < kY + 20 && Math.abs(v.x - krab.x) < krab.sirka / 2 + S * .15;
      if (chycena) {
        veci.splice(i, 1);
        if (v.druh === 'brokolice') { zivoty--; serie = 0; otres = .35; text('Fuj! 🥦', v.x, kY - 10, '#3fa34d'); if (navigator.vibrate) navigator.vibrate(80); if (zivoty <= 0) return skonci(false); }
        else if (v.druh === 'srdce') { zivoty = Math.min(3, zivoty + 1); text('+💗', v.x, kY - 10, '#ff4f8b'); }
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
        if (v.druh === 'susenka' || v.druh === 'zlata') serie = 0;
      }
    }
    for (let i = efekty.length - 1; i >= 0; i--) { const e = efekty[i]; e.y -= 50 * dt; e.zivot -= dt * 1.1; if (e.zivot <= 0) efekty.splice(i, 1); }
    otres = Math.max(0, otres - dt);
    kresli();
    requestAnimationFrame(krok);
  }

  function kresli() {
    g.save();
    g.clearRect(0, 0, W, H);
    if (otres) g.translate((Math.random() - .5) * 10 * otres, 0);
    // padající věci
    for (const v of veci) {
      g.save(); g.translate(v.x, v.y); g.rotate(v.rot);
      if (v.druh === 'susenka' || v.druh === 'zlata') g.drawImage(SPR[v.druh], -S / 2, -S / 2, S, S);
      else { g.font = `${S * .85}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(v.druh === 'brokolice' ? '🥦' : '💗', 0, 0); }
      if (v.druh === 'zlata') { g.strokeStyle = 'rgba(255,211,77,.7)'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, S * .62, 0, Math.PI * 2); g.stroke(); }
      g.restore();
    }
    // krabička od sušenek
    const x = krab.x - krab.sirka / 2, y = H - 26 - krab.vyska, w = krab.sirka, h = krab.vyska;
    g.lineWidth = 3; g.strokeStyle = OBRYS; g.lineJoin = 'round';
    g.fillStyle = '#ff8fc4'; obdelnik(x, y + 8, w, h - 8, 14); g.fill(); g.stroke();
    g.fillStyle = '#ffd6e8'; obdelnik(x + 8, y + 18, w - 16, h - 30, 8); g.fill();
    g.fillStyle = '#c4a3ff'; obdelnik(x - 6, y, w + 12, 14, 7); g.fill(); g.stroke();
    g.fillStyle = OBRYS; g.font = `700 ${Math.round(h * .3)}px "Baloo 2", system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('Biscuit', krab.x, y + 18 + (h - 30) / 2);
    // texty +1 apod.
    for (const e of efekty) {
      g.globalAlpha = Math.max(0, e.zivot); g.fillStyle = e.barva; g.strokeStyle = '#fff'; g.lineWidth = 5;
      g.font = `700 24px "Baloo 2", system-ui`; g.textAlign = 'center';
      g.strokeText(e.t, e.x, e.y); g.fillText(e.t, e.x, e.y);
    }
    g.globalAlpha = 1;
    g.restore();
    const hud = platno.parentElement.querySelector('.hra-hud');
    if (hud) hud.innerHTML = `<span>🍪 ${body}</span><span>Level ${level}</span><span>${'💗'.repeat(zivoty)}${'🤍'.repeat(3 - zivoty)}</span>`;
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
