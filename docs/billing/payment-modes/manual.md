---
sidebar_position: 4
title: "Manual"
tags: ["billing", "manual", "invoice", "bank-transfer", "payment-modes"]
---

# Manual

In **manual** payment mode, customers pay **outside the CMP platform** (bank transfer, cheque, cash, UPI). CMP generates invoices for usage, but **admins verify offline payments and mark invoices paid** — there is no payment gateway auto-charge.

**Set payment mode:** **Clients → Register Client** (Step 2 — new onboarding) or **Clients → [Customer] → Billing Setup** (existing account)

## Admin onboarding

When onboarding a new manual customer, select **MANUAL** on **Step 2 — Payment Mode & Pricing Settings** in **Clients → Register Client**. Set **Threshold**, assign a **Price Rate Card**, and select **Status** (for example, **Active**). CMP prompts: *"This is a manual account. Please select the appropriate status manually."*

See [Register Client — Manual](/billing/payment-modes/#step-2--manual) for full field details and screenshot placeholder.

![Screenshot: Register Client — Step 2 Manual](/img/screenshots/cmp-register-client-step2-manual.png)

:::tip[Quick start]

| Step | Who | Action |
|---|---|---|
| 1 | Customer | Uses services; invoice generated per billing cycle or threshold |
| 2 | Customer | Pays offline using bank details on invoice |
| 3 | Customer | Uploads proof via **Manual Payment Submission** |
| 4 | Admin | Verifies payment with finance / bank records |
| 5 | Admin | Marks invoice **Paid** in CMP (full or partial amount) |

:::

## Registration workflows

Manual mode supports two onboarding paths. Which modes customers can select is controlled in **Settings → Billing Setup → Payment Mode Settings** — see [Payment Mode Settings](/billing/payment-modes/#payment-mode-settings-platform-wide). **Do not change these settings after go-live** without StackConsole support.

### 1. Admin onboarding (Register Client)

1. Open **Clients → Register Client**
2. Complete **Step 1 — Basic Details**
3. On **Step 2 — Payment Mode & Pricing Settings**, select **MANUAL**, set **Threshold**, **Price Rate Card**, and **Status**
4. Complete **Step 3 — Quota Management** and **Step 4 — Success**
5. Account is **activated immediately** when status is set to Active — customer can create resources right away

See [Register Client — Manual](/billing/payment-modes/#step-2--manual).

### 2. Self-registration with admin approval

1. Enable **Manual Payment Mode** for the relevant account type in **Settings → Billing Setup → Payment Mode Settings** (ensure **Disable for → Customer** is not checked if customers should see it — by default Manual is disabled for Customer)
2. Customer registers and selects **Manual Payment** on the signup form (visible only when manual mode is enabled for registration)
3. Request sent to admin for verification
4. Admin **approves** → account activated, or **rejects** → remains inactive
5. Customer can create resources **only after approval**

## Threshold limit (spending cap)

During onboarding on **Register Client Step 2** (or later in account settings), admin assigns a **threshold** to cap maximum usage.

When usage reaches the threshold:

1. Invoice generated **immediately** — even if billing cycle has not ended
2. Prevents abuse — detects high usage before normal invoice date
3. Customer must pay (offline) before continuing at scale

Threshold applies to **postpaid and manual** accounts (see [Postpaid — Threshold](/billing/payment-modes/postpaid#threshold-spending-cap)).

## Billing and payment process

```
Resource usage tracked
        ↓
Invoice generated (cycle end OR threshold breach)
        ↓
Customer pays outside CMP (bank transfer, cheque, cash)
        ↓
Customer uploads proof → Manual Payment Submission
        ↓
Admin notified → verifies with bank records
        ↓
Admin approves/rejects proof
        ↓
Admin marks invoice(s) Paid in CMP
```

### External payment by customer

* Payment made **outside CMP** — bank transfer, cheque, cash, UPI, etc.
* Customer uploads proof using **Manual Payment Submission** in the portal
* Display **Bank Details** on invoices — configure under branch invoice settings (**Admin → Branches**)

### Admin verification

1. Admin receives notification of proof submission
2. Admin verifies against external records / bank statements
3. Admin **approves** or **rejects** the payment proof

### Manual invoice marking

Once payment is confirmed:

1. Admin marks corresponding invoice(s) as **Paid** in CMP
2. This step is **not automated**
3. Supports **partial payment** — e.g. customer paid ₹4,000 against ₹5,000 due; admin marks paid up to ₹4,000

:::warning[No automation for manual payments]

Admins must confirm receipt with the account/finance team and mark invoices paid manually. CMP does not detect offline bank transfers automatically.

:::

:::info[Converting manual to postpaid]

**Manual → Postpaid** is the **only supported** payment mode conversion in CMP. Use this when a manual customer should move to card-based auto-charge billing.

Manual accounts **cannot** be converted to prepaid. Adding a credit or debit card does **not** change payment mode by itself — an explicit **Manual → Postpaid** conversion is required.

See [Changing payment mode](/billing/payment-modes/#changing-payment-mode).

:::

## Invoice generation settings

| Flag | Purpose |
|---|---|
| **MANUAL_ADVANCE_PRO_RATA_INVOICE** | Advance pro-rata payable invoice at service creation |
| **MANUAL_ADVANCE_INVOICE** | Advance renewal invoice (e.g. on 1st of month) |

| Global setting | Purpose |
|---|---|
| `delay_due_date_in_days` | Delay due date (`0` = immediate due date) |

### Advance invoice example (monthly, created 10 Jan 2026)

| Invoice | When generated | Period |
|---|---|---|
| Pro-rata | At creation (if advance pro-rata enabled) | 10 Jan – 31 Jan 2026 |
| Renewal | 1 Feb 2026 (if advance invoice enabled) | 1 Feb – 28 Feb 2026 |

Manual invoice timing otherwise follows the same cycle-end patterns as postpaid — at cycle end or on threshold breach.

## Generating manual invoices (admin)

Admins can create **manual invoices** for charges **not defined as system services**:

| Allowed | Not allowed |
|---|---|
| Custom / one-off charges | Direct link to system-provisioned services (VM, LB, etc.) |

System services (VM, load balancer, volumes) are invoiced automatically through normal billing — not via manual invoice creation.

## Admin-created unpaid invoices on postpaid accounts

If an admin creates a manual unpaid invoice on a **postpaid** account:

* Card is **not** auto-charged immediately
* Admin must mark paid, or customer pays via portal

## Contract billing

Service contracts work with **Manual** and **Postpaid** modes (not prepaid), using **DATE_TO_DATE** billing rule only.

## Vendor customer accounts

Vendor-managed end-customer accounts are always set to **Manual** payment mode:

* Prevents payment-system restrictions (threshold still applies)
* Usage tracked internally — no taxable invoice to end customer
* Vendor billed in aggregate for all customer usage

## Related

* [Payment Modes](/billing/payment-modes/)
* [Postpaid](/billing/payment-modes/postpaid) — threshold and cycle-end invoicing parallels
* [Billing Cycles](/billing/billing-cycles)
* [Billing Rules](/billing/billing-rules)
* [Billing FAQs](/faq/billing)
