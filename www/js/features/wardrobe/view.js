// Garde-robe : grille, ajout par photo avec reconnaissance IA, modification.
import * as W from './store.js';
import * as vision from '../../services/vision.js';
import * as tele from '../../core/telemetry.js';
import { screen, esc, go, toast, chips, page, input, U } from '../../ui/kit.js';
const CATS = ['T-shirts', 'Chemises', 'Polos', 'Pantalons', 'Jeans', 'Shorts', 'Vestes', 'Chaussures', 'Sportswear', 'Tenue traditionnelle', 'Accessoires'];
const OCC = [['work', 'Travail'], ['casual', 'Sortie'], ['sport', 'Sport'], ['party', 'Fête'], ['evening', 'Soirée'], ['wedding', 'Mariage'], ['traditional', 'Traditionnel'], ['travel', 'Voyage'], ['beach', 'Plage'], ['home', 'Maison']];
const SEASONS = ['Été', 'Hiver', 'Mi-saison', 'Toutes saisons'];
let cat = 'Tout', draft = null;
export const thumb = (i, s = 54) => `<div style="width:${s}px;height:${s}px;border-radius:14px;flex:none;display:grid;place-items:center;font-size:${s / 2}px;color:#fff;background:${i.photo ? `url(${i.photo}) center/cover` : i.hex || '#555'}">${i.photo ? '' : i.emoji || '👕'}</div>`;
screen('wardrobe', () => {
  const all = W.all(), list = all.filter(i => cat === 'Tout' || i.cat === cat);
  return page('👕 Garde-robe', `<div class="row" style="gap:8px;margin:8px 0"><button class="btn" onclick="WDR.scan(true)">📷 Photo</button><button class="btn o" onclick="WDR.scan(false)">🖼️ Galerie</button></div>
${chips([['Tout', 'Tout (' + all.length + ')']].concat([...new Set(all.map(i => i.cat))].map(c => [c, c])), cat, 'WDR.cat')}
${all.length ? `<div class="grid">${list.map(i => `<div class="card click" style="text-align:center;padding:10px" onclick="WDR.open('${i.id}')"><div style="display:flex;justify-content:center">${thumb(i, 84)}</div><b style="font-size:13px;display:block;margin-top:6px">${esc(i.name)}</b><div class="mu" style="font-size:11px">${esc(i.color)} · ${esc(i.cat)}</div></div>`).join('')}</div>`
      : '<div class="card" style="text-align:center"><div style="font-size:42px">👗</div><b>Ta garde-robe est vide</b><div class="mu" style="margin:6px 0 12px">Prends un vêtement en photo : l’IA le reconnaît.</div><button class="btn o" onclick="WDR.demo()">Charger une garde-robe de démonstration</button></div>'}`, 'Tes vêtements, reconnus par photo et utilisés par le styliste');
});
function form() {
  const d = draft; if (!d) return '';
  return `<div style="display:flex;gap:12px;align-items:center">${thumb(d, 90)}<div><b>${d.source === 'ia' ? '🤖 Reconnu par l’IA' : '🎨 Couleur détectée'}</b><div class="mu" style="font-size:12px">${esc(d.note || 'Vérifie et corrige si besoin')}</div></div></div>
<input style="${input}" placeholder="Nom" value="${esc(d.name)}" oninput="WDR.set('name',this.value)">
<select style="${input}" onchange="WDR.set('cat',this.value)"><option value="">Catégorie…</option>${CATS.map(c => `<option ${c === d.cat ? 'selected' : ''}>${c}</option>`).join('')}</select>
<input style="${input}" placeholder="Couleur" value="${esc(d.color)}" oninput="WDR.set('color',this.value)"><input style="${input}" placeholder="Style" value="${esc(d.style)}" oninput="WDR.set('style',this.value)"><input style="${input}" placeholder="Matière" value="${esc(d.material)}" oninput="WDR.set('material',this.value)">
<select style="${input}" onchange="WDR.set('season',this.value)">${SEASONS.map(c => `<option ${c === d.season ? 'selected' : ''}>${c}</option>`).join('')}</select>
<div class="mu" style="margin-top:10px">Occasions</div><div class="row wrap" style="margin:6px 0">${OCC.map(([k, l]) => `<span class="chip ${d.occasions.includes(k) ? 'on' : ''}" onclick="WDR.occ('${k}')">${l}</span>`).join('')}</div>`;
}
function pickFile(capture) { return new Promise(res => { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; if (capture) i.setAttribute('capture', 'environment'); i.onchange = () => res(i.files[0] || null); i.click(); }); }
function editor() { U().ov(`<div class="fade"><h1>Nouveau vêtement</h1>${form()}<button class="btn full" style="margin-top:12px" onclick="WDR.save()">Enregistrer</button></div>`); }
window.WDR = {
  cat(c) { cat = c; go(); },
  demo() { W.loadDemo(); go(); },
  async scan(capture) {
    const f = await pickFile(capture); if (!f) return;
    if (!tele.consent().ai && !tele.consent().aiAsked) { await tele.setConsent('aiAsked', true); U().ov(`<div class="fade"><h1>🤖 Analyse par IA</h1><div class="card">Pour reconnaître le vêtement, la photo est envoyée à ton serveur WEARLY, qui la transmet à un service d’IA. <b>Elle n’est pas conservée.</b> Tu peux refuser : la couleur sera alors détectée sur ton téléphone seulement.</div><button class="btn full" onclick="WDR.ai(true)">Autoriser l’IA</button><button class="btn o full" style="margin-top:8px" onclick="WDR.ai(false)">Non, détection locale</button></div>`); window.__file = f; return; }
    this.run(f);
  },
  async ai(v) { await tele.setConsent('ai', v); this.run(window.__file); },
  async run(f) {
    U().ov('<div class="fade"><h1>🔍 Analyse en cours…</h1><div class="card mu">Reconnaissance du vêtement</div></div>');
    try { const r = await vision.analyze(f, { cloud: tele.consent().ai }); if (r.error) { U().ov(); toast('⚠️ ' + r.error); return; } draft = Object.assign({}, r, { cat: r.category || '', photo: r.thumb, occasions: (r.occasions || []).slice() }); editor(); } catch (e) { U().ov(); toast('⚠️ ' + e.message); }
  },
  set(k, v) { draft[k] = v; }, occ(k) { const a = draft.occasions, i = a.indexOf(k); if (i < 0) a.push(k); else a.splice(i, 1); editor(); },
  save() { if (!draft.cat) return toast('Choisis une catégorie'); const { name, cat: c, color, hex, style, material, season, occasions, thumb: photo, source } = draft; W.add({ name: name || 'Vêtement', cat: c, color, hex, style, material, season, occasions, photo }); tele.track('wardrobe_add', { color, category: c, style, source }); draft = null; U().ov(); toast('✅ Ajouté à ta garde-robe'); go(); },
  open(id) { const i = W.all().find(x => x.id === id); if (!i) return; U().ov(`<div class="fade"><div style="display:flex;justify-content:center">${thumb(i, 140)}</div><h1 style="text-align:center">${esc(i.name)}</h1><div class="card">${[['Catégorie', i.cat], ['Couleur', i.color], ['Style', i.style], ['Matière', i.material], ['Saison', i.season], ['Occasions', (i.occasions || []).join(', ')], ['Porté', (i.wears || 0) + ' fois']].map(r => `<div class="row sp sl"><span class="mu">${r[0]}</span><b>${esc(r[1] || '-')}</b></div>`).join('')}</div><button class="btn r full" onclick="WDR.del('${i.id}')">Supprimer</button></div>`); },
  del(id) { W.remove(id); U().ov(); go(); }
};
