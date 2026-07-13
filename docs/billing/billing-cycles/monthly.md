---
sidebar_position: 3
title: "Monthly"
tags: ["billing", "monthly", "billing-cycles"]
---

# Monthly

**Monthly** billing charges customers on a **recurring one-month** schedule. The **monthly price** comes from the rate card package; **how much** is charged at creation or renewal and **when** invoices are generated depend on your **[billing rule](/billing/billing-rules/)**, **[payment mode](/billing/payment-modes/)**, and (for postpaid/manual) **advance invoice settings**.

| | |
|---|---|
| **Duration** | 1 month |
| **Best for** | Steady production workloads, predictable monthly cost |

**Configure pricing:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Topic | Summary |
|---|---|
| **Cycle** | Customer commits to a **1-month** billing period (package **monthly** price on the rate card) |
| **Charge amount** | Billing rule — **`PRO_RATA`**, **`DATE_TO_DATE`**, **`FIXED_CALENDAR_MONTH`**, **`UNFIXED_CALENDAR_MONTH`** (not always full month upfront) |
| **When customer pays** | Set by **[payment mode](/billing/payment-modes/)** — wallet at creation (prepaid), payable invoice on renewal (postpaid default), or offline (manual) |
| **Advance invoicing** | Optional **postpaid/manual** flags can generate pro-rata at creation and renewal on the **1st of the month** — see [below](#invoice-and-charge-timing) |
| **Early deletion** | **No refund** for unused days in the committed period ❌ |
| **Postpaid** | ✅ **Recommended** — one of two cycles suitable for postpaid (with [hourly](/billing/billing-cycles/hourly)) |

:::

## What monthly billing means

A **billing cycle** is how often the service is priced. **Monthly** means the package’s **monthly** rate card price applies and the service renews every month.

That does **not** mean CMP always charges a **full month on the day the service is created**. The charged amount and invoice timing are determined separately by:

1. **Billing rule** — **`PRO_RATA`**, **`DATE_TO_DATE`**, **`FIXED_CALENDAR_MONTH`**, or **`UNFIXED_CALENDAR_MONTH`** — see [Billing Rules](/billing/billing-rules/) and [rule names below](#charge-amount-by-billing-rule)
2. **[Payment mode](/billing/payment-modes/)** — prepaid wallet deduction vs postpaid/manual invoicing
3. **Advance invoice flags** (postpaid and manual only) — whether payable invoices are generated immediately or usage records convert on renewal

See also [Billing Cycles overview](/billing/billing-cycles/).

## Charge amount by billing rule

Monthly supports:

| Billing rule | Behaviour |
|---|---|
| **`PRO_RATA`** | Partial start: daily pro-rata from creation date → end of calendar month, then full month(s) within the aligned period. See [FIXED_PRORATA](/billing/billing-rules/fixed-prorata). |
| **`DATE_TO_DATE`** | Each period runs creation date → same date next month − 1 day (for example, 25 Apr → 24 May). See [DATE_TO_DATE](/billing/billing-rules/date-to-date). |
| **`FIXED_CALENDAR_MONTH`** | First invoice aligns to a calendar month boundary — no daily pro-rata for partial days in the creation month. See [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month). |
| **`UNFIXED_CALENDAR_MONTH`** | Pro-rata invoice for the full creation calendar month (1st → last day), then rolling monthly period from the 1st of the next month. See [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month). |

See [Billing Rules — cycle support](/billing/billing-rules/#which-billing-cycles-support-which-rules).

:::info[UNFIXED_PRORATA not available on monthly]

**UNFIXED_PRORATA** applies to quarterly and longer cycles only — not monthly. See [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata).

:::

**Example — `PRO_RATA`, monthly VM created 10 Jan:**

| Component | Period | Charge type |
|---|---|---|
| Pro-rata (daily) | 10 Jan → 31 Jan | Daily rate × days |
| Next full month | 1 Feb → 28 Feb | Full monthly package price |

See [PRO_RATA](/billing/billing-rules/fixed-prorata) for formulas.

## Invoice and charge timing

### Prepaid

| Event | Behaviour |
|---|---|
| **Service creation** | Wallet balance checked — **insufficient balance blocks creation**. Amount deducted per billing rule (`PRO_RATA`, `DATE_TO_DATE`, `FIXED_CALENDAR_MONTH`, `UNFIXED_CALENDAR_MONTH`) — not always full flat month. |
| **Renewal** | Renewal invoice generated **in advance**; wallet deducted if balance is sufficient |
| **Invoices (Model 1 vs 2)** | **`generate_prepaid_reciept`** controls whether service usage generates invoices — see [Prepaid billing models](/billing/payment-modes/prepaid#prepaid-billing-models--end-to-end-workflow) |

### Postpaid

| Setting | Service creation | Renewal |
|---|---|---|
| **Default** (`POSTPAID_ADVANCE_*` = `false`) | **Usage records** maintained — no payable invoice until **next renewal** (or threshold breach) | Usage converted to **payable invoice**; card auto-charge |
| **Advance pro-rata** (`POSTPAID_ADVANCE_PRO_RATA_INVOICE` = `true`) | **Payable pro-rata invoice immediately** at creation | — |
| **Advance renewal** (`POSTPAID_ADVANCE_INVOICE` = `true`) | — | **Payable renewal invoice on 1st of month** (start of month), not only at period end |

See [Postpaid invoice generation modes](/billing/payment-modes/postpaid#postpaid-invoice-generation-modes).

**Example — postpaid advance mode, monthly service created 10 Jan 2026:**

| Invoice | Generated | Covers |
|---|---|---|
| Pro-rata | **10 Jan** (at creation) | 10 Jan – 31 Jan |
| Renewal | **1 Feb** (start of month) | 1 Feb – 28 Feb |

### Manual

Invoice timing follows the same **default vs advance** pattern as postpaid, using **`MANUAL_ADVANCE_PRO_RATA_INVOICE`** and **`MANUAL_ADVANCE_INVOICE`** instead of `POSTPAID_ADVANCE_*`. Payment is offline — admin marks invoices paid.

See [Manual — invoice generation settings](/billing/payment-modes/manual#invoice-generation-settings).

:::warning[Advance flags — system setup only]

Advance invoice flags default to **`false`**. Configure with **StackConsole at go-live** — changing them mid-stream is **not supported**.

:::

## Payment modes summary

| Mode | Supported? | Monthly behaviour (high level) |
|---|---|---|
| **Prepaid** | ✅ | Wallet deducted at creation/renewal; amount per `PRO_RATA`, `DATE_TO_DATE`, `FIXED_CALENDAR_MONTH`, or `UNFIXED_CALENDAR_MONTH` |
| **Postpaid** | ✅ **Recommended** | Payable invoice on renewal (default) or advance schedule per invoice settings |
| **Manual** | ✅ | Same invoice timing as postpaid; offline settlement |

:::info[Postpaid — recommended cycle]

**Monthly** is one of only two billing cycles recommended for **postpaid** (along with [hourly](/billing/billing-cycles/hourly)). A monthly cycle limits revenue and fraud exposure to one billing period.

For postpaid accounts, enable **hourly** and **monthly** billing cycles only — not quarterly or longer. See [Billing Cycles — payment modes](/billing/billing-cycles/#billing-cycles-and-payment-modes).

:::

## Early deletion

Deleting a monthly service **before the period ends** does **not** reduce the charge. CMP does **not** refund unused time on fixed cycles.

Admin may grant **free credits** for dispute resolution — see [Billing Rules](/billing/billing-rules/).

**Example:** Monthly VM on **`PRO_RATA`**, created 10 Jan, deleted 15 Jan → customer is **not** refunded for unused days in the committed period.

## VM upgrades

Mid-cycle upgrades calculate unused credit and new plan cost for the **remaining period**. See [FIXED_PRORATA — service upgrades](/billing/billing-rules/fixed-prorata#service-upgrades) and [Postpaid — VM upgrade billing](/billing/payment-modes/postpaid#vm-upgrade-billing-postpaid).

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Billing Rules](/billing/billing-rules/)
* [Hourly](/billing/billing-cycles/hourly)
* [Quarterly](/billing/billing-cycles/quarterly)
