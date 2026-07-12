---
sidebar_position: 5
title: "Semi-annually"
tags: ["billing", "semi-annual", "billing-cycles"]
---

# Semi-annually

**Semi-annually** billing charges customers every **6 months** for a committed half-year period.

| | |
|---|---|
| **Duration** | 6 months |
| **Also called** | Semi-annual, 6-month billing |

**Configure:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Charge timing | **Full 6-month period** charged at service creation |
| Invoice timing | **Immediately on creation** and each renewal |
| Early deletion | **No refund** — full period still charged ❌ |
| Payment mode | **Prepaid** |

:::

## How semi-annual billing works

Customers commit to a **6-month billing period**. The semi-annual price from the rate card package is charged at service creation and each renewal.

Longer fixed cycles suit customers who want a **mid-to-long term commitment** at a lower effective monthly rate than monthly billing.

## Billing rules

| Rule | Supported? |
|---|---|
| **FIXED_PRORATA** | ✅ |
| **UNFIXED_PRORATA** | ✅ |
| **DATE_TO_DATE** | ✅ |
| **CALENDAR_MONTH** | ✅ |

Pro-rata calculations for partial periods follow the same principles as [Quarterly](/billing/billing-cycles/quarterly) — daily rate derived from the semi-annual package price divided by duration. See [Billing Rules](/billing/billing-rules/).

## Payment modes

| Mode | Supported? |
|---|---|
| **Prepaid** | ✅ |
| **Postpaid** | Contact StackConsole — longer cycles are typically prepaid |
| **Manual** | ✅ |

## Invoice and renewal

| Event | Behaviour |
|---|---|
| **Service creation** | Invoice generated immediately |
| **Renewal** | Renewal invoice every 6 months |
| **Prepaid** | Full semi-annual amount deducted from wallet at creation |

## Early deletion

CMP does **not** refund unused time on semi-annual plans. The full committed period is charged even if the service is deleted early.

## Service contracts

Semi-annual maps to a **6-month contract duration** when the contract system is enabled with **DATE_TO_DATE** billing rule.

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Quarterly](/billing/billing-cycles/quarterly)
* [Annually](/billing/billing-cycles/annually)
