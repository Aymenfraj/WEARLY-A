V.library = function(){
  var tabs = ['J\'aime','Gardés','Historique','Sons'];
  var c = S.libraryTab || 0;
  var content = '';
  if(c === 0) content = S.likedProducts.length ? S.likedProducts.map(function(id){
    var p = PRODUCTS.filter(function(x){ return x.id === id; })[0];
    if(!p) return '';
    return '<div class="card row"><div class="th">' + imgTag(p.img, p.h, p.e) + '</div><div style="flex:1"><b style="font-size:13px">'+p.n+'</b><div class="mu">'+cfa(p.price)+'</div></div></div>';
  }).join('') : '<div class="empty"><span class="empty-icon">❤️</span>Aucun favori</div>';
  else if(c === 1) content = S.savedProducts.length ? S.savedProducts.map(function(id){
    var p = PRODUCTS.filter(function(x){ return x.id === id; })[0];
    if(!p) return '';
    return '<div class="card row"><div class="th">' + imgTag(p.img, p.h, p.e) + '</div><div style="flex:1"><b style="font-size:13px">'+p.n+'</b><div class="mu">'+cfa(p.price)+'</div></div></div>';
  }).join('') : '<div class="empty"><span class="empty-icon">🔖</span>Aucune sauvegarde</div>';
  else content = '<div class="empty"><span class="empty-icon">📚</span>Vide</div>';

  return '<div class="fade">' +
    '<h1>📚 Ma bibliothèque</h1>' +
    '<div class="mu" style="margin-top:4px">'+S.likedProducts.length+' aimés · '+S.savedProducts.length+' gardés</div>' +
    '<div class="scroll" style="margin-top:14px">' + tabs.map(function(t, i){
      return '<div class="chip '+(c === i ? 'on' : '')+'" onclick="window.setLibTab('+i+')">'+t+'</div>';
    }).join('') + '</div>' +
    content + '</div>';
};

/* MESSAGES */
