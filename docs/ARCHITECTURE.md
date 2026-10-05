# Architecture WEARLY (a garder a vie)

Regle d'or : une fonction = un dossier. Pour modifier une fonction, on ne touche que son dossier.

## Application (www/js)
| Dossier | Role |
|---|---|
| core/ | config, events, platform, storage, network, http, auth, sync, realtime, telemetry (apprentissage) |
| services/ | location, audio, notifications, camera, weather (Open-Meteo), imaging, vision (IA vetements) |
| data/ | countries (6 pays + monde), activities, stores, products, trends, news : ce sont des DONNEES, sans logique |
| ui/kit.js | outils d'interface partages |
| features/wardrobe | garde-robe numerique (store.js = donnees, view.js = ecrans, scan IA) |
| features/stylist | engine.js = moteur pur (testable), view.js = ecran + carte d'accueil |
| features/market | geo.js (distance, ouvert/ferme), catalog.js (offres, comparaison, valeur), view.js (magasins, comparateur, commandes) |
| features/seller | tableau de bord vendeur + publication de la boutique |
| features/discover | trends, news, world (pays > culture > occasion), heritage (theme du pays) |
| features/privacy | consentements, export/suppression des donnees |
| features/chat, video, account, screens, session | messagerie, videos, compte, tests telephone, memoire de session |
| features/menu.js | le menu lateral (toutes les entrees au meme endroit) |
| features/index.js | branche toutes les fonctions |
| src/legacy/*.js | ecrans d'origine, un fichier par ecran (assembles par scripts/build-www.js) |

## Ajouter une fonction
1. Creer features/<nom>/view.js avec `screen('<nom>', () => page(...))`.
2. Ajouter une ligne dans features/menu.js et un `import` dans features/index.js.
3. Si elle a des donnees a sauvegarder : `sync.register('<nom>', get, set)`.

## Brancher un vrai service plus tard
- Meteo : services/weather.js | Boutiques/horaires : data/stores.js ou API cartes | Actualites : data/news.js (fetchNews)
- Base de donnees serveur : server/lib/store.js (seul fichier a remplacer)
