---
sidebar_position: 2
title: "Prepaid Wallet System"
tags: ["billing"]
---

# Prepaid Wallet System

CMP's prepaid system requires customers to manually top up a wallet. Usage charges are deducted in real time from the wallet balance.

> CMP does **not** save credit cards for automatic charging in prepaid mode.

## How it works

### Wallet top-up

Customers manually enter the amount they want to add to their wallet and complete payment.

### Hourly services (PAYG)

* Usage is tracked in real time (hourly basis)
* Wallet balance reduces continuously during usage
* An invoice is generated at end of month for records — but the deduction has already occurred

**Example:**

* Wallet balance: ₹5,000
* VM cost: ₹10/hour
* VM runs 100 hours → ₹1,000 deducted → Wallet becomes ₹4,000
* Month-end invoice generated for ₹1,000

### Fixed-cycle services (monthly/yearly)

* Invoice is generated immediately on service creation
* Wallet balance is deducted instantly

**Example:**

* Wallet: ₹5,000 → Purchase monthly service at ₹3,000 → Wallet becomes ₹2,000

## Low balance handling

When wallet balance reaches zero or goes negative:

1. CMP sends a **notification alert** to the customer
2. Usage tracking continues; balance may go **negative**
3. When customer adds funds, the negative balance is automatically deducted first
4. Normal billing resumes after balance is restored

## Disciplinary actions

If the wallet remains negative beyond the configured grace period, CMP triggers **disciplinary actions** (warnings, service suspension, etc.) as configured in global settings.

See [Disciplinary / Freeze Actions](https://disciplinary-freeze-actions) for details.

## Pricing formula reference

| Formula | Description |
| --- | --- |
| `Hourly = Monthly / (30.5 × 24)` | Derive hourly from monthly |
| `Monthly = Hourly × (30.5 × 24)` | Derive monthly from hourly |
| `Yearly = Monthly × 12` | Derive yearly from monthly |

**Example:** Monthly = $30 → Hourly = 30 / 732 ≈ $0.041/hour → Yearly = $360