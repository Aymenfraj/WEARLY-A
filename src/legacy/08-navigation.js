/* ============================================================
   NAVIGATION
   ============================================================ */
function go(){
  var view = V[S.tab] ? V[S.tab]() : V.home();
  $('#main').innerHTML = view;
  $('#main').className = S.tab === 'videos' ? 'no-pad' : '';

  var navHtml =
    '<div class="nav-btn '+(S.tab === 'home' ? 'on' : '')+'" onclick="window.goTab(\'home\')"><span>🏠</span>Accueil</div>' +
    '<div class="nav-btn '+(S.tab === 'videos' ? 'on' : '')+'" onclick="window.goTab(\'videos\')"><span>🎬</span>Vidéos</div>' +
    '<div class="nav-btn '+(S.tab === 'shop' ? 'on' : '')+'" onclick="window.goTab(\'shop\')"><span>🛍️</span>Shop</div>' +
    '<div class="nav-btn '+(S.tab === 'gifts' ? 'on' : '')+'" onclick="window.goTab(\'gifts\')"><span>🎁</span>Cadeaux</div>' +
    '<div class="nav-btn '+(S.tab === 'profile' ? 'on' : '')+'" onclick="window.goTab(\'profile\')"><span>👤</span>Moi</div>';
  $('#nav').innerHTML = navHtml;

  renderDrawer();
  updateNotifCount();
}

function goTab(t){ S.tab = t; var m = $('#main'); if(m) m.scrollTop = 0; go(); }
function openDrawer(){ $('#drawer').classList.add('open'); $('#drawer-overlay').classList.add('open'); }
function closeDrawer(){ $('#drawer').classList.remove('open'); $('#drawer-overlay').classList.remove('open'); }

function renderDrawer(){
  var reqBadge = S.friendRequests.length ? '<span class="drawer-badge">'+S.friendRequests.length+'</span>' : '';
  var html = '<div class="drawer-head"><h2>✨ WEARLY</h2><div class="mu">Le styliste de ta culture</div></div>' +
    '<div class="drawer-user" onclick="window.closeDrawer();window.goTab(\'profile\')">' +
      '<div class="avatar-lg">'+(S.prof.name[0] || 'A')+'</div>' +
      '<div><b style="font-size:14px">'+(S.prof.name || 'Ami(e)')+'</b>' +
      '<div class="mu">'+S.gift.points+' points · '+S.cold.interactions+' interactions</div></div>' +
    '</div>' +
    '<div class="drawer-section"><h4>Général</h4>' +
      '<div class="drawer-item" data-nav="home"><span class="ico">🏠</span> Accueil</div>' +
      '<div class="drawer-item" data-nav="videos"><span class="ico">🎬</span> Vidéos</div>' +
      '<div class="drawer-item" data-nav="shop"><span class="ico">🛍️</span> Boutique (60)</div>' +
      '<div class="drawer-item" data-nav="gifts"><span class="ico">🎁</span> Cadeaux <span class="drawer-badge">'+S.gift.points+'</span></div>' +
      '<div class="drawer-item" data-nav="library"><span class="ico">📚</span> Ma bibliothèque</div>' +
      '<div class="drawer-item" data-nav="friends"><span class="ico">👥</span> Amis'+reqBadge+'</div>' +
      '<div class="drawer-item" data-nav="msg"><span class="ico">💬</span> Messages</div>' +
      '<div class="drawer-item" data-nav="profile"><span class="ico">👤</span> Mon compte</div>' +
    '</div>' +
    '<div class="drawer-section"><h4>Culture & Foi</h4>' +
      '<div class="drawer-item" data-nav="calendar"><span class="ico">📅</span> Calendrier</div>' +
      '<div class="drawer-item" data-nav="prayer"><span class="ico">🕌</span> Mode Prière</div>' +
      '<div class="drawer-item" data-nav="social"><span class="ico">🎉</span> Mes événements</div>' +
    '</div>' +
    '<div class="drawer-section"><h4>Communauté</h4>' +
      '<div class="drawer-item" data-nav="challenge"><span class="ico">🎯</span> Défi de la semaine</div>' +
      '<div class="drawer-item" data-nav="mystery"><span class="ico">🎭</span> Styliste mystère</div>' +
    '</div>' +
    '<div class="drawer-section"><h4>Shopping</h4>' +
      '<div class="drawer-item" data-nav="coffret"><span class="ico">📦</span> Coffret surprise</div>' +
'<div class="drawer-item" data-nav="rental"><span class="ico">♻️</span> Location</div>' +
      '<div class="drawer-item" data-nav="creators"><span class="ico">🧵</span> Créateurs</div>' +
    '</div>' +
    '<div class="drawer-section"><h4>Innovation</h4>' +
      '<div class="drawer-item" data-nav="studio"><span class="ico">🎵</span> Studio vidéo</div>' +
      '<div class="drawer-item" data-nav="ar"><span class="ico">🪞</span> Essayage AR</div>' +
      '<div class="drawer-item" data-nav="voice"><span class="ico">🎤</span> Styliste vocal</div>' +
      '<div class="drawer-item" data-nav="journal"><span class="ico">📸</span> Journal de style</div>' +
    '</div>' +
    '<div class="drawer-section"><h4>Intelligence</h4>' +
      '<div class="drawer-item" data-nav="insights"><span class="ico">🧠</span> Profil IA</div>' +
      '<div class="drawer-item" onclick="window.openSettings()"><span class="ico">⚙️</span> Paramètres</div>' +
    '</div>' +
    (window.WEARLY_MENU ? window.WEARLY_MENU() : '') +
    '<div class="drawer-section"><h4>Développement</h4>' +
      '<div class="drawer-item" onclick="window.simulateInteractions()"><span class="ico">⚡</span> Simuler +50 interactions</div>' +
      '<div class="drawer-item" onclick="window.resetOnb()"><span class="ico">🔄</span> Réinitialiser</div>' +
    '</div>';
  $('#drawer').innerHTML = html;

  $$('.drawer-item[data-nav]').forEach(function(item){
    item.addEventListener('click', function(){
      closeDrawer();
      S.tab = item.dataset.nav;
      setTimeout(go, 200);
    });
  });
}

