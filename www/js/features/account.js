// Ecran "Mon compte & serveur" : adresse du serveur, inscription / connexion, sauvegarde.
import * as auth from '../core/auth.js';
import * as sync from '../core/sync.js';
import * as http from '../core/http.js';
import { CONFIG, setApiBase } from '../core/config.js';
const U = window.WEARLY_UI, V = U.V;
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const inp = 'width:100%;padding:12px;border-radius:12px;border:1px solid var(--bd);background:var(--card);color:var(--tx);margin-top:10px';
let mode = 'login', f = { name: '', email: '', password: '' }, srv = '';
V.compte = () => {
  const u = auth.current(), t = sync.lastSync();
  return `<div class="fade"><h1>☁️ Mon compte & serveur</h1>
<div class="card"><b>🌐 Serveur</b><div class="mu" style="margin:4px 0">${CONFIG.API_BASE ? esc(CONFIG.API_BASE) : 'Non configuré (mode démo)'}</div>
<input style="${inp}" placeholder="https://mon-serveur.onrender.com" value="${esc(CONFIG.API_BASE)}" oninput="ACC.url(this.value)">
<div class="row" style="gap:8px;margin-top:10px"><button class="btn sm" onclick="ACC.save()">Enregistrer</button><button class="btn o sm" onclick="ACC.test()">Tester</button></div><div class="mu" id="srvres" style="margin-top:6px">${esc(srv)}</div></div>
${u ? `<div class="card"><b>👤 ${esc(u.name)}</b><div class="mu">${esc(u.email)}</div><div class="mu" style="margin-top:6px">${t ? '✅ Dernière synchro : ' + new Date(t).toLocaleTimeString('fr-FR') : 'Synchronisation en attente…'}</div><div class="row" style="gap:8px;margin-top:10px"><button class="btn sm" onclick="ACC.sync()">Synchroniser</button><button class="btn o sm" onclick="ACC.out()">Se déconnecter</button></div></div>
<div class="mu">Ton profil et ton vestiaire sont sauvegardés sur le serveur : tu les retrouves sur un autre téléphone.</div>`
    : `<div class="card"><div class="row wrap"><span class="chip ${mode === 'login' ? 'on' : ''}" onclick="ACC.mode('login')">Se connecter</span><span class="chip ${mode === 'register' ? 'on' : ''}" onclick="ACC.mode('register')">Créer un compte</span></div>
${mode === 'register' ? `<input style="${inp}" placeholder="Nom" value="${esc(f.name)}" oninput="ACC.set('name',this.value)">` : ''}
<input style="${inp}" placeholder="Email" type="email" value="${esc(f.email)}" oninput="ACC.set('email',this.value)">
<input style="${inp}" placeholder="Mot de passe (6 caractères min.)" type="password" value="${esc(f.password)}" oninput="ACC.set('password',this.value)">
<button class="btn full" style="margin-top:12px" onclick="ACC.submit()">${mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</button></div>`}</div>`;
};
window.ACC = {
  url(v) { window.__srv = v; }, mode(m) { mode = m; U.go(); }, set(k, v) { f[k] = v; },
  async save() { await setApiBase(window.__srv != null ? window.__srv : CONFIG.API_BASE); srv = 'Enregistré.'; await auth.restore(); U.go(); },
  async test() { srv = '⏳ Test…'; U.go(); const t = performance.now(); try { const r = await http.get('/api/health'); srv = r.mock ? '⚠️ Adresse manquante' : r.ok ? '✅ Serveur OK (' + Math.round(performance.now() - t) + ' ms)' : '⚠️ Réponse ' + r.status; } catch (e) { srv = '⚠️ Injoignable : ' + (e.message || 'erreur'); } U.go(); },
  async submit() { try { const user = await auth[mode]({ ...f, country: U.S.prof.country }); f.password = ''; U.toast('✅ Bienvenue ' + user.name); } catch (e) { U.toast('⚠️ ' + e.message); } U.go(); },
  async sync() { try { await sync.pull(); await sync.push(); U.toast('✅ Synchronisé'); } catch (e) { U.toast('⚠️ ' + e.message); } U.go(); },
  async out() { await auth.logout(); U.toast('Déconnecté'); U.go(); }
};
