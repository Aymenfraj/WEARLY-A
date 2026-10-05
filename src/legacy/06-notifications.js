/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function addNotif(icon, title, text){
  S.notifications.unshift({id: Date.now()+Math.random(), icon:icon, title:title, text:text, time:now(), read:false});
  updateNotifCount();
}
function updateNotifCount(){
  var el = $('#giftBadge');
  if(el){
    var unread = S.notifications.filter(function(n){ return !n.read; }).length;
    if(unread > 0){ el.textContent = unread; el.style.display = 'block'; }
    else el.style.display = 'none';
  }
}

