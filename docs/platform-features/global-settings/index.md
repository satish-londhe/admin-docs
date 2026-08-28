---
sidebar_position: 1
title: "Global Settings"
tags: ["platform", "global-settings", "configuration", "admin"]
---

# Global Settings

CMP exposes **200+ application-level flags** under **Admin Panel → Global Settings**. Each flag controls platform-wide behaviour — registration fields, billing rules, login policy, and more.

Use **one dedicated page per flag**: exact **Name**, values, behaviour, configure steps, and links to related flags.

**Path:** **Admin Panel → Global Settings**

![Screenshot: CMP admin — Global Settings list](/img/screenshots/cmp-global-settings-list.png)

:::info[How to change a flag]

1. Open **Global Settings** and search for the **Name** (for example `hide_billing_phone`).
2. Use the row **Actions** menu to edit the **Value**.
3. Save and verify on the relevant portal (Admin, Customer, or Partner).

:::

---

## Documented flags (A–Z)

| Flag | Page | Related flags |
|---|---|---|
| `enable_phone_input` | [Enable phone input](/platform-features/global-settings/enable-phone-input) | `hide_billing_phone` |
| `hide_billing_phone` | [Hide billing phone](/platform-features/global-settings/hide-billing-phone) | `enable_phone_input`, `hide_postal_code` |
| `hide_postal_code` | [Hide postal code](/platform-features/global-settings/hide-postal-code) | `hide_billing_phone` |
| `ticket_rate_limit` | [Tickets and Rate Limiting](/platform-features/security/tickets-rate-limiting) | `feedback_rate_limit` |
| `feedback_rate_limit` | [Tickets and Rate Limiting](/platform-features/security/tickets-rate-limiting) | `ticket_rate_limit` |
| `login_attempt_limit` | [User Enumeration Protection](/platform-features/security/user-enumeration) | `login_block_duration` |
| `login_block_duration` | [User Enumeration Protection](/platform-features/security/user-enumeration) | `login_attempt_limit` |
| `rate_limit_to_send_link_otp` | [User Enumeration Protection](/platform-features/security/user-enumeration) | `rate_limit_to_send_link_otp_block_minutes` |
| `rate_limit_to_send_link_otp_block_minutes` | [User Enumeration Protection](/platform-features/security/user-enumeration) | `rate_limit_to_send_link_otp` |
| `token_default_expiry_minutes` | [Sanctum Token Expiration](/platform-features/global-settings/sanctum-token-expiration) | `token_sliding_renewal_threshold_minutes`, `token_max_lifetime_minutes` |
| `token_sliding_renewal_threshold_minutes` | [Sanctum Token Expiration](/platform-features/global-settings/sanctum-token-expiration) | `token_default_expiry_minutes`, `token_max_lifetime_minutes` |
| `token_max_lifetime_minutes` | [Sanctum Token Expiration](/platform-features/global-settings/sanctum-token-expiration) | `token_default_expiry_minutes`, `token_sliding_renewal_threshold_minutes` |

:::info[More flags coming]

Additional Global Settings will be documented here over time — one page per flag. For billing flags already summarized in one modal, see [Billing Settings (admin)](/billing/billing-settings).

:::

## Related

* [Billing Settings (admin modal)](/billing/billing-settings)
* [Terms and Conditions](/platform-features/terms-and-conditions/) — other Login/Register global flags
* [Platform Features](/platform-features/)
