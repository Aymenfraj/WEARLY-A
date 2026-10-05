// Magasins a proximite (distance, ouvert/ferme), comparateur de prix, recommandations utiles, commandes.
import * as W from '../wardrobe/store.js';
import * as cat from './catalog.js';
import * as geo from './geo.js';
import * as loc from '../../services/location.js';
import * as weather from '../../services/weather.js';
import * as tele from '../../core/telemetry.js';
import * as store from '../../core/storage.js';
import * as http from '../../core/http.js';
import * as auth from '../../core/auth.js';
import * as sync from '../../core/sync.js';
import { COUNTRIES } from '../../data/countries.js';
import { screen, esc, go, toast, chips, page, input, money, U, myCountry } from '../../ui/kit.js';
const st = { f: 'open', q: '', c: 'Tout', pos: null, orders: [] };
store.get('orders', []).then(o => { st.orders = o; });
sync.register('orders', () => st.orders, d => { if (Array.isArray(d)) { st.orders = d; store.set('orders', d); } });
async function remote() { if (!auth.loggedIn()) return; try { const r = await http.get('/api/stores?country=' + myCountry()); if (r.ok && r.data) cat.setRemote(r.data.stores); } catch (e) { /* hors ligne */ } }
const where = () => { const c = myCountry(); return st.pos || COUNTRIES[c].ll; };
function map(list) {
  const pts = list.map(s => s.ll).concat([where()]), la = pts.map(p => p[0]), lo = pts.map(p => p[1]), a = Math.min(...la), b = Math.max(...la), c = Math.min(...lo), d = Math.max(...lo), X = v => 8 + (d === c ? .5 : (v - c) / (d - c)) * 84, Y = v => 92 - (b === a ? .5 : (v - a) / (b - a)) * 84;
  return `<svg viewBox="0 0 100 100" style="width:100%;height:150px;border-radius:16px;background:linear-gradient(135deg,#cfe8d5,#f3e3b8);margin-bottom:10px">${list.map(s => `<circle cx="${X(s.ll[1])}" cy="${Y(s.ll[0])}" r="3" fill="#d62828"/>`).join('')}<circle cx="${X(where()[1])}" cy="${Y(where()[0])}" r="3.5" fill="#1d6fe0" stroke="#fff" stroke-width="1"/></svg>`;
}
screen('stores', () => {
  remote(); const cc = myCountry(), C = COUNTRIES[cc];
  let list = cat.stores(cc).map(s => Object.assign({}, s, { km: geo.dist(where(), s.ll), open: geo.openNow(s, C.tz) }));
  if (st.f === 'open') list = list.filter(s => s.open); else if (st.f === '5') list = list.filter(s => s.km <= 5); else if (st.f !== 'all') list = list.filter(s => (s.cats || []).includes(st.f));
  list.sort((a, b) => a.km - b.km);
  return page('📍 Magasins à proximité', `<div class="row" style="gap:8px;margin-bottom:6px"><span class="mu" style="flex:1">${st.pos ? '📍 Ta position' : '🏙️ Centre de ' + esc(C.city)}</span><button class="btn sm" onclick="MKT.gps()">📍 Ma position</button></div>${map(list)}
${chips([['open', 'Ouvert'], ['5', '< 5 km'], ['all', 'Tous'], ['Chaussures', 'Chaussures'], ['Tenue traditionnelle', 'Traditionnel'], ['Chemises', 'Vêtements']], st.f, 'MKT.filter')}
${list.map(s => `<div class="card click" onclick="MKT.store('${s.id}')"><div class="row sp"><b>${esc(s.n)}</b><span class="chip ${s.open ? 'on' : ''}" style="font-size:10px">${s.open ? 'OUVERT' : 'FERMÉ'}</span></div><div class="mu">${esc(s.city)} · ${s.km.toFixed(1)} km · ⭐ ${s.rating} · ${s.hr[0]}h-${s.hr[1]}h</div></div>`).join('') || '<div class="card mu">Aucune boutique avec ce filtre.</div>'}
<div class="mu">Boutiques et horaires de démonstration. En production : horaires donnés par les vendeurs ou une API de cartes.</div>`);
});
screen('compare', () => {
  remote(); const cc = myCountry(), all = cat.products(cc), wd = W.all();
  const withV = all.map(p => ({ p, v: cat.valueFor(p, wd) })), cats = ['Tout'].concat([...new Set(all.map(p => p.cat))]);
  const rec = withV.slice().sort((a, b) => b.v.score - a.v.score).slice(0, 3), list = withV.filter(x => (st.c === 'Tout' || x.p.cat === st.c) && x.p.n.toLowerCase().includes(st.q.toLowerCase()));
  const row = ({ p, v }) => { const o = cat.offers(p, cc, st.pos)[0]; return `<div class="card click" onclick="MKT.product('${p.id}')"><div class="row"><div style="width:58px;height:58px;border-radius:14px;background:${p.hex};display:grid;place-items:center;font-size:30px">${p.e}</div><div style="flex:1"><b>${esc(p.n)}</b><div class="mu">${o ? 'dès ' + money(o.eur, cc) + ' · ' + esc(o.s.n) : 'Indisponible ici'}</div><div class="mu">Valeur pour toi : <b>${v.score}/100</b></div></div></div></div>`; };
  return page('⚖️ Comparateur & recos', `<h2 style="margin-top:6px">✨ Recommandé pour ta garde-robe</h2>${rec.map(row).join('')}<input style="${input}" placeholder="🔎 Chercher un produit" value="${esc(st.q)}" oninput="MKT.search(this.value)">${chips(cats.map(c => [c, c]), st.c, 'MKT.cat')}<div id="plist">${list.map(row).join('')}</div>`, 'Prix, distance et note : choisis la meilleure offre');
});
screen('orders', () => page('🧾 Mes commandes', st.orders.map(o => `<div class="card"><div class="row sp"><b>${esc(o.n)}</b><span class="chip on" style="font-size:10px">${o.s}</span></div><div class="mu">${esc(o.store)} · ${o.d}<br>Total : <b>${esc(o.total)}</b></div><button class="btn o sm" style="margin-top:6px" onclick="MKT.next('${o.id}')">Démo : statut suivant</button></div>`).join('') || '<div class="card mu">Aucune commande pour l’instant.</div>', 'Commandes de démonstration : aucun paiement réel'));
const STEPS = ['En attente', 'Confirmée', 'En préparation', 'Expédiée', 'Livrée'];
window.MKT = {
  filter(f) { st.f = f; tele.track('store_filter', { scope: f }); go(); }, cat(c) { st.c = c; go(); },
  search(v) { st.q = v; const cc = myCountry(), wd = W.all(), e = document.getElementById('plist'); if (e) { e.outerHTML = '<div id="plist"></div>'; } go(); },
  async gps() { try { await loc.request(); const p = await loc.current(); st.pos = [p.lat, p.lon]; await weather.useGps(true); toast('📍 Position utilisée'); go(); } catch (e) { toast('⚠️ ' + loc.explain(e)); } },
  store(id) { const cc = myCountry(), s = cat.stores(cc).find(x => x.id === id); if (!s) return; const C = COUNTRIES[cc], open = geo.openNow(s, C.tz), ps = cat.products(cc).filter(p => cat.offers(p, cc, st.pos).some(o => o.s.id === id));
    U().ov(`<div class="fade"><h1>${esc(s.n)}</h1><div class="card"><span class="chip ${open ? 'on' : ''}">${open ? 'OUVERT' : 'FERMÉ'}</span> ${s.hr[0]}h-${s.hr[1]}h · ⭐ ${s.rating}<br><span class="mu">${esc(s.city)} · ${geo.dist(where(), s.ll).toFixed(1)} km</span><div class="row" style="gap:8px;margin-top:10px">${s.ph ? `<a class="btn sm" href="tel:${esc(s.ph)}" style="text-decoration:none">📞 Appeler</a>` : ''}<a class="btn o sm" href="https://www.google.com/maps/dir/?api=1&destination=${s.ll[0]},${s.ll[1]}" target="_blank" style="text-decoration:none">🧭 Itinéraire</a></div></div><h2>Produits</h2>${ps.map(p => `<div class="card click" onclick="MKT.product('${p.id}')"><b>${p.e} ${esc(p.n)}</b></div>`).join('') || '<div class="mu">Aucun produit listé.</div>'}</div>`); },
  product(id) { const cc = myCountry(), p = cat.products(cc).find(x => x.id === id); if (!p) return; const v = cat.valueFor(p, W.all()), os = cat.offers(p, cc, st.pos);
    tele.track('product_view', { color: p.color, category: p.cat, style: p.style });
    U().ov(`<div class="fade"><div style="font-size:70px;text-align:center">${p.e}</div><h1>${esc(p.n)}</h1><div class="card"><div class="row sp"><b>VALEUR POUR TOI</b><b style="color:var(--gold,#e0a526);font-size:22px">${v.score}/100</b></div><div class="mu">${esc(v.why)}</div></div><h2>Comparer les boutiques</h2>
${os.map((o, i) => `<div class="card"><div class="row sp"><b>${esc(o.s.n)}</b><b>${money(o.eur, cc)}</b></div><div class="mu">${o.km.toFixed(1)} km · ⭐ ${o.s.rating} · ${o.open ? 'Ouvert' : 'Fermé'} · ${o.stock > 0 ? 'Stock : ' + o.stock : 'Rupture'} · Livraison ${o.delivery ? money(o.delivery, cc) : 'offerte'}</div>${o.tags.map(t => `<span class="chip on" style="font-size:10px">${t}</span> `).join('')}${o.stock > 0 ? `<div style="margin-top:8px"><button class="btn sm" onclick="MKT.order('${p.id}',${i})">Commander (démo)</button></div>` : ''}</div>`).join('') || '<div class="card mu">Aucune boutique de ton pays ne le propose.</div>'}</div>`); },
  order(pid, i) { const cc = myCountry(), p = cat.products(cc).find(x => x.id === pid), o = cat.offers(p, cc, st.pos)[i]; if (!o) return; st.orders.unshift({ id: 'o' + Date.now(), n: p.n, store: o.s.n, d: new Date().toLocaleDateString('fr-FR'), s: STEPS[0], total: money(o.eur + o.delivery, cc), step: 0 }); store.set('orders', st.orders); tele.track('order', { color: p.color, category: p.cat, style: p.style }); U().ov(); toast('✅ Commande enregistrée (démo)'); U().goTab('orders'); },
  next(id) { const o = st.orders.find(x => x.id === id); if (o && o.step < 4) { o.step++; o.s = STEPS[o.step]; store.set('orders', st.orders); } go(); }
};
