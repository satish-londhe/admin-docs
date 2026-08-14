---
sidebar_position: 4
title: "Backup"
tags: ["orchestrator", "proxmox", "features", "backup"]
---

# Backup (Proxmox)

Virtual machine **backup** is available for **Proxmox VE** in CMP. Customers and admins can use Proxmox backups through CMP for VMs on the connected provider.

:::info[Documentation in progress]

Full feature documentation for **Proxmox Backup** is **in progress** — customer portal flows (create, schedule, restore), admin configuration, retention, and billing notes will be added here.

Until then, note the current storage behaviour below and track destination improvements on the [roadmap](/orchestrator-features/proxmox/roadmap#backups).

:::

---

## Current behaviour (summary)

Today, Proxmox backups created through the CMP / Proxmox path are stored on the **same storage where the VMs are located** (on-host / same datastore). That is suitable for limited use; it does **not** provide off-host protection by itself.

| Item | Status |
|---|---|
| **Backup feature in CMP** | Available |
| **On-host / same-datastore destination** | Current behaviour |
| **External storage (NFS/SMB)** | [Roadmap](/orchestrator-features/proxmox/roadmap#1-external-storage-nfssmb) |
| **Proxmox Backup Server (PBS)** | [Roadmap](/orchestrator-features/proxmox/roadmap#2-proxmox-backup-server-pbs) |

:::note[Snapshots vs backup]

**VM Snapshot** is a separate package and feature from backup. See [VM Snapshot packages](/orchestrators/proxmox/offering-sync-and-packages/vm-snapshot).

:::

---

## Related

* [Proxmox VE Features](/orchestrator-features/proxmox/)
* [Proxmox roadmap — Backups](/orchestrator-features/proxmox/roadmap#backups) — external storage and PBS
* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting)
* [Proxmox VE Setup](/orchestrators/proxmox/)
