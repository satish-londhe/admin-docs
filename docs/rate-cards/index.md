---
sidebar_position: 1
title: "Rate Cards"
tags: ["rate-cards", "packages", "pricing"]
---

# Rate Cards

Rate cards define **what customers can buy** and **how much they pay**. In CMP, packages are configured under **Settings → Billing Setup → Rate Cards → Default → Packages**.

Each orchestrator has its own package types, offering mappings, and configuration steps. Select your orchestrator below.

## Orchestrator rate card guides

| Orchestrator | Status | Documentation |
|---|---|---|
| **CloudStack (ACS)** | ✅ Available | [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/) |
| **OpenStack** | 🔲 Coming soon | [OpenStack](/orchestrators/openstack/) — package documentation will be added in a future release |
| **VMware vSphere** | 🔲 Coming soon | [VMware](/orchestrators/vmware/) — package documentation will be added in a future release |
| **Proxmox VE** | 🔲 Coming soon | [Proxmox](/orchestrators/proxmox/) — package documentation will be added in a future release |
| **OpenNebula** | 🔲 Coming soon | [OpenNebula](/orchestrators/opennebula/) — package documentation will be added in a future release |

:::info[CMP path]

**Settings → Billing Setup → Rate Cards → Default → Packages**

Each package type (Virtual Machine, Volumes, IP Address, and so on) is configured from this menu. Orchestrator-specific guides below explain which packages to create and how to map CloudStack offerings.

:::

## General rate card topics

These pages apply across orchestrators:

* [How Rate Cards Work](/rate-cards/concepts) — package identity, predefined vs custom, pricing flow
* [Custom Packages & Unit Pricing](/rate-cards/custom-packages)
* [Pricing Formulas](/rate-cards/pricing-formulas)

## CloudStack package types

If you use CloudStack, see [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/) for the full list:

* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Kubernetes](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes)
* [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [VM Autoscale](/orchestrators/cloudstack/offering-sync-and-packages/vm-autoscale)
* [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot)
* [Template](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [ISO](/orchestrators/cloudstack/offering-sync-and-packages/iso)
* [VM Backup](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)
* [Products](/orchestrators/cloudstack/offering-sync-and-packages/products)

## Related

* [Billing Models Overview](/billing/overview)
* [CloudStack (ACS)](/orchestrators/cloudstack/)
* [Storage Settings](/orchestrators/cloudstack/storage-settings)
