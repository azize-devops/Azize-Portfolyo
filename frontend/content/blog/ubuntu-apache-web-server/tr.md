---
title: "Ubuntu'da Apache ile İlk Web Sitem"
excerpt: "VirtualBox üzerinde Ubuntu sunucuda Apache kurulumu ve karşılaştığım hatalar. Port çakışmasından konfigürasyon sorunlarına kadar her şey."
date: "2025-01-22"
readTime: "10 dk"
tags: ["linux", "apache", "web-server"]
author: "Azize"
---

Linux temellerini öğrendikten sonra sıra gerçek bir şey yapmaya geldi: web sunucusu kurmak. Hedefim basitti - Ubuntu VM'de bir web sitesi ayağa kaldırıp Windows'tan erişmek. Kulağa kolay geliyor, değil mi? Öyle olmadı.

## Apache Kurulumu: Kolay Kısım

[Apache](https://httpd.apache.org/) kurulumu gerçekten basitti:

```bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
```

`active (running)` yazısını görünce sevindim. Tarayıcıda VM'in IP'sini açtım ve... hiçbir şey. İşte macera burada başladı.

## İlk Hata: Port Çakışması

Apache'yi yeniden başlatmaya çalıştığımda terminalde kırmızı yazılar belirdi:

```
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
```

80 portu zaten kullanılıyordu. Kim kullanıyor diye baktım:

```bash
sudo lsof -i :80
```

Meğer daha önce test için kurduğum başka bir web sunucusu hala çalışıyormuş. İki seçenek vardı: onu durdurmak ya da Apache'nin portunu değiştirmek. Ben portu değiştirmeyi tercih ettim - `/etc/apache2/ports.conf` dosyasında `Listen 80` satırını `Listen 8080` yaptım.

## İkinci Hata: Typo!

Apache'yi başlattığımda yeni bir hata:

```
AH02297: Cannot access directory "/etc/apache2/${APACHE_LOG_DIR]"
```

Dikkatli bakınca fark ettim: `${APACHE_LOG_DIR]` - süslü parantez yerine köşeli parantez kullanmışım! Bir karakterlik hata, yarım saatimi aldı. `sudo apache2ctl configtest` komutunu öğrendim - her değişiklikten sonra syntax kontrolü yapmak şart.

## Web Sitesi Oluşturma

Hatalar çözülünce sıra içeriğe geldi. `/var/www/mysite` klasörü oluşturdum, basit bir HTML dosyası yazdım. Sonra Virtual Host yapılandırması:

```bash
sudo nano /etc/apache2/sites-available/mysite.conf
```

`a2ensite mysite.conf` ile siteyi aktif ettim, `a2dissite 000-default.conf` ile varsayılanı kapattım. `sudo systemctl reload apache2` ve...

Windows tarayıcısında `http://192.0.2.100:8080` açtım. "Merhaba Dünya!" yazısını gördüğümde gerçekten mutlu oldum. Basit bir HTML sayfası ama benim için büyük bir adımdı.

## Öğrendiğim Şeyler

Bu deneyimden çıkardığım dersler:
- Hata mesajlarını **gerçekten** okumak önemli
- `apache2ctl configtest` her zaman kullan
- `lsof -i :port` ile port kontrolü yap
- Firewall'u unutma: `sudo ufw allow 8080/tcp`

Sırada Nginx var. Daha hafif, daha hızlı diyorlar. Bakalım.

**Faydalı linkler:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
