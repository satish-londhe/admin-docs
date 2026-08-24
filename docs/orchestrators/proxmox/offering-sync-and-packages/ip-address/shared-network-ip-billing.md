---
sidebar_position: 3
title: "Shared Network IP Billing"
tags: ["orchestrator", "proxmox", "packages", "ip-address", "shared-network", "ip-billing", "ipam"]
---

# Shared Network IP address billing (Proxmox)

When CMP creates or cancels an IP subscription on a **Proxmox** network imported in CMP — not how to set the rate-card price.

**Pricing** uses the [Configure pricing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages) package for the setup and zone. Category overview: [IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/). Network import and IP pools: [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam).

:::tip[CloudStack]

For CloudStack Shared Networks, see [Shared Network IP Billing (CloudStack)](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing).

:::

:::warning[Global setting removed]

The global setting **`enable_shared_network_ip_billing`** is **removed** and is **not applicable**. Configure billing on each network in the Admin Panel instead.

:::

**Admin path:** **Settings → Orchestrator → Networks** (import or edit a Proxmox network / bridge)

---

## Admin fields

**Do you want to enable billing for IP addresses for this network?**

| Value | Behaviour |
|---|---|
| **Yes** | CMP creates an **IP address subscription** when an IP is acquired on this network (see [when subscription is created](#when-cmp-creates-the-ip-subscription)) |
| **No** | No IP subscription is created for IPs on this network |

**IP Address Type**

| Value | Behaviour |
|---|---|
| **Public IP** | CMP shows the IP as a **public** IP. Customers are **restricted from acquiring multiple IPs** while creating a VM on this network. The separate **Acquire public IP** option may be hidden when this type is Public (see [Customer panel](#customer-panel-behaviour)). |
| **Private IP** | CMP shows the IP as a **private** IP. |

In **VM Overview**, Private / Public follows the type configured on the network.

### Network addressing fields (applicable on Proxmox)

These fields **apply** when importing / updating a Proxmox network in CMP (see [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam)):

* **Cidr**
* **Subnet Mask**
* **Gateway IP**
* **Generate IPs** / IP list (IPAM pool)

CMP builds the allocatable IP pool from subnet settings when you submit the form.

:::note[Linux bridge]

Import a **Linux bridge** (for example `vmbr0`), not a physical NIC. See [Linux bridge vs physical NIC](/orchestrators/proxmox/networks-and-ipam#linux-bridge-vs-physical-nic).

:::

---

## When CMP creates the IP subscription

If **IP billing is enabled** on the network (**Yes**), CMP creates a subscription for the IP when:

* The customer **creates a VM** with that network, **or**
* The customer **attaches** that network to an **existing** VM

Pricing comes from the zone’s **IP Address package**.

:::important[No manual cancel]

Customers **cannot** manually cancel the subscription for a network IP charged this way. Cancellation is driven by detach or VM destroy (below).

:::

---

## When CMP cancels the IP subscription

If **IP billing is enabled** on the network and the customer created or attached a VM with that network:

| Customer action | Subscription |
|---|---|
| **Remove** the network from the VM | IP subscription is **automatically cancelled** |
| **Destroy** the VM | IP subscription is **automatically cancelled** |

---

## Use cases (IP billing enabled)

### Customer creates a VM with the network

* Subscription is created for the IP acquired on the network
* Customer sees IP billing in the create preview and after creation

### Customer attaches the network to an existing VM

* IP address subscription is **created** and IP billing applies

### Customer removes the network from an existing VM

* IP subscription is **cancelled**

---

## Customer panel behaviour

| Area | Behaviour |
|---|---|
| **VM Creation — preview** | Network IP billing is shown in the preview when IP billing is enabled on that network |
| **After VM creation** | IP billing is applied (subscription created) |
| **Acquire public IP** | Shown or hidden conditionally based on **IP Address Type** (hidden when type is **Public IP** so the customer does not pick a second public IP) |
| **VM Overview — attach** | Attaching the network creates the IP subscription and applies billing |
| **VM Overview — remove** | Removing the network cancels the IP subscription |
| **VM Overview — IP type** | Shows **Private** or **Public** per the network configuration |
| **Subscription cancel** | Manual cancel of this IP subscription is **not** allowed |

---

## Admin checklist

- [ ] `enable_shared_network_ip_billing` is **not** used (removed)
- [ ] Each billable network has **enable IP billing** set correctly (**Yes** / **No**)
- [ ] **IP Address Type** is **Public IP** or **Private IP** as intended
- [ ] [IP Address package](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages) exists for the setup + zone when billing is **Yes**
- [ ] **Cidr**, **Gateway IP**, and IP pool are configured under [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam)

---

## Related

* [IP Address](/orchestrators/proxmox/offering-sync-and-packages/ip-address/) — category overview
* [Configure pricing](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages)
* [Networks and IPAM](/orchestrators/proxmox/networks-and-ipam)
* [Shared Network IP Billing (CloudStack)](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing)
* [Public IP & network billing FAQ](/faq/platform/ip-network-billing)
