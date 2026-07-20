---
sidebar_position: 2
title: "Object Storage"
tags: ["orchestrator", "ceph", "features", "object-storage", "s3"]
---

# Object Storage

Customers create and manage **CEPH-backed object storage** services in CMP.

On CEPH, **creating object storage means creating a user**. Each object storage service in CMP maps to one CEPH user with its own S3 credentials. A customer can create **multiple** object storages — CMP creates a separate CEPH user for each.

:::info[Before customers can use this]

* [CEPH Cloud Provider Setup](/orchestrators/ceph/connecting) is complete (including zone and storage settings)
* [Object Storage packages](/orchestrators/ceph/packages) are configured — package selection is compulsory at create time
* The customer account is active and an [Object Storage package](/orchestrators/ceph/packages) is available for their zone

:::

---

## Create Object Storage

End users create object storage from the customer portal.

**Customer path:** **Storage → Object Storage → Create** (or **Create → Object Storage**)

![Screenshot: CMP customer portal — Create Object Storage form](/img/screenshots/cmp-create-object-storage.png)

:::important[What happens on CEPH]

**Object Storage in CMP = a new user on CEPH.**

When the customer completes **Review & Create**, CMP uses the Dashboard API to create a CEPH user for that service and generates S3 credentials. Each additional object storage the customer creates is another CEPH user.

| In CMP | On CEPH |
|---|---|
| Create Object Storage | Create a **new user** |
| Multiple Object Storage services | Multiple CEPH users |

:::

**Package selection is compulsory.** At create time, CMP applies plan parameters from the selected [Object Storage package](/orchestrators/ceph/packages) — including storage capacity, **bucket limit**, zone, and storage category.

### Create Object Storage form (end user)

Complete the fields below in the order shown on the form, then choose a billing cycle and click **Review & Create**.

**Choose Project**

*Required.* Select the project this object storage belongs to — for example, **Default**.

**Select Location**

*Required.* Select the zone / location where object storage is provisioned — for example, **Default India**. Location tabs (for example, **All**, **Asia**) filter available zones.

Only packages configured for the selected zone appear in the size list.

**Select Object Storage size**

*Required.* Select an [Object Storage package](/orchestrators/ceph/packages). The table shows package name, storage type (category), size, and monthly / hourly price.

Example from the form:

| Name | Storage type | Size | Price Monthly | Price Hourly |
|---|---|---|---|---|
| Ceph | SSD Storage | 60.0 GB | $100 / Month | $0.2 / Hour |

Custom size rows (when enabled for your rate card) may also appear for storage categories such as SSD Storage.

**Name**

*Required.* Display name for this object storage service — for example, `os-01`.

**Billing Cycle**

*Required.* Select the billing cycle for this service — for example, **Hourly**. The price summary updates from the selected package and cycle.

Click **Review & Create** to provision.

### Provisioning flow

1. Customer selects project, location, package, name, and billing cycle
2. CMP uses the CEPH **Dashboard API** (admin username / password) to create a **new CEPH user**
3. S3 credentials are generated for that user
4. Capacity, bucket limit, and related parameters from the package are set for the service
5. Service is activated — further bucket and object access uses the **S3 endpoint**

---

## Object Storage Overview

The overview for an active object storage service shows:

| Area | Details |
|---|---|
| **Storage usage** | Consumed storage only |
| **Region details** | Mapped CEPH / CMP zone |
| **S3 access information** | Endpoint and credential references |
| **Buckets list** | Buckets under this service (within the package bucket limit) |

From overview, customers continue to [bucket and object operations](/orchestrator-features/ceph/buckets).

---

## After creation — S3 communication

After object storage is created, CMP does **not** use the Dashboard API for day-to-day bucket and file work. CMP communicates directly with the **S3 endpoint** configured in Provider Config.

End users can also take the Access Key and Secret Key and access the same buckets outside CMP using:

* S3 CLI (for example, AWS CLI configured for a custom endpoint)
* Any S3-compatible browser or desktop client
* S3 SDKs in applications

---

## S3 Object Credentials

CMP generates S3 credentials for bucket and API access when the CEPH user is created. Credentials typically include:

| Item | Use |
|---|---|
| **Access Key** | S3 access key ID |
| **Secret Key** | S3 secret access key |
| **S3 Endpoint** | Primary (and fallback, if configured) RGW URL from Provider Config |
| **Region** | Region string used by S3 clients |

Customers use these credentials with S3-compatible tools and SDKs (AWS CLI, `s3cmd`, S3 browsers, and similar).

:::warning[Protect secret keys]

Treat the Secret Key like a password. Store it securely and update any automation that uses it if the key is exposed.

:::

:::info[Credential rotate / regenerate — roadmap]

**Rotate** or **regenerate** S3 credentials from CMP is on the roadmap and will be available soon. Until then, protect the keys shown at creation and treat a leaked Secret Key as a security incident (contact your administrator / StackConsole as needed).

:::

---

## Resize Storage

Users can resize or upgrade storage plans based on requirements.

Supported actions:

* Increase storage allocation
* Update plan configuration
* Modify billing plan mapping

:::tip[Package limits]

Resize is limited by available [Object Storage packages](/orchestrators/ceph/packages). Capacity and bucket count come from the selected package (**Storage (In GB)** and **Bucket Limit**) — CMP has no separate CEPH quota management.

:::

---

## Limits (package level only)

CMP does **not** provide separate quota management for CEPH (no CEPH-specific global / account quota screens like compute orchestrators).

Storage capacity and number of buckets are set **only on the Object Storage package**:

| Package field | Limit |
|---|---|
| **Storage (In GB)** | Maximum storage for that object storage service |
| **Bucket Limit** | Maximum number of buckets for that object storage service |

Configure these under [Object Storage Packages](/orchestrators/ceph/packages).

---

## Background sync and performance

CMP syncs object storage, bucket, and file usage in the background to keep API responses responsive. Usage shown in the UI may briefly lag real CEPH consumption during large uploads or deletes.

---

## Related

* [Buckets & Objects](/orchestrator-features/ceph/buckets)
* [Connecting CMP to CEPH](/orchestrators/ceph/connecting)
* [Object Storage Packages](/orchestrators/ceph/packages)
* [CEPH Features](/orchestrator-features/ceph/)
