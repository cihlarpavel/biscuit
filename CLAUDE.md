# Biscuit – aplikace na angličtinu pro Šarlotku

Osobní projekt. Uživatelka je Šarlotka, 10 let, 4. třída ZŠ, začátek úrovně A1.
Rodič (zadavatel) je Pavel. S ním komunikuj česky.

Stav k 1. 10. 2026: první verze nasazená na **https://cihlarpavel.github.io/biscuit/**
(GitHub Pages z větve `main`, veřejné repo cihlarpavel/biscuit). Aktualizace = zvýšit `CACHE`
v `sw.js`, commit, `git push` (`gh` je v `~/.local/bin/gh`). Ve škole jsou na str. 6 = Unit 1, lekce 3.

## Kód (statická PWA, bez build kroku)

- `js/data.js` – veškerý obsah: balíčky ve skupinách opakování 3. třídy / Happy Street 2 / něco
  navíc. Slovíčka jako řádky `en | cz | obrázek`. Id položky = `balíček:en` (u vět `balíček:v:en`),
  podle něj se pamatuje postup – **přejmenování anglického slova smaže postup u něj**.
- `js/lekce.js` – skládání lekcí a opakování v intervalech (přihrádky 0–6, „umí“ od 3).
  Dnešní lekce (od 3. 10. 2026, Pavel): ~20 úloh, **rovnou cvičení bez představování slovíček**.
  Pořadí výběru: dnešní neopravené chyby → na řadě podle přihrádek → nová z aktuální Unit (5) → nová
  „do šířky“ z různých balíčků (nejvýš 8) → známé, které dnes ještě neviděla → další nová. Nové slovo
  dostane jen úlohu, ze které se dá naučit (en→cz, poslech, výběr věty). Chyba se v lekci vrátí za 3–4
  úlohy jako jiný typ (`obmena`), neopravené chyby jdou i do dalších dnešních lekcí (`srs.chybaDne`).
  Pavel chce bohatou slovní zásobu i nad rámec 4. třídy a co nejméně opakování toho, co umí.
- `js/hra.js` – přehrávání úloh (nové slovíčko, poslech s obrázky, en→cz, cz→en, skládání slova
  z písmen, hláskování, skládání věty, písmena abecedy, čísla). Stejný kód hraje i battle.
- Pozadí avatara se LOSUJE (12 vtipných čmáranic, vždy jen 1–2 kresby – Pavel chce méně a „crazy“, `pozadi(z)`): podle `vzhled.seminko` + dnešního data, každý den jiné. Kategorie Pozadí v Drip shopu není.
- **Postavička = ukousnutá sušenka** (od 2. 10. 2026; Pou styl Pavel zamítl jako kopírování, kostičky a
  dřívější chibi taky). Kulatá sušenka je hlava i tělo, má vlasy, ručičky (jednou mává), nožičky s botami;
  holka (`vzhled.rod === 'z'`) má řasy a tvářičky. Ukousnutí má 5 podob (`KOUSNUTI` v blob.js, 0 = největší
  vlevo dole, ikona), aplikace losuje při každém otevření (`RELACE`). Ukousnutí bere jen sušenku: zadní
  vlasy jsou vidět dírou, obrys jen po hraně sušenky, přední vlasy a ručičky leží přes něj. Zornice (`pv-zl`/`pv-zr`) koukají na diváka; CSS je občas rozhýbe
  (pohled stranou, šilhání, zakoulení jedním okem, levá spadne na dno a vyskočí).
  - `js/blob.js` kreslí (`susenkaObsah(v)` s klíči kreslení, `blob(v, px)` samostatně – náhled `susenka.html`).
  - `js/postavicka.js` je katalog Drip shopu (12 kategorií, id s předponou `t-`, `u-`, `b-`, `o-`…, vzácnost
    podle ceny) a rámeček s pozadím; `proKresleni()` převádí id věcí na klíče blob.js. Nová věc = položka
    ve `VECI` (+ kresba v blob.js). **Id věcí neměnit a nesmí se opakovat** (jsou v `koupeno`).
  - `vzhled.rod` synchronizuje `route()` z `profil.rod` (vzhled odchází i kamarádkám online).
  - Profily se starou postavičkou (`vzhled.verze !== 2`) převede `prevedNaSusenku()`: za staré věci vrátí
    sušenky podle `STARE_CENY` (bez `susenkyCelkem`) a oblékne věci zdarma. `tools/satnik.html` a
    `tools/ikona.py` jsou ze staré postavičky.
- Ikona aplikace (`icons/`) je základní sušenka na růžovém pozadí. Headless Chrome kreslí ve špatném měřítku;
  vykresleno přes canvas v prohlížeči z `blob({})`, 192 a 180 zmenšené `sips -z` z 512.
- Šatník se v aplikaci jmenuje **Drip shop** (vystouplé tlačítko uprostřed lišty, route `#/obchod`), na tlačítku je aktuální postavička (`tabJa()` po každé změně vzhledu). První záložka je Domů.
- **Světy zrušeny 2. 10. 2026 (Pavel): aplikace má jedno pozadí (Cukrárna, `svetPro` vrací vždy první).**
  Oslava nového světa i výběr v Já jsou pryč; tituly za sušenky zůstávají.
- `js/svety.js` – (dříve) pozadí aplikace („světy“) se odemykalo podle sušenek nasbíraných **celkem**
  (`susenkyCelkem`, utrácení ho nesnižuje; tituly i žebříček jedou podle něj). Sušenky přidávat jen
  přes `S.pridej(p, n)`, jinak se celkový součet nepohne.
- Hlavní karta na úvodní obrazovce: scénka podle světa (`scena()` v svety.js, v noci noční) a postavička bez kulatého pozadí (`postavicka(..., { bezPozadi: true })`).
- Písmo je systémové (ui-rounded). Kdyby se přidávalo webové písmo: Fredoka NEPOUŽÍVAT – nemá české háčky ě č ř.
- **Vzhled = stav z 1. 10. 2026 večer (commit c01a673), vrácený na Pavlovo přání 2. 10.** Návrhy „vymazlený“
  (scénky, Baloo), „papírová koláž“ a „sešit na stole“ Pavel odmítl. Funkce přidané potom zůstaly
  (hra za odměnu, online battle s délkou, vyskakovací výsledek, noční režim, jeden profil, ikona Battle se
  dvěma obličeji); jejich CSS je na konci styles.css v bloku „Funkce přidané po vzhledu z 1. 10. večer“.
  Soubory papir.html, js/papir.js, js/obrazky.js, ILUSTRACE-ZADANI.md a tools/ilustrace.py zůstaly jako
  neaktivní pozůstatek návrhů (ilustrace se použijí, jen kdyby je Pavel dodal do ilustrace/).
- Pozor: `node --check soubor.js` nebere soubor jako modul a syntaktické chyby v modulech propustí.
  Kontrolovat zkopírováním do `.mjs` (nebo importem).
- Noční režim: `body.noc`, automaticky 20:00–6:30, nebo volba v Já (`nastaveni.noc`). Nové světlé
  prvky (bílé pozadí) je potřeba doplnit i do bloku `body.noc` ve styles.css.
- Výsledek online battlu je vyskakovací okno (`ukazVysledek`, fronta `frontaVysledku`), ukáže se,
  jakmile dohrají obě, a během lekce počká.
- `js/ikony.js` – vlastní ikony ve stylu nálepek (`ik('nazev')`), náhled v `tools/ikony.html`.
- `js/hlasky.js` – všechny hlášky a tituly. Tón: suchá nadsázka, slang jen střídmě (Pavel:
  nesmí působit jako dospělý, který napodobuje dítě). Neoslovovat jménem (5. pád nejde).
  Rod: profil má `rod` ('z' holka / 'm' kluk, ptá se při založení). Text s rodem se píše
  `[mužský|ženský]` a prožene `rod(text, profil)` – platí pro hlášky, tituly, odznaky, battle.
- Postavička se hýbe (mrkání, kývání, vlasy, pusa, mávání, mazlíček) jen od velikosti 90 px
  (třída `hybe`, CSS `pv-*` ve styles.css), malé náhledy stojí.
- `js/cas.js` – aktivní čas: jen na obrazovce lekce/battlu, v popředí, do 45 s od klepnutí.
- `js/odznaky.js`, `js/store.js` (localStorage `biscuit`, profily), `js/speech.js` (en-GB hlas
  iPhonu + zvuky), `js/maskot.js` (maskot = sušenka Biscuit z ikony, nálady radost/mrk/hmm), `js/app.js` (obrazovky).
- `sw.js` „nejdřív síť“; po změně souborů zvýšit `CACHE`. `tools/ikona.py` generuje ikony,
  `tools/server.py` je lokální server bez mezipaměti (port 8777).
- `podklady/` je v `.gitignore` (fotky a přepisy učebnice nesmí do veřejného repa).

## Podklady k obsahu

Učebnice **Happy Street 2, 3. vydání (Oxford, české vydání)**, Units 1–8 + oddíl o svátcích.
- `podklady/IMG_*.heic` – originální fotky (Archiv.zip je jejich kopie). Pracovní sešit vyfocený není.
- `podklady/slovnicek_HS2.tsv` – přepis českého slovníčku ze str. 95–98 (369 slovíček, sloupec
  `unit` = 1–8 nebo `svatky`). Základ slovní zásoby, s překladem přesně podle knihy.
- `podklady/prepis/prepis_*.md` – doslovný přepis stránek učebnice (komiksy, písničky, zadání,
  gramatika) po fotkách. Nejisté úseky jsou označené [nečitelné], nedomýšlet je.
- Na stránkách nic není vyplněné, takže z fotek nejde poznat, kterou lekci třída probírá.
  Zeptej se Pavla.
- Happy Street 2 staví na Happy Street 1 (barvy, čísla do 20, tělo, rodina…). Opakování
  základů z HS1 přidat jako samostatný balíček.

## Rozhodnutí (odsouhlasená, neměnit bez Pavla)

- **Název:** Biscuit. **Maskot:** holka se sušenkou.
- **Zařízení:** iPhone (Šarlotčin vlastní). Statická PWA přidaná na plochu, bez App Store.
- **Maskotka:** zatím bez jména – ať ho vymyslí Šarlotka.
- **Výslovnost:** britská (en-GB) v hlasu iPhonu i v ElevenLabs.
- **Obsah:** podle učebnice a pracovního sešitu, které používá ve škole (fotky dodá Pavel).
  Slovíčka a vazby mají kopírovat to, co se právě probírá. Rozhraní a vysvětlivky jsou
  jednoduchou češtinou pro desetileté dítě.
- **Forma:** krátké lekce (5–10 min), hra místo drilu, obrázky u slovíček, poslech s výběrem
  obrázku, skládání vět z dlaždic, výslovnost do mikrofonu. Velká tlačítka, málo textu.
- **Motivace časem:** měří se jen aktivní učení. Čas se zastaví, když je aplikace na pozadí
  (Page Visibility API) nebo když dcera ~60 s na nic neklepne. Denní cíl (výchozí 10 min)
  jako plnící se kolečko, série dní 🔥, odznaky, týdenní graf. K tomu body za správné
  odpovědi, aby vyhrávalo učení, ne sezení u obrazovky.
- **Rodičovský přehled** za PINem: čas, co umí, co jí nejde, přijaté a odeslané zprávy.
- **Konverzace s AI lektorkou:** zatím NE. Napojí se později, rozhraní na ni nech připravené.
  Až přijde, platí: jen předem dané situace, tvrdý limit útraty, zapíná ji rodič PINem.

## Gamifikace (přání Pavla)

- Sušenky 🍪 jsou **úsporné** (Pavel 3. 10. 2026 – postavička se má měnit za odměnu): každá 4. správná
  odpověď na první pokus = 1 🍪 (`ZA_KOLIK_SPRAVNYCH` v hra.js), zlatá otázka +3, lekce +2, bez chyby +3,
  denní cíl +5 (`ODMENY` v app.js), battle 8/11/15 za výhru, hra za odměnu 25 bodů = 1 🍪 (max 6/den).
  Ceny v Drip shopu i hranice vzácnosti ×2. Tlačítko „Náhodný mix“ v Drip shopu zrušeno.
- **Úroveň postavičky** (`uroven()` v postavicka.js, Pavel 3. 10.): podle nejdražší věci na sobě – zdarma bílé
  pozadí, Cool nádech + mátový kroužek, Epické fialový + třpytky, Legendární zlatá záře, Bizár duhová aura.
  Věci zdarma jsou schválně obyčejné (tričko bez hvězdy, perník placený). Barva vlasů = kolečka v sekci Účes
  (`vUcesu`). Věci „V ruce“ (kromě čokolády a lízátka) drží v mávající ruce (`V_RUCE` v blob.js).
- **Denní cíl 20 min** jako odpočet (`odpocet()` v app.js): kolečko „20 min zbývá“ ubývá; tlačítko „Jdeme na to“ →
  po první minutě „Pokračuj“ → poslední 3 min „Dokonči dnešek“ → po splnění zeleně „Dnes máš splněno“ a zelené
  „Dát si extra 5 minut“ (`#/lekce/extra`, `sestavExtra`: ~10 těžších úloh cz→en / psaní / skládání ze známých slov,
  dvojnásobné sušenky přes `nasobek`, nejvýš `EXTRA_DENNE` = 2× denně, pak zase „Ještě jednu“).
- Hra za odměnu: chycení podle skutečné velikosti (zlatá je větší), brokolice jen když padne dovnitř;
  krabička je `DOLE` px nad spodkem kvůli prstu; při skryté appce se hra zastaví.
- Drip shop: za sušenky těsta, účesy, barvy vlasů, oči, pusy, oblečení, klobouky, brýle, boty, mazlíčci.
- Battle 1:1 na jednom telefonu (stejné otázky, body za správnost + rychlost, vtipné vyhodnocení,
  odveta). Žebříček kamarádek s vtipnými komentáři. Tituly podle sušenek, odznaky.
- Vzhled: dívčí, pastelový, kreslené čmáranice na pozadí, věk ~10 let (začínající puberťačka).
- Balíček „Slang, co znáš“ vysvětluje, co slay/GG/btw/cooked… znamenají anglicky.

## Kamarádi (pořadí kroků)

1. ~~Fáze A: víc profilů na jednom zařízení~~ – **zrušeno 2. 10. 2026 (Pavel): jeden telefon = jeden profil.** Výběr profilu a battle na jednom telefonu jsou pryč; starší telefony s více profily přepínají jen v Pro rodiče („Používat tento profil“).
2. **Fáze B:** kamarádi na vlastních telefonech přes Firebase (bezplatný režim Spark).
   Datový model připrav už ve fázi A tak, aby se B dalo napojit bez přepisu.
   **Hotovo 2. 10. 2026:** Firebase projekt `biscuit-37341` (tarif Spark zdarma, Firestore eur3,
   anonymní přihlášení BEZ auto clean-up). Kód `js/online.js`, konfigurace `js/firebase-config.js`,
   pravidla `firestore.rules` (při změně je Pavel vkládá do konzole: Firestore → Rules → Publish).
   Online se zapíná v Pro rodiče per profil (souhlas rodiče). Kamarádky kódem, výzvy s hláškou
   z pevného seznamu (VYZVY, v DB jen číslo), battle naživo i na později, společný žebříček.
   Přezdívku neskloňovat – věty stavět tak, aby stála v 1. pádě.

Pravidla pro fázi B (děti, neobcházet):
- Jen přezdívka a kreslený avatar. Žádné skutečné jméno, fotka ani e-mail.
- Přidání kamaráda jen kódem nebo QR předaným osobně, žádné vyhledávání.
- **Zprávy jen z předem daného seznamu, volné psaní ne.** Zprávy jsou anglicky s českým
  překladem („Great job!“, „See you tomorrow!“), k tomu nálepky. Další zprávy a nálepky
  se odemykají za odznaky.
- Souhlas rodiče kamarádky při prvním spuštění (v ČR hranice 15 let pro souhlas dle GDPR).

## Z čeho stavět

Kostru převzít z `~/Desktop/italstina-app` (Paolo italiano, viz jeho CLAUDE.md):
PWA + service worker „nejdřív síť“ (`sw.js`, při změně zvýšit `CACHE`), `store.js`,
opakování kartiček v intervalech, `speech.js` (hlas iPhonu / ElevenLabs s mezipamětí),
pevný rám `#app` kvůli pružení na iPhonu, klepací slovníček (`slova.js`, `tokeny.js`).
NEpřebírat: záložku Itálie, mapu, Top 1000, překladač z fotky, Giulii, synchronizaci přes
GitHub (děti nemůžou mít tokeny).

Nasazení stejně jako italština: GitHub Pages, vlastní repo (ne italiano).
