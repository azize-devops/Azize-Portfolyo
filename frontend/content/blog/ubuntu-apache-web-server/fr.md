---
title: "Mon premier site web avec Apache sur Ubuntu"
excerpt: "Installation d'Apache sur serveur Ubuntu dans VirtualBox et les erreurs rencontrées. Des conflits de ports aux problèmes de configuration."
date: "2025-01-22"
readTime: "10 min"
tags: ["linux", "apache", "web-server"]
author: "Azize"
---

Après avoir appris les bases de Linux, il était temps de faire quelque chose de concret : configurer un serveur web. Mon objectif était simple - faire fonctionner un site web sur Ubuntu VM et y accéder depuis Windows. Ça semble facile, non ? Ça ne l'était pas.

## Installation d'Apache : La partie facile

L'installation d'[Apache](https://httpd.apache.org/) était vraiment simple :

```bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
```

J'étais content de voir `active (running)`. J'ai ouvert l'IP de la VM dans le navigateur et... rien. C'est là que l'aventure a commencé.

## Première erreur : Conflit de port

Quand j'ai essayé de redémarrer Apache, du texte rouge est apparu dans le terminal :

```
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
```

Le port 80 était déjà utilisé. J'ai vérifié qui l'utilisait :

```bash
sudo lsof -i :80
```

Il s'avère qu'un autre serveur web que j'avais installé plus tôt pour des tests tournait encore. J'avais deux options : l'arrêter ou changer le port d'Apache. J'ai choisi de changer le port - changé `Listen 80` en `Listen 8080` dans `/etc/apache2/ports.conf`.

## Deuxième erreur : Faute de frappe !

Quand j'ai démarré Apache, une nouvelle erreur :

```
AH02297: Cannot access directory "/etc/apache2/${APACHE_LOG_DIR]"
```

En regardant attentivement, j'ai remarqué : `${APACHE_LOG_DIR]` - j'avais utilisé un crochet au lieu d'une accolade ! Une erreur d'un caractère m'a pris une demi-heure. J'ai appris la commande `sudo apache2ctl configtest` - la vérification de syntaxe après chaque modification est indispensable.

## Création du site web

Une fois les erreurs résolues, il était temps pour le contenu. J'ai créé le dossier `/var/www/mysite` et écrit un simple fichier HTML. Puis la configuration Virtual Host :

```bash
sudo nano /etc/apache2/sites-available/mysite.conf
```

J'ai activé le site avec `a2ensite mysite.conf`, désactivé celui par défaut avec `a2dissite 000-default.conf`. `sudo systemctl reload apache2` et...

J'ai ouvert `http://192.0.2.100:8080` dans le navigateur Windows. Quand j'ai vu "Bonjour le monde !", j'étais vraiment heureux. Une simple page HTML mais un grand pas pour moi.

## Leçons apprises

Les leçons de cette expérience :
- **Vraiment** lire les messages d'erreur est important
- Toujours utiliser `apache2ctl configtest`
- Vérifier les ports avec `lsof -i :port`
- Ne pas oublier le pare-feu : `sudo ufw allow 8080/tcp`

Nginx est le suivant. On dit qu'il est plus léger, plus rapide. On verra.

**Liens utiles :** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
