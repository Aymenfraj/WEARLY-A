// Point d'entree : demarre les modules et les relie a l'interface.
import * as events from './core/events.js';
import { loadConfig } from './core/config.js';
import * as net from './core/network.js';
import * as http from './core/http.js';
import * as auth from './core/auth.js';
import * as sync from './core/sync.js';
import * as rt from './core/realtime.js';
import * as video from './features/video.js';
import * as notif from './services/notifications.js';
import * as tele from './core/telemetry.js';
import { plugin, isNative } from './core/platform.js';
import './features/screens.js';
import './features/account.js';
import './features/sync-docs.js';
import './features/chat.js';
import './features/index.js';
window.WEARLY = { tele, emit: events.emit, on: events.on, net, http, auth, sync, rt, video, notif };
(async () => {
  try { await net.init(); } catch (e) { console.warn(e); }
  await loadConfig();
  const bar = document.createElement('div'); bar.id = 'netbar'; document.body.appendChild(bar);
  const upd = () => { bar.className = net.isOnline() ? '' : 'show'; bar.textContent = '📡 Hors ligne : tes actions seront envoyées au retour du réseau'; };
  events.on('net:change', upd); upd();
  events.on('sync:pulled', () => window.WEARLY_UI.go());
  await auth.restore(); rt.connect(); video.sync();
  events.on('loan:out', async ({ req, item }) => {   // rappel de retour : la veille a 9h
    const at = new Date(req.to + 'T09:00:00'); at.setDate(at.getDate() - 1);
    if (at > new Date() && (await notif.request()) === 'granted') notif.notify('⏰ Retour demain', (item ? item.n : 'Article') + ' doit être rendu demain', at);
  });
  const A = plugin('App');
  if (A && isNative()) A.addListener('backButton', () => { const U = window.WEARLY_UI; if (U.S.tab === 'chat') U.goTab('msg'); else if (U.S.tab !== 'home') U.goTab('home'); else A.exitApp(); });
})();
