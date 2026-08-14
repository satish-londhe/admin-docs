---
sidebar_position: 4
title: "Backup"
tags: ["orchestrator", "proxmox", "features", "backup"]
---

# Backup (Proxmox)

Virtual machine **backup** is available for **Proxmox VE** in CMP. Customers and admins can use Proxmox backups through CMP for VMs on the connected provider.

:::info[Documentation in progress]

Full feature documentation for **Proxmox Backup** is **in progress** — customer portal flows (create, schedule, restore), admin configuration, retention, and billing notes will be added here.

Until then, note the current storage behaviour below. **External storage** and **PBS** destinations are **under development** and will be available in an **upcoming version** — see [Upcoming — Backups](/orchestrator-features/proxmox/roadmap#backups--destination-improvements).

:::

---

## Current behaviour (summary)

Today, Proxmox backups created through the CMP / Proxmox path are stored on the **same storage where the VMs are located** (on-host / same datastore). That is suitable for limited use; it does **not** provide off-host protection by itself.

| Item | Status |
|---|---|
| **Backup feature in CMP** | Available |
| **On-host / same-datastore destination** | Current behaviour |
| **External storage (NFS/SMB)** | Under development — available in an upcoming version |
| **Proxmox Backup Server (PBS)** | Under development — available in an upcoming version |

:::note[Snapshots vs backup]

**VM Snapshot** is a separate package and feature from backup. See [VM Snapshot packages](/orchestrators/proxmox/offering-sync-and-packages/vm-snapshot).

:::

---

## Related

* [Proxmox VE Features](/orchestrator-features/proxmox/)
* [Upcoming — Backups](/orchestrator-features/proxmox/roadmap#backups--destination-improvements) — external storage and PBS (under development)
* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting)
* [Proxmox VE Setup](/orchestrators/proxmox/)
