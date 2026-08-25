---
sidebar_position: 3
title: "Buckets & Objects"
tags: ["orchestrator", "impossible-cloud", "features", "object-storage", "s3", "buckets"]
---

# Buckets & Objects

After an [object storage service](/orchestrator-features/impossible-cloud/object-storage) is active, customers create **buckets** and manage **objects (files)** through CMP and S3-compatible APIs.

**Customer path:** **Storage → Object Storage** → open a service → **Buckets**

Maximum **100 buckets** per object storage service — fixed Impossible Cloud limit.

:::info[Not available vs CEPH]

Impossible Cloud buckets do **not** support bucket policies, bucket ACLs, bucket public access, or object public access in CMP. See [Feature comparison](/orchestrator-features/impossible-cloud/#feature-comparison-vs-ceph).

:::

---

## Create bucket

1. Open the object storage service
2. Under **Buckets**, click **+ Create Bucket**
3. Complete the form and click **Create**

![Screenshot: CMP — Create Bucket with versioning and Object Lock](/img/screenshots/impossible-cloud/cmp-impossible-cloud-create-bucket.png)

### Create Bucket form

**Bucket Name**

*Required.* Unique bucket name.

**Bucket Versioning**

*Optional.* Toggle **ON** to keep multiple object versions.

When enabled, you can retrieve and restore previous versions. Additional versions increase storage usage and cost.

**Object Locking (Versioning must be enabled)**

*Optional at create time only.*

:::warning[Permanent at create time]

**Object Lock** is set on bucket creation and **cannot be changed** afterward. This follows AWS S3 behaviour — Object Lock cannot be removed once enabled.

:::

With Object Lock, objects use a **write-once-read-many (WORM)** model to prevent deletion or overwrite for a fixed period. Versioning must be enabled before Object Lock.

**Bucket Retention**

Configure default retention when Object Lock is enabled:

| Mode | Behaviour |
|---|---|
| **Compliance** | Cannot switch back to Governance. Retention days/years are editable for **future uploads**. Objects cannot be deleted until retention expires. |
| **Governance** | Can be upgraded to Compliance. Retention days/years are editable. |

Set **Validity** (days or years) for the default retention period.

![Screenshot: Create Bucket — Bucket Settings with Compliance retention](/img/screenshots/impossible-cloud/cmp-impossible-cloud-create-bucket-retention.png)

In **Compliance** mode, the form explains that protected object versions cannot be overwritten, deleted, or have their retention period shortened by the user.

---

## Retention behaviour

### Bucket default retention

| Scenario | Behaviour |
|---|---|
| Bucket set to **Compliance**, 2 years | All **new** objects locked for 2 years; cannot be deleted until expiry |
| Later changed to **Compliance**, 3 years | **Existing** objects keep original 2-year retention; **new uploads** get 3 years |
| Bucket set to **Governance**, 2 years | Objects locked 2 years; marked deletable per governance rules; bucket not deleted until retention expires |

Updating bucket retention does **not** modify existing objects — only **newly uploaded** objects receive updated settings.

### Object retention

Objects inherit the bucket's **default retention policy at upload time**.

Supported object-level operations (when Object Lock is enabled):

| Operation | Compliance mode | Governance mode |
|---|---|---|
| View retention details | ✅ | ✅ |
| Update retention date | ❌ | ✅ |
| Apply Compliance / Governance | Per lock rules | ✅ |
| Legal hold | Per product rules | Per product rules |

**Compliance mode:** retention date cannot be edited or shortened; object cannot be deleted until expiry.

**Governance mode:** retention date is editable; can upgrade to Compliance.

:::info[CMP limitation — in progress]

**Impossible Cloud** supports **deleting** retention-marked objects and **restoring** them at the provider level. **CMP does not expose this yet** — it is **in progress** and planned for an **upcoming release**. Until then, customers can use supported CMP actions only (for example delete when lock rules allow, or provider-side tools outside CMP where permitted).

:::

---

## Supported bucket updates

After creation, supported bucket operations include:

* **Bucket update** — configuration changes allowed by lock state
* **Versioning management** — enable if not yet on (cannot disable while Object Lock is enabled)
* **Retention policy update** — subject to Compliance / Governance restrictions

Object Lock **cannot** be disabled after create.

---

## Bucket overview

Open a bucket to view objects and actions.

**Customer path:** **Storage → Object Storage** → open a service → open a bucket

![Screenshot: Bucket Overview with uploaded file, usage, and folder tree](/img/screenshots/impossible-cloud/cmp-impossible-cloud-bucket-overview-files.png)

Typical summary (values synced at CMP level):

| Field | Description |
|---|---|
| **Total Files** | Object count — for example, `1` |
| **Usage** | Storage consumed — for example, `271.71 KiB` |
| **Created at** | Bucket creation timestamp |

The file browser shows folders under **Home**, with **Upload** and **Create Folder** in the toolbar. Use the row menu (⋯) for per-file actions such as download or delete.

When the bucket is empty, CMP prompts you to create folders or upload files.

:::info[No public access or policies]

Bucket **Share**, **bucket policy**, and **ACL** features available on CEPH are **not** available for Impossible Cloud in CMP.

:::

---

## Object (file) operations

| Operation | Description |
|---|---|
| **Upload files** | Upload objects via drag-and-drop or browse; large files use **multipart upload** |
| **New Folder** | Create a prefix / folder in the bucket |
| **Download files** | Download to client |
| **Delete files** | Remove objects (subject to Object Lock / retention — see [CMP retention limits](#cmp-retention-delete-and-restore-in-progress)) |
| **Delete folder** | Remove folder prefix and contents (subject to lock rules) |
| **Signed URL** | Time-limited URL for download or upload |
| **Object retention** | View or update per-object retention when Object Lock is enabled |

### Upload files

1. Open the bucket
2. Click **Upload** in the toolbar
3. Drag and drop files or **Browse**, then click **Upload Files**

![Screenshot: Upload Files modal with drag-and-drop and CLI recommendation](/img/screenshots/impossible-cloud/cmp-impossible-cloud-upload-files.png)

:::tip[Large uploads]

CMP recommends **CLI** or **S3-compatible tools** (for example Cyberduck or AWS CLI configured for your S3 endpoint) when uploading many objects. Do not reload or close the browser tab during an in-progress upload.

:::

### Create folder

1. Open the bucket
2. Click **Create Folder** (or the folder icon in the toolbar)
3. Enter **Folder Name** and click **Create**

![Screenshot: Create Folder modal](/img/screenshots/impossible-cloud/cmp-impossible-cloud-create-folder.png)

### Object retention (when enabled)

* View object retention details
* Update retention date — **Governance mode only**
* Apply Governance or Compliance mode per object rules
* Manage legal hold where supported

### CMP retention delete and restore (in progress)

Impossible Cloud can **delete** objects that are under retention and **restore** them again at the provider. **CMP does not offer this workflow yet** — planned for an **upcoming release**. Do not document or promise this to customers until the release ships.

---

## Bucket emptying

Impossible Cloud does **not** expose a bucket emptying API. To clear a bucket programmatically:

1. List objects via S3 API
2. Delete each object with **Delete Object** or **Delete Objects**

Full bucket emptying through a single API call is available only in the **Impossible Cloud UI**, not through CMP or S3 empty-bucket APIs.

---

## Related

* [Object Storage](/orchestrator-features/impossible-cloud/object-storage)
* [Object Storage Packages](/orchestrators/impossible-cloud/packages)
* [Connecting CMP to Impossible Cloud](/orchestrators/impossible-cloud/connecting)
* [Impossible Cloud Features](/orchestrator-features/impossible-cloud/)
