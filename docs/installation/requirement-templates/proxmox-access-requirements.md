---
sidebar_position: 6
title: "Proxmox Access Requirements (Template)"
tags: ["installation", "requirements", "templates", "onboarding"]
---

:::tip[Download Word template]

<a href="/requirement-templates/proxmox-access-requirements-template.docx" download="Proxmox-Access-Requirements.docx"><strong>Download Word document (.docx)</strong></a> — open in Microsoft Word or Google Docs, fill every **Your value** cell, then email to [satish.londhe@stackconsole.io](mailto:satish.londhe@stackconsole.io).

Subject: `Proxmox Access Requirements — <Your Company>`

[Requirement Templates overview](/installation/requirement-templates/)

:::


**Instructions:** Fill this template for **each Proxmox** cluster you connect to CMP. Email with subject `Proxmox Access Requirements — <Your Company>`.

**Complete first:** [CMP Platform Requirements template](/installation/requirement-templates/cmp-platform-requirements).

**Reference doc:** Proxmox VE Requirements

---

## A. Proxmox environment

| Field | Your value |
|---|---|
| **Proxmox version** | |
| **Cluster name / datacenter** | |
| **Number of nodes** | |
| **Single-node or multi-node?** | |

---

## B. Access for StackConsole team (Proxmox UI)

| Option | Your value |
|---|---|
| **VPN provided to StackConsole?** | Yes / No |
| **OR jump server IP whitelisted?** | `14.192.19.227` — Yes / No |
| **Proxmox UI (port 8006) reachable?** | Yes / No |

---

## C. Proxmox API credentials for CMP

| Field | Your value |
|---|---|
| **Proxmox URL** | e.g. `https://proxmox.example.com:8006` |
| **Username** | e.g. `cmp-api@pve` |
| **Password** | |
| **Permissions group** | e.g. `UserAdmin` |
| **Roles at path `/`** | PVEVMAdmin, PVEDatastoreAdmin, PVESDNAdmin — Yes / No |

---

## D. CMP VM → Proxmox connectivity

| Field | Your value |
|---|---|
| **API tested from CMP VM (port 8006)?** | Yes / No |
| **Private or public access?** | |

---

## E. Templates and networks (Proxmox-side)

### Templates

| Check | Yes / No |
|---|---|
| At least one cloud-init-ready VM template | |
| QEMU Guest Agent in template | |
| Templates available on nodes CMP will use (multi-node) | |

### Networks

| Check | Yes / No |
|---|---|
| Linux bridges configured (e.g. `vmbr0`) — not physical NICs | |
| Public network(s) for customer VMs | |
| Private network(s) if offered | |

---

## F. Storage labels (Proxmox-side)

| Storage type label | Example |
|---|---|
| e.g. SSD | |
| e.g. HDD / NVMe | |

---

## G. Setup checkpoints

| Check | Verified? |
|---|---|
| VM creation from Proxmox UI | |
| VM console from Proxmox UI | |
| Proxmox API reachable from CMP VMs | |

---

## H. Additional notes

| Notes |
|---|
| |

---

**Submit with:** Completed CMP Platform Requirements template.
