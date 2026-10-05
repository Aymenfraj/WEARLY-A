// Menu lateral : une seule liste pour toutes les fonctions ajoutees (le menu d'origine reste intact).
const SECTIONS = [
  ['Style & Mode', [['stylist', '✨', 'Styliste IA'], ['wardrobe', '👕', 'Garde-robe'], ['stores', '📍', 'Magasins à proximité'], ['compare', '⚖️', 'Comparateur & recos'], ['orders', '🧾', 'Mes commandes'], ['trends', '🔥', 'Tendances'], ['news', '📰', 'Actualités'], ['world', '🌍', 'Mode du monde']]],
  ['Entre amis', [['vestiaire', '👗', 'Vestiaire des amis'], ['publier', '🎥', 'Publier une vidéo'], ['mesvideos', '🎬', 'Mes vidéos']]],
  ['Vendeur', [['seller', '🏪', 'Espace vendeur']]],
  ['Compte & données', [['compte', '☁️', 'Mon compte & serveur'], ['reglages', '📱', 'Téléphone & réseau'], ['privacy', '🔒', 'Confidentialité']]]
];
export const html = () => SECTIONS.map(([t, items]) => `<div class="drawer-section"><h4>${t}</h4>${items.map(([k, e, n]) => `<div class="drawer-item" data-nav="${k}"><span class="ico">${e}</span> ${n}</div>`).join('')}</div>`).join('');
