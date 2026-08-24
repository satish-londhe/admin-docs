---
sidebar_position: 4
title: "Public IP & network billing"
tags: ["faq", "platform", "billing", "ip-address", "networking", "vpc", "isolated"]
---

# Public IP & network billing

How CMP charges public IPs vs VPC / isolated / shared network packages. Feature context: [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network), [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network), [Shared Network](/orchestrator-features/cloudstack/networks/shared-network), [IP Address (CloudStack)](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/) · [IP Address (Proxmox)](/orchestrators/proxmox/offering-sync-and-packages/ip-address/).

:::note[Orchestrator detail]

SNAT reuse and “default IP on VPC create” are strongest on **CloudStack**. The billing pattern below is how CMP expects providers to price packages.

:::

## Can Public IPs and networks be charged separately?

Yes — configure **network / VPC packages** and **Public IP packages** separately. Avoid double-charging the default SNAT/VPC IP by putting that IP cost **inside** the network package price when CMP does not bill that IP as a standalone IP line.

## If a Public IP is acquired automatically with VPC or network creation, is it billed separately?

### Isolated networks

A public IP is **not** acquired solely because the isolated network exists in the free/default model. You can often leave isolated networks **free**. Enable Public IP plans and global IP billing when you want to charge acquired public IPs.

CMP reuses the network **Source NAT** IP for the first VM public access (port forwarding) rather than always showing a separate acquired IP — see [CloudStack Q&A — isolated IP Addresses list](/faq/orchestrators/cloudstack#why-is-no-ip-listed-under-isolated-network--ip-addresses).

### VPC networks

CloudStack allocates **one Source NAT public IP** when the VPC is created. Include that default IP cost in the **VPC / Virtual Router package** price. You generally **cannot** advertise a free VPC package while also charging that same default SNAT IP as a separate IP package line on create.

## What about additional Public IPs?

Any **extra** public IPs acquired (second VM, standalone IP, LB IP, and so on) bill via Public IP packages when IP billing is enabled.

## Can we make Public IP free when bundled with an instance, but charge standalone IPs only?

That conditional model is **not** available today. Global settings roughly support “charge IPs” or “IPs free”, not “free only when bundled with the instance”.

## What about Shared Network IP billing?

Shared / VLAN networks use **per-network** settings (not a global `enable_shared_network_ip_billing` flag — that setting was **removed**):

* **Do you want to enable billing for IP addresses for this network?** — **Yes** creates an IP subscription on VM create or shared-network attach; **No** skips subscription
* **IP Address Type** — **Public IP** or **Private IP** (controls display and whether the customer can acquire another public IP)

Full lifecycle, use cases, and customer UI behaviour:

* [Shared Network IP Billing (CloudStack)](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/shared-network-ip-billing)
* [Shared Network IP Billing (Proxmox)](/orchestrators/proxmox/offering-sync-and-packages/ip-address/shared-network-ip-billing)

Rate-card prices: [Configure pricing (CloudStack)](/orchestrators/cloudstack/offering-sync-and-packages/ip-address/packages) · [Configure pricing (Proxmox)](/orchestrators/proxmox/offering-sync-and-packages/ip-address/packages).

## Recommended configuration to avoid duplicate charges

| Resource | Recommendation |
|---|---|
| **Isolated network** | Keep network package free (or priced for VR only); bill extra public IPs via IP packages |
| **VPC** | Price default SNAT IP **inside** the VPC package; bill additional IPs via IP packages |
| **Extra public IPs** | Always IP package |
