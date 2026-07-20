---
sidebar_position: 3
title: "Buckets & Objects"
tags: ["orchestrator", "ceph", "features", "object-storage", "s3", "buckets"]
---

# Buckets & Objects

After an [object storage service](/orchestrator-features/ceph/object-storage) is active, customers create **buckets** and manage **objects (files)** through CMP and S3-compatible APIs.

**Customer path:** **Storage → Object Storage** → open an object storage service → **Buckets**

Bucket and file traffic uses the **S3 endpoint** after the CEPH user is created — see [After creation — S3 communication](/orchestrator-features/ceph/object-storage#after-creation--s3-communication).

---

## Create bucket

1. Open the object storage service
2. Under **Buckets**, click **+ Create Bucket**
3. Complete the form and click **Create**

![Screenshot: CMP — Create Bucket modal](/img/screenshots/cmp-create-bucket.png)

### Create Bucket form

Configure the fields below in the order they appear on the form, then click **Create**.

**Bucket Name**

*Required.* Enter a unique bucket name.

**Bucket Versioning**

*Optional.* Toggle on to enable versioning.

When Bucket Versioning is enabled, you can then retrieve and restore any previous version of an object in the bucket. Note: versions of objects are added to your total data storage costs.

:::warning

Bucket versioning can't be disabled when object locking is enabled.

:::

**Object Locking (Versioning must be enabled)**

*Optional at create time only.* Toggle on to enable Object Lock.

Store objects using a write-once-read-many (**WORM**) model to prevent objects from being deleted or overwritten for a fixed amount of time or indefinitely. Object Locking works only in versioned buckets.

:::warning

Object Lock is a permanent setting. Once enabled for a bucket, it cannot be disabled.

:::

Versioning must be enabled before Object Locking. Object Lock cannot be added later on an existing bucket.

**Bucket Policy**

*Optional.* JSON policy for bucket access. Defaults to `{}`.

Use the **Policy Examples** and **Policy Generator** links under the field for sample policies and assisted editing.

**ACL**

Configure the Access Control List for the bucket at creation time.

**Grantee**

*Required for ACL.* Who receives the permission — for example, **Bucket Owner**.

**Permission**

*Required.* Permission granted to the grantee — for example, **Full Control**.

Click **Create** to provision the bucket on CEPH via the S3 endpoint.

---

## Bucket overview

Open a bucket to view summary details and objects.

![Screenshot: CMP — Bucket overview with files and actions](/img/screenshots/cmp-bucket-overview.png)

Typical summary fields:

| Field | Description |
|---|---|
| **Total Files** | Object count in the bucket |
| **Bucket URL** | S3 / HTTP endpoint URL for the bucket (copyable) |
| **Usage** | Storage consumed |
| **Created at** | Creation timestamp |
| **Visibility** | For example, **Private** |

Action icons on the bucket header:

| Action | Purpose |
|---|---|
| **Refresh** | Reload bucket details and object list |
| **Share** | Open [Update Public Access](#share-bucket) |
| **Edit** | [Edit bucket](#edit-bucket) settings (for example, policy / ACL) |
| **Delete** | Delete the bucket (subject to Object Lock and contents) |

Inside the bucket, use **Upload**, **New Folder**, and the per-file menu for [object operations](#object-file-operations).

---

## Share bucket

Use **Share** on the bucket overview to update public access for the bucket (or apply public sharing rules that affect how objects are reached by link).

1. Open the bucket
2. Click the **Share** icon
3. Configure **Update Public Access** and click **Update**

![Screenshot: CMP — Update Public Access (share bucket) modal](/img/screenshots/cmp-bucket-share-public-access.png)

**Update Public Access**

*Optional.* Toggle on to allow anyone with the object or bucket link to access content without specific permissions. Public sharing can apply to individual files or the whole bucket over HTTP / HTTPS.

:::warning

Updating public access may change the bucket's ACL configurations.

:::

For finer-grained sharing (who can read, write, or delete), use **Bucket Policy** at [create](#create-bucket) or [edit](#edit-bucket) time, and **Policy Examples** / **Policy Generator** when available.

Visibility on the overview (for example, **Private**) updates after you change public access.

---

## Edit bucket

Use **Edit** on the bucket overview to change settings that are allowed after creation.

1. Open the bucket
2. Click the **Edit** icon
3. Update allowed fields and save

Supported updates typically include:

* Bucket policy changes
* ACL / access-related settings (including updates driven by [Share](#share-bucket))
* Other settings that are **not** locked at creation

:::warning[Cannot change after create]

**Object Lock** cannot be enabled or disabled after the bucket is created. **Versioning** cannot be turned off while Object Lock is enabled.

:::

:::tip[ACL updates]

CMP supports updating bucket ACLs after creation so customers can adjust Private / Public-style access without recreating the bucket.

:::

---

## Object (file) operations

Supported object operations inside a bucket:

| Operation | Description |
|---|---|
| **Upload files** | Upload objects; large files use **multipart upload** |
| **New Folder** | Create a logical prefix / folder in the bucket |
| **Download files** | Download objects to the client |
| **Delete files** | Remove objects (subject to Object Lock / versioning rules) |
| **Signed URL** | Generate a time-limited URL for download or upload without sharing long-lived keys |
| **Public Access** | Per-object public access status (for example, Inactive) when sharing rules allow |

:::info[Direct upload to CEPH]

File upload goes **directly to CEPH** (no CMP backend dependency for the object payload). That improves performance for large transfers. CMP still manages credentials, metadata, and usage sync.

:::

---

## Related

* [Object Storage](/orchestrator-features/ceph/object-storage)
* [Object Storage Packages](/orchestrators/ceph/packages)
* [Connecting CMP to CEPH](/orchestrators/ceph/connecting)
* [CEPH Features](/orchestrator-features/ceph/)
