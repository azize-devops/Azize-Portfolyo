---
title: "Linux Temelleri: Bandit ile Başlangıç Rehberim"
excerpt: "Linux yolculuğuma OverTheWire Bandit oyunu ile başladım. VirtualBox üzerinde Ubuntu kurarak pratik yaptım."
date: "2025-01-06"
readTime: "8 dk"
tags: ["linux", "beginner", "bandit"]
author: "Azize"
---

6 Ocak 2025'te bir karar aldım: Linux öğreneceğim. Ama nereden başlayacağımı bilmiyordum. Uzun yıllara dayanan sektörel tecrübesiyle Burhan'ın rehberliği beni [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) oyununa yönlendirdi. Bu oyun ve hocamın yaklaşımı, geleneksel eğitim anlayışının ötesine geçen, doğrudan sektörel yetkinlik kazandırmayı amaçlayan bir öğrenme sürecinin başlangıcı oldu.

## Bandit: Oyun Oynayarak Linux Öğrenmek

Bandit bir "wargame" - her seviyede bir sonraki seviyenin şifresini bulmanız gerekiyor. Kulağa basit geliyor ama işin güzel yanı şu: şifreyi bulmak için Linux komutlarını kullanmak zorundasınız. Oyun sizi öğrenmeye zorluyor.

İlk bağlantıyı kurmak bile bir ders:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

İlk seviyeler basitti. `cat readme` ile dosya okumak, `ls -la` ile gizli dosyaları görmek... Ama ilerledikçe işler zorlaştı. Mesela dosya adı sadece `-` olunca `cat -` çalışmıyor, `cat ./-` yazmanız gerekiyor. Boşluklu dosya isimleri için tırnak kullanmak gerektiğini de burada öğrendim.

5-10 arasındaki seviyelerde `find`, `grep`, `sort` gibi güçlü araçlarla tanıştım. Özellikle `find` komutu hayat kurtarıcı - belirli boyutta, belirli izinlere sahip dosyaları bulmak için mükemmel.

4 günde ilk 10 seviyeyi bitirdim. Kafamda artık temel Linux komutları oturmuştu.

## Gerçek Bir Linux Sisteme İhtiyaç Vardı

Bandit güzeldi ama başkasının sunucusunda oynamak yetmiyordu. Kendi sistemime ihtiyacım vardı - bir şeyleri kurup bozabileceğim, deneyebileceğim bir ortam.

Windows 11 bilgisayarıma [VirtualBox](https://www.virtualbox.org/) kurdum ve [Ubuntu Server](https://ubuntu.com/download/server) yükledim. Neden Desktop değil de Server? Çünkü amacım komut satırını öğrenmekti, güzel arayüzlere bakmak değil.

VM ayarlarım basitti: 2 GB RAM, 20 GB disk. Ağ ayarını "Bridged Adapter" yaptım ki Windows'tan Ubuntu'ya erişebileyim.

## İlk Günler: Her Şeyi Keşfetmek

Ubuntu kurulunca ilk yaptığım şey sistemi güncellemek oldu:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
```

Sonra dosya sistemini keşfetmeye başladım. Windows'taki C:, D: mantığı burada yok. Her şey tek bir kök dizinden (`/`) başlıyor. `/home` kullanıcı dosyaları için, `/etc` ayar dosyaları için, `/var` loglar için...

## İzinler: Linux'un Kalbi

Bir dosyayı çalıştıramayınca izinleri öğrenmek zorunda kaldım. Linux'ta her dosyanın sahibi var ve üç tür izin var: okuma (r), yazma (w), çalıştırma (x).

`ls -l` çıktısındaki `-rw-r--r--` gibi garip harfler artık anlam kazandı. `chmod +x script.sh` ile bir script'e çalıştırma izni vermek, `chmod 755` ile tam kontrol... Bunlar artık refleks oldu.

## İki Haftanın Sonunda

21 Ocak'a geldiğimde elimde somut bir şeyler vardı: Bandit'in ilk 10 seviyesini bitirmiştim, kendi Ubuntu sunucum çalışıyordu, temel komutları ezbere biliyordum.

Ama asıl öğrendiğim şey şuydu: Linux'u öğrenmenin en iyi yolu bir şeyleri bozmak. Snapshot alın, deneyin, bozun, geri alın, tekrar deneyin.

Şimdi sıra web sunucusu kurmakta. Apache ve Nginx beni bekliyor.

**Faydalı linkler:** [Bandit Oyunu](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
