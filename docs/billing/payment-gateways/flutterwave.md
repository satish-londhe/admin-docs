---
sidebar_position: 15
title: "Flutterwave"
tags: ["billing", "payment-gateways", "flutterwave", "africa", "ngn"]
---

# Flutterwave

**Flutterwave** is an Africa-focused payment gateway supporting cards, USSD, bank, and bank transfer (availability depends on currency and merchant account configuration). In CMP it is used for **prepaid** wallet top-ups and checkout.

**Provider:** [flutterwave.com](https://flutterwave.com/)

:::tip[Quick start]

| | |
|---|---|
| **Best for** | African markets — especially **NGN** (Nigeria) prepaid payments |
| **Configure in CMP** | **Settings → Billing Setup → Payment Setting** / **Payment Provider** |
| **Payment modes** | **Prepaid only** — postpaid is **not** supported |
| **Webhook** | `https://<your-cmp-domain>/api/flutterwave/webhooks/transactions` |

:::

:::warning[Prepaid only — postpaid not available]

| Capability | Status |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** (wallet top-up / registration charge) | **Supported** |
| **[Postpaid](/billing/payment-modes/postpaid)** (saved card / invoice auto-charge) | **Not available (NA)** |
| **Has Autocharge** / variable recurring charges | **Not supported** — leave **Has Autocharge** = **No** |

Postpaid would require **NOAUTH** enabled on a Flutterwave merchant account. That capability is **not** available on the merchant accounts provided for CMP integrations. Proceed with **prepaid only**.

If you need postpaid auto-charge, use a gateway that natively supports it (for example [Stripe](/billing/payment-gateways/stripe)).

:::

## Payment modes and methods

| | Prepaid | Postpaid |
|---|---|---|
| **CMP support** | Supported | NA |
| **Checkout methods** (provided **NGN** merchant account) | Cards, USSD, Bank, Bank Transfer | — |

Postpaid would require **NOAUTH** on the Flutterwave merchant account — not available on accounts provided for CMP. Set **Has Autocharge** = **No**.

Methods are enabled on the **Flutterwave merchant account**, not toggled per method in CMP. Confirm the list with **StackConsole** before go-live.

See [Payment Gateways hub](/billing/payment-gateways/).

## Limitations and restrictions

* The provided merchant account has **Card**, **USSD**, **Bank**, and **Bank Transfer** enabled for **NGN** currency.
* Flutterwave has **no payment-methods API** — CMP cannot programmatically list or filter methods beyond what the merchant account exposes at checkout.
* **Minimum and maximum transaction amounts differ by payment method.** Amounts below have been tested in CMP:

| Payment method | Minimum amount | Maximum amount |
|---|---|---|
| **Card** | 0.1 | 1,000,000 |
| **USSD** | 0.1 | 1,000,000 |
| **Bank** | 200 | 1,000,000 |
| **Bank Transfer** | 1 | 1,000,000 |

## Supported currencies and countries

Flutterwave supports many currencies globally. Typical options by region:

| Country / region | Currency code | Common payment options |
|---|---|---|
| Nigeria | **NGN** | card, ussd, banktransfer, account, internetbanking, nqr, enaira, opay |
| United States | **USD** | card, account |
| Europe | **EUR** | card, account |
| United Kingdom | **GBP** | card, account |
| Ghana | **GHS** | card, ghanamobilemoney |
| Francophone Africa (Central) | **XAF** | card, mobilemoneyxof |
| Francophone Africa (West) | **XOF** | card, mobilemoneyxaf |
| South Africa | **ZAR** | card, account, 1voucher |
| Malawi | **MWK** | card, mobilemoneymalawi |
| Kenya | **KES** | card, mpesa |
| Uganda | **UGX** | card, mobilemoneyuganda |
| Rwanda | **RWF** | card, mobilemoneyrwanda |
| Tanzania | **TZS** | card, mobilemoneytanzania |
| Egypt | **EGP** | card, fawrypay |

:::info[Currency assignment is mandatory]

Assign Flutterwave to each currency under **Settings → Billing Setup → Currencies → Configure → Step 2**. The gateway stays hidden until branch **and** currency assignment are complete. See [currency assignment](/billing/payment-gateways/#2-assign-gateway-to-currency-mandatory).

:::

## Configure Flutterwave in CMP

1. Obtain **sandbox** (then live) API credentials from the Flutterwave Dashboard
2. Open **Settings → Billing Setup → Payment Setting** → add or edit **Flutterwave**
3. Assign **Branches**, enter credentials, and set **Is Live** as appropriate
4. Under **Payment Provider**, keep **Has Autocharge** = **No**
5. Assign Flutterwave to each currency under **Currencies → Configure → Step 2**
6. Register the **webhook URL** in the Flutterwave Dashboard — see [Webhook setup](#webhook-setup)

### Edit Payment Gateway Settings

**Path:** **Settings → Billing Setup → Payment Setting** → edit **Flutterwave**

img/screenshots/cmp-payment-gateway-flutterwave.png

![Screenshot: CMP — Edit Payment Gateway Settings for Flutterwave](/img/screenshots/placeholder.png)

**Payment Provider**

*Required.* Select **Flutterwave**.

**Branches**

*Required.* Assign to one or more branches. The gateway is visible only for customers under those branches. See [branch visibility](/billing/payment-gateways/#1-payment-gateway-settings-branch-visibility).

**API credentials**

*Required.* Enter the Flutterwave public key and secret key from the merchant dashboard (sandbox vs live). Keep secrets confidential.

**Note**

*Optional.* Internal description (for example, `Flutterwave NGN prepaid`).

**Disable On Registration**

*Optional.* If enabled, this gateway is **hidden on the self-registration form**. Admins can still use it while onboarding customers from the admin panel.

**Is Live**

*Required when going to production.* Use sandbox credentials with **Is Live** off for testing; switch to live credentials for production.

### Payment Gateway Providers

**Path:** **Settings → Billing Setup → Payment Provider**

Form title: **Edit Payment Gateway Providers**

img/screenshots/cmp-payment-provider-flutterwave.png

![Screenshot: CMP — Payment Provider settings for Flutterwave](/img/screenshots/placeholder.png)

**Currencies**

*Required.* Include each currency Flutterwave should serve (for example **NGN**).

**Has Autocharge**

*Required.* Set to **No**. Flutterwave is **prepaid only** in CMP.

**Status**

*Required.* **Active** or **Inactive**.

## Webhook setup

Register the CMP webhook URL in the Flutterwave Dashboard to receive transaction notifications:

```text
https://<your-cmp-domain>/api/flutterwave/webhooks/transactions
```

Example:

```text
https://api.example.com/api/flutterwave/webhooks/transactions
```

The endpoint must be publicly reachable over **HTTPS** without authentication prompts or blocking redirects.

## API documentation

Provider reference (Flutterwave v3):

* [Flutterwave Standard](https://developer.flutterwave.com/v3.0/docs/flutterwave-standard-1)
* [Authentication](https://developer.flutterwave.com/v3.0/docs/authentication)
* [Checkout](https://developer.flutterwave.com/v3.0/reference/checkout)
* [Verify transaction](https://developer.flutterwave.com/v3.0/reference/verify-transaction)
* [Verify transaction with tx_ref](https://developer.flutterwave.com/v3.0/reference/verify-transaction-with-tx_ref)
* [Webhooks](https://developer.flutterwave.com/v3.0/docs/webhooks)
* [Transaction verification](https://developer.flutterwave.com/v3.0/docs/transaction-verification)

## Testing credentials (sandbox)

Use these only in **sandbox / test** checkout — never in production.

### Test card

| Field | Value |
|---|---|
| **Card number** | `5531 8866 5214 2950` |
| **Expiry** | `09/32` |
| **CVV** | `564` |
| **PIN** | `3310` |
| **OTP** | `12345` or `123456` |
| **Card holder name** | Any name |

Additional test cards: [Flutterwave test cards](https://developer.flutterwave.com/v2.0/docs/test-cards)

### Bank, USSD, and bank transfer

For non-card methods, select the bank from the Flutterwave checkout page. A **virtual account number** is generated that can be used to complete the payment in sandbox.

## Before go-live checklist

* [ ] Sandbox prepaid top-up tested (card and, if needed, bank/USSD methods)
* [ ] Webhook URL registered: `https://<your-cmp-domain>/api/flutterwave/webhooks/transactions`
* [ ] Gateway assigned to the correct **branch(es)**
* [ ] Gateway assigned to each currency under **Currencies → Configure → Step 2**
* [ ] **Has Autocharge** = **No**; postpaid default is a different gateway (or unused)
* [ ] Live credentials and **Is Live** set only after sandbox verification
* [ ] Transaction min/max limits validated for each payment method you offer

## Related

* [Payment Gateways](/billing/payment-gateways/)
* [Payment Modes](/billing/payment-modes/)
* [Prepaid](/billing/payment-modes/prepaid)
* [Flutterwave Developer Docs](https://developer.flutterwave.com/)
