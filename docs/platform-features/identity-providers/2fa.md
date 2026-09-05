---
sidebar_position: 2
title: "Two-Factor Authentication (2FA)"
tags: ["platform", "auth", "2fa", "security", "identity"]
---

# Two-Factor Authentication (2FA)

CMP provides two-factor authentication (2FA) to secure accounts with an extra verification step during sign-in.

---

## Enforcing 2FA for all users

To make 2FA mandatory platform-wide for all users (admins, customers, and sub-users):

1. Go to **Admin Panel → Global Settings**
2. Search for `enforce_2fa_to_all` and set it to **`true`**

:::warning[Super Admin access risk]

Before enabling `enforce_2fa_to_all`, ensure the **Super Admin email address is valid, active, and accessible**. If the super admin cannot receive the 2FA verification code/email, they will be locked out of the Admin Portal once enforcement takes effect.

:::

---

## Enabling 2FA for a specific account

If you wish to enable 2FA for individual users rather than enforcing it platform-wide:

1. Log in as the user (or instruct the customer/sub-user to log in).
2. Go to the user's **Profile section** (top right user menu → Profile / Personal Details).
3. Enable 2FA directly from the profile settings.

---

## 2FA with External Identity Providers (SSO)

When using external Identity Providers like Keycloak or Zitadel:

* **Keycloak:** 2FA is managed directly within Keycloak instead of CMP. Configure 2FA policies and OTP flows in **Keycloak Realm Settings → Authentication**.
* **Zitadel:** Multi-factor authentication (MFA/2FA) policies (e.g. OTP, TOTP, FIDO2/WebAuthn) can be configured within the Zitadel Console under **Organization / Project Login Settings**.

---

## Related

* [Identity Providers](/platform-features#identity-providers)
* [Keycloak Setup](/platform-features/identity-providers/keycloak)
* [Zitadel Setup](/platform-features/identity-providers/zitadel/)
* [Global Settings](/platform-features/global-settings/)
