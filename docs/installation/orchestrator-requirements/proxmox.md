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

## 2. Proxmox credentials for CMP

CMP connects to Proxmox with a dedicated API user. That user must belong to a permissions group with the required roles (default group name: **UserAdmin**).

| Field | Value |
|---|---|
| **Proxmox URL** | _(for example `https://proxmox.example.com:8006`)_ |
| **Username** | _(member of the CMP permissions group — for example `UserAdmin`)_ |
| **Password** | |

:::warning[Required roles]

A user without the **PVEVMAdmin**, **PVEDatastoreAdmin**, and **PVESDNAdmin** roles at path `/` is not sufficient. CMP needs those roles to manage VMs, storage, and SDN/networks.

:::

**How to create the group and assign roles:**

👉 [Configure Proxmox Permissions](/orchestrators/proxmox/connecting#configure-proxmox-permissions) (on [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting))

For StackConsole onboarding access to the Proxmox UI, you may still share a temporary admin account in addition to the CMP API user — see [Access for StackConsole Team](#1-access-for-stackconsole-team).

After permissions and connectivity are ready, configure the cloud provider in CMP:

👉 [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) — Provider Setup wizard, zone, templates, storage, quota, and networks

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

- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- <a href="/installation/prerequisites#ssl--tls-certificates" target="_blank" rel="noopener noreferrer">SSL / TLS Certificates</a>
- <a href="/installation/prerequisites#smtp--email-configuration" target="_blank" rel="noopener noreferrer">SMTP / Email Configuration</a>
- <a href="/installation/prerequisites#app-logos" target="_blank" rel="noopener noreferrer">App Logos</a>

---

## 6. Storage types

Configure storage labels in Proxmox to match what you want displayed in the CMP portal (for example **SSD**, **NVMe**, **HDD**). Storage must be tagged correctly at the Proxmox level. CMP displays storage types as defined in Proxmox — no separate CMP-level storage-type mapping is required for display.

---

## 7. Templates and networks

### Templates

Proxmox uses **VM templates** (cloned from existing VMs) for CMP provisioning. Templates must be **cloud-init ready** (password / SSH where offered, QEMU Guest Agent).

Full procedure: [Preparing CMP-compatible templates](/orchestrators/proxmox/templates/preparing-cmp-compatible-templates).

Key points:

- Support password reset
- Support SSH key injection where offered
- Be cloud-init compatible
- Be accessible to the Proxmox node(s) CMP will manage
- On **multi-node** clusters, templates and shared storage must be available on nodes that can receive VMs — Proxmox has no DRS; CMP picks the node at provision time using the [Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm)

### Networks

Before CMP setup, ensure:

- **Public networks** — for customer VMs that need internet access
- **Private networks** — for isolated workloads
- **Linux bridges** configured on Proxmox nodes (for example `vmbr0`) — VMs must use bridges, not physical NICs (`eth0` / `eno1`). See [Linux bridge vs physical NIC](/orchestrators/proxmox/networks-and-ipam#linux-bridge-vs-physical-nic)

---

## 8. Checklist

Items needed to **begin** setup (without these, setup cannot proceed):

### Access and Proxmox

- [ ] VPN access to StackConsole team provided **or** jump server IP whitelisted
- [ ] Proxmox UI accessible from browser via VPN or whitelisted IP
- [ ] **UserAdmin** group (or equivalent) created with **PVEVMAdmin**, **PVEDatastoreAdmin**, and **PVESDNAdmin** at path `/` — see [Configure Proxmox Permissions](/orchestrators/proxmox/connecting#configure-proxmox-permissions)
- [ ] CMP API user added to that group
- [ ] CMP API credentials provided (URL, username, password)

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
| OS templates available and working | See [Preparing CMP-compatible templates](/orchestrators/proxmox/templates/preparing-cmp-compatible-templates) |
| VM creation works from the Proxmox UI | |
| Public and private networks configured | |
| VM console access works from the Proxmox UI | |
| Proxmox API reachable from CMP VMs | Port **8006** |
| Group permissions at `/` include required roles | See [Configure Proxmox Permissions](/orchestrators/proxmox/connecting#configure-proxmox-permissions) |

---

## Related

- <a href="/installation/prerequisites" target="_blank" rel="noopener noreferrer">Prerequisites & System Requirements</a>
- <a href="/installation/hosting-topology" target="_blank" rel="noopener noreferrer">Choosing a Hosting Topology</a>
- <a href="/installation/prerequisites#domain-name--url" target="_blank" rel="noopener noreferrer">Domain Name / URL</a>
- [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) — permissions, Provider Setup wizard, zone, templates, storage, quota, and networks
- [Proxmox VE Orchestrator Guide](/orchestrators/proxmox/)
- [Preparing CMP-compatible templates](/orchestrators/proxmox/templates/preparing-cmp-compatible-templates)
- [Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm)
- [Payment Gateways](/billing/payment-gateways/)
