# DevOps Journey - Proje Context

Bu dosya Claude Code ile yapılan sohbetin özetini içerir. Proje hakkında hızlı bilgi edinmek için kullanılabilir.

## Proje Sahibi
- **İsim:** Azize
- **Yolculuk:** Ocak 2025'te Bandit Games ile Linux öğrenmeye başladı
- **Sertifikalar:**
  - CKA (Certified Kubernetes Administrator) - 4 Ocak 2026
  - CKAD (Certified Kubernetes Application Developer) - 22 Ocak 2026
  - AWS CCP (Cloud Practitioner) - Sınava hazırlanıyor (25 Ocak 2026)
- **Arka Plan:** C# ve Unity ile oyun geliştirme, algoritma temelleri
- **Notlar:** Notion'da tutuluyor

## Proje Amacı
DevOps yolculuğunu belgeleyen portföy ve blog karışımı full-stack web sitesi.

## Teknoloji Stack

### Frontend
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Dark/Light mode (planlandı)

### Backend
- Go (Golang) + Gin framework
- PostgreSQL + GORM
- JWT Authentication
- Rate Limiting

### DevOps
- Docker & Docker Compose
- Kubernetes (Kustomize)
- Terraform (local Kind + AWS EKS)

## Proje Yapısı
```
my-devops-journey/
├── frontend/          # Next.js
├── backend/           # Go API
├── k8s/               # Kubernetes manifests
│   ├── base/
│   └── overlays/
│       ├── local/
│       └── production/
├── terraform/
│   ├── local/         # Kind cluster
│   └── aws/           # EKS (cloud migration)
├── docker-compose.yml
└── Makefile
```

## API Endpoints

### Public
- `GET /api/v1/projects` - Projeleri listele
- `GET /api/v1/certifications` - Sertifikaları listele
- `POST /api/v1/contact` - İletişim formu (rate limited)

### Auth
- `POST /api/v1/auth/login` - Giriş yap
- `GET /api/v1/auth/me` - Kullanıcı bilgisi
- `POST /api/v1/auth/refresh` - Token yenile

### Admin (Protected)
- `POST/PUT/DELETE /api/v1/admin/projects/:id`
- `POST/PUT/DELETE /api/v1/admin/certifications/:id`
- `GET /api/v1/admin/messages` - İletişim mesajları

## Özellikler (Planlanan)
- [x] Backend API yapısı
- [x] Frontend temel yapısı
- [x] Docker & Docker Compose
- [x] Kubernetes manifests
- [x] Terraform (local + AWS)
- [x] Güvenlik önlemleri
- [ ] Blog sistemi (MDX)
- [ ] Sertifika vitrini sayfası
- [ ] Proje portföyü sayfası
- [ ] İletişim formu
- [ ] Admin panel
- [ ] Dark/Light mode toggle

## Güvenlik Önlemleri
- JWT authentication
- Bcrypt password hashing
- Rate limiting (3 req/hour contact form)
- CORS configuration
- Security headers
- Network Policies (K8s)
- Non-root containers
- Secrets management

## Kullanıcı Tercihleri
- GitHub'da collaborator/contributor olarak GÖRÜNMEME
- Terraform ile önce local K8s, sonra cloud migration
- Güvenlik önlemlerine özel dikkat
- Blog yazıları MDX formatında (Git ile yönetim)
- Admin panel ile proje/sertifika yönetimi
- Dark/Light mode toggle

## Çalıştırma

### Local (Docker olmadan)
```bash
# PostgreSQL kurulu olmalı
cd backend && go run ./cmd/server
cd frontend && npm run dev
```

### Docker Compose
```bash
docker compose up
```

### Kubernetes (Local)
```bash
make k8s-init   # Kind cluster oluştur
make k8s-load   # Image'ları yükle
make k8s-apply  # Deploy
```

## Notlar
- Go henüz kurulu değil (go mod tidy çalıştırılmalı)
- Default admin: admin@example.com / __DEFAULT_PASSWORD__ (sadece development)
- Hosts dosyasına ekle: `127.0.0.1 devops.local api.devops.local`

## Sonraki Adımlar
1. Go kurulumu
2. Frontend sayfalarını geliştirme
3. Blog sistemi (MDX entegrasyonu)
4. Admin panel
5. Dark/Light mode

---
*Son güncelleme: 25 Ocak 2026*
