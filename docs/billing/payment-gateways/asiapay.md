---
sidebar_position: 3
title: "AsiaPay"
tags: ["billing", "payment-gateways", "asiapay"]
---

# AsiaPay

**AsiaPay** is a regional payment gateway used with CMP for customer payments (methods depend on your AsiaPay merchant configuration and CMP integration).

**Provider:** [asiapay.com](https://www.asiapay.com/)

:::tip[Quick start]

| | |
|---|---|
| **Configure in CMP** | **Settings → Billing Setup → Payment Setting** / **Payment Provider** |
| **Sandbox** | Provide sandbox credentials at install — [Prerequisites](/installation/prerequisites#payment-gateways) |
| **Payment modes** | Typically prepaid top-up; confirm autocharge with StackConsole before enabling postpaid |

:::

## What AsiaPay is used for in CMP

| Mode | Behaviour |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** | Customer can select AsiaPay for wallet top-up when the gateway is active for the currency |
| **[Postpaid](/billing/payment-modes/postpaid)** | Only if the provider is configured with **Has Autocharge** and supports variable recurring card charges |
| **[Manual](/billing/payment-modes/manual)** | No gateway auto-charge for offline settlement |

See [Payment Gateways hub](/billing/payment-gateways/).

## Configure AsiaPay

1. Obtain AsiaPay **sandbox** merchant credentials (then live)
2. Provide credentials to StackConsole for CMP configuration
3. Enable AsiaPay under **Settings → Billing Setup → Payment Setting**
4. Configure **Payment Provider** — see [Payment Gateway Providers](#payment-gateway-providers)


### Edit Payment Gateway Settings fields

Each gateway has its own CMP form fields. Field details for this provider will be documented here when confirmed from the CMP UI / StackConsole.

Until then:

1. Configure the gateway under **Settings → Billing Setup → Payment Setting**
2. Assign **Branches** — see [branch visibility](/billing/payment-gateways/#1-payment-gateway-settings-branch-visibility)
3. Assign the gateway to each currency — see [currency assignment](/billing/payment-gateways/#2-assign-gateway-to-currency-mandatory)

img/screenshots/cmp-payment-gateway-asiapay.png

![Screenshot: CMP — Edit Payment Gateway Settings for this provider](/img/screenshots/placeholder.png)



### Payment Gateway Providers

**Path:** **Settings → Billing Setup → Payment Provider**

Form title: **Edit Payment Gateway Providers**

**Path:** **Settings → Billing Setup → Payment Provider** (breadcrumb: **Payment Gateway Providers**)

Configure this provider’s currencies, **Has Autocharge**, logos, and status. Field details will be expanded when confirmed from the CMP UI.

img/screenshots/cmp-payment-provider-asiapay.png

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
* [Prerequisites — Payment Gateways](/installation/prerequisites#payment-gateways)
