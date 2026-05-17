---
sidebar_position: 1
title: "Billing FAQs"
tags: ["faq", "billing"]
---

# Billing FAQs

## What is pay-as-you-go billing?

Pay-as-you-go means you are charged only for the time your service is actually running. If you stop or delete the service, you stop being charged from that moment. In CMP, pay-as-you-go applies only to services with an **Hourly** billing cycle.

---

## If I choose hourly billing and delete my service after a few days, what do I pay?

You pay **only for the hours the service was active**. Billing stops as soon as the service is deleted.

**Example:** VM created Monday 10:00 AM, deleted Wednesday 2:00 PM → you pay only for those hours. Invoice is generated at end of month.

---

## If I choose monthly billing and delete my service mid-period, do I get a refund?

**No.** For monthly, quarterly, or yearly billing, you are charged for the entire billing period. Deletion before the end of the period does not reduce or refund the amount.

**Example:** Service created on the 10th with monthly billing. Deleted on the 15th. You still owe the full amount for the 10th through the end of the month.

---

## How is current usage calculated?

**Current Usage = this month's unpaid invoice + this month's usage**

Check the **Usage Details** in the Account Statement tab.

---

## How to calculate package pricing?

Use these formulas:

| Formula |  |
| --- | --- |
| `Hourly = Monthly / (30.5 × 24)` | Monthly $30 → Hourly ≈ $0.041 |
| `Monthly = Hourly × (30.5 × 24)` |  |
| `Yearly = Monthly × 12` | Monthly $30 → Yearly $360 |

**Recommended approach:** Define monthly pricing first, then derive hourly (for PAYG) and yearly (for long-term plans).

---

## Can I disable hourly billing system-wide and only use monthly/yearly?

Hourly billing is **mandatory and cannot be disabled** for these service types: `VM_SNAPSHOT`, `BS_SNAPSHOT`, `BACKUP`, `BS_BACKUP`, `BANDWIDTH`, `ACCOUNT_TEMPLATE`, `ISO`

For other services (VM, LB, K8s, BS), hourly billing can be disabled — but this requires impact analysis in staging before production changes.

---

## How does the snapshot cost work? (e.g. €0.20/GB/hour)

Cost = `snapshot_size_GB × hourly_rate`

**Example:** 10 GB snapshot at €0.20/GB/hour = **€2.00/hour**. Cost accumulates for as long as the snapshot is stored.

---

## Does CMP support a pay-as-you-go pricing model fully?

Yes. Key behaviours:

* Billing starts from exact creation time, ends at deletion time
* No minimum monthly charges
* Invoices are generated monthly (consolidating all hourly usage)
* Applies to both prepaid and postpaid accounts

---

## Is there a way to add free credits without using coupons?

Currently no — coupons are the only way to add free credits. Coupons must have an expiry date (no non-expiring option), but you can set a long validity (e.g. 1000–2000 days).

---

## Once a coupon is applied, does the discount apply to every billing cycle or just the first?

The coupon discount applies **only to the first billing cycle**. From the second cycle onward, the original price applies.

---

## Can we allow a free trial for only specific customers?

Free trials are applied globally and cannot be restricted to specific customers. As an alternative, create a free credit coupon and share it with selected customers.

---

## Stripe charged a small amount to activate the card — is this refunded?

Yes. Stripe's authorization hold (e.g. 1 real) is temporary and automatically refunded to the customer.

---

## Why are Stripe charge attempts showing even though the account is manual payment?

If a customer adds a credit/debit card to a manual payment account, the account may **automatically convert to postpaid mode**. Once in postpaid mode, unpaid invoices can be auto-charged via the card.

---

## Is there a supported way to generate invoices without tax for testing or POC?

Yes. Enable the **"Tax Exempted"** option:

**Path:** Clients → Select Customer → Billing Setup → Enable "Is Tax Exempted?" → Submit

---

## How to change the date-time format?

**Application-wide (new accounts only):** Admin → Global Settings → `default_date_time_format`

Note: Only affects newly created accounts. Existing accounts keep their current format.

**Per-account:** Each user can set their own format from **Profile → Preferences**. Account-level setting takes priority over the global default.