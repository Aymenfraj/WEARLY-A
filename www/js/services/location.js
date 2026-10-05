// Localisation : essai rapide (reseau) puis precis (GPS), avec messages d'erreur clairs.
import { plugin, isNative } from '../core/platform.js';
export async function request() { const G = plugin('Geolocation'); if (G && isNative()) { try { return (await G.requestPermissions({ permissions: ['location'] })).location; } catch (e) { return 'denied'; } } return 'prompt'; }
function once(o) {
  const G = plugin('Geolocation');
  const ok = p => ({ lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy });
  if (G && isNative()) return G.getCurrentPosition(o).then(ok);
  return new Promise((res, rej) => navigator.geolocation.getCurrentPosition(p => res(ok(p)), rej, o));
}
export async function current() {
  try { return await once({ enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }); }
  catch (e) { return once({ enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }); }
}
export function explain(e) {
  const m = String((e && (e.message || e.code)) || e || '').toLowerCase();
  if (m.includes('not enabled') || m.includes('unavailable') || m.includes('disabled')) return 'Localisation désactivée : active le GPS dans les réglages du téléphone.';
  if (m.includes('denied') || m.includes('permission')) return 'Permission refusée : Réglages > Applications > WEARLY > Autorisations > Position.';
  if (m.includes('timeout') || m.includes('expired')) return 'Délai dépassé : va près d’une fenêtre ou à l’extérieur, puis réessaie.';
  return 'Erreur : ' + (e && e.message ? e.message : m || 'inconnue');
}
