---
sidebar_position: 4
title: "Enforce Terms & Conditions"
tags: ["platform", "terms", "registration", "global-settings"]
---

# Enforce Terms & Conditions

When **one-liner** mode is **disabled**, use this flag to require (or allow skipping) acceptance of the full in-product Terms and Conditions.

**Path:** **Admin Panel → Global Settings**

| Setting | Value |
|---|---|
| **Flag name** | `enforce_terms_condition` |
| **Typical values** | `true` / `false` |

:::tip[If one-liner is enabled]

For [one-liner](/platform-features/terms-and-conditions/one-liner) Terms and Conditions, this flag is effectively **true by default** — the signup checkbox must be accepted. Use `enforce_terms_condition` primarily when one-liner is **disabled** and you rely on the [in-step form](/platform-features/terms-and-conditions/in-step-form).

:::

## When enabled (`true`)

* Users must read and accept the complete Terms and Conditions during registration / onboarding.
* Onboarding is **not** complete until Terms and Conditions are accepted.
* Users cannot proceed to create services or use the platform without acceptance.

## When disabled (`false`)

* Acceptance becomes **optional**.
* Users can **Skip** the Terms step and continue to create services and use the platform.

Pending accounts that never accepted Terms may still appear as incomplete onboarding — see [Accounts & onboarding FAQ](/faq/platform/accounts-onboarding).

## Related

* [Terms and Conditions overview](/platform-features/terms-and-conditions/)
* [One-liner (checkbox + URL)](/platform-features/terms-and-conditions/one-liner)
* [In-step form](/platform-features/terms-and-conditions/in-step-form)
* [Accounts & onboarding FAQ](/faq/platform/accounts-onboarding)
