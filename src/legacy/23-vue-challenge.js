V.challenge = function(){
  return '<div class="fade">' +
    '<h1>🎯 Défi de la semaine</h1>' +
    '<div style="background:linear-gradient(135deg,#e0a526,#c88a1a);color:#0a0e1a;border-radius:22px;padding:20px;margin:14px 0;text-align:center">' +
      '<div style="font-size:56px;margin:10px 0">💛</div>' +
      '<h3 style="color:#0a0e1a;font-size:17px;margin-bottom:6px">Défi Jaune</h3>' +
      '<p style="font-size:13px;margin-bottom:14px">Porte une tenue jaune cette semaine</p>' +
      '<div style="background:rgba(0,0,0,.15);padding:8px 14px;border-radius:12px;font-size:12px;font-weight:800">🏆 Prix : Badge Or</div>' +
    '</div>' +
    '<button class="btn g full" onclick="window.participerChallenge()">📸 Participer</button>' +
    '<h2>🏆 Classement</h2>' +
    (S.challengeEntries.length ? S.challengeEntries.map(function(e, i){
      return '<div class="card row sp"><div class="row"><span style="font-size:20px">'+(i === 0 ? '🥇' : i === 1 ? '🥈' : '⭐')+'</span><b>'+e.name+'</b></div><span class="mu">'+e.likes+' ❤️</span></div>';
    }).join('') : '<div class="empty"><span class="empty-icon">🎯</span>Soyez la première !</div>') +
  '</div>';
};

/* MYSTERY */
