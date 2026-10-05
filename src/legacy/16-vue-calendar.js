V.calendar = function(){
  var year = S.calYear, month = S.calMonth;
  var firstDay = new Date(year, month, 1);
  var startWeekDay = firstDay.getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var daysInPrev = new Date(year, month, 0).getDate();

  var events = {};
  CALENDAR.forEach(function(ev){
    var d = new Date(ev.date);
    var key = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    if(!events[key]) events[key] = [];
    events[key].push(ev);
  });
  S.socialEvents.forEach(function(ev){
    var d = new Date(ev.date);
    var key = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    if(!events[key]) events[key] = [];
    events[key].push(ev);
  });

  var cells = '';
  for(var i = startWeekDay - 1; i >= 0; i--){
    cells += '<div class="cal-day other"><span class="cal-day-num">'+(daysInPrev - i)+'</span></div>';
  }
  for(var d = 1; d <= daysInMonth; d++){
    var evs = events[year + '-' + month + '-' + d] || [];
    var isToday = (year === TODAY.getFullYear() && month === TODAY.getMonth() && d === TODAY.getDate());
    var cls = 'cal-day';
    if(isToday) cls += ' today';
    if(evs.length > 0 && !isToday) cls += ' has-events';
    var dots = '';
    if(evs.length > 0){
      dots = '<div class="cal-dots">' + evs.slice(0,4).map(function(e){
        var t = e.type || 'social';
        return '<div class="cal-dot '+t+'"></div>';
      }).join('') + '</div>';
    }
    cells += '<div class="'+cls+'" onclick="window.selectDay('+year+','+month+','+d+')"><span class="cal-day-num">'+d+'</span>'+dots+'</div>';
  }
  var remaining = 42 - (startWeekDay + daysInMonth);
  if(remaining < 0) remaining = (7 - ((startWeekDay + daysInMonth) % 7)) % 7;
  for(var n = 1; n <= remaining; n++) cells += '<div class="cal-day other"><span class="cal-day-num">'+n+'</span></div>';

  return '<div class="fade">' +
    '<h1>📅 Calendrier</h1>' +
    '<div class="cal-nav">' +
      '<div class="cal-nav-btn" onclick="window.calPrev()">‹</div>' +
      '<div class="cal-month">'+monthName(month)+' '+year+'</div>' +
      '<div class="cal-nav-btn" onclick="window.calNext()">›</div>' +
    '</div>' +
    '<div class="cal-weekdays"><div>Dim</div><div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div></div>' +
    '<div class="cal-grid">'+cells+'</div>' +
    '<button class="btn full" style="margin-top:14px" onclick="window.openAddEvent()">+ Ajouter un événement</button>' +
  '</div>';
};

/* FRIENDS */
