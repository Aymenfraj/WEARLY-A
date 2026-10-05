/* ============================================================
   COLD START ENGINE
   ============================================================ */
var ColdStart = {
  track: function(type, data){
    var c = S.cold;
    c.interactions++;
    switch(type){
      case 'like': c.signals.likes++; break;
      case 'save': c.signals.saves++; break;
      case 'purchase': c.signals.purchases++; break;
      case 'tap': c.signals.taps++; break;
      case 'videoLike': c.signals.videoLikes++; break;
      case 'productView':
        if(data){
          c.inferred.categories[data.cat] = (c.inferred.categories[data.cat] || 0) + 1;
          (data.colors || []).forEach(function(col){ c.inferred.colors[col] = (c.inferred.colors[col] || 0) + 1; });
          c.inferred.priceHits.push(data.price);
          var sum = 0; c.inferred.priceHits.forEach(function(p){ sum += p; });
          c.inferred.avgPrice = Math.round(sum / c.inferred.priceHits.length);
        }
        break;
    }
    var i = c.interactions;
    var old = c.phase;
    if(i >= 100) c.phase = 4;
    else if(i >= 50) c.phase = 3;
    else if(i >= 20) c.phase = 2;
    else if(i >= 5) c.phase = 1;
    if(c.phase !== old && old > 0){
      var msgs = {1:'📊 Apprentissage actif',2:'👥 Profil affiné',3:'🧠 IA hybride',4:'✨ IA personnalisée'};
      addNotif('✨', 'Nouvelle phase IA', msgs[c.phase]);
    }
  },
  recommend: function(limit, genderFilter){
    limit = limit || 10;
    var c = S.cold;
    var gender = genderFilter || S.prof.sex || 'H';
    var products = PRODUCTS.filter(function(p){ return p.gender === gender; });
    products.forEach(function(p){
      p._score = 0; p._reasons = [];
      if(S.prof.style && p.style === S.prof.style){ p._score += 30; p._reasons.push('Ton style préféré'); }
      if(S.prof.colors && S.prof.colors.length){
        var cm = p.colors.filter(function(col){ return S.prof.colors.indexOf(col) >= 0; }).length;
        if(cm > 0){ p._score += cm * 10; p._reasons.push('Ta couleur préférée'); }
      }
      if(S.prof.budget){
        var ratio = p.price / S.prof.budget;
        if(ratio >= 0.5 && ratio <= 1.5){ p._score += 20; p._reasons.push('Dans ton budget'); }
        else if(ratio > 2.5) p._score -= 25;
      }
      if(c.inferred.categories[p.cat]) p._score += Math.min(30, c.inferred.categories[p.cat] * 5);
      if(c.inferred.avgPrice > 0 && Math.abs(p.price - c.inferred.avgPrice) < 5000) p._score += 15;
      p._score += p.rating * 3;
    });
    products.sort(function(a,b){ return b._score - a._score; });
    if(c.phase === 0) products = shuffleArray(products);
    return products.slice(0, limit);
  },
  phaseLabel: function(){ return ['🎯 Apprentissage','📊 Signaux captés','👥 Profil démo','🧠 Hybride','✨ IA perso'][S.cold.phase]; },
  phaseProgress: function(){
    var i = S.cold.interactions, p = S.cold.phase;
    var start = p === 0 ? 0 : (p === 1 ? 5 : (p === 2 ? 20 : 50));
    var end = p === 0 ? 5 : (p === 1 ? 20 : (p === 2 ? 50 : 100));
    return Math.min(100, Math.round(((i - start) / (end - start)) * 100));
  }
};

function shuffleArray(arr){ var a = arr.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random()*(i+1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

