# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**DO NOT** open a public GitHub/Gitea issue for security vulnerabilities.

### How to Report

1. **Email:** Send a detailed report to **security@azizedursun.com**
2. **Subject line:** `[SECURITY] Full-Stack DevOps Portfolio - <Brief Description>`
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

| Action | Timeframe |
|--------|-----------|
| Acknowledgment | 48 hours |
| Initial assessment | 5 business days |
| Resolution target | 30 days (critical), 90 days (other) |

### Safe Harbor

We consider security research conducted in accordance with this policy to be:

- Authorized and will not pursue legal action
- Conducted in good faith
- Helpful to the security of this project

We ask that you:

- Make every effort to avoid privacy violations, data destruction, and service disruption
- Only interact with accounts you own or with explicit permission
- Do not access or modify data that does not belong to you
- Give us reasonable time to resolve issues before public disclosure

## Security Measures

This project implements the following security controls:

- **Authentication:** JWT with bcrypt password hashing
- **Authorization:** Role-based access control (RBAC)
- **Transport:** TLS 1.2+ with HSTS enforcement
- **Headers:** CSP, X-Frame-Options, X-Content-Type-Options
- **Rate Limiting:** Per-IP rate limiting on sensitive endpoints
- **Network:** Kubernetes NetworkPolicy with default-deny
- **Containers:** Non-root, read-only filesystem, dropped capabilities
- **CI/CD:** Automated vulnerability scanning (Trivy, govulncheck)
