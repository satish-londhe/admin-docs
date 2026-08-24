---
sidebar_position: 4
title: "CloudStack reference patterns"
tags: ["engagement", "datamount", "cloudstack", "ipam", "ux"]
---

# CloudStack reference patterns — object model and UX

<div class="no-print">

**Prev:** [Admin setup](/engagements/datamount/admin-setup) · **Next:** [Provider abstraction](/engagements/datamount/provider-abstraction)

</div>

Apache CloudStack already has first-class UI and data objects for almost every concept in the DataMount IPAM and BGP design. Use CloudStack as the **reference pattern for CMP object model and admin UX** — not as a target architecture to replicate.

Full admin workflow with inline parity callouts: [Admin setup](/engagements/datamount/admin-setup).

---

## What to borrow vs what not to replicate

| Borrow from CloudStack | Do **not** replicate |
|---|---|
| Object model (pools, peers, subnets, lifecycle states) | Single-vendor stack ownership — CloudStack owns VR, BGP, VLAN, and subnet end-to-end |
| Admin UX patterns (reservation toggle, list-view state columns, service offering profiles) | CloudStack's lack of reconciliation — there is no second system that can disagree |
| Hierarchical CIDR rules (parent subnet before child) | CloudStack System VM Domain Router as the tenant edge — DataMount uses NSX-T T1 + VCD Edge |

:::important[Why reconciliation still matters]

CloudStack works because it provisions its own **Virtual Router** as a System VM and manages BGP/VLAN/subnet allocation as pieces of its own orchestration. The DataMount stack is structurally different: **three separate vendor platforms** (VCD, NSX-T, Panorama), each with partial IPAM/BGP capabilities, which CMP must keep synchronized. That is exactly why [Phase 8 — Reconciliation](/engagements/datamount/phase-8-reconciliation) exists — CloudStack does not need an equivalent because there is no second system of record.

:::

---

## Concept mapping

| DataMount design concept | CloudStack equivalent | Notes |
|---|---|---|
| ASN pool (`65000–65100`, pairs) | **AS Range** — zone-level Start/End AS Number | Pools ASNs at zone scope, same as admin-owned ASN pool |
| BGP (local ASN, peer, peer ASN, auth) | **BGP Peer** — AS Number, IP, IPv6, Password, Set reservation → Account/Domain | Matches NSX-T↔Palo Alto peer as a reservable, account-scoped object |
| Hierarchical CIDR IPAM (aggregate → prefix → sub-prefix; contiguous only) | **IPv4 Subnet for Routed Networks** — Parent Subnet + Subnet + CIDR size + Set reservation | Enforces parent/child hierarchy; no synthetic blocks from fragments |
| VLAN/VRF pool + lifecycle states | **Guest VLAN** — Allocation state (Free/Allocated), Taken, Account/Project/Domain | Same shape as `AVAILABLE → ALLOCATED → IN_USE` state machine |
| Virtual Router packages (BGP peers, static routes, OSPF, ECMP) | **System Service Offering** — System VM type Domain Router | Named selectable profile with resource limits and toggles underneath |
| Per-customer T1 / Edge Gateway | **Virtual Router** — one live VR per guest network/account, NICs, Public IP, System Offering | Closest analog to customer T1; CloudStack self-manages via System VMs |
| T0 physical connectivity / broadcast domain | **Physical Network** — Isolation (VLAN/L3/GRE), VLAN/VNI range, Traffic type, Broadcast domain | Zone-scoped fabric definition — same layer as T0 Gateway admin setup |
| Dedicated VRF / ASN for Enterprise tiers | **Dedicate Zone** — Dedicated Yes/No + AS Range binding on zone | Precedent for dedicating infrastructure slice to one tenant |

---

## UX patterns to implement in CMP

### 1. Set reservation toggle

CloudStack's **Set reservation** on IPv4 Subnet and BGP Peer dialogs optionally binds a resource to an **Account** or **Domain** at creation time. Replicate this on CMP admin screens when reserving an ASN pair, private prefix, or VRF to a specific customer before or during onboarding.

img/screenshots/datamount/cloudstack-ipv4-subnet-reservation.png

![Add IPv4 Subnet — Set reservation to Account or Domain](/img/screenshots/datamount/cloudstack-ipv4-subnet-reservation.png)

img/screenshots/datamount/cloudstack-bgp-peer-add.png

![Add BGP Peer — Set reservation and password field](/img/screenshots/datamount/cloudstack-bgp-peer-add.png)

### 2. State-visible list views

CloudStack surfaces **Allocation state** and **Taken** timestamp directly in list tables (Guest VLAN, IPv4 Subnets), not only on detail pages. Apply the same pattern to CMP `resource_bindings` and IPAM inventory — makes [reconciliation](/engagements/datamount/phase-8-reconciliation) and orphan detection easier to eyeball manually.

img/screenshots/datamount/cloudstack-guest-vlan.png

![Guest VLAN — Allocation state, Taken, Account, Domain columns](/img/screenshots/datamount/cloudstack-guest-vlan.png)

### 3. Service offering as selectable package

CloudStack's **Add System Service Offering** (System VM type = Domain Router) bundles CPU, memory, HA, scaling, and storage into one named profile with Cancel/OK footer. Use the same shape for **VSYS Profiles** and **Virtual Router packages** in [Admin setup §2.4](/engagements/datamount/admin-setup#24-palo-alto--admin-configuration-wizard).

img/screenshots/datamount/cloudstack-system-service-offering.png

![System Service Offering — Domain Router profile template](/img/screenshots/datamount/cloudstack-system-service-offering.png)

---

## Screen reference gallery

### IPv4 Subnet — hierarchical CIDR

img/screenshots/datamount/cloudstack-ipv4-subnet-add.png

![Add IPv4 Subnet — Parent Subnet required before child CIDR](/img/screenshots/datamount/cloudstack-ipv4-subnet-add.png)

Zone → IPv4 Subnets: **Parent Subnet** must be selected before entering child **Subnet** or **CIDR size**. List columns: Subnet, Zone, Parent Subnet, Network name, VPC, Created, Allocated.

### AS Range — ASN pool

img/screenshots/datamount/cloudstack-as-range-create.png

![Create AS Range — Start and End AS Number](/img/screenshots/datamount/cloudstack-as-range-create.png)

Zone → AS Number tab: zone-scoped **Start AS Number** / **End AS Number** — direct template for CMP ASN pool admin screen.

### Physical Network — T0 fabric

img/screenshots/datamount/cloudstack-physical-network-list.png

![Physical Network list — VLAN isolation, traffic types](/img/screenshots/datamount/cloudstack-physical-network-list.png)

img/screenshots/datamount/cloudstack-physical-network-add.png

![Add Physical Network — Isolation method, VLAN/VNI, broadcast domain](/img/screenshots/datamount/cloudstack-physical-network-add.png)

### Virtual Router — per-tenant T1 analog

img/screenshots/datamount/cloudstack-virtual-routers-list.png

![Virtual Routers list — one row per tenant router, state and IP visible](/img/screenshots/datamount/cloudstack-virtual-routers-list.png)

img/screenshots/datamount/cloudstack-virtual-router-detail.png

![Virtual Router detail — NICs, Guest Network, Public IP, System Offering](/img/screenshots/datamount/cloudstack-virtual-router-detail.png)

Recommend the same **one row per live tenant T1/Edge** list view for NSX-T inventory in [Phase 3](/engagements/datamount/phase-3-nsx-t).

### Dedicate Zone — Enterprise tier precedent

img/screenshots/datamount/cloudstack-zone-dedicate.png

![Zone details — Dedicated flag and Dedicate Zone action](/img/screenshots/datamount/cloudstack-zone-dedicate.png)

Useful precedent for **Enterprise Secure / Enterprise Plus** tiers that need a dedicated VRF and dedicated ASN range rather than shared pool allocation.

---

## Related product docs

CloudStack networking and zone concepts in the general CMP admin docs (for comparison only — DataMount uses VCD/NSX-T/Panorama):

- [CloudStack zones](/orchestrators/cloudstack/zones/)
- [Provider abstraction — CloudStack vs VCD path](/engagements/datamount/provider-abstraction)
