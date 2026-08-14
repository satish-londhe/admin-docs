---
sidebar_position: 6
title: "Unit Pricing"
tags: ["orchestrator", "proxmox", "packages", "pricing", "custom-packages", "unit-pricing"]
---

# Unit Pricing (Proxmox)

Unit Pricing defines the **per-unit monthly rates** CMP uses when customers provision Proxmox resources through **custom packages** — they enter vCPU, memory, storage (and IP where applicable) instead of selecting a predefined package tier.

CMP takes unit prices for **vCPU**, **memory**, **storage**, and **IP address** per month, then derives hourly and other billing cycles from those values. Create one Unit Pricing row per **Cloud Provider Setup + Zone + Storage Category**.

:::warning[Critical — custom pricing must not undercut predefined packages]

When setting unit prices, ensure that a custom configuration costs **equal to or greater than** the equivalent predefined package.

**Example:** A predefined package with **2 vCPU + 2 GB RAM** costs **$10/month**. If a customer enters **2 vCPU + 2 GB** in custom package fields, the unit-pricing calculation must total **≥ $10/month** — otherwise customers will always choose custom over predefined.

Apply the same rule for storage — custom storage unit pricing must be **≥** predefined [Volumes](/orchestrators/proxmox/offering-sync-and-packages/volumes) packages for equivalent sizes.

:::

:::info[Before you begin]

* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting) complete, including [Storage Setting](/orchestrators/proxmox/connecting#wizard-step-5--storage-setting) for each storage category you sell
* [Predefined VM packages](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine) and [Volumes packages](/orchestrators/proxmox/offering-sync-and-packages/volumes) configured for price comparison
* Prefer **Enable Override Disk Offering** = **Yes** so custom root disk size is priced via storage units / Volumes rather than buried in a fixed VM package
* [IP Address package](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages) configured if you charge IPs (unit price for IP should align with that package)

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → Unit Pricing**

Unlike CloudStack, Proxmox does **not** use Custom Compute / Disk Offering IDs. CMP applies the sizes the customer enters when provisioning on the selected node ([Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm)).

---

## How unit pricing works

```
Custom monthly price = (vCPU × 1 Core vCPU per Month)
                     + (RAM GB × 1 GB Memory per Month)
                     + (Storage GB × 1 GB Storage per Month)
                     + (IP count × 1 IP Address per Month)   [if applicable]
```

CMP derives **hourly** and other billing cycle amounts from the monthly unit prices using standard [pricing formulas](/billing/rate-cards/pricing-formulas).

| Component | Unit price field | Used when |
|---|---|---|
| **vCPU** | 1 Core vCPU per Month | Customer enters custom CPU count |
| **Memory** | 1 GB Memory per Month | Customer enters custom RAM in GB |
| **Storage** | 1 GB Storage per Month | Customer enters custom root or data disk size for this **Storage Category** |
| **IP Address** | 1 IP Address per Month | Custom package includes a public / billable IP charge |

:::info[Predefined vs custom]

| Mode | Customer experience | Pricing source |
|---|---|---|
| **Predefined package** | Selects a fixed tier — for example, 2 vCPU / 2 GB RAM | [Virtual Machine](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine) or [Volumes](/orchestrators/proxmox/offering-sync-and-packages/volumes) package price |
| **Custom package** | Enters own vCPU, RAM, storage values | **Unit Pricing** rates for the zone and storage category |

:::

---

## Configure Unit Pricing in CMP

Create unit pricing for each **Cloud Provider + Setup + Zone + Storage Category** combination where custom packages are offered.

1. Open **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → Unit Pricing**
2. Complete each field below
3. Set **Status** to **Active** and **Submit**

![Screenshot: CMP — Unit Pricing configuration form for Proxmox](/img/screenshots/proxmox-cmp-unit-pricing-form.png)

**Cloud Provider**

*Required.* Select **Proxmox**.

**Cloud Provider Setup**

*Required.* Select the Proxmox Provider Setup this pricing belongs to.

**Zone**

*Required.* Select the CMP zone where these unit prices apply.

**Storage Category**

*Required.* Select the storage tier — for example **SSD Storage**.

Must match a [Storage Setting](/orchestrators/proxmox/connecting#wizard-step-5--storage-setting) category for this setup. Unit pricing is scoped per **zone + storage category** because custom storage charges depend on the storage tier.

**Status**

*Required.* Controls whether unit pricing is active for custom package calculations.

| Status | Behaviour |
|---|---|
| **Active** | Custom package pricing uses these unit rates in this zone and storage category |
| **Inactive** | Hidden — use while configuring or testing |

**Billing cycle and pricing**

*Required.* Enter the monthly unit price for each resource type and currency CMP supports.

| Column | Description |
|---|---|
| **1 Core vCPU per Month** | Price per CPU core per month |
| **1 GB Memory per Month** | Price per GB of RAM per month |
| **1 GB Storage per Month** | Price per GB of disk storage per month (for the selected Storage Category) |
| **1 IP Address per Month** | Price per IP address per month |

Enter values for each currency row — for example **USD** and **INR**. CMP derives hourly rates from the monthly unit prices.

:::tip[Verify against predefined packages]

After entering unit prices, calculate a few sample custom configurations and compare them to your predefined [VM](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine) and [Volumes](/orchestrators/proxmox/offering-sync-and-packages/volumes) packages. See [Pricing check example](#pricing-check-example) below.

:::

:::note[IP unit price vs IP Address package]

Keep **1 IP Address per Month** aligned with your [IP Address package](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages) for the same setup and zone so custom and predefined / network IP charges stay consistent. Per-network billing flags still control **when** IP subscriptions are created — see [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing).

:::

---

## Pricing check example

**Predefined package:** 2 vCPU + 2 GB RAM = **$10/month**

**Unit pricing you set:**

| Unit | Price/month |
|---|---|
| 1 Core vCPU | $4.00 |
| 1 GB Memory | $2.00 |

**Custom configuration:** Customer enters 2 vCPU + 2 GB RAM

```
Custom total = (2 × $4.00) + (2 × $2.00) = $12.00/month  ✅  ≥ $10 predefined
```

If unit prices were $3/vCPU and $1/GB RAM, the custom total would be **$8/month** — **below** the predefined package. Customers would always choose custom. Adjust unit prices upward until equivalent custom configurations match or exceed predefined pricing.

---

## End-to-end example

**Goal:** Enable custom VM provisioning in a Proxmox zone on **SSD Storage**, with unit pricing that does not undercut a `2vCore-2GB` predefined package at $10/month.

1. Complete [Connecting](/orchestrators/proxmox/connecting) — zone + **SSD Storage** category in Storage Setting
2. Create predefined VM package `2vCore-2GB` at **$10/month** (and Volumes packages if override disk is **Yes**)
3. Open **Packages → Unit Pricing**
4. Set **Cloud Provider** **Proxmox**, **Cloud Provider Setup**, **Zone**, **Storage Category** **SSD Storage**
5. Enter unit prices — for example **1 Core vCPU** `$4.00`, **1 GB Memory** `$2.00`, **1 GB Storage** `$0.10`, **1 IP Address** as needed per month
6. Set **Status** to **Active** and **Submit**
7. Verify: 2 vCPU + 2 GB custom = $12/month ≥ $10 predefined

---

## Customer portal view

When custom packages are enabled, customers see a **Custom** option on **Create Instance** alongside predefined packages. They enter vCPU, RAM, and storage values; CMP displays the calculated price based on unit pricing for the selected zone and storage category.

---

## Validation checklist

Before marking Unit Pricing **Active**, verify:

- [ ] [Storage Setting](/orchestrators/proxmox/connecting#wizard-step-5--storage-setting) exists for the zone’s **Storage Category**
- [ ] Predefined [VM](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine) and [Volumes](/orchestrators/proxmox/offering-sync-and-packages/volumes) packages exist for price comparison
- [ ] Unit prices are set for each supported currency
- [ ] Sample custom configurations total **≥** equivalent predefined package prices
- [ ] **1 IP Address per Month** aligns with the [IP Address package](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages) when you charge IPs
- [ ] **Enable Override Disk Offering** is **Yes** if custom root disk sizing is offered

---

## Related

* [Proxmox Packages](/orchestrators/proxmox/offering-sync-and-packages/)
* [Virtual Machine](/orchestrators/proxmox/offering-sync-and-packages/virtual-machine)
* [Volumes](/orchestrators/proxmox/offering-sync-and-packages/volumes)
* [IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/)
* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting)
* [Pricing Formulas](/billing/rate-cards/pricing-formulas)
* [CloudStack Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing) — same rate-card pattern; CloudStack also needs Custom Offering IDs
