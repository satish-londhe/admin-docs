---
sidebar_position: 2
title: "Prerequisites & System Requirements"
tags: ["installation", "prerequisites", "infrastructure", "vm", "server"]
---

# Prerequisites & System Requirements

Before the StackConsole team begins the CMP installation, your infrastructure must meet all requirements on this page. 
---

## Deployment Models

CMP supports multiple deployment architectures — from a single POC VM to multi-server and HA production layouts. See **[Choosing a Hosting Topology](/installation/hosting-topology)** for diagrams and guidance.

| Environment | Typical layout | Purpose |
|---|---|---|
| **Staging / POC** | [Single server](/installation/hosting-topology#single-server-deployment) (1 VM) | Proof-of-concept, testing, pre-production validation |
| **Production** | [Multi-server](/installation/hosting-topology#multi-server-deployment) (3 VMs) | Frontend, Backend, and Database on separate servers |
| **Large / HA** | [HA multi-tier](/installation/hosting-topology#ha-multi-tier-deployment) (**18 servers**) | Redundant web, proxy, app, Redis, and database tiers |

:::info

VM sizing for staging and the standard three-VM production split is below. HA footprint is summarised under [HA — Server Requirements](#ha--server-requirements); confirm the full layout with StackConsole before provisioning.

:::

---

## CMP VM Specifications

### Staging / POC — Single VM

| Parameter | Requirement |
|---|---|
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 16 cores |
| **RAM** | 32 GB |
| **Storage** | 200 GB SSD |
| **Open Ports** | 22, 80, 443, 8081 |

### Production — Three-VM Setup

#### Frontend VM

| Parameter | Requirement |
|---|---|
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 16 GB |
| **Storage** | 100 GB SSD |
| **Open Ports** | 22, 80, 443, 8081 |

#### Backend VM

| Parameter | Requirement |
|---|---|
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 16 GB |
| **Storage** | 100 GB SSD |
| **Open Ports** | 22, 80, 8081 |

#### Database VM

| Parameter | Requirement |
|---|---|
| **OS** | Ubuntu 24.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 16 GB |
| **Storage** | 200 GB SSD |
| **Open Ports** | 22, 5432 |

### HA — Server Requirements

A full HA multi-tier CMP deployment requires **18 servers** in total (redundant web, proxy, application, cache, database, and related tiers).

See [HA multi-tier deployment](/installation/hosting-topology#ha-multi-tier-deployment) for the topology overview.

:::important

Per-role CPU, RAM, storage, and networking for HA are not listed here. **Check with the StackConsole team** for the detailed server breakdown and sizing before you provision.

:::

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


## App Logos

CMP supports light and dark themes. Two logo variants are required:

| Property | Value 
|---|---|
| **Dimensions** | 160 × 40 px 
| **Formats** | PNG (transparent background recommended for Email and Invoice PDF), SVG (For web portal)|
| **Variants** | Light theme logo + Dark theme logo |

Share logos to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io).

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

- [Domain & DNS Configuration](/installation/domain-dns)
