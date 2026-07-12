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
| Minimum commitment | None for hourly-billed services |

:::

## How hourly billing works

* Billing starts at the **exact creation time**
* Billing stops at **deletion** (or when the service ends)
* No minimum monthly commitment
* Applies to [prepaid](/billing/payment-modes/prepaid), [postpaid](/billing/payment-modes/postpaid), and [manual](/billing/payment-modes/manual) accounts

**Example:** VM created Monday 10:00, deleted Wednesday 14:00 → customer pays only for those hours. Invoice generated at **month end** (or 1st of the following month).

## Billing rule

| Rule | Supported? |
|---|---|
| **FIXED_PRORATA** | ✅ **Always enforced** — even if another rule is configured globally, hourly services use fixed pro-rata |

See [Billing Rules](/billing/billing-rules/) for rule definitions.

## Payment modes

| Mode | Supported? |
|---|---|
| **Prepaid** | ✅ Wallet deducted continuously; month-end invoice per [prepaid model](/billing/payment-modes/prepaid#prepaid-billing-models--end-to-end-workflow) |
| **Postpaid** | ✅ Usage records maintained; consolidated invoice at month end; auto-charge |
| **Manual** | ✅ Invoice generated; offline payment |

## Invoice timing

For hourly services, invoices are generated at the **end of the month** or on the **1st of the following month** — regardless of payment mode. All hourly usage during the month is consolidated into a **single invoice**.

## Stoppable services

When [stoppable services](/billing/billing-rules/#stoppable-services) are enabled and a customer **stops** a VM:

| Component | Hourly billing while stopped? |
|---|---|
| **CPU and memory** | ❌ Stops |
| **Volumes (storage)** | ✅ Continues |
| **IP address** | ✅ Continues |

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

## Disabling hourly on other services

VM, volumes, load balancer, VPC, and Kubernetes packages typically support hourly billing by default. Disabling hourly billing system-wide for these services requires **impact analysis in staging** before production changes.

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Monthly](/billing/billing-cycles/monthly)
* [Pricing Formulas](/rate-cards/pricing-formulas)
