---
sidebar_position: 4
title: "Quarterly"
tags: ["billing", "quarterly", "billing-cycles"]
---

# Quarterly

**Quarterly** billing charges customers every **3 months** for a committed quarter-long period.

| | |
|---|---|
| **Duration** | 3 months |
| **Also called** | 3-month billing |

**Configure:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Charge timing | **Full quarter** charged at service creation |
| Invoice timing | **Immediately on creation** and each renewal |
| Early deletion | **No refund** — full period still charged ❌ |
| Payment mode | **Prepaid recommended** |

:::

## How quarterly billing works

Customers commit to a **3-month billing period**. The full quarterly price from the rate card package is charged at service creation and each renewal.

Under **FIXED_PRORATA**, billing periods align to **calendar quarters**:

| Quarter | Period |
|---|---|
| **Q1** | January – March (ends March 31) |
| **Q2** | April – June (ends June 30) |
| **Q3** | July – September (ends September 30) |
| **Q4** | October – December (ends December 31) |

## Billing rules

| Rule | Supported? |
|---|---|
| **FIXED_PRORATA** | ✅ |
| **UNFIXED_PRORATA** | ✅ |
| **DATE_TO_DATE** | ✅ |
| **CALENDAR_MONTH** | ✅ |

### Pro-rata example

Service created **4 Feb 2025**, quarterly price **$300** (with `PRO_RATA_PRICE_FROM_SELF_CYCLE=true`):

| Component | Calculation |
|---|---|
| Monthly equivalent | $300 ÷ 3 = **$100** |
| Daily cost | $100 ÷ 30.5 ≈ **$3.28** |
| Pro-rata (4 Feb → 28 Feb) | $3.28 × 25 days ≈ **$82** |
| March (1 full month) | $100 × 1 = **$100** |
| **Total (one invoice)** | ≈ **$182** |

See [FIXED_PRORATA](/billing/billing-rules/fixed-prorata) for full pro-rata formulas.

## Payment modes

| Mode | Supported? |
|---|---|
| **Prepaid** | ✅ **Recommended** |
| **Postpaid** | ✅ |
| **Manual** | ✅ |

## Invoice and renewal

| Event | Behaviour |
|---|---|
| **Service creation** | Invoice generated immediately; full quarter or pro-rata + remaining months per billing rule |
| **Renewal** | Renewal invoice generated per billing rule and payment mode |
| **Prepaid** | Wallet deducted at creation — insufficient balance blocks provisioning |

## Early deletion

No refund for unused quarter time. Full committed period charge applies.

## Service contracts

Quarterly is a supported contract duration when [DATE_TO_DATE](/billing/billing-rules/date-to-date) billing rule and postpaid or manual payment mode are configured.

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Monthly](/billing/billing-cycles/monthly)
* [Semi-annually](/billing/billing-cycles/semi-annually)
* [Billing Rules](/billing/billing-rules/)
