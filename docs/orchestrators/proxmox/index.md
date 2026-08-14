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
| [Templates](/orchestrators/proxmox/templates/) | Ready |
| [Preparing CMP-compatible templates](/orchestrators/proxmox/templates/preparing-cmp-compatible-templates) | Ready — cloud-init image → Proxmox template |
| [Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm) | Ready — multi-node placement (Proxmox has no DRS) |
| [Proxmox roadmap](/orchestrators/proxmox/roadmap) | Planned — SDN; Associated IP / NAT automation; external backup storage; PBS |
| Node & storage configuration | Covered in [Connecting](/orchestrators/proxmox/connecting) (Steps 3–5) |

## Related

* [Proxmox Requirements](/installation/orchestrator-requirements/proxmox)
* [Orchestrator Features — Proxmox](/orchestrator-features/proxmox/)
* [Architecture Overview](/overview/architecture-overview)
