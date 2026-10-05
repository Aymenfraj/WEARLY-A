// Catalogue : boutiques (demo + vendeurs publies), offres par boutique, comparaison, "valeur pour ta garde-robe".
import { STORES } from '../../data/stores.js';
import { PRODUCTS } from '../../data/products.js';
import { COUNTRIES } from '../../data/countries.js';
import { slotOf } from '../stylist/engine.js';
import * as geo from './geo.js';
let remote = [];
export const setRemote = r => { remote = r || []; };
const rate = cc => COUNTRIES[cc].cur[1];
const SLOT_OF_CAT = { 'Tenue traditionnelle': 'full', Vestes: 'outer', Chaussures: 'shoes', Accessoires: 'acc', Pantalons: 'bottom', Jeans: 'bottom', Shorts: 'bottom' };
const norm = s => ({ id: 'r' + s.id, n: s.n, cc: s.cc, city: s.city, ll: s.ll, hr: s.hr, off: [0], rating: 4, cats: [...new Set(s.products.map(p => p.cat))], ph: s.phone, demo: false, products: s.products });
export const stores = cc => STORES.filter(s => s.cc === cc).concat(remote.filter(s => s.cc === cc).map(norm));
const hash = s => { let x = 0; for (const c of s) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x; };
export function products(cc) {
  const real = []; for (const s of stores(cc)) for (const p of s.products || []) real.push({ id: s.id + ':' + p.id, n: p.n, e: p.emoji || '👕', cat: p.cat, slot: SLOT_OF_CAT[p.cat] || 'top', color: p.color || '', hex: '#7a7f87', style: '', occ: [], eur: p.price * (1 - p.promo / 100) / rate(cc), promo: p.promo, only: s.id, stock: p.stock });
  return PRODUCTS.concat(real);
}
export function offers(p, cc, pos) {
  const c = COUNTRIES[cc], here = pos || c.ll, out = [];
  for (const s of stores(cc)) {
    if (p.only) { if (s.id !== p.only) continue; out.push({ s, eur: p.eur, stock: p.stock, delivery: 0, km: geo.dist(here, s.ll), open: geo.openNow(s, c.tz) }); continue; }
    if (!(s.cats || []).includes(p.cat)) continue;
    const h = hash(s.id + p.id);
    out.push({ s, eur: Math.round(p.eur * (0.88 + (h % 28) / 100) * 100) / 100, stock: h % 7, delivery: [0, 1.5, 3][h % 3], km: geo.dist(here, s.ll), open: geo.openNow(s, c.tz) });
  }
  const live = out.filter(o => o.stock > 0), min = a => live.length ? live.reduce((x, y) => (a(y) < a(x) ? y : x)) : null;
  const bp = min(o => o.eur), nr = min(o => o.km), br = live.length ? live.reduce((x, y) => (y.s.rating > x.s.rating ? y : x)) : null;
  for (const o of out) o.tags = [o === bp ? 'MEILLEUR PRIX' : '', o === nr ? 'LE PLUS PROCHE' : '', o === br ? 'MIEUX NOTÉ' : ''].filter(Boolean);
  return out.sort((a, b) => a.eur - b.eur);
}
export function valueFor(p, wardrobe) {
  const slot = p.slot, has = wardrobe.filter(i => slotOf(i) === slot), dup = has.filter(i => i.cat === p.cat && i.color === p.color).length;
  const need = slot === 'full' ? ['shoes'] : ['top', 'bottom', 'shoes'].filter(s => s !== slot); let combos = 0;
  for (const o of p.occ || []) { let n = 1; for (const s of need) n *= wardrobe.filter(i => slotOf(i) === s && (i.occasions || []).includes(o)).length; combos += n; }
  const score = Math.max(5, Math.min(100, 35 + combos * 7 - dup * 30 + (has.length === 0 ? 20 : 0)));
  const why = dup ? 'Tu as déjà ' + dup + ' pièce(s) très proche(s) : pas une priorité.' : combos ? 'Crée ' + combos + ' nouvelle(s) tenue(s) avec ta garde-robe.' : has.length ? 'Complète ta garde-robe.' : 'Il te manque cette catégorie.';
  return { score, combos, dup, why };
}
