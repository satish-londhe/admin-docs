---
sidebar_position: 2
title: "Virtual Machine Packages"
tags: ["packages"]
---

# Virtual Machine Packages

VM packages define the **compute resource bundles** (CPU, RAM) that customers choose when provisioning virtual machines. Storage is configured separately via the override disk option.

## Orchestrator side: compute offerings

Before creating VM packages in CMP, create the corresponding compute offerings in your orchestrator:

### CloudStack

* Create compute offerings **without storage values** — CMP uses the override disk option for storage
* Set CPU in MHz and storage type appropriate for your infrastructure
* See [Offering Sync & Packages (CloudStack)](/orchestrators/cloudstack/offering-sync-and-packages/)

### OpenStack

* Create Nova flavors with the desired vCPU and RAM values
* Disk in the flavor can be 0 if using Cinder volumes for storage

### VMware / Proxmox / OpenNebula

* Create the equivalent VM template or resource profile per your orchestrator

## Creating VM packages in CMP

**Path:** Admin Panel → Packages → Virtual Machines → Add Package

| Field | Description |
| --- | --- |
| **Name / Display Name** | What customers see in the portal (e.g. "Starter — 2 vCPU / 4 GB") |
| **Cloud Provider** | The orchestrator this package belongs to |
| **Zone** | The zone this package is available in |
| **Compute Offering** | The orchestrator offering to map (e.g. CloudStack compute offering ID) |
| **Compute Category** | Category tag for organizing packages in the portal |
| **Plan Category** | Tier label (e.g. Basic, Standard, Premium) |
| **Storage Category** | SSD, HDD, NVMe — affects pricing and disk offering selection |
| **Pricing** | Monthly price (hourly and yearly are auto-derived) |
| **Visibility** | Public or restricted |

## Storage: override disk option

When the override disk option is enabled (recommended):

* Root disk size is selected by the customer at provisioning time
* Storage is billed separately using [Block Storage / Volume Packages](/packages/block-storage)
* Compute offering contains CPU + RAM only

When override disk is **disabled**:

* Storage is bundled inside the compute offering
* One-time configuration — cannot be changed after production
* Stoppable-service billing pause for CPU/RAM will not function if storage is bundled

> ⚠️ This is a **one-time setup decision**. Choose before going live — it cannot be reversed without impacting billing.

## IP address billing options

When a customer creates a VM with a public IP, two billing approaches are available:

| Approach | How to enable |
| --- | --- |
| IP price included in VM package | Default behaviour |
| IP charged separately | Set `plan_ip_billing = true` in Global Settings |

See [IP Address Packages](/packages/ip-addresses) for details.

## Stoppable service billing

When a VM is stopped:

* CPU and RAM charges pause ✅
* Storage (root disk + data volumes) charges continue ✅
* IP address charges continue ✅

This only works if storage is **not bundled** in the compute offering (override disk must be enabled).

## Related

* [How Packages Work in CMP](/packages/overview)
* [Custom Packages & Unit Pricing](/packages/custom-packages)
* [Block Storage / Volume Packages](/packages/block-storage)
* [IP Address Packages](/packages/ip-addresses)
* [Pricing Formulas](/packages/pricing-formulas)
* [Offering Sync & Packages — CloudStack](/orchestrators/cloudstack/offering-sync-and-packages/)
