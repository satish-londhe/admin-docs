---
sidebar_position: 1
title: "Networks"
tags: ["orchestrator", "cloudstack", "features", "networks"]
---

# Networks

CloudStack network types available through CMP. Each type has its own guest network model, routing behaviour, and package requirements.

:::tip[Setup vs features]

Admin setup for VPC packages and offerings: [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc). Feature pages below cover how each network type works for customers and admins in CMP.

:::

## Network types

| Network type | Summary | Page |
|---|---|---|
| **VPC Network** | Private cloud with tiers, virtual router, NAT, ACLs, VPN | [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network) |
| **Isolated Network** | Dedicated guest network with its own virtual router | [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network) |
| **L2 Network** | Layer-2 only — no virtual router / UserData limitations | [L2 Network](/orchestrator-features/cloudstack/networks/l2-network) |
| **Shared Network** | Shared guest network across accounts (zone-scoped) | [Shared Network](/orchestrator-features/cloudstack/networks/shared-network) |

:::info[Documentation coming soon]

Each network-type page is a stub ready for full feature content (create flows, ACLs, billing, quotas, and limitations). Expand pages as documentation is ready.

:::

## Related

* [CloudStack Features](/orchestrator-features/cloudstack/)
* [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [Load Balancers](/orchestrator-features/cloudstack/load-balancers)
* [IP Addresses](/orchestrator-features/cloudstack/ip-addresses)
* [CloudStack Setup](/orchestrators/cloudstack/)
