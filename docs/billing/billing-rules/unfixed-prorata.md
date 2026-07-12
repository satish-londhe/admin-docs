---
sidebar_position: 4
title: "UNFIXED_PRORATA"
tags: ["billing", "rules", "prorata", "unfixed-prorata"]
---

# UNFIXED_PRORATA

**UNFIXED_PRORATA** is mostly applicable to **quarterly**, **semi-annual**, and **yearly** billing cycles. Unlike [FIXED_PRORATA](/billing/billing-rules/fixed-prorata), the next invoice period starts from the **month after creation** — not aligned to calendar quarters.

:::tip[Quick start]

| Step | Invoice |
|---|---|
| 1 | **Pro-rata invoice** — creation date → end of creation month |
| 2 | **Next unfixed invoice** — 1st of next month → end of full cycle period |

:::

## How it works

1. **Pro-rata invoice** — charged for remaining days in the **creation month** only
2. **Next unfixed invoice** — full billing cycle period starting **1st of the following month**, regardless of calendar quarter boundaries

## Yearly example

| | |
|---|---|
| **Service created** | 25 Apr 2025 |
| **Billing cycle** | Yearly |

| Invoice | Period |
|---|---|
| **Pro-rata invoice** | 25 Apr 2025 → 30 Apr 2025 |
| **Next unfixed invoice** | 1 May 2025 → 30 Apr 2026 |

## Quarterly example

Calendar quarters are Jan–Mar, Apr–Jun, Jul–Sep, Oct–Dec — but under UNFIXED_PRORATA, the next invoice is **not** forced to a quarter boundary.

| | |
|---|---|
| **Service created** | 25 Feb 2025 |
| **Billing cycle** | Quarterly |

| Invoice | Period |
|---|---|
| **Pro-rata invoice** | 25 Feb 2025 → 28 Feb 2025 |
| **Next unfixed invoice** | 1 Mar 2025 → 31 May 2025 |

A pro-rata invoice is generated for the creation month's remaining days, then the next **3-month** invoice is generated from the 1st of the following month — regardless of which calendar quarter the service was created in.

## When to use

| Choose UNFIXED_PRORATA when… | Choose FIXED_PRORATA when… |
|---|---|
| You want the full cycle to run from the month after signup | You need alignment to calendar quarters or years |
| Quarterly/semi-annual/yearly with simple month-offset periods | Pro-rata + remaining months within a fixed calendar period |

## Related

* [FIXED_PRORATA](/billing/billing-rules/fixed-prorata)
* [DATE_TO_DATE](/billing/billing-rules/date-to-date)
* [Billing Rules](/billing/billing-rules/)
