---
sidebar_position: 2
title: "Billing Settings (admin)"
tags: ["billing", "admin", "settings", "prepaid", "payment-modes", "billing-rules", "global-settings"]
---

# Billing Settings (admin)

Admins can open a **live summary** of portal billing configuration from the **Billing Settings** control on the admin Invoices page. The modal has three sections: **Billing Mode**, **Enabled Global Settings**, and **Environment Flags**.

Use this when a provider asks: *“Is generate prepaid receipt true or false?”*, *“Which payment modes are enabled?”*, *“What billing rules apply?”*, or *“Which advance invoice flags are on?”*

**Admin path:** **Billing → Invoices → Billing Settings**

![Screenshot: Admin Invoices — Billing Settings button](/img/screenshots/cmp-admin-billing-settings-button.png)

![Screenshot: Billing Settings modal — Billing Mode, Global Settings, Environment Flags](/img/screenshots/cmp-admin-billing-settings-modal.png)

:::tip[Handy for support]

Open **Billing Settings** first to see values on **this** portal, then use the topic links below for behaviour and change procedures. This modal is primarily a **read-only overview**; most flags are changed in **Global Settings**, **Payment Mode Settings**, or with StackConsole support.

:::

---

## 1. Billing Mode

Lists each **enabled payment mode**, the **billing cycles** it supports, and the **billing rules** applied (often per service type such as Virtual Machine).

| Column | Meaning |
|---|---|
| **Name** | Mode identifier and display name (for example `PREPAID`, `MANUAL`, `POSTPAID`) |
| **Billing Cycles** | Cycles available for that mode (for example Yearly, Monthly, Hourly) |
| **Billing Rule** | Rules such as **FIXED PRO RATA** (mandatory for Hourly) and **DATE TO DATE** for yearly/monthly VM contracts |

**Example from a portal:**

| Mode | Cycles | Rule notes |
|---|---|---|
| **PREPAID** | Yearly, Monthly, Hourly | FIXED PRO RATA mandatory for Hourly; DATE TO DATE (yearly, monthly) for Virtual Machines |
| **MANUAL** | Yearly, Monthly, Hourly | DATE TO DATE (yearly); FIXED PRO RATA (monthly) for Virtual Machines |

| Topic | Docs |
|---|---|
| Enable / disable modes per account type | [Payment Mode Settings](/billing/payment-modes/#payment-mode-settings-platform-wide) |
| Prepaid / Postpaid / Manual behaviour | [Payment Modes](/billing/payment-modes/) · [Prepaid](/billing/payment-modes/prepaid) · [Postpaid](/billing/payment-modes/postpaid) · [Manual](/billing/payment-modes/manual) |
| Cycles | [Billing Cycles](/billing/billing-cycles/) · [Hourly](/billing/billing-cycles/hourly) · [Monthly](/billing/billing-cycles/monthly) |
| Rules | [Billing Rules](/billing/billing-rules/) · [FIXED_PRORATA](/billing/billing-rules/fixed-prorata) · [DATE_TO_DATE](/billing/billing-rules/date-to-date) |

---

## 2. Enabled Global Settings

Platform **Global Settings** (Billing category and related) that drive invoicing and customer behaviour. Values shown are the **live** values for this deployment.

:::note[Flag spelling]

In Global Settings the prepaid receipt flag is often stored as **`generate_prepaid_reciept`** (product spelling). The Billing Settings modal may display it as **`generate_prepaid_receipt`**. They refer to the same setting.

:::

| Flag | Typical meaning | Docs |
|---|---|---|
| **`generate_prepaid_receipt`** / **`generate_prepaid_reciept`** | Prepaid: `true` = invoices for **services** (Model 2); `false` = invoices for **infra credit** top-ups (Model 1) | [Prepaid billing models](/billing/payment-modes/prepaid#prepaid-billing-models--end-to-end-workflow) · [Usage Details](/billing/customer-billing-dashboard/account-statement/usage-details) |
| **`enable_one_account_one_invoice`** | When `true`, one consolidated invoice per account on the **1st of every month** (where supported) | **[One Account One Invoice (OAOI)](/billing/one-account-one-invoice)** · [DATE_TO_DATE exception](/billing/billing-rules/date-to-date#postpaid-consolidated-invoicing-exception) |
| **`generate_threshold_invoice`** | When `true`, generate an invoice when the customer reaches the usage **threshold** | [Postpaid — Threshold](/billing/payment-modes/postpaid#threshold-spending-cap) · [Manual — Threshold](/billing/payment-modes/manual#threshold-limit-spending-cap) |
| **`prepaid_advance_invoice_generation`** | Days before due date to generate prepaid invoices (when used) | [Prepaid](/billing/payment-modes/prepaid) · Environment flags below for advance pro-rata / renewal |
| **`enable_stoppable_service_billing`** | When `true`, hourly VMs / Kubernetes are **not** charged for compute while **stopped** (storage still bills) | [Stoppable Services](/billing/stoppable-services) |
| **`auto_send_customer_invoice_email`** | When `true`, email the customer when a payable invoice is generated | [Invoice Settings](/billing/invoice-settings/) · [Multi-language — email templates](/platform-features/multi-language#email-template-translations) |
| **`plan_ip_billing`** | When `true`, public IP at VM create is billed separately from the VM package | [IP Address packages](/orchestrators/cloudstack/offering-sync-and-packages/ip-address) · [Billing Overview](/billing/overview#key-billing-rules-summary) |
| **Service trial / free trial related flags** | Control whether free trials are allowed platform-wide (`enable_service_trial`, reminder and delete-day settings) | **[Free Trials](/billing/free-trials)** · Package **Enable Free Trial** · [Account Statement — Free Trials](/billing/customer-billing-dashboard/account-statement/) |
| **Contract-related flags** | Enable service contract billing (quarterly+ with DATE_TO_DATE; postpaid/manual) | [DATE_TO_DATE — service contracts](/billing/billing-rules/date-to-date#service-contracts) · [Annually — contracts](/billing/billing-cycles/annually#service-contracts) |
| **Invoice attempt / collection limits** | Limits on invoice charge / collection attempts | [Postpaid](/billing/payment-modes/postpaid) · [Disciplinary Actions](/billing/disciplinary-actions/) |

Your modal may list additional Global Settings not in this table. Treat the modal as the inventory for **this** portal; use Global Settings (or StackConsole) to change values.

**Configure:** **Admin Panel → Global Settings** (and related Billing Setup screens).

---

## 3. Environment Flags

Deployment / environment-level flags that control invoice generation timing and Account Statement usage display. Often set with StackConsole for the environment.

| Flag | Typical meaning | Docs |
|---|---|---|
| **`ENABLE_BILLING_CYCLE_USAGE`** | When `true`, Account Statement **Usage Details** can show totals broken down by billing cycle (for example Hourly summary) | [Usage Details](/billing/customer-billing-dashboard/account-statement/usage-details) · [Customer Billing Dashboard](/billing/customer-billing-dashboard/) |
| **`UNSIGNED_INVOICE_FEATURE_ENABLED`** | When `true`, admins can download **unsigned** invoices, sign offline, and upload for customers | [Invoice Settings](/billing/invoice-settings/) · [Invoice Details](/billing/invoice-settings/invoice-details) |
| **`PREPAID_ADVANCE_PRO_RATA_INVOICE`** | Prepaid: `true` = pro-rata **payable** invoice immediately at creation; `false` = usage until conversion at renewal | [Prepaid](/billing/payment-modes/prepaid) · [Monthly — advance flags](/billing/billing-cycles/monthly) |
| **`PREPAID_ADVANCE_INVOICE`** | Prepaid: `true` = renewal payable invoice on the **1st of the month**; `false` = usage until conversion at renewal | [Prepaid](/billing/payment-modes/prepaid) |
| **`POSTPAID_ADVANCE_PRO_RATA_INVOICE`** | Postpaid: immediate pro-rata payable invoice at creation vs defer to renewal | [Postpaid — advance invoice flags](/billing/payment-modes/postpaid) · [Monthly](/billing/billing-cycles/monthly) |
| **`POSTPAID_ADVANCE_INVOICE`** | Postpaid: renewal payable invoice on the **1st of the month** vs defer | [Postpaid](/billing/payment-modes/postpaid) |
| **`MANUAL_ADVANCE_PRO_RATA_INVOICE`** | Manual: same pro-rata advance pattern as postpaid | [Manual — advance invoice flags](/billing/payment-modes/manual) |
| **`MANUAL_ADVANCE_INVOICE`** | Manual: renewal on the **1st of the month** vs defer | [Manual](/billing/payment-modes/manual) |

:::warning[Platform / environment — set before go-live]

Changing Global Settings or Environment Flags after customers and services exist can cause billing inconsistencies. Prefer StackConsole support for production changes. See [Prepaid — configure before go-live](/billing/payment-modes/prepaid#configure-prepaid-billing-model) and [Payment Mode Settings](/billing/payment-modes/#payment-mode-settings-platform-wide).

:::

---

## Where to change settings

| Area in modal | Change in CMP (typical) |
|---|---|
| **Billing Mode** | **Settings → Billing Setup → Payment Mode Settings**; cycles/rules via rate cards and billing rule config |
| **Enabled Global Settings** | **Admin Panel → Global Settings** |
| **Environment Flags** | Environment / deployment config (usually StackConsole) |

Also related setup:

| Topic | Path / docs |
|---|---|
| Rate cards & package cycles | **Settings → Billing Setup → Rate Cards** — [Rate Cards](/billing/rate-cards/) |
| Payment gateways & currencies | [Payment Gateways](/billing/payment-gateways/) |
| Invoice branding, branches, tax | [Invoice Settings](/billing/invoice-settings/) |

---

## How this affects the customer portal

| If Billing Settings shows… | Customer impact |
|---|---|
| Prepaid + generate prepaid receipt **`false`** | [Usage Details — Model 1](/billing/customer-billing-dashboard/account-statement/usage-details#scenario-a--prepaid--generate-prepaid-receipt--false-model-1) — cumulative from account creation |
| Prepaid + generate prepaid receipt **`true`** | [Usage Details — Model 2](/billing/customer-billing-dashboard/account-statement/usage-details#scenario-b--prepaid--generate-prepaid-receipt--true-model-2) — current open month |
| Postpaid / Manual | [Usage Details — Postpaid/Manual](/billing/customer-billing-dashboard/account-statement/usage-details#scenario-c--postpaid-or-manual) |
| `ENABLE_BILLING_CYCLE_USAGE` = `true` | Usage Details can show cycle totals (for example **Hourly: $…**) |
| `enable_stoppable_service_billing` = `true` | Stopped hourly VMs / K8s pause compute charges — [Stoppable Services](/billing/stoppable-services) |
| Auto Pay | [Auto Pay](/platform-features/auto-pay) |

Customer UI: [Customer Billing Dashboard](/billing/customer-billing-dashboard/).

---

## Related

* [Billing Overview](/billing/overview)
* [Customer Billing Dashboard](/billing/customer-billing-dashboard/)
* [Usage Details](/billing/customer-billing-dashboard/account-statement/usage-details)
* [Payment Modes](/billing/payment-modes/)
* [Billing Rules](/billing/billing-rules/)
* [Stoppable Services](/billing/stoppable-services)
* [Billing FAQs — portal billing settings](/faq/platform/billing-pricing#where-can-i-see-portal-billing-settings-generate-prepaid-receipt-payment-modes-billing-rules)
