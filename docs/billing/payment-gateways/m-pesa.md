---
sidebar_position: 6
title: "M-Pesa"
tags: ["billing", "payment-gateways", "m-pesa"]
---

# M-Pesa

**M-Pesa** is a mobile-money payment method widely used in East Africa. CMP can accept M-Pesa payments when the gateway is enabled for the branch and currency.

**Provider:** [m-pesa.africa](https://www.m-pesa.africa/)

:::tip[Quick start]

| | |
|---|---|
| **Configure in CMP** | **Settings → Billing Setup → Payment Setting** / **Payment Provider** |
| **Sandbox** | Provide Daraja / M-Pesa API sandbox credentials (configure in CMP Payment Gateway Settings) |
| **Payment modes** | Typically **prepaid** wallet top-up; postpaid card auto-charge is usually not applicable |

:::

## What M-Pesa is used for in CMP

| Mode | Behaviour |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** | Customer pays wallet top-up via M-Pesa when offered |
| **[Postpaid](/billing/payment-modes/postpaid)** | Confirm with StackConsole — M-Pesa is generally not a saved-card autocharge rail |
| **[Manual](/billing/payment-modes/manual)** | Offline settlement outside M-Pesa in CMP |

See [Payment Gateways hub](/billing/payment-gateways/).

## Configure M-Pesa

1. Obtain M-Pesa / Safaricom **Daraja** (or partner) sandbox credentials
2. Provide credentials to StackConsole
3. Enable M-Pesa under **Payment Setting**
4. Configure **Payment Provider** — see [Payment Gateway Providers](#payment-gateway-providers)


### Edit Payment Gateway Settings fields

Each gateway has its own CMP form fields. Field details for this provider will be documented here when confirmed from the CMP UI / StackConsole.

Until then:

1. Configure the gateway under **Settings → Billing Setup → Payment Setting**
2. Assign **Branches** — see [branch visibility](/billing/payment-gateways/#1-payment-gateway-settings-branch-visibility)
3. Assign the gateway to each currency — see [currency assignment](/billing/payment-gateways/#2-assign-gateway-to-currency-mandatory)

img/screenshots/cmp-payment-gateway-m-pesa.png

![Screenshot: CMP — Edit Payment Gateway Settings for this provider](/img/screenshots/placeholder.png)



### Payment Gateway Providers

**Path:** **Settings → Billing Setup → Payment Provider**

Form title: **Edit Payment Gateway Providers**

**Path:** **Settings → Billing Setup → Payment Provider** (breadcrumb: **Payment Gateway Providers**)

Configure this provider’s currencies, **Has Autocharge**, logos, and status. Field details will be expanded when confirmed from the CMP UI.

img/screenshots/cmp-payment-provider-m-pesa.png

![Screenshot: CMP — Payment Provider settings for this gateway](/img/screenshots/placeholder.png)

**Has Autocharge**

*Yes / No* (when applicable). Enables postpaid auto-charge for this provider in CMP.

:::warning[Has Autocharge in CMP is not enough]

Enabling **Has Autocharge** only turns the feature on at the application layer. The payment gateway must also support autocharge **natively** — typically automatic charging of saved credit cards for recurring payments with **variable amounts**.

Confirm native support with the gateway vendor and **StackConsole** before using this gateway as a postpaid default. See [Payment Gateways — postpaid requirement](/billing/payment-gateways/#payment-modes-and-gateways).

:::

## Related
* [Payment Gateways](/billing/payment-gateways/)
* [Prepaid](/billing/payment-modes/prepaid)
