---
sidebar_position: 7
title: "UNFIXED_CALENDAR_MONTH"
tags: ["billing", "rules", "calendar-month", "unfixed-calendar-month"]
---

# UNFIXED_CALENDAR_MONTH

**UNFIXED_CALENDAR_MONTH** combines a **calendar-month pro-rata** for the creation month with a **rolling full-cycle** invoice starting the 1st of the next month.

:::tip[Quick start]

| Step | Invoice |
|---|---|
| 1 | **Pro-rata invoice** — 1st of creation month → last day of creation month |
| 2 | **Next fixed invoice** — 1st of next month → end of full cycle period |

:::

## Yearly example

| | |
|---|---|
| **Service created** | 25 Apr 2025 |
| **Billing cycle** | Yearly |

| Invoice | Period |
|---|---|
| **Pro-rata invoice** | 1 Apr 2025 → 30 Apr 2025 |
| **Next fixed invoice** | 1 May 2025 → 30 Apr 2026 |

The pro-rata invoice covers the **full creation calendar month** (from the 1st), not just from the creation date. The next invoice is a full **12-month** period from the 1st of the following month.

## Comparison with FIXED_CALENDAR_MONTH

| Rule | Pro-rata scope | Next invoice start |
|---|---|---|
| **UNFIXED_CALENDAR_MONTH** | Full creation month (1st → last day) | 1st of **next** month, rolling cycle |
| [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month) | No separate pro-rata — single calendar-aligned period | Calendar year/month boundary |

## Supported billing cycles

Monthly, quarterly, semi-annual, yearly, bi-annual, and tri-annual — see [Billing Rules — cycle support](/billing/billing-rules/#which-billing-cycles-support-which-rules).

## Related

* [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month)
* [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata)
* [Billing Rules](/billing/billing-rules/)
