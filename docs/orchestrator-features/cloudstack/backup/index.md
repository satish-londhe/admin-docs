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

## Default: backup disabled at setup

During initial CloudStack onboarding, the **StackConsole team leaves VM Backup disabled**. Backup is **not** turned on until the **cloud provider** decides whether to offer it and which model fits the CloudStack environment.

:::info[Provider decision — not automatic]

VM Backup is **opt-in**. The **cloud provider** chooses:

1. **Offer VM Backup or not** — skip backup until you are ready to sell or support it
2. **Which model** — **Automated VM Snapshot as Backup** *or* **CloudStack B&R-Based Backup** (one model per environment, not both)
3. **CloudStack readiness first** — configure the required snapshot or B&R settings in CloudStack for the chosen model

StackConsole connects CloudStack and core services by default. Backup is discussed and enabled only after you confirm the model and CloudStack prerequisites are in place.

:::

### Choose a model

| Model | When to choose | CloudStack must have… |
|---|---|---|
| **Automated VM Snapshot as Backup** | ACS before 4.20, no B&R plugin, or scheduled snapshots as recovery | Working volume/VM snapshots; KVM: `kvm.snapshot.enabled = true` if needed |
| **CloudStack B&R-Based Backup** | ACS 4.20+ with B&R and a provider plugin (Veeam, Networker, NAS) | B&R framework enabled, plugin configured, backup offerings imported |
| **No VM Backup** | Backup not offered yet | — |

Onboarding details: [Apache CloudStack Requirements — VM Backup](/installation/orchestrator-requirements/cloudstack#10-vm-backup--provider-decision-before-go-live).

CMP setup and packages for backup are documented separately in [CloudStack Setup](/orchestrators/cloudstack/).

---

## Three ideas to keep separate

| Concept | What it is | Customer uses it for |
|---|---|---|
| **Snapshots** | Manual point-in-time copy of a disk or VM | Ad-hoc save before a change; restore a volume or create a template |
| **VM Backup (CMP product)** | Scheduled, billable backup service on a VM | Automated retention, restore, and billing via the **VM Backup** package |
| **CloudStack Backup & Recovery (B&R)** | CloudStack framework (4.14+, mature from 4.20) with provider plugins | Backend that CMP talks to when **Enable Provider Backup** is on |

**Snapshots** and **VM Backup** are related — on one backend path CMP **automates CloudStack snapshots as backup** — but they are **different features** in CMP. See [Snapshots](/orchestrator-features/cloudstack/snapshots) for manual snapshot actions.

---

## Two VM Backup backends in CMP

You choose **one backend for the entire CloudStack connection** — not per VM. The setting is **Enable Provider Backup** in [Cloud Provider Setup](/orchestrators/cloudstack/connecting). All VMs on that connection use the same backup path.

| **Enable Provider Backup** | Backup backend in CMP |
|---|---|
| `No` | Automated VM Snapshot as Backup only |
| `Yes` | CloudStack B&R-Based Backup only |

CMP exposes the same customer actions (create, schedule, restore) on the VM — the difference is what runs behind the API.

```text
Customer (CMP VM screen)
        |
        v
   CloudStack APIs
        |
   +----+----+
   |         |
   v         v
Automated VM     CloudStack B&R-
Snapshot as      Based Backup
 Backup          (B&R framework +
(scheduled       provider plugin)
 snapshots)
```

| Backend | When | CMP setting | Page |
|---|---|---|---|
| **Automated VM Snapshot as Backup** | Typical for CloudStack **before 4.20**, or when no B&R plugin is configured | **Enable Provider Backup** = `No` | [Automated VM Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-vm-snapshot-as-backup) |
| **CloudStack B&R-Based Backup** | CloudStack **4.20+** with B&R configured (Veeam, Networker, NAS, and so on) | **Enable Provider Backup** = `Yes` | [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup) |

:::warning[One backup backend per CloudStack setup]

Backup mode is **application-wide** for each CloudStack connection. If **Enable Provider Backup** is `No`, CMP uses **Automated VM Snapshot as Backup only** — CloudStack B&R-Based Backup is not available for that setup. If it is `Yes`, CMP uses **CloudStack B&R-Based Backup only** — snapshot-as-backup is not available.

You cannot enable both on the same CloudStack connection. To switch backends, change **Enable Provider Backup** in [Cloud Provider Setup](/orchestrators/cloudstack/connecting) and follow [Switching to CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup#switching-to-cloudstack-br-based-backup).

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
| [Automated VM Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-vm-snapshot-as-backup) | Scheduled CloudStack snapshots as VM recovery; snapshot types and limits |
| [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup) | CloudStack B&R framework; provider plugins; switching from snapshot-as-backup |
| [VM Backup (CMP workflows)](/orchestrator-features/cloudstack/backup/vm-backup) | Customer portal flows — *documentation in progress* |

---

## Related

* [Backup and Recovery (overview)](/overview/backup-and-recovery)
* [Snapshots](/orchestrator-features/cloudstack/snapshots) — manual volume and instance snapshots
* [CloudStack Features](/orchestrator-features/cloudstack/)
* [CloudStack Setup](/orchestrators/cloudstack/)
