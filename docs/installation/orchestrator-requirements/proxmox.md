---
sidebar_position: 5
title: "Proxmox VE Requirements"
tags: ["installation", "proxmox", "requirements", "pve"]
---

# Proxmox VE Requirements

This page is the Proxmox VE onboarding checklist for StackConsole / CMP. Complete the [common prerequisites](/installation/prerequisites) and confirm [hosting topology](/installation/hosting-topology) as well.

:::info[Bare minimum]

Items marked as **required to begin** in the [checklist](#8-checklist) must be ready before setup can start. Without those prerequisites, installation cannot proceed.

:::

---

## 1. Access for StackConsole Team

To access the Proxmox web UI, use one of:

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

:::info

Ensure the Proxmox web UI is accessible from the browser through VPN or from the whitelisted IP before contacting the StackConsole team.

:::

---

## 2. Proxmox Dashboard Credentials

This user must have **root-level admin rights** (zones, datastores, users, VM operations, and related management).

| Field | Value |
|---|---|
| **Proxmox URL** | _(for example `https://proxmox.example.com:8006`)_ |
| **Username** | _(with root access)_ |
| **Password** | |

:::warning[Root-level access]

A limited-access user is not sufficient. CMP needs root-level access to manage storage, networks, and VMs.

:::

---

## 3. CMP VM → Proxmox connectivity

From all CMP VMs, the Proxmox API must be reachable. **Private access is recommended** for production.

Communication between the CMP VM and Proxmox must be allowed on the Proxmox API port (default **8006**).

```bash
curl -k https://proxmox.example.com:8006/api2/json/version
```

---

## 4. CMP VM configuration

Shared install inputs:

- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>

---

## 5. Domain, SSL, SMTP, and app logos

Shared install inputs:

- <a href="/installation/domain-dns" target="_blank" rel="noopener noreferrer">Domain & DNS Configuration</a>
- <a href="/installation/prerequisites#ssl--tls-certificates" target="_blank" rel="noopener noreferrer">SSL / TLS Certificates</a>
- <a href="/installation/prerequisites#smtp--email-configuration" target="_blank" rel="noopener noreferrer">SMTP / Email Configuration</a>
- <a href="/installation/prerequisites#app-logos" target="_blank" rel="noopener noreferrer">App Logos</a>

---

## 6. Storage types

Configure storage labels in Proxmox to match what you want displayed in the CMP portal (for example **SSD**, **NVMe**, **HDD**). Storage must be tagged correctly at the Proxmox level. CMP displays storage types as defined in Proxmox — no separate CMP-level storage-type mapping is required for display.

---

## 7. Templates and networks

### Templates

Proxmox uses **VM templates** (cloned from existing VMs) or container templates for provisioning. Templates used by CMP must:

- Support password reset
- Support SSH key injection where offered
- Be cloud-init compatible where applicable
- Be accessible to the Proxmox node(s) CMP will manage

Confirm the full template checklist with the StackConsole team during onboarding. See also [Proxmox VE setup](/orchestrators/proxmox/).

### Networks

Before CMP setup, ensure:

- **Public networks** — for customer VMs that need internet access
- **Private networks** — for isolated workloads
- Network bridges configured on Proxmox nodes

---

## 8. Checklist

Items needed to **begin** setup (without these, setup cannot proceed):

### Access and Proxmox

- [ ] VPN access to StackConsole team provided **or** jump server IP whitelisted
- [ ] Proxmox UI accessible from browser via VPN or whitelisted IP
- [ ] Root-level admin credentials provided (URL, username, password)

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

## 9. Proxmox setup checkpoints

| Check | Notes |
|---|---|
| OS templates available and working | See [Templates and networks](#7-templates-and-networks) |
| VM creation works from the Proxmox UI | |
| Public and private networks configured | |
| VM console access works from the Proxmox UI | |
| Proxmox API reachable from CMP VMs | Port **8006** |

---

## Related

- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/domain-dns" target="_blank" rel="noopener noreferrer">Domain & DNS</a>
- [Proxmox VE Orchestrator Guide](/orchestrators/proxmox/)
- [Payment Gateways](/billing/payment-gateways/)
