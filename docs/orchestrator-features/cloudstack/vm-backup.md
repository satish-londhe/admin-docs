---
sidebar_position: 6
title: "VM Backup"
tags: ["orchestrator", "cloudstack", "features", "backup"]
---

# VM Backup

Virtual machine backups in CMP for CloudStack — create, schedule, retain, and restore VM backups, with billing via the **VM Backup** package (`BACKUP`).

:::important[Orchestrator-integrated backup]

When CloudStack **Backup and Recovery** is configured, CMP uses **CloudStack APIs** — customers schedule, backup, and restore from the VM in CMP. **No agents, no manual backup setup.**

This is **not** [Veeam VSPC](/orchestrators/veeam/) (standalone service with manual agent/job setup in Veeam).

See **[Backup and Recovery](/overview/backup-and-recovery)**.

:::

CMP supports two backends, controlled by **Enable Provider Backup** in Cloud Provider Setup:

| Mode | When |
|---|---|
| **CMP built-in backup** | Snapshot-based scheduled backups (typical for CloudStack before native B&R) |
| **CloudStack native backup** | CloudStack Backup & Recovery framework (Veeam, Networker, NAS, and so on) |

:::info[Documentation coming soon]

Full feature documentation for **VM Backup** on CloudStack will be added here — customer portal flows (create, schedule, restore), admin behaviour, quota, and billing notes.

Until then, use the related setup and package docs below.

:::

## Related

* [CloudStack Features](/orchestrator-features/cloudstack/)
* [VM Backup packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup)
* [Snapshot & Backup (pre-4.20)](/orchestrators/cloudstack/snapshot-backup)
* [CloudStack Native Backup (v4.20+)](/orchestrators/cloudstack/native-backup)
* [Snapshots](/orchestrator-features/cloudstack/snapshots) — volume and instance snapshots (separate from VM Backup)
* [CloudStack Setup](/orchestrators/cloudstack/)
