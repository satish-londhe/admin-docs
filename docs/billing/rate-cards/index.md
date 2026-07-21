---
sidebar_position: 1
title: "Rate Cards"
tags: ["billing", "rate-cards", "packages", "pricing"]
---

# Rate Cards

Rate cards define **what customers can buy** and **how much they pay**. A rate card is a **pricing catalogue** — it contains packages (Virtual Machine, Volumes, IP Address, and so on) with orchestrator mappings and billing rates.

CMP supports **multiple rate cards**. Use a **default** rate card for standard self-service customers, and create **additional rate cards** for enterprise or negotiated pricing.

**CMP path:** **Settings → Billing Setup → Rate Cards**

```
Settings  →  Billing Setup  →  Rate Cards  →  [Rate Card Name]  →  Packages
```

:::warning[Configure all packages before using a rate card]

Ensure **all required packages** are added and set to **Active** on a rate card before assigning it to customers or marking it as default. A rate card with missing package types (for example, no VM or Volumes packages) will cause provisioning or billing failures for customers on that rate card.

:::

## Multiple rate cards

| Rate card type | Typical use |
|---|---|
| **Default** | Standard pricing for self-registered and general customers |
| **Customer-specific** | Enterprise or negotiated pricing agreed by the sales team — for example, discounted VM tiers or custom unit pricing for one account |

As a CMP super admin, you can create as many rate cards as needed. Each rate card has its own set of packages and prices, independent of other rate cards.

**Example:** Your **Default** rate card sells a 2 vCPU VM at $20/month. For enterprise customer *Acme Corp*, create a rate card **Acme Enterprise** with the same packages at $15/month and assign that rate card to the Acme account during onboarding.

## How customers get a rate card

| Scenario | Rate card assignment |
|---|---|
| **Self-registration** | CMP automatically assigns the rate card marked **Mark as Default** |
| **Admin onboarding** | Admin selects **Price Rate Card** on **Register Client → Step 2** — see [Admin registration flow](/billing/payment-modes/#admin-registration-flow) |

During admin onboarding, choose **Price Rate Card** on [Register Client Step 2](/billing/payment-modes/#admin-registration-flow) — useful when sales has agreed custom pricing on a dedicated rate card.

## Changing a customer's rate card

| Situation | Supported? |
|---|---|
| Customer account has **no services** created | ✅ Admin can change the assigned rate card |
| Customer account **already has services** | ❌ **Not supported** — rate card cannot be changed |

Once a customer has created any service, their assigned rate card is **fixed**. CMP does not support moving active customers to a different rate card.

Assign the correct rate card during **admin onboarding** before the customer provisions services. For self-registered customers, ensure the **Mark as Default** rate card is correct before opening self-registration.

## Current limitations

| Limitation | Supported today? | Current behaviour |
|---|---|---|
| **Change customer rate card after services exist** | ❌ No | Rate card can only be changed while the account has **no services** |
| **Bulk update packages on a rate card** | ❌ No | Each package must be opened and updated **individually** |
| **Replicate a rate card with adjusted pricing** | ❌ No | Create a new rate card and configure all packages **manually** |

:::tip[Workaround for new pricing tiers today]

To offer different pricing today, create a **new rate card**, add packages one by one, and assign it during **admin onboarding** before the customer provisions services. Existing customers on another rate card cannot be moved.

:::

## Roadmap

The following rate card capabilities are on the CMP product roadmap and **not yet available**:

| Feature | Planned capability |
|---|---|
| **Change customer rate card at any time** | Admins can reassign a customer to a different rate card **even after services exist** |
| **Bulk update packages** | Update prices or settings for **multiple packages** on a rate card in one operation |
| **Replicate rate card with price adjustment** | Duplicate an existing rate card and adjust all package prices during replication — by **percentage** (for example, −10%) or by a **fixed amount** (for example, +$5/month per package) |

:::info[Not yet available]

These roadmap items are under development. Behaviour and availability may vary by deployment until they are released.

:::

## Create a rate card

1. Open **Settings → Billing Setup → Rate Cards**
2. Click **Add Rate Card** (form title: **Add Rate Card**)
3. Complete each field below
4. Click **Submit**
5. Open the new rate card and configure **Packages** for each service type before assigning it to customers

![Screenshot: CMP — Add Rate Card form](/img/screenshots/cmp-rate-card-add-form.png)

Each field below matches the **Add Rate Card** form.

**Name**

*Required.* Display name for the rate card — for example, `Default`, `Enterprise Gold`, or `Acme Corp Pricing`.

**Description**

*Required.* Short description of the rate card purpose — for example, `Standard public pricing` or `Negotiated pricing for Acme Corp enterprise agreement`.

**Account Type**

*Required.* Select which account type this rate card applies to — **Customer**, **Reseller**, or **Vendor**. Match the account type of accounts that will use this rate card.

**Status**

*Required.* Controls whether the rate card is available for assignment.

| Status | Behaviour |
|---|---|
| **Active** | Rate card can be assigned to customers and used for package configuration |
| **Inactive** | Hidden — use while configuring packages or retiring a rate card |

**Mark as Default**

*Optional.* When enabled, this rate card is automatically assigned to customers who **self-register** through the public registration form. Only one rate card should be marked as default at a time.

## Configure packages on a rate card

After creating a rate card, add packages under:

**Settings → Billing Setup → Rate Cards → [Rate Card Name] → Packages**

Each package type (Virtual Machine, Volumes, IP Address, and so on) is configured separately. Orchestrator-specific guides below explain form fields and CloudStack prerequisites.

:::tip[Default rate card in documentation]

Many guides reference **Rate Cards → Default → Packages** as the example path. Replace **Default** with your rate card name when configuring customer-specific rate cards.

:::

## Orchestrator rate card guides

| Orchestrator | Status | Documentation |
|---|---|---|
| **CloudStack (ACS)** | ✅ Available | [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/) |
| **OpenStack** | 🔲 Coming soon | [OpenStack](/orchestrators/openstack/) — package documentation will be added in a future release |
| **VMware vSphere** | 🔲 Coming soon | [VMware](/orchestrators/vmware/) — package documentation will be added in a future release |
| **Proxmox VE** | 🔲 Coming soon | [Proxmox](/orchestrators/proxmox/) — package documentation will be added in a future release |
| **OpenNebula** | 🔲 Coming soon | [OpenNebula](/orchestrators/opennebula/) — package documentation will be added in a future release |

## CloudStack package types

If you use CloudStack, see [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/) for the full list:

* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Kubernetes](/orchestrators/cloudstack/offering-sync-and-packages/kubernetes)
* [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [VM Autoscale](/orchestrators/cloudstack/offering-sync-and-packages/vm-autoscale)
* [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot)
* [Template](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [ISO](/orchestrators/cloudstack/offering-sync-and-packages/iso)
* [VM Backup](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)
* [Products](/orchestrators/cloudstack/offering-sync-and-packages/products)

## Validation checklist

Before marking a rate card **Active** and assigning it to customers:

* All required **package types** for your service catalogue are configured under this rate card
* Packages are set to **Active** with pricing for each supported currency and billing cycle
* [Storage Settings](/orchestrators/cloudstack/storage-settings) and orchestrator prerequisites are complete (CloudStack zones, templates, offerings)
* **Mark as Default** is set on exactly one rate card if self-registration is enabled
* Enterprise rate cards are assigned to the correct accounts during admin onboarding

## Related

* [Billing Overview](/billing/overview)
* [Pricing Formulas](/billing/rate-cards/pricing-formulas)
* [Initial Super Admin Setup](/installation/initial-setup)
* [CloudStack (ACS)](/orchestrators/cloudstack/)
* [Storage Settings](/orchestrators/cloudstack/storage-settings)
