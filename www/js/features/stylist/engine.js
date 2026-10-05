// Moteur du styliste IA : fonction pure (meteo + activite + garde-robe + preferences + historique). Testable sans interface.
import { actOf } from '../../data/activities.js';
const SLOT = { 'T-shirts': 'top', Chemises: 'top', Polos: 'top', Pantalons: 'bottom', Jeans: 'bottom', Shorts: 'bottom', Vestes: 'outer', Chaussures: 'shoes', Accessoires: 'acc', 'Tenue traditionnelle': 'full' };
export const SLOT_LABEL = { full: 'Tenue complète', top: 'Haut', bottom: 'Bas', outer: 'Veste', shoes: 'Chaussures', acc: 'Accessoire' };
export const slotOf = it => it.slot || (it.cat === 'Sportswear' ? (/short|legging|pantalon|jogging|bas/i.test(it.name) ? 'bottom' : 'top') : SLOT[it.cat] || 'acc');
const NEUTRAL = ['noir', 'blanc', 'gris', 'beige', 'marron', 'bleu marine'];
const ago = t => (t ? (Date.now() - t) / 864e5 : 99);
function score(it, x) {
  let s = 0; const occ = it.occasions || [], txt = ((it.material || '') + ' ' + it.name).toLowerCase(), slot = slotOf(it);
  s += x.act.tags.some(t => occ.includes(t)) ? 40 : -35;
  if (x.hot) { if (it.season === 'Hiver' || /laine|polaire|velours/.test(txt)) s -= 25; if (/lin|coton/.test(txt)) s += 8; if (slot === 'outer') s -= 15; }
  if (x.cold) { if (it.season === 'Été') s -= 20; if (slot === 'bottom' && /short/i.test(it.name)) s -= 20; if (/sandale|babouche/.test(txt)) s -= 20; }
  if (x.rainy && slot === 'shoes' && /daim|toile|sandale|babouche/.test(txt)) s -= 25;
  const pc = x.prefs.colors || {}, ps = x.prefs.styles || {};
  s += Math.min(10, (pc[it.color] || 0) * 2) + Math.min(8, (ps[it.style] || 0) * 2);
  const a = ago(it.lastWorn); s -= a < 2 ? 30 : a < 5 ? 15 : a < 10 ? 5 : 0;
  const m = x.mood;
  if (m === 'Sportif' && occ.includes('sport')) s += 10;
  if (m === 'Élégant' && /élégant|classique/.test(it.style || '')) s += 10;
  if (m === 'Audacieux' && !NEUTRAL.includes(it.color)) s += 8;
  if (m === 'Détendu' && /casual/.test(it.style || '')) s += 8;
  return s;
}
export function generate({ wardrobe, weather, activity, mood, prefs = {}, skip = 0 }) {
  const act = actOf(activity), w = weather || { t: 28, rain: 0 }, x = { act, w, prefs, mood, hot: w.t >= 28, cold: w.t < 18, rainy: w.rain >= 50 };
  const by = {}; for (const it of wardrobe) (by[slotOf(it)] = by[slotOf(it)] || []).push(it);
  const ranked = (slot, min) => (by[slot] || []).map(it => [it, score(it, x)]).filter(r => r[1] >= min).sort((a, b) => b[1] - a[1]);
  const pick = (slot, min = -25) => { const r = ranked(slot, min); return r.length ? r[skip % Math.min(3, r.length)] : null; };
  const chosen = {}, scores = [], missing = [];
  const set = (slot, r) => { if (r) { chosen[slot] = r[0]; scores.push(r[1]); } };
  const trad = (act.id === 'traditional' || act.id === 'wedding') ? pick('full', 0) : null;
  if (trad) set('full', trad); else { set('top', pick('top')); set('bottom', pick('bottom')); }
  set('shoes', pick('shoes')); set('acc', pick('acc', 0));
  if (x.cold || x.rainy) set('outer', pick('outer', 0));
  for (const s of (trad ? ['shoes'] : ['top', 'bottom', 'shoes'])) if (!chosen[s]) missing.push({ slot: s, label: SLOT_LABEL[s], reason: 'Rien d’adapté dans ta garde-robe pour « ' + act.n + ' »', activity: act.id });
  if ((x.cold || x.rainy) && !chosen.outer) missing.push({ slot: 'outer', label: SLOT_LABEL.outer, reason: x.rainy ? 'Pluie probable : une veste serait utile' : 'Il fait frais : une veste serait utile', activity: act.id });
  let sc = 55 + (scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0) * .45;
  const t = chosen.top, b = chosen.bottom;
  if (t && b) { const nt = NEUTRAL.includes(t.color), nb = NEUTRAL.includes(b.color); sc += nt && nb ? 6 : nt || nb ? 4 : t.color === b.color ? 3 : -6; }
  sc = Math.round(Math.max(30, Math.min(98, sc - missing.length * 8)));
  const reasons = ['Adaptée à : ' + act.n];
  if (x.hot) reasons.push(w.t + ' °C : matières légères privilégiées'); else if (x.cold) reasons.push(w.t + ' °C : tenue plus couvrante'); else reasons.push(w.t + ' °C : température douce');
  if (x.rainy) reasons.push('Pluie probable (' + w.rain + ' %) : chaussures fermées privilégiées');
  if (Object.values(chosen).some(i => ago(i.lastWorn) >= 10)) reasons.push('Variété : pièces peu portées récemment');
  if (Object.values(chosen).some(i => (prefs.colors || {})[i.color] > 0)) reasons.push('Contient des couleurs que tu aimes');
  if (t && b && NEUTRAL.includes(t.color) !== NEUTRAL.includes(b.color)) reasons.push('Couleurs bien assorties');
  return { items: chosen, score: sc, reasons, missing, act };
}
