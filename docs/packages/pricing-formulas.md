---
sidebar_position: 7
title: "Pricing Formulas"
tags: ["packages", "reference"]
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

## Related

* [How Packages Work in CMP](https://how-packages-work-in-cmp)
* [Custom Packages & Unit Pricing](https://custom-packages-unit-pricing)
* [Billing Models Overview](/doc/billing-models-overview)
* [Billing FAQs](/doc/billing-faqs)