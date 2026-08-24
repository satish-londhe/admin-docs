---
sidebar_position: 1
title: "IP Address"
tags: ["orchestrator", "proxmox", "packages", "ip-address"]
---

# IP Address (Proxmox)

CMP bills network IPs from a single **IP Address package** per Cloud Provider Setup + Zone. **Configuring prices is the same** whether the IP is acquired at VM create or on a network with IP billing enabled.

What differs is **when** that package price applies.

| Page | What it covers |
|---|---|
| [Configure pricing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages) | Create the Proxmox IP Address rate-card package (one per setup + zone) |
| [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing) | Per-network **enable IP billing** and **IP Address Type** — when CMP creates or cancels an IP subscription; CIDR / Gateway / IPAM fields |

## Same pricing, different applicability

1. Create and price the **IP Address package** — see [Configure pricing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages).
2. On each network in [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam), set **Do you want to enable billing for IP addresses for this network?** — see [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing).

If IP billing on the network is **No**, no IP subscription is created for that network even when an IP package exists and is priced.

## Related

* [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam)
* [Proxmox Packages](/orchestrators/proxmox/offering-sync-and-packages/)
* [CloudStack — IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/)
