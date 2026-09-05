---
sidebar_position: 10
title: "Storage Settings"
tags: ["orchestrator", "openstack", "cinder", "storage", "setup"]
---

# OpenStack Storage Settings

Storage settings map OpenStack Cinder **volume types** to CMP **storage categories** (e.g. `SSD Storage (NVMe)`, `SSD Storage (SSD)`, `Standard HDD`). This mapping allows customers to choose storage tiers when deploying virtual machines, purchasing additional block storage volumes, or provisioning Kubernetes clusters.

CMP uses storage settings for logical segregation, rate card package scoping, and quota enforcement. Packages that include storage — VM root disk (when override disk is enabled), [Volume Packages](/orchestrators/openstack/offering-sync-and-packages/volumes), and [Unit Pricing](/orchestrators/openstack/offering-sync-and-packages/unit-pricing) — are scoped per **Storage Category**.

**CMP path:** **Settings → Orchestrator → Provider Setup → Configure → Step 5 — Storage Setting**, or **Settings → Orchestrator → Storage Settings**

---

## Before You Begin

Ensure the following prerequisites are met before adding storage settings:

* [Connecting CMP to OpenStack](/orchestrators/openstack/connecting) is complete through Wizard Step 4 (Templates).
* [Regions & Availability Zones](/orchestrators/openstack/regions) are configured for the OpenStack instance.
* Cinder volume types exist in OpenStack for each storage backend/tier you plan to sell (viewable in Horizon under **Admin → Volume → Volume Types**).
* [Enable Override Disk Offering](/orchestrators/openstack/connecting#wizard-step-2--provider-config) is set to **Yes** in Provider Config (recommended) so customers select root disk storage tiers separately at VM creation.

---

## Keep Storage Settings in Sync with Cloud Services

:::warning[Add, edit, or disable — update Cloud Provider Setup too]

Whenever you **add**, **edit**, or **disable** a storage setting, also update the corresponding services in **Cloud Services** and **Cloud Provider Setup** (Wizard Step 1).

CMP manages **quotas individually for each storage type** (for example, **SSD Storage**, **NVMe Storage**, **HDD Storage**). [VM Packages](/orchestrators/openstack/offering-sync-and-packages/virtual-machine) and [Volume Packages](/orchestrators/openstack/offering-sync-and-packages/volumes) are strongly dependent on storage settings — if you disable a storage setting, associated packages are **not shown** to end customers for that tier.

| Action | Also update |
|---|---|
| **Add** a new storage tier | Enable the matching **SSD / NVMe / HDD Storage** service in Cloud Provider Setup Step 1; configure matching quota in Wizard Step 6 |
| **Disable** a storage setting (**Status** = Inactive) | Disable the corresponding storage service in Cloud Provider Setup if the tier should no longer be sold |
| **Change** zone or storage category | Verify [VM Packages](/orchestrators/openstack/offering-sync-and-packages/virtual-machine), [Volume Packages](/orchestrators/openstack/offering-sync-and-packages/volumes), and [Unit Pricing](/orchestrators/openstack/offering-sync-and-packages/unit-pricing) packages still map to the correct **Storage Category** |

:::

:::warning[Mapping is the administrator's responsibility]

Storage categories in CMP are **logical labels** for customers (e.g. **SSD**, **NVMe**, **Gold**). They must map correctly to OpenStack Cinder volume types.

An incorrect mapping can cause volume provisioning failures, storage placement on an unintended backend pool, or billing inconsistencies.

:::

---

## OpenStack Prerequisites (Cinder Volume Types)

In OpenStack, workload placement on specific storage backends is controlled at the **volume type level**. CMP resolves volume types at volume creation time — those volume types must target the correct Cinder backend drivers or storage pools.

In Horizon:
1. Log in as an administrator.
2. Navigate to **Admin → Volume → Volume Types**.
3. Verify the target volume types exist (for example, `NVMe Storage Pool`, `SSD Storage Pool`, or `__DEFAULT__`).

![Screenshot: OpenStack Horizon — Volume Types list](/img/screenshots/openstack-horizon-volume-types.png)

---

## Configure Storage Settings in CMP

1. In CMP, navigate to **Settings → Orchestrator → Storage Settings** (or Cloud Provider Setup Wizard **Step 5 — Storage Setting**).
2. Click **Add Setting**.
3. Fill in the form fields:

**Cloud Provider**

*Required.* Select **OpenStack** (e.g. `OpenStack(alto)`).

**Cloud Provider Setup**

*Required.* Select the OpenStack environment.

**Zone**

*Required.* Select the target OpenStack zone/region.

**Storage Category**

*Required.* Select the logical customer tier (e.g. `SSD Storage (NVMe)`, `SSD Storage (SSD)`, `HDD`).

**Storage Policy / Volume Type**

*Required.* Select or enter the matching OpenStack Cinder volume type name or ID.

**Status**

*Required.* Set to **Active** when ready to offer to customers.

4. Click **Save**.

---

## Relationship to Default Storage Policy

In [Wizard Step 2 — Provider Config](/orchestrators/openstack/connecting#wizard-step-2--provider-config), CMP includes an **Open Stack Default Storage Policy** field:

* **Single Default (Fallback):** The setting on Provider Config provides a global fallback volume type if no per-category storage policy is configured.
* **Multiple Tiers (Recommended):** For production environments offering multiple storage tiers (SSD, NVMe, HDD), configure per-category mappings here in **Storage Settings**. CMP will prioritize the category-specific policy over the fallback default.

---

## Related

* [Connecting CMP to OpenStack](/orchestrators/openstack/connecting) — Step 2 default storage policy & Provider Config
* [OpenStack Volume Packages](/orchestrators/openstack/offering-sync-and-packages/volumes) — Cinder block-storage package management
* [OpenStack Virtual Machine Packages](/orchestrators/openstack/offering-sync-and-packages/virtual-machine) — Override disk offering and flavor root disk 0
* [OpenStack Volumes Snapshot](/orchestrators/openstack/offering-sync-and-packages/volumes-snapshot)
* [OpenStack Quota Management](/orchestrators/openstack/quota-management)
* [Regions & Availability Zones](/orchestrators/openstack/regions)
* [Stoppable Services](/billing/stoppable-services)
* [CloudStack Storage Settings](/orchestrators/cloudstack/storage-settings) — reference implementation
