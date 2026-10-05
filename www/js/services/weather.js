// Meteo reelle (Open-Meteo, sans cle) avec cache hors ligne et position GPS facultative.
import * as store from '../core/storage.js';
import * as loc from './location.js';
import { COUNTRIES } from '../data/countries.js';
const CODES = [[0, '☀️', 'Ciel dégagé'], [2, '🌤️', 'Peu nuageux'], [3, '☁️', 'Nuageux'], [48, '🌫️', 'Brouillard'], [57, '🌦️', 'Bruine'], [67, '🌧️', 'Pluie'], [77, '❄️', 'Neige'], [82, '🌧️', 'Averses'], [86, '❄️', 'Averses de neige'], [99, '⛈️', 'Orage']];
export const describe = code => { const c = CODES.find(x => code <= x[0]) || CODES[CODES.length - 1]; return { emoji: c[1], label: c[2] }; };
export const useGps = v => store.set('use_gps', !!v);
export const gpsOn = () => store.get('use_gps', false);
export function parse(j, place, gps) {
  const c = j.current, h = j.hourly || {}, i = (h.time || []).indexOf(String(c.time).slice(0, 13) + ':00'), probs = (h.precipitation_probability || []).slice(Math.max(i, 0), Math.max(i, 0) + 6);
  return { t: Math.round(c.temperature_2m), feels: Math.round(c.apparent_temperature), hum: Math.round(c.relative_humidity_2m), wind: Math.round(c.wind_speed_10m), rain: probs.length ? Math.max(...probs) : (c.precipitation > 0 ? 80 : 0), code: c.weather_code, ...describe(c.weather_code), place, gps, at: Date.now(), source: 'live' };
}
export async function get(cc, { force = false } = {}) {
  const C = COUNTRIES[cc] || COUNTRIES.SN, cached = await store.get('weather', null);
  if (!force && cached && cached.cc === cc && Date.now() - cached.at < 1800000) return cached;
  let ll = C.ll, place = C.city, gps = false;
  if (await gpsOn()) { try { const p = await loc.current(); ll = [p.lat, p.lon]; place = 'Ma position'; gps = true; } catch (e) { /* ville par defaut */ } }
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ll[0]}&longitude=${ll[1]}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=precipitation_probability&forecast_days=1&timezone=auto`);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const w = Object.assign(parse(await r.json(), place, gps), { cc }); await store.set('weather', w); return w;
  } catch (e) {
    if (cached && cached.cc === cc) return Object.assign({}, cached, { source: 'cache' });
    return { t: C.temp, feels: C.temp, hum: 60, wind: 10, rain: 10, code: 0, emoji: '🌤️', label: 'Estimation', place: C.city, gps: false, at: Date.now(), source: 'estimé', cc };
  }
}
