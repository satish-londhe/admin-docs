---
sidebar_position: 1
title: "Proxmox VE Features"
tags: ["orchestrator", "proxmox", "features"]
---

# Proxmox VE Features

Feature documentation for **Proxmox VE** in CMP — what customers and admins can use after [Proxmox setup](/orchestrators/proxmox/) is complete.

:::tip[Setup vs features]

Need to connect Proxmox, map zones, templates, networks, or packages? Start with [Orchestrator Setup — Proxmox VE](/orchestrators/proxmox/).

:::

---

## Supported features

These capabilities are available in the CMP Proxmox integration today.

| Feature | Notes | Related docs |
|---|---|---|
| **Virtual Machine** | Create, manage, and bill VMs on Proxmox nodes | [VM packages](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine) · [Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm) |
| **Volumes (Block storage)** | Root disk (override Yes) and additional attachable volumes | [Volumes packages](/orchestrators/proxmox/offering-sync-and-packages/volumes) |
| **VM Snapshot** | Per-GB hourly snapshot billing | [VM Snapshot packages](/orchestrators/proxmox/offering-sync-and-packages/vm-snapshot) |
| **Backup** | VM backup via CMP (available); feature doc **in progress** | [Backup](/orchestrator-features/proxmox/backup) · destination improvements on [roadmap](/orchestrator-features/proxmox/roadmap#backups) |
| **Networks** | **Sync / import only** — CMP does **not** provision new networks on Proxmox | [Networks](/orchestrator-features/proxmox/networks) · [Networks and IPAM (setup)](/orchestrators/proxmox/networks-and-ipam) |
| **IPAM** | **CMP-level** IP pool management (generate, allocate, track) — not a Proxmox-native IPAM product | [IPAM](/orchestrator-features/proxmox/ipam) · [Networks and IPAM (setup)](/orchestrators/proxmox/networks-and-ipam) |
| **Node placement** | CMP picks the node at provision time (Proxmox has no DRS) | [Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm) |

:::info[Feature pages]

Dedicated walkthrough pages are expanding. **Networks**, **IPAM**, **Backup** (docs in progress), and the **Roadmap** live in this section; use the setup and package links for full admin configuration.

:::

---

## Documentation status (detailed pages)

| Topic | Status | Page |
|---|---|---|
| Networks | Ready | [Networks](/orchestrator-features/proxmox/networks) — sync only; no CMP network provisioning |
| IPAM | Ready | [IPAM](/orchestrator-features/proxmox/ipam) — CMP-level pools and allocation |
| Backup | In progress | [Backup](/orchestrator-features/proxmox/backup) — feature available; full docs coming |
| Roadmap | Ready | [Proxmox roadmap](/orchestrator-features/proxmox/roadmap) — SDN; Associated IP / NAT; external backup / PBS |
| Other feature walkthroughs | Coming soon | Listed under [Supported features](#supported-features) via setup / packages |

---

## Not available / roadmap

| Item | Notes |
|---|---|
| **Proxmox SDN** | Not implemented — use Linux bridges today | [Roadmap — SDN](/orchestrator-features/proxmox/roadmap#networking--proxmox-sdn) |
| **Network create from CMP** | Not supported — create bridges on Proxmox, then sync into CMP | [Networks](/orchestrator-features/proxmox/networks) |
| **Associated IP / NAT automation** | Manual display mapping today | [Roadmap — Associated IP](/orchestrator-features/proxmox/roadmap#associated-ip--nat-mapping-automation) |
| **External backup / PBS** | Roadmap | [Roadmap — Backups](/orchestrator-features/proxmox/roadmap#backups) |

Full detail: [Proxmox roadmap](/orchestrator-features/proxmox/roadmap).

---

## Related setup docs

| Topic | Link |
|---|---|
| Connect Proxmox | [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) |
| Networks & IPAM setup | [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam) |
| Packages | [Proxmox Packages](/orchestrators/proxmox/offering-sync-and-packages/) |
| Templates | [Templates](/orchestrators/proxmox/templates/) |

## Related

* [Orchestrator Features](/orchestrator-features/)
* [Proxmox VE Setup](/orchestrators/proxmox/)
* [Proxmox roadmap](/orchestrator-features/proxmox/roadmap)
* [CloudStack Features](/orchestrator-features/cloudstack/) — separate CloudStack docs
