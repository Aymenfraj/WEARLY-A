// Ecran du styliste IA + carte "tenue du jour" de l'accueil.
import * as W from '../wardrobe/store.js';
import * as weather from '../../services/weather.js';
import * as loc from '../../services/location.js';
import * as tele from '../../core/telemetry.js';
import * as store from '../../core/storage.js';
import { thumb } from '../wardrobe/view.js';
import { generate, SLOT_LABEL } from './engine.js';
import { ACTIVITIES, MOODS, actOf } from '../../data/activities.js';
import { screen, esc, go, toast, nav, chips, page, S, myCountry } from '../../ui/kit.js';
const st = { act: 'work', mood: 'Confiant', skip: 0, w: null, hist: [] };
store.get('outfit_history', []).then(h => { st.hist = h; });
export async function loadWeather(force) { st.w = await weather.get(myCountry(), { force }); if (['home', 'stylist'].includes(S().tab)) go(); }
const current = () => generate({ wardrobe: W.all(), weather: st.w, activity: st.act, mood: st.mood, skip: st.skip, prefs: { colors: tele.weights('color'), styles: tele.weights('style') } });
const wline = () => st.w ? `${st.w.emoji} <b>${st.w.t} °C</b> · ${esc(st.w.label)} · ${esc(st.w.place)}${st.w.source !== 'live' ? ' <span class="mu">(' + st.w.source + ')</span>' : ''}` : '⏳ Météo…';
const days = t => { const d = Math.floor((Date.now() - t) / 864e5); return d <= 0 ? 'aujourd’hui' : d === 1 ? 'hier' : 'il y a ' + d + ' j'; };
screen('stylist', () => {
  const o = current(), empty = !W.all().length;
  return page('✨ Styliste IA', `<div class="card" style="padding:10px 14px">${wline()} <span class="chip" style="float:right;font-size:11px" onclick="STY.gps()">📍 Ma position</span></div>
${chips(ACTIVITIES.map(a => [a.id, a.e + ' ' + a.n]), st.act, 'STY.act')}${chips(MOODS.map(m => [m, m]), st.mood, 'STY.mood')}
${empty ? '<div class="card" style="text-align:center"><b>Ajoute des vêtements pour commencer</b><div class="mu" style="margin:6px 0 12px">Le styliste compose tes tenues avec ta garde-robe.</div><button class="btn" onclick="WEARLY_UI.goTab(\'wardrobe\')">Ouvrir la garde-robe</button></div>' : `<div class="card"><div class="score" style="font-size:28px;font-weight:800;color:var(--gold,#e0a526)">${o.score} % COMPATIBLE</div>
${['full', 'top', 'bottom', 'outer', 'shoes', 'acc'].filter(s => o.items[s]).map(s => { const i = o.items[s]; return `<div class="sl" style="display:flex;align-items:center;gap:12px;padding:7px 0">${thumb(i)}<div><b>${esc(i.name)}</b><div class="mu">${SLOT_LABEL[s]}${i.lastWorn ? ' · porté ' + days(i.lastWorn) : ''}</div></div></div>`; }).join('')}
${o.missing.map(m => `<div class="sl" style="display:flex;align-items:center;gap:12px;padding:7px 0"><div style="width:54px;height:54px;border-radius:14px;background:var(--bd);display:grid;place-items:center;font-size:24px">❓</div><div><b>Il manque : ${m.label}</b><div class="mu">${esc(m.reason)}</div></div></div>`).join('')}
<div class="mu" style="margin:8px 0">${o.reasons.map(esc).join(' · ')}</div>
<div class="row wrap" style="gap:8px"><button class="btn o" onclick="STY.like()">👍 J’aime</button><button class="btn o" onclick="STY.change()">🔄 Changer</button><button class="btn" onclick="STY.wear()">✅ Je la porte</button></div></div>
${o.missing.length ? `<div class="card" style="border-color:var(--gold,#e0a526)"><b>Il te manque une pièce</b><div class="mu" style="margin:4px 0 10px">Compare les prix près de chez toi.</div><button class="btn g" onclick="WEARLY_UI.goTab('compare')">🛍️ Trouver en magasin</button></div>` : ''}`}
${st.hist.length ? '<h2>Dernières tenues</h2>' + st.hist.slice(0, 3).map(h => `<div class="card"><b>${esc(h.a)}</b> · ${days(h.at)}<div class="mu">${esc(h.names)}</div></div>`).join('') : ''}`);
});
const meta = o => { const i = Object.values(o.items)[0] || {}; return { color: i.color, category: i.cat, style: i.style, activity: st.act }; };
window.STY = {
  act(a) { st.act = a; st.skip = 0; go(); }, mood(m) { st.mood = m; st.skip = 0; go(); },
  like() { const o = current(); tele.track('outfit_like', meta(o)); toast('👍 Noté, je m’en souviendrai'); },
  change() { tele.track('outfit_change', meta(current())); st.skip++; go(); },
  wear() { const o = current(), its = Object.values(o.items); if (!its.length) return toast('Rien à porter'); W.wear(its.map(i => i.id)); st.hist.unshift({ a: actOf(st.act).n, at: Date.now(), names: its.map(i => i.name).join(' + ') }); st.hist = st.hist.slice(0, 20); store.set('outfit_history', st.hist); tele.track('outfit_wear', meta(o)); st.skip = 0; toast('✅ Ajouté à ton historique'); go(); },
  async gps() { try { await loc.request(); await loc.current(); await weather.useGps(true); toast('📍 Position utilisée'); loadWeather(true); } catch (e) { toast('⚠️ ' + loc.explain(e)); } }
};
export function homeCard() {
  const o = current(), names = Object.values(o.items).map(i => i.name).join(' + ');
  return `<div class="card click" onclick="WEARLY_UI.goTab('stylist')" style="background:linear-gradient(135deg,#0b7a43,#064d2a);color:#fff;border:0"><div class="row sp"><b>${wline().replace(/<[^>]+>/g, '')}</b></div><div style="margin-top:8px;font-size:13px">✨ Tenue du jour : ${W.all().length ? esc(names || 'à compléter') + ' · ' + o.score + ' %' : 'ajoute tes vêtements pour commencer'}</div></div>`;
}
