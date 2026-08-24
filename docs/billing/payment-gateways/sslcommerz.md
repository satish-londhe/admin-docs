---
sidebar_position: 14
title: "SSLCommerz"
tags: ["billing", "payment-gateways", "sslcommerz", "bangladesh", "bdt"]
---

# SSLCommerz

**SSLCommerz** (SSLCOMMERZ) is a Bangladesh payment gateway aggregator. In CMP it is used for **prepaid** wallet top-ups and checkout in **BDT**.

**Provider:** [sslcommerz.com/payment-gateway](https://sslcommerz.com/payment-gateway/)

:::tip[Quick start]

| | |
|---|---|
| **Best for** | Bangladesh / BDT prepaid payments |
| **Configure in CMP** | **Settings → Billing Setup → Payment Setting** / **Payment Provider** |
| **Currency** | **BDT** (assign under Currencies → Configure) |
| **Payment modes** | **Prepaid only** — postpaid is **not** supported |

:::

:::warning[Limitations — read before enabling]

SSLCommerz in CMP has hard limits. Do **not** enable it as a postpaid or auto-charge gateway.

| Capability | Status |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** (wallet top-up / registration charge) | **Supported** |
| **[Postpaid](/billing/payment-modes/postpaid)** (saved card / invoice auto-charge) | **Not available (NA)** |
| **Has Autocharge** / variable recurring charges | **Not supported** — leave **Has Autocharge** = **No** |
| **[Manual](/billing/payment-modes/manual)** offline settlement | No SSLCommerz auto-charge (manual stays offline) |
| **Currency** | Configure and assign for **BDT** |

If you need postpaid auto-charge, use a gateway that natively supports it (for example [Stripe](/billing/payment-gateways/stripe)).

:::

## Supported payment modes at CMP

| Payment mode | Support |
|---|---|
| **Prepaid** | Supported |
| **Postpaid** | NA |

## What SSLCommerz is used for in CMP

| Mode | Behaviour |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** | Customer pays via SSLCommerz at wallet top-up / checkout; IPN confirms the payment |
| **[Postpaid](/billing/payment-modes/postpaid)** | **Not supported** — do not set SSLCommerz as a postpaid default gateway |
| **[Manual](/billing/payment-modes/manual)** | Offline payment — no SSLCommerz auto-charge |

See [Payment Gateways hub](/billing/payment-gateways/).

## CMP currency and amount limits

Assign SSLCommerz to **BDT** under **Settings → Billing Setup → Currencies → Configure → Step 2**.

| Setting | Value |
|---|---|
| **Currency (gateway setting)** | **BDT** |
| **Min Validation Amount** | `0.1` |
| **Min Transaction Amount** | `0.1` |
| **Max Transaction Amount** | `1000000` |

:::info[Currency assignment is mandatory]

After credentials and branch assignment, add SSLCommerz on **Currencies → Configure → Step 2** for **BDT**. Otherwise the gateway stays hidden. See [currency assignment](/billing/payment-gateways/#2-assign-gateway-to-currency-mandatory).

:::

## Configure SSLCommerz in CMP

1. Obtain **sandbox** (then live) store credentials from the [SSLCommerz merchant panel](https://sandbox.sslcommerz.com/manage) / live dashboard
2. Open **Settings → Billing Setup → Payment Setting** → add or edit **SSLCommerz**
3. Assign **Branches**, enter store ID / credentials, and set **Is Live** as appropriate
4. Under **Payment Provider**, keep **Has Autocharge** = **No**
5. Assign SSLCommerz to **BDT** under **Currencies → Configure → Step 2**
6. Configure the **IPN / webhook** URL in the SSLCommerz panel (required for reliable payment confirmation) — see [Webhook (IPN) setup](#webhook-ipn-setup)

### Edit Payment Gateway Settings

**Path:** **Settings → Billing Setup → Payment Setting** → edit **SSLCommerz**

img/screenshots/cmp-payment-gateway-sslcommerz.png

![Screenshot: CMP — Edit Payment Gateway Settings for SSLCommerz](/img/screenshots/placeholder.png)

**Payment Provider**

*Required.* Select **SSLCommerz**.

**Branches**

*Required.* Assign to one or more branches. The gateway is visible only for customers under those branches. See [branch visibility](/billing/payment-gateways/#1-payment-gateway-settings-branch-visibility).

**Store / API credentials**

*Required.* Enter the SSLCommerz store ID and authentication credentials from the merchant panel (sandbox vs live). Keep secrets confidential.

**Note**

*Optional.* Internal description (for example, `SSLCommerz BDT prepaid`).

**Disable On Registration**

*Optional.* If enabled, this gateway is **hidden on the self-registration form**. Admins can still use it while onboarding customers from the admin panel.

**Is Live**

*Required when going to production.* Use sandbox credentials with **Is Live** off for testing; switch to live credentials for production.

### Payment Gateway Providers

**Path:** **Settings → Billing Setup → Payment Provider**

Form title: **Edit Payment Gateway Providers**

img/screenshots/cmp-payment-provider-sslcommerz.png

![Screenshot: CMP — Payment Provider settings for SSLCommerz](/img/screenshots/placeholder.png)

**Currencies**

*Required.* Include **BDT**.

**Has Autocharge**

*Required.* Set to **No**. SSLCommerz is **prepaid only** in CMP; enabling autocharge will not make postpaid work.

**Status**

*Required.* **Active** or **Inactive**.

## Webhook (IPN) setup

SSLCommerz sends an **Instant Payment Notification (IPN)** to CMP so the wallet/order can be updated even if the customer’s browser does not return to the site after payment.

### Steps

1. Log in to the SSLCommerz merchant panel:
   - Sandbox: [https://sandbox.sslcommerz.com/manage](https://sandbox.sslcommerz.com/manage)
   - Live: use your production merchant panel URL from SSLCommerz
2. Open **My Stores → IPN Setting** (IPN Settings)
3. Enable **Enable HTTP Listener**
4. Set the webhook URL to your CMP API IPN endpoint:

```text
https://<CMP_API_URL>/api/sslcommerz/ipn
```

Example (API served under a `/backend` base path):

```text
https://cmp.example.com/backend/api/sslcommerz/ipn
```

5. Click **Save**

![Screenshot: SSLCommerz Testbox Panel — IPN Settings with HTTP listener enabled](/img/screenshots/sslcommerz-ipn-settings.png)

:::note[IPN payload]

SSLCommerz posts payment parameters to the listener (for example `amount`, `bank_tran_id`, `card_brand`, `status=VALID`, and related fields). CMP validates and applies the prepaid credit / order update from this callback.

:::

### IPN listener requirements

- The listener must be publicly reachable over **HTTP/HTTPS** on standard ports **80** or **443**
- The endpoint must be reachable from the public internet **without** authentication prompts or blocking redirects
- Whitelist SSLCommerz source IPs on your network firewall (see below)

### Sandbox / Dev environment (firewall)

| Direction | Requirement |
|---|---|
| **Inbound** | Allow TCP **80** or **443** so SSLCommerz can reach the **Dev VM** / sandbox CMP API (IPN listener) |
| **Outbound** | Allow TCP **443** from the **Dev VM** to SSLCommerz sandbox endpoints |

### Live (production) environment (firewall)

| Direction | Requirement |
|---|---|
| **Inbound** | Allow TCP **80** or **443** so SSLCommerz can reach the **Prod Backend VM** (IPN listener) |
| **Outbound** | Allow TCP **443** from the **Prod Backend VM** to SSLCommerz live endpoints |

Use the current SSLCommerz source IP allowlist from the merchant panel / [SSLCommerz docs](https://sslcommerz.com/payment-gateway/) when configuring the firewall — do not hard-code IPs in runbooks; they can change.

## Testing credentials (sandbox)

Use these only in the **sandbox** panel / test checkout — never in production.

| Field | Value |
|---|---|
| **Card number** | `4111 1111 1111 1111` |
| **Expiry** | `12/27` |
| **CVV** | `123` |
| **Card holder name** | Any name |
| **OTP** | `111111` or `123456` |

## Before go-live checklist

* [ ] Sandbox top-up tested with the card credentials above
* [ ] IPN enabled; URL points to `https://<CMP_API_URL>/api/sslcommerz/ipn`
* [ ] Firewall allows SSLCommerz ↔ **Dev VM** (sandbox) and **Prod Backend VM** (live) on ports 80/443 as required
* [ ] Gateway assigned to the correct **branch(es)**
* [ ] Gateway assigned to **BDT** under Currencies → Configure
* [ ] **Has Autocharge** = **No**; postpaid default is a different gateway (or unused)
* [ ] Live store credentials and **Is Live** set only after sandbox verification

## Related

* [Payment Gateways](/billing/payment-gateways/)
* [Payment Modes](/billing/payment-modes/)
* [Prepaid](/billing/payment-modes/prepaid)
* [SSLCOMMERZ Payment Gateway](https://sslcommerz.com/payment-gateway/)
