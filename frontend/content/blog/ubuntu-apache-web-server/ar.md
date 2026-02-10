---
title: "موقعي الأول مع Apache على Ubuntu"
excerpt: "تثبيت Apache على خادم Ubuntu في VirtualBox والأخطاء التي واجهتها. من تعارض المنافذ إلى مشاكل الإعداد."
date: "2025-01-22"
readTime: "10 دقائق"
tags: ["linux", "apache", "web-server"]
author: "Azize"
---

بعد تعلم أساسيات Linux، حان الوقت لفعل شيء حقيقي: إعداد خادم ويب. كان هدفي بسيطاً - تشغيل موقع ويب على Ubuntu VM والوصول إليه من Windows. يبدو سهلاً، أليس كذلك؟ لم يكن كذلك.

## تثبيت Apache: الجزء السهل

كان تثبيت [Apache](https://httpd.apache.org/) بسيطاً حقاً:

```bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
```

فرحت عندما رأيت `active (running)`. فتحت IP الـ VM في المتصفح و... لا شيء. هنا بدأت المغامرة.

## الخطأ الأول: تعارض المنافذ

عندما حاولت إعادة تشغيل Apache، ظهر نص أحمر في الطرفية:

```
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
```

المنفذ 80 كان مستخدماً بالفعل. تحققت من يستخدمه:

```bash
sudo lsof -i :80
```

اتضح أن خادم ويب آخر كنت قد ثبته سابقاً للاختبار كان لا يزال يعمل. كان لدي خياران: إيقافه أو تغيير منفذ Apache. اخترت تغيير المنفذ - غيرت `Listen 80` إلى `Listen 8080` في `/etc/apache2/ports.conf`.

## الخطأ الثاني: خطأ مطبعي!

عندما شغلت Apache، خطأ جديد:

```
AH02297: Cannot access directory "/etc/apache2/${APACHE_LOG_DIR]"
```

بالنظر بعناية، لاحظت: `${APACHE_LOG_DIR]` - استخدمت قوس مربع بدلاً من قوس منحني! خطأ حرف واحد أخذ نصف ساعة من وقتي. تعلمت الأمر `sudo apache2ctl configtest` - فحص الصياغة بعد كل تغيير ضروري.

## إنشاء الموقع

بعد حل الأخطاء، حان وقت المحتوى. أنشأت مجلد `/var/www/mysite` وكتبت ملف HTML بسيط. ثم تكوين Virtual Host:

```bash
sudo nano /etc/apache2/sites-available/mysite.conf
```

فعّلت الموقع بـ `a2ensite mysite.conf`، وأوقفت الافتراضي بـ `a2dissite 000-default.conf`. `sudo systemctl reload apache2` ثم...

فتحت `http://192.0.2.100:8080` في متصفح Windows. عندما رأيت "مرحباً بالعالم!"، كنت سعيداً حقاً. صفحة HTML بسيطة لكنها خطوة كبيرة بالنسبة لي.

## الدروس المستفادة

دروس من هذه التجربة:
- قراءة رسائل الخطأ **فعلياً** مهم
- استخدم دائماً `apache2ctl configtest`
- تحقق من المنافذ بـ `lsof -i :port`
- لا تنس جدار الحماية: `sudo ufw allow 8080/tcp`

التالي هو Nginx. يقولون أنه أخف وأسرع. لنرى.

**روابط مفيدة:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
