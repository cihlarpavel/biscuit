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
  Dnešní lekce = opakování + 3 nová z aktuální Unit + kousek „do šířky“ z jiného balíčku.
- `js/hra.js` – přehrávání úloh (nové slovíčko, poslech s obrázky, en→cz, cz→en, skládání slova
  z písmen, hláskování, skládání věty, písmena abecedy, čísla). Stejný kód hraje i battle.
- `js/postavicka.js` – postavička ve stylu Pou (Lotka chtěla zůstat u původního stylu, jen víc
  detailů): 18 kategorií, ~220 věcí, vzácnost podle ceny (Běžné → Cool → Epické → Legendární →
  Bizár, masky a kostýmy až 3 000 🍪). Kreslení vrstev do SVG. Nová věc = položka ve `VECI` +
  větev v kreslicí funkci. **Id věcí neměnit a nesmí se opakovat** (jsou v `koupeno`).
  Náhled všech věcí: `tools/satnik.html?k=<kategorie>`. Masky jen obecné, žádné cizí postavy (autorská práva).
- Šatník se v aplikaci jmenuje **Drip shop** (vystouplé tlačítko uprostřed lišty, route `#/obchod`), na tlačítku je aktuální postavička (`tabJa()` po každé změně vzhledu). První záložka je Domů.
- `js/svety.js` – pozadí aplikace („světy“) se odemyká podle sušenek nasbíraných **celkem**
  (`susenkyCelkem`, utrácení ho nesnižuje; tituly i žebříček jedou podle něj). Sušenky přidávat jen
  přes `S.pridej(p, n)`, jinak se celkový součet nepohne.
- Postavička má obrysy (`OBRYS`), stínování pleti a oblečení, oči s duhovkou (kategorie Barva očí) a obočí.
- `js/ikony.js` – vlastní ikony ve stylu nálepek (`ik('nazev')`), náhled v `tools/ikony.html`.
- `js/hlasky.js` – všechny hlášky a tituly. Tón: suchá nadsázka, slang jen střídmě (Pavel:
  nesmí působit jako dospělý, který napodobuje dítě). Neoslovovat jménem (5. pád nejde).
  Rod: profil má `rod` ('z' holka / 'm' kluk, ptá se při založení). Text s rodem se píše
  `[mužský|ženský]` a prožene `rod(text, profil)` – platí pro hlášky, tituly, odznaky, battle.
- Postavička se hýbe (mrkání, hlava, vlasy, dech, pusa, obočí, ruka, mazlíček) jen od velikosti 90 px
  (třída `hybe`, CSS `pv-*` ve styles.css), malé náhledy stojí.
- `js/cas.js` – aktivní čas: jen na obrazovce lekce/battlu, v popředí, do 45 s od klepnutí.
- `js/odznaky.js`, `js/store.js` (localStorage `biscuit`, profily), `js/speech.js` (en-GB hlas
  iPhonu + zvuky), `js/maskot.js` (maskotka a čmáranice na pozadí), `js/app.js` (obrazovky).
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

- Sušenky 🍪 za správné odpovědi, bonus za lekci, bez chyby a splněný denní cíl.
- Šatník ve stylu Pou: za sušenky oblečení, účesy, barvy vlasů, brýle, čepice, mazlíčci, pozadí.
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
