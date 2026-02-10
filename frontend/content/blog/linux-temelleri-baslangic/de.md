---
title: "Linux-Grundlagen: Mein Anfängerleitfaden mit Bandit"
excerpt: "Ich begann meine Linux-Reise mit dem OverTheWire Bandit-Spiel. Ich übte, indem ich Ubuntu auf VirtualBox einrichtete."
date: "2025-01-06"
readTime: "8 Min"
tags: ["linux", "beginner", "bandit"]
author: "Azize"
---

Am 6. Januar 2025 traf ich eine Entscheidung: Ich würde Linux lernen. Aber ich wusste nicht, wo ich anfangen sollte. Mit jahrelanger Branchenerfahrung führte mich Burhans Anleitung zum [OverTheWire Bandit](https://overthewire.org/wargames/bandit/)-Spiel. Dieses Spiel und der Ansatz meines Mentors markierten den Beginn einer Lernreise, die über die traditionelle Bildung hinausgeht und darauf abzielt, direkte Branchenkompetenz zu vermitteln.

## Bandit: Linux lernen durch Spielen

Bandit ist ein "Wargame" - auf jeder Ebene müssen Sie das Passwort für die nächste Ebene finden. Es klingt einfach, aber hier ist das Schöne daran: Sie müssen Linux-Befehle verwenden, um das Passwort zu finden. Das Spiel zwingt Sie zum Lernen.

Selbst die erste Verbindung herzustellen ist eine Lektion:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Die ersten Level waren einfach. Dateien mit `cat readme` lesen, versteckte Dateien mit `ls -la` sehen... Aber je weiter ich kam, desto schwieriger wurde es. Wenn zum Beispiel ein Dateiname nur `-` ist, funktioniert `cat -` nicht, man muss `cat ./-` schreiben. Hier lernte ich auch, dass man für Dateinamen mit Leerzeichen Anführungszeichen braucht.

In den Leveln 5-10 lernte ich mächtige Werkzeuge wie `find`, `grep`, `sort` kennen. Besonders der `find`-Befehl ist ein Lebensretter - perfekt um Dateien einer bestimmten Größe oder mit bestimmten Berechtigungen zu finden.

Ich habe die ersten 10 Level in 4 Tagen abgeschlossen. Die grundlegenden Linux-Befehle hatten sich in meinem Kopf festgesetzt.

## Ich brauchte ein echtes Linux-System

Bandit war großartig, aber auf dem Server von jemand anderem zu spielen reichte nicht aus. Ich brauchte mein eigenes System - eine Umgebung, in der ich Dinge einrichten und kaputt machen konnte.

Ich installierte [VirtualBox](https://www.virtualbox.org/) auf meinem Windows 11-Computer und richtete [Ubuntu Server](https://ubuntu.com/download/server) ein. Warum Server statt Desktop? Weil mein Ziel war, die Kommandozeile zu lernen, nicht schöne Oberflächen anzuschauen.

Meine VM-Einstellungen waren einfach: 2 GB RAM, 20 GB Festplatte. Ich stellte das Netzwerk auf "Bridged Adapter", damit ich von Windows aus auf Ubuntu zugreifen konnte.

## Erste Tage: Alles erkunden

Nach der Installation von Ubuntu war das Erste, was ich tat, das System zu aktualisieren:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
```

Dann begann ich, das Dateisystem zu erkunden. Es gibt keine C:, D:-Logik wie in Windows. Alles beginnt von einem einzigen Wurzelverzeichnis (`/`). `/home` für Benutzerdateien, `/etc` für Konfigurationsdateien, `/var` für Logs...

## Berechtigungen: Das Herz von Linux

Als ich eine Datei nicht ausführen konnte, musste ich die Berechtigungen lernen. In Linux hat jede Datei einen Besitzer und es gibt drei Arten von Berechtigungen: Lesen (r), Schreiben (w), Ausführen (x).

Die seltsamen Buchstaben wie `-rw-r--r--` in der `ls -l`-Ausgabe ergaben jetzt Sinn. Einem Skript mit `chmod +x script.sh` Ausführungsrechte geben, volle Kontrolle mit `chmod 755`... Das wurde zum Reflex.

## Am Ende von zwei Wochen

Bis zum 21. Januar hatte ich etwas Konkretes: Ich hatte die ersten 10 Level von Bandit abgeschlossen, mein eigener Ubuntu-Server lief, und ich kannte die grundlegenden Befehle auswendig.

Aber die wichtigste Erkenntnis war: Der beste Weg, Linux zu lernen, ist Dinge kaputt zu machen. Machen Sie Snapshots, experimentieren Sie, machen Sie kaputt, stellen Sie wieder her, versuchen Sie es erneut.

Jetzt ist es Zeit, einen Webserver einzurichten. Apache und Nginx warten auf mich.

**Nützliche Links:** [Bandit-Spiel](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
