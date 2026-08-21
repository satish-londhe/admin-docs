---
sidebar_position: 2
title: "VPN Gateway"
tags: ["orchestrator", "cloudstack", "features", "networks", "vpc", "vpn", "ipsec", "site-to-site"]
---

# VPN Gateway

A **VPN Gateway** is the **CloudStack-side** endpoint of a **[Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/)** connection — the public IP your customer's firewall uses as the IPsec **peer**.

:::important[Not for Remote Access VPN]

**VPN Gateway** is for **Site-to-Site VPN** only. In CMP the VPC tab is labelled **VPN Gateway** but creates a **Site to Site VPN** object. For laptop → VPC, use **Public IP Addresses → Source NAT → Enable VPN** — see [Remote Access VPN](/orchestrator-features/cloudstack/networks/remote-access-vpn/).

:::

:::tip[CMP vs CloudStack]

* **CMP** — **Networking → Networks → VPC** → open VPC → **VPN Gateway** tab.
* **CloudStack** — **Network → Site-to-site VPN → Add VPN Gateway** or **VPC → Configure → Site-to-Site VPNs**.

:::

---

## Topology

```text
Customer Firewall                    CloudStack VPC
Public IP (customer side)                    VPN Gateway
       |                              Public IP (CloudStack side)
       |=========== IPsec tunnel ===========|
       |                                       |
VPN Customer Gateway                      VPC private CIDR
```

| Side | Object |
|---|---|
| Customer | [VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway) |
| CloudStack | **VPN Gateway** (this page) |

---

## Create VPN Gateway (CMP)

**CMP path:** **Networking → Networks → VPC Network** → open the VPC → **VPN Gateway** tab → **+ Create Site To Site VPN**

![Screenshot: CMP — VPC VPN Gateway empty state](/img/screenshots/cmp-vpc-vpn-gateway.png)

CMP creates the CloudStack **VPN Gateway** for that VPC. Note the assigned **public IP** — the customer firewall uses it as the **remote peer**.

After creation, continue with [VPN Connection](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-connection).

---

## Create VPN Gateway (CloudStack reference)

**CloudStack path:** **Network → Site-to-site VPN → Add VPN Gateway**

Or: **VPC → Configure → Site-to-Site VPNs** → create VPN Gateway when prompted.

![Screenshot: CloudStack — Add VPN Gateway](/img/screenshots/cloudstack-add-vpn-gateway.png)

**VPC**
*Required.* Select the target VPC.

Click **OK**. CloudStack assigns a **public IP** to the VPN gateway.

---

## After creating the VPN Gateway

1. Create a **[VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway)** (customer public IP + private CIDRs) — **Networks → VPN Customer Gateway** in CMP if not already created
2. Create a **[VPN Connection](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-connection)** on the VPC **VPN Connections** tab
3. Configure the customer firewall:
   * **Peer** = CloudStack VPN Gateway public IP
   * Matching PSK and IKE/ESP parameters
   * Local customer subnets and remote VPC CIDR

---

## Related

* [Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/)
* [VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway)
* [VPN Connection](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-connection)

CloudStack reference: [Creating a VPN gateway for the VPC](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html#creating-a-vpn-gateway-for-the-vpc).
