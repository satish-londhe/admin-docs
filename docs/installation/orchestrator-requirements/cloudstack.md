---
sidebar_position: 2
title: "Apache CloudStack Requirements"
tags: ["installation", "cloudstack", "requirements", "acs"]
---

# Apache CloudStack Requirements

This page is the CloudStack onboarding checklist for StackConsole / CMP. Complete the [common prerequisites](/installation/prerequisites) and confirm [hosting topology](/installation/hosting-topology) as well.

CMP supports **full production** and **POC / staging** setups. Sections below apply to both unless noted otherwise.

:::info[Bare minimum]

Items marked as **required to begin** in the [checklist](#7-checklist) must be ready before setup can start. Without those prerequisites, installation cannot proceed.

:::

---

## 1. Access for StackConsole Team

To access the CloudStack Dashboard UI, use one of:

**Option A — VPN access (preferred)**

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Ganesh Kanade | ganesh.kanade@stackconsole.io |

**Option B — IP whitelist**

If VPN is not feasible, whitelist the StackConsole jump server:

```text
14.192.19.227
```

---

## 2. CloudStack Dashboard Credentials

CMP needs a CloudStack user with at least the **Domain Admin** role.

| Field | Value |
|---|---|
| **CloudStack URL** | _(for example `http://cloudstack.example.com:8080/client`)_ |
| **Username** | _(minimum **Domain Admin** role)_ |
| **Password** | |
| **CloudStack User Domain** | _(domain this admin user belongs to)_ |

:::warning[Domain Admin minimum]

CMP uses **DomainAdmin**-level credentials for API operations. ROOT admin is not required, but DomainAdmin is the **minimum**. The DomainAdmin user must be able to manage users, VMs, networks, and quotas in its domain.

:::

---

## 3. CMP VM → CloudStack connectivity

From all CMP VMs (staging or production), the CloudStack API endpoint must be reachable. **Private access is recommended** for production.

Communication between the CMP VM and CloudStack must be allowed on the configured ports (typically the CloudStack management / API port, often **8080**).

```bash
# From each CMP VM — replace with your CloudStack API URL
curl http://cloudstack.example.com:8080/client/api
```

A JSON error response (not connection refused) confirms the API is reachable.

---

## 4. CMP VM configuration

Shared install inputs:

- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a> — single-server (staging/POC), multi-server (production), and HA
- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a> — CPU/RAM/disk, partitions, and connectivity checks

---

## 5. Domain, SSL, SMTP, and app logos

Shared install inputs:

- <a href="/installation/domain-dns" target="_blank" rel="noopener noreferrer">Domain & DNS Configuration</a>
- <a href="/installation/prerequisites#ssl--tls-certificates" target="_blank" rel="noopener noreferrer">SSL / TLS Certificates</a>
- <a href="/installation/prerequisites#smtp--email-configuration" target="_blank" rel="noopener noreferrer">SMTP / Email Configuration</a>
- <a href="/installation/prerequisites#app-logos" target="_blank" rel="noopener noreferrer">App Logos</a>

---

## 6. Templates

In CloudStack, mark templates as **Featured** and **Public**. CMP fetches templates that are **both** featured and public.

Also required for CMP-compatible templates:

- Password-enabled
- SSH key injection enabled where offered
- Startup script / UserData support
- Scalable root disk

:::warning[L2 and password templates]

**L2 networks do not support UserData.** Do not rely on password-enabled templates on L2 networks — password injection will fail.

:::

Full guide: [Preparing CMP-compatible templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates).

---

## 7. Checklist

Items needed to **begin** setup (without these, setup cannot proceed):

### Access and CloudStack

- [ ] VPN access to StackConsole team provided **or** jump server IP whitelisted
- [ ] CloudStack access — at least **Domain Admin** user credentials (URL, username, password, domain)

### Staging VM

- [ ] Staging VM and credentials provided
- [ ] Staging URL provided
- [ ] Staging SSL certificates provided

### Production VM

- [ ] Frontend VM and credentials provided
- [ ] Backend VM and credentials provided
- [ ] Database VM and credentials provided

### Production URL and SSL

- [ ] Frontend URL provided
- [ ] Backend URL provided
- [ ] Frontend VM can reach backend API URL (`curl` / connectivity tested)
- [ ] Production SSL certificates provided

### Other

- [ ] SMTP details provided
- [ ] App logos (light + dark) provided when branding is required

---

## 8. CloudStack setup checkpoints

To ensure CMP works with Apache CloudStack, confirm:

| Check | Notes |
|---|---|
| At least one OS template available and working | Featured + Public; see [Templates](#6-templates) |
| Isolated and VPC networks working | |
| Virtual Machine (VM) creation working | |
| Public IP association with VMs and external access | Optional |
| Console access to provisioned VMs verified | |

### Services that need to be enabled

| Service | Required |
|---|---|
| Virtual Machine | Yes |
| Kubernetes | As offered |
| VNF | As offered |
| Load Balancer | As offered |
| Upload ISO | As offered |
| Upload Templates | As offered |
| VPC | Yes (when VPC networks are offered) |
| DNS | Not required |
| Backup | See below |

**Backup options:**

- CloudStack inbuilt backup
- CMP-level backup (for example automated snapshot)

Confirm which backup model you will use with StackConsole. Related: [VM Backup](/orchestrator-features/cloudstack/vm-backup), [Snapshots](/orchestrator-features/cloudstack/snapshots).

---

## 9. CloudStack global settings (before go-live)

| Setting | Required value | Purpose |
|---|---|---|
| `kvm.snapshot.enabled` | `true` | Enable VM snapshots on KVM (when using KVM) |
| Quota limits (CPU, RAM, IP, …) | Raised to suitable values | CloudStack defaults are low and cause provisioning failures — see [Quota Management (ACS)](/orchestrators/cloudstack/quota-management) |

---

## 10. Customer registration behaviour

CMP uses **deferred customer registration** on CloudStack. A customer account is **not** created in CloudStack at CMP registration time. The CloudStack account is created when the customer provisions their **first service** (for example creates a VM).

---

## Related

- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/domain-dns" target="_blank" rel="noopener noreferrer">Domain & DNS</a>
- [CloudStack Connecting & Initial Setup](/orchestrators/cloudstack/)
- [Preparing CMP-compatible templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates)
- [CloudStack Console Proxy](/orchestrators/cloudstack/console-proxy)
- [Quota Management](/quota/global-quotas)
