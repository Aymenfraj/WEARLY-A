/* ============================================================
   SETTINGS
   ============================================================ */
function openSettings(){
  ov('<h1>⚙️ Paramètres</h1>' +
    '<div class="settings-item" onclick="window.openSub(\'notifications\')"><div class="ico">🔔</div><div class="body"><b>Notifications</b><div class="mu">Alertes push</div></div><span class="arrow">›</span></div>' +
    '<div class="settings-item" onclick="window.openSub(\'appearance\')"><div class="ico">🎨</div><div class="body"><b>Apparence</b><div class="mu">Thème clair/sombre</div></div><span class="arrow">›</span></div>' +
    '<div class="settings-item" onclick="window.openSub(\'language\')"><div class="ico">🌍</div><div class="body"><b>Langue</b><div class="mu">'+LANGUAGES.filter(function(l){return l.code === S.settings.language;})[0].name+'</div></div><span class="arrow">›</span></div>' +
    '<h3 style="margin-top:20px">Compte</h3>' +
    '<div class="settings-item" onclick="window.openSub(\'account\')"><div class="ico">👤</div><div class="body"><b>Informations personnelles</b><div class="mu">Nom, email, téléphone</div></div><span class="arrow">›</span></div>' +
    '<div class="settings-item" onclick="window.openSub(\'privacy\')"><div class="ico">🔒</div><div class="body"><b>Confidentialité</b><div class="mu">Visibilité, données</div></div><span class="arrow">›</span></div>' +
    '<div class="settings-item" onclick="window.openSub(\'legal\')"><div class="ico">📜</div><div class="body"><b>Mentions légales</b><div class="mu">CGU, RGPD</div></div><span class="arrow">›</span></div>' +
    '<div class="settings-item" onclick="window.openSub(\'support\')"><div class="ico">💬</div><div class="body"><b>Assistance</b><div class="mu">Aide et support</div></div><span class="arrow">›</span></div>');
}

function openSub(t){
  if(t === 'account'){
    ov('<h1>👤 Informations</h1>' +
      '<div style="margin-top:14px">' +
        '<label style="font-size:12px;font-weight:800;color:var(--mu);display:block;margin-bottom:6px">NOM</label>' +
        '<input id="sName" value="'+(S.prof.name||'')+'" style="width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--bd);background:var(--card);color:var(--tx);font-size:14px;outline:none;margin-bottom:12px;font-family:inherit">' +
        '<label style="font-size:12px;font-weight:800;color:var(--mu);display:block;margin-bottom:6px">EMAIL</label>' +
        '<input id="sEmail" type="email" value="'+(S.prof.email||'')+'" style="width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--bd);background:var(--card);color:var(--tx);font-size:14px;outline:none;margin-bottom:12px;font-family:inherit">' +
        '<label style="font-size:12px;font-weight:800;color:var(--mu);display:block;margin-bottom:6px">ADRESSE</label>' +
        '<input id="sAddr" value="'+(S.prof.address||'')+'" style="width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--bd);background:var(--card);color:var(--tx);font-size:14px;outline:none;margin-bottom:14px;font-family:inherit">' +
        '<button class="btn full" onclick="window.saveAccount()">💾 Enregistrer</button>' +
      '</div>');
  }
  else if(t === 'notifications'){
    var nt = S.settings.notifications;
    ov('<h1>🔔 Notifications</h1>' +
      Object.keys(nt).map(function(k){
        return '<div class="settings-item"><div class="ico">'+({prayers:'🕌',events:'🎉',trends:'📈',orders:'📦',messages:'💬',friends:'👥'}[k])+'</div>' +
        '<div class="body"><b>'+k.charAt(0).toUpperCase()+k.slice(1)+'</b></div>' +
        '<div class="sw '+(nt[k]?'on':'')+'" onclick="window.toggleNotif(\''+k+'\')"></div></div>';
      }).join(''));
  }
  else if(t === 'appearance'){
    ov('<h1>🎨 Apparence</h1>' +
      '<div class="settings-item" onclick="window.toggleTheme();window.ov();window.openSub(\'appearance\')">' +
      '<div class="ico">'+(document.documentElement.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️')+'</div>' +
      '<div class="body"><b>Thème '+(document.documentElement.getAttribute('data-theme') === 'dark' ? 'Sombre' : 'Clair')+'</b>' +
      '<div class="mu">Appuyer pour changer</div></div></div>');
  }
  else if(t === 'language'){
    ov('<h1>🌍 Langue</h1>' + LANGUAGES.map(function(l){
      return '<div class="settings-item" onclick="window.setLang(\''+l.code+'\')">' +
        '<div class="ico">'+l.flag+'</div><div class="body"><b>'+l.name+'</b></div>' +
        (l.code === S.settings.language ? '<span style="color:var(--ac);font-size:20px">✓</span>' : '') + '</div>';
    }).join(''));
  }
  else if(t === 'privacy'){
    var p = S.settings.privacy;
    ov('<h1>🔒 Confidentialité</h1>' +
      '<div class="settings-item"><div class="ico">👁️</div><div class="body"><b>Profil public</b></div><div class="sw '+(p.publicProfile?'on':'')+'" onclick="window.togglePrivacy(\'publicProfile\')"></div></div>' +
      '<div class="settings-item"><div class="ico">📍</div><div class="body"><b>Localisation</b></div><div class="sw '+(p.showLocation?'on':'')+'" onclick="window.togglePrivacy(\'showLocation\')"></div></div>' +
      '<div class="settings-item"><div class="ico">📊</div><div class="body"><b>Statistiques</b></div><div class="sw '+(p.showStats?'on':'')+'" onclick="window.togglePrivacy(\'showStats\')"></div></div>' +
      '<div class="settings-item"><div class="ico">👗</div><div class="body"><b>Dressing visible</b></div><div class="sw '+(p.showDressing?'on':'')+'" onclick="window.togglePrivacy(\'showDressing\')"></div></div>');
  }
  else if(t === 'legal'){
    ov('<h1>📜 Mentions légales</h1>' +
      '<div class="card"><b>WEARLY SARL</b><div class="mu" style="margin-top:6px;line-height:1.7">Dakar, Sénégal<br>RCCM : SN-DKR-2026-B-XXXX<br>© 2026 WEARLY</div></div>' +
      '<div class="settings-item"><div class="ico">📄</div><div class="body"><b>CGU</b><div class="mu">Version 2.1</div></div><span class="arrow">›</span></div>' +
      '<div class="settings-item"><div class="ico">🔒</div><div class="body"><b>Politique de confidentialité</b><div class="mu">RGPD</div></div><span class="arrow">›</span></div>');
  }
  else if(t === 'support'){
    ov('<h1>💬 Assistance</h1>' +
      '<div class="settings-item"><div class="ico">💬</div><div class="body"><b>Chat en direct</b></div></div>' +
      '<div class="settings-item"><div class="ico">📞</div><div class="body"><b>+221 33 800 00 00</b></div></div>' +
      '<div class="settings-item"><div class="ico">📧</div><div class="body"><b>support@wearly.sn</b></div></div>');
  }
}

