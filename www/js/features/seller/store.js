// Espace vendeur : donnees de la boutique (local + sauvegarde serveur) et publication du catalogue.
import * as store from '../../core/storage.js';
import * as sync from '../../core/sync.js';
import * as http from '../../core/http.js';
import { COUNTRIES } from '../../data/countries.js';
export const state = { store: { name: '', city: '', cc: 'SN', lat: 0, lon: 0, o: 9, c: 19, phone: '', cat: 'Vêtements' }, products: [], published: 0 };
store.get('seller', null).then(v => { if (v) Object.assign(state, v); });
const save = () => store.set('seller', state);
sync.register('seller', () => state, d => { if (d && d.store) { Object.assign(state, d); save(); } });
export function setStore(patch) { Object.assign(state.store, patch); save(); }
export function upsert(p) { const i = state.products.findIndex(x => x.id === p.id); if (i >= 0) state.products[i] = p; else state.products.unshift(Object.assign({ id: 'p' + Date.now().toString(36) }, p)); save(); }
export function remove(id) { state.products = state.products.filter(p => p.id !== id); save(); }
export async function publish(cc) {
  const s = state.store, C = COUNTRIES[cc] || COUNTRIES.SN; if (!s.name) throw new Error('Donne un nom à ta boutique');
  const r = await http.request('PUT', '/api/stores/mine', { store: Object.assign({}, s, { cc, lat: s.lat || C.ll[0], lon: s.lon || C.ll[1] }), products: state.products });
  if (r.mock) throw new Error('Serveur non configuré (Menu > Mon compte & serveur)'); if (!r.ok) throw new Error((r.data && r.data.error) || 'Échec'); state.published = Date.now(); save(); return r.data.n;
}
