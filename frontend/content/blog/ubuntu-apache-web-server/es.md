---
title: "Mi primer sitio web con Apache en Ubuntu"
excerpt: "Instalación de Apache en servidor Ubuntu en VirtualBox y los errores que encontré. Desde conflictos de puertos hasta problemas de configuración."
date: "2025-01-22"
readTime: "10 min"
tags: ["linux", "apache", "web-server"]
author: "Azize"
---

Después de aprender los fundamentos de Linux, era hora de hacer algo real: configurar un servidor web. Mi objetivo era simple - tener un sitio web funcionando en Ubuntu VM y acceder desde Windows. Suena fácil, ¿verdad? No lo fue.

## Instalación de Apache: La parte fácil

La instalación de [Apache](https://httpd.apache.org/) fue realmente simple:

```bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
```

Me alegré cuando vi `active (running)`. Abrí la IP de la VM en el navegador y... nada. Ahí es donde comenzó la aventura.

## Primer error: Conflicto de puertos

Cuando intenté reiniciar Apache, apareció texto rojo en la terminal:

```
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
```

El puerto 80 ya estaba en uso. Comprobé quién lo estaba usando:

```bash
sudo lsof -i :80
```

Resulta que otro servidor web que había instalado antes para pruebas todavía estaba ejecutándose. Tenía dos opciones: detenerlo o cambiar el puerto de Apache. Elegí cambiar el puerto - cambié `Listen 80` a `Listen 8080` en `/etc/apache2/ports.conf`.

## Segundo error: ¡Error tipográfico!

Cuando inicié Apache, un nuevo error:

```
AH02297: Cannot access directory "/etc/apache2/${APACHE_LOG_DIR]"
```

Mirando cuidadosamente, noté: `${APACHE_LOG_DIR]` - ¡había usado un corchete en lugar de una llave! Un error de un carácter me tomó media hora. Aprendí el comando `sudo apache2ctl configtest` - la verificación de sintaxis después de cada cambio es imprescindible.

## Creando el sitio web

Una vez resueltos los errores, era hora del contenido. Creé la carpeta `/var/www/mysite` y escribí un archivo HTML simple. Luego la configuración de Virtual Host:

```bash
sudo nano /etc/apache2/sites-available/mysite.conf
```

Activé el sitio con `a2ensite mysite.conf`, desactivé el predeterminado con `a2dissite 000-default.conf`. `sudo systemctl reload apache2` y...

Abrí `http://192.0.2.100:8080` en el navegador de Windows. Cuando vi "¡Hola Mundo!", estaba realmente feliz. Una simple página HTML pero un gran paso para mí.

## Lecciones aprendidas

Lecciones de esta experiencia:
- Leer **realmente** los mensajes de error es importante
- Siempre usa `apache2ctl configtest`
- Verifica puertos con `lsof -i :port`
- No olvides el firewall: `sudo ufw allow 8080/tcp`

El siguiente es Nginx. Dicen que es más ligero y rápido. Veamos.

**Enlaces útiles:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
