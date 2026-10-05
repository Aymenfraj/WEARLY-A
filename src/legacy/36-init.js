(function(){ var _go = go; go = function(){ _go(); (window.__hooks || []).forEach(function(f){ try { f(); } catch(e) {} }); }; })();
window.WEARLY_UI={V:V,S:S,toast:toast,ov:ov,go:function(){go()},goTab:goTab,closeDrawer:closeDrawer,onRender:function(f){(window.__hooks=window.__hooks||[]).push(f)}};
renderOnb();

