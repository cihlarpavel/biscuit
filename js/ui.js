// Sdílené drobnosti rozhraní.
import { ik } from './ikony.js';

// Jednotné tlačítko zpět vlevo nahoře. V aplikaci na ploše iPhonu chybí tlačítko prohlížeče,
// takže každá obrazovka mimo hlavní záložky ho musí mít.
export const zpet = (kam, text = 'Zpět') => `<a class="zpet-btn" href="${kam}">${ik('zpet', 22, { podklad: false })}<span>${text}</span></a>`;
export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const app = () => document.getElementById('app');

export function obrazovka(html, { tab = null, bezListy = false } = {}) {
  const a = app();
  a.innerHTML = html;
  a.scrollTo(0, 0);
  document.body.classList.toggle('bez-listy', bezListy);
  $$('#tabs a').forEach(x => x.classList.toggle('on', x.dataset.tab === tab));
  return a;
}

export function toast(text) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.append(t);
  setTimeout(() => t.classList.add('pryc'), 2200);
  setTimeout(() => t.remove(), 2700);
}

// Kolečko denního cíle.
export function kolecko(podil, popis, velikost = 132) {
  const r = 52, obvod = 2 * Math.PI * r, p = Math.max(0, Math.min(1, podil));
  return `<div class="kolecko" style="width:${velikost}px;height:${velikost}px">
    <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="${r}" class="kol-pozadi"/>
    <circle cx="60" cy="60" r="${r}" class="kol-plneni${p >= 1 ? ' hotovo' : ''}" stroke-dasharray="${obvod}" stroke-dashoffset="${obvod * (1 - p)}"/></svg>
    <div class="kol-text">${popis}</div></div>`;
}

export const minuty = s => Math.floor(s / 60);

export function konfety() {
  const barvy = ['#ff6fae', '#b69cff', '#7fd8c4', '#ffc94d', '#e6a65d'];
  const box = document.createElement('div');
  box.className = 'konfety';
  for (let i = 0; i < 40; i++) {
    const k = document.createElement('i');
    k.style.left = Math.random() * 100 + '%';
    k.style.background = barvy[i % barvy.length];
    k.style.animationDelay = Math.random() * 0.4 + 's';
    k.style.transform = `rotate(${Math.random() * 360}deg)`;
    box.append(k);
  }
  document.body.append(box);
  setTimeout(() => box.remove(), 2600);
}
