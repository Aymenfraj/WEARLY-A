V.rental = function(){
  var items = [
    {n:'Grand Boubou Bazin',e:'🥻',price:'5 000 FCFA'},
    {n:'Robe de mariée',e:'👰',price:'25 000 FCFA'},
    {n:'Parure bijoux',e:'💎',price:'15 000 FCFA'}
  ];
  return '<div class="fade">' +
    '<h1>♻️ Location</h1>' +
    items.map(function(it){
      return '<div class="card"><div class="row sp"><div class="row"><div style="font-size:36px">'+it.e+'</div><div><b>'+it.n+'</b></div></div>' +
      '<b style="color:var(--ac)">'+it.price+'</b></div>' +
      '<button class="btn full" style="margin-top:10px" onclick="window.toast(\'📅 Réservé\')">Réserver</button></div>';
    }).join('') +
  '</div>';
};

/* CREATORS */
