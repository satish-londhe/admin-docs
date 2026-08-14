---
sidebar_position: 1
title: "Proxmox Packages"
tags: ["orchestrator", "proxmox", "packages", "rate-card"]
---

# Proxmox Packages

Map Proxmox compute into CMP **rate card packages** so customers can purchase and provision resources.

**CMP path:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages**

| Package type | Status | Page |
|---|---|---|
| [Virtual Machine](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine) | Ready | VM packages; override disk → CPU/memory pricing only |
| [Volumes](/orchestrators/proxmox/offering-sync-and-packages/volumes) | Ready | Root disk (override Yes) + additional attachable volumes |
| [VM Snapshot](/orchestrators/proxmox/offering-sync-and-packages/vm-snapshot) | Ready | Hourly per GB; free trial not applicable |
| [IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/) | Ready | [Configure pricing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages) · [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing) |
| [Unit Pricing](/orchestrators/proxmox/offering-sync-and-packages/unit-pricing) | Ready | Per-unit rates for **custom** Proxmox packages (vCPU, memory, storage, IP) |

:::info[Before you begin]

* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) complete (zone, templates, storage settings)
* [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam) configured for the zone
* At least one [CMP-compatible template](/orchestrators/proxmox/templates/preparing-cmp-compatible-templates) for the OS family you sell

:::

## Related

* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting)
* [IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/)
* [Unit Pricing](/orchestrators/proxmox/offering-sync-and-packages/unit-pricing)
* [Rate Cards](/billing/rate-cards/)
* [Free Trials](/billing/free-trials)
* [Orchestrator Features — Proxmox](/orchestrator-features/proxmox/)
