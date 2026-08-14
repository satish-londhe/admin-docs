---
sidebar_position: 2
title: "Networks"
tags: ["orchestrator", "proxmox", "features", "networks", "sync"]
---

# Networks (Proxmox)

How networking works for **Proxmox VE** in CMP after the provider is connected.

**Full admin setup:** [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam)

---

## Sync only — no network provisioning from CMP

CMP does **not** create, delete, or redesign Proxmox networks (Linux bridges, VLANs, SDN objects) on the hypervisor.

| Who does it | What happens |
|---|---|
| **Admin on Proxmox** | Creates the **Linux bridge** (for example `vmbr0`) and physical / VLAN wiring on the node(s) |
| **Admin in CMP** | **Imports / syncs** that existing bridge into CMP under **Settings → Orchestrator → Networks** |
| **CMP at VM create** | Attaches the customer VM NIC to a network that was **already imported** — it does not invent a new Proxmox network |

```text
Proxmox (create bridge)  →  CMP (import / sync)  →  Customer (use network on VM)
```

:::important[No create-network flow in CMP]

There is no CMP action that provisions a new network on Proxmox. If the bridge does not exist on Proxmox first, sync / import cannot offer a usable network for VMs.

:::

---

## What CMP does after sync

After import, CMP stores CMP-side metadata used for offering and billing:

* Zone and network category
* **Available to all** vs manual allocate to a customer
* **IP billing** Yes/No and **IP Address Type** (Public / Private)
* Optional VLAN / model fields
* Link to the [CMP IPAM](/orchestrator-features/proxmox/ipam) pool for that network

Customers then select the synced network when creating or attaching NICs to VMs. Billing for IPs on that network follows [Shared Network IP Billing (Proxmox)](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing).

---

## What you must do on Proxmox

1. Configure a **Linux bridge** (not a bare physical NIC) — see [Linux bridge vs physical NIC](/orchestrators/proxmox/networks-and-ipam#linux-bridge-vs-physical-nic)
2. Ensure the bridge is available on nodes that can receive VMs ([Node Selection Algorithm](/orchestrators/proxmox/node-selection-algorithm))
3. Import that bridge into CMP — [Import or sync networks](/orchestrators/proxmox/networks-and-ipam#import-or-sync-networks)

:::warning[Proxmox SDN]

**Proxmox SDN** is **not** available in CMP yet. It is **under development** and will be available in an **upcoming version**. Until then, use conventional Linux bridges. Details: [Upcoming — Proxmox SDN](/orchestrator-features/proxmox/roadmap#networking--proxmox-sdn).

:::

---

## Related

* [Proxmox VE Features](/orchestrator-features/proxmox/)
* [IPAM](/orchestrator-features/proxmox/ipam)
* [Networks and IPAM (setup)](/orchestrators/proxmox/networks-and-ipam)
* [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing)
* [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap)
