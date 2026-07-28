---
sidebar_position: 1
title: "Payment Gateways"
tags: ["billing", "payment-gateways", "stripe", "razorpay"]
---

# Payment Gateways

A **payment gateway** is the provider CMP uses to collect payments — wallet top-ups ([prepaid](/billing/payment-modes/prepaid)), invoice settlement, and (where supported) **saved card / auto-charge** for [postpaid](/billing/payment-modes/postpaid).

Payment gateways are separate from **[payment modes](/billing/payment-modes/)** (prepaid, postpaid, manual). Manual mode does **not** use gateway auto-charge — customers pay offline.

**CMP paths:**

| Area | Path |
|---|---|
| **Payment Gateway Settings** | **Settings → Billing Setup → Payment Setting** — credentials, branch assignment, provider-specific options |
| **Currency → Payment Gateway** | **Settings → Billing Setup → Currencies → Configure** (Step 2) — **mandatory** assignment of gateways to each currency |
| **Payment Provider** | **Settings → Billing Setup → Payment Provider** — capability flags per gateway (document on each [gateway page](#pages-in-this-section)) |

:::tip[Quick start]

| Goal | Where |
|---|---|
| Configure a gateway and assign branches | [Payment Gateway Settings](#1-payment-gateway-settings-branch-visibility) |
| Make the gateway available for a currency | [Currency configuration](#2-assign-gateway-to-currency-mandatory) |
| Postpaid auto-charge | Gateway must **natively** support variable recurring card charges **and** **Has Autocharge** must be enabled in CMP (for example, [Stripe](/billing/payment-gateways/stripe)) |
| Sandbox credentials | Provide test/sandbox credentials when configuring each gateway (not an installation prerequisite) |

:::

:::warning[Two steps required for a gateway to appear]

Configuring credentials alone is **not** enough. A payment gateway is shown to customers only when **both** are true:

1. The gateway is **assigned to the customer’s branch** in **Payment Gateway Settings**
2. The gateway is **assigned to the currency** under **Currencies → Configure** (Step 2)

If either assignment is missing, the gateway stays **hidden** on registration, top-up, and payment screens.

:::

## How payment gateway visibility works

```
Payment Gateway Settings (credentials + branch)
        +
Currencies → Configure Step 2 (gateway linked to currency)
        ↓
Gateway appears for that branch + currency
```

| Control | CMP path | Effect |
|---|---|---|
| **Branch** | **Settings → Billing Setup → Payment Setting** | When you have **more than one branch**, assign each gateway to the branches where it should be available. Branch setup: [Branches](/billing/invoice-settings/branches) |
| **Currency** | **Settings → Billing Setup → Currencies → Configure → Step 2** | **Mandatory** — select which gateways customers can use for that currency |

:::info[Configuration workflow — current vs future]

Today, after you configure a payment gateway, you must **also** open **Currencies → Configure** and add the gateway for each currency. StackConsole plans to improve this into a single payment-gateway workflow later. Until then, complete **both** steps before testing payments.

:::

## 1. Payment Gateway Settings (branch visibility)

**Path:** **Settings → Billing Setup → Payment Setting** (breadcrumb: **Payment Gateway Settings**)

Use this screen to create or edit each gateway: provider credentials, **branch** assignment, and provider-specific options.

![Screenshot: CMP — Payment Gateway Settings with Edit Payment Gateway Settings for Stripe](/img/screenshots/cmp-payment-setting.png)

The listing shows configured gateways with columns such as **Name**, **Branches**, **Is Live**, **Has Save Card**, and **Disable On Registration**.

### Branch assignment

When editing a gateway, assign it under **Branches** to one or more branches (for example, **Stack Console**). Visibility is limited to customers under those branches.

:::warning[Gateway visible only when assigned to a branch]

A payment gateway is **visible only when it is assigned to a branch**. If **Branches** is empty or the customer’s branch is not selected, the gateway will **not** appear on self-registration, admin onboarding payment steps, or wallet top-up — even if credentials and currency assignment are correct.

When you have **more than one branch**, review branch assignment for every gateway you expect customers to use.

:::

### Provider-specific settings

Each payment gateway has its own:

* **Payment Gateway Settings** form fields (API keys, merchant IDs, flags)
* **Payment Provider** / **Edit Payment Gateway Providers** form fields (for example **Has Autocharge**, logos)

Document those on the gateway’s own page — for example [Stripe](/billing/payment-gateways/stripe), [Razorpay](/billing/payment-gateways/razorpay), or [PayPal](/billing/payment-gateways/paypal).

See also [Payment Modes — related billing setup](/billing/payment-modes/#related-billing-setup).

## 2. Assign gateway to currency (mandatory)

**Path:** **Settings → Billing Setup → Currencies → Configure** → **Step 2 – Configure Payment Gateway for Currency**

After a payment gateway exists under Payment Gateway Settings, you must attach it to each **currency** where customers should pay with it.

![Screenshot: CMP — Configure Currency Step 2 Manage Payment Gateway](/img/screenshots/cmp-currency-payment-gateway.png)

Wizard steps:

| Step | Name |
|---|---|
| 1 | **Edit Currency** |
| 2 | **Manage Payment Gateway** (current — assign providers) |
| 3 | **Success** |

**Payment Gateway Providers**

*Required.* Multi-select the gateways allowed for this currency (for example, **Stripe**). Use **+ Add Payment Gateway Provider** if you need to add another provider definition first.

Then click **Submit & Continue**.

:::warning[Currency assignment is mandatory]

Even after the gateway is configured and assigned to a branch, it will **not** be offered for payments in a currency until you add it on **Currencies → Configure → Step 2**.

Complete this for **every currency** that should accept online payments.

:::

## Payment modes and gateways

| Payment mode | How the gateway is used |
|---|---|
| **[Prepaid](/billing/payment-modes/prepaid)** | Customer tops up wallet through an active gateway for their branch + currency |
| **[Postpaid](/billing/payment-modes/postpaid)** | Saved card / auto-charge — gateway must **natively** support variable recurring card charges, and **Has Autocharge** must be enabled in CMP for that provider |
| **[Manual](/billing/payment-modes/manual)** | No gateway auto-charge; offline payment. Saving a card can auto-convert Manual → Postpaid |

:::warning[Postpaid gateway requirement]

Postpaid auto-charge requires **both**:

1. **Native gateway support** — the provider can charge saved cards for recurring payments with **variable amounts**
2. **CMP setting** — **Has Autocharge** enabled for that provider under **Settings → Billing Setup → Payment Provider**

Setting **Has Autocharge** alone is **not** sufficient. Payment Provider form fields are documented on each gateway page (for example, [Stripe — Payment Gateway Providers](/billing/payment-gateways/stripe#payment-gateway-providers)). See [Postpaid](/billing/payment-modes/postpaid).

:::

## Supported gateways

| Gateway | Hub page | Typical regions / notes |
|---|---|---|
| [Stripe](/billing/payment-gateways/stripe) | Cards, wallets; postpaid auto-charge common | Global |
| [AsiaPay](/billing/payment-gateways/asiapay) | Cards and local methods (region-dependent) | Asia |
| [HyperPay](/billing/payment-gateways/hyperpay) | Cards / MENA payment rails | Middle East / North Africa |
| [Authorize.net](/billing/payment-gateways/authorize-net) | Cards | North America (and others) |
| [M-Pesa](/billing/payment-gateways/m-pesa) | Mobile money | East Africa |
| [PayPal](/billing/payment-gateways/paypal) | PayPal checkout / accounts | Global |
| [Razorpay](/billing/payment-gateways/razorpay) | Cards, UPI, netbanking, wallets | India |
| [Mollie](/billing/payment-gateways/mollie) | Cards and European methods | Europe |
| [Dinger](/billing/payment-gateways/dinger) | Local payment methods | Myanmar / SEA |
| [Cardlink](/billing/payment-gateways/cardlink) | Cards | Greece / EU |
| [Paytm](/billing/payment-gateways/paytm) | Wallet, UPI, cards | India |
| [Payduniya](/billing/payment-gateways/payduniya) | Local payment methods | India / region-specific |

:::info[Confirm methods with StackConsole]

Some gateways expose many payment methods at the provider — CMP may integrate only a **subset**. Confirm supported methods and **autocharge** behaviour with **StackConsole** before go-live.

:::

## Before go-live checklist

* [ ] Sandbox credentials provided for each gateway you enable
* [ ] Gateway configured under **Payment Setting** with provider-specific credentials (see each [gateway page](#pages-in-this-section))
* [ ] Gateway **assigned to the correct branch(es)**
* [ ] Gateway **added for each currency** under **Currencies → Configure → Step 2**
* [ ] Postpaid default gateway used only if the gateway **natively** supports autocharge **and** **Has Autocharge** is enabled in CMP
* [ ] Test prepaid top-up and (if used) postpaid auto-charge in sandbox

## Pages in this section

* [Stripe](/billing/payment-gateways/stripe)
* [AsiaPay](/billing/payment-gateways/asiapay)
* [HyperPay](/billing/payment-gateways/hyperpay)
* [Authorize.net](/billing/payment-gateways/authorize-net)
* [M-Pesa](/billing/payment-gateways/m-pesa)
* [PayPal](/billing/payment-gateways/paypal)
* [Razorpay](/billing/payment-gateways/razorpay)
* [Mollie](/billing/payment-gateways/mollie)
* [Dinger](/billing/payment-gateways/dinger)
* [Cardlink](/billing/payment-gateways/cardlink)
* [Paytm](/billing/payment-gateways/paytm)
* [Payduniya](/billing/payment-gateways/payduniya)

## Related
* [Payment Modes](/billing/payment-modes/)
* [Billing Overview](/billing/overview)
