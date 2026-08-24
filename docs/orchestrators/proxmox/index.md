---
sidebar_position: 1
title: "Proxmox VE"
tags: ["orchestrator", "proxmox"]
---

# Proxmox VE

This section covers integrating CMP with **Proxmox VE** as a compute orchestrator.

## Before you begin

* [Proxmox Requirements](/installation/orchestrator-requirements/proxmox) — access, connectivity, checklist
* At least one [CMP-compatible template](/orchestrators/proxmox/templates/preparing-cmp-compatible-templates) on Proxmox
* Then [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) — permissions + Provider Setup wizard

## Pages in this section

| Page | Status |
|---|---|
| [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) | Ready — permissions, Provider Setup wizard Steps 1–7 |
| [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam) | Ready — bridges vs NIC, categories, import/sync, IP pools, Associated IP |
| [Proxmox Packages](/orchestrators/proxmox/offering-sync-and-packages/) | Ready — [VM](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine), [Volumes](/orchestrators/proxmox/offering-sync-and-packages/volumes), [VM Snapshot](/orchestrators/proxmox/offering-sync-and-packages/vm-snapshot), [IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/), [Unit Pricing](/orchestrators/proxmox/offering-sync-and-packages/unit-pricing) |
| [Templates](/orchestrators/proxmox/templates/) | Ready |
| [Preparing CMP-compatible templates](/orchestrators/proxmox/templates/preparing-cmp-compatible-templates) | Ready — cloud-init image → Proxmox template |
| [Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm) | Ready — multi-node placement (Proxmox has no DRS) |
| Node & storage configuration | Covered in [Connecting](/orchestrators/proxmox/connecting) (Steps 3–5) |

## Related

* [Proxmox Requirements](/installation/orchestrator-requirements/proxmox)
* [Orchestrator Features — Proxmox](/orchestrator-features/proxmox/) — [Networks](/orchestrator-features/proxmox/networks) · [IPAM](/orchestrator-features/proxmox/ipam) · [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap)
* [Architecture Overview](/overview/architecture-overview)
