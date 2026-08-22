---
sidebar_position: 8
title: "Backup Architecture"
tags: ["faq", "platform", "backup", "cloudstack", "veeam", "openstack"]
---

# Backup Architecture FAQ

Concept-only answers. Full comparison: [Backup and Recovery](/overview/backup-and-recovery).

---

## How do CloudStack VMs get backed up in CMP?

When **Backup and Recovery is configured on CloudStack**, CMP uses **CloudStack APIs**. The customer schedules, runs, and restores backups **from the VM in CMP** — no agents, no separate backup dashboard.

CloudStack may use a backend plugin (Veeam, Networker, NAS) at the platform level — that is operator infrastructure, not something the customer configures. See [CloudStack Backup and Recovery](https://docs.cloudstack.apache.org/en/4.22.1.1/adminguide/backup_and_recovery.html).

---

## What is Veeam VSPC in CMP?

A **separate backup product**. CMP creates the VSPC account and credentials. The customer then **manually** installs agents and sets up backup jobs in the **Veeam dashboard**.

It is **not** automatic backup for CloudStack VMs deployed through CMP.

---

## Will CloudStack VM backup use our Veeam VSPC integration?

**No — not automatically.** VSPC and CloudStack-integrated backup are **different models**:

| | CloudStack VM backup | Veeam VSPC |
|---|---|---|
| Managed from | CMP on the VM | Veeam dashboard |
| Agents | Not required | Customer installs |
| CMP role | Backup via CloudStack APIs | Account + credentials only |

---

## Do we need CloudStack integrated with Veeam separately?

For **integrated CloudStack VM backup**, Backup and Recovery is configured on **CloudStack** by the platform operator (CloudStack admin). That is separate from connecting **Veeam VSPC** in CMP.

Customers using CloudStack-integrated backup do **not** use the VSPC dashboard for those VMs.

---

## Can a customer use both?

Yes — as **two independent services**:

* VM backup through **CloudStack/OpenStack** in CMP
* A separate **Veeam VSPC** plan with manual setup in Veeam

They are not one combined workflow.

---

## What about OpenStack?

Same concept as CloudStack: when backup/snapshot services are available on OpenStack, CMP integrates through **OpenStack APIs** — customer works from CMP, not from a separate agent-based product.

---

## Related

* [Backup and Recovery](/overview/backup-and-recovery)
* [CloudStack VM Backup (admin)](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup)
* [Veeam (VSPC)](/orchestrators/veeam/)
