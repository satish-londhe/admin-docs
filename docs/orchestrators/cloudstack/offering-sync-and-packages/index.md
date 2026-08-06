---
sidebar_position: 1
title: "CloudStack Packages"
tags: ["orchestrator", "cloudstack", "packages", "rate-cards"]
---

# CloudStack Packages

After zones and templates are configured, map CloudStack offerings to CMP rate card packages so customers can provision and purchase resources.

Package types are configured in CMP under **Settings → Billing Setup → Rate Cards → Default → Packages**.

## Pages in this section

* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [Networks](/orchestrators/cloudstack/offering-sync-and-packages/networks) — Isolated and L2 packages; billing via global `enable_network_billing`
* [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Kubernetes](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes) — Master/Control and Worker node packages (compute only; shared volume plan)
* [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [VM Autoscale](/orchestrators/cloudstack/offering-sync-and-packages/vm-autoscale)
* [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot) — hourly per-GB snapshot billing
* [Template](/orchestrators/cloudstack/offering-sync-and-packages/template) — hourly per-GB billing for customer-owned templates (My Template)
* [ISO](/orchestrators/cloudstack/offering-sync-and-packages/iso) — hourly per-GB billing for customer ISO images
* [VM Backup](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup) — hourly per-GB VM backup billing (physical or virtual size)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing) — per-unit rates for custom package billing
* [Products](/orchestrators/cloudstack/offering-sync-and-packages/products)

## Key points

* Packages are unique per **Cloud Provider + Setup + Zone + Storage Category**
* Offerings are **not auto-synced** — configure packages manually in CMP
* A **custom unconstrained** compute offering is required for custom VM packages
* Use the **override disk option** so root disk storage is billed via disk offerings separately
* **Kubernetes** uses separate Master/Control and Worker packages (no custom plans); the cluster itself is not billed — see [Kubernetes features](/orchestrator-features/cloudstack/kubernetes)

## Related

* [Configuring Zones in CMP](/orchestrators/cloudstack/zones)
* [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp)
