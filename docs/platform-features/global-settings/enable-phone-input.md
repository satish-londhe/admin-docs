---
sidebar_position: 2
title: "enable_phone_input"
tags: ["platform", "global-settings", "registration", "billing-address", "phone"]
---

# enable_phone_input

**Enable Phone Input** is the **primary** global setting for phone number fields across the platform. When it is off, **all** phone inputs — billing phone, profile phone, signup phone, and related fields — are hidden.

**Path:** **Admin Panel → Global Settings**

| Setting | Value |
|---|---|
| **Flag name** | `enable_phone_input` |
| **Typical values** | `true` / `false` |
| **UI label** | Enable Phone Input |

---

## Where this applies

When **`enable_phone_input`** is **`false`**, phone fields are hidden consistently across:

* **Admin Portal**
* **Customer Portal**
* **Partner Portal**
* Registration and onboarding flows
* Profile and billing detail panels

Applies to billing phone, profile phone, signup phone, and related phone fields.

---

## Behaviour

| Value | Result |
|---|---|
| **`true` (On)** | Phone input fields are **enabled** and can be shown on applicable forms |
| **`false` (Off)** | Phone input fields are **disabled and hidden** across the platform. Users are **not prompted** to enter a phone number |

When **`enable_phone_input`** is **`false`**, phone fields do **not** appear — **regardless of [`hide_billing_phone`](/platform-features/global-settings/hide-billing-phone)**.

:::info[Relationship to hide_billing_phone]

**`hide_billing_phone` has no additional effect** while **Enable Phone Input** is off. Use **`hide_billing_phone`** only when you want to hide **billing phone specifically** while other phone fields (profile, signup) remain visible — and only when **`enable_phone_input`** is **`true`**.

:::

---

## How it works with hide_billing_phone

| Enable Phone Input | Hide Billing Phone | Billing phone field |
|---|---|---|
| **`false`** | **`false`** | Hidden |
| **`false`** | **`true`** | Hidden |
| **`true`** | **`false`** | Visible |
| **`true`** | **`true`** | Hidden |

When both settings are **`false`** (default), the platform uses standard behaviour: phone fields are visible where configured, billing phone is visible on applicable forms, and other validation rules apply.

---

## Configure

1. Go to **Admin Panel → Global Settings**.
2. Search for **`enable_phone_input`** (UI: **Enable Phone Input**).
3. Set **Value** to **`true`** to allow phone fields platform-wide, or **`false`** to hide all phone inputs.
4. If phones are enabled, review **`hide_billing_phone`** if you need to hide billing phone only.
5. Save and verify on registration and profile forms in the Customer Portal.

---

## Related

* [hide_billing_phone](/platform-features/global-settings/hide-billing-phone)
* [hide_postal_code](/platform-features/global-settings/hide-postal-code)
* [Global Settings overview](/platform-features/global-settings/)
