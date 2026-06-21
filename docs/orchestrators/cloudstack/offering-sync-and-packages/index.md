---
sidebar_position: 1
title: "Offering Sync & Packages"
tags: ["orchestrator", "cloudstack", "packages"]
---

# Offering Sync & Packages

After zones and templates are configured, map CloudStack offerings to CMP packages so customers can provision and purchase resources.

Package types are configured in CMP under **Settings → Billing Setup → Rate Cards → Default → Packages**.

## Pages in this section

* [Offering Sync](/orchestrators/cloudstack/offering-sync-and-packages/offering-sync) — map CloudStack offerings to CMP package types
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

## Key points

* Packages are unique per **Cloud Provider + Setup + Zone + Storage Category**
* Offerings are **not auto-synced** — configure packages manually in CMP
* A **custom unconstrained** compute offering is required for custom VM packages
* Use the **override disk option** so root disk storage is billed via disk offerings separately

## Related

* [VM Packages](/packages/vm-packages)
* [Configuring Zones in CMP](/orchestrators/cloudstack/zones)
* [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp)
