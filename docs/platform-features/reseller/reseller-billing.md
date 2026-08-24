---
sidebar_position: 3
title: "Reseller billing"
tags: ["platform", "reseller", "billing", "prepaid", "postpaid", "manual", "limitations"]
---

# Reseller billing

This page covers **provider (super admin) → reseller** billing and **reseller → reseller’s customer** billing, plus **vendor billing** notes and **current limitations**.

For the partner model comparison, see [Reseller vs Vendor](/platform-features/reseller/reseller-vs-vendor).

:::warning[Current limitations — not bugs]

Features listed under [Current limitations](#current-limitations-known-gaps) are **known gaps** or **under review / QA**. They will be addressed in future releases. Do **not** report them as bugs unless live behaviour differs from this page.

:::

---

## Two billing layers

| Layer | Who is billed | What drives the charge |
|---|---|---|
| **Provider → Reseller** | Reseller | Aggregated usage of the reseller’s customers, at **provider → reseller** pricing |
| **Reseller → Customer** | End customer | Services the customer consumes, at **reseller** pricing / payment mode |

```text
End customer creates VM (any cycle / mode)
        │
        ├─► Reseller → Customer: bill per reseller rules (prepaid / postpaid / manual)
        │
        └─► Provider → Reseller: usage rolled up (typically hourly) → bill reseller
```

---

## Onboarding and commercial setup

* Admin onboards the reseller and assigns a rate card (or creates a **reseller-specific** rate card).
* Currency assigned at onboarding is the currency the reseller uses for customers.
* Global billing cycles enabled by the super admin apply to the reseller. The reseller **cannot add or remove** cycles.
* Reseller **cannot create** their own plans; they can **change** existing plans assigned by the super admin (prices / margin).
* After the rate card is assigned, the reseller can update prices or add margin (**fixed amount** or **percentage**) from the reseller admin dashboard.

---

## Payment modes

CMP supports **PREPAID**, **POSTPAID**, and **MANUAL**.

### Provider → reseller

The super admin chooses the reseller’s payment mode from modes enabled for reseller accounts (see [Payment Mode Settings](/billing/payment-modes/#payment-mode-settings-platform-wide)).

**Example:** If the super admin has PREPAID and POSTPAID enabled for resellers, the reseller is onboarded on one of those modes.

### Reseller → customer

Modes available to the reseller’s customers follow what is enabled on the **provider → reseller** path for that relationship.

**Example:** If PREPAID and POSTPAID are enabled for reseller billing, reseller customers can use PREPAID and POSTPAID. **MANUAL** is not available in that example unless enabled for that path.

---

## Provider → reseller billing cycles

Stack Console supports hourly, monthly, quarterly, semi-annual, and yearly cycles for end services — but **provider → reseller** charging for compute-style services is **strictly hourly usage** (unless a global flag forces a narrower rule — see [`force_reseller_hourly_billing`](#force_reseller_hourly_billing)).

### How hourly provider billing works when the customer buys yearly

1. Reseller’s customer creates a service on the **15th** with a **yearly** cycle.  
2. **Reseller → customer:** reseller can charge the customer **yearly** and collect that bill.  
3. **Provider → reseller:** CMP still calculates the reseller’s liability on an **hourly** basis from the 15th to month end, then full months, while the service remains active — **regardless** of the customer’s cycle.

**How yearly sale maps to hourly cost to the reseller:** hourly rate is derived from the **billing-cycle price** of that service (for example yearly package price → hourly via the normal cycle formulas — see [Pricing formulas](/billing/rate-cards/pricing-formulas)).

### Invoice timing (provider → reseller)

* An invoice to the reseller is generated at the **end of each month** (payment-mode specifics below).  
* **Prepaid reseller:** must maintain wallet balance; infra credit is deducted as usage accrues; invoice still generated at month end for services (depending on prepaid receipt model — see [Prepaid](/billing/payment-modes/prepaid)).

### Add-ons and licenses

If a reseller’s customer purchases an **add-on** or **license**, the reseller is also billed for that item using the **billing cycle selected for that add-on/license** (not necessarily hourly).

**Example:** Compute may be hourly provider → reseller; an add-on bought **monthly** generates a **monthly** charge to the reseller for that add-on.

### Free trial (provider → reseller)

* **Free trial is not supported** for provider → reseller charging.  
* Resellers may offer free trials to **their** customers, but the **reseller is still charged** by the super admin for that usage.

---

## `force_reseller_hourly_billing`

| Setting | Behaviour |
|---|---|
| **`force_reseller_hourly_billing` = `true`** | Resellers are billed with **only hourly** invoices for services, **except Licenses and Add-ons** (add-ons also depend on **`enable_hourly_addons`**) |

Confirm live flags under [Billing Settings (admin)](/billing/billing-settings) / Global Settings when available.

---

## Provider → reseller by payment mode

### Prepaid (admin → reseller)

* Billing to the reseller is **hourly** for applicable services.  
* Reseller must keep **sufficient funds**.  
* When reseller customers create paid services (any customer cycle / mode), usage is calculated **hourly for the reseller** as it accrues.  
* **Invoices:**  
  * Against **infra credit top-up** (actual fund transfer): invoice can generate **immediately**.  
  * Against **services**: invoice typically on the **1st of the next month** (per prepaid model / platform settings).  
* **Quota:** Admin can assign quota to the reseller. If reseller quota is exceeded, **customers cannot create resources** even if customer quota remains.  
* **Disciplinary / insufficient funds:** If the reseller has insufficient funds, customers cannot create services. Message example: *You can not create services at the moment. Please contact the administrator.*  
* **Taxation:** Super admin tax by branch/country; provider → reseller tax per reseller country; super admin can mark a reseller **tax exempt**.

:::note[Super admin → reseller disciplinary]

**Super admin → reseller disciplinary actions** are **under review and not available for now**. See [Current limitations](#current-limitations-known-gaps).

:::

### Postpaid (admin → reseller)

* Billing is **hourly** for applicable services.  
* **Threshold** is required when creating a postpaid reseller (or set from reseller overview). Default may come from **currency-level** global threshold; if that default is zero, global currency threshold applies.  
* When threshold is reached, the user **cannot create** further services (per threshold rules).  
* Customer-driven usage still accrues **hourly to the reseller**.  
* **Invoice:** for hourly services when usage reaches the threshold; postpaid invoices are processed **automatically**.  
* **Payment method:** credit card required for postpaid reseller settlement.

### Manual (admin → reseller)

* Behaves like postpaid for accrual patterns.  
* Invoices are **not** processed automatically — pay / mark paid **manually**.

---

## Reseller → customer billing

* Reseller can sell with **PREPAID**, **POSTPAID**, and/or **MANUAL** as enabled for that path.  
* Global billing cycles set by the super admin apply to reseller customers.  
* Global billing rules set by the super admin apply — **reseller-specific billing rules are not available**.  
* Invoices follow normal prepaid / postpaid / manual rules (like a regular system).  
* **Quota:** Reseller assigns customer quota; customers can request increases via quota request when exceeded.  
* **Disciplinary (customer):** Insufficient funds block creates and renewals. Triggers include **low / negative balance** and **unpaid invoice** (from due date), using disciplinary freeze timing — see [Disciplinary Actions](/billing/disciplinary-actions/).  
* **Taxation:** Reseller can configure tax by branch/country for customers; can exempt a specific customer.

---

## Vendor billing (summary)

Full comparison: [Reseller vs Vendor](/platform-features/reseller/reseller-vs-vendor).

### Vendor → customer — no billing

* No direct billing to the vendor’s customer.  
* Customer account has no taxable invoices / invoice numbers; usage may be tracked internally.  
* Creates validate against the **vendor** balance.  
* Vendor onboards customers (**no self-registration** for vendor customers).  
* Customer payment mode is **compulsory Manual** (avoids customer invoices and disciplinary on that account).  
* If the vendor is prepaid, infra credits are checked on the **vendor**, not the customer.

### Super admin → vendor

* Vendor manages customer accounts; **cannot create services directly**.  
* System aggregates all customer usage and charges the vendor in a **single monthly invoice**.  
* Invoice on the **1st** covering the previous month (example: May usage → invoice **1 June**).  
* **No threshold** invoices for vendors (month-end only).  
* Vendors are subject to the same style of **disciplinary actions** as regular customers for non-payment.

### Vendor customer services — month-end rollup example

Vendor’s customers may create a monthly VM, hourly snapshot, and semi-annual LB. Usage for each follows its billing rules; at month end all are **summed** into the vendor’s bill.

---

## Billing rules reference (partner / long cycles)

Provider and partner invoicing for quarterly / semi-annual / yearly services follows the same rule families as the platform. Examples:

| Rule | Yearly example (created 25 Apr 2025) |
|---|---|
| **UNFIXED_PRORATA** | Pro-rata 25 Apr–30 Apr; next 1 May–30 Apr 2026 |
| **FIXED_PRORATA** | Pro-rata 25 Apr–30 Apr; next 1 May–31 Dec 2025 |
| **DATE_TO_DATE** | 25 Apr 2025–24 Apr 2026 (−1 day) |
| **FIXED_CALENDAR_MONTH** | 1 Apr 2025–31 Dec 2025 |
| **UNFIXED_CALENDAR_MONTH** | Pro-rata calendar month then 1 May–30 Apr 2026 |

Full detail: [Billing Rules](/billing/billing-rules/).

**Quarterly UNFIXED_PRORATA example:** created 25 Feb → pro-rata to end of Feb; next unfixed period 1 Mar–30 May (three months from the 1st after creation month — not tied to calendar quarter labels alone).

**Quarterly FIXED_PRORATA example:** created 25 Feb → pro-rata to end of Feb; next to **end of current fixed quarter** (for example 1 Mar–30 Mar when quarters are Jan–Mar, Apr–Jun, …).

---

## Current limitations (known gaps)

These are **expected current product limits**. Resolve confusion by pointing partners here; track delivery in future releases.

| Limitation | Status / note |
|---|---|
| **Super admin → reseller disciplinary** | Under review — **not available** now |
| **Add-ons and Store for resellers** | Under **QA** — do not treat incomplete Store/Add-on reseller flows as production-complete |
| **Products (Store catalogue) for resellers** | **Not supported** yet — future update |
| **Reseller-specific billing rules** | **Not available** — only global rules apply to reseller customers |
| **Reseller cannot create own plans** | By design — only change assigned plans / pricing |
| **Vendor cannot change package prices** | By design |
| **Vendor customers: no invoices** | By design — Manual mode compulsory |
| **Vendor customer self-registration** | **Not possible** — vendor must onboard |
| **Free trial provider → reseller** | **Not supported** — customer free trial still charges the reseller |
| **Provider → reseller billing** | **Hourly** rollup (even if customer bought yearly/monthly) |
| **White-label domain** | Reseller must prepare and configure their own whitelisted domain after onboarding |

:::info[Future improvements]

Limitations above are planned to be reduced over time (disciplinary for resellers, Store/Products for resellers, and related partner features). Until then, configure commercial expectations with partners using this page.

:::

---

## Related

* [Reseller overview](/platform-features/reseller/)
* [Reseller vs Vendor](/platform-features/reseller/reseller-vs-vendor)
* [Payment Modes](/billing/payment-modes/)
* [Prepaid](/billing/payment-modes/prepaid) · [Postpaid](/billing/payment-modes/postpaid) · [Manual](/billing/payment-modes/manual)
* [Rate Cards](/billing/rate-cards/)
* [Billing Rules](/billing/billing-rules/)
* [Pricing formulas](/billing/rate-cards/pricing-formulas)
* [Disciplinary Actions](/billing/disciplinary-actions/)
* [Quota](/quota/global-quotas)
* [Billing Settings (admin)](/billing/billing-settings)
