---
sidebar_position: 3
title: "Isolated Network"
tags: ["orchestrator", "cloudstack", "features", "networks", "isolated"]
---

# Isolated Network

An **Isolated Network** in Apache CloudStack is a private guest network dedicated to a **single account**. It is **not** part of a VPC. CMP creates and manages isolated networks through **network offerings**, virtual routers, public IP behaviour, and optional network billing.

:::tip[Setup vs feature]

- **This page** — how isolated networks work in CloudStack and how CMP implements them (offerings, billing, Source NAT reuse, cleanup).
- **Related setup** — [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address), [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc) (VR sizing concepts), [Cloud Provider Setup](/orchestrators/cloudstack/connecting).

:::

## What is an Isolated Network?

In Advanced networking, CloudStack uses isolated guest networks so tenants get Layer‑2 isolation (typically **VLAN** or **VXLAN**). Traffic on one account’s isolated network is not visible to other tenants.

| Concept | Behaviour |
|---|---|
| **Tenant isolation** | One isolated network → one account (or project scope as configured) |
| **Virtual Router (VR)** | Every isolated network gets its own dedicated VR as the gateway |
| **Built-in services** | The VR typically provides **DHCP**, **DNS**, and **Source NAT** so VMs can talk to each other and reach the internet |
| **Inbound access** | No external access to VMs unless you add **Port Forwarding**, **Static NAT**, **Load Balancing**, or **VPN** (when the network offering supports those services) |
| **Throughput** | Cap guest traffic (for example, 200 Mb/s) via the **network offering** / network rate |

CloudStack reference: [Networking and traffic](https://docs.cloudstack.apache.org/en/latest/adminguide/networking_and_traffic.html) (guest networks, virtual router, Source NAT).

:::info[Isolated vs VPC]

| | **Isolated Network** | **VPC** |
|---|---|---|
| Structure | Single guest network | One or more **tiers** inside a VPC |
| Offering type | **Network offering** | **VPC offering** + VPC guest network offerings |
| Virtual router | One VR per isolated network | One VPC VR for the VPC |
| CMP packages | Isolated / Network packages (when billing enabled) | [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc) |

See also [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network).

:::

## Isolated Networks and Virtual Routers

When an isolated network is created, CloudStack deploys a **virtual router**. VR capacity comes from a **system service offering** whose **System VM type** is **Domain Router**.

As a CloudStack admin, create multiple system service offerings for different workloads, then attach them to **network offerings**:

| Workload | Why it matters | Sizing guidance |
|---|---|---|
| **High connection count** | VR tracks many NAT connections (busy web servers) | More **memory** for connection tracking |
| **Heavy VPN / encryption** | Site-to-site VPN encrypts/decrypts every packet | Higher **CPU MHz** / cores |
| **Load balancing** | VR distributes traffic across many VMs | More **CPU** for packet processing |

**Chain in CloudStack:**

```text
System Service Offering (Domain Router)
        ↓
Network Offering (isolated, with services + linked system offering)
        ↓
Isolated Network → Virtual Router capacity
```

The same VR sizing ideas apply to VPC routers; see [How VPC virtual routers work in CloudStack](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc#how-vpc-virtual-routers-work-in-cloudstack).

## CloudStack Isolated Network Offerings and sync with CMP

### Default offering (most deployments)

During Cloud Provider setup, CMP commonly uses the default CloudStack network offering:

**`DefaultIsolatedNetworkOfferingWithSourceNatService`**

When an isolated network is created from CMP with this default configuration, that offering is used automatically.

:::warning[Default offering and billing]

Isolated networks created with this **default** offering configuration are **not billed** as a network package in CMP. Providers who keep isolated networks free typically stay on this model.

:::

### Multiple offerings (tiered networks)

You are not limited to one isolated network offering:

1. Create **multiple isolated network offerings** in CloudStack
2. Map each to a different **system service offering** (different VR size / features)
3. Sync / map those offerings in CMP (network packages on the rate card)
4. Apply **billing** to the offerings you want to sell

Use this when you need paid tiers (for example Basic vs High-Performance VR, VPN/LB enabled offerings, or different network rates).

Ensure network offerings include services customers need (for example **User Data** for password-enabled templates and guest initialization). Missing User Data causes the same class of deploy failures as on VPC guest offerings — see [Virtual Router/VPC — User Data](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc#supported-services--select-all-required-services).

## Isolated network billing

Most providers leave isolated networks **free**. Recent CMP versions support **billing for isolated networks** when you create network packages and enable the related flags.

When you define pricing for an isolated network package, include:

| Cost component | Notes |
|---|---|
| **Virtual Router** | System VM size (CPU, memory), services, and **network rate** |
| **Source NAT public IP** | Every isolated network with Source NAT gets **one** public IP by default |
| **Package price** | Put Source NAT IP cost **inside** the network package — see below |

### `enable_network_billing`

Set **`enable_network_billing`** to **`true`** so CMP can bill **automated** isolated networks created as part of **VM creation** (when network billing is part of your commercial model).

Without this flag and matching packages, CMP follows the free behaviour.

### Source NAT IP billing

CMP does **not** charge separately for the isolated network’s **Source NAT** public IP as a standalone IP line item in this workflow.

If you want customers to pay for that IP, **include its cost in the isolated network package price** — do not assume it will appear on IP Address package billing for the Source NAT address.

Additional public IPs acquired for second and later VMs **are** billed via normal [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address).

## Source NAT IP reuse — CMP workflow

CMP intentionally **reuses** the isolated network’s Source NAT public IP. Many providers offer isolated networks free of charge, so reusing the SNAT IP avoids allocating an extra public IP for the first VM that needs public access.

| Step | Behaviour |
|---|---|
| **First VM with public access** | CMP uses the network’s **Source NAT** IP, associates it with the VM via **port forwarding**, and charges for that public access according to your IP / network pricing rules (SNAT itself stays owned by the network) |
| **Additional VMs with public access** (Create Instance) | CMP acquires a **new** public IP and charges for it. Association uses **Static NAT** or **Port Forwarding** per **[Default Network Strategy](/orchestrator-features/cloudstack/networks/#default-network-strategy-admin-setting)**. Manual association later is the customer’s choice. |
| **VM deletion (SNAT case)** | CMP **disassociates** the IP from the VM but **retains** the IP on the isolated network |
| **Reuse** | If a new VM needs public access and the SNAT IP is free, CMP **reuses** the same Source NAT IP and reapplies port forwarding |

![Screenshot: CMP — public IP / Source NAT association on isolated network](/img/screenshots/cmp-isolated-source-nat-reuse.png)

:::warning[Source NAT ignores Default Network Strategy]

On isolated networks, the first public IP on a VM is the **Source NAT** IP. It can only use **Port Forwarding**, even if **Default Network Strategy** is set to **Static NAT**.

See [Networks — Port Forwarding vs Static NAT](/orchestrator-features/cloudstack/networks/#public-ip-association-port-forwarding-vs-static-nat).

:::

:::info[VPC Source NAT is different]

On **VPC**, the Source NAT IP **cannot** be used for VM or load balancer rules in CloudStack. Isolated-network SNAT reuse above applies to **non-VPC isolated networks** only. See [Load Balancer — VPC Source NAT](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer#vpc-source-nat-ip-and-load-balancing) and [IP Address — Source NAT IP reuse](/orchestrators/cloudstack/offering-sync-and-packages/ip-address#source-nat-ip-reuse-isolated-networks).

:::

## Last VM deletion and isolated network cleanup

When the **last VM** in an isolated network is deleted:

1. CMP can **automatically delete** the isolated network
2. Related resources are released — **virtual router**, **Source NAT IP**, and other network resources

This is controlled from Cloud Provider Setup (Wizard Step 2 — Provider Config):

| Field | Typical default | Effect |
|---|---|---|
| **Delete Network on Last VM** | `Yes` | If `Yes`, CMP deletes the network when the last VM in it is deleted. If `No`, the empty network (and typically its VR / SNAT IP) can remain until deleted manually |

Configure in [Connecting CMP to CloudStack — Provider Config](/orchestrators/cloudstack/connecting#wizard-step-2--provider-config).

:::warning[Operational impact]

With **Delete Network on Last VM** = `Yes`, deleting the last VM frees the SNAT IP and tears down the VR. Creating a new VM later creates a **new** isolated network (new VR and a new Source NAT IP from the public pool). Plan quota and IP pool capacity accordingly.

:::

## End-user view

When **multiple** isolated network offerings / packages are configured in CMP, the end user can choose the package that fits their needs during **network creation** (or during flows that create an isolated network).

**Best practice — package names:**

- Use clear, meaningful names
- Reflect the real differences: performance, VR size, VPN/LB support, network rate, or use case  
  Examples: `Isolated-Basic-200Mbps`, `Isolated-High-Performance-VPN`, `Isolated-LB-1Gbps`

![Screenshot: CMP — customer selects isolated network package](/img/screenshots/cmp-isolated-network-package-select.png)

## Related

* [Networks](/orchestrator-features/cloudstack/networks/)
* [VPC Network](/orchestrator-features/cloudstack/networks/vpc-network)
* [L2 Network](/orchestrator-features/cloudstack/networks/l2-network)
* [Shared Network](/orchestrator-features/cloudstack/networks/shared-network)
* [IP Addresses](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [Load Balancers](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Cloud Provider Setup](/orchestrators/cloudstack/connecting)
