---
sidebar_position: 6
title: "Annually"
tags: ["billing", "yearly", "annual", "billing-cycles"]
---

# Annually

**Annually** billing (also **yearly** or **annual**) charges customers on a **recurring 12-month** schedule. The **yearly price** comes from the rate card package; **how much** is charged at creation or renewal and **when** invoices are generated depend on your **[billing rule](/billing/billing-rules/)**, **[payment mode](/billing/payment-modes/)**, and (for postpaid/manual) **advance invoice settings**.

| | |
|---|---|
| **Duration** | 12 months |
| **Also called** | Yearly, annual |
| **Best for** | Annual discounts, long-term commitment |

**Configure pricing:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Topic | Summary |
|---|---|
| **Cycle** | Customer commits to a **12-month** billing period (package **yearly** price on the rate card) |
| **Charge amount** | Billing rule — **`PRO_RATA`**, **`UNFIXED_PRORATA`**, **`DATE_TO_DATE`**, **`FIXED_CALENDAR_MONTH`**, **`UNFIXED_CALENDAR_MONTH`** (not always full year upfront) |
| **When customer pays** | **Prepaid** or **manual** recommended — not postpaid |
| **Advance invoicing** | Optional **manual** flags — see [Monthly — invoice timing](/billing/billing-cycles/monthly#invoice-and-charge-timing) |
| **Postpaid** | ❌ **Not recommended** — revenue and fraud risk over a 12-month period |
| **Early deletion** | **No refund** for unused time in the committed period ❌ |

:::

## What annual billing means

**Annually** means the package’s **yearly** rate card price applies and the service renews every 12 months.

That does **not** mean CMP always charges the **full year on the day the service is created**. The charged amount and invoice timing depend on **billing rule**, **payment mode**, and **advance invoice flags**.

Under **`PRO_RATA`**, yearly billing aligns to the **calendar year** (January 1 – December 31) for period boundaries.

## Charge amount by billing rule

Annual supports:

| Billing rule | Behaviour |
|---|---|
| **`PRO_RATA`** | Partial start: daily pro-rata to month end, then full remaining months within the calendar year. See [FIXED_PRORATA](/billing/billing-rules/fixed-prorata). |
| **`UNFIXED_PRORATA`** | Pro-rata for creation month only; next invoice is a full **12-month** period from the 1st of the following month. See [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata). |
| **`DATE_TO_DATE`** | Each period runs creation date → same date 12 months later − 1 day. Required for [service contracts](#service-contracts). See [DATE_TO_DATE](/billing/billing-rules/date-to-date). |
| **`FIXED_CALENDAR_MONTH`** | Calendar-aligned first invoice — see [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month). |
| **`UNFIXED_CALENDAR_MONTH`** | Full creation calendar month pro-rata, then rolling 12-month period — see [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month). |

Pro-rata for partial years uses yearly package price ÷ **12** for monthly equivalent, then daily rate ÷ 30.5. See [Quarterly — pro-rata example](/billing/billing-cycles/quarterly#pro-rata-example--pro_rata).

## Invoice and charge timing

See [Monthly — invoice and charge timing](/billing/billing-cycles/monthly#invoice-and-charge-timing). Amounts follow the annual billing rules above.

| Mode | Supported? | Annual behaviour (high level) |
|---|---|---|
| **Prepaid** | ✅ **Recommended** | Wallet deducted at creation/renewal; amount per billing rule |
| **Postpaid** | ❌ **Not recommended** | Long outstanding period — revenue delay and fraud risk |
| **Manual** | ✅ | Offline settlement; same invoice timing patterns as monthly |

:::warning[Do not use postpaid]

**Annual** billing is **not recommended** with **postpaid** payment mode.

| Risk | Why it matters |
|---|---|
| **Revenue delay** | You may wait **up to a year** before collecting payment for the committed period |
| **Fraud exposure** | A customer can consume services for the full year and leave before paying |

Use **prepaid** or **manual**. **Postpaid** is appropriate only with **[hourly](/billing/billing-cycles/hourly)** and **[monthly](/billing/billing-cycles/monthly)** billing cycles.

See [Billing Cycles — payment modes by cycle](/billing/billing-cycles/#billing-cycles-and-payment-modes).

:::

## Early deletion

No refund for unused months. Customer pays for the **committed annual period** even if the service is deleted before year end.

## Service contracts

Annual is the most common contract duration — 12-month commitment with optional contract discount.

The **[service contract](/billing/billing-rules/date-to-date#service-contracts)** system applies to **quarterly and longer** billing cycles only — not hourly or monthly.

| Requirement | Value |
|---|---|
| **Billing cycle** | **Quarterly or longer** (this page: **annual** = 12-month contract) |
| **Billing rule** | **`DATE_TO_DATE`** only |
| **Payment mode** | **Postpaid** or **manual** — **not prepaid** |

When a customer selects yearly billing with contracts enabled, the service is marked as a **contract service** in the portal.

## Admin pricing reference

CMP does not auto-fill yearly prices from monthly. Use `Yearly = Monthly × 12` when setting package prices — see [Pricing Formulas](/billing/rate-cards/pricing-formulas).

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Semi-annually](/billing/billing-cycles/semi-annually)
* [Bi-annually](/billing/billing-cycles/bi-annually)
