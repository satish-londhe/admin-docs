---
sidebar_position: 2
title: "Reseller vs Vendor"
tags: ["platform", "reseller", "vendor", "partners", "billing"]
---

# Reseller vs Vendor

Use this page to choose the right partner model and explain differences to providers and partners.

| Topic | **Reseller** | **Vendor** |
|---|---|---|
| **Onboarding** | Admin onboards the reseller. At onboarding, admin assigns a rate card or creates a **reseller-specific** rate card per agreed terms. | Admin onboards the vendor. At onboarding, admin assigns a rate card or creates a **vendor-specific** rate card per agreed terms. |
| **Currency** | Currency assigned at onboarding — reseller sells to customers in **that same currency**. | Currency assigned at onboarding — vendor’s customer usage is accounted in **that same currency**. |
| **Billing cycles** | Global cycles enabled by the super admin are available. Reseller **cannot add or remove** cycles. | Same — global cycles only; vendor **cannot add or remove** cycles. |
| **Packages / plans** | **Cannot create** own plans. Can **change** existing plans assigned by the super admin for their customers. | **Cannot create** own plans. **Cannot change** plans assigned by the super admin. |
| **Package pricing** | Can manage pricing for customers: update prices or add margin (fixed amount or percentage) from the reseller admin dashboard after the rate card is assigned. | **Cannot** manage own pricing for customer packages. |
| **Portal** | Complete white-labeled portal on the reseller’s **whitelisted URL**. After onboarding, reseller prepares the domain and configures it with CMP. | Vendor is another account on the **provider URL**. No separate white-labeled portal. |
| **Role in CMP** | Provides services to customers and runs **reseller → customer** billing. | Registers and manages customer accounts; **cannot create services directly** — only manages customer accounts. |
| **Customer billing** | Separate billing applies to the reseller’s customers. Reseller controls pricing and invoices. | **No billing** directly to the vendor’s customer. System charges **only the vendor** based on customer usage. |
| **Customer invoices** | Customer accounts work like regular accounts and receive invoices at **reseller-set** pricing. | Customer accounts work like regular accounts for service management but **do not receive invoices**. Internal usage is tracked; no taxable invoice / invoice number for the vendor’s customer. |
| **Balance validation** | Customer create is validated against **customer** infra credit/balance **and** the **reseller** balance. If the customer has balance but the reseller does not → error thrown. | Customer create is validated against the **vendor** account (for example infra credits deducted from the **vendor** balance). |
| **Customer portal access** | Customers log in on the **reseller’s whitelisted URL**, see usage and billing, and can pay invoices. | Vendor can grant customers access to manage services. If access is given, customers can see **usage details** (no customer invoices). |
| **Provider → partner billing** | Provider bills the reseller from aggregated customer usage at **provider → reseller** pricing (see [Reseller billing](/platform-features/reseller/reseller-billing)). | System aggregates all customer usage and charges the vendor in a **single monthly invoice** (cycles of customer services summed at month end). |
| **Vendor customer payment mode** | N/A (reseller customers use modes enabled for that reseller path). | Vendor’s customer payment mode is **compulsory Manual** — no customer invoices, and to avoid disciplinary actions on those accounts. |

---

## Mental model

```text
Reseller
  Provider ──bills──► Reseller ──bills──► End customer
  (own white-label portal + customer invoices)

Vendor
  Provider ──bills──► Vendor ◄──usage from── End customer
  (provider portal; no invoice to end customer)
```

---

## When to use which

| Choose **Reseller** if… | Choose **Vendor** if… |
|---|---|
| Partner needs a **branded portal** and sells at their own prices | Partner only needs to **manage customers** on your portal |
| End customers must receive **invoices and pay** the partner | You bill the **partner only**; end customers must not get taxable invoices |
| Partner can adjust **margins** on provider packages | Partner must **not** change package prices |

---

## Related

* [Reseller overview](/platform-features/reseller/)
* [Reseller billing](/platform-features/reseller/reseller-billing) — provider → reseller and reseller → customer flows, limitations
* [Rate Cards](/billing/rate-cards/) — Customer / Reseller / Vendor account types
* [Payment Modes](/billing/payment-modes/)
* [Disciplinary Actions — reseller and vendor](/billing/disciplinary-actions/#reseller-and-vendor)
