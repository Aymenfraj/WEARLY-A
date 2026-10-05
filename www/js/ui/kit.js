// Petits outils d'interface partages par tous les modules.
import { COUNTRIES } from '../data/countries.js';
export const U = () => window.WEARLY_UI;
export const S = () => U().S;
export const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const screen = (name, fn) => { U().V[name] = fn; };
export const go = () => U().go();
export const toast = t => U().toast(t);
export const nav = t => U().goTab(t);
export const chip = (label, on, js) => `<span class="chip ${on ? 'on' : ''}" onclick="${js}">${label}</span>`;
export const chips = (list, cur, fn) => `<div class="row scroll" style="margin:10px 0">${list.map(([v, l]) => chip(l, v === cur, `${fn}('${v}')`)).join('')}</div>`;
export const page = (title, body, sub) => `<div class="fade"><h1>${title}</h1>${sub ? `<div class="mu" style="margin:4px 0 10px">${sub}</div>` : ''}${body}</div>`;
export const input = 'width:100%;padding:12px;border-radius:12px;border:1px solid var(--bd);background:var(--card);color:var(--tx);margin-top:10px';
export const myCountry = () => (COUNTRIES[S().prof.country] && !COUNTRIES[S().prof.country].light ? S().prof.country : 'SN');
export function money(eur, cc) {
  const [sym, rate] = (COUNTRIES[cc || myCountry()] || COUNTRIES.SN).cur, v = eur * rate;
  return sym === '€' ? (Number.isInteger(v) ? v : v.toFixed(2)) + ' €' : Math.round(v / (rate > 100 ? 50 : 1)) * (rate > 100 ? 50 : 1) + ' ' + sym;
}
