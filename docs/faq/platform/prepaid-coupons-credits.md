---
sidebar_position: 3
title: "Prepaid, coupons & credits"
tags: ["faq", "platform", "billing", "prepaid", "coupons"]
---

# Prepaid, coupons & credits

Wallet top-up, free credits, coupons, and free trial. Product guide: [Prepaid](/billing/payment-modes/prepaid).

## How does the prepaid system work?

CMP prepaid uses a **wallet**. Customers top up manually through a configured payment gateway — CMP does **not** store cards for automatic prepaid top-up the way some postpaid autocharge flows do.

### Wallet top-up

1. Customer chooses an amount and pays via the gateway  
2. Wallet balance increases  
3. Service charges are deducted from the wallet  

### Hourly (pay-as-you-go) services

* Usage is metered continuously  
* Wallet balance decreases as usage accrues  
* Month-end invoice is mainly for reporting; money was already taken from the wallet during usage  

**Example:** Wallet ₹5,000; VM ₹10/hour; 100 hours → ₹1,000 deducted → wallet ₹4,000; month-end invoice shows ₹1,000 already settled from wallet.

### Monthly / yearly (and similar) cycles

Invoice is generated at **purchase or renewal**, and the wallet is deducted **immediately**.

**Example:** Wallet ₹5,000; monthly package ₹3,000 → invoice ₹3,000 at buy time → wallet ₹2,000.

### Low / zero / negative balance

* CMP notifies the customer when balance is low or exhausted  
* Usage may continue and the wallet can go **negative** until funds are added  
* New top-ups first clear the negative outstanding amount  
* If the wallet stays negative past the configured **grace period**, [disciplinary actions](/billing/payment-modes/prepaid#disciplinary-actions) can run  

## Is there a way to add free credits without coupons? Can credits never expire?

Today, **coupons** are the supported way to grant free credits.

* There is **no** separate “never expire” credit type  
* Coupons **require** an expiry date  

**Workaround for long-lived credit:** create a coupon with a long validity (for example 1000–2000 days).

## Can we allow a free trial only for specific customers?

Free trial on packages is **global** (not per customer). For selected customers, issue a **free-credit coupon** instead.

## Once a coupon is applied, is the discount on every billing cycle or only the first?

Only the **first** billing cycle. After redemption, later cycles charge the normal price.

## While the coupon is valid, does “use once” limit the client to a single purchase?

Yes — **use once** means the coupon is consumed on the first qualifying purchase (for example one VM). It cannot be reused for another VM after it is consumed.

## Once the coupon expires, what happens on following billing cycles?

Expired coupons cannot be applied. Services renew or bill at the **standard package price** with no coupon discount.

## How do free credits work on manual accounts?

On **manual** payment mode, free credit is **not** always auto-applied to invoices the way prepaid wallet flows behave.

* Free credit has a validity window (for example 20 days or 1 month)  
* Manual invoices often generate on a schedule (for example the 1st); if credit expires before payment, it may no longer apply automatically  
* At payment time, apply free credit **manually**, or as admin apply it when marking the invoice **Paid**  

## If Sales sells under a fixed package, can account-level pricing stay consistent for manual and prepaid?

Use the same **rate card packages** and account payment mode setup so list pricing stays consistent. Account-specific overrides (if used in your deployment) should be validated on staging before relying on them for Sales deals. Changing billing later at renewal should be tested on staging for your CMP version before promising automatic package switches.
