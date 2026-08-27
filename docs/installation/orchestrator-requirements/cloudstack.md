---
sidebar_position: 2
title: "Apache CloudStack Requirements"
tags: ["installation", "cloudstack", "requirements", "acs"]
---

# Apache CloudStack Requirements

This page is the CloudStack onboarding checklist for StackConsole / CMP. Complete the [common prerequisites](/installation/prerequisites) and confirm [hosting topology](/installation/hosting-topology) as well.

CMP supports **full production** and **POC / staging** setups. Sections below apply to both unless noted otherwise.

:::info[Bare minimum]

Items marked as **required to begin** in the [checklist](#8-checklist) must be ready before setup can start. Without those prerequisites, installation cannot proceed.

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

- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Prerequisites — Domain Name / URL</a>
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

## 7. Console Proxy domain (DNS)

If customers will use VM console access from CMP, configure DNS for the CloudStack **Console Proxy** subdomain.

CloudStack generates per-session hostnames in the form `aaa-bbb-ccc-ddd.console.yourcompany.com` that must resolve to the Console Proxy VM (CPVM) public IP (`aaa.bbb.ccc.ddd`).

Use a **wildcard record** for the simplest setup:

```text
*.console.yourcompany.com  →  A  →  <CloudStack console proxy public IP or range>
```

Or configure individual records per public IP as required by your DNS provider. Prefer a **dedicated** console subdomain (for example `console.yourcompany.com`), not your main CMP portal domain.

Full configuration (SSL, CloudStack global settings, end-to-end tests): [Console Proxy Setup](/orchestrators/cloudstack/console-proxy).

---

## 8. Checklist

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
- [ ] Console Proxy DNS configured when VM console is offered — see [Console Proxy domain](#7-console-proxy-domain-dns)
- [ ] VM Backup model confirmed with StackConsole when backup will be offered — see [VM Backup — provider decision](#10-vm-backup--provider-decision-before-go-live) _(optional until backup is in scope)_

---

## 9. CloudStack setup checkpoints

To ensure CMP works with Apache CloudStack, confirm:

| Check | Notes |
|---|---|
| At least one OS template available and working | Featured + Public; see [Templates](#6-templates) |
| Isolated and VPC networks working | |
| Virtual Machine (VM) creation working | |
| Public IP association with VMs and external access | Optional |
| Console access to provisioned VMs verified | Console Proxy DNS — see [Console Proxy domain](#7-console-proxy-domain-dns) |

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
| Backup | Optional — disabled by default; [provider decision](#10-vm-backup--provider-decision-before-go-live) required |

---

## 10. VM Backup — provider decision before go-live

VM Backup is **not enabled automatically** when StackConsole onboards your CloudStack environment. Backup stays **disabled** until the **cloud provider** confirms whether to offer it and which model applies.

:::important[Cloud provider decides]

StackConsole does **not** pick a backup model for you. The **cloud provider** must:

1. Decide whether to offer **VM Backup** to customers
2. Choose **one** model for the environment:
   - **[Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup)** — scheduled **root volume** snapshots as recovery
   - **[CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup)** — CloudStack Backup & Recovery with a provider plugin
3. Configure the **required CloudStack settings** for that model before go-live

You cannot use both models in the same environment. See [Backup](/orchestrator-features/cloudstack/backup/).

:::

### Decision guide

| Your situation | Recommended model |
|---|---|
| CloudStack **before 4.20**, or no B&R plugin deployed | [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup) |
| CloudStack **4.20+** with B&R and Veeam / Networker / NAS configured | [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup) |
| Backup not ready or not sold yet | Do not offer VM Backup yet |

Tell StackConsole which option applies **before go-live**.

### CloudStack settings — Automated Volume Snapshot as Backup

Configure these in CloudStack when you choose this model:

| Requirement | Notes |
|---|---|
| Volume and VM snapshots working in CloudStack | Test on your hypervisor and primary/secondary storage |
| `kvm.snapshot.enabled = true` | **Required on KVM** when snapshots of running VMs are needed — see [global settings](#11-cloudstack-global-settings-before-go-live) |
| Snapshot behaviour matches storage | NFS vs Ceph affects VM snapshot with memory — plan snapshot type accordingly |
| Secondary storage capacity | Scheduled snapshots consume secondary storage |

Feature reference: [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup)

### CloudStack settings — B&R-Based Backup

Configure these in CloudStack when you choose this model:

| Requirement | Notes |
|---|---|
| `backup.framework.enabled = true` | CloudStack Global Settings |
| `backup.framework.provider.plugin` | Per zone — `veeam`, `networker`, or `nas` |
| Provider plugin installed and configured | Veeam (VMware), Networker or NAS (KVM) — operator task in CloudStack |
| Backup offerings imported | **Service Offerings → Backup Offerings → Import Backup Offering** |
| ACS version | 4.14+ minimum; **4.20+** recommended for production B&R |

Official reference: [CloudStack — Backup and Recovery](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/backup_and_recovery.html)

Feature reference: [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup)

### Checklist (when offering VM Backup)

- [ ] Backup model chosen and communicated to StackConsole
- [ ] CloudStack prerequisites for chosen model completed and tested (snapshot or B&R restore on a test VM)

---

## 11. CloudStack global settings (before go-live)

| Setting | Required value | Purpose |
|---|---|---|
| `kvm.snapshot.enabled` | `true` | Enable root volume snapshots on running KVM VMs — often **required** for [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup) on KVM |
| Quota limits (CPU, RAM, IP, …) | Set to **`-1`** (unlimited) | CloudStack factory defaults are low and cause provisioning failures — see [Quota Management (ACS)](/orchestrators/cloudstack/quota-management#account-level-quota-settings) |

---

## 12. Customer registration behaviour

CMP uses **deferred customer registration** on CloudStack. A customer account is **not** created in CloudStack at CMP registration time. The CloudStack account is created when the customer provisions their **first service** (for example creates a VM).

---

## Related

- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- [CloudStack Connecting & Initial Setup](/orchestrators/cloudstack/)
- [Preparing CMP-compatible templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates)
- [CloudStack Console Proxy](/orchestrators/cloudstack/console-proxy)
- [CloudStack Backup](/orchestrator-features/cloudstack/backup/) — concepts, schedules, customer flows
