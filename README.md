# Prérequis

- Projet `lab_symfony_7`.
- `nvm` (Node Version Manager)

# Installation avec nvm

- Installez nvm en suivant les instructions sur le dépôt officiel : https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
- Installez Node.js `nvm install`. Cela installera automatiquement la version spécifiée dans le fichier .nvmrc.
- Redémarrez votre terminal.
- Installez Angular CLI globalement `npm install -g @angular/cli`.
- Installez les dépendances du projet `npm install`.
- Démarrez le serveur `npm start`.

# Installation avec Docker

Le projet peut aussi être utilisé avec Docker, mais après réflexion, je préfère utiliser Node Version Manager. Je pense que Docker est inutile pour les projets frontend.

- Construire et démarrer les conteneurs : `docker-compose up --build`
(Les dépendances JavaScript sont installées automatiquement à cette étape via la commande npm ci intégrée dans le Dockerfile.)