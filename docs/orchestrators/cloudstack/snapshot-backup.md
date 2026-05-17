---
sidebar_position: 9
title: "Snapshot & Backup (pre-4.20)"
tags: ["orchestrator", "cloudstack", "backup"]
---

# Snapshot & Backup — Pre-ACS 4.20

> This page covers the CMP automated snapshot/backup feature used with CloudStack versions **before 4.20**. For ACS 4.20+, see [CloudStack Native Backup (v4.20+)](/orchestrators/cloudstack/native-backup).

## Volume snapshots

A volume snapshot is a **point-in-time capture of an instance's disk** (root or data volumes). It does not capture CPU or memory state.

* Snapshots can be taken for both root disks and data disks
* Taking snapshots of a **running VM's root disk is disabled by default** in recent CloudStack versions
* To enable: set `kvm.snapshot.enabled = true` in CloudStack Global Settings

> ⚠️ If you use CMP Backup (Automated Snapshots) and VM snapshots are not working, enabling `kvm.snapshot.enabled = true` is **mandatory**.

**Supported hypervisors:** XenServer, VMware vSphere, KVM  
**Not supported:** Oracle VM (OVM)

### Restoring a volume snapshot

| Option | Description |
| --- | --- |
| Create Volume from Snapshot | Mount restored volume to recover specific files |
| Create Template from Snapshot | Boot a new instance from the template (root disk only) |
| Revert to Snapshot | Directly revert volume to snapshot state (storage/hypervisor dependent) |

## VM / Instance snapshots

A VM snapshot captures the **complete state** of an instance including all data volumes and optionally CPU/memory state.

* Memory capture supported **only on NFS storage**
* For all other storage types, snapshot with memory will fail

### Limitations

* Supported on: VMware, XenServer, KVM (NFS only)
* Cannot attach or delete volumes when stored snapshots exist — delete all snapshots first
* Service offering changes discard memory-included snapshots automatically
* Cannot take VM and volume snapshots simultaneously on the same instance

Reference: https://docs.cloudstack.apache.org/en/4.20.1.0/adminguide/virtual\_machines.html#instance-snapshots

## CMP automated backup (scheduled snapshots)

CMP Backup is a **scheduled/automated snapshot** feature built on top of CloudStack's native snapshot capabilities.

### How CMP chooses snapshot type

| Scenario | CMP behaviour |
| --- | --- |
| VM snapshots work on running VM | Uses VM snapshots with memory by default |
| VM snapshots do NOT work on running VM | Set **VM snapshot = NO** in CMP setup; CMP falls back to root volume snapshot |

### Snapshot retention

* Each schedule specifies how many recurring snapshots to retain
* Oldest snapshots are automatically deleted when the limit is exceeded
* Currently managed via global settings; per-policy retention is on the roadmap

### Backup billing

* Billed **hourly** based on VM storage size
* Rate: `hourly_rate × storage_GB`
* Example: 0.1/GB/hour × 50 GB = 5/hour
* Billing starts when backup is enabled; stops immediately when disabled
* All snapshots are deleted when backup is disabled

### Backup limits

Set `backup_limit` in global settings to control maximum snapshots retained per VM. When the limit is reached, the oldest snapshot is deleted to make room.

### Restrictions

* Only one backup service per VM at a time
* Disabling backup stops billing and deletes all associated snapshots immediately
