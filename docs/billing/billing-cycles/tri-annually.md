---
sidebar_position: 8
title: "Tri-annually"
tags: ["billing", "tri-annual", "billing-cycles"]
---

# Tri-annually

**Tri-annually** billing charges customers on a **recurring 36-month** schedule — the longest standard commitment period CMP supports. The **tri-annual price** comes from the rate card package; **how much** is charged at creation or renewal and **when** invoices are generated depend on your **[billing rule](/billing/billing-rules/)**, **[payment mode](/billing/payment-modes/)**, and (for postpaid/manual) **advance invoice settings**.

| | |
|---|---|
| **Duration** | 36 months (3 years) |
| **Also called** | Every 3 years, tri-annual |
| **Best for** | Deepest long-term discount |

**Configure pricing:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Topic | Summary |
|---|---|
| **Cycle** | Customer commits to a **36-month** billing period (package **tri-annual** price on the rate card) |
| **Charge amount** | Billing rule — **`PRO_RATA`**, **`UNFIXED_PRORATA`**, **`DATE_TO_DATE`**, **`FIXED_CALENDAR_MONTH`**, **`UNFIXED_CALENDAR_MONTH`** (not always full 3 years upfront) |
| **When customer pays** | **Prepaid** or **manual** recommended — not postpaid |
| **Advance invoicing** | Optional **manual** flags — see [Monthly — invoice timing](/billing/billing-cycles/monthly#invoice-and-charge-timing) |
| **Postpaid** | ❌ **Not recommended** — revenue and fraud risk over a 36-month period |
| **Early deletion** | **No refund** for unused time in the committed period ❌ |

:::

## What tri-annual billing means

**Tri-annually** means the package’s **tri-annual** rate card price applies and the service renews every 36 months.

That does **not** mean CMP always charges the **full 3-year price on the day the service is created**. The charged amount and invoice timing depend on **billing rule**, **payment mode**, and **advance invoice flags**.

## Charge amount by billing rule

Tri-annual supports:

| Billing rule | Behaviour |
|---|---|
| **`PRO_RATA`** | Partial start: daily pro-rata to month end, then full remaining months within the aligned period. See [FIXED_PRORATA](/billing/billing-rules/fixed-prorata). |
| **`UNFIXED_PRORATA`** | Pro-rata for creation month only; next invoice is a full **36-month** period from the 1st of the following month. See [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata). |
| **`DATE_TO_DATE`** | Each period runs creation date → same date 36 months later − 1 day. See [DATE_TO_DATE](/billing/billing-rules/date-to-date). |
| **`FIXED_CALENDAR_MONTH`** | Calendar-aligned first invoice — see [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month). |
| **`UNFIXED_CALENDAR_MONTH`** | Full creation calendar month pro-rata, then rolling period — see [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month). |

Pro-rata uses cycle price ÷ **36** for monthly equivalent. See [Billing Rules](/billing/billing-rules/).

## Invoice and charge timing

See [Monthly — invoice and charge timing](/billing/billing-cycles/monthly#invoice-and-charge-timing).

| Mode | Supported? | Tri-annual behaviour (high level) |
|---|---|---|
| **Prepaid** | ✅ **Recommended** | Wallet deducted at creation/renewal; amount per billing rule |
| **Postpaid** | ❌ **Not recommended** | Long outstanding period — revenue delay and fraud risk |
| **Manual** | ✅ | Offline settlement; same invoice timing patterns as monthly |

:::warning[Do not use postpaid]

**Tri-annual** billing is **not recommended** with **postpaid** payment mode.

| Risk | Why it matters |
|---|---|
| **Revenue delay** | You may wait **3 years or more** before collecting payment for the committed period |
| **Fraud exposure** | A customer can consume services for the full 3-year period and leave before paying |

Use **prepaid** or **manual**. **Postpaid** is appropriate only with **[hourly](/billing/billing-cycles/hourly)** and **[monthly](/billing/billing-cycles/monthly)** billing cycles.

See [Billing Cycles — payment modes by cycle](/billing/billing-cycles/#billing-cycles-and-payment-modes).

:::

## Early deletion

No refund for unused time. The **full 3-year period** is charged even if the customer deletes the service early.

:::warning[Long-term commitment]

Tri-annual plans require clear communication on **non-refundable** terms. CMP does not support partial refunds — see [Billing Cycles](/billing/billing-cycles/).

:::

## Service contracts

The **[service contract](/billing/billing-rules/date-to-date#service-contracts)** system applies to **quarterly and longer** billing cycles only — not hourly or monthly.

| Requirement | Value |
|---|---|
| **Billing cycle** | **Quarterly or longer** (this page: **tri-annual** = 36-month contract) |
| **Billing rule** | **`DATE_TO_DATE`** only |
| **Payment mode** | **Postpaid** or **manual** — **not prepaid** |

When contracts are enabled, the service is marked as a **contract service** in the portal.

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Bi-annually](/billing/billing-cycles/bi-annually)
* [Annually](/billing/billing-cycles/annually)
