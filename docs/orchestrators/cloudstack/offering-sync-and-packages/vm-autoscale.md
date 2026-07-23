---
sidebar_position: 8
title: "VM Autoscale"
tags: ["orchestrator", "cloudstack", "packages", "autoscale", "rate-cards"]
---

# VM Autoscale Packages

VM Autoscale packages define an **optional charge for the Auto Scaling engine** itself. They are separate from billing for VMs, load balancers, IP addresses, and other resources, which use their own packages.

Create one package per **Cloud Provider + Setup + Zone** where you want to offer or bill for VM Autoscale.

:::info[Before you begin]

Ensure the following are already configured:

* [Cloud Provider Setup](/orchestrators/cloudstack/connecting) is connected, with **VM Autoscale** enabled in Wizard Step 1
* [Zones](/orchestrators/cloudstack/zones) are mapped in CMP
* Customers can create templates from VMs / snapshots when required — see [Template packages](/orchestrators/cloudstack/offering-sync-and-packages/template) (autoscale groups typically need a customer-owned template)

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → VM Autoscale**

:::tip[Feature docs]

Customer portal flows for autoscale groups: [Autoscaling features](/orchestrator-features/cloudstack/autoscaling/). This page covers **admin package / pricing** setup only.

:::

---

## How VM Autoscale package pricing works

The VM Autoscale package price is an **optional engine fee** for the Auto Scaling service.

| Charged by | Package |
|---|---|
| Auto Scaling engine (optional) | **VM Autoscale** package (this page) |
| Scaled VMs | [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine) packages |
| Load balancers used with the group | [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer) packages |
| Public IPs | [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address) packages |
| Other resources | Their respective packages |

If you do **not** want to charge for the Auto Scaling engine, leave pricing empty or set all values to `0`, and still create an **Active** package if customers need the feature available in that zone.

---

## Configure VM Autoscale packages in CMP

1. Open **Settings → Billing Setup → Rate Cards → Default → Packages → VM Autoscale**
2. Click **Add Package** (form title: **Create VM Autoscale Package**)
3. Complete each field below in the order shown on the form
4. Set **Status** to **Active** and save

![Screenshot: CMP — Create VM Autoscale Package form](/img/screenshots/cmp-vm-autoscale-package-form.png)

Each field below matches the **Create VM Autoscale Package** form.

**Cloud Provider**

*Required.* Select the orchestrator type — for example, **CloudStack (Nimbo)**.

**Cloud Provider Setup**

*Required.* Select the CloudStack instance this package belongs to — for example, `CloudStack-01`.

**Package Name**

*Required.* Display name for the Auto Scaling engine package — for example, `VM Autoscale` or `Autoscale Engine`.

**Zone**

*Required.* Select the CMP zone where this package applies. Create a separate package entry for each zone where VM Autoscale is offered.

**Tag**

*Optional.* Assign a tag for filtering or promotional labelling in the customer portal — for example, **Recommended**.

:::warning[Important]

Tags are CMP-level labels used for representation only. They do not map to CloudStack host or storage tags.

:::

**Status**

*Required.* Controls package visibility.

| Status | Behaviour |
|---|---|
| **Active** | Package is available for VM Autoscale in this zone (and engine pricing applies if set) |
| **Inactive** | Hidden — use while configuring pricing or testing |

:::note[Enable Free Trial — not applicable]

**Enable Free Trial** is **not applicable** for VM Autoscale packages. It will be removed from this form in the UI soon. Do not rely on it for autoscale engine billing.

:::

**Billing cycle and pricing**

*Optional for the engine fee.* Set the price for each billing cycle and currency CMP supports — typically **Hourly**, **Monthly**, and **Yearly**.

:::info[About autoscaling engine and resources charge]

This is an **optional** charge for the Auto Scaling service itself and is **separate** from the billing of VMs, Load Balancers, IP addresses, and other resources, which are charged according to their respective pricing packages.

Configure this price only if you want to charge for the Auto Scaling Engine. Otherwise, leave it empty or set it to `0`.

:::

:::note

If the price is not applicable for your service, set its value to `0`.

:::

Example pricing grid:

| Currency | Hourly | Monthly | Yearly |
|---|---|---|---|
| INR (₹) | 0 | 0 | 0 |
| USD ($) | 0 | 0 | 0 |

:::tip[Pricing guidance]

If you charge for the engine, define the **monthly** price first, then derive hourly using `Monthly ÷ (30.5 × 24)`. See [Pricing Formulas](/billing/rate-cards/pricing-formulas).

:::

---

## End-to-end example

**Goal:** Offer VM Autoscale in zone `SC-SIM-ZONE-1` with no separate engine fee (VMs and other resources bill normally).

**CMP**

1. Enable **VM Autoscale** in Cloud Provider Setup (Wizard Step 1)
2. Open **Packages → VM Autoscale → Add Package**
3. Set **Cloud Provider** **CloudStack (Nimbo)**, **Cloud Provider Setup** `CloudStack-01`, **Package Name** `VM Autoscale`, **Zone** `SC-SIM-ZONE-1`
4. Leave billing prices at `0` (or empty) if the engine is free
5. Set **Status** to **Active** and **Save**

Customers create autoscale groups in the customer portal; scaled VMs still use [VM packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine).

---

## Validation checklist

Before marking a VM Autoscale package **Active**, verify:

* [ ] **VM Autoscale** is enabled in Cloud Provider Setup (Wizard Step 1)
* [ ] Zone is mapped and **Active**
* [ ] Engine pricing is intentional — `0` / empty if free, or priced if you bill for the engine
* [ ] Related [VM](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine), [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer), and [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address) packages exist for resources the group will use
* [ ] Template / snapshot workflow is ready if customers must create templates for autoscale — see [Template](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [ ] [Global quotas](/quota/global-quotas) allow sufficient **VM Autoscale** count per account

---

## Related

* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Load Balancer](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [Template](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [Autoscaling features](/orchestrator-features/cloudstack/autoscaling/)
* [Create autoscaling at CMP](/orchestrator-features/cloudstack/autoscaling/create-at-cmp)
* [CloudStack considerations](/orchestrator-features/cloudstack/autoscaling/cloudstack-considerations)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Pricing Formulas](/billing/rate-cards/pricing-formulas)
