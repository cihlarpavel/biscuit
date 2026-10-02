// Vlastní postavička ve stylu Pou: každá holka (nebo kluk) si ji za sušenky obléká a vylepšuje.
// Vzhled je objekt { kategorie: id věci }. Vrstvy se skládají do jednoho SVG (viewBox 0 0 120 120),
// takže je postavička ostrá v jakékoli velikosti.
// Vzácnost se odvozuje z ceny (VZACNOST): čím dražší, tím šílenější – až po bizár kostýmy.
// Nová věc = položka ve VECI + větev v příslušné kreslicí funkci. Id věcí neměnit (jsou v koupeno).

// ---------- Vzácnost ----------
export const VZACNOST = [
  { od: 0, id: 'bezne', nazev: 'Běžné', barva: '#8a7891' },
  { od: 45, id: 'cool', nazev: 'Cool', barva: '#3fb59a' },
  { od: 130, id: 'epicke', nazev: 'Epické', barva: '#8b6cf0' },
  { od: 400, id: 'legendarni', nazev: 'Legendární', barva: '#e0a800' },
  { od: 1000, id: 'bizar', nazev: 'Bizár', barva: '#ff4f9a' },
];
export const vzacnost = cena => VZACNOST.filter(v => cena >= v.od).pop();

// ---------- Kategorie ----------
export const KATEGORIE = [
  { id: 'kuze', nazev: 'Pleť', ik: 'k-kuze', povinne: true, hlava: true },
  { id: 'uces', nazev: 'Účes', ik: 'k-uces', povinne: true, hlava: true },
  { id: 'barva', nazev: 'Barva vlasů', ik: 'k-barva', povinne: true, hlava: true },
  { id: 'oci', nazev: 'Oči', ik: 'k-oci', povinne: true, hlava: true },
  { id: 'duhovka', nazev: 'Barva očí', ik: 'k-duhovka', povinne: true, hlava: true },
  { id: 'pusa', nazev: 'Pusa', ik: 'k-pusa', povinne: true, hlava: true },
  { id: 'obleceni', nazev: 'Oblečení', ik: 'obleceni', povinne: true },
  { id: 'hlava', nazev: 'Na hlavu', ik: 'k-hlava', hlava: true },
  { id: 'bryle', nazev: 'Brýle', ik: 'k-bryle', hlava: true },
  { id: 'nausnice', nazev: 'Náušnice', ik: 'k-nausnice', hlava: true },
  { id: 'piercing', nazev: 'Piercing', ik: 'k-piercing', hlava: true },
  { id: 'nahrdelnik', nazev: 'Náhrdelník', ik: 'k-nahrdelnik' },
  { id: 'naramek', nazev: 'Náramek', ik: 'k-naramek' },
  { id: 'vousy', nazev: 'Vousy', ik: 'k-vousy', hlava: true },
  { id: 'tvar', nazev: 'Na obličej', ik: 'k-tvar', hlava: true },
  { id: 'maska', nazev: 'Masky a kostýmy', ik: 'k-maska', hlava: true },
  { id: 'ruka', nazev: 'V ruce', ik: 'k-ruka' },
  { id: 'mazlicek', nazev: 'Mazlíček', ik: 'u1' },
  { id: 'pozadi', nazev: 'Pozadí', ik: 'k-pozadi', povinne: true },
];

// ---------- Katalog ----------
const v = (kat, id, nazev, cena, extra = {}) => ({ kat, id, nazev, cena, ...extra });
export const VECI = [
  // Pleť
  v('kuze', 'k1', 'Světlá', 0, { c: '#ffd9c2' }), v('kuze', 'k5', 'Porcelán', 0, { c: '#ffe9dc' }),
  v('kuze', 'k2', 'Béžová', 0, { c: '#f1c09b' }), v('kuze', 'k3', 'Snědá', 0, { c: '#c98d63' }),
  v('kuze', 'k4', 'Tmavá', 0, { c: '#8d5a3b' }), v('kuze', 'k6', 'Čokoládová', 0, { c: '#5e3826' }),
  v('kuze', 'k-mata', 'Mátová', 150, { c: '#a6ebd2' }), v('kuze', 'k-modra', 'Modrá', 200, { c: '#9cc8ff' }),
  v('kuze', 'k-fialova', 'Fialová', 250, { c: '#c9adff' }), v('kuze', 'k-zelena', 'Zelená (ufoun)', 400, { c: '#9be08a' }),
  v('kuze', 'k-stribrna', 'Stříbrná', 700, { c: '#dfe4ec', lesk: true }), v('kuze', 'k-zlata', 'Zlatá', 1000, { c: '#ffd34d', lesk: true }),
  v('kuze', 'k-duha', 'Duhová', 1800, { duha: true }),

  // Účes
  v('uces', 'culik', 'Culík', 0), v('uces', 'dlouhe', 'Dlouhé', 0), v('uces', 'mikada', 'Mikáda', 0),
  v('uces', 'kratke', 'Krátké', 0), v('uces', 'dva', 'Dva culíky', 20), v('uces', 'drdol', 'Drdol', 25),
  v('uces', 'kudrny', 'Kudrny', 40), v('uces', 'vlny', 'Dlouhé vlny', 50), v('uces', 'copanky', 'Copánky', 60),
  v('uces', 'buns', 'Space buns', 80), v('uces', 'emo', 'Emo ofina', 90), v('uces', 'afro', 'Afro', 120),
  v('uces', 'jezek', 'Ježek', 140), v('uces', 'dredy', 'Dredy', 200), v('uces', 'ciro', 'Číro', 300),
  v('uces', 'plesata', 'Pleš', 450), v('uces', 'obri-ciro', 'Obří číro', 900), v('uces', 'vez', 'Vlasová věž', 1300),

  // Barva vlasů
  v('barva', 'hneda', 'Hnědá', 0, { c: '#8a4b2f' }), v('barva', 'blond', 'Blond', 0, { c: '#e8c06a' }),
  v('barva', 'cerna', 'Černá', 0, { c: '#2f2530' }), v('barva', 'zrzava', 'Zrzavá', 0, { c: '#c8592b' }),
  v('barva', 'platina', 'Platinová', 40, { c: '#f3ead2' }),
  v('barva', 'ruzova', 'Růžová', 60, { c: '#ff8fc4' }), v('barva', 'lila', 'Lila', 60, { c: '#b69cff' }),
  v('barva', 'modra', 'Modrá', 70, { c: '#6fa8ff' }), v('barva', 'matova', 'Mátová', 70, { c: '#6fd4bd' }),
  v('barva', 'neon', 'Neonově zelená', 150, { c: '#7dff5a' }), v('barva', 'cervena', 'Ohnivě červená', 150, { c: '#ff3b3b' }),
  v('barva', 'stribrna', 'Stříbrná', 300, { c: '#c9ced8' }),
  v('barva', 'ombre', 'Ombré', 450, { prechod: ['#ff8fc4', '#6fa8ff'] }),
  v('barva', 'plameny', 'Plameny', 700, { prechod: ['#ffd34d', '#ff3b3b'] }),
  v('barva', 'duhova', 'Duhová', 1200, { duha: true }),
  v('barva', 'galaxie', 'Galaxie', 1600, { prechod: ['#3d2b8f', '#ff5fc8'], hvezdy: true }),

  // Oči
  v('oci', 'normal', 'Klasika', 0), v('oci', 'rasy', 'Řasy', 0), v('oci', 'mrk', 'Mrkání', 30),
  v('oci', 'linky', 'Kočičí linky', 50), v('oci', 'velke', 'Velké lesklé', 80), v('oci', 'oci-hvezdy', 'Hvězdičky', 150),
  v('oci', 'oci-srdce', 'Zamilované', 180), v('oci', 'ospale', 'Ospalé', 60), v('oci', 'hypno', 'Hypnóza', 450),
  v('oci', 'zombie', 'Zombie', 600), v('oci', 'laser', 'Laserové', 1000), v('oci', 'kyklop', 'Kyklop', 1500),

  // Barva očí
  v('duhovka', 'o-hnede', 'Hnědé', 0, { c: '#7a4a2a' }), v('duhovka', 'o-modre', 'Modré', 0, { c: '#3d8fe0' }),
  v('duhovka', 'o-zelene', 'Zelené', 0, { c: '#3faa6a' }), v('duhovka', 'o-sede', 'Šedé', 0, { c: '#7d8696' }),
  v('duhovka', 'o-fialove', 'Fialové', 60, { c: '#8b5cf0' }), v('duhovka', 'o-ruzove', 'Růžové', 80, { c: '#ff5fa8' }),
  v('duhovka', 'o-tyrkys', 'Tyrkysové', 100, { c: '#19c3c3' }), v('duhovka', 'o-cervene', 'Rudé', 250, { c: '#e8264f' }),
  v('duhovka', 'o-zlate', 'Zlaté', 400, { c: '#e0a800' }), v('duhovka', 'o-duhove', 'Duhové', 900, { duha: true }),

  // Pusa
  v('pusa', 'usmev', 'Úsměv', 0), v('pusa', 'smich', 'Smích', 0), v('pusa', 'culik-pusa', 'Úšklebek', 20),
  v('pusa', 'rtenka', 'Rtěnka', 40), v('pusa', 'jazyk', 'Vyplazený jazyk', 60), v('pusa', 'rovnatka', 'Rovnátka', 90),
  v('pusa', 'pusinka', 'Pusinka', 120), v('pusa', 'bublina', 'Žvýkačka', 200), v('pusa', 'upir', 'Upír', 450),
  v('pusa', 'zlaty-zub', 'Zlatý zub', 700), v('pusa', 'duhovy-jazyk', 'Duhový jazyk', 1100),

  // Oblečení
  v('obleceni', 'mikina-lila', 'Lila mikina', 0), v('obleceni', 'mikina-ruzova', 'Růžová mikina', 0),
  v('obleceni', 'mikina-modra', 'Modrá mikina', 0), v('obleceni', 'mikina-mata', 'Mátová mikina', 20),
  v('obleceni', 'srdce', 'Tričko se srdcem', 30), v('obleceni', 'pruhy', 'Pruhovaný svetr', 40),
  v('obleceni', 'dziny', 'Džínová bunda', 55), v('obleceni', 'pyzamo', 'Pyžamo', 60), v('obleceni', 'hvezdy', 'Hvězdná mikina', 70),
  v('obleceni', 'dres', 'Dres', 90), v('obleceni', 'hawaii', 'Havajská košile', 110), v('obleceni', 'duha', 'Duhový svetr', 120),
  v('obleceni', 'kozena', 'Kožená bunda', 180), v('obleceni', 'zlata', 'Zlatá bunda', 250), v('obleceni', 'smoking', 'Smoking', 350),
  v('obleceni', 'kostlivec', 'Kostlivec', 500), v('obleceni', 'skafandr', 'Skafandr', 750), v('obleceni', 'brneni', 'Rytířské brnění', 1000),
  v('obleceni', 'diamant', 'Diamantová bunda', 1500),

  // Na hlavu
  v('hlava', 'masle', 'Mašle', 25), v('hlava', 'kulich', 'Kulich', 35), v('hlava', 'ksiltovka', 'Kšiltovka', 40),
  v('hlava', 'kvetiny', 'Věneček', 45), v('hlava', 'party', 'Party čepička', 50), v('hlava', 'ousko', 'Kočičí ouška', 60),
  v('hlava', 'sluchatka', 'Sluchátka', 70), v('hlava', 'satek', 'Pirátský šátek', 80), v('hlava', 'vrtulka', 'Vrtulková čepice', 110),
  v('hlava', 'kovboj', 'Kovbojský klobouk', 140), v('hlava', 'kuchar', 'Kuchařská čepice', 150), v('hlava', 'carodej', 'Čarodějnický klobouk', 180),
  v('hlava', 'roh', 'Roh jednorožce', 200), v('hlava', 'korunka', 'Korunka', 200), v('hlava', 'rohy', 'Čertí rohy', 250),
  v('hlava', 'svatozar', 'Svatozář', 300), v('hlava', 'viking', 'Vikinská helma', 450), v('hlava', 'kachna', 'Kachnička na hlavě', 600, { e: '🦆' }),
  v('hlava', 'toast', 'Toast na hlavě', 800, { e: '🍞' }), v('hlava', 'dort', 'Dort na hlavě', 1100, { e: '🎂' }),
  v('hlava', 'ufo', 'UFO nad hlavou', 1500, { e: '🛸' }),

  // Brýle
  v('bryle', 'nerd', 'Nerd brýle', 25), v('bryle', 'kulate', 'Kulaté', 30), v('bryle', 'slunecni', 'Sluneční', 40),
  v('bryle', 'srdickove', 'Srdíčkové', 50), v('bryle', 'kocici', 'Kočičí', 70), v('bryle', 'hvezdickove', 'Hvězdičkové', 80),
  v('bryle', '3d', '3D brýle', 100), v('bryle', 'monokl', 'Monokl', 150), v('bryle', 'lyzarske', 'Lyžařské', 200),
  v('bryle', 'pixel', 'Pixelové „deal with it“', 400), v('bryle', 'visor', 'Laserový hledí', 700), v('bryle', 'smesne', 'Brýle s nosem a knírem', 1000),

  // Náušnice
  v('nausnice', 'pecky', 'Pecky', 15), v('nausnice', 'kruhy', 'Kruhy', 30), v('nausnice', 'perly', 'Perly', 40),
  v('nausnice', 'srdicka-n', 'Srdíčka', 50), v('nausnice', 'hvezdy-n', 'Hvězdy', 60), v('nausnice', 'blesky', 'Blesky', 90),
  v('nausnice', 'tresne', 'Třešně', 120, { e: '🍒' }), v('nausnice', 'diamanty', 'Diamanty', 300),
  v('nausnice', 'obri-kruhy', 'Obří zlaté kruhy', 450), v('nausnice', 'banany', 'Banány', 600, { e: '🍌' }),
  v('nausnice', 'rybicky', 'Rybičky', 800, { e: '🐟' }), v('nausnice', 'disko', 'Disko koule', 1100, { e: '🪩' }),

  // Piercing
  v('piercing', 'nos', 'Kroužek v nose', 80), v('piercing', 'oboci', 'Obočí', 100), v('piercing', 'septum', 'Septum', 130),
  v('piercing', 'ret', 'Ret', 150), v('piercing', 'vsude', 'Všude najednou', 500),

  // Náhrdelník
  v('nahrdelnik', 'retizek', 'Řetízek', 30), v('nahrdelnik', 'choker', 'Choker', 50), v('nahrdelnik', 'perly-n', 'Perly', 60),
  v('nahrdelnik', 'medailon', 'Medailon se srdcem', 90), v('nahrdelnik', 'korale', 'Barevné korále', 70),
  v('nahrdelnik', 'hroty', 'Choker s hroty', 200), v('nahrdelnik', 'rapper', 'Zlatý řetěz', 400), v('nahrdelnik', 'diamant-n', 'Diamantový', 900),
  v('nahrdelnik', 'bonbony', 'Náhrdelník z bonbonů', 1100),

  // Náramek
  v('naramek', 'koralky', 'Korálky', 15), v('naramek', 'pratelstvi', 'Náramek přátelství', 25), v('naramek', 'hodinky', 'Hodinky', 60),
  v('naramek', 'chytre', 'Chytré hodinky', 120), v('naramek', 'zlaty', 'Zlatý', 150), v('naramek', 'hroty-n', 'S hroty', 200),
  v('naramek', 'diamant-r', 'Diamantový', 600),

  // Vousy
  v('vousy', 'strniste', 'Strniště', 40), v('vousy', 'knir', 'Knír', 60), v('vousy', 'bradka', 'Bradka', 80),
  v('vousy', 'plnovous', 'Plnovous', 150), v('vousy', 'kniratko', 'Kroucený knír', 300), v('vousy', 'viking-v', 'Vikinské copánky', 500),
  v('vousy', 'duhovy-v', 'Duhový plnovous', 1000),

  // Na obličej
  v('tvar', 'pihy', 'Pihy', 10), v('tvar', 'srdicka', 'Srdíčka na tvářích', 20), v('tvar', 'trpytky', 'Třpytky', 30),
  v('tvar', 'naplast', 'Náplast', 40), v('tvar', 'hvezda-t', 'Hvězda na tváři', 60), v('tvar', 'valecne', 'Válečné barvy', 150),
  v('tvar', 'kocici-t', 'Kočičí vousky', 120), v('tvar', 'duhove-t', 'Duhové líčení', 400), v('tvar', 'tetovani', 'Tetování blesku', 600),

  // Masky a kostýmy – nejdražší, nejbizárnější
  v('maska', 'superhrdina', 'Maska superhrdiny', 300), v('maska', 'ninja', 'Ninja', 500), v('maska', 'panda', 'Kapuce panda', 600),
  v('maska', 'dino', 'Kapuce dinosaura', 800), v('maska', 'klaun', 'Klaun', 1000), v('maska', 'ufoun', 'Mimozemšťan', 1100),
  v('maska', 'zombie-m', 'Zombie', 1200), v('maska', 'robot', 'Robot', 1400), v('maska', 'astronaut', 'Astronaut', 1600),
  v('maska', 'banan', 'Kostým banánu', 1800), v('maska', 'kostka', 'Kostičková hlava', 2200), v('maska', 'burger', 'Hamburger místo hlavy', 3000, { e: '🍔' }),

  // V ruce
  v('ruka', 'susenka', 'Sušenka', 0, { e: '🍪' }), v('ruka', 'kniha', 'Kniha', 15, { e: '📘' }),
  v('ruka', 'zmrzlina', 'Zmrzlina', 25, { e: '🍦' }), v('ruka', 'mobil', 'Mobil', 30, { e: '📱' }),
  v('ruka', 'ovladac', 'Ovladač', 40, { e: '🎮' }), v('ruka', 'mikrofon', 'Mikrofon', 50, { e: '🎤' }),
  v('ruka', 'boba', 'Bubble tea', 60, { e: '🧋' }), v('ruka', 'lizatko', 'Lízátko', 70, { e: '🍭' }),
  v('ruka', 'skate', 'Skateboard', 120, { e: '🛹' }), v('ruka', 'kytara', 'Kytara', 180, { e: '🎸' }),
  v('ruka', 'hulka', 'Kouzelná hůlka', 300, { e: '🪄' }), v('ruka', 'trofej', 'Trofej', 500, { e: '🏆' }),
  v('ruka', 'mec', 'Meč', 800, { e: '🗡️' }), v('ruka', 'ryba', 'Ryba', 1000, { e: '🐟' }),

  // Mazlíček
  v('mazlicek', 'kralicek', 'Králíček', 70, { e: '🐰' }), v('mazlicek', 'kocka', 'Kočička', 80, { e: '🐱' }),
  v('mazlicek', 'pejsek', 'Pejsek', 80, { e: '🐶' }), v('mazlicek', 'krecek', 'Křeček', 90, { e: '🐹' }),
  v('mazlicek', 'kure', 'Kuřátko', 100, { e: '🐥' }), v('mazlicek', 'chobotnicka', 'Chobotnička', 120, { e: '🐙' }),
  v('mazlicek', 'axolotl', 'Žába', 150, { e: '🐸' }), v('mazlicek', 'lenochod', 'Lenochod', 250, { e: '🦥' }),
  v('mazlicek', 'dracek', 'Dráček', 250, { e: '🐲' }), v('mazlicek', 'jednorozec', 'Jednorožec', 300, { e: '🦄' }),
  v('mazlicek', 't-rex', 'T-rex', 600, { e: '🦖' }), v('mazlicek', 'duch', 'Duch', 800, { e: '👻' }),
  v('mazlicek', 'robot-m', 'Robot', 1000, { e: '🤖' }), v('mazlicek', 'ufo-m', 'Mimozemšťánek', 1300, { e: '👽' }),

  // Pozadí
  v('pozadi', 'p-ruzove', 'Růžové', 0, { c: ['#ffd6e8', '#ffb3d1'] }), v('pozadi', 'p-lila', 'Lila', 0, { c: ['#e9e0ff', '#cbb8ff'] }),
  v('pozadi', 'p-mata', 'Mátové', 15, { c: ['#dcf7ef', '#a8e8d6'] }), v('pozadi', 'p-slunce', 'Sluníčko', 15, { c: ['#fff3c4', '#ffd76e'] }),
  v('pozadi', 'p-srdicka', 'Srdíčka', 60, { c: ['#ffe1ee', '#ff9cc7'], vzor: '♥' }),
  v('pozadi', 'p-noc', 'Hvězdná noc', 80, { c: ['#3d3478', '#1f1a45'], vzor: '✦' }),
  v('pozadi', 'p-duha', 'Duha', 100, { duha: true }),
  v('pozadi', 'p-ohen', 'Oheň', 250, { c: ['#ffd34d', '#ff4f2e'], vzor: '🔥' }),
  v('pozadi', 'p-vesmir', 'Vesmír', 400, { c: ['#2b1a6b', '#0b0626'], vzor: '🪐' }),
  v('pozadi', 'p-disko', 'Disko', 700, { c: ['#ff5fc8', '#5b2bd6'], vzor: '✨' }),
  v('pozadi', 'p-zlato', 'Zlato', 1200, { c: ['#fff1a8', '#e0a800'], vzor: '👑' }),
];

export const vec = id => VECI.find(x => x.id === id);
export const VYCHOZI = { kuze: 'k1', uces: 'culik', barva: 'hneda', oci: 'normal', duhovka: 'o-hnede', pusa: 'usmev', obleceni: 'mikina-lila', ruka: 'susenka', pozadi: 'p-ruzove' };
export const maVec = (profil, x) => x.cena === 0 || profil.koupeno.includes(x.id);

export function nahodnyVzhled() {
  const vyber = kat => { const z = VECI.filter(x => x.kat === kat && x.cena === 0); return z[Math.floor(Math.random() * z.length)].id; };
  return { ...VYCHOZI, kuze: vyber('kuze'), uces: vyber('uces'), barva: vyber('barva'), oci: vyber('oci'), duhovka: vyber('duhovka'), obleceni: vyber('obleceni'), pozadi: vyber('pozadi') };
}

// ---------- Kreslení ----------
let n = 0;
const DUHA = ['#ff6b7a', '#ffa94d', '#ffe066', '#69db7c', '#4dabf7', '#9775fa'];
const H = '#3b2a3f'; // obrysy a oči

// Výplň (barva nebo přechod). defs se sbírají a vloží do SVG.
function vypln(x, defs, svisle = true) {
  if (!x) return '#8a4b2f';
  if (!x.duha && !x.prechod) return x.c;
  const id = 'g' + (++n);
  const barvy = x.duha ? DUHA : x.prechod;
  defs.push(`<linearGradient id="${id}" x1="0" y1="0" x2="${svisle ? 0 : 1}" y2="${svisle ? 1 : 0}">${barvy.map((c, i) =>
    `<stop offset="${i / (barvy.length - 1)}" stop-color="${c}"/>`).join('')}</linearGradient>`);
  return `url(#${id})`;
}

// Zesvětlí (f > 0) nebo ztmaví (f < 0) barvu #rrggbb.
function odstin(hex, f) {
  if (!/^#[0-9a-f]{6}$/i.test(hex || '')) return hex;
  const k = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).map(x => Math.round(f > 0 ? x + (255 - x) * f : x * (1 + f)));
  return '#' + k.map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('');
}
const OBRYS = `stroke="#3b2a3f" stroke-width="1.6" stroke-linejoin="round"`;

const hvezdicka = (x, y, r, c) => `<path d="M${x} ${y - r}l${r * .3} ${r * .7}l${r * .7} ${r * .3}l${-r * .7} ${r * .3}l${-r * .3} ${r * .7}l${-r * .3} ${-r * .7}l${-r * .7} ${-r * .3}l${r * .7} ${-r * .3}z" fill="${c}"/>`;
const srdicko = (x, y, s, c) => `<path d="M${x} ${y + s}l${-s} ${-s}c${-s * .6} ${-s * .7} ${s * .3} ${-s * 1.5} ${s} ${-s * .6}c${s * .7} ${-s * .9} ${s * 1.6} ${-s * .1} ${s} ${s * .6}z" fill="${c}"/>`;

// --- vlasy ---
function vlasyVzadu(uces, c) {
  switch (uces) {
    case 'culik': return `<path d="M78 22 q26 -6 24 22 q-2 18 -14 26 q8 -18 -2 -30 z" fill="${c}"/>`;
    case 'dlouhe': return `<path d="M36 46 q-10 30 -3 58 h15 q-5 -28 -1 -52z M84 46 q10 30 3 58 h-15 q5 -28 1 -52z" fill="${c}"/>`;
    case 'vlny': return `<path d="M35 46 q-8 12 -2 22 q-8 10 -2 20 q-6 10 4 16 h13 q-6 -6 -2 -14 q-6 -10 0 -18 q-4 -10 1 -24z M85 46 q8 12 2 22 q8 10 2 20 q6 10 -4 16 h-13 q6 -6 2 -14 q6 -10 0 -18 q4 -10 -1 -24z" fill="${c}"/>`;
    case 'mikada': return `<path d="M34 48 q-5 22 3 30 h12 q-4 -12 -1 -28z M86 48 q5 22 -3 30 h-12 q4 -12 1 -28z" fill="${c}"/>`;
    case 'dva': return `<circle cx="28" cy="62" r="11" fill="${c}"/><circle cx="92" cy="62" r="11" fill="${c}"/>
      <path d="M26 72 q-6 12 2 20 q2 -10 6 -16z M94 72 q6 12 -2 20 q-2 -10 -6 -16z" fill="${c}"/>`;
    case 'drdol': return `<circle cx="60" cy="24" r="14" fill="${c}"/>`;
    case 'buns': return `<circle cx="40" cy="28" r="11" fill="${c}"/><circle cx="80" cy="28" r="11" fill="${c}"/>`;
    case 'kudrny': return [[34, 44], [30, 60], [36, 74], [86, 44], [90, 60], [84, 74], [44, 30], [60, 26], [76, 30]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}"/>`).join('');
    case 'afro': return `<circle cx="60" cy="46" r="40" fill="${c}"/>` + [[24, 40], [30, 22], [48, 10], [72, 10], [90, 22], [96, 40], [26, 60], [94, 60]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}"/>`).join('');
    case 'copanky': return [34, 86].map(x => `<path d="M${x - 4} 54 v40" stroke="${c}" stroke-width="8" stroke-linecap="round"/>` +
      [60, 70, 80, 90].map(y => `<ellipse cx="${x - 4}" cy="${y}" rx="5.5" ry="4.5" fill="${c}" stroke="rgba(0,0,0,.18)" stroke-width="1"/>`).join('') +
      `<circle cx="${x - 4}" cy="97" r="2.5" fill="#ff6fae"/>`).join('');
    case 'dredy': return Array.from({ length: 10 }, (_, i) => {
      const x = 32 + i * 6.2;
      return `<path d="M${x} 40 q${i % 2 ? 3 : -3} 30 ${i % 3 - 1} ${48 + (i % 3) * 6}" stroke="${c}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
    }).join('');
    case 'emo': return `<path d="M35 48 q-6 22 2 36 h12 q-4 -16 -1 -34z M85 48 q6 22 -2 36 h-12 q4 -16 1 -34z" fill="${c}"/>`;
    case 'vez': return `<path d="M40 34 q-6 -40 20 -54 q26 14 20 54 z" fill="${c}"/><circle cx="60" cy="-14" r="6" fill="#ff6fae"/>`;
    default: return '';
  }
}

function vlasyVpredu(uces, c) {
  const ofina = `<path d="M34 54 q-2 -30 26 -32 q28 2 26 30 q-8 -14 -26 -16 q-16 2 -26 18 z" fill="${c}"/>`;
  switch (uces) {
    case 'kratke': return `<path d="M35 50 q0 -28 25 -29 q25 1 25 29 q-4 -8 -8 -10 l-3 6 l-4 -9 l-4 7 l-5 -8 l-4 8 l-5 -7 l-3 8 q-6 0 -9 5z" fill="${c}"/>`;
    case 'jezek': return `<path d="M35 50 l-4 -14 l9 3 l-2 -13 l10 6 l2 -12 l8 9 l6 -11 l5 11 l8 -8 l1 12 l10 -5 l-3 12 l9 -2 l-5 14 q-6 -12 -24 -14 q-18 2 -26 14z" fill="${c}"/>`;
    case 'ciro': return `<path d="M36 46 q4 -16 24 -18 q20 2 24 18" fill="${c}" opacity=".35" stroke="none"/>
      <path d="M52 34 l-2 -16 l6 6 l2 -14 l4 12 l4 -12 l2 14 l6 -6 l-2 16 q-10 -4 -20 0z" fill="${c}"/>`;
    case 'obri-ciro': return `<path d="M36 46 q4 -16 24 -18 q20 2 24 18" fill="${c}" opacity=".35" stroke="none"/>
      <path d="M50 34 l-6 -26 l10 10 l2 -24 l4 22 l4 -22 l2 24 l10 -10 l-6 26 q-10 -4 -20 0z" fill="${c}"/>`;
    case 'plesata': return `<ellipse cx="52" cy="38" rx="7" ry="4" fill="#fff" opacity=".45" transform="rotate(-20 52 38)"/>`;
    case 'emo': return `<path d="M34 56 q-2 -34 26 -34 q28 2 26 30 q-10 -10 -22 -8 q-6 14 -22 28 q-4 -8 -8 -16z" fill="${c}"/>`;
    case 'afro': return `<path d="M36 46 q4 -18 24 -20 q20 2 24 20 q-10 -8 -24 -8 q-14 0 -24 8z" fill="${c}"/>`;
    case 'dredy': case 'copanky': return `<path d="M35 52 q-2 -30 25 -31 q27 1 25 31 q-10 -12 -25 -13 q-15 1 -25 13z" fill="${c}"/>`;
    default: return ofina;
  }
}

// --- oblečení ---
function obleceni(id, defs) {
  const tvar = 'M28 120 q2 -30 32 -32 q30 2 32 32 z';
  const telo = fill => `<path d="${tvar}" fill="${fill}"/>`;
  const snurky = c => `<path d="M52 90 l8 10 l8 -10" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const orez = obsah => { const i = 'o' + (++n); return `<clipPath id="${i}"><path d="${tvar}"/></clipPath><g clip-path="url(#${i})">${obsah}</g>`; };
  switch (id) {
    case 'mikina-ruzova': return telo('#ff8fbf') + snurky('#e8679f');
    case 'mikina-modra': return telo('#7fb3ff') + snurky('#5a8fe0');
    case 'mikina-mata': return telo('#7fd8c4') + snurky('#4fb79f');
    case 'srdce': return telo('#ffffff') + srdicko(60, 104, 8, '#ff6fae');
    case 'pruhy': return orez(`<rect x="20" y="86" width="80" height="40" fill="#fff"/>${[92, 102, 112].map(y => `<rect x="20" y="${y}" width="80" height="5" fill="#ff8fbf"/>`).join('')}`);
    case 'dziny': return telo('#6f97d6') + `<path d="M60 92 v28" stroke="#4d73b0" stroke-width="2"/><circle cx="56" cy="102" r="1.8" fill="#e8d18a"/><circle cx="56" cy="112" r="1.8" fill="#e8d18a"/><path d="M46 92 l14 8 l14 -8" stroke="#4d73b0" stroke-width="2.4" fill="none"/>`;
    case 'pyzamo': return orez(`<rect x="20" y="86" width="80" height="40" fill="#cfe6ff"/>${[[40, 98], [70, 96], [52, 112], [82, 112], [32, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#fff"/>`).join('')}`) + `<path d="M54 90 l6 6 l6 -6" stroke="#9cc0ea" stroke-width="2" fill="none"/>`;
    case 'hvezdy': return telo('#2f3a78') + [[45, 104], [70, 98], [62, 113], [80, 110]].map(([x, y]) => hvezdicka(x, y, 3, '#ffd76e')).join('') + snurky('#ffd76e');
    case 'dres': return telo('#ff5b5b') + `<path d="M44 90 q16 10 32 0" stroke="#fff" stroke-width="3" fill="none"/><text x="60" y="114" font-size="15" font-weight="900" text-anchor="middle" fill="#fff" font-family="system-ui">10</text>`;
    case 'hawaii': return telo('#3fc1c9') + [[42, 100], [70, 104], [56, 114], [82, 114], [36, 114]].map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="4" fill="#ffd34d"/><circle cx="${x}" cy="${y}" r="1.5" fill="#ff6f61"/>`).join('') + `<path d="M52 90 l8 8 l8 -8" fill="#fff"/>`;
    case 'duha': return orez(DUHA.map((c, i) => `<rect x="20" y="${86 + i * 6}" width="80" height="6.5" fill="${c}"/>`).join(''));
    case 'kozena': return telo('#22222a') + `<path d="M60 90 l0 30" stroke="#3a3a44" stroke-width="2"/><path d="M48 90 l10 12 l-6 4 l6 14 M72 90 l-10 12 l6 4 l-6 14" fill="#33333d" stroke="#555560" stroke-width="1.2"/>
      <path d="M54 90 l6 12 l6 -12" fill="#fff"/><path d="M34 108 q2 -8 6 -12 M86 108 q-2 -8 -6 -12" stroke="#fff" stroke-opacity=".25" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    case 'zlata': return telo('#f2c94c') + `<path d="${tvar}" fill="none" stroke="#fff3b0" stroke-width="1.5" stroke-dasharray="2 4"/>` + snurky('#c9962c') + hvezdicka(40, 106, 4, '#fff');
    case 'smoking': return telo('#1d1d26') + `<path d="M50 89 l10 31 l10 -31" fill="#fff"/><path d="M52 94 l8 4 l8 -4 l-8 4 z" fill="#ff3b5c" stroke="#ff3b5c" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="106" r="1.3" fill="${H}"/><circle cx="60" cy="113" r="1.3" fill="${H}"/>`;
    case 'kostlivec': return telo('#1d1d26') + `<path d="M60 92 v28" stroke="#fff" stroke-width="3"/>` + [98, 104, 110].map(y => `<path d="M60 ${y} q-12 -2 -18 4 M60 ${y} q12 -2 18 4" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('');
    case 'skafandr': return telo('#eef1f6') + `<rect x="50" y="100" width="20" height="13" rx="3" fill="#c7cfdb"/><circle cx="55" cy="106" r="2" fill="#ff5b5b"/><circle cx="62" cy="106" r="2" fill="#5bd16b"/><circle cx="67" cy="106" r="1.5" fill="#4dabf7"/><path d="M40 92 q20 8 40 0" stroke="#c7cfdb" stroke-width="4" fill="none"/>`;
    case 'brneni': { const g = vypln({ prechod: ['#eef1f6', '#9aa3b2'] }, defs, false);
      return telo(g) + `<path d="M60 90 v30 M40 100 q20 6 40 0 M38 110 q22 6 44 0" stroke="#7d8696" stroke-width="2" fill="none"/>` + [[44, 96], [76, 96]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#7d8696"/>`).join(''); }
    case 'diamant': return orez(`<rect x="20" y="86" width="80" height="40" fill="#bfefff"/>` + [[30, 92], [46, 92], [62, 92], [78, 92], [38, 104], [54, 104], [70, 104], [86, 104], [46, 116], [62, 116], [78, 116]].map(([x, y]) =>
      `<path d="M${x} ${y - 6} l6 6 l-6 6 l-6 -6z" fill="#e8fbff" stroke="#7fd6f5" stroke-width="1"/>`).join('')) + hvezdicka(34, 100, 4, '#fff') + hvezdicka(84, 112, 3, '#fff');
    default: return telo('#b69cff') + snurky('#9a7cf0');
  }
}

// --- oči ---
function oci(id, iris = '#7a4a2a') {
  // Oko: bělmo s obrysem, barevná duhovka, zornice, dva odlesky a horní víčko.
  const oko = (cx, k = 1) => `<ellipse cx="${cx}" cy="52" rx="${4.6 * k}" ry="${5.3 * k}" fill="#fff" stroke="${H}" stroke-width="1.2"/>
    <circle cx="${cx}" cy="${52.6}" r="${3.3 * k}" fill="${iris}"/><circle cx="${cx}" cy="52.6" r="${1.7 * k}" fill="#1e1420"/>
    <circle cx="${cx + 1.3 * k}" cy="${51 - .3 * k}" r="${1.2 * k}" fill="#fff"/><circle cx="${cx - 1.1 * k}" cy="${54.2 + .2 * k}" r="${.55 * k}" fill="#fff"/>
    <path d="M${cx - 4.9 * k} ${51.2 - k} q${4.9 * k} ${-5.2 * k} ${9.8 * k} 0" stroke="${H}" stroke-width="1.9" fill="none" stroke-linecap="round"/>`;
  const zornicky = () => oko(50, 1.18) + oko(70, 1.18);
  const rasy = `<path d="M45 49.4 l-2.8 -2.2 M46.6 47.6 l-1.6 -2.8 M75 49.4 l2.8 -2.2 M73.4 47.6 l1.6 -2.8" stroke="${H}" stroke-width="1.5" stroke-linecap="round"/>`;
  switch (id) {
    case 'rasy': return zornicky() + rasy;
    case 'mrk': return oko(50, 1.18) + `<path d="M65.5 53 q4.5 -4 9 0" stroke="${H}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    case 'linky': return zornicky() + `<path d="M54.6 50.4 l3 -2.4 M65.4 50.4 l-3 -2.4" stroke="${H}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'velke': return oko(50, 1.42) + oko(70, 1.42) + rasy;
    case 'oci-hvezdy': return hvezdicka(50, 52, 6, '#ffc94d') + hvezdicka(70, 52, 6, '#ffc94d');
    case 'oci-srdce': return srdicko(50, 51, 4.5, '#ff3b6b') + srdicko(70, 51, 4.5, '#ff3b6b');
    case 'ospale': return `<path d="M46 53 q4 3 8 0 M66 53 q4 3 8 0" stroke="${H}" stroke-width="2.4" fill="none" stroke-linecap="round"/><text x="84" y="40" font-size="8" fill="#8a7891" font-weight="700">z</text><text x="89" y="34" font-size="6" fill="#8a7891" font-weight="700">z</text>`;
    case 'hypno': return [50, 70].map(x => `<circle cx="${x}" cy="52" r="5" fill="#fff" stroke="${H}" stroke-width="1"/><path d="M${x} 52 m0 -1 a1 1 0 1 1 -1 1 a2 2 0 1 1 2 2 a3 3 0 1 1 -3 -3 a4 4 0 1 1 4 4" fill="none" stroke="#8b3cf0" stroke-width="1.2"/>`).join('');
    case 'zombie': return `<circle cx="50" cy="52" r="4.5" fill="#f4f7ee" stroke="#9aa58a" stroke-width="1"/><circle cx="70" cy="52" r="4.5" fill="#f4f7ee" stroke="#9aa58a" stroke-width="1"/><circle cx="51" cy="53" r="1" fill="#9aa58a"/><circle cx="69" cy="51" r="1" fill="#9aa58a"/>`;
    case 'laser': return `<circle cx="50" cy="52" r="4" fill="#ff2a2a"/><circle cx="70" cy="52" r="4" fill="#ff2a2a"/><circle cx="50" cy="52" r="1.8" fill="#fff"/><circle cx="70" cy="52" r="1.8" fill="#fff"/>
      <path d="M50 52 l-60 30 M70 52 l60 30" stroke="#ff2a2a" stroke-width="2.2" opacity=".75"/><path d="M50 52 l-60 30 M70 52 l60 30" stroke="#fff" stroke-width=".7"/>`;
    case 'kyklop': return `<ellipse cx="60" cy="50" rx="10" ry="9" fill="#fff" stroke="${H}" stroke-width="1.6"/><circle cx="60" cy="51" r="5.5" fill="#3fb59a"/><circle cx="60" cy="51" r="2.6" fill="${H}"/><circle cx="62" cy="48.5" r="1.5" fill="#fff"/>
      <path d="M50 44 l-2 -3 M55 41.5 l-1 -3.5 M60 41 v-3.5 M65 41.5 l1 -3.5 M70 44 l2 -3" stroke="${H}" stroke-width="1.5" stroke-linecap="round"/>`;
    default: return zornicky();
  }
}

// --- pusa ---
function pusa(id) {
  switch (id) {
    case 'smich': return `<path d="M52 62 q8 12 16 0 z" fill="#8a2f4a" stroke="${H}" stroke-width="2" stroke-linejoin="round"/><path d="M55 66.5 q5 3 10 0" fill="#ff8fab"/>`;
    case 'culik-pusa': return `<path d="M54 65 q7 3 13 -3" stroke="${H}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    case 'rtenka': return `<path d="M53 63 q3.5 -2.5 7 0 q3.5 -2.5 7 0 q-7 7 -14 0z" fill="#e8264f"/><path d="M53 63 q7 3 14 0" stroke="#a8102f" stroke-width="1" fill="none"/>`;
    case 'jazyk': return `<path d="M53 63 q7 8 14 0" stroke="${H}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M57 66 q3 8 6 0" fill="#ff6f8f" stroke="${H}" stroke-width="1.2"/>`;
    case 'rovnatka': return `<path d="M52 62 q8 9 16 0 z" fill="#fff" stroke="${H}" stroke-width="2" stroke-linejoin="round"/><path d="M53 63.5 h14" stroke="#9aa3b2" stroke-width="1.4"/>${[55, 58.5, 62, 65.5].map(x => `<rect x="${x - .8}" y="62.7" width="1.6" height="1.6" fill="#7d8696"/>`).join('')}`;
    case 'pusinka': return `<path d="M58 61 q-3 2 0 3.5 q-3 1.5 0 3.5 q2 0 3 -1.5" stroke="${H}" stroke-width="2" fill="none" stroke-linecap="round"/>` + srdicko(72, 62, 3, '#ff6fae');
    case 'bublina': return `<path d="M53 64 q4 3 6 1" stroke="${H}" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="64" cy="66" r="8" fill="#ffa8d2" opacity=".92"/><ellipse cx="61.5" cy="63" rx="2.5" ry="1.5" fill="#fff" opacity=".7"/>`;
    case 'upir': return `<path d="M53 63 q7 8 14 0" stroke="${H}" stroke-width="2.4" fill="#8a2f4a" stroke-linecap="round"/><path d="M55 63.6 l1.4 4 l1.4 -3.6 M62.2 64 l1.4 3.6 l1.4 -4" fill="#fff" stroke="${H}" stroke-width=".6"/>`;
    case 'zlaty-zub': return `<path d="M52 62 q8 9 16 0 z" fill="#fff" stroke="${H}" stroke-width="2" stroke-linejoin="round"/><rect x="61" y="62.5" width="3.5" height="3.5" rx=".8" fill="#ffd34d" stroke="#c9962c" stroke-width=".6"/>` + hvezdicka(67, 60, 2.2, '#ffd34d');
    case 'duhovy-jazyk': return `<path d="M53 63 q7 8 14 0" stroke="${H}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      DUHA.map((c, i) => `<rect x="57" y="${66 + i * 2.2}" width="6" height="2.3" fill="${c}"/>`).join('') + `<path d="M57 79 q3 3 6 0" fill="${DUHA[5]}"/>`;
    default: return `<path d="M51.5 62.5 q8.5 11 17 0 z" fill="#8a2f4a" stroke="${H}" stroke-width="2" stroke-linejoin="round"/><path d="M55.5 68 q4.5 -3.6 9 0 q-4.5 3.4 -9 0z" fill="#ff8fab"/>`;
  }
}

// --- na hlavu ---
function naHlavu(x, c) {
  if (x?.e) {
    const pozice = { kachna: [60, 30, 26], toast: [60, 30, 30], dort: [60, 26, 34], ufo: [60, 14, 30] }[x.id] || [60, 30, 26];
    return `<text x="${pozice[0]}" y="${pozice[1]}" font-size="${pozice[2]}" text-anchor="middle">${x.e}</text>`;
  }
  switch (x?.id) {
    case 'masle': return `<path d="M72 26 l-10 -8 l0 16 z M72 26 l10 -8 l0 16 z" fill="#ff6fae"/><circle cx="72" cy="26" r="4" fill="#e8559a"/>`;
    case 'kulich': return `<path d="M33 44 q2 -28 27 -28 q25 0 27 28 z" fill="#ff8fbf"/><rect x="31" y="40" width="58" height="9" rx="4.5" fill="#fff"/><circle cx="60" cy="14" r="7" fill="#fff"/>`;
    case 'ksiltovka': return `<path d="M34 40 q2 -24 26 -24 q24 0 26 24 z" fill="#7fb3ff"/><path d="M30 40 l58 0 q14 0 16 6 l-74 0 z" fill="#5a8fe0"/><circle cx="60" cy="17" r="2.5" fill="#5a8fe0"/>`;
    case 'kvetiny': return [[38, 34, '#ff8fbf'], [48, 27, '#ffd76e'], [60, 24, '#b69cff'], [72, 27, '#7fd8c4'], [82, 34, '#ff8fbf']]
      .map(([x1, y, cc]) => `<circle cx="${x1}" cy="${y}" r="5.5" fill="${cc}"/><circle cx="${x1}" cy="${y}" r="2" fill="#fff6c9"/>`).join('');
    case 'party': return `<path d="M50 30 l10 -26 l10 26 z" fill="#4dabf7"/><path d="M53 22 l14 0 M51 28 l18 0" stroke="#ffd34d" stroke-width="2.5"/><circle cx="60" cy="4" r="4" fill="#ff6fae"/>`;
    case 'ousko': return `<path d="M36 34 l2 -20 l14 12 z M84 34 l-2 -20 l-14 12 z" fill="${c}"/><path d="M40 30 l1 -10 l7 6 z M80 30 l-1 -10 l-7 6 z" fill="#ffadc6"/>`;
    case 'sluchatka': return `<path d="M32 54 q0 -36 28 -36 q28 0 28 36" stroke="${H}" stroke-width="4" fill="none"/><rect x="26" y="48" width="10" height="16" rx="5" fill="#ff6fae"/><rect x="84" y="48" width="10" height="16" rx="5" fill="#ff6fae"/>`;
    case 'satek': return `<path d="M34 42 q2 -22 26 -22 q24 0 26 22 z" fill="#e8264f"/><path d="M84 38 l12 6 l-8 4 l8 6 l-12 -4z" fill="#e8264f"/>${[[44, 32], [58, 26], [72, 32]].map(([x1, y]) => `<circle cx="${x1}" cy="${y}" r="2" fill="#fff"/>`).join('')}`;
    case 'vrtulka': return `<path d="M36 40 q2 -22 24 -22 q22 0 24 22 z" fill="#ff5b5b"/><path d="M36 40 q8 -20 12 -21 l0 21z M60 18 v21 M84 40 q-8 -20 -12 -21 l0 21z" fill="#ffd34d"/><path d="M60 18 v-6" stroke="${H}" stroke-width="2"/><path d="M46 10 l28 4 M74 10 l-28 4" stroke="#4dabf7" stroke-width="3.5" stroke-linecap="round"/>`;
    case 'kovboj': return `<path d="M42 36 q-2 -20 18 -20 q20 0 18 20 z" fill="#a8693a"/><path d="M22 36 q38 12 76 0 q-6 8 -38 9 q-32 -1 -38 -9z" fill="#8a5428"/><path d="M42 32 q18 5 36 0" stroke="#5e3826" stroke-width="3"/>`;
    case 'kuchar': return `<rect x="40" y="26" width="40" height="14" rx="2" fill="#fff" stroke="#e6e2ee" stroke-width="1"/><path d="M40 28 q-8 -16 6 -18 q4 -10 14 -6 q10 -4 14 6 q14 2 6 18z" fill="#fff" stroke="#e6e2ee" stroke-width="1"/>`;
    case 'carodej': return `<path d="M40 36 l24 -40 l-2 14 l14 26z" fill="#5b2bd6"/><path d="M24 38 q36 10 72 0 q-4 6 -36 7 q-32 -1 -36 -7z" fill="#4521b0"/><path d="M44 32 q16 4 32 0" stroke="#ffd34d" stroke-width="3"/>` + hvezdicka(56, 14, 4, '#ffd34d');
    case 'roh': { return `<path d="M54 30 l6 -30 l6 30 z" fill="#ffe08a"/><path d="M55 25 l10 -3 M56 18 l8 -2.5 M57.5 11 l5 -1.5" stroke="#e0a800" stroke-width="1.5"/>` + hvezdicka(74, 12, 3, '#ff8fc4'); }
    case 'korunka': return `<path d="M42 30 l4 -16 l8 10 l6 -14 l6 14 l8 -10 l4 16 z" fill="#ffd34d" stroke="#e0a800" stroke-width="1.5"/><circle cx="60" cy="22" r="2.5" fill="#ff6fae"/><circle cx="48" cy="25" r="1.8" fill="#7fb3ff"/><circle cx="72" cy="25" r="1.8" fill="#7fd8c4"/>`;
    case 'rohy': return `<path d="M40 34 q-8 -8 -4 -22 q4 10 12 14z M80 34 q8 -8 4 -22 q-4 10 -12 14z" fill="#e8264f"/>`;
    case 'svatozar': return `<ellipse cx="60" cy="14" rx="20" ry="5" fill="none" stroke="#ffd34d" stroke-width="3.5"/><ellipse cx="60" cy="14" rx="20" ry="5" fill="none" stroke="#fff6c9" stroke-width="1"/>`;
    case 'viking': return `<path d="M34 42 q2 -26 26 -26 q24 0 26 26 z" fill="#b5bdc9"/><path d="M34 42 h52" stroke="#8a5428" stroke-width="4"/><path d="M60 16 v26" stroke="#8a5428" stroke-width="3"/>
      <path d="M36 32 q-14 -6 -12 -24 q6 12 16 14z M84 32 q14 -6 12 -24 q-6 12 -16 14z" fill="#fff6e0" stroke="#d9c8a8" stroke-width="1"/>`;
    default: return '';
  }
}

// --- brýle ---
function bryle(id) {
  switch (id) {
    case 'nerd': return `<rect x="41" y="45" width="17" height="14" rx="3" fill="none" stroke="#2f2530" stroke-width="3"/><rect x="62" y="45" width="17" height="14" rx="3" fill="none" stroke="#2f2530" stroke-width="3"/><path d="M58 51 l4 0" stroke="#2f2530" stroke-width="3"/>`;
    case 'kulate': return `<circle cx="50" cy="52" r="8" fill="none" stroke="#c9843a" stroke-width="2.2"/><circle cx="70" cy="52" r="8" fill="none" stroke="#c9843a" stroke-width="2.2"/><path d="M58 52 l4 0" stroke="#c9843a" stroke-width="2.2"/>`;
    case 'slunecni': return `<path d="M40 47 l18 0 l-2 10 q-7 4 -14 0 z M62 47 l18 0 l-2 10 q-7 4 -14 0 z" fill="#2f2530"/><path d="M58 49 l4 0" stroke="#2f2530" stroke-width="2.5"/><path d="M44 49 l5 0" stroke="#fff" stroke-width="1.5" opacity=".6"/>`;
    case 'srdickove': return srdicko(50, 56, 8, '#ff6fae') + srdicko(70, 56, 8, '#ff6fae') + `<path d="M58 50 l4 0" stroke="#ff6fae" stroke-width="2.5"/>`;
    case 'kocici': return `<path d="M40 48 q10 -6 18 2 q-2 8 -9 8 q-7 0 -9 -10z M80 48 q-10 -6 -18 2 q2 8 9 8 q7 0 9 -10z" fill="#ff6fae" fill-opacity=".25" stroke="#e8264f" stroke-width="2.4"/><path d="M58 51 h4" stroke="#e8264f" stroke-width="2"/>`;
    case 'hvezdickove': return hvezdicka(50, 52, 10, '#ffc94d') + hvezdicka(70, 52, 10, '#ffc94d');
    case '3d': return `<rect x="40" y="46" width="18" height="12" rx="2" fill="#ff3b3b" fill-opacity=".75" stroke="#fff" stroke-width="2"/><rect x="62" y="46" width="18" height="12" rx="2" fill="#3bb5ff" fill-opacity=".75" stroke="#fff" stroke-width="2"/><path d="M58 51 h4" stroke="#fff" stroke-width="2"/>`;
    case 'monokl': return `<circle cx="70" cy="52" r="8" fill="#fff" fill-opacity=".2" stroke="#e0a800" stroke-width="2.4"/><path d="M78 54 q4 14 -2 30" stroke="#e0a800" stroke-width="1" fill="none"/>`;
    case 'lyzarske': return `<path d="M32 50 h56" stroke="#2f2530" stroke-width="4"/><rect x="38" y="44" width="44" height="16" rx="8" fill="#ff8a3d"/><rect x="40" y="46" width="40" height="12" rx="6" fill="#ffd34d" fill-opacity=".85"/><path d="M44 48 l8 0" stroke="#fff" stroke-width="2" opacity=".8"/>`;
    case 'pixel': return `<path d="M38 46 h44 v4 h-4 v4 h-4 v4 h-8 v-4 h-4 v-4 h-4 v4 h-4 v4 h-8 v-4 h-4 v-4 h-4z" fill="${H}"/><rect x="42" y="50" width="4" height="4" fill="#fff"/><rect x="66" y="50" width="4" height="4" fill="#fff"/>`;
    case 'visor': return `<path d="M34 46 q26 -6 52 0 v10 q-26 6 -52 0z" fill="#ff2ab8" fill-opacity=".85"/><path d="M38 50 q22 -4 44 0" stroke="#fff" stroke-width="1.6" opacity=".7"/>` + hvezdicka(80, 46, 3, '#fff');
    case 'smesne': return `<circle cx="50" cy="52" r="7" fill="none" stroke="#2f2530" stroke-width="3"/><circle cx="70" cy="52" r="7" fill="none" stroke="#2f2530" stroke-width="3"/><path d="M57 52 h6" stroke="#2f2530" stroke-width="3"/>
      <path d="M44 44 q6 -4 12 0 M64 44 q6 -4 12 0" stroke="#2f2530" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="59" rx="5" ry="6" fill="#ffb59a" stroke="#d48d72" stroke-width="1"/><path d="M48 64 q6 -4 12 0 q6 -4 12 0 q-6 4 -12 1 q-6 3 -12 -1z" fill="#2f2530"/>`;
    default: return '';
  }
}

// --- šperky ---
function nausnice(x) {
  if (!x) return '';
  const obe = f => f(35) + f(85);
  if (x.e) return obe(px => `<text x="${px}" y="76" font-size="11" text-anchor="middle">${x.e}</text>`);
  switch (x.id) {
    case 'pecky': return obe(px => `<circle cx="${px}" cy="63" r="1.8" fill="#fff" stroke="#c7cfdb" stroke-width=".6"/>`);
    case 'kruhy': return obe(px => `<circle cx="${px}" cy="67" r="4" fill="none" stroke="#e0a800" stroke-width="1.6"/>`);
    case 'perly': return obe(px => `<circle cx="${px}" cy="66" r="2.6" fill="#fffaf0" stroke="#e6dcc6" stroke-width=".7"/>`);
    case 'srdicka-n': return obe(px => srdicko(px, 67, 3, '#ff3b6b'));
    case 'hvezdy-n': return obe(px => hvezdicka(px, 67, 4, '#ffc94d'));
    case 'blesky': return obe(px => `<path d="M${px + 1} 62 l-3 6 h3 l-2 6 l5 -8 h-3 l2 -4z" fill="#ffd34d" stroke="#e0a800" stroke-width=".6"/>`);
    case 'diamanty': return obe(px => `<path d="M${px} 63 l3 3 l-3 5 l-3 -5z" fill="#bfefff" stroke="#4dc3f0" stroke-width=".8"/>`) + hvezdicka(89, 62, 2, '#fff');
    case 'obri-kruhy': return obe(px => `<circle cx="${px}" cy="73" r="9" fill="none" stroke="#ffd34d" stroke-width="2.4"/>`);
    default: return '';
  }
}

function piercing(id) {
  const kr = (x1, y, r = 2.4) => `<circle cx="${x1}" cy="${y}" r="${r}" fill="none" stroke="#aeb7c4" stroke-width="1.5"/>`;
  const kulicka = (x1, y) => `<circle cx="${x1}" cy="${y}" r="1.4" fill="#aeb7c4"/>`;
  switch (id) {
    case 'nos': return kr(56.5, 59.5);
    case 'oboci': return kulicka(74, 44) + kulicka(76, 47.5);
    case 'septum': return `<path d="M57.5 59.5 a2.5 2.5 0 0 0 5 0" fill="none" stroke="#c7cfdb" stroke-width="1.4"/>`;
    case 'ret': return kr(63, 67.5, 1.8);
    case 'vsude': return kr(56.5, 59.5) + kulicka(74, 44) + kulicka(76, 47.5) + kr(63, 67.5, 1.8) + `<path d="M57.5 59.5 a2.5 2.5 0 0 0 5 0" fill="none" stroke="#c7cfdb" stroke-width="1.4"/>` + kulicka(34, 58) + kulicka(86, 58);
    default: return '';
  }
}

function nahrdelnik(id) {
  switch (id) {
    case 'retizek': return `<path d="M48 88 q12 12 24 0" stroke="#e0a800" stroke-width="1.2" fill="none"/><circle cx="60" cy="95" r="1.8" fill="#e0a800"/>`;
    case 'choker': return `<path d="M47 86 q13 6 26 0" stroke="${H}" stroke-width="3.5" fill="none"/>` + srdicko(60, 90, 2, '#ff6fae');
    case 'perly-n': return Array.from({ length: 9 }, (_, i) => { const t = i / 8; const x1 = 46 + t * 28; const y = 88 + Math.sin(t * Math.PI) * 9; return `<circle cx="${x1}" cy="${y}" r="2" fill="#fffaf0" stroke="#e6dcc6" stroke-width=".5"/>`; }).join('');
    case 'medailon': return `<path d="M48 88 q12 12 24 0" stroke="#e0a800" stroke-width="1.2" fill="none"/>` + srdicko(60, 100, 4.5, '#ffd34d');
    case 'korale': return Array.from({ length: 9 }, (_, i) => { const t = i / 8; return `<circle cx="${46 + t * 28}" cy="${88 + Math.sin(t * Math.PI) * 9}" r="2.4" fill="${DUHA[i % 6]}"/>`; }).join('');
    case 'hroty': return `<path d="M47 86 q13 6 26 0" stroke="${H}" stroke-width="4" fill="none"/>` + [50, 55, 60, 65, 70].map(x1 => `<path d="M${x1 - 1.5} ${88 + (x1 === 60 ? 1 : 0)} l1.5 4 l1.5 -4z" fill="#c7cfdb"/>`).join('');
    case 'rapper': return `<path d="M44 88 q16 22 32 0" stroke="#ffd34d" stroke-width="3" stroke-dasharray="3 1.5" fill="none"/><circle cx="60" cy="104" r="6" fill="#ffd34d" stroke="#e0a800" stroke-width="1.2"/><text x="60" y="106.5" font-size="7" font-weight="900" text-anchor="middle" fill="#a87a00" font-family="system-ui">$</text>`;
    case 'diamant-n': return `<path d="M46 88 q14 14 28 0" stroke="#dff7ff" stroke-width="2.4" stroke-dasharray="2 1" fill="none"/><path d="M60 98 l5 5 l-5 7 l-5 -7z" fill="#bfefff" stroke="#4dc3f0" stroke-width="1"/>` + hvezdicka(66, 98, 2.5, '#fff');
    case 'bonbony': return Array.from({ length: 9 }, (_, i) => { const t = i / 8; return `<rect x="${44 + t * 28}" y="${86 + Math.sin(t * Math.PI) * 9}" width="4" height="3.5" rx="1.5" fill="${['#ff8fc4', '#ffe066', '#7fd8c4', '#b69cff'][i % 4]}"/>`; }).join('');
    default: return '';
  }
}

function naramek(id, kuze) {
  if (!id) return '';
  // Kreslí se kolem bodu (84, 99.5); posun a zvětšení je dá na zápěstí pod ruku.
  const zap = (obsah) => `<g transform="translate(-25.2 -20.4) scale(1.3)">${obsah}</g>`;
  switch (id) {
    case 'koralky': return zap([0, 1, 2, 3, 4].map(i => `<circle cx="${79 + i * 2.6}" cy="${99 + (i % 2)}" r="1.6" fill="${DUHA[i]}"/>`).join(''));
    case 'pratelstvi': return zap(`<path d="M78 98 l12 3" stroke="#ff8fc4" stroke-width="2.4"/><path d="M78 99.5 l12 3" stroke="#7fd8c4" stroke-width="1.2"/>`);
    case 'hodinky': return zap(`<path d="M78 98 l12 3" stroke="#5e3826" stroke-width="2.6"/><circle cx="84" cy="99.5" r="3" fill="#fff" stroke="#c7cfdb" stroke-width="1"/>`);
    case 'chytre': return zap(`<path d="M78 98 l12 3" stroke="${H}" stroke-width="2.6"/><rect x="81" y="96" width="6" height="7" rx="1.6" fill="${H}"/><rect x="82" y="97" width="4" height="5" rx="1" fill="#4dabf7"/>`);
    case 'zlaty': return zap(`<path d="M78 98 l12 3" stroke="#ffd34d" stroke-width="3"/>`);
    case 'hroty-n': return zap(`<path d="M78 98 l12 3" stroke="${H}" stroke-width="3"/>` + [80, 84, 88].map(x1 => `<path d="M${x1} ${97.5 + (x1 - 78) / 4} l1 -3 l1 3z" fill="#c7cfdb"/>`).join(''));
    case 'diamant-r': return zap(`<path d="M78 98 l12 3" stroke="#bfefff" stroke-width="3"/>` + hvezdicka(88, 97, 2.5, '#fff'));
    default: return '';
  }
}

// --- vousy ---
function vousy(id, c, defs) {
  switch (id) {
    case 'strniste': return `<path d="M38 60 q2 20 22 22 q20 -2 22 -22 q-4 12 -10 12 q-6 -6 -12 -6 q-6 0 -12 6 q-6 0 -10 -12z" fill="${c}" opacity=".25"/>`;
    case 'knir': return `<path d="M50 61 q5 -4 10 -1 q5 -3 10 1 q-4 3 -10 1 q-6 2 -10 -1z" fill="${c}"/>`;
    case 'bradka': return `<path d="M54 70 q6 10 12 0 q-2 6 -6 7 q-4 -1 -6 -7z" fill="${c}"/>` + `<path d="M50 61 q5 -4 10 -1 q5 -3 10 1 q-4 3 -10 1 q-6 2 -10 -1z" fill="${c}"/>`;
    case 'plnovous': return `<path d="M36 56 q0 30 24 30 q24 0 24 -30 q-4 8 -10 10 q-6 -6 -14 -6 q-8 0 -14 6 q-6 -2 -10 -10z" fill="${c}"/><path d="M52 65 q8 4 16 0" stroke="${H}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'kniratko': return `<path d="M60 60 q-6 -3 -10 1 q-4 4 -9 1 q2 4 8 3 q6 -1 11 -3 q5 2 11 3 q6 1 8 -3 q-5 3 -9 -1 q-4 -4 -10 -1z" fill="${c}"/><circle cx="41" cy="61" r="1.6" fill="${c}"/><circle cx="79" cy="61" r="1.6" fill="${c}"/>`;
    case 'viking-v': return `<path d="M38 58 q0 22 22 24 q22 -2 22 -24 q-4 8 -10 10 q-6 -6 -12 -6 q-6 0 -12 6 q-6 -2 -10 -10z" fill="${c}"/>` +
      [52, 68].map(x1 => `<path d="M${x1} 80 v14" stroke="${c}" stroke-width="5" stroke-linecap="round"/><circle cx="${x1}" cy="96" r="2.2" fill="#e0a800"/>`).join('') + `<path d="M52 65 q8 4 16 0" stroke="${H}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'duhovy-v': { const g = vypln({ duha: true }, defs); return `<path d="M36 56 q0 32 24 32 q24 0 24 -32 q-4 8 -10 10 q-6 -6 -14 -6 q-8 0 -14 6 q-6 -2 -10 -10z" fill="${g}"/><path d="M52 65 q8 4 16 0" stroke="${H}" stroke-width="2" fill="none" stroke-linecap="round"/>`; }
    default: return '';
  }
}

// --- na obličej ---
function tvar(id) {
  switch (id) {
    case 'pihy': return [[45, 59], [48, 62], [43, 63], [75, 59], [72, 62], [77, 63]].map(([x1, y]) => `<circle cx="${x1}" cy="${y}" r=".9" fill="#a65f3d"/>`).join('');
    case 'srdicka': return srdicko(44, 63, 3.5, '#ff6fae') + srdicko(76, 63, 3.5, '#ff6fae');
    case 'trpytky': return hvezdicka(38, 46, 3, '#ffc94d') + hvezdicka(84, 66, 2.5, '#ffc94d') + hvezdicka(80, 42, 2, '#ff8fc4');
    case 'naplast': return `<rect x="70" y="58" width="12" height="5" rx="2.5" fill="#f5c79e" transform="rotate(-20 76 60)"/><path d="M74 58 l0 4 M78 57 l0 4" stroke="#d9a074" stroke-width=".8" transform="rotate(-20 76 60)"/>`;
    case 'hvezda-t': return hvezdicka(77, 62, 4.5, '#b69cff');
    case 'valecne': return `<path d="M38 58 l10 -2 M38 62 l10 -2 M72 56 l10 2 M72 60 l10 2" stroke="#e8264f" stroke-width="2.4" stroke-linecap="round"/>`;
    case 'kocici-t': return `<path d="M36 60 l10 1 M36 64 l10 -1 M84 60 l-10 1 M84 64 l-10 -1" stroke="${H}" stroke-width="1.2" stroke-linecap="round"/><path d="M58 58.5 h4 l-2 2z" fill="#ff6fae"/>`;
    case 'duhove-t': return DUHA.map((c, i) => `<path d="M${42 + i * 1.2} ${46 + i * 1.6} q8 -4 16 0" stroke="${c}" stroke-width="1.4" fill="none"/><path d="M${62 + i * .3} ${46 + i * 1.6} q8 -4 16 0" stroke="${c}" stroke-width="1.4" fill="none"/>`).join('');
    case 'tetovani': return `<path d="M77 54 l-4 7 h4 l-3 7 l7 -9 h-4 l3 -5z" fill="#4dabf7" stroke="#2a7fd4" stroke-width=".6"/>`;
    default: return '';
  }
}

// --- masky a kostýmy (kreslí se přes hlavu) ---
function kapuce(barva, oblicej = true, extra = '') {
  const vnejsi = 'M22 70 q-6 -56 38 -58 q44 2 38 58 q-4 14 -12 22 h-52 q-8 -8 -12 -22z';
  const otvor = oblicej ? ' M60 32 q-24 0 -24 26 q0 24 24 26 q24 -2 24 -26 q0 -26 -24 -26z' : '';
  return `<path d="${vnejsi}${otvor}" fill="${barva}" fill-rule="evenodd"/>${extra}`;
}
function maska(x, kuze, c) {
  if (!x) return '';
  if (x.e) return `<text x="60" y="80" font-size="72" text-anchor="middle">${x.e}</text>`;
  switch (x.id) {
    case 'superhrdina': return `<path d="M36 46 q12 -8 24 0 q12 -8 24 0 q2 10 -6 13 q-8 2 -14 -4 h-8 q-6 6 -14 4 q-8 -3 -6 -13z" fill="#e8264f"/>
      <ellipse cx="50" cy="51" rx="5" ry="3.6" fill="#fff"/><ellipse cx="70" cy="51" rx="5" ry="3.6" fill="#fff"/><circle cx="50" cy="51.5" r="2" fill="${H}"/><circle cx="70" cy="51.5" r="2" fill="${H}"/>`;
    case 'ninja': return kapuce('#1d1d26', false) + `<path d="M36 44 h48 v14 h-48z" fill="${kuze}"/><circle cx="50" cy="51" r="3" fill="${H}"/><circle cx="70" cy="51" r="3" fill="${H}"/>
      <path d="M44 46 l10 2 M76 46 l-10 2" stroke="${H}" stroke-width="2" stroke-linecap="round"/><path d="M84 46 l14 -6 l-4 8 l6 4z" fill="#e8264f"/>`;
    case 'panda': return `<circle cx="30" cy="20" r="10" fill="${H}"/><circle cx="90" cy="20" r="10" fill="${H}"/>` + kapuce('#fff') +
      `<path d="M22 70 q-6 -56 38 -58 q44 2 38 58" fill="none" stroke="#e6e2ee" stroke-width="1.5"/>`;
    case 'dino': return [30, 44, 60, 76, 90].map((x1, i) => `<path d="M${x1 - 7} ${20 - (i === 2 ? 8 : i % 2 ? 4 : 0) + 10} l7 -12 l7 12z" fill="#ffd34d"/>`).join('') +
      kapuce('#5bc46a', true, `<path d="M36 34 l6 4 l-2 -6 M84 34 l-6 4 l2 -6" fill="#fff"/>`) + `<circle cx="38" cy="28" r="3" fill="#fff"/><circle cx="82" cy="28" r="3" fill="#fff"/><circle cx="38" cy="28" r="1.4" fill="${H}"/><circle cx="82" cy="28" r="1.4" fill="${H}"/>`;
    case 'klaun': return `<ellipse cx="60" cy="56" rx="25" ry="26" fill="#fff" opacity=".92"/>
      <circle cx="26" cy="40" r="12" fill="#ff5b5b"/><circle cx="94" cy="40" r="12" fill="#4dabf7"/><circle cx="30" cy="54" r="10" fill="#ffd34d"/><circle cx="90" cy="54" r="10" fill="#69db7c"/>
      <path d="M50 42 l0 -8 M50 62 l0 -4 M70 42 l0 -8 M70 62 l0 -4" stroke="#4dabf7" stroke-width="3" stroke-linecap="round"/>
      <circle cx="50" cy="52" r="3.4" fill="${H}"/><circle cx="70" cy="52" r="3.4" fill="${H}"/>
      <path d="M44 64 q16 16 32 0 q-16 8 -32 0z" fill="#e8264f"/><circle cx="60" cy="58" r="6" fill="#ff2a2a"/><circle cx="58" cy="56" r="1.8" fill="#fff" opacity=".7"/>`;
    case 'ufoun': return `<path d="M48 30 q-6 -14 -12 -18 M72 30 q6 -14 12 -18" stroke="#69db7c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="36" cy="12" r="4.5" fill="#ffd34d"/><circle cx="84" cy="12" r="4.5" fill="#ffd34d"/>
      <ellipse cx="60" cy="56" rx="25" ry="26" fill="#69db7c" opacity=".55"/><ellipse cx="49" cy="52" rx="7" ry="9" fill="${H}" transform="rotate(20 49 52)"/><ellipse cx="71" cy="52" rx="7" ry="9" fill="${H}" transform="rotate(-20 71 52)"/>
      <circle cx="47" cy="49" r="2" fill="#fff"/><circle cx="69" cy="49" r="2" fill="#fff"/>`;
    case 'zombie-m': return `<ellipse cx="60" cy="56" rx="25" ry="26" fill="#a9c49a" opacity=".7"/><path d="M40 40 l14 8 M44 38 l2 4 M48 40 l2 4 M52 42 l2 4" stroke="#5e3826" stroke-width="1.4"/>
      <circle cx="50" cy="52" r="5" fill="#f4f7ee" stroke="#6b7a5c" stroke-width="1"/><circle cx="70" cy="52" r="3" fill="#f4f7ee" stroke="#6b7a5c" stroke-width="1"/><circle cx="51" cy="53" r="1.5" fill="#6b7a5c"/>
      <path d="M50 66 h20" stroke="${H}" stroke-width="2"/><path d="M53 63 v6 M58 63 v6 M63 63 v6 M68 63 v6" stroke="${H}" stroke-width="1.2"/><ellipse cx="76" cy="64" rx="4" ry="3" fill="#7a9a6a"/>`;
    case 'robot': return `<rect x="30" y="24" width="60" height="62" rx="10" fill="#b5bdc9"/><rect x="34" y="28" width="52" height="54" rx="8" fill="#d6dbe3"/>
      <path d="M60 24 v-12" stroke="#7d8696" stroke-width="3"/><circle cx="60" cy="10" r="4" fill="#ff2a2a"/>
      <rect x="38" y="42" width="44" height="16" rx="8" fill="#1d1d26"/><circle cx="50" cy="50" r="4" fill="#4dffe0"/><circle cx="70" cy="50" r="4" fill="#4dffe0"/>
      <rect x="48" y="66" width="24" height="8" rx="2" fill="#7d8696"/>${[52, 56, 60, 64, 68].map(x1 => `<path d="M${x1} 66 v8" stroke="#d6dbe3" stroke-width="1.2"/>`).join('')}
      ${[[34, 30], [86, 30], [34, 80], [86, 80]].map(([x1, y]) => `<circle cx="${x1}" cy="${y}" r="1.8" fill="#7d8696"/>`).join('')}<rect x="26" y="46" width="5" height="14" rx="2" fill="#7d8696"/><rect x="89" y="46" width="5" height="14" rx="2" fill="#7d8696"/>`;
    case 'astronaut': return `<circle cx="60" cy="54" r="38" fill="#bfe6ff" fill-opacity=".28" stroke="#eef1f6" stroke-width="5"/><path d="M34 28 q10 -10 24 -12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
      <rect x="30" y="86" width="60" height="8" rx="4" fill="#c7cfdb"/>`;
    case 'banan': return `<path d="M60 0 q-8 6 -6 12 q-30 6 -34 44 q-2 30 14 44 h52 q16 -14 14 -44 q-4 -38 -34 -44 q2 -6 -6 -12z M60 30 q-22 0 -22 26 q0 24 22 26 q22 -2 22 -26 q0 -26 -22 -26z" fill="#ffe066" fill-rule="evenodd" stroke="#e0b800" stroke-width="1.5"/>
      <path d="M58 0 h4 v6 h-4z" fill="#5e3826"/><path d="M22 70 q-10 10 -12 30 q8 -10 18 -14z M98 70 q10 10 12 30 q-8 -10 -18 -14z" fill="#ffe066" stroke="#e0b800" stroke-width="1.5"/>`;
    case 'kostka': {
      // Kostičková hlava: 8×8 pixelů přes celou hlavu (obecný „pixelový“ styl, žádná konkrétní postava).
      const P = ['HHHHHHHH', 'HHHHHHHH', 'HSSSSSSH', 'SSSSSSSS', 'SWESSEWS', 'SSSddSSS', 'SSmmmmSS', 'SSSSSSSS'];
      const B = { H: c, S: kuze, W: '#fff', E: '#4a3aa8', d: 'rgba(0,0,0,.18)', m: '#8a3a4a' };
      const v1 = 7.5;
      return P.map((r, y) => [...r].map((ch, x1) => `<rect x="${30 + x1 * v1}" y="${22 + y * v1}" width="${v1 + .3}" height="${v1 + .3}" fill="${B[ch]}"/>`).join('')).join('')
        + `<rect x="30" y="22" width="60" height="60" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>`;
    }
    default: return '';
  }
}

function pozadi(id, defs) {
  const x = vec(id) || vec('p-ruzove');
  if (x.duha) {
    const g = 'g' + (++n);
    defs.push(`<linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">${DUHA.map((c, i) => `<stop offset="${i / 5}" stop-color="${c}" stop-opacity=".55"/>`).join('')}</linearGradient>`);
    return `<rect width="120" height="120" fill="#fff"/><rect width="120" height="120" fill="url(#${g})"/>`;
  }
  const g = 'g' + (++n);
  defs.push(`<radialGradient id="${g}"><stop offset="0" stop-color="${x.c[0]}"/><stop offset="1" stop-color="${x.c[1]}"/></radialGradient>`);
  const emoji = x.vzor && x.vzor.length > 1;
  const vzor = x.vzor ? [[18, 30], [98, 24], [14, 86], [104, 80], [30, 106], [92, 104]]
    .map(([x1, y]) => `<text x="${x1}" y="${y}" font-size="${emoji ? 10 : 11}" fill="#fff" opacity="${emoji ? .85 : .7}" text-anchor="middle">${x.vzor}</text>`).join('') : '';
  return `<rect width="120" height="120" fill="url(#${g})"/>${vzor}`;
}

// velikost v px; vyrez: 'cela' (celá postavička) nebo 'hlava' (malý avatar v seznamech)
export function postavicka(vzhled = VYCHOZI, velikost = 120, vyrez = 'cela', pohyb = velikost >= 90) {
  const z = { ...VYCHOZI, ...vzhled };
  const defs = [];
  const kx = vec(z.kuze) || vec('k1');
  // Pleť s jemným stínováním do stran (u přechodových pletí bez něj).
  let kuze = vypln(kx, defs);
  if (kx.c) {
    const g = 'k' + (++n);
    defs.push(`<radialGradient id="${g}" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="${odstin(kx.c, .12)}"/><stop offset=".7" stop-color="${kx.c}"/><stop offset="1" stop-color="${odstin(kx.c, -.14)}"/></radialGradient>`);
    kuze = `url(#${g})`;
  }
  const kuzePlna = kx.c || '#ffd9c2';
  const c = vypln(vec(z.barva) || vec('hneda'), defs);
  const ruka = vec(z.ruka)?.e;
  const mazl = vec(z.mazlicek)?.e;
  const m = vec(z.maska);
  const celaMaska = m && ['robot', 'kostka', 'burger'].includes(m.id); // zakryje celou hlavu
  const kapucova = m && ['ninja', 'panda', 'dino', 'banan'].includes(m.id); // zakryje vlasy
  const barvaVlasu = vec(z.barva);
  const iris = vypln(vec(z.duhovka) || vec('o-hnede'), defs);
  const obociBarva = barvaVlasu?.c ? odstin(barvaVlasu.c, -.35) : H;
  const vlasy = (obsah) => z.uces === 'plesata' ? obsah : `<g ${OBRYS}>${obsah}</g>`;
  const sOfinou = !['plesata', 'ciro', 'obri-ciro'].includes(z.uces);
  const fid = 'f' + (++n);
  const tid = 't' + (++n);
  defs.push(`<clipPath id="${fid}"><ellipse cx="60" cy="56" rx="25" ry="26"/></clipPath>`,
    `<linearGradient id="${tid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>`);
  const id = 'cl' + (++n);
  const viewBox = vyrez === 'hlava' ? '12 6 96 96' : '0 0 120 120';

  const hlava = celaMaska ? '' : `
    ${kapucova ? '' : `<g class="pv-vlasy">${vlasy(vlasyVzadu(z.uces, c))}</g>`}
    <ellipse cx="35" cy="58" rx="4" ry="6" fill="${kuze}" ${OBRYS}/><ellipse cx="85" cy="58" rx="4" ry="6" fill="${kuze}" ${OBRYS}/>
    <ellipse cx="60" cy="56" rx="25" ry="26" fill="${kuze}" ${OBRYS}/>
    ${kapucova || !sOfinou ? '' : `<g clip-path="url(#${fid})"><g transform="translate(0 3.5)" opacity=".16">${vlasyVpredu(z.uces, '#000')}</g></g>`}
    <path d="M59.5 56.5 q2.4 2.8 -.6 3.8" stroke="${kx.c ? odstin(kx.c, -.35) : H}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    ${kx.lesk ? '<ellipse cx="50" cy="42" rx="8" ry="5" fill="#fff" opacity=".45" transform="rotate(-25 50 42)"/>' : ''}
    <ellipse cx="42.5" cy="61.5" rx="5.5" ry="3.6" fill="#ff8fab" opacity=".7"/><ellipse cx="77.5" cy="61.5" rx="5.5" ry="3.6" fill="#ff8fab" opacity=".7"/>
    ${tvar(z.tvar)}
    ${vousy(z.vousy, c, defs)}
    <g class="pv-pusa">${pusa(z.pusa)}</g>
    ${kapucova ? '' : vlasy(vlasyVpredu(z.uces, c))}
    ${kapucova || !sOfinou ? '' : '<path d="M43 35 q7 -6 16 -6.5" stroke="#fff" stroke-opacity=".45" stroke-width="2.4" fill="none" stroke-linecap="round"/>'}
    ${['kyklop'].includes(z.oci) ? '' : `<path class="pv-oboci" d="M44 44.6 q5.5 -3.6 11 -1.4 M65 43.2 q5.5 -2.2 11 1.4" stroke="${obociBarva}" stroke-width="2.3" fill="none" stroke-linecap="round"/>`}
    ${barvaVlasu?.hvezdy && !kapucova ? hvezdicka(44, 34, 2.5, '#fff') + hvezdicka(70, 30, 2, '#fff') + hvezdicka(58, 38, 1.6, '#fff') : ''}
    ${z.uces === 'culik' && !kapucova ? '<circle cx="80" cy="24" r="5" fill="#ff6fae"/>' : ''}
    <g class="pv-oci">${oci(z.oci, iris)}</g>
    ${piercing(z.piercing)}
    ${bryle(z.bryle)}
    ${nausnice(vec(z.nausnice))}`;

  // Pohyb (mrkání, hlava, vlasy, dech…) jen u větších postaviček; malé náhledy stojí. Každá má jiné zpoždění,
  // aby dvě postavičky vedle sebe nemrkaly naráz.
  const hybe = pohyb ? ` hybe" style="--d:${(-Math.random() * 6).toFixed(2)}s` : '';
  return `<svg class="postavicka${hybe}" width="${velikost}" height="${velikost}" viewBox="${viewBox}" aria-hidden="true">
    <clipPath id="${id}"><circle cx="60" cy="60" r="60"/></clipPath>
    <g clip-path="url(#${id})">
    ${pozadi(z.pozadi, defs)}
    <g class="pv-telo">
    <g transform="translate(60 120) scale(.86 .9) translate(-60 -120)">
    ${obleceni(z.obleceni, defs)}
    <path d="M28 120 q2 -30 32 -32 q30 2 32 32 z" fill="url(#${tid})"/>
    <path d="M28 120 q2 -30 32 -32 q30 2 32 32" fill="none" ${OBRYS}/>
    <path d="M52 87 q8 6 16 0 v-8 h-16z" fill="${kuze}"/>
    <path d="M52 79 v8 M68 79 v8" ${OBRYS}/>
    <path d="M52 80 h16 v3.5 q-8 5 -16 0z" fill="#000" opacity=".14"/>
 ${nahrdelnik(z.nahrdelnik)}
    </g>
    <g class="pv-hlava"><g transform="translate(0 4) translate(60 84) scale(1.16) translate(-60 -84)">
    ${hlava}
    ${maska(m, kuzePlna, c)}
    ${naHlavu(vec(z.hlava), c)}
    </g></g></g>
    <g class="pv-ruka">
    ${ruka ? `<text x="96" y="110" font-size="26" text-anchor="middle">${ruka}</text>` : ''}
    ${ruka || z.naramek ? `<path d="M78.5 106 q-1 -6 5 -7 q6 0 6.5 5 q0 5 -5.5 6 q-5 0 -6 -4z" fill="${kuze}" stroke="${H}" stroke-width="1.2" stroke-opacity=".6"/><path d="M80.5 103 q2 -1.6 4 -.6" stroke="${H}" stroke-width="1" stroke-opacity=".5" fill="none" stroke-linecap="round"/>` : ''}
    ${naramek(z.naramek, kuze)}
    </g>
    ${mazl ? `<text class="pv-mazl" x="25" y="106" font-size="24" text-anchor="middle">${mazl}</text>` : ''}
    </g><circle cx="60" cy="60" r="58.6" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2.4"/><defs>${defs.join('')}</defs></svg>`;
}
