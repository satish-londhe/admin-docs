---
title: "Offboarding"
---

# Offboarding — reverse teardown

**CMP posture:** **Custom** — reverse-order multi-system teardown keyed by Service ID. Billing cancellation / final invoice patterns are **Available**; Odoo termination event is **Custom**.

**Prev:** [Day-2 and lifecycle](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396623879) · **Hub:** [DataMount Integration Review](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396722177)

---

## DataMount ideal

Mirror of provisioning, run in **reverse**, with explicit rollback semantics reused from [Phase 1](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396787713) transaction model. Every object stamped with Service ID in Phases 2–7 must be found and removed (or verified absent for idempotent retries).

```mermaid
flowchart TB
  Start[Cancel_or_terminate] --> Bill[Close_subscription_final_invoice]
  Bill --> VM[Deprovision_VMs_VCD]
  VM --> F5[Remove_F5_pool_members_VS_partition]
  F5 --> PA[Remove_PA_policy_NAT_BGP_VR_VSYS_commit]
  PA --> NSX[Remove_NSX_BGP_T1_T0_VRF]
  NSX --> VCD[Remove_VCD_networks_Edge_VDC_Org]
  VCD --> IPAM[Release_public_IP_private_subnet_ASN_pair]
  IPAM --> DNS[Delete_A_PTR]
  DNS --> Odoo[Odoo_termination_event]
  Odoo --> Done[Service_Terminated]
```

---

## Teardown sequence

| Order | Domain | Actions | CMP posture |
|---|---|---|---|
| 1 | Billing | Cancel subscription; final invoice / credit as policy | **Available** / tune |
| 2 | VCD | Delete VMs → networks → Edge → VDC → Org (respect async tasks) | **Custom** |
| 3 | F5 | Remove pool members, VS, partition (if Phase 6 was used) | **Custom** |
| 4 | Panorama | Remove security policy → NAT → address objects → BGP peer → VR → zones → VSYS; commit-and-push | **Custom** |
| 5 | NSX-T | Remove BGP → NAT → segments → T1 → T0 VRF | **Custom** |
| 6 | IPAM | Release public IPs, private subnets, ASN pair → **AVAILABLE** | **Custom** |
| 7 | DNS | Delete A / PTR for Service ID | **Partial** |
| 8 | Veeam | Remove jobs / enrollment | **Partial** / **Custom** |
| 9 | Odoo | Termination / close subscription event | **Custom** |
| 10 | Audit | Immutable teardown record | **Available** / extend |

> [!NOTE]
> **Idempotency**
>
> Offboarding must tolerate partial prior runs: existence-check each delete; treat "already gone" as success. **Never release IPAM** while VCD, NSX-T, or Palo Alto objects still reference the addresses — see [Phase 8 — Reconciliation](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396787742).
>


---

## Lifecycle states on release

```
IN_USE → RELEASED → AVAILABLE
```

A mismatch during release (for example, PA NAT still references a released IP) should raise an **orphan resource alert**, not silently reuse the IP.

---

## Billing and customer experience

| Topic | Behaviour |
|---|---|
| Trigger | Customer cancel, admin terminate, or unpaid hard-offboard policy |
| Portal | Clear "terminating / terminated" status; block new orders |
| Prepaid unused credit | Refund / credit per commercial policy — **Discuss** |
| Data retention | Snapshots/backups retention before Veeam removal — **Discuss** |

Return to [Hub](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396722177) · [Integrations matrix](https://stackconsole.atlassian.net/wiki/spaces/DataMount/pages/396525604).
