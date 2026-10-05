V.creators = function(){
  var cs = [
    {n:'Aminata Couture',e:'🧵',loc:'Médina',r:4.9},
    {n:'Sokhna Wax',e:'✂️',loc:'Plateau',r:4.8},
    {n:'Fashion Teranga',e:'✨',loc:'Almadies',r:4.9}
  ];
  return '<div class="fade">' +
    '<h1>🧵 Créateurs</h1>' +
    cs.map(function(c){
      return '<div class="card"><div class="row sp"><div class="row"><div style="font-size:36px">'+c.e+'</div>' +
      '<div><b>'+c.n+'</b><div class="mu">'+c.loc+'</div></div></div>' +
      '<b style="color:var(--gold)">⭐ '+c.r+'</b></div></div>';
    }).join('') +
  '</div>';
};

/* STUDIO */
