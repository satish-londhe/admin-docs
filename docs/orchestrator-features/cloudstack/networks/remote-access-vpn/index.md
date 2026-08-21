---
sidebar_position: 1
title: "Remote Access VPN"
tags: ["orchestrator", "cloudstack", "features", "networks", "vpc", "vpn", "remote-access", "isolated"]
---

# Remote Access VPN

**Remote Access VPN** (Road Warrior) lets an **individual user** connect from a laptop or PC over the internet to private VMs on a **VPC** or **Isolated network** — without exposing VM private IPs to the public internet.

Use this when:

* An administrator needs SSH or RDP to a private VM
* A developer needs access to internal application servers
* A support engineer needs temporary access from home or office

:::tip[CMP vs CloudStack]

* **This section** — customer and admin workflows in **CMP** (Networking → Networks).
* **CloudStack reference** — same objects in the CloudStack UI/API when troubleshooting or validating behaviour.

:::

:::important[One-line summary]

**User/laptop → private VM** = **Enable Remote Access VPN on Source NAT public IP** + **VPN User** + L2TP/IPsec client.

Works on **VPC Source NAT IP** and **Isolated network Source NAT IP**.

Do **not** use VPN Customer Gateway, Site-to-Site VPN, VPC VPN Gateway, VPN Connection, or Private Gateway for this scenario.

:::

For **entire office network → cloud**, use **[Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/)** instead.

---

## Supported network types

| Network type | Enable VPN on | CMP tab / path |
|---|---|---|
| **VPC** | VPC **Source NAT** public IP | **Networking → Networks → Public IP Address** (VPC context) or VPC detail |
| **Isolated network** | Isolated **Source NAT** public IP | **Networking → Networks → Public IP Address** |

Both use the same Remote Access VPN model: L2TP/IPsec on the guest network virtual router. Requires a **NATTED** offering with **Remote Access VPN** / **VPN** enabled — not **ROUTED** mode.

Workflows: [VPC](/orchestrator-features/cloudstack/networks/remote-access-vpn/workflow#vpc-workflow) · [Isolated network](/orchestrator-features/cloudstack/networks/remote-access-vpn/workflow#isolated-network-workflow)

---

## Architecture

```text
       Your Laptop / PC
       VPN Client (L2TP/IPsec)
       Public Internet (dynamic or static IP OK)
             |
             | L2TP/IPsec + VPN User credentials
             v
   +-----------------------+
   |  VPC or Isolated net  |
   |  Source NAT Public IP |
   |  Remote Access VPN    |
   |           |           |
   |   Virtual Router      |
   |           |           |
   |   VM private IP       |
   +-----------------------+
```

After connect, the VPN client receives a route to the guest CIDR. Traffic to the VM private IP flows: laptop → VPN tunnel → virtual router → VM.

---

## CMP — what to use

| CMP location | What it is | Laptop test? |
|---|---|---|
| **Networks → VPN Users** | Remote VPN user credentials | ✅ **Yes** |
| **Networks → Public IP Address → Source NAT → Enable VPN** | Remote Access VPN + IPsec PSK | ✅ **Yes** (VPC **or** Isolated) |
| **Networks → VPN Customer Gateway** | Customer firewall for Site-to-Site | ❌ No |

## CloudStack UI — reference

| CloudStack location | What it is | Laptop test? |
|---|---|---|
| **Network → VPN Users** | Remote VPN user credentials | ✅ **Yes** |
| **Guest network / VPC Source NAT IP → VPN tab** | Remote Access VPN endpoint + IPsec PSK | ✅ **Yes** |
| **Network → VPN Customer Gateway** | Site-to-Site customer endpoint | ❌ No |
| **VPC → Site-to-Site VPN / VPN Gateway** | Site-to-Site CloudStack side | ❌ No |
| **VPC → Private Gateway** | Private network routing (not VPN) | ❌ No |

---

## Three pieces of client information

| # | Setting | Source (CMP / CloudStack) |
|---|---|---|
| 1 | **Server IP** | **Source NAT** public IP on the VPC or Isolated network |
| 2 | **IPsec PSK** | Shown after **Enable VPN** on that IP |
| 3 | **Username / password** | **[VPN User](/orchestrator-features/cloudstack/networks/remote-access-vpn/vpn-users)** |

Your laptop's public IP is **not** entered in CMP or CloudStack for Remote Access VPN.

---

## Pages in this section

| Page | Description |
|---|---|
| [Workflow](/orchestrator-features/cloudstack/networks/remote-access-vpn/workflow) | CMP + CloudStack — VPC and Isolated network paths |
| [VPN Users](/orchestrator-features/cloudstack/networks/remote-access-vpn/vpn-users) | Create VPN User in CMP; CloudStack reference |
| [Limitations and Prerequisites](/orchestrator-features/cloudstack/networks/remote-access-vpn/limitations) | CMP prerequisites; **CloudStack-only** global settings and documented limits |

---

## Limitations (summary — CloudStack)

These limits are **documented by Apache CloudStack**, not CMP-specific. Global tuning (`remote.access.vpn.*`) is **CloudStack Global Settings only** — not available in CMP.

See **[Limitations and Prerequisites](/orchestrator-features/cloudstack/networks/remote-access-vpn/limitations)** for full detail.

| Limitation | Detail (CloudStack) |
|---|---|
| **Same source NAT** | Only **one** simultaneous connection per source public IP / NAT subnet (StrongSwan) |
| **Overlapping subnets** | No NAT traversal between client and guest CIDRs |
| **ROUTED networks** | Remote Access VPN **not available** on ROUTED-mode isolated networks |
| **Client location** | VPN client must be **outside** the VPC or Isolated network where VPN is enabled |

---

## Related

* [Workflow](/orchestrator-features/cloudstack/networks/remote-access-vpn/workflow)
* [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network)
* [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network)
* [Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/)
* [Network packages](/orchestrators/cloudstack/offering-sync-and-packages/networks)
* [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
