---
sidebar_position: 1
title: "Invoice Settings"
tags: ["billing", "invoice", "branches", "taxation"]
---

# Invoice Settings

**Invoice Settings** covers how CMP builds customer invoices: which **branch** owns the customer, what legal and branding details appear on the PDF, tax percentages, invoice numbers, and terms.

All of this is configured under **Settings → System → Branch** (branch list and the **Configure** wizard).

:::warning[Important — map branches to payment gateways]

After you create a branch, **map it to Payment Gateway Settings**. Payment gateways appear for customers **only** when the gateway is assigned to that customer’s branch.

**Path:** **Settings → Billing Setup → Payment Setting** → edit gateway → **Branches**.

Without this mapping, customers will not see those gateways. Details: [Payment Gateways — branch visibility](/billing/payment-gateways/#1-payment-gateway-settings-branch-visibility).

:::

| Page | What you configure |
|---|---|
| **[Branches](/billing/invoice-settings/branches)** | Multi-branch setup, operational countries, default branch, create-branch fields |
| **[Invoice settings](/billing/invoice-settings/invoice-details)** | Address, logo, signature, bank details, declaration, notes on the invoice |
| **[Invoice number settings](/billing/invoice-settings/invoice-number)** | How invoice numbers are generated for the branch |
| **[Taxation](/billing/invoice-settings/taxation)** | Country tax label + Organization / Personal percentages per branch |

Customer-facing registration Terms and Conditions (branch wizard Step 5, one-liner, enforce) are documented under **Platform Features → [Terms and Conditions](/platform-features/terms-and-conditions/)**.

:::tip[Quick start]

1. Create or edit a branch — [Branches](/billing/invoice-settings/branches)  
2. Complete **Invoice Settings**, **Taxation**, and **Invoice Number** in the Configure wizard  
3. Configure customer-facing **Terms and Conditions** (wizard Step 5) — [In-step form](/platform-features/terms-and-conditions/in-step-form)  
4. Mark one branch as **Default** for customers whose country has no dedicated branch  
5. Assign [payment gateways](/billing/payment-gateways/) to each branch that should accept online payments  

:::

## How branch and invoice settings connect

```text
Customer country of registration
        ↓
Branch (operational countries or Default)
        ↓
Invoice = branch legal name + address + logo + tax % + number + terms
```

## Related

* [Billing overview](/billing/overview)
* [Payment Gateways](/billing/payment-gateways/)
* [Manual payment mode](/billing/payment-modes/manual)
* [Payment Modes](/billing/payment-modes/)
