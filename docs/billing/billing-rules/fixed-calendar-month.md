---
sidebar_position: 6
title: "FIXED_CALENDAR_MONTH"
tags: ["billing", "rules", "calendar-month", "fixed-calendar-month"]
---

# FIXED_CALENDAR_MONTH

**FIXED_CALENDAR_MONTH** aligns the first invoice to **calendar period boundaries** from the start of the creation month or year — without a separate daily pro-rata for partial days in the creation month.

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Alignment | Calendar month or year boundaries |
| Pro-rata days | Not split daily — period starts at calendar boundary |
| Typical use | Yearly billing aligned to calendar year |

:::

## Yearly example

| | |
|---|---|
| **Service created** | 25 Apr 2025 |
| **Billing cycle** | Yearly |

| Invoice period |
|---|
| **1 Apr 2025 → 31 Dec 2025** |

The first invoice covers from the **start of the creation month** (or configured calendar boundary) through the end of the calendar year — not from the exact creation date.

## Comparison with other rules

| Rule | Service created 25 Apr 2025 (yearly) | First invoice period |
|---|---|---|
| **FIXED_CALENDAR_MONTH** | Calendar-aligned | 1 Apr 2025 → 31 Dec 2025 |
| [FIXED_PRORATA](/billing/billing-rules/fixed-prorata) | Daily pro-rata + remaining months | Pro-rata Apr 25–30 + full months to year end |
| [DATE_TO_DATE](/billing/billing-rules/date-to-date) | Creation anniversary | 25 Apr 2025 → 24 Apr 2026 |
| [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month) | Pro-rata month + rolling year | Pro-rata Apr 1–30 + May 2025 – Apr 2026 |

## Supported billing cycles

Monthly, quarterly, semi-annual, yearly, bi-annual, and tri-annual — see [Billing Rules — cycle support](/billing/billing-rules/#which-billing-cycles-support-which-rules).

## Related

* [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month)
* [FIXED_PRORATA](/billing/billing-rules/fixed-prorata)
* [Billing Rules](/billing/billing-rules/)
