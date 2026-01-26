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
    title: "Linux Temelleri: Başlangıç Rehberi",
    excerpt:
      "Linux dünyasına ilk adımlarınızı atın. Temel komutlar, dosya sistemi ve shell kullanımı hakkında her şey.",
    date: "2025-01-15",
    readTime: "8 min",
    tags: ["linux", "beginner"],
    author: { name: "Azize" },
    content: `
## Linux Nedir?

Linux, açık kaynaklı bir işletim sistemi çekirdeğidir. 1991 yılında Linus Torvalds tarafından geliştirilmeye başlanmıştır. Günümüzde sunucuların büyük çoğunluğu, Android cihazlar ve birçok gömülü sistem Linux üzerinde çalışmaktadır.

## Temel Linux Komutları

### Dosya ve Dizin İşlemleri

\`\`\`bash
# Bulunduğunuz dizini görme
pwd

# Dizin içeriğini listeleme
ls -la

# Dizin değiştirme
cd /home/user/documents

# Dizin oluşturma
mkdir yeni-klasor

# Dosya oluşturma
touch dosya.txt

# Dosya kopyalama
cp kaynak.txt hedef.txt

# Dosya taşıma/yeniden adlandırma
mv eski-isim.txt yeni-isim.txt

# Dosya silme
rm dosya.txt

# Dizin silme (içindekilerle birlikte)
rm -rf klasor/
\`\`\`

### Dosya İçeriği Görüntüleme

\`\`\`bash
# Tüm içeriği görme
cat dosya.txt

# Sayfa sayfa görme
less dosya.txt

# İlk 10 satır
head dosya.txt

# Son 10 satır
tail dosya.txt

# Canlı log takibi
tail -f /var/log/syslog
\`\`\`

## Dosya Sistemi Yapısı

Linux dosya sistemi hiyerarşik bir yapıdadır:

- \`/\` - Kök dizin
- \`/home\` - Kullanıcı dizinleri
- \`/etc\` - Sistem yapılandırma dosyaları
- \`/var\` - Değişken veriler (loglar, cache)
- \`/usr\` - Kullanıcı programları
- \`/tmp\` - Geçici dosyalar
- \`/bin\` - Temel komutlar
- \`/sbin\` - Sistem komutları

## Dosya İzinleri

Linux'ta her dosyanın üç tür izni vardır:
- **r (read)** - Okuma izni
- **w (write)** - Yazma izni
- **x (execute)** - Çalıştırma izni

\`\`\`bash
# İzinleri görme
ls -l dosya.txt
# -rw-r--r-- 1 user group 1234 Jan 15 10:00 dosya.txt

# İzin değiştirme
chmod 755 script.sh
chmod +x script.sh
\`\`\`

## Sonraki Adımlar

Linux öğrenmeye devam etmek için:
1. OverTheWire Bandit oyununu oynayın
2. Bir sanal makine kurup pratik yapın
3. Temel shell scripting öğrenin

Linux yolculuğunuz daha yeni başlıyor!
    `,
  },
  {
    id: "2",
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
    id: "3",
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
    id: "4",
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

İyi şanslar! 🎉
    `,
  },
  {
    id: "5",
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
    id: "6",
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

## 10. Complete Example

\`\`\`dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Bağımlılıkları önce kopyala (cache)
COPY package*.json ./
RUN npm ci --only=production

# Kaynak kodu kopyala ve build et
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

# Metadata
LABEL maintainer="azize@example.com"
LABEL version="1.0"

WORKDIR /app

# Non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nextjs -u 1001

# Gerekli dosyaları kopyala
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Güvenlik
USER nextjs

# Port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1

# Başlat
CMD ["node", "dist/index.js"]
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
