---
sidebar_position: 10
title: "Storage Settings"
tags: ["orchestrator", "openstack", "cinder", "storage", "setup"]
---

# Storage Settings

Map OpenStack **volume types** to CMP **storage categories** (SSD, NVMe, HDD) so packages and the customer portal offer the right storage choices at provisioning.

:::tip[Default on Provider Config vs this step]

**Open Stack Default Storage Policy** on [Provider Config (Step 2)](/orchestrators/openstack/connecting#wizard-step-2--provider-config) is optional and for backward compatibility (single default volume type by name or ID).

For **multiple** volume types, configure them here (wizard **Step 5**). End users then select the storage they need when provisioning.

:::

:::danger[Documentation in progress]

This page is a **stub**. Document CMP path, form fields, and volume type → category mapping. Horizon volume types: **Admin → Volume → Volume Types**.

:::

## Topics to cover

* Volume type → storage category mapping  
* Relationship to optional `open_stack_default_storage_policy`  
* Multi-backend clouds  
* Package uniqueness with storage category

## Related

* [Connecting CMP to OpenStack](/orchestrators/openstack/connecting) — Step 2 default storage policy
* [OpenStack Packages — Volumes](/orchestrators/openstack/offering-sync-and-packages/volumes)
* [Regions & Availability Zones](/orchestrators/openstack/regions)
* [CloudStack Storage Settings](/orchestrators/cloudstack/storage-settings) — reference
