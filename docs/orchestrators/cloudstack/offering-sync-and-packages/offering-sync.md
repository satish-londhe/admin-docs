---
sidebar_position: 2
title: "Offering Sync"
tags: ["orchestrator", "cloudstack", "packages", "offerings"]
---

# Offering Sync

CloudStack compute, disk, network, and VPC offerings must be **mapped manually in CMP** to the corresponding package types. CMP does not auto-sync orchestrator offerings into package definitions.

## Before you sync

Ensure the following are configured first:

* **Cloud Provider Setup** is connected — see [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* **Zones** are mapped in CMP — see [Configuring Zones in CMP](/orchestrators/cloudstack/zones)
* Required offerings exist in CloudStack (compute, custom unconstrained compute, disk, and so on)

## What to map

| CloudStack offering | CMP package type |
|---|---|
| Compute offering (no storage) | VM package |
| Custom unconstrained compute offering | Custom VM package |
| Disk offering | Block storage / volume package |
| VPC offering | Virtual Router / VPC package |
| Network / LB-related offering | Load balancer package |

Each package is scoped to **Cloud Provider + Setup + Zone + Storage Category**. Repeat package configuration for every zone where customers should provision.

## Compute categories

When mapping offerings, assign **Compute Categories** consistently across related VM packages and [templates](/orchestrators/cloudstack/templates/configuring-templates-at-cmp). Categories control how plans are grouped and filtered in the customer portal.

## Related

* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)
* [VM Packages](/packages/vm-packages)
* [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
