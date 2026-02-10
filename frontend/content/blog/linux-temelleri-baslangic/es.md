---
title: "Fundamentos de Linux: Mi guía para principiantes con Bandit"
excerpt: "Comencé mi viaje en Linux con el juego OverTheWire Bandit. Practiqué configurando Ubuntu en VirtualBox."
date: "2025-01-06"
readTime: "8 min"
tags: ["linux", "beginner", "bandit"]
author: "Azize"
---

El 6 de enero de 2025, tomé una decisión: aprendería Linux. Pero no sabía por dónde empezar. Con años de experiencia en la industria, la guía de Burhan me llevó al juego [OverTheWire Bandit](https://overthewire.org/wargames/bandit/). Este juego y el enfoque de mi mentor marcaron el comienzo de un viaje de aprendizaje que va más allá de la educación tradicional, con el objetivo de proporcionar competencia industrial directa.

## Bandit: Aprendiendo Linux jugando

Bandit es un "wargame" - en cada nivel, necesitas encontrar la contraseña para el siguiente nivel. Suena simple, pero aquí está la belleza: tienes que usar comandos de Linux para encontrar la contraseña. El juego te obliga a aprender.

Incluso hacer la primera conexión es una lección:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Los primeros niveles fueron fáciles. Leer archivos con `cat readme`, ver archivos ocultos con `ls -la`... Pero a medida que avanzaba, las cosas se volvieron más difíciles. Por ejemplo, cuando un nombre de archivo es solo `-`, `cat -` no funciona, necesitas escribir `cat ./-`. También aprendí aquí que necesitas comillas para nombres de archivos con espacios.

En los niveles 5-10, conocí herramientas poderosas como `find`, `grep`, `sort`. Especialmente el comando `find` es un salvavidas - perfecto para encontrar archivos de un tamaño específico o con permisos específicos.

Completé los primeros 10 niveles en 4 días. Los comandos básicos de Linux se habían asentado en mi mente.

## Necesitaba un sistema Linux real

Bandit era genial, pero jugar en el servidor de otra persona no era suficiente. Necesitaba mi propio sistema - un entorno donde pudiera configurar y romper cosas.

Instalé [VirtualBox](https://www.virtualbox.org/) en mi computadora Windows 11 y configuré [Ubuntu Server](https://ubuntu.com/download/server). ¿Por qué Server en lugar de Desktop? Porque mi objetivo era aprender la línea de comandos, no mirar interfaces bonitas.

Mis configuraciones de VM fueron simples: 2 GB de RAM, 20 GB de disco. Configuré la red como "Bridged Adapter" para poder acceder a Ubuntu desde Windows.

## Primeros días: Descubriendo todo

Una vez instalado Ubuntu, lo primero que hice fue actualizar el sistema:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
```

Luego comencé a explorar el sistema de archivos. No hay lógica C:, D: como en Windows. Todo comienza desde un único directorio raíz (`/`). `/home` para archivos de usuario, `/etc` para archivos de configuración, `/var` para logs...

## Permisos: El corazón de Linux

Cuando no pude ejecutar un archivo, tuve que aprender sobre permisos. En Linux, cada archivo tiene un propietario y hay tres tipos de permisos: lectura (r), escritura (w), ejecución (x).

Las letras extrañas como `-rw-r--r--` en la salida de `ls -l` ahora tenían sentido. Dar permiso de ejecución a un script con `chmod +x script.sh`, control total con `chmod 755`... Esto se volvió un reflejo.

## Al final de dos semanas

Para el 21 de enero, tenía algo concreto: había completado los primeros 10 niveles de Bandit, mi propio servidor Ubuntu estaba funcionando, y conocía los comandos básicos de memoria.

Pero lo principal que aprendí fue: la mejor manera de aprender Linux es romper cosas. Toma snapshots, experimenta, rompe, restaura, intenta de nuevo.

Ahora es tiempo de configurar un servidor web. Apache y Nginx me esperan.

**Enlaces útiles:** [Juego Bandit](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
