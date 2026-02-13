# Full-stack DevOps Portfolio

[![Go Version](https://img.shields.io/badge/Go-1.23-00ADD8?logo=go)](https://golang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes)](https://kubernetes.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<p align="center">
  <img src="https://img.shields.io/badge/CKA-Certified-326CE5?style=for-the-badge&logo=kubernetes" alt="CKA"/>
  <img src="https://img.shields.io/badge/CKAD-Certified-326CE5?style=for-the-badge&logo=kubernetes" alt="CKAD"/>
  <img src="https://img.shields.io/badge/AWS-Cloud_Practitioner-FF9900?style=for-the-badge&logo=amazon-aws" alt="AWS"/>
</p>

---

## Hakkinda

DevOps yolculugumu belgeleyen full-stack portfolyo ve blog platformu. 8 dilde (TR, EN, RU, ZH, DE, FR, AR, ES) hizmet verir. Self-hosted Kubernetes Ecosystem uzerinde ArgoCD GitOps ile otomatik deploy edilir.

- **Frontend**: `devops.azizedursun.com`
- **Backend API**: `api.devops.azizedursun.com`

---

## Mimari

```
                    Gitea Push
                        |
                        v
              ┌──────────────────┐
              │  Gitea Actions   │
              │  CI/CD Pipeline  │
              └────────┬─────────┘
                       │ Test → Build → Scan → SBOM → Push
                       v
              ┌──────────────────┐
              │  Gitea Registry  │
              └────────┬─────────┘
                       │
          ┌────────────┼────────────┐
          v            v            v
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │  ArgoCD  │ │ Backend  │ │ Frontend │
    │  Sync    │ │ Pod(HPA) │ │ Pod(HPA) │
    └──────────┘ └─────┬────┘ └──────────┘
                       │
                       v
              ┌──────────────────┐
              │  StackGres DB    │
              │  (PG 16.4, SSL) │
              └──────────────────┘
```

### Ecosystem Entegrasyonu

| Bilesen | Rol |
|---------|-----|
| **ArgoCD** | `azize-applicationset` ile otomatik deploy |
| **StackGres** | Izole PostgreSQL cluster (`fsdevops-db`) + otomatik backup |
| **Gitea Actions** | CI/CD pipeline (Act Runner + DinD + Kaniko) |
| **cert-manager** | Let's Encrypt TLS (Cloudflare DNS challenge) |
| **Ingress-Nginx** | HTTP/HTTPS routing + rate limiting |
| **Longhorn** | Persistent storage |
| **MetalLB** | LoadBalancer IP |

---

## Teknoloji Stack

### Frontend
| Teknoloji | Aciklama |
|-----------|----------|
| Next.js 16 | React framework (App Router) |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS 4 | Utility-first CSS |
| next-intl | 8 dil destegi (TR, EN, RU, ZH, DE, FR, AR, ES) |
| next-themes | Dark/Light mode |
| react-markdown | Blog icerik rendering (rehype-sanitize ile XSS korumalı) |

### Backend
| Teknoloji | Aciklama |
|-----------|----------|
| Go 1.23 | Backend API |
| Gin | HTTP web framework |
| GORM | ORM + auto migration |
| PostgreSQL 16.4 | Veritabani (StackGres, SSL) |
| JWT (HS256) | Authentication + token revocation |

### DevOps & Security
| Teknoloji | Aciklama |
|-----------|----------|
| Docker + Kaniko | Container build (multi-stage, non-root) |
| Kubernetes | Orchestration (HPA, PDB, Seccomp, NetworkPolicy) |
| ArgoCD | GitOps continuous delivery |
| Gitea Actions | CI/CD (test, scan, build, SBOM) |
| Trivy | Container image vulnerability scanning |
| Syft | SBOM generation (CycloneDX) |
| Renovate | Otomatik dependency update |

---

## Proje Yapisi

```
full-stack-devops-showcase/
├── backend/                        # Go REST API
│   ├── cmd/server/                 # Ana uygulama (graceful shutdown)
│   ├── config/                     # Konfigürasyon
│   ├── internal/
│   │   ├── handlers/               # HTTP handlers (auth, projects, certs, contact)
│   │   ├── middleware/             # Auth, CORS, CSRF, Rate limit, Audit log
│   │   └── models/                 # Database modelleri (User, Project, Cert, Contact)
│   └── Dockerfile
│
├── frontend/                       # Next.js uygulamasi
│   ├── app/[locale]/               # i18n App Router sayfalari
│   │   ├── blog/                   # Blog (markdown, tag filtre, arama)
│   │   ├── projects/               # Proje portfoyü
│   │   └── certifications/         # Sertifika vitrini
│   ├── components/                 # React bilesenleri (layout, sections, ui)
│   ├── content/blog/               # Markdown blog yazilari (8 dil)
│   ├── messages/                   # i18n cevirileri
│   ├── lib/                        # Veri ve utility fonksiyonlari
│   └── Dockerfile
│
├── manifests/                      # Kubernetes manifest'leri
│   ├── deployment.yaml             # Backend + Frontend (Seccomp, non-root)
│   ├── service.yaml                # ClusterIP Service'ler
│   ├── ingress.yaml                # TLS Ingress (iki domain, rate limit)
│   ├── configmap.yaml              # Backend env config (SSL enabled)
│   ├── secret.yaml.example         # Secret template (DB + backup credentials)
│   ├── networkpolicy.yaml          # 6 network policy (default-deny + whitelist)
│   ├── hpa.yaml                    # HorizontalPodAutoscaler (CPU %70, 1-3 replica)
│   ├── pdb.yaml                    # PodDisruptionBudget (minAvailable: 1)
│   ├── sgbackup.yaml               # StackGres backup (MinIO, daily, 7 gün)
│   ├── sgcluster.yaml              # StackGres cluster + DB init
│   ├── sgpgconfig.yaml             # StackGres PostgreSQL config
│   └── sginstanceprofile.yaml      # StackGres instance profile
│
├── .gitea/workflows/ci.yaml        # CI/CD pipeline
├── docker-compose.yml              # Local development
├── renovate.json                   # Dependency update config
└── Makefile                        # Build/push/test komutlari
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
# Backend:  http://localhost:8080/health
```

### Kubernetes (Ecosystem)

Bu proje ArgoCD tarafindan otomatik deploy edilir:

1. Gitea'da `azize-projects` org altinda repo olustur
2. `manifests/secret.yaml` dosyasini `secret.yaml.example`'dan olustur
3. Kodu push et — ArgoCD `manifests/deployment.yaml`'i algilar ve deploy eder

```bash
# Durum kontrolu
kubectl get pods -n azize-apps -l app.kubernetes.io/part-of=fsdevops-portfolio
kubectl get sgcluster -n azize-apps fsdevops-db
```

---

## CI/CD Pipeline

Her `main` branch'e push yapildiginda Gitea Actions calisir:

```
Test                    Build                Security              Deploy
─────────────────  ──────────────────  ──────────────────  ──────────────────
 go vet              Kaniko build        Trivy image scan    Manifest update
 go test -race        (backend)          (HIGH+CRITICAL)     Git push
 govulncheck         Kaniko build        Syft SBOM           ArgoCD auto-sync
 npm lint              (frontend)        (CycloneDX)
 npm audit
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
| POST | `/api/v1/contact` | Iletisim formu (3 req/saat) |

### Authentication
| Method | Endpoint | Aciklama |
|--------|----------|----------|
| POST | `/api/v1/auth/login` | Giris (5 deneme/15dk) |
| GET | `/api/v1/auth/me` | Kullanici bilgisi |
| POST | `/api/v1/auth/refresh` | Token yenile |
| POST | `/api/v1/auth/logout` | Cikis (token revocation) |

### Admin (JWT + CSRF)
| Method | Endpoint | Aciklama |
|--------|----------|----------|
| CRUD | `/api/v1/admin/projects` | Proje yonetimi |
| CRUD | `/api/v1/admin/certifications` | Sertifika yonetimi |
| GET | `/api/v1/admin/messages` | Iletisim mesajlari |

---

## Guvenlik

### Application Layer
- JWT authentication (HS256) + Bcrypt password hashing
- Token revocation (in-memory blacklist) ile logout
- CSRF koruması (double-submit cookie) admin endpoint'lerde
- Login brute-force koruması (5 deneme / 15 dakika)
- Contact form rate limiting (3 istek / saat)
- Markdown XSS sanitization (rehype-sanitize)
- HSTS (production), CSP, X-Frame-Options, X-Content-Type-Options
- HTTP server timeout'ları (Read: 15s, Write: 15s, Idle: 60s)
- Graceful shutdown (30s drain)
- Admin islem audit logging

### Infrastructure Layer
- Network Policy: default-deny + whitelist (6 policy)
- Non-root containers (uid 1001)
- Seccomp RuntimeDefault profili
- Read-only root filesystem (backend)
- Dropped capabilities (ALL)
- automountServiceAccountToken: false
- DB SSL baglantisi (sslmode=require)
- TLS (Let's Encrypt via cert-manager)
- Ingress rate limiting (10 RPS, 5 connection)

### CI/CD Security
- Go vulnerability scanning (govulncheck)
- npm dependency audit
- Container image scanning (Trivy - HIGH/CRITICAL)
- SBOM generation (Syft - CycloneDX format)
- Otomatik dependency update (Renovate)
- Pre-commit hook ile secret/credential commit engelleme

---

## Database

StackGres PostgreSQL cluster:

| Ozellik | Deger |
|---------|-------|
| Version | PostgreSQL 16.4 |
| Instance | 1 (single-node) |
| Storage | 5Gi (Longhorn) |
| Backup | Gunluk 02:00, 7 gun retention, lz4 sikistirma |
| Connection | SSL (sslmode=require) |
| Max Connections | 50 |

---

## Makefile Komutlari

```bash
make help            # Tum komutlari goster
make dev-backend     # Backend development (go run)
make dev-frontend    # Frontend development (npm run dev)
make docker-up       # Local containers baslat
make docker-down     # Containers durdur
make push            # Image'lari Gitea registry'ye push et
make test            # Testleri calistir (go test + npm lint)
make lint            # Linter'lari calistir (go vet + npm lint)
make clean           # Build artifact'lari temizle
```

---

## DNS Gereksinimleri

Cloudflare'da A kayitlari:
- `devops.azizedursun.com` → `<NODE_IP>`
- `api.devops.azizedursun.com` → `<NODE_IP>`
