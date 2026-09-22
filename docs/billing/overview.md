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
| **[Billing Settings (admin)](/billing/billing-settings)** | See `generate_prepaid_reciept`, enabled payment modes, billing rules | [Billing Settings](/billing/billing-settings) |
| **[One Account One Invoice](/billing/one-account-one-invoice)** | Consolidated monthly invoice for postpaid/manual (`enable_one_account_one_invoice`) | [OAOI](/billing/one-account-one-invoice) |
| **[Customer Billing Dashboard](/billing/customer-billing-dashboard/)** | End-customer Billing UI, Account Statement, Usage Details | [Customer Billing Dashboard](/billing/customer-billing-dashboard/) |
| **[Rate cards](/billing/rate-cards/)** | What packages exist and what do they cost? | [Rate Cards](/billing/rate-cards/) |
| **[Billing cycles](/billing/billing-cycles/)** | Hourly through tri-annually? | [Billing Cycles](/billing/billing-cycles/) |
| **[Payment modes](/billing/payment-modes/)** | Prepaid, postpaid, or manual payment? | [Payment Modes](/billing/payment-modes/) |
| **[Billing rules](/billing/billing-rules/)** | How charges are calculated (pro-rata, etc.)? | [Billing Rules](/billing/billing-rules/) |
| **[Invoice Settings](/billing/invoice-settings/)** | Branches, invoice branding, tax, invoice numbers, terms | [Invoice Settings](/billing/invoice-settings/) |
| **[Payment gateways](/billing/payment-gateways/)** | Which provider collects payments? | [Payment Gateways](/billing/payment-gateways/) |
| **[Stoppable services](/billing/stoppable-services)** | Do compute charges pause when a VM/K8s is stopped? | [Stoppable Services](/billing/stoppable-services) |
| **[Low infra credit notifications](/billing/low-infra-credit-notifications)** | Prepaid wallet below threshold alerts? | [Low Infra Credit Notifications](/billing/low-infra-credit-notifications) |
| **[Free trials](/billing/free-trials)** | Offer VMs / volumes / licenses at no cost for a limited period? | [Free Trials](/billing/free-trials) |
| **[Auto Pay](/platform-features/auto-pay)** | Prepaid auto top-up from saved payment method? | [Auto Pay](/platform-features/auto-pay) |
| **[Disciplinary actions](/billing/disciplinary-actions/)** | Freeze, suspend, terminate for overdue / negative balance | [Disciplinary Actions](/billing/disciplinary-actions/) |

:::tip[Quick start — new provider setup]

1. Create [rate cards](/billing/rate-cards/) and configure all package prices with billing cycles
2. Set global rules — bandwidth threshold, backup billing, and other settings in [Billing Rules](/billing/billing-rules/) (note: `plan_ip_billing` is **deprecated**; charge IPs separately — see [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address))
3. Configure **Payment Mode Settings** with StackConsole — decide which modes are available per account type **before go-live** — see [Payment Mode Settings](/billing/payment-modes/#payment-mode-settings-platform-wide)
4. Configure [payment gateways](/billing/payment-gateways/) and currency top-up amounts in **Settings → Billing Setup**
5. Onboard test customer → provision VM hourly and monthly → verify wallet or invoice behaviour
6. Review [Billing FAQs](/faq/platform/billing-pricing) for common customer questions

:::

## The Four Core Billing Dimensions

To quickly understand how CMP calculates and collects charges without getting lost in technical settings, think of billing as **four independent dimensions** working together:

| Dimension | Core question | What it controls | Examples |
|---|---|---|---|
| **1. [Billing Cycle](/billing/billing-cycles/)** | *"For what duration?"* | The length of the billable period | Hourly (PAYG), Monthly, Quarterly, Yearly, Multi-Year |
| **2. [Billing Mode](/billing/payment-modes/)** | *"When do we charge?"* | Charging in advance vs. in arrears | **Prepaid** (before service) vs. **Postpaid** (after service) |
| **3. Collection Trigger** | *"How is payment collected?"* | Mechanism that executes the charge | Wallet deduction, automated card charge, [Manual](/billing/payment-modes/manual), [Threshold](/billing/threshold) |
| **4. [Billing Rule](/billing/billing-rules/)** | *"How is amount calculated?"* | Calendar alignment and partial-period math | `PRO_RATA`, `DATE_TO_DATE`, `CALENDAR_MONTH` |

:::info[Key Concept: Dimensions are Independent]

**A billing cycle is NOT locked to a single payment mode.**
While Yearly cycles are commonly paired with **Prepaid** (to collect the full period upfront), CMP supports both **Prepaid** and **Postpaid** across billing cycles.
* **Billing Mode** controls **when** the customer is charged (timing).
* **Billing Rule** controls **how** the date boundaries and prorations are calculated.
* Changing the payment mode does **not** alter the base catalogue price from the **[Rate Card](/billing/rate-cards/)**.

:::

### 1. Billing Cycle (The Service Period)
Defines the duration for which pricing is quoted and calculated:
* **Hourly (Pay as you go)**: Charged strictly for the actual hours a service runs.
* **Monthly**: Standard fixed recurring monthly commitment.
* **Quarterly / Yearly / Multi-Year**: Extended commitments (3, 6, 12, 24, or 36 months).

### 2. Billing Mode (Advance vs. Arrears)
Defines when the customer's financial obligation is realized:
* **Prepaid**: Charged **at the beginning** of the period. For Monthly, the month is paid upfront. For Yearly, the full annual charge is collected before usage begins.
* **Postpaid**: Invoiced **after** the consumption period has completed (or at scheduled billing intervals).

### 3. Collection Method / Trigger (How Payment Occurs)
Determines how the payable amount is collected or what event triggers invoicing:
* **Prepaid Wallet (Infra Credits)**: Balance deducted in real time (for hourly) or at cycle renewal.
* **Postpaid Card Auto-Charge**: Automated charge against a saved credit card (e.g., Stripe) at invoice generation.
* **Manual Payment**: Offline settlement (bank wire, check, PO). Admin verifies receipt and manually marks invoices as paid.
* **Threshold Invoicing**: Triggers an interim invoice automatically as soon as accrued unbilled usage hits a defined spending cap (e.g., $500), rather than waiting for period-end.

### 4. Billing Rule (Calculation & Alignment)
Determines how the billing engine calculates charges when a service starts mid-period or follows specific date boundaries:
* **`PRO_RATA`**: Calculates exact daily usage for the partial start month, aligning all subsequent renewals to calendar boundaries (1st of the month).
* **`DATE_TO_DATE`**: Follows the customer's exact creation date anniversary (e.g., 15 Jan → 14 Feb). Required for [Service Contracts](/billing/service-contracts/).
* **`CALENDAR_MONTH`**: Strictly aligns billing windows to full calendar months.

---

### How the Dimensions Work Together (Examples)

Because these four dimensions are decoupled, providers can configure flexible combinations to meet diverse customer needs:

| Billing Cycle | Billing Mode | Billing Rule | Real-World Workflow |
|---|---|---|---|
| **Monthly** | Prepaid | `PRO_RATA` | Customer pays remaining days of first month upfront, then full monthly price on the 1st. |
| **Monthly** | Postpaid | `PRO_RATA` | Customer uses VM throughout the month; billed on the 1st of the following month for actual usage. |
| **Monthly** | Postpaid | `DATE_TO_DATE` | Customer is invoiced on each monthly anniversary of their creation date (e.g., 18th to 17th). |
| **Yearly** | Prepaid | `DATE_TO_DATE` | Upfront annual plan: full 12-month rate card price deducted from wallet/card at deployment. |
| **Yearly** | Postpaid | `DATE_TO_DATE` | Postpaid annual plan: customer invoiced after the 12-month period (or tracked via threshold caps). |
| **Yearly** | Postpaid / Prepaid | **`DATE_TO_DATE` (Contract)** | **[Service Contract](/billing/service-contracts/)**: 12-month commitment lock-in, but billed in **predictable monthly installments** (`Yearly ÷ 12` minus discount) rather than charging the entire year upfront. |

:::tip[Long Commitments Without Cash Flow Delays: Service Contracts]

Under standard billing, a Yearly cycle on Postpaid would mean waiting up to 12 months for payment. Enabling **[Service Contracts](/billing/service-contracts/)** solves this: it secures a binding 12-month legal commitment with deletion blocks and renewal deadlines, while billing the customer in **manageable monthly installments**.

:::

## Payment modes (summary)

| Mode | Payment model |
|---|---|
| **Prepaid** | Customer tops up wallet; usage deducted in real time. [Low infra credit notifications](/billing/low-infra-credit-notifications) alert when balance falls below a threshold. |
| **Postpaid** | Usage tracked; invoiced at cycle end; card can auto-charge |
| **Manual** | Customer pays offline; admin verifies and marks invoices paid |

See [Payment Modes](/billing/payment-modes/).

## Billing cycles (summary)

| Cycle | Duration | Invoice timing |
|---|---|---|
| [Hourly](/billing/billing-cycles/hourly) | Per hour | End of month (consolidated) |
| [Monthly](/billing/billing-cycles/monthly) | 1 month | On service creation |
| [Quarterly](/billing/billing-cycles/quarterly) | 3 months | On service creation |
| [Semi-annually](/billing/billing-cycles/semi-annually) | 6 months | On service creation |
| [Annually](/billing/billing-cycles/annually) | 12 months | On service creation |
| [Bi-annually](/billing/billing-cycles/bi-annually) | 24 months | On service creation |
| [Tri-annually](/billing/billing-cycles/tri-annually) | 36 months | On service creation |

**Always hourly:** `VM_SNAPSHOT`, `BS_SNAPSHOT`, `BACKUP`, `BS_BACKUP`, `BANDWIDTH`, `ACCOUNT_TEMPLATE`, `ISO`

See [Billing Cycles](/billing/billing-cycles/).

## Key billing rules (summary)

| Rule | Setting |
|---|---|
| IP charged separately from VM (**recommended**) | Default / deprecated `plan_ip_billing = true` — bill via [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address); do not rely on bundling IPs into the VM package |
| Free bandwidth allowance | Cloud Provider Setup → Free Bandwidth Threshold |
| Custom package minimum price | Unit pricing ≥ predefined package |
| Coupon discount duration | First billing cycle only |
| Tax exempt (testing) | Customer → Billing Setup → Is Tax Exempted? |

See [Billing Rules](/billing/billing-rules/).

## Pricing formulas

CMP derives hourly and yearly prices from monthly using `30.5 × 24 = 732` hours per month.

See [Pricing Formulas](/billing/rate-cards/pricing-formulas).

## Documentation in this section

* [Billing Settings (admin)](/billing/billing-settings) — Invoices → Billing Settings; prepaid receipt flag, modes, rules
* [One Account One Invoice (OAOI)](/billing/one-account-one-invoice) — consolidated monthly invoice for postpaid/manual
* [Customer Billing Dashboard](/billing/customer-billing-dashboard/) — end-customer Billing tabs
  * [Account Statement](/billing/customer-billing-dashboard/account-statement/)
  * [Usage Details](/billing/customer-billing-dashboard/account-statement/usage-details) — prepaid Model 1 vs Model 2 vs postpaid/manual
* [Stoppable Services](/billing/stoppable-services) — `enable_stoppable_service_billing` (compute pause vs storage continues)
* [Free Trials](/billing/free-trials) — global + package settings, expiry, reminders, deletion, examples
* [Disciplinary Actions](/billing/disciplinary-actions/) — freeze, suspend, terminate
* [Payment Modes](/billing/payment-modes/) — overview and comparison of all three modes
  * [Prepaid](/billing/payment-modes/prepaid)
  * [Postpaid](/billing/payment-modes/postpaid)
  * [Manual](/billing/payment-modes/manual)
* [Billing Cycles](/billing/billing-cycles/) — hourly through tri-annually
  * [Hourly](/billing/billing-cycles/hourly)
  * [Monthly](/billing/billing-cycles/monthly)
  * [Quarterly](/billing/billing-cycles/quarterly)
  * [Semi-annually](/billing/billing-cycles/semi-annually)
  * [Annually](/billing/billing-cycles/annually)
  * [Bi-annually](/billing/billing-cycles/bi-annually)
  * [Tri-annually](/billing/billing-cycles/tri-annually)
* [Billing Rules](/billing/billing-rules/) — calculation rules and platform policies
  * [FIXED_PRORATA](/billing/billing-rules/fixed-prorata)
  * [UNFIXED_PRORATA](/billing/billing-rules/unfixed-prorata)
  * [DATE_TO_DATE](/billing/billing-rules/date-to-date)
  * [FIXED_CALENDAR_MONTH](/billing/billing-rules/fixed-calendar-month)
  * [UNFIXED_CALENDAR_MONTH](/billing/billing-rules/unfixed-calendar-month)
* [Service Contracts](/billing/service-contracts/) — term commitments, monthly installments, cancellation deadline
  * [Preparing for Contract Billing](/billing/service-contracts/preparing-for-contract-billing)
  * [Calculations & Lifecycle](/billing/service-contracts/calculations-and-lifecycle)
* [Payment Gateways](/billing/payment-gateways/) — Stripe, AsiaPay, HyperPay, Authorize.net, M-Pesa, PayPal, Razorpay, Mollie, Dinger, Cardlink, Paytm, Payduniya, SSLCommerz
  * [New Payment Gateway Requirements](/billing/payment-gateways/new-gateway-requirements) — checklist when requesting a new integration (prepaid vs postpaid)
  * [Stripe](/billing/payment-gateways/stripe)
  * [AsiaPay](/billing/payment-gateways/asiapay)
  * [HyperPay](/billing/payment-gateways/hyperpay)
  * [Authorize.net](/billing/payment-gateways/authorize-net)
  * [M-Pesa](/billing/payment-gateways/m-pesa)
  * [PayPal](/billing/payment-gateways/paypal)
  * [Razorpay](/billing/payment-gateways/razorpay)
  * [Mollie](/billing/payment-gateways/mollie)
  * [Dinger](/billing/payment-gateways/dinger)
  * [Cardlink](/billing/payment-gateways/cardlink)
  * [Paytm](/billing/payment-gateways/paytm)
  * [Payduniya](/billing/payment-gateways/payduniya)
  * [SSLCommerz](/billing/payment-gateways/sslcommerz)

## Related

* [Billing Settings (admin)](/billing/billing-settings)
* [Customer Billing Dashboard](/billing/customer-billing-dashboard/)
* [Rate Cards](/billing/rate-cards/)
* [Low Infra Credit Notifications](/billing/low-infra-credit-notifications)
* [Billing FAQs](/faq/platform/billing-pricing)
