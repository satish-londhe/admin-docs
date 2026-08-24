---
sidebar_position: 5
title: "Shared Network"
tags: ["orchestrator", "cloudstack", "features", "networks", "shared"]
---

# Shared Network

A **Shared Network** in CloudStack is a guest network that can be used by **multiple accounts** within a zone (subject to CloudStack scope and admin configuration). Unlike [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network), it is not dedicated to a single tenant’s private router model in the same way.

How CMP exposes shared networks to customers depends on zone mapping, network offerings, and services enabled for the Cloud Provider setup.

## Shared Network IP billing

Per-network IP billing, **IP Address Type**, subscription create/cancel, and customer UI behaviour are documented in the packages section (same behaviour for **CloudStack**, **Proxmox**, and **VMware**):

👉 [Shared Network IP Billing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing)

## Related

* [Shared Network IP Billing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing)
* [Networks](/orchestrator-features/cloudstack/networks/)
* [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network)
* [L2 Network](/orchestrator-features/cloudstack/networks/l2-network)
* [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [Configuring Zones](/orchestrators/cloudstack/zones)
* [CloudStack Setup](/orchestrators/cloudstack/)
