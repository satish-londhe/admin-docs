---
sidebar_position: 4
title: "Quarterly"
tags: ["billing", "quarterly", "billing-cycles"]
---

# Quarterly

**Quarterly** billing charges customers on a **recurring 3-month** schedule. The **quarterly price** comes from the rate card package; **how much** is charged at creation or renewal and **when** invoices are generated depend on your **[billing rule](/billing/billing-rules/)**, **[payment mode](/billing/payment-modes/)**, and (for postpaid/manual) **advance invoice settings**.

| | |
|---|---|
| **Duration** | 3 months |
| **Also called** | 3-month billing |
| **Best for** | Mid-term commitment |

**Configure pricing:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Topic | Summary |
|---|---|
| **Cycle** | Customer commits to a **3-month** billing period (package **quarterly** price on the rate card) |
| **Charge amount** | Billing rule — **`PRO_RATA`**, **`UNFIXED_PRORATA`**, **`DATE_TO_DATE`**, **`FIXED_CALENDAR_MONTH`**, **`UNFIXED_CALENDAR_MONTH`** (not always full quarter upfront) |
| **When customer pays** | **Prepaid** or **manual** recommended — not postpaid |
| **Advance invoicing** | Optional **manual** flags can generate pro-rata at creation and renewal on the **1st of the month** — see [Monthly — invoice timing](/billing/billing-cycles/monthly#invoice-and-charge-timing) |
| **Postpaid** | ❌ **Not recommended** — revenue and fraud risk over a 3-month period |
| **Early deletion** | **No refund** for unused time in the committed period ❌ |

:::

## What quarterly billing means

A **billing cycle** is how often the service is priced. **Quarterly** means the package’s **quarterly** rate card price applies and the service renews every 3 months.

That does **not** mean CMP always charges a **full quarter on the day the service is created**. The charged amount and invoice timing are determined separately by:

1. **Billing rule** — **`PRO_RATA`**, **`UNFIXED_PRORATA`**, **`DATE_TO_DATE`**, **`FIXED_CALENDAR_MONTH`**, or **`UNFIXED_CALENDAR_MONTH`** — see [below](#charge-amount-by-billing-rule)
2. **[Payment mode](/billing/payment-modes/)** — prepaid wallet deduction vs postpaid/manual invoicing
3. **Advance invoice flags** (postpaid and manual only) — whether payable invoices are generated immediately or usage records convert on renewal

Under **`PRO_RATA`**, billing periods align to **calendar quarters**:

| Quarter | Period |
|---|---|
| **Q1** | January – March (ends March 31) |
| **Q2** | April – June (ends June 30) |
| **Q3** | July – September (ends September 30) |
| **Q4** | October – December (ends December 31) |

## Charge amount by billing rule

Quarterly supports:

| Billing rule | Behaviour |
|---|---|
| **`PRO_RATA`** | Partial start: daily pro-rata to month end, then full remaining month(s) within the calendar quarter. See [FIXED_PRORATA](/billing/billing-rules/fixed-prorata). |
| **`UNFIXED_PRORATA`** | Pro-rata for creation month only; next invoice is a full **3-month** period from the 1st of the following month. See [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata). |
| **`DATE_TO_DATE`** | Each period runs creation date → same date 3 months later − 1 day. See [DATE_TO_DATE](/billing/billing-rules/date-to-date). |
| **`FIXED_CALENDAR_MONTH`** | Calendar-aligned first invoice — see [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month). |
| **`UNFIXED_CALENDAR_MONTH`** | Full creation calendar month pro-rata, then rolling period — see [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month). |

### Pro-rata example — `PRO_RATA`

Service created **4 Feb 2025**, quarterly price **$300**:

| Component | Calculation |
|---|---|
| Monthly equivalent | $300 ÷ 3 = **$100** |
| Daily cost | $100 ÷ 30.5 ≈ **$3.28** |
| Pro-rata (4 Feb → 28 Feb) | $3.28 × 25 days ≈ **$82** |
| March (1 full month) | $100 × 1 = **$100** |
| **Total (one invoice)** | ≈ **$182** |

See [PRO_RATA](/billing/billing-rules/fixed-prorata) for full formulas.

## Invoice and charge timing

Invoice and charge timing follows the same **payment mode** and **advance flag** behaviour as [Monthly billing](/billing/billing-cycles/monthly#invoice-and-charge-timing). Amounts are calculated per the quarterly billing rules above — not always one flat quarterly price at creation.

| Mode | Supported? | Quarterly behaviour (high level) |
|---|---|---|
| **Prepaid** | ✅ **Recommended** | Wallet deducted at creation/renewal; amount per billing rule |
| **Postpaid** | ❌ **Not recommended** | Long outstanding period — revenue delay and fraud risk |
| **Manual** | ✅ | Offline settlement; same invoice timing patterns as monthly |

:::warning[Do not use postpaid]

**Quarterly** billing is **not recommended** with **postpaid** payment mode.

| Risk | Why it matters |
|---|---|
| **Revenue delay** | You may wait **3 months or more** before collecting payment for the committed period |
| **Fraud exposure** | A customer can consume services for the full quarter and leave before paying |

Use **prepaid** (wallet collected upfront) or **manual** (offline settlement with admin verification). **Postpaid** is appropriate only with **[hourly](/billing/billing-cycles/hourly)** and **[monthly](/billing/billing-cycles/monthly)** billing cycles.

See [Billing Cycles — payment modes by cycle](/billing/billing-cycles/#billing-cycles-and-payment-modes).

:::

## Early deletion

Deleting a quarterly service **before the period ends** does **not** reduce the charge. CMP does **not** refund unused time on fixed cycles.

## Service contracts

The **[service contract](/billing/billing-rules/date-to-date#service-contracts)** system applies to **quarterly and longer** billing cycles only — not hourly or monthly.

| Requirement | Value |
|---|---|
| **Billing cycle** | **Quarterly or longer** (this page: **quarterly** = 3-month contract) |
| **Billing rule** | **`DATE_TO_DATE`** only |
| **Payment mode** | **Postpaid** or **manual** — **not prepaid** |

When contracts are enabled, the service is marked as a **contract service** in the portal.

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Monthly](/billing/billing-cycles/monthly)
* [Semi-annually](/billing/billing-cycles/semi-annually)
* [Billing Rules](/billing/billing-rules/)
