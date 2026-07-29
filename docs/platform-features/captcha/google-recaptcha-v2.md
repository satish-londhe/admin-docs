---
sidebar_position: 2
title: "Google reCAPTCHA v2 Checkbox"
tags: ["platform", "captcha", "recaptcha", "security", "google"]
---

# Google reCAPTCHA v2 Checkbox setup

CMP supports **Google reCAPTCHA v2 Checkbox** to protect forms from spam and automated bot submissions.

:::warning[Supported type only]

Use **reCAPTCHA v2** → **"I'm not a robot" Checkbox** only.

Do **not** use reCAPTCHA **v3** or **Invisible** reCAPTCHA credentials with CMP.

The **Site Key** and **Secret Key** must belong to the **same** reCAPTCHA site configuration, and every application domain must be registered in the Google reCAPTCHA Admin Console.

:::

## Prerequisites

* A Google account
* Access to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
* Admin access to CMP (**Captcha Settings**)

## Step 1 — Create reCAPTCHA v2 Checkbox credentials

1. Open the Google reCAPTCHA create page: [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Sign in with your Google account.
3. Configure the site:

| Field | Value |
|---|---|
| **Label** | A name for this site (for example `Stack Console`) |
| **reCAPTCHA type** | **Challenge (v2)** |
| **Subtype** | **"I'm not a robot" Checkbox** |
| **Domains** | All application domains (for example `example.com`, and `localhost` if you test locally) |

img/screenshots/google-recaptcha-register-v2.png

![Screenshot: Google reCAPTCHA — Register a new site with v2 Checkbox selected](/img/screenshots/google-recaptcha-register-v2.png)

4. Click **Submit**.
5. Copy the generated **Site Key** and **Secret Key**.

img/screenshots/google-recaptcha-site-secret-keys.png

![Screenshot: Google reCAPTCHA — Site Key and Secret Key after registration](/img/screenshots/google-recaptcha-site-secret-keys.png)

## Step 2 — Configure CMP

1. Log in to CMP as an administrator.
2. Go to **Settings → System → Captcha Settings**.
3. Open **Add Setting** (or edit an existing Google entry).

### Form fields

**Captcha Provider**

*Required.* Select **GOOGLE**.

**Site Key**

*Required.* Paste the Site Key from the Google reCAPTCHA console.

**Secret Key**

*Required.* Paste the Secret Key from the same Google reCAPTCHA configuration.

**Status**

*Required.* Set to **Active** to enable this provider.

**Mark as Default**

*Optional.* Select to make Google reCAPTCHA the default CAPTCHA provider for protected forms.

![Screenshot: CMP — Add Captcha Setting for GOOGLE with Site Key and Secret Key](/img/screenshots/cmp-captcha-settings-add.png)

4. Click **Submit** / **Save** to apply the changes.

## Verification

Open a page protected by reCAPTCHA (for example **login** or **registration**) and confirm that the **"I'm not a robot"** checkbox appears and validates successfully (green checkmark).

![Screenshot: Stack Console sign-in page with Google reCAPTCHA v2 checkbox validated](/img/screenshots/cmp-login-recaptcha-checkbox.png)

## Common issues

| Issue | Resolution |
|---|---|
| **Invalid site key** | Verify the Site Key is correct and the domain is registered in Google reCAPTCHA. |
| **Invalid secret key** | Verify the Secret Key is correct and matches the same site as the Site Key. |
| **Widget not displayed** | Ensure you created **reCAPTCHA v2 Checkbox** credentials (not v3 or Invisible). |
| **Domain mismatch** | Add the application domain (and any aliases) in the Google reCAPTCHA Admin Console. |

## Notes

* Only **Google reCAPTCHA v2 checkbox** is supported for the Google provider.
* Do not use reCAPTCHA v3 or Invisible reCAPTCHA credentials.
* Site Key and Secret Key must belong to the same reCAPTCHA configuration.
* Register **all** application domains used by the customer portal in the Google console.

CMP also supports **Cloudflare** as a CAPTCHA provider — see [CAPTCHA overview](/platform-features/captcha/).

## Related

* [CAPTCHA overview](/platform-features/captcha/)
* [Platform Features](/platform-features/)
* [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
