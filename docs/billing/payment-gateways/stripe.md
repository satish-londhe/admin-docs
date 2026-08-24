---
sidebar_position: 2
title: "Stripe"
tags: ["billing", "payment-gateways", "stripe"]
---

# Stripe

**Stripe** is a global card payment gateway commonly used with CMP for **prepaid wallet top-ups** and **postpaid** saved-card / auto-charge flows.

**Provider:** [stripe.com](https://stripe.com/)

:::tip[Quick start]

| | |
|---|---|
| **Best for** | Global card payments; postpaid auto-charge |
| **Configure in CMP** | **Settings → Billing Setup → Payment Setting** / **Payment Provider** |
| **Payment modes** | Prepaid top-up; Postpaid when autocharge is enabled |

:::

## What Stripe is used for in CMP

| Mode | Behaviour |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** | Customer selects Stripe at wallet top-up / registration |
| **[Auto Pay](/platform-features/auto-pay)** | Save card for off-session prepaid top-up when wallet falls below threshold |
| **[Postpaid](/billing/payment-modes/postpaid)** | Save card; auto-charge invoices when due (variable amounts) |
| **[Manual](/billing/payment-modes/manual)** | Customer can save a card later — may convert Manual → Postpaid |
| **Delete saved card** | Customers can delete **non-default** Stripe cards from Payment Methods — see [Delete Saved Payment Card](#delete-saved-payment-card) |

See [Payment Gateways hub](/billing/payment-gateways/) for Payment Setting / Payment Provider paths.

## Payment Gateway Providers

Form title: **Edit Payment Gateway Providers**

**Path:** **Settings → Billing Setup → Payment Provider** (breadcrumb: **Payment Gateway Providers**)

Configure Stripe at the **Payment Provider** level first: currencies supported by the provider record, **Has Autocharge**, logos, and status. Then complete [Configure Stripe](#configure-stripe) (Payment Gateway Settings) for credentials and branch assignment.

![Screenshot: CMP — Edit Payment Gateway Providers for Stripe](/img/screenshots/cmp-payment-provider-stripe.png)

:::info[Supported currencies]

Before adding a currency, refer to the payment gateway documentation for supported currencies and minimum/maximum transaction limits: [Stripe supported currencies](https://docs.stripe.com/currencies).

:::

**Currencies**

*Required.* Select the currencies this provider record supports (for example, **USD**, **INR**). These are the currencies associated with Stripe at the Payment Provider level.

**Has Autocharge**

*Yes / No.* Enables postpaid auto-charge for Stripe in CMP. Set **Yes** when using Stripe for [postpaid](/billing/payment-modes/postpaid).

:::warning[Has Autocharge in CMP is not enough]

Enabling **Has Autocharge** only turns the feature on at the application layer. The payment gateway must also support autocharge **natively**.

**Stripe** supports automatic charging of saved credit cards for recurring payments with **variable amounts**. Postpaid auto-charge still requires **Has Autocharge** = **Yes** here.

If a provider does not support that capability natively, postpaid auto-charge will **not** work reliably even when **Has Autocharge** is set to **Yes**.

:::

**Upload Light Theme Logo**

*Optional.* Logo shown for Stripe in the light theme UI. Use **Browse a file** to upload.

**Upload Dark Theme Logo**

*Optional.* Logo shown for Stripe in the dark theme UI. Use **Browse a file** to upload.

**Status**

*Required.* **Active** or **Inactive**. Set **Active** when Stripe should be available as a payment provider.

## Configure Stripe

1. Confirm Stripe is configured under **Payment Gateway Providers** — see [above](#payment-gateway-providers)
2. Obtain **sandbox** (then live) keys from the Stripe Dashboard
3. Open **Settings → Billing Setup → Payment Setting** → add or edit **Stripe**
4. Assign **Branches**, enter keys, and set the flags below
5. Assign Stripe to each currency under **Currencies → Configure → Step 2** — see [Payment Gateways](/billing/payment-gateways/#2-assign-gateway-to-currency-mandatory)

### Edit Payment Gateway Settings (Stripe)

Form title: **Edit Payment Gateway Settings**

**Path:** **Settings → Billing Setup → Payment Setting** → edit **Stripe**

![Screenshot: CMP — Edit Payment Gateway Settings for Stripe](/img/screenshots/cmp-payment-setting.png)

**Payment Provider**

*Required.* Select **Stripe**.

**Branches**

*Required.* Assign Stripe to one or more branches (for example, **Stack Console**). The gateway is visible only for customers under those branches. See [branch visibility](/billing/payment-gateways/#1-payment-gateway-settings-branch-visibility).

**API Key**

*Required.* Stripe publishable / public key (for example, `pk_test_…` for sandbox or `pk_live_…` for production).

**API Secret**

*Required for live charging.* Stripe secret key (`sk_test_…` / `sk_live_…`) — keep confidential. Enter the value from the Stripe Dashboard; do not leave blank in production.

**Note**

*Optional.* Internal description (for example, `Stripe Payment Gateway Setting`).

**Disable On Registration**

*Optional.* If enabled, this gateway is **hidden on the self-registration form**. Admins can still use it while onboarding customers from the admin panel.

**Is Live**

*Yes / No.* Use **No** with sandbox / test credentials (`pk_test_…` / `sk_test_…`); set **Yes** only when using production keys.

**Has Save Card**

*Yes / No.* Whether customers can save a card for later charges. Set **Yes** for typical [postpaid](/billing/payment-modes/postpaid) flows.

**Is Default For Postpaid**

*Yes / No.* Whether Stripe is the default gateway for postpaid / saved-card charging on that branch. Set **Yes** when Stripe is your postpaid gateway.

### Currency limits (on the Stripe gateway form)

The Stripe edit form also includes a **per-currency** amount table. Before adding a currency, check Stripe’s supported currencies and limits: [Stripe supported currencies](https://docs.stripe.com/currencies).

:::tip[Also assign the currency in Currencies]

These rows set **min / max / auth** amounts for Stripe. You must still attach Stripe to each currency under **Currencies → Configure → Step 2** — see [currency assignment](/billing/payment-gateways/#2-assign-gateway-to-currency-mandatory).

:::

| Column | Description |
|---|---|
| **Currency** | Currency code (for example, **INR**, **USD**) |
| **Min. Amt.** | Minimum transaction amount for this currency |
| **Max. Amt.** | Maximum transaction amount for this currency |
| **Auth. Amt.** | Authorization / hold amount used when validating a card (for example, a small amount such as `1`) |

Example values (adjust to your business rules and Stripe limits):

| Currency | Min. Amt. | Max. Amt. | Auth. Amt. |
|---|---|---|---|
| **INR** | 1 | 100000 | 1 |
| **USD** | 1 | 100000 | 1 |

**Status**

*Active / Inactive.* Set **Active** when this Stripe configuration should be available for the assigned branches (subject to currency assignment).

## Testing

* Use Stripe **test mode** keys before go-live (`Is Live` = **No**)
* Test prepaid top-up and (if postpaid is enabled) save-card + invoice auto-charge
* If customers save cards, verify [delete saved card](#delete-saved-payment-card) on non-default Stripe cards

## Delete Saved Payment Card

Customers can remove **non-default** Stripe cards from **App → Billing → Payment Methods**.

:::note[Stripe only]

This feature is available only for payment methods saved through the **Stripe** payment gateway. Cards from other payment gateways cannot be deleted from this screen.

:::

### Where it appears

1. Go to **App → Billing → Payment Methods**
2. Open the **Credit Cards** tab
3. On each **non-default** Stripe card, a red **Delete** icon appears next to the default checkbox

![Screenshot: Billing — Payment Methods with Delete on a non-default Stripe card](/img/screenshots/cmp-payment-methods-delete-stripe-card.png)

### Visibility rules

The delete button is shown only when **all** of the following are true:

| Condition | Required |
|---|---|
| Card was saved through **Stripe** | Yes |
| User has permission to delete saved payment methods | Yes |
| Card is **not** the default payment method | Yes |
| Card is a valid saved card | Yes |

### Limitations

**Stripe only**

Delete is not supported for cards saved through non-Stripe gateways on this page.

**Default card cannot be deleted**

The default / primary card never shows a delete button. To remove it:

1. Set another card as default
2. Then delete the previous default card

**Single default remains protected**

If only one card exists and it is the default, delete is unavailable until another card is added and set as default.

**Scope**

This documents delete behaviour on the **Billing → Payment Methods** page only.

## Related
* [Payment Gateways](/billing/payment-gateways/)
* [Postpaid](/billing/payment-modes/postpaid)
* [Prepaid](/billing/payment-modes/prepaid)
* [Auto Pay](/platform-features/auto-pay)
* [Customer Billing Dashboard](/billing/customer-billing-dashboard/)
