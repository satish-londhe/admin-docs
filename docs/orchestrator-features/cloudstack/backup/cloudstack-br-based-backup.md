---
sidebar_position: 3
title: "CloudStack B&R-Based Backup"
tags: ["orchestrator", "cloudstack", "features", "backup"]
---

# CloudStack B&R-Based Backup

When CloudStack **Backup and Recovery (B&R)** is configured, CMP uses **CloudStack B&R APIs** to manage VM backups. The customer schedules, runs, and restores from the **VM in CMP** — no agents and no manual backup setup on the customer side.

:::info[Not enabled by default]

Backup is **disabled at onboarding**. The provider must choose this model and complete CloudStack B&R prerequisites first. See [Backup — provider decision](/orchestrator-features/cloudstack/backup/#default-backup-disabled-at-setup).

:::

:::tip[Which backend am I on?]

| You are here if… | Otherwise use… |
|---|---|
| **Enable Provider Backup** = `Yes` in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) | [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup) when **Enable Provider Backup** = `No` |
| CloudStack B&R is configured with a provider plugin | |

:::

:::important[Not Veeam VSPC]

CloudStack B&R can use the **Veeam Backup & Replication plugin** at the **CloudStack** level. That is **orchestrator-integrated** VM backup in CMP — **not** the standalone [Veeam VSPC](/orchestrators/veeam/) orchestrator.

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
   CMP → CloudStack B&R APIs
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

### Snapshot-as-backup vs B&R-based — at a glance

| | **Automated Volume Snapshot as Backup** | **CloudStack B&R-Based Backup** |
|---|---|---|
| **CMP setting** | Enable Provider Backup = `No` | Enable Provider Backup = `Yes` |
| **Under the hood** | Scheduled CloudStack snapshots (no backup engine in CMP) | CloudStack B&R + provider plugin |
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

## Switching to CloudStack B&R-Based Backup

:::info[Application-wide setting]

Switching backends means changing **Enable Provider Backup** in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) for the CloudStack connection. That applies to **all VMs** on that connection — you cannot run Automated Volume Snapshot as Backup and CloudStack B&R-Based Backup side by side in CMP.

:::

### Before you switch

* Understand the difference between [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup) and CloudStack B&R-Based Backup
* Ensure the backup provider plugin is installed and configured in CloudStack
* Test backup and restore on a non-production VM first

### Recommended steps

1. Plan the cutover — all VMs on this CloudStack connection will use the new backend after the change
2. Disable Automated Volume Snapshot as Backup on VMs that still have it (this deletes CMP-managed snapshots)
3. Configure the CloudStack backup provider and import backup offerings (B&R path)
4. Set **Enable Provider Backup** to `Yes` in [Cloud Provider Setup](/orchestrators/cloudstack/connecting)
5. Enable CloudStack B&R-Based Backup on VMs via CMP or CloudStack admin UI
6. Verify backup jobs run successfully and test restore on a non-production VM

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
* [Automated Volume Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-volume-snapshot-as-backup)
* [Backup and Recovery](/overview/backup-and-recovery)
* [CloudStack Features](/orchestrator-features/cloudstack/)
