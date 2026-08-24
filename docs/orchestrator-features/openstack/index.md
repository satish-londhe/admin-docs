---
sidebar_position: 1
title: "OpenStack Features"
tags: ["orchestrator", "openstack", "features", "roadmap"]
---

# OpenStack Features

Feature documentation for **OpenStack** in CMP — what the OpenStack adapter supports today, what is on the roadmap, and links to setup / package docs after the orchestrator is connected.

:::tip[Setup vs features]

Need to connect OpenStack? Start with [Orchestrator Setup — OpenStack](/orchestrators/openstack/).

:::

CMP uses a **single OpenStack adapter** against the standard OpenStack REST APIs (Keystone, Nova, Neutron, Cinder, Glance, and related services such as Octavia or Magnum when present). The same integration covers Upstream OpenStack, RHOSP, Canonical Charmed OpenStack, and VHI — see [Supported platforms](/orchestrators/openstack/#supported-platforms).

---

## Supported features

These capabilities are available in the CMP OpenStack integration today.

| Feature | Notes | Related docs |
|---|---|---|
| **Network IPv4** | Neutron IPv4 networks | [Networks packages](/orchestrators/openstack/offering-sync-and-packages/networks) |
| **Security Groups** | Neutron security groups | [Networks packages](/orchestrators/openstack/offering-sync-and-packages/networks) |
| **Virtual Router** | Neutron routers | [Networks packages](/orchestrators/openstack/offering-sync-and-packages/networks) |
| **Floating IP** | Public / floating IP assignment | [IP Address packages](/orchestrators/openstack/offering-sync-and-packages/ip-address) |
| **Virtual Machine** | Nova instances (flavors, images, deploy) | [Virtual Machine packages](/orchestrators/openstack/offering-sync-and-packages/virtual-machine) |
| **Block storage (Volumes)** | Cinder volumes | [Volumes packages](/orchestrators/openstack/offering-sync-and-packages/volumes) |
| **Block storage Backup** | Cinder volume backup | [Snapshot & Backup](/orchestrators/openstack/snapshot-backup) |
| **Block storage Snapshot** | Cinder volume snapshots | [Volumes Snapshot packages](/orchestrators/openstack/offering-sync-and-packages/volumes-snapshot) |
| **VPN** | VPN connectivity via OpenStack networking | [Networks packages](/orchestrators/openstack/offering-sync-and-packages/networks) |
| **Load Balancer** | Octavia (when present on the cloud) | [Load Balancer packages](/orchestrators/openstack/offering-sync-and-packages/load-balancer) |
| **Kubernetes** | Magnum (when present on the cloud) | [Kubernetes packages](/orchestrators/openstack/offering-sync-and-packages/kubernetes) |
| **SSH Key** | SSH key integration is available; further improvements are planned — see [Roadmap](#roadmap) | [Preparing CMP-compatible images](/orchestrators/openstack/images/preparing-cmp-compatible-images) |
| **Bandwidth** | VM-level metering via Gnocchi; outgoing only | [Bandwidth](/orchestrator-features/openstack/bandwidth) |

:::info[Feature pages]

Per-feature walkthrough pages (customer flows, screenshots) are still expanding. Use the package and setup links above for admin configuration. Dedicated feature pages will be added as content is prepared.

:::

---

## Roadmap

Planned OpenStack integration work — not available yet (or only partly available, as noted).

| Item | Notes |
|---|---|
| **Network IPv6** | IPv6 networking integration |
| **Kubernetes Autoscaling** | Autoscaling for Magnum / CMP Kubernetes clusters |
| **Kubernetes Resizing** | Resize Kubernetes cluster / node capacity |
| **Load Balancer SSL** | SSL / HTTPS rules support on load balancers |
| **SSH Key improvements** | SSH keys are already integrated; roadmap covers UX and capability enhancements |
| **Server Groups** | Nova server groups (affinity / anti-affinity) |
| **Virtual Machine Snapshot** | Instance-level (Nova) snapshots — distinct from volume snapshots already supported |
| **ISO / Image upload** | Customer or admin upload of ISOs and images through CMP |

:::note[Roadmap can change]

Priorities and delivery dates may change. Confirm current status with the StackConsole team before planning go-live around a roadmap item.

:::

---

## Documentation status (detailed pages)

| Topic | Status | Page |
|---|---|---|
| Bandwidth | Ready | [Bandwidth](/orchestrator-features/openstack/bandwidth) |
| Other feature walkthroughs | Coming soon | Listed under [Supported features](#supported-features) via setup / packages |

## Related setup docs

| Topic | Link |
|---|---|
| Connect OpenStack | [Connecting CMP to OpenStack](/orchestrators/openstack/connecting) |
| Regions & AZs | [Regions & Availability Zones](/orchestrators/openstack/regions) |
| Images | [Images](/orchestrators/openstack/images/) |
| Packages & offerings | [OpenStack Packages](/orchestrators/openstack/offering-sync-and-packages/) |
| Snapshot & backup setup | [Snapshot & Backup](/orchestrators/openstack/snapshot-backup) |

## Related

* [Orchestrator Features](/orchestrator-features/)
* [OpenStack Setup](/orchestrators/openstack/)
* [Supported Orchestrators](/overview/supported-orchestrators)
* [CloudStack Features](/orchestrator-features/cloudstack/) — separate CloudStack docs
