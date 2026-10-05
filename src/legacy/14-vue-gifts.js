V.gifts = function(){
  return '<div class="fade">' +
    '<h1>🎁 Cadeaux & Points</h1>' +
    '<div style="background:var(--grad-gold);color:#0a0e1a;border-radius:22px;padding:24px;text-align:center;margin:14px 0;box-shadow:0 8px 32px rgba(224,165,38,.4)">' +
      '<div style="font-size:14px;font-weight:800;opacity:.8;text-transform:uppercase;letter-spacing:1px">Tes points</div>' +
      '<div style="font-size:56px;font-weight:900;letter-spacing:-2px;line-height:1;margin:8px 0">'+S.gift.points+'</div>' +
      '<div style="font-size:13px;font-weight:800;opacity:.75">'+S.gift.totalSent+' cadeaux envoyés</div>' +
    '</div>' +
    '<div class="grid3">' +
      '<div class="card" style="text-align:center;padding:12px 6px"><div style="font-size:20px;font-weight:900;color:var(--ac)">'+S.gift.totalSent+'</div><div class="mu" style="font-size:10px">Envoyés</div></div>' +
      '<div class="card" style="text-align:center;padding:12px 6px"><div style="font-size:20px;font-weight:900;color:var(--gold)">'+S.gift.points+'</div><div class="mu" style="font-size:10px">Points</div></div>' +
      '<div class="card" style="text-align:center;padding:12px 6px"><div style="font-size:20px;font-weight:900;color:var(--green)">'+S.gift.badges.length+'</div><div class="mu" style="font-size:10px">Badges</div></div>' +
    '</div>' +
    '<h2>💡 Gagne des points</h2>' +
    '<div class="card">' + GIFT_TYPES.map(function(t){
      return '<div class="sl"><div style="font-size:28px">'+t.emoji+'</div><div style="flex:1"><b style="font-size:13px">'+t.name+'</b><div class="mu">'+t.desc+'</div></div><div style="background:var(--grad-gold);color:#0a0e1a;padding:4px 10px;border-radius:99px;font-size:11px;font-weight:900">+'+t.points+'</div></div>';
    }).join('') + '</div>' +
    (S.gift.badges.length ? '<h2>🏆 Mes badges</h2><div class="card"><div style="display:flex;flex-wrap:wrap;gap:8px">' + S.gift.badges.map(function(b){
      var map = {first_gift:['🎁','Premier'],generous:['💝','Généreux'],santa:['🎅','Père Noël']};
      var bd = map[b] || ['⭐','Badge'];
      return '<div style="background:var(--bg2);border-radius:12px;padding:8px 12px;font-size:11.5px;font-weight:700">'+bd[0]+' '+bd[1]+'</div>';
    }).join('') + '</div></div>' : '') +
    '<h2>📜 Historique</h2>' +
    (S.gift.history.length ? S.gift.history.slice(0, 20).map(function(h){
      return '<div class="card row" style="padding:12px">' +
        '<div class="th" style="width:44px;height:44px;font-size:22px;background:var(--grad)">'+h.typeEmoji+'</div>' +
        '<div style="flex:1"><b style="font-size:13px">'+h.typeName+'</b><div class="mu">'+h.productEmoji+' '+h.productName+'</div></div>' +
        '<div style="text-align:right"><div style="color:var(--gold);font-size:14px;font-weight:900">+'+h.points+'</div><div class="mu" style="font-size:10px">'+h.time+'</div></div>' +
      '</div>';
    }).join('') : '<div class="empty"><span class="empty-icon">🎁</span>Aucun cadeau envoyé<br><div style="margin-top:8px;font-size:12px">Ouvre un produit et clique sur 🎁</div></div>') +
  '</div>';
};

/* INSIGHTS */
