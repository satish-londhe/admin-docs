---
sidebar_position: 5
title: "Backup and Recovery"
tags: ["overview", "backup", "cloudstack", "openstack", "veeam"]
---

# Backup and Recovery

CMP offers **two different backup models**. They are easy to confuse because both can involve Veeam — but the **customer experience is completely different**.

:::important[Read this first]

| Model | Customer experience |
|---|---|
| **CloudStack / OpenStack backup** | Fully integrated in CMP on the VM — schedule, run, restore. **No agents. No manual backup setup.** |
| **Veeam VSPC in CMP** | Separate backup product — CMP creates account and dashboard access. Customer **manually** installs agents and configures everything in Veeam. |

:::

---

## Model 1 — CloudStack / OpenStack (integrated)

When your cloud platform has **Backup and Recovery configured** on CloudStack (or the equivalent on OpenStack), CMP uses **CloudStack / OpenStack APIs** to manage backups.

```text
Customer
   |
   v
 CMP (VM backup actions)
   |
   v
 CloudStack / OpenStack APIs
   |
   v
 Backup runs on the platform
 (operator configured backend)
```

### What the customer does

Everything from **CMP** on their VM:

* Create backup
* Schedule backup
* Restore
* Stop / manage retention (as exposed in CMP)

### What the customer does **not** do

* Install backup agents
* Log into a separate backup dashboard to configure jobs
* Manually wire backups to each VM

Backup is **automated through the orchestrator integration**. The customer treats it like any other VM feature in CMP.

### CloudStack note

CloudStack’s [Backup and Recovery framework](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/backup_and_recovery.html) supports provider plugins (for example Veeam Backup & Replication on VMware, Networker or NAS on KVM). That backend is configured by the **cloud operator on CloudStack** — not by the end customer in CMP.

From the customer’s perspective: **CMP → CloudStack → backup happens**. They do not manage Veeam or other backup products directly for this path.

OpenStack follows the same idea: orchestrator-integrated backup and snapshots through CMP when your OpenStack cloud exposes them.

Admin setup and packages: [CloudStack VM Backup](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup) · [OpenStack Snapshot & Backup](/orchestrators/openstack/snapshot-backup)

---

## Model 2 — Veeam VSPC (standalone service)

**Veeam Service Provider Console (VSPC)** in CMP is a **separate backup offering** — not automatic backup for CloudStack or OpenStack VMs.

```text
Customer buys Veeam plan in CMP
   |
   v
 CMP creates VSPC account + credentials
   |
   v
 Customer logs into Veeam dashboard
   |
   v
 Customer installs agents, creates jobs, manages backups manually
```

### What CMP automates

* VSPC **account** creation
* **Credentials** (delivery and reset in Stack Console)
* **Quotas** and plan changes

### What CMP does **not** automate

* Agent installation on VMs
* Backup job creation or policies
* Linking backups to CloudStack VMs automatically

The customer (or your operations team) does **all backup configuration in the Veeam dashboard**.

Details: [Veeam (VSPC) setup](/orchestrators/veeam/) · [Veeam Features](/orchestrator-features/veeam/)

---

## Side-by-side comparison

| | **CloudStack / OpenStack backup** | **Veeam VSPC in CMP** |
|---|---|---|
| **Tied to VM in CMP?** | Yes — backup on compute VMs | No — separate product |
| **Where customer works** | CMP VM screen | Veeam dashboard (after CMP login redirect) |
| **Agents required?** | No | Yes — customer installs |
| **Backup jobs** | Managed via CloudStack/OpenStack APIs | Customer configures manually in Veeam |
| **CMP provides** | Backup / schedule / restore UI | Account, credentials, quotas only |
| **Typical buyer** | Customer with CloudStack/OpenStack VMs | Customer buying dedicated backup service |

---

## Why customers get confused

Both paths can involve **Veeam** at the infrastructure level:

* **CloudStack backup** — CloudStack may use a **Veeam plugin** behind the scenes ([CloudStack B&R docs](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/backup_and_recovery.html)). The customer **never** interacts with Veeam directly; CMP uses CloudStack APIs.
* **Veeam VSPC** — Customer **explicitly** uses Veeam as a standalone service from CMP.

**Buying or connecting Veeam VSPC does not enable integrated VM backup on CloudStack VMs.**  
**Having CloudStack backup configured does not replace a Veeam VSPC subscription.**

A customer can use **both** — but they remain **two independent systems**.

---

## Which model answers the customer question?

**“How do VMs deployed in CMP get backed up?”**  
→ **CloudStack / OpenStack integrated backup** (when Backup and Recovery is configured on the platform).

**“How do we sell standalone Veeam backup with VSPC plans?”**  
→ **Veeam VSPC** — separate orchestrator; manual agent and job setup in Veeam.

---

## Further reading (admin setup)

| Topic | Page |
|---|---|
| CloudStack VM Backup (packages & admin) | [VM Backup](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup) |
| CloudStack backup concepts | [Backup](/orchestrator-features/cloudstack/backup/) |
| Automated VM Snapshot as Backup | [Automated VM Snapshot as Backup](/orchestrator-features/cloudstack/backup/automated-vm-snapshot-as-backup) |
| CloudStack B&R-Based Backup | [CloudStack B&R-Based Backup](/orchestrator-features/cloudstack/backup/cloudstack-br-based-backup) |
| Veeam VSPC setup | [Veeam (VSPC)](/orchestrators/veeam/) |
| FAQ | [Backup architecture](/faq/platform/backup-architecture) |

CloudStack reference: [About Backup And Recovery](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/backup_and_recovery.html)

---

## Related

* [Supported Orchestrators](/overview/supported-orchestrators)
* [Orchestrator Features](/orchestrator-features/)
