---
sidebar_position: 8
title: "Billing Behaviour"
tags: ["platform", "store", "products", "billing"]
---

# Billing Behaviour

:::important[Billing starts on order]

Billing for a product starts **immediately** when the order is placed. CMP uses the configured **payment type**, **billing cycle**, and **billing rule**. No separate activation step is required for billing to begin.

:::

:::danger[Documentation in progress — Contract billing]

**Contract billing** can be enabled **per product** (product-specific). Full documentation for contract billing behaviour, customer flow, and admin configuration is **in progress** and will be added in a later update.

:::

## Order → billing flow

When a customer places an order:

1. Product, price, billing rule, and cycle are stored
2. Service / offering records are created for the order
3. An invoice is generated using the billing rule (including pro-rata when applicable)
4. `start_at`, `end_at`, and `renew_at` are calculated

## Product & order billing examples (monthly)

**Common product:** Linux Managed Service — monthly price **₹1,000**, billing cycle **Monthly**. Rule varies per example.

### 1. FIXED_PRORATA (default — most important)

**Order date:** 10 Feb · **Rule:** Fixed Pro-Rata

| Invoice | Period | Amount |
|---|---|---|
| First | 10 Feb → 28 Feb (19 days) | Daily = 1000 ÷ 30.5 ≈ 32.79 → **₹623** |
| Next | 1 Mar → 31 Mar | **₹1,000** |

First invoice = partial month; later invoices = full calendar months.

### 2. UNFIXED_PRORATA

**Order date:** 10 Feb · **Rule:** Unfixed Pro-Rata

| Invoice | Period | Amount |
|---|---|---|
| First | 10 Feb → 28 Feb | **₹623** (pro-rata) |
| Next | 1 Mar → 31 Mar | **₹1,000** |

Looks similar monthly; differences show more clearly on quarterly/yearly cycles.

### 3. DATE_TO_DATE

**Order date:** 10 Feb · **Rule:** Date-to-Date

| Invoice | Period | Amount |
|---|---|---|
| First | 10 Feb → 9 Mar | **₹1,000** |
| Next | 10 Mar → 9 Apr | **₹1,000** |

No pro-rata — always the same date-aligned cycle.

### 4. FIXED_CALENDAR_MONTH

**Order date:** 20 Feb · **Rule:** Fixed Calendar Month

| Invoice | Period | Amount |
|---|---|---|
| First | 1 Feb → 28 Feb | **₹1,000** (full) |
| Next | 1 Mar → 31 Mar | **₹1,000** |

No pro-rata — full charge even for partial calendar usage in the first month.

### 5. UNFIXED_CALENDAR_MONTH

**Order date:** 20 Feb · **Rule:** Unfixed Calendar Month

| Invoice | Period | Amount |
|---|---|---|
| First | 20 Feb → 28 Feb | Pro-rata ≈ **₹295** |
| Next | 1 Mar → 31 Mar | **₹1,000** |

First month adjusted; then full calendar months.

## Summary

| Rule | First invoice | Next cycle | Pro-rata |
|---|---|---|---|
| **FIXED_PRORATA** | Partial | Calendar | Yes |
| **UNFIXED_PRORATA** | Partial | Calendar | Yes |
| **DATE_TO_DATE** | Full | Same date | No |
| **FIXED_CALENDAR_MONTH** | Full | Calendar | No |
| **UNFIXED_CALENDAR_MONTH** | Partial | Calendar | Yes |

## Important customer scenario (deletion)

Example: customer orders on **15 Jan**, deletes on **20 Mar**, rule **FIXED_PRORATA**:

| Month | Charge |
|---|---|
| Jan | Pro-rata |
| Feb | Full |
| Mar | **Full** (even if deleted on 20 Mar) |

March is still full because the invoice for that calendar month was already generated.

## Related

* [Product Billing](/platform-features/store/product-billing)
* [Add Products](/platform-features/store/add-products)
* [Pricing Formulas](/billing/rate-cards/pricing-formulas)
* [Orders](/platform-features/store/orders)
