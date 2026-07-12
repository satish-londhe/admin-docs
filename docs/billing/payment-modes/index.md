---
sidebar_position: 1
title: "Payment Modes"
tags: ["billing", "prepaid", "postpaid", "manual", "payment-modes"]
---

# Payment Modes

A **payment mode** (also called **billing mode** in CMP) defines **how customers pay** for services. CMP supports three payment modes:

| Mode | Summary |
|---|---|
| **Prepaid** | Wallet top-up; usage deducted in real time |
| **Postpaid** | Invoice at period end; card can auto-charge |
| **Manual** | Offline payment; admin verifies and marks invoices paid |

Payment mode is separate from **[billing cycles](/billing/billing-cycles)** (hourly, monthly, yearly) and **[billing rules](/billing/billing-rules)** (how charges are calculated).

**Set per customer:** **Clients → Register Client** (new onboarding) or **Clients → [Customer] → Billing Setup** (existing account)

:::tip[Quick start]

| Goal | Payment mode |
|---|---|
| Wallet top-up, real-time deduction | [Prepaid](/billing/payment-modes/prepaid) |
| Saved card, auto-charge at invoice time | [Postpaid](/billing/payment-modes/postpaid) |
| Bank transfer / offline payment | [Manual](/billing/payment-modes/manual) |
| Contract services (DATE_TO_DATE rule) | Postpaid or Manual — not prepaid |
| Assign payment mode (admin) | **Clients → Register Client** — Step 2; see [Admin onboarding](#admin-onboarding--register-client) |
| Configure platform payment modes | **Settings → Billing Setup → Payment Mode Settings** — StackConsole team only; configure before go-live |
| Change payment mode after onboarding | Only **Manual → Postpaid** is supported — see [Changing payment mode](#changing-payment-mode) |

:::

## Pages in this section

* [Prepaid](/billing/payment-modes/prepaid) — wallet, two billing models (infra credit vs service usage), low-balance handling, upgrades
* [Postpaid](/billing/payment-modes/postpaid) — threshold, auto-charge, frozen invoices, consolidated billing
* [Manual](/billing/payment-modes/manual) — registration workflows, offline payment, admin verification

## The three payment modes

| Mode | How customer pays | Card auto-charge? |
|---|---|---|
| **Prepaid** | Wallet top-up | No |
| **Postpaid** | Invoice settlement | Yes — when card on file and gateway supports variable recurring charges |
| **Manual** | Outside CMP (bank, cheque, cash, UPI) | No — admin marks paid |

```
Prepaid:  Top up wallet  →  Provision  →  Wallet deducted  →  Month-end invoice (record)
Postpaid: Provision  →  Usage tracked  →  Invoice  →  Card auto-charge or portal pay
Manual:   Provision  →  Usage tracked  →  Invoice  →  Offline pay  →  Admin marks paid
```

## Assigning payment mode

Payment mode is set when the account is created — either by an **admin during onboarding** or by the **customer during self-registration**. Choose carefully: payment mode is **effectively fixed after onboarding** and [cannot be changed](#changing-payment-mode) except **Manual → Postpaid**.

### Admin onboarding — Register Client

When an admin onboards a new customer, payment mode is selected in the **Register Client** wizard. This is a **one-time decision** — prepaid and postpaid accounts cannot be converted later.

**CMP path:** **Clients → Register Client**

The wizard has four steps:

| Step | Name |
|---|---|
| 1 | **Basic Details** |
| 2 | **Payment Mode & Pricing Settings** |
| 3 | **Quota Management** |
| 4 | **Success** |

Payment mode, rate card, and mode-specific settings are configured on **Step 2**. Complete **Step 3** to assign quotas before finishing.

:::warning[Select payment mode carefully on Step 2]

Payment mode conversion is **not supported** for prepaid ↔ postpaid or prepaid/manual ↔ postpaid/manual changes. Only **Manual → Postpaid** can be done later. Choose the correct mode before the customer provisions services.

:::

#### Step 2 — Manual

Select **MANUAL** as **Payment Mode**. The form shows manual-specific fields including threshold and account status.

| Field | Required | Description |
|---|---|---|
| **Payment Mode** | Yes | Select **MANUAL** |
| **Threshold** | Yes | Spending cap for the account (for example, `2000`). When usage reaches this limit, an invoice is generated immediately — see [Manual — Threshold](/billing/payment-modes/manual#threshold-limit-spending-cap) |
| **Price Card Type** | Yes | Select **Rate Card** |
| **Price Rate Card** | Yes | Select the rate card for this customer (for example, **default**). Use **+ Add** to assign additional rate cards if needed |
| **Status** | Yes | Account status — for example, **Active**. CMP shows: *"This is a manual account. Please select the appropriate status manually."* |

![Screenshot: Register Client — Step 2 Payment Mode & Pricing Settings (Manual)](/img/screenshots/cmp-register-client-step2-manual.png)

Manual accounts registered by an admin are typically **activated immediately** when status is set to Active — no card or wallet payment is required at onboarding.

#### Step 2 — Postpaid

Select **POSTPAID** as **Payment Mode**. The customer must attach a credit card before the account is activated.

| Field | Required | Description |
|---|---|---|
| **Payment Mode** | Yes | Select **POSTPAID** |
| **Payment Method** | Yes | Select **Credit Card**. CMP shows: *"This account will be activated once the credit card is attached."* |
| **Price Card Type** | Yes | Select **Rate Card** |
| **Price Rate Card** | Yes | Select the rate card for this customer (for example, **default**) |

![Screenshot: Register Client — Step 2 Payment Mode & Pricing Settings (Postpaid)](/img/screenshots/cmp-register-client-step2-postpaid.png)

The account remains pending until the customer completes card attachment. Global or account-level **threshold** can be configured after onboarding in Billing Setup — see [Postpaid — Threshold](/billing/payment-modes/postpaid#threshold-spending-cap).

#### Step 2 — Prepaid

Select **PREPAID** as **Payment Mode**. The customer must complete an initial wallet payment before the account is activated.

| Field | Required | Description |
|---|---|---|
| **Payment Mode** | Yes | Select **PREPAID**. CMP shows: *"This account will be activated once the payment is completed."* |
| **Price Card Type** | Yes | Select **Rate Card** |
| **Price Rate Card** | Yes | Select the rate card for this customer (for example, **default**) |

![Screenshot: Register Client — Step 2 Payment Mode & Pricing Settings (Prepaid)](/img/screenshots/cmp-register-client-step2-prepaid.png)

The account remains pending until the customer completes the initial wallet top-up. Prepaid onboarding does not show **Threshold** or **Status** on Step 2 — wallet balance governs service creation.

### Self-registration

When self-registration is enabled, end customers can **choose their payment mode on the signup form** — but only if **more than one payment mode** is configured as visible for registration.

| Visible modes on signup | Customer experience |
|---|---|
| **One mode only** | That mode is assigned automatically — no choice on the form |
| **Multiple modes** | Customer selects Prepaid, Postpaid, or Manual during registration |

Behaviour by mode:

| Mode | Self-registration behaviour |
|---|---|
| **Prepaid** | Customer completes wallet top-up during signup (requires active payment gateway and configured top-up amounts) |
| **Postpaid** | Customer adds and validates a saved card (requires a gateway with **Has Save Card** and auto-charge support) |
| **Manual** | Registration is sent for **admin approval** — account stays pending until approved |

Self-registered customers are automatically assigned the **default rate card** — there is no rate card selection on the signup form. See [How customers get a rate card](/rate-cards/#how-customers-get-a-rate-card).

## Payment Mode Settings (platform-wide)

**CMP path:** **Settings → Billing Setup → Payment Mode Settings**

This screen controls which payment modes are **available platform-wide** — including which account types can select each mode during [admin onboarding](#admin-onboarding--register-client) and [self-registration](#self-registration).

![Screenshot: Payment Mode Settings listing](/img/screenshots/cmp-payment-mode-settings.png)

The listing shows each payment mode with its current configuration. Click **Actions → Update Mode** on any row to edit.

#### Update Mode

![Screenshot: Payment Mode Settings — Update Mode form](/img/screenshots/cmp-payment-mode-settings-update-form.png)

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Internal mode identifier — **PREPAID**, **POSTPAID**, or **MANUAL**. Shown in the list **Name** column and on the edit form |
| **Display Name** | Yes | Label shown in the CMP UI — list column and edit form |
| **Description** | Yes | Short description (for example, *Prepaid System*, *Postpaid System*, *Manual Payment System*) — list column and edit form |
| **Disabled For** / **Disable for** | No | **List column:** account types that cannot select this mode. **Edit form:** checkboxes for **Admin**, **Customer**, **Vendor**, **Reseller** — checked types are hidden from onboarding and registration. For example, **MANUAL** disabled for **Customer** means only admins can assign manual mode |
| **Recommended** | No | **List column:** Yes/No. **Edit form:** toggle — when enabled, CMP highlights this mode as the recommended option where a choice is offered |
| **Status** | Yes | **Active** or inactive — inactive modes are not available for new assignments. List column and edit dropdown |
| **Actions** | — | **List only** — open menu → **Update Mode** to open the edit panel |

:::warning[StackConsole team only — configure before go-live]

**Payment Mode Settings** is a platform-level configuration. Changes are **reserved for the StackConsole team**, or should be made **only with StackConsole support**.

**Do not change these settings after go-live** or while customers are actively using the platform. Mid-stream changes can **break billing workflows**, cause provisioning errors, and leave existing accounts in inconsistent states.

Plan your payment mode strategy **before launch** — which modes are available to customers, resellers, and vendors — and treat this configuration as **fixed** once production onboarding begins.

:::

:::info[How this affects registration]

* If a mode is **disabled for Customer**, it does not appear on the **self-registration** form for end customers.
* If **multiple modes** are enabled for Customer, the signup form shows a choice; if only **one** is enabled, that mode is assigned automatically.
* **Recommended** affects which mode is pre-selected or highlighted when a choice is shown.

:::

## Related billing setup

Configure payment gateways, currencies, and top-up amounts alongside Payment Mode Settings — but **before go-live**:

| Area | CMP path | What to configure |
|---|---|---|
| **Payment gateways** | **Settings → Billing Setup → Payment Setting** | Active gateways per branch; **Disable on Registration**; **Has Save Card** and **Is Default for Postpaid** |
| **Payment providers** | **Settings → Billing Setup → Payment Provider** | Per-gateway **Has Autocharge**, supported currencies, logos |
| **Currency & top-up** | **Settings → Billing Setup → Currencies → Configure** | **Add Top-Up Amount** — predefined wallet amounts for prepaid registration |

CMP does **not** automatically change payment mode when a customer adds a credit or debit card later. Card addition alone does not convert prepaid or manual accounts to postpaid.

## Changing payment mode

CMP does **not** automatically change payment mode when a customer adds a credit or debit card. Payment mode conversion is **limited** and must be done explicitly by an admin where supported.

| Conversion | Supported? |
|---|---|
| Prepaid → Postpaid | ❌ Not supported |
| Prepaid → Manual | ❌ Not supported |
| Postpaid → Prepaid | ❌ Not supported |
| Postpaid → Manual | ❌ Not supported |
| **Manual → Postpaid** | ✅ **Only supported conversion** |

To move a manual customer to postpaid (for example, to enable card auto-charge), use the supported **Manual → Postpaid** conversion in **Clients → [Customer] → Billing Setup** — adding a card alone does not change the payment mode.

## Choosing a payment mode

| Scenario | Recommended mode |
|---|---|
| Self-service wallet top-up | **Prepaid** |
| Self-service with saved card | **Postpaid** |
| Enterprise bank transfer / purchase order | **Manual** |

## Hourly invoices (all modes)

For **hourly** services, invoices are generated at the **end of the month** or on the **1st of the following month** — regardless of payment mode. All hourly usage in the month is consolidated into a single invoice.

See [Billing Cycles](/billing/billing-cycles) for fixed-cycle and mandatory-hourly service rules.

## Shared invoicing topics

| Topic | Summary |
|---|---|
| **VM upgrade billing** | Prepaid: separate payable invoice per upgrade. Postpaid: line items on period-end invoice |
| **Early deletion (fixed cycle)** | No refund — full period still charged; admin may grant free credits |
| **Admin-created manual invoices** | Do not auto-charge postpaid cards |
| **Free credits & discounts** | Discounts at service creation only; free credits settle existing invoices |
| **Partial payment** | Admin marks invoices paid — especially in manual mode |
| **One consolidated invoice** | Postpaid monthly consolidation; **DATE_TO_DATE** rule uses per-service invoices |

## Related

* [Billing Overview](/billing/overview)
* [Billing Cycles](/billing/billing-cycles)
* [Billing Rules](/billing/billing-rules)
* [Billing FAQs](/faq/billing)
