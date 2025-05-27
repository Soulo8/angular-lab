# Prérequis

- Projet `lab_symfony_7`.
- L’un des outils suivants :
    - `nvm` (Node Version Manager)
    - `Docker` (Docker Desktop)

# Installation avec Docker

- Construire et démarrer les conteneurs : `docker-compose up --build`
(Les dépendances JavaScript sont installées à cette étape avec la commande `npm ci` qui est dans le Dockerfile)

# Installation avec nvm

- Installez nvm en suivant les instructions disponibles sur leur GitHub : https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
- Dans le projet faire `nvm install` pour installer la version de node renseignée dans le fichier `.nvmrc`.
- Redémarrez votre terminal pour appliquer les modifications.
- Installez Angular CLI globalement avec la commande : `npm install -g @angular/cli`.
- Dans le projet faire : `npm install` pour installer les dépendances JavaScript.
