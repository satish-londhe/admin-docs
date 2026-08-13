---
sidebar_position: 3
title: "Postpaid"
tags: ["billing", "postpaid", "stripe", "invoice", "payment-modes"]
---

# Postpaid

In **postpaid** mode, customers consume services first and pay invoices later. Saved payment methods can be **auto-charged** when invoices are due.

:::warning[Payment gateway requirement]

Postpaid is available only when **both** are true:

1. The payment gateway **natively** supports **saving a payment method**, charging it **without user interaction**, and **variable** amounts for recurring payments (for example, Stripe)
2. **Has Autocharge** is enabled for that provider in CMP (**Settings → Billing Setup → Payment Provider**)

**Postpaid is applicable only if** those capabilities are available on the gateway. Enabling **Has Autocharge** in CMP alone is **not** enough.

When evaluating a new provider, use [New Payment Gateway Requirements](/billing/payment-gateways/new-gateway-requirements#postpaid--strict-requirements). See each gateway page (for example, [Stripe — Payment Gateway Providers](/billing/payment-gateways/stripe#payment-gateway-providers)).

:::

:::warning[Postpaid — hourly and monthly only]

Use **postpaid** only with **hourly** and **monthly** billing cycles — not quarterly or longer.

| Risk | Why it matters |
|---|---|
| **Revenue delay** | Waiting months or years to collect on a long committed period |
| **Fraud exposure** | Customer can use services for the full cycle and leave before paying |

For **quarterly and longer** cycles, use **prepaid** or **manual**. See [Billing Cycles — payment modes by cycle](/billing/billing-cycles/#billing-cycles-and-payment-modes).

:::

**Set payment mode:** **Clients → Register Client** (Step 2 — new onboarding) or **Clients → [Customer] → Billing Setup** (existing account)

## Admin onboarding

Admin selects **POSTPAID** when onboarding a customer via **Clients → Register Client**.

| Step | Action |
|---|---|
| 1 | **Basic Details** — enter customer information |
| 2 | **Payment Mode & Pricing Settings** — select **POSTPAID**, **Payment Method** (Credit Card), assign **Price Rate Card** |
| 3 | **Quota Management** — assign quotas |
| 4 | **Success** — customer must attach credit card to activate |

See [Admin registration flow](/billing/payment-modes/#admin-registration-flow) and [Step 2 — Postpaid (admin)](/billing/payment-modes/#step-2--postpaid-admin).

![Screenshot: Register Client — Step 2 Postpaid](/img/screenshots/cmp-register-client-step2-postpaid.png)

## Self-registration

Customers can select **POSTPAID** on the public signup form when postpaid is enabled for **Customer** in Payment Mode Settings. Modes marked **Recommended** show a badge on the form.

| Step | Action |
|---|---|
| 1 | **Verify Email Address** |
| 2 | **Complete Payment** — select **POSTPAID**, add and validate credit card |

Account activates once the customer attaches a saved card (requires gateway with **Has Save Card** and auto-charge support).

See [Self-registration flow](/billing/payment-modes/#registration-flow).

## Billing cycles and postpaid

| Billing cycle | Use with postpaid? |
|---|---|
| **Hourly** | ✅ **Recommended** — usage consolidated monthly; [threshold](/billing/payment-modes/postpaid#threshold-spending-cap) limits exposure |
| **Monthly** | ✅ **Recommended** — one billing period of outstanding exposure |
| **Quarterly** | ❌ **Not recommended** |
| **Semi-annually** | ❌ **Not recommended** |
| **Annually** | ❌ **Not recommended** |
| **Bi-annually** | ❌ **Not recommended** |
| **Tri-annually** | ❌ **Not recommended** |

**Why quarterly and longer cycles do not fit postpaid:**

* **Revenue risk** — you may wait many months or over a year before collecting payment for a committed period
* **Fraud risk** — a customer can provision long-cycle services, consume resources, and leave before an invoice is settled

Enable only **hourly** and **monthly** billing cycles for postpaid customers. Use **prepaid** or **manual** for quarterly and longer commitments. See [Billing Cycles — payment modes by cycle](/billing/billing-cycles/#billing-cycles-and-payment-modes).

:::tip[Quick start]

| Rule | Behaviour |
|---|---|
| Service creation | Allowed until **threshold** is reached |
| Threshold breach | Invoice generated immediately + card auto-charge attempted |
| Monthly renewal | Invoices at month end; auto-charged to saved card |
| Failed charge | Retries daily per `invoice_no_of_attempts` → then **Frozen** |

:::

## Threshold (spending cap)

Threshold limits exposure before the normal billing period ends.

**Configure:**

* **Global** — per currency in Global Settings
* **Account-level** — override on individual customer in Billing Setup

### Purpose

Postpaid customers can create services before paying. Threshold **minimizes fraud risk** by triggering early invoicing when usage reaches the cap.

### Behaviour when threshold is reached

1. System **immediately generates an invoice** (even if billing cycle has not ended)
2. System attempts to **collect payment** from the saved payment method
3. Threshold **resets to 0** after invoice processing
4. Customer can continue using services until threshold is reached again

**Example:**

* Customer ABC — postpaid, threshold **$1,000**
* Usage reaches $1,000 → invoice generated → auto-charge attempted → threshold reset

:::info[Manual mode threshold]

The same threshold concept applies to **[Manual](/billing/payment-modes/manual)** accounts — but payment is offline and admin marks paid instead of auto-charge.

:::

## Service creation

CMP allows customers to create services as long as the defined **threshold is not exceeded**.

## Service renewal

At the end of each month:

1. Invoices generated based on **actual usage**
2. Invoices **automatically charged** to the customer's saved card

## Auto-charge failure workflow

### Retry attempts

* System retries charging the card **once per day**
* Number of attempts controlled by global setting **`invoice_no_of_attempts`**

### Invoice frozen

If all retry attempts fail:

1. Invoice marked **Frozen**
2. Notifications sent to **admin** and **customer**
3. Email templates: `FrozenInvoiceCustomerNotification`, `FrozenInvoiceAdminNotification`

### Handling frozen invoices

| Actor | Action |
|---|---|
| **Admin** | Verify with client → manually **unfreeze** invoice → system can process again |
| **Customer** | Open **Invoice Details** → attempt **manual pay** → on success, services continue |

## Consolidated invoicing (one account, one invoice)

Postpaid (and manual) deployments can use **One Account One Invoice (OAOI)** so customers receive **one consolidated invoice per month** instead of separate invoices per service event.

Full documentation — requirements, unsupported rules (prepaid, DATE_TO_DATE), service contracts, timing, and FAQ:

**[One Account One Invoice (OAOI)](/billing/one-account-one-invoice)**

:::warning[DATE_TO_DATE billing rule exception]

The **DATE_TO_DATE** billing rule does **not** support monthly consolidation. See [OAOI — unsupported rules](/billing/one-account-one-invoice#unsupported-account-types-and-billing-rules) and [DATE_TO_DATE](/billing/billing-rules/date-to-date#postpaid-consolidated-invoicing-exception).

:::

## VM upgrade billing (postpaid)

### Hourly services

| Period | Charging |
|---|---|
| **Before upgrade** | Original hourly rate — immediate invoice |
| **After upgrade** | New hourly rate to month end — included in month-end invoice |

### Monthly and fixed cycles

Same proration logic as [prepaid upgrades](/billing/payment-modes/prepaid#vm-upgrade-billing-prepaid).

**Postpaid upgrade invoicing:**

* **One invoice** at end of billing period (e.g. 1st of next month)
* Multiple line items on that invoice — for example:
  * Line 1: 1st–12th old plan = $39.36
  * Line 2: 12th–30th upgrade adjustment = $29.52

## Early deletion before cycle ends

| Billing cycle | Charge |
|---|---|
| **Hourly** | Actual usage from creation to deletion only |
| **Fixed cycles** | **Full period charged** — no refund. Admin may grant free credits for disputes |

## Admin-created manual invoices

| Question | Answer |
|---|---|
| Auto-charge postpaid card immediately? | **No** |
| Who settles? | Admin marks paid, or customer pays manually in portal |

Admin-created manual invoices are **not** processed automatically by CMP.

## Disciplinary actions and renewals

| Disciplinary state | Renewal invoices |
|---|---|
| **[Freeze](/billing/disciplinary-actions/freeze)** | System **continues** creating renewal invoices |
| **[Suspend](/billing/disciplinary-actions/suspend)** | System **continues** creating renewal invoices |
| **[Terminated](/billing/disciplinary-actions/terminate)** | System **does not** create renewal invoices |

Full workflow: [Disciplinary Actions](/billing/disciplinary-actions/).

## Invoice settings (postpaid)

Postpaid invoice timing is controlled by flags in **Admin → Invoices → Invoice Settings**.

| Global setting | Purpose |
|---|---|
| `invoice_no_of_attempts` | Days/attempts to retry failed card charges |
| `delay_due_date_in_days` | Delay invoice due date (`0` = immediate) |

### Postpaid invoice generation modes

CMP supports **two postpaid invoice generation approaches**. Both are controlled by invoice settings flags — **default is `false` for both**.

| Flag | Default | When `true` | When `false` (default) |
|---|---|---|---|
| **`POSTPAID_ADVANCE_PRO_RATA_INVOICE`** | `false` | A **pro-rata payable invoice** is generated **immediately** at service creation | **Usage records** are maintained during the cycle; charges are **converted to a payable invoice on the next renewal**. This cycle repeats |
| **`POSTPAID_ADVANCE_INVOICE`** | `false` | The **renewal payable invoice** is generated on the **1st of the month** (start of month) | **Usage records** are maintained during the cycle; charges are **converted to a payable invoice on the next renewal**. This cycle repeats |

:::warning[Decide at system setup — StackConsole only]

Both flags default to **`false`**. If your deployment needs advance postpaid invoicing, decide this during **initial system setup** and inform **StackConsole** so the flags can be configured correctly.

**Changing this behaviour after go-live is not supported.** Mid-stream changes can break billing workflows and cause invoice inconsistencies for existing services.

:::

### Default mode (`false` — standard postpaid)

When both flags are `false`:

1. CMP **maintains usage records** during the billing cycle
2. On the next renewal, accumulated usage is **converted to a payable invoice**
3. Auto-charge runs against the payable invoice
4. The cycle repeats for each subsequent period

This is the behaviour most postpaid deployments use out of the box.

### Advance mode (flags enabled)

When advance flags are enabled, CMP generates **payable invoices** immediately on the advance schedule instead of deferring conversion of usage records to payable invoices.

| Invoice type | When generated (advance mode) |
|---|---|
| **Pro-rata invoice** | **Immediately** at service creation |
| **Renewal invoice** | On the **1st of the month** (start of month) — not at end of month |

**Example — monthly billing cycle, service created 10 Jan 2026:**

| Invoice | Generated | Covers period |
|---|---|---|
| **Pro-rata** | **10 Jan 2026** (immediately at creation) | 10 Jan – 31 Jan 2026 |
| **Next renewal** | **1 Feb 2026** (start of month) | 1 Feb – 28 Feb 2026 |

:::info[Same advance timing as manual mode]

Advance postpaid invoicing uses the same timing as [Manual advance invoice settings](/billing/payment-modes/manual#invoice-generation-settings) — pro-rata at creation, renewal on the 1st of the month. Only the flag names differ (`POSTPAID_ADVANCE_*` vs `MANUAL_ADVANCE_*`).

:::

:::info[Payment mode conversion]

Only **Manual → Postpaid** is supported — it happens **automatically** when the customer saves a card. Prepaid and postpaid accounts cannot be converted to another payment mode. See [Changing payment mode](/billing/payment-modes/#changing-payment-mode).

:::

## Related

* [One Account One Invoice (OAOI)](/billing/one-account-one-invoice)
* [Payment Modes](/billing/payment-modes/)
* [Manual](/billing/payment-modes/manual)
* [Billing Cycles](/billing/billing-cycles/)
* [Billing Rules](/billing/billing-rules/)
* [Billing FAQs](/faq/platform/billing-pricing)
