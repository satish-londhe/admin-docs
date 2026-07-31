---
sidebar_position: 4
title: "Regions & Availability Zones"
tags: ["orchestrator", "openstack", "regions", "availability-zones", "setup"]
---

# Regions & Availability Zones

Map OpenStack **regions** and **availability zones** into CMP so customers can provision into the correct location. Analogous to [Configuring Zones in CMP](/orchestrators/cloudstack/zones) for CloudStack.

:::danger[Documentation in progress]

This page is a **stub**. Document CMP UI path, AZ naming rules, and how region/AZ appears on packages.

:::

:::warning[AZ name consistency]

Availability Zone names must be **identical** across Nova, Cinder, and Neutron. Mismatched names cause silent provisioning failures — see [OpenStack Requirements](/installation/orchestrator-requirements/openstack#43-availability-zone-consistency).

:::

## Topics to cover

* Discover / sync regions and AZs from OpenStack  
* Enable zones for customer portal  
* Tie packages to Cloud Provider + Setup + Zone + Storage Category  
* Multi-region setups (if supported)

## Related

* [Connecting CMP to OpenStack](/orchestrators/openstack/connecting)
* [OpenStack Packages](/orchestrators/openstack/offering-sync-and-packages/)
* [Storage Settings](/orchestrators/openstack/storage-settings)
