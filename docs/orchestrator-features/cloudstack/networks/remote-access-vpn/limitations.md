---
sidebar_position: 4
title: "Limitations and Prerequisites"
tags: ["orchestrator", "cloudstack", "features", "networks", "vpc", "vpn", "remote-access"]
---

# Remote Access VPN — Limitations and Prerequisites

This page separates what **CMP admins** configure in CMP from behaviour and limits defined by **Apache CloudStack** on the virtual router. Customers enable Remote Access VPN in **CMP**; underlying VPN service, global tuning, and documented limits come from **CloudStack**.

Overview: [Remote Access VPN](/orchestrator-features/cloudstack/networks/remote-access-vpn/).

:::info[Source of truth]

| Topic | Where it applies |
|---|---|
| **CMP prerequisites** (provider setup, packages) | Configured in **CMP** |
| **Global settings** (`remote.access.vpn.*`) | **CloudStack UI / API only** — **not exposed in CMP** |
| **Limitations below** | **CloudStack** Remote Access VPN (StrongSwan on virtual router) — see [CloudStack — Limitations of Remote Access VPN](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html#limitations-of-remote-access-vpn) |

:::

---

## CMP admin prerequisites

Complete these in **CMP** before customers can use Remote Access VPN:

| Step | Where | Detail |
|---|---|---|
| **Provider Setup** | CMP — **Settings → Orchestrator → Provider Setup** | CloudStack connected — [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting) |
| **Network / VPC packages** | CMP — packages & offerings | Offering must include **Remote Access VPN** / **VPN** — [Network packages](/orchestrators/cloudstack/offering-sync-and-packages/networks) (Isolated), [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc) (VPC) |

![Screenshot: CMP — Provider Setup configuration complete](/img/screenshots/cmp-provider-setup-success.png)

CMP does **not** provide screens for CloudStack VPN global settings — those are operator tasks on the CloudStack management server (next section).

---

## CloudStack prerequisites (not in CMP)

These requirements come from **CloudStack guest networking**. CMP relies on synced offerings and CloudStack behaviour; they are **not** separate toggles in CMP.

| Requirement | Detail |
|---|---|
| **Network offering** | **Remote Access VPN** service enabled on the Isolated or VPC offering |
| **Network mode** | **NATTED** guest networks only. **ROUTED** isolated networks do **not** support Source NAT, Static NAT, load balancing, port forwarding, or VPN |
| **Per-network VR** | Each guest network / VPC has its own virtual router — Remote Access VPN is **not shared across networks** |
| **Public IP** | **Source NAT** public IP with VPN enabled — VPC or Isolated network |
| **VPN client location** | Client must be **outside** the VPC or Isolated network where Remote Access VPN is enabled |

Reference: [CloudStack — Configuring Remote Access VPN](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html#configuring-remote-access-vpn).

---

## CloudStack global settings (not in CMP)

:::warning[CloudStack admin UI / API only]

These settings are configured in CloudStack **Global Settings**. **CMP does not expose them.** Your CloudStack operator or platform team must set them on the CloudStack management server before or during VPN rollout.

**CloudStack path:** log in as admin → **Global Settings** → search for `remote.access.vpn`

:::

| CloudStack global setting | Purpose |
|---|---|
| `remote.access.vpn.client.ip.range` | IP range allocated to Remote Access VPN clients. The **first IP** in the range is used by the VPN server |
| `remote.access.vpn.psk.length` | Length of the generated IPsec pre-shared key |
| `remote.access.vpn.user.limit` | Maximum VPN users per account |

Customers still **enable VPN** and create **VPN Users** in CMP; these globals only control pool size, PSK length, and user cap on the CloudStack side.

---

## Supported VPN clients (CloudStack)

CloudStack documents native **L2TP/IPsec** clients on **Windows**, **macOS**, and **iOS**. Linux and other platforms need a compatible L2TP/IPsec client.

:::tip[Split tunneling — CloudStack expectation]

Route **only the guest/VPC CIDR** through the VPN — not all internet traffic. CloudStack expects the installed route to cover the guest network only.

:::

---

## VPN Users behaviour (CloudStack)

Documented **CloudStack** behaviour — CMP creates the same VPN User objects via the CloudStack API.

| Behaviour | Detail |
|---|---|
| **Separate user store** | VPN users are **not** the main CMP/CloudStack account login database |
| **Shared pool** | VPN users apply to **all** Remote Access VPNs the account owner has enabled |
| **Access scope** | Every VPN user can access **every** such VPN |
| **Per-account limit** | Capped by CloudStack global setting `remote.access.vpn.user.limit` (not configurable in CMP) |

See [VPN Users](/orchestrator-features/cloudstack/networks/remote-access-vpn/vpn-users).

---

## CloudStack limitations

:::important[Documented by Apache CloudStack]

The limits in this section are **CloudStack platform limitations** for built-in Remote Access VPN (L2TP over IPsec, StrongSwan on the virtual router). They apply whether the customer uses **CMP** or the CloudStack UI directly.

Official reference: [Limitations of Remote Access VPN](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html#limitations-of-remote-access-vpn).

:::

### Single connection per source IP / NAT subnet

CloudStack does **not** support multiple **simultaneous** Remote Access VPN connections from the **same source public IP** or **NAT'ed subnet** (StrongSwan implementation on the virtual router).

If several users share one office NAT or public IP, **only one** can be connected at a time. Additional attempts fail until the active session disconnects.

### No overlapping subnets

Remote Access VPN does **not** provide NAT traversal or address translation for **overlapping subnets** between the VPN client and the VPC/guest network.

Plan non-overlapping CIDRs between the client side and the cloud network.

### L2TP/IPsec is not Site-to-Site

CloudStack **Remote Access VPN** is for **Road Warrior** access (dynamic client IP, username/password). Use **[Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/)** for office/datacenter networks.

---

## CloudStack recommendation (enterprise remote access)

From CloudStack documentation: if the environment needs **many concurrent VPN users behind the same NAT or public IP**, built-in Remote Access VPN may not fit.

Consider:

* **[Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/)** from the office firewall to the VPC, or
* A **dedicated VPN appliance** (for example OpenVPN or pfSense) **inside the VPC**

---

## Related

* [Workflow](/orchestrator-features/cloudstack/networks/remote-access-vpn/workflow)
* [VPN Users](/orchestrator-features/cloudstack/networks/remote-access-vpn/vpn-users)
* [Site-to-Site VPN](/orchestrator-features/cloudstack/networks/site-to-site-vpn/)

CloudStack reference: [Guest Traffic — Remote Access VPN](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html#remote-access-vpn).
