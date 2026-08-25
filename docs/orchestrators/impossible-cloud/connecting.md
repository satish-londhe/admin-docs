---
sidebar_position: 2
title: "Connecting CMP to Impossible Cloud"
tags: ["orchestrator", "impossible-cloud", "object-storage", "s3", "setup", "configuration"]
---

# Connecting CMP to Impossible Cloud

Connect CMP to **Impossible Cloud** for **object storage** — Partner API credentials, ICMC (V1) endpoint, S3 region mapping, storage settings, and rate cards.

:::warning[Standalone object storage]

Impossible Cloud is independent of compute orchestrators. You can run it alongside CloudStack, VMware, or others so customers provision object storage through CMP.

:::

:::info[Prerequisites]

- [Impossible Cloud Requirements](/installation/orchestrator-requirements/impossible-cloud) complete — Partner API key, Beta API URL, S3 regions
- CMP VM can reach the Partner API and S3 endpoints
- You are logged in to CMP as Super Admin

:::

---

## Overview

CMP connects to Impossible Cloud in two layers:

```
Create object storage (CMP)
        │
        ▼
CMP  ──── Partner Beta API (Bearer token) ────▶  Impossible Cloud
        │                                     creates storage account (IAM user)
        │                                     + S3 access/secret keys
        ▼
After creation — buckets, objects, retention
CMP / end user  ──── S3 Endpoint ────▶  Impossible Cloud S3
```

| In CMP | On Impossible Cloud |
|---|---|
| Create **Object Storage** | Create a **storage account** (partner-managed IAM user) |
| Multiple object storages per customer | Multiple storage accounts |
| Selected **package** | Storage capacity and billing from rate card |

:::important[Package selection is compulsory]

When a customer creates object storage, they **must** select a package. Storage capacity and plan parameters come from the [Object Storage package](/orchestrators/impossible-cloud/packages).

:::

Storage accounts are **API-only** — customer login to the Impossible Cloud storage console is **not** supported through the current Partner API integration. Customers use CMP and S3 credentials for operations.

---

## Admin setup overview

| Step | Task | Documentation |
|---|---|---|
| **1** | **Cloud Services** — enable Object Storage | [Step 1 — Cloud Services](#step-1--cloud-services) |
| **2** | **Provider Setup** — Beta API endpoint and Bearer token | [Wizard Step 1 — Provider Setup](#wizard-step-1--provider-setup) |
| **3** | **Provider Config** — ICMC V1 endpoint and GB multiplier | [Wizard Step 2 — Provider Config](#wizard-step-2--provider-config) |
| **4** | **Zone** — map S3 region and S3 URI | [Wizard Step 3 — Zone](#wizard-step-3--zone) |
| **5** | **Storage settings** — storage categories for packages | [Wizard Step 4 — Storage Setting](#wizard-step-4--storage-setting) |
| **6** | **Rate card plans** — storage pricing | [Rate card configuration](#rate-card-configuration) |

**CMP path:** **Settings → Orchestrator → Cloud Provider Setup** → **Add Cloud Provider**

---

## Step 1 — Cloud Services

**Path:** **Settings → Orchestrator → Cloud Services**

Enable **Object Storage** for the Impossible Cloud provider. This must align with **Object Storage** selected in [Provider Setup](#wizard-step-1--provider-setup).

---

## Cloud Provider wizard

The wizard has five steps:

1. Provider Setup
2. Provider Config
3. Zone
4. Storage Setting
5. Success

---

## Wizard Step 1 — Provider Setup

Partner API connection for account creation and management.

![Screenshot: CMP — Step 1 Provider Setup with Impossible Cloud and Object Storage](/img/screenshots/impossible-cloud/cmp-impossible-cloud-step1-provider-setup.png)

**Cloud Provider**

*Required.* Select **Impossible Cloud(impossiblecloud)**.

**Setup Name**

*Required.* Display name for this connection — for example, `Impossible Cloud`.

**Timezone**

*Required.* Must match the provider timezone — for example, **UTC**. If timezones do not match, VM monitoring data may not display correctly when compute providers share the same CMP instance.

**API Endpoint**

*Required.* Impossible Cloud **Beta** Partner API URL — for example:

```text
https://api.partner.impossiblecloud.com/beta
```

CMP VM must reach this endpoint. Use **Check Connection** before continuing.

**API Key (Bearer Token)**

*Required.* Paste the Partner API key from the Impossible Cloud Partner Portal. Authentication uses **Bearer token** format. The key is shown only once at generation — store it securely.

**Cloud Provider Services**

*Required.* Select **Object Storage** only.

**Status**

*Required.* **Active** to enable provisioning, or **Inactive** while configuring dependent settings.

Click **Submit & Continue**.

---

## Wizard Step 2 — Provider Config

Additional configuration including the **V1 (ICMC) API** endpoint used for account-management APIs.

![Screenshot: CMP — Step 2 Provider Config with ICMC API Endpoint](/img/screenshots/impossible-cloud/cmp-impossible-cloud-step2-provider-config.png)

**One GB Multiplier (Gigabyte Definition)**

*Required.* How CMP defines 1 GB — typically **1024** (binary) or **1000** (decimal). Match your billing policy.

**ICMC API Endpoint**

*Required.* Impossible Cloud **V1** API base URL — for example:

```text
https://api.partner.impossiblecloud.com/v1
```

Some account lifecycle operations reference this endpoint while the Beta API handles primary integration. The Beta API may not yet expose every operation (for example, full storage account deletion).


Click **Submit & Continue**.

---

## Wizard Step 3 — Zone

Map each Impossible Cloud **S3 region** to a CMP zone.

![Screenshot: CMP — Step 3 Zone with EU Central region and S3 URI](/img/screenshots/impossible-cloud/cmp-impossible-cloud-step3-zone.png)

1. Add or edit a zone row for this provider setup
2. Set **Region** to the Impossible Cloud region code — for example, `eu-central-2`
3. Set **Name** — for example, `EU Central`
4. Set **S3 URI** — regional S3 endpoint — for example, `https://eu-central-2.storage.impossibleapi.net`
5. Set **Country**, **Status**, and optional icon
6. Continue when at least one zone is **Active**

| Field | Example |
|---|---|
| **Region** | `eu-central-2` |
| **Name** | `EU Central` |
| **S3 URI** | `https://eu-central-2.storage.impossibleapi.net` |

---

## Wizard Step 4 — Storage Setting

Complete this wizard step so CMP can **label and package** object storage plans. Storage settings are required in the Cloud Provider workflow even though Impossible Cloud does not use them at the provider level.

:::danger[Not implemented on Impossible Cloud]

**Storage settings are not supported or implemented with Impossible Cloud.** They exist in CMP for **management and representation only** — for example, display names and **Storage Category** on rate-card packages. They do **not** configure placement targets, storage classes, or tiers on the Impossible Cloud side.

:::

![Screenshot: CMP — Step 4 Storage Setting for Impossible Cloud](/img/screenshots/impossible-cloud/cmp-impossible-cloud-step4-storage-setting.png)

1. Add or edit a storage setting
2. Set **Display Name** — for example, `SSD`
3. Select **Cloud Provider**, **Setup**, and **Zone**
4. Set **Storage Category** — for example, `SSD Storage`
5. Set **Status** to **Active**

Use at least one **Active** storage setting per zone so [Object Storage packages](/orchestrators/impossible-cloud/packages) can reference a **Storage Category**.

---

## Wizard Step 5 — Success

![Screenshot: CMP — Provider Setup Configuration Complete](/img/screenshots/impossible-cloud/cmp-impossible-cloud-step5-success.png)

Confirm setup completed, then create [Object Storage packages](/orchestrators/impossible-cloud/packages).

---

## Rate card configuration

Configure **Object Storage** packages under:

**Settings → Billing Setup → Rate Cards → Default → Packages → Object Storage**

| Area | Configured in packages |
|---|---|
| **Storage pricing** | Hourly, monthly, and other cycles per currency |
| **Plan allocation** | **Storage (In GB)** — maximum capacity per object storage service |
| **Billing mapping** | Rate card → package → customer object storage |
| **Zone** | S3 region / location where the plan is sold |
| **Storage category** | CMP label from Storage Settings — for example, SSD Storage (representation only; not sent to Impossible Cloud) |

:::info[Bucket limit]

Impossible Cloud enforces a **fixed maximum of 100 buckets** per object storage service at the provider level. This limit **cannot** be increased or decreased. Unlike CEPH packages, there is no per-package **Bucket Limit** field — the provider cap applies automatically.

:::

👉 [Object Storage Packages](/orchestrators/impossible-cloud/packages)

---

## Related

* [Object Storage Packages](/orchestrators/impossible-cloud/packages)
* [Impossible Cloud Requirements](/installation/orchestrator-requirements/impossible-cloud)
* [Impossible Cloud Features](/orchestrator-features/impossible-cloud/)
* [Impossible Cloud Setup](/orchestrators/impossible-cloud/)
