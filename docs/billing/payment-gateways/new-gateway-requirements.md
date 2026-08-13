---
sidebar_position: 2
title: "New Payment Gateway Requirements"
tags: ["billing", "payment-gateways", "integration", "prepaid", "postpaid"]
---

# New Payment Gateway Requirements

Use this checklist when requesting integration of a **new payment gateway** with StackConsole / CMP. Share as much as you can from the gateway’s documentation; StackConsole may ask for additional gateway-specific details during review.

:::tip[Share what you have]

If official documentation already lists currencies, limits, webhooks, or saved-card behaviour, share those links or excerpts. That speeds up assessment. StackConsole will still confirm anything that is missing or unclear.

:::

---

## Information to provide

### Documentation

**Documentation URL**

*Required when available.* Link to the gateway’s developer / API / integration docs (and merchant docs if relevant).

### Sandbox / test access

**Sandbox account details**

*Required for integration and testing.* Provide sandbox (or test-mode) credentials and how to access the sandbox dashboard — for example merchant ID, API keys, client ID/secret, login URL, and any IP whitelist notes.

### Payment methods to focus on

Some gateways support **many** payment options (cards, wallets, UPI, netbanking, local rails, and so on). CMP does **not** always integrate every method the provider offers.

**Payment methods required for this project**

*Required.* List the **specific** methods you need integrated (for example cards only, or cards + UPI). Methods outside that list can be deferred unless agreed with StackConsole.

:::info[Subset of methods]

Confirm with StackConsole which methods will be in scope for the first release. Supporting “all methods from the gateway” is usually not required.

:::

### Webhooks and callbacks

| Topic | What to confirm |
|---|---|
| **Webhook support** | Does the gateway support server-to-server webhooks / IPN for payment status? |
| **Callback / return URL** | Does the gateway support browser return / redirect callbacks after checkout? |
| **Docs / samples** | Links or samples for webhook payloads, signature verification, and retry behaviour |

### Currencies

**Supported currencies**

*Required.* List currencies the gateway already supports for your merchant account, **or** currencies you need StackConsole to add support for in CMP.

If a currency is new to CMP or to that gateway in your region, call it out explicitly.

### Amount limits

**Minimum and maximum amounts**

*Required when documented.* Per currency (or globally), what **min** and **max** transaction amounts does the gateway allow? CMP currency / gateway forms often store min, max, and auth amounts — see for example [Stripe currency limits](/billing/payment-gateways/stripe#currency-limits-on-the-stripe-gateway-form).

### Gateway-specific extras

**Anything else required by this gateway**

*Optional but important.* Examples: PCI / 3DS rules, settlement currency, mandatory KYC, regional licences, static IPs for callbacks, dual keys (public/secret), separate live vs sandbox endpoints, or product-specific IDs.

StackConsole may request additional details beyond this list once the gateway is reviewed.

---

## Prepaid and postpaid — gateway capability requirements

CMP has two online payment models that depend on what the gateway can do. **Postpaid is applicable only when the postpaid capabilities below are available.**

### Prepaid

For [prepaid](/billing/payment-modes/prepaid) wallet top-up, the gateway must support **customer-initiated payments** (checkout / redirect / embed) so customers can add funds.

Typical needs:

* Sandbox + live credentials
* Supported currencies and min/max amounts
* Webhook and/or callback so CMP can confirm successful top-ups
* Agreed payment methods (see above)

Saved card / recurring is **not** required for prepaid-only use (unless you also use [Auto Pay](/platform-features/auto-pay), which needs a saved payment method where supported).

### Postpaid — strict requirements

:::danger[Postpaid only if these are available]

**[Postpaid](/billing/payment-modes/postpaid) is applicable only if** the payment gateway natively supports **all** of the following:

1. **Save payment method** — store a card (or equivalent) for later charges
2. **Recurring / off-session payments** — charge that saved method **without** the customer being present
3. **Variable amount** — each charge can be a **different** amount (invoice totals change; fixed subscription amounts alone are **not** enough)

If the gateway cannot save a method and auto-charge **variable** amounts without user interaction, **do not plan postpaid** for that gateway. Use [prepaid](/billing/payment-modes/prepaid) and/or [manual](/billing/payment-modes/manual) instead.

Enabling **Has Autocharge** in CMP alone is **not** sufficient — the gateway must support this natively. See [Payment Gateways — postpaid](/billing/payment-gateways/#payment-modes-and-gateways) and [Postpaid](/billing/payment-modes/postpaid).

:::

| Capability | Required for postpaid? |
|---|---|
| Save payment method for later use | **Yes** |
| Auto-charge without customer interaction | **Yes** |
| Variable charge amounts (not fixed-only) | **Yes** |
| Prepaid-style one-off checkout only | **No** — not enough for postpaid |

Example: gateways documented as **prepaid only** (for example [SSLCommerz](/billing/payment-gateways/sslcommerz)) are **not** suitable for postpaid auto-charge.

---

## Checklist — new gateway request

Share with StackConsole when requesting a new integration:

### Common

- [ ] Documentation URL(s)
- [ ] Sandbox account / credentials (and how to access)
- [ ] Specific payment methods to integrate (not “everything the PG offers”)
- [ ] Webhook support confirmed (or documented as unavailable)
- [ ] Callback / return URL support confirmed
- [ ] Currencies supported **or** currencies that need new support
- [ ] Min / max amounts (per currency if applicable)
- [ ] Any other gateway-specific requirements noted

### Payment mode target

- [ ] **Prepaid** — one-off top-up / checkout methods agreed
- [ ] **Postpaid** — only if save method + off-session + **variable** amount is confirmed natively; otherwise mark postpaid as **N/A**

---

## After StackConsole integrates the gateway

Configure the gateway in CMP like any other provider:

1. **Payment Gateway Settings** — credentials, branches
2. **Currencies → Configure → Step 2** — assign to each currency
3. **Payment Provider** — set **Has Save Card** / **Has Autocharge** only when the gateway truly supports those capabilities

See [Payment Gateways](/billing/payment-gateways/) for visibility rules and the [go-live checklist](/billing/payment-gateways/#before-go-live-checklist).

---

## Related

* [Payment Gateways](/billing/payment-gateways/)
* [Prepaid](/billing/payment-modes/prepaid)
* [Postpaid](/billing/payment-modes/postpaid)
* [Manual](/billing/payment-modes/manual)
* [Stripe](/billing/payment-gateways/stripe) — example of a gateway commonly used for postpaid auto-charge
