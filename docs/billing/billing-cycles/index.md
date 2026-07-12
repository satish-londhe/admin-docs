---
sidebar_position: 1
title: "Billing Cycles"
tags: ["billing", "hourly", "monthly", "quarterly", "billing-cycles"]
---

# Billing Cycles

A **billing cycle** defines **how often** a service is priced and charged — from hourly pay-as-you-go to multi-year subscriptions.

Billing cycle is configured on each **package** in a [rate card](/rate-cards/) under **Billing cycle and pricing**. Customers select the cycle when provisioning (where the package supports multiple cycles).

Billing cycle works together with:

* **[Payment mode](/billing/payment-modes/)** — how the customer pays (prepaid, postpaid, manual)
* **[Billing rules](/billing/billing-rules/)** — how charges are calculated (pro-rata, calendar alignment, date-to-date)

**CMP path:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Cycle | Duration | Best for | Invoice timing |
|---|---|---|---|
| [Hourly](/billing/billing-cycles/hourly) | Per hour | Variable workloads, dev/test | End of month (consolidated) |
| [Monthly](/billing/billing-cycles/monthly) | 1 month | Steady production VMs | On service creation / renewal |
| [Quarterly](/billing/billing-cycles/quarterly) | 3 months | Mid-term commitment | On service creation / renewal |
| [Semi-annually](/billing/billing-cycles/semi-annually) | 6 months | Longer commitment | On service creation / renewal |
| [Annually](/billing/billing-cycles/annually) | 12 months | Annual discounts | On service creation / renewal |
| [Bi-annually](/billing/billing-cycles/bi-annually) | 24 months | Two-year plans | On service creation / renewal |
| [Tri-annually](/billing/billing-cycles/tri-annually) | 36 months | Three-year plans | On service creation / renewal |

**Pricing tip:** Define **monthly** prices first, then let CMP derive other cycles — see [Pricing Formulas](/rate-cards/pricing-formulas).

:::

## Pages in this section

* [Hourly](/billing/billing-cycles/hourly) — pay-as-you-go; consolidated month-end invoicing
* [Monthly](/billing/billing-cycles/monthly) — recurring monthly; all payment modes
* [Quarterly](/billing/billing-cycles/quarterly) — 3-month billing; pro-rata and calendar rules
* [Semi-annually](/billing/billing-cycles/semi-annually) — 6-month billing
* [Annually](/billing/billing-cycles/annually) — yearly / annual billing
* [Bi-annually](/billing/billing-cycles/bi-annually) — every 2 years
* [Tri-annually](/billing/billing-cycles/tri-annually) — every 3 years

## The seven billing cycles

| Cycle | Also called | Charging model |
|---|---|---|
| **Hourly** | PAYG, pay-as-you-go | Per hour of actual usage |
| **Monthly** | — | Fixed recurring monthly period |
| **Quarterly** | 3 months | Fixed recurring 3-month period |
| **Semi-annually** | 6 months | Fixed recurring 6-month period |
| **Annually** | Yearly, annual | Fixed recurring 12-month period |
| **Bi-annually** | Every 2 years | Fixed recurring 24-month period |
| **Tri-annually** | Every 3 years | Fixed recurring 36-month period |

```
Hourly:        Create ──●──●──●──●── delete  →  bill = hours used (invoice at month end)
Fixed cycles:  Create ────────────────────  →  bill = full period upfront
```

:::warning[No refunds on early deletion — fixed cycles]

CMP does **not** support refunds when a customer deletes a fixed-cycle service before the period ends. The **full committed period** is still charged. Customers who need flexibility should choose **hourly** billing where available.

:::

## Mandatory hourly billing

The following service types **always use hourly billing**. Monthly and longer cycles are **not available** on their package forms:

| Service type | CMP package |
|---|---|
| `VM_SNAPSHOT` | VM Snapshot |
| `BS_SNAPSHOT` | Volumes Snapshot |
| `BACKUP` | VM Backup |
| `BS_BACKUP` | Block storage backup (OpenStack) |
| `BANDWIDTH` | Unit Pricing (bandwidth) |
| `ACCOUNT_TEMPLATE` | Template |
| `ISO` | ISO |

See [Hourly — mandatory hourly services](/billing/billing-cycles/hourly#mandatory-hourly-services) for details.

## Configure billing cycles on packages

1. Open **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type]**
2. On each package, complete **Billing cycle and pricing**
3. Enter prices for each currency and cycle CMP supports
4. Set price to **0** when a charge does not apply

Orchestrator package guides:

* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)

## How cycle prices are derived

| Conversion | Formula |
|---|---|
| Monthly → Hourly | `Hourly = Monthly ÷ (30.5 × 24)` |
| Monthly → Yearly | `Yearly = Monthly × 12` |

See [Pricing Formulas](/rate-cards/pricing-formulas).

## Related

* [Billing Overview](/billing/overview)
* [Payment Modes](/billing/payment-modes/)
* [Billing Rules](/billing/billing-rules/)
* [Billing FAQs](/faq/billing)
