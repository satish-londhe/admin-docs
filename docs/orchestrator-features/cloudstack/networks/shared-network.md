---
sidebar_position: 5
title: "Shared Network"
tags: ["orchestrator", "cloudstack", "features", "networks", "shared"]
---

# Shared Network

A **Shared Network** in CloudStack is a guest network that can be used by **multiple accounts** within a zone (subject to CloudStack scope and admin configuration). Unlike isolated networks, it is not dedicated to a single tenant’s private router model in the same way.

How CMP exposes shared networks to customers depends on zone mapping, network offerings, and services enabled for the Cloud Provider setup.

:::info[Documentation coming soon]

Full feature documentation for **Shared Network** will be added here — admin preparation in CloudStack, customer visibility in CMP, attach VM behaviour, and limitations.

:::

## Related

* [Networks](/orchestrator-features/cloudstack/networks/)
* [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network)
* [L2 Network](/orchestrator-features/cloudstack/networks/l2-network)
* [Configuring Zones](/orchestrators/cloudstack/zones)
* [CloudStack Setup](/orchestrators/cloudstack/)
