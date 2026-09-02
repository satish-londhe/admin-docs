---
sidebar_position: 1
title: "Platform Features"
tags: ["platform", "features", "cmp"]
---

# Platform Features

This section covers **CMP-level capabilities** that are not tied to a single orchestrator — APIs, notifications, store/marketplace, and other cross-cutting product features.

| Section | Purpose |
|---|---|
| **[Orchestrator Features](/orchestrator-features/)** | Features per orchestrator (VMs, networks, backups, …) |
| **Platform Features** (this section) | General CMP product features used across the platform |

## Feature list

| Feature | Status | Page |
|---|---|---|
| APIs | Ready | [APIs](/platform-features/apis) — access tokens, roles, integrations |
| Notifications | Stub | [Notifications](/platform-features/notifications) |
| Multi-language | Ready | [Multi-language](/platform-features/multi-language) — end-user portal locales, coverage, limitations |
| Auto Pay | Ready | [Auto Pay](/platform-features/auto-pay) — prepaid auto top-up when infra credits fall below a threshold |
| Customer Dashboard | In progress | [Customer Dashboard](/platform-features/customer-dashboard/) — customer portal self-service (quota reports, usage sync, …) |
| StackAI | Beta | [StackAI](/platform-features/stackai/) — natural-language cloud operations assistant in the customer console |
| Global Settings | In progress | [Global Settings](/platform-features/global-settings/) — one page per flag (`enable_phone_input`, `hide_billing_phone`, `hide_postal_code`, …) |
| Marketplace Apps | Ready | [Marketplace Apps](/platform-features/marketplace-apps/) — pre-installed app images, env vars, credentials email, startup scripts |
| CAPTCHA | Ready | [CAPTCHA](/platform-features/captcha/) — Google reCAPTCHA v2 Checkbox and Cloudflare |
| Security | Ready | [Security](/platform-features/security/) — user enumeration protection, tickets and feedback rate limiting |
| Identity Providers | Ready | [Keycloak](/platform-features/identity-providers/keycloak), [Zitadel](/platform-features/identity-providers/zitadel/) — SSO; see [overview](#identity-providers) |
| Terms and Conditions | Ready | [Terms and Conditions](/platform-features/terms-and-conditions/) — one-liner, in-step registration, enforce flag |
| Store & Products | Ready | [Store & Products](/platform-features/store/) — non-automated catalogue, vendors, orders, customer Store, billing rules |
| Reseller | Ready | [Reseller](/platform-features/reseller/) — reseller vs vendor, reseller billing, known limitations |
| Affiliate | Ready | [Affiliate](/platform-features/affiliate/) — registration, admin, affiliate dashboard, commissions, payouts |

Invoice branding, branches, and tax live under **Billing & Invoicing → [Invoice Settings](/billing/invoice-settings/)**. Branch wizard Step 5 (in-page T&C content) is also linked from [Terms and Conditions — In-step form](/platform-features/terms-and-conditions/in-step-form).

## Identity Providers \{#identity-providers\}

CMP supports external **identity providers (IdPs)** for customer and admin sign-in. Configure them under **Admin → Settings → Social Login**. Credentials are stored in CMP Social Login settings — **do not** put provider secrets in `.env`.

### Supported providers

| Provider | Type | Status | Documentation |
|---|---|---|---|
| **Keycloak** | OIDC / SSO | Supported | [Keycloak](/platform-features/identity-providers/keycloak) |
| **Zitadel** | OIDC / SSO | Supported | [Zitadel](/platform-features/identity-providers/zitadel/) |
| **Google Authenticator (TOTP)** | MFA | Planned | — |
| **Other MFA methods** | MFA | Planned | — |

:::important[One active SSO provider]

Enable **only one** SSO provider (Keycloak **or** Zitadel) at a time. When switching providers, set the previous provider's **Status** to **Inactive** in **Admin → Settings → Social Login** before activating the new one. Stored credentials are retained when a provider is inactive.

:::

### Social Login fields

**Path:** **Admin → Settings → Social Login**

| Field (typical) | Purpose |
|---|---|
| **Client ID** | OIDC application identifier from the IdP |
| **Client Secret** | Confidential Web application secret (OIDC login) |
| **Base URL / Realm** | Issuer or Keycloak realm URL — provider-specific |
| **PAT** (Zitadel only) | Machine-user Personal Access Token for admin API / user migration |
| **Status** | **Active** enables the provider for login |

### Disabling SSO

To turn off Keycloak or Zitadel without removing stored credentials:

1. Open **Admin → Settings → Social Login**
2. Open the provider (Keycloak or Zitadel) → **Edit**
3. Set **Status** to **Inactive** and save

Password login and password reset become available again until the provider is set back to **Active**.

Provider setup guides: [Keycloak](/platform-features/identity-providers/keycloak) · [Zitadel](/platform-features/identity-providers/zitadel/)

:::info[How this section grows]

Add new platform topics here as dedicated pages (for example branding, reports, addons, or email configuration). [Identity Providers](#identity-providers) (Keycloak, Zitadel) and [2FA](/auth/2fa) are documented in this section and under **Authentication & SSO**. [Billing](/billing/overview) and [Quota](/quota/global-quotas) remain in their own sections.

:::

## Related

* [Orchestrator Features](/orchestrator-features/)
* [CMP Overview](/overview/what-is-cmp)
* [Billing Overview](/billing/overview)
* [Two-Factor Authentication (2FA)](/auth/2fa)
