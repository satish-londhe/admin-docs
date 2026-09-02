---
sidebar_position: 11
title: "Phase 5 — BGP validation gate"
tags: ["engagement", "datamount", "bgp", "networking"]
---

# Phase 5 — BGP validation gate

**CMP posture:** **Custom** — hard gate before compute (Phase 7) and recommended before F5 (Phase 6). Retry with backoff (document window ~**10 minutes**) and compensation of Phases 3–4 are orchestration features not in product today.

<div class="no-print">

**Prev:** [Phase 4 — Panorama](/engagements/datamount/phase-4-panorama) · **Next:** [Phase 6 — F5](/engagements/datamount/phase-6-f5)

</div>

---

## DataMount ideal

Explicit **poll-and-validate** step — not an assumption that API calls succeeded. VCD and NSX-T operations are asynchronous; the gate queries live routing state.

```mermaid
flowchart TB
  Start[Phases_3_and_4_done] --> CheckT1[T1_customer_prefix_visible_at_T0]
  CheckT1 --> CheckNSX[NSX_T_BGP_with_PA_Established]
  CheckNSX --> CheckPA[Palo_Alto_BGP_Established]
  CheckPA --> CheckRoutes[Expected_routes_received_advertised]
  CheckRoutes --> Ok{All_pass}
  Ok -->|Yes| Continue[Phase_6_and_7]
  Ok -->|No| Retry[Retry_with_backoff]
  Retry --> Window{Within_window}
  Window -->|Yes| CheckT1
  Window -->|No| Rollback[Compensate_Phases_3_4_2]
  Rollback --> Billing[Credit_CMP_wallet_and_alert]
```

---

## Gate checks

| Check | System | Success criteria | CMP posture |
|---|---|---|---|
| T1 → T0 advertisement | NSX-T | Customer prefixes learned on T0 VRF | **Custom** |
| NSX-T ↔ Panorama peers | NSX-T + Panorama | Neighbor state **Established** (not Down) | **Custom** |
| Route visibility on PA | Panorama / firewall | Expected prefixes in VR routing table | **Custom** |
| Retry | CMP orchestration | Backoff within ~10 minute window | **Custom** |
| Fail | CMP + connectors | Compensate Phases 3–4 (and VCD Phase 2 if needed); release IPAM; alert admin | **Custom** |

:::danger[Hard stop]

CMP must **not** proceed to [Phase 7 — Compute](/engagements/datamount/phase-7-compute) until this gate returns success. [Phase 6 — F5](/engagements/datamount/phase-6-f5) should also wait until the gate passes — network ready before load balancer or VM provisioning.

:::

---

## On failure

| Action | Order |
|---|---|
| Stop workflow | Mark Workflow Instance failed / compensating |
| Tear down Panorama objects | Reverse Phase 4 (policy → NAT → BGP → VR → zones → VSYS) with commit-and-push |
| Tear down NSX-T objects | Reverse Phase 3 (NAT → BGP → segments → T1 → T0 VRF) |
| Tear down VCD (if needed) | Reverse Phase 2 if Org/VDC cannot remain without routing |
| Release IPAM | Public IPs, private subnet, ASN pair from Phase 1 |
| Billing | Credit CMP wallet — see [Day-2](/engagements/datamount/day-2-and-lifecycle) |
| Notify | Platform admin alert + customer-safe status in portal |

On success → optional [Phase 6 — F5](/engagements/datamount/phase-6-f5), then [Phase 7 — Compute](/engagements/datamount/phase-7-compute).
