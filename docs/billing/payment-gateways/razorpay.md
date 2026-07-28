---
sidebar_position: 8
title: "Razorpay"
tags: ["billing", "payment-gateways", "razorpay"]
---

# Razorpay

**Razorpay** is an India-focused payment gateway supporting cards, UPI, netbanking, and wallets (availability depends on CMP integration). Use it when customers pay in supported Indian currencies.

**Provider:** [razorpay.com](https://razorpay.com/)

:::tip[Quick start]

| | |
|---|---|
| **Configure in CMP** | **Settings → Billing Setup → Payment Setting** / **Payment Provider** |
| **Sandbox** | Provide Key ID / Key Secret from Razorpay Dashboard (configure in CMP Payment Gateway Settings) |
| **Payment modes** | Prepaid top-up common; confirm postpaid autocharge with StackConsole |

:::

## What Razorpay is used for in CMP

| Mode | Behaviour |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** | Wallet top-up via Razorpay checkout when enabled |
| **[Postpaid](/billing/payment-modes/postpaid)** | Only if saved-card / recurring (variable) charging is supported in your CMP build |
| **[Manual](/billing/payment-modes/manual)** | Offline payment — no Razorpay auto-charge |

See [Payment Gateways hub](/billing/payment-gateways/).

## Configure Razorpay

1. Create a Razorpay **test** mode key pair
2. Provide Key ID and Key Secret to StackConsole
3. Enable Razorpay under **Payment Setting**
4. Configure **Payment Provider** — see [Payment Gateway Providers](#payment-gateway-providers)


### Edit Payment Gateway Settings fields

Each gateway has its own CMP form fields. Field details for this provider will be documented here when confirmed from the CMP UI / StackConsole.

Until then:

1. Configure the gateway under **Settings → Billing Setup → Payment Setting**
2. Assign **Branches** — see [branch visibility](/billing/payment-gateways/#1-payment-gateway-settings-branch-visibility)
3. Assign the gateway to each currency — see [currency assignment](/billing/payment-gateways/#2-assign-gateway-to-currency-mandatory)

img/screenshots/cmp-payment-gateway-razorpay.png

![Screenshot: CMP — Edit Payment Gateway Settings for this provider](/img/screenshots/placeholder.png)



### Payment Gateway Providers

**Path:** **Settings → Billing Setup → Payment Provider**

Form title: **Edit Payment Gateway Providers**

**Path:** **Settings → Billing Setup → Payment Provider** (breadcrumb: **Payment Gateway Providers**)

Configure this provider’s currencies, **Has Autocharge**, logos, and status. Field details will be expanded when confirmed from the CMP UI.

img/screenshots/cmp-payment-provider-razorpay.png

![Screenshot: CMP — Payment Provider settings for this gateway](/img/screenshots/placeholder.png)

**Has Autocharge**

*Yes / No* (when applicable). Enables postpaid auto-charge for this provider in CMP.

:::warning[Has Autocharge in CMP is not enough]

Enabling **Has Autocharge** only turns the feature on at the application layer. The payment gateway must also support autocharge **natively** — typically automatic charging of saved credit cards for recurring payments with **variable amounts**.

Confirm native support with the gateway vendor and **StackConsole** before using this gateway as a postpaid default. See [Payment Gateways — postpaid requirement](/billing/payment-gateways/#payment-modes-and-gateways).

:::

## Related
* [Payment Gateways](/billing/payment-gateways/)
* [Payment Modes](/billing/payment-modes/)
