---
sidebar_position: 7
title: "Billing Cycles"
tags: ["billing", "hourly", "monthly", "payg"]
---

# Billing Cycles

A **billing cycle** defines **how often** a service is priced and charged — hourly (pay-as-you-go), monthly, quarterly, or yearly.

Billing cycle is configured on each **package** in a [rate card](/rate-cards/) under **Billing cycle and pricing**. Customers select the cycle when provisioning (where the service supports multiple cycles).

Billing cycle is separate from **[payment mode](/billing/payment-modes/)** (prepaid, postpaid, or manual).

:::tip[Quick start]

| Cycle | Best for | Invoice timing | Delete mid-period? |
|---|---|---|---|
| **Hourly (PAYG)** | Variable workloads, dev/test | End of month (consolidated) | Pay only for hours used ✅ |
| **Monthly** | Steady production VMs | On service creation | No refund — full period charged ❌ |
| **Quarterly** | Committed mid-term plans | On service creation | No refund ❌ |
| **Yearly** | Long-term discounts | On service creation | No refund ❌ |

**Always hourly (cannot disable):** `VM_SNAPSHOT`, `BS_SNAPSHOT`, `BACKUP`, `BS_BACKUP`, `BANDWIDTH`, `ACCOUNT_TEMPLATE`, `ISO`

**Pricing tip:** Define **monthly** prices first, then let CMP derive hourly and yearly — see [Pricing Formulas](/rate-cards/pricing-formulas).

:::

## Available billing cycles

| Cycle | Also called | How charging works | Invoice timing |
|---|---|---|---|
| **Hourly** | PAYG, pay-as-you-go | Charged per hour of actual usage from creation to deletion | **End of month** (all hourly usage consolidated) |
| **Monthly** | — | Fixed charge for one calendar month from creation date | **Immediately on creation** |
| **Quarterly** | — | Fixed charge for a 3-month period from creation date | **Immediately on creation** |
| **Yearly** | — | Fixed charge for 12 months from creation date | **Immediately on creation** |

```
Hourly:     Create ──●──●──●──●── delete     →  bill = hours used
Monthly:    Create ────────────────────────  →  bill = full month upfront
```

## Hourly (pay-as-you-go)

Pay-as-you-go means customers pay **only for the time a service is actually running**.

* Billing starts at the **exact creation time**
* Billing stops at **deletion** (or when the service ends)
* No minimum monthly commitment for hourly-billed services
* Applies to [prepaid](/billing/payment-modes/prepaid), [postpaid](/billing/payment-modes/postpaid), and [manual](/billing/payment-modes/manual) accounts

**Example:** VM created Monday 10:00, deleted Wednesday 14:00 → customer pays only for those hours. Invoice generated at month end.

### Stoppable services and hourly billing

When [stoppable services](/billing/billing-rules#stoppable-services) are enabled and a customer **stops** a VM:

| Component | Hourly billing while stopped? |
|---|---|
| **CPU and memory** | ❌ Stops |
| **Volumes (storage)** | ✅ Continues |
| **IP address** | ✅ Continues |

Stopped VMs still incur storage and IP charges on hourly billing.

## Fixed cycles (monthly, quarterly, yearly)

Fixed-cycle services charge the customer for the **entire committed period upfront** at provisioning time.

### No pro-rata refund on early deletion

If a customer deletes a monthly, quarterly, or yearly service **before the period ends**, they still owe the **full period amount**. CMP does not refund unused time.

**Example:** Monthly VM created on the 10th, deleted on the 15th → customer still pays for the full month starting the 10th.

:::warning[Communicate fixed-cycle terms to customers]

Make your portal terms clear: fixed-cycle plans are **non-refundable** on early cancellation. Customers who need flexibility should choose **hourly** billing where available.

:::

### Prepaid vs postpaid on fixed cycles

| Billing mode | Fixed-cycle charge |
|---|---|
| **Prepaid** | Full period deducted from **wallet immediately** at creation |
| **Postpaid** | Full period **invoiced immediately** at creation; settled per payment terms or card |

## Services with mandatory hourly billing

The following service types **always use hourly billing**. Monthly, quarterly, and yearly cycles are **not available** on their package forms:

| Service type | CMP package | Notes |
|---|---|---|
| `VM_SNAPSHOT` | VM Snapshot | Per snapshot size |
| `BS_SNAPSHOT` | Volumes Snapshot | Per snapshot size |
| `BACKUP` | VM Backup | Per GB backed up |
| `BS_BACKUP` | Block storage backup | Per GB |
| `BANDWIDTH` | Unit Pricing (bandwidth column) | Usage-based; beyond free threshold |
| `ACCOUNT_TEMPLATE` | Template | Per GB stored |
| `ISO` | ISO | Per GB stored |

These are **usage-metered** resources — they accumulate cost for as long as they exist or for traffic consumed.

### Disabling hourly billing for other services

VM, volumes, load balancer, VPC, and Kubernetes packages typically support hourly billing by default. Disabling hourly billing system-wide for these services is possible but requires **impact analysis in staging** before production changes — customers on hourly plans would be affected.

## How cycle prices are derived

CMP derives all cycle prices from a base value using consistent formulas:

| Conversion | Formula |
|---|---|
| Monthly → Hourly | `Hourly = Monthly ÷ (30.5 × 24)` |
| Monthly → Yearly | `Yearly = Monthly × 12` |

The constant `30.5 × 24 = 732` is the average hours per month CMP uses.

**Recommended:** Enter **monthly** prices on packages and unit pricing forms first. CMP auto-calculates hourly and yearly.

See [Pricing Formulas](/rate-cards/pricing-formulas) for examples and custom-package checks.

## Customer experience

When provisioning a service that supports multiple cycles, customers see cycle options in the portal (for example, **Hourly**, **Monthly**, **Yearly**) with the calculated price for each.

* **Hourly** — lowest commitment; best for short-lived or variable workloads
* **Monthly / yearly** — predictable cost; often offered at a discount vs equivalent hourly run time

Free trials (where enabled on a package) apply per [billing rules](/billing/billing-rules#free-trials) — typically to the **first billing cycle only**.

## Configure billing cycles on packages

1. Open **Settings → Billing Setup → Rate Cards → [Rate Card] → Packages → [Service Type]**
2. On each package, complete **Billing cycle and pricing**
3. Enter prices for each currency and cycle CMP supports
4. Set price to **0** when a charge does not apply (some forms show this note explicitly)

Orchestrator-specific package guides describe cycle behaviour per service:

* [Virtual Machine](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine)
* [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes)
* [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing)
* [IP Address](/orchestrators/cloudstack/offering-sync-and-packages/ip-address)

## Validation checklist

Before going live with billing cycles:

* [ ] Monthly prices defined on all active packages (hourly/yearly derived correctly)
* [ ] Mandatory hourly service types have hourly per-GB or per-unit rates configured
* [ ] Customers understand fixed-cycle **no-refund** policy for early deletion
* [ ] Stoppable-service behaviour documented for your deployment if VMs can be stopped
* [ ] Prepaid wallet minimum balance adequate for fixed-cycle purchases

## Related

* [Billing Overview](/billing/overview)
* [Payment Modes](/billing/payment-modes/)
* [Billing Rules](/billing/billing-rules)
* [Pricing Formulas](/rate-cards/pricing-formulas)
* [Billing FAQs](/faq/billing)
