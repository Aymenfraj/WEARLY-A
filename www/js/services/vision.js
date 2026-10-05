// Reconnaissance d'un vetement sur photo : IA (serveur) + couleur detectee sur l'appareil.
import * as imaging from './imaging.js';
import * as http from '../core/http.js';
import * as auth from '../core/auth.js';
import * as net from '../core/network.js';
export async function analyze(file, { cloud = true } = {}) {
  const p = await imaging.prepare(file), col = imaging.dominant(p.canvas);
  let ai = null, source = 'local', note = '';
  if (cloud && auth.loggedIn() && net.isOnline()) {
    try { const r = await http.post('/api/ai/clothing', { image: p.base64, mime: p.mime }); if (r.ok && r.data && r.data.result) { ai = r.data.result; source = 'ia'; } else note = (r.data && r.data.error) || 'IA indisponible'; } catch (e) { note = 'IA injoignable'; }
  } else note = !cloud ? 'Analyse IA désactivée (confidentialité)' : !auth.loggedIn() ? 'Connecte-toi pour activer l’IA : seule la couleur est détectée' : 'Hors ligne : seule la couleur est détectée';
  if (ai && ai.error) return { thumb: p.thumb, error: 'Ce n’est pas un vêtement ou un accessoire reconnu.' };
  return { thumb: p.thumb, hex: col.hex, color: (ai && ai.color) || col.name, name: (ai && ai.name) || 'Vêtement', category: (ai && ai.category) || '', style: (ai && ai.style) || '', material: (ai && ai.material) || '', season: (ai && ai.season) || 'Toutes saisons', occasions: (ai && ai.occasions) || [], confidence: ai ? ai.confidence : 0, source, note };
}
