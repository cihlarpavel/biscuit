// Veškerý obsah aplikace. Slovíčka jsou řádky „anglicky | česky | obrázek“ (obrázek = emoji
// nebo krátký text jako „7:30“; bez obrázku se slovíčko procvičuje jen textem).
// Happy Street 2: české překlady přesně podle slovníčku v učebnici (str. 95–98),
// věty podle obsahu učebnice a přepisu lekcí v podklady/prepis/.

const radky = s => s.trim().split('\n').map(r => {
  const [en, cz, obr = ''] = r.split('|').map(x => x.trim());
  return { en, cz, obr };
});

export const SKUPINY = [
  { id: 'opakovani', nazev: 'Opakování ze 3. třídy', popis: 'Co už znáš. Ať to nezapadne prachem!' },
  { id: 'hs2', nazev: 'Happy Street 2', popis: 'Co se učíte ve škole' },
  { id: 'navic', nazev: 'Něco navíc', popis: 'Slovíčka, která ve škole nebudou, ale hodí se' },
];

export const BALICKY = [
  // ---------- Opakování ze 3. třídy ----------
  { id: 'barvy', skupina: 'opakovani', nazev: 'Barvy', ikona: '🎨', slova: radky(`
red | červená | 🟥
blue | modrá | 🟦
green | zelená | 🟩
yellow | žlutá | 🟨
orange | oranžová | 🟧
purple | fialová | 🟪
pink | růžová | 🩷
black | černá | ⬛
white | bílá | ⬜
brown | hnědá | 🟫`), vety: [
    ['It\'s a red ball.', 'Je to červený míč.'],
    ['My bag is blue.', 'Moje taška je modrá.'],
    ['What colour is it?', 'Jakou to má barvu?'],
  ] },
  { id: 'cisla20', skupina: 'opakovani', nazev: 'Čísla do 20', ikona: '🔢', extra: 'cisla20', slova: radky(`
one | jedna | 1
two | dva | 2
three | tři | 3
four | čtyři | 4
five | pět | 5
six | šest | 6
seven | sedm | 7
eight | osm | 8
nine | devět | 9
ten | deset | 10
eleven | jedenáct | 11
twelve | dvanáct | 12
thirteen | třináct | 13
fourteen | čtrnáct | 14
fifteen | patnáct | 15
sixteen | šestnáct | 16
seventeen | sedmnáct | 17
eighteen | osmnáct | 18
nineteen | devatenáct | 19
twenty | dvacet | 20`), vety: [
    ['How old are you?', 'Kolik je ti let?'],
    ['I\'m ten.', 'Je mi deset.'],
    ['I\'ve got two cats.', 'Mám dvě kočky.'],
  ] },
  { id: 'telo', skupina: 'opakovani', nazev: 'Moje tělo', ikona: '👂', slova: radky(`
head | hlava
eyes | oči | 👀
ears | uši | 👂
nose | nos | 👃
mouth | pusa | 👄
hair | vlasy | 💇‍♀️
teeth | zuby | 🦷
arms | paže | 💪
hands | ruce | 🙌
feet | chodidla | 🦶
fingers | prsty | 🖐️`), vety: [
    ['I\'ve got brown eyes.', 'Mám hnědé oči.'],
    ['She\'s got long hair.', '(Ona) má dlouhé vlasy.'],
    ['Touch your nose!', 'Dotkni se nosu!'],
  ] },
  { id: 'zviratka', skupina: 'opakovani', nazev: 'Zvířátka doma', ikona: '🐱', slova: radky(`
cat | kočka | 🐱
dog | pes | 🐶
bird | pták | 🐦
fish | ryba | 🐟
rabbit | králík | 🐰
horse | kůň | 🐴
mouse | myš | 🐭
hamster | křeček | 🐹
duck | kachna | 🦆
sheep | ovce | 🐑`), vety: [
    ['I\'ve got a dog.', 'Mám psa.'],
    ['Birds can fly.', 'Ptáci umí létat.'],
    ['Fish can\'t walk.', 'Ryby neumí chodit.'],
  ] },
  { id: 'skola', skupina: 'opakovani', nazev: 'Ve škole', ikona: '🎒', slova: radky(`
school bag | školní taška | 🎒
book | kniha | 📕
pen | pero | 🖊️
pencil | tužka | ✏️
ruler | pravítko | 📏
rubber | guma
pencil case | penál
scissors | nůžky | ✂️
crayon | pastelka | 🖍️
chair | židle | 🪑
desk | lavice
teacher | učitel, učitelka | 🧑‍🏫`), vety: [
    ['Open your books.', 'Otevřete si knihy.'],
    ['Have you got a pencil?', 'Máš tužku?'],
    ['This is my pencil case.', 'To je můj penál.'],
  ] },
  { id: 'hracky', skupina: 'opakovani', nazev: 'Hračky', ikona: '🧸', slova: radky(`
ball | míč | ⚽
doll | panenka
teddy bear | plyšový medvídek | 🧸
train | vláček | 🚂
car | auto | 🚗
plane | letadlo | ✈️
robot | robot | 🤖
balloon | balónek | 🎈
puzzle | skládačka | 🧩
skateboard | skateboard | 🛹`), vety: [
    ['I\'ve got a new doll.', 'Mám novou panenku.'],
    ['Where\'s my ball?', 'Kde je můj míč?'],
    ['Let\'s play with the train.', 'Pojďme si hrát s vláčkem.'],
  ] },
  { id: 'obleceni', skupina: 'opakovani', nazev: 'Oblečení', ikona: '👕', slova: radky(`
T-shirt | tričko | 👕
dress | šaty | 👗
trousers | kalhoty | 👖
shorts | kraťasy | 🩳
socks | ponožky | 🧦
hat | klobouk | 👒
cap | kšiltovka | 🧢
scarf | šála | 🧣
gloves | rukavice | 🧤
trainers | tenisky | 👟`), vety: [
    ['I\'m wearing a T-shirt.', 'Mám na sobě tričko.'],
    ['Put on your socks!', 'Obleč si ponožky!'],
  ] },
  { id: 'mnam', skupina: 'opakovani', nazev: 'Mňam!', ikona: '🍪', slova: radky(`
apple | jablko | 🍎
oranges | pomeranče | 🍊
pear | hruška | 🍐
milk | mléko | 🥛
biscuit | sušenka | 🍪
cake | dort | 🍰
ice cream | zmrzlina | 🍦
chocolate | čokoláda | 🍫
pizza | pizza | 🍕
sweets | bonbony | 🍬
water | voda | 💧`), vety: [
    ['I like ice cream.', 'Mám rád(a) zmrzlinu.'],
    ['I don\'t like milk.', 'Nemám rád(a) mléko.'],
    ['Can I have a biscuit, please?', 'Můžu dostat sušenku, prosím?'],
  ] },
  { id: 'ahoj', skupina: 'opakovani', nazev: 'Ahoj, jak se máš?', ikona: '👋', slova: [], vety: [
    ['Hello!', 'Ahoj!'],
    ['Goodbye!', 'Na shledanou!'],
    ['What\'s your name?', 'Jak se jmenuješ?'],
    ['My name is Charlotte.', 'Jmenuji se Šarlota.'],
    ['How are you?', 'Jak se máš?'],
    ['I\'m fine, thank you.', 'Mám se dobře, děkuji.'],
    ['Nice to meet you.', 'Těší mě.'],
    ['I can swim.', 'Umím plavat.'],
    ['I can\'t fly.', 'Neumím létat.'],
    ['This is my mum.', 'To je moje maminka.'],
  ] },

  // ---------- Happy Street 2 ----------
  { id: 'u1', skupina: 'hs2', unit: 1, nazev: 'Where\'s Flossy?', ikona: '🐶', extra: 'abeceda', slova: radky(`
flat | byt | 🏢
footprints | stopy (otisky nohou) | 👣
garage | garáž
know | vědět, znát
puppies | štěňátka | 🐶
spell | hláskovat | 🔤
street | ulice | 🏘️`), vety: [
    ['Where\'s Flossy?', 'Kde je Flossy?'],
    ['She isn\'t in the flat!', 'Není v bytě!'],
    ['What are these?', 'Co jsou tyhle věci?'],
    ['They\'re footprints.', 'To jsou stopy.'],
    ['She\'s in the garage!', 'Je v garáži!'],
    ['Flossy\'s got three puppies!', 'Flossy má tři štěňátka!'],
    ['How do you spell dog?', 'Jak se hláskuje dog?'],
    ['I spy with my little eye something beginning with b.', 'Vidím, vidím, co ty nevidíš, a začíná to na b.'],
    ['Is it a banana? Yes!', 'Je to banán? Ano!'],
  ] },
  { id: 'u2', skupina: 'hs2', unit: 2, nazev: 'The presents', ikona: '🎁', extra: 'cisla100', slova: radky(`
grandma | babička | 👵
grandpa | dědeček | 👴
brother | bratr | 👦
sister | sestra | 👧
uncle | strýček | 👨
aunt | teta | 👩
cousin | bratranec, sestřenice | 🧒
twins | dvojčata
relatives | příbuzní | 👨‍👩‍👧‍👦
present | dárek | 🎁
anniversary | výročí | 🎉
necklace | náhrdelník
tie | kravata | 👔
calculator | kalkulačka
email | e-mail | 📧
number | číslo | 🔢
country | země, stát | 🌍
giant | obrovský
spider | pavouk | 🕷️
twenty | dvacet | 20
thirty | třicet | 30
forty | čtyřicet | 40
fifty | padesát | 50
sixty | šedesát | 60
seventy | sedmdesát | 70
eighty | osmdesát | 80
ninety | devadesát | 90
a hundred | sto | 100`), vety: [
    ['Have you got the presents?', 'Máš ty dárky?'],
    ['Where\'s his present?', 'Kde je jeho dárek?'],
    ['Where\'s her present?', 'Kde je její dárek?'],
    ['He\'s got one sister.', '(On) má jednu sestru.'],
    ['She hasn\'t got any brothers.', '(Ona) nemá žádné bratry.'],
    ['How many cousins has Polly got?', 'Kolik bratranců a sestřenic má Polly?'],
    ['Daisy is five years younger than Polly.', 'Daisy je o pět let mladší než Polly.'],
    ['Dad is three years older than Mum.', 'Táta je o tři roky starší než máma.'],
    ['My brother lives at number forty-four.', 'Můj bratr bydlí v domě číslo čtyřicet čtyři.'],
  ] },
  { id: 'u3', skupina: 'hs2', unit: 3, nazev: 'Shopping for Mum', ikona: '🛒', slova: radky(`
breakfast | snídaně | 🥣
lunch | oběd
dinner | večeře (hlavní jídlo dne) | 🍽️
meal | jídlo (snídaně, oběd, večeře)
apple juice | jablečný džus | 🧃
avocado | avokádo | 🥑
bacon | slanina | 🥓
banana | banán | 🍌
beans | fazole | 🫘
bread | chleba | 🍞
butter | máslo | 🧈
café | kavárna
cereal | cereálie
cheese | sýr | 🧀
coffee | káva | ☕
cream | smetana, šlehačka
crisps | brambůrky
cucumber | okurka | 🥒
eggs | vajíčka | 🥚
fish and chips | ryba a hranolky | 🐟🍟
grapes | hroznové víno | 🍇
jam | džem
lemonade | citronáda, limonáda | 🥤
lettuce | hlávkový salát (zelenina) | 🥬
mushrooms | houby
onion | cibule | 🧅
rice | rýže | 🍚
salad | salát | 🥗
sandwich | sendvič | 🥪
sausage | párek | 🌭
scone | vdoleček
soup | polévka | 🍲
strawberry | jahoda | 🍓
tea | čaj | 🍵
toast | toast, topinka
tomatoes | rajčata | 🍅
treat | pamlsek, odměna
tuna | tuňák
vegetables | zelenina | 🥦
yoghurt | jogurt
time | čas | ⏰
seven o'clock | sedm hodin | 7:00
half past seven | půl osmé | 7:30`), vety: [
    ['Does she like apples?', 'Má ráda jablka?'],
    ['She likes pears.', 'Má ráda hrušky.'],
    ['He doesn\'t like oranges.', 'Nemá rád pomeranče.'],
    ['He\'s got some biscuits.', '(On) má nějaké sušenky.'],
    ['He hasn\'t got any grapes.', 'Nemá žádné hroznové víno.'],
    ['I have breakfast at seven o\'clock.', 'Snídám v sedm hodin.'],
    ['Can I have a sandwich, please?', 'Můžu dostat sendvič, prosím?'],
  ] },
  { id: 'u4', skupina: 'hs2', unit: 4, nazev: 'Are they monkeys?', ikona: '🐒', slova: radky(`
monkey | opice | 🐒
dolphin | delfín | 🐬
elephant | slon | 🐘
frog | žába | 🐸
giraffe | žirafa | 🦒
hippo | hroch | 🦛
lion | lev | 🦁
parrot | papoušek | 🦜
penguin | tučňák | 🐧
snake | had | 🐍
tiger | tygr | 🐯
kangaroo | klokan | 🦘
swan | labuť | 🦢
tortoise | želva | 🐢
chicken | kuře | 🐔
cow | kráva | 🐄
goat | koza | 🐐
pig | prase | 🐷
farm | farma | 🚜
bigger | větší
smaller | menší
taller | vyšší
shorter | nižší, kratší
fatter | tlustší
thinner | hubenější
older | starší
younger | mladší
next to | vedle
between | mezi
opposite | naproti
same | stejný
grey | šedý | 🩶
slow | pomalý | 🐌
strong | silný | 💪
delicious | vynikající | 😋
mountain | hora | ⛰️
spring | jaro | 🌱
car park | parkoviště | 🅿️
toilets | záchody | 🚻`), vety: [
    ['Are they monkeys?', 'Jsou to opice?'],
    ['They\'re funny.', 'Jsou legrační.'],
    ['They aren\'t dangerous.', 'Nejsou nebezpečné.'],
    ['Are they friendly?', 'Jsou přátelské?'],
    ['The elephant is bigger than the lion.', 'Slon je větší než lev.'],
    ['The monkeys are next to the giraffes.', 'Opice jsou vedle žiraf.'],
    ['The lion is between the tiger and the hippo.', 'Lev je mezi tygrem a hrochem.'],
  ] },
  { id: 'u5', skupina: 'hs2', unit: 5, nazev: 'Kites', ikona: '🪁', slova: radky(`
kite | papírový drak | 🪁
shopkeeper | prodavač, prodavačka
bike | kolo | 🚲
boat | loď | ⛵
bus | autobus | 🚌
taxi | taxík | 🚕
van | dodávka | 🚐
ferry | trajekt | ⛴️
fire engine | hasičský vůz | 🚒
underground train | vlak metra | 🚇
church | kostel | ⛪
cinema | kino | 🎬
library | knihovna | 📚
restaurant | restaurace
station | nádraží | 🚉
supermarket | supermarket | 🛒
toy shop | hračkářství
school | škola | 🏫
sports centre | sportovní středisko
park | park | 🌳
lake | jezero
mountains | hory | 🏔️
roof | střecha
dragon | pohádkový drak | 🐉
scary | děsivý | 😱
ticket | jízdenka | 🎫
How much? | Kolik?
thousands | tisíce
travel | cestovat | 🧳
cross | přejít
left | vlevo | ⬅️
right | vpravo | ➡️
Turn left. | Zahni doleva.
straight across | rovnou přes (silnici)
past | kolem
front | přední strana`), vety: [
    ['There\'s a toy shop.', 'Je tam hračkářství.'],
    ['There are kites.', 'Jsou tam draci.'],
    ['There aren\'t any red kites.', 'Nejsou tam žádní červení draci.'],
    ['Are there any purple kites?', 'Jsou tam nějací fialoví draci?'],
    ['How do you go to school?', 'Jak se dostáváš do školy?'],
    ['I go to school by car.', 'Jezdím do školy autem.'],
    ['I walk to school.', 'Chodím do školy pěšky.'],
    ['How much is it?', 'Kolik to stojí?'],
  ] },
  { id: 'u6', skupina: 'hs2', unit: 6, nazev: 'Dad at the sports centre', ikona: '🏀', slova: radky(`
basketball | basketbal | 🏀
tennis | tenis | 🎾
judo | džudo | 🥋
swimming | plavání | 🏊
running | běhání | 🏃
dancing | tancování | 💃
skateboarding | jízda na skateboardu | 🛹
snowboarding | jízda na snowboardu | 🏂
surf | surfovat | 🏄
ride a bike | jezdit na kole | 🚴
shopping | nakupování | 🛍️
computer games | počítačové hry | 🎮
television | televize | 📺
watching TV | dívat se na televizi
watch | dívat se | 👀
film | film
cartoon | kreslený film
channel | televizní kanál
animal programme | pořad o zvířatech
sports programme | sportovní pořad
cookery show | pořad o vaření
comedy show | komediální pořad
game show | soutěžní pořad
homework | domácí úkol | 📝
piano lesson | hodina klavíru | 🎹
Monday | pondělí
Tuesday | úterý
Wednesday | středa
Thursday | čtvrtek
Friday | pátek
Saturday | sobota
Sunday | neděle
beach | pláž | 🏖️
planet | planeta | 🪐
spaceship | kosmická loď | 🚀
leg | noha | 🦵
miss | vynechat, zameškat
price | cena | 🏷️
Christmas Day | první svátek vánoční | 🎄`), vety: [
    ['Do you like swimming?', 'Máš rád(a) plavání?'],
    ['Yes, I do.', 'Ano, mám.'],
    ['No, I don\'t.', 'Ne, nemám.'],
    ['I like playing football.', 'Rád(a) hraju fotbal.'],
    ['So do I!', 'Já taky!'],
    ['I do my homework on Mondays.', 'Domácí úkoly dělám každé pondělí.'],
  ] },
  { id: 'u7', skupina: 'hs2', unit: 7, nazev: 'We\'re late!', ikona: '⏰', slova: radky(`
job | zaměstnání
baker | pekař, pekařka | 🧑‍🍳
work | pracovat
firefighter | hasič/hasička | 🧑‍🚒
nurse | zdravotní sestra | 🧑‍⚕️
mechanic | mechanik | 🧑‍🔧
office worker | úředník, úřednice | 🧑‍💼
postman | listonoš, poštovní doručovatel | 📮
astronaut | kosmonaut/kosmonautka | 🧑‍🚀
astronomer | astronom/astronomka | 🔭
music teacher | učitel/učitelka hudby
clown | klaun | 🤡
milkman | mlékař (ráno rozváží čerstvé mléko) | 🥛
lollipop lady | paní, která pomáhá dětem u školy přejít silnici
uniform | uniforma
wear | nosit (na sobě oblečení)
get up | vstávat (z postele)
get dressed | obléknout se
have a shower | dát si sprchu | 🚿
go to bed | jít spát | 🛌
clock | hodiny | 🕰️
quarter past four | čtvrt na pět | 4:15
quarter to ten | tři čtvrtě na deset | 9:45
hungry | hladový | 🍽️
sick | nemocný | 🤒
hospital | nemocnice | 🏥
thermometer | teploměr | 🌡️
letter | dopis | ✉️
newspaper | noviny | 📰
camera | fotoaparát, kamera | 📷
paint | malovat | 🎨
oven glove | chňapka
sign | značka, symbol
Earth | Země | 🌍
moon | Měsíc | 🌙
sun | slunce | ☀️
stars | hvězdy | ⭐
solar system | sluneční soustava
land | přistát | 🛬
cave | jeskyně
escape | uniknout
run away | utéct, uprchnout
remember | pamatovat si
stand | stát | 🧍
upside down | vzhůru nohama | 🙃`), vety: [
    ['We\'re late!', 'Jdeme pozdě!'],
    ['He\'s a firefighter.', 'Je hasič.'],
    ['She wears a uniform.', 'Nosí uniformu.'],
    ['He doesn\'t work with children.', 'Nepracuje s dětmi.'],
    ['I get up at quarter past seven.', 'Vstávám ve čtvrt na osm.'],
    ['I always have breakfast.', 'Vždycky snídám.'],
    ['I never go to bed at nine o\'clock.', 'Nikdy nechodím spát v devět hodin.'],
  ] },
  { id: 'u8', skupina: 'hs2', unit: 8, nazev: 'It\'s snowing!', ikona: '⛄', slova: radky(`
weather | počasí | 🌦️
sunny | slunečno | ☀️
cloudy | zataženo | ☁️
rainy | deštivo | 🌧️
windy | větrno | 🌬️
foggy | mlhavo | 🌫️
hot | horko | 🥵
cold | chladno | 🥶
warm | teplo
wet | mokro, deštivo | 💦
It's raining. | Prší. | ☔
It's snowing. | Sněží. | 🌨️
thunderstorm | bouřka | ⛈️
thunder | hrom
lightning | blesk | ⚡
flood | povodeň
temperature | teplota | 🌡️
season | roční období
spring | jaro | 🌷
summer | léto | 🌻
autumn | podzim | 🍂
winter | zima (roční období) | ⛄
January | leden
February | únor
March | březen
April | duben
May | květen
June | červen
July | červenec
August | srpen
September | září
October | říjen
November | listopad
December | prosinec
coat | kabát | 🧥
boots | (vysoké) boty | 🥾
jumper | svetr
skirt | sukně
shoe | bota | 👞
umbrella | deštník | ☂️
skiing | lyžování | ⛷️
camp | tábořit
tent | stan | ⛺
torch | baterka | 🔦
helicopter | helikoptéra | 🚁
pilot | pilot/pilotka | 🧑‍✈️
phone | telefon | 📱
river | řeka
sea | moře | 🌊
flower | květina | 🌸
plant | rostlina | 🪴
leaves | listy (stromu) | 🍃
night | noc | 🌃
today | dnes
outside | venku
door | dveře | 🚪
window | okno | 🪟
lights | světla | 💡
shoulders | ramena
wave | mávat | 👋
talk | mluvit | 🗣️
busy | mít hodně práce
exciting | vzrušující
pretty | hezký, půvabný
safe | bezpečný
make | (u)dělat, (vy)tvořit
turn off | vypnout`), vety: [
    ['What\'s the weather like today?', 'Jaké je dnes počasí?'],
    ['It\'s sunny.', 'Je slunečno.'],
    ['Is it snowing?', 'Sněží?'],
    ['I\'m reading.', 'Čtu si.'],
    ['She\'s wearing a hat.', 'Má na sobě klobouk.'],
    ['Are you skiing?', 'Lyžuješ?'],
  ] },
  { id: 'svatky', skupina: 'hs2', nazev: 'Svátky v Británii', ikona: '🎃', slova: radky(`
Halloween | Halloween | 🎃
ghost | duch | 👻
witch | čarodějnice | 🧙‍♀️
Trick or treat! | Koledu, nebo vám něco provedu! (děti o Halloweenu)
Christmas tree | vánoční stromek | 🎄
Father Christmas | anglický Ježíšek, nosí dětem dárky | 🎅
stocking | punčocha | 🧦
decorations | ozdoby
mince pie | vánoční koláček se sušeným ovocem
New Year's Day | Nový rok
resolution | předsevzetí
firework | ohňostroj | 🎆
bonfire | oheň, vatra | 🔥
Valentine's Day | svátek sv. Valentýna | 💝
card | přání | 💌
pancake | palačinka | 🥞
lemon | citrón | 🍋
sugar | cukr
Good Friday | Velký pátek
Easter Day | Boží hod velikonoční | 🐣
nests | hnízda | 🪺
carnival | karneval (průvod v kostýmech)
dress up | převléknout se (za koho)
maypole | májka
crown | koruna | 👑
queen | královna | 👸
wedding | svatba | 💒
bride | nevěsta | 👰
groom | ženich
bridesmaid | družička
party | párty, večírek | 🥳
celebration | oslava | 🎉
sports day | sportovní den
race | závodit
racing car | závodní auto | 🏎️
playground | hřiště, školní dvůr
candyfloss | cukrová vata
toffee apple | jablíčko v karamelu | 🍎
hedgehog | ježek | 🦔
harvest | sklizeň
sweet | sladký | 🍬
sticky | lepkavý
crunchy | křupavý
mug | (větší) hrnek | ☕
knock on | (za)klepat na
inside | uvnitř
last | poslední`), vety: [
    ['Happy Halloween!', 'Veselý Halloween!'],
    ['Merry Christmas!', 'Veselé Vánoce!'],
    ['Happy New Year!', 'Šťastný nový rok!'],
    ['Happy Birthday!', 'Všechno nejlepší k narozeninám!'],
  ] },

  // ---------- Něco navíc ----------
  { id: 'pocity', skupina: 'navic', nazev: 'Jak se cítím', ikona: '😊', slova: radky(`
happy | šťastný, šťastná | 😊
sad | smutný, smutná | 😢
angry | naštvaný, naštvaná | 😠
tired | unavený, unavená | 😴
scared | vyděšený, vyděšená | 😨
excited | nadšený, nadšená | 🤩
bored | znuděný, znuděná | 😑
surprised | překvapený, překvapená | 😮
funny | legrační | 😂
friendly | přátelský | 🤗`), vety: [
    ['I\'m happy today.', 'Dnes jsem šťastná.'],
    ['Are you tired?', 'Jsi unavená?'],
    ['Don\'t be sad!', 'Nebuď smutná!'],
  ] },
  { id: 'more', skupina: 'navic', nazev: 'U moře', ikona: '🐙', slova: radky(`
shark | žralok | 🦈
whale | velryba | 🐳
octopus | chobotnice | 🐙
crab | krab | 🦀
jellyfish | medúza | 🪼
seal | tuleň | 🦭
shell | mušle | 🐚
starfish | hvězdice
island | ostrov | 🏝️
waves | vlny (na moři) | 🌊
sand | písek
swim | plavat | 🏊`), vety: [
    ['Look! A shark!', 'Podívej! Žralok!'],
    ['Whales are very big.', 'Velryby jsou moc velké.'],
    ['Can you swim?', 'Umíš plavat?'],
  ] },
  { id: 'doma', skupina: 'navic', nazev: 'U nás doma', ikona: '🏠', slova: radky(`
house | dům | 🏠
bedroom | ložnice
bathroom | koupelna | 🛁
kitchen | kuchyně
living room | obývací pokoj, obývák
garden | zahrada | 🏡
bed | postel | 🛏️
table | stůl
sofa | pohovka | 🛋️
lamp | lampa
mirror | zrcadlo | 🪞
stairs | schody`), vety: [
    ['My bedroom is pink.', 'Moje ložnice je růžová.'],
    ['Mum is in the kitchen.', 'Máma je v kuchyni.'],
    ['There\'s a cat on the sofa.', 'Na pohovce je kočka.'],
  ] },
  { id: 'hudba', skupina: 'navic', nazev: 'Hudba a zábava', ikona: '🎵', slova: radky(`
music | hudba | 🎵
song | písnička | 🎶
sing | zpívat | 🎤
guitar | kytara | 🎸
piano | klavír | 🎹
drums | bicí | 🥁
violin | housle | 🎻
band | kapela
draw | kreslit | ✏️
picture | obrázek | 🖼️
photo | fotka | 📷
game | hra | 🎲`), vety: [
    ['I can play the piano.', 'Umím hrát na klavír.'],
    ['Let\'s sing a song!', 'Pojďme si zazpívat písničku!'],
    ['She plays the drums.', 'Hraje na bicí.'],
  ] },
  { id: 'slang', skupina: 'navic', nazev: 'Slang, co znáš', ikona: '💅', slova: radky(`
slay | (doslova zabít) – být úplně boží, dát to | 💅
GG | good game – dobrá hra | 🎮
nice | pěkný, hezký, super | 👍
btw | by the way – mimochodem
chill | být v klidu, v pohodě | 😎
cooked | (doslova uvařený) – být v háji | 🍳
OMG | Oh my God – panebože | 😱
LOL | laughing out loud – hlasitě se směju | 😂
bestie | nejlepší kamarádka | 👯‍♀️
vibe | nálada, atmosféra | ✨
cringe | trapné | 😬
crush | někdo, kdo se ti líbí | 💘`), vety: [
    ['She\'s my bestie.', 'Je to moje nejlepší kamarádka.'],
    ['Just chill!', 'V klidu!'],
    ['That was a good game.', 'To byla dobrá hra.'],
    ['By the way, I like your dress.', 'Mimochodem, líbí se mi tvoje šaty.'],
    ['Oh my God, it\'s so cute!', 'Panebože, to je tak roztomilé!'],
  ] },
  { id: 'fraze', skupina: 'navic', nazev: 'Užitečné věty', ikona: '💬', slova: [], vety: [
    ['Please.', 'Prosím.'],
    ['Thank you very much.', 'Moc děkuji.'],
    ['Sorry!', 'Promiň!'],
    ['Excuse me.', 'S dovolením. / Prosím vás…'],
    ['I don\'t understand.', 'Nerozumím.'],
    ['Can you help me, please?', 'Můžeš mi pomoct, prosím?'],
    ['Can I go to the toilet, please?', 'Můžu jít na záchod, prosím?'],
    ['What does it mean?', 'Co to znamená?'],
    ['Let\'s play!', 'Pojďme si hrát!'],
    ['It\'s my turn.', 'Jsem na řadě.'],
    ['Well done!', 'Výborně!'],
    ['See you tomorrow!', 'Uvidíme se zítra!'],
  ] },
  // ---------- Něco navíc: rozšíření 3. 10. 2026 (víc slov „nad rámec“ 4. třídy) ----------
  { id: 'divoka', skupina: 'navic', nazev: 'Divoká zvířata', ikona: '🦊', slova: radky(`
fox | liška | 🦊
wolf | vlk | 🐺
bear | medvěd | 🐻
polar bear | lední medvěd | 🐻‍❄️
deer | jelen | 🦌
squirrel | veverka | 🐿️
owl | sova | 🦉
bat | netopýr | 🦇
zebra | zebra | 🦓
crocodile | krokodýl | 🐊
camel | velbloud | 🐫
rhino | nosorožec | 🦏
gorilla | gorila | 🦍
koala | koala | 🐨
panda | panda | 🐼
eagle | orel | 🦅
peacock | páv | 🦚
flamingo | plameňák | 🦩
butterfly | motýl | 🦋
bee | včela | 🐝
ant | mravenec | 🐜
ladybird | beruška | 🐞
snail | šnek | 🐌`), vety: [
    ['Foxes are clever.', 'Lišky jsou chytré.'],
    ['Owls can see at night.', 'Sovy v noci vidí.'],
    ['Bees make honey.', 'Včely dělají med.'],
    ['Bears sleep in winter.', 'Medvědi v zimě spí.'],
  ] },
  { id: 'sport', skupina: 'navic', nazev: 'Sport a hry', ikona: '⚽', slova: radky(`
football | fotbal | ⚽
volleyball | volejbal | 🏐
ice hockey | lední hokej | 🏒
ice skating | bruslení | ⛸️
gymnastics | gymnastika | 🤸
climbing | lezení | 🧗
horse riding | jízda na koni | 🏇
team | tým
match | zápas
goal | gól | 🥅
score | skóre
player | hráč, hráčka
winner | vítěz, vítězka | 🏆
medal | medaile | 🏅
coach | trenér, trenérka
referee | rozhodčí
whistle | píšťalka
helmet | helma`), vety: [
    ['We won the match!', 'Vyhráli jsme zápas!'],
    ['What a goal!', 'To byl ale gól!'],
    ['Pass me the ball!', 'Přihraj mi míč!'],
    ['Our team is the best.', 'Náš tým je nejlepší.'],
  ] },
  { id: 'mesto', skupina: 'navic', nazev: 'Ve městě', ikona: '🏙️', slova: radky(`
town | město
city | velké město | 🏙️
road | silnice | 🛣️
pavement | chodník
crossroads | křižovatka
traffic lights | semafor | 🚦
bridge | most | 🌉
castle | hrad | 🏰
museum | muzeum | 🏛️
post office | pošta | 🏤
bakery | pekárna | 🥖
bank | banka | 🏦
hotel | hotel | 🏨
airport | letiště | 🛫
tram | tramvaj | 🚋
motorbike | motorka | 🏍️
police car | policejní auto | 🚓
ambulance | sanitka | 🚑
map | mapa | 🗺️
go straight on | jít rovně | ⬆️`), vety: [
    ['Where is the museum?', 'Kde je muzeum?'],
    ['Go straight on and turn right.', 'Jdi rovně a zahni doprava.'],
    ['The bank is next to the hotel.', 'Banka je vedle hotelu.'],
    ['Can you show me on the map?', 'Můžeš mi to ukázat na mapě?'],
  ] },
  { id: 'priroda', skupina: 'navic', nazev: 'Příroda', ikona: '🌲', slova: radky(`
forest | les | 🌲
tree | strom
hill | kopec
field | pole | 🌾
waterfall | vodopád
rainbow | duha | 🌈
cloud | mrak
sky | obloha
grass | tráva
stone | kámen | 🪨
desert | poušť | 🏜️
volcano | sopka | 🌋
jungle | džungle
sunset | západ slunce | 🌇
shadow | stín`), vety: [
    ['Let\'s go to the forest.', 'Pojďme do lesa.'],
    ['Look at the rainbow!', 'Podívej se na duhu!'],
    ['This river is very long.', 'Tahle řeka je hodně dlouhá.'],
    ['There are lots of trees here.', 'Je tu spousta stromů.'],
  ] },
  { id: 'kuchyne', skupina: 'navic', nazev: 'V kuchyni', ikona: '🍳', slova: radky(`
fridge | lednice
cooker | sporák
sink | dřez
plate | talíř
bowl | miska
cup | šálek
glass | sklenice
knife | nůž | 🔪
fork | vidlička
spoon | lžíce | 🥄
pan | pánev | 🍳
kettle | rychlovarná konvice
salt | sůl | 🧂
pepper | pepř
flour | mouka
honey | med | 🍯
cook | vařit (jídlo)
bake | péct
cut | krájet
mix | míchat`), vety: [
    ['Can you pass the salt, please?', 'Podáš mi prosím sůl?'],
    ['Wash your hands before lunch.', 'Umyj si ruce před obědem.'],
    ['Let\'s bake a cake!', 'Pojďme upéct dort!'],
    ['The soup is too hot.', 'Ta polévka je moc horká.'],
    ['Lay the table, please.', 'Prostři prosím stůl.'],
  ] },
  { id: 'slovesa', skupina: 'navic', nazev: 'Co děláme', ikona: '🏃', slova: radky(`
run | běhat
jump | skákat
throw | házet
catch | chytat
kick | kopat
push | tlačit
pull | táhnout
laugh | smát se
cry | plakat
shout | křičet | 📢
whisper | šeptat | 🤫
hide | schovat se | 🙈
find | najít | 🔍
lose | ztratit
build | stavět | 🧱
open | otevřít
close | zavřít
carry | nést
wait | čekat | ⏳
help | pomáhat`), vety: [
    ['Don\'t shout, please.', 'Nekřič, prosím.'],
    ['I can\'t find my phone.', 'Nemůžu najít svůj telefon.'],
    ['Wait for me!', 'Počkej na mě!'],
    ['Let\'s build a tower!', 'Pojďme postavit věž!'],
    ['Can you catch the ball?', 'Chytíš ten míč?'],
  ] },
  { id: 'protiklady', skupina: 'navic', nazev: 'Protiklady', ikona: '↔️', slova: radky(`
fast | rychlý | 🐆
loud | hlasitý | 🔊
quiet | tichý | 🔈
easy | snadný
difficult | obtížný
heavy | těžký (na váhu)
light | lehký (na váhu) | 🪶
full | plný
empty | prázdný
clean | čistý | 🧼
dirty | špinavý
dry | suchý
new | nový | 🆕
old | starý
young | mladý
long | dlouhý
rich | bohatý | 💰
poor | chudý
weak | slabý
brave | statečný | 🦸
dangerous | nebezpečný | ⚠️
boring | nudný
interesting | zajímavý`), vety: [
    ['This box is very heavy.', 'Tahle krabice je hodně těžká.'],
    ['My room is clean now.', 'Můj pokoj je teď čistý.'],
    ['English isn\'t difficult!', 'Angličtina není obtížná!'],
    ['My glass is empty.', 'Moje sklenice je prázdná.'],
  ] },
  { id: 'spojeni', skupina: 'navic', nazev: 'Slovní spojení', ikona: '🧩', slova: radky(`
brush your teeth | čistit si zuby | 🪥
make your bed | ustlat si postel
have a bath | vykoupat se
get up early | vstávat brzy
take a photo | vyfotit
go shopping | jít nakupovat
walk the dog | venčit psa
feed the cat | nakrmit kočku
do the washing-up | umýt nádobí | 🧽
catch a cold | nachladit se | 🤧
have fun | bavit se
make friends | najít si kamarády
keep a secret | udržet tajemství | 🤐
tell a joke | říct vtip
go on holiday | jet na prázdniny
play hide and seek | hrát na schovávanou
pay attention | dávat pozor
make a mistake | udělat chybu`), vety: [
    ['Have fun at the party!', 'Bav se dobře na párty!'],
    ['Don\'t forget to brush your teeth.', 'Nezapomeň si vyčistit zuby.'],
    ['We\'re going on holiday tomorrow.', 'Zítra jedeme na prázdniny.'],
    ['Everyone makes mistakes.', 'Každý dělá chyby.'],
  ] },
  { id: 'barvy2', skupina: 'navic', nazev: 'Barvy a vzory', ikona: '🌈', slova: radky(`
light blue | světle modrá | 🩵
gold | zlatá
silver | stříbrná
turquoise | tyrkysová
beige | béžová
navy | tmavě modrá
lilac | šeříková (světle fialová)
colourful | barevný
striped | pruhovaný
spotted | puntíkovaný
checked | kostkovaný
plain | jednobarevný
shiny | lesklý
bright | zářivý
dark | tmavý
pale | bledý`), vety: [
    ['I\'ve got a spotted dress.', 'Mám puntíkované šaty.'],
    ['He\'s wearing a striped T-shirt.', 'Má na sobě pruhované tričko.'],
    ['Gold is my favourite colour.', 'Zlatá je moje nejoblíbenější barva.'],
    ['The sky is dark.', 'Obloha je tmavá.'],
  ] },
  { id: 'kamaradi', skupina: 'navic', nazev: 'Povídání s kamarády', ikona: '🗨️', slova: [], vety: [
    ['What\'s up?', 'Co se děje?'],
    ['Are you OK?', 'Jsi v pohodě?'],
    ['Never mind.', 'To nevadí.'],
    ['Good luck!', 'Hodně štěstí!'],
    ['Have a nice day!', 'Hezký den!'],
    ['Hurry up!', 'Pospěš si!'],
    ['Be careful!', 'Opatrně! / Dej si pozor!'],
    ['Don\'t worry.', 'Neboj se.'],
    ['Me too!', 'Já taky!'],
    ['I\'ve got an idea!', 'Mám nápad!'],
    ['That\'s not fair!', 'To není fér!'],
    ['Can I borrow your pencil?', 'Můžu si půjčit tvoji tužku?'],
    ['What time is it?', 'Kolik je hodin?'],
    ['I\'m sorry I\'m late.', 'Promiň, že jdu pozdě.'],
    ['Whose turn is it?', 'Kdo je na řadě?'],
    ['I agree.', 'Souhlasím.'],
    ['No way!', 'To snad ne!'],
    ['Guess what!', 'Hádej co!'],
  ] },
];

// Abeceda (Unit 1): anglické názvy písmen čte hlas, dítě vybírá písmeno.
export const ABECEDA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Jména ze hláskovací říkanky (Unit 1, str. 6) a krátká slova k hláskování.
export const HLASKOVANI = ['Blacky', 'Snowy', 'Spotty', 'dog', 'cat', 'ball', 'book', 'train', 'kite'];

export const balicek = id => BALICKY.find(b => b.id === id);

// Každá položka má stálé id (podle něj se pamatuje postup): „balíček:anglicky“, u vět „balíček:v:anglicky“.
export function polozky(b) {
  return [
    ...b.slova.map(s => ({ ...s, druh: 'slovo', id: `${b.id}:${s.en}`, bal: b.id })),
    ...b.vety.map(([en, cz]) => ({ en, cz, obr: '', druh: 'veta', id: `${b.id}:v:${en}`, bal: b.id })),
  ];
}
