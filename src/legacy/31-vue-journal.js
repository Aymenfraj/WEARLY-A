V.journal = function(){
  return '<div class="fade">' +
    '<h1>📸 Journal de style</h1>' +
    '<div style="background:linear-gradient(135deg,#831843,#4c1d95);color:#fff;border-radius:22px;padding:24px;text-align:center;margin:14px 0">' +
      '<div style="font-size:48px;margin-bottom:8px">📸</div>' +
      '<div style="font-size:20px;font-weight:800">Mon année en tenues</div>' +
      '<div style="display:flex;justify-content:space-around;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.2)">' +
        '<div><div style="font-size:22px;font-weight:900">0</div><div style="font-size:10px;opacity:.85;margin-top:4px">Tenues</div></div>' +
        '<div><div style="font-size:22px;font-weight:900">0</div><div style="font-size:10px;opacity:.85;margin-top:4px">Événements</div></div>' +
        '<div><div style="font-size:22px;font-weight:900">0</div><div style="font-size:10px;opacity:.85;margin-top:4px">Jours</div></div>' +
      '</div>' +
    '</div>' +
    '<button class="btn g full" onclick="window.toast(\'📸 Ajouté\')">📸 Ajouter la tenue du jour</button>' +
  '</div>';
};

