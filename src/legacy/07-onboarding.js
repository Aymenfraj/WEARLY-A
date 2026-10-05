/* ============================================================
   ONBOARDING
   ============================================================ */
function renderOnb(){
  var ob = $('#onb');
  if(!ob) return;
  if(S.ob >= 8){ ob.style.display = 'none'; return; }
  ob.style.display = 'flex';
  var step = S.ob;
  var content = '';

  if(step === 0){
    content = '<div class="ob-wrap"><div class="ob-emoji">👋</div><div class="ob-title">Bienvenue sur WEARLY</div><div class="ob-sub">Ton styliste IA avec cadeaux & points</div><input class="ob-input" id="obName" placeholder="Ton nom..." value="'+S.obData.name+'"><button class="ob-btn" id="obNext" disabled>Commencer →</button></div>';
  } else if(step === 1){
    content = '<div class="ob-wrap"><div class="ob-emoji">'+(S.obData.sex === 'F' ? '👩' : '👨')+'</div><div class="ob-title">Ton profil</div><div class="ob-choice"><div class="'+(S.obData.sex === 'H' ? 'on' : '')+'" data-sex="H"><span class="ico">👨</span><b>Homme</b></div><div class="'+(S.obData.sex === 'F' ? 'on' : '')+'" data-sex="F"><span class="ico">👩</span><b>Femme</b></div></div><button class="ob-btn" id="obNext">Continuer →</button></div>';
  } else if(step === 2){
    content = '<div class="ob-wrap"><div class="ob-emoji">🎂</div><div class="ob-title">Ton âge</div><div class="ob-age-num" id="obAgeVal">'+S.obData.age+'</div><div class="ob-age-lbl">ans</div><input type="range" class="ob-range" id="obRange" min="16" max="70" value="'+S.obData.age+'"><button class="ob-btn" id="obNext">Continuer →</button></div>';
  } else if(step === 3){
    content = '<div class="ob-wrap"><div class="ob-emoji">🌍</div><div class="ob-title">Ton pays</div><div class="ob-grid">' + COUNTRIES.map(function(c){ return '<div class="ob-country '+(S.obData.country === c.code ? 'on' : '')+'" data-country="'+c.code+'"><span>'+c.flag+'</span><b>'+c.name+'</b></div>'; }).join('') + '</div><button class="ob-btn" id="obNext">Continuer →</button></div>';
  } else if(step === 4){
    content = '<div class="ob-wrap"><div class="ob-emoji">📱</div><div class="ob-title">Ton numéro</div><div class="ob-sub">🔒 Confidentiel</div><input class="ob-input" id="obPhone" type="tel" placeholder="77 123 45 67" value="'+S.obData.phone+'"><button class="ob-btn" id="obNext">Continuer →</button></div>';
  } else if(step === 5){
    content = '<div class="ob-wrap"><div class="ob-emoji">🎨</div><div class="ob-title">Ton style</div><div class="ob-grid">' + STYLES.map(function(s){ return '<div class="ob-country '+(S.obData.stylePref === s.id ? 'on' : '')+'" data-style="'+s.id+'"><span>'+s.emoji+'</span><b>'+s.name+'</b></div>'; }).join('') + '</div><button class="ob-btn" id="obNext">Continuer →</button><button class="ob-btn skip" onclick="window.obSkip()">Passer</button></div>';
  } else if(step === 6){
    content = '<div class="ob-wrap"><div class="ob-emoji">💰</div><div class="ob-title">Ton budget</div><div style="text-align:center;font-size:28px;font-weight:900;color:var(--ac);margin-bottom:12px" id="budgetVal">'+S.obData.budget.toLocaleString('fr-FR')+' FCFA</div><input type="range" class="ob-range" id="obBudget" min="5000" max="200000" step="5000" value="'+S.obData.budget+'"><button class="ob-btn" id="obNext">Continuer →</button><button class="ob-btn skip" onclick="window.obSkip()">Passer</button></div>';
  } else if(step === 7){
    content = '<div class="ob-wrap"><div class="ob-emoji">🎨</div><div class="ob-title">Tes couleurs</div><div style="text-align:center;color:var(--mu);font-size:12px;margin-bottom:14px">3 maximum</div><div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:16px">' + COLORS.map(function(c){ var on = S.obData.colors.indexOf(c.id) >= 0; return '<div data-color="'+c.id+'" style="width:52px;height:52px;border-radius:50%;background:'+c.hex+';cursor:pointer;border:3px solid '+(on ? '#fff' : 'transparent')+';display:grid;place-items:center;color:#fff;font-size:20px;font-weight:900">'+(on ? '✓' : '')+'</div>'; }).join('') + '</div><button class="ob-btn" id="obFinish">✨ Découvrir</button><button class="ob-btn skip" onclick="window.finishOnb()">Passer</button></div>';
  }
  ob.innerHTML = content;

  if(step === 0){
    var inp = $('#obName'), btn = $('#obNext');
    btn.addEventListener('click', obNext);
    inp.addEventListener('input', function(){ S.obData.name = inp.value; btn.disabled = !inp.value.trim(); });
    inp.addEventListener('keydown', function(e){ if(e.key === 'Enter' && inp.value.trim()) obNext(); });
  } else if(step === 1){
    $$('.ob-choice > div').forEach(function(el){ el.addEventListener('click', function(){ S.obData.sex = el.dataset.sex; renderOnb(); }); });
    $('#obNext').addEventListener('click', obNext);
  } else if(step === 2){
    var range = $('#obRange'), val = $('#obAgeVal');
    range.addEventListener('input', function(){ S.obData.age = +range.value; val.textContent = range.value; });
    $('#obNext').addEventListener('click', obNext);
  } else if(step === 3){
    $$('.ob-country').forEach(function(el){ el.addEventListener('click', function(){ S.obData.country = el.dataset.country; renderOnb(); }); });
    $('#obNext').addEventListener('click', obNext);
  } else if(step === 4){
    var p = $('#obPhone');
    p.addEventListener('input', function(){ S.obData.phone = p.value; });
    $('#obNext').addEventListener('click', obNext);
  } else if(step === 5){
    $$('.ob-country').forEach(function(el){ el.addEventListener('click', function(){ S.obData.stylePref = el.dataset.style; renderOnb(); }); });
    $('#obNext').addEventListener('click', obNext);
  } else if(step === 6){
    var b = $('#obBudget'), bv = $('#budgetVal');
    b.addEventListener('input', function(){ S.obData.budget = +b.value; bv.textContent = (+b.value).toLocaleString('fr-FR') + ' FCFA'; });
    $('#obNext').addEventListener('click', obNext);
  } else if(step === 7){
    $$('[data-color]').forEach(function(el){ el.addEventListener('click', function(){ var id = el.dataset.color; var idx = S.obData.colors.indexOf(id); if(idx >= 0){ S.obData.colors.splice(idx, 1); } else if(S.obData.colors.length < 3){ S.obData.colors.push(id); } else { toast('Maximum 3'); return; } renderOnb(); }); });
    $('#obFinish').addEventListener('click', finishOnb);
  }
}

function obNext(){ S.ob++; if(S.ob >= 8) finishOnb(); else renderOnb(); }
function obSkip(){ S.ob++; if(S.ob >= 8) finishOnb(); else renderOnb(); }

function finishOnb(){
  S.prof.name = (S.obData.name || '').trim() || 'Ami(e)';
  S.prof.sex = S.obData.sex || 'H';
  S.prof.age = S.obData.age;
  S.prof.country = S.obData.country || 'SN';
  S.prof.style = S.obData.stylePref || '';
  S.prof.budget = S.obData.budget || 20000;
  S.prof.colors = S.obData.colors.slice();
  S.shopGender = S.prof.sex;
  document.documentElement.setAttribute('data-gender', S.prof.sex);

  S.friends = [
    {id:1, name:'Fatou D.', pseudo:'@fatou', photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', online:true},
    {id:2, name:'Aïssatou N.', pseudo:'@aissatou', photo:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', online:false},
    {id:3, name:'Mariama S.', pseudo:'@mariama', photo:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop', online:true}
  ];
  S.friendRequests = [{id:100, name:'Coumba N.', pseudo:'@coumba', photo:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}];
  S.stats = {profileViews: Math.floor(Math.random()*500)+120, videoViews: Math.floor(Math.random()*3000)+500, sharedPosts: Math.floor(Math.random()*80)+12, giftsReceived: Math.floor(Math.random()*40)+5};
  addNotif('🔥', 'Bienvenue ' + S.prof.name, 'Ton styliste IA est prêt !');

  var ob = $('#onb');
  ob.style.opacity = '0'; ob.style.transition = 'opacity .3s';
  setTimeout(function(){ ob.style.display = 'none'; ob.style.opacity = '1'; S.ob = 8; go(); }, 320);
}

