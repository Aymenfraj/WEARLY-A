V.prayer = function(){
  var nowMin = H*60 + new Date().getMinutes();
  var P = [{n:'Fajr',t:'05:30',e:'🌅'},{n:'Dhuhr',t:'13:15',e:'☀️'},{n:'Asr',t:'16:45',e:'🌤️'},{n:'Maghrib',t:'19:15',e:'🌆'},{n:'Isha',t:'20:30',e:'🌙'}];
  var next = P[0];
  for(var i=0;i<P.length;i++){ var pH = parseInt(P[i].t.split(':')[0]); if(pH*60 + 15 > nowMin){ next = P[i]; break; } }
  return '<div class="fade">' +
    '<h1>🕌 Mode Prière</h1>' +
    '<div style="background:linear-gradient(135deg,#0b7a43,#052e1a);color:#fff;border-radius:22px;padding:22px;margin:14px 0">' +
      '<div style="font-size:14px;font-weight:700;opacity:.95">'+next.e+' Prochaine : '+next.n+'</div>' +
      '<div style="font-size:44px;font-weight:900;letter-spacing:-2px;margin:8px 0">'+next.t+'</div>' +
    '</div>' +
    '<h2>🕐 Horaires</h2>' +
    P.map(function(p){
      var isPast = (parseInt(p.t.split(':')[0])*60 + parseInt(p.t.split(':')[1])) < nowMin;
      return '<div class="card row sp" style="'+(isPast ? 'opacity:.5' : '')+'">' +
        '<div class="row"><span style="font-size:22px">'+p.e+'</span><b>'+p.n+'</b></div>' +
        '<b style="color:var(--ac)">'+p.t+'</b></div>';
    }).join('') +
  '</div>';
};

/* SOCIAL */
