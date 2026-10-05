// Etat de la connexion + vrai test d'acces a Internet.
import { plugin, isNative } from './platform.js';
import { emit } from './events.js';
let online = navigator.onLine, type = 'inconnu';
export const isOnline = () => online;
export const status = () => ({ online, type });
function set(o, t) { const ch = o !== online; online = o; type = t || type; if (ch) emit('net:change', { online, type }); }
export async function init() {
  const N = plugin('Network');
  try { if (N && isNative()) { const s = await N.getStatus(); online = s.connected; type = s.connectionType; N.addListener('networkStatusChange', s => set(s.connected, s.connectionType)); return; } } catch (e) { console.warn('Network plugin', e); }
  addEventListener('online', () => set(true, 'wifi')); addEventListener('offline', () => set(false, 'aucun'));
}
export async function ping() {   // "connecte au wifi" ne veut pas dire "Internet fonctionne"
  const t = performance.now(), c = new AbortController(), to = setTimeout(() => c.abort(), 6000);
  try { await fetch('https://www.gstatic.com/generate_204?' + Date.now(), { mode: 'no-cors', cache: 'no-store', signal: c.signal }); clearTimeout(to); return { ok: true, ms: Math.round(performance.now() - t) }; }
  catch (e) { clearTimeout(to); return { ok: false, error: e.name === 'AbortError' ? 'délai dépassé' : (e.message || 'échec') }; }
}
