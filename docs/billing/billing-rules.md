---
sidebar_position: 8
title: "Billing Rules"
tags: ["billing", "rules", "tax", "coupons", "global-settings"]
---

# Billing Rules

**Billing rules** are the platform policies and configuration that control **how charges are calculated, adjusted, and enforced** — beyond the base price on a rate card package.

Rules come from:

* **Global settings** — apply platform-wide
* **Cloud Provider Setup** — per orchestrator instance
* **Customer account settings** — per-client overrides (tax exempt, billing mode)
* **Package configuration** — free trials, pricing constraints

:::tip[Quick start]

| Rule | Where to configure | Default / note |
|---|---|---|
| IP billed separately from VM | **Global Settings** → `plan_ip_billing` | `false` — IP cost included in VM package |
| Free bandwidth per month | **Cloud Provider Setup** → Provider Config | Usage above threshold billed at unit rate |
| VM backup: physical vs virtual size | **Cloud Provider Setup** → VM Backup Billing | Virtual if physical size not reported |
| Stoppable VM billing | Cloud Provider / global stoppable setting | CPU/RAM pause when stopped; storage + IP continue |
| Tax exempt (POC/testing) | **Clients → Customer → Billing Setup** | Per-account |
| Coupons / free credits | Admin coupon management | Discount applies to **first cycle only** |
| Custom package floor price | [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing) | Must be ≥ predefined package for same resources |
| Low wallet disciplinary action | **Global Settings** | Grace period then warnings / suspension |
| Prepaid billing model | **Global Settings** → `generate_prepaid_reciept` | `false` = Model 1 (invoice infra credits); `true` = Model 2 (invoice services). **India: Model 1 required** (`false`) |
| Postpaid advance invoicing | **Admin → Invoices → Invoice Settings** | `POSTPAID_ADVANCE_*` flags default `false` — set at setup with StackConsole only |

:::

## Global billing rules

Configure in **Admin Panel → Global Settings** during [initial setup](/installation/initial-setup).

| Setting | Purpose |
|---|---|
| `plan_ip_billing` | `true` = charge public IPs separately from VM packages; `false` = IP cost bundled in VM price at creation |
| `enforce_2fa_to_all` | Security — not billing directly, but affects account access during payment flows |
| `default_date_time_format` | Display format on invoices and statements |
| Grace period / disciplinary thresholds | Wallet negative balance before automated actions (exact setting names vary by deployment) |

### IP billing rule (`plan_ip_billing`)

Controls whether a public IP selected at **VM creation** is charged separately or included in the VM package price.

| Value | Behaviour |
|---|---|
| `false` (default) | Public IP at VM creation is **included** in VM package pricing — no separate IP line item |
| `true` | Public IP at VM creation triggers a **separate IP charge** per [IP Address package](/orchestrators/cloudstack/offering-sync-and-packages/ip-address) |

:::warning[Global only — no mixed model]

`plan_ip_billing` applies **platform-wide**. CMP does not support bundled IPs at VM creation while charging only for reserved/standalone IPs. Reserved IPs purchased separately are **always billed** via the IP Address package regardless of this setting.

:::

See [IP Address packages — billing modes](/orchestrators/cloudstack/offering-sync-and-packages/ip-address#billing-modes).

## Cloud Provider Setup rules

Per-orchestrator settings in **Settings → Orchestrator → Cloud Providers → [Setup]**.

| Setting area | Rule |
|---|---|
| **Enable Override Disk Offering** | `Yes` = root disk sized and billed separately via [Volumes](/orchestrators/cloudstack/offering-sync-and-packages/volumes); recommended for flexible pricing |
| **Free Bandwidth Threshold (GB)** | Monthly free traffic allowance; only usage **above** this is billed at the bandwidth unit rate |
| **Bandwidth service enabled** | When on, **1 GB Bandwidth per Month** column appears in [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing) |
| **VM Backup Billing** | `physical` = charge actual backup storage consumed; `virtual` = charge provisioned disk size |
| **Enable Provider Backup** | Determines CMP built-in vs CloudStack native backup — affects billing form fields |

### Bandwidth billing rule

Bandwidth is **usage-based** and **always hourly**:

1. CloudStack tracks network traffic via the usage service
2. CMP reads usage monthly
3. Traffic up to **Free Bandwidth Threshold** is free — threshold **resets each month**
4. Traffic above threshold × **1 GB Bandwidth per Month** unit rate = charge

**Example:** Threshold 1,000 GB; customer uses 1,200 GB → 200 GB billed.

### VM backup size rule

| VM Backup Billing | Charged size |
|---|---|
| **Physical** | Actual backup storage reported by provider |
| **Virtual** | Full provisioned virtual disk size |

:::warning[Physical billing fallback]

If **physical** is selected but CloudStack does not report physical backup size, CMP **falls back to virtual size**. Verify end-to-end before enabling physical billing in production.

:::

See [VM Backup packages](/orchestrators/cloudstack/offering-sync-and-packages/vm-backup#choosing-a-billing-mode).

## Stoppable services

When stoppable services are enabled, **stopped VMs** follow different metering rules:

| Resource | Billing while VM stopped? |
|---|---|
| **vCPU and memory** | ❌ Paused |
| **Volumes / root disk** | ✅ Continues |
| **IP address** | ✅ Continues |

Scheduled start/stop actions follow the same rules — only compute pauses; storage and IP keep accruing.

:::info[Storage bundled in compute offering]

If CloudStack compute offerings **bundle storage** (override disk disabled), stoppable-service CPU/RAM pause behaviour is **limited** — storage cannot be billed separately. Use **compute-only offerings + override disk** for full stoppable billing. See [Virtual Machine packages](/orchestrators/cloudstack/offering-sync-and-packages/virtual-machine).

:::

## Wallet and payment rules

### Prepaid wallet

* **`generate_prepaid_reciept`** (Global Settings, Billing) — `false` = invoice wallet top-ups (Model 1, **required for India**); `true` = invoice services, receipt for wallet (Model 2). See [Configure prepaid billing model](/billing/payment-modes/prepaid#configure-prepaid-billing-model)
* Customers must **manually top up** — no saved card auto-charge in pure prepaid mode
* Negative balance allowed temporarily; cleared on next top-up
* Beyond grace period → **disciplinary actions** (notification, suspension per global config)

See [Payment Modes — Prepaid](/billing/payment-modes/prepaid) and [Payment Modes](/billing/payment-modes/).

### Postpaid and manual payment rules

* Payment mode conversion is **limited** — only **Manual → Postpaid** is supported, and it is **automatic** when the customer saves a card. See [Changing payment mode](/billing/payment-modes/#changing-payment-mode)
* Adding a card does **not** convert **prepaid** accounts to postpaid. **Manual** accounts **do** auto-convert to postpaid on card save
* Stripe authorization holds during card setup are **refunded automatically**
* Unpaid invoices can be auto-charged when a card is on file on **postpaid** accounts

## Tax rules

CMP supports tax configuration for invoicing. Exact tax UI varies by deployment and region.

| Capability | Notes |
|---|---|
| **Tax on invoices** | Applied per your tax configuration and customer jurisdiction |
| **State-wise taxation** | Supported for regions requiring state-level tax breakdown (for example, India GST with state-wise invoices) — configure in admin billing/tax settings |
| **Tax exempt (POC/testing)** | **Clients → [Customer] → Billing Setup → Is Tax Exempted?** — generates invoices without tax for that account |

:::info[Admin billing revamp]

Enhanced billing rules UI — including coupons, tax rules, and rate card relationships — is being expanded in the CMP admin revamp. Core rules documented here apply today; new admin screens may add configuration paths without changing underlying behaviour.

:::

## Coupons and promotional credits

| Rule | Behaviour |
|---|---|
| **Only way to add free credits** | No separate "free credit" top-up outside coupons |
| **Expiry required** | Coupons must have an expiry date — use long validity (e.g. 1000+ days) for practical "non-expiring" promos |
| **Discount duration** | Coupon discount applies to the **first billing cycle only** — original price from second cycle onward |
| **Per-customer free trials** | Free trials on packages are **global** — cannot restrict to specific customers; use targeted coupons instead |
| **Resource filters** | Coupons can be scoped to specific services (for example, VM-only) depending on coupon configuration |

### Free credits and discounts on invoices

| Topic | Behaviour |
|---|---|
| **Add free credits** | Use **coupons** — no separate free-credit top-up outside coupons |
| **Free credits vs invoices** | Free credits can be **redeemed against existing invoices** to reduce or settle amounts |
| **Account discounts** | Configured at account level by admin |
| **Discounts on generated invoices** | Customers **cannot** apply discounts after invoice is generated |
| **Discounts at provisioning** | Apply only at **service creation** — reduce cost upfront |
| **Partial payment** | Admin can mark invoices paid for **partial amounts** — common in [manual](/billing/payment-modes/manual) mode (e.g. ₹4,000 paid against ₹5,000 due) |

See [Billing FAQs](/faq/billing) for coupon and credit questions.

## Free trials

When **Enable Free Trial** is set on a package:

* The first billing cycle for that service may be free or discounted per package configuration
* Applies to any customer who selects that package — **not** restrictable to individual accounts
* For selective promotions, use **coupons** instead

## Custom package pricing rule

When customers use **custom** CPU/RAM/storage instead of predefined packages:

> Custom configuration price must be **equal to or greater than** the equivalent predefined package.

This prevents customers from always choosing custom inputs to get a lower price than your published tiers.

Configure and verify in [Unit Pricing](/orchestrators/cloudstack/offering-sync-and-packages/unit-pricing).

## Account-level rules

Set per customer in **Clients → [Customer] → Billing Setup**:

| Setting | Effect |
|---|---|
| **Payment mode** | Prepaid, postpaid, or manual — set at onboarding; see [Assigning payment mode](/billing/payment-modes/#assigning-payment-mode) |
| **Is Tax Exempted?** | Invoices generated without tax |
| **Rate card** | Which [rate card](/rate-cards/) prices apply — assign before services exist |

:::warning[Rate card locked after services]

Customer rate card cannot be changed once the account has **active services**. Plan rate card assignment during onboarding.

:::

## Rule interaction map

```
Global Settings (plan_ip_billing, grace period)
        +
Cloud Provider Setup (bandwidth threshold, backup billing, override disk)
        +
Rate Card packages (prices, cycles, free trials)
        +
Customer Billing Setup (mode, tax exempt, rate card)
        ↓
Final invoice / wallet deduction
```

## Validation checklist

* [ ] `plan_ip_billing` matches your IP pricing strategy
* [ ] Free bandwidth threshold set per cloud provider setup
* [ ] VM Backup Billing (physical/virtual) verified against provider reporting
* [ ] Override disk enabled if storage billed separately
* [ ] Unit pricing ≥ predefined packages for equivalent configs
* [ ] Tax rules tested with a tax-exempt POC account if needed
* [ ] Coupon expiry and first-cycle-only discount communicated to sales team
* [ ] Grace period and disciplinary actions reviewed for prepaid deployments

## Related

* [Billing Overview](/billing/overview)
* [Payment Modes](/billing/payment-modes/)
* [Billing Cycles](/billing/billing-cycles)
* [Prepaid](/billing/payment-modes/prepaid)
* [Rate Cards](/rate-cards/)
* [Initial Super Admin Setup](/installation/initial-setup)
* [Billing FAQs](/faq/billing)
