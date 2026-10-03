// Online kamarádi a battly přes Firebase (Firestore + anonymní přihlášení).
// Načítá se až při zapnutí online režimu (rodič v sekci Pro rodiče), jinak aplikace běží čistě offline.
//
// Kolekce (pravidla viz firestore.rules):
//   hraci/{profilId}       veřejný profil: přezdívka, postavička, rod, statistiky, owner = uid zařízení
//   kody/{KOD}             kód kamarádky -> profilId (jen get, seznam nejde vypsat)
//   pratelstvi/{a_b}       { clenove: [a, b], vlastnici: [uidA, uidB] }
//   battly/{id}            { typ: 'kviz' | 'double' | 'dama', hraci: [a, b], vlastnici: [uidA, uidB], ulohy, hlaska, stav,
//                            vysledky: { a: {...}, b: {...}, dama?: JSON stavu desky } }
//   Dáma i Double jedou ve stejné kolekci jako kvíz – pravidla Firestore se kvůli nim nemusela měnit
//   (update smí jen „vysledky“ a „stav“, stav dámy je proto vnořený ve vysledky.dama).
// Do databáze nejde žádný volný text kromě přezdívky. Hláška k výzvě je jen číslo z pevného seznamu.
import { FIREBASE_CONFIG } from './firebase-config.js';

const V = '10.12.2';
let fb = null; // { db, uid, f: funkce Firestore }

export const nakonfigurovano = () => !!FIREBASE_CONFIG?.projectId;

export async function pripoj() {
  if (fb) return fb;
  if (!nakonfigurovano()) throw new Error('Online režim ještě není nastavený.');
  const [{ initializeApp }, auth, f] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`),
  ]);
  const app = initializeApp(FIREBASE_CONFIG);
  const a = auth.getAuth(app);
  const uid = await new Promise((resolve, reject) => {
    const stop = auth.onAuthStateChanged(a, u => { if (u) { stop(); resolve(u.uid); } });
    auth.signInAnonymously(a).catch(reject);
  });
  fb = { db: f.getFirestore(app), uid, f };
  return fb;
}

// ---------- Veřejný profil a kód ----------
const ABECEDA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // bez 0/O a 1/I, ať se kód nedá splést
const novyKod = () => Array.from({ length: 6 }, () => ABECEDA[Math.floor(Math.random() * ABECEDA.length)]).join('');

export async function zverejni(p, statistiky) {
  const { db, uid, f } = await pripoj();
  const ref = f.doc(db, 'hraci', p.id);
  await f.setDoc(ref, {
    owner: uid, prezdivka: p.prezdivka, vzhled: p.vzhled, rod: p.rod || 'z', unit: p.nastaveni.unit,
    ...statistiky, upd: f.serverTimestamp(),
  }, { merge: true });
  if (!p.kod) {
    for (let pokus = 0; pokus < 5 && !p.kod; pokus++) {
      const kod = novyKod();
      try { await f.setDoc(f.doc(db, 'kody', kod), { hrac: p.id }); p.kod = kod; } catch { /* kód obsazený, zkusit jiný */ }
    }
    if (p.kod) await f.setDoc(ref, { kod: p.kod }, { merge: true });
  }
  return p.kod;
}

// ---------- Kamarádi ----------
export async function pridejKamaradku(p, kod) {
  const { db, uid, f } = await pripoj();
  kod = kod.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (kod === p.kod) throw new Error('To je tvůj vlastní kód 😄');
  const k = await f.getDoc(f.doc(db, 'kody', kod));
  if (!k.exists()) throw new Error('Takový kód neexistuje. Zkontroluj ho.');
  const druhaId = k.data().hrac;
  const druha = await f.getDoc(f.doc(db, 'hraci', druhaId));
  if (!druha.exists()) throw new Error('Kamarádka ještě není online.');
  const clenove = [p.id, druhaId].sort();
  const vlastnici = clenove.map(id => (id === p.id ? uid : druha.data().owner));
  await f.setDoc(f.doc(db, 'pratelstvi', clenove.join('_')), { clenove, vlastnici, vytvoreno: f.serverTimestamp() });
  return druha.data();
}

// Sleduje kamarádky profilu p. cb([{ id, prezdivka, vzhled, rod, ...statistiky }]). Vrací funkci pro zastavení.
export function sledujKamaradky(p, cb) {
  let zastaveno = false;
  const odhlaseni = [];
  const data = new Map();
  pripoj().then(({ db, uid, f }) => {
    if (zastaveno) return;
    const q = f.query(f.collection(db, 'pratelstvi'), f.where('vlastnici', 'array-contains', uid));
    odhlaseni.push(f.onSnapshot(q, snap => {
      const ids = snap.docs.map(d => d.data().clenove).filter(c => c.includes(p.id)).map(c => c.find(x => x !== p.id));
      for (const id of ids) {
        if (data.has(id)) continue;
        data.set(id, null);
        odhlaseni.push(f.onSnapshot(f.doc(db, 'hraci', id), d => { if (d.exists()) { data.set(id, { id, ...d.data() }); cb([...data.values()].filter(Boolean)); } }));
      }
      if (!ids.length) cb([]);
    }, () => cb(null)));
  }).catch(() => cb(null));
  return () => { zastaveno = true; odhlaseni.forEach(o => o()); };
}

// ---------- Battly ----------
export async function vyzvi(p, kamaradka, ulohy, hlaska, typ = 'kviz', navic = {}) {
  const { db, uid, f } = await pripoj();
  const ref = f.doc(f.collection(db, 'battly'));
  await f.setDoc(ref, {
    typ, hraci: [p.id, kamaradka.id], vlastnici: [uid, kamaradka.owner],
    ulohy: JSON.stringify(ulohy), hlaska, stav: 'hraje', vytvoreno: f.serverTimestamp(),
    vysledky: { [p.id]: { body: 0, spravne: 0, odpovezeno: 0, hotovo: false }, [kamaradka.id]: { body: 0, spravne: 0, odpovezeno: 0, hotovo: false }, ...navic },
  });
  return ref.id;
}

// Dáma: zapíše nový stav desky; po konci hry rovnou i výsledky obou hráčů (body 1 / 0, remíza 1 / 1).
export async function zapisDamu(battleId, stav, konec = null) {
  const { db, f } = await pripoj();
  const pole = [new f.FieldPath('vysledky', 'dama'), JSON.stringify(stav)];
  if (konec) for (const [id, v] of Object.entries(konec)) pole.push(new f.FieldPath('vysledky', id), v);
  if (konec) pole.push('stav', 'hotovo');
  await f.updateDoc(f.doc(db, 'battly', battleId), ...pole);
}

const zBattlu = d => { const x = d.data(); return { id: d.id, ...x, typ: x.typ || 'kviz', ulohy: JSON.parse(x.ulohy || '[]'), dama: x.vysledky?.dama ? JSON.parse(x.vysledky.dama) : null, vytvoreno: x.vytvoreno?.toMillis?.() || Date.now() }; };

// Všechny battly profilu p (nejnovější první).
export function sledujBattly(p, cb) {
  let stop = () => {}, zastaveno = false;
  pripoj().then(({ db, uid, f }) => {
    if (zastaveno) return;
    const q = f.query(f.collection(db, 'battly'), f.where('vlastnici', 'array-contains', uid));
    stop = f.onSnapshot(q, snap => cb(snap.docs.map(zBattlu).filter(b => b.hraci.includes(p.id) && b.stav !== 'zruseno' && !(b.stav === 'odmitnuto' && b.hraci[0] !== p.id)).sort((a, b) => b.vytvoreno - a.vytvoreno)), () => cb(null));
  }).catch(() => cb(null));
  return () => { zastaveno = true; stop(); };
}

export function sledujBattle(id, cb) {
  let stop = () => {}, zastaveno = false;
  pripoj().then(({ db, f }) => {
    if (zastaveno) return;
    stop = f.onSnapshot(f.doc(db, 'battly', id), d => d.exists() && cb(zBattlu(d)));
  });
  return () => { zastaveno = true; stop(); };
}

// Zakladatel výzvu zavře ('zruseno' – zmizí oběma), vyzvaný ji odmítne ('odmitnuto' – zakladateli se ukáže,
// že byla odmítnuta, dokud si ji nezavře). Nikdo nic nezíská. Pravidla dovolují měnit „stav“.
export async function zrusBattle(battleId, stav = 'zruseno') {
  const { db, f } = await pripoj();
  await f.updateDoc(f.doc(db, 'battly', battleId), 'stav', stav);
}

export async function zapisPrubeh(battleId, hracId, stav, oboHotovo = false) {
  const { db, f } = await pripoj();
  // FieldPath kvůli pomlčkám v id profilu.
  const dalsi = oboHotovo ? ['stav', 'hotovo'] : [];
  await f.updateDoc(f.doc(db, 'battly', battleId), new f.FieldPath('vysledky', hracId), stav, ...dalsi);
}
