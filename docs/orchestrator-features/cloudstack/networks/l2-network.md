---
sidebar_position: 4
title: "L2 Network"
tags: ["orchestrator", "cloudstack", "features", "networks", "l2"]
---

# L2 Network

An **L2 Network** in CloudStack is a **layer-2** guest network. It does **not** deploy a virtual router for L3 services the way isolated or VPC networks do.

:::warning[UserData and password-enabled templates]

L2 networks do **not** support UserData. Password-enabled templates that rely on UserData for password injection **cannot** be used on L2 networks. Plan templates and guest setup accordingly.

:::

:::info[Documentation coming soon]

Full feature documentation for **L2 Network** will be added here — when to use L2, create flows in CMP, limitations, and admin configuration notes.

:::

## Related

* [Networks](/orchestrator-features/cloudstack/networks/)
* [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network)
* [Shared Network](/orchestrator-features/cloudstack/networks/shared-network)
* [Preparing CMP-Compatible Templates](/orchestrators/cloudstack/templates/preparing-cmp-compatible-templates)
* [CloudStack Setup](/orchestrators/cloudstack/)
