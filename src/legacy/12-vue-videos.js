V.videos = function(){
  var videos = VIDEOS.slice();
  if(S.cold.phase >= 2){
    var topCats = Object.keys(S.cold.inferred.categories).sort(function(a,b){ return S.cold.inferred.categories[b] - S.cold.inferred.categories[a]; }).slice(0, 3);
    if(topCats.length) videos.sort(function(a,b){
      var aS = a.tags.filter(function(t){ return topCats.indexOf(t) >= 0; }).length;
      var bS = b.tags.filter(function(t){ return topCats.indexOf(t) >= 0; }).length;
      return bS - aS;
    });
  }
  return '<div id="videoFeed">' + videos.map(function(v){
    return '<div class="tiktok-video" style="background-image:url(\''+v.poster+'\')" onclick="window.trackVideoView('+v.id+',\''+v.tags.join(',')+'\')">' +
      '<div class="tiktok-side">' +
        '<div onclick="event.stopPropagation();window.trackVideoLike('+v.id+',\''+v.tags.join(',')+'\')">' +
          '<div style="font-size:30px">'+(S.likedProducts.indexOf('v'+v.id) >= 0 ? '❤️' : '🤍')+'</div>' +
          '<div>'+(v.likes/1000).toFixed(1)+'k</div>' +
        '</div>' +
        '<div style="font-size:30px">💬</div>' +
        '<div style="font-size:30px">↗️</div>' +
      '</div>' +
      '<div class="tiktok-bottom">' +
        '<div class="user">@'+v.user.replace(/\s+/g,'')+'</div>' +
        '<div class="desc">'+v.desc+'</div>' +
        '<div class="music">🎵 Teranga Beat</div>' +
        (v.productId ? '<button class="product-btn" onclick="event.stopPropagation();window.viewProduct('+v.productId+')">🛍️ Voir le produit</button>' : '') +
      '</div>' +
    '</div>';
  }).join('') + '</div>';
};

/* SHOP */
