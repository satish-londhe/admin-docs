---
sidebar_position: 2
title: "Billing & pricing"
tags: ["faq", "platform", "billing", "payg", "snapshots"]
---

# Billing & pricing

Platform Q&A for pay-as-you-go, invoices, pricing formulas, snapshot charges, and tax. Full product guides: [Billing overview](/billing/overview), [Pricing formulas](/rate-cards/pricing-formulas).

## What is “pay-as-you-go” billing?

Pay-as-you-go means customers are charged only for the time a service is actually running. When the service is stopped (for stoppable services) or deleted, charging for that metered capacity stops from that moment.

In CMP, pay-as-you-go maps to the **Hourly** billing cycle.

## Does the platform support a Pay-As-You-Go pricing model?

Yes. With **Hourly** billing:

* Usage is measured from service **creation** until **deletion** (and respects stoppable-service rules where enabled)
* There is **no** fixed monthly commitment for the hourly service itself
* There are **no** separate minimum monthly charges or overage policies beyond actual usage
* Invoices still roll up on a **monthly** calendar for reporting (prepaid wallet deductions can happen in real time; see [Prepaid](/faq/platform/prepaid-coupons-credits))

Applies to prepaid, postpaid, and manual payment modes for how settlement works — the metering model is the same.

## If I choose hourly billing and delete my service after a few days, what do I pay?

Only for the hours the service was active. Billing stops when the service is deleted.

The **minimum billable unit is one hour**. Partial hours are charged as a **full hour**. If a VM runs into the next hour for only 10 minutes, that hour is still charged in full.

**Example:** VM created Monday 10:00 AM, deleted Wednesday 2:10 PM → you pay through the hour that includes 2:10 PM (that partial hour counts as a full hour). An invoice for hourly usage is generated at month-end (or as configured for the account’s payment mode).

See also [Hourly billing](/billing/billing-cycles/hourly).

## If I choose monthly (or quarterly/yearly) billing and delete mid-period, do I get a refund?

**No.** For monthly, quarterly, yearly, and similar fixed cycles, the customer is charged for the **full billing period** from create (or renew) through the end of that period. Early deletion does **not** reduce or refund unused days.

**Example:** Monthly service created on the 10th → invoice covers 10th through end of month. Deleted on the 15th → full period is still owed.

CMP has **no automated refund** for unused time on fixed cycles. For disputed or goodwill cases, an admin may grant **free credits** (typically via coupons) — that is a manual commercial adjustment, not a system refund of the committed period.

**Related guides**

* [Billing cycles — no refunds on early deletion](/billing/billing-cycles/#no-refunds-on-early-deletion--fixed-cycles)
* [Monthly — early deletion](/billing/billing-cycles/monthly#early-deletion)
* [Quarterly — early deletion](/billing/billing-cycles/quarterly#early-deletion) (same rule for longer fixed cycles)
* [Payment modes — early deletion / free credits](/billing/payment-modes/#shared-invoicing-topics)
* [Prepaid — early deletion](/billing/payment-modes/prepaid#early-deletion-before-cycle-ends)
* [Postpaid — early deletion](/billing/payment-modes/postpaid#early-deletion-before-cycle-ends)
* [FAQ — coupons & free credits](/faq/platform/prepaid-coupons-credits) — how to issue credit when you choose to compensate

Customers who need day-level flexibility should use **[hourly](/billing/billing-cycles/hourly)** billing where the service type allows it.

## How is current usage calculated?

**Current usage** = this month’s unpaid invoice amount + this month’s ongoing usage.

Customers and admins can review details under the account’s **Account Statement** / **Usage Details**.

## How do I calculate package pricing (hourly / monthly / yearly)?

Define **monthly** first (most intuitive), then derive other cycles.

| Cycle | Formula |
|---|---|
| **Hourly** | `Monthly ÷ (30.5 × 24)` |
| **Monthly** | `Hourly × (30.5 × 24)` |
| **Yearly** | `Monthly × 12` |

**Example:** Monthly = `$30`

* Hourly = `30 ÷ 732` ≈ `$0.041` / hour  
* Yearly = `30 × 12` = `$360` / year  

See [Pricing formulas](/rate-cards/pricing-formulas) for the full reference.

## Can we disable hourly billing system-wide and force only monthly/yearly?

For these service types, **hourly is mandatory** and cannot be disabled:

`VM_SNAPSHOT`, `BS_SNAPSHOT`, `BACKUP`, `BS_BACKUP`, `BANDWIDTH`, `ACCOUNT_TEMPLATE`, `ISO`

For other services (for example VM, LB, Kubernetes, block storage), hourly **can** be disabled in principle, but you must validate impact on staging first — many packages are already sold on hourly. Treat a full system-wide disable as a controlled change with StackConsole support if needed.

## How is snapshot cost calculated (for example €0.20/GB per hour)?

Instance / volume snapshot pricing is typically **per GB per hour** of stored snapshot size for as long as the snapshot exists.

**Example:** Snapshot size = 10 GB at €0.20 / GB / hour → `10 × 0.20` = **€2.00 per hour**, continuing until the snapshot is deleted.

Exact rates come from your rate card packages and may differ per zone/provider.

## Is there a way to generate invoices without tax (POC / internal / promo)?

Yes. Enable **Is Tax Exempted?** on the customer:

**Path:** **Clients → [customer] → Billing Setup → Is Tax Exempted?** → save

Invoices for that customer are generated without tax.

## Why are Stripe charge attempts visible on a manual payment account?

If the customer **adds a card**, CMP can convert the account from **manual** to **postpaid**. After that, unpaid invoices may be auto-charged.

See [Manual — converting to postpaid](/billing/payment-modes/manual#converting-manual-to-postpaid).

## Stripe charged a small amount (for example 1 real) to activate the card. Is it refunded?

Yes. That is typically a temporary **authorization hold**. Stripe (or the gateway) releases/refunds it automatically after verification. It is not a permanent CMP product charge.
