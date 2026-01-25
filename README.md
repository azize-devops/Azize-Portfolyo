# 🚀 DevOps Journey - Portfolio & Blog

[![CI/CD Pipeline](https://github.com/azize-devops/Full-stack-DevOps-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/azize-devops/Full-stack-DevOps-portfolio/actions/workflows/deploy.yml)
[![Go Version](https://img.shields.io/badge/Go-1.23-00ADD8?logo=go)](https://golang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes)](https://kubernetes.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<p align="center">
  <img src="https://img.shields.io/badge/CKA-Certified-326CE5?style=for-the-badge&logo=kubernetes" alt="CKA"/>
  <img src="https://img.shields.io/badge/CKAD-Certified-326CE5?style=for-the-badge&logo=kubernetes" alt="CKAD"/>
  <img src="https://img.shields.io/badge/AWS-Cloud_Practitioner-FF9900?style=for-the-badge&logo=amazon-aws" alt="AWS"/>
</p>

---

## 📖 Hakkında

Bu proje, **DevOps yolculuğumu** belgeleyen full-stack bir portfolyo ve blog platformudur. Ocak 2025'te Linux temelleriyle başlayan bu yolculuk, Kubernetes, Docker, CI/CD ve Cloud teknolojileriyle devam etmektedir.

### 🎯 Proje Amacı

- DevOps öğrenme sürecimi belgelemek
- Edindiğim sertifikaları sergilemek
- Projelerimi ve teknik yazılarımı paylaşmak
- Modern DevOps pratiklerini uygulamak

---

## 🏆 Sertifikalar

| Sertifika | Kurum | Tarih |
|-----------|-------|-------|
| **CKA** - Certified Kubernetes Administrator | CNCF / Linux Foundation | Ocak 2026 |
| **CKAD** - Certified Kubernetes Application Developer | CNCF / Linux Foundation | Ocak 2026 |
| **AWS Cloud Practitioner** | Amazon Web Services | Ocak 2026 |

---

## 🛠️ Teknoloji Stack

### Frontend
| Teknoloji | Açıklama |
|-----------|----------|
| ![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js) | React framework, App Router |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | Type-safe JavaScript |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) | Utility-first CSS |

### Backend
| Teknoloji | Açıklama |
|-----------|----------|
| ![Go](https://img.shields.io/badge/Go_1.23-00ADD8?logo=go&logoColor=white) | Backend API |
| ![Gin](https://img.shields.io/badge/Gin-00ADD8?logo=go&logoColor=white) | HTTP web framework |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) | Veritabanı |
| ![JWT](https://img.shields.io/badge/JWT-000000?logo=json-web-tokens) | Authentication |

### DevOps & Infrastructure
| Teknoloji | Açıklama |
|-----------|----------|
| ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) | Containerization |
| ![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white) | Container orchestration |
| ![Terraform](https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white) | Infrastructure as Code |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white) | CI/CD Pipeline |

---

## 📁 Proje Yapısı

```
.
├── frontend/                # Next.js 14 uygulaması
│   ├── app/                 # App Router sayfaları
│   ├── components/          # React bileşenleri
│   └── Dockerfile
│
├── backend/                 # Go REST API
│   ├── cmd/server/          # Ana uygulama
│   ├── internal/
│   │   ├── handlers/        # HTTP handlers
│   │   ├── middleware/      # Auth, CORS, Rate limiting
│   │   └── models/          # Database modelleri
│   └── Dockerfile
│
├── k8s/                     # Kubernetes manifests
│   ├── base/                # Temel kaynaklar
│   └── overlays/            # Ortam-spesifik yapılandırmalar
│       ├── local/           # Local development (Kind)
│       └── production/      # Production
│
├── terraform/               # Infrastructure as Code
│   ├── local/               # Kind cluster
│   └── aws/                 # AWS EKS
│
├── .github/workflows/       # CI/CD pipeline
└── docker-compose.yml       # Local development
```

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Docker & Docker Compose
- Git

### Kurulum

```bash
# 1. Repo'yu klonla
git clone https://github.com/azize-devops/Full-stack-DevOps-portfolio.git
cd Full-stack-DevOps-portfolio

# 2. Ortam değişkenlerini ayarla
cp .env.example .env
# .env dosyasını düzenle

# 3. Çalıştır
docker compose up -d

# 4. Tarayıcıda aç
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
```

### Kubernetes ile Çalıştırma (Local)

```bash
# Kind cluster oluştur
cd terraform/local
terraform init && terraform apply

# Uygulamayı deploy et
kubectl apply -k k8s/overlays/local
```

---

## 🔐 Güvenlik Özellikleri

- ✅ JWT tabanlı authentication
- ✅ Bcrypt ile password hashing
- ✅ Rate limiting (spam koruması)
- ✅ CORS yapılandırması
- ✅ Security headers (XSS, Clickjacking koruması)
- ✅ Network Policies (K8s)
- ✅ Non-root container users
- ✅ Secrets management

---

## 🔄 CI/CD Pipeline

Her `main` branch'e push yapıldığında:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Test &    │ -> │   Docker    │ -> │   Deploy    │
│    Lint     │    │    Build    │    │  (SSH/K8s)  │
└─────────────┘    └─────────────┘    └─────────────┘
```

1. **Test & Lint**: Kod kalitesi kontrolü
2. **Build**: Docker image oluşturma
3. **Deploy**: Sunucuya otomatik deployment

---

## 📊 API Endpoints

### Public
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/v1/projects` | Projeleri listele |
| GET | `/api/v1/certifications` | Sertifikaları listele |
| POST | `/api/v1/contact` | İletişim formu |
| GET | `/health` | Health check |

### Protected (Admin)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/v1/auth/login` | Giriş |
| GET | `/api/v1/admin/messages` | Mesajları görüntüle |
| POST | `/api/v1/admin/projects` | Proje ekle |
| POST | `/api/v1/admin/certifications` | Sertifika ekle |

---

## 🗺️ Yol Haritası

- [x] Backend API (Go + Gin)
- [x] Frontend (Next.js 14)
- [x] Docker & Docker Compose
- [x] CI/CD Pipeline (GitHub Actions)
- [x] Kubernetes manifests
- [x] Terraform (Local + AWS)
- [ ] Blog sistemi (MDX)
- [ ] Admin panel UI
- [ ] Dark/Light mode
- [ ] Monitoring (Prometheus + Grafana)

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 📬 İletişim

- **GitHub**: [@azize-devops](https://github.com/azize-devops)
- **LinkedIn**: [Profilim](#)
- **Email**: [email@example.com](mailto:email@example.com)

---

<p align="center">
  <b>DevOps yolculuğunda her gün yeni bir şey öğreniyorum. 🚀</b>
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=azize-devops&label=Profile%20views&color=0e75b6&style=flat" alt="profile views" />
</p>
