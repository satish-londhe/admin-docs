---
sidebar_position: 4
title: "VPN Connection"
tags: ["orchestrator", "cloudstack", "features", "networks", "vpc", "vpn", "ipsec", "site-to-site"]
---

# VPN Connection

A **VPN Connection** creates the IPsec tunnel between a **[VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway)** (customer side) and a **[VPN Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-gateway)** (CloudStack VPC side).

:::important[Site-to-Site only]

**VPN Connection** is not used for **[Remote Access VPN](/orchestrator-features/cloudstack/networks/remote-access-vpn/)**. Remote Access uses **Source NAT IP → Enable VPN** + **VPN User**.

:::

:::tip[CMP vs CloudStack]

* **CMP** — open VPC → **VPN Connections** tab → **+ Create Site To Site VPN**.
* **CloudStack** — **VPC → Configure → Site-to-Site VPNs → VPN Connection → Create VPN Connection**.

:::

---

## Relationship

```text
VPN Customer Gateway
          |
          | VPN Connection
          |
CloudStack VPN Gateway
          |
          v
        VPC
```

---

## Limits

CloudStack supports up to **8** Site-to-Site **VPN connections**. A **VPN Customer Gateway** can connect to **only one** VPN gateway at a time.

---

## Create VPN Connection (CMP)

**CMP path:** **Networking → Networks → VPC Network** → open the VPC → **VPN Connections** tab → **+ Create Site To Site VPN**

![Screenshot: CMP — VPC VPN Connections empty state](/img/screenshots/cmp-vpc-vpn-connections.png)

Requires a **[VPN Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-gateway)** on the VPC first.

![Screenshot: CMP — Create VPN Connection](/img/screenshots/cmp-create-vpn-connection.png)

**VPN Customer Gateway**
*Required.* Select an existing customer gateway. Use **+ Create Customer Gateway** in the dialog to add one without leaving the flow — see [VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway).

**Passive**
*Optional.* Enable when connecting **two CloudStack VPCs** — select Passive on **one** VPC only (the side that waits for the peer to initiate). Leave unchecked for customer firewall → CloudStack VPC.

Click **Submit**.

---

## Create VPN Connection (CloudStack reference)

**CloudStack path:** **VPC → Configure → Site-to-Site VPNs** → **VPN Connection** view → **Create VPN Connection**

Or: **Network → VPN Connections → Add VPN Connection**

| Field | Detail |
|---|---|
| **VPN Customer Gateway** | Customer firewall public IP and private CIDRs |
| **VPN Gateway** | CloudStack VPC VPN gateway (implicit when created from VPC context) |
| **Passive** | One side only for CloudStack VPC ↔ VPC |

After creation, CloudStack shows **IP Address**, **Gateway**, **State**, **IPsec Preshared Key**, **IKE Policy**, and **ESP Policy**.

---

## After creating the connection

1. Configure the **customer firewall** with the CloudStack VPN Gateway **public IP** as peer
2. Match **PSK**, **IKE**, and **ESP** with the VPN Customer Gateway
3. Verify IKE Phase 1 and IPsec Phase 2
4. Test from a customer LAN host to a VM private IP
5. Adjust **Network ACL** if needed — [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network)

---

## Restart or remove (CloudStack reference)

**CloudStack path:** **VPC → Configure → Site-to-Site VPNs** → **VPN Connection** → select connection

| Action | Use when |
|---|---|
| **Reset VPN connection** | Tunnel stuck — renegotiates IKE/IPsec |
| **Delete VPN connection** | Remove before reconfiguring gateways |

---

## CloudStack-to-CloudStack

1. **VPN Gateway** on each VPC (CMP: **VPN Gateway** tab on each VPC)
2. **VPN Customer Gateway** on each side for the **other** VPC's gateway IP and CIDR
3. **VPN Connection** on VPC A with **Passive**; gateway points to VPC B
4. **VPN Connection** on VPC B **without** Passive; gateway points to VPC A
5. Both reach **Connected** within about 30 seconds

See [Site-to-Site VPN — CloudStack-to-CloudStack](/orchestrator-features/cloudstack/networks/site-to-site-vpn/#cloudstack-to-cloudstack-vpn).

---

## Related

* [Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/)
* [VPN Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-gateway)
* [VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway)

CloudStack reference: [Creating a VPN Connection](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html#creating-a-vpn-connection).
