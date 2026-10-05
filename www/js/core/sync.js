// Sauvegarde sur le serveur : chaque module declare son "document" (register) ; tout est envoye/recupere ici.
import * as http from './http.js';
import * as auth from './auth.js';
import * as net from './network.js';
import { on, emit } from './events.js';
const docs = {}, last = {}; let lastAt = 0;
export const register = (key, get, set) => { docs[key] = { get, set }; };
export const lastSync = () => lastAt;
export async function pull() {
  if (!auth.loggedIn() || !net.isOnline()) return;
  const r = await http.get('/api/sync'); if (!r.ok || !r.data) return;
  for (const k in docs) { const d = r.data.docs[k]; if (d && d.data) { docs[k].set(d.data); last[k] = JSON.stringify(docs[k].get()); } }
  lastAt = Date.now(); emit('sync:pulled');
}
export async function push() {
  if (!auth.loggedIn() || !net.isOnline()) return;
  for (const k in docs) {
    const v = docs[k].get(), s = JSON.stringify(v); if (s === last[k]) continue;
    const r = await http.request('PUT', '/api/sync/' + k, { data: v, at: Date.now() }); if (r.ok) { last[k] = s; lastAt = Date.now(); }
  }
}
setInterval(() => push().catch(() => { }), 15000);
on('net:change', s => { if (s.online) push().catch(() => { }); });
on('auth:change', u => { if (u) pull().then(push).catch(() => { }); });
