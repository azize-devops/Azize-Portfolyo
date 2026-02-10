---
title: "My First Website with Apache on Ubuntu"
excerpt: "Apache installation on Ubuntu server in VirtualBox and the errors I encountered. From port conflicts to configuration issues."
date: "2025-01-22"
readTime: "10 min"
tags: ["linux", "apache", "web-server"]
author: "Azize"
---

After learning Linux basics, it was time to do something real: set up a web server. My goal was simple - get a website running on Ubuntu VM and access it from Windows. Sounds easy, right? It wasn't.

## Apache Installation: The Easy Part

[Apache](https://httpd.apache.org/) installation was really simple:

```bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
```

I was happy when I saw `active (running)`. I opened the VM's IP in the browser and... nothing. That's where the adventure began.

## First Error: Port Conflict

When I tried to restart Apache, red text appeared in the terminal:

```
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
```

Port 80 was already in use. I checked who was using it:

```bash
sudo lsof -i :80
```

Turns out another web server I had installed earlier for testing was still running. I had two options: stop it or change Apache's port. I chose to change the port - changed `Listen 80` to `Listen 8080` in `/etc/apache2/ports.conf`.

## Second Error: Typo!

When I started Apache, a new error:

```
AH02297: Cannot access directory "/etc/apache2/${APACHE_LOG_DIR]"
```

Looking carefully, I noticed: `${APACHE_LOG_DIR]` - I had used a square bracket instead of a curly brace! A one-character error took half an hour of my time. I learned the `sudo apache2ctl configtest` command - syntax checking after every change is a must.

## Creating the Website

Once errors were resolved, it was time for content. I created the `/var/www/mysite` folder and wrote a simple HTML file. Then Virtual Host configuration:

```bash
sudo nano /etc/apache2/sites-available/mysite.conf
```

I activated the site with `a2ensite mysite.conf`, disabled the default with `a2dissite 000-default.conf`. `sudo systemctl reload apache2` and...

I opened `http://192.0.2.100:8080` in the Windows browser. When I saw "Hello World!", I was really happy. A simple HTML page but a big step for me.

## Lessons Learned

Lessons from this experience:
- **Actually** reading error messages is important
- Always use `apache2ctl configtest`
- Check ports with `lsof -i :port`
- Don't forget the firewall: `sudo ufw allow 8080/tcp`

Nginx is next. They say it's lighter, faster. Let's see.

**Useful links:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
