---
sidebar_position: 1
title: "Security"
tags: ["platform", "security", "cmp"]
---

# Security

CMP platform features that reduce abuse, credential attacks, and information leakage — on login flows, account recovery, support tickets, and feedback submission.

These protections work alongside [Authentication & SSO](/auth/keycloak) and optional [CAPTCHA](/platform-features/captcha/) — they do not replace SSO, 2FA, or portal hardening at the infrastructure layer.

## Security capabilities

| Capability | Summary |
|---|---|
| **API token security** | Global security layer for API tokens with **idle expiration**, **controlled token renewal**, and **maximum session lifetime**. Reduces the risk of stolen or long-lived tokens being misused while keeping active users securely authenticated. See [Sanctum Token Expiration](/platform-features/global-settings/sanctum-token-expiration). |
| **User enumeration protection** | Prevents attackers from identifying whether an email or account exists through login or Forgot Password responses. See [User Enumeration Protection](/platform-features/security/user-enumeration). |
| **Forgot Password protection** | Rate-limits password reset requests to prevent abuse and email flooding. |
| **Reset link security** | Reset links expire after **24 hours** and can only be **used once**. |
| **Admin controls** | Login attempt limits, lock duration, and Forgot Password rate limits are configurable by administrators under **Global Settings**. Administrators can also unblock accounts from **Admin Client Summary**. |
| **Block timer protection** | Retrying during a block period **does not extend** the existing block duration. |
| **Counter reset** | A **successful login** resets the failed login attempt counter. |

Forgot Password protection, reset link security, admin controls, block timer behaviour, and counter reset are documented on [User Enumeration Protection](/platform-features/security/user-enumeration).

## Pages in this section

| Page | Purpose |
|---|---|
| [User Enumeration Protection](/platform-features/security/user-enumeration) | Login and Forgot Password rate limits, generic messages, reCAPTCHA, admin unblock |
| [Tickets and Rate Limiting](/platform-features/security/tickets-rate-limiting) | `ticket_rate_limit` and `feedback_rate_limit` — fixed and rolling window formats |

## Related

* [Sanctum Token Expiration](/platform-features/global-settings/sanctum-token-expiration) — API token idle expiry, sliding renewal, max session lifetime
* [CAPTCHA](/platform-features/captcha/) — reCAPTCHA on Forgot Password and other forms
* [Global Settings](/platform-features/global-settings/)
* [Authentication & SSO](/auth/keycloak)
* [Platform Features](/platform-features/)
