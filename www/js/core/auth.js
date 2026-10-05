// Compte utilisateur : inscription, connexion, session conservee sur le telephone.
import * as store from './storage.js';
import * as http from './http.js';
import { emit } from './events.js';
import { CONFIG } from './config.js';
let user = null;
export const current = () => user;
export const loggedIn = () => !!user && !!CONFIG.API_BASE;
async function done(r) {
  if (r.mock) throw new Error('Serveur non configuré (Menu > Mon compte & serveur)');
  if (!r.ok) throw new Error((r.data && r.data.error) || 'Échec');
  http.setToken(r.data.token); user = r.data.user; await store.set('user', user); emit('auth:change', user); return user;
}
export const register = async f => done(await http.post('/api/register', f));
export const login = async f => done(await http.post('/api/login', f));
export async function logout() { user = null; http.setToken(null); await store.remove('user'); emit('auth:change', null); }
export async function restore() {
  const t = await store.get('token'); if (!t) return null;
  http.setToken(t, false); user = await store.get('user');           // session locale d'abord (marche hors ligne)
  if (CONFIG.API_BASE) { try { const r = await http.get('/api/me'); if (r.status === 401) { await logout(); return null; } if (r.ok && r.data) { user = r.data.user; await store.set('user', user); } } catch (e) { /* hors ligne : on garde la session locale */ } }
  if (user) emit('auth:change', user); return user;
}
