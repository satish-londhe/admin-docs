---
sidebar_position: 5
title: "Load Balancer"
tags: ["orchestrator", "cloudstack", "packages", "load-balancer"]
---

# Load Balancer Packages

Load Balancer packages define how CMP bills customers for **network-level load balancing** in CloudStack. In CloudStack, load balancers operate at the **network and public IP layer** — the virtual router distributes traffic to backend VMs using load balancer rules.

CMP typically uses **one load balancer package per Cloud Provider + Setup + Zone** combination. Pricing applies when customers create load balancer rules from the CMP portal.

:::info[Before you begin]

Ensure the following are already configured:

* [Cloud Provider Setup](/orchestrators/cloudstack/connecting) is connected, with **Load Balancer** enabled in Wizard Step 1
* [Zones](/orchestrators/cloudstack/zones) are mapped in CMP
* Network offerings in CloudStack include the **Load Balancer** service — usually via VPC offerings or isolated network offerings with LB enabled on the virtual router
* Customers have VMs with public IPs or are operating inside a VPC/isolated network that supports load balancing

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → Load Balancer**

## How load balancing works in CloudStack

CloudStack does not deploy a separate load balancer appliance for standard network LB. Instead, the **virtual router** for the network or VPC handles load balancing when the **network offering** (or VPC offering) includes the Load Balancer service.

```
Network / VPC offering  →  Virtual router with LB service  →  Load balancer rules on public IP
```

| Component | Role |
|---|---|
| **Network offering / VPC offering** | Enables Load Balancer as a supported service on the virtual router |
| **Virtual router** | Runs LB algorithms and distributes traffic to backend VMs |
| **Public IP** | Target IP for the load balancer rule — customers associate rules with acquired IPs |
| **CMP package** | Defines per-zone pricing when customers create or use load balancer rules |

Customers create load balancer rules from:

* The **Load Balancer** section in the CMP portal
* The **Network / IP address details** page for a specific public IP

Refer to the [Apache CloudStack networking guide](https://docs.cloudstack.apache.org/en/latest/adminguide/networking.html).

## CloudStack prerequisites

Load balancer capability is enabled through **network offerings**, not a standalone LB offering type.

### Ensure Load Balancer service is available

1. Log in to the CloudStack UI with admin privileges
2. Verify your **VPC offerings** or **isolated network offerings** include **Load Balancer** in supported services
3. For VPC deployments, create or update a VPC offering that enables:
   * **Load Balancer**
   * **Source NAT** and **Static NAT** (required for public IP association)
   * Other services your customers need (DHCP, DNS, Port Forwarding, VPN)
4. Link an appropriately sized **system service offering** to the VPC offering if the virtual router will handle heavy LB traffic — see [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)

:::tip[Virtual router sizing for load balancing]

When the virtual router acts as a load balancer for many backend VMs, allocate more CPU on the linked system service offering. Heavy LB workloads are CPU-intensive.

:::

### Verify LB service providers

CloudStack routes the Load Balancer service to a network service provider (for example, VirtualRouter). Confirm the provider is configured on the physical network in the target zone under **Infrastructure → Physical Networks → Network Service Providers**.

img/screenshots/acs-network-offering-load-balancer.png

![Screenshot: CloudStack — Network or VPC offering with Load Balancer service enabled](/img/screenshots/placeholder.png)

## Configure Load Balancer packages in CMP

After CloudStack networking supports load balancing, create one CMP package per zone where you want to charge for LB usage.

1. Open **Settings → Billing Setup → Rate Cards → Default → Packages → Load Balancer**
2. Click **Add Package**
3. Complete each field below
4. Set **Status** to **Active** and save

img/screenshots/cmp-load-balancer-package-form.png

![Screenshot: CMP — Create Load Balancer package form](/img/screenshots/placeholder.png)

## Package Name

**Required.** Display name for the load balancer service — for example, `Standard Load Balancer` or `Network Load Balancer`.

## Cloud Provider

**Required.** Select the orchestrator type — for example, **CloudStack (Nimbo)**.

## Cloud Provider Setup

**Required.** Select the CloudStack instance this package belongs to — for example, `CloudStack-01`.

CMP supports **one load balancer package per Cloud Provider Setup + Zone**. Create separate entries if you operate multiple setups or zones.

## Zone

**Required.** Select the CMP zone where this load balancer package applies. Load balancer billing is scoped to the zone where the customer's network and VMs reside.

## Description

*Optional.* Short description explaining what is included — for example, whether pricing is per rule, per IP, or a flat monthly fee.

## Status

**Required.** Controls package visibility.

| Status | Behaviour |
|---|---|
| **Active** | Load balancer pricing applies when customers create LB rules in this zone |
| **Inactive** | Hidden — use while configuring pricing or testing |

## Billing cycle and pricing

**Required.** Set the price for each billing cycle and currency CMP supports.

Load balancer billing in CMP is typically a **flat recurring charge** per load balancer rule or per network, depending on your rate card design. Enter pricing for each billing cycle you offer.

:::tip[Pricing guidance]

Define the **monthly** price first, then derive hourly using `Monthly ÷ (30.5 × 24)`. See [Pricing Formulas](/packages/pricing-formulas).

When pricing Kubernetes or bundled services, note that CMP does **not** charge for the Kubernetes default load balancer by default — configure LB pricing only if you intend to bill for it separately.

:::

## End-to-end example

**Goal:** Charge for load balancer rules in zone `SC-SIM-ZONE-1`.

**CloudStack**

1. Confirm VPC offering `Premium-VPC` includes **Load Balancer** service
2. Verify VirtualRouter LB provider is active on the zone's physical network

**CMP**

1. Enable **Load Balancer** service in Cloud Provider Setup (Wizard Step 1)
2. Open **Packages → Load Balancer → Add Package**
3. Set **Package Name** `Standard Load Balancer`, **Cloud Provider Setup** `CloudStack-01`, **Zone** `SC-SIM-ZONE-1`
4. Enter monthly and hourly pricing
5. Set **Status** to **Active** and save

Customers with VMs on networks that support LB can create rules from the Load Balancer page or from a public IP's detail page.

## Customer portal view

Customers manage load balancers from the **Load Balancer** section or from **Network → IP Address** details.

img/screenshots/cmp-customer-load-balancer.png

![Screenshot: CMP — Customer load balancer rule creation](/img/screenshots/placeholder.png)

## Validation checklist

Before marking a Load Balancer package **Active**, verify:

* **Load Balancer** service is enabled in Cloud Provider Setup (Wizard Step 1)
* CloudStack network or VPC offerings in the zone include the **Load Balancer** service
* Virtual router system service offerings are sized for expected LB traffic
* Pricing is configured for each supported currency and billing cycle
* [Global quotas](/quota/global-quotas) allow sufficient **Load Balancer** count per account

## Related

* [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Pricing Formulas](/packages/pricing-formulas)
* [Apache CloudStack — Networking](https://docs.cloudstack.apache.org/en/latest/adminguide/networking.html)
