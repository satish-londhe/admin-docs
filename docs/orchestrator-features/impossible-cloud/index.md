---
sidebar_position: 1
title: "Impossible Cloud Features"
tags: ["orchestrator", "impossible-cloud", "features", "object-storage", "s3"]
---

# Impossible Cloud Features

Feature documentation for **Impossible Cloud object storage** in CMP — customer and admin capabilities after the provider is connected.

:::tip[Setup vs features]

Need to connect Impossible Cloud, map zones, or storage settings? Start with [Connecting CMP to Impossible Cloud](/orchestrators/impossible-cloud/connecting).

:::

## Feature list

| Feature | Status | Page |
|---|---|---|
| Object Storage | Ready | [Object Storage](/orchestrator-features/impossible-cloud/object-storage) — create service, overview, S3 credentials, resize |
| Buckets & Objects | Ready | [Buckets & Objects](/orchestrator-features/impossible-cloud/buckets) — versioning, object lock, retention, file operations |
| Delete / restore retention-marked objects | In progress | Impossible Cloud supports this at the provider; **CMP UI coming in an upcoming release** — see [CMP-level limitations](#cmp-level-limitations) |

---

## Feature comparison vs CEPH

Impossible Cloud and CEPH both provide S3-compatible object storage in CMP, but capability differs today.

| Feature | CEPH | Impossible Cloud |
|---|---|---|
| Create object storage + S3 credentials | ✅ | ✅ |
| Buckets, upload, download, delete | ✅ | ✅ |
| Versioning | ✅ | ✅ |
| Object Lock / retention | ✅ | ✅ (cannot disable lock after create) |
| Resize storage plan | ✅ | ✅ |
| Bucket public access | ✅ | ❌ |
| Object public access | ✅ | ❌ |
| Bucket policies | ✅ | ❌ |
| Bucket ACL permissions | ✅ | ❌ |
| Configurable bucket limit per package | ✅ | ❌ (fixed **100** buckets per service) |
| Placement targets / storage classes | Roadmap in CMP | ❌ |
| Provider usage statistics API | ✅ | ❌ (usage at **CMP level**) |
| Bucket metadata APIs (size, count) | ✅ | ❌ (managed at **CMP level**) |
| Storage account console login | N/A (CEPH user model) | ❌ (API-only IAM users) |
| Bucket emptying API | ✅ | ❌ (UI only; delete objects via S3 API) |
| Immediate storage account deletion | Per CEPH policy | ❌ (**30-day** read-only grace period) |
| Delete / restore retention-marked objects in CMP | ✅ | ❌ **In progress** (Impossible Cloud provider supports delete/restore; CMP UI in upcoming release) |

---

## Why use Impossible Cloud despite fewer features?

Impossible Cloud trades **feature depth** for **operational simplicity**. CEPH remains the right choice when you need full control, rich S3 policy features, and configurable limits. Impossible Cloud fits providers who want **managed object storage** without running a storage cluster.

| Area | CEPH | Impossible Cloud | Why Impossible Cloud can still win |
|---|---|---|---|
| **Storage engine** | Powerful distributed storage platform | Managed object storage | You do not operate the storage platform |
| **Deployment** | Deploy and manage a CEPH cluster | Service already provided | Much faster onboarding |
| **CEPH administration** | High | Very low | Less infrastructure expertise required |
| **S3 exposure** | Configure RGW, users, endpoints, policies, and more | Ready-to-use S3 service | CMP can provision S3 directly |
| **HA / infrastructure** | You design and operate it | Provider handles it | Reduced operational responsibility |
| **Upgrades** | Your responsibility | Provider responsibility | Less maintenance |
| **Failure handling** | Your responsibility | Provider responsibility | Lower operational burden |
| **Capacity management** | Manage disks, OSDs, CRUSH, and similar | Service-level capacity | Simpler for CMP |
| **Multi-tenancy** | You design the model | Built into the service | Easier SaaS / service integration |
| **Customer experience** | You expose CEPH capabilities | Standardized storage product | Better for a uniform CMP offering |
| **Feature flexibility** | Very high | Limited | **CEPH wins** |
| **Operational simplicity** | Lower | Higher | **Impossible Cloud wins** |

:::tip[When to choose which]

Choose **CEPH** when you operate your own cluster and need bucket policies, ACLs, public access, flexible bucket limits, and full provider-side metadata. Choose **Impossible Cloud** when you want managed S3 with minimal storage ops — accepting CMP-level usage reporting, a **100-bucket** cap, and the [provider limitations](#provider-limitations) listed above.

:::

---

## CMP-level limitations

These gaps are on the **CMP side** — the Impossible Cloud provider may already support the capability.

### Delete and restore retention-marked objects

On **Impossible Cloud**, objects under retention can be **deleted** and **restored** at the provider level (for example through Impossible Cloud tooling outside CMP).

**CMP does not support this yet.** Customers cannot delete retention-marked files or restore them from the CMP customer portal today.

:::info[In progress]

Delete and restore for retention-marked objects is **in progress** in CMP for Impossible Cloud and is planned for an **upcoming release**. Until then, use Impossible Cloud provider tools where your contract allows, or wait for the CMP release.

:::

See [Retention behaviour](/orchestrator-features/impossible-cloud/buckets#retention-behaviour) for what CMP supports today.

---

## Provider limitations

### Storage accounts

Storage accounts are **partner-managed IAM (API-only) users**. S3 access and secret keys are generated for these users because CMP requires them for bucket and object operations.

**Console login** to the Impossible Cloud storage account is **not supported** through the current Partner API integration.

### Object Lock

Disabling Object Lock after bucket creation is **not supported** (AWS S3 standard behaviour).

### Bucket emptying

No API triggers full bucket emptying — use the Impossible Cloud UI, or delete objects individually via S3 **Delete Object** / **Delete Objects** APIs.

### Account deletion

Deleting a storage account starts a mandatory **30-day grace period** (read-only, no new writes). The grace period cannot be bypassed. The Beta API may not yet expose full deletion APIs — see [Requirements](/installation/orchestrator-requirements/impossible-cloud#8-provider-limitations).

---

## Related setup docs

| Topic | Link |
|---|---|
| Connect Impossible Cloud | [Connecting CMP to Impossible Cloud](/orchestrators/impossible-cloud/connecting) |
| Object Storage packages | [Object Storage Packages](/orchestrators/impossible-cloud/packages) |
| Installation requirements | [Impossible Cloud Requirements](/installation/orchestrator-requirements/impossible-cloud) |

## Related

* [Orchestrator Features](/orchestrator-features/)
* [Impossible Cloud Setup](/orchestrators/impossible-cloud/)
* [CEPH Features](/orchestrator-features/ceph/) — alternative object storage
