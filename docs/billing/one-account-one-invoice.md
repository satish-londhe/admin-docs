---
sidebar_position: 3
title: "One Account One Invoice"
tags: ["billing", "oaoi", "invoice", "postpaid", "manual", "consolidated"]
---

# One Account One Invoice (OAOI)

**One Account One Invoice** lets **postpaid** and **manual** customers receive a **single consolidated invoice** for all services on the account each billing cycle — instead of separate invoices for every service or billing event.

CMP groups billable items into **one invoice per account per month**.

:::warning[Not all accounts and rules]

OAOI does **not** support every account type or billing rule. Read [Unsupported account types and billing rules](#unsupported-account-types-and-billing-rules) before enabling.

:::

**Verify on this portal:** **Billing → Invoices → [Billing Settings](/billing/billing-settings)** → **Enabled Global Settings** → **`enable_one_account_one_invoice`**

---

## Overview

When OAOI is enabled:

* All billable services under an account are combined into **one invoice**
* The invoice is generated **once per month on the 1st**
* The invoice includes usage, renewals, and eligible contract charges from the **previous** billing period

### Example

| Service | Type |
|---|---|
| Virtual Machine | Monthly |
| Block Storage | Monthly |
| Backup Service | Monthly |

Without OAOI, the customer might receive **three** invoices. With OAOI they receive **one** consolidated invoice, for example:

| Field | Example |
|---|---|
| **Invoice date** | 1 April |
| **Billing period** | 1 March – 31 March |
| **Line items** | Virtual Machine usage · Block Storage usage · Backup Service usage |

---

## Requirements

All of the following must be true for OAOI to work correctly:

| Requirement | Description |
|---|---|
| **Billing type** | Account must be **Postpaid** or **Manual** |
| **Billing cycle** | Services must use **1st-to-1st monthly** billing (calendar-aligned) |
| **Advance billing** | Advance billing must be **disabled** (`POSTPAID_ADVANCE_*` / `MANUAL_ADVANCE_*` as applicable — see [Billing Settings — Environment Flags](/billing/billing-settings#3-environment-flags)) |
| **Global setting** | **`enable_one_account_one_invoice`** must be **`true`** |

**Configure:** **Admin Panel → Global Settings** → **`enable_one_account_one_invoice`** (Billing). Confirm live value under [Billing Settings (admin)](/billing/billing-settings).

:::tip[Who should use OAOI]

Ideal for enterprise customers, accounts with many services, finance teams that want **one invoice per month**, and providers who want simplified monthly billing for postpaid/manual customers.

:::

---

## Unsupported account types and billing rules

### Prepaid accounts

**Prepaid is not supported.** Prepaid services invoice (or track) individually against the wallet / prepaid model and **cannot** be consolidated under OAOI.

See [Prepaid](/billing/payment-modes/prepaid).

### DATE_TO_DATE billing

**DATE_TO_DATE** is **not** supported for OAOI consolidation.

Each service’s cycle is anchored to its **creation date**, so periods differ:

| Service | Billing cycle |
|---|---|
| Service A | 5th → 5th |
| Service B | 12th → 12th |

CMP must generate **separate** invoices. See [DATE_TO_DATE](/billing/billing-rules/date-to-date#postpaid-consolidated-invoicing-exception).

For consolidated monthly postpaid/manual billing, use rules such as [FIXED_PRORATA](/billing/billing-rules/fixed-prorata) or calendar-month rules instead.

### Custom billing dates

Services billed on **different billing days** cannot be grouped into a single monthly invoice.

---

## Long-term services (service contracts)

Services on longer cycles — **quarterly**, **semi-annual**, **yearly**, and similar — can still appear on the consolidated invoice when the **[service contract](/billing/billing-rules/date-to-date#service-contracts)** feature is used.

In that case:

* Total service cost is divided into **monthly** charges  
* Each monthly charge appears as a line on the consolidated invoice  

**Example:** Yearly VM plan **$1,200/year** → monthly invoice item **$100/month**.

Contracts apply to **quarterly and longer** cycles with **postpaid** or **manual** (not prepaid). See [Annually — service contracts](/billing/billing-cycles/annually#service-contracts).

---

## When the invoice is generated

Invoices are generated automatically on the **1st day of every month** and include billable items from the **previous** month.

| Invoice date | Billing period |
|---|---|
| 1 April | 1 March – 31 March |
| 1 May | 1 April – 30 April |

### New service mid-month

If a service is created during the billing period, it appears on the **next** monthly consolidated invoice.

| Service created | Appears on |
|---|---|
| 10 March | **1 April** invoice |

### Hourly usage

Hourly usage is aggregated during the month and included on the same monthly consolidated invoice.

### Line items

Customers still see **separate line items** per service or usage type on the single invoice — one document, full charge transparency.

### Extra invoices in the same month

Normally **one** invoice per account per month when OAOI is enabled. Additional invoices may still appear for:

* Manual billing adjustments  
* Credits or refunds  
* Administrative invoice generation  

### If OAOI is disabled

Invoices may be generated **per service** or **per billing event**, and customers may receive **multiple** invoices in a month.

---

## Frequently asked questions

### What is One Account One Invoice?

OAOI gives customers a **single consolidated invoice** for all eligible services under an account each monthly billing cycle, instead of one invoice per service or usage event.

### When is the invoice generated?

On the **1st** of every month, covering the **previous** month’s usage and renewals.

### What charges are included?

Typical line items include VM usage, storage, network services, hourly usage, monthly renewals, contract monthly portions, and other billable services on the account — combined into one invoice.

### Which account types support OAOI?

**Postpaid** and **Manual** only. **Prepaid** is not supported.

### Why not prepaid?

Prepaid deducts wallet / infra credits per service or usage event. That model does not support monthly consolidation the same way.

### Why not DATE_TO_DATE?

Creation-date cycles differ per service, so periods cannot share one calendar month invoice. See [DATE_TO_DATE exception](/billing/billing-rules/date-to-date#postpaid-consolidated-invoicing-exception).

### Can multiple services appear on the same invoice?

Yes — all eligible services on the account that follow monthly 1st–1st billing appear on the same consolidated invoice.

### Can yearly or quarterly services appear?

Yes, when **service contracts** divide the cost into monthly charges on the consolidated invoice.

### Can OAOI be enabled for existing customers?

Yes, for eligible postpaid/manual accounts when billing configuration meets the [requirements](#requirements).

### Who should use this feature?

Enterprise and multi-service accounts, and finance teams that prefer **one invoice per billing cycle**.

---

## Related

* [Billing Settings (admin)](/billing/billing-settings) — live `enable_one_account_one_invoice` value
* [Postpaid](/billing/payment-modes/postpaid)
* [Manual](/billing/payment-modes/manual)
* [DATE_TO_DATE](/billing/billing-rules/date-to-date)
* [FIXED_PRORATA](/billing/billing-rules/fixed-prorata)
* [Service contracts](/billing/billing-rules/date-to-date#service-contracts)
* [Billing Overview](/billing/overview)
* [Billing FAQs](/faq/platform/billing-pricing)
