---
sidebar_position: 8
title: "Tri-annually"
tags: ["billing", "tri-annual", "billing-cycles"]
---

# Tri-annually

**Tri-annually** billing charges customers every **3 years** (36 months) for the longest standard commitment period CMP supports.

| | |
|---|---|
| **Duration** | 36 months (3 years) |
| **Also called** | Every 3 years, tri-annual |

**Configure:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Charge timing | **Full 3-year period** charged at service creation |
| Invoice timing | **Immediately on creation** and each renewal |
| Early deletion | **No refund** — full period still charged ❌ |
| Payment mode | **Prepaid** |

:::

## How tri-annual billing works

Customers commit to a **36-month billing period**. The tri-annual price from the rate card package is charged at service creation and each renewal.

Tri-annual cycles offer the **longest commitment window** — typically the deepest discount per month compared to shorter cycles.

## Billing rules

| Rule | Supported? |
|---|---|
| **FIXED_PRORATA** | ✅ |
| **UNFIXED_PRORATA** | ✅ |
| **DATE_TO_DATE** | ✅ |
| **CALENDAR_MONTH** | ✅ |

Pro-rata for partial periods uses cycle price ÷ 36 for monthly equivalent. See [Billing Rules](/billing/billing-rules/).

## Payment modes

| Mode | Supported? |
|---|---|
| **Prepaid** | ✅ |
| **Postpaid** | Not typical — contact StackConsole |
| **Manual** | ✅ |

## Invoice and renewal

| Event | Behaviour |
|---|---|
| **Service creation** | Invoice generated immediately |
| **Renewal** | Renewal invoice every 36 months |
| **Prepaid** | Full tri-annual amount deducted from wallet at creation |

## Early deletion

No refund for unused time. The **full 3-year period** is charged even if the customer deletes the service early.

:::warning[Long-term commitment]

Tri-annual plans require the strongest customer communication on **non-refundable** terms. CMP does not support partial refunds — see [Billing Cycles](/billing/billing-cycles/).

:::

## Service contracts

Tri-annual maps to a **36-month contract duration** when the contract system is enabled with **DATE_TO_DATE** billing rule.

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Bi-annually](/billing/billing-cycles/bi-annually)
* [Annually](/billing/billing-cycles/annually)
