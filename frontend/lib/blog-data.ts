// Blog post type
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
}

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "linux-temelleri-baslangic",
    title: "Linux Temelleri: Bandit ile Başlangıç Rehberim",
    excerpt:
      "Linux yolculuğuma OverTheWire Bandit oyunu ile başladım. VirtualBox üzerinde Ubuntu kurarak pratik yaptım. İşte öğrendiklerim.",
    date: "2025-01-06",
    readTime: "12 min",
    tags: ["linux", "beginner", "bandit"],
    author: { name: "Azize" },
    content: `
6 Ocak 2025'te bir karar aldım: Linux öğreneceğim. Ama nereden başlayacağımı bilmiyordum. YouTube'da saatlerce video izlemek yerine pratik yapabileceğim bir şey arıyordum. Araştırırken [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) oyununu keşfettim ve bu oyun her şeyi değiştirdi.

## Bandit: Oyun Oynayarak Linux Öğrenmek

Bandit bir "wargame" - her seviyede bir sonraki seviyenin şifresini bulmanız gerekiyor. Kulağa basit geliyor ama işin güzel yanı şu: şifreyi bulmak için Linux komutlarını kullanmak zorundasınız. Oyun sizi öğrenmeye zorluyor.

İlk bağlantıyı kurmak bile bir ders:

\`\`\`bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
\`\`\`

İlk seviyeler basitti. \`cat readme\` ile dosya okumak, \`ls -la\` ile gizli dosyaları görmek... Ama ilerledikçe işler zorlaştı. Mesela dosya adı sadece \`-\` olunca \`cat -\` çalışmıyor, \`cat ./-\` yazmanız gerekiyor. Boşluklu dosya isimleri için tırnak kullanmak gerektiğini de burada öğrendim.

5-10 arasındaki seviyelerde \`find\`, \`grep\`, \`sort\` gibi güçlü araçlarla tanıştım. Özellikle \`find\` komutu hayat kurtarıcı - belirli boyutta, belirli izinlere sahip dosyaları bulmak için mükemmel.

4 günde ilk 10 seviyeyi bitirdim. Kafamda artık temel Linux komutları oturmuştu.

## Gerçek Bir Linux Sisteme İhtiyaç Vardı

Bandit güzeldi ama başkasının sunucusunda oynamak yetmiyordu. Kendi sistemime ihtiyacım vardı - bir şeyleri kurup bozabileceğim, deneyebileceğim bir ortam.

Windows 11 bilgisayarıma [VirtualBox](https://www.virtualbox.org/) kurdum ve [Ubuntu Server](https://ubuntu.com/download/server) yükledim. Neden Desktop değil de Server? Çünkü amacım komut satırını öğrenmekti, güzel arayüzlere bakmak değil.

VM ayarlarım basitti: 2 GB RAM, 20 GB disk. Ağ ayarını "Bridged Adapter" yaptım ki Windows'tan Ubuntu'ya erişebileyim.

## İlk Günler: Her Şeyi Keşfetmek

Ubuntu kurulunca ilk yaptığım şey sistemi güncellemek oldu:

\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y net-tools curl wget vim git
\`\`\`

Sonra dosya sistemini keşfetmeye başladım. Windows'taki C:, D: mantığı burada yok. Her şey tek bir kök dizinden (\`/\`) başlıyor. \`/home\` kullanıcı dosyaları için, \`/etc\` ayar dosyaları için, \`/var\` loglar için...

En çok kullandığım komutlar şunlar oldu:

\`\`\`bash
pwd           # Neredeyim?
ls -la        # Klasör içeriği (gizli dosyalar dahil)
cd /var/log   # Dizin değiştir
cat dosya.txt # Dosya içeriğini göster
\`\`\`

## İzinler: Linux'un Kalbi

Bir dosyayı çalıştıramayınca izinleri öğrenmek zorunda kaldım. Linux'ta her dosyanın sahibi var ve üç tür izin var: okuma (r), yazma (w), çalıştırma (x).

\`ls -l\` çıktısındaki \`-rw-r--r--\` gibi garip harfler artık anlam kazandı. İlk üçlü dosya sahibi için, ikinci üçlü grup için, son üçlü herkes için.

\`chmod +x script.sh\` ile bir script'e çalıştırma izni vermek, \`chmod 755\` ile tam kontrol... Bunlar artık refleks oldu.

## İki Haftanın Sonunda

21 Ocak'a geldiğimde elimde somut bir şeyler vardı: Bandit'in ilk 10 seviyesini bitirmiştim, kendi Ubuntu sunucum çalışıyordu, temel komutları ezbere biliyordum.

Ama asıl öğrendiğim şey şuydu: Linux'u öğrenmenin en iyi yolu bir şeyleri bozmak. Snapshot alın, deneyin, bozun, geri alın, tekrar deneyin.

Şimdi sıra web sunucusu kurmakta. Apache ve Nginx beni bekliyor.

**Faydalı linkler:** [Bandit Oyunu](https://overthewire.org/wargames/bandit/) | [Linux Man Pages](https://man7.org/linux/man-pages/index.html) | [VirtualBox](https://www.virtualbox.org/)
    `,
  },
  {
    id: "2",
    slug: "ubuntu-apache-web-server",
    title: "Ubuntu'da Apache ile İlk Web Sitem",
    excerpt:
      "VirtualBox üzerinde Ubuntu sunucuda Apache (httpd) kurulumu, yapılandırması ve host makineden erişim. Karşılaştığım hatalar ve çözümleri.",
    date: "2025-01-22",
    readTime: "15 min",
    tags: ["linux", "apache", "web-server"],
    author: { name: "Azize" },
    content: `
## Görev: Apache ile Web Sitesi

Bu görevde amacım VirtualBox'taki Ubuntu sunucuda Apache (httpd) servisi ile bir web sitesi ayağa kaldırıp, Windows host makineden erişmekti.

## Apache Nedir?

Apache HTTP Server (httpd), dünyanın en popüler web sunucu yazılımlarından biri. Web sitelerinizi barındırmak için kullanılır.

## Kurulum

\`\`\`bash
# Sistem güncellemesi
sudo apt update

# Apache2 kurulumu
sudo apt install apache2

# Servis durumunu kontrol et
sudo systemctl status apache2
\`\`\`

\`active (running)\` görmelisiniz. Görmüyorsanız:

\`\`\`bash
sudo systemctl start apache2
sudo systemctl enable apache2  # Açılışta başlat
\`\`\`

---

## Karşılaştığım İlk Hata: Port Çakışması

Apache'yi başlatmaya çalıştığımda şu hatayı aldım:

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

### Sorun Neydi?

80 numaralı port başka bir uygulama tarafından kullanılıyordu (daha önce test için kurduğum başka bir web sunucusu).

### Çözüm: Portu Kullananı Bul

\`\`\`bash
# 80 portunu kim kullanıyor?
sudo lsof -i :80

# Çıktı:
# COMMAND   PID USER   TYPE DEVICE SIZE/OFF NODE NAME
# merecat   1234 root  IPv4  12345      0t0  TCP *:http (LISTEN)
\`\`\`

### İki Seçenek Vardı:

**Seçenek 1:** Diğer servisi durdur
\`\`\`bash
sudo kill -9 1234
# veya
sudo systemctl stop merecat
\`\`\`

**Seçenek 2:** Apache'nin portunu değiştir (Ben bunu tercih ettim)
\`\`\`bash
sudo nano /etc/apache2/ports.conf

# Listen 80 → Listen 8080 olarak değiştir
\`\`\`

Port değişikliğinden sonra:
\`\`\`bash
sudo systemctl restart apache2
\`\`\`

---

## İkinci Hata: Konfigürasyon Hatası

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

Dikkatli bakınca gördüm: \`\${APACHE_LOG_DIR]\` - Süslü parantez yerine köşeli parantez kullanmışım!

### Hata Nasıl Bulunur?

\`\`\`bash
# Apache konfigürasyonunu test et
sudo apache2ctl configtest

# Daha detaylı log
sudo journalctl -xe | grep apache2
\`\`\`

---

## Web Sitesi Oluşturma

### 1. Site Dizini Oluştur

\`\`\`bash
# Web sitesi için klasör
sudo mkdir -p /var/www/mysite

# Sahiplik ve izinler
sudo chown -R $USER:$USER /var/www/mysite
sudo chmod -R 755 /var/www/mysite
\`\`\`

### 2. HTML Dosyası Oluştur

\`\`\`bash
nano /var/www/mysite/index.html
\`\`\`

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>İlk Web Sitem</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Merhaba Dünya!</h1>
    <p>Bu benim Apache ile oluşturduğum ilk web sitem.</p>
    <p>Tarih: Ocak 2025</p>
</body>
</html>
\`\`\`

### 3. Virtual Host Yapılandırması

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

\`\`\`apache
<VirtualHost *:8080>
    ServerAdmin admin@mysite.local
    ServerName mysite.local
    DocumentRoot /var/www/mysite

    ErrorLog \${APACHE_LOG_DIR}/mysite-error.log
    CustomLog \${APACHE_LOG_DIR}/mysite-access.log combined

    <Directory /var/www/mysite>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
\`\`\`

### 4. Siteyi Aktifleştir

\`\`\`bash
# Kendi sitemizi aktif et
sudo a2ensite mysite.conf

# Default siteyi devre dışı bırak
sudo a2dissite 000-default.conf

# Konfigürasyonu test et
sudo apache2ctl configtest

# Apache'yi yeniden yükle
sudo systemctl reload apache2
\`\`\`

---

## Host Makineden Erişim

### Ubuntu IP Adresini Bul

\`\`\`bash
ip addr
# veya
hostname -I
# Örnek: 192.0.2.100
\`\`\`

### Windows'tan Test

1. **Ping testi:**
\`\`\`cmd
ping 192.0.2.100
\`\`\`

2. **Tarayıcıda aç:**
\`\`\`
http://192.0.2.100:8080
\`\`\`

> **İpucu:** Gizli sekme kullanın (Ctrl+Shift+N). Tarayıcı cache'i bazen sorun çıkarır.

### Erişim Sorunu Varsa

1. **Firewall kontrol:**
\`\`\`bash
sudo ufw status
sudo ufw allow 8080/tcp
\`\`\`

2. **VirtualBox Network ayarları:**
   - Bridged Adapter kullanın
   - Veya NAT + Port Forwarding

---

## Öğrendiklerim

| Komut | Açıklama |
|-------|----------|
| \`systemctl status/start/stop/restart\` | Servis yönetimi |
| \`a2ensite / a2dissite\` | Apache site aktif/pasif |
| \`apache2ctl configtest\` | Konfigürasyon testi |
| \`lsof -i :port\` | Portu kullanan process |
| \`chown / chmod\` | Sahiplik ve izin yönetimi |

## Sonuç

Apache kurulumu basit görünse de:
- Port çakışmaları
- İzin sorunları
- Konfigürasyon hataları

...gibi durumlarla karşılaşabilirsiniz. Önemli olan hata mesajlarını **okumak** ve **anlamak**.

Bir sonraki yazıda Nginx'e geçiyoruz!
    `,
  },
  {
    id: "3",
    slug: "ubuntu-streamlit-uygulama",
    title: "Ubuntu'da Streamlit Uygulaması Çalıştırma",
    excerpt:
      "Python, pip ve virtual environment kurulumu. Streamlit ile basit bir uygulama oluşturma ve GitHub'dan proje klonlama.",
    date: "2025-01-23",
    readTime: "10 min",
    tags: ["linux", "python", "streamlit"],
    author: { name: "Azize" },
    content: `
## Görev: Streamlit Uygulaması

Bu görevde Ubuntu sunucuda bir Streamlit uygulaması ayağa kaldırıp host makineden erişeceğiz.

## Streamlit Nedir?

[Streamlit](https://streamlit.io/), Python ile hızlıca web uygulamaları oluşturmanızı sağlayan bir framework. Özellikle data science ve ML projeleri için popüler.

## Python ve Pip Kurulumu

\`\`\`bash
# Python ve pip kurulumu
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Versiyon kontrolü
python3 --version
pip3 --version
\`\`\`

---

## Virtual Environment (Sanal Ortam)

### Neden Sanal Ortam?

- **İzolasyon:** Her proje kendi bağımlılıklarına sahip
- **Çakışma önleme:** Farklı projelerde farklı paket versiyonları
- **Temiz sistem:** Ana Python kurulumunu kirletmezsiniz
- **Kolay paylaşım:** requirements.txt ile bağımlılıkları paylaşabilirsiniz

### Sanal Ortam Oluşturma

\`\`\`bash
# Proje klasörü oluştur
mkdir ~/streamlit-app
cd ~/streamlit-app

# Sanal ortam oluştur
python3 -m venv env

# Sanal ortamı aktifleştir
source env/bin/activate

# Artık prompt'ta (env) görünecek:
# (env) azize@ubuntu:~/streamlit-app$
\`\`\`

---

## Streamlit Kurulumu

\`\`\`bash
# Sanal ortam aktifken
pip install streamlit

# Kurulumu doğrula
streamlit --version
\`\`\`

## İlk Streamlit Uygulaması

\`\`\`bash
nano app.py
\`\`\`

\`\`\`python
import streamlit as st

st.set_page_config(page_title="İlk Streamlit App", page_icon="🚀")

st.title("🎉 Merhaba Streamlit!")
st.write("Bu benim ilk Streamlit uygulamam.")

# Kullanıcı girişi
name = st.text_input("Adınız nedir?")
if name:
    st.write(f"Merhaba, {name}! 👋")

# Slider
age = st.slider("Yaşınız?", 0, 100, 25)
st.write(f"Yaşınız: {age}")

# Buton
if st.button("Tıkla!"):
    st.balloons()
    st.success("Butona tıkladınız!")
\`\`\`

### Uygulamayı Çalıştır

\`\`\`bash
streamlit run app.py --server.address 0.0.0.0

# Çıktı:
# You can now view your Streamlit app in your browser.
# Network URL: http://192.0.2.100:8501
\`\`\`

> \`--server.address 0.0.0.0\` parametresi, uygulamanın dışarıdan erişilebilir olmasını sağlar.

---

## GitHub'dan Proje Klonlama

### Adımlar

\`\`\`bash
# Yeni klasör
mkdir ~/streamlit-projects
cd ~/streamlit-projects

# Sanal ortam
python3 -m venv .venv
source .venv/bin/activate

# Streamlit kur
pip install streamlit

# GitHub'dan klonla
git clone https://github.com/streamlit/demo-uber-nyc-pickups.git

# Proje dizinine gir
cd demo-uber-nyc-pickups

# Bağımlılıkları yükle
pip install -r requirements.txt

# Çalıştır
streamlit run streamlit_app.py --server.address 0.0.0.0
\`\`\`

---

## Host Makineden Erişim

Windows tarayıcınızda:
\`\`\`
http://192.0.2.100:8501
\`\`\`

### Firewall Ayarı

\`\`\`bash
sudo ufw allow 8501/tcp
\`\`\`

---

## Faydalı Komutlar

| Komut | Açıklama |
|-------|----------|
| \`python3 -m venv env\` | Sanal ortam oluştur |
| \`source env/bin/activate\` | Sanal ortamı aktifleştir |
| \`deactivate\` | Sanal ortamdan çık |
| \`pip install -r requirements.txt\` | Bağımlılıkları yükle |
| \`pip freeze > requirements.txt\` | Bağımlılıkları kaydet |

## Öğrendiklerim

- Python virtual environment kullanımı
- Pip ile paket yönetimi
- Streamlit ile hızlı web uygulaması
- GitHub'dan proje klonlama ve çalıştırma

Sonraki görevde Nginx ile API endpoint oluşturacağız!
    `,
  },
  {
    id: "4",
    slug: "nginx-healtz-endpoint",
    title: "Nginx ile /healtz Health Check Endpoint",
    excerpt:
      "Nginx kurulumu ve yapılandırması. /healtz path'ine istek geldiğinde 200 OK dönen bir endpoint oluşturma.",
    date: "2025-01-24",
    readTime: "8 min",
    tags: ["linux", "nginx", "web-server"],
    author: { name: "Azize" },
    content: `
## Görev: Nginx Health Check Endpoint

Bu görevde Nginx kurarak \`/healtz\` endpoint'i oluşturacağız. Bu endpoint'e istek atıldığında "istek başarılı" mesajı dönecek.

## Nginx Nedir?

[Nginx](https://nginx.org/) (Engine-X olarak okunur), yüksek performanslı bir web sunucusu ve reverse proxy. Apache'ye göre daha hafif ve hızlı.

## Kurulum

\`\`\`bash
sudo apt update
sudo apt install nginx

# Durumu kontrol et
sudo systemctl status nginx
\`\`\`

Tarayıcıda \`http://192.0.2.100\` açın, Nginx welcome sayfasını görmelisiniz.

---

## /healtz Endpoint Oluşturma

### Yapılandırma Dosyası

Nginx yapılandırması \`/etc/nginx/sites-available/\` dizininde bulunur.

\`\`\`bash
sudo nano /etc/nginx/sites-available/default
\`\`\`

### Location Block Ekleme

\`server\` bloğunun içine şunu ekleyin:

\`\`\`nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html;

    server_name _;

    # Health check endpoint
    location /healtz {
        return 200 "istek başarılı\\n";
        add_header Content-Type text/plain;
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
\`\`\`

### Yapılandırmayı Test Et ve Uygula

\`\`\`bash
# Syntax kontrolü
sudo nginx -t

# Çıktı:
# nginx: configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# Nginx'i yeniden yükle
sudo systemctl reload nginx
\`\`\`

---

## Test

### Ubuntu'dan (localhost)

\`\`\`bash
curl http://localhost/healtz

# Çıktı:
# istek başarılı
\`\`\`

### Detaylı Çıktı

\`\`\`bash
curl -v http://localhost/healtz

# Çıktı:
# < HTTP/1.1 200 OK
# < Content-Type: text/plain
# <
# istek başarılı
\`\`\`

### Windows Host'tan

**CMD veya PowerShell:**
\`\`\`cmd
curl http://192.0.2.100/healtz
\`\`\`

**Tarayıcıda:**
\`\`\`
http://192.0.2.100/healtz
\`\`\`

---

## Nginx Dizin Yapısı

\`\`\`
/etc/nginx/
├── nginx.conf              # Ana yapılandırma
├── sites-available/        # Mevcut site yapılandırmaları
│   └── default
├── sites-enabled/          # Aktif site yapılandırmaları (symlink)
│   └── default -> ../sites-available/default
└── conf.d/                 # Ek yapılandırmalar
\`\`\`

### sites-available vs sites-enabled

- **sites-available:** Tüm site yapılandırmaları burada
- **sites-enabled:** Aktif olanlar burada (symlink olarak)

\`\`\`bash
# Site aktifleştirme
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/

# Site devre dışı bırakma
sudo rm /etc/nginx/sites-enabled/mysite
\`\`\`

---

## HTTP Durum Kodları

| Kod | Anlamı | Kullanım |
|-----|--------|----------|
| 200 | OK | Başarılı istek |
| 301 | Moved Permanently | Kalıcı yönlendirme |
| 302 | Found | Geçici yönlendirme |
| 404 | Not Found | Sayfa bulunamadı |
| 500 | Internal Server Error | Sunucu hatası |
| 502 | Bad Gateway | Proxy hatası |
| 503 | Service Unavailable | Servis kullanılamaz |

---

## Faydalı Nginx Komutları

\`\`\`bash
# Yapılandırma testi
sudo nginx -t

# Nginx başlat/durdur/yeniden başlat
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx

# Yapılandırma değişikliği sonrası (kesintisiz)
sudo systemctl reload nginx

# Logları görüntüle
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
\`\`\`

## Öğrendiklerim

- Nginx kurulumu ve temel yapılandırması
- Location block ile path routing
- HTTP status code döndürme
- Yapılandırma testi ve reload

Sonraki görevde Socket.io chat uygulaması çalıştıracağız!
    `,
  },
  {
    id: "5",
    slug: "socketio-chat-uygulamasi",
    title: "Socket.io Chat Uygulaması Kurulumu",
    excerpt:
      "GitHub'dan Socket.io tabanlı bir chat uygulaması klonlayıp Ubuntu sunucuda çalıştırma ve host makineden erişim.",
    date: "2025-01-25",
    readTime: "8 min",
    tags: ["linux", "nodejs", "socketio"],
    author: { name: "Azize" },
    content: `
## Görev: Socket.io Chat Uygulaması

Bu görevde GitHub'dan bir Socket.io chat uygulaması klonlayıp çalıştıracağız.

## Socket.io Nedir?

[Socket.io](https://socket.io/), gerçek zamanlı (real-time) uygulamalar için kullanılan bir JavaScript kütüphanesi. WebSocket protokolünü kullanarak anlık iletişim sağlar.

### Kullanım Alanları:
- Chat uygulamaları
- Canlı bildirimler
- Multiplayer oyunlar
- Canlı dashboard'lar

---

## Node.js Kurulumu

Socket.io bir Node.js kütüphanesi, önce Node.js kurmalıyız:

\`\`\`bash
# Node.js repository ekle
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Node.js ve npm kurulumu
sudo apt install -y nodejs

# Versiyon kontrolü
node --version
npm --version
\`\`\`

---

## GitHub'dan Proje Klonlama

### Adımlar

\`\`\`bash
# Proje klasörü
mkdir ~/chat-app
cd ~/chat-app

# GitHub'dan klonla (örnek proje)
git clone https://github.com/socketio/chat-example.git

# Proje dizinine gir
cd chat-example

# Bağımlılıkları yükle
npm install
\`\`\`

### package.json Kontrolü

\`\`\`bash
cat package.json
\`\`\`

\`scripts\` bölümüne bakarak nasıl çalıştırılacağını öğrenin:

\`\`\`json
{
  "scripts": {
    "start": "node index.js"
  }
}
\`\`\`

---

## Uygulamayı Çalıştırma

\`\`\`bash
# Başlat
npm start

# veya direkt
node index.js

# Çıktı:
# listening on *:3000
\`\`\`

### Dış Erişim İçin

Bazı uygulamalar sadece localhost'ta dinler. \`index.js\` dosyasını düzenleyin:

\`\`\`javascript
// Önce
app.listen(3000);

// Sonra
app.listen(3000, '0.0.0.0');
\`\`\`

---

## Host Makineden Erişim

Windows tarayıcınızda:
\`\`\`
http://192.0.2.100:3000
\`\`\`

### Firewall

\`\`\`bash
sudo ufw allow 3000/tcp
\`\`\`

---

## Arka Planda Çalıştırma

Terminal kapatınca uygulama durmasın:

### Seçenek 1: nohup

\`\`\`bash
nohup npm start &
# Çıktılar nohup.out dosyasına yazılır
\`\`\`

### Seçenek 2: screen

\`\`\`bash
# screen kur
sudo apt install screen

# Yeni screen oturumu
screen -S chat

# Uygulamayı başlat
npm start

# Screen'den çık (Ctrl+A, sonra D)

# Tekrar bağlan
screen -r chat
\`\`\`

### Seçenek 3: PM2 (Önerilen)

\`\`\`bash
# PM2 kur
sudo npm install -g pm2

# Uygulamayı başlat
pm2 start index.js --name "chat-app"

# Durumu gör
pm2 status

# Logları gör
pm2 logs chat-app

# Yeniden başlat
pm2 restart chat-app

# Durdur
pm2 stop chat-app
\`\`\`

---

## Basit Chat Uygulaması (Bonus)

Kendi chat uygulamanızı yazın:

**index.js:**
\`\`\`javascript
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Kullanıcı bağlandı');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı');
  });
});

http.listen(3000, '0.0.0.0', () => {
  console.log('Chat sunucusu: http://localhost:3000');
});
\`\`\`

**index.html:**
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Chat</title>
  <style>
    #messages { list-style: none; padding: 0; }
    #messages li { padding: 5px 10px; background: #f4f4f4; margin: 5px 0; }
  </style>
</head>
<body>
  <ul id="messages"></ul>
  <form id="form">
    <input id="input" placeholder="Mesajınız..." />
    <button>Gönder</button>
  </form>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });

    socket.on('chat message', (msg) => {
      const li = document.createElement('li');
      li.textContent = msg;
      messages.appendChild(li);
    });
  </script>
</body>
</html>
\`\`\`

## Öğrendiklerim

- Node.js ve npm kurulumu
- GitHub'dan proje klonlama
- Socket.io ile real-time uygulama
- PM2 ile process yönetimi

Son görevde tüm uygulamaları Nginx reverse proxy ile birleştireceğiz!
    `,
  },
  {
    id: "6",
    slug: "nginx-reverse-proxy",
    title: "Nginx Reverse Proxy: Tüm Uygulamaları Tek Noktadan Yönetme",
    excerpt:
      "Apache, Streamlit, Socket.io ve Nginx'i tek bir sunucuda çalıştırıp, Nginx reverse proxy ile farklı path'lere yönlendirme.",
    date: "2025-01-26",
    readTime: "12 min",
    tags: ["linux", "nginx", "reverse-proxy"],
    author: { name: "Azize" },
    content: `
## Görev: Nginx Reverse Proxy

Bu son görevde tüm uygulamaları aynı anda çalıştırıp, Nginx'i reverse proxy olarak yapılandıracağız:

- \`/healtz\` → Nginx (200 OK)
- \`/chat\` → Socket.io uygulaması (port 3001)
- \`/emoji\` → Streamlit uygulaması (port 8501)
- \`/webapp\` → Apache web sitesi (port 8080)

## Reverse Proxy Nedir?

Reverse proxy, client ile backend sunucular arasında duran bir ara katmandır:

\`\`\`
Client → Nginx (80) → Apache (8080)
                   → Streamlit (8501)
                   → Socket.io (3001)
\`\`\`

### Avantajları:
- **Tek giriş noktası:** Tüm uygulamalar tek IP/port üzerinden
- **SSL termination:** HTTPS'i tek noktada yönetme
- **Load balancing:** Yükü dağıtma
- **Güvenlik:** Backend sunucuları gizleme

---

## Uygulamaları Farklı Portlarda Başlat

### 1. Apache (8080)

\`\`\`bash
# /etc/apache2/ports.conf
Listen 8080

# Restart
sudo systemctl restart apache2
\`\`\`

### 2. Streamlit (8501)

\`\`\`bash
cd ~/streamlit-app
source env/bin/activate
streamlit run app.py --server.port 8501 --server.address 0.0.0.0
\`\`\`

### 3. Socket.io Chat (3001)

\`\`\`bash
cd ~/chat-app/chat-example
# index.js'de port: 3001
node index.js
\`\`\`

---

## Nginx Reverse Proxy Yapılandırması

\`\`\`bash
sudo nano /etc/nginx/sites-available/default
\`\`\`

\`\`\`nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    # Health check endpoint
    location /healtz {
        return 200 "istek başarılı\\n";
        add_header Content-Type text/plain;
    }

    # Socket.io chat uygulaması
    location /chat {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Streamlit uygulaması
    location /emoji {
        proxy_pass http://localhost:8501;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Apache web uygulaması
    location /webapp {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Default
    location / {
        root /var/www/html;
        index index.html;
    }
}
\`\`\`

### Önemli Header'lar

| Header | Açıklama |
|--------|----------|
| \`Upgrade\` | WebSocket bağlantısı için |
| \`Connection\` | Bağlantı tipini belirtir |
| \`X-Real-IP\` | Gerçek client IP'si |
| \`X-Forwarded-For\` | Proxy zincirindeki IP'ler |

---

## Yapılandırmayı Uygula

\`\`\`bash
# Syntax kontrolü
sudo nginx -t

# Nginx'i yeniden yükle
sudo systemctl reload nginx
\`\`\`

---

## Test

### Tüm Endpoint'leri Test Et

\`\`\`bash
# Health check
curl http://localhost/healtz
# Çıktı: istek başarılı

# Chat
curl http://localhost/chat
# Socket.io uygulaması yanıt verir

# Streamlit
curl http://localhost/emoji
# Streamlit uygulaması yanıt verir

# Apache
curl http://localhost/webapp
# Apache web sitesi yanıt verir
\`\`\`

### Host Makineden

\`\`\`
http://192.0.2.100/healtz
http://192.0.2.100/chat
http://192.0.2.100/emoji
http://192.0.2.100/webapp
\`\`\`

---

## Sorun Giderme

### 502 Bad Gateway

Backend uygulaması çalışmıyor:
\`\`\`bash
# Process'leri kontrol et
sudo lsof -i :3001
sudo lsof -i :8501
sudo lsof -i :8080
\`\`\`

### 404 Not Found

Path yanlış veya uygulama o path'i tanımıyor.

### WebSocket Bağlantı Sorunu

Header'ları kontrol edin:
\`\`\`nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
\`\`\`

---

## Tüm Servisleri Yönetme

### Başlatma Script'i

\`\`\`bash
nano ~/start-all.sh
\`\`\`

\`\`\`bash
#!/bin/bash

echo "Apache başlatılıyor..."
sudo systemctl start apache2

echo "Nginx başlatılıyor..."
sudo systemctl start nginx

echo "Streamlit başlatılıyor..."
cd ~/streamlit-app && source env/bin/activate && nohup streamlit run app.py --server.port 8501 --server.address 0.0.0.0 &

echo "Chat uygulaması başlatılıyor..."
cd ~/chat-app/chat-example && nohup node index.js &

echo "Tüm servisler başlatıldı!"
\`\`\`

\`\`\`bash
chmod +x ~/start-all.sh
~/start-all.sh
\`\`\`

---

## Sonuç: Linux Öğrenme Yolculuğum

Bu 3 haftalık süreçte:

1. ✅ **Bandit** ile Linux komutlarını öğrendim
2. ✅ **VirtualBox** ile VM yönetimini deneyimledim
3. ✅ **Apache** ile web sunucusu kurdum
4. ✅ **Streamlit** ile Python web uygulaması çalıştırdım
5. ✅ **Nginx** ile health check endpoint oluşturdum
6. ✅ **Socket.io** ile real-time uygulama çalıştırdım
7. ✅ **Nginx Reverse Proxy** ile hepsini birleştirdim

### Öğrendiğim En Önemli Şeyler:

- **Hata mesajlarını okumak** - En önemli beceri
- **Log dosyalarını takip etmek** - \`tail -f\`
- **Dokümantasyon okumak** - \`man\` komutu
- **Deneme yanılma** - VM'de snapshot al, boz, düzelt

DevOps yolculuğum daha yeni başlıyor. Sırada Docker ve Kubernetes var!
    `,
  },
  {
    id: "7",
    slug: "docker-container-nedir",
    title: "Docker Container Nedir? Neden Kullanmalıyız?",
    excerpt:
      "Container teknolojisinin temellerini öğrenin. Docker ile ilk container'ınızı oluşturun.",
    date: "2025-02-10",
    readTime: "10 min",
    tags: ["docker", "containers"],
    author: { name: "Azize" },
    content: `
## Container Nedir?

Container, bir uygulamayı ve tüm bağımlılıklarını izole bir ortamda çalıştırmamızı sağlayan hafif bir sanallaştırma teknolojisidir. Sanal makinelerden farklı olarak, container'lar işletim sistemi çekirdeğini host ile paylaşır.

## Docker Nedir?

Docker, container'ları oluşturmak, dağıtmak ve çalıştırmak için kullanılan bir platformdur. 2013 yılında piyasaya sürülmüş ve container teknolojisini popülerleştirmiştir.

## Container vs Sanal Makine

| Özellik | Container | Sanal Makine |
|---------|-----------|--------------|
| Başlangıç süresi | Saniyeler | Dakikalar |
| Boyut | MB | GB |
| Performans | Native'e yakın | Overhead var |
| İzolasyon | Process seviyesi | Tam izolasyon |

## Docker Kurulumu

\`\`\`bash
# Ubuntu'da Docker kurulumu
sudo apt update
sudo apt install docker.io

# Docker servisini başlatma
sudo systemctl start docker
sudo systemctl enable docker

# Kullanıcıyı docker grubuna ekleme
sudo usermod -aG docker $USER
\`\`\`

## İlk Container'ınız

\`\`\`bash
# Hello World container'ı çalıştırma
docker run hello-world

# Nginx container'ı çalıştırma
docker run -d -p 8080:80 nginx

# Çalışan container'ları listeleme
docker ps

# Tüm container'ları listeleme
docker ps -a

# Container loglarını görme
docker logs <container_id>

# Container'ı durdurma
docker stop <container_id>

# Container'ı silme
docker rm <container_id>
\`\`\`

## Dockerfile Oluşturma

\`\`\`dockerfile
# Base image
FROM node:18-alpine

# Çalışma dizini
WORKDIR /app

# Bağımlılıkları kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodunu kopyala
COPY . .

# Port
EXPOSE 3000

# Başlatma komutu
CMD ["npm", "start"]
\`\`\`

## Docker Compose

Birden fazla container'ı yönetmek için Docker Compose kullanılır:

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
\`\`\`

## Sonuç

Docker, modern yazılım geliştirme ve deployment süreçlerinin vazgeçilmez bir parçası haline gelmiştir. Container teknolojisini öğrenmek, DevOps yolculuğunuzda önemli bir adımdır.
    `,
  },
  {
    id: "8",
    slug: "kubernetes-giris",
    title: "Kubernetes'e Giriş: Pod, Deployment ve Service",
    excerpt:
      "Kubernetes'in temel kavramlarını öğrenin. İlk uygulamanızı Kubernetes üzerinde deploy edin.",
    date: "2025-03-20",
    readTime: "15 min",
    tags: ["kubernetes", "containers"],
    author: { name: "Azize" },
    content: `
## Kubernetes Nedir?

Kubernetes (K8s), container'ları orchestrate etmek için kullanılan açık kaynaklı bir platformdur. Google tarafından geliştirilmiş ve 2014'te açık kaynak olarak yayınlanmıştır.

## Neden Kubernetes?

- **Otomatik scaling** - Yüke göre container sayısını ayarlar
- **Self-healing** - Başarısız container'ları yeniden başlatır
- **Load balancing** - Trafiği container'lar arasında dağıtır
- **Rolling updates** - Kesintisiz güncelleme yapar
- **Secret management** - Hassas verileri güvenli saklar

## Temel Kavramlar

### Pod

Pod, Kubernetes'in en küçük deploy edilebilir birimidir. Bir veya daha fazla container içerebilir.

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
\`\`\`

### Deployment

Deployment, Pod'ların declarative güncellemelerini sağlar.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
\`\`\`

### Service

Service, Pod'lara erişim sağlayan bir soyutlama katmanıdır.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
\`\`\`

## Kubectl Komutları

\`\`\`bash
# Cluster bilgisi
kubectl cluster-info

# Node'ları listeleme
kubectl get nodes

# Pod'ları listeleme
kubectl get pods

# Deployment oluşturma
kubectl apply -f deployment.yaml

# Pod loglarını görme
kubectl logs <pod-name>

# Pod'a bağlanma
kubectl exec -it <pod-name> -- /bin/sh

# Deployment ölçekleme
kubectl scale deployment nginx-deployment --replicas=5

# Rolling update
kubectl set image deployment/nginx-deployment nginx=nginx:1.22
\`\`\`

## Minikube ile Yerel Cluster

\`\`\`bash
# Minikube kurulumu
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Cluster başlatma
minikube start

# Dashboard açma
minikube dashboard
\`\`\`

## Sonuç

Kubernetes öğrenmek zaman alır ama modern cloud-native uygulamalar için vazgeçilmezdir. CKA ve CKAD sertifikaları, Kubernetes bilginizi kanıtlamak için harika bir yoldur.
    `,
  },
  {
    id: "9",
    slug: "cka-ckad-hazirlik",
    title: "CKA ve CKAD Sınavlarına Nasıl Hazırlandım?",
    excerpt:
      "Kubernetes sertifikasyon sınavlarına hazırlık sürecim, kullandığım kaynaklar ve ipuçları.",
    date: "2026-01-10",
    readTime: "12 min",
    tags: ["kubernetes", "certifications"],
    author: { name: "Azize" },
    content: `
## Sertifikalar Hakkında

### CKA (Certified Kubernetes Administrator)
- Cluster kurulumu ve yapılandırması
- Workload ve scheduling
- Networking
- Storage
- Troubleshooting

### CKAD (Certified Kubernetes Application Developer)
- Application design
- Application deployment
- Application observability
- Application environment

## Hazırlık Süreci

### 1. Temel Bilgileri Öğrenme (2-4 Hafta)

Kubernetes'in temel kavramlarını öğrenmek için:
- Kubernetes resmi dokümantasyonu
- Udemy kursları (Mumshad Mannambeth)
- KodeKloud pratik lab'ları

### 2. Hands-on Pratik (4-6 Hafta)

\`\`\`bash
# Killer.sh - Sınav simülatörü (2 oturum hakkı var)
# Kubernetes the Hard Way - Manuel cluster kurulumu
# KodeKloud labs - İnteraktif pratikler
\`\`\`

### 3. Hız Çalışması (1-2 Hafta)

Sınav zamanla yarıştır. Hızlı olmak için:

\`\`\`bash
# kubectl autocomplete
source <(kubectl completion bash)
alias k=kubectl
complete -F __start_kubectl k

# Sık kullanılan alias'lar
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kgd='kubectl get deployments'
alias kaf='kubectl apply -f'
alias kdel='kubectl delete'

# Dry-run ile YAML oluşturma
k run nginx --image=nginx --dry-run=client -o yaml > pod.yaml
k create deployment nginx --image=nginx --dry-run=client -o yaml > deploy.yaml
k expose deployment nginx --port=80 --dry-run=client -o yaml > svc.yaml
\`\`\`

## Sınav Günü İpuçları

### Ortam Hazırlığı
- Sessiz bir oda
- Stabil internet bağlantısı
- Temiz masa (sadece su şişesi)
- Kimlik belgesi

### Sınav Stratejisi

1. **Kolay soruları önce yapın** - Zaman kazanın
2. **Bookmark kullanın** - Zor sorulara dönmek için
3. **YAML kopyalayın** - Dokümantasyondan
4. **kubectl explain kullanın** - Field'ları öğrenmek için

\`\`\`bash
kubectl explain pod.spec.containers
kubectl explain deployment.spec.strategy
\`\`\`

### Zaman Yönetimi

| Sınav | Süre | Soru | Geçme Notu |
|-------|------|------|------------|
| CKA | 2 saat | 15-20 | %66 |
| CKAD | 2 saat | 15-20 | %66 |

## Kullandığım Kaynaklar

1. **Kurslar**
   - KodeKloud CKA/CKAD kursu
   - Udemy - Mumshad Mannambeth

2. **Pratik**
   - killer.sh (sınav simülatörü)
   - KodeKloud labs
   - Kubernetes the Hard Way

3. **Dokümantasyon**
   - kubernetes.io/docs (sınav sırasında açık)

## Sonuç

Her iki sınavı da ilk denemede geçtim. Anahtar: **pratik, pratik, pratik**. Teorik bilgi yeterli değil, ellerinizin klavyeye alışması gerekiyor.

İyi şanslar!
    `,
  },
  {
    id: "10",
    slug: "aws-ec2-baslangic",
    title: "AWS EC2: İlk Instance'ınızı Oluşturun",
    excerpt:
      "AWS'de sanal sunucu oluşturma, güvenlik grupları ve SSH bağlantısı kurma adımları.",
    date: "2026-01-20",
    readTime: "10 min",
    tags: ["aws", "cloud"],
    author: { name: "Azize" },
    content: `
## AWS EC2 Nedir?

Amazon Elastic Compute Cloud (EC2), AWS'nin sanal sunucu hizmetidir. İstediğiniz işletim sistemi ve yapılandırmada sunucu oluşturabilirsiniz.

## EC2 Instance Türleri

| Tür | Kullanım Alanı |
|-----|----------------|
| t2/t3 | Genel amaçlı, burst |
| m5/m6i | Genel amaçlı, dengeli |
| c5/c6i | Compute-optimized |
| r5/r6i | Memory-optimized |
| p3/p4 | GPU instances |

## İlk EC2 Instance'ınız

### 1. AWS Console'a Giriş

AWS Management Console'a giriş yapın ve EC2 servisine gidin.

### 2. Launch Instance

\`\`\`
1. "Launch Instance" butonuna tıklayın
2. İsim verin: "my-first-server"
3. AMI seçin: Amazon Linux 2023
4. Instance type: t2.micro (free tier)
5. Key pair oluşturun veya mevcut olanı seçin
6. Network settings: SSH trafiğine izin verin
7. Storage: 8 GB gp3
8. Launch instance
\`\`\`

### 3. Key Pair Oluşturma

\`\`\`bash
# AWS Console'dan veya CLI ile
aws ec2 create-key-pair \\
  --key-name my-key \\
  --query 'KeyMaterial' \\
  --output text > my-key.pem

# İzinleri ayarlama
chmod 400 my-key.pem
\`\`\`

## SSH ile Bağlanma

\`\`\`bash
# Linux/Mac
ssh -i my-key.pem ec2-user@<public-ip>

# Windows (PowerShell)
ssh -i my-key.pem ec2-user@<public-ip>
\`\`\`

## Güvenlik Grupları

Güvenlik grupları, instance'ınıza gelen ve giden trafiği kontrol eder.

\`\`\`bash
# Inbound Rules
SSH (22) - My IP
HTTP (80) - Anywhere
HTTPS (443) - Anywhere

# Outbound Rules
All traffic - Anywhere (varsayılan)
\`\`\`

## AWS CLI ile EC2

\`\`\`bash
# AWS CLI kurulumu
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Yapılandırma
aws configure

# Instance listeleme
aws ec2 describe-instances

# Instance başlatma
aws ec2 run-instances \\
  --image-id ami-0123456789 \\
  --instance-type t2.micro \\
  --key-name my-key \\
  --security-group-ids sg-0123456789

# Instance durdurma
aws ec2 stop-instances --instance-ids i-0123456789

# Instance sonlandırma
aws ec2 terminate-instances --instance-ids i-0123456789
\`\`\`

## Elastic IP

\`\`\`bash
# Elastic IP tahsis etme
aws ec2 allocate-address

# Instance'a bağlama
aws ec2 associate-address \\
  --instance-id i-0123456789 \\
  --allocation-id eipalloc-0123456789
\`\`\`

## Maliyet Optimizasyonu

- **Free tier kullanın** - t2.micro 12 ay ücretsiz
- **Spot instances** - %90'a varan indirim
- **Reserved instances** - Uzun vadeli taahhüt indirimi
- **Kullanmadığınızda kapatın** - Durdurulan instance'lar EBS hariç ücretlendirilmez

## Sonuç

EC2, AWS'nin temel hizmetlerinden biridir. Cloud yolculuğunuza EC2 ile başlamak, diğer servisleri anlamak için sağlam bir temel oluşturur.
    `,
  },
  {
    id: "11",
    slug: "dockerfile-best-practices",
    title: "Dockerfile Best Practices",
    excerpt:
      "Optimize edilmiş Docker image'ları için en iyi uygulamalar ve multi-stage build kullanımı.",
    date: "2025-04-05",
    readTime: "12 min",
    tags: ["docker", "best-practices"],
    author: { name: "Azize" },
    content: `
## Neden Optimizasyon Önemli?

- **Daha küçük image boyutu** - Hızlı pull/push
- **Daha az güvenlik açığı** - Minimal attack surface
- **Daha hızlı build** - Cache kullanımı
- **Daha az kaynak tüketimi** - Production'da maliyet

## 1. Minimal Base Image Kullanın

\`\`\`dockerfile
# Kötü - Büyük image
FROM ubuntu:22.04

# İyi - Minimal image
FROM alpine:3.19

# Daha iyi - Distroless
FROM gcr.io/distroless/base-debian12
\`\`\`

## 2. Multi-Stage Build

\`\`\`dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Sadece gerekli dosyaları kopyala
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

USER nextjs
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## 3. Layer Caching'i Optimize Edin

\`\`\`dockerfile
# Kötü - Her değişiklikte tüm bağımlılıklar yeniden yüklenir
COPY . .
RUN npm install

# İyi - Bağımlılıklar cache'lenir
COPY package*.json ./
RUN npm ci
COPY . .
\`\`\`

## 4. .dockerignore Kullanın

\`\`\`
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
docker-compose*.yml
.env
.env.*
coverage
.nyc_output
\`\`\`

## 5. Tek RUN Komutu

\`\`\`dockerfile
# Kötü - Çok fazla layer
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN apt-get clean

# İyi - Tek layer
RUN apt-get update && \\
    apt-get install -y --no-install-recommends \\
      curl \\
      git && \\
    apt-get clean && \\
    rm -rf /var/lib/apt/lists/*
\`\`\`

## 6. Non-Root User

\`\`\`dockerfile
# User oluştur
RUN addgroup -g 1001 -S appgroup && \\
    adduser -u 1001 -S appuser -G appgroup

# Sahipliği ayarla
COPY --chown=appuser:appgroup . .

# User'a geç
USER appuser
\`\`\`

## 7. HEALTHCHECK Ekleyin

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## 8. Metadata Ekleyin

\`\`\`dockerfile
LABEL maintainer="azize@example.com"
LABEL version="1.0"
LABEL description="My awesome app"
\`\`\`

## 9. Güvenlik Taraması

\`\`\`bash
# Trivy ile tarama
trivy image myapp:latest

# Docker Scout
docker scout cves myapp:latest
\`\`\`

## Sonuç

Bu best practice'leri uygulayarak:
- Image boyutunu %50-90 azaltabilirsiniz
- Build süresini kısaltabilirsiniz
- Güvenlik açıklarını minimize edebilirsiniz
    `,
  },
];

// Get all unique tags
export const allTags = Array.from(
  new Set(blogPosts.flatMap((post) => post.tags))
);

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}
