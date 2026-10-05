V.insights = function(){
  var c = S.cold;
  var cats = Object.keys(c.inferred.categories).sort(function(a,b){ return c.inferred.categories[b] - c.inferred.categories[a]; });
  var colors = Object.keys(c.inferred.colors).sort(function(a,b){ return c.inferred.colors[b] - c.inferred.colors[a]; });
  return '<div class="fade">' +
    '<h1>🧠 Profil IA</h1>' +
    '<div class="insight-card" style="margin-top:14px">' +
      '<div style="font-size:11px;opacity:.85;text-transform:uppercase;letter-spacing:1.2px;font-weight:800">Utilisateur</div>' +
      '<div style="font-size:20px;font-weight:900;margin-top:6px">'+S.prof.name+'</div>' +
      '<div style="font-size:12.5px;opacity:.9;margin-top:4px">'+S.prof.age+' ans · '+S.prof.country+' · Phase '+c.phase+'/4</div>' +
    '</div>' +
    '<div class="card"><div class="coldstart-phase">' +
      '<div class="coldstart-icon">'+['🎯','📊','👥','🧠','✨'][c.phase]+'</div>' +
      '<div class="coldstart-body"><b>'+ColdStart.phaseLabel()+'</b>' +
      '<div class="mu">'+c.interactions+' interactions</div></div></div>' +
      '<div class="coldstart-progress"><i style="width:'+ColdStart.phaseProgress()+'%"></i></div>' +
    '</div>' +
    '<h2>📊 Statistiques</h2>' +
    '<div class="grid">' +
      '<div class="card" style="text-align:center"><div style="font-size:22px;font-weight:900;color:var(--ac)">'+c.signals.likes+'</div><div class="mu">J\'aime</div></div>' +
      '<div class="card" style="text-align:center"><div style="font-size:22px;font-weight:900;color:var(--ac)">'+c.signals.saves+'</div><div class="mu">Sauvegardes</div></div>' +
      '<div class="card" style="text-align:center"><div style="font-size:22px;font-weight:900;color:var(--ac)">'+c.signals.videoLikes+'</div><div class="mu">Vidéos aimées</div></div>' +
      '<div class="card" style="text-align:center"><div style="font-size:22px;font-weight:900;color:var(--ac)">'+c.signals.purchases+'</div><div class="mu">Achats</div></div>' +
    '</div>' +
    (cats.length ? '<h2>🎯 Catégories détectées</h2><div class="card">' + cats.slice(0,6).map(function(cat){
      var score = c.inferred.categories[cat];
      var max = Math.max.apply(null, cats.map(function(k){ return c.inferred.categories[k]; }));
      return '<div style="margin-top:10px"><div class="row sp" style="font-size:12px"><span>'+cat.toUpperCase()+'</span><span style="color:var(--ac);font-weight:800">'+score+'</span></div>' +
        '<div style="height:6px;background:var(--bd);border-radius:99px;overflow:hidden;margin-top:4px"><div style="height:100%;width:'+Math.round((score/max)*100)+'%;background:var(--grad);border-radius:99px"></div></div></div>';
    }).join('') + '</div>' : '') +
    (colors.length ? '<h2>🎨 Couleurs aimées</h2><div class="card"><div class="row wrap" style="gap:8px">' + colors.slice(0,5).map(function(colId){
      var col = COLORS.filter(function(x){ return x.id === colId; })[0];
      if(!col) return '';
      return '<div style="display:flex;align-items:center;gap:6px;background:var(--bg2);padding:5px 10px;border-radius:99px"><span style="width:14px;height:14px;border-radius:50%;background:'+col.hex+'"></span><span style="font-size:11.5px;font-weight:700">'+col.name+'</span></div>';
    }).join('') + '</div></div>' : '') +
    (c.inferred.avgPrice > 0 ? '<div class="card"><div class="row sp"><span>Budget détecté</span><b style="color:var(--ac)">'+cfa(c.inferred.avgPrice)+'</b></div></div>' : '') +
    '<button class="btn full" style="margin-top:14px" onclick="window.simulateInteractions()">⚡ Simuler 50 interactions</button>' +
    '<button class="btn o full" style="margin-top:8px" onclick="window.resetOnb()">🔄 Réinitialiser</button>' +
  '</div>';
};

/* CALENDAR */
