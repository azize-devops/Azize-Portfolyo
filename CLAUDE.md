# Full-stack DevOps Portfolio - Proje Context

Bu dosya Claude Code ile calisirken proje hakkinda hizli bilgi edinmek icin kullanilir.

## Proje Ozeti

DevOps yolculugunu belgeleyen full-stack portfolyo ve blog platformu. Go backend + Next.js frontend, Ecosystem Kubernetes cluster uzerinde ArgoCD ile otomatik deploy edilir.

## Mimari

### Ecosystem Entegrasyonu
Bu proje mevcut Ecosystem altyapisinin uzerine calisir:
- **ArgoCD**: `azize-applicationset` SCM Provider ile Gitea'daki `azize-projects` org'unu tarar, `manifests/deployment.yaml` bulunan repo'lari otomatik deploy eder
- **StackGres**: Izole PostgreSQL cluster (`fsdevops-db`) — Bitnami PostgreSQL degil
- **Gitea Actions**: CI/CD pipeline (Act Runner + DinD)
- **cert-manager**: Let's Encrypt TLS (Cloudflare DNS challenge)
- **Ingress-Nginx**: HTTP routing
- **Longhorn**: Persistent storage

### Namespace
| Namespace | Icerik |
|-----------|--------|
| `azize-apps` | Bu uygulamanin tum kaynaklari (ArgoCD tarafindan deploy edilir) |
| `argocd` | ApplicationSet (azize-applicationset) |

### Domain
- Frontend: `devops.azizedursun.com`
- Backend API: `api.devops.azizedursun.com`
- IP: `<NODE_IP>` (MetalLB)

## Teknoloji Stack

### Frontend
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- `NEXT_PUBLIC_API_URL` build-time arg (Docker ARG)

### Backend
- Go 1.23 + Gin framework + GORM
- PostgreSQL (StackGres) + JWT Authentication
- Health check: `GET /health`
- DB baglanti hatasi `log.Fatalf` ile sonlanir (init container gerekli)

### Veritabani
- StackGres SGCluster: `fsdevops-db` (PG 16.4, 1 instance, Longhorn 5Gi)
- DB: `fsdevops`, User: `fsdevops`

## Proje Yapisi
```
Full-stack-DevOps-portfolio/
├── backend/                    # Go REST API (degismez)
├── frontend/                   # Next.js uygulamasi (degismez)
├── manifests/                  # Kubernetes manifest'leri
│   ├── deployment.yaml         # Backend + Frontend Deployment (ArgoCD trigger)
│   ├── service.yaml            # ClusterIP Service'ler
│   ├── ingress.yaml            # TLS + iki domain
│   ├── configmap.yaml          # Backend environment config
│   ├── secret.yaml             # DB_PASSWORD, JWT_SECRET (.gitignore'da)
│   ├── secret.yaml.example     # Secret template
│   ├── networkpolicy.yaml      # 6 network policy
│   ├── sginstanceprofile.yaml  # StackGres instance profile
│   ├── sgpgconfig.yaml         # StackGres PostgreSQL config
│   └── sgcluster.yaml          # StackGres cluster + init script
├── .gitea/workflows/ci.yaml    # Gitea Actions CI/CD
├── docker-compose.yml          # Local development
├── Makefile                    # Build/push/test komutlari
└── .gitignore
```

## Onemli Komutlar

```bash
# Local development
docker compose up -d
make dev-backend
make dev-frontend

# Image build & push (Gitea registry)
make push

# Test
make test
make lint

# Kubernetes durum kontrolu
kubectl get pods -n azize-apps -l app.kubernetes.io/part-of=fsdevops-portfolio
kubectl get sgcluster -n azize-apps fsdevops-db
```

## GitOps Akisi
1. Kod push → Gitea
2. Gitea Actions: test → build → push image → rollout restart
3. ArgoCD: manifests/ degisikliklerini otomatik sync eder

## Onemli Detaylar
- `manifests/deployment.yaml` ZORUNLU — ArgoCD bu dosyayi arar
- Manifest'lerde namespace BELIRTILMEZ — ArgoCD `azize-apps` inject eder
- `secret.yaml` Git'e commit edilmez, `secret.yaml.example` kullanilir
- Credentials hardcoded (Ecosystem pattern ile uyumlu)
- Backend init container (`wait-for-db`) StackGres hazir olana kadar bekler
- Frontend `readOnlyRootFilesystem: false` — Next.js cache yazmasi gerekiyor

## API Endpoints

### Public
- `GET /health` — Health check
- `GET /api/v1/projects` — Projeler
- `GET /api/v1/certifications` — Sertifikalar
- `POST /api/v1/contact` — Iletisim formu (rate limited)

### Protected (JWT)
- `POST /api/v1/auth/login` — Giris
- `GET /api/v1/auth/me` — Kullanici bilgisi
- Admin CRUD: `/api/v1/admin/projects`, `/api/v1/admin/certifications`, `/api/v1/admin/messages`

## Guvenlik
- JWT authentication + Bcrypt password hashing
- Network Policy: default-deny + whitelist
- Non-root containers (uid 1001)
- Security headers (Ingress annotation)
- Rate limiting (10 RPS, 5 connections)
- StackGres operator erisimine izin (namespace: stackgres)
