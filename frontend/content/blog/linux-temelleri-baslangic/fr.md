---
title: "Les bases de Linux : Mon guide du débutant avec Bandit"
excerpt: "J'ai commencé mon parcours Linux avec le jeu OverTheWire Bandit. J'ai pratiqué en installant Ubuntu sur VirtualBox."
date: "2025-01-06"
readTime: "8 min"
tags: ["linux", "beginner", "bandit"]
author: "Azize"
---

Le 6 janvier 2025, j'ai pris une décision : j'allais apprendre Linux. Mais je ne savais pas par où commencer. Fort de nombreuses années d'expérience dans l'industrie, les conseils de Burhan m'ont conduit au jeu [OverTheWire Bandit](https://overthewire.org/wargames/bandit/). Ce jeu et l'approche de mon mentor ont marqué le début d'un parcours d'apprentissage qui va au-delà de l'éducation traditionnelle, visant à fournir une compétence industrielle directe.

## Bandit : Apprendre Linux en jouant

Bandit est un "wargame" - à chaque niveau, vous devez trouver le mot de passe pour le niveau suivant. Ça semble simple, mais voici la beauté : vous devez utiliser des commandes Linux pour trouver le mot de passe. Le jeu vous force à apprendre.

Même établir la première connexion est une leçon :

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Les premiers niveaux étaient faciles. Lire des fichiers avec `cat readme`, voir les fichiers cachés avec `ls -la`... Mais au fur et à mesure, les choses devenaient plus difficiles. Par exemple, quand un nom de fichier est juste `-`, `cat -` ne fonctionne pas, il faut écrire `cat ./-`. J'ai aussi appris ici qu'il faut des guillemets pour les noms de fichiers avec des espaces.

Dans les niveaux 5-10, j'ai découvert des outils puissants comme `find`, `grep`, `sort`. Surtout la commande `find` est un sauveur - parfaite pour trouver des fichiers d'une taille spécifique ou avec des permissions spécifiques.

J'ai terminé les 10 premiers niveaux en 4 jours. Les commandes Linux de base s'étaient installées dans mon esprit.

## J'avais besoin d'un vrai système Linux

Bandit était génial, mais jouer sur le serveur de quelqu'un d'autre ne suffisait pas. J'avais besoin de mon propre système - un environnement où je pouvais configurer et casser des choses.

J'ai installé [VirtualBox](https://www.virtualbox.org/) sur mon ordinateur Windows 11 et configuré [Ubuntu Server](https://ubuntu.com/download/server). Pourquoi Server au lieu de Desktop ? Parce que mon objectif était d'apprendre la ligne de commande, pas de regarder de jolies interfaces.

Mes paramètres VM étaient simples : 2 Go de RAM, 20 Go de disque. J'ai mis le réseau en "Bridged Adapter" pour pouvoir accéder à Ubuntu depuis Windows.

## Premiers jours : Tout découvrir

Une fois Ubuntu installé, la première chose que j'ai faite a été de mettre à jour le système :

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
```

Puis j'ai commencé à explorer le système de fichiers. Il n'y a pas de logique C:, D: comme dans Windows. Tout commence à partir d'un seul répertoire racine (`/`). `/home` pour les fichiers utilisateurs, `/etc` pour les fichiers de configuration, `/var` pour les logs...

## Permissions : Le cœur de Linux

Quand je n'ai pas pu exécuter un fichier, j'ai dû apprendre les permissions. Sous Linux, chaque fichier a un propriétaire et il y a trois types de permissions : lecture (r), écriture (w), exécution (x).

Les lettres étranges comme `-rw-r--r--` dans la sortie de `ls -l` avaient maintenant du sens. Donner la permission d'exécution à un script avec `chmod +x script.sh`, contrôle total avec `chmod 755`... C'est devenu un réflexe.

## À la fin de deux semaines

Le 21 janvier, j'avais quelque chose de concret : j'avais terminé les 10 premiers niveaux de Bandit, mon propre serveur Ubuntu fonctionnait, et je connaissais les commandes de base par cœur.

Mais la chose principale que j'ai apprise était : la meilleure façon d'apprendre Linux est de casser des choses. Faites des snapshots, expérimentez, cassez, restaurez, réessayez.

Maintenant il est temps de configurer un serveur web. Apache et Nginx m'attendent.

**Liens utiles :** [Jeu Bandit](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
