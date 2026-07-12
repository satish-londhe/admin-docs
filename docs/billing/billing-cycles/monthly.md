---
sidebar_position: 3
title: "Monthly"
tags: ["billing", "monthly", "billing-cycles"]
---

# Monthly

**Monthly** billing charges customers for a **recurring one-month period** from the service creation or renewal date.

| | |
|---|---|
| **Duration** | 1 month |
| **Best for** | Steady production workloads, predictable monthly cost |

**Configure:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Charge timing | **Full month** charged at service creation |
| Invoice timing | **Immediately on creation** and each renewal |
| Early deletion | **No refund** — full period still charged ❌ |
| Postpaid | Recommended cycle alongside hourly |

:::

## How monthly billing works

Fixed-cycle services charge the customer for the **entire committed period upfront** at provisioning time.

**Example:** Monthly VM created on the 10th → customer pays for the full month starting the 10th. If deleted on the 15th, the **full month is still charged** — no pro-rata refund.

## Billing rules

| Rule | Supported? |
|---|---|
| **FIXED_PRORATA** | ✅ |
| **DATE_TO_DATE** | ✅ — required for [service contracts](/billing/billing-rules/date-to-date) |
| **CALENDAR_MONTH** | ✅ |

See [Billing Rules](/billing/billing-rules/) for rule definitions and pro-rata calculation.

## Payment modes

| Mode | Supported? |
|---|---|
| **Prepaid** | ✅ Full period deducted from wallet at creation |
| **Postpaid** | ✅ Invoiced at creation; auto-charge per [postpaid](/billing/payment-modes/postpaid) settings |
| **Manual** | ✅ Invoice generated; offline payment |

:::info[Recommended for postpaid]

For postpaid accounts, enable **hourly** and **monthly** billing cycles first.

:::

## Invoice and renewal

| Event | Behaviour |
|---|---|
| **Service creation** | Invoice generated immediately; full month charged |
| **Renewal** | Renewal invoice generated in advance (except hourly) |
| **Prepaid** | Wallet balance checked — insufficient balance blocks creation |
| **Postpaid** | Payable invoice per invoice settings (default or [advance mode](/billing/payment-modes/postpaid#postpaid-invoice-generation-modes)) |

## Early deletion

Deleting a monthly service **before the period ends** does **not** reduce the charge. CMP does **not** refund unused time.

Admin may grant **free credits** for dispute resolution — see [Billing Rules](/billing/billing-rules/).

## VM upgrades

Mid-cycle upgrades calculate unused credit and new plan cost for the **remaining period**. See [FIXED_PRORATA — service upgrades](/billing/billing-rules/fixed-prorata#service-upgrades) and [Postpaid — VM upgrade billing](/billing/payment-modes/postpaid#vm-upgrade-billing-postpaid).

## Related

* [Billing Cycles](/billing/billing-cycles/)
* [Hourly](/billing/billing-cycles/hourly)
* [Quarterly](/billing/billing-cycles/quarterly)
