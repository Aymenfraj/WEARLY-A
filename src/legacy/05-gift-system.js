/* ============================================================
   GIFT SYSTEM
   ============================================================ */
var GiftSystem = {
  offer: function(productId, giftType){
    var product = PRODUCTS.filter(function(p){ return p.id === productId; })[0];
    var type = GIFT_TYPES.filter(function(t){ return t.id === giftType; })[0];
    if(!product || !type) return 0;
    var bonus = Math.round(type.points * (1 + product.price / 100000));
    S.gift.points += bonus;
    S.gift.totalSent++;
    S.gift.history.unshift({id:Date.now(), productId:productId, productName:product.n, productEmoji:product.e, typeEmoji:type.emoji, typeName:type.name, points:bonus, time:now()});
    if(S.gift.totalSent === 1 && S.gift.badges.indexOf('first_gift') < 0){ S.gift.badges.push('first_gift'); S.gift.points += 10; addNotif('🎁','Premier cadeau !','+10 points bonus'); }
    if(S.gift.totalSent === 10 && S.gift.badges.indexOf('generous') < 0){ S.gift.badges.push('generous'); addNotif('💝','Généreux !','Badge débloqué'); }
    if(S.gift.totalSent === 50 && S.gift.badges.indexOf('santa') < 0){ S.gift.badges.push('santa'); addNotif('🎅','Père Noël','Badge débloqué !'); }
    addNotif(type.emoji, 'Cadeau envoyé !', product.n + ' → ' + type.name);
    confetti();
    return bonus;
  }
};

