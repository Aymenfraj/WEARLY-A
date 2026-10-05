V.mystery = function(){
  return '<div class="fade">' +
    '<h1>🎭 Styliste mystère</h1>' +
    '<div style="background:linear-gradient(135deg,#1e1b4b,#4c1d95);color:#fff;border-radius:22px;padding:22px;margin:14px 0;text-align:center">' +
      '<div style="width:80px;height:80px;border-radius:50%;background:var(--grad);display:grid;place-items:center;font-size:40px;margin:10px auto;border:3px solid rgba(255,255,255,.3)">'+(S.mystery.revealed ? '🌟' : '❓')+'</div>' +
      '<h3 style="color:#fff;margin-bottom:6px">'+(S.mystery.revealed ? 'Aïcha révélée !' : 'Styliste mystère')+'</h3>' +
      '<p style="font-size:12.5px;opacity:.9">'+(S.mystery.revealed ? 'Merci !' : 'Vote pour ta tenue préférée')+'</p>' +
    '</div>' +
    (!S.mystery.revealed ? '<div class="row" style="gap:8px">' + [1,2,3].map(function(n){
      return '<div class="card click" style="flex:1;text-align:center;padding:14px 8px" onclick="window.voteMystery('+n+')">' +
        '<div style="font-size:32px">'+['👗','🥻','👘'][n-1]+'</div><b style="font-size:11px;display:block;margin-top:6px">Tenue '+n+'</b></div>';
    }).join('') + '</div>' : '') +
  '</div>';
};

/* COFFRET */
