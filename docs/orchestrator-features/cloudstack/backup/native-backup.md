---
sidebar_position: 3
title: "CloudStack Native Backup (v4.20+)"
tags: ["orchestrator", "cloudstack", "features", "backup"]
---

# CloudStack Native Backup (v4.20+)

When CloudStack **Backup and Recovery (B&R)** is configured, CMP uses **CloudStack APIs** to manage VM backups. The customer schedules, runs, and restores from the **VM in CMP** — no agents and no manual backup setup on the customer side.

:::tip[Which backend am I on?]

| You are here if… | Otherwise use… |
|---|---|
| **Enable Provider Backup** = `Yes` in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) | [Snapshot & Backup (pre-4.20)](/orchestrator-features/cloudstack/backup/snapshot-backup) when **Enable Provider Backup** = `No` |
| CloudStack B&R is configured with a provider plugin | |

:::

:::important[Not Veeam VSPC]

Native backup can use the **Veeam Backup & Replication plugin** at the **CloudStack** level. That is **orchestrator-integrated** VM backup in CMP — **not** the standalone [Veeam VSPC](/orchestrators/veeam/) orchestrator.

See [Backup and Recovery](/overview/backup-and-recovery).

:::

---

## Concepts

### What CloudStack B&R is

CloudStack 4.14 introduced a **Backup and Recovery framework**; it is production-ready from **4.20+**. The framework:

* Exposes standard backup APIs in CloudStack (create, schedule, restore, list, and so on)
* Delegates actual backup storage to a **provider plugin** (Veeam, Networker, NAS, and others)
* Supports **SLA/policy-based** backups and **adhoc / user-scheduled** backups

Official reference: [About Backup And Recovery](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/backup_and_recovery.html)

### How CMP fits in

```text
Customer (CMP VM screen)
        |
        v
   CMP → CloudStack backup APIs
        |
        v
   Provider plugin (operator configured)
        |
        v
   Backup storage (Veeam / Networker / NAS / …)
```

* The **cloud operator** installs and configures the plugin in CloudStack and imports backup offerings.
* **CMP** maps customer actions to CloudStack API calls — same customer experience as other VM features.
* The customer does **not** log into Veeam or Networker to configure jobs for CloudStack VMs on this path.

### CMP built-in vs native — at a glance

| | **CMP built-in (snapshots)** | **CloudStack native (B&R)** |
|---|---|---|
| **CMP setting** | Enable Provider Backup = `No` | Enable Provider Backup = `Yes` |
| **Under the hood** | Scheduled CloudStack snapshots | CloudStack B&R + provider plugin |
| **Typical ACS version** | Pre-4.20 or no plugin | 4.20+ with plugin configured |
| **Customer in CMP** | Schedule / backup / restore on VM | Schedule / backup / restore on VM |

---

## Supported backup providers

Provider plugins are configured in **CloudStack** by the operator — not in CMP.

| Provider | Hypervisor | CloudStack docs |
|---|---|---|
| Veeam Backup and Replication | VMware | [Veeam plugin](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/veeam_plugin.html) |
| DELL EMC Networker | KVM | [Networker plugin](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/networker_plugin.html) |
| NAS B&R | KVM (4.20+) | [NAS plugin](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/nas_plugin.html) |

---

## Backup modes (CloudStack)

CloudStack B&R supports two modes — both are driven through CloudStack APIs (and CMP when integrated):

| Mode | Who controls schedule | Typical use |
|---|---|---|
| **SLA / policy-based** | Cloud provider (root admin) via backup offering | Fixed RPO, fixed retention, fixed price |
| **Adhoc / user-scheduled** | Customer on the VM | Similar to volume snapshots but stored via the backup provider |

Customers add or remove VMs from a backup offering for SLA backups, or create schedules / adhoc backups when the offering allows it.

---

## Switching from CMP built-in to native backup

:::warning[Do not mix on the same VM]

Disable one backup type before enabling the other.

:::

### Before you switch

* Understand the difference between [CMP built-in backup](/orchestrator-features/cloudstack/backup/snapshot-backup) and CloudStack native B&R
* Ensure the backup provider plugin is installed and configured in CloudStack
* Test backup and restore on a non-production VM first

### Recommended steps

1. Disable CMP built-in backup for existing VMs (this deletes all CMP-managed snapshots)
2. Configure the CloudStack backup provider and import backup offerings
3. Enable CloudStack native backup for VMs via CMP or CloudStack admin UI
4. Verify backup jobs run successfully
5. Test restore on a test VM

---

## Admin setup and billing

| Topic | Page |
|---|---|
| Packages, physical vs virtual billing | [VM Backup packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup) |
| Enable Provider Backup | [Cloud Provider Setup](/orchestrators/cloudstack/connecting) |
| CloudStack B&R configuration | [CloudStack — Backup and Recovery](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/backup_and_recovery.html) |

---

## Related

* [Backup (overview)](/orchestrator-features/cloudstack/backup/)
* [Snapshot & Backup (pre-4.20)](/orchestrator-features/cloudstack/backup/snapshot-backup)
* [Backup and Recovery](/overview/backup-and-recovery)
* [CloudStack Features](/orchestrator-features/cloudstack/)
