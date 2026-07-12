---
sidebar_position: 12
title: "ISO"
tags: ["orchestrator", "cloudstack", "packages", "iso"]
---

# ISO Packages

ISO packages define how CMP bills customers for **customer-owned ISO images** stored in CMP. Customers use ISOs to boot VMs from custom install media instead of a pre-built OS template.

:::warning[ISO service disabled by default]

The **ISO** service is **disabled by default** in CMP. To offer ISO management and billing to customers, contact the **StackConsole team** to enable the feature on your platform before configuring packages or global settings.

:::

:::warning[No free trials]

**Free trials are not applicable to ISO packages.** The **Create ISO Package** form does not include **Enable Free Trial**. ISO storage is billed hourly from the moment an ISO is registered (subject to the [free ISO allowance](#free-iso-allowance) global setting).

:::

:::info[Before you begin]

Ensure the following are already configured:

* ISO service has been **enabled by the StackConsole team** on your CMP instance
* [Cloud Provider Setup](/orchestrators/cloudstack/connecting) is connected, with **ISO** enabled in Wizard Step 1
* [Zones](/orchestrators/cloudstack/zones) are mapped in CMP
* You understand [hourly per-GB billing](#how-iso-billing-works) — ISOs use the same model as [Custom Template](/orchestrators/cloudstack/offering-sync-and-packages/template) and [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot) packages

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → ISO**

## Default behaviour

By default, the ISO service is **not available** to end customers. Most providers enable VM provisioning through [admin OS templates](/orchestrators/cloudstack/templates/configuring-templates-at-cmp) instead.

When enabled, customers can register ISO images in CMP and attach them when provisioning VMs. ISO storage is billed continuously on an **hourly per-GB** basis until the ISO is deleted.

### ISO upload from local (disabled by default)

By default, CMP **does not allow** customers to create ISOs from local image files.

| Setting | Default | Description |
|---|---|---|
| `iso_upload_from_local` | `false` | Enable or disable creating ISO images from a local file upload |

Set `iso_upload_from_local` to `true` in **Admin Panel → Global Settings** only if you want customers to upload ISO files from their local machine.

## How ISO billing works

When a customer registers and retains an ISO image, CMP:

1. Tracks the **ISO size in GB**
2. Applies the **price per GB per hour** from the ISO package for that zone
3. Bills continuously on an **hourly** basis until the ISO is deleted

### Billing formula

```
ISO cost per hour = ISO size (GB) × price per GB per hour
```

**Example:** A 5 GB ISO at `₹1`/GB/hour costs **₹5/hour** for as long as the ISO is stored.

See [Snapshot / Template / ISO pricing](/packages/pricing-formulas#snapshot--template--iso-pricing) for the general formula.

:::info[Mandatory hourly billing]

ISO images always use **hourly billing only** (`ISO` service type). The package form shows **Billing cycle and pricing** with an **Hourly (per GB)** rate — monthly, quarterly, and yearly cycles are not supported. See [Billing Models Overview](/billing/overview#services-with-mandatory-hourly-billing).

:::

### Why only hourly per-GB pricing?

ISO file sizes vary by upload and cannot be sold as predefined fixed-size packages. CMP charges based on **current ISO size × hourly rate per GB**, the same approach used for [Custom Template](/orchestrators/cloudstack/offering-sync-and-packages/template) and [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot) packages.

## Free ISO allowance

CMP supports a configurable number of **free ISO images** through Global Settings.

In **Admin Panel → Global Settings**, locate the `free_iso` setting:

| Value | Behaviour |
|---|---|
| `false` | Free ISOs **disabled** — all ISO images are billed per the ISO package |
| Greater than `0` | That many ISO images are **free** per account — pricing is shown as **0** until the free allowance is used |

Set `free_iso` to `false` to disable free ISOs entirely.

## Global settings summary

| Setting | Default | Description |
|---|---|---|
| `free_iso` | `false` | Number of free ISO images per account. Set to `false` to disable. When greater than `0`, that many ISOs show **$0.00** pricing |
| `iso_upload_from_local` | `false` | Enable or disable creating ISO images from a local file upload |

## Configure ISO packages in CMP

Create an ISO package for each **Cloud Provider + Setup + Zone** where you want to charge for customer ISO storage.

1. Open **Settings → Billing Setup → Rate Cards → Default → Packages → ISO**
2. Click **Add Package** (form title: **Create ISO Package**)
3. Complete each field below in the order shown on the form
4. Set **Status** to **Active** and save

![Screenshot: CMP — Create ISO Package form](/img/screenshots/cmp-iso-package-form.png)

Each field below matches the **Create ISO Package** form.

**Cloud Provider**

*Required.* Select the orchestrator type — for example, **CloudStack (Nimbo)**.

**Cloud Provider Setup**

*Required.* Select the CloudStack instance this package belongs to — for example, `CloudStack-01`.

**Package Name**

*Required.* Display name for the ISO service — for example, `ISO Storage` or `Custom ISO`.

**Zone**

*Required.* Select the CMP zone where this ISO pricing applies — for example, `SC-SIM-ZONE-1`.

**Tag**

*Optional.* Assign a tag for filtering or promotional labelling in the customer portal.

:::warning[Important]

Tags are CMP-level labels used for representation only. They do not map to CloudStack tags.

:::

**Status**

*Required.* Controls package visibility.

| Status | Behaviour |
|---|---|
| **Active** | ISO pricing applies when customers register ISO images in this zone |
| **Inactive** | Hidden — use while configuring pricing or testing |

**Billing cycle and pricing**

*Required.* Enter the **Hourly (per GB)** rate for each currency CMP supports.

CMP multiplies this rate by the customer's ISO size to calculate the hourly charge. Only the hourly per-GB cycle is available.

:::info[Pricing note]

If a price is not applicable for your service, set its value to **0**.

:::

:::info[No free trial field]

The **Create ISO Package** form does not include **Enable Free Trial**. Use the `free_iso` global setting if you want to offer a limited number of free ISO images.

:::

## End-to-end example

**Goal:** Offer ISO storage in zone `SC-SIM-ZONE-1` at `₹1`/GB/hour with 1 free ISO per account.

**Prerequisites**

1. Contact the **StackConsole team** to enable the ISO service on your CMP platform

**CMP global settings**

1. Set `free_iso` to `1` in **Admin Panel → Global Settings**
2. Keep `iso_upload_from_local` as `false` unless local uploads are required

**CloudStack**

1. Enable **ISO** in Cloud Provider Setup (Wizard Step 1)
2. Confirm ISO registration works from the CloudStack UI in the target zone

**CMP package**

1. Open **Packages → ISO → Add Package**
2. Set **Cloud Provider** **CloudStack (Nimbo)**, **Cloud Provider Setup** `CloudStack-01`, **Package Name** `ISO Storage`, **Zone** `SC-SIM-ZONE-1`
3. Enter **Hourly (per GB)** — for example, `₹1.00` INR
4. Set **Status** to **Active** and save

A customer with a 4 GB ISO is charged `4 × 1 = ₹4`/hour after their free ISO allowance is used.

## Customer portal view

When the ISO service is enabled, customers manage ISO images from the **ISO** section in the CMP portal. Registered ISOs can be selected during VM provisioning as boot media.

Pricing is displayed based on ISO size and the zone's per-GB hourly rate. When `free_iso` is greater than `0`, the first N ISOs show **$0.00** pricing until the allowance is consumed.

Local ISO upload is only available when `iso_upload_from_local` is `true`.

![Screenshot: CMP — Customer ISO management](/img/screenshots/cmp-customer-iso.png)

## Validation checklist

Before marking an ISO package **Active**, verify:

* ISO service has been enabled by the **StackConsole team**
* **ISO** service is enabled in Cloud Provider Setup (Wizard Step 1)
* `free_iso` and `iso_upload_from_local` global settings reflect your intended policy
* **Hourly (per GB)** pricing is set for each supported currency
* [Global quotas](/quota/global-quotas) allow sufficient **ISO** count per account

## Related

* [Offering Sync & Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Custom Template](/orchestrators/cloudstack/offering-sync-and-packages/template)
* [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot)
* [Configuring Templates in CMP](/orchestrators/cloudstack/templates/configuring-templates-at-cmp)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Billing Models Overview](/billing/overview)
* [Pricing Formulas](/packages/pricing-formulas)
