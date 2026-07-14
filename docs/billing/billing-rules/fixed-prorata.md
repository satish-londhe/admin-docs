---
sidebar_position: 2
title: "FIXED_PRORATA"
tags: ["billing", "rules", "prorata", "fixed-prorata", "hourly"]
---

# FIXED_PRORATA

**FIXED_PRORATA** aligns billing periods to **calendar boundaries** and splits partial periods into **daily pro-rata** (creation date → end of month) plus **remaining full month(s)** within the cycle.

For **hourly** services, FIXED_PRORATA is applied **by default and enforced** — there is no separate hourly billing rule. Even if another billing rule is configured globally, the system applies FIXED_PRORATA for hourly billing.

Supported on **hourly** (enforced), **monthly**, **quarterly**, **semi-annual**, **yearly**, **bi-annual**, and **tri-annual** billing cycles. See [Billing Rules — cycle support](/billing/billing-rules/#which-billing-cycles-support-which-rules).

:::tip[Quick start]

| Concept | Behaviour |
|---|---|
| **Hourly** | FIXED_PRORATA enforced — per-hour usage; invoices at **month end** |
| Period alignment | Calendar months, quarters, or years |
| Partial start | Daily pro-rata to month end + full remaining months |
| Price source | Rate card package price for the selected cycle |
| Upgrades | Unused credit + new plan cost for remaining period |

:::

## Hourly billing

Hourly services always use **FIXED_PRORATA**. CMP charges per hour of actual usage and consolidates all hourly usage into a **single invoice at the end of the month** (or on the **1st of the following month**) — regardless of payment mode:

| Mode | Behaviour |
|---|---|
| **Prepaid** | Wallet deducted continuously; month-end invoice per [prepaid model](/billing/payment-modes/prepaid#prepaid-billing-models--end-to-end-workflow) |
| **Postpaid** | Usage records maintained; consolidated invoice at month end |
| **Manual** | Invoice generated; offline settlement |

### Mandatory hourly services

These service types **always** use hourly billing with FIXED_PRORATA — see [Billing Cycles — mandatory hourly](/billing/billing-cycles/#mandatory-hourly-billing):

`VM_SNAPSHOT`, `BS_SNAPSHOT`, `BACKUP`, `BS_BACKUP`, `BANDWIDTH`, `ACCOUNT_TEMPLATE`, `ISO`

See also [Hourly billing cycle](/billing/billing-cycles/hourly).

## Fixed period alignment

| Cycle | Alignment |
|---|---|
| **Monthly** | Calendar months (1st to last day of month) |
| **Quarterly** | Calendar quarters — Q1 Jan–Mar, Q2 Apr–Jun, Q3 Jul–Sep, Q4 Oct–Dec |
| **Yearly** | Calendar year (January 1 – December 31) |

## Calculation formula

All prices come from the **package (rate card)** — admin enters a price per billing cycle. For pro-rata (partial periods), CMP derives a per-day rate from that cycle's package price.

### `PRO_RATA_PRICE_FROM_SELF_CYCLE`

Daily pro-rata and remaining-month amounts are always derived from the **current billing cycle's price** (for example, quarterly price), not from a separate monthly price on the rate card.

`PRO_RATA_PRICE_FROM_SELF_CYCLE` is **`true` by default** and is **not configurable** — admins cannot change this setting. CMP always uses the selected cycle's package price for pro-rata calculations.

| What | Formula |
|---|---|
| **Monthly equivalent** | Cycle price ÷ `billing_cycle->duration` (e.g. quarterly ÷ 3, yearly ÷ 12) |
| **Daily cost (pro-rata)** | Monthly equivalent ÷ 30.5 |
| **Pro-rata amount** | Daily cost × usage days (creation date → end of current month) |
| **Remaining months amount** | (Cycle price ÷ duration) × remaining months |

### Worked example — quarterly

Service created **4 Feb 2025**, quarterly price **$300**:

| Step | Calculation |
|---|---|
| Monthly equivalent | $300 ÷ 3 = **$100** |
| Daily cost | $100 ÷ 30.5 ≈ **$3.28** |
| Pro-rata (4 Feb → 28 Feb) | $3.28 × 25 days ≈ **$82** |
| March (1 full month) | $100 × 1 = **$100** |
| **Total (one invoice)** | ≈ **$182** |

## Service upgrades

When upgrading a service, CMP calculates:

| Component | Description |
|---|---|
| **Unused amount** | Credit for unused portion of current plan (upgrade date → billing period end) |
| **New plan cost** | Cost of new plan for the same remaining period |
| **Upgrade charge** | `max(New Plan Cost − Unused Amount, 0)` |

### Key concepts

| Term | Definition |
|---|---|
| **Current billing period** | Period covered by current invoice — from service creation or last renewal |
| **Remaining period** | Upgrade date → end of current billing period |
| **`start_at`** | Service creation date (new) or last renewal date (renewed) |
| **`end_at`** | End of current billing period (month / quarter / year end) |

### Monthly upgrade formula

```
Remaining Days = Days from upgrade date to end of current billing period
Unused Amount = Old Plan Monthly Price × (Remaining Days ÷ 30.5)
New Plan Cost = New Plan Monthly Price × (Remaining Days ÷ 30.5)
Upgrade Charge = max(New Plan Cost − Unused Amount, 0)
```

### Quarterly / yearly upgrade formula

```
Daily Cost = Monthly Price ÷ 30.5
Remaining Days = Days from upgrade date to end of current month
Remaining Months = Complete months from next month to period end (quarter/year end)

Unused Amount = (Daily Cost Old × Remaining Days) + (Old Monthly Price × Remaining Months)
New Plan Cost = (Daily Cost New × Remaining Days) + (New Monthly Price × Remaining Months)
Upgrade Charge = max(New Plan Cost − Unused Amount, 0)
```

### Upgrade invoice generation

| Item | Behaviour |
|---|---|
| **Old invoice** | Unchanged |
| **New invoice** | Generated for upgrade charge |
| **Invoice period** | Upgrade date → current billing period end |
| **Amount** | Upgrade charge (after any discounts) |

## Prepaid upgrade examples

### Example 1 — Monthly, upgrade mid-month

| | |
|---|---|
| Billing cycle | Monthly |
| Service created/renewed | 1st of month |
| Current period | 1st – 30th |
| Old plan | $100/month |
| New plan | $200/month |
| Upgrade date | 15th |
| Already paid | $100 for full month |

**Step 1 — Old plan unused amount**

* Used: 1st – 15th (15 days). Remaining: 15th – 30th (**16 days**)
* Daily cost: $100 ÷ 30.5 = $3.28
* Unused amount: $3.28 × 16 = **$52.48**

**Step 2 — New plan cost for remaining period**

* New daily cost: $200 ÷ 30.5 = $6.56
* New plan cost: $6.56 × 16 = **$104.96**

**Step 3 — Upgrade charge**

* Upgrade charge = $104.96 − $52.48 = **$52.48**

From the next month, normal monthly renewal at **$200/month**.

### Example 2 — Quarterly, upgrade mid-quarter

| | |
|---|---|
| Service created | 10 Jan 2025 (Q1: Jan–Mar) |
| Old plan | $300/quarter (monthly equiv. $100) |
| Upgrade date | 15 Feb 2025 |
| New plan | $450/quarter (monthly equiv. $150) |

**Initial setup paid:** Pro-rata Jan 10–31 ($72.13) + Feb–Mar fixed ($200) = **$272.13**

**Unused amount (old plan):**

* Pro-rata days Feb 15–28: 14 days. Remaining months: 1 (March)
* Daily: $300 ÷ 3 ÷ 30.5 = $3.28. Monthly equiv.: $100
* Unused: ($3.28 × 14) + ($100 × 1) = **$145.92**

**New plan cost:**

* Daily: $450 ÷ 3 ÷ 30.5 = $4.92. Monthly equiv.: $150
* New cost: ($4.92 × 14) + ($150 × 1) = **$218.88**

**Upgrade charge:** $218.88 − $145.92 = **$72.96**

From **1 Apr**, normal quarterly billing at **$450/quarter**.

### Example 3 — Yearly, upgrade mid-year

| | |
|---|---|
| Service created | 5 Jan 2025 |
| Old plan | $1,000/year ($83.33/month) |
| Upgrade date | 15 Jun 2025 |
| New plan | $1,500/year ($125/month) |

**Unused amount (old plan):**

* Pro-rata days Jun 15–30: 16 days. Remaining months: 6 (Jul–Dec)
* Daily: $1,000 ÷ 12 ÷ 30.5 ≈ $2.73. Monthly equiv.: $83.33
* Unused: ($2.73 × 16) + ($83.33 × 6) ≈ **$543.68**

**New plan cost:**

* Daily: $1,500 ÷ 12 ÷ 30.5 ≈ $4.10. Monthly equiv.: $125
* New cost: ($4.10 × 16) + ($125 × 6) = **$815.60**

**Upgrade charge:** $815.60 − $543.68 = **$271.92**

From **1 Jan 2026**, normal yearly billing at **$1,500/year**.

## Related

* [Hourly](/billing/billing-cycles/hourly)
* [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata)
* [DATE_TO_DATE](/billing/billing-rules/date-to-date)
* [Quarterly](/billing/billing-cycles/quarterly)
* [Billing Rules](/billing/billing-rules/)
