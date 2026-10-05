/* ============================================================
   OVERLAY / TOAST
   ============================================================ */
function ov(html){
  var el = $('#ov');
  if(!html){ el.style.display = 'none'; el.innerHTML = ''; return; }
  el.innerHTML = '<div class="ov-back" onclick="window.ov()">‹ Retour</div>' + html;
  el.style.display = 'block';
  el.scrollTop = 0;
}
function toast(txt){
  var t = $('#toast');
  t.textContent = txt;
  t.classList.add('show');
  clearTimeout(window._toastT);
  window._toastT = setTimeout(function(){ t.classList.remove('show'); }, 1800);
}
function confetti(){
  var colors = ['#3b82f6','#ec4899','#a855f7','#e0a526','#10b981','#ef4444'];
  for(var i=0;i<30;i++){
    var c = document.createElement('div');
    c.style.cssText = 'position:fixed;width:10px;height:10px;z-index:99;pointer-events:none;left:'+(Math.random()*100)+'%;top:-20px;background:'+colors[i%colors.length]+';border-radius:2px;animation:confFall 2s ease-out forwards';
    document.body.appendChild(c);
    setTimeout(function(el){ return function(){ el.remove(); }; }(c), 2500);
  }
}
var st = document.createElement('style');
st.textContent = '@keyframes confFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}';
document.head.appendChild(st);

