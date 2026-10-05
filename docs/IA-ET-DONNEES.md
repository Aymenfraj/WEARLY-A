# IA et donnees des utilisateurs

## Reconnaissance des vetements sur photo
1. L'app reduit la photo (768 px) et detecte la couleur DANS le telephone.
2. Si l'utilisateur a accepte et est connecte : la photo part vers TON serveur (/api/ai/clothing), qui interroge l'API Anthropic
   (cle ANTHROPIC_API_KEY stockee uniquement sur le serveur). La photo n'est pas conservee.
3. L'IA propose nom, categorie, couleur, style, matiere, saison, occasions ; l'utilisateur corrige avant d'enregistrer.
Sans serveur/IA : seule la couleur est detectee, le reste se remplit a la main.
Cout : modele reglable (AI_MODEL, par defaut claude-haiku-4-5-20251001), limite 30 analyses/heure/utilisateur.

## Apprentissage des preferences
- Sur l'appareil : J'aime / Changer / Porter, ajouts, produits vus -> preferences de couleurs et styles utilisees par le styliste.
- Partage au serveur : UNIQUEMENT si l'utilisateur active "Statistiques anonymes" (Confidentialite).
- Tendances communautaires : compteurs agreges, affiches seulement si au moins K utilisateurs (TRENDS_K, 3 par defaut ; 5 recommande en production).
- Suppression : bouton "Supprimer mes donnees" (appareil + serveur).
- Jamais collectes : contenu des messages, photos, position precise.
Avant le Play Store : ecrire une politique de confidentialite qui reprend ces points.
