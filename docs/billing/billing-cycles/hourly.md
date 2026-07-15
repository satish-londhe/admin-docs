---
sidebar_position: 2
title: "Hourly"
tags: ["billing", "hourly", "payg", "billing-cycles"]
---

# Hourly

**Hourly** billing (also **pay-as-you-go** or **PAYG**) charges customers **only for the time a service is actually running**.

| | |
|---|---|
| **Duration** | Per hour |
| **Also called** | PAYG, pay-as-you-go |
| **Best for** | Variable workloads, dev/test, short-lived services |

**Configure:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Billing start | Exact **creation time** |
| Billing stop | **Deletion** or service end |
| Invoice timing | **End of month** — all hourly usage consolidated into one invoice |
| Early deletion | Customer pays only for **hours used** ✅ |
| Minimum billable unit | **1 hour** — partial hours are rounded up to a full hour |
| **Postpaid** | ✅ **Recommended** — one of two cycles suitable for postpaid (with [monthly](/billing/billing-cycles/monthly)) |

:::

## How hourly billing works

* Billing starts at the **exact creation time**
* Billing stops at **deletion** (or when the service ends)
* **Minimum billable unit is 1 hour** — usage is charged in whole-hour increments. If a service runs for 15 minutes, CMP still bills **one full hour**
* No minimum monthly commitment
* Applies to [prepaid](/billing/payment-modes/prepaid), [postpaid](/billing/payment-modes/postpaid), and [manual](/billing/payment-modes/manual) accounts

**Example:** VM created Monday 10:00, deleted Wednesday 14:00 → customer pays only for those hours (each partial hour counts as a full hour). Invoice generated at **month end** (or 1st of the following month).

:::info[Partial-hour usage]

The smallest billing increment is **one hour**. A service used for **15 minutes** is billed as **1 hour**, not as a fraction of an hour.

:::

## Billing rule

| Rule | Supported? |
|---|---|
| **FIXED_PRORATA** | ✅ **Always enforced** — even if another rule is configured globally, hourly services use fixed pro-rata |

See [Billing Rules](/billing/billing-rules/) for rule definitions.

## Payment modes

| Mode | Supported? |
|---|---|
| **Prepaid** | ✅ Wallet deducted continuously; month-end invoice per [prepaid model](/billing/payment-modes/prepaid#prepaid-billing-models--end-to-end-workflow) |
| **Postpaid** | ✅ **Recommended** — usage at month end; see [Billing Cycles — postpaid](/billing/billing-cycles/#billing-cycles-and-payment-modes) |
| **Manual** | ✅ Invoice generated; offline payment |

## Invoice timing

For hourly services, invoices are generated at the **end of the month** or on the **1st of the following month** — regardless of payment mode. All hourly usage during the month is consolidated into a **single invoice**.

## Stoppable services

Whether compute charges pause while a VM or Kubernetes cluster is stopped is controlled by **`enable_stoppable_service_billing`**.

When the flag is **ON** and a customer **stops** a VM (or K8s):

| Component | Hourly billing while stopped? |
|---|---|
| **CPU / memory (compute)** | ❌ Stops |
| **Volumes (storage)** | ✅ Continues |
| **IP address** | ✅ Continues |

When the flag is **OFF**, compute and storage **both continue** billing while stopped.

Full detail: [Stoppable Services](/billing/stoppable-services).

## Mandatory hourly services

The following service types **always use hourly billing** — monthly and longer cycles are **not available**:

| Service type | CMP package |
|---|---|
| `VM_SNAPSHOT` | VM Snapshot |
| `BS_SNAPSHOT` | Volumes Snapshot |
| `BACKUP` | VM Backup |
| `BS_BACKUP` | Block storage backup |
| `BANDWIDTH` | Unit Pricing |
| `ACCOUNT_TEMPLATE` | Template |
| `ISO` | ISO |

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Stoppable Services](/billing/stoppable-services)
* [Monthly](/billing/billing-cycles/monthly)
* [Pricing Formulas](/rate-cards/pricing-formulas)
