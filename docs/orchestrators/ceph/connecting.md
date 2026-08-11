---
sidebar_position: 2
title: "Connecting CMP to CEPH"
tags: ["orchestrator", "ceph", "object-storage", "s3", "setup", "configuration"]
---

# Connecting CMP to CEPH

This guide walks through connecting CMP to a CEPH cluster for **object storage** — Dashboard API credentials, S3 endpoints, zone mapping, and storage settings.

:::warning[Standalone object storage]

CEPH is independent of compute orchestrators (CloudStack, VMware, and others). You can run it alongside any compute setup so customers can provision buckets, credentials, and object storage plans through CMP.

:::

:::info[Prerequisites]

- CEPH Dashboard API and S3 endpoint are reachable from the CMP VM — see [CEPH Requirements](/installation/orchestrator-requirements/ceph)
- At least one CEPH zone is configured and bound to the S3 endpoint
- You have an **Admin-level** CEPH Dashboard **username and password**
- CMP is installed and you are logged in as Super Admin

:::

---

## Overview

CMP connects to CEPH in two ways. The **Dashboard API** is used only to create object storage (which on CEPH means creating a user). After that, day-to-day bucket and object operations go through the **S3 endpoint**.

```
Create object storage (CMP)
        │
        ▼
CMP  ──── Dashboard API (username / password) ────▶  CEPH Dashboard
        │                                     creates CEPH user
        │                                     (+ S3 access/secret keys)
        ▼
After creation — buckets, objects, usage
CMP / end user  ──── S3 Endpoint ────▶  CEPH RGW
```

### How object storage maps to CEPH

| In CMP | On CEPH |
|---|---|
| Create **Object Storage** | Create a **user** |
| Multiple object storages for one customer | Multiple CEPH users |
| Selected **package** | Capacity, bucket limit, and related plan parameters applied for that user |

:::important[Package selection is compulsory]

When a customer creates object storage, they **must** select a package. Number of buckets, storage capacity, and other plan parameters are set at this level from the [Object Storage package](/orchestrators/ceph/packages).

:::

### After creation — S3 access

After object storage is created:

* CMP talks directly to the **S3 endpoint** for bucket and object operations (not the Dashboard API)
* The end user can take the generated **Access Key** / **Secret Key** and access buckets with **S3 CLI**, an S3 browser, or any S3-compatible SDK

See [Object Storage features](/orchestrator-features/ceph/object-storage) and [Buckets & Objects](/orchestrator-features/ceph/buckets) for the customer flow.

**CMP path:** **Settings → Orchestrator → Cloud Provider Setup** → **Add Cloud Provider** (or open an existing setup → **Configure**)

The wizard has five steps:

1. Provider Setup
2. Provider Config
3. Zone
4. Storage Setting
5. Success

---

## Wizard Step 1 — Provider Setup

This step establishes the CEPH **Dashboard API** connection. CMP uses these credentials **only to create object storage** (create CEPH users). After creation, bucket and object traffic uses the S3 endpoint from Step 2.

![Screenshot: CMP — Step 1 Provider Setup with Ceph and Object Storage selected](/img/screenshots/cmp-ceph-step1-provider-setup.png)

Configure the fields below in the order they appear on the form, then click **Submit & Continue**.

**Cloud Provider**

*Required.* Select **Ceph(ceph)** from the dropdown.

**Setup Name**

*Required.* A unique name for this CEPH connection in CMP — for example, `Ceph`. Used to distinguish multiple setups.

**Monitoring Provider**

*Required.* For CEPH object storage, select **NONE**.

**Timezone**

*Required.* Select the timezone that matches the CEPH environment — for example, **UTC**.

**API Endpoint**

*Required.* CEPH Dashboard API base URL — for example, `https://192.168.11.149:8443/api` or `https://ceph.yourcompany.com:8443/api`.

CMP VM must be able to reach this endpoint over the network. Use **Check Connection** to verify reachability before continuing.

**API Version**

*Required.* CEPH version running on your cluster — for example, `18.2.2`.

**API Key (Username)**

*Required.* CEPH Dashboard **username**. For CEPH, CMP uses username and password only to configure the provider — enter the Admin-level Dashboard username here (not a separate API key).

**API Secret (Password)**

*Required.* CEPH Dashboard **password** paired with the username above.

If the password is configured to expire automatically, you will need to update it in CMP each time it changes to avoid authentication failures.

**Cloud Provider Services**

*Required.* Select **Object Storage**.

Available services may vary depending on the selected cloud provider. Please select the services that are supported and configured in your environment.

**Status**

*Required.* Set to **Active** to enable this provider, or **Inactive** to save configuration without making it live.

Click **Submit & Continue** (or **Skip & Continue** only if you intentionally defer saving this step).

---

## Wizard Step 2 — Provider Config

Configure S3-compatible endpoints and how CMP defines one gigabyte for billing and usage.

After object storage (CEPH user) creation, CMP and end users use these endpoints for all bucket and object access — including S3 CLI and S3 browsers.

![Screenshot: CMP — Step 2 Provider Config with S3 endpoints and One GB Multiplier](/img/screenshots/cmp-ceph-step2-provider-config.png)

**S3 Endpoint**

*Required.* Primary CEPH RGW / S3 endpoint URL — for example, `https://s3.yourcompany.com/` or `http://192.168.11.149/`.

This is the endpoint customers and S3 clients use for bucket and object operations. It should be **publicly accessible** — see [CEPH Requirements](/installation/orchestrator-requirements/ceph#3-s3-endpoint).

**S3 FallBack Endpoint**

*Required.* Secondary or fallback S3 endpoint. Use the same value as the primary endpoint if you do not run a separate fallback URL.

**One GB Multiplier (Gigabyte Definition)**

*Required.* How CMP calculates 1 GB for object storage:

| Value | Meaning |
|---|---|
| **1024** | Binary (1 GB = 1024 MB) — typical default |
| **1000** | Decimal (1 GB = 1000 MB) |

Match this to how your CEPH / billing policy defines a gigabyte. Inconsistency between CMP and CEPH reporting causes usage and invoice mismatches.

Click **Submit & Continue**.

---

## Wizard Step 3 — Zone

Map CEPH regions/zones to CMP zones so object storage is provisioned in the correct location.

![Screenshot: CMP — Step 3 Zone listing for Ceph](/img/screenshots/cmp-ceph-step3-zone.png)

1. Click **+ ADD ZONE**
2. Map the CEPH zone (region) to a CMP zone entry — set **Zone Name**, **Country**, and **Status** as required
3. Ensure at least one zone is **Active**
4. Click **Submit & Next**

:::info[Region mapping]

Zone mapping ensures object storage resources are provisioned in the correct CEPH region when customers request storage through CMP. Configure CEPH zones in the cluster first — see [CEPH setup checkpoints](/installation/orchestrator-requirements/ceph#8-ceph-setup-checkpoints).

:::

You can also manage zones later under **Settings → Orchestrator → Zones**.

---

## Wizard Step 4 — Storage Setting

Define storage categories (tiers) used for object storage packages and customer selection — for example, **SSD Storage**.

:::warning[Storage class support is on the roadmap]

CEPH supports multiple different storages as storage classes (for example, **SSD**, **HDD**, and similar). As of now, CMP does **not** support CEPH storage class selection. That capability is on the roadmap — storage settings are included in this workflow so the setup is ready when class-based storage becomes available.

Until then, configure at least one storage setting so Object Storage packages can be created and sold.

:::

![Screenshot: CMP — Step 4 Storage Setting listing for Ceph](/img/screenshots/cmp-ceph-step4-storage-setting.png)

1. Click **+ ADD STORAGE SETTING**
2. Configure display name, provider setup, zone, storage category, and status
3. Set **Status** to **Active** for tiers you sell
4. Click **Submit & Next**

| Column | Meaning |
|---|---|
| **Display Name** | Label shown in CMP (for example, `SSD Storage`) |
| **Provider** | `Ceph` |
| **Setup** | Your Cloud Provider Setup name |
| **Zone** | Mapped CMP zone (for example, `Default`) |
| **Storage Category** | Logical tier used for packaging |
| **Status** | Active or Inactive |

:::warning[Keep storage settings aligned with services]

When you add, edit, or disable a storage setting, confirm **Object Storage** remains enabled in Provider Setup (Step 1) and that rate-card / package mappings still point at the correct storage category.

:::

You can also manage storage settings later under **Settings → Orchestrator → Storage Settings**.

---

## Wizard Step 5 — Success

Confirm the setup completed successfully. The CEPH provider is ready for rate cards and customer object storage.

---

## Rate card configuration

After the wizard, create **Object Storage** packages. CMP does **not** have separate CEPH quota management — storage capacity and bucket counts are set only on the package (**Storage (In GB)** and **Bucket Limit**).

### Object Storage packages

Configure capacity, bucket limits, zone, storage category, and pricing under **Settings → Billing Setup → Rate Cards → Default → Packages → Object Storage**.

👉 [Object Storage Packages](/orchestrators/ceph/packages)


---

## Related

* [Object Storage Packages](/orchestrators/ceph/packages)
* [CEPH Requirements](/installation/orchestrator-requirements/ceph)
* [CEPH Features](/orchestrator-features/ceph/)
* [Orchestrator Setup — CEPH](/orchestrators/ceph/)
