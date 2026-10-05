// Confidentialite : consentements, donnees collectees, export et suppression.
import * as tele from '../../core/telemetry.js';
import * as auth from '../../core/auth.js';
import { screen, go, toast, page } from '../../ui/kit.js';
let sum = null;
tele.summary().then(s => { sum = s; });
const sw = (on, js, t, d) => `<div class="card"><div class="row sp"><div style="flex:1"><b>${t}</b><div class="mu">${d}</div></div><div onclick="${js}" style="width:46px;height:26px;border-radius:99px;background:${on ? 'var(--ac,#0b7a43)' : 'var(--bd)'};position:relative;flex:none"><div style="position:absolute;top:3px;left:${on ? 23 : 3}px;width:20px;height:20px;border-radius:50%;background:#fff"></div></div></div></div>`;
screen('privacy', () => { tele.summary().then(s => { sum = s; }); const c = tele.consent();
  return page('🔒 Confidentialité', sw(c.ai, `PRV.toggle('ai',${!c.ai})`, '🤖 Reconnaissance par IA', 'Envoie la photo d’un vêtement à ton serveur puis à un service d’IA, uniquement quand tu scannes. Elle n’est pas conservée.') + sw(c.analytics, `PRV.toggle('analytics',${!c.analytics})`, '📊 Statistiques anonymes', 'Partage tes goûts (couleurs, catégories) pour améliorer WEARLY et les tendances. Jamais tes messages ni tes photos.') +
    `<div class="card"><b>Sur cet appareil</b><div class="mu">${sum ? sum.events + ' interactions · couleurs préférées : ' + (sum.colors.join(', ') || '—') + ' · catégories : ' + (sum.categories.join(', ') || '—') : '…'}</div><div class="mu" style="margin-top:6px">L’apprentissage local améliore le styliste même sans partage.</div></div>
<button class="btn r full" onclick="PRV.erase()">🗑️ Supprimer mes données d’apprentissage</button><div class="mu" style="margin-top:8px">Collecté : écrans visités, J’aime / Changer sur les tenues, ajouts à la garde-robe, produits consultés. Non collecté : contenu des messages, photos, position précise.</div>`);
});
window.PRV = { async toggle(k, v) { await tele.setConsent(k, v); toast(v ? 'Activé' : 'Désactivé'); go(); }, async erase() { await tele.eraseLocal(); const ok = await tele.eraseServer(); toast(ok ? '✅ Supprimé (appareil et serveur)' : '✅ Supprimé sur l’appareil'); sum = null; go(); } };
