/* ============================================================
   ACTIONS
   ============================================================ */
function viewProduct(id){
  var p = PRODUCTS.filter(function(x){ return x.id === id; })[0];
  if(!p) return;
  ColdStart.track('productView', p);
  ColdStart.track('tap');
  ov('<div style="width:100%;height:300px;border-radius:22px;overflow:hidden;margin-bottom:14px;background:'+p.h+'">' +
    imgTag(p.img, p.h, '<div style="display:grid;place-items:center;height:100%;font-size:140px">'+p.e+'</div>') + '</div>' +
    '<h1>'+p.n+'</h1>' +
    '<div class="mu" style="margin-top:6px">⭐ '+p.rating+' · '+(p.gender === 'H' ? '👨' : '👩')+' · '+p.cat.toUpperCase()+'</div>' +
    '<div style="font-size:26px;font-weight:900;color:var(--ac);margin-top:12px">'+cfa(p.price)+'</div>' +
    '<div style="margin-top:14px;padding:12px;background:linear-gradient(135deg,rgba(16,185,129,.1),rgba(59,130,246,.1));border-radius:14px">' +
      '<div style="font-size:11px;font-weight:800;color:var(--mu);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">🎯 Pertinence</div>' +
      '<div style="font-size:13.5px;font-weight:700">'+(p._score ? Math.round(p._score) : 50)+'% compatibilité</div>' +
      (p._reasons && p._reasons.length ? '<div class="mu" style="margin-top:6px">💡 '+p._reasons.join(' · ')+'</div>' : '') +
    '</div>' +
    '<div style="display:flex;flex-direction:column;gap:8px;margin-top:14px">' +
      '<button class="btn g full" style="padding:16px;font-size:14px" onclick="window.openGift('+p.id+')">🎁 OFFRIR CE PRODUIT</button>' +
      '<button class="btn full" onclick="window.toggleLike('+p.id+')">'+(S.likedProducts.indexOf(p.id) >= 0 ? '❤️ Aimé' : '🤍 Aimer')+'</button>' +
      '<button class="btn o full" onclick="window.toggleSave('+p.id+')">'+(S.savedProducts.indexOf(p.id) >= 0 ? '🔖 Sauvegardé' : '📌 Sauvegarder')+'</button>' +
    '</div>');
}

function openGift(productId){
  var p = PRODUCTS.filter(function(x){ return x.id === productId; })[0];
  if(!p) return;
  ov('<div style="text-align:center;margin-bottom:20px">' +
    '<div class="th" style="width:80px;height:80px;font-size:40px;margin:0 auto;background:'+p.h+'">'+imgTag(p.img, p.h, p.e)+'</div>' +
    '<h1 style="font-size:20px;margin-top:12px">'+p.n+'</h1>' +
    '<div class="mu">'+cfa(p.price)+'</div></div>' +
    '<h2 style="text-align:center">🎁 Qui est-ce pour ?</h2>' +
    '<div class="mu" style="text-align:center;margin-bottom:14px">Choisis le type de relation</div>' +
    '<div class="grid">' +
      GIFT_TYPES.map(function(t){
        return '<div class="gift-type" onclick="window.selectGift('+productId+',\''+t.id+'\')">' +
          '<div class="points">+'+t.points+'</div>' +
          '<span class="emoji">'+t.emoji+'</span>' +
          '<b>'+t.name+'</b>' +
          '<div class="mu">'+t.desc+'</div>' +
        '</div>';
      }).join('') +
    '</div>');
}

function selectGift(productId, typeId){
  var bonus = GiftSystem.offer(productId, typeId);
  var type = GIFT_TYPES.filter(function(t){ return t.id === typeId; })[0];
  var p = PRODUCTS.filter(function(x){ return x.id === productId; })[0];
  ov('<div style="text-align:center;padding:40px 20px">' +
    '<div style="font-size:80px;margin-bottom:16px">'+(type ? type.emoji : '🎁')+'</div>' +
    '<h1 style="font-size:24px">Cadeau envoyé !</h1>' +
    '<div style="font-size:14px;margin-top:12px">'+p.n+' → '+(type ? type.name : '')+'</div>' +
    '<div style="background:var(--grad-gold);color:#0a0e1a;padding:20px;border-radius:20px;margin-top:20px;font-weight:900">' +
      '<div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;opacity:.7">Points gagnés</div>' +
      '<div style="font-size:44px;line-height:1;margin:6px 0">+'+bonus+'</div>' +
      '<div style="font-size:12px;opacity:.7">Total : '+S.gift.points+' points</div>' +
    '</div>' +
    '<button class="btn full" style="margin-top:20px" onclick="window.ov();window.goTab(\'gifts\')">🎁 Voir mes cadeaux</button>' +
  '</div>');
}

function toggleLike(id){
  var idx = S.likedProducts.indexOf(id);
  if(idx >= 0){ S.likedProducts.splice(idx, 1); }
  else { S.likedProducts.push(id); ColdStart.track('like'); toast('❤️ Ajouté'); }
  viewProduct(id);
}

function toggleSave(id){
  var idx = S.savedProducts.indexOf(id);
  if(idx >= 0){ S.savedProducts.splice(idx, 1); toast('Retiré'); }
  else { S.savedProducts.push(id); ColdStart.track('save'); toast('🔖 Sauvegardé'); }
  viewProduct(id);
}

function trackVideoView(id, tags){
  ColdStart.track('videoLike');
  var p = PRODUCTS.filter(function(pr){ return tags.split(',').indexOf(pr.cat) >= 0; })[0];
  if(p) ColdStart.track('productView', p);
}

function trackVideoLike(id, tags){
  var key = 'v'+id;
  var idx = S.likedProducts.indexOf(key);
  if(idx >= 0) S.likedProducts.splice(idx, 1);
  else { S.likedProducts.push(key); ColdStart.track('videoLike'); toast('❤️'); }
  go();
}

function simulateInteractions(){
  for(var i=0;i<50;i++){
    var g = S.prof.sex;
    var pool = PRODUCTS.filter(function(p){ return p.gender === g; });
    var rp = pool[Math.floor(Math.random() * pool.length)];
    ColdStart.track('productView', rp);
    if(Math.random() > 0.7) ColdStart.track('like');
  }
  toast('⚡ 50 interactions simulées');
  go();
}

function selectDay(year, month, day){
  var list = CALENDAR.filter(function(ev){
    var d = new Date(ev.date);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  });
  var customs = S.socialEvents.filter(function(ev){
    var d = new Date(ev.date);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  });
  var all = list.concat(customs.map(function(c){ return {name:c.name, icon:c.icon, desc:c.desc, type:'social'}; }));

  var html = '<h1>'+dayName(new Date(year, month, day).getDay())+' '+day+' '+monthName(month)+'</h1>';
  if(!all.length){
    html += '<div class="empty"><span class="empty-icon">📅</span>Aucun événement</div>' +
      '<button class="btn full" style="margin-top:14px" onclick="window.ov();window.openAddEvent()">+ Ajouter</button>';
  } else {
    html += '<div class="mu" style="margin-top:4px">'+all.length+' événement(s)</div>';
    all.forEach(function(ev){
      html += '<div class="day-event '+(ev.type||'social')+'">' +
        '<div style="font-size:30px;flex-shrink:0">'+(ev.icon || '📅')+'</div>' +
        '<div style="flex:1"><b style="font-size:14px;display:block;margin-bottom:4px">'+ev.name+'</b>' +
        '<div class="mu">'+(ev.desc || '')+'</div></div></div>';
    });
  }
  ov(html);
}

function openAddEvent(){
  ov('<h1>📅 Nouvel événement</h1>' +
    '<div style="margin-top:14px">' +
      '<label style="font-size:12px;font-weight:800;color:var(--mu);display:block;margin-bottom:6px">NOM</label>' +
      '<input id="evName" placeholder="Ex: Mariage de Fatou" style="width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--bd);background:var(--card);color:var(--tx);font-size:14px;outline:none;margin-bottom:12px;font-family:inherit">' +
      '<label style="font-size:12px;font-weight:800;color:var(--mu);display:block;margin-bottom:6px">DATE</label>' +
      '<input type="date" id="evDate" value="'+new Date(Date.now()+7*86400000).toISOString().slice(0,10)+'" style="width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--bd);background:var(--card);color:var(--tx);font-size:14px;outline:none;margin-bottom:12px;font-family:inherit">' +
      '<label style="font-size:12px;font-weight:800;color:var(--mu);display:block;margin-bottom:6px">TYPE</label>' +
      '<div class="row wrap" style="gap:6px;margin-bottom:12px">' +
        [{id:'birthday',e:'🎂',n:'Anniversaire'},{id:'wedding',e:'💍',n:'Mariage'},{id:'party',e:'🎊',n:'Soirée'},{id:'family',e:'👨‍👩‍👧',n:'Famille'}].map(function(t){
          return '<div class="chip" data-evtype="'+t.id+'" onclick="window.selEvType(\''+t.id+'\')">'+t.e+' '+t.n+'</div>';
        }).join('') +
      '</div>' +
      '<button class="btn full" onclick="window.saveEvent()">✨ Créer</button>' +
    '</div>');
}

var _selEvType = null;
function selEvType(id){
  _selEvType = id;
  $$('[data-evtype]').forEach(function(el){ el.classList.toggle('on', el.dataset.evtype === id); });
}

function saveEvent(){
  var n = $('#evName').value.trim();
  var d = $('#evDate').value;
  if(!n || !d){ toast('⚠️ Nom et date obligatoires'); return; }
  var typeInfo = [{id:'birthday',e:'🎂',n:'Anniversaire'},{id:'wedding',e:'💍',n:'Mariage'},{id:'party',e:'🎊',n:'Soirée'},{id:'family',e:'👨‍👩‍👧',n:'Famille'}].filter(function(t){ return t.id === _selEvType; })[0] || {e:'🎉',n:'Événement'};
  S.socialEvents.push({name:n, icon:typeInfo.e, date:d, desc:typeInfo.n, type:'social'});
  _selEvType = null;
  ov();
  toast('✅ Événement créé');
  go();
}

function acceptFriend(id){
  var idx = S.friendRequests.findIndex(function(f){ return f.id === id; });
  if(idx >= 0){ S.friends.push(S.friendRequests[idx]); S.friendRequests.splice(idx, 1); toast('✅ Ami ajouté'); go(); }
}
function rejectFriend(id){
  S.friendRequests = S.friendRequests.filter(function(f){ return f.id !== id; });
  toast('Refusé'); go();
}
function friendAction(id, isReq){
  if(isReq){
    var f = S.friendRequests.filter(function(x){ return x.id === id; })[0];
    if(f) ov('<h1>'+f.name+'</h1><button class="btn full" onclick="window.acceptFriend('+id+')">Accepter</button><button class="btn o full" style="margin-top:8px" onclick="window.rejectFriend('+id+')">Refuser</button>');
  } else {
    var f2 = S.friends.filter(function(x){ return x.id === id; })[0];
    if(f2) ov('<h1>'+f2.name+'</h1><div class="mu">'+f2.pseudo+'</div><button class="btn full" style="margin-top:14px" onclick="window.toast(\'💬 Message\')">💬 Message</button>');
  }
}

function waOpen(id){
  S.chats[id] = S.chats[id] || [{f:'in', t:'Teranga ! Comment pouvons-nous aider ?', time:now()}];
  var s = STORES.filter(function(x){ return x.id === id; })[0];
  ov('<div class="row" style="margin-bottom:14px"><div class="th" style="background:var(--grad)">'+s.e+'</div><div style="flex:1"><b>'+s.n+'</b></div></div>' +
    S.chats[id].map(function(m){ return '<div style="padding:10px 14px;border-radius:14px;margin:6px 0;max-width:80%;background:'+(m.f === 'out' ? 'var(--ac);color:#fff;margin-left:auto' : 'var(--card)')+'">'+m.t+'</div>'; }).join(''));
}

function calPrev(){ S.calMonth--; if(S.calMonth < 0){ S.calMonth = 11; S.calYear--; } go(); }
function calNext(){ S.calMonth++; if(S.calMonth > 11){ S.calMonth = 0; S.calYear++; } go(); }

function changePhoto(){
  S.prof.photo = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop';
  ov(); toast('📸 Photo mise à jour'); go();
}

function toggleTheme(){
  var cur = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  go();
}

function resetOnb(){
  if(!confirm('Réinitialiser l\'app ?')) return;
  S.ob = 0;
  S.obData = {name:'', sex:'', age:25, country:'SN', phone:'', stylePref:'', budget:20000, colors:[]};
  S.prof = {name:'', sex:'', age:25, country:'SN', photo:null, style:'', budget:20000, colors:[], address:'', email:''};
  S.cold = {phase:0, interactions:0, signals:{views:0,likes:0,saves:0,purchases:0,videoLikes:0,taps:0}, inferred:{categories:{}, colors:{}, avgPrice:0, priceHits:[]}};
  S.gift = {points:0, history:[], totalSent:0, badges:[]};
  S.likedProducts = []; S.savedProducts = []; S.socialEvents = []; S.notifications = [];
  var ob = $('#onb'); ob.style.display = 'flex'; ob.style.opacity = '1'; ob.innerHTML = '';
  document.documentElement.setAttribute('data-gender', 'H');
  renderOnb();
}

