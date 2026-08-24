---
sidebar_position: 2
title: "Virtual Machine"
tags: ["orchestrator", "openstack", "packages", "flavors", "nova", "override-disk"]
---

# Virtual Machine packages

Map **Nova flavors** to CMP **Virtual Machine** packages so customers can provision compute from the rate card.

:::danger[Documentation in progress]

Package form field reference (pricing, zone uniqueness, screenshots of the CMP package form) will be expanded here. The **override root disk** model below is the required setup decision.

:::

## Prerequisite — Enable Override Disk Offering

In Cloud Provider **Step 2 — Provider Config**, set **Enable Override Disk Offering** to **Yes** (**recommended**).

Details: [Connecting — Enable Override Disk Offering](/orchestrators/openstack/connecting#wizard-step-2--provider-config).

| Provider Config | Effect on OpenStack flavors and CMP |
|---|---|
| **Yes** (recommended) | Create flavors with **Root Disk = 0**, or any embedded root disk size is **ignored**. CMP shows a **separate storage** option at VM create. |
| **No** | Root disk comes from the flavor only; no separate override storage selection |

### Flavor with Root Disk 0 (when override is Yes)

In Horizon: **Admin → Compute → Flavors → Create Flavour** — set **Root Disk (GB)** to **`0`** (vCPUs and RAM as needed).

img/screenshots/openstack-horizon-create-flavor-root-disk-0.png

![Screenshot: Horizon — Create Flavour with Root Disk 0 for CMP override disk](/img/screenshots/openstack-horizon-create-flavor-root-disk-0.png)

## Why override disk is recommended

### Stoppable services billing

CMP [stoppable services](/billing/stoppable-services) (`enable_stoppable_service_billing`) pause **compute** charges when a VM is stopped, while **storage** continues to bill.

That model works cleanly only when root disk is **not** bundled inside the compute flavor/package. With **Enable Override Disk Offering = Yes**, CPU/RAM and storage are separate — stoppable billing can pause compute without treating storage as part of the same stoppable compute SKU.

If storage is embedded in the flavor (override **No**), stoppable CPU/RAM behaviour does **not** work as expected for PAYG-style deployments.

### Upgrade and downgrade (CPU / memory)

With override **Yes**, plan change / resize focuses on **CPU and memory**. Disk stays on the volume / storage selection path, so upgrade and downgrade of compute is simpler and does not fight an embedded root disk size on the flavor.

### Customer storage choice

With override **Yes**, CMP presents storage separately. Configure volume types in [Storage Settings](/orchestrators/openstack/storage-settings) (and optional default on Provider Config only for backward compatibility — see [Open Stack Default Storage Policy](/orchestrators/openstack/connecting#wizard-step-2--provider-config)). Map volumes under [Volume packages](/orchestrators/openstack/offering-sync-and-packages/volumes).

## How provisioning works (override Yes)

1. Customer selects a **VM package** mapped to a Nova flavor (vCPU / RAM).  
2. Customer selects **storage** (size / volume type) separately.  
3. CMP provisions the instance using compute from the flavor and root disk from the storage selection — flavor root disk `0` or ignored.

## Related

* [Enable Override Disk Offering](/orchestrators/openstack/connecting#wizard-step-2--provider-config)
* [Stoppable Services](/billing/stoppable-services)
* [Storage Settings](/orchestrators/openstack/storage-settings)
* [Volume packages](/orchestrators/openstack/offering-sync-and-packages/volumes)
* [OpenStack Packages](/orchestrators/openstack/offering-sync-and-packages/)
* [Rate Cards](/billing/rate-cards/)
* [CloudStack Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine) — same override-disk pattern on ACS
