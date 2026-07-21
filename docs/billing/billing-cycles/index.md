---
sidebar_position: 1
title: "Billing Cycles"
tags: ["billing", "hourly", "monthly", "quarterly", "billing-cycles"]
---

# Billing Cycles

A **billing cycle** defines **how often** a service is priced and charged — from hourly pay-as-you-go to multi-year subscriptions.

Billing cycle is selected by the customer at provisioning time (from the cycles enabled for your deployment). **Prices** for each enabled cycle are set per **package** in a [rate card](/billing/rate-cards/) under **Billing cycle and pricing**.

Billing cycle works together with:

* **[Payment mode](/billing/payment-modes/)** — how the customer pays (prepaid, postpaid, manual)
* **[Billing rules](/billing/billing-rules/)** — how charges are calculated (pro-rata, calendar alignment, date-to-date)

**CMP path:** **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type] → Billing cycle and pricing**

:::tip[Quick start]

| Cycle | Duration | Best for |
|---|---|---|
| [Hourly](/billing/billing-cycles/hourly) | Per hour | Variable workloads, dev/test |
| [Monthly](/billing/billing-cycles/monthly) | 1 month | Steady production VMs |
| [Quarterly](/billing/billing-cycles/quarterly) | 3 months | Mid-term commitment |
| [Semi-annually](/billing/billing-cycles/semi-annually) | 6 months | Longer commitment |
| [Annually](/billing/billing-cycles/annually) | 12 months | Annual discounts |
| [Bi-annually](/billing/billing-cycles/bi-annually) | 24 months | Two-year plans |
| [Tri-annually](/billing/billing-cycles/tri-annually) | 36 months | Three-year plans |

**Invoice timing** depends on your deployment's **[billing rule](/billing/billing-rules/)** (for example, [FIXED_PRORATA](/billing/billing-rules/fixed-prorata), [DATE_TO_DATE](/billing/billing-rules/date-to-date)) — not on the cycle alone. Hourly always uses FIXED_PRORATA with month-end consolidated invoicing.

**Admin tip:** CMP does **not** auto-fill prices across billing cycles — you enter each cycle on the package form. A common approach is to set **monthly** first, then use [Pricing Formulas](/billing/rate-cards/pricing-formulas) to calculate hourly, quarterly, yearly, and other cycles before entering them.

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

## No refunds on early deletion — fixed cycles

:::warning[No refunds on early deletion — fixed cycles]

CMP does **not** support refunds when a customer deletes a fixed-cycle service before the period ends. The **full committed period** is still charged. Customers who need flexibility should choose **hourly** billing where available.

:::

## Billing cycles and payment modes

| Cycle | Prepaid | Postpaid | Manual |
|---|---|---|---|
| **[Hourly](/billing/billing-cycles/hourly)** | ✅ | ✅ **Recommended** | ✅ |
| **[Monthly](/billing/billing-cycles/monthly)** | ✅ | ✅ **Recommended** | ✅ |
| **[Quarterly](/billing/billing-cycles/quarterly)** and longer | ✅ **Recommended** | ❌ **Not recommended** | ✅ |

:::warning[Postpaid — hourly and monthly only]

Use **postpaid** only with **hourly** and **monthly** billing cycles.

**Do not** offer **quarterly**, **semi-annual**, **annual**, **bi-annual**, or **tri-annual** cycles on postpaid accounts:

| Risk | Why it matters |
|---|---|
| **Revenue delay** | You may wait **months or years** to collect payment for a long committed period |
| **Fraud exposure** | A customer can consume services for the full cycle and leave before paying |

**Monthly** limits outstanding exposure to one billing period — acceptable for postpaid. **Hourly** bills usage at month end with threshold controls.

For **quarterly and longer** cycles, use **prepaid** (wallet collected upfront) or **manual** (offline payment with admin verification). See [Postpaid](/billing/payment-modes/postpaid#billing-cycles-and-postpaid).

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

:::warning[Global billing cycles — no per-service toggle]

**Billing cycles are enabled at the application level** — typically during initial deployment with StackConsole. CMP does **not** support enabling or disabling billing cycles per service type or per package.

If a billing cycle is enabled for your deployment, you must enter a **valid price** for that cycle and each supported currency on **every package** in a rate card. Do **not** set price to **0** to skip a cycle for one service — that is not supported.

The only service-level exception is [mandatory hourly billing](#mandatory-hourly-billing): some service types always use hourly billing and never show monthly or longer cycles on the package form.

:::

1. Confirm which billing cycles are enabled for your deployment (application-level setting — contact **StackConsole** before go-live)
2. Open **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type]**
3. On each package, enter pricing for **every enabled billing cycle** and currency

Orchestrator package guides:

* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)

## Reference formulas for admins

CMP does not derive one cycle price from another. Use these formulas when deciding what to enter for each cycle on the package form:

| Conversion | Formula |
|---|---|
| Monthly → Hourly | `Hourly = Monthly ÷ (30.5 × 24)` |
| Monthly → Yearly | `Yearly = Monthly × 12` |

See [Pricing Formulas](/billing/rate-cards/pricing-formulas) for the full reference.

## Related

* [Billing Overview](/billing/overview)
* [Payment Modes](/billing/payment-modes/)
* [Billing Rules](/billing/billing-rules/)
* [Billing FAQs](/faq/billing)
