V.home = function(){
  var recos = ColdStart.recommend(6);
  var w = H < 12 ? 'Salaam aleykum' : (H < 18 ? 'Bonjour' : 'Bonsoir');
  var prog = ColdStart.phaseProgress();
  return '<div class="fade">' +
    '<h1>'+w+' '+S.prof.name+' 👋</h1>' +
    '<div class="mu">'+(S.prof.sex === 'F' ? '👩 Femme' : '👨 Homme')+' · '+S.prof.age+' ans · '+S.prof.country+'</div>' +

    '<div class="coldstart-box" style="margin-top:14px">' +
      '<div class="coldstart-phase">' +
        '<div class="coldstart-icon">'+['🎯','📊','👥','🧠','✨'][S.cold.phase]+'</div>' +
        '<div class="coldstart-body"><b>'+ColdStart.phaseLabel()+'</b>' +
        '<div class="mu">'+(S.cold.phase === 0 ? 'On découvre tes goûts' : S.cold.phase === 1 ? 'On apprend en observant' : S.cold.phase === 2 ? 'On utilise des profils similaires' : S.cold.phase === 3 ? 'On combine tous les signaux' : 'Ton IA est totalement active')+'</div></div>' +
      '</div>' +
      '<div class="coldstart-progress"><i style="width:'+prog+'%"></i></div>' +
      '<div class="coldstart-stats">' +
        '<div class="coldstart-stat"><div class="num">'+S.cold.interactions+'</div><div class="lbl">Interactions</div></div>' +
        '<div class="coldstart-stat"><div class="num">'+Object.keys(S.cold.inferred.categories).length+'</div><div class="lbl">Catégories</div></div>' +
        '<div class="coldstart-stat"><div class="num">'+Math.round(prog)+'%</div><div class="lbl">Phase</div></div>' +
      '</div>' +
    '</div>' +

    '<div class="points-banner" onclick="window.goTab(\'gifts\')">' +
      '<div class="ico">🎁</div>' +
      '<div style="flex:1"><div class="val">'+S.gift.points+' pts</div>' +
      '<div class="lbl">'+S.gift.totalSent+' cadeaux envoyés</div></div>' +
      '<div style="font-size:24px;opacity:.7">›</div>' +
    '</div>' +

    '<h2>✨ Recommandé pour toi</h2>' +
    '<div class="grid">' + recos.map(productCardHtml).join('') + '</div>' +

    '<button class="btn full" style="margin-top:14px" onclick="window.goTab(\'shop\')">🛍️ Voir les 60 produits</button>' +
    '<button class="btn o full" style="margin-top:8px" onclick="window.goTab(\'insights\')">🧠 Voir mon profil IA</button>' +
  '</div>';
};

/* VIDEOS */
