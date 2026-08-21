---
sidebar_position: 1
title: "Site-to-Site VPN"
tags: ["orchestrator", "cloudstack", "features", "networks", "vpc", "vpn", "ipsec", "site-to-site"]
---

# Site-to-Site VPN

**Site-to-Site VPN** connects an **entire customer private network** to a CloudStack **VPC** over IPsec. Users on the customer LAN reach VPC VMs through the customer firewall — **no VPN client** on each PC.

Use this when:

* A customer office (`192.168.10.0/24`) needs access to CloudStack VPC (`10.10.0.0/16`)
* The customer has a VPN-capable firewall (Palo Alto, FortiGate, Cisco, strongSwan, etc.)
* Two CloudStack VPCs need private connectivity

:::important[One-line summary]

**Customer network → VPC** = **VPN Customer Gateway** + **VPC VPN Gateway** + **VPN Connection** + customer firewall config.

:::

For **laptop → VPC**, use **[Remote Access VPN](/orchestrator-features/cloudstack/networks/remote-access-vpn/)** instead — not VPN Customer Gateway.

:::tip[CMP vs CloudStack]

* **This section** — customer workflows in **CMP** (Networking → Networks, VPC detail tabs).
* **CloudStack reference** — same objects in CloudStack UI/API for troubleshooting.

:::

## Architecture

```text
                 CUSTOMER                         CLOUDSTACK
        +------------------------+        +------------------------+
        |  192.168.10.0/24       |        |  VPC 10.10.0.0/16      |
        |  PCs / Servers         |        |                        |
        |        |               |        |    VPN Gateway         |
        |        v               |        |    Public IP           |
        |  [Customer Firewall]   |        |         |              |
        +--------+---------------+        |         v              |
                 |                        |    VM 10.10.1.10       |
          Public IP (customer VPN gateway)         +------------------------+
                 |                                  ^
                 |         IPsec tunnel             |
                 +==================================+
```

Customer PCs access `10.10.1.10` via normal routing — traffic goes to the customer firewall, through the tunnel, to the CloudStack virtual router.

---

## CMP — VPC tabs

Open a VPC under **Networking → Networks → VPC Network**. Site-to-Site objects live on these tabs:

| CMP tab | Object | Action |
|---|---|---|
| **VPN Gateway** | CloudStack VPN Gateway | **+ Create Site To Site VPN** — [VPN Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-gateway) |
| **VPN Connections** | VPN Connection | **+ Create Site To Site VPN** — link customer gateway — [VPN Connection](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-connection) |
| **Public IP Addresses** | Source NAT IP | **Remote Access VPN** only — not Site-to-Site |

**Networks → VPN Customer Gateway** (top-level tab) creates the customer-side endpoint before or during connection setup.

---

## CMP workflow

```text
1. Create VPC + tier + VM
       ↓
2. Networks → VPN Customer Gateway (customer IP + private CIDRs)
       ↓
3. VPC → VPN Gateway tab → + Create Site To Site VPN
       ↓
4. VPC → VPN Connections tab → + Create Site To Site VPN
       ↓
5. Select VPN Customer Gateway (+ Create Customer Gateway if needed)
       ↓
6. Configure customer firewall (peer = CloudStack VPN Gateway public IP)
       ↓
7. Verify tunnel → test customer LAN → VM private IP
```

---

## CloudStack UI — reference

| CloudStack UI location | What it is | Site-to-Site? |
|---|---|---|
| **Network → VPN Customer Gateway** | Customer firewall public IP + private CIDRs | ✅ **Yes** |
| **Network → Site-to-Site VPN** | VPN Gateway list / add gateway | ✅ **Yes** |
| **VPC → VPN Gateway** | CloudStack-side IPsec endpoint | ✅ **Yes** |
| **Network → VPN Connections** | Links customer gateway ↔ CloudStack gateway | ✅ **Yes** |
| **Network → VPN Users** | Remote Access user credentials | ❌ No |
| **Source NAT IP → VPN tab** | Remote Access VPN | ❌ No |
| **VPC → Private Gateway** | Private network routing (not VPN) | ❌ No |

---

## CloudStack objects

| Object | Side | Page |
|---|---|---|
| **VPN Customer Gateway** | Customer / remote | [VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway) |
| **VPN Gateway** | CloudStack VPC | [VPN Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-gateway) |
| **VPN Connection** | Both | [VPN Connection](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-connection) |

---

## End-to-end workflow (CloudStack order)

```text
1. Create VPC + tier + VM
       ↓
2. Create VPN Customer Gateway (customer IP + private CIDRs)
       ↓
3. Create VPN Gateway for VPC (CloudStack side)
       ↓
4. Create VPN Connection
       ↓
5. Configure customer firewall (peer = CloudStack VPN Gateway IP)
       ↓
6. Verify IKE / ESP
       ↓
7. Test customer LAN → VM private IP
       ↓
8. Network ACL allows remote CIDR
```

CloudStack documented order: VPC → VPN Customer Gateway → VPN Gateway → VPN Connection. CMP follows the same objects — see [CMP workflow](#cmp-workflow) above.

Reference: [CloudStack — Site-to-Site VPN](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html#setting-up-a-site-to-site-vpn-connection).

---

## Supported customer endpoints

CloudStack documents these remote datacenter endpoints:

| Device | Requirement |
|---|---|
| **Cisco ISR** | IOS 12.4 or later |
| **Juniper J-Series** | JunOS 9.5 or later |
| **CloudStack virtual routers** | VPC-to-VPC Site-to-Site |

Other Cisco or Juniper devices on supported OS versions are generally expected to work. Palo Alto, FortiGate, and **strongSwan** are commonly used in practice — match IKE/ESP parameters with the VPN Customer Gateway.

---

## Limits

| Limit | Detail |
|---|---|
| **VPN connections per VPC** | Up to **8** Site-to-Site VPN connections |
| **Customer gateway** | One VPN Customer Gateway connects to **one** VPN gateway at a time |

---

## Pages in this section

| Page | Description |
|---|---|
| [VPN Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-gateway) | CloudStack-side endpoint for the VPC |
| [VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway) | Customer firewall IP, CIDR List, IPsec params |
| [VPN Connection](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-connection) | Bind customer gateway to CloudStack VPN gateway |

---

## CloudStack-to-CloudStack VPN

Connect two CloudStack VPCs with the same Site-to-Site objects:

```text
CloudStack VPC A                    CloudStack VPC B
10.10.0.0/16                        10.20.0.0/16
      |                                   |
 VPN Gateway                         VPN Gateway
      |                                   |
      +=========== IPsec tunnel ===========+
```

1. **VPN Gateway** on each VPC
2. **VPN Customer Gateway** on each side pointing to the **other** gateway's public IP and CIDR
3. **VPN Connection** on each side — enable **Passive** on **one** VPC only; the other initiates
4. Wait for both connections to reach **Connected** (typically ~30 seconds)

Supported on all hypervisors. Details: [VPN Connection](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-connection).

---

## Testing with a Linux PC

To test without hardware firewall, run **strongSwan** on a Linux machine as the customer VPN gateway. The PC's static public IP becomes **Gateway** in VPN Customer Gateway; a test LAN CIDR goes in **CIDR List**. This validates Site-to-Site — it is **not** Remote Access VPN.

---

## Related

* [Remote Access VPN](/orchestrator-features/cloudstack/networks/remote-access-vpn/)
* [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network)
* [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
