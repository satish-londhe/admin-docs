---
sidebar_position: 1
title: "Backup"
tags: ["orchestrator", "cloudstack", "features", "backup"]
---

# Backup

VM backup in CMP for CloudStack is **orchestrator-integrated** — customers schedule, run, and restore backups from the **VM in CMP**. No backup agents and no separate backup dashboard for the customer.

:::important[Not Veeam VSPC]

This is **CloudStack VM backup** through CMP — not the standalone [Veeam VSPC](/orchestrators/veeam/) service (where customers install agents and configure jobs manually in Veeam).

See **[Backup and Recovery](/overview/backup-and-recovery)** for the full comparison.

:::

---

## Three ideas to keep separate

| Concept | What it is | Customer uses it for |
|---|---|---|
| **Snapshots** | Manual point-in-time copy of a disk or VM | Ad-hoc save before a change; restore a volume or create a template |
| **VM Backup (CMP product)** | Scheduled, billable backup service on a VM | Automated retention, restore, and billing via the **VM Backup** package |
| **CloudStack Backup & Recovery (B&R)** | CloudStack framework (4.14+, mature from 4.20) with provider plugins | Backend that CMP talks to when **Enable Provider Backup** is on |

**Snapshots** and **VM Backup** are related (CMP built-in backup uses snapshots under the hood) but they are **different features** in CMP. See [Snapshots](/orchestrator-features/cloudstack/snapshots) for manual snapshot actions.

---

## Two VM Backup backends in CMP

Your cloud chooses **one backend** per CloudStack setup. CMP exposes the same customer actions (create, schedule, restore) — the difference is what runs behind the API.

```text
Customer (CMP VM screen)
        |
        v
   CloudStack APIs
        |
   +----+----+
   |         |
   v         v
CMP built-in     CloudStack native
(scheduled       (B&R framework +
 snapshots)      provider plugin)
```

| Backend | When | CMP setting | Page |
|---|---|---|---|
| **CMP built-in backup** | Typical for CloudStack **before 4.20**, or when no B&R plugin is configured | **Enable Provider Backup** = `No` | [Snapshot & Backup (pre-4.20)](/orchestrator-features/cloudstack/backup/snapshot-backup) |
| **CloudStack native backup** | CloudStack **4.20+** with B&R configured (Veeam, Networker, NAS, and so on) | **Enable Provider Backup** = `Yes` | [CloudStack Native Backup (v4.20+)](/orchestrator-features/cloudstack/backup/native-backup) |

:::warning[One backup mode per VM]

Do not enable CMP built-in backup and CloudStack native backup on the same VM. Disable one before switching to the other.

:::

---

## What the customer does (both backends)

From the VM in CMP:

* Create backup
* Schedule backup
* Restore
* Manage retention (as exposed in CMP)

The customer does **not** install agents or configure backup jobs in a third-party product for this path.

---

## What the cloud operator configures

| Topic | Where |
|---|---|
| Packages and billing | [VM Backup packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup) |
| Enable Provider Backup, billing size | [Cloud Provider Setup](/orchestrators/cloudstack/connecting) |
| CloudStack B&R (native path) | CloudStack admin — [CloudStack B&R reference](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/backup_and_recovery.html) |

---

## Pages in this section

| Page | Focus |
|---|---|
| [Snapshot & Backup (pre-4.20)](/orchestrator-features/cloudstack/backup/snapshot-backup) | CMP built-in scheduled snapshot backup; snapshot types and limits |
| [CloudStack Native Backup (v4.20+)](/orchestrator-features/cloudstack/backup/native-backup) | CloudStack B&R framework; provider plugins; switching from CMP built-in |
| [VM Backup (CMP workflows)](/orchestrator-features/cloudstack/backup/vm-backup) | Customer portal flows — *documentation in progress* |

---

## Related

* [Backup and Recovery (overview)](/overview/backup-and-recovery)
* [Snapshots](/orchestrator-features/cloudstack/snapshots) — manual volume and instance snapshots
* [CloudStack Features](/orchestrator-features/cloudstack/)
* [CloudStack Setup](/orchestrators/cloudstack/)
