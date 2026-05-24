---
sidebar_position: 1
title: "Prerequisites & System Requirements"
tags: ["installation", "prerequisites", "infrastructure", "vm", "server"]
---

# Prerequisites & System Requirements

Before the StackConsole team begins the CMP installation, your infrastructure must meet all requirements on this page. Items marked 🔴 are **mandatory** — setup cannot proceed without them.

---

## Deployment Models

CMP supports two deployment environments:

| Environment | VM Count | Purpose |
|---|---|---|
| **Staging / POC** | 1 VM | Proof-of-concept, testing, pre-production validation |
| **Production** | 3 VMs | Frontend, Backend, and Database on separate servers |

:::info
For production deployments, refer to the [Multi-Server Deployment Architecture](https://drive.google.com/file/d/1PWUnMk-CekQX-hg23Azo_QVnwQQo_zUR/view?usp=drive_link) diagram before provisioning VMs.
:::

---

## CMP VM Specifications

### Staging / POC — Single VM

| Parameter | Requirement |
|---|---|
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 16 cores |
| **RAM** | 32 GB |
| **Storage** | 250 GB SSD |
| **Open Ports** | 22, 80, 443, 8081 |

### Production — Three-VM Setup

#### Frontend VM

| Parameter | Requirement |
|---|---|
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 12 GB |
| **Storage** | 100 GB SSD |
| **Open Ports** | 22, 80, 443, 8081 |

#### Backend VM

| Parameter | Requirement |
|---|---|
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 12 GB |
| **Storage** | 100 GB SSD |
| **Open Ports** | 22, 80, 8081 |

#### Database VM

| Parameter | Requirement |
|---|---|
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 12 GB |
| **Storage** | 200 GB SSD |
| **Open Ports** | 22, 5432 |

---

## Disk / Storage Layout

CMP installs packages under `/`, `/var`, and `/home`. The layout depends on whether you use a single partition or multiple partitions.

### Single Partition (Recommended)

Allocate **all available space to `/`**. This is the simplest and recommended approach.

### Multiple Partitions

If you must use separate partitions, the **minimum** allocation is:

#### Frontend / Backend VM (Total: 100 GB)

| Mount Point | Minimum Size | Notes |
|---|---|---|
| `/home` | 50 GB | Primary application data |
| `/var` | 25 GB | Logs, queue data |
| `/` | 25 GB | OS and system |

#### Database VM (Total: 200 GB)

| Mount Point | Minimum Size | Notes |
|---|---|---|
| `/var` | 150 GB | PostgreSQL stores all data under `/var` |
| `/home` | 25 GB | Application-level data |
| `/` | 25 GB | OS and system |

:::warning
If partitions are too small, the installation will fail silently or services will crash after a short period. **Always verify free space** on all mount points before and after installation.
:::

---

## Inter-VM Communication (Production Only)

The three production VMs must be able to communicate with each other over **private IP addresses**:

| Source | Destination | Port | Protocol | Purpose |
|---|---|---|---|---|
| Frontend VM | Backend VM | **80** | TCP | Frontend → Backend API calls |
| Backend VM | Database VM | **5432** | TCP | Database connections (PostgreSQL) |

**Verify connectivity before installation:**

```bash
# From Frontend VM — must succeed
curl http://<BACKEND_PRIVATE_IP>:80

# From Backend VM — must succeed
curl http://<API_URL>        # e.g., curl https://api.example.com
nc -zv <DB_PRIVATE_IP> 5432
```

:::warning
Port 5432 must **only** be open on private IPs. Never expose the database port to the public internet.
:::

---

## Network & Firewall Requirements

| Port | Protocol | Direction | Purpose |
|---|---|---|---|
| 22 | TCP | Inbound | SSH access for installation |
| 80 | TCP | Inbound | HTTP (redirects to HTTPS) |
| 443 | TCP | Inbound | HTTPS — customer portal |
| 8081 | TCP | Inbound | Internal CMP service |
| 5432 | TCP | Internal only | PostgreSQL (DB VM, private network only) |

The CMP server must also have **outbound access** to all configured orchestrator API endpoints. See the per-orchestrator requirement pages for specific ports.

---

## Domain Name / URL

CMP requires publicly resolvable domain names before installation begins.

### Production (Recommended: Multi-URL)

| URL | Purpose | Example |
|---|---|---|
| **Frontend URL** | Customer-facing portal | `portal.yourcompany.com` |
| **Backend API URL** | API endpoint | `api.yourcompany.com` |

### Staging

| URL | Purpose | Example |
|---|---|---|
| **Staging URL** | Single URL for staging | `staging.yourcompany.com` |

:::info
DNS must be configured and propagated **before** the installation begins. Both the frontend and backend servers must be able to resolve and reach the backend API URL:
```bash
curl https://api.yourcompany.com   # must return a response, not a connection error
```
:::

---

## SSL / TLS Certificates

CMP requires HTTPS in all environments.

**Required files:**
- `fullchain.pem` — Full certificate chain including intermediate certificates
- `privkey.pem` — Private key

**How to provide:**
- Upload to `/home/ssl/` on each provisioned VM, **or**
- Share via email to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io)

:::warning
Intermediate certificates are required. A certificate without the full chain will cause SSL handshake failures in some browsers and API clients.
:::

See [SSL / TLS Setup](/installation/ssl-tls) for Let's Encrypt and commercial certificate instructions.

---

## SMTP / Email Configuration

CMP sends transactional emails (invoices, alerts, user notifications). Provide these SMTP credentials before setup:

| Variable | Example |
|---|---|
| `MAIL_HOST` | `smtp.mailgun.org` |
| `MAIL_PORT` | `587` |
| `MAIL_USERNAME` | `noreply@yourcompany.com` |
| `MAIL_PASSWORD` | _(your SMTP password)_ |
| `MAIL_ENCRYPTION` | `tls` |
| `MAIL_FROM_ADDRESS` | `noreply@yourcompany.com` |
| `MAIL_FROM_NAME` | `YourCompany Cloud` |

---

## CMP Super Admin Account

Designate one email address as the CMP Super Admin before installation:

| Environment | Purpose |
|---|---|
| **Production email** | Used for super-admin login and all CMP system notifications |
| **Staging email** | Used for staging environment only |

:::warning
- This email must be valid and accessible — it will receive all CMP system notifications.
- If Keycloak SSO is to be enabled later, this exact email address must be pre-registered in Keycloak before enabling SSO.
- See [Keycloak SSO Setup](/auth/keycloak) for details.
:::

---

## App Logos

CMP supports light and dark themes. Two logo variants are required:

| Property | Value 
|---|---|
| **Dimensions** | 160 × 40 px 
| **Formats** | PNG (transparent background recommended for Email and Invoice PDF), SVG (For web portal)|
| **Variants** | Light theme logo + Dark theme logo |

Share logos to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io).

---

## Billing & Currency Configuration

### Currency

For each currency your platform supports, provide:

| Field | Example |
|---|---|
| Currency Symbol | `USD` |
| Currency Name | `Dollar` |
| Fraction Name | `Cent` |
| Decimal places | `2` (e.g., `3.45443` → `5` decimal places) |

Multiple currencies are supported. Provide one row per currency.

### Payment Gateways

CMP integrates with the following payment gateways. For each gateway you wish to enable, provide **sandbox credentials** (API key/secret or client ID/secret) for testing before going live:

- [Stripe](https://stripe.com/)
- [Razorpay](https://razorpay.com/)
- [PayPal](https://www.paypal.com/)
- [Authorize.net](https://www.authorize.net/)
- [AsiaPay](https://www.asiapay.com/)
- [Mollie](https://www.mollie.com/)
- [M-Pesa](https://www.m-pesa.africa/)
- [Dinger](https://dinger.asia/)
- [Cardlink](https://cardlink.gr/)
- [HyperPay](https://www.hyperpay.com/)
- [Paytm](https://paytm.com/)

:::info
Some gateways support multiple payment methods, but only a subset may be integrated into CMP. Confirm supported methods before enabling a gateway.
:::

---

## Access for StackConsole Installation Team

The StackConsole team requires access to your infrastructure to perform installation and configuration. Choose one of the following:

### Option 1 — VPN Access (Preferred)

Provide VPN access to the following team members:

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Ganesh Kanade | ganesh.kanade@stackconsole.io |
| Saurabh Rapatwar | saurabh.rapatwar@stackconsole.io |

### Option 2 — IP Whitelist (Jump Server)

If VPN is not feasible, whitelist our jump server IP:

```
14.192.19.227
```

This IP must have SSH access (port 22) to all provisioned VMs.

---

<!-- ## Pre-Installation Checklist

Complete every item before requesting installation to begin. Items marked 🔴 are blockers.

### StackConsole Access
- 🔴 VPN access granted **or** jump server IP `14.192.19.227` whitelisted on all VMs
- 🔴 Orchestrator dashboard access provided (see orchestrator-specific requirements)

### VM Access
- 🔴 SSH credentials (IP, username, password/key, SSH port) provided for all VMs

#### Staging
- 🔴 Staging VM provisioned and accessible
- 🔴 Staging URL configured and DNS resolving
- 🔴 Staging SSL certificate uploaded

#### Production
- 🔴 Frontend VM provisioned and accessible
- 🔴 Backend VM provisioned and accessible
- 🔴 Database VM provisioned and accessible
- 🔴 Frontend URL configured and DNS resolving
- 🔴 Backend API URL configured and DNS resolving
- 🔴 Verified: Frontend VM can reach Backend URL (`curl https://api.yourcompany.com`)
- 🔴 Production SSL certificates uploaded

### Platform Configuration
- 🔴 SMTP credentials provided
- ⬜ App logos provided (light + dark, 160×40 px)
- ⬜ Super admin email designated (staging + production)
- ⬜ Currency details provided
- ⬜ Payment gateway sandbox credentials provided
- ⬜ Terms & conditions preference confirmed

--- -->

## Orchestrator-Specific Requirements

Each orchestrator has additional requirements on top of the common prerequisites above. Select your orchestrator:

- [Apache CloudStack Requirements](/installation/orchestrator-requirements/cloudstack)
- [VMware vSphere Requirements](/installation/orchestrator-requirements/vmware)
- [OpenStack Requirements](/installation/orchestrator-requirements/openstack)
- [Proxmox VE Requirements](/installation/orchestrator-requirements/proxmox)
- [CEPH Requirements](/installation/orchestrator-requirements/ceph)
- [PowerDNS Requirements](/installation/orchestrator-requirements/powerdns)
- [Keycloak SSO Requirements](/installation/orchestrator-requirements/keycloak)

---

## Related

- [CMP Server Installation](/installation/server-installation)
- [Domain & DNS Configuration](/installation/domain-dns)
- [SSL / TLS Setup](/installation/ssl-tls)
- [Environment Variables Reference](/installation/env-variables)
- [Initial Super Admin Setup](/installation/initial-setup)
