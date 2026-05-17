---
sidebar_position: 1
title: "Billing Models Overview"
tags: ["billing"]
---

# Billing Models Overview

CMP supports multiple billing models that can be configured per provider and per service type.

## Available billing cycles

| Cycle | Description | Invoice timing |
| --- | --- | --- |
| **Hourly (PAYG)** | Charged per hour of actual usage | End of month |
| **Monthly** | Fixed charge for the calendar period from creation date | Immediately on creation |
| **Quarterly** | Fixed charge for a 3-month period | Immediately on creation |
| **Yearly** | Fixed charge for 12 months | Immediately on creation |

## Services with mandatory hourly billing

The following service types **always use hourly billing** and cannot be switched to fixed cycles:

* `VM_SNAPSHOT`
* `BS_SNAPSHOT`
* `BACKUP`
* `BS_BACKUP`
* `BANDWIDTH`
* `ACCOUNT_TEMPLATE`
* `ISO`

## Account types

| Type | Description |
| --- | --- |
| **Prepaid** | Customer tops up a wallet; usage is deducted in real time |
| **Postpaid** | Usage is tracked and invoiced at period end; card can be auto-charged |

> ⚠️ If a prepaid customer adds a credit card, the account may automatically convert to postpaid mode. This means any unpaid invoices can be auto-charged via the card (e.g. Stripe).

## Related pages

* [Pay-As-You-Go (Hourly)](https://pay-as-you-go-hourly)
* [Fixed Billing Cycles](https://fixed-billing-cycles)
* [Prepaid Wallet System](https://prepaid-wallet-system)
* [Invoice Generation](https://invoice-generation)