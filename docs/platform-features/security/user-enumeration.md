---
sidebar_position: 2
title: "User Enumeration Protection"
tags: ["platform", "security", "login", "forgot-password", "enumeration"]
---

# User Enumeration Protection

## What is user enumeration?

**User enumeration** is a security risk where an attacker learns whether a particular username or email address exists in a system by observing how the application responds.

For example, if a login page says **Email not found** for one address and **Wrong password** for another, the attacker now knows which emails are registered. That information makes it easier to target real accounts.

CMP includes **two layers** of protection that work together — **login rate limiting** and **Forgot Password rate limiting** — without disrupting genuine users under normal use. Both are controlled from **Admin Panel → Global Settings** and take effect immediately without a restart.

**Path:** **Admin Panel → Global Settings**

---

## Login rate limiting

Global settings **`login_attempt_limit`** and **`login_block_duration`** control login retry protection.

### Configuration

| Setting | Default | Description |
|---|---|---|
| **`login_attempt_limit`** | `5` | Maximum failed login attempts before the account is blocked |
| **`login_block_duration`** | `30` | Block duration in **minutes** after the limit is exceeded |

**Example:**

```
login_attempt_limit = 5
login_block_duration = 30
```

### Behaviour

1. Users are allowed up to **`login_attempt_limit`** failed login attempts.
2. On the next failed attempt after the limit is reached (for example the **6th** attempt when the limit is **5**), the account is temporarily blocked for **`login_block_duration`** minutes.
3. During the blocked period:
   * All login requests are rejected immediately with a throttle/blocked message.
   * Additional retry attempts **do not increase or extend** the block duration.
4. Once the block duration expires, the user can attempt login again normally.
5. A **successful login** resets the failed-attempt counter to zero.

### What the user sees

* A clear, friendly message when credentials are wrong — **without revealing** whether the username or password was incorrect.
* A specific message when the account is locked, including when they can try again.

### Security inputs handled

The login form is also protected against common attack techniques:

| Input | Behaviour |
|---|---|
| **SQL injection** in the username field | Sanitized — no database error is exposed |
| **Cross-site scripting (XSS)** payloads | Escaped — no script executes in the browser |
| **Blank username or password** | Validation message shown; attempt counter **not** incremented |
| **Wrong-case password** | Passwords are case-sensitive; correct username with wrong-case password counts as a failed attempt |

### Session and connection behaviour

* If a user is already logged in on one device and their account is locked from another device, the existing active session continues (or is terminated) according to the configured security policy.
* The login page is only accessible over **HTTPS**. HTTP connections are redirected to HTTPS so credentials are never sent unencrypted.

---

## Forgot Password rate limiting

Global settings **`rate_limit_to_send_link_otp`** and **`rate_limit_to_send_link_otp_block_minutes`** control Forgot Password request rate limiting.

The **Forgot Password** flow is a common abuse target — attackers use it to confirm registered emails or flood users with reset messages. Rate limiting and [reCAPTCHA](/platform-features/captcha/) reduce this risk.

### Configuration

| Setting | Default | Description |
|---|---|---|
| **`rate_limit_to_send_link_otp`** | `30` | Maximum Forgot Password link requests allowed within **1 hour** |
| **`rate_limit_to_send_link_otp_block_minutes`** | `5` | Block duration in **minutes** after the hourly limit is exceeded |

**Example:**

```
rate_limit_to_send_link_otp = 30
rate_limit_to_send_link_otp_block_minutes = 5
```

### Behaviour

1. Users can request the Forgot Password link up to **`rate_limit_to_send_link_otp`** times within **1 hour**.
2. On the next request after the limit is reached (for example the **31st** request when the limit is **30**), the user is temporarily blocked for **`rate_limit_to_send_link_otp_block_minutes`** minutes.
3. During the blocked period:
   * Requests are rejected immediately with a throttle/blocked message.
   * Additional retry attempts **do not extend** the cooldown duration.
4. After the block expires, the user can request the Forgot Password link again normally.

### Attempt reset logic

**Hourly reset**

If no new Forgot Password request is made within **60 minutes** from **`last_attempt_at`**, the attempt counter resets to **0**.

**Block reset**

Once **`blocked_until`** expires, the block is automatically removed and the user can request the Forgot Password link again.

### reCAPTCHA protection (Forgot Password security enhancement)

* Every Forgot Password submission requires a valid **Google reCAPTCHA** challenge first — see [Google reCAPTCHA v2 Checkbox](/platform-features/captcha/google-recaptcha-v2).

This helps prevent:

* Automated bot requests
* Spam Forgot Password attempts
* Abuse of password reset functionality

Additional rules:

* Requests without a valid reCAPTCHA token are **rejected before processing**. The attempt counter is **not** incremented.
* The reCAPTCHA challenge is refreshed after each submission — the same token cannot be reused.
* If reCAPTCHA is **disabled** in admin settings, the widget is hidden and no challenge is required. **Rate limiting still applies.**

### Reset link security

| Rule | Behaviour |
|---|---|
| **Validity** | Each reset link is valid for **24 hours** from send time |
| **Single use** | After a link is used to reset a password, it **cannot be used again** — replay attempts are rejected |
| **Expired links** | Expired links cannot be used — the user is prompted to request a new one |

### Scope of the rate limit

The rate limit applies **per user account**, not globally. If one user hits their limit, other users can still request reset links.

### Block persistence

The block is enforced **server-side**. Refreshing the browser or opening a new tab does **not** clear the block — the user must wait for the block window to expire.

---

## Admin unblock / reset

After a user account is blocked from failed logins, an **unblock / reset login attempts** option is available in the **Admin Client Summary** section.

Administrators can use this to:

* **Reset attempt counters** — clear accumulated failed login attempts
* **Remove active blocks** — let the user log in immediately without waiting for the block timer to expire

:::tip[When to use manual unblock]

Use this when a legitimate customer is locked out after mistyped passwords or automated tooling triggered the limit. Rate-limit settings themselves are still changed under **Global Settings** — this action only clears the block state for one account.

:::

---

## Global settings summary

| Setting key | Default | Controls |
|---|---|---|
| **`login_attempt_limit`** | `5` | Failed login attempts before block |
| **`login_block_duration`** | `30` | Login block duration (minutes) |
| **`rate_limit_to_send_link_otp`** | `30` | Forgot Password requests per hour |
| **`rate_limit_to_send_link_otp_block_minutes`** | `5` | Forgot Password block duration (minutes) |

All four settings take effect **immediately** after save — no restart required.

---

## What this means for real users

These protections are designed to be **invisible to genuine users** in normal use:

* Requesting a reset link a few times works as expected.
* After several mistyped passwords, a clear message explains the account is **temporarily locked** and when to try again.
* Login and Forgot Password flows **never** show different messages for “wrong email” versus “wrong password” — this is intentional and reduces enumeration risk.
* Reset links stop working after **24 hours** or after **one use** — request a fresh link if needed.

---

## Feature behaviour

### Generic response messages

Whether an email address is registered or not, the system shows the **same message** on the Forgot Password page. This prevents attackers from using the form to discover which addresses have accounts.

### The block timer does not extend

Retrying during a block period does **not** push the timer further out. This avoids a legitimate user accidentally extending their own lockout by continuing to submit attempts.

### Attempt counter resets on successful login

When a user logs in successfully, any previous failed-attempt count is **cleared**. A user who made a few mistakes but eventually logged in correctly is not penalized on their next visit.

---

## Related

* [Security overview](/platform-features/security/)
* [Tickets and Rate Limiting](/platform-features/security/tickets-rate-limiting)
* [Global Settings](/platform-features/global-settings/)
* [CAPTCHA](/platform-features/captcha/)
* [Identity Providers](/platform-features#identity-providers)
* [Platform Features](/platform-features/)
