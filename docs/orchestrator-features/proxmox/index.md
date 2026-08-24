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
| **Backup** | VM backup via CMP (available); feature doc **in progress** | [Backup](/orchestrator-features/proxmox/backup) · destinations under development — [upcoming](/orchestrator-features/proxmox/roadmap#backups--destination-improvements) |
| **Networks** | **Sync / import only** — CMP does **not** provision new networks on Proxmox | [Networks](/orchestrator-features/proxmox/networks) · [Networks and IPAM (setup)](/orchestrators/proxmox/networks-and-ipam) |
| **IPAM** | **CMP-level** IP pool management (generate, allocate, track) — not a Proxmox-native IPAM product | [IPAM](/orchestrator-features/proxmox/ipam) · [Networks and IPAM (setup)](/orchestrators/proxmox/networks-and-ipam) |
| **Node placement** | CMP picks the node at provision time (Proxmox has no DRS) | [Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm) |

:::info[Feature pages]

Dedicated walkthrough pages are expanding. **Networks**, **IPAM**, **Backup** (docs in progress), and [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap) live in this section; use the setup and package links for full admin configuration.

:::

---

## Documentation status (detailed pages)

| Topic | Status | Page |
|---|---|---|
| Networks | Ready | [Networks](/orchestrator-features/proxmox/networks) — sync only; no CMP network provisioning |
| IPAM | Ready | [IPAM](/orchestrator-features/proxmox/ipam) — CMP-level pools and allocation |
| Backup | In progress | [Backup](/orchestrator-features/proxmox/backup) — feature available; full docs coming |
| Upcoming & Roadmap | Ready | [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap) — SDN and backup destinations under development; Associated IP automation on roadmap |
| Other feature walkthroughs | Coming soon | Listed under [Supported features](#supported-features) via setup / packages |

---

## Upcoming version (under development)

| Item | Status | Details |
|---|---|---|
| **Proxmox SDN** | Under development — available in an upcoming version | Use Linux bridges today · [SDN](/orchestrator-features/proxmox/roadmap#networking--proxmox-sdn) |
| **Backup destinations (external NFS/SMB, PBS)** | Under development — available in an upcoming version | Backup feature exists today · [Backups](/orchestrator-features/proxmox/roadmap#backups--destination-improvements) |

## Not supported today / roadmap

| Item | Notes |
|---|---|
| **Network create from CMP** | Not supported — create bridges on Proxmox, then sync into CMP | [Networks](/orchestrator-features/proxmox/networks) |
| **Associated IP / NAT automation** | **Roadmap** — manual display mapping today | [Roadmap — Associated IP](/orchestrator-features/proxmox/roadmap#associated-ip--nat-mapping-automation) |

Full detail: [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap).

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
* [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap)
* [CloudStack Features](/orchestrator-features/cloudstack/) — separate CloudStack docs
