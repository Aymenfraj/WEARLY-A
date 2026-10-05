V.profile = function(){
  var st = S.stats;
  return '<div class="fade">' +
    '<div style="display:flex;flex-direction:column;align-items:center;padding:20px 0 16px">' +
      '<div class="avatar" style="width:100px;height:100px;font-size:40px;cursor:pointer" onclick="window.changePhoto()">' +
        (S.prof.photo ? '<img src="'+S.prof.photo+'" alt="">' : (S.prof.name[0] || 'A')) +
      '</div>' +
      '<div style="font-size:20px;font-weight:800;margin-top:12px">'+(S.prof.name || 'Ami(e)')+'</div>' +
      '<div class="mu">@'+S.prof.name.replace(/\s+/g,'_').toLowerCase()+' · '+S.prof.age+' ans</div>' +
    '</div>' +

    '<div class="grid">' +
      '<div class="card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--ac)">'+st.profileViews+'</div><div class="mu">Visites</div></div>' +
      '<div class="card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--ac)">'+st.videoViews+'</div><div class="mu">Vues vidéo</div></div>' +
      '<div class="card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--ac)">'+st.sharedPosts+'</div><div class="mu">Partages</div></div>' +
      '<div class="card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--gold)">'+st.giftsReceived+'</div><div class="mu">Cadeaux</div></div>' +
    '</div>' +

    '<h2>Mon compte</h2>' +
    '<div class="settings-item" onclick="window.openSettings()">' +
      '<div class="ico">⚙️</div><div class="body"><b>Paramètres</b><div class="mu">Notifications, thème, langue</div></div><span class="arrow">›</span></div>' +
    '<div class="settings-item" onclick="window.openSub(\'account\')">' +
      '<div class="ico">👤</div><div class="body"><b>Informations personnelles</b><div class="mu">Nom, email, téléphone</div></div><span class="arrow">›</span></div>' +
    '<div class="settings-item" onclick="window.openSub(\'privacy\')">' +
      '<div class="ico">🔒</div><div class="body"><b>Confidentialité</b><div class="mu">Visibilité, données</div></div><span class="arrow">›</span></div>' +
    '<div class="settings-item" onclick="window.openSub(\'legal\')">' +
      '<div class="ico">📜</div><div class="body"><b>Mentions légales</b><div class="mu">CGU, RGPD</div></div><span class="arrow">›</span></div>' +
    '<button class="btn o full" style="margin-top:14px" onclick="window.toggleTheme()">🌓 Changer de thème</button>' +
    '<button class="btn o full" style="margin-top:8px" onclick="window.resetOnb()">🔄 Réinitialiser</button>' +
  '</div>';
};

/* PRAYER */
