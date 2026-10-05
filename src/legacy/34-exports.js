/* ============================================================
   EXPORTS
   ============================================================ */
window.goTab = goTab;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.ov = ov;
window.toast = toast;
window.viewProduct = viewProduct;
window.openGift = openGift;
window.selectGift = selectGift;
window.toggleLike = toggleLike;
window.toggleSave = toggleSave;
window.trackVideoView = trackVideoView;
window.trackVideoLike = trackVideoLike;
window.simulateInteractions = simulateInteractions;
window.setShopGender = function(g){ S.shopGender = g; go(); };
window.setShopCat = function(c){ S.filterCat = c; go(); };
window.setLibTab = function(i){ S.libraryTab = i; go(); };
window.selectDay = selectDay;
window.openAddEvent = openAddEvent;
window.selEvType = selEvType;
window.saveEvent = saveEvent;
window.deleteEvent = function(i){ S.socialEvents.splice(i, 1); go(); toast('Supprimé'); };
window.calPrev = calPrev;
window.calNext = calNext;
window.acceptFriend = acceptFriend;
window.rejectFriend = rejectFriend;
window.friendAction = friendAction;
window.waOpen = waOpen;
window.changePhoto = changePhoto;
window.toggleTheme = toggleTheme;
window.resetOnb = resetOnb;
window.obSkip = obSkip;
window.finishOnb = finishOnb;
window.openSettings = openSettings;
window.openSub = openSub;
window.toggleNotif = function(k){ S.settings.notifications[k] = !S.settings.notifications[k]; openSub('notifications'); };
window.togglePrivacy = function(k){ S.settings.privacy[k] = !S.settings.privacy[k]; openSub('privacy'); };
window.setLang = function(c){ S.settings.language = c; ov(); toast('🌍 Langue changée'); };
window.saveAccount = function(){
  S.prof.name = ($('#sName').value || S.prof.name).trim();
  S.prof.email = ($('#sEmail').value || '').trim();
  S.prof.address = ($('#sAddr').value || '').trim();
  ov(); toast('💾 Enregistré'); go();
};
window.participerChallenge = function(){ S.challengeEntries.push({name:S.prof.name, likes:Math.floor(Math.random()*100)+20}); toast('🎉 Participation !'); go(); };
window.voteMystery = function(n){ S.mystery.votes++; if(S.mystery.votes >= 3){ S.mystery.revealed = true; confetti(); } toast('✅ Vote '+n); go(); };
window.subscribeBox = function(p){ confetti(); toast('🎉 Abonnement '+p); };

/* INIT */
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-gender', 'H');
