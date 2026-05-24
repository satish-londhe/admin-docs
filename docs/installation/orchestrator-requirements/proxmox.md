---
sidebar_position: 5
title: "Proxmox VE Requirements"
tags: ["installation", "proxmox", "requirements", "pve"]
---

# Proxmox VE Requirements

This page covers the Proxmox-specific requirements needed before StackConsole can connect CMP to your Proxmox Virtual Environment. Complete the [common prerequisites](/installation/prerequisites) first.

---

## 1. Access for StackConsole Team

**Option A — VPN Access (preferred)**

Provide VPN access to:

| Name | Email |
|---|---|
| Satish Londhe | satish.londhe@stackconsole.io |
| Abhishek Burkule | abhishek.burkule@stackconsole.io |

**Option B — IP Whitelist**

Whitelist our jump server:
```
14.192.19.227
```

:::info
Ensure the Proxmox web UI is accessible from the browser through VPN or from the whitelisted IP address before contacting the StackConsole team.
:::

---

## 2. Proxmox Dashboard Credentials

🔴 This user must have **root-level admin rights** to perform all actions including node management, VM operations, storage configuration, and user management.

| Field | Value |
|---|---|
| Proxmox URL | _(e.g., `https://proxmox.yourcompany.com:8006`)_ |
| Username _(with root access)_ | |
| Password | |

:::warning
Proxmox requires root-level access for CMP to manage datastores, configure networks, and create VMs. A limited-access user is not sufficient.
:::

---

## 3. CMP VM → Proxmox Connectivity

From all CMP VMs, the Proxmox API must be reachable. **Private access is recommended** for production.

**Verify from the CMP VM:**
```bash
curl -k https://proxmox.yourcompany.com:8006/api2/json/version
```

Communication between the CMP VM and Proxmox must be allowed on the Proxmox API port (default: **8006**).

---

## 4. VM Templates

Proxmox uses **VM Templates** (cloned from existing VMs) or **Container Templates** for provisioning. All templates used by CMP must be prepared according to the Proxmox template requirements:

📄 Refer to: [Proxmox Template/Image Creation Guide](https://docs.google.com/document/d/1CYCw3Jbh2u24_8lci4Ie3H4-QgQIJLh96rBlOABiDf8/edit?tab=t.0#heading=h.lrsab14uye1z)

**Key requirements:**
- Templates must support password reset
- Templates must support SSH key injection
- Templates should be cloud-init compatible
- Templates must be accessible to the Proxmox node that CMP will manage

---

## 5. Storage Types

Configure storage labels in Proxmox to match what you want displayed in the CMP portal. Options:

- SSD
- NVMe
- HDD

Storage types must be properly configured at the Proxmox level with the required tags. No CMP-level configuration is needed — CMP displays storage types as they are defined in Proxmox.

---

## 6. Network Configuration

Before CMP setup, ensure the following are configured and working in Proxmox:

- **Public networks** — for customer VMs that require internet access
- **Private networks** — for isolated customer workloads
- Network bridges configured on Proxmox nodes

---

## 7. Proxmox Setup Checkpoints

The StackConsole team will verify the following during installation. Ensure these work before scheduling setup:

- [ ] OS templates available per the [Proxmox Template Guide](https://docs.google.com/document/d/1CYCw3Jbh2u24_8lci4Ie3H4-QgQIJLh96rBlOABiDf8/edit?tab=t.0#heading=h.lrsab14uye1z)
- [ ] **VM creation** works from the Proxmox UI
- [ ] Public and private networks are configured and functional
- [ ] **VM console access** works from the Proxmox UI

---

## 8. Proxmox Checklist

Complete before scheduling installation:

- [ ] VPN access granted **or** jump server IP whitelisted
- [ ] Proxmox UI accessible from browser via VPN or whitelisted IP
- [ ] Root-level admin credentials provided
- [ ] Proxmox API port (8006) reachable from CMP VM
- [ ] OS templates prepared per Proxmox template requirements
- [ ] VM creation tested and working
- [ ] Public and private networks configured
- [ ] VM console access tested and working
- [ ] CMP VMs provisioned (see [common prerequisites](/installation/prerequisites))
- [ ] Domain, SSL, SMTP provided

---

## Related

- [Prerequisites & System Requirements](/installation/prerequisites)
- [Proxmox VE Orchestrator Guide](/orchestrators/proxmox/)
