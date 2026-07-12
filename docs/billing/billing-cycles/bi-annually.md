---
sidebar_position: 7
title: "Bi-annually"
tags: ["billing", "bi-annual", "billing-cycles"]
---

# Bi-annually

**Bi-annually** billing charges customers every **2 years** (24 months) for a committed long-term period.

| | |
|---|---|
| **Duration** | 24 months (2 years) |
| **Also called** | Every 2 years, bi-annual |

**Configure:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Charge timing | **Full 2-year period** charged at service creation |
| Invoice timing | **Immediately on creation** and each renewal |
| Early deletion | **No refund** — full period still charged ❌ |
| Payment mode | **Prepaid** |

:::

## How bi-annual billing works

Customers commit to a **24-month billing period**. The bi-annual price from the rate card package is charged at service creation and each renewal.

Bi-annual cycles are for customers seeking **maximum long-term discount** and willing to commit for two full years.

## Billing rules

| Rule | Supported? |
|---|---|
| **FIXED_PRORATA** | ✅ |
| **UNFIXED_PRORATA** | ✅ |
| **DATE_TO_DATE** | ✅ |
| **CALENDAR_MONTH** | ✅ |

Pro-rata calculations follow the same self-cycle formulas as other fixed cycles — cycle price ÷ duration for monthly equivalent. See [Billing Rules](/billing/billing-rules/).

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
| **Renewal** | Renewal invoice every 24 months |
| **Prepaid** | Full bi-annual amount deducted from wallet at creation |

## Early deletion

CMP does **not** support refunds on bi-annual plans. The full 2-year committed charge applies regardless of early deletion.

:::warning[Long-term commitment]

Communicate bi-annual terms clearly to customers. There is **no refund** for unused time — see [Billing Cycles — no refunds](/billing/billing-cycles/#no-refunds-on-early-deletion--fixed-cycles).

:::

## Service contracts

Bi-annual corresponds to a **24-month contract duration** in the contract system when **DATE_TO_DATE** billing is configured.

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Annually](/billing/billing-cycles/annually)
* [Tri-annually](/billing/billing-cycles/tri-annually)
