---
sidebar_position: 3
title: "Suspend"
tags: ["billing", "disciplinary", "suspend", "stoppable", "prepaid", "postpaid"]
---

# Suspend

**Suspend** disables normal portal use until dues are cleared. The customer can typically only reach **billing / payment** flows. Stoppable cloud resources (VMs, Kubernetes, and similar) are **stopped** while allocated resources (disks, IPs, and so on) usually remain.

## When suspend is applied

After the configured **suspension grace period** from:

| Mode | Start of clock |
|---|---|
| **Prepaid** | Wallet balance goes **negative** |
| **Postpaid** | Invoice becomes **overdue** |

**Example:** Negative balance on the **15th**, suspension days = **7** → suspend on the **22nd**. A reminder with **Send before = 1** emails on the **21st**. See [Reminder emails and timing](/billing/disciplinary-actions/#reminder-emails-and-timing) for what **0, 1, 2, …** mean.

## Worked example

**Assumptions:** SUSPEND = **7** days, reminder = **1** day before. Same Day 0 as freeze (**15th**). Customer still has due balance after freeze on the **18th**.

| Date | Event | Result |
|---|---|---|
| **15th** | Day 0 — overdue / negative | Clocks running |
| **18th** | Freeze already applied (if FREEZE = 3) | Restricted create/change; VMs still running |
| **21st** | Suspend reminder email | Customer warned |
| **22nd** | **SUSPEND** applied | Billing login only; VMs/K8s **stopped**; renewals/invoices still generate; compute pause depends on [stoppable services](/billing/stoppable-services) |

End-to-end calendar through terminate: [Practical timeline example](/billing/disciplinary-actions/#practical-timeline-example-defaults).

Paying dues on the **20th** or **21st** (and clearing overdue state) should prevent suspension on the **22nd**.

## Access and services

| | While suspended |
|---|---|
| Access existing services (console, create, manage) | ❌ No |
| Create new services | ❌ No |
| Billing module / pay dues | ✅ Yes (primary allowed path) |

In short: **login mainly to pay**.

## Resources affected (stopped or suspended)

When suspension runs, CMP stops or suspends workloads as applicable:

| Resource | Effect when suspended |
|---|---|
| **Virtual Machines** | Stopped |
| **Kubernetes** | Stopped |
| **Load Balancer** | No automatic stop listed (confirm per build if LB appliances are affected) |
| **Auto Scaling** | Stopped / suspended |
| **Backups** | Stopped / suspended (confirm in your CMP version) |
| **Object Storage** | Account suspended at the **CEPH** level (when CEPH-backed) |
| **VNF** | Stopped / suspended |
| **Networks** | No automatic delete |
| **IP addresses** | Remain allocated (no automatic release) |

:::info[Confirm backups behaviour]

Backup job behaviour under suspension can vary by CMP/orchestrator version. Validate on staging before relying on a specific outcome in customer communications.

:::

## Invoices during suspension

For suspended accounts, CMP **continues to generate invoices** for active (still allocated) services — even when VMs are in a **stopped** state.

Suspension **does not** delete services and **does not** by itself turn off invoicing.

## Billing during suspension and stoppable services

Because suspension **stops** VMs and Kubernetes, compute charges follow [`enable_stoppable_service_billing`](/billing/stoppable-services):

| Flag | Compute (VM / K8s) while stopped by suspension | Disk / storage |
|---|---|---|
| **ON (`true`)** | **No** compute charges for stopped hours | **Continues** (storage still allocated) |
| **OFF (`false`)** | Compute **continues** for the full period | **Continues** |

:::danger[Critical — override root disk]

Stoppable compute pause requires **override root disk** so compute and storage are billed separately. See [Stoppable Services](/billing/stoppable-services).

:::

## Billing and invoicing summary (suspend)

| Topic | Behaviour |
|---|---|
| **Services** | Stopped where applicable; **not** deleted; resources still held |
| **Billing** | Continues for allocated resources (modulo stoppable compute rules) |
| **Renewals** | Automatic renewal invoices **still generate** |
| **Invoicing** | Continues — suspend stops workloads, not the bill |

## Admin options

* **Revoke suspension** to restore access for a short payment window  
* **Exclude** the account from disciplinary actions for enterprise / manual payment cases  
* Notify extra email addresses when suspension triggers  

See [Disciplinary Actions — admin controls](/billing/disciplinary-actions/#admin-controls-summary) and [account-level settings](/billing/disciplinary-actions/#account-level-disciplinary-settings).

## Related

* [Disciplinary Actions](/billing/disciplinary-actions/)
* [Freeze](/billing/disciplinary-actions/freeze)
* [Terminate](/billing/disciplinary-actions/terminate)
* [Stoppable Services](/billing/stoppable-services)
* [Postpaid — disciplinary renewals](/billing/payment-modes/postpaid#disciplinary-actions-and-renewals)
