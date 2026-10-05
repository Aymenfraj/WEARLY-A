// Messagerie facon WhatsApp : conversations, ticks (envoye / recu / lu), "ecrit...", hors ligne, temps reel.
import * as store from '../core/storage.js';
import * as net from '../core/network.js';
import * as http from '../core/http.js';
import * as auth from '../core/auth.js';
import * as rt from '../core/realtime.js';
import * as notif from '../services/notifications.js';
import { CONFIG } from '../core/config.js';
import { on } from '../core/events.js';
const U = window.WEARLY_UI, V = U.V;
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const DEMO = [{ id: 'demo:fatou', name: 'Fatou Diop' }, { id: 'demo:moussa', name: 'Moussa Ndiaye' }, { id: 'demo:awa', name: 'Awa Sow' }];
const REPLIES = ['Salaam ! 😊', 'Ok, je regarde ça.', 'Super idée, merci !', 'On se voit demain ?', 'Tu peux me prêter ton boubou ? 👘'];
let C = {}, since = 0, open = null, typing = {}, lastTy = 0;
const key = () => 'chat_' + (auth.current() ? auth.current().id : 'demo');
const live = () => auth.loggedIn();
const isDemo = id => String(id).startsWith('demo:');
const save = () => { store.set(key(), C); store.set(key() + '_since', since); };
async function load() { C = await store.get(key(), {}); since = await store.get(key() + '_since', 0); refresh(); }
function conv(id, name) { return C[id] || (C[id] = { peer: { id, name: name || id }, msgs: [], unread: 0 }); }
function add(id, name, m) { const c = conv(id, name), i = c.msgs.findIndex(x => x.id === m.id); if (i >= 0) Object.assign(c.msgs[i], m); else { c.msgs.push(m); c.msgs.sort((a, b) => a.at - b.at); } return c; }
function refresh() {
  const t = U.S.tab; if (t !== 'msg' && t !== 'chat') return;
  const i = document.getElementById('cin'), v = i ? i.value : '', had = i && document.activeElement === i;
  U.go(); const n = document.getElementById('cin'); if (n) { n.value = v; if (had) n.focus(); }
}
async function send(id, text) {
  text = text.trim(); if (!text) return;
  const m = { id: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), me: true, text, at: Date.now(), st: 'sending' };
  add(id, null, m); save(); refresh();
  if (isDemo(id)) return demoFlow(id, m);
  try { const r = await http.post('/api/messages', { id: m.id, to: id, text }, { queue: true }); if (r.ok && !r.queued && r.data) { m.st = r.data.st || 'sent'; m.at = r.data.at || m.at; } } catch (e) { /* reste en attente */ }
  save(); refresh();
}
function demoFlow(id, m) {
  const set = (st, ms) => setTimeout(() => { m.st = st; save(); refresh(); }, ms);
  set('sent', 400); set('delivered', 900); set('read', 1500);
  setTimeout(() => { typing[id] = Date.now(); refresh(); }, 1600);
  setTimeout(() => { const c = add(id, null, { id: 'r' + Date.now(), me: false, text: REPLIES[(Math.random() * REPLIES.length) | 0], at: Date.now(), st: 'read' }); if (!(open === id && U.S.tab === 'chat')) c.unread++; save(); refresh(); }, 3000);
}
function markRead(id) { const c = C[id]; if (!c) return; c.unread = 0; save(); if (!isDemo(id) && live()) http.post('/api/messages/read', { from: id }).catch(() => { }); }
async function catchup() {
  if (!live() || !net.isOnline()) return;
  try {
    const r = await http.get('/api/messages?since=' + since); if (!r.ok || !r.data) return; const me = auth.current().id;
    for (const m of r.data.messages) {
      const mine = m.from === me, pid = mine ? m.to : m.from, isNew = !(C[pid] && C[pid].msgs.some(x => x.id === m.id));
      const c = add(pid, mine ? m.tn : m.fn, { id: m.id, me: mine, text: m.text, at: m.at, st: m.st });
      if (!mine && isNew && !(open === pid && U.S.tab === 'chat')) c.unread++;
      since = Math.max(since, m.at, m.upd || 0);
    }
    save(); refresh();
  } catch (e) { /* on reessaiera */ }
}
on('rt:message', m => { const c = add(m.from, m.fn, { id: m.id, me: false, text: m.text, at: m.at, st: 'read' }); if (open === m.from && U.S.tab === 'chat') markRead(m.from); else { c.unread++; if (document.hidden) notif.notify(m.fn || 'Nouveau message', m.text); } since = Math.max(since, m.at); save(); refresh(); });
on('rt:receipt', r => { const ids = r.ids || [r.id]; for (const c of Object.values(C)) for (const m of c.msgs) if (m.me && ids.includes(m.id)) m.st = r.st; save(); refresh(); });
on('rt:typing', t => { typing[t.from] = Date.now(); refresh(); setTimeout(refresh, 3100); });
on('rt:status', s => { if (s === 'on') catchup(); refresh(); });
on('outbox:change', () => setTimeout(catchup, 800));
on('auth:change', load);
setInterval(catchup, 20000);
load();
const tick = st => ({ sending: '🕓', sent: '✓', delivered: '✓✓' }[st] || '<span style="color:#53bdeb">✓✓</span>');
const hm = t => new Date(t).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
const avatar = n => `<div style="width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#0b7a43,#e0a526);display:grid;place-items:center;color:#fff;font-weight:800;flex:none">${esc((n || '?')[0].toUpperCase())}</div>`;
V.msg = () => {
  const list = Object.values(C).filter(c => c.msgs.length).sort((a, b) => b.msgs[b.msgs.length - 1].at - a.msgs[a.msgs.length - 1].at);
  const st = live() ? (rt.status() === 'on' ? '🟢 Connecté au serveur' : '🟡 Connexion au serveur…') : '🟠 Mode démo : connecte-toi dans « Mon compte & serveur »';
  return `<div class="fade"><h1>💬 Messagerie</h1><div class="mu" style="margin:4px 0 10px">${st}${net.isOnline() ? '' : ' · 🔴 Hors ligne'}</div>
${live() ? `<input id="csr" placeholder="🔎 Chercher une personne (nom ou email)" oninput="CHT.find(this.value)" style="width:100%;padding:12px;border-radius:14px;border:1px solid var(--bd);background:var(--card);color:var(--tx)"><div id="cres"></div>` : ''}
${list.map(c => { const l = c.msgs[c.msgs.length - 1]; return `<div class="card click" onclick="CHT.open('${esc(c.peer.id)}')"><div class="row">${avatar(c.peer.name)}<div style="flex:1;min-width:0"><div class="row sp"><b>${esc(c.peer.name)}</b><span class="mu" style="font-size:11px">${hm(l.at)}</span></div><div class="row sp"><span class="mu" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px">${l.me ? tick(l.st) + ' ' : ''}${esc(l.text)}</span>${c.unread ? `<span style="background:#25d366;color:#fff;border-radius:99px;padding:1px 8px;font-size:11px;font-weight:800">${c.unread}</span>` : ''}</div></div></div></div>`; }).join('') || '<div class="card mu">Aucune conversation pour l’instant.</div>'}
${live() ? '' : '<h2>Contacts de démonstration</h2>' + DEMO.map(d => `<div class="card click" onclick="CHT.open('${d.id}','${d.name}')"><div class="row">${avatar(d.name)}<b>${d.name}</b></div></div>`).join('')}</div>`;
};
V.chat = () => {
  const id = open, c = C[id]; if (!c) return V.msg(); const ty = typing[id] && Date.now() - typing[id] < 3000;
  setTimeout(() => { const l = document.getElementById('cmsgs'); if (l) l.scrollTop = l.scrollHeight; }, 0);
  return `<div class="fade" style="display:flex;flex-direction:column;height:calc(100vh - 190px)"><div class="row" style="gap:10px;margin-bottom:8px"><button class="btn o sm" onclick="CHT.back()">‹</button>${avatar(c.peer.name)}<div><b>${esc(c.peer.name)}</b><div class="mu" style="font-size:12px">${ty ? '<span style="color:#25d366">écrit…</span>' : isDemo(id) ? 'démo' : 'messagerie WEARLY'}</div></div></div>
<div id="cmsgs" style="flex:1;overflow-y:auto;padding:6px 2px">${c.msgs.map(m => `<div style="display:flex;justify-content:${m.me ? 'flex-end' : 'flex-start'};margin:4px 0"><div style="max-width:78%;padding:8px 12px;border-radius:14px;${m.me ? 'background:#005c4b;color:#fff;border-bottom-right-radius:4px' : 'background:var(--card);border:1px solid var(--bd);border-bottom-left-radius:4px'}">${esc(m.text)}<div style="font-size:10px;opacity:.75;text-align:right;margin-top:2px">${hm(m.at)} ${m.me ? tick(m.st) : ''}</div></div></div>`).join('')}</div>
<div class="row" style="gap:8px;margin-top:8px"><input id="cin" placeholder="Écrire un message" onkeydown="if(event.key==='Enter')CHT.send()" oninput="CHT.typing()" style="flex:1;padding:12px;border-radius:99px;border:1px solid var(--bd);background:var(--card);color:var(--tx)"><button class="btn" style="border-radius:50%;width:46px;height:46px" onclick="CHT.send()">➤</button></div></div>`;
};
window.CHT = {
  open(id, name) { open = id; conv(id, name); markRead(id); U.goTab('chat'); },
  back() { open = null; U.goTab('msg'); },
  send() { const i = document.getElementById('cin'); if (!i || !i.value.trim()) return; const v = i.value; i.value = ''; send(open, v); },
  typing() { if (!live() || isDemo(open) || Date.now() - lastTy < 2000) return; lastTy = Date.now(); http.post('/api/typing', { to: open }).catch(() => { }); },
  async find(q) { const el = document.getElementById('cres'); if (!el) return; if (q.trim().length < 2) { el.innerHTML = ''; return; } try { const r = await http.get('/api/users?q=' + encodeURIComponent(q.trim())); el.innerHTML = ((r.data && r.data.users) || []).map(u => `<div class="card click" onclick="CHT.open('${u.id}','${esc(u.name)}')"><div class="row">${avatar(u.name)}<b>${esc(u.name)}</b><span class="mu" style="margin-left:auto">Écrire ›</span></div></div>`).join('') || '<div class="mu">Aucun résultat</div>'; } catch (e) { el.innerHTML = '<div class="mu">⚠️ Recherche impossible (hors ligne ?)</div>'; } }
};
