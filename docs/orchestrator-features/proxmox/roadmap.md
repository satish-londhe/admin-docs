---
sidebar_position: 5
title: "Proxmox Roadmap"
tags: ["orchestrator", "proxmox", "features", "roadmap", "sdn", "backup", "pbs"]
---

# Proxmox roadmap

Planned and not-yet-implemented Proxmox capabilities in CMP. Items below are **not available** in production CMP today unless noted otherwise.

Supported features today: [Proxmox VE Features](/orchestrator-features/proxmox/).

:::info[Current networking]

Today CMP maps **Proxmox bridges / interfaces** into CMP via [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam) — see also [Networks (sync only)](/orchestrator-features/proxmox/networks) and [IPAM (CMP-level)](/orchestrator-features/proxmox/ipam). Full **Proxmox SDN** integration is on this roadmap.

:::

---

## Networking — Proxmox SDN

| Status | **Not implemented** |
|---|---|
| Goal | Native CMP support for Proxmox **SDN** (zones, vnets, and related SDN objects) |

**Today:** Import and IPAM use conventional Proxmox networks (for example Linux bridges such as `vmbr0`). See [Networks](/orchestrator-features/proxmox/networks) and [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam).

**Planned:** Deeper integration with Proxmox SDN so CMP can manage or consume SDN zones and virtual networks without treating SDN as a separate, unsupported path.

---

## Associated IP / NAT mapping (automation)

| Status | **Roadmap** (manual today) |
|---|---|
| Today | Admins set **Associated IP Address** on private IPAM rows for **display only** — see [Associated IP Address (NAT representation)](/orchestrators/proxmox/networks-and-ipam#associated-ip-address-nat-representation) and [IPAM](/orchestrator-features/proxmox/ipam) |
| Gap | CMP does not create or discover NAT; private ↔ public mapping is manual |

### Suggested automation (open to implement)

Practical options, from lighter to stronger:

| Approach | What CMP could do | Notes |
|---|---|---|
| **1. Bulk CSV / import mapping** | Admin uploads `private_ip,public_ip` pairs for a network | Fast win; still admin-owned NAT on the edge |
| **2. 1:1 pool pairing** | Define a **public pool** next to a **private pool** and auto-assign associated public IPs in order when private IPs are generated | Good when NAT is static 1:1 and ranges align |
| **3. Edge / firewall API sync** | Read DNAT / SNAT rules from a supported firewall or Proxmox helper API and fill **Associated IP Address** | Needs a reliable source of truth; hardest but least drift |
| **4. Customer-visible only after verify** | Optional health check (ICMP / TCP probe of public IP) before showing the association in the portal | Improves trust; does not configure NAT |

**Recommended first step:** implement **(1) bulk import** and **(2) 1:1 pool pairing** in CMP. Keep NAT configuration on Proxmox / the edge; use CMP only to keep the **representation** accurate for customers until a sync source (3) is available.

---

## Backups

### Current behaviour

Backup is an **available** Proxmox feature in CMP — see [Backup](/orchestrator-features/proxmox/backup) (feature documentation **in progress**).

Proxmox backups created through the current CMP / Proxmox path are stored on the **same storage where the VMs are located** (on-host / same datastore). That is suitable only for limited use; it does not provide off-host protection.

### Planned improvements

| Option | Status | Summary |
|---|---|---|
| [External storage (NFS/SMB)](#1-external-storage-nfssmb) | **Roadmap** | Separate backup destination without PBS |
| [Proxmox Backup Server (PBS)](#2-proxmox-backup-server-pbs) | **Roadmap** | Dedicated backup platform with incremental / dedupe features |

#### 1. External storage (NFS/SMB)

Configure a **separate server or storage** (for example **NFS** or **SMB**) as the backup destination.

* Provides **off-host** backups
* Does **not** require Proxmox Backup Server
* Suitable for a **basic** backup requirement

#### 2. Proxmox Backup Server (PBS)

Deploy **Proxmox Backup Server** as a dedicated backup solution.

Typical PBS capabilities (when integrated):

* Incremental backups
* Deduplication
* Verification
* Retention management

Recommended when you need a **more robust and scalable** backup design.

:::tip[Guidance]

* **Basic off-host need** → prefer roadmap item **External storage (NFS/SMB)**
* **Enterprise / scalable backups** → prefer roadmap item **Proxmox Backup Server (PBS)**

:::

---

## Related

* [Proxmox VE Features](/orchestrator-features/proxmox/)
* [Backup](/orchestrator-features/proxmox/backup) — available today; docs in progress
* [Networks](/orchestrator-features/proxmox/networks)
* [IPAM](/orchestrator-features/proxmox/ipam)
* [Connecting CMP to Proxmox](/orchestrators/proxmox/connecting)
* [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam)
* [Proxmox VE Setup](/orchestrators/proxmox/)
