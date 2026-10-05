V.friends = function(){
  var all = S.friends.concat(S.friendRequests.map(function(f){ return Object.assign({}, f, {request:true}); }));
  var total = all.length || 1;
  var radius = 130;
  var items = '';
  all.forEach(function(f, i){
    var angle = (360 / total) * i - 90;
    var x = Math.cos(angle * Math.PI / 180) * radius;
    var y = Math.sin(angle * Math.PI / 180) * radius;
    var isReq = f.request === true;
    var cls = 'friends-circle-item' + (f.online ? ' online' : '');
    items += '<div class="'+cls+'" style="transform:translate('+x+'px,'+y+'px)" onclick="window.friendAction('+f.id+','+isReq+')">' +
      (f.photo ? '<img src="'+f.photo+'" alt="">' : (f.name[0] || '?')) +
    '</div>';
  });

  return '<div class="fade">' +
    '<h1>👥 Amis</h1>' +
    '<div class="mu" style="margin-top:4px">'+S.friends.length+' amis · '+S.friendRequests.length+' demande(s)</div>' +
    '<div class="friends-circle-wrap">' +
      '<div class="friends-circle-ring"></div>' +
      '<div class="friends-circle-center">'+(S.prof.name[0] || 'A')+'</div>' +
      items +
    '</div>' +
    '<div class="row" style="gap:8px;margin-bottom:14px">' +
      '<button class="btn full" onclick="window.toast(\'🔍 Chercher\')">🔍 Chercher</button>' +
      '<button class="btn g full" onclick="window.toast(\'📱 QR Code\')">📱 QR Code</button>' +
    '</div>' +
    (S.friendRequests.length ? '<h2>📩 Demandes</h2>' + S.friendRequests.map(function(f){
      return '<div class="card row"><div class="avatar" style="width:44px;height:44px;font-size:18px">'+(f.photo ? '<img src="'+f.photo+'" alt="">' : f.name[0])+'</div>' +
      '<div style="flex:1"><b style="font-size:13px">'+f.name+'</b><div class="mu">'+f.pseudo+'</div></div>' +
      '<div style="display:flex;gap:4px"><button class="btn sm" onclick="window.acceptFriend('+f.id+')">✓</button><button class="btn o sm" onclick="window.rejectFriend('+f.id+')">✕</button></div></div>';
    }).join('') : '') +
  '</div>';
};

/* LIBRARY */
