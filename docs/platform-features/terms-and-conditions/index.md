---
sidebar_position: 1
title: "Terms and Conditions"
tags: ["platform", "terms", "registration", "global-settings"]
---

# Terms and Conditions

CMP can require customers to accept **Terms and Conditions** during signup and onboarding. Admins choose how terms are shown (external link vs in-product content) and whether acceptance is mandatory.

## Modes at a glance

| Mode | How customers see T&C | Admin configuration |
|---|---|---|
| **[One-liner](/platform-features/terms-and-conditions/one-liner)** | Checkbox on the signup form; link opens the provider’s web page | Global Setting `terms_conditions_one_liner` |
| **[In-step form](/platform-features/terms-and-conditions/in-step-form)** | Full terms inside the registration flow (no separate website required) | Branch wizard **Step 5** + placeholders |
| **[Enforce acceptance](/platform-features/terms-and-conditions/enforce)** | Controls whether acceptance is required to finish onboarding | Global Setting `enforce_terms_condition` |

:::tip[Which mode should I use?]

* Use **one-liner** when legal terms live on your corporate website and you only need a signup checkbox + link.
* Use **in-step form** when you want the full document inside CMP (branch-specific text and dynamic placeholders such as customer name and company).
* Use **enforce** when one-liner is **disabled** and you still need mandatory acceptance of the in-product terms.

:::

## Related CMP paths

| Area | Path |
|---|---|
| Global flags | **Admin Panel → Global Settings** (category **Login/Register**) |
| Branch in-page terms | **Settings → System → Branch → Configure → Terms and Conditions** (wizard Step 5) |
| Customer view | **Profile → Terms & Conditions** |

Branch Step 5 field reference also lives under Billing → Invoice Settings: [Terms and conditions (branch wizard)](/billing/invoice-settings/terms-and-conditions).

## Pages in this section

* [One-liner (checkbox + URL)](/platform-features/terms-and-conditions/one-liner)
* [In-step form (registration flow)](/platform-features/terms-and-conditions/in-step-form)
* [Enforce Terms & Conditions](/platform-features/terms-and-conditions/enforce)

## Related

* [Branches](/billing/invoice-settings/branches)
* [Branch wizard — Terms and conditions](/billing/invoice-settings/terms-and-conditions)
* [Accounts & onboarding FAQ](/faq/platform/accounts-onboarding)
* [Platform Features](/platform-features/)
