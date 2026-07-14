---
sidebar_position: 10
title: "Dinger"
tags: ["billing", "payment-gateways", "dinger"]
---

# Dinger

**Dinger** is a regional payment gateway (Myanmar / Southeast Asia focus) that CMP can enable for local payment methods supported by your merchant account.

**Provider:** [dinger.asia](https://dinger.asia/)

:::tip[Quick start]

| | |
|---|---|
| **Configure in CMP** | **Settings → Billing Setup → Payment Setting** / **Payment Provider** |
| **Sandbox** | Provide Dinger sandbox API credentials — [Prerequisites](/installation/prerequisites#payment-gateways) |
| **Payment modes** | Typically prepaid top-up; confirm postpaid with StackConsole |

:::

## What Dinger is used for in CMP

| Mode | Behaviour |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** | Wallet top-up when Dinger is active |
| **[Postpaid](/billing/payment-modes/postpaid)** | Confirm **Has Autocharge** support with StackConsole |
| **[Manual](/billing/payment-modes/manual)** | Offline payment — no Dinger auto-charge |

See [Payment Gateways hub](/billing/payment-gateways/).

## Configure Dinger

1. Obtain Dinger **sandbox** merchant / API credentials
2. Provide credentials to StackConsole
3. Enable Dinger under **Payment Setting**
4. Configure **Payment Provider** — see [Payment Gateway Providers](#payment-gateway-providers)


### Edit Payment Gateway Settings fields

Each gateway has its own CMP form fields. Field details for this provider will be documented here when confirmed from the CMP UI / StackConsole.

Until then:

1. Configure the gateway under **Settings → Billing Setup → Payment Setting**
2. Assign **Branches** — see [branch visibility](/billing/payment-gateways/#1-payment-gateway-settings-branch-visibility)
3. Assign the gateway to each currency — see [currency assignment](/billing/payment-gateways/#2-assign-gateway-to-currency-mandatory)

img/screenshots/cmp-payment-gateway-dinger.png

![Screenshot: CMP — Edit Payment Gateway Settings for this provider](/img/screenshots/placeholder.png)



### Payment Gateway Providers

**Path:** **Settings → Billing Setup → Payment Provider**

Form title: **Edit Payment Gateway Providers**

**Path:** **Settings → Billing Setup → Payment Provider** (breadcrumb: **Payment Gateway Providers**)

Configure this provider’s currencies, **Has Autocharge**, logos, and status. Field details will be expanded when confirmed from the CMP UI.

img/screenshots/cmp-payment-provider-dinger.png

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
