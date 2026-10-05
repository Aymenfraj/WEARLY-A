// Connexion temps reel au serveur (SSE) avec reconnexion automatique.
import { CONFIG } from './config.js';
import { getToken } from './http.js';
import { emit, on } from './events.js';
import * as net from './network.js';
import * as auth from './auth.js';
let es = null, retry = 0, timer = null, state = 'off';
const set = s => { state = s; emit('rt:status', s); };
export const status = () => state;
export function close() { if (es) { es.close(); es = null; } clearTimeout(timer); }
export function connect() {
  close(); if (!CONFIG.API_BASE || !auth.loggedIn() || !net.isOnline()) return set('off');
  set('connecting');
  es = new EventSource(CONFIG.API_BASE + '/api/events?token=' + encodeURIComponent(getToken()));
  es.onopen = () => { retry = 0; set('on'); };
  ['message', 'receipt', 'typing'].forEach(n => es.addEventListener(n, e => emit('rt:' + n, JSON.parse(e.data))));
  es.onerror = () => { close(); set('off'); timer = setTimeout(connect, Math.min(30000, 1000 * 2 ** retry++)); };
}
on('net:change', s => { if (s.online) connect(); else { close(); set('off'); } });
on('auth:change', u => { if (u) connect(); else { close(); set('off'); } });
