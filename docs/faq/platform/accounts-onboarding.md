---
sidebar_position: 7
title: "Accounts & onboarding"
tags: ["faq", "platform", "accounts", "onboarding"]
---

# Accounts & onboarding

## The client account exists but the user cannot log in and status stays Pending. Is there an approval dashboard?

There is no separate “blocked by limit” registration trap by default. **Pending** means required onboarding conditions are incomplete, or **manual registration** is waiting on admin action.

### Pending until these are complete (typical)

* Payment method not added (when required by mode)  
* Email not verified  
* KYC enabled and not yet approved  
* Terms and Conditions not accepted — see [Terms and Conditions](/platform-features/terms-and-conditions/) and [Enforce](/platform-features/terms-and-conditions/enforce)

### Manual registration / manual onboarding

When registration uses **manual** workflow:

* Request is submitted for **admin review**  
* Admin must mark the account **active** or **rejected**  
* Payments are often handled outside CMP, so admin approval is mandatory  
* Until then, status stays **Pending**  

## Can we permanently delete an account?

* If **email verification is still pending**, you can delete the account from **Client Listing** while status is **Pending**  
* For other statuses, permanent deletion is **not** available in CMP today  

## Where can we find client feedback for VM destroy?

Admin side: **Cancellation Requests** (request to destroy / cancel service details).

## Can VM quantity stay under admin control (increase/decrease limits)?

Yes — use **account-level VM quota** (and project quota where applicable). Lower the quota to block additional VMs; raise it when Sales needs more capacity. See [Account quotas](/quota/account-quotas).

## Can we restrict “only one VM under a package/account”?

Practically yes via **account VM quota** set to `1` (or the required count). There is no separate “one VM per package SKU” lock beyond quota and package visibility rules.
