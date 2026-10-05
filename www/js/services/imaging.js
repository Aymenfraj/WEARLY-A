// Preparation des photos : redimensionnement, miniature et couleur dominante (hors ligne).
export function loadImg(file) { return new Promise((res, rej) => { const u = URL.createObjectURL(file), i = new Image(); i.onload = () => { URL.revokeObjectURL(u); res(i); }; i.onerror = () => rej(new Error('Image illisible')); i.src = u; }); }
function scaled(src, w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(src, 0, 0, w, h); return c; }
export async function prepare(file, max = 768) {
  const i = await loadImg(file), k = Math.min(1, max / Math.max(i.width, i.height)), c = scaled(i, Math.round(i.width * k), Math.round(i.height * k));
  const url = c.toDataURL('image/jpeg', .8), t = 256 / Math.max(c.width, c.height), th = scaled(c, Math.max(1, Math.round(c.width * t)), Math.max(1, Math.round(c.height * t)));
  return { canvas: c, dataUrl: url, base64: url.split(',')[1], mime: 'image/jpeg', thumb: th.toDataURL('image/jpeg', .7) };
}
const NAMES = [['noir', [25, 25, 25]], ['blanc', [240, 240, 240]], ['gris', [128, 128, 128]], ['beige', [214, 190, 150]], ['marron', [110, 70, 40]], ['rouge', [200, 30, 40]], ['orange', [240, 130, 30]], ['jaune', [240, 210, 40]], ['vert', [40, 150, 70]], ['bleu', [40, 110, 200]], ['bleu marine', [20, 35, 90]], ['violet', [110, 50, 160]], ['rose', [235, 130, 170]]];
export function nameColor(r, g, b) { let best = NAMES[0][0], bd = 1e9; for (const [n, [R, G, B]] of NAMES) { const d = (r - R) ** 2 + (g - G) ** 2 + (b - B) ** 2; if (d < bd) { bd = d; best = n; } } return best; }
export function dominant(c) {   // zone centrale, regroupement des couleurs proches
  const w = c.width, h = c.height, d = c.getContext('2d').getImageData(Math.floor(w * .25), Math.floor(h * .25), Math.max(1, Math.floor(w * .5)), Math.max(1, Math.floor(h * .5))).data, b = {};
  for (let i = 0; i < d.length; i += 16) { const k = (d[i] >> 5) + ',' + (d[i + 1] >> 5) + ',' + (d[i + 2] >> 5); b[k] = (b[k] || 0) + 1; }
  const key = Object.keys(b).sort((x, y) => b[y] - b[x])[0].split(',').map(v => (+v << 5) + 16), hex = '#' + key.map(v => v.toString(16).padStart(2, '0')).join('');
  return { name: nameColor(key[0], key[1], key[2]), hex };
}
