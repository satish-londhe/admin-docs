---
sidebar_position: 5
title: "DATE_TO_DATE"
tags: ["billing", "rules", "date-to-date", "contracts"]
---

# DATE_TO_DATE

**DATE_TO_DATE** billing generates invoices for a **fixed period from the service creation date** — each period runs from creation anniversary to anniversary (minus one day where applicable).

Required for the **[service contract](/billing/billing-rules/date-to-date#service-contracts)** system on **quarterly and longer** billing cycles. Works with **postpaid** and **manual** payment modes — **not prepaid**.

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Period start | **Service creation date** |
| Period end | Same date next cycle − 1 day |
| Consolidated invoicing | ❌ Each service has its own billing anniversary |
| Contracts | ✅ Required for contract billing (quarterly+ cycles only) |

:::

## How it works

Each service's billing period is anchored to its **own creation date**, not calendar month or quarter boundaries.

### Monthly example

| | |
|---|---|
| **Service created** | 25 Apr 2025 |
| **Billing cycle** | Monthly |

| Invoice period |
|---|
| 25 Apr 2025 → 24 May 2025 |

### Yearly example

| | |
|---|---|
| **Service created** | 25 Apr 2025 |
| **Billing cycle** | Yearly |

| Invoice period |
|---|
| 25 Apr 2025 → 24 Apr 2026 |

:::info[End date −1 day]

Invoice period end dates are generated as **creation anniversary minus one day** so periods do not overlap.

:::

## Postpaid consolidated invoicing exception

**DATE_TO_DATE** does **not** support monthly consolidated invoicing on postpaid accounts.

| Reason | Detail |
|---|---|
| Different anniversaries | Service A created on 5th; Service B on 12th — each has a different cycle |
| Per-service invoices | Each service gets its **own invoice** on its anniversary |

For consolidated monthly postpaid billing, use [FIXED_PRORATA](/billing/billing-rules/fixed-prorata) or calendar-month rules instead. See **[One Account One Invoice (OAOI)](/billing/one-account-one-invoice)** and [Postpaid](/billing/payment-modes/postpaid).

## Service contracts

The contract system applies only when **all** of the following are true:

| Requirement | Value |
|---|---|
| **Billing cycle** | **Quarterly or longer** — quarterly, semi-annual, annual, bi-annual, or tri-annual |
| **Billing rule** | **`DATE_TO_DATE`** only |
| **Payment mode** | **Postpaid** or **manual** — **not prepaid** |

Contract duration matches the billing cycle. Each service is invoiced on its own creation anniversary. See [Annually — service contracts](/billing/billing-cycles/annually#service-contracts) for a common example.

:::info[DATE_TO_DATE without contracts]

**DATE_TO_DATE** can also be used on **monthly** (and longer) cycles for non-contract billing. The contract system does **not** apply to **hourly** or **monthly** cycles.

:::

## Supported billing cycles

| Cycle | DATE_TO_DATE as billing rule? | Service contracts? |
|---|---|---|
| Hourly | ❌ — hourly uses enforced FIXED_PRORATA | ❌ |
| Monthly | ✅ | ❌ |
| Quarterly | ✅ | ✅ |
| Semi-annually | ✅ | ✅ |
| Annually | ✅ | ✅ |
| Bi-annually / Tri-annually | ✅ | ✅ |

## Related

* [FIXED_PRORATA](/billing/billing-rules/fixed-prorata)
* [Monthly](/billing/billing-cycles/monthly)
* [Postpaid](/billing/payment-modes/postpaid)
* [Billing Rules](/billing/billing-rules/)
