// Tendances, actualites, mode du monde (Pays > Culture > Occasion).
import * as tele from '../../core/telemetry.js';
import * as http from '../../core/http.js';
import * as auth from '../../core/auth.js';
import { TRENDS, DIMS } from '../../data/trends.js';
import { fetchNews } from '../../data/news.js';
import { COUNTRIES } from '../../data/countries.js';
import { screen, esc, go, chips, page, U, myCountry } from '../../ui/kit.js';
const st = { scope: 'country', nw: 'PAYS', comm: null };
async function community() { if (!auth.loggedIn()) return; try { const r = await http.get('/api/trends?country=' + myCountry()); if (r.ok && r.data) { st.comm = r.data.trends; } } catch (e) { /* hors ligne */ } }
screen('trends', () => {
  const cc = myCountry(), C = COUNTRIES[cc]; community();
  const base = st.scope === 'country' ? TRENDS.country[cc] : st.scope === 'africa' ? TRENDS.africa : TRENDS.world;
  const me = { color: tele.top('color', 5), clothing: tele.top('category', 5), shoes: [], style: tele.top('style', 5) };
  const data = st.scope === 'me' ? me : base, comm = st.scope === 'country' && st.comm ? { color: (st.comm.color || []).map(x => x.v), clothing: (st.comm.category || []).map(x => x.v), style: (st.comm.style || []).map(x => x.v), shoes: [] } : null;
  return page('🔥 Tendances', chips([['country', C.f + ' ' + C.n], ['africa', '🌍 Afrique'], ['world', '🌐 Monde'], ['me', '🧑 Pour moi']], st.scope, 'DSC.scope') +
    DIMS.map(([k, l]) => { const a = data[k] || [], c = comm && comm[k] && comm[k].length ? comm[k] : null; return `<h2>${l}</h2><div class="row wrap">${a.map(x => `<span class="chip">${esc(x)}</span>`).join('') || '<span class="mu">Pas encore de données : utilise l’application, je t’apprends tes goûts.</span>'}</div>${c ? `<div class="mu" style="margin-top:4px">👥 Communauté : ${c.map(esc).join(', ')}</div>` : ''}`; }).join('') +
    '<div class="mu" style="margin-top:12px">Tendances de référence + statistiques anonymes des utilisateurs consentants (jamais de données individuelles).</div>');
});
let items = null;
screen('news', () => { fetchNews(st.nw, myCountry()).then(r => { items = r; const e = document.getElementById('nlist'); if (e) e.innerHTML = list(); }); return page('📰 Actualités', chips([['PAYS', '📍 Mon pays'], ['AFRIQUE', 'Afrique'], ['MONDE', 'Monde'], ['TOUT', 'Tout']], st.nw, 'DSC.nw') + `<div id="nlist">${list()}</div>`, 'Conseils et actualités de mode'); });
const list = () => (items || []).map(n => `<div class="card"><span class="chip on" style="font-size:10px">${n.scope}</span> <b>${esc(n.t)}</b><div class="mu">Source : ${esc(n.src)}</div></div>`).join('') || '<div class="card mu">Chargement…</div>';
export function countryHtml(k) {
  const C = COUNTRIES[k]; return `<div class="fade"><h1>${C.f} ${C.n}</h1>${C.tx ? `<div class="mu">${esc(C.tx)}</div>` : ''}<div class="mu" style="margin:8px 0">Pays → Culture → Occasion</div>${C.cultures.map(cu => `<div class="card"><b>${esc(cu.n)}</b>${cu.g.map(g => `<div class="sl" style="display:flex;gap:12px;align-items:center;padding:7px 0"><span style="font-size:26px">${g[2] || '👕'}</span><div><b>${esc(g[0])}</b><div class="mu">${esc(g[1])}</div></div></div>`).join('')}</div>`).join('')}
${C.modern ? `<h2>Mode moderne</h2><div class="card">${esc(C.modern)}</div>` : ''}${C.events ? `<h2>Événements</h2><div class="row wrap">${C.events.map(e => `<span class="chip">${esc(e)}</span>`).join('')}</div>` : ''}${C.tips ? `<h2>Conseils</h2>${C.tips.map(t => `<div class="card">${esc(t)}</div>`).join('')}` : ''}${C.note ? `<div class="mu">${esc(C.note)}</div>` : ''}<button class="btn full" style="margin-top:12px" onclick="WEARLY_UI.ov();WEARLY_UI.goTab('stores')">📍 Magasins près de moi</button></div>`;
}
screen('world', () => page('🌍 Mode du monde', Object.keys(COUNTRIES).map(k => { const C = COUNTRIES[k]; return `<div class="card click" onclick="DSC.country('${k}')"><div class="row sp"><b>${C.f} ${C.n}</b><span class="mu">${C.cultures.flatMap(c => c.g).slice(0, 2).map(g => g[0]).join(', ')} ›</span></div></div>`; }).join(''), 'Vêtements traditionnels, mode moderne, événements'));
window.DSC = { scope(s) { st.scope = s; tele.track('trend_scope', { scope: s }); go(); }, nw(s) { st.nw = s; go(); }, country(k) { U().ov(countryHtml(k)); } };
