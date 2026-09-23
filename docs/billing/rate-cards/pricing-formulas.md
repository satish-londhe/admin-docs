---
sidebar_position: 7
title: "Pricing Formulas"
tags: ["billing", "packages", "reference", "pricing"]
---

# Pricing Formulas

CMP uses consistent formulas to derive all billing cycle prices from a single base value. Define one price and the others are calculated automatically.

## Recommended approach

> **Always define the monthly price first.** It is the most intuitive unit for customers and forms the basis for all other calculations.

## Conversion formulas

| Conversion | Formula |
| --- | --- |
| Monthly → Hourly | `Hourly = Monthly ÷ (30.5 × 24)` |
| Monthly → Yearly | `Yearly = Monthly × 12` |
| Hourly → Monthly | `Monthly = Hourly × (30.5 × 24)` |
| Hourly → Yearly | `Yearly = Hourly × (30.5 × 24) × 12` |

The constant `30.5 × 24 = 732` represents the average number of hours per month CMP uses for billing calculations.

## Example calculations

### Example 1 — Starting from monthly price

| Billing cycle | Price |
| --- | --- |
| Monthly | **$30.00** |
| Hourly | $30 ÷ 732 = **$0.0410/hour** |
| Yearly | $30 × 12 = **$360.00/year** |

### Example 2 — Starting from hourly price

| Billing cycle | Price |
| --- | --- |
| Hourly | **$0.05/hour** |
| Monthly | $0.05 × 732 = **$36.60/month** |
| Yearly | $36.60 × 12 = **$439.20/year** |

## Custom package pricing check

When setting unit pricing for custom packages, verify that the effective monthly price for a custom configuration matches or exceeds the equivalent predefined package:

**Example check:**

```
Predefined: 4 vCPU + 8 GB RAM = $20/month

Custom unit pricing:
  CPU: $3/vCPU/month  →  4 × $3 = $12
  RAM: $1/GB/month    →  8 × $1 = $8
  Total: $12 + $8 = $20/month  ✅ (matches predefined)

If custom totalled $15/month → Customers would always choose custom → Fix unit pricing ⚠️
```

## Snapshot / Template / ISO pricing

These services use hourly billing based on **logical storage size**:

```
Hourly cost = size_GB × hourly_rate_per_GB
```

**Example:** 10 GB snapshot × $0.20/GB/hour = **$2.00/hour**

## Service contract installment formulas

For long cycles configured under **[Service Contracts](/billing/service-contracts/)** (Quarterly, Semi-Annually, Annually, Bi-Annually, Tri-Annually), CMP does not charge the entire term upfront. Instead, it divides the long-cycle price into monthly installments and applies the contract discount configured on the billing rule:

```
Base Monthly Amount = Rate Card Term Price ÷ Duration in Months
Monthly Charge      = Base Monthly Amount × (1 − Contract Discount % ÷ 100)
```

**Example — 12-month contract, package Yearly price $360, 10% discount:**

* Base monthly amount = `$360 ÷ 12 = $30.00`
* Discount = `10% × $30.00 = $3.00`
* Billed monthly installment = **$27.00/month**

See [Calculations & Lifecycle](/billing/service-contracts/calculations-and-lifecycle) for mid-term upgrades, pro-rata, and multi-year contract math.

## Related

* [Rate Cards](/billing/rate-cards/)
* [Service Contracts Overview](/billing/service-contracts/)
* [Calculations & Lifecycle](/billing/service-contracts/calculations-and-lifecycle)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)
* [Billing Overview](/billing/overview)
* [Billing FAQs](/faq/platform/billing-pricing)
