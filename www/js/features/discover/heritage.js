// Touche traditionnelle du pays de l'utilisateur : bande de motif, salutation locale, carte d'accueil.
import { COUNTRIES, pattern, cc as ccOf } from '../../data/countries.js';
import { U } from '../../ui/kit.js';
export const code = () => ccOf(U().S.prof.country);
export function strip() {
  let b = document.getElementById('herstrip'), t = document.getElementById('topbar'); if (!t) return;
  if (!b) { t.insertAdjacentHTML('afterend', '<div id="herstrip" style="height:5px;flex-shrink:0"></div>'); b = document.getElementById('herstrip'); }
  b.style.background = pattern(code());
}
export function card() {
  const C = COUNTRIES[code()], g = C.cultures[0].g[0];
  return `<div class="card click" onclick="WEARLY_UI.goTab('world')" style="position:relative;overflow:hidden"><div style="position:absolute;left:0;right:0;top:0;height:7px;background:${pattern(code())}"></div><div style="margin-top:6px"><b>${C.f} Touche ${C.n}</b></div><div class="mu">${C.tx || ''}</div><div style="margin-top:6px;font-weight:700">${g[2]} ${g[0]} <span class="mu" style="font-weight:500">· ${g[1]}</span></div></div>`;
}
export const greeting = () => COUNTRIES[code()].greet;
