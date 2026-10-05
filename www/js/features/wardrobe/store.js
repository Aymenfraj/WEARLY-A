// Garde-robe numerique : donnees (stockage local + sauvegarde serveur).
import * as store from '../../core/storage.js';
import * as sync from '../../core/sync.js';
import { emit } from '../../core/events.js';
let items = [], ready = null;
export const load = () => ready || (ready = store.get('wardrobe', []).then(v => { items = v; emit('wardrobe:change'); }));
export const all = () => items;
const save = () => { store.set('wardrobe', items); emit('wardrobe:change'); };
export function add(it) { const o = Object.assign({ occasions: [], wears: 0, lastWorn: 0, addedAt: Date.now() }, it, { id: 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5) }); items.unshift(o); save(); return o; }
export function update(id, patch) { const i = items.find(x => x.id === id); if (i) { Object.assign(i, patch); save(); } }
export function remove(id) { items = items.filter(x => x.id !== id); save(); }
export function wear(ids) { for (const i of items) if (ids.includes(i.id)) { i.wears = (i.wears || 0) + 1; i.lastWorn = Date.now(); } save(); }
const D = (name, cat, color, hex, emoji, style, material, season, occasions) => ({ name, cat, color, hex, emoji, style, material, season, occasions });
export const DEMO = [D('Polo bleu marine', 'Polos', 'bleu marine', '#1f3a5f', '👕', 'smart casual', 'Coton', 'Toutes saisons', ['work', 'casual', 'travel']), D('Chemise bleu clair', 'Chemises', 'bleu', '#6d9bd1', '👔', 'classique', 'Lin', 'Été', ['work', 'evening']), D('T-shirt noir', 'T-shirts', 'noir', '#222222', '👕', 'casual', 'Coton', 'Toutes saisons', ['casual', 'party', 'home']), D('Débardeur de sport', 'Sportswear', 'rouge', '#e4572e', '🎽', 'sport', 'Polyester', 'Été', ['sport']), D('Pantalon beige', 'Pantalons', 'beige', '#b99b6b', '👖', 'smart casual', 'Coton', 'Toutes saisons', ['work', 'casual', 'evening']), D('Jean foncé', 'Jeans', 'bleu marine', '#2b3a55', '👖', 'casual', 'Denim', 'Toutes saisons', ['casual', 'party', 'travel']), D('Short de sport', 'Shorts', 'noir', '#2a9d8f', '🩳', 'sport', 'Polyester', 'Été', ['sport', 'beach']), D('Baskets blanches', 'Chaussures', 'blanc', '#d9dde3', '👟', 'casual', 'Cuir', 'Toutes saisons', ['casual', 'sport', 'travel', 'party']), D('Sandales', 'Chaussures', 'marron', '#a47148', '🩴', 'casual', 'Cuir', 'Été', ['beach', 'home']), D('Grand boubou indigo', 'Tenue traditionnelle', 'bleu marine', '#3b2f8f', '🥻', 'traditionnel', 'Bazin', 'Toutes saisons', ['traditional', 'wedding']), D('Babouches', 'Chaussures', 'beige', '#c8a15a', '🥿', 'traditionnel', 'Cuir', 'Toutes saisons', ['traditional', 'wedding']), D('Montre argentée', 'Accessoires', 'gris', '#7a7f87', '⌚', 'élégant', 'Acier', 'Toutes saisons', ['work', 'evening', 'wedding', 'party', 'casual'])];
export function loadDemo() { if (!items.length) DEMO.forEach(d => add(d)); }
sync.register('wardrobe', () => items, d => { if (Array.isArray(d)) { items = d; store.set('wardrobe', items); emit('wardrobe:change'); } });
load();
