---
sidebar_position: 4
title: "Virtual Router/VPC"
tags: ["orchestrator", "cloudstack", "packages", "vpc", "virtual-router"]
---

# Virtual Router / VPC Packages

Virtual Router / VPC packages define the **VPC tiers** customers select when creating a Virtual Private Cloud in CMP. Each package maps to a CloudStack **VPC offering**, which controls the VPC virtual router's CPU, memory, supported network services, and throughput characteristics.

Use multiple packages to offer tiered VPC plans — for example, **Basic VPC** with a small virtual router and **High-Performance VPC** with higher CPU and network rate limits.

:::info[Before you begin]

Ensure the following are already configured:

* [Cloud Provider Setup](/orchestrators/cloudstack/connecting) is connected, with **VPC/Virtual Router** enabled in Wizard Step 1
* **Default VPC ACL Allow ID** is set in Provider Config (Wizard Step 2) if you use default allow ACLs for new VPCs
* [Zones](/orchestrators/cloudstack/zones) are mapped in CMP for each datacenter region
* VPC offerings exist in CloudStack for each tier you plan to sell — see [CloudStack prerequisites](#cloudstack-prerequisites) below

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → Virtual Router/VPC**

## How VPC virtual routers work in CloudStack

When a customer creates a VPC through CMP, CloudStack deploys a **VPC virtual router** — a system VM that provides routing, NAT, DHCP, DNS, VPN, and other VPC-level network services.

The virtual router's capacity is determined by the **system service offering** linked to the **VPC offering**:

```
System Service Offering  →  VPC Offering  →  VPC virtual router resources
```

| Layer | CloudStack object | What it controls |
|---|---|---|
| **System service offering** | Service Offerings → System Offering | Virtual router VM CPU, RAM, and tags (visible to root admin only) |
| **VPC offering** | Network → VPC → VPC Offerings | Supported VPC services, linked system offering, distributed router option |
| **CMP package** | Packages → Virtual Router/VPC | Customer-facing tier name, zone scope, and pricing |

Refer to the [Apache CloudStack service offerings guide](https://docs.cloudstack.apache.org/en/latest/adminguide/service_offerings.html) and [VPC offering API](https://cloudstack.apache.org/api/apidocs-4.12/apis/createVPCOffering.html).

:::tip[Isolated networks vs VPC]

**Isolated networks** (non-VPC) also use a dedicated virtual router per network, but they are provisioned through **network offerings**, not VPC offerings. CMP can bill isolated networks separately when `enable_network_billing` is enabled and network packages are configured.

This page covers **VPC packages**. Isolated network billing uses the same virtual router concepts but a different offering type and billing flag.

:::

## CloudStack prerequisites

Create offerings in CloudStack **before** creating CMP packages. Plan one VPC offering per tier you want to sell (for example, small / medium / large virtual router).

### Step 1 — Create system service offerings

System service offerings define the virtual router VM's compute resources. Create one per virtual router size.

1. Log in to the CloudStack UI with **root admin** privileges
2. Navigate to **Service Offerings → System Offering**
3. Click **Add System Offering**
4. Configure the offering — for example:
   * **Name:** `VR-Small` or `VPC-Router-Medium`
   * **System VM Type:** **Domain Router**
   * **CPU (in MHz)** and **# of CPU cores** — higher values improve VPN encryption and load-balancing throughput
   * **Memory (in MB)** — allocate more memory for high connection-count workloads (web servers, NAT-heavy traffic)
5. Scope the offering to the target **Zone(s)**
6. Click **Add**

Common sizing scenarios from production deployments:

| Workload | Virtual router sizing guidance |
|---|---|
| **Standard VPC** | Default or small system offering — basic routing and NAT |
| **High connection count** | More memory — virtual router tracks large NAT connection tables |
| **Heavy VPN / encryption** | Higher CPU MHz — encryption is CPU-intensive |
| **VR as load balancer** | More CPU — distributes traffic across many backend VMs |

img/screenshots/acs-system-service-offering-domain-router.png

![Screenshot: CloudStack — Add System Offering for Domain Router](/img/screenshots/placeholder.png)

### Step 2 — Create VPC offerings

Link each VPC tier to a system service offering and enable the VPC services your customers need.

1. Navigate to **Network → VPC → VPC Offerings** (or **Service Offerings → VPC Offering** depending on CloudStack UI version)
2. Click **Add VPC Offering**
3. Configure the offering — for example:
   * **Name:** `Basic-VPC` or `Premium-VPC-200Mbps`
   * **Display text:** Customer-visible description in CloudStack
   * **Supported services:** Select services the VPC router should provide — typically **DHCP**, **DNS**, **Source NAT**, **Static NAT**, **Port Forwarding**, **VPN**, **Load Balancer** as required
   * **Service offering:** Select the **system service offering** created in Step 1 — this sets virtual router CPU and RAM
   * **Distributed VPC router:** Enable only if your network design supports distributed VPC routers
4. Set **State** to **Enabled** and scope to the target **Zone(s)**
5. Click **Add**
6. Repeat for each VPC tier (for example, Basic vs High-Performance)

img/screenshots/acs-vpc-offering-create.png

![Screenshot: CloudStack — Add VPC Offering with system service offering linked](/img/screenshots/placeholder.png)

:::warning[Offerings cannot be changed after creation]

CloudStack does not allow material changes to VPC offerings after they are in use. Plan virtual router sizes and supported services before creating production offerings.

:::

### Step 3 — Set network rate limits (optional)

To cap total VPC throughput (for example, 200 Mb/s), configure rate limits on the **network offering** used for VPC guest tiers or through service capabilities on the VPC offering, depending on your CloudStack version and network plugin.

Throughput limits are a common differentiator between Basic and Premium VPC packages.

## CMP Provider Config prerequisites

During [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) — Wizard Step 2 — configure:

| Field | Purpose |
|---|---|
| **Default VPC ACL Allow ID** | CloudStack ACL UUID applied to every new VPC created via CMP. Obtain from **CloudStack → Network → VPC → ACL Lists**. |
| **VPC/Virtual Router service** | Must be enabled in Wizard Step 1 before customers can create VPCs |

Set **Default VPC ACL Allow ID** to the ACL that allows the inbound/outbound rules your customers need by default. Customers can manage VPC ACL rules from the CMP portal after VPC creation.

## Configure VPC packages in CMP

After VPC offerings exist in CloudStack, create a matching CMP package for each **Cloud Provider + Setup + Zone + offering** combination you want to sell.

1. Open **Settings → Billing Setup → Rate Cards → Default → Packages → Virtual Router/VPC**
2. Click **Add Package**
3. Complete each field below
4. Set **Status** to **Active** and save

img/screenshots/cmp-vpc-package-form.png

![Screenshot: CMP — Create Virtual Router/VPC package form](/img/screenshots/placeholder.png)

## Package Name

**Required.** Display name for the VPC tier — for example, `Basic VPC` or `High-Performance VPC`. Customers see this name when creating a VPC.

## Cloud Provider

**Required.** Select the orchestrator type — for example, **CloudStack (Nimbo)**.

## Cloud Provider Setup

**Required.** Select the CloudStack instance this package belongs to — for example, `CloudStack-01`. The **Select Offering** dropdown lists VPC offerings available on this setup.

## Zone

**Required.** Select the CMP zone where this VPC package is sold. The package appears on the Create VPC page only for this zone.

Create a separate package entry for each zone even when the underlying CloudStack VPC offering name is the same.

## Select Offering

**Required.** Select the CloudStack **VPC offering** that CMP uses when provisioning this package.

The offering must:

* Exist in CloudStack for the selected zone
* Be in **Enabled** state
* Include the network services your customers need (NAT, VPN, LB, and so on)
* Link to the intended **system service offering** for virtual router sizing

## Description

*Optional.* Short description shown to customers explaining what this VPC tier includes — for example, throughput limits, recommended use cases, or included services.

## Status

**Required.** Controls package visibility.

| Status | Behaviour |
|---|---|
| **Active** | Package appears on the customer Create VPC page |
| **Inactive** | Package is hidden — use while configuring pricing or testing |

## Billing cycle and pricing

**Required.** Set the price for each billing cycle and currency CMP supports.

CMP displays a pricing grid for the currencies enabled at application level. Enter values for the cycles you offer.

:::tip[Pricing guidance]

Define the **monthly** price first, then derive hourly using `Monthly ÷ (30.5 × 24)`. See [Pricing Formulas](/packages/pricing-formulas) for all conversion formulas.

When pricing VPC packages, consider:

* Virtual router VM resources (CPU, RAM) from the linked system service offering
* Default **Source NAT** public IP included with the VPC
* Network throughput tier if you differentiate packages by rate limit

:::

## End-to-end mapping example

**Goal:** Sell a Basic VPC and a Premium VPC in zone `SC-SIM-ZONE-1`.

**CloudStack**

1. Create system service offering `VR-Small` — Domain Router, 1 CPU, 512 MB RAM
2. Create system service offering `VR-Large` — Domain Router, 2 CPU, 2048 MB RAM
3. Create VPC offering `Basic-VPC` linked to `VR-Small` with DHCP, DNS, Source NAT, Static NAT
4. Create VPC offering `Premium-VPC` linked to `VR-Large` with all Basic services plus VPN and Load Balancer
5. Enable both offerings in zone `SC-SIM-ZONE-1`

**CMP**

1. Open **Settings → Billing Setup → Rate Cards → Default → Packages → Virtual Router/VPC**
2. Create package `Basic VPC` — **Cloud Provider Setup** `CloudStack-01`, **Zone** `SC-SIM-ZONE-1`, **Select Offering** `Basic-VPC`
3. Create package `Premium VPC` with **Select Offering** `Premium-VPC`
4. Enter pricing for each package across billing cycles and currencies
5. Set **Status** to **Active** and save

Customers selecting a package on **Create VPC** provision a VPC using the mapped CloudStack VPC offering. The virtual router is sized by the linked system service offering.

## Customer portal view

When multiple VPC packages are configured, customers choose the tier that fits their needs during VPC creation.

img/screenshots/cmp-customer-create-vpc-packages.png

![Screenshot: CMP — Create VPC with multiple VPC package tiers](/img/screenshots/placeholder.png)

## Validation checklist

Before marking a VPC package **Active**, verify:

* **VPC/Virtual Router** service is enabled in Cloud Provider Setup (Wizard Step 1)
* **Default VPC ACL Allow ID** is configured in Provider Config if required
* CloudStack **system service offering** exists for the target virtual router size
* CloudStack **VPC offering** exists, is **Enabled**, and scoped to the correct zone
* **Select Offering** in CMP maps to the correct CloudStack VPC offering
* Pricing is configured for each supported currency and billing cycle
* [Global quotas](/quota/global-quotas) allow sufficient **Virtual Router** / **VPC** count for customer accounts
* CloudStack VPC and network quota limits are set high enough to avoid provisioning failures — see [Quota Management (ACS)](/orchestrators/cloudstack/quota-management)

## Related

* [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) — Provider Config and VPC ACL
* [Configuring Zones in CMP](/orchestrators/cloudstack/zones)
* [Quota Management (ACS)](/orchestrators/cloudstack/quota-management)
* [Global Quotas](/quota/global-quotas)
* [Pricing Formulas](/packages/pricing-formulas)
* [Apache CloudStack — System Service Offerings](https://docs.cloudstack.apache.org/en/latest/adminguide/service_offerings.html)
* [Apache CloudStack — createVPCOffering API](https://cloudstack.apache.org/api/apidocs-4.12/apis/createVPCOffering.html)
