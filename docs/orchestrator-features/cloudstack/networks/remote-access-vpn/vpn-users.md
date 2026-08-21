---
sidebar_position: 3
title: "VPN Users"
tags: ["orchestrator", "cloudstack", "features", "networks", "vpc", "vpn", "remote-access", "isolated"]
---

# VPN Users

**VPN Users** provide username/password credentials for **[Remote Access VPN](/orchestrator-features/cloudstack/networks/remote-access-vpn/)**. Users connect with an L2TP/IPsec client to the **Source NAT public IP** (VPC or Isolated network) where Remote Access VPN is enabled.

:::important[Not VPN Customer Gateway]

**VPN User** = person connecting from a laptop.  
**VPN Customer Gateway** = customer firewall for [Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway).

:::

---

## Create VPN User (CMP)

**CMP path:** **Networking → Networks → VPN Users** → **Add User**

![Screenshot: CMP — Add New VPN User](/img/screenshots/cmp-vpn-add-user.png)

**Username**
*Required.* VPN login name.

**Password**
*Required.* Password rules shown in CMP: **8–32 characters**, must **start with a letter or number**, and may only contain `@`, `.`, `-`, `_`.

**Select Project**
*Required.* Project that owns this VPN user.

Click **Add User**.

---

## Create VPN User (CloudStack reference)

The same object exists in CloudStack for troubleshooting.

**CloudStack path:** **Network → VPN Users → Add VPN User**

![Screenshot: CloudStack — Add VPN User](/img/screenshots/cloudstack-vpn-users.png)

**Username**
*Required.*

**Password**
*Required.*

**Domain**
*Optional.*

**Account**
*Optional.* Use with **Domain** when required.

Click **OK**.

---

## Account-wide VPN user behaviour

CloudStack stores VPN users separately from the main account user database.

| Behaviour | Detail |
|---|---|
| **Shared pool** | VPN users apply to **all** Remote Access VPNs the account owner has enabled (VPC and Isolated) |
| **Access** | Every VPN user can connect to **every** such VPN |
| **Limit** | Maximum users per account: CloudStack global setting `remote.access.vpn.user.limit` |

See [Limitations and Prerequisites](/orchestrator-features/cloudstack/networks/remote-access-vpn/limitations).

---

## How VPN User fits in the flow

```text
Laptop
   |
   | Username + Password
   |
   v
Remote Access VPN (Source NAT IP)
   |
   v
Private VM
```

Combined with:

| Item | From |
|---|---|
| **Server IP** | Source NAT public IP (VPC or Isolated) |
| **IPsec PSK** | **Enable VPN** on that Source NAT IP |
| **Username / password** | VPN User (this page) |

Full workflow: [Remote Access VPN — Workflow](/orchestrator-features/cloudstack/networks/remote-access-vpn/workflow).

---

## Related

* [Remote Access VPN](/orchestrator-features/cloudstack/networks/remote-access-vpn/)
* [Workflow](/orchestrator-features/cloudstack/networks/remote-access-vpn/workflow)
* [Limitations and Prerequisites](/orchestrator-features/cloudstack/networks/remote-access-vpn/limitations)
* [VPN Customer Gateway](/orchestrator-features/cloudstack/networks/site-to-site-vpn/vpn-customer-gateway) (Site-to-Site only)

CloudStack reference: [Configuring Remote Access VPN](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html#configuring-remote-access-vpn).
