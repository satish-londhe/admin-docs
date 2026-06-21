---
sidebar_position: 3
title: "Virtual Machine"
tags: ["orchestrator", "cloudstack", "packages", "virtual-machine"]
---

# Virtual Machine Packages

Virtual Machine (VM) packages define the **compute bundles** (vCPU and RAM) that customers select when provisioning instances. Each predefined package in CMP maps to one **CloudStack compute offering** through the **Select Offering** field.

Storage is configured separately — root disk size and pricing use [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes) packages when the override disk option is enabled (recommended).

**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → Virtual Machine**

:::info[Before you begin]

Ensure the following are already configured:

* [Cloud Provider Setup](/orchestrators/cloudstack/connecting) is connected, with **Enable Override Disk Offering** set to **Yes** (recommended)
* [Zones](/orchestrators/cloudstack/zones) are mapped in CMP for each datacenter region
* [Templates](/orchestrators/cloudstack/templates/configuring-templates-at-cmp) are configured for the zones where packages will be sold
* Compute offerings exist in CloudStack for each package size you plan to sell

:::

## CloudStack compute offering requirements

CMP provisions predefined VM packages using **fixed** CloudStack compute offerings. The offering selected in CMP (**Select Offering**) must match the vCPU and RAM defined on the package.

For background on compute offering types, see the [Apache CloudStack compute offering guide](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/service_offerings.html).

### Use compute-only offerings (no storage in the offering)

CMP is designed to bill **compute and storage separately**. Create compute offerings **without root disk storage bundled inside the offering**.

In CloudStack, enable **Compute only Disk Offering** when creating the compute offering, or associate a compute-only disk offering that records disk metadata without fixing root disk size for billing in CMP.

On the CMP side, set **Enable Override Disk Offering** to **Yes** in **Cloud Provider Setup → Provider Config** (Wizard Step 2). This allows customers to choose root disk size at provisioning time and routes storage billing through volume packages.

:::warning[One-time decision]

Whether storage is bundled in the compute offering is a **one-time infrastructure decision**. Bundling storage in CloudStack compute offerings prevents separate storage billing, VM downgrade support, and stoppable-service CPU/RAM pause behaviour in CMP. Use compute-only offerings before going to production.

:::

### Fixed offerings for predefined packages

Create one **fixed** compute offering in CloudStack for each predefined package tier you sell — for example, `2vCore-2GB Memory` for a 2 vCPU / 2 GB RAM package.

| CloudStack setting | CMP requirement |
|---|---|
| **Compute Offering Type** | **Fixed offering** — CPU and RAM are predefined |
| **# of CPU cores** | Must match **vCore CPU** on the CMP package |
| **Memory (in MB)** | Must match **Memory (In MB)** on the CMP package |
| **CPU (in MHz)** | Set to a valid speed for your hypervisor hosts (for example, `2000` MHz). Must align with **Custom Compute CPU Speed** in Cloud Provider Setup when using custom packages |
| **Root disk / storage** | **Not included** in the offering — use compute-only configuration |
| **Public** | **Yes** — offering must be visible to the DomainAdmin account CMP uses |
| **Zone** | Available in the same zone mapped in CMP |

Example: for package `2vCore-2GB Memory`, create a CloudStack offering named `2vCore-2GB Memory` with **2** CPU cores and **2048** MB RAM, scoped to the target zone.

### Custom unconstrained offering (custom packages)

Predefined VM packages use **fixed** offerings. **Custom packages** (where customers enter their own CPU/RAM) require a separate **custom unconstrained** compute offering in CloudStack. Configure that offering once and map unit pricing in CMP — see [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing).

### Offering scope and visibility

* Scope each offering to the **correct zone(s)** — offerings not available in a zone cannot be used for packages in that zone
* Mark offerings **Public** (or assign them to the CMP DomainAdmin domain) so they appear in the **Select Offering** dropdown
* CloudStack does not allow material changes to an offering after creation — plan CPU/RAM values before creating production offerings

### Creating a compute offering in CloudStack

1. Log in to the CloudStack UI with admin privileges
2. Navigate to **Service Offerings → Compute Offering**
3. Click **Add Compute Offering**
4. Set **Compute Offering Type** to **Fixed offering**
5. Enter **Name**, **# of CPU cores**, **CPU (in MHz)**, and **Memory (in MB)** matching the CMP package
6. Enable **Compute only Disk Offering** (or equivalent compute-only configuration) — do **not** bundle fixed root disk size for CMP billing
7. Set **Public** to **Yes** and select the target **Zone(s)**
8. Click **Add**

Repeat for each predefined package size. Offering names should be clear — CMP admins select them from the **Select Offering** dropdown when creating packages.

## Configure VM packages in CMP

After compute offerings exist in CloudStack, create a matching VM package in CMP for each **Cloud Provider + Setup + Zone + Storage Category** combination.

**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → Virtual Machine → Add Package**

Each field below matches the **Edit VM Package** form.

### Package Name

**Required.** Internal and display name for the package — for example, `2vCore-2GB Memory`. Use a label customers will recognize on the Create Instance page.

### Cloud Provider

**Required.** Select the orchestrator type — for example, **CloudStack (Nimbo)**.

### Cloud Provider Setup

**Required.** Select the CloudStack instance this package belongs to — for example, `CloudStack-01`. The **Select Offering** dropdown lists compute offerings available on this setup.

### Zone

**Required.** Select the CMP zone where this package is sold — for example, `SC-SIM-ZONE-1`. The package appears on the Create Instance page only for this zone.

Packages are unique per **Cloud Provider + Setup + Zone + Storage Category**. Create a separate package entry for each zone even when the CloudStack offering name is the same.

### Compute Category

Optional when compute categories are disabled. **Required in practice** when compute categories are enabled in CMP.

Assign a compute category (for example, `NFC`) that matches the [templates](/orchestrators/cloudstack/templates/configuring-templates-at-cmp) and offerings you expose in that zone. Packages **without** a compute category do **not** appear on the Create Instance page when compute categories are enabled.

Apply compute categories **consistently** across related templates, offerings, and packages in the same zone.

### Select Offering

**Required.** Select the CloudStack **compute offering** that CMP uses when provisioning this package — for example, `2vCore-2GB Memory`.

This field maps the CMP package to the orchestrator. The offering must:

* Exist in CloudStack for the selected zone
* Be a **fixed** offering with matching CPU and RAM
* Be compute-only (no bundled root disk) when override disk is enabled

The vCPU and RAM fields on the CMP form must match the selected offering. A mismatch causes provisioning failures or incorrect resource allocation.

### Select OS Family

**Required.** Choose which operating system families this package supports — for example, **All**, or a specific family such as **Linux** or **Windows**. Customers see this package only when provisioning templates from the selected OS family.

### vCore CPU (in Numbers)

**Required.** Number of vCPU cores for this package — for example, `2`. Must match the **# of CPU cores** on the linked CloudStack compute offering.

### Memory (In MB)

**Required.** RAM in megabytes — for example, `2048` for 2 GB. Must match **Memory (in MB)** on the linked CloudStack compute offering.

### Status

**Required.** Controls package visibility.

| Status | Behaviour |
|---|---|
| **Active** | Package appears on the Create Instance page (subject to compute/plan category rules) |
| **Inactive** | Package is hidden from customers — use while configuring pricing or testing |

### Tag

Optional. Assign a tag such as **Free Trial** for filtering or promotional labelling in the customer portal.

### Choose Plan Category

Optional when plan categories are disabled. **Required in practice** when plan categories are enabled.

Select a plan category (for example, **General Compute**) to group packages in the customer portal. Packages **without** a plan category do **not** appear on the Create Instance page when plan categories are enabled.

### Enable Free Trial

Optional. When enabled, customers can provision VMs from this package under a free-trial policy without immediate billing for the trial period.

### No. of Days for Free Trial

**Required when Enable Free Trial is on.** Number of calendar days the free trial runs — for example, `7` or `14`.

### Number of VMs per account

**Required.** Maximum number of VMs a single customer account can create from this package — for example, `1` for a one-time trial package or a higher limit for standard plans.

### Billing cycle and pricing

**Required.** Set the price for each billing cycle and currency CMP supports.

CMP displays a pricing grid per currency. Enter values for the cycles you offer — typically **Hourly**, **Monthly**, **Quarterly**, **Yearly**, and **Tri-Annually**.

| Column | Notes |
|---|---|
| **Currency** | CMP supports multiple currencies (for example, **USD** and **INR**) on the same package |
| **Hourly** | Often derived from monthly — see [Pricing Formulas](/packages/pricing-formulas) |
| **Monthly** | Recommended base price to define first |
| **Quarterly / Yearly / Tri-Annually** | Set directly or derive from your pricing policy |

If a billing cycle does not apply to your service, set its value to **0**.

Example (USD and INR rows):

| Currency | Hourly | Monthly | Quarterly | Yearly | Tri-Annually |
|---|---|---|---|---|---|
| USD | 1.87671233 | 628.2 | 1825 | 3533.8 | 0 |
| INR | 1.87671233 | 628.2 | 1825 | 3533.8 | 0 |

:::tip[Pricing guidance]

Define the **monthly** price first, then derive hourly using `Monthly ÷ (30.5 × 24)`. See [Pricing Formulas](/packages/pricing-formulas) for all conversion formulas.

Custom package unit pricing must be **equal to or higher than** predefined packages for equivalent resources — see [Custom Packages](/packages/custom-packages).

:::

## End-to-end mapping example

**Goal:** Sell a 2 vCPU / 2 GB RAM plan in zone `SC-SIM-ZONE-1`.

**CloudStack**

1. Create fixed compute offering `2vCore-2GB Memory` — 2 cores, 2048 MB RAM, compute-only, public, zone `SC-SIM-ZONE-1`

**CMP**

1. Open **Settings → Billing Setup → Rate Cards → Default → Packages → Virtual Machine**
2. Create package `2vCore-2GB Memory`
3. Set **Cloud Provider Setup** `CloudStack-01`, **Zone** `SC-SIM-ZONE-1`
4. **Select Offering** → `2vCore-2GB Memory`
5. Set **vCore CPU** `2`, **Memory** `2048`, **Select OS Family** `All`
6. Assign **Compute Category** and **Plan Category** if enabled
7. Enter pricing for USD and INR across billing cycles
8. Set **Status** to **Active** and save

Customers selecting this package on Create Instance provision using the mapped CloudStack offering. Root disk size and storage charges are handled separately through volume packages when override disk is enabled.

## Validation checklist

Before marking a VM package **Active**, verify:

* CloudStack compute offering exists with matching CPU, RAM, zone, and public visibility
* Offering is compute-only and **Enable Override Disk Offering** is **Yes** in Cloud Provider Setup
* **Select Offering** maps to the correct CloudStack offering
* **vCore CPU** and **Memory (In MB)** match the offering
* **Compute Category** and **Plan Category** are set if those features are enabled
* Pricing is configured for each supported currency and billing cycle
* [Templates](/orchestrators/cloudstack/templates/configuring-templates-at-cmp) and [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes) packages exist for the same zone

## Related

* [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Pricing Formulas](/packages/pricing-formulas)
* [Apache CloudStack — Compute Offerings](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/service_offerings.html)
