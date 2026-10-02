// Maskot: sušenka Biscuit (stejná jako na ikoně aplikace) s ručičkama, kreslí js/blob.js.
// nalada: 'radost' | 'mrk' | 'hmm'. Třídy postavicka hybe = mrká, kouká kolem a mává jako postavičky.
import { blob } from './blob.js';

const NALADY = {
  radost: { oci: 'koukaci', pusa: 'otevrena' },
  mrk: { oci: 'mrk', pusa: 'usmev' },
  hmm: { oci: 'hmm', pusa: 'hmm', mavani: false },
};

export function maskot(velikost = 120, nalada = 'radost') {
  return blob({ ruce: true, ...(NALADY[nalada] || NALADY.radost) }, velikost)
    .replace('<svg ', `<svg class="maskot postavicka${velikost >= 50 ? ' hybe' : ''}" style="--d:${(-Math.random() * 6).toFixed(2)}s" `);
}
