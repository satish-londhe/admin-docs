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

:::info[More flags coming]

Additional Global Settings will be documented here over time — one page per flag. For billing flags already summarized in one modal, see [Billing Settings (admin)](/billing/billing-settings).

:::

## Related

* [Billing Settings (admin modal)](/billing/billing-settings)
* [Terms and Conditions](/platform-features/terms-and-conditions/) — other Login/Register global flags
* [Platform Features](/platform-features/)
