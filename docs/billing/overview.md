---
sidebar_position: 1
title: "Billing Overview"
tags: ["billing"]
---

# Billing Overview

CMP billing has three layers that work together:

```
Rate Card (what it costs)  →  Billing Cycle (how often)  →  Payment Mode (how customer pays)
         ↑                              ↑
    Billing Rules (policies that adjust or enforce charges)
```

| Layer | Question it answers | Documentation |
|---|---|---|
| **[Rate cards](/rate-cards/)** | What packages exist and what do they cost? | [Rate Cards](/rate-cards/) |
| **[Billing cycles](/billing/billing-cycles)** | Hourly, monthly, quarterly, or yearly? | [Billing Cycles](/billing/billing-cycles) |
| **[Payment modes](/billing/payment-modes/)** | Prepaid, postpaid, or manual payment? | [Payment Modes](/billing/payment-modes/) |
| **[Billing rules](/billing/billing-rules)** | IP billing, tax, coupons, bandwidth, backup sizing? | [Billing Rules](/billing/billing-rules) |

:::tip[Quick start — new provider setup]

1. Create [rate cards](/rate-cards/) and configure all package prices with billing cycles
2. Set global rules — `plan_ip_billing`, bandwidth threshold, backup billing — in [Billing Rules](/billing/billing-rules)
3. Configure **Payment Mode Settings** with StackConsole — decide which modes are available per account type **before go-live** — see [Payment Mode Settings](/billing/payment-modes/#payment-mode-settings-platform-wide)
4. Configure payment gateways and currency top-up amounts in **Settings → Billing Setup**
5. Onboard test customer → provision VM hourly and monthly → verify wallet or invoice behaviour
6. Review [Billing FAQs](/faq/billing) for common customer questions

:::

## Payment modes (summary)

| Mode | Payment model |
|---|---|
| **Prepaid** | Customer tops up wallet; usage deducted in real time |
| **Postpaid** | Usage tracked; invoiced at cycle end; card can auto-charge |
| **Manual** | Customer pays offline; admin verifies and marks invoices paid |

See [Payment Modes](/billing/payment-modes/).

## Billing cycles (summary)

| Cycle | Invoice timing |
|---|---|
| **Hourly (PAYG)** | End of month (consolidated hourly usage) |
| **Monthly / quarterly / yearly** | Immediately on service creation |

**Always hourly:** `VM_SNAPSHOT`, `BS_SNAPSHOT`, `BACKUP`, `BS_BACKUP`, `BANDWIDTH`, `ACCOUNT_TEMPLATE`, `ISO`

See [Billing Cycles](/billing/billing-cycles).

## Key billing rules (summary)

| Rule | Setting |
|---|---|
| IP charged separately from VM | `plan_ip_billing = true` in Global Settings |
| Free bandwidth allowance | Cloud Provider Setup → Free Bandwidth Threshold |
| Custom package minimum price | Unit pricing ≥ predefined package |
| Coupon discount duration | First billing cycle only |
| Tax exempt (testing) | Customer → Billing Setup → Is Tax Exempted? |

See [Billing Rules](/billing/billing-rules).

## Pricing formulas

CMP derives hourly and yearly prices from monthly using `30.5 × 24 = 732` hours per month.

See [Pricing Formulas](/rate-cards/pricing-formulas).

## Documentation in this section

* [Payment Modes](/billing/payment-modes/) — overview and comparison of all three modes
  * [Prepaid](/billing/payment-modes/prepaid)
  * [Postpaid](/billing/payment-modes/postpaid)
  * [Manual](/billing/payment-modes/manual)
* [Billing Cycles](/billing/billing-cycles)
* [Billing Rules](/billing/billing-rules)

## Related

* [Rate Cards](/rate-cards/)
* [Billing FAQs](/faq/billing)
* [Initial Super Admin Setup](/installation/initial-setup)
