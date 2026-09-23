---
sidebar_position: 2
title: "Billing & pricing"
tags: ["faq", "platform", "billing", "payg", "snapshots"]
---

# Billing & pricing

Platform Q&A for pay-as-you-go, invoices, pricing formulas, snapshot charges, and tax. Full product guides: [Billing overview](/billing/overview), [Pricing formulas](/billing/rate-cards/pricing-formulas).

## What is “pay-as-you-go” billing?

Pay-as-you-go means customers are charged only for the time a service is actually running. When the service is stopped (for [stoppable services](/billing/stoppable-services)) or deleted, charging for that metered capacity stops from that moment.

In CMP, pay-as-you-go maps to the **Hourly** billing cycle.

## Does the platform support a Pay-As-You-Go pricing model?

Yes. With **Hourly** billing:

* Usage is measured from service **creation** until **deletion** (and respects [stoppable-service](/billing/stoppable-services) rules where enabled)
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

What lines appear on **Usage Details** depends on payment mode and (for prepaid) **`generate_prepaid_reciept`**. Full behaviour and examples for providers: [Usage Details](/billing/customer-billing-dashboard/account-statement/usage-details).

## Where can I see portal billing settings (generate prepaid receipt, payment modes, billing rules)?

Open the admin **Billing Settings** summary:

**Path:** **Billing → Invoices → Billing Settings**

The modal has three sections:

1. **Billing Mode** — enabled payment modes, supported cycles, and billing rules  
2. **Enabled Global Settings** — flags such as `generate_prepaid_receipt` / `generate_prepaid_reciept`, threshold invoice, stoppable services, one-account-one-invoice, IP billing, and more  
3. **Environment Flags** — advance invoice flags (`PREPAID_*` / `POSTPAID_*` / `MANUAL_*`), `ENABLE_BILLING_CYCLE_USAGE`, unsigned invoice feature, and similar  

Full flag tables and topic links: [Billing Settings (admin)](/billing/billing-settings).

| What you need | Topic guide |
|---|---|
| Open the admin summary (all flags) | [Billing Settings (admin)](/billing/billing-settings) |
| Prepaid Model 1 vs Model 2 | [Prepaid billing models](/billing/payment-modes/prepaid#prepaid-billing-models--end-to-end-workflow) |
| Which modes are enabled for Customer / Admin / … | [Payment Mode Settings](/billing/payment-modes/#payment-mode-settings-platform-wide) |
| Billing rules (prorata, calendar, date-to-date, …) | [Billing Rules](/billing/billing-rules/) |
| Advance invoice flags (postpaid / manual / prepaid) | [Postpaid](/billing/payment-modes/postpaid) · [Manual](/billing/payment-modes/manual) · [Monthly](/billing/billing-cycles/monthly) |
| Threshold invoices | [Postpaid — Threshold](/billing/payment-modes/postpaid#threshold-spending-cap) |
| Stoppable services | [Stoppable Services](/billing/stoppable-services) |
| One account one invoice (OAOI) | **[One Account One Invoice](/billing/one-account-one-invoice)** · flag in [Billing Settings](/billing/billing-settings) |
| How Usage Details changes with these settings | [Usage Details](/billing/customer-billing-dashboard/account-statement/usage-details) |
| Customer Billing UI | [Customer Billing Dashboard](/billing/customer-billing-dashboard/) |
| Rate cards & cycles | [Rate Cards](/billing/rate-cards/) · [Billing Cycles](/billing/billing-cycles/) |
| Gateways & currencies | [Payment Gateways](/billing/payment-gateways/) |
| Invoice branding / branches / tax | [Invoice Settings](/billing/invoice-settings/) |

## What is One Account One Invoice (OAOI)?

**One Account One Invoice** consolidates all eligible charges for a **postpaid** or **manual** account into **one invoice on the 1st of each month** (previous month’s usage and renewals).

It does **not** support prepaid accounts or **DATE_TO_DATE** billing. Advance billing must be disabled, and `enable_one_account_one_invoice` must be `true`.

Full guide (requirements, unsupported cases, contracts, FAQ): [One Account One Invoice](/billing/one-account-one-invoice). Check the live flag under [Billing Settings](/billing/billing-settings).

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

See [Pricing formulas](/billing/rate-cards/pricing-formulas) for the full reference.

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

## What will happen if an admin creates a custom unpaid invoice in a postpaid account? Will it auto-charge the credit card immediately?

:::note[Distinction: Custom Invoices vs. Manual Payment Mode]
* **Manual Payment Mode** is an account settlement method where all cloud usage invoices are settled offline (e.g. via bank transfer or cheque).
* **Admin-Generated Custom Invoices** are ad-hoc billing documents created manually by an administrator for non-catalogue items (e.g. consulting or migration), and can be issued to **any** account type (Prepaid, Postpaid, or Manual).
:::

**No.** If an administrator creates a custom unpaid invoice in a postpaid account, CMP will **not** auto-charge the customer’s saved credit card.

Admin-generated custom invoices are not processed automatically by recurring auto-charge jobs. It is the administrator’s responsibility to mark such invoices as paid (once payment is confirmed), or the customer can log in to the portal and pay them manually. See the full guide: [Create Custom Invoice](/billing/invoice-settings/create-custom-invoice).

## How can I add discounts against an account, and how can customers use them against invoices?

Discounts (such as promotional coupon codes) can **only be applied at the time of service creation** to reduce the service cost upfront.

Customers **cannot apply discounts to invoices once they are generated**. For existing invoices, customers and admins can only use **Free Credits** to reduce or settle the invoice amount.

## How can I add free credit to the user account, and how does it get used against invoices?

Administrators can grant free credits to a customer's account (via coupons or promotional credits in **Billing → Coupons** or account credit allocations).

* **Against existing invoices:** When viewing an unpaid invoice in the portal, available free credit can be redeemed by the customer to partially or fully offset the payable amount.
* **On dispute resolution:** If a customer disputes a fixed-cycle charge (such as an early-deleted VM), admins can grant free credits to compensate the customer without having to cancel the generated invoice.
* **On manual accounts:** Free credit is not always auto-applied; the customer or administrator must select or apply the credit when settling the invoice.

## How are invoices partially paid?

Invoices support partial payment settlement:

* **Online via Customer Portal:** If partial payments are enabled for the gateway/account, customers can submit payments towards an invoice balance.
* **Offline / Manual Mode:** When a customer pays an amount less than the invoice total (for example, paying ₹4,000 against a ₹5,000 invoice), the admin records the transaction by marking the invoice paid up to the received amount (₹4,000), leaving the remaining balance (₹1,000) as unpaid/due.

## Is there any automation for manual mode invoices paid?

**No.** As of now, it is the administrator's responsibility to confirm with their accounts/finance team whether the offline payment (bank wire, UPI, cheque) has been received. Once confirmed, the admin manually marks the invoice as paid (in full or partially) in CMP. CMP does not automatically track or reconcile offline bank transfers.

## How does the invoice edit work?

Once generated, system-created invoices represent official billing and tax records. Changes to line items, tax components, or amounts should generally be addressed through credit adjustments, free credits, or manual invoice revisions as permitted by local tax and accounting regulations. Natively generated metering line items cannot be arbitrarily overwritten without affecting audit trails.

## Does CMP retry a failed or timed-out payment or balance_modify call?

**It depends on the payment mode and whether the transaction is interactive or automated:**

* **Prepaid (Wallet Top-Ups):** Handled directly by the customer in their browser session. If a transaction fails (e.g. card declined or 3DS verification failed), the failure is displayed immediately. CMP does **not** perform background retries.

* **Postpaid (Saved Card Auto-Charge):** When CMP attempts to auto-charge a customer's saved card for an invoice and the charge fails (insufficient funds, expired card, gateway timeout):
  * **Retry frequency:** CMP retries **once per day** (every 24 hours via automated daily cron).
  * **Attempt limit:** Controlled by the global setting **`invoice_no_of_attempts`** (typically 3 attempts).
  * **Frozen invoice:** Once all retry attempts are exhausted, the invoice status changes to **Frozen**, automated attempts stop, and admin/customer alert emails are sent.

See [Postpaid Auto-Charge Failure Workflow](/billing/payment-modes/postpaid#auto-charge-failure-workflow) and [Billing Overview — Failed Transactions & Retry Policies](/billing/overview#failed-transactions--retry-policies-prepaid-vs-postpaid).

