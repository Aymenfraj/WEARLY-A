# Connecter WEARLY a Internet

Telephone  <--HTTPS-->  Serveur WEARLY (Node)  <-->  Base de donnees

1. Heberger le serveur (zip WEARLY-serveur) en HTTPS : Render, Railway ou Fly.io.
   Android bloque le HTTP non securise : l'adresse doit commencer par https://
2. Dans l'app : Menu > Mon compte & serveur > coller l'adresse > Enregistrer > Tester.
3. Creer un compte : profil et vestiaire sont sauvegardes sur le serveur.
4. Messagerie : les messages passent par le serveur, arrivent en temps reel (SSE),
   et les messages ecrits hors ligne partent au retour du reseau.

Plus tard : notifications push quand l'app est fermee (Firebase), stockage des videos (S3/Cloudinary),
base Postgres (remplacer uniquement server/lib/store.js).
