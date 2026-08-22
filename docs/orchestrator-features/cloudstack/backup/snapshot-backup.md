---
sidebar_position: 2
title: "Snapshot & Backup (pre-4.20)"
tags: ["orchestrator", "cloudstack", "features", "backup", "snapshots"]
---

# Snapshot & Backup — Pre-ACS 4.20

CMP **built-in VM Backup** for CloudStack environments that use **scheduled snapshots** instead of CloudStack's native Backup & Recovery (B&R) framework.

:::tip[Which backend am I on?]

| You are here if… | Otherwise use… |
|---|---|
| **Enable Provider Backup** = `No` in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) | [CloudStack Native Backup (v4.20+)](/orchestrator-features/cloudstack/backup/native-backup) when **Enable Provider Backup** = `Yes` |
| CloudStack **before 4.20**, or no B&R plugin configured | |

:::

---

## Concepts

### VM Backup vs manual snapshots

| | **VM Backup (CMP product)** | **Manual snapshots** |
|---|---|---|
| **Purpose** | Scheduled, retained, billable backup service | One-off save before a change |
| **Who sets schedule** | Customer (or policy) in CMP on the VM | Customer triggers each snapshot |
| **Billing** | **VM Backup** package (`BACKUP`) — hourly per GB | [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot) package if billed |
| **CMP path** | VM → Backup | VM / Volume → Snapshots |

Manual snapshot behaviour is documented under [Snapshots](/orchestrator-features/cloudstack/snapshots). This page covers **CMP automated backup** and the CloudStack snapshot mechanics it relies on.

### How CMP built-in backup works

```text
Customer enables backup / schedule on VM (CMP)
              |
              v
CMP calls CloudStack snapshot APIs on a schedule
              |
              v
Snapshots stored in CloudStack secondary storage
              |
              v
CMP bills via VM Backup package; enforces retention
```

* CMP is a **scheduler and billing layer** on top of CloudStack snapshots.
* The customer does **not** manage snapshot jobs in CloudStack — only in CMP.
* When backup is disabled, CMP stops billing and **deletes all associated snapshots**.

### How CMP chooses snapshot type

| Scenario | CMP behaviour |
|---|---|
| VM snapshots work on a running VM | Uses VM snapshots (with memory when supported) |
| VM snapshots do **not** work on a running VM | Set **VM snapshot = NO** in CMP setup; CMP falls back to **root volume snapshot** |

---

## Volume snapshots (CloudStack)

A volume snapshot is a **point-in-time capture of a disk** (root or data volume). It does not capture CPU or memory state.

* Snapshots can be taken for root disks and data disks
* Taking snapshots of a **running VM's root disk is disabled by default** in recent CloudStack versions
* To enable on KVM: set `kvm.snapshot.enabled = true` in CloudStack Global Settings

:::warning[KVM and CMP Backup]

If you use CMP built-in backup and snapshots are not working on KVM, `kvm.snapshot.enabled = true` is **mandatory**.

:::

**Supported hypervisors:** XenServer, VMware vSphere, KVM  
**Not supported:** Oracle VM (OVM)

### Restoring a volume snapshot

| Option | Description |
|---|---|
| Create Volume from Snapshot | Mount restored volume to recover specific files |
| Create Template from Snapshot | Boot a new instance from the template (root disk only) |
| Revert to Snapshot | Revert volume to snapshot state (storage/hypervisor dependent) |

---

## VM / instance snapshots (CloudStack)

A VM snapshot captures the **complete state** of an instance including all data volumes and optionally CPU/memory state.

* Memory capture supported **only on NFS storage**
* For other storage types, snapshot with memory will fail

### Limitations

* Supported on: VMware, XenServer, KVM (NFS only for memory)
* Cannot attach or delete volumes when stored snapshots exist — delete snapshots first
* Service offering changes discard memory-included snapshots automatically
* Cannot take VM and volume snapshots simultaneously on the same instance

Reference: [CloudStack — Instance snapshots](https://docs.cloudstack.apache.org/en/4.20.1.0/adminguide/virtual_machines.html#instance-snapshots)

---

## CMP automated backup (scheduled snapshots)

CMP Backup is the **scheduled VM Backup product** built on CloudStack snapshots.

### Retention

* Each schedule specifies how many recurring snapshots to retain
* Oldest snapshots are deleted automatically when the limit is exceeded
* Set `backup_limit` in global settings for maximum snapshots per VM

### Billing

* Billed **hourly** based on VM backup storage size
* Rate: `hourly_rate × storage_GB`
* Billing starts when backup is enabled; stops when disabled
* All snapshots are deleted when backup is disabled

Package setup: [VM Backup packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup)

### Restrictions

* Only **one** backup service per VM at a time
* Do not mix with [CloudStack native backup](/orchestrator-features/cloudstack/backup/native-backup) on the same VM

---

## Related

* [Backup (overview)](/orchestrator-features/cloudstack/backup/)
* [CloudStack Native Backup (v4.20+)](/orchestrator-features/cloudstack/backup/native-backup)
* [Snapshots](/orchestrator-features/cloudstack/snapshots)
* [VM Backup packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup)
* [Backup and Recovery](/overview/backup-and-recovery)
