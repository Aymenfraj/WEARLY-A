V.shop = function(){
  var cats = [
    {id:'all', label:'Tout', emoji:'🌍'},
    {id:'wax', label:'Wax', emoji:'👗'},
    {id:'bazin', label:'Bazin', emoji:'👘'},
    {id:'trad', label:'Traditionnel', emoji:'🥻'},
    {id:'classic', label:'Classique', emoji:'👔'},
    {id:'sport', label:'Sport', emoji:'🎽'},
    {id:'casual', label:'Casual', emoji:'👕'},
    {id:'perfume', label:'Parfums', emoji:'🌸'},
    {id:'cosmetic', label:'Cosmétiques', emoji:'💄'},
    {id:'accessory', label:'Accessoires', emoji:'💎'}
  ];
  var filter = S.filterCat || 'all';
  var g = S.shopGender || S.prof.sex || 'H';
  var list = PRODUCTS.filter(function(p){ return (filter === 'all' || p.cat === filter) && p.gender === g; });
  var menCount = PRODUCTS.filter(function(p){ return p.gender === 'H'; }).length;
  var womenCount = PRODUCTS.filter(function(p){ return p.gender === 'F'; }).length;

  return '<div class="fade">' +
    '<h1>🛍️ Boutique</h1>' +
    '<div class="mu" style="margin-top:4px">60 produits · '+menCount+' H · '+womenCount+' F</div>' +
    '<div style="display:flex;gap:8px;margin-top:14px;margin-bottom:12px">' +
      '<button class="btn '+(g === 'H' ? '' : 'o')+'" style="flex:1" onclick="window.setShopGender(\'H\')">👨 Hommes ('+menCount+')</button>' +
      '<button class="btn '+(g === 'F' ? '' : 'o')+'" style="flex:1" onclick="window.setShopGender(\'F\')">👩 Femmes ('+womenCount+')</button>' +
    '</div>' +
    '<div class="scroll">' + cats.map(function(c){ return '<div class="chip '+(filter === c.id ? 'on' : '')+'" onclick="window.setShopCat(\''+c.id+'\')">'+c.emoji+' '+c.label+'</div>'; }).join('') + '</div>' +
    (list.length ? '<div class="grid" style="margin-top:14px">' + list.map(productCardHtml).join('') + '</div>' : '<div class="empty"><span class="empty-icon">🔍</span>Aucun produit</div>') +
  '</div>';
};

/* GIFTS */
