---
sidebar_position: 3
title: "Networks"
tags: ["orchestrator", "openstack", "packages", "neutron", "networks", "billing"]
---

# OpenStack Network Packages & Billing

In CMP OpenStack deployments, network provisioning is **non-billed**. Neither private (tenant) networks nor shared public (external) networks incur a network infrastructure package charge. 

Instead, network-related monetization in OpenStack is applied exclusively at the **IP address level** (via floating IPs / public IP packages).

---

## Network Billing Model Overview

| Network Type | Description | Billing in CMP |
|---|---|---|
| **Private Networks** (Tenant / VXLAN / Geneve / VLAN) | Project-isolated networks created by customers or provisioned for VMs/routers. | **No billing.** Free of charge. |
| **Public Networks** (External / Shared Neutron) | External provider networks with `router:external = true` and `shared = true` mapped via **Settings → Orchestrator → Networks**. | **No network fee.** Shared across projects without network-level charges. |
| **IP Addresses** (Floating IPs / Allocated Public IPs) | Public IPv4 addresses allocated from external network pools to VMs, VIPs, or routers. | **Billed.** Configured via [IP Address Packages](/orchestrators/openstack/offering-sync-and-packages/ip-address). |

:::important[Key Principle: IP-Only Monetization]

* **No Network Packages Required:** In OpenStack, you do not need to configure hourly or monthly rate card package charges for network creation or throughput.
* **Shared External Networks:** Public networks are configured once by the cloud administrator under **Settings → Orchestrator → Networks** (see [OpenStack Public Networks](/orchestrator-features/openstack/public-networks)). Because they are shared across all tenant projects in a region, there is no per-tenant network package fee.
* **Monetization Point:** Billing applies strictly to the **IP addresses** assigned to or consumed by instances, routers, or load balancers.

:::

---

## How Networks Function in CMP

### 1. Private Networks
Customers create private networks inside their projects (or during VM provisioning) via Neutron. These provide internal layer-2 connectivity and inter-VM traffic within the project. CMP does not apply any meter or rate card charge to customer private networks.

### 2. Public Networks
Administrators register shared external Neutron networks under **Settings → Orchestrator → Networks**. Once saved:
* CMP automatically creates a corresponding public network across every customer project in that region.
* Customers can select this network when creating VMs, provisioning Kubernetes clusters, or launching Octavia Load Balancers.
* Multiple public networks can be added (for instance, when an existing IP pool is exhausted).
* Since these are shared across all tenants, CMP does not bill for the network entity itself.

---

## Where Billing is Configured: IP Address Packages

Since network usage is monetized via public IP consumption rather than network entities, all pricing configuration is handled under **IP Address packages**:

* **Path:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → IP Address**
* **Target Resource:** External floating IP pools / public IPs allocated from the OpenStack public networks.
* Refer to the **[OpenStack IP Address Packages](/orchestrators/openstack/offering-sync-and-packages/ip-address)** guide for setup steps, pricing structures, and rate card mappings.

---

## Comparison: OpenStack vs. CloudStack Networks

| Dimension | OpenStack (Neutron) | CloudStack (ACS) |
|---|---|---|
| **Private / Guest Networks** | No charge (unmetered tenant networks) | Optional/Compulsory package charges if `enable_network_billing = true` |
| **Public / Shared Networks** | Shared provider network (no charge for network) | Shared networks managed by admin; optional shared IP billing |
| **Primary Monetization** | **IP Address Packages** (Floating IPs) | **Network Packages** (Isolated/L2) + **IP Address Packages** |

---

## Related

* [OpenStack Public Networks (Feature & Admin Guide)](/orchestrator-features/openstack/public-networks)
* [OpenStack IP Address Packages](/orchestrators/openstack/offering-sync-and-packages/ip-address)
* [OpenStack Packages Overview](/orchestrators/openstack/offering-sync-and-packages/)
* [Rate Cards Overview](/billing/rate-cards/)
