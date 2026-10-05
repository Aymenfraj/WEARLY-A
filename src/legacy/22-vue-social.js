V.social = function(){
  return '<div class="fade">' +
    '<h1>🎉 Événements</h1>' +
    '<button class="btn full" style="margin-top:14px" onclick="window.openAddEvent()">+ Créer un événement</button>' +
    (S.socialEvents.length ? '<h2>Mes événements</h2>' + S.socialEvents.map(function(ev, i){
      var d = new Date(ev.date);
      return '<div class="card"><div class="row sp"><div><b style="font-size:14px">'+ev.icon+' '+ev.name+'</b>' +
        '<div class="mu" style="margin-top:4px">'+(ev.desc || '')+'</div>' +
        '<div class="mu" style="margin-top:4px">📅 '+d.getDate()+' '+monthName(d.getMonth())+'</div></div>' +
        '<button class="btn r sm" onclick="window.deleteEvent('+i+')">🗑️</button></div></div>';
    }).join('') : '<div class="empty"><span class="empty-icon">🎉</span>Crée ton premier événement</div>') +
  '</div>';
};

/* CHALLENGE */
