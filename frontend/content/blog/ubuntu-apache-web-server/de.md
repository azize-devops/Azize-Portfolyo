---
title: "Meine erste Website mit Apache auf Ubuntu"
excerpt: "Apache-Installation auf Ubuntu-Server in VirtualBox und die Fehler, die ich erlebt habe. Von Port-Konflikten bis zu Konfigurationsproblemen."
date: "2025-01-22"
readTime: "10 Min"
tags: ["linux", "apache", "web-server"]
author: "Azize"
---

Nach dem Erlernen der Linux-Grundlagen war es Zeit, etwas Echtes zu tun: einen Webserver einrichten. Mein Ziel war einfach - eine Website auf Ubuntu VM zum Laufen bringen und von Windows darauf zugreifen. Klingt einfach, oder? War es nicht.

## Apache-Installation: Der einfache Teil

Die [Apache](https://httpd.apache.org/)-Installation war wirklich einfach:

```bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
```

Ich freute mich, als ich `active (running)` sah. Ich öffnete die IP der VM im Browser und... nichts. Dort begann das Abenteuer.

## Erster Fehler: Port-Konflikt

Als ich versuchte, Apache neu zu starten, erschien roter Text im Terminal:

```
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
```

Port 80 war bereits in Verwendung. Ich prüfte, wer ihn benutzte:

```bash
sudo lsof -i :80
```

Es stellte sich heraus, dass ein anderer Webserver, den ich früher zum Testen installiert hatte, noch lief. Ich hatte zwei Optionen: ihn stoppen oder Apaches Port ändern. Ich entschied mich für die Portänderung - änderte `Listen 80` zu `Listen 8080` in `/etc/apache2/ports.conf`.

## Zweiter Fehler: Tippfehler!

Als ich Apache startete, ein neuer Fehler:

```
AH02297: Cannot access directory "/etc/apache2/${APACHE_LOG_DIR]"
```

Bei genauerem Hinsehen bemerkte ich: `${APACHE_LOG_DIR]` - ich hatte eine eckige Klammer statt einer geschweiften verwendet! Ein Ein-Zeichen-Fehler kostete mich eine halbe Stunde. Ich lernte den Befehl `sudo apache2ctl configtest` - Syntaxprüfung nach jeder Änderung ist ein Muss.

## Die Website erstellen

Sobald die Fehler behoben waren, war es Zeit für Inhalt. Ich erstellte den Ordner `/var/www/mysite` und schrieb eine einfache HTML-Datei. Dann die Virtual Host-Konfiguration:

```bash
sudo nano /etc/apache2/sites-available/mysite.conf
```

Ich aktivierte die Site mit `a2ensite mysite.conf`, deaktivierte die Standardseite mit `a2dissite 000-default.conf`. `sudo systemctl reload apache2` und...

Ich öffnete `http://192.0.2.100:8080` im Windows-Browser. Als ich "Hallo Welt!" sah, war ich wirklich glücklich. Eine einfache HTML-Seite, aber ein großer Schritt für mich.

## Gelernte Lektionen

Lektionen aus dieser Erfahrung:
- Fehlermeldungen **wirklich** zu lesen ist wichtig
- Immer `apache2ctl configtest` verwenden
- Ports mit `lsof -i :port` prüfen
- Firewall nicht vergessen: `sudo ufw allow 8080/tcp`

Als nächstes kommt Nginx. Sie sagen, er ist leichter und schneller. Mal sehen.

**Nützliche Links:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
