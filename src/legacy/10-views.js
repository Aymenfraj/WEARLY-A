/* ============================================================
   VIEWS
   ============================================================ */
var V = {};

function productCardHtml(p){
  return '<div class="product-card'+(p.isPerfume ? ' perfume' : '')+'" onclick="window.viewProduct('+p.id+')">' +
    '<div class="img" style="background:'+p.h+'">' + imgTag(p.img, p.h, p.e) +
      '<div class="gender">'+(p.gender === 'H' ? '👨' : '👩')+'</div>' +
      (p.price > 40000 ? '<div class="badge">PREMIUM</div>' : '') +
      '<div class="offer-btn" onclick="event.stopPropagation();window.openGift('+p.id+')">🎁</div>' +
    '</div>' +
    '<div class="info"><b>'+p.n+'</b><div class="price">'+cfa(p.price)+'</div><div class="rating">⭐ '+p.rating+'</div></div>' +
  '</div>';
}

/* HOME */
