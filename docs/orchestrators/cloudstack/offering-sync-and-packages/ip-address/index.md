---
sidebar_position: 1
title: "IP Address"
tags: ["orchestrator", "cloudstack", "packages", "ip-address"]
---

# IP Address (CloudStack)

CMP bills public / network IPs from a single **IP Address package** per Cloud Provider Setup + Zone. **Configuring prices is the same** whether the IP is acquired at VM create, as a standalone IP, or on a Shared Network.

What differs is **when** that package price applies (and when it does not).

| Page | What it covers |
|---|---|
| [Configure pricing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/packages) | Create the IP Address rate-card package (one per setup + zone), billing modes, lifecycle, form fields |
| [Shared Network IP Billing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing) | Per-network **enable IP billing** and **IP Address Type** — when CMP creates or cancels an IP subscription on CloudStack Shared Networks |

## Same pricing, different applicability

1. Create and price the **IP Address package** once for the setup + zone — see [Configure pricing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/packages).
2. Decide **when** that price is charged:
   * **VM create / standalone IP** — follows package rules and (deprecated) `plan_ip_billing` guidance on the pricing page
   * **Shared network** — only if **Do you want to enable billing for IP addresses for this network?** is **Yes** on that network — see [Shared Network IP Billing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing)

If shared-network IP billing is **No**, no IP subscription is created for that network even when an IP package exists and is priced.

## Related

* [Proxmox — IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/)
* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Public IP & network billing FAQ](/faq/platform/ip-network-billing)
