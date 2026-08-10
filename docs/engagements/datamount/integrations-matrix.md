---
sidebar_position: 13
title: "Integrations matrix"
tags: ["engagement", "datamount", "integrations"]
---

# Integrations and orchestration matrix

:::warning[Engagement-only — confidential]

Internal / vendor–client review. Not general product documentation.

:::

**Hub:** [DataMount Integration Review](/engagements/datamount/)

Status legend: **Available** · **Partial** · **Custom** · **Discuss**

---

## Infrastructure integrations

| Integration | Requested features | CMP posture | Remarks |
|---|---|---|---|
| **NSX-T Manager** | T0 VRF, T1, segments, NAT, BGP, route queries, micro-seg | **Custom** | Required before VCD |
| **Palo Alto Panorama** | VSYS, DG/templates, zones, VR, BGP, NAT, VPN, commit-and-push | **Custom** | Direct PAN-OS API not acceptable |
| **F5 BIG-IP** | Partitions, VS, pools, monitors, SSL, WAF, stats | **Custom** | Per-customer partition isolation |
| **DNS** | Create/delete A and PTR | **Partial** | PowerDNS APIs **Available**; **no** auto from VM/IP create |
| **IPAM** | Allocate / reserve / release public IPs and private subnets | **Custom** | Infoblox / NetBox — confirm platform |
| **Veeam** | Enroll, remove, restore, job status | **Partial** | Subscription + dashboard **Available**; VM add/manage **manual**; auto enroll **Custom** |
| **Odoo ERP** | Outbound orders, usage, credit notes, termination | **Custom** | CMP → Odoo only; not implemented |
| **Payment gateway** | Charge, renewals, confirmations | **Available** | [Payment gateways](/billing/payment-gateways/) |
| **VCD** | Org, VDC, Edge, catalog, VM, networks | **Custom** | vCenter exists; VCD required for blueprint |
| **vCenter** | Compute lifecycle | **Partial** / **Available** | Present today; insufficient alone for DataMount Org/VDC/Edge flow |

---

## CMP core platform

| Capability | Requested | CMP posture |
|---|---|---|
| Billing engine | Subscriptions, recurring, metering, dashboard | **Available** |
| Payment processing | Prepaid / postpaid + gateways | **Available** |
| Customer portal | Self-service + billing + usage | **Available** |
| Users / tenants / RBAC | Customers, orgs, roles | **Available** |
| Reseller hierarchy | Reseller above tenant | **Partial** |
| Approval engine | Firewall / WAF change queue | **Custom** for Panorama/F5; other approval patterns exist |
| Audit logging | Action, before/after, API codes | **Available** / extend |
| Notifications | Welcome, status, alerts | **Available** — [Notifications](/platform-features/notifications) |
| API-first | REST | **Available** — [APIs](/platform-features/apis) |
| Multi-currency / localization | GCC VAT, languages | **Partial** |
| HA deployment | Active/active or standby | **Available** as topology |
| Security | MFA, secrets, PCI scope | **Partial** — [2FA](/auth/2fa); infra secrets vault **Discuss** |

---

## Orchestration capabilities

| Workflow capability | CMP posture | Notes |
|---|---|---|
| Persistent workflow engine / resume | **Custom** | Workflow Instance ID |
| Idempotency / Service ID keys | **Custom** | Universal convention |
| Rollback / compensation saga | **Custom** | Reverse order + billing refund/credit |
| Capacity pre-check before charge | **Custom** | Compute + ASN + public IP |
| Atomic reservation | **Custom** | Single transaction across pools |
| Multi-system transactions | **Custom** | VCD + NSX + Panorama + F5 + DNS + IPAM + billing |
| Acceptance smoke tests | **Custom** | DNAT / VPN / F5 VIP probes |
| BGP validation gate | **Custom** | Mandatory before Phase 4 |
| Panorama commit serialization | **Custom** | Global commit lock / queue |
| Retry with backoff | **Custom** | Especially BGP window (~10 min) |
| Day-2 plan change / add-ons | **Partial** / **Custom** | Billing Partial; infra Custom |
| Drift reconciliation | **Custom** | By Service ID tag |
| Offboarding reverse teardown | **Custom** | [Offboarding](/engagements/datamount/offboarding) |
| Change-approval firewall/WAF | **Custom** | |
| Certificate and PSK rotation | **Custom** | |
| Backup and DR orchestration | **Partial** / **Custom** | Beyond manual Veeam |
| Suspension and reactivation | **Available** | Disciplinary flows |
| Recurring billing loop | **Available** | Odoo step **Custom** |
| Secure credential handoff | **Partial** / **Discuss** | Portal Available; one-time link **Discuss** |

---

## Why VCD alone is not enough

| Challenge | Why CMP orchestration is required |
|---|---|
| End-to-end provisioning | Spans billing, NSX-T, Panorama, F5, DNS, IPAM, Veeam, Odoo |
| Payment-driven start | Outside VCD |
| Network-first + BGP gate | VCD has no awareness of external routing validation |
| Customer isolation | Org + VRF + VSYS + F5 partition + IPAM + billing account |
| Rollback | Multi-system compensation |
| Single portal | Infra + billing + usage without context switching |
