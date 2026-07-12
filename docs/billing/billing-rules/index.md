---
sidebar_position: 1
title: "Billing Rules"
tags: ["billing", "rules", "prorata", "billing-rules"]
---

# Billing Rules

**Billing rules** control **how charges are calculated** for a service — when invoices are generated, how partial periods (pro-rata) are priced, and how billing periods align to calendar boundaries.

Billing rules work together with:

* **[Billing cycles](/billing/billing-cycles/)** — how often a service is charged (hourly, monthly, quarterly, etc.)
* **[Payment modes](/billing/payment-modes/)** — how the customer pays (prepaid, postpaid, manual)
* **[Rate card](/rate-cards/) packages** — base prices per cycle

:::tip[Quick start — calculation rules]

| Rule | Summary | Detail page |
|---|---|---|
| **FIXED_PRORATA** | Partial start: daily pro-rata to month end, then full months to calendar period end. Enforced for hourly. | [FIXED_PRORATA](/billing/billing-rules/fixed-prorata) |
| **UNFIXED_PRORATA** | Pro-rata invoice for creation month only; next invoice is a full cycle from the 1st of the following month. | [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata) |
| **DATE_TO_DATE** | Billing period anchored to each service's creation date (anniversary to anniversary). Required for contracts. | [DATE_TO_DATE](/billing/billing-rules/date-to-date) |
| **FIXED_CALENDAR_MONTH** | First invoice aligns to a calendar month or year boundary — no daily pro-rata for partial days in the creation month. | [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month) |
| **UNFIXED_CALENDAR_MONTH** | Pro-rata invoice for the full creation calendar month; next invoice is a rolling full cycle from the 1st of the next month. | [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month) |

:::

## Pages in this section

* [FIXED_PRORATA](/billing/billing-rules/fixed-prorata) — enforced for hourly; calendar-aligned pro-rata, formulas, service upgrades
* [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata) — partial month + fixed multi-month block
* [DATE_TO_DATE](/billing/billing-rules/date-to-date) — billing anniversary from creation date
* [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month) — align to calendar month/year boundaries
* [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month) — calendar pro-rata month + rolling period

## Which billing cycles support which rules

| Billing cycle | Supported rules |
|---|---|
| **Hourly** | **FIXED_PRORATA** only (enforced — cannot override) |
| **Monthly** | FIXED_PRORATA, DATE_TO_DATE, FIXED_CALENDAR_MONTH, UNFIXED_CALENDAR_MONTH |
| **Quarterly** | FIXED_PRORATA, UNFIXED_PRORATA, DATE_TO_DATE, FIXED_CALENDAR_MONTH, UNFIXED_CALENDAR_MONTH |
| **Semi-annually** | FIXED_PRORATA, UNFIXED_PRORATA, DATE_TO_DATE, FIXED_CALENDAR_MONTH, UNFIXED_CALENDAR_MONTH |
| **Annually** | FIXED_PRORATA, UNFIXED_PRORATA, DATE_TO_DATE, FIXED_CALENDAR_MONTH, UNFIXED_CALENDAR_MONTH |
| **Bi-annually / Tri-annually** | FIXED_PRORATA, UNFIXED_PRORATA, DATE_TO_DATE, FIXED_CALENDAR_MONTH, UNFIXED_CALENDAR_MONTH |

:::warning[Choose billing rule at system setup]

Billing rule behaviour affects invoice timing, pro-rata calculation, and upgrade charges across all customers. Decide the correct rule for your deployment **before go-live** — changing rules mid-stream can cause billing inconsistencies. Contact **StackConsole** for rule configuration.

:::

## Pro-rata overview (quarterly, semi-annual, yearly)

Under **FIXED_PRORATA**, partial-period charges split into two parts:

| Charge type | Period |
|---|---|
| **Pro-rata (daily)** | Service creation date → **end of the same month** |
| **Remaining period** | Charged as **full month(s)** based on the selected billing cycle |

**Example — quarterly, service created 4 Feb 2025:**

| Charge type | Period |
|---|---|
| Pro-rata (daily) | 4 Feb → 28 Feb |
| Pro-rata (full month) | 1 Mar → 31 Mar |
| **Pro-rata invoice covers** | **4 Feb → 31 Mar** |

See [FIXED_PRORATA](/billing/billing-rules/fixed-prorata) for formulas and worked examples.

## Platform and account rules

Beyond calculation rules, CMP applies **platform-wide** and **per-account** billing policies:

| Rule | Where to configure | Detail |
|---|---|---|
| IP billed separately from VM | **Global Settings** → `plan_ip_billing` | [IP billing](#ip-billing-plan_ip_billing) |
| Free bandwidth per month | **Cloud Provider Setup** | [Bandwidth](#bandwidth-billing) |
| VM backup size | **Cloud Provider Setup** → VM Backup Billing | [VM backup](#vm-backup-size) |
| Stoppable VM billing | Cloud Provider / global setting | [Stoppable services](#stoppable-services) |
| Prepaid billing model | **Global Settings** → `generate_prepaid_reciept` | [Prepaid models](/billing/payment-modes/prepaid#configure-prepaid-billing-model) |
| Postpaid advance invoicing | **Admin → Invoices → Invoice Settings** | [Postpaid invoice settings](/billing/payment-modes/postpaid#postpaid-invoice-generation-modes) |
| Tax exempt (POC) | **Clients → Billing Setup** → Is Tax Exempted? | Per-account |
| Coupons / free credits | Admin coupon management | [Coupons](#coupons-and-promotional-credits) |
| Custom package floor price | [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing) | Must be ≥ predefined package |

### IP billing (`plan_ip_billing`)

| Value | Behaviour |
|---|---|
| `false` (default) | Public IP at VM creation **included** in VM package price |
| `true` | Public IP charged separately via [IP Address package](/orchestrators/cloudstack/offering-sync-and-packages/ip-address) |

### Bandwidth billing

Bandwidth is **usage-based** and **always hourly**. Traffic up to **Free Bandwidth Threshold** (Cloud Provider Setup) is free each month; usage above threshold × unit rate is billed.

### VM backup size

| Setting | Charged size |
|---|---|
| **Physical** | Actual backup storage reported |
| **Virtual** | Provisioned disk size (fallback if physical not reported) |

### Stoppable services

When a VM is **stopped**: CPU/RAM billing pauses; **volumes and IP continue** billing.

### Coupons and promotional credits

| Rule | Behaviour |
|---|---|
| Discount duration | **First billing cycle only** |
| Free credits | Applied via **coupons** — redeemable against existing invoices |
| Free trials on packages | Global — use coupons for selective promotions |

### Account-level settings

**Clients → [Customer] → Billing Setup:** payment mode, tax exempt, rate card. Rate card cannot change after active services exist — see [Rate Cards](/rate-cards/).

## Related

* [Billing Overview](/billing/overview)
* [Billing Cycles](/billing/billing-cycles/)
* [Payment Modes](/billing/payment-modes/)
* [Billing FAQs](/faq/billing)
