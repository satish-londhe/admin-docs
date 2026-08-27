---
sidebar_position: 13
title: "VM Backup"
tags: ["orchestrator", "cloudstack", "packages", "backup"]
---

# VM Backup Packages

VM Backup packages define how CMP bills customers for **virtual machine backups** (`BACKUP`). When a customer creates or retains a VM backup, CMP charges based on the **backup size in GB** and the **per-GB hourly rate** configured in this package.

:::tip[Part of orchestrator-native backup]

This package applies to **CloudStack VM backup integrated with compute** — not the standalone [Veeam VSPC](/orchestrators/veeam/) service. Overview: [Backup and Recovery](/overview/backup-and-recovery).

:::

VM backup billing uses **hourly per-GB pricing only** — the same model as [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot), [Custom Template](/orchestrators/cloudstack/offering-sync-and-packages/template), and [ISO](/orchestrators/cloudstack/offering-sync-and-packages/iso) packages.

:::info[Before you begin]

Ensure the following are already configured:

* [Cloud Provider Setup](/orchestrators/cloudstack/connecting) is connected, with **Backups → Virtual Machine Backup** enabled in Wizard Step 1
* [Zones](/orchestrators/cloudstack/zones) are mapped in CMP
* You have chosen a backup backend — [Automated Volume Snapshot as Backup](#automated-volume-snapshot-as-backup) or [CloudStack B&R-Based Backup](#cloudstack-br-based-backup)
* For CloudStack B&R-Based Backup, the backup provider plugin is installed and `backup.framework.enabled = true` in CloudStack — see [CloudStack Backup and Recovery](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/backup_and_recovery.html)
* You understand [physical vs virtual size billing](#physical-vs-virtual-size-billing) before setting package pricing

:::

**CMP path:** **Settings → Billing Setup → Rate Cards → Default → Packages → VM Backup**

## Two backup backends

CMP supports two VM backup approaches. You enable **one** for the entire CloudStack connection via **Enable Provider Backup** in [Cloud Provider Setup — Provider Config](/orchestrators/cloudstack/connecting):

| Mode | **Enable Provider Backup** | Backend | When to use |
|---|---|---|---|
| **Automated Volume Snapshot as Backup** | `No` | CMP automates scheduled **root volume** snapshots as the VM recovery mechanism | CloudStack versions before 4.20, or environments without a native backup plugin |
| **CloudStack B&R-Based Backup** | `Yes` | CloudStack B&R framework with a 3rd-party provider plugin | CloudStack 4.14+ with Veeam, Networker, or NAS plugin configured |

:::warning[One backup backend per CloudStack setup]

**Enable Provider Backup** in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) chooses the backup path **application-wide** for that CloudStack connection:

| Setting | Available in CMP |
|---|---|
| `No` | Automated Volume Snapshot as Backup only |
| `Yes` | CloudStack B&R-Based Backup only |

You cannot use both on the same connection. To switch, change the setting and follow [Switching to CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup#switching-to-cloudstack-br-based-backup).

:::

### Automated Volume Snapshot as Backup

When **Enable Provider Backup** is `No`, CMP **automates scheduled CloudStack snapshots of the VM root volume** and treats them as VM backup in CMP — it does not run a separate backup engine and does **not** use full VM (instance) snapshots. See [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup#product-behaviour-schedule-retention-billing) for behaviour, retention, and KVM requirements.

Billing is based on backup storage size using the VM Backup package hourly per-GB rate.

### CloudStack B&R-Based Backup

When **Enable Provider Backup** is `Yes`, VM backups are managed through CloudStack's **Backup and Recovery (B&R)** framework. Supported provider plugins include:

| Hypervisor | Provider | CloudStack version |
|---|---|---|
| **VMware** | Veeam Backup and Recovery | 4.14+ |
| **KVM** | DELL EMC Networker | 4.14+ |
| **KVM** | NAS B&R Plugin | 4.20+ |

Official reference: [About Backup And Recovery](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/backup_and_recovery.html)

CloudStack administrators must:

1. Set `backup.framework.enabled = true` in CloudStack Global Settings
2. Configure `backup.framework.provider.plugin` per zone (`veeam`, `networker`, or `nas`)
3. Import backup offerings from the provider into CloudStack (**Service Offerings → Backup Offerings → Import Backup Offering**)
4. Enable **Enable Provider Backup** in CMP Cloud Provider Setup

See also [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup).

## How VM backup billing works

Each VM backup is billed **individually** on an hourly basis for as long as it is retained.

```
VM backup cost per hour = backup size (GB) × price per GB per hour
```

**Example:** A backup consuming 50 GB at `$0.10`/GB/hour costs **$5.00/hour** until it is deleted.

:::info[Mandatory hourly billing]

VM backups (`BACKUP`) always use **hourly billing only**. Monthly, quarterly, and yearly cycles are not supported. See [Billing Cycles](/billing/billing-cycles/#mandatory-hourly-billing).

:::

* **Run now** — one charge per backup copy from creation until deletion
* **Scheduled timer** — each run creates a billable copy; retention deletes old copies and stops their billing

:::info[Customer backup workflows]

Customers use **[backup schedules](/orchestrator-features/cloudstack/backup/schedules/backup-schedules)** and **[Manage backups](/orchestrator-features/cloudstack/backup/manage-backups)** — Run now, retention, and restore. Concepts: [Backup](/orchestrator-features/cloudstack/backup/).

:::

## Physical vs virtual size billing

When pricing VM backups — especially with **CloudStack B&R-Based Backup** — the billed size depends on whether the configured backup provider reports **physical** (actual stored) backup size to CloudStack and how **VM Backup Billing** is set in CMP Cloud Provider Setup.

In **Settings → Orchestrator → Cloud Providers → [setup] → Provider Config**, locate **VM Backup Billing**:

| Setting | Description |
|---|---|
| **VM Backup Billing** | Determines whether CMP charges use **physical** (actual backup storage consumed) or **virtual** (provisioned disk) size |

:::info[What CloudStack documentation says]

The [CloudStack Backup and Recovery guide](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/backup_and_recovery.html) states that adhoc and scheduled backups *may be billed on backup storage consumed or protected capacity (the full virtual size of the instance)* — indicating the billing model depends on the backup solution, not a single fixed rule.

CloudStack also uses **physical used size** (falling back to virtual size) for **internal resource limits** on backups — this is not documentation that a specific backup plugin exposes physical size for customer billing.

The CloudStack docs do **not** explicitly state that Veeam, Networker, or NAS plugins report physical backup size via API. Do not assume physical size billing is available for a provider without verifying it in your environment.

:::

### Physical size billing

Set **VM Backup Billing** to **physical** when the backup provider reports actual backup storage consumed to CloudStack and CMP receives that value.

Customers are billed for the **actual data stored** in the backup, not the provisioned virtual disk size.

**Example:** A VM with **200 GB** provisioned storage but only **30 GB** physically stored in the backup is charged for **30 GB** only.

Physical size billing is available when the configured backup provider reports actual backup storage consumed to CloudStack. If physical usage information is unavailable, CMP falls back to virtual (provisioned) size according to the configured billing mode.

:::tip[CMP-supported providers for physical size billing]

Verify physical size reporting in your environment before enabling physical billing — provider behaviour can vary by version and configuration.

:::

:::warning[Fallback to virtual size]

If **VM Backup Billing** is set to **physical** in Cloud Provider Setup but CMP does **not** receive physical backup size from CloudStack, billing **falls back to virtual (provisioned) size**. Customers may be charged for the full provisioned disk capacity even though physical billing is selected. Verify physical size reporting works end-to-end before relying on physical billing in production.

:::

### Virtual size billing

Set **VM Backup Billing** to **virtual** when you want to charge based on provisioned disk size, or when the backup provider does **not** report physical backup usage to CloudStack.

Customers are billed for the **full provisioned virtual disk size** of the backed-up VM volumes.

**Example:** A VM with **200 GB** provisioned storage is charged for **200 GB**, regardless of how much data is actually written on disk.

### Choosing a billing mode

| Mode | When to use |
|---|---|
| **Physical** | Provider reports actual backup storage consumed; you want customers charged for real backup footprint |
| **Virtual** | Provider does not report physical size, or you prefer charging against provisioned/protected capacity |

:::tip[Pricing guidance]

When physical size billing is confirmed for your provider, set your per-GB hourly rate considering that customers will typically be charged for less than the VM's provisioned disk size. When billing uses virtual size, price against the full provisioned capacity customers expect to back up.

:::

## Configure VM Backup packages in CMP

Create a VM Backup package for each **Cloud Provider + Setup + Zone** where you want to charge for VM backups.

The form fields shown depend on your backup backend. When **Enable Provider Backup** is `No` ([Automated Volume Snapshot as Backup](#automated-volume-snapshot-as-backup)), the **Backup Offering ID** field is **not shown**. It appears only when **Enable Provider Backup** is `Yes` ([CloudStack B&R-Based Backup](#cloudstack-br-based-backup)).

1. Open **Settings → Billing Setup → Rate Cards → Default → Packages → VM Backup**
2. Click **Add Package** (form title: **Create VM Backup Package**)
3. Complete each field below in the order shown on the form
4. Set **Status** to **Active** and save

![Screenshot: CMP — Create VM Backup Package form](/img/screenshots/cmp-vm-backup-package-form.png)

Each field below matches the **Create VM Backup Package** form.

**Cloud Provider**

*Required.* Select the orchestrator type — for example, **CloudStack (Nimbo)**.

**Cloud Provider Setup**

*Required.* Select the CloudStack instance this package belongs to — for example, `CloudStack-01`.

**Package Name**

*Required.* Display name for the VM backup service — for example, `VM Backup` or `Instance Backup`.

**Zone**

*Required.* Select the CMP zone where this backup pricing applies — for example, `SC-SIM-ZONE-1`.

**Tag**

*Optional.* Assign a tag for filtering or promotional labelling in the customer portal.

:::warning[Important]

Tags are CMP-level labels used for representation only. They do not map to CloudStack tags.

:::

**Status**

*Required.* Controls package visibility.

| Status | Behaviour |
|---|---|
| **Active** | Backup package is available when customers create or retain VM backups in this zone |
| **Inactive** | Hidden — use while configuring or testing |

**Backup Offering ID**

*Required when **Enable Provider Backup** is `Yes`.* Not shown on the form when using [Automated Volume Snapshot as Backup](#automated-volume-snapshot-as-backup) (`Enable Provider Backup` = `No`).

Enter the CloudStack **backup offering ID** that this CMP package maps to.

Obtain the ID after importing a backup offering in CloudStack:

1. Log in to the CloudStack UI as root admin
2. Navigate to **Service Offerings → Backup Offerings**
3. Import the offering from your backup provider (**Import Backup Offering**) — see [Importing Backup Offerings](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/backup_and_recovery.html#importing-backup-offerings)
4. Copy the offering **ID** (UUID) and paste it into this field

The **Backup Offering ID** links the CMP package to the CloudStack backup policy/offering customers are assigned to when using [CloudStack B&R-Based Backup](#cloudstack-br-based-backup).

:::info[No billing cycle fields on this form]

The **Create VM Backup Package** form does not include monthly or yearly pricing fields. VM backups (`BACKUP`) use **hourly billing only**. CMP calculates charges based on backup size (physical or virtual — per [VM Backup Billing](#physical-vs-virtual-size-billing)) and the hourly per-GB rate defined in your rate card for this package type.

:::

## End-to-end example

**Goal:** Charge for VM backups in zone `SC-SIM-ZONE-1` using CloudStack B&R-Based Backup with NAS plugin and physical size billing.

**CloudStack**

1. Set `backup.framework.enabled = true`
2. Set `backup.framework.provider.plugin` to `nas` for the zone
3. Import backup offerings from the NAS provider
4. Test adhoc backup and restore on a non-production VM

**CMP — Cloud Provider Setup**

1. Enable **Backups → Virtual Machine Backup** in Wizard Step 1
2. Set **Enable Provider Backup** to `Yes` in Provider Config
3. Set **VM Backup Billing** to **physical** in Provider Config (verify NAS plugin reports physical backup size in your environment)

**CMP package**

1. Open **Packages → VM Backup → Add Package**
2. Set **Cloud Provider** **CloudStack (Nimbo)**, **Cloud Provider Setup** `CloudStack-01`, **Package Name** `VM Backup`, **Zone** `SC-SIM-ZONE-1`
3. Set **Backup Offering ID** to the UUID of the NAS backup offering imported in CloudStack
4. Set **Status** to **Active** and save

A customer with a 200 GB VM whose backup physically consumes 30 GB is charged `30 × 0.10 = $3.00`/hour when physical size billing is active.

## Customer portal view

Customers protect VMs using a **[backup schedule](/orchestrator-features/cloudstack/backup/schedules/backup-schedules)** on each instance:

| Action | Where | Result on **Backups** list |
|---|---|---|
| **Scheduled backup** | Create schedule with frequency, timezone, retention | **Type: Schedule** |
| **Run now** | Lightning icon on schedule | **Type: Manual** |
| **Take One Immediate** | Checkbox when creating schedule | **Type: Manual** (first copy) |

Each retained backup copy is billed at the zone per-GB hourly rate. See [Manage backups](/orchestrator-features/cloudstack/backup/manage-backups) and [Restore backup](/orchestrator-features/cloudstack/backup/manage-backups#restore-backup).

![Screenshot: CMP — Customer VM backup schedule](/img/screenshots/cmp-customer-vm-backup.png)

## Validation checklist

Before marking a VM Backup package **Active**, verify:

* **Backups → Virtual Machine Backup** is enabled in Cloud Provider Setup (Wizard Step 1)
* **Enable Provider Backup** matches your intended backend (Automated Volume Snapshot as Backup vs CloudStack B&R-Based Backup)
* For native backup: CloudStack B&R framework and provider plugin are configured — see [Backup and Recovery](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/backup_and_recovery.html)
* For CloudStack B&R-Based Backup (`Enable Provider Backup` = `Yes`): **Backup Offering ID** matches a backup offering imported in CloudStack for the target zone
* **VM Backup Billing** (physical vs virtual) matches your provider's capabilities — verify physical size reporting before enabling physical billing
* For Automated Volume Snapshot as Backup: `kvm.snapshot.enabled = true` if required on KVM — see [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup)
* [Global quotas](/quota/global-quotas) and CloudStack backup limits allow sufficient backup count per account

## Related

* [CloudStack Packages](/orchestrators/cloudstack/offering-sync-and-packages/)
* [Backup](/orchestrator-features/cloudstack/backup/) — concepts and backends
* [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup) — CloudStack backend for snapshot-as-backup path
* [Backup schedules](/orchestrator-features/cloudstack/backup/schedules/backup-schedules)
* [Manage backups](/orchestrator-features/cloudstack/backup/manage-backups)
* [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup)
* [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot)
* [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting)
* [Billing Overview](/billing/overview)
* [Pricing Formulas](/billing/rate-cards/pricing-formulas)
* [CloudStack — About Backup And Recovery](https://docs.cloudstack.apache.org/en/4.22.1.0/adminguide/backup_and_recovery.html)
