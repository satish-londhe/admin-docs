---
sidebar_position: 2
title: "Prerequisites & System Requirements"
tags: ["installation", "prerequisites", "infrastructure", "vm", "server"]
---

# Prerequisites & System Requirements

Before the StackConsole team begins the CMP installation, your infrastructure must meet all requirements on this page.

---

## Deployment models

CMP supports multiple deployment architectures — from a single POC VM to multi-server and HA production layouts. See **[Choosing a Hosting Topology](/installation/hosting-topology)** for diagrams and guidance.

| Environment | Typical layout | Purpose |
|---|---|---|
| **Staging / POC** | [Single server](/installation/hosting-topology#single-server-deployment) (1 VM) | Proof-of-concept, testing, pre-production validation |
| **Production** | [Multi-server](/installation/hosting-topology#multi-server-deployment) (3 VMs) | Frontend, Backend, and Database on separate servers |
| **Large / HA** | [HA multi-tier](/installation/hosting-topology#ha-multi-tier-deployment) (**18 servers**) | Redundant web, proxy, app, Redis, and database tiers |

Use the two sections below for **complete** staging and production checklists. Shared items (SMTP, logos, installer access) are listed under [Common requirements](#common-requirements) at the end of this page.

---

## Staging / Single VM — full requirements

One VM runs the frontend, backend, database, Redis, and scheduler together. Use this layout for POC, staging, and pre-production validation — **not** for busy production workloads.

**Topology:** [Single-server deployment](/installation/hosting-topology#single-server-deployment)

### VM specifications

| Parameter | Requirement |
|---|---|
| **Count** | **1 VM** (all CMP roles co-located) |
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 16 cores |
| **RAM** | 32 GB |
| **Storage** | 200 GB SSD |
| **Open ports** | 22, 80, 443, 8081 |

### Storage layout

CMP installs packages under `/`, `/var`, and `/home`.

**Single partition (recommended)**

Allocate **all available space to `/`**. This is the simplest and recommended approach for staging.

**Multiple partitions (minimum for 200 GB total)**

| Mount point | Minimum size | Notes |
|---|---|---|
| `/var` | 100 GB | PostgreSQL, logs, queue data |
| `/home` | 75 GB | Application data |
| `/` | 25 GB | OS and system |

:::warning
If partitions are too small, the installation will fail silently or services will crash after a short period. **Always verify free space** on all mount points before and after installation.
:::

### DNS / URL \{#staging-dns--url\}

Staging uses **one public URL** for the portal and API on the same host.

| URL | Purpose | Example |
|---|---|---|
| **Staging URL** | Portal and API on one hostname | `staging.yourcompany.com` |

DNS must be configured and propagated **before** installation begins. From the staging VM:

```bash
curl https://staging.yourcompany.com   # must return a response, not a connection error
```

### SSL / TLS \{#staging-ssl--tls\}

HTTPS is required in all environments.

| Item | Requirement |
|---|---|
| **Certificate files** | `fullchain.pem` (full chain including intermediates) and `privkey.pem` (private key) |
| **Where to place** | Upload to `/home/ssl/` on the staging VM, **or** share via email to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io) |

:::warning
Intermediate certificates are required. A certificate without the full chain will cause SSL handshake failures in some browsers and API clients.
:::

### Staging checklist

| Item | Staging requirement |
|---|---|
| **VM** | 1 × Ubuntu 24.04, 16 CPU, 32 GB RAM, 200 GB SSD |
| **Ports** | 22, 80, 443, 8081 open |
| **Storage** | Single `/` partition recommended, or multi-partition layout above |
| **DNS** | One staging URL (for example `staging.example.com`) |
| **SSL** | `fullchain.pem` + `privkey.pem` on the VM |
| **Also required** | [SMTP](#smtp--email-configuration), [logos](#app-logos), [installer access](#access-for-stackconsole-installation-team) |

---

## Production — three-VM requirements

Standard production splits CMP across **three VMs**: Frontend, Backend, and Database. Frontend serves the customer portal and reverse-proxies API traffic to the backend.

**Topology:** [Multi-server deployment](/installation/hosting-topology#multi-server-deployment)

### VM specifications

Provision **three separate VMs**:

#### Frontend VM

| Parameter | Requirement |
|---|---|
| **Role** | NGINX + Customer Portal |
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 16 GB |
| **Storage** | 100 GB SSD |
| **Open ports** | 22, 80, 443, 8081 |

#### Backend VM

| Parameter | Requirement |
|---|---|
| **Role** | CMP API, workers, scheduler |
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 16 GB |
| **Storage** | 100 GB SSD |
| **Open ports** | 22, 80, 8081 |

#### Database VM

| Parameter | Requirement |
|---|---|
| **Role** | PostgreSQL |
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 16 GB |
| **Storage** | 200 GB SSD |
| **Open ports** | 22, 5432 |

### Storage layout

**Single partition (recommended)**

On each VM, allocate **all available space to `/`**.

**Multiple partitions (minimum)**

#### Frontend / Backend VM (100 GB total each)

| Mount point | Minimum size | Notes |
|---|---|---|
| `/home` | 50 GB | Primary application data |
| `/var` | 25 GB | Logs, queue data |
| `/` | 25 GB | OS and system |

#### Database VM (200 GB total)

| Mount point | Minimum size | Notes |
|---|---|---|
| `/var` | 150 GB | PostgreSQL stores all data under `/var` |
| `/home` | 25 GB | Application-level data |
| `/` | 25 GB | OS and system |

:::warning
If partitions are too small, the installation will fail silently or services will crash after a short period. **Always verify free space** on all mount points before and after installation.
:::

### Inter-VM communication

The three production VMs must reach each other over **private IP addresses**:

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

### DNS / URL \{#production-dns--url\}

Production uses **two public URLs** — one for the portal and one for the API.

| URL | Purpose | Example |
|---|---|---|
| **Frontend URL** | Customer-facing portal | `portal.yourcompany.com` |
| **Backend API URL** | API endpoint | `api.yourcompany.com` |

DNS must be configured and propagated **before** installation begins. Both frontend and backend servers must resolve and reach the backend API URL:

```bash
curl https://api.yourcompany.com   # must return a response, not a connection error
```

#### What are the two URLs for?

CMP runs as **two applications**: a **frontend** (portal in the browser) and a **backend** (API for data and actions). Production therefore needs two FQDNs.

#### Recommended naming

| Role | Recommended example |
|---|---|
| Frontend (portal) | `portal.example.com` |
| Backend (API) | `api.example.com` |

#### Do the two FQDNs need separate public IPs?

**No.** Both domains can use the **same public IP** on the frontend server:

| FQDN | How it is served |
|---|---|
| `portal.example.com` | Served from the **frontend** server |
| `api.example.com` | Reverse-proxied from the **frontend** server to the **backend** server |

You do **not** need a separate public IP only for the API hostname when this reverse-proxy pattern is used.

### SSL / TLS \{#production-ssl--tls\}

HTTPS is required in all environments.

| Item | Requirement |
|---|---|
| **Certificate files** | `fullchain.pem` (full chain including intermediates) and `privkey.pem` (private key) |
| **Where to place** | Upload to `/home/ssl/` on **each** provisioned VM (Frontend, Backend, Database), **or** share via email to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io) |

The frontend VM terminates HTTPS for both portal and API hostnames when using the standard reverse-proxy layout.

:::warning
Intermediate certificates are required. A certificate without the full chain will cause SSL handshake failures in some browsers and API clients.
:::

### Production checklist

| Item | Production requirement |
|---|---|
| **VMs** | 3 × Ubuntu 24.04 — Frontend (8 CPU, 16 GB, 100 GB), Backend (8 CPU, 16 GB, 100 GB), Database (8 CPU, 16 GB, 200 GB) |
| **Ports** | Frontend: 22, 80, 443, 8081 — Backend: 22, 80, 8081 — Database: 22, 5432 (private only) |
| **Storage** | Per-VM layout above |
| **Networking** | Private connectivity Frontend → Backend (80) and Backend → Database (5432) |
| **DNS** | Two URLs — portal + API (can share one public IP on Frontend) |
| **SSL** | `fullchain.pem` + `privkey.pem` on each VM |
| **Also required** | [SMTP](#smtp--email-configuration), [logos](#app-logos), [installer access](#access-for-stackconsole-installation-team) |

---

## HA — server requirements

A full HA multi-tier CMP deployment requires **18 servers** in total (redundant web, proxy, application, cache, database, and related tiers).

See [HA multi-tier deployment](/installation/hosting-topology#ha-multi-tier-deployment) for the topology overview.

:::important

Per-role CPU, RAM, storage, and networking for HA are not listed here. **Check with the StackConsole team** for the detailed server breakdown and sizing before you provision.

:::

---

## Common requirements

The following apply to **both** staging and production installations.

### Domain Name / URL \{#domain-name--url\}

CMP requires publicly resolvable domain names **before** installation begins. Requirements depend on your deployment model:

| Environment | DNS / URL requirements |
|---|---|
| **Staging / single VM** | One URL for portal and API — [Staging — DNS / URL](#staging-dns--url) |
| **Production (3 VMs)** | Separate portal and API URLs (can share one public IP) — [Production — DNS / URL](#production-dns--url) |

### SSL / TLS certificates \{#ssl--tls-certificates\}

HTTPS is required in all environments. Provide **`fullchain.pem`** (full chain including intermediates) and **`privkey.pem`** (private key) before installation:

| Environment | SSL requirements |
|---|---|
| **Staging / single VM** | Certificates on the single VM — [Staging — SSL / TLS](#staging-ssl--tls) |
| **Production (3 VMs)** | Certificates on each VM (Frontend, Backend, Database) — [Production — SSL / TLS](#production-ssl--tls) |

:::warning
Intermediate certificates are required. A certificate without the full chain will cause SSL handshake failures in some browsers and API clients.
:::

### SMTP / Email configuration

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

### SMS / Mobile verification (optional)

If you plan to enable **mobile OTP verification during customer registration**, provide configuration details for one of the supported SMS providers to the StackConsole deployment team:

* **[MSG91](/platform-features/sms-gateways/msg91)** (`MSG91_AUTH_KEY`, `MSG91_FLOW_ID`, `MSG91_SENDER`)
* **[Twilio](/platform-features/sms-gateways/twilio)** (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`)
* **[Spinning Disk](/platform-features/sms-gateways/spinning-disk)** (`SPINNING_DISK_AUTH_KEY`, `SPINNING_DISK_SENDER`, DLT template mapping)

See **[SMS Gateways & Verification](/platform-features/sms-gateways/)** for full parameter specifications.

### App logos

CMP supports light and dark themes. Two logo variants are required:

| Property | Value |
|---|---|
| **Dimensions** | 160 × 40 px |
| **Formats** | PNG (transparent background recommended for Email and Invoice PDF), SVG (for web portal) |
| **Variants** | Light theme logo + Dark theme logo |

Share logos to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io).

### Access for StackConsole installation team

The StackConsole team requires access to your infrastructure to perform installation and configuration. Choose one of the following:

#### Option 1 — VPN access (preferred)

Provide VPN access to the following team members:

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Ganesh Kanade | ganesh.kanade@stackconsole.io |
| Saurabh Rapatwar | saurabh.rapatwar@stackconsole.io |

#### Option 2 — IP whitelist (jump server)

If VPN is not feasible, whitelist our jump server IP:

```
14.192.19.227
```

This IP must have SSH access (port 22) to all provisioned VMs.

---

## Orchestrator-specific requirements

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

- [Choosing a Hosting Topology](/installation/hosting-topology)
- [Orchestrator Requirements Overview](/installation/orchestrator-requirements/)
- [Apache CloudStack Requirements](/installation/orchestrator-requirements/cloudstack) — includes Console Proxy DNS
- [Architecture Overview](/overview/architecture-overview)
