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
      "Linux yolculuğuma OverTheWire Bandit oyunu ile başladım. VirtualBox üzerinde Ubuntu kurarak pratik yaptım.",
    date: "2025-01-06",
    readTime: "8 min",
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

## İzinler: Linux'un Kalbi

Bir dosyayı çalıştıramayınca izinleri öğrenmek zorunda kaldım. Linux'ta her dosyanın sahibi var ve üç tür izin var: okuma (r), yazma (w), çalıştırma (x).

\`ls -l\` çıktısındaki \`-rw-r--r--\` gibi garip harfler artık anlam kazandı. \`chmod +x script.sh\` ile bir script'e çalıştırma izni vermek, \`chmod 755\` ile tam kontrol... Bunlar artık refleks oldu.

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
      "VirtualBox üzerinde Ubuntu sunucuda Apache kurulumu ve karşılaştığım hatalar. Port çakışmasından konfigürasyon sorunlarına kadar her şey.",
    date: "2025-01-22",
    readTime: "10 min",
    tags: ["linux", "apache", "web-server"],
    author: { name: "Azize" },
    content: `
Linux temellerini öğrendikten sonra sıra gerçek bir şey yapmaya geldi: web sunucusu kurmak. Hedefim basitti - Ubuntu VM'de bir web sitesi ayağa kaldırıp Windows'tan erişmek. Kulağa kolay geliyor, değil mi? Öyle olmadı.

## Apache Kurulumu: Kolay Kısım

[Apache](https://httpd.apache.org/) kurulumu gerçekten basitti:

\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl status apache2
\`\`\`

\`active (running)\` yazısını görünce sevindim. Tarayıcıda VM'in IP'sini açtım ve... hiçbir şey. İşte macera burada başladı.

## İlk Hata: Port Çakışması

Apache'yi yeniden başlatmaya çalıştığımda terminalde kırmızı yazılar belirdi:

\`\`\`
Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80
\`\`\`

80 portu zaten kullanılıyordu. Kim kullanıyor diye baktım:

\`\`\`bash
sudo lsof -i :80
\`\`\`

Meğer daha önce test için kurduğum başka bir web sunucusu hala çalışıyormuş. İki seçenek vardı: onu durdurmak ya da Apache'nin portunu değiştirmek. Ben portu değiştirmeyi tercih ettim - \`/etc/apache2/ports.conf\` dosyasında \`Listen 80\` satırını \`Listen 8080\` yaptım.

## İkinci Hata: Typo!

Apache'yi başlattığımda yeni bir hata:

\`\`\`
AH02297: Cannot access directory "/etc/apache2/\${APACHE_LOG_DIR]"
\`\`\`

Dikkatli bakınca fark ettim: \`\${APACHE_LOG_DIR]\` - süslü parantez yerine köşeli parantez kullanmışım! Bir karakterlik hata, yarım saatimi aldı. \`sudo apache2ctl configtest\` komutunu öğrendim - her değişiklikten sonra syntax kontrolü yapmak şart.

## Web Sitesi Oluşturma

Hatalar çözülünce sıra içeriğe geldi. \`/var/www/mysite\` klasörü oluşturdum, basit bir HTML dosyası yazdım. Sonra Virtual Host yapılandırması:

\`\`\`bash
sudo nano /etc/apache2/sites-available/mysite.conf
\`\`\`

\`a2ensite mysite.conf\` ile siteyi aktif ettim, \`a2dissite 000-default.conf\` ile varsayılanı kapattım. \`sudo systemctl reload apache2\` ve...

Windows tarayıcısında \`http://192.0.2.100:8080\` açtım. "Merhaba Dünya!" yazısını gördüğümde gerçekten mutlu oldum. Basit bir HTML sayfası ama benim için büyük bir adımdı.

## Öğrendiğim Şeyler

Bu deneyimden çıkardığım dersler:
- Hata mesajlarını **gerçekten** okumak önemli
- \`apache2ctl configtest\` her zaman kullan
- \`lsof -i :port\` ile port kontrolü yap
- Firewall'u unutma: \`sudo ufw allow 8080/tcp\`

Sırada Nginx var. Daha hafif, daha hızlı diyorlar. Bakalım.

**Faydalı linkler:** [Apache Docs](https://httpd.apache.org/docs/) | [Ubuntu Server Guide](https://ubuntu.com/server/docs)
    `,
  },
  {
    id: "3",
    slug: "ubuntu-streamlit-uygulama",
    title: "Ubuntu'da Streamlit Uygulaması",
    excerpt:
      "Python virtual environment nedir, neden önemli? Streamlit ile basit bir web uygulaması oluşturma deneyimim.",
    date: "2025-01-23",
    readTime: "8 min",
    tags: ["linux", "python", "streamlit"],
    author: { name: "Azize" },
    content: `
Apache'den sonra farklı bir şey denemek istedim. Python biliyordum ama web uygulaması yapmamıştım. [Streamlit](https://streamlit.io/)'i keşfedince hemen denemeye karar verdim - birkaç satır Python ile web uygulaması yapabiliyorsunuz.

## Virtual Environment: Neden Önemli?

Python'da bir şey kurmadan önce virtual environment (sanal ortam) oluşturmak lazım. Neden mi? Çünkü farklı projeler farklı paket versiyonları isteyebilir. Birinde \`pandas 1.5\`, diğerinde \`pandas 2.0\` gerekebilir. Sanal ortam olmadan sistem Python'ını kirletirsiniz.

\`\`\`bash
mkdir ~/streamlit-app && cd ~/streamlit-app
python3 -m venv env
source env/bin/activate
\`\`\`

Terminal'de \`(env)\` yazısını görünce sanal ortamdasınız demektir. Artık \`pip install\` ile ne kurarsanız kurun, sadece bu klasörü etkiler.

## İlk Streamlit Uygulaması

\`pip install streamlit\` ile kurulum yaptım. Sonra basit bir \`app.py\` oluşturdum:

\`\`\`python
import streamlit as st

st.title("Merhaba Streamlit!")
name = st.text_input("Adınız nedir?")
if name:
    st.write(f"Merhaba, {name}!")
\`\`\`

\`streamlit run app.py --server.address 0.0.0.0\` ile çalıştırdım. \`--server.address 0.0.0.0\` parametresi önemli - bu olmadan sadece localhost'tan erişebilirsiniz.

Windows'tan \`http://192.0.2.100:8501\` açtığımda uygulamayı gördüm. Birkaç satır kodla interaktif bir web uygulaması! Slider ekledim, buton ekledim, hatta \`st.balloons()\` ile konfeti bile attırdım.

## GitHub'dan Proje Çalıştırma

Kendi uygulamam çalışınca merak ettim: başkalarının projelerini de çalıştırabilir miyim? Streamlit'in örnek bir projesini klonladım:

\`\`\`bash
git clone https://github.com/streamlit/demo-uber-nyc-pickups.git
cd demo-uber-nyc-pickups
pip install -r requirements.txt
streamlit run streamlit_app.py --server.address 0.0.0.0
\`\`\`

Çalıştı! New York'taki Uber verilerini gösteren interaktif bir harita. \`requirements.txt\` dosyasının önemini burada anladım - projenin hangi paketlere ihtiyacı olduğunu söylüyor.

## Çıkarımlar

- \`python3 -m venv env\` ile sanal ortam oluştur
- \`source env/bin/activate\` ile aktifleştir
- \`deactivate\` ile çık
- \`pip freeze > requirements.txt\` ile bağımlılıkları kaydet

Streamlit gerçekten kolay. Birkaç saat içinde çalışan bir uygulama yaptım. Sırada Nginx ile API endpoint oluşturmak var.

**Faydalı linkler:** [Streamlit Docs](https://docs.streamlit.io/) | [Python venv](https://docs.python.org/3/library/venv.html)
    `,
  },
  {
    id: "4",
    slug: "nginx-healtz-endpoint",
    title: "Nginx ile Health Check Endpoint",
    excerpt:
      "Nginx kurulumu ve /healtz endpoint oluşturma. Location block nedir, nasıl çalışır?",
    date: "2025-01-24",
    readTime: "7 min",
    tags: ["linux", "nginx", "web-server"],
    author: { name: "Azize" },
    content: `
Apache'yi öğrendikten sonra [Nginx](https://nginx.org/)'i denemek istedim. Herkes "daha hafif, daha hızlı" diyordu. Ayrıca Kubernetes'te sıkça kullanıldığını biliyordum - ileride işime yarayacaktı.

Görevim basitti: \`/healtz\` adresine istek geldiğinde "istek başarılı" dönen bir endpoint yapmak. Kubernetes'teki health check'lere benzer bir şey.

## Nginx Kurulumu

\`\`\`bash
sudo apt update
sudo apt install nginx
sudo systemctl status nginx
\`\`\`

Tarayıcıda VM'in IP'sini açtığımda Nginx'in "Welcome" sayfası geldi. Apache'den farklı olarak port sorunu yaşamadım çünkü Apache'yi durdurmuştum.

## Location Block

Nginx'te routing \`location\` blokları ile yapılıyor. \`/etc/nginx/sites-available/default\` dosyasını düzenledim:

\`\`\`nginx
location /healtz {
    return 200 "istek başarılı\\n";
    add_header Content-Type text/plain;
}
\`\`\`

Bu kadar basit! \`return 200\` ile HTTP 200 OK döndürüyoruz, yanında da mesajımız var.

## Test

Değişiklikten sonra \`sudo nginx -t\` ile syntax kontrolü yaptım (Apache'deki \`configtest\` gibi). Hata yoksa \`sudo systemctl reload nginx\` ile yükledim.

\`\`\`bash
curl http://localhost/healtz
# Çıktı: istek başarılı
\`\`\`

Windows'tan da denedim - çalıştı. \`curl -v\` ile detaylı çıktıya baktığımda HTTP/1.1 200 OK görünce mutlu oldum.

## sites-available vs sites-enabled

Nginx'in yapısı ilginç: \`sites-available\` klasöründe tüm site yapılandırmaları var, \`sites-enabled\` klasöründe ise aktif olanların symlink'leri. Site aktifleştirmek için:

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/
\`\`\`

Devre dışı bırakmak için symlink'i silmek yeterli. Apache'deki \`a2ensite\` / \`a2dissite\` mantığının manuel versiyonu.

## Öğrendiklerim

- Nginx gerçekten daha basit ve hafif hissettiriyor
- \`location\` blokları güçlü - regex bile kullanabiliyorsunuz
- \`nginx -t\` ile her zaman test et
- Access log'lar \`/var/log/nginx/access.log\`'da

Sırada Socket.io ile gerçek zamanlı bir uygulama var.

**Faydalı linkler:** [Nginx Docs](https://nginx.org/en/docs/) | [Nginx Beginner's Guide](https://nginx.org/en/docs/beginners_guide.html)
    `,
  },
  {
    id: "5",
    slug: "socketio-chat-uygulamasi",
    title: "Socket.io ile Gerçek Zamanlı Chat",
    excerpt:
      "Node.js kurulumu, GitHub'dan proje klonlama ve PM2 ile process yönetimi deneyimim.",
    date: "2025-01-25",
    readTime: "8 min",
    tags: ["linux", "nodejs", "socketio"],
    author: { name: "Azize" },
    content: `
Web sunucuları öğrendim ama hepsi "istek-yanıt" mantığında çalışıyordu. Gerçek zamanlı bir şey yapmak istedim - mesela chat uygulaması. [Socket.io](https://socket.io/) tam da bunun için var.

## Node.js Kurulumu

Socket.io bir JavaScript kütüphanesi, yani Node.js lazım:

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
\`\`\`

\`npm\` (Node Package Manager) Python'daki \`pip\` gibi - paket yöneticisi.

## GitHub'dan Proje Klonlama

Socket.io'nun resmi chat örneği var. Onu klonladım:

\`\`\`bash
git clone https://github.com/socketio/chat-example.git
cd chat-example
npm install
\`\`\`

\`npm install\` komutu \`package.json\` dosyasındaki tüm bağımlılıkları yüklüyor. Python'daki \`pip install -r requirements.txt\` gibi.

\`npm start\` ile uygulamayı başlattım. Ama bir sorun vardı: sadece localhost'tan erişilebiliyordu. \`index.js\` dosyasında \`app.listen(3000)\` satırını \`app.listen(3000, '0.0.0.0')\` olarak değiştirdim.

## PM2: Process Yöneticisi

Terminal'i kapatınca uygulama duruyordu. Bunu çözmek için birkaç yol var:
- \`nohup npm start &\` - basit ama kaba
- \`screen\` - terminal multiplexer
- \`pm2\` - profesyonel çözüm

PM2'yi tercih ettim:

\`\`\`bash
sudo npm install -g pm2
pm2 start index.js --name "chat-app"
pm2 status
\`\`\`

Artık uygulama arka planda çalışıyor. \`pm2 logs chat-app\` ile logları görebiliyorum, \`pm2 restart chat-app\` ile yeniden başlatabiliyorum. Sunucu yeniden başlasa bile \`pm2 startup\` ile otomatik başlatmayı ayarlayabiliyorum.

## Chat Uygulamasını Test Etmek

İki farklı tarayıcı sekmesi açtım. Birinden mesaj yazdığımda diğerinde anında göründü! WebSocket'in gücü bu - sunucu client'a veri "push" edebiliyor, client'ın sürekli sormasına gerek yok.

## Öğrendiklerim

- \`npm install\` bağımlılıkları yükler
- \`0.0.0.0\` ile dış erişime açarsın
- PM2 production'da Node.js uygulamaları için standart
- WebSocket, HTTP'den farklı - çift yönlü iletişim

Son görev: tüm bu uygulamaları Nginx reverse proxy ile birleştirmek.

**Faydalı linkler:** [Socket.io Docs](https://socket.io/docs/) | [PM2 Docs](https://pm2.keymetrics.io/docs/)
    `,
  },
  {
    id: "6",
    slug: "nginx-reverse-proxy",
    title: "Nginx Reverse Proxy: Her Şeyi Birleştirmek",
    excerpt:
      "Apache, Streamlit, Socket.io - hepsini tek bir noktadan yönetmek. Reverse proxy nedir, nasıl yapılandırılır?",
    date: "2025-01-26",
    readTime: "10 min",
    tags: ["linux", "nginx", "reverse-proxy"],
    author: { name: "Azize" },
    content: `
Son üç haftada birçok uygulama kurdum: Apache'de web sitesi, Streamlit uygulaması, Socket.io chat, Nginx health check... Ama hepsi farklı portlarda çalışıyordu. Kullanıcıya "8080'e git, 8501'e git, 3000'e git" demek mantıklı değil. İşte burada reverse proxy devreye giriyor.

## Reverse Proxy Nedir?

Düşünün: kullanıcı tek bir adrese (port 80) istek atıyor, Nginx bu isteği URL'e göre farklı uygulamalara yönlendiriyor:

- \`/healtz\` → Nginx kendisi yanıt veriyor
- \`/chat\` → Socket.io uygulaması (port 3001)
- \`/app\` → Streamlit (port 8501)
- \`/web\` → Apache (port 8080)

Kullanıcı arka planda kaç uygulama olduğunu bilmiyor bile.

## Yapılandırma

Nginx config dosyasını düzenledim:

\`\`\`nginx
server {
    listen 80;

    location /healtz {
        return 200 "OK\\n";
    }

    location /chat {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /app {
        proxy_pass http://localhost:8501;
        proxy_set_header Host $host;
    }

    location /web {
        proxy_pass http://localhost:8080;
    }
}
\`\`\`

\`proxy_pass\` direktifi isteği belirtilen adrese yönlendiriyor. Socket.io için ekstra header'lar gerekiyor çünkü WebSocket kullanıyor - \`Upgrade\` ve \`Connection\` header'ları olmadan WebSocket bağlantısı kurulamıyor.

## Sorun Giderme

İlk denemede 502 Bad Gateway hatası aldım. Sebep: Streamlit uygulaması çalışmıyordu. \`sudo lsof -i :8501\` ile kontrol ettim - gerçekten de port boştu. Uygulamayı başlatınca düzeldi.

Bir diğer sorun: WebSocket bağlantısı kurulamıyordu. Header'ları eklemeyi unutmuştum. Hata mesajları her zaman ipucu veriyor - log dosyalarını okumak önemli: \`sudo tail -f /var/log/nginx/error.log\`

## Sonuç

Üç haftalık Linux yolculuğumun sonunda:
- Bandit ile komutları öğrendim
- VirtualBox ile VM yönetimini deneyimledim
- Apache ve Nginx ile web sunucusu kurdum
- Python ve Node.js uygulamaları çalıştırdım
- Reverse proxy ile hepsini birleştirdim

En önemli öğrendiğim şey: hata mesajlarını okumak. Çoğu sorunun cevabı log dosyalarında yazıyor.

Şimdi sırada Docker ve Kubernetes var. Container dünyasına adım atma zamanı!

**Faydalı linkler:** [Nginx Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) | [WebSocket Proxying](https://nginx.org/en/docs/http/websocket.html)
    `,
  },
  {
    id: "7",
    slug: "docker-container-nedir",
    title: "Docker Container Nedir?",
    excerpt:
      "Container teknolojisi neden bu kadar popüler? Docker ile ilk container deneyimim.",
    date: "2025-02-10",
    readTime: "9 min",
    tags: ["docker", "containers"],
    author: { name: "Azize" },
    content: `
Linux öğrenirken Apache, Nginx, Python, Node.js kurdum. Her seferinde \`apt install\`, bağımlılıklar, versiyon uyumsuzlukları... Bir de bunu farklı sunucularda tekrarlamak gerekse? İşte [Docker](https://www.docker.com/) tam da bu sorunu çözüyor.

## Container Nedir?

Container, uygulamanızı ve tüm bağımlılıklarını bir "kutu" içinde paketliyor. Bu kutuyu herhangi bir yere taşıyabilirsiniz - kendi bilgisayarınız, sunucu, cloud... Her yerde aynı şekilde çalışıyor.

Sanal makineden farkı ne? VM'de tam bir işletim sistemi var, GB'larca yer kaplıyor, dakikalar içinde başlıyor. Container ise host işletim sisteminin çekirdeğini paylaşıyor - MB'larca boyut, saniyeler içinde başlangıç.

## İlk Container

Docker kurduktan sonra ilk denememde Nginx çalıştırdım:

\`\`\`bash
docker run -d -p 8080:80 nginx
\`\`\`

Bu kadar! \`-d\` arka planda çalıştır, \`-p 8080:80\` port yönlendirmesi (host'un 8080'i container'ın 80'ine). Tarayıcıda \`localhost:8080\` açtım, Nginx welcome sayfası geldi.

Daha önce Apache için \`apt install\`, config dosyaları, servis başlatma... En az 10 dakika uğraşmıştım. Container ile 10 saniye.

## Temel Komutlar

\`docker ps\` ile çalışan container'ları görüyorum. \`docker ps -a\` durmuş olanları da gösteriyor. \`docker logs <id>\` ile logları okuyorum, \`docker exec -it <id> /bin/sh\` ile içine girip bakabiliyorum.

Container durdurmak için \`docker stop <id>\`, silmek için \`docker rm <id>\`. Image'ları \`docker images\` ile listeliyorum, gereksizleri \`docker rmi\` ile siliyorum.

## Dockerfile

Kendi uygulamam için container yapmak istedim. Bunun için Dockerfile yazıyorsunuz:

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

\`docker build -t myapp .\` ile image oluşturdum, \`docker run -p 3000:3000 myapp\` ile çalıştırdım. Artık bu image'ı istediğim yere taşıyabilirim.

## Neden Önemli?

Docker öğrenmeden önce "benim bilgisayarımda çalışıyor" klasik bir problem gibiydi. Artık anlıyorum: container ile uygulamanız her yerde aynı çalışıyor. Geliştirme ortamı = production ortamı.

Kubernetes öğrenmeye başlayınca Docker'ın değerini daha iyi anlayacağım. Container'ları ölçeklendirmek, yönetmek... Ama önce Docker'ı iyi bilmek lazım.

**Faydalı linkler:** [Docker Docs](https://docs.docker.com/) | [Docker Hub](https://hub.docker.com/)
    `,
  },
  {
    id: "8",
    slug: "kubernetes-giris",
    title: "Kubernetes'e Giriş",
    excerpt:
      "Pod, Deployment, Service - Kubernetes'in temel kavramları ve ilk cluster deneyimim.",
    date: "2025-03-20",
    readTime: "12 min",
    tags: ["kubernetes", "containers"],
    author: { name: "Azize" },
    content: `
Docker öğrendim, container'lar harika. Ama düşünün: 100 container'ınız var, birisi çökerse ne olacak? Yük artınca nasıl ölçeklenecek? Güncelleme nasıl yapılacak? İşte [Kubernetes](https://kubernetes.io/) (K8s) bu soruları cevaplıyor.

## Kubernetes Nedir?

Google'ın yıllarca container yönetmek için kullandığı internal sistemin (Borg) açık kaynak versiyonu. Container'ları orchestrate ediyor - yani onları yönetiyor, ölçeklendiriyor, sağlıklı tutmaya çalışıyor.

## Temel Kavramlar

**Pod:** En küçük birim. Bir veya daha fazla container içerir. Genelde bir pod = bir container.

**Deployment:** Pod'ların nasıl çalışacağını tanımlar. "3 tane Nginx pod'u olsun" dersiniz, Kubernetes bunu sağlar. Biri ölürse otomatik yenisini açar.

**Service:** Pod'lara erişim noktası. Pod'lar gelip gider (IP'leri değişir), Service sabit bir adres sağlar.

## Minikube ile Başlangıç

Gerçek cluster kurmak karmaşık. Minikube ile yerel makinede tek node'lu cluster çalıştırabilirsiniz:

\`\`\`bash
minikube start
kubectl get nodes
\`\`\`

\`kubectl\` Kubernetes'in CLI aracı. Her şeyi bununla yapıyorsunuz.

## İlk Deployment

Nginx deployment'ı oluşturdum:

\`\`\`bash
kubectl create deployment nginx --image=nginx
kubectl get pods
\`\`\`

Bir pod çalışmaya başladı. Sonra ölçekledim:

\`\`\`bash
kubectl scale deployment nginx --replicas=3
kubectl get pods
\`\`\`

Artık 3 Nginx pod'u var. Birini özellikle öldürdüm (\`kubectl delete pod <name>\`) - Kubernetes anında yenisini oluşturdu. Self-healing denen şey bu!

## Service ile Erişim

Pod'lara dışarıdan erişmek için Service oluşturdum:

\`\`\`bash
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get svc
\`\`\`

Minikube'da \`minikube service nginx\` ile tarayıcıda açtım. Çalışıyor!

## YAML Dosyaları

Gerçek hayatta komutlar yerine YAML dosyaları kullanılıyor. Daha okunabilir, version control'e atılabilir:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
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
        image: nginx:latest
\`\`\`

\`kubectl apply -f deployment.yaml\` ile uyguluyorsunuz. Değişiklik yapınca tekrar \`apply\` - Kubernetes farkı anlayıp gerekli değişiklikleri yapıyor.

## İlk İzlenimler

Kubernetes karmaşık ama güçlü. CKA ve CKAD sertifikalarına hazırlanmaya karar verdim. Pratik, pratik, pratik...

**Faydalı linkler:** [Kubernetes Docs](https://kubernetes.io/docs/) | [Minikube](https://minikube.sigs.k8s.io/)
    `,
  },
  {
    id: "9",
    slug: "cka-ckad-hazirlik",
    title: "CKA ve CKAD Sınavlarına Hazırlık",
    excerpt:
      "Kubernetes sertifikasyonlarına nasıl hazırlandım? Kullandığım kaynaklar ve sınav günü ipuçları.",
    date: "2026-01-10",
    readTime: "10 min",
    tags: ["kubernetes", "certifications"],
    author: { name: "Azize" },
    content: `
Kubernetes öğrenmeye başlayınca bir hedef koydum: CKA (Certified Kubernetes Administrator) ve CKAD (Certified Kubernetes Application Developer) sertifikalarını almak. Ocak 2026'da her ikisini de aldım. İşte hazırlık sürecim.

## Sınavlar Hakkında

İki sınav da pratik - çoktan seçmeli değil. Gerçek bir Kubernetes cluster'ında görevler yapıyorsunuz. 2 saat süreniz var, ~15-20 soru, geçme notu %66.

CKA daha çok cluster yönetimi odaklı: kurulum, yedekleme, networking, troubleshooting. CKAD ise uygulama geliştirici perspektifinden: pod'lar, deployment'lar, configmap'ler, probes...

## Hazırlık Kaynakları

**KodeKloud** kursları mükemmeldi. Mumshad Mannambeth'in anlatımı çok net. Ama asıl fark yaratan şey lab'lar - gerçek cluster'da pratik yapıyorsunuz.

**killer.sh** sınav simülatörü. Sınavdan önce 2 deneme hakkınız var, mutlaka kullanın. Gerçek sınavdan bile zor, iyi bir hazırlık.

**Kubernetes the Hard Way** - cluster'ı sıfırdan, elle kuruyorsunuz. Arka planda ne olduğunu anlamak için harika.

## Hız Çok Önemli

Sınavda zaman en büyük düşman. Alias'lar şart:

\`\`\`bash
alias k=kubectl
alias kgp='kubectl get pods'
alias kaf='kubectl apply -f'
\`\`\`

\`kubectl\` autocomplete'i de açın. YAML yazmak yerine \`--dry-run=client -o yaml\` ile şablon oluşturun:

\`\`\`bash
k run nginx --image=nginx --dry-run=client -o yaml > pod.yaml
\`\`\`

## Sınav Günü

Sessiz bir oda, stabil internet, temiz masa (sadece su şişesi). Kimlik belgesi yanınızda olsun. Sınav ortamı web tabanlı - kendi bilgisayarınızda.

Stratejim: önce kolay sorular, zor olanları bookmark'layıp sona bıraktım. Dokümantasyon açık (kubernetes.io/docs) - YAML şablonlarını oradan kopyaladım.

## Sonuç

Her iki sınavı da ilk denemede geçtim. Sır ne? Pratik. Teori okumak yetmiyor, elinizin klavyeye alışması lazım. \`kubectl\` komutları refleks olmalı.

Bu sertifikalar DevOps kariyerinde gerçekten fark yaratıyor. Kubernetes bilen çok, kanıtlayabilen az.

**Faydalı linkler:** [Linux Foundation Training](https://training.linuxfoundation.org/) | [killer.sh](https://killer.sh/)
    `,
  },
  {
    id: "10",
    slug: "aws-ec2-baslangic",
    title: "AWS EC2 ile Tanışma",
    excerpt:
      "Cloud yolculuğuma AWS ile başladım. İlk EC2 instance'ımı oluşturma ve SSH bağlantısı kurma.",
    date: "2026-01-20",
    readTime: "9 min",
    tags: ["aws", "cloud"],
    author: { name: "Azize" },
    content: `
Kubernetes öğrenirken hep yerel makinemde çalıştım. Ama gerçek dünyada uygulamalar cloud'da çalışıyor. AWS öğrenmeye karar verdim - pazar lideri, iş ilanlarının çoğunda isteniyor.

## EC2 Nedir?

Elastic Compute Cloud - yani sanal sunucu. İstediğiniz işletim sistemi, istediğiniz boyutta sunucu oluşturuyorsunuz. Kullandığınız kadar ödüyorsunuz.

## İlk Instance

AWS Console'a girdim, EC2 servisine gittim. "Launch Instance" dedim:
- İsim: my-first-server
- AMI: Amazon Linux 2023
- Instance type: t2.micro (free tier!)
- Key pair oluşturdum (SSH için)
- Security group: SSH'a izin verdim

Birkaç dakikada instance çalışmaya başladı. Public IP aldı.

## SSH Bağlantısı

Key pair dosyasını indirdim (\`.pem\` uzantılı). Linux/Mac'te:

\`\`\`bash
chmod 400 my-key.pem
ssh -i my-key.pem ec2-user@<public-ip>
\`\`\`

Bağlandım! Gerçek bir sunucudayım, cloud'da!

## Security Groups

AWS'de firewall mantığı Security Groups ile çalışıyor. Varsayılan olarak hiçbir şeye izin yok. SSH için port 22'yi açtım, web sunucusu kuracaksam 80 ve 443'ü de açmam gerekecek.

Inbound (gelen) ve Outbound (giden) kuralları ayrı. Outbound varsayılan olarak her şeye izin veriyor.

## AWS CLI

Console güzel ama her şeyi tıklamak yorucu. AWS CLI ile komut satırından yönetebiliyorsunuz:

\`\`\`bash
aws ec2 describe-instances
aws ec2 stop-instances --instance-ids i-xxxxx
aws ec2 start-instances --instance-ids i-xxxxx
\`\`\`

Terraform öğrenmeye başlayınca CLI daha da önemli olacak.

## Maliyet Uyarısı

AWS kullanmayı bitirince kaynakları **mutlaka** temizleyin. Çalışan instance para yakar. t2.micro bir yıl free tier'da ama sonra ücretli. Elastic IP de instance'a bağlı değilse ücretli.

İlk ayım ücretsiz geçti ama bir keresinde test instance'ını açık unutmuştum - $3 geldi :)

## Sonraki Adımlar

EC2 temel, ama AWS'in 200+ servisi var. Sırada:
- S3 (object storage)
- RDS (managed database)
- EKS (managed Kubernetes)

Cloud yolculuğum daha yeni başlıyor.

**Faydalı linkler:** [AWS Free Tier](https://aws.amazon.com/free/) | [EC2 User Guide](https://docs.aws.amazon.com/ec2/)
    `,
  },
  {
    id: "11",
    slug: "dockerfile-best-practices",
    title: "Dockerfile Best Practices",
    excerpt:
      "Image boyutunu küçültmek, build süresini azaltmak ve güvenliği artırmak için Dockerfile ipuçları.",
    date: "2025-04-05",
    readTime: "10 min",
    tags: ["docker", "best-practices"],
    author: { name: "Azize" },
    content: `
Docker kullanmaya başladığımda Dockerfile yazmak kolay görünüyordu. Ama production'a geçince fark ettim: 1 GB'lık image'lar, yavaş build'ler, güvenlik açıkları... İşte öğrendiğim best practice'ler.

## Minimal Base Image

İlk hatam: \`FROM ubuntu:22.04\` kullanmak. Ubuntu image'ı ~70 MB, içinde ihtiyacım olmayan bir sürü şey var.

\`FROM node:18-alpine\` kullanınca image boyutum yarıya düştü. Alpine Linux minimal bir dağıtım - sadece 5 MB. Tabii bazı paketler olmayabiliyor, ama çoğu uygulama için yeterli.

Daha da ileri gitmek isteyenler için \`distroless\` image'lar var. Shell bile yok - sadece uygulamanız çalışıyor.

## Layer Cache

Dockerfile'daki her satır bir layer oluşturuyor. Docker bu layer'ları cache'liyor. Ama bir layer değişirse ondan sonrakiler de yeniden build ediliyor.

Yanlış:
\`\`\`dockerfile
COPY . .
RUN npm install
\`\`\`

Doğru:
\`\`\`dockerfile
COPY package*.json ./
RUN npm install
COPY . .
\`\`\`

Neden? Kod değişince \`package.json\` değişmiyorsa \`npm install\` cache'den geliyor. Build süresi dramatik şekilde düşüyor.

## Multi-Stage Build

Build araçları production image'da olmamalı. Multi-stage build ile bunu çözüyoruz:

\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
\`\`\`

İlk stage'de build yapıyoruz, ikinci stage'e sadece sonucu kopyalıyoruz. Final image'da \`node_modules\`, source code, build araçları yok - sadece çalıştırılabilir dosyalar.

## Root Kullanma

Container'lar varsayılan olarak root olarak çalışıyor. Güvenlik açısından kötü. Non-root user oluşturun:

\`\`\`dockerfile
RUN adduser -D appuser
USER appuser
\`\`\`

## .dockerignore

\`node_modules\`, \`.git\`, test dosyaları... Bunlar image'a girmemeli. \`.dockerignore\` dosyası oluşturun:

\`\`\`
node_modules
.git
*.md
.env
\`\`\`

Build context küçülür, build hızlanır, image boyutu düşer.

## Sonuç

Bu pratikleri uyguladığımda:
- Image boyutu 1.2 GB → 150 MB
- Build süresi 5 dakika → 30 saniye
- Güvenlik taramalarında 0 kritik bulgu

Docker kolay görünüyor ama production-ready image yapmak bilgi istiyor.

**Faydalı linkler:** [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) | [Trivy](https://trivy.dev/)
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
