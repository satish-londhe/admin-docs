---
sidebar_position: 2
title: "Automated Volume Snapshot as Backup"
tags: ["orchestrator", "cloudstack", "features", "backup", "snapshots"]
---

# Automated Volume Snapshot as Backup

When **Enable Provider Backup** is `No`, CMP does **not** run a separate backup engine. It **automates scheduled CloudStack volume snapshots** on the VM **root disk** and exposes them in CMP as the VM **backup and recovery** mechanism — schedule, retain, restore, and bill via the **VM Backup** package.

Typical for CloudStack **before 4.20**, or when CloudStack Backup & Recovery (B&R) is not configured.

:::important[Root volume snapshot — not a VM snapshot]

CMP uses **Automated Volume Snapshot as Backup**. Internally, the scheduler takes a snapshot of the VM **root volume** — **not** a full VM (instance) snapshot.

VM snapshots have **hypervisor- and environment-specific restrictions** (memory capture, storage type, concurrent volume operations, and similar). Root **volume** snapshots are the consistent recovery mechanism CMP relies on for this backup path.

Additional **data volumes** on the VM are **not** included in automated backup snapshots unless your deployment configures otherwise.

:::

:::info[Not enabled by default]

Backup is **disabled at onboarding**. The provider must choose this model and complete CloudStack snapshot prerequisites first. See [Backup — provider decision](/orchestrator-features/cloudstack/backup/#default-backup-disabled-at-setup).

:::

:::tip[Which backend am I on?]

| You are here if… | Otherwise use… |
|---|---|
| **Enable Provider Backup** = `No` in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) | [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup) when **Enable Provider Backup** = `Yes` |
| CloudStack **before 4.20**, or no B&R plugin configured | |

:::

---

## Concepts

### VM Backup vs manual snapshots

| | **VM Backup (CMP product)** | **Manual snapshots** |
|---|---|---|
| **Purpose** | Scheduled, retained, billable recovery points | One-off save before a change |
| **Under the hood** | Automated **root volume** snapshots | Customer-triggered CloudStack VM or volume snapshots |
| **Who sets schedule** | Customer (or policy) in CMP on the VM | Customer triggers each snapshot |
| **Billing** | **VM Backup** package (`BACKUP`) — hourly per GB | [Volumes Snapshot](/orchestrators/cloudstack/offering-sync-and-packages/volumes-snapshot) package if billed |
| **CMP path** | VM → Backup | VM / Volume → Snapshots |

Manual snapshot behaviour is documented under [Snapshots](/orchestrator-features/cloudstack/snapshots). This page covers **Automated Volume Snapshot as Backup** and the CloudStack volume snapshot mechanics it relies on.

### How Automated Volume Snapshot as Backup works

```text
Customer enables backup / schedule on VM (CMP)
              |
              v
CMP calls CloudStack volume snapshot API on the VM root volume
              |
              v
Snapshots stored in CloudStack secondary storage
              |
              v
CMP bills via VM Backup package; enforces retention
```

* CMP is a **scheduler and billing layer** — not a backup engine.
* Recovery uses **CloudStack root volume snapshots** created on a schedule.
* The customer does **not** manage snapshot jobs in CloudStack — only in CMP.
* When backup is disabled, CMP stops billing and **deletes all associated snapshots**.

---

## Volume snapshots (CloudStack)

A volume snapshot is a **point-in-time capture of a disk** (root or data volume). It does not capture CPU or memory state.

* Automated backup on this path snapshots the **root volume** only
* Snapshots can also be taken manually for root disks and data disks
* Taking snapshots of a **running VM's root disk** may require CloudStack global settings on KVM — see below

:::warning[KVM and root volume snapshots]

If root volume snapshots fail on **running** KVM VMs, set `kvm.snapshot.enabled = true` in CloudStack Global Settings. This is often **required** for Automated Volume Snapshot as Backup on KVM.

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

## VM / instance snapshots (CloudStack reference)

Full **VM (instance) snapshots** capture instance state including optional memory. **CMP automated backup does not use this path** — it is documented here because manual snapshot and CloudStack admin workflows may still reference instance snapshots.

* Memory capture supported **only on NFS storage**
* For other storage types, snapshot with memory will fail
* Supported on: VMware, XenServer, KVM (NFS only for memory)
* Cannot attach or delete volumes when stored snapshots exist — delete snapshots first
* Service offering changes discard memory-included snapshots automatically
* Cannot take VM and volume snapshots simultaneously on the same instance

Reference: [CloudStack — Instance snapshots](https://docs.cloudstack.apache.org/en/4.20.1.0/adminguide/virtual_machines.html#instance-snapshots)

---

## Product behaviour (schedule, retention, billing)

The **VM Backup** product on this path is scheduled **root volume** snapshot automation — exposed to customers as backup in CMP.

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

* Backup backend is fixed **application-wide** by **Enable Provider Backup** in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) — see [Backup](/orchestrator-features/cloudstack/backup/#two-vm-backup-backends-in-cmp)
* When this connection uses Automated Volume Snapshot as Backup, [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup) is not available in CMP (and vice versa)

---

## Related

* [Backup (overview)](/orchestrator-features/cloudstack/backup/)
* [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup)
* [Snapshots](/orchestrator-features/cloudstack/snapshots)
* [VM Backup packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup)
* [Backup and Recovery](/overview/backup-and-recovery)
