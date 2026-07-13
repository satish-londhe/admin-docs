---
sidebar_position: 5
title: "Semi-annually"
tags: ["billing", "semi-annual", "billing-cycles"]
---

# Semi-annually

**Semi-annually** billing charges customers on a **recurring 6-month** schedule. The **semi-annual price** comes from the rate card package; **how much** is charged at creation or renewal and **when** invoices are generated depend on your **[billing rule](/billing/billing-rules/)**, **[payment mode](/billing/payment-modes/)**, and (for postpaid/manual) **advance invoice settings**.

| | |
|---|---|
| **Duration** | 6 months |
| **Also called** | Semi-annual, 6-month billing |
| **Best for** | Mid-to-long term commitment |

**Configure pricing:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Topic | Summary |
|---|---|
| **Cycle** | Customer commits to a **6-month** billing period (package **semi-annual** price on the rate card) |
| **Charge amount** | Billing rule — **`PRO_RATA`**, **`UNFIXED_PRORATA`**, **`DATE_TO_DATE`**, **`FIXED_CALENDAR_MONTH`**, **`UNFIXED_CALENDAR_MONTH`** (not always full 6 months upfront) |
| **When customer pays** | **Prepaid** or **manual** recommended — not postpaid |
| **Advance invoicing** | Optional **manual** flags — see [Monthly — invoice timing](/billing/billing-cycles/monthly#invoice-and-charge-timing) |
| **Postpaid** | ❌ **Not recommended** — revenue and fraud risk over a 6-month period |
| **Early deletion** | **No refund** for unused time in the committed period ❌ |

:::

## What semi-annual billing means

**Semi-annually** means the package’s **semi-annual** rate card price applies and the service renews every 6 months.

That does **not** mean CMP always charges the **full 6-month price on the day the service is created**. The charged amount and invoice timing depend on **billing rule**, **payment mode**, and **advance invoice flags** — see [Monthly](/billing/billing-cycles/monthly) for the same payment-mode patterns.

## Charge amount by billing rule

Semi-annual supports:

| Billing rule | Behaviour |
|---|---|
| **`PRO_RATA`** | Partial start: daily pro-rata to month end, then full remaining months within the aligned period. See [FIXED_PRORATA](/billing/billing-rules/fixed-prorata). |
| **`UNFIXED_PRORATA`** | Pro-rata for creation month only; next invoice is a full **6-month** period from the 1st of the following month. See [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata). |
| **`DATE_TO_DATE`** | Each period runs creation date → same date 6 months later − 1 day. See [DATE_TO_DATE](/billing/billing-rules/date-to-date). |
| **`FIXED_CALENDAR_MONTH`** | Calendar-aligned first invoice — see [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month). |
| **`UNFIXED_CALENDAR_MONTH`** | Full creation calendar month pro-rata, then rolling period — see [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month). |

Pro-rata for partial periods uses the semi-annual package price ÷ **6** for monthly equivalent — same principles as [Quarterly — pro-rata example](/billing/billing-cycles/quarterly#pro-rata-example--pro_rata).

## Invoice and charge timing

See [Monthly — invoice and charge timing](/billing/billing-cycles/monthly#invoice-and-charge-timing). Amounts follow the semi-annual billing rules above.

| Mode | Supported? | Semi-annual behaviour (high level) |
|---|---|---|
| **Prepaid** | ✅ **Recommended** | Wallet deducted at creation/renewal; amount per billing rule |
| **Postpaid** | ❌ **Not recommended** | Long outstanding period — revenue delay and fraud risk |
| **Manual** | ✅ | Offline settlement; same invoice timing patterns as monthly |

:::warning[Do not use postpaid]

**Semi-annual** billing is **not recommended** with **postpaid** payment mode.

| Risk | Why it matters |
|---|---|
| **Revenue delay** | You may wait **6 months or more** before collecting payment for the committed period |
| **Fraud exposure** | A customer can consume services for the full half-year and leave before paying |

Use **prepaid** or **manual**. **Postpaid** is appropriate only with **[hourly](/billing/billing-cycles/hourly)** and **[monthly](/billing/billing-cycles/monthly)** billing cycles.

See [Billing Cycles — payment modes by cycle](/billing/billing-cycles/#billing-cycles-and-payment-modes).

:::

## Early deletion

CMP does **not** refund unused time on semi-annual plans. The full committed period charge applies even if the service is deleted early.

## Service contracts

The **[service contract](/billing/billing-rules/date-to-date#service-contracts)** system applies to **quarterly and longer** billing cycles only — not hourly or monthly.

| Requirement | Value |
|---|---|
| **Billing cycle** | **Quarterly or longer** (this page: **semi-annual** = 6-month contract) |
| **Billing rule** | **`DATE_TO_DATE`** only |
| **Payment mode** | **Postpaid** or **manual** — **not prepaid** |

When contracts are enabled, the service is marked as a **contract service** in the portal.

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Quarterly](/billing/billing-cycles/quarterly)
* [Annually](/billing/billing-cycles/annually)
