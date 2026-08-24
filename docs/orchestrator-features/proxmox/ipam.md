---
sidebar_position: 3
title: "IPAM"
tags: ["orchestrator", "proxmox", "features", "ipam", "ip-address"]
---

# IPAM (Proxmox)

**IPAM** (IP Address Management) for Proxmox in CMP is a **CMP-level** capability. Proxmox does not provide the IP pool, allocation tracking, or billing subscription lifecycle that CMP uses for customer VMs — CMP owns that layer.

**Full admin setup:** [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam) · **CMP path:** **Settings → Orchestrator → Networks IP Address**

---

## CMP-level, not Proxmox-native

| Layer | Responsibility |
|---|---|
| **Proxmox** | Provides the **network interface** (Linux bridge) the VM attaches to. It does not manage CMP’s allocatable IP catalogue. |
| **CMP IPAM** | Builds and tracks the **IP pool**, marks available / allocated addresses, and drives **IP billing** when enabled on the synced network |

Admins define subnet fields (**Cidr**, **Subnet Mask**, **Gateway IP**) when importing or editing a network in CMP. CMP then **generates** (or accepts manually entered) IPs into the IPAM list for that network.

```text
Synced Proxmox bridge  +  CMP subnet / Generate IPs  →  CMP IPAM pool  →  Allocate on VM create / attach
```

:::info[Why CMP owns IPAM]

Proxmox networking is bridge-centric. CMP needs a consistent way to show customers which IPs are free, assign an IP at provision time, and optionally create an **IP Address subscription**. That bookkeeping lives in CMP — see [Networks IP Address (IPAM)](/orchestrators/proxmox/networks-and-ipam#networks-ip-address-ipam).

:::

---

## What IPAM covers

* **Generate IPs** from CIDR / mask / gateway (or enter IPs manually)
* Pool visibility under **Networks IP Address** (available vs allocated)
* Allocation when a customer creates a VM or attaches a billable network
* Optional **Associated IP Address** for **display** of public ↔ private NAT mapping (manual today — CMP does not configure NAT on Proxmox)

:::important[Admin responsibility]

CMP does **not** validate that mapped IPs match the real VLAN / routing on Proxmox. Keep pools aligned with your actual network design. Associated IP / NAT automation is on the [Proxmox roadmap](/orchestrator-features/proxmox/roadmap#associated-ip--nat-mapping-automation).

:::

---

## Billing vs IPAM

| Concern | Where |
|---|---|
| **Which IPs exist / are free** | CMP IPAM (this feature) |
| **How much an IP costs** | [IP Address package](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages) |
| **Whether this network creates an IP subscription** | Per-network **enable IP billing** — [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing) |

IPAM can track addresses even when billing on that network is **No**. Billing only starts when IP billing is **Yes** and the package is priced.

---

## Prerequisite: sync the network first

IPAM is attached to a **synced** Proxmox network. CMP does not provision the bridge — see [Networks (sync only)](/orchestrator-features/proxmox/networks).

1. Create the Linux bridge on Proxmox
2. [Import / sync](/orchestrators/proxmox/networks-and-ipam#import-or-sync-networks) into CMP
3. Generate or enter the IP pool → manage under **Networks IP Address**

---

## Related

* [Proxmox VE Features](/orchestrator-features/proxmox/)
* [Networks](/orchestrator-features/proxmox/networks)
* [Networks and IPAM (setup)](/orchestrators/proxmox/networks-and-ipam)
* [IP Address packages](/orchestrators/proxmox/offering-sync-and-packages/ip-address/)
* [Shared Network IP Billing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing)
* [Upcoming & Roadmap](/orchestrator-features/proxmox/roadmap) — Associated IP / NAT automation is on the roadmap; SDN and backup destinations are under development
