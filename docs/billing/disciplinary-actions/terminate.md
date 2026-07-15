---
sidebar_position: 4
title: "Terminate"
tags: ["billing", "disciplinary", "terminate", "prepaid", "postpaid"]
---

# Terminate

**Terminate** is the final disciplinary stage. CMP **blocks customer portal access**. Clearing cloud resources is **deliberately manual** — an admin (after confirmation with the customer / provider support) must remove services.

## When terminate is applied

After the configured **termination grace period** from:

| Mode | Start of clock |
|---|---|
| **Prepaid** | Wallet balance goes **negative** |
| **Postpaid** | Invoice becomes **overdue** |

**Example:** Negative balance on the **15th**, termination grace = **14** days → terminate on the **29th**. A reminder with **Send before = 1** emails on the **28th**. See [Reminder emails and timing](/billing/disciplinary-actions/#reminder-emails-and-timing).

## Worked example

**Assumptions:** TERMINATE = **14** days, reminder = **1** day before. Day 0 = **15th**. Customer never clears the due balance after freeze (**18th**) and suspend (**22nd**).

| Date | Event | Result |
|---|---|---|
| **15th** | Day 0 — overdue / negative | Clocks start |
| **18th** | Freeze | Create/change blocked |
| **22nd** | Suspend | VMs stopped; billing-only access |
| **28th** | Terminate reminder email | Final warning to customer + staff emails |
| **29th** | **TERMINATE** applied | Portal **blocked**; admin must delete services manually; **no new invoices**; old unpaid invoices remain |

Full table: [Practical timeline example](/billing/disciplinary-actions/#practical-timeline-example-defaults).

Paying or admin settlement **before the 29th** (plus clearing overdue / negative state) is required to avoid termination. After terminate, restoring the customer is an admin process — portal access is gone for self-service payment.

## What happens when an account is terminated

| Area | Behaviour |
|---|---|
| **CMP portal** | Completely **blocked** for the customer |
| **Existing services** | Customer cannot access them via CMP |
| **Resource cleanup** | **Not** fully automatic — admin must clear services manually |

Typical workload effects at termination (aligned with suspension-style stops; cleanup remains admin-driven):

| Resource | Typical effect |
|---|---|
| **Virtual Machines** | Stopped |
| **Kubernetes** | Stopped |
| **Load Balancer / Auto Scaling / Backups / VNF** | Stopped or suspended as applicable |
| **Object Storage** | Account suspended at **CEPH** level when used |
| **Networks / IP addresses** | Remain until admin cleanup |

:::warning[Manual cleanup on purpose]

Termination **restricts portal access**. Deleting all account services is a **sensitive** step. Carry it out only after confirming with the customer through your support process. CMP does not silently wipe every resource on terminate.

:::

In short: customer **cannot** use CMP; admin **must** delete services manually when appropriate.

## Invoices after termination

| Topic | Behaviour |
|---|---|
| **New invoices** | System **does not** generate new invoices after termination |
| **Existing unpaid invoices** | Remain as-is — **not** auto-cancelled or adjusted |
| **Admin responsibility** | Cancel invoices manually if needed; handle recovery or disputes offline |

Renewal invoices also **stop** for terminated accounts (see [Postpaid — disciplinary renewals](/billing/payment-modes/postpaid#disciplinary-actions-and-renewals)).

## Billing after cleanup

Once the admin removes resources, consumption stops, so ongoing product billing logically ends. Outstanding dues from **before** termination are still an admin / finance process — the platform does not auto-write them off.

## Admin options

Before or after a terminate event (policies permitting):

* Revoke or delay termination while negotiating payment  
* Exclude strategic customers from the terminate stage  
* Use reminder and extra notification emails for escalation  

See [Disciplinary Actions — admin controls](/billing/disciplinary-actions/#admin-controls-summary) and [account-level settings](/billing/disciplinary-actions/#account-level-disciplinary-settings).

## Related

* [Disciplinary Actions](/billing/disciplinary-actions/)
* [Freeze](/billing/disciplinary-actions/freeze)
* [Suspend](/billing/disciplinary-actions/suspend)
* [Stoppable Services](/billing/stoppable-services)
* [Prepaid](/billing/payment-modes/prepaid)
* [Postpaid](/billing/payment-modes/postpaid)
