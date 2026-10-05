# Brancher le modele Styme

Styme est appele par le SERVEUR WEARLY (l'application ne change pas). On l'active avec des variables :
  AI_PROVIDER=styme
  STYME_URL=https://ton-modele.exemple.com/analyze
  STYME_KEY=...            (facultatif : envoye en "Authorization: Bearer ...")
  STYME_TIMEOUT=20000      (ms, facultatif)
  AI_FALLBACK=anthropic    (facultatif : si Styme tombe en panne, bascule sur l'IA Anthropic ; demande ANTHROPIC_API_KEY)

## Ce que le serveur envoie (POST JSON)
{ "image": "<JPEG en base64, 768 px max>", "mime": "image/jpeg",
  "labels": { "categories": [...], "occasions": [...], "seasons": [...] } }

## Ce que Styme doit repondre (JSON, 200)
{ "name": "T-shirt rouge", "category": "T-shirts", "color": "rouge", "style": "casual",
  "material": "coton", "season": "Été", "occasions": ["casual","party"], "confidence": 0.93 }
(ou enveloppe dans { "result": {...} } ; pas un vetement : { "error": "not_clothing" })

Valeurs reconnues
- category : T-shirts, Chemises, Polos, Pantalons, Jeans, Shorts, Vestes, Chaussures, Sportswear, Tenue traditionnelle, Accessoires
  (des etiquettes proches comme "tshirt", "sneaker", "boubou", "jacket" sont converties automatiquement)
- season : Été, Hiver, Mi-saison, Toutes saisons
- occasions : work, casual, sport, party, wedding, traditional, evening, travel, beach, home
- confidence : 0 a 1. Les champs absents sont acceptes ; l'utilisateur corrige avant d'enregistrer.

## Conseils pour l'entrainement
- Inclure les tenues traditionnelles d'Afrique de l'Ouest, du Maghreb et du Golfe (boubou, bazin, pagne, bogolan, jebba, thobe, abaya...) : ce sont les plus mal reconnues par les modeles generiques.
- Photos prises par telephone, fonds varies, vetement plie, porte ou pose.
- Mesurer separement : categorie, couleur, occasions. Objectif de depart : categorie > 90 %.
- Temps de reponse conseille : moins de 3 secondes.

## Plus tard : modele dans le telephone
Un modele leger (TensorFlow Lite / ONNX) permettrait de reconnaitre sans Internet et sans envoyer la photo. Il se brancherait dans www/js/services/vision.js a la place de l'appel serveur.
