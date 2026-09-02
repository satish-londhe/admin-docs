---
sidebar_position: 4
title: "Statement of Work (Customer PDF)"
tags: ["engagement", "datamount", "sow", "customer"]
---

<div class="sow-cover-page">

<img src="/img/engagements/datamount/sow-cover.jpg" alt="Datamount Cloud Transformation Initiative — Scope of Work. Prepared by Stack Console Cloud Solutions Pvt. Ltd. Prepared for Datamount. 2nd Sep, 2026." />

</div>
<div class="sow-document-body">

# DataMount — Statement of Work

**CMP integration and automation — VMware Cloud Director, NSX-T, Palo Alto Panorama, F5 BIG-IP, and StackConsole IPAM**

| | |
|---|---|
| **Document** | Statement of Work (SoW) |
| **Version** | 1.1 (final for signature) |
| **Date** | September 2026 |
| **Parties** | StackConsole (vendor) · DataMount (customer) |
| **Subject** | CMP integration and automation across VCD, NSX-T, Palo Alto Panorama, StackConsole IPAM, and related platform services |


---

## Table of contents

1. Executive summary
2. Confirmed architecture
3. IP management
4. Master provisioning workflow (Phases 0–8)
5. Workstreams and scope boundaries
6. In scope, out of scope, and contingent scope
7. Required workflows
8. Acceptance criteria
9. Delivery packages
10. Timeline summary
11. Open items for signature
12. Sign-off

---

## 1. Executive summary

StackConsole will deliver a **Cloud Management Platform (CMP)** for DataMount that orchestrates customer onboarding, billing, and multi-system infrastructure provisioning across:

- **VMware Cloud Director (VCD) 10.6** — tenant org, VDC, edge gateway, VM lifecycle (via **VCD API**)
- **VMware NSX-T 4.2** — **direct Manager API** only for provider-level operations not exposed through VCD (T0 VRF, BGP, route validation)
- **Palo Alto Panorama** — physical firewall perimeter; per-customer VSYS, BGP, NAT, security policies
- **StackConsole Internal IP Manager** — system of record for public IPs, private subnets, and ASN pairs
- **Optional:** F5 BIG-IP load balancing / WAF, Odoo ERP outbound events, Veeam backup automation, DNS automation

CMP is the **orchestration brain**, **billing system of record**, and **IPAM system of record**. VCD, NSX-T, and Palo Alto implement CMP allocation decisions — they do not independently allocate customer IPs or ASNs.

This SoW defines **scope boundaries**, **required workflows**, **deliverable workstreams**, and **acceptance criteria**. Workstreams describe **where one body of work ends and another begins** — they do **not** mean each workstream is a separate project. The default is **one programme** (Package A) unless both parties agree to phased delivery.

---

## 2. Confirmed architecture

The following decisions are **locked** for this SoW.

### 2.1 API integration strategy

| Item | Confirmed |
|---|---|
| **Primary integration** | **VCD API (OAuth 2.0)** — use for all tenant-level operations VCD supports |
| **Supplemental integration** | **Direct NSX-T Manager API (v4.2.0)** — only for operations **not exposed through VCD** |
| **Security perimeter** | **Physical Palo Alto** managed via **Panorama API** (REST + XML) — no VM-Series |
| **Overall pattern** | VCD API + direct NSX-T API (where required) + Panorama API |

**VCD handles** (via VCD API): Organization, VDC, NSX-T-backed Edge Gateway, VDC networks, VM lifecycle, catalog, IP Space implementation of CMP allocations.

**Direct NSX-T API required** for provider-level operations VCD does not expose:

| NSX-T operation (direct API) | Not available through VCD API |
|---|---|
| **T0 VRF provisioning** | Dedicated VRF per customer on shared T0; two ASNs for Active-Active BGP — provider infrastructure |
| **BGP configuration (NSX-T ↔ Palo Alto)** | T0 VRF BGP peering with Panorama-managed VSYS — configured on both sides |
| **BGP route validation gate** | Mandatory gate before compute: query NSX-T route table — T1 prefixes visible at T0, BGP sessions **Established** with Palo Alto |

NSX-T service insertion is **not** used. Palo Alto operates as a separate physical perimeter; NSX-T operations use **VCD API where supported**, and **direct NSX-T API** otherwise.

### 2.2 API integration map

```
StackConsole CMP
├── VCD API (OAuth 2.0)
│    └── Org, VDC, NSX-T-backed Edge Gateway, VDC networks, VM lifecycle, catalog
├── NSX-T Manager API (v4.2.0)
│    └── T0 VRF, T1 Gateway, BGP configuration, segment management, NAT rules,
│         route-table queries for BGP gate
└── Palo Alto Panorama API (REST + XML)
     └── Per-customer VSYS, zones, virtual router, BGP peering to T0 VRF,
          NAT, security policies, IPSec/SSL VPN, commit-and-push
```

VCD manages **tenant-level** compute networking via **VCD API**. **Direct NSX-T Manager API** is used in parallel only for provider-level routing constructs that VCD does not expose.

### 2.3 Resource ownership

| Resource | StackConsole IPAM | VCD | NSX-T | Panorama |
|---|---|---|---|---|
| Public IP | Allocate / release | IP Space (implementation) | SNAT/DNAT targets | Address objects, NAT |
| Private subnet | Allocate / release | Org VDC network CIDR | Segment | — |
| ASN pair | Allocate / release | — | T0 VRF local ASN + BGP peer | VR BGP peer |
| VRF mapping | Metadata | Edge / provider gateway | T0 VRF object | Virtual router |

VCD **IP Space** implements CMP allocations — VCD must not become a second IPAM source of truth.

### 2.4 Async orchestration pattern

VCD and NSX-T operations are asynchronous. Every infrastructure step follows:

**request → task → poll → validate → continue**

Never fire-and-forget. The BGP validation gate (Phase 5) is an explicit poll-and-validate step.

---

## 3. IP management

| Item | Confirmed |
|---|---|
| External IPAM (Infoblox, NetBox, etc.) | **Not in scope** — not deployed at DataMount |
| System of record | **StackConsole Internal IP Manager** (CMP module) |
| Workflow references to “external IPAM” | Read as **StackConsole Internal IP Manager** |

### 3.1 Required capabilities

| # | Requirement | Owner |
|---|---|---|
| 1 | **Public IP pool management** — DataMount provides public IP ranges; StackConsole tracks allocations per tenant and releases IPs on offboarding | Workstream WS-1 |
| 2 | **Private subnet allocation** — dedicated private subnet per customer from defined address space; no overlap between tenants | Workstream WS-1 |
| 3 | **Atomic reservation** — at order confirmation, reserve public IP(s), private subnet, and ASN pair in **one transaction** (prevents race conditions on concurrent orders) | Workstream WS-1 |
| 4 | **Release on offboarding** — all IP and subnet allocations returned to the pool immediately for reuse | Workstream WS-1 + WS-8 |

StackConsole delivers all four as part of this engagement.

### 3.2 IPAM lifecycle states

```
AVAILABLE → RESERVED → ALLOCATED → ASSIGNED → IN_USE → RELEASED → AVAILABLE
```

---

## 4. Master provisioning workflow (Phases 0–8)

Authoritative sequence for **customer onboarding**. Failure after Phase 1 triggers compensating rollback in reverse order.

### 4.1 Workflow overview

```
Phase 0 (Order) → Phase 1 (IPAM) → Phase 2 (VCD) → Phase 3 (NSX-T)
    → Phase 4 (Panorama) → Phase 5 (BGP gate)
        → [Pass] → Phase 6 (F5, optional) → Phase 7 (Compute)
        → [Fail] → Rollback → Release IPAM → Order Failed
```

**Rollback rule (on failure after Phase 1):**

```
Panorama → NSX-T → VCD → Release IPAM → Order = Failed → Billing refund/credit
```

**Hard gate:** Phase 5 (BGP validation) **must pass** before Phase 7 (VM compute). Phase 6 (F5) runs only after Phase 5 passes.

### 4.2 Phase summary

| Phase | Name | Workstream | Hard gate |
|---|---|---|---|
| **0** | Customer order (portal) | WS-7 | — |
| **1** | Atomic IPAM reservation | WS-1 | Must complete before any infra API calls |
| **2** | VCD Org / VDC / Edge / networks | WS-2 | Implements CMP IPAM allocations in VCD IP Space |
| **3** | NSX-T T0 VRF, T1, BGP, NAT | WS-3 | Direct NSX-T API only |
| **4** | Panorama VSYS, VR, BGP, NAT, policy | WS-4 | Physical PA; commit-and-push serialization |
| **5** | BGP validation gate | WS-5 | **Blocks Phase 7** until Established + routes visible |
| **6** | F5 LB / WAF (if ordered) | WS-6 | After Phase 5 pass; optional add-on |
| **7** | VM deploy + handoff | WS-2 + WS-8 | Only after Phase 5 pass |
| **8** | Reconciliation (ongoing) | WS-8 | Drift detection by Service ID |

### 4.3 Phase 0 — Customer order

The customer selects a **service package** in the portal. They do not see T0 VRFs, ASNs, BGP peer IPs, or Palo Alto virtual router internals.

**Key steps:**

- Customer selects package, add-ons (F5, VPN), routing type, prefix size, VM specs
- Billing and KYC complete
- CMP derives backend parameters: security tier, public IP count, private subnet size, F5/VPN flags
- Workflow Instance ID and Service ID assigned for idempotency
- Triggers Phase 1

### 4.4 Phase 1 — Atomic IPAM reservation

**Key steps:**

- Capacity pre-check: ASN pair, public IP count, private subnet available
- **Single atomic transaction:** public IP(s) + private subnet + ASN pair — all succeed or none
- Metadata pack created: Service ID, ASN-A / ASN-B, public IP list, private CIDR(s), plan entitlements, add-on flags
- Odoo order push (async; does not block provisioning)

**On failure:** release partial holds; do not charge; do not call downstream systems.

### 4.5 Phase 2 — VCD (Org / VDC / Edge)

**Stack reference:** VMware Cloud Director 10.6.0

**Key steps:**

- 2.1 Create Organization (tagged with Service ID)
- 2.2 Create Org VDC (CPU/RAM/storage from plan)
- 2.3 Resource allocation and network pool
- 2.4 Edge Gateway (T0/VRF selection; IP from Phase 1 via IP Space)
- 2.5 Org VDC network (routed network; gateway CIDR; static IP pools)
- 2.6 Storage policy mapping
- 2.7 Catalog exposure for Phase 7
- 2.8 Portal mapping — Org/VDC/Edge IDs stored against Service ID

Every API call: **request → task → poll → validate → continue**.

### 4.6 Phase 3 — NSX-T (direct API)

**Stack reference:** VMware NSX-T 4.2.0

**Key steps:**

- 3.0 Idempotency pre-check — skip if VRF/T1 for Service ID exists
- 3.1 Create customer T0 VRF (dedicated on shared T0; local ASN from Phase 1)
- 3.2 Create T1 Gateway linked to T0 VRF; prefix advertisement T1 → T0
- 3.3 Create segment(s) on T1 using IPAM private subnet(s)
- 3.4 Configure BGP peer toward Palo Alto virtual router; second ASN from pair
- 3.5 Route advertisement for customer prefix from order
- 3.6 Configure SNAT (outbound via allocated public IP(s))
- 3.7 Configure DNAT (inbound on public IPs)

All objects tagged with Service ID.

### 4.7 Phase 4 — Panorama (physical Palo Alto)

All changes via **Panorama API (REST + XML)** — not direct PAN-OS device API.

**Key steps:**

- 4.1 Create/assign customer VSYS (from selected VSYS profile)
- 4.2 Attach shared Internet VSYS
- 4.3 Configure virtual router (from VR package)
- 4.4 Security zones (Internet / DMZ / Trust / Mgmt / VPN)
- 4.5 Interfaces bound to VSYS + VR + Zone + IP from Phase 1
- 4.6 BGP peer toward NSX-T T0 VRF; second ASN from pair
- 4.7 Address objects and NAT (align with NSX-T SNAT/DNAT)
- 4.8 Security policies (baseline from profile tier)
- 4.9 VPN (if ordered): IPSec / SSL VPN
- 4.10 **Commit-and-push** after each logical block; wait for success; serialized under concurrent orders

### 4.8 Phase 5 — BGP validation gate

Explicit **poll-and-validate** — not an assumption that API calls succeeded.

**Gate checks:**

| Check | System | Success criteria |
|---|---|---|
| T1 → T0 advertisement | NSX-T | Customer prefixes learned on T0 VRF |
| NSX-T ↔ Panorama peers | NSX-T + Panorama | Neighbor state **Established** (not Down) |
| Route visibility on PA | Panorama / firewall | Expected prefixes in VR routing table |
| Retry | CMP orchestration | Backoff within ~10 minute window |
| Fail | CMP | Compensate Phases 3–4 (and VCD Phase 2 if needed); release IPAM; refund/credit; alert admin |

**CMP must not proceed to Phase 7 until this gate returns success.**

### 4.9 Phase 6 — F5 BIG-IP (optional)

Runs only when the order includes load balancing or WAF. **After Phase 5 passes.**

**Key steps (when ordered):**

- Create F5 partition (or route domain) for tenant
- Virtual server, pool, pool members, SSL/WAF policies
- Wire to public IP / backend VMs from Phase 7

**Contingent:** F5 architecture must be confirmed before build work starts on this phase — see Section 6.3 for the gating rule and Package E fallback.

### 4.10 Phase 7 — Compute and handoff

**Only after Phase 5 passes.**

**Key steps:**

- 7.1 Deploy VM via VCD API (from catalog; poll async task)
- 7.2 Attach VDC network from Phase 2
- 7.3 Assign IP from Phase 1 reservation
- 7.4 Update F5 pool members (if Phase 6 ordered)
- 7.5 Reachability validation: VM → NSX-T → T0 → Palo Alto → Internet
- Handoff: welcome notification, metering active, service status **Active**

### 4.11 Phase 8 — Reconciliation (ongoing)

**Ongoing** — not per-order. Runs on schedule and after provisioning/offboarding.

- Compare CMP IPAM and workflow bindings against VCD, NSX-T, and Panorama actual state
- Mismatch raises **orphan resource alert** — do not silently reuse released IPs
- Minimum bindings tracked by Service ID: public IPs, private subnet, ASN pair, VCD Org/VDC/Edge IDs, NSX-T VRF/T1/segment IDs, Panorama VSYS/VR IDs

### 4.12 Offboarding sequence

Reverse of provisioning:

```
Cancel/terminate → Close billing → Deprovision VMs (VCD)
    → Remove F5 (if any) → Remove Panorama (policy → NAT → BGP → VR → VSYS → commit)
    → Remove NSX-T (BGP → T1 → T0 VRF) → Remove VCD (networks → Edge → VDC → Org)
    → Release IPAM (public IP + private subnet + ASN pair) → DNS cleanup → Odoo termination event
```

All IPAM resources **immediately available** for reuse after release.

---

## 5. Workstreams and scope boundaries

Workstreams (WS-0 … WS-9) define **scope boundaries** within this engagement: what each area delivers, what it depends on, and which provisioning phases it maps to. They help both parties see where work starts and stops — for example, IPAM (WS-1) is a distinct boundary from VCD (WS-2) or NSX-T (WS-3).

**Default:** all workstreams below are **in scope as one programme** (Package A — Section 9).

**Optional phasing:** if both parties agree to split delivery across phases or contracts, these boundaries show **where a clean cut is possible**. IPAM is one **example** of such a boundary — it does **not** mean IPAM is automatically a separate project.

| ID | Workstream | Depends on | Delivers | Maps to |
|---|---|---|---|---|
| **WS-0** | Orchestration foundation | — | Workflow engine, idempotency (Service ID / Workflow Instance ID), async poll pattern, audit, rollback framework | All phases |
| **WS-1** | Internal IPAM & ASN | WS-0 (reservation hooks) | Public pools, private subnets, ASN pairs, atomic reserve/release, VRF-scoped overlap validation, admin UI | Phase 1 |
| **WS-2** | VCD connector | WS-1, WS-0 | VCD 10.6 OAuth connector: Org, VDC, Edge Gateway, networks, catalog, VM lifecycle | Phases 2, 7 |
| **WS-3** | NSX-T direct API | WS-1 (ASN/subnet metadata) | T0 VRF, T1, segments, BGP (NSX side), NAT, route-table queries | Phase 3 |
| **WS-4** | Palo Alto Panorama | WS-1, WS-3 (BGP peers) | VSYS, zones, VR, BGP (PA side), NAT, policies, VPN, commit queue | Phase 4 |
| **WS-5** | BGP validation gate | WS-3, WS-4 | Mandatory poll-and-validate gate; compensating saga on fail | Phase 5 |
| **WS-6** | F5 BIG-IP | WS-5 pass; architecture TBD | VS, pools, WAF, SSL; optional per order | Phase 6 |
| **WS-7** | CMP baseline (portal + billing) | — | Registration, KYC, packages, rate cards, payment, portal | Phase 0 |
| **WS-8** | Day-2, offboarding, reconciliation | WS-1–WS-4 minimum | VM lifecycle, teardown order, IP/ASN release, drift checks | Phases 7, 8, offboard |
| **WS-9** | Ancillary integrations (optional) | WS-7 / WS-8 | Odoo outbound, Veeam automation, DNS A/PTR automation | As agreed |

### 5.1 Example boundary — IPAM (WS-1)

If parties choose **phased delivery**, IPAM illustrates a boundary that **could** be delivered and signed off before infra connectors:

- Delivers admin UI, pool management, atomic reservation API, and release semantics before VCD, NSX-T, or Panorama connectors must be complete
- Other workstreams consume IPAM outputs (metadata pack from Phase 1) via WS-0 hooks
- Can be UAT-tested on its own: concurrent order tests, overlap validation, offboarding release

This is an **example only**. Under Package A (full programme), IPAM is delivered as part of the integrated workflow, not as a separate project.

---

## 6. In scope, out of scope, and contingent scope

### 6.1 In scope (StackConsole delivery)

| Area | Boundary |
|---|---|
| **CMP orchestration** | End-to-end Phases 0–8; idempotent, auditable, compensating rollback |
| **Internal IPAM** | Four confirmed IP requirements (Section 3); no Infoblox/NetBox integration |
| **VCD 10.6 connector** | Org/VDC/Edge/network/VM — tenant framework for DataMount |
| **NSX-T 4.2 direct API** | Provider-level T0 VRF, BGP, NAT, route queries — used where VCD API does not expose the operation |
| **Panorama (physical PA)** | REST + XML API; per-customer VSYS; commit-and-push with serialization |
| **BGP gate** | Mandatory before compute; direct NSX-T + Panorama validation |
| **Admin one-time setup** | Pools, ASNs, rate cards, provider credentials |
| **Customer portal flows** | Order → provision → handoff (customer does not see VRF/BGP internals) |
| **Offboarding** | Reverse teardown + IPAM release + reconciliation |
| **E2E testing & UAT support** | Milestones M12–M14 |

### 6.2 Out of scope (DataMount / third-party responsibility)

| Area | Boundary |
|---|---|
| **Physical infrastructure** | Palo Alto hardware, Panorama deployment, NSX-T cluster, VCD installation, F5 appliances |
| **External IPAM** | Infoblox, NetBox, or any non-CMP IPAM — explicitly excluded |
| **NSX-T service insertion / VM-Series** | Not used — Palo Alto is physical via Panorama; NSX-T ops use VCD API where supported, else direct NSX-T API |
| **Panorama → device push failures on PA hardware** | StackConsole handles CMP-side compensation; physical device remediation is DataMount operations |
| **Odoo ERP inbound triggers** | CMP → Odoo outbound only; Odoo never triggers provisioning |
| **Customer-operated DNS/registrar** | Unless WS-9 DNS automation is contracted |
| **VPC Plane 2 (declarative blueprint)** | A separate, advanced multi-tier blueprint/DAG engine — **not** the Phases 0–8 workflow in this SoW. That imperative workflow is **Plane 1** and is **in scope**. Plane 2 would add declarative multi-tier topologies, parallel VM fan-out, and self-healing; it is a **separate programme** unless explicitly added |
| **24×7 managed SOC on Palo Alto policies** | Policy content approval remains DataMount security team |

### 6.3 Contingent scope (requires confirmation before SoW lock)

This section is the **single source of truth** for F5 (WS-6) gating. Sections 9 (Package A) and 10 (M10 timeline) follow the same rule.

| Area | Blocker | Default if not confirmed by kickoff |
|---|---|---|
| **F5 (WS-6)** | Architecture questions below | F5 stays listed in Package A's workstream table (Section 5) as a placeholder, but **no F5 build work starts** and **no F5 dates count on the critical path** (Section 10, M10) until the questions below are answered. If still unanswered at kickoff, F5 converts automatically to a **Package E** add-on, priced and scheduled separately |
| **Veeam auto-enroll / DR** | Veeam API + VCD backup model | Manual VM backup |
| **Odoo (WS-9)** | Odoo version + event schema | Excluded |
| **DNS automation (WS-9)** | Auto A/PTR on provision/offboard | PowerDNS manual / operational |

**F5 architecture questions (open):**

- Physical BIG-IP or Virtual Edition (VE)?
- Shared platform with per-tenant partitions/route domains, or dedicated appliance per customer?
- Does F5 sit **behind** Palo Alto (perimeter → F5 LB/WAF → workloads) or in **parallel**?
- BGP/routing between F5 and NSX-T/Palo Alto required, or pure Layer 4–7 behind an existing gateway?
- Does F5 provisioning participate in the BGP gate or run after it? (Recommended: after Phase 5 pass)

---

## 7. Required workflows

### 7.1 Order → provision

| Step | Mandatory behaviour |
|---|---|
| Order confirmed | Workflow Instance ID + Service ID assigned; capacity pre-check (ASN, public IP, private subnet) |
| Phase 1 | **Single atomic transaction** — all three resource types reserved or none |
| Phases 2–4 | Async **request → task → poll → validate**; VCD IP Space implements CMP allocations only |
| Phase 5 | Query NSX-T routes + BGP state; **no Phase 7** until pass |
| Phase 7 | VM deploy only after gate pass (and optional F5 if ordered) |
| Odoo | Async outbound; never blocks provisioning |

### 7.2 Failure and rollback

| Failure point | Required compensation |
|---|---|
| Phase 1 fail | No charge; no downstream API calls |
| Phase 2–4 fail | Reverse created objects in reverse order; release IPAM |
| Phase 5 fail | Reverse Panorama → NSX-T → VCD (as needed); release IPAM; refund/credit |
| Panorama commit/push partial fail | Documented compensating actions (open item — Section 11) |

### 7.3 Offboard

| Step | Mandatory behaviour |
|---|---|
| Teardown order | VM → F5 → Panorama → NSX-T → VCD → **IPAM release** → ASN release |
| IPAM | Public IPs and private subnet **immediately available** for reuse |
| Reconciliation | No orphaned objects by Service ID |

---

## 8. Acceptance criteria

| Workstream | Acceptance tests (minimum) |
|---|---|
| **WS-1 IPAM** | (1) Admin defines public pool + private space + ASN ranges. (2) Two concurrent orders cannot double-allocate. (3) Atomic reserve returns metadata pack. (4) Offboard releases all resources to **AVAILABLE**. (5) VRF-scoped private subnet overlap rejected. |
| **WS-2 VCD** | Org/VDC/Edge created from Phase 1 metadata; IP Space matches CMP allocations; VM deploy after BGP gate. |
| **WS-3 NSX-T** | T0 VRF + T1 + BGP (NSX side) per customer; route table query API used by gate. |
| **WS-4 Panorama** | VSYS + VR + BGP (PA side) + commit-and-push; serialized commits under concurrent orders. |
| **WS-5 BGP gate** | Blocks compute when peer Down or routes missing; passes when Established + prefixes visible. |
| **WS-6 F5** | VS/pool/WAF per order (scope per confirmed F5 architecture). |
| **WS-7 Baseline** | Registration → KYC → package purchase → order record with correct entitlements. |
| **WS-8 Lifecycle** | Full offboard E2E; reconciliation report shows zero orphans. |
| **E2E programme** | Single happy-path order through all phases in staging; failure-injection tests (IPAM, VCD, NSX-T, Panorama, BGP, commit, timeout, duplicate request, concurrent orders, partial provisioning, rollback). |

---

## 9. Delivery packages

| Package | Workstreams included | When to use |
|---|---|---|
| **A — Full programme (default)** | WS-0 through WS-8, with **WS-6 (F5) gated per Section 6.3**; + E2E/UAT (WS-9 as agreed) | **Standard SoW** — single ~12-week integrated delivery |
| **B — IPAM first** | WS-0 (minimal) + WS-1 + admin setup | **Optional phasing only** — if parties agree to deliver IPAM boundary first (see Section 5.1 example) |
| **C — Infra connectors** | WS-2 + WS-3 + WS-4 + WS-5 | **Optional phasing only** — after WS-1 is complete |
| **D — CMP baseline only** | WS-7 | **Optional phasing only** — portal/billing without multi-system provisioning |
| **E — Add-ons** | WS-6 (if not confirmed by kickoff — see Section 6.3), WS-9 items | Optional items when architecture/API confirmed |

Unless Package B, C, or D is explicitly selected and signed, **Package A applies** and all core workstreams are one integrated programme.

---

## 10. Timeline summary

Assumes **~12 weeks elapsed** with multiple teams working in parallel, measured from **kickoff (M0 / Week 1)** — see Open Item #6 for calendar anchoring. **F5 and Backup/DR** are contingent on architecture confirmation per Section 6.3: if F5 is **not confirmed by M0 (Week 1)**, its **M10 dates are removed from the plan** rather than silently slipping the overall timeline.

| Milestone | Workstream | Timeline |
|---|---|---|
| **M0** | Technical finalisation & environment readiness | Week 1 |
| **M1** | CMP core / orchestration foundation | Weeks 1–3 |
| **M2** | IPAM & ASN management | Weeks 1–3 |
| **M3** | VMware Cloud Director | Weeks 1–6 |
| **M4** | NSX-T integration | Weeks 1–7 |
| **M5** | Palo Alto / Panorama | Weeks 1–7 |
| **M6** | Rate cards & service packages | Weeks 4–7 |
| **M7** | Registration & KYC | Weeks 1–4 |
| **M8** | Customer purchase & provisioning | Weeks 6–9 |
| **M9** | VM lifecycle & Day-2 operations | Weeks 3–9 |
| **M10** | F5 + Backup / DR * | Weeks 4–9 |
| **M11** | Offboarding & reconciliation | Weeks 9–10 |
| **M12** | End-to-end integration testing | Weeks 8–10 |
| **M13** | Customer UAT | Week 11 |
| **M14** | Production readiness & Go-Live | Week 12 |

\* F5 and Backup/DR dependent on architecture, API access, and technical confirmation — see **Section 6.3** for the exact fallback rule if F5 remains unresolved at kickoff.

**Target cadence:**

| Period | Focus |
|---|---|
| Weeks 1–7 | Parallel development across integration teams |
| Weeks 8–10 | Integration, E2E, stabilisation |
| Week 11 | Customer UAT |
| Week 12 | Production readiness and Go-Live |

---

## 11. Open items for signature

### Closed (confirmed for this SoW)

- Physical Palo Alto via Panorama — no VM-Series
- VCD API first; direct NSX-T Manager API where VCD does not expose the operation
- StackConsole Internal IP Manager — four functional requirements (Section 3)
- No external IPAM (Infoblox / NetBox)

### Open (must close before final SoW signature)

| # | Item | Affects |
|---|---|---|
| 1 | F5 architecture (Section 6.3 questions) | WS-6 scope and timeline |
| 2 | Panorama commit/push partial-failure compensation design | WS-4 acceptance |
| 3 | Customer self-service zone boundaries within VSYS | WS-4 portal UX |
| 4 | Veeam / Odoo / DNS depth for WS-9 | Optional scope |
| 5 | VPC Plane 2 (declarative blueprint) | Explicit exclusion unless added |
| 6 | Timeline start-date anchor — reconcile Section 10's "Week 1" against the June 2026 reference date in DataMount's v1.4 source document | Confidence of all absolute dates in Section 10 |

---

## 12. Sign-off

By signing below, both parties agree to the scope, boundaries, workflows, and acceptance criteria defined in this Statement of Work.

**Selected delivery package:** ☐ A Full programme · ☐ B IPAM first · ☐ C Infra connectors · ☐ D CMP baseline · ☐ E Add-ons (specify): _______________

| | StackConsole | DataMount |
|---|---|---|
| **Name** | | |
| **Title** | | |
| **Signature** | | |
| **Date** | | |

**Acceptance checklist (customer):**

- [ ] Confirmed architecture (Section 2) reviewed and accepted
- [ ] IP management requirements (Section 3) reviewed and accepted
- [ ] Provisioning workflow and rollback rules (Section 4, 7) reviewed and accepted
- [ ] Workstream boundaries and selected package (Sections 5, 9) reviewed and accepted
- [ ] In scope / out of scope (Section 6) reviewed and accepted
- [ ] Open items (Section 11) acknowledged; blockers assigned owners and target dates
- [ ] Timeline (Section 10) reviewed; assumptions accepted or noted

---

*End of Statement of Work — DataMount · StackConsole · September 2026 · v1.1*

</div>
