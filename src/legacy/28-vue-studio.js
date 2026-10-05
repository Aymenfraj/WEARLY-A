V.studio = function(){
  return '<div class="fade">' +
    '<h1>🎵 Studio vidéo</h1>' +
    '<div style="width:100%;height:200px;border-radius:20px;background:linear-gradient(135deg,#1e1b4b,#4c1d95);display:grid;place-items:center;color:#fff;margin:14px 0">' +
      '<div style="text-align:center"><div style="font-size:60px">🎬</div><div style="margin-top:8px">Crée ta vidéo</div></div>' +
    '</div>' +
    '<h2>🎵 Musique</h2>' +
    ['Sabah El Kheir','Teranga Beat','Dakar Vibes','Sahel Sun'].map(function(m){
      return '<div class="card row click" onclick="window.toast(\'🎵 '+m+'\')"><div class="th" style="background:var(--grad)">🎵</div><div style="flex:1"><b>'+m+'</b><div class="mu">Libre de droits</div></div></div>';
    }).join('') +
    '<button class="btn g full" style="margin-top:14px" onclick="window.toast(\'📤 Vidéo publiée\')">📤 Publier</button>' +
  '</div>';
};

/* AR */
