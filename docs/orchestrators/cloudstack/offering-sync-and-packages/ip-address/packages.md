---
sidebar_position: 2
title: "Configure pricing"
tags: ["orchestrator", "cloudstack", "packages", "ip-address"]
---

# IP Address packages — configure pricing

IP Address packages control **how much** public / network IPs cost on the rate card. The same package price is used for VM-create IPs, standalone IPs, and shared-network IPs (when billing is enabled on that network).

For **when** shared-network IP billing applies, see [Shared Network IP Billing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing). Category overview: [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/).

:::note[Not CloudStack “reserved IP”]

In CloudStack, **reserving a specific IP for a specific account** is a different concept. That account-level IP reservation is **not supported in CMP**. In this documentation, **standalone IP** means an IP the customer acquires separately in CMP — not CloudStack reserved-IP behaviour.

:::

Unlike compute packages, IP packages do not map to a CloudStack offering ID. CMP acquires public IPs from CloudStack's IP pool and applies the pricing defined in the IP Address package for the relevant zone.

:::warning[Critical — one package per setup and zone; no free trials]

CMP allows **only one IP Address package per Cloud Provider Setup + Zone** combination. You cannot create multiple IP packages (for example, separate tiers or promotional packages) for the same setup and zone.

**Free trials are not applicable to IP Address packages.** The IP Address package form does not include **Enable Free Trial** — public IPs are always billed from the moment they are acquired or assigned. This is a common customer request; advise customers that free trial promotions apply to compute and other service packages, not to IP addresses.

:::

:::info[Before you begin]

Ensure the following are already configured:

* [Cloud Provider Setup](/orchestrators/cloudstack/connecting) is connected, with **IP Address** enabled in Wizard Step 1
* [Zones](/orchestrators/cloudstack/zones) are mapped in CMP
* Public IP ranges are configured in CloudStack for the target zone
* You have an IP Address package for each setup + zone where you charge IPs (**recommended:** bill IPs separately — see [`plan_ip_billing`](#billing-modes-plan_ip_billing--deprecated))

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → IP Address**

:::tip[Shared Network IP billing]

For CloudStack **Shared Networks**, enable or disable IP billing and set **IP Address Type** on each network under **Settings → Orchestrator → Networks**. Pricing still comes from **this** package. See [Shared Network IP Billing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing).

:::

## How IP billing works in CMP

Customers interact with public IPs in two ways:

| Scenario | Description |
|---|---|
| **IP at VM creation** | Customer provisions a VM and selects a public IP during Create Instance |
| **Standalone IP** | Customer purchases a public IP separately (IP Address section) and assigns it to a VM later |

CMP acquires the IP from CloudStack and bills according to your IP package pricing.

### Billing modes (`plan_ip_billing` — deprecated)

:::warning[`plan_ip_billing` is deprecated]

The global setting **`plan_ip_billing`** is **deprecated**. Do not rely on it for new designs.

* **Default:** `true`
* **Recommended:** Charge IP addresses **separately** via this IP Address package (and per-network IP billing where applicable — [Shared Network IP Billing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing))

Leave the flag at **`true`** (or treat separate IP charging as the supported model). Bundling IP cost into the VM package (`false`) is legacy behaviour only.

:::

Historical behaviour of the flag (for existing portals that still expose it):

| Mode | Configuration | Behaviour |
|---|---|---|
| **IP charged separately** (default / recommended) | `plan_ip_billing = true` | A separate IP charge applies when a VM is created with a public IP |
| **IP included in VM package** (legacy) | `plan_ip_billing = false` | Public IP cost is rolled into the VM package price — no separate IP line item if the customer opts for a public IP at VM create |

Standalone IPs purchased separately are **always billed** through the IP Address package regardless of this flag.

### Billing lifecycle

* IP billing **starts** when the IP is assigned to a VM or acquired as a standalone IP
* IP billing **continues** even when the VM is **stopped** — unlike CPU and RAM, which pause under stoppable-service billing
* IP billing **stops** when the IP is released or deleted

### Source NAT IP reuse (isolated networks)

On isolated networks, CMP reuses the network's **Source NAT** public IP for the first VM that requests public access:

1. **First VM with public access** — CMP uses the isolated network's Source NAT IP and associates it via port forwarding. The IP is charged per your **Network** package.
2. **Additional VMs with public access** (Create Instance) — CMP acquires a new public IP and charges for it. Association uses **Static NAT** or **Port Forwarding** per Cloud Provider Setup **[Default Network Strategy](/orchestrator-features/cloudstack/networks/#default-network-strategy-admin-setting)**. Manual IP association outside Create Instance is chosen by the customer. On isolated networks, the first (Source NAT) IP always uses Port Forwarding — see [Networks — Isolated Networks and Source NAT](/orchestrator-features/cloudstack/networks/#important--isolated-networks-and-source-nat).
3. **VM deletion (Source NAT case)** — CMP disassociates the IP from the VM but retains it on the network. **Source NAT IPs are deleted only when the network is deleted** (CloudStack behaviour) — see [VPC — Source NAT IP and deletion](/orchestrator-features/cloudstack/networks/vpc-network#source-nat-ip-and-deletion) and [Isolated Network — Source NAT reuse](/orchestrator-features/cloudstack/networks/isolated-network#source-nat-ip-reuse--cmp-workflow).
4. **Reuse** — If the Source NAT IP is not associated with any VM, CMP reuses it for the next VM that requests public access.

:::info[VPC Source NAT IP and load balancing]

The VPC **Source NAT IP cannot be used for Vm or any load balancer rules** in CloudStack. Using Source NAT will fail at the CloudStack layer. See [Load Balancer — VPC Source NAT and load balancing](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer#vpc-source-nat-ip-and-load-balancing).

:::

## CloudStack prerequisites

Public IPs must be available in CloudStack before customers can acquire them through CMP.

1. Log in to the CloudStack UI with admin privileges
2. Navigate to **Infrastructure → Zones → [your zone] → Physical Networks**
3. Confirm public IP ranges are configured and have available addresses
4. Verify VLAN or network setup allows IP allocation for isolated and VPC networks
5. Test manual IP acquisition from the CloudStack UI before enabling customer self-service

No separate CloudStack "IP offering" is required — CMP manages IP allocation through the CloudStack API.

## Configure IP Address packages in CMP

Create **one** IP Address package per **Cloud Provider + Setup + Zone** where you want defined IP pricing. CMP does not support multiple IP packages for the same setup and zone, and **free trials cannot be enabled** on IP Address packages.

1. Open **Settings → Billing Setup → Rate Cards → Default → Packages → IP Address**
2. Click **Add Package** (form title: **Create IP Address Package**)
3. Complete each field below in the order shown on the form
4. Set **Status** to **Active** and save

![Screenshot: CMP — Create IP Address Package form](/img/screenshots/cmp-ip-address-package-form.png)

Each field below matches the **Create IP Address Package** form.

**Cloud Provider**

*Required.* Select the orchestrator type — for example, **CloudStack (Nimbo)**.

**Cloud Provider Setup**

*Required.* Select the CloudStack instance this package belongs to — for example, `CloudStack-01`.

CMP supports **one IP Address package per Cloud Provider Setup + Zone**. Create separate entries if you operate multiple setups or zones.

**Package Name**

*Required.* Display name for the IP service — for example, `Ip Plan` or `Public IP Address`.

**Zone**

*Required.* Select the CMP zone where this IP pricing applies. IP charges are scoped to the zone where the IP is acquired — for example, `SC-SIM-ZONE-1`.

**Tag**

*Optional.* Assign a tag for filtering or promotional labelling in the customer portal.

:::warning[Important]

Tags are CMP-level labels used for representation only. They do not map to CloudStack host or storage tags.

:::

**Status**

*Required.* Controls package visibility.

| Status | Behaviour |
|---|---|
| **Active** | IP pricing applies when customers acquire public IPs in this zone |
| **Inactive** | Hidden — use while configuring pricing or testing |

**Billing cycle and pricing**

*Required.* Set the price for each billing cycle and currency CMP supports.

IP addresses are typically priced **per IP per month** or **per IP per hour**. Enter values for each billing cycle you offer.

:::tip[Pricing guidance]

Define the **monthly** price first, then derive hourly using `Monthly ÷ (30.5 × 24)`. See [Pricing Formulas](/billing/rate-cards/pricing-formulas).

With the **recommended** model (IPs charged separately; deprecated `plan_ip_billing` default **`true`**), this package pricing applies to IPs acquired at VM creation and to **standalone IPs**. The legacy `plan_ip_billing = false` path mainly used this package for standalone IPs only.

:::

:::info[No free trial field]

The **Create IP Address Package** form does not include **Enable Free Trial**. Public IPs are always billed from acquisition — see the critical note at the top of this page.

:::

## End-to-end example

**Goal:** Charge $5/month per public IP separately from VM pricing in zone `SC-SIM-ZONE-1`.

**CMP global settings**

1. Prefer separate IP charging (**recommended**). The deprecated flag `plan_ip_billing` defaults to **`true`** — leave it at `true` if still present in Global Settings

**CMP package**

1. Open **Packages → IP Address → Add Package**
2. Set **Cloud Provider** **CloudStack (Nimbo)**, **Cloud Provider Setup** `CloudStack-01`, **Package Name** `Ip Plan`, **Zone** `SC-SIM-ZONE-1`
3. Enter pricing — for example, USD monthly `5.00`, hourly derived automatically
4. Set **Status** to **Active** and save

Customers creating a VM with a public IP or purchasing a standalone IP are charged per this package.

## Customer portal view

Customers acquire IPs during **Create Instance** (public IP option) or from the **IP Address** section for standalone IPs.

:::info[Customer FAQ — free trial IPs]

Customers often ask whether public IPs can be included in a free trial. **They cannot.** IP Address packages do not support free trials — any public IP acquired or assigned is billed immediately per the zone's IP package pricing, even if the associated VM is on a free trial.

:::
At the time of **VM Creation**
![Screenshot: CMP — Customer IP address purchase or assignment](/img/screenshots/cmp-customer-ip-address.png)

From **network section**
![Screenshot: CMP — Customer IP address purchase or assignment](/img/screenshots/cmp-customer-ip-address-network-section.png)

## Validation checklist

Before marking an IP Address package **Active**, verify:

* **IP Address** service is enabled in Cloud Provider Setup (Wizard Step 1)
* Public IP ranges are configured and have available addresses in CloudStack for the target zone
* IPs are charged separately via this package (**recommended**); if `plan_ip_billing` still appears in Global Settings, leave it at default **`true`** (flag is **deprecated**)
* Pricing is configured for each supported currency and billing cycle
* [Global quotas](/quota/global-quotas) allow sufficient **IP Address** count per account
* CloudStack IP quota limits are set high enough — see [Quota Management (ACS)](/orchestrators/cloudstack/quota-management)

## Related

* [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/) — category overview
* [Shared Network IP Billing](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing)
* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Billing Overview](/billing/overview)
* [Pricing Formulas](/billing/rate-cards/pricing-formulas)
