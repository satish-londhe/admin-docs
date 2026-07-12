---
sidebar_position: 6
title: "Annually"
tags: ["billing", "yearly", "annual", "billing-cycles"]
---

# Annually

**Annually** billing (also **yearly** or **annual**) charges customers once per **12-month period**.

| | |
|---|---|
| **Duration** | 12 months |
| **Also called** | Yearly, annual |

**Configure:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Charge timing | **Full year** charged at service creation |
| Invoice timing | **Immediately on creation** and each renewal |
| Early deletion | **No refund** — full period still charged ❌ |
| Payment mode | **Prepaid** |

:::

## How annual billing works

Customers commit to a **12-month billing period**. The yearly price from the rate card package is charged at service creation and each renewal.

Annual plans typically offer the **lowest effective monthly rate** for customers willing to commit for a full year.

Under **FIXED_PRORATA**, yearly billing aligns to the **calendar year** (January 1 – December 31) for period boundaries.

## Billing rules

| Rule | Supported? |
|---|---|
| **FIXED_PRORATA** | ✅ |
| **UNFIXED_PRORATA** | ✅ |
| **DATE_TO_DATE** | ✅ |
| **CALENDAR_MONTH** | ✅ |

Pro-rata for partial years uses the yearly package price ÷ 12 for monthly equivalent, then daily rate ÷ 30.5. See [Billing Rules](/billing/billing-rules/) and [Quarterly — pro-rata example](/billing/billing-cycles/quarterly#pro-rata-example).

## Payment modes

| Mode | Supported? |
|---|---|
| **Prepaid** | ✅ |
| **Postpaid** | Contact StackConsole — longer cycles are typically prepaid |
| **Manual** | ✅ |

## Invoice and renewal

| Event | Behaviour |
|---|---|
| **Service creation** | Invoice generated immediately; full year or pro-rata per billing rule |
| **Renewal** | Renewal invoice every 12 months |
| **Prepaid** | Full annual amount deducted from wallet at creation |

## Early deletion

No refund for unused months. Customer pays for the **full annual period** even if the service is deleted before year end.

## Service contracts

Annual is the most common contract duration — 12-month commitment with optional contract discount. Requires [DATE_TO_DATE](/billing/billing-rules/date-to-date) rule and postpaid or manual payment mode.

When a customer selects yearly billing with contracts enabled, the service is marked as a **contract service** in the portal.

## Pricing

CMP derives yearly from monthly: `Yearly = Monthly × 12`. See [Pricing Formulas](/rate-cards/pricing-formulas).

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Semi-annually](/billing/billing-cycles/semi-annually)
* [Bi-annually](/billing/billing-cycles/bi-annually)
