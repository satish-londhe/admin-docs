---
sidebar_position: 6
title: "enforce_mobile_verification"
tags: ["platform", "global-settings", "sms", "verification", "registration", "security"]
---

# enforce_mobile_verification

**Enforce Mobile Verification** dictates whether completing mobile number OTP verification is **mandatory (compulsory)** or **optional** for customers to finish onboarding.

**Path:** **Admin Panel → Global Settings**

| Setting | Value |
|---|---|
| **Flag name** | `enforce_mobile_verification` |
| **Typical values** | `true` / `false` |
| **Default** | `false` |
| **UI label** | Enforce Mobile Verification |

---

## Behaviour

This setting only takes effect when **[`enable_mobile_verification`](/platform-features/global-settings/enable-mobile-verification)** is set to **`true`**.

| Value | Behaviour | Registration Impact |
|---|---|---|
| **`true` (Compulsory)** | Mobile verification is strictly **mandatory**. | The user **cannot advance** to the next onboarding steps (e.g. *Complete Payment*, *Accept T&C*) or activate their account until the mobile number is successfully verified with the 6-digit OTP. |
| **`false` (Optional)** | Mobile verification is **optional**. | The user is invited to enter their mobile number and verify via OTP, but can bypass or complete registration without verifying the phone number. |

---

## Registration Workflow

During the first stage of customer registration (**Verify Email & Mobile No**):

* **Email Verification:** Always verified via OTP.
* **Mobile Verification:**
  * When `enforce_mobile_verification` is **`true`**, the green **Verified** status badge on both email and mobile is mandatory before proceeding to Step 2.
  * When `enforce_mobile_verification` is **`false`**, users can proceed even if mobile verification remains uncompleted.

![Screenshot: CMP Registration — Mobile Verification Step](/img/screenshots/cmp-registration-verify-mobile.png)

---

## Profile Mobile Number Updates

When a customer logs in to the Customer Portal and navigates to **Personal Details → Mobile Number → Change**:

* A **Change mobile** dialog opens requiring the user to enter their new number in international format and click **Send OTP**.
* To prevent unauthorized changes or invalid phone entries, entering the 6-digit OTP is required to submit and apply the update.

![Screenshot: CMP Customer Portal — Change Mobile Modal](/img/screenshots/cmp-profile-change-mobile.png)

---

## Configure

1. Navigate to **Admin Panel → Global Settings**.
2. Search for **`enforce_mobile_verification`**.
3. Set **Value**:
   * **`true`**: If regulatory compliance, KYC, or fraud prevention requires all registered accounts to have a confirmed mobile number.
   * **`false`**: If you prefer frictionless signups where mobile verification is encouraged but not blocking.
4. Confirm **`enable_mobile_verification`** is also set to **`true`**.
5. Save changes.

---

## Related

* [enable_mobile_verification](/platform-features/global-settings/enable-mobile-verification)
* [enable_phone_input](/platform-features/global-settings/enable-phone-input)
* [SMS Gateways & Verification Overview](/platform-features/sms-gateways/)
* [Terms & Conditions Enforcement](/platform-features/terms-and-conditions/enforce)
