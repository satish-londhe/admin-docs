---
sidebar_position: 6
title: "Authentication & 2FA"
tags: ["faq", "platform", "auth", "2fa"]
---

# Authentication & 2FA

Product guide: [Two-factor authentication](/platform-features/identity-providers/2fa).

## How do we enforce 2FA for all accounts?

Set **`enforce_2fa_to_all`** = **`true`** in **Global Settings**.

After enablement, 2FA is mandatory for admins, customers, and sub-users.

:::warning[Before you enable]

Confirm the **Super Admin** email is valid and reachable. Fix it first if needed — lockout risk if 2FA enrollment/mail fails for the only admin account.

:::

## Can we enforce 2FA for only one account?

Yes. Enable 2FA from that user’s **Profile** (account-level) instead of the global flag.
