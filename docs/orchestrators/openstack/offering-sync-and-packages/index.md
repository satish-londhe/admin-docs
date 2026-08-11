---
sidebar_position: 1
title: "OpenStack Packages"
tags: ["orchestrator", "openstack", "packages", "rate-cards", "flavors"]
---

# OpenStack Packages

After regions and images are configured, map OpenStack resources (**flavors**, networks, volumes, floating IPs, and so on) to CMP **rate card packages** so customers can provision and purchase.

Package types are configured in CMP under **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages**.

:::danger[Documentation in progress]

Package pages below are **stubs**. Fill flavors/sync behaviour, form fields, and screenshots per type — use [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/) as a structural reference.

:::

## Pages in this section

* [Virtual Machine](/orchestrators/openstack/offering-sync-and-packages/virtual-machine) — Nova flavors; override root disk recommended  
* [Networks](/orchestrators/openstack/offering-sync-and-packages/networks) — Neutron  
* [Load Balancer](/orchestrators/openstack/offering-sync-and-packages/load-balancer) — Octavia (if used)  
* [Kubernetes](/orchestrators/openstack/offering-sync-and-packages/kubernetes) — Magnum (if used)  
* [IP Address](/orchestrators/openstack/offering-sync-and-packages/ip-address) — floating IPs  
* [Volumes](/orchestrators/openstack/offering-sync-and-packages/volumes) — Cinder  
* [Volumes Snapshot](/orchestrators/openstack/offering-sync-and-packages/volumes-snapshot)  
* [Image](/orchestrators/openstack/offering-sync-and-packages/image) — customer / account images billing  
* [Unit Pricing](/orchestrators/openstack/offering-sync-and-packages/unit-pricing)  
* [Products](/orchestrators/openstack/offering-sync-and-packages/products)

## Key points (to confirm while writing)

* Packages unique per **Cloud Provider + Setup + Zone + Storage Category**  
* **Enable Override Disk Offering = Yes** (recommended) — flavors with Root Disk `0`; separate storage at provision; required for clean [stoppable services](/billing/stoppable-services) and easier CPU/RAM upgrade/downgrade — see [Virtual Machine packages](/orchestrators/openstack/offering-sync-and-packages/virtual-machine)  
* Whether flavors auto-sync or are mapped manually in CMP  
* External network ID for public IPs ([requirements](/installation/orchestrator-requirements/openstack#7-configuration-values-required-for-cmp))

## Related

* [Regions & Availability Zones](/orchestrators/openstack/regions)
* [Images](/orchestrators/openstack/images/)
* [Rate Cards](/billing/rate-cards/)
* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
