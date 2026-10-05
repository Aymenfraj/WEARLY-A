// Distances et horaires d'ouverture (calcules dans le fuseau horaire du magasin).
export const dist = (a, b) => { const r = x => x * Math.PI / 180, dl = r(b[0] - a[0]), dn = r(b[1] - a[1]), h = Math.sin(dl / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dn / 2) ** 2; return 12742 * Math.asin(Math.sqrt(h)); };
const DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
export function localNow(tz, date = new Date()) {
  const p = {}; for (const x of new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: 'numeric', weekday: 'short', hour12: false }).formatToParts(date)) p[x.type] = x.value;
  return { h: (+p.hour) % 24, m: +p.minute, d: DAYS[p.weekday] };
}
export function openNow(store, tz, date) {
  const t = localNow(tz, date); if (store.off && store.off.includes(t.d)) return false;
  const x = t.h + t.m / 60; return x >= store.hr[0] && x < store.hr[1];
}
