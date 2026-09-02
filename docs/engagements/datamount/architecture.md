---
sidebar_position: 2
title: "Confirmed architecture"
tags: ["engagement", "datamount", "architecture", "vcd", "nsx-t", "panorama"]
---

# Confirmed architecture — VCD + NSX-T + Palo Alto + F5

**Status:** Consolidated from Technical Workflow (Beta), DataMount Q&A, and IPAM design discussion.

<div class="no-print">

**Hub:** [DataMount Integration Review](/engagements/datamount/) · **Next:** [Admin setup](/engagements/datamount/admin-setup)

</div>

This page is the **single source of truth** for the DataMount engagement. All workflow phases assume the decisions below.

---

## Architecture decisions

| Decision point | Confirmed answer |
|---|---|
| Palo Alto deployment model | **Physical firewall**, managed via **Panorama** — perimeter layer; **no** VM-Series |
| NSX-T integration approach | **VCD API first** — tenant-level operations via VCD where supported; **direct NSX-T Manager API** for provider-level operations **not exposed through VCD** (T0 VRF, BGP, route validation) |
| Direct NSX-T Manager API required? | **Yes** — for the provider-level operations listed above that VCD does not expose |
| IPAM system of record | **No external IPAM (Infoblox/NetBox)** — **StackConsole Internal IP Manager** is system of record |
| IPAM functional requirements | **Confirmed:** public pool tracking, per-tenant private subnet (no overlap), **atomic reservation** at order confirmation, **release on offboarding** — see [SoW §1.3](/engagements/datamount/sow#13-ip-management-no-external-ipam) |
| BGP between NSX-T and Palo Alto | **Mandatory backend automation**, not customer-optional — the VRF↔BGP↔Virtual Router path is provider infrastructure regardless of whether the customer purchases a "BGP service" |
| Ownership model | CMP IPAM owns allocation. VCD, NSX-T, and Palo Alto are **consumers/implementers** of CMP allocation decisions — never independent sources of truth |

---

## API integration map

| Platform | Integration | Owns / used for |
|---|---|---|
| VMware VCD 10.6 | VCD API (OAuth 2.0) | Organization, VDC, NSX-T-backed Edge Gateway, VDC Networks, VM lifecycle, Catalog |
| NSX-T 4.2 | Direct NSX-T Manager API | T0 VRF, T1 Gateway, BGP config, segment management, NAT rules, route-table queries for BGP gate |
| Palo Alto Panorama | Panorama API (**REST + XML** — REST alone is partial) | Per-customer VSYS, zones, virtual router, BGP peering to T0 VRF, NAT, security policies, IPSec/SSL VPN, commit-and-push |
| F5 BIG-IP | iControl REST API | Virtual servers, pools, pool members, WAF policies, SSL policies |
| StackConsole IPAM | Internal CMP module | Public IP pools, private subnets, ASN pairs, VRF mapping, atomic reservation/release |

```mermaid
flowchart TB
  CMP[StackConsole_CMP]
  CMP --> VCD[VCD_API]
  CMP --> NSX[NSX_T_API]
  CMP --> PA[Panorama_API]
  CMP --> F5[F5_iControl]
  CMP --> IPAM[Internal_IP_Manager]
  VCD --> VCDInst[VCD]
  NSX --> NSXInst[NSX_T]
  PA --> PAInst[Palo_Alto_physical]
  F5 --> F5Inst[F5_BIG_IP]
  VCDInst --> TenantNet[NSX_T_backed_tenant_networking]
```

:::info[VCD and NSX-T]

**Required approach:** use **VCD APIs** for all operations VCD supports (Org, VDC, Edge Gateway, VDC networks, VM lifecycle, catalog). Where VCD does **not** expose an operation, CMP calls **NSX-T Manager directly** — for example T0 VRF provisioning, BGP configuration, and route-table queries for the BGP validation gate. NSX-T service insertion is **not** used; Palo Alto is a separate physical perimeter managed via Panorama.

:::

---

## Provisioning ownership

CMP IPAM is the **only** allocator for customer-facing public IPs, private subnets, and ASN pairs. Downstream systems implement what CMP reserves:

| Resource | CMP IPAM | VCD | NSX-T | Panorama |
|---|---|---|---|---|
| Public IP | Allocate / release | IP Space (implementation) | SNAT/DNAT targets | Address objects, NAT |
| Private subnet | Allocate / release | Org VDC network CIDR | Segment | — |
| ASN pair | Allocate / release | — | T0 VRF local ASN + BGP peer | VR BGP peer |
| VRF mapping | Metadata | Edge / provider gateway | T0 VRF object | Virtual router |

Use VCD **IP Space** as VCD's implementation of CMP allocations — do **not** let VCD IP Space become a second source of truth.

---

## Async orchestration pattern

VCD and NSX-T operations are asynchronous (for example, VCD IP allocation may return `202` with a task to poll). Design every phase as:

**request → task → poll → validate → continue**

Never fire-and-forget. The [BGP validation gate](/engagements/datamount/phase-5-bgp-gate) is an explicit poll-and-validate step, not an assumption that an API call succeeded.

---

## CloudStack reference patterns (UX only)

Apache CloudStack already implements first-class objects for ASN pools, BGP peers, hierarchical CIDR IPAM, VLAN lifecycle, router service profiles, and physical network definition — because it **owns the entire stack** (System VM Domain Router, zone-scoped pools, no external reconciliation).

DataMount is structurally different: VCD, NSX-T, and Panorama are separate vendor APIs CMP must synchronize. The right takeaway is **not** "replicate CloudStack's architecture" — it is **"replicate CloudStack's object model and admin UX patterns"** on top of the multi-vendor ownership design above.

| Borrow | Do not replicate |
|---|---|
| Set reservation toggle (bind ASN/subnet/VRF to customer at creation) | Single-system ownership — no reconciliation engine needed |
| List views with Allocation state + Taken columns | CloudStack Virtual Router as tenant edge (use NSX-T T1 + VCD Edge) |
| Service Offering as named selectable package (VSYS / VR profiles) | End-to-end BGP/VLAN provisioning inside one orchestrator |

Full mapping table, screenshots, and UX guidance: [CloudStack reference patterns](/engagements/datamount/cloudstack-reference-patterns).

---

## F5 — open architecture questions

Resolve before finalizing the [F5 phase](/engagements/datamount/phase-6-f5) and [Admin setup — F5](/engagements/datamount/admin-setup#27-f5-big-ip--base-configuration):

| Question | Status |
|---|---|
| Physical BIG-IP or Virtual Edition (VE)? | **Open** |
| Shared platform with per-tenant **partitions/route domains**, or dedicated appliance per customer? | **Open** |
| Does F5 sit **behind** Palo Alto (perimeter → F5 LB/WAF → VCD workloads) or in **parallel**? | **Open** |
| BGP/routing between F5 and NSX-T/Palo Alto required, or pure Layer 4–7 behind an existing gateway? | **Open** |
| Does F5 provisioning participate in the BGP gate or run after it? | **Recommend:** after [Phase 5](/engagements/datamount/phase-5-bgp-gate) passes |

---

## Open items before final sign-off

See [Statement of Work — open items](/engagements/datamount/sow#8-open-items-sow-blockers) and [Discovery questions](/engagements/datamount/discovery-questions).

**Closed (confirmed for SoW):**

- Physical Palo Alto via Panorama — no VM-Series
- VCD API first; direct NSX-T Manager API where VCD does not expose the operation
- StackConsole Internal IP Manager — four functional requirements (public pool, private subnet, atomic reservation, release)

**Still open:**

1. **F5 architecture** — deployment model, tenancy, position relative to Palo Alto, BGP gate participation.
2. **Palo Alto commit/push failure handling** — compensating actions if commit succeeds on candidate config but push to the physical device fails partway.
3. **Customer self-service zone creation** — boundary between customer-creatable custom zones and provider-restricted shared-infrastructure zones within a VSYS.
4. **Development phasing** — Package A/B/C delivery options: [SoW §7](/engagements/datamount/sow#7-delivery-packaging-options). Task-level estimates: [Milestones and timeline](/engagements/datamount/milestones-and-timeline).
