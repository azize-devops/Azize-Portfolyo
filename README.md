# Full-stack DevOps Portfolio

[![Go Version](https://img.shields.io/badge/Go-1.23-00ADD8?logo=go)](https://golang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes)](https://kubernetes.io/)

<p align="center">
  <img src="https://img.shields.io/badge/CKA-Certified-326CE5?style=for-the-badge&logo=kubernetes" alt="CKA"/>
  <img src="https://img.shields.io/badge/CKAD-Certified-326CE5?style=for-the-badge&logo=kubernetes" alt="CKAD"/>
  <img src="https://img.shields.io/badge/AWS-Cloud_Practitioner-FF9900?style=for-the-badge&logo=amazon-aws" alt="AWS"/>
</p>

---

## Hakkinda

DevOps yolculugumu belgeleyen full-stack portfolyo ve blog platformu. Self-hosted Kubernetes Ecosystem uzerinde ArgoCD GitOps ile otomatik deploy edilir.

- **Frontend**: `devops.azizedursun.com`
- **Backend API**: `api.devops.azizedursun.com`

---

## Mimari

```
                    Gitea Push
                        |
                        v
              ┌─────────────────┐
              │  Gitea Actions  │
              │  (Act Runner)   │
              └────────┬────────┘
                       │ Build & Push
                       v
              ┌─────────────────┐
              │  Gitea Registry │
              └────────┬────────┘
                       │
          ┌────────────┼────────────┐
          v            v            v
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ ArgoCD   │ │ Backend  │ │ Frontend │
    │ Sync     │ │ Pod      │ │ Pod      │
    └──────────┘ └─────┬────┘ └──────────┘
                       │
                       v
              ┌─────────────────┐
              │  StackGres DB   │
              │  (fsdevops-db)  │
              └─────────────────┘
```

### Ecosystem Entegrasyonu

Bu proje mevcut Ecosystem altyapisi uzerine calisir:

| Bilesen | Rol |
|---------|-----|
| **ArgoCD** | `azize-applicationset` ile otomatik deploy |
| **StackGres** | Izole PostgreSQL cluster (`fsdevops-db`) |
| **Gitea Actions** | CI/CD pipeline (Act Runner + DinD) |
| **cert-manager** | Let's Encrypt TLS (Cloudflare DNS) |
| **Ingress-Nginx** | HTTP/HTTPS routing |
| **Longhorn** | Persistent storage |
| **MetalLB** | LoadBalancer IP (<NODE_IP>) |

### Namespace

Tum kaynaklar ArgoCD tarafindan `azize-apps` namespace'ine deploy edilir.

---

## Teknoloji Stack

### Frontend
| Teknoloji | Aciklama |
|-----------|----------|
| Next.js 14 | React framework, App Router |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first CSS |

### Backend
| Teknoloji | Aciklama |
|-----------|----------|
| Go 1.23 | Backend API |
| Gin | HTTP web framework |
| GORM | ORM + auto migration |
| PostgreSQL 16 | Veritabani (StackGres) |
| JWT | Authentication |

### DevOps
| Teknoloji | Aciklama |
|-----------|----------|
| Docker | Containerization |
| Kubernetes | Container orchestration |
| ArgoCD | GitOps continuous delivery |
| Gitea Actions | CI/CD pipeline |
| StackGres | PostgreSQL operator |

---

## Proje Yapisi

```
Full-stack-DevOps-portfolio/
├── backend/                    # Go REST API
│   ├── cmd/server/             # Ana uygulama
│   ├── internal/
│   │   ├── handlers/           # HTTP handlers
│   │   ├── middleware/         # Auth, CORS, Rate limiting
│   │   └── models/             # Database modelleri
│   └── Dockerfile
│
├── frontend/                   # Next.js uygulamasi
│   ├── app/                    # App Router sayfalari
│   ├── components/             # React bilesenleri
│   └── Dockerfile
│
├── manifests/                  # Kubernetes manifest'leri
│   ├── deployment.yaml         # Backend + Frontend Deployment
│   ├── service.yaml            # ClusterIP Service'ler
│   ├── ingress.yaml            # TLS Ingress (iki domain)
│   ├── configmap.yaml          # Backend environment config
│   ├── secret.yaml.example     # Secret template
│   ├── networkpolicy.yaml      # Network policy'ler
│   ├── sginstanceprofile.yaml  # StackGres instance profile
│   ├── sgpgconfig.yaml         # StackGres PG config
│   └── sgcluster.yaml          # StackGres cluster + DB init
│
├── .gitea/workflows/ci.yaml    # CI/CD pipeline
├── docker-compose.yml          # Local development
└── Makefile                    # Build/push/test komutlari
```

---

## Hizli Baslangic

### Local Development

```bash
# 1. Ortam degiskenlerini ayarla
cp .env.example .env

# 2. Docker Compose ile calistir
docker compose up -d

# 3. Tarayicida ac
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
```

### Kubernetes (Ecosystem)

Bu proje ArgoCD tarafindan otomatik deploy edilir:

1. Gitea'da (`gitea.azizedursun.com`) `azize-projects` org altinda repo olustur
2. `manifests/secret.yaml` dosyasini `secret.yaml.example`'dan olustur
3. Kodu push et
4. ArgoCD (`azize-applicationset`) `manifests/deployment.yaml` dosyasini algilar ve deploy eder

```bash
# Durum kontrolu
kubectl get pods -n azize-apps -l app.kubernetes.io/part-of=fsdevops-portfolio
kubectl get sgcluster -n azize-apps fsdevops-db
```

---

## CI/CD Pipeline

Her `main` branch'e push yapildiginda Gitea Actions calisirir:

```
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Test     │ -> │  Build & Push   │ -> │ Rollout Restart │
│ (vet+lint)  │    │ (Gitea Registry)│    │  (azize-apps)   │
└─────────────┘    └─────────────────┘    └─────────────────┘
```

**Gerekli Gitea Secrets:** `REGISTRY_USER`, `REGISTRY_PASSWORD`

---

## API Endpoints

### Public
| Method | Endpoint | Aciklama |
|--------|----------|----------|
| GET | `/health` | Health check |
| GET | `/api/v1/projects` | Projeleri listele |
| GET | `/api/v1/certifications` | Sertifikalari listele |
| POST | `/api/v1/contact` | Iletisim formu (rate limited) |

### Protected (JWT)
| Method | Endpoint | Aciklama |
|--------|----------|----------|
| POST | `/api/v1/auth/login` | Giris |
| GET | `/api/v1/auth/me` | Kullanici bilgisi |
| POST | `/api/v1/auth/refresh` | Token yenile |
| CRUD | `/api/v1/admin/projects` | Proje yonetimi |
| CRUD | `/api/v1/admin/certifications` | Sertifika yonetimi |
| GET | `/api/v1/admin/messages` | Iletisim mesajlari |

---

## Guvenlik

- JWT authentication + Bcrypt password hashing
- Network Policy: default-deny + whitelist
- Non-root containers (uid 1001)
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Rate limiting (10 RPS, 5 connections)
- TLS (Let's Encrypt via cert-manager)
- Read-only root filesystem (backend)
- Dropped capabilities (ALL)

---

## DNS Gereksinimleri

Cloudflare'da A kayitlari:
- `devops.azizedursun.com` -> `<NODE_IP>`
- `api.devops.azizedursun.com` -> `<NODE_IP>`

---

## Makefile Komutlari

```bash
make help            # Tum komutlari goster
make docker-up       # Local containers baslat
make docker-down     # Containers durdur
make push            # Image'lari Gitea registry'ye push et
make test            # Testleri calistir
make lint            # Linter'lari calistir
make clean           # Build artifact'lari temizle
```
