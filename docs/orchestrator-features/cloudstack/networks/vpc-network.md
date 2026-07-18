---
sidebar_position: 2
title: "VPC Network"
tags: ["orchestrator", "cloudstack", "features", "networks", "vpc", "acl"]
---

# VPC Network

A **VPC** (Virtual Private Cloud) in Apache CloudStack is a private, isolated part of the cloud with its own virtual network topology. Customers create VPCs in CMP by selecting a **VPC package** that maps to CloudStack **VPC Offering** and **VPC Network Offering** values.

:::tip[Setup vs feature]

- **This page** — how VPC works in CloudStack and how CMP exposes it (tiers, ACLs, Source NAT, VPN/private gateway overview, limitations).
- **Admin package setup** — [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc).
- **Provider Config** — [Connecting CMP to CloudStack](/orchestrators/cloudstack/connecting#wizard-step-2--provider-config) (**Default VPC ACL Allow ID**, **Default Network Strategy**).

:::

## What is a VPC?

In CloudStack, a VPC lets you:

* Define a **super CIDR** (for example `10.0.0.0/16`) for all guest tiers
* Create one or more **network tiers** (subnets) inside that CIDR
* Use a single **VPC virtual router** for routing, DHCP, DNS, Source NAT, ACLs, and optional VPN / load balancing

CloudStack reference: [Configuring a Virtual Private Cloud](https://docs.cloudstack.apache.org/en/latest/adminguide/networking/virtual_private_cloud_config.html).

| Building block | Role |
|---|---|
| **VPC** | Isolated private cloud for one account / project, with a super CIDR |
| **Network tier** | Guest subnet inside the VPC (own VLAN segment and CIDR); one ACL list per tier |
| **VPC virtual router** | System VM that connects tiers, public gateway, VPN, and NAT |
| **Public gateway / Source NAT** | Outbound internet; one Source NAT public IP allocated when the VPC is created |
| **Network ACL** | Numbered allow/deny rules for ingress/egress on a tier |
| **Private gateway** | Optional route to a private / enterprise network |
| **VPN gateway** | Optional site-to-site VPN endpoint for the VPC |

:::info[Isolated Network vs VPC]

| | **Isolated Network** | **VPC** |
|---|---|---|
| Structure | Single guest network | Super CIDR + one or more **tiers** |
| Virtual router | One VR per isolated network | One VPC VR for the whole VPC |
| Offerings | Network offering | **VPC offering** + VPC guest network offerings |
| Firewall model | Isolated network firewall at public IP level | **Network ACL** on tiers |
| CMP packages | Network packages (when billing enabled) | [Virtual Router/VPC](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc) |

See [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network).

:::

## How CMP provisions a VPC

1. Enable **VPC/Virtual Router** in Cloud Provider Setup (Wizard Step 1)
2. Set **Default VPC ACL Allow ID** in Provider Config (Wizard Step 2) so new VPCs get a usable default ACL
3. Create CloudStack **system service offerings**, **VPC offerings**, and **VPC guest network offerings** (with **User Data** and **Network ACL**)
4. Create CMP [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc) per zone/tier
5. Customer opens **Create VPC**, selects a package (or CMP auto-selects when only one package exists), and CMP creates the VPC via CloudStack APIs

```text
CMP VPC package
  → CloudStack VPC Offering (+ system service offering = VR size)
  → VPC created (Source NAT IP allocated)
  → Customer adds tiers using VPC Network Offering
  → ACL list applied per tier (default from Default VPC ACL Allow ID, then custom rules)
```

![Screenshot: CMP — Create VPC with package selection](/img/screenshots/cmp-customer-create-vpc-packages.png)

### Default VPC ACL Allow ID

| Field | Purpose |
|---|---|
| **Default VPC ACL Allow ID** | CloudStack ACL list UUID applied when CMP creates a new VPC |

Obtain the UUID from **CloudStack → Network → VPC → ACL Lists** (typically a **default_allow**-style list, or a custom allow list you maintain). Customers can replace or edit ACL rules in the CMP portal after creation.

## VPC details page

After a VPC is created, open it from **Networking → Networks**. The details page shows summary actions and tabs for managing the VPC.

![Screenshot: CMP — VPC details page (Details tab)](/img/screenshots/cmp-vpc-details-page.png)

### Header actions

| Action | Purpose |
|---|---|
| **Edit** | Update VPC display details where allowed |
| **Refresh** | Reload status from CloudStack |
| **Restart** | Restart the VPC / virtual router networking |
| **Delete** | Delete the VPC (Source NAT public IP is released when the VPC is deleted) |

The header also shows name, status, created/renewal times, project, and zone.

### Tabs

| Tab | What customers manage here |
|---|---|
| **Details** | Read-only summary of the VPC (see fields below) |
| **Network** | Network tiers (subnets) inside this VPC — add and open tiers |
| **Public IP Addresses** | Source NAT and acquired public IPs for the VPC |
| **Network ACL List** | ACL lists and rules for tiers — see [Network ACL](#network-acl-vpc-firewall) |
| **VPN Gateway** | Site-to-site VPN gateway for the VPC (when the offering supports VPN) |
| **VPN Connections** | VPN connections to customer gateways |
| **Associated VMs** | VMs connected to networks in this VPC |
## Network tiers

Customers add tiers from the VPC details view (**Network** tab) after the VPC exists. Each tier is an isolated guest network inside the VPC.

### Tier rules

| Rule | Detail |
|---|---|
| **Unique CIDR** | Each network tier must have a **unique CIDR** within the VPC — two tiers cannot share or overlap the same address range |
| **Inside VPC CIDR** | The tier CIDR must fall **entirely within** the VPC super CIDR (for example VPC `10.0.0.0/16` → tier `10.0.1.0/24` is valid; `192.168.1.0/24` is not) |
| **One VPC only** | A network tier belongs to **only one** VPC — it cannot be shared across VPCs |
| **Minimum CIDR size `/22`** | CloudStack rejects guest / tier networks larger than `/22` (prefix number **must be ≥ 22**). See below |

**Example:** VPC CIDR `10.0.0.0/16`

| Tier | CIDR | Valid? |
|---|---|---|
| Web | `10.0.1.0/24` | Yes — unique and inside VPC CIDR |
| App | `10.0.2.0/24` | Yes — unique and inside VPC CIDR |
| DB | `10.0.1.0/24` | No — duplicates Web |
| Ext | `172.16.0.0/24` | No — outside VPC CIDR |

:::tip[Planning CIDRs and subnets]

Choosing a VPC super CIDR and non-overlapping tier subnets can be confusing if you are not a networking specialist.

Use a visual subnet calculator to split a network into smaller ranges and see **subnet address**, **netmask**, **usable IP range**, and host counts side by side:

**[Visual Subnet Calculator](https://www.davidc.net/sites/default/subnets/subnets.html)**

**Suggested workflow:**

1. Pick a private VPC CIDR (for example `10.0.0.0/16`)
2. Open the calculator, enter that network, and **Divide** until you have tier-sized subnets — typically **`/24`** (must be **`/22` or smaller networks**, i.e. prefix ≥ 22)
3. Assign one unique subnet per tier — each must stay **inside** the VPC CIDR and **not overlap** another tier
4. Copy the subnet address and mask (or CIDR notation) into CMP when creating each network tier

:::

### Other tier behaviour

* Tiers do **not** freely reach each other by default — **Network ACL** rules control tier-to-tier and tier-to-public traffic
* All tiers created in CMP for a VPC use the **same VPC Network Offering** from the package — see [Load balancing inside a VPC](#load-balancing-inside-a-vpc)

## Source NAT and public IPs on VPC

:::info[CMP supports NATTED mode only]

CMP provisions VPCs in CloudStack **NATTED** mode. In that mode, creating a VPC always allocates a **Source NAT** public IP, which is released only when the VPC is deleted.

CloudStack also offers **ROUTED** mode (no Source NAT; static or BGP routing instead). CMP does **not** support ROUTED VPCs. If you need ROUTED networking or any other non-standard VPC setup, contact the **StackConsole** team.

:::

:::warning[One purpose per public IP]

A public IP can be used for **only one purpose at a time**.

If the IP is the VPC **Source NAT** address, it **cannot** also be used for **Static NAT** or **Port Forwarding** (or load balancer rules). Customers must acquire a **separate** public IP for inbound VM access, Static NAT, Port Forwarding, or LB.

:::

* When a VPC is created, CloudStack allocates a **Source NAT** public IP. It is released only when the VPC is deleted.
* That Source NAT IP handles **outbound** internet for the VPC. It is not available for VM association, Static NAT, Port Forwarding, or LB.
* A public IP already used for Static NAT, Port Forwarding, or LB on one tier cannot be reused for another purpose (or another tier’s services) at the same time.
* Details: [Load Balancer — VPC Source NAT](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer#vpc-source-nat-ip-and-load-balancing) and [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address).

For automated public IP attach during **Create Instance**, see [Default Network Strategy](/orchestrator-features/cloudstack/networks/#default-network-strategy-admin-setting). Manual IP association outside create-instance is chosen by the customer.

## Network ACL (VPC firewall)

Network ACL is the allow/deny firewall for traffic on a VPC **network tier** (subnet). The VPC offering and VPC Network Offering must include the **Network ACL** service.

### Important — rules apply to the whole network, not one VM

:::warning[Not host-to-host]

ACL rules work at the **network tier** level.

If a tier has many VMs, the same ACL rules apply to **all** of those VMs. You cannot write a rule that says “only VM-A may talk to VM-B” while other VMs on the same network are excluded.

Think of it as: **network ↔ network** (or network ↔ outside), not **VM ↔ VM**.

:::

**Example:** Web tier has 5 VMs. An ACL that allows outbound TCP 53 to a DNS address applies to **all 5** VMs on that web tier — not to one selected VM.

### How to read an ACL rule (simple)

| Field | Meaning in plain language |
|---|---|
| **Direction** | **Ingress** = traffic **coming into** this tier. **Egress** = traffic **leaving** this tier |
| **Action** | **Allow** or **Deny** |
| **Protocol / Port** | What kind of traffic (for example TCP 443, TCP 22) |
| **CIDR** | The other side of the traffic — who may talk **to** this tier (ingress), or where this tier may talk **to** (egress) |

Rules are numbered and checked in order (lowest number first).

### What you can and cannot do

| You can | You cannot |
|---|---|
| Allow or block traffic for an **entire tier** | Apply different ACL rules to **individual VMs** on the same tier |
| Control traffic between tiers (for example Web tier → App tier) | Set **source VM** and **destination VM** as two separate fields on one rule |
| Limit by protocol and port | Treat ACL like a classic per-host firewall on each guest |

CloudStack stores **one** CIDR per rule. For ingress it means “who is allowed in”; for egress it means “where is this tier allowed to go.” There is no separate “from this host **and** to that host” pair on the same rule.

![Screenshot: CMP — VPC Network ACL rules](/img/screenshots/cmp-vpc-network-acl-rules.png)

### Create / Update Rule form

Customers open **Network ACL** on a VPC network tier, then add or edit a rule. Create and Update use the same fields.

img/screenshots/cmp-vpc-network-acl-update-rule.png

![Screenshot: CMP — Update Rule (Network ACL)](/img/screenshots/cmp-vpc-network-acl-update-rule.png)

**Number**

*Required.* Priority of the rule. Lower numbers are evaluated first. Use unique numbers within the ACL list (for example `1`, `2`, `3`).

**Description**

*Optional.* Short note for admins and customers (for example `allow 443`).

**CIDR List**

*Required.* The “other side” of the traffic for this rule. Enter a network or host in CIDR form (for example `192.168.0.0/24` or `192.168.0.1/32`).

| Traffic Type | What CIDR List means |
|---|---|
| **Ingress** | Who is allowed to send traffic **into** this tier |
| **Egress** | Where this tier is allowed to send traffic **to** |

This is a **single** field — not separate source and destination. Remember rules still apply to **all VMs** on the tier.

**Action**

*Required.* **Allow** or **Deny** matching traffic.

**Protocol**

*Required.* Choose one:

| Option | Use when |
|---|---|
| **All** | Match any protocol |
| **TCP** | Typical web, SSH, databases (ports required) |
| **UDP** | DNS and similar UDP services (ports required) |
| **ICMP** | Ping / ICMP (ICMP type/code may apply instead of ports) |
| **Protocol Number** | Advanced — enter a numeric IP protocol |

**Start port** / **End port**

*Required for TCP and UDP.* Port range to match. For a single port, set both to the same value (for example Start `443`, End `443`).

**Traffic Type**

*Required.*

| Value | Meaning |
|---|---|
| **Ingress** | Traffic **coming into** this network tier |
| **Egress** | Traffic **leaving** this network tier |

Click **Submit** to save the rule.

**Example (from the form):** Number `1`, Description `allow 443`, CIDR List `192.168.0.1/32`, Action **Allow**, Protocol **TCP**, ports `443`–`443`, Traffic Type **Ingress** — allows HTTPS into this tier from host `192.168.0.1`, for **every VM** on the tier.

## Private gateway and VPN (overview)

| Feature | Purpose in CloudStack VPC |
|---|---|
| **Private gateway** | Route VPC traffic to/from a private or enterprise network; optional Source NAT on the private gateway; ACL on the private gateway interface |
| **Site-to-site VPN** | Hardware/VPN connection between the VPC VPN gateway and a customer gateway |
| **Remote access VPN** | **Not supported** on VPC networks in CloudStack (VPN users / remote access apply to other network models) |

Offer these only when the **VPC offering** includes **VPN** (and related services) and your CloudStack zone is configured for private gateways / VPN. Exact CMP customer UI flows for private gateway and VPN connections can be expanded on dedicated pages as documentation is completed.

## Load balancing inside a VPC

CloudStack documentation states that load balancing can be supported by only one network tier inside a VPC. In practice that applies when tiers use **different** Public LB network offerings.

:::info[CMP — same VPC Network Offering for every tier]

In CMP, the [Virtual Router/VPC package](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc) **tightly binds** the CloudStack **VPC Offering** and **VPC Network Offering**.

When customers add network tiers (subnets) inside a VPC, CMP creates every tier with that **same VPC Network Offering**. Customers do not pick a different guest network offering per tier.

Because all subnets share one offering, load balancers can be created against more than one tier in the same VPC. CMP does **not** expose CloudStack Conserve mode controls for this.

:::

* Enable **Load Balancer** on the VPC offering / VPC Network Offering used by the package
* Use an **acquired** public IP for LB rules — never the VPC Source NAT IP

See [Load Balancer packages](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer).

## Billing

VPC billing is driven by [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc). When pricing, include virtual router capacity, default Source NAT IP, and **Network Rate (Mb/s)** differentiation between tiers (for example Basic vs High-Performance).

## Related

* [Networks](/orchestrator-features/cloudstack/networks/)
* [Isolated Network](/orchestrator-features/cloudstack/networks/isolated-network)
* [Virtual Router/VPC packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-router-vpc)
* [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)
* [Load Balancer packages](/orchestrators/cloudstack/offering-sync-and-packages/load-balancer)
* [Cloud Provider Setup](/orchestrators/cloudstack/connecting)
* [Quota Management (ACS)](/orchestrators/cloudstack/quota-management)
