// Apprentissage des preferences. Local par defaut ; envoye au serveur seulement avec consentement explicite.
import * as store from './storage.js';
import * as http from './http.js';
import * as auth from './auth.js';
import * as net from './network.js';
import { on } from './events.js';
let st = { consent: { analytics: false, ai: false }, events: [], counts: {}, sentAt: 0 }, ready = null;
const load = () => ready || (ready = store.get('telemetry', null).then(v => { if (v) st = Object.assign(st, v); }));
const save = () => store.set('telemetry', st);
const WEIGHT = { outfit_like: 3, wardrobe_add: 2, product_view: 1, order: 4, outfit_wear: 3, outfit_change: -1 };
export async function track(t, p = {}) {
  await load(); st.events.push({ t, p, at: Date.now() }); if (st.events.length > 500) st.events.splice(0, st.events.length - 500);
  const w = WEIGHT[t]; if (w) for (const d of ['color', 'category', 'style', 'brand', 'activity']) if (p[d]) { const c = st.counts[d] = st.counts[d] || {}; c[p[d]] = (c[p[d]] || 0) + w; }
  save();
}
export const weights = d => st.counts[d] || {};
export const top = (d, n = 3) => Object.entries(st.counts[d] || {}).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
export const consent = () => st.consent;
export async function setConsent(k, v) { await load(); st.consent[k] = !!v; await save(); if (k === 'analytics' && v) flush(); }
export async function summary() { await load(); return { events: st.events.length, colors: top('color', 5), categories: top('category', 5), styles: top('style', 5), consent: st.consent }; }
export async function eraseLocal() { await load(); st.events = []; st.counts = {}; st.sentAt = 0; await save(); }
export async function eraseServer() { if (auth.loggedIn() && net.isOnline()) { const r = await http.request('DELETE', '/api/track'); return r.ok; } return false; }
export async function flush() {
  await load(); if (!st.consent.analytics || !auth.loggedIn() || !net.isOnline()) return;
  const ev = st.events.filter(e => e.at > st.sentAt).slice(0, 100); if (!ev.length) return;
  try { const r = await http.post('/api/track', { consent: true, events: ev }); if (r.ok) { st.sentAt = ev[ev.length - 1].at; save(); } } catch (e) { /* plus tard */ }
}
load(); setInterval(flush, 30000); on('net:change', s => { if (s.online) flush(); });
