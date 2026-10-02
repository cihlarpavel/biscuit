// Postavička sušenka: kulatá ukousnutá sušenka s vlasy, ručičkama a nožičkama. Holka/kluk se bere z vzhled.rod.
// Vzhled je objekt { kategorie: id věci }. Kreslí js/blob.js (susenkaObsah), tady je katalog Drip shopu a rámeček
// s kulatým pozadím. Vzácnost se odvozuje z ceny (VZACNOST). Id věcí neměnit (jsou v profil.koupeno).
// verze 2 = sušenka; profily z dřívější postavičky převádí app.js (prevedNaSusenku) a vrací za staré věci sušenky.
import { susenkaObsah, SUSENKA_VIEWBOX } from './blob.js';

// ---------- Vzácnost ----------
// Ceny i hranice zdvojnásobeny 3. 10. 2026 (úspornější sušenky, změny postavičky mají být odměna).
export const VZACNOST = [
  { od: 0, id: 'bezne', nazev: 'Běžné', barva: '#8a7891' },
  { od: 90, id: 'cool', nazev: 'Cool', barva: '#3fb59a' },
  { od: 260, id: 'epicke', nazev: 'Epické', barva: '#8b6cf0' },
  { od: 800, id: 'legendarni', nazev: 'Legendární', barva: '#e0a800' },
  { od: 2000, id: 'bizar', nazev: 'Bizár', barva: '#ff4f9a' },
];
export const vzacnost = cena => VZACNOST.filter(v => cena >= v.od).pop();

// ---------- Kategorie ----------
// povinne = vždycky musí být něco vybráno; hlava = náhled v obchodě stačí výřez hlavy.
export const KATEGORIE = [
  { id: 'kuze', nazev: 'Těsto', ik: 'susenka', povinne: true },
  { id: 'uces', nazev: 'Účes', ik: 'k-uces', povinne: true, hlava: true },
  { id: 'barva', nazev: 'Barva vlasů', ik: 'k-barva', povinne: true, hlava: true },
  { id: 'oci', nazev: 'Oči', ik: 'k-oci', povinne: true, hlava: true },
  { id: 'pusa', nazev: 'Pusa', ik: 'k-pusa', povinne: true, hlava: true },
  { id: 'obleceni', nazev: 'Oblečení', ik: 'obleceni' },
  { id: 'hlava', nazev: 'Na hlavu', ik: 'k-hlava', hlava: true },
  { id: 'bryle', nazev: 'Brýle', ik: 'k-bryle', hlava: true },
  { id: 'tvar', nazev: 'Na obličej', ik: 'k-vousy', hlava: true },
  { id: 'boty', nazev: 'Boty', ik: 'u6', povinne: true },
  { id: 'ruka', nazev: 'V ruce', ik: 'k-ruka' },
  { id: 'mazlicek', nazev: 'Mazlíček', ik: 'u1' },
];

const v = (kat, id, nazev, cena, extra = {}) => ({ kat, id, nazev, cena, ...extra });
// b = klíč v blob.js (když se liší od id), c = barva. Id mají předponu, aby se nekřížila se starou postavičkou.
export const VECI = [
  // Těsto
  v('kuze', 't-susenka', 'Sušenka', 0, { b: 'susenka' }), v('kuze', 't-maslova', 'Máslová', 0, { b: 'maslova' }),
  v('kuze', 't-cokoladova', 'Čokoládová', 0, { b: 'cokoladova' }), v('kuze', 't-pernik', 'Perník', 0, { b: 'pernik' }),
  v('kuze', 't-posyp', 'S posypem', 120, { b: 'posyp' }), v('kuze', 't-poleva', 'S polevou', 180, { b: 'poleva' }),
  v('kuze', 't-oreo', 'Oreo', 280, { b: 'oreo' }), v('kuze', 't-ruzova', 'Růžová', 300, { b: 'ruzova' }),
  v('kuze', 't-modra', 'Modrá', 300, { b: 'modra' }), v('kuze', 't-zelena', 'Zelená', 400, { b: 'zelena' }),
  v('kuze', 't-fialova', 'Fialová', 400, { b: 'fialova' }), v('kuze', 't-meloun', 'Meloun', 600, { b: 'meloun' }),
  v('kuze', 't-beruska', 'Beruška', 700, { b: 'beruska' }), v('kuze', 't-zebra', 'Zebra', 900, { b: 'zebra' }),
  v('kuze', 't-leopard', 'Leopard', 900, { b: 'leopard' }), v('kuze', 't-tucnak', 'Tučňák', 1000, { b: 'tucnak' }),
  v('kuze', 't-galaxie', 'Galaxie', 1800, { b: 'galaxie' }), v('kuze', 't-zlata', 'Zlatá', 2000, { b: 'zlata' }),
  v('kuze', 't-duhova', 'Duhová', 3600, { b: 'duhova' }),

  // Účes
  v('uces', 'u-ofina', 'Ofina', 0, { b: 'ofina' }), v('uces', 'u-dlouhe', 'Dlouhé', 0, { b: 'dlouhe' }),
  v('uces', 'u-culiky', 'Culíky', 0, { b: 'culiky' }), v('uces', 'u-rozcuch', 'Rozcuch', 0, { b: 'rozcuch' }),
  v('uces', 'u-kudrny', 'Kudrny', 0, { b: 'kudrny' }), v('uces', 'u-zadne', 'Holá sušenka', 0, { b: '' }),
  v('uces', 'u-drdol', 'Drdol', 80, { b: 'drdol' }), v('uces', 'u-ciro', 'Číro', 240, { b: 'ciro' }),

  // Barva vlasů
  v('barva', 'b-hneda', 'Hnědá', 0, { c: '#5b3424' }), v('barva', 'b-cerna', 'Černá', 0, { c: '#2b2230' }),
  v('barva', 'b-blond', 'Blond', 0, { c: '#f2c94c' }), v('barva', 'b-zrzava', 'Zrzavá', 0, { c: '#d9622b' }),
  v('barva', 'b-ruzova', 'Růžová', 120, { c: '#ff8fc0' }), v('barva', 'b-modra', 'Modrá', 120, { c: '#4dabf7' }),
  v('barva', 'b-zelena', 'Zelená', 180, { c: '#45d07a' }), v('barva', 'b-fialova', 'Fialová', 180, { c: '#9b6bff' }),
  v('barva', 'b-bila', 'Bílá', 300, { c: '#f4f1f7' }), v('barva', 'b-duha', 'Duhová', 1600, { c: 'duha' }),

  // Oči
  v('oci', 'o-koukaci', 'Koukací', 0, { b: 'koukaci' }), v('oci', 'o-nahoru', 'Zasněné', 50, { b: 'nahoru' }),
  v('oci', 'o-silene', 'Šilhavé', 60, { b: 'silene' }), v('oci', 'o-ospale', 'Ospalé', 60, { b: 'ospale' }),
  v('oci', 'o-zamilovane', 'Zamilované', 160, { b: 'zamilovane' }), v('oci', 'o-hvezdy', 'Hvězdičky', 300, { b: 'hvezdy' }),
  v('oci', 'o-kyklop', 'Kyklop', 600, { b: 'kyklop' }), v('oci', 'o-spiralky', 'Hypnóza', 1000, { b: 'spiralky' }),

  // Pusa
  v('pusa', 'p-usmev', 'Úsměv', 0, { b: 'usmev' }), v('pusa', 'p-otevrena', 'Jupí', 0, { b: 'otevrena' }),
  v('pusa', 'p-jazyk', 'Jazyk', 40, { b: 'jazyk' }), v('pusa', 'p-zuby', 'Zubatá', 80, { b: 'zuby' }),
  v('pusa', 'p-zobak', 'Zobák', 500, { b: 'zobak' }), v('pusa', 'p-vampir', 'Upír', 600, { b: 'vampir' }),

  // Oblečení
  v('obleceni', 'ob-tricko', 'Tričko', 0, { b: 'tricko' }), v('obleceni', 'ob-mikina', 'Mikina', 0, { b: 'mikina' }),
  v('obleceni', 'ob-saty', 'Šaty', 60, { b: 'saty' }), v('obleceni', 'ob-monterky', 'Montérky', 120, { b: 'monterky' }),
  v('obleceni', 'ob-plavky', 'Plavky', 160, { b: 'plavky' }), v('obleceni', 'ob-smoking', 'Smoking', 800, { b: 'smoking' }),

  // Na hlavu
  v('hlava', 'h-masle', 'Mašle', 40, { b: 'masle' }), v('hlava', 'h-party', 'Párty čepička', 100, { b: 'party' }),
  v('hlava', 'h-ousko', 'Kočičí uši', 120, { b: 'ousko' }), v('hlava', 'h-kuchar', 'Kuchařská čepice', 240, { b: 'kuchar' }),
  v('hlava', 'h-fedora', 'Fedora', 300, { b: 'fedora' }), v('hlava', 'h-kovboj', 'Kovbojský klobouk', 400, { b: 'kovboj' }),
  v('hlava', 'h-vrtulka', 'Vrtulka', 500, { b: 'vrtulka' }), v('hlava', 'h-tykadla', 'Tykadla', 600, { b: 'tykadla' }),
  v('hlava', 'h-cylindr', 'Cylindr', 800, { b: 'cylindr' }), v('hlava', 'h-korunka', 'Korunka', 2000, { b: 'korunka' }),

  // Brýle
  v('bryle', 'br-nerd', 'Nerdky', 80, { b: 'nerd' }), v('bryle', 'br-srdickove', 'Srdíčkové', 180, { b: 'srdickove' }),
  v('bryle', 'br-velke', 'Obří sluneční', 300, { b: 'velke' }), v('bryle', 'br-lyzarske', 'Lyžařské', 600, { b: 'lyzarske' }),

  // Na obličej
  v('tvar', 'tv-pihy', 'Pihy', 30), v('tvar', 'tv-knir', 'Knír', 400),

  // Boty
  v('boty', 'bo-modre', 'Modré tenisky', 0, { c: '#4dabf7' }), v('boty', 'bo-ruzove', 'Růžové tenisky', 0, { c: '#ff5fa2' }),
  v('boty', 'bo-cervene', 'Červené', 60, { c: '#e8352b' }), v('boty', 'bo-zlute', 'Žluté', 60, { c: '#ffd34d' }),
  v('boty', 'bo-cerne', 'Černé', 100, { c: '#2b2230' }), v('boty', 'bo-zlate', 'Zlaté', 1400, { c: '#e0a800' }),

  // V ruce
  v('ruka', 'r-cokolada', 'Čokoláda', 60, { b: 'cokolada' }), v('ruka', 'r-lizatko', 'Lízátko', 80, { b: 'lizatko' }),

  // Mazlíček
  v('mazlicek', 'm-kure', 'Kuřátko', 300, { b: 'kure' }), v('mazlicek', 'm-hovinko', 'Hovínko', 1000, { b: 'hovinko' }),
];

export const vec = id => VECI.find(x => x.id === id);
export const VYCHOZI = { verze: 2, kuze: 't-susenka', uces: 'u-ofina', barva: 'b-hneda', oci: 'o-koukaci', pusa: 'p-usmev', obleceni: 'ob-tricko', boty: 'bo-modre' };
export const maVec = (profil, x) => x.cena === 0 || profil.koupeno.includes(x.id);

// Ceny věcí dřívější postavičky (před sušenkou) – při převodu profilu se za ně vrací sušenky.
export const STARE_CENY = {"k-mata":150,"k-modra":200,"k-fialova":250,"k-zelena":400,"k-stribrna":700,"k-zlata":1000,"k-duha":1800,"dva":20,"drdol":25,"kudrny":40,"vlny":50,"copanky":60,"buns":80,"emo":90,"afro":120,"jezek":140,"dredy":200,"ciro":300,"plesata":450,"obri-ciro":900,"vez":1300,"platina":40,"ruzova":60,"lila":60,"modra":70,"matova":70,"neon":150,"cervena":150,"stribrna":300,"ombre":450,"plameny":700,"duhova":1200,"galaxie":1600,"mrk":30,"linky":50,"velke":80,"oci-hvezdy":150,"oci-srdce":180,"ospale":60,"hypno":450,"zombie":600,"laser":1000,"kyklop":1500,"o-fialove":60,"o-ruzove":80,"o-tyrkys":100,"o-cervene":250,"o-zlate":400,"o-duhove":900,"culik-pusa":20,"rtenka":40,"jazyk":60,"rovnatka":90,"pusinka":120,"bublina":200,"upir":450,"zlaty-zub":700,"duhovy-jazyk":1100,"mikina-mata":20,"srdce":30,"pruhy":40,"dziny":55,"pyzamo":60,"hvezdy":70,"dres":90,"hawaii":110,"duha":120,"kozena":180,"zlata":250,"smoking":350,"kostlivec":500,"skafandr":750,"brneni":1000,"diamant":1500,"masle":25,"kulich":35,"ksiltovka":40,"kvetiny":45,"party":50,"ousko":60,"sluchatka":70,"satek":80,"vrtulka":110,"kovboj":140,"kuchar":150,"carodej":180,"roh":200,"korunka":200,"rohy":250,"svatozar":300,"viking":450,"kachna":600,"toast":800,"dort":1100,"ufo":1500,"nerd":25,"kulate":30,"slunecni":40,"srdickove":50,"kocici":70,"hvezdickove":80,"3d":100,"monokl":150,"lyzarske":200,"pixel":400,"visor":700,"smesne":1000,"pecky":15,"kruhy":30,"perly":40,"srdicka-n":50,"hvezdy-n":60,"blesky":90,"tresne":120,"diamanty":300,"obri-kruhy":450,"banany":600,"rybicky":800,"disko":1100,"nos":80,"oboci":100,"septum":130,"ret":150,"vsude":500,"retizek":30,"choker":50,"perly-n":60,"medailon":90,"korale":70,"hroty":200,"rapper":400,"diamant-n":900,"bonbony":1100,"koralky":15,"pratelstvi":25,"hodinky":60,"chytre":120,"zlaty":150,"hroty-n":200,"diamant-r":600,"strniste":40,"knir":60,"bradka":80,"plnovous":150,"kniratko":300,"viking-v":500,"duhovy-v":1000,"pihy":10,"srdicka":20,"trpytky":30,"naplast":40,"hvezda-t":60,"valecne":150,"kocici-t":120,"duhove-t":400,"tetovani":600,"superhrdina":300,"ninja":500,"panda":600,"dino":800,"klaun":1000,"ufoun":1100,"zombie-m":1200,"robot":1400,"astronaut":1600,"banan":1800,"kostka":2200,"burger":3000,"kniha":15,"zmrzlina":25,"mobil":30,"ovladac":40,"mikrofon":50,"boba":60,"lizatko":70,"skate":120,"kytara":180,"hulka":300,"trofej":500,"mec":800,"ryba":1000,"kralicek":70,"kocka":80,"pejsek":80,"krecek":90,"kure":100,"chobotnicka":120,"axolotl":150,"lenochod":250,"dracek":250,"jednorozec":300,"t-rex":600,"duch":800,"robot-m":1000,"ufo-m":1300,"p-mata":15,"p-slunce":15,"p-srdicka":60,"p-noc":80,"p-duha":100,"p-ohen":250,"p-vesmir":400,"p-disko":700,"p-zlato":1200};

const nahodna = a => a[Math.floor(Math.random() * a.length)];
export function nahodnyVzhled(rod) {
  const zdarma = kat => VECI.filter(x => x.kat === kat && x.cena === 0).map(x => x.id);
  const uces = rod === 'm' ? ['u-rozcuch', 'u-kudrny', 'u-ofina'] : rod === 'z' ? ['u-ofina', 'u-dlouhe', 'u-culiky', 'u-kudrny'] : zdarma('uces').filter(u => u !== 'u-zadne');
  return { ...VYCHOZI, rod, kuze: nahodna(zdarma('kuze')), uces: nahodna(uces), barva: nahodna(zdarma('barva')), oci: nahodna(zdarma('oci')),
    pusa: nahodna(zdarma('pusa')), obleceni: nahodna(zdarma('obleceni')), boty: rod === 'm' ? 'bo-modre' : rod === 'z' ? 'bo-ruzove' : nahodna(zdarma('boty')) };
}

// Vzhled z katalogu (id věcí) → parametry kreslení v blob.js. Neznámá id (starý formát) spadnou na výchozí.
function proKresleni(z) {
  const b = (kat, x = z[kat]) => { const w = vec(x); return w && w.kat === kat ? w : vec(VYCHOZI[kat]) || null; };
  const vol = kat => { const w = vec(z[kat]); return w && w.kat === kat ? w : null; };
  return {
    rod: z.rod, kuze: b('kuze').b, vlasy: b('uces').b, barvaVlasu: b('barva').c, oci: b('oci').b, pusa: b('pusa').b,
    obleceni: vol('obleceni')?.b, hlava: vol('hlava')?.b, bryle: vol('bryle')?.b, boty: b('boty').c,
    kousnuti: losDne(z, 'kous' + RELACE), pihy: z.tvar === 'tv-pihy', vousy: z.tvar === 'tv-knir' ? 'knir' : '', vec: vol('ruka')?.b, mazlicek: vol('mazlicek')?.b,
  };
}

// ---------- Kreslení ----------
let n = 0;
// Pozadí avatara: bílé, s jednou dvěma vtipnými čmáranicemi tenkou čarou (obraz nakřivo, slunce s mašlí…).
// Kresba zalézá pod okraj kruhu a za postavičku – barevná je jen postavička.
const CARA = 'fill="none" stroke="#8f86a0" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"';
const hv = (x, y, r) => `<path d="M${x} ${y - r} l${r * .3} ${r * .7} l${r * .7} ${r * .3} l${-r * .7} ${r * .3} l${-r * .3} ${r * .7} l${-r * .3} ${-r * .7} l${-r * .7} ${-r * .3} l${r * .7} ${-r * .3}z"/>`;
// Jen jedna až dvě vtipné, schválně „nedokonalé“ kresby na scénku – jako načmárané fixou.
const SCENY_POZADI = {
  obraz: `<g transform="rotate(-14 20 30)"><path d="M20 10 l-12 12 M20 10 l12 12"/><circle cx="20" cy="9" r="1.2"/>
      <path d="M5 22 q15 -1.5 30 .5 q1 12 -.5 22 q-15 1 -29.5 -.5 q-1.5 -10 0 -22z"/>
      <path d="M13 40 q-1 -8 4 -10 l-1 -4 l3 3 q2 -1 4 0 l3 -3 l-1 4 q5 2 3 10 M18 33 h.1 M23 33 h.1 M20 36 q1 1 2 0 M25 39 q6 -2 4 -7"/></g>`,
  slunce: `<circle cx="98" cy="26" r="11"/><path d="M98 10 v-5 M98 42 v4 M82 26 h-5 M114 26 h4 M87 15 l-4 -4 M109 15 l4 -4 M87 37 l-3 3 M109 37 l4 4"/>
    <path d="M91 25 q3 -3 6 0 M99 25 q3 -3 6 0 M97 25 h2 M93 31 q5 4 10 0"/><path d="M90 25 h16" stroke-width="2.4"/>
    <path d="M98 14 l-7 -5 l1 8 z M98 14 l7 -5 l-1 8 z"/><circle cx="98" cy="14" r="1.6"/>`,
  kytka: `<path d="M8 112 l3 -18 h18 l3 18 z M7 94 h26"/><path d="M20 94 q-2 -14 1 -26"/>
    <path d="M21 72 q-9 -6 -16 -2 q5 7 15 5 M21 80 q10 -10 18 -6 q-6 8 -17 8"/>
    <circle cx="21" cy="60" r="7"/>${[0, 60, 120, 180, 240, 300].map(a => `<path d="M21 60 m0 -7 q4 -6 0 -11 q-4 5 0 11" transform="rotate(${a} 21 60)"/>`).join('')}
    <path d="M18.5 59 h.1 M23.5 59 h.1 M19 62.5 q2 1.5 4 0"/>`,
  hodiny: `<path d="M86 14 q14 -4 26 4 q4 10 -2 18 q-2 8 -8 14 q-2 10 -6 6 q-1 -8 -6 -10 q-10 -4 -8 -16 q-2 -10 4 -16z"/>
    <path d="M98 24 v8 l6 3 M95 18 h.1 M106 28 h.1 M90 30 h.1"/><path d="M96 56 q0 5 -2 7"/>`,
  mesic: `<path d="M98 16 a16 16 0 1 0 14 24 a12 12 0 1 1 -14 -24z"/><path d="M92 18 q8 -12 22 -8 l-6 6 M114 10 l3 -2"/><circle cx="118" cy="7" r="2.5"/>
    <path d="M100 30 q2 2 4 0"/><path d="M14 22 h6 l-6 6 h6 M24 12 h4 l-4 4 h4 M30 4 h3 l-3 3 h3"/>`,
  kaktus: `<path d="M8 112 l2 -12 h20 l2 12 z"/><path d="M15 100 v-26 q5 -6 10 0 v26 M15 86 q-8 1 -8 -8 v-4 M25 82 q7 0 7 -8 v-3"/>
    <path d="M20 70 l-6 -2 l7 -16 l6 15 z"/><circle cx="21" cy="50" r="2"/><path d="M14 64 l12 4 M18 78 h.1 M22 78 h.1 M18 82 q2 1.5 4 0 M30 54 l3 -3 M10 56 l-3 -2"/>`,
  mracek: `<path d="M86 34 q-8 -2 -6 -10 q2 -8 11 -6 q4 -9 14 -6 q9 -2 11 7 q8 2 6 10 q-2 6 -9 5 z"/>
    <path d="M94 34 l-3 10 l-4 1 M110 34 l2 10 l4 1 M95 25 h.1 M104 25 h.1 M97 29 q3 2 6 0"/><path d="M84 56 l2 4 M90 52 l2 4"/>`,
  vlastovka: `<path d="M86 24 l30 -12 l-12 24 l-5 -8 z M99 28 l5 8 M99 28 l17 -16"/>
    <path d="M84 30 q-14 6 -10 16 q6 8 12 0 q4 -10 -8 -8 q-14 4 -14 18" stroke-dasharray="2 3"/>`,
  balonek: `<path d="M22 14 q-10 0 -10 12 q0 12 10 15 q10 -3 10 -15 q0 -12 -10 -12z M20 41 l2 3 l2 -3"/><path d="M17 20 q-2 3 -1 7"/>
    <path d="M22 44 q-6 10 2 20 q8 10 -2 22"/><path d="M16 86 h10 v12 q4 0 6 4 q0 4 -6 4 h-10 z"/><path d="M16 92 h10"/>`,
  lampa: `<path d="M98 112 v-50 M90 112 h16"/><g transform="rotate(16 98 50)"><path d="M86 58 l6 -18 h12 l6 18 z"/></g>
    <path d="M108 60 q2 10 0 16 q-4 2 -4 -4 q2 -6 2 -12 M104 70 h6"/>`,
  ptacek: `<path d="M80 50 H118 M84 50 v-36 h32 v36 M100 14 v36"/><path d="M88 46 q0 -8 8 -8 q8 0 7 8 z M103 42 l5 -1 l-5 3 M93 41 h.1"/>
    <path d="M89 38 h14 M92 38 v-5 h8 v5"/><path d="M96 46 v4 M99 46 v4"/>`,
  knihy: `<path d="M4 46 H38 M4 72 H38"/><path d="M8 46 v-18 M13 46 v-20 M18 46 v-16 l5 -14 M8 72 v-16 M14 72 v-18"/>
    <g transform="rotate(32 30 88)"><rect x="24" y="78" width="8" height="18" rx="1"/></g><path d="M22 76 l-2 -3 M30 74 l1 -3 M36 80 l3 -1"/>`,
};
// Scénka se losuje: podle „semínka“ postavičky (vzhled.seminko, nastaví se jednou) a dnešního data.
// Během dne je stejná (v Drip shopu neposkakuje), další den jiná; každá postavička má jinou.
const SCENY_KLICE = Object.keys(SCENY_POZADI);
// Los podle semínka postavičky a dne: každý den jiné pozadí i ukousnutí, ale všude v aplikaci stejné.
const losDne = (z, sul = '') => [...(z.seminko || JSON.stringify([z.kuze, z.uces, z.barva, z.oci])) + new Date().toDateString() + sul]
  .reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 11);
// Ukousnutí se losuje znovu při každém otevření aplikace (během jednoho otevření je všude stejné).
const RELACE = Math.random().toString(36).slice(2, 8);
function pozadi(z) {
  const h = losDne(z);
  return `<rect width="120" height="120" fill="#fff"/><g ${CARA}>${SCENY_POZADI[SCENY_KLICE[h % SCENY_KLICE.length]]}</g>`;
}
export const noveSeminko = () => Math.random().toString(36).slice(2, 10);


// velikost v px; vyrez: 'cela' (celá postavička) nebo 'hlava' (malý avatar v seznamech).
// 5. parametr (volby z dřívějších návrhů vzhledu) se ignoruje.
export function postavicka(vzhled = VYCHOZI, velikost = 120, vyrez = 'cela', pohyb = velikost >= 90, _volby = {}) {
  const z = { ...VYCHOZI, ...vzhled };
  const id = 'cl' + (++n);
  const viewBox = vyrez === 'hlava' ? '14 6 92 92' : '0 0 120 120';
  // Pohyb (mrkání, mávání, dech…) jen u větších postaviček; každá má jiné zpoždění, aby dvě vedle sebe nemrkaly naráz.
  const hybe = pohyb ? ` hybe" style="--d:${(-Math.random() * 6).toFixed(2)}s` : '';
  return `<svg class="postavicka${hybe}" width="${velikost}" height="${velikost}" viewBox="${viewBox}" aria-hidden="true">
    <clipPath id="${id}"><circle cx="60" cy="60" r="60"/></clipPath>
    <g clip-path="url(#${id})">${pozadi(z)}
      <svg x="7" y="9" width="106" height="108" viewBox="${SUSENKA_VIEWBOX}">${susenkaObsah(proKresleni(z))}</svg></g>
    <circle cx="60" cy="60" r="59" fill="none" stroke="#ece6f0" stroke-width="2"/></svg>`;
}
