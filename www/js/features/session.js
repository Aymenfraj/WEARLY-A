// Session : l'application garde le profil, l'avancement et les points apres fermeture (plus de questionnaire a chaque ouverture).
import * as store from '../core/storage.js';
import { U } from '../ui/kit.js';
const KEYS = ['ob', 'prof', 'obData', 'cold', 'gift', 'friends', 'friendRequests', 'vest', 'shopGender'];
const A = U(), S = A.S;
let t = null;
const snap = () => { const o = {}; for (const k of KEYS) if (S[k] !== undefined) o[k] = S[k]; return JSON.stringify(o); };
const done = () => document.documentElement.classList.remove('booting');
export async function restore() {
  try {
    const raw = await store.get('session', null), v = raw && JSON.parse(raw);
    if (v && v.ob >= 8) {
      for (const k of KEYS) if (v[k] !== undefined) { if (S[k] && typeof S[k] === 'object' && !Array.isArray(S[k])) Object.assign(S[k], v[k]); else S[k] = v[k]; }
      document.documentElement.setAttribute('data-gender', S.prof.sex || 'H');
      const o = document.getElementById('onb'); if (o) o.style.display = 'none';
      A.go();
    }
  } catch (e) { console.warn('session', e); }
  done();
}
A.onRender(() => { clearTimeout(t); t = setTimeout(() => { if (S.ob >= 8) store.set('session', snap()); }, 500); });
const reset = window.resetOnb; if (reset) window.resetOnb = function () { store.remove('session'); return reset.apply(this, arguments); };
setTimeout(done, 2500);
restore();
