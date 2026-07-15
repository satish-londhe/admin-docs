---
sidebar_position: 3
title: "Isolated Network"
tags: ["orchestrator", "cloudstack", "features", "networks", "isolated"]
---

# Isolated Network

An **Isolated Network** is a dedicated CloudStack guest network with its own **virtual router**. It is not part of a VPC. Routing, NAT, DHCP, and other services depend on the **network offering** used when the network is created.

Isolated networks use network offerings (not VPC offerings). CMP can bill them when network billing is enabled and the matching packages are configured.

:::info[Documentation coming soon]

Full feature documentation for **Isolated Network** will be added here — create/delete flows, offering requirements, public IP behaviour, customer portal steps, and billing notes.

:::

## Related

* [Networks](/orchestrator-features/cloudstack/networks/)
* [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network) — multi-tier private cloud alternative
* [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [Load Balancers](/orchestrator-features/cloudstack/load-balancers)
* [IP Addresses](/orchestrator-features/cloudstack/ip-addresses)
