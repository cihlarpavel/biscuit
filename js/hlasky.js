// Všechny hlášky na jednom místě, ať se dají snadno přepsat (ideálně podle Šarlotky).
// Tón: suchá nadsázka, slang jen střídmě. Nesnažit se znít „cool“ za každou cenu.

export const nahodne = pole => pole[Math.floor(Math.random() * pole.length)];
export const dosad = (t, o) => t.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? '');

export const SPRAVNE = [
  'Nice.', 'Slay. 💅', 'Jo, přesně tak.', 'GG.', 'Ani ses nezapotila.',
  'Mozek: zapnutý ✅', 'Učitelka by brečela štěstím.', 'Tohle bylo moc easy, ne?',
  'Správně. Samozřejmě.', 'Na tohle máš talent.',
];

export const SPATNE = [
  'Skoro. Fakt skoro.', 'Tohle slovíčko tě zatím nemá rádo. Zatím.',
  'Oops. Uvidíš ho znova, neboj.', 'Lehce cooked 🍳, ale v pohodě.',
  'Chyba = trénink. Tak to aspoň říkají.', 'Hmm, ne. Ale příště jo.',
];

// Bez oslovení jménem: přezdívka se nedá spolehlivě dát do 5. pádu („Čau Šarlotka“ zní špatně).
export const POZDRAVY = [
  '{jmeno} je zpátky 👋', 'Čau! Sušenky čekají 🍪', 'Jdeme na to?', 'Zase ty? Super 😎',
  'Deset minut a máš klid.', 'Hej, angličtina volá.',
];

export const CIL_SPLNEN = [
  'Dnešek máš hotový. Teď jsi oficiálně v chillu 😎',
  'Denní cíl splněn. Zbytek dne je tvůj.',
  'Hotovo! Klidně můžeš dál, ale nemusíš.',
];

export const KONEC_LEKCE = {
  perfekt: ['Ani jedna chyba. To se nestává. 👑', 'Perfektní lekce. Kdo jsi?', 'Bez chyby. Slay. 💅'],
  dobre: ['Dobrá práce. Fakt.', 'Nice, většina správně!', 'Pěkný. Pár chybek, nic hrozného.'],
  slabsi: ['Tahle byla těžší. Příště to dáš líp.', 'Dneska to drhlo, ale aspoň trénuješ.'],
};

export const SERIE = [
  'Série {n} dní 🔥 Nepřerušuj ji!',
  '{n} dní v kuse 🔥 To je skoro rekord.',
];

// Tituly podle sušenek, ukazují se u profilu a v žebříčku.
export const TITULY = [
  [0, 'Drobeček'], [25, 'Sušenkový nováček'], [75, 'Křupavka'], [150, 'Čokoládová hvězda'],
  [300, 'Cookie Queen 👑'], [600, 'Legenda pekárny'], [1000, 'Sušenková bohyně'],
];
export const titul = susenky => TITULY.filter(([n]) => susenky >= n).pop()[1];

// Souboj: vyhodnocení podle rozdílu bodů.
export const SOUBOJ = {
  remiza: ['Remíza! Obě jste geniální. Nebo obě ne. Rozhodne odveta.', 'Přesně stejně. Tohle se nestává. Odveta?'],
  tesne: ['{vitez} vyhrála o fous. {porazena} chce odvetu, to je jasný.', 'Těsně {vitez}! {porazena}, ještě jedno kolo?'],
  jasne: ['{vitez} vyhrála na celé čáře. {porazena}, to chce trénink 💀', '{vitez} je v ranku. {porazena} je lehce cooked 🍳'],
};

export const PREDEJ = ['Předej telefon: {jmeno}. Žádné koukání!', 'Teď {jmeno}. Ostatní se dívají jinam 👀'];
